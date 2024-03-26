package com.example.chatappbackend;


import com.example.chatappbackend.model.Message;
import com.example.chatappbackend.repository.MessageRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class MainController {


    @Autowired
    MessageRepository messageRepository;

    @GetMapping("/")
    public ResponseEntity<String> mainPage(HttpServletRequest request) {
        HttpSession currentSession = request.getSession(false);
        List<Message> messageList = new ArrayList<>();
        messageList = messageRepository.findAll();
        if(currentSession == null) {
            return new ResponseEntity<>("You are not logged in", HttpStatusCode.valueOf(403));
        }
        else {
            System.out.println(currentSession.getAttribute("username") + " " + currentSession.getId());
            return new ResponseEntity<>("Hello " + currentSession.getAttribute("username"), HttpStatusCode.valueOf(200));
        }
    }

    @GetMapping("/messages")
    public List<Message> getMessages() {
        return messageRepository.findAll();
    }

}