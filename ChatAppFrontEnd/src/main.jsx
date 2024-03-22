import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./root";
import Registration, { action as rootAction } from "./routes/registration";
import Login, { action as loginAction } from "./routes/login";
import ErrorPage from "./error-page";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import "./index.css";
import { Auth } from "./auth";
import localforage from "localforage";
import { loader as logoutLoader } from "./routes/logout";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    async loader() {
      let username = await localforage.getItem("username");
      return { username: username };
    },
    children: [
      {
        path: "register",
        element: <Registration />,
        action: rootAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "logout",
        element: <></>,
        loader: logoutLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
