package com.example.PackageManager.controller;

import com.example.PackageManager.dto.SignupRequest;
import com.example.PackageManager.dto.LoginRequest;
import com.example.PackageManager.model.User;
import com.example.PackageManager.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    @Autowired private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signupVisitor(@RequestBody SignupRequest request) {
        try {
            User user = authService.signupVisitor(request);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = authService.login(request);
        if (user == null) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
        return ResponseEntity.ok(user);
    }
}
