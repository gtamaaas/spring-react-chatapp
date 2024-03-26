import { Link } from "react-router-dom";
import { useRouteLoaderData, redirect } from "react-router-dom";
import localforage from "localforage";
import axios from "axios";
import Chat from "./chat";

export async function loader() {
  try {
    const response = await axios.get("http://localhost:8080/", {
      withCredentials: true,
    });
    console.log(response);
    let username = await localforage.getItem("username");
    const messages = await axios.get("http://localhost:8080/messages");
    return { username: username, messages: messages.data };
  } catch (error) {
    await localforage.setItem("username", "");
    alert("Need to login first! Redirecting to login page");
    return redirect("/login");
  }
}

export default function Root() {
  let { username } = useRouteLoaderData("root");
  return (
    <>
      <nav className="navbar">
        <Link to="/register"> Register</Link>
        <Link to="/login"> Login</Link>
        {username ? <Link to="/logout"> Logout</Link> : <></>}
      </nav>
      <br></br>
      <div>You are logged in as: {username}</div>
      <Chat />
    </>
  );
}
