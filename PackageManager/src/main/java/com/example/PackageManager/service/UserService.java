package com.example.PackageManager.service;

import com.example.PackageManager.model.User;

import java.util.List;

public interface UserService {
    User createAdmin(User user);
    List<User> getAllAdmins();
    void deleteAdmin(Long id);
    public List<User> getAdminsNoBusiness();
    long getAdminCount();

}
