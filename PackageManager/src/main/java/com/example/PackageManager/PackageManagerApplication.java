package com.example.PackageManager;


import com.example.PackageManager.model.User;
import com.example.PackageManager.model.User.Role;
import com.example.PackageManager.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class PackageManagerApplication implements CommandLineRunner {

	@Autowired private UserRepository userRepo;

    public static void main(String[] args) {
        SpringApplication.run(PackageManagerApplication.class, args);
    }

    @Override
    public void run(String... args) {
        if (!userRepo.existsByEmail("anandtapadiya183@gmail.com")) {
            User superAdmin = new User();
            superAdmin.setName("Super Admin");
            superAdmin.setEmail("anandtapadiya183@gmail.com");
            superAdmin.setPassword("Anand@123");
            superAdmin.setRole(Role.SUPER_ADMIN);
            userRepo.save(superAdmin);
            System.out.println("✅ Default SUPER_ADMIN created");
        }
    }
}
