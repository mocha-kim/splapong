import { useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext, AuthContextProvider } from "../context/AuthContext";
import { useAuthState } from "../context/AuthHooks";
import useSocket from "../context/useSocket";
import Player from "../pages/game/objects/Player";
import PlayerInfo from "../pages/lobby/components/PlayerInfo";

type DynamicColor = {
	color: string;
}

const CardWrapper = styled.div<DynamicColor>`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-content: center;
	position: relative;
	max-width: 30vw;
	border-radius: 0.5rem;
	padding: 1rem;
	margin: 1rem;
	background-color: var(${props=>props.color});
	color: ${props=>props.color == "--yellow" ? "black" : "white"};
`

type DynamicSize = {
	size: string;
}

const ProfileImg = styled.img<DynamicSize>`
    display: block;
	margin: 10px;
	width: ${props=>props.size};
`;

const NicknameText = styled.div`
	text-align: center;
	font-size: 1.5rem;
	font-family: NanumSquareB;
`;

const IntraText = styled.div<DynamicColor>`
	text-align: center;
	font-size: 1rem;
	color: var(${props=>props.color});
	font-family: NanumSquareR;
`;

const SpectatorCard = styled.div`
	max-width: 40%;
	border-radius: 2rem;
	padding: 1rem 2rem;
	margin: 1rem 0.5rem;
	background-color: white;
	color: black;
	align-self: flex-start;
`

const ReadyButton = styled.button`

`

const PlayerCard = (props: {type: string, player: PlayerInfo}) => {
	const RenderCard = () => {
		const {socket} = useSocket();
		const [isReady, setIsReady] = useState(false);
		const [isMine, setIsMine] = useState(false);
		const {intra} = useAuthState();

		useEffect(() => {
			if (props.player.intra_id === intra) {
				setIsMine(true);
			}
			console.log(isMine);
		}, []);

		const getReady = () => {
			if (isMine) {
				setIsReady(!isReady);
				socket?.emit("Ready", isReady);
				console.log(isReady);
			}
		}

		switch(props.type)
		{
			case "purple":	
				return (
					<CardWrapper color="--purple">
						<ProfileImg src={props.player.profile_url} size="100px"/>
						<NicknameText>{props.player.nickname}</NicknameText>
						<IntraText color="--light-light-gray">{props.player.intra_id}</IntraText>
						<ReadyButton disabled={!isMine} onClick={getReady}>{isReady ? "Cancel" : "Ready!"}</ReadyButton>
					</CardWrapper>
				);
			case "yellow":
				return (
					<CardWrapper color="--yellow">
						<ProfileImg src={props.player.profile_url} size="100px"/>
						<NicknameText>{props.player.nickname}</NicknameText>
						<IntraText color="--light-gray">{props.player.intra_id}</IntraText>
						<ReadyButton disabled={!isMine} onClick={getReady}>{isReady ? "Cancel" : "Ready!"}</ReadyButton>
					</CardWrapper>
				);
			case "spectator":
				return (
					<SpectatorCard>{props.player.intra_id}</SpectatorCard>
				);
		} 
	}

	return (
		<>
			{RenderCard()}
		</>
	)
}

export default PlayerCard;