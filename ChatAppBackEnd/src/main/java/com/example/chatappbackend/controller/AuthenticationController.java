package com.example.chatappbackend.controller;

import com.amdelamar.jhash.Hash;
import com.amdelamar.jhash.exception.InvalidHashException;
import com.example.chatappbackend.model.User;
import com.example.chatappbackend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/register")
    ResponseEntity<String> registerUser(@RequestBody User user) {
        boolean userAlreadyExists = userRepository.existsByUsername(user.getUsername());
        if(userAlreadyExists) {
            return new ResponseEntity<>("user already exists", HttpStatus.BAD_REQUEST);
        }
        else {
            char[] password = user.getPassword().toCharArray();
            String hash = Hash.password(password).create();
            user.setPassword(hash);
            userRepository.save(user);
            return new ResponseEntity<>("user is created", HttpStatus.OK);
        }
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    ResponseEntity<String> loginUser(@RequestBody User user, HttpServletRequest request) throws InvalidHashException {
        User userInDatabase = userRepository.findByUsername(user.getUsername());
        if (userInDatabase == null)
            return new ResponseEntity<>("User was not found!", HttpStatusCode.valueOf(404));
        char[] requestPassword = user.getPassword().toCharArray();
        if (userInDatabase.getUsername().equals(user.getUsername())
        && Hash.password(requestPassword).verify(userInDatabase.getPassword())) {
            HttpSession session = request.getSession(false);
            if (session != null)
                session.invalidate();
            session = request.getSession();
            session.setAttribute("username", user.getUsername());
            System.out.println(session.getAttribute("username") + " is logged in");
            System.out.println(session.getId());
            session.setMaxInactiveInterval(5 * 60);
        }
        else {
            return new ResponseEntity<>("Username/password is not correct!", HttpStatusCode.valueOf(404));
        }
        return new ResponseEntity<>("Succesful login", HttpStatusCode.valueOf(200));
    }

    @PostMapping("/logout")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    ResponseEntity<String> logoutUser(@RequestBody String username, HttpServletRequest request) {
        HttpSession session = request.getSession();
        System.out.println("Invalidating session " + session.getId());
        session.invalidate();
        return new ResponseEntity<>("Succesful logout", HttpStatusCode.valueOf(200));
    }

}
