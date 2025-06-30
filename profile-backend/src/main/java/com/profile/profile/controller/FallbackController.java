package com.profile.profile.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fallback")
public class FallbackController {

    @GetMapping("/profiles")
    public ResponseEntity<String> fallbackProfiles() {
        return ResponseEntity.status(503).body("⚠️ Profile service is temporarily unavailable. Please try again later.");
    }

    @GetMapping("/projects")
    public ResponseEntity<String> fallbackProjects() {
        return ResponseEntity.status(503).body("⚠️ Projects service is temporarily unavailable. Please try again later.");
    }
}