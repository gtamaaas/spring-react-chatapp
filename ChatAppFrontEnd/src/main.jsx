import React from "react";
import ReactDOM from "react-dom/client";
import Root, { loader as rootLoader } from "./root";
import Registration, { action as registerAction } from "./routes/registration";
import Login, { action as loginAction } from "./routes/login";
import ErrorPage from "./error-page";
import Chat from "./chat";
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
    loader: rootLoader,
    children: [
      {
        path: "logout",
        element: <></>,
        loader: logoutLoader,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "register",
    element: <Registration />,
    action: registerAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
