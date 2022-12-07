import {useRef, useState, useEffect, useContext} from "react";

import styled from 'styled-components';
import useSocket from "../../context/useSocket";
import {ReadyContext, PlayerState} from "../ingame/index";

import GameEngine from "./lib/GameEngine";
import PongIO from "./lib/IO";
import Constants from "./Constants";

const BackGround = styled.div`
  min-height: 100vh;
  display: flex;
  overflow: hidden;
  background-image: url("/src/images/background.jpg");
`;

const GameBoard = styled.canvas`
  width : 80%;
  max-width: 1440px;
  height : calc(width / 2);
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  margin:auto;
`;

export const PongGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let ctx: CanvasRenderingContext2D;
  const {socket} = useSocket();
  const [game, setGame] = useState<GameEngine>();
  const [recvData, setRecvData] = useState<PongIO.GameRecvData>();
  const pState = useContext(ReadyContext);

  useEffect(() => {
    if (socket && canvasRef.current) {
      const ref = canvasRef.current.getContext("2d");
      if (ref !== null) {
        ctx = ref;
        setGame(new GameEngine(ctx, socket));
      }
    }
  }, [canvasRef.current, socket]);

  useEffect(() => {
    if (socket) {
      socket.on("draw", (data: PongIO.GameRecvData) => {
        if (data) {
          setRecvData(data);
        }
      })
      return () => {
        socket.off("draw");
      }
    }
  }, [socket]);

  useEffect(() => {
    if (game) {
      if (recvData) {
        game.draw(recvData);
      }
    }
  }, [game, recvData]);

  useEffect(() => {
    if (game) {
      console.log(pState.pState);
      if (game.sceneNum === 1) {
        pState.setPState(PlayerState.gameEnd);
      }
      if (pState.pState === PlayerState.gameEnd && game.sceneNum === 0) {
        pState.setPState(PlayerState.stay);
      }
    }
    
  }, [game?.sceneNum]);
  
  return (
    <>
      <GameBoard ref={canvasRef} width={Constants.Game.CANVAS_WIDTH} height={Constants.Game.CANVAS_HEIGHT}></GameBoard>
    </>
  );
}

const GamePage = () => {
  return (
    <BackGround>
      <PongGame />
    </BackGround>
  );
}

export default GamePage;
