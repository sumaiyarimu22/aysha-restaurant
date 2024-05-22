import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/home/Home";
import Main from "../layout/Main";
import Menu from "../pages/menu/Menu/Menu";
import Order from "../pages/menu/order/Order";
import Login from "../pages/login/Login";

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
        path: "menu",
        element: <Menu />,
      },
      {
        path: "order/:category",
        element: <Order />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
