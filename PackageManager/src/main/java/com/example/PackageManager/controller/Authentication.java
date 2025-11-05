package com.example.PackageManager.controller;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public interface Authentication {

    void authenticate(UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken);

}
