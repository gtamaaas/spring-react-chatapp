package com.example.chatappbackend.model;

public class InboundMessage {
    private String content;
    private String username;

    public InboundMessage(String content, String username) {
        this.content = content;
        this.username = username;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "InboundMessage{" +
                "content='" + content + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}
