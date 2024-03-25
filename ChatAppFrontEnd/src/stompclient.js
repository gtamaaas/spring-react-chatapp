import { WebSocket } from "ws";
Object.assign(global, { WebSocket });

import { Client } from "@stomp/stompjs";

export const stompClient = new Client({
    brokerURL: "ws://localhost:8080/websocket",
    onConnect: () => {
      console.log("Succesful connection");
      stompClient.subscribe("/topic/messages", (message) =>
        console.log(message.body)
      );
    },
    onWebSocketError: (error) => console.log(error),
});