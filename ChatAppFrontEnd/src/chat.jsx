import { Form, redirect, useRouteLoaderData } from "react-router-dom";
import { stompClient } from "./stompclient";
import localforage from "localforage";

export async function action({ request }) {
  const formData = await request.formData();
  const message = formData.get("message");
  let username = await localforage.getItem("username");
  stompClient.publish({
    destination: "/hello",
    body: JSON.stringify({
      username: username,
      content: message,
    }),
  });
  return "good";
}

export default function Chat() {
  const { messages } = useRouteLoaderData("root");
  const { username } = useRouteLoaderData("root");
  const listOfMessages = messages.map((message) => {
    if (username === message.user.username)
      return (
        <div className="messagerowMe">
          <span>
            {message.user.username} - {message.timestamp}
          </span>
          <p className="messageMe">{message.content}</p>
        </div>
      );
    else
      return (
        <div className="messagerow">
          <span>
            {message.user.username} - {message.timestamp}
          </span>
          <p className="message">{message.content}</p>
        </div>
      );
  });

  return (
    <div className="chatwrapper">
      <h1>Global Chatroom</h1>
      <div className="messages">
        {listOfMessages}
        <Form method="post">
          <input
            className="textbox"
            type="text"
            name="message"
            placeholder="Enter your text here"
          />
        </Form>
      </div>
    </div>
  );
}
