package com.example.PackageManager.service;

import com.example.PackageManager.model.User;
import com.example.PackageManager.model.User.Role;
import com.example.PackageManager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Creates an admin user (only called by SUPER_ADMIN)
     */
    @Override
    public User createAdmin(User user) {
        user.setRole(Role.ADMIN);
        return userRepository.save(user);
    }

    /**
     * Returns all ADMIN users in the system
     */
    @Override
    public List<User> getAllAdmins() {
        return userRepository.findByRole(Role.ADMIN);
    }

    /**
     * Deletes an admin user by ID
     */
    @Override
    public void deleteAdmin(Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent() && userOpt.get().getRole() == Role.ADMIN) {
            userRepository.deleteById(id);
        } else {
            throw new RuntimeException("Admin with ID " + id + " not found or not an ADMIN");
        }
    }
    @Override
    public List<User> getAdminsNoBusiness() {
   return userRepository.findAdminsWithoutBusiness();
}
@Override
public long getAdminCount() {
    return userRepository.countByRole(Role.ADMIN);
}

}
