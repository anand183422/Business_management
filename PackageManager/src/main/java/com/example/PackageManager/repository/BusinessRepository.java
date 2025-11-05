package com.example.PackageManager.repository;

import com.example.PackageManager.model.Business;
import com.example.PackageManager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BusinessRepository extends JpaRepository<Business, Long> {
    Optional<Business> findByAdmin(User admin);
}
