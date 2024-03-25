import { Outlet, Link } from "react-router-dom";
import { useRouteLoaderData, redirect } from "react-router-dom";
import localforage from "localforage";
import axios from "axios";
import Chat from "./chat";
import { stompClient } from "./stompclient";

export async function loader() {
  try {
    const response = await axios.get("http://localhost:8080/", {
      withCredentials: true,
    });
    console.log(response);
    let username = await localforage.getItem("username");
    stompClient.activate();
    const messages = await axios.get("http://localhost:8080/messages");
    return { username: username, messages: messages.data };
  } catch (error) {
    console.log(error);
    await localforage.setItem("username", "");
    alert("Need to login first! Redirecting to login page");
    return redirect("/login");
  }
}

export default function Root() {
  let { username } = useRouteLoaderData("root");
  console.log(username);
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/register"> Register</Link>
          </li>
          <li>
            <Link to="/login"> Login</Link>
          </li>
          {username ? (
            <li>
              <Link to="/logout"> Logout</Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </nav>
      <div>Hello {username}!</div>
      <Chat />
    </>
  );
}
