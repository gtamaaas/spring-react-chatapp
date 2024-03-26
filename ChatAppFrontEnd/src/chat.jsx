import { useRouteLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

import { WebSocket } from "ws";
Object.assign(global, { WebSocket });

import { Client } from "@stomp/stompjs";

export default function Chat() {
  const { messages } = useRouteLoaderData("root"); // Assuming setMessages function is available to update messages state
  const { username } = useRouteLoaderData("root");

  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [stateMessages, setStateMessages] = useState(messages);

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/websocket",
      onConnect: () => {
        console.log("Successful connection");
        client.subscribe("/topic/messages", (message) => {
          console.log(message.body);
          setStateMessages((stateMessages) => [
            ...stateMessages,
            JSON.parse(message.body),
          ]);
        });
      },
      onWebSocketError: (error) => console.log(error),
    });
    client.activate();
    setStompClient(client); // Save the Stomp client to state
  }, []);

  const listOfMessages = stateMessages.map((message) => {
    if (username === message.user.username)
      return (
        <div className="messagerowMe" key={message.id}>
          <span>
            {message.user.username} - {message.timestamp.substring(11, 16)}
          </span>
          <p className="messageMe">{message.content}</p>
        </div>
      );
    else
      return (
        <div className="messagerow" key={message.id}>
          <span>
            {message.user.username} - {message.timestamp.substring(11, 16)}
          </span>
          <p className="message">{message.content}</p>
        </div>
      );
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (message.length > 0)
      stompClient.publish({
        destination: "/hello",
        body: JSON.stringify({
          username: username,
          content: message,
        }),
      });
    else {
      alert("Message can't be empty!");
    }
    setMessage("");
  }

  return (
    <div className="chatwrapper">
      <h1>Global Chatroom</h1>
      <div className="messages">
        {listOfMessages}
        <form method="post" onSubmit={handleSubmit}>
          <input
            className="textbox"
            type="text"
            name="message"
            placeholder="Enter your text here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}
