import { createBrowserRouter } from "react-router-dom";
import OuterLayout from "../layout/OuterLayout";
import BasicLayout from "../layout/BasicLayout";
import ErrorPage from "../ErrorPage";
import Login from "../pages/login/Login";
import Auth from "../auth/Auth";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/ProfilePage";
import GamePage from "../pages/game/PongGame";
import Social from "../pages/social";
import Lobby from "../pages/lobby";
import TFAPage from "../auth/TFAPage";
import Restrict from "../auth/Restrict";
import Matching from "../pages/matching/Matching";
import GameLayout from "../layout/GameLayout";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Restrict>
        <Login />
      </Restrict>
    ),
  },
  {
    path: "/auth",
    element: (
      <Restrict>
        <Auth />,
      </Restrict>
    ),
  },
  {
    path: "/tfa",
    element: (
      <Restrict>
        <TFAPage />,
      </Restrict>
    ),
  },
  {
    path: "/*",
    element: <OuterLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/*",
        element: <BasicLayout />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "lobby",
            element: <Lobby />,
          },
          {
            path: "social",
            element: <Social />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ]
      },
      {
        path: "/*",
        element: <GameLayout />,
        children: [
          {
            path: "game",
            element: <GamePage />,
          },
          {
            path: "matching",
            element: <Matching />,
          },
        ]
      }
    ],
  },
]);

export default router;
