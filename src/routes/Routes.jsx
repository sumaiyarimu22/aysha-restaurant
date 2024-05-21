import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/home/Home";
import Main from "../layout/Main";
import Menu from "../pages/menu/Menu/Menu";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
    ],
  },
]);
