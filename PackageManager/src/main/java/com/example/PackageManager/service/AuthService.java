package com.example.PackageManager.service;

import com.example.PackageManager.model.User;
import com.example.PackageManager.repository.UserRepository;
import com.example.PackageManager.dto.SignupRequest;
import com.example.PackageManager.dto.LoginRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired private UserRepository userRepo;

    public User signupVisitor(SignupRequest request) {
        if (userRepo.existsByEmail(request.email)) {
            throw new RuntimeException("Email already in use");
        }

        User user = new User();
        user.setName(request.name);
        user.setEmail(request.email);
        user.setPassword(request.password);
        user.setRole(User.Role.VISITOR);

        return userRepo.save(user);
    }

    public User createAdmin(SignupRequest request) {
        if (userRepo.existsByEmail(request.email)) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(request.name);
        user.setEmail(request.email);
        user.setPassword(request.password);
        user.setRole(User.Role.ADMIN);

        return userRepo.save(user);
    }

    public User login(LoginRequest request) {
        return userRepo.findByEmail(request.email)
                .filter(user -> user.getPassword().equals(request.password))
                .orElse(null);
    }
}
