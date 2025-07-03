package com.profile.profile.controller;

import com.profile.profile.dto.AuthRequest;
import com.profile.profile.entity.User;
import com.profile.profile.repository.UserRepository;
import com.profile.profile.service.CustomUserDetailsService;
import com.profile.profile.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/test")
    public Mono<String> test() {
        System.out.println("✅ /auth/test called");
        return Mono.just("Auth service working");
    }
    @PostMapping("/login")
    public Mono<ResponseEntity<Map<String, String>>> login(@RequestBody AuthRequest request) {
        System.out.println("Login attempt for user: " + request.getUsername());
        return userDetailsService.findByUsername(request.getUsername())
                .filter(userDetails -> passwordEncoder.matches(request.getPassword(), userDetails.getPassword()))
                .map(userDetails -> {
                    String token = jwtService.generateToken(userDetails.getUsername());
                    return ResponseEntity.ok(Collections.singletonMap("token", token));
                })
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Collections.singletonMap("error", "Invalid credentials")));
    }



}
