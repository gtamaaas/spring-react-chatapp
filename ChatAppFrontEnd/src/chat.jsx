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

// const messages = [
//   {
//     user: "asd",
//     content: "asdasdsada",
//   },
//   {
//     user: "asd",
//     content: "asdasdsada",
//   },
// ];

export default function Chat() {
  const { messages } = useRouteLoaderData("root");
  console.log(messages[0]);
  const listOfMessages = messages.map((message) => (
    <div className="messagerow">
      <span>
        {message.user.username} - {message.timestamp}
      </span>
      <p className="message">{message.content}</p>
    </div>
  ));

  return (
    <div className="wrapper">
      <h1>Global Chatroom</h1>
      <div className="messages">{listOfMessages}</div>
      <Form method="post">
        <input
          className="textbox"
          type="text"
          name="message"
          placeholder="Enter your text here"
        />
      </Form>
    </div>
  );
}
