package com.example.chatappbackend.websocket;

import com.example.chatappbackend.model.InboundMessage;
import com.example.chatappbackend.model.Message;
import com.example.chatappbackend.model.User;
import com.example.chatappbackend.repository.MessageRepository;
import com.example.chatappbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    UserRepository userRepository;

    @MessageMapping("/hello")
    @SendTo("/topic/messages")
    public Message response(InboundMessage inboundMessage,
                           @Payload String receivedMessage) {
        User user = userRepository.findByUsername(inboundMessage.getUsername());
        Message message = new Message(inboundMessage.getContent());
        message.setUser(user);
        messageRepository.save(message);
        return message;

    }
}
