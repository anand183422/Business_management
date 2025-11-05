package com.example.PackageManager.controller;

import com.example.PackageManager.dto.DashboardResponse;
import com.example.PackageManager.repository.BusinessRepository;
import com.example.PackageManager.repository.UserRepository;
import com.example.PackageManager.repository.BookingRepository;
import com.example.PackageManager.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BusinessRepository businessRepository;

    @Autowired
    private BookingRepository bookingRepository;

   @GetMapping("/api/dashboard")
public DashboardResponse getDashboardCounts() {

    // Admin count only
    long adminsCount = userRepository.countByRole(User.Role.ADMIN);

    // Visitor users count
    long usersCount = userRepository.countByRole(User.Role.VISITOR);

    // Businesses count
    long businessesCount = businessRepository.count();

    // Revenue sum
    double revenue = bookingRepository.findAll()
                         .stream()
                         .mapToDouble(booking -> booking.getTotalAmount() != null
                             ? booking.getTotalAmount().doubleValue()
                             : 0)
                         .sum();

    return new DashboardResponse(adminsCount, businessesCount, usersCount, revenue);
}

}
