package com.example.chatappbackend.repository;

import com.example.chatappbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);

    User findByUsername(String username);
}
