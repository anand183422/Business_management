package com.example.PackageManager.controller;

import com.example.PackageManager.model.Booking;
import com.example.PackageManager.model.Business;
import com.example.PackageManager.model.PackageEntity;
import com.example.PackageManager.model.User;
import com.example.PackageManager.repository.BusinessRepository;
import com.example.PackageManager.repository.UserRepository;
import com.example.PackageManager.repository.BookingRepository;
import com.example.PackageManager.repository.PackageRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/visitor")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class VisitorController {

    private final BusinessRepository businessRepository;
    private final PackageRepository packageRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private BookingRepository bookingRepository;
    // ✅ Get all businesses with admin info
    @GetMapping("/businesses")
    public ResponseEntity<List<Map<String, Object>>> getAllBusinesses() {
        List<Business> businesses = businessRepository.findAll();

        List<Map<String, Object>> result = new ArrayList<>();
        for (Business b : businesses) {
            Map<String, Object> businessMap = new HashMap<>();
            businessMap.put("id", b.getId());
            businessMap.put("name", b.getName());
            businessMap.put("description", b.getDescription());
            businessMap.put("location", b.getLocation());
            businessMap.put("imageUrl",b.getImageUrl());

            // Add admin info
            User admin = b.getAdmin();
            if (admin != null) {
                businessMap.put("adminId", admin.getId());
                businessMap.put("adminName", admin.getName());
                businessMap.put("adminEmail", admin.getEmail());
                
            }

            result.add(businessMap);
        }

        return ResponseEntity.ok(result);
    }

    // ✅ Get single business + packages
    @GetMapping("/businesses/{businessId}")
    public ResponseEntity<?> getBusinessDetails(@PathVariable Long businessId) {
        Optional<Business> businessOptional = businessRepository.findById(businessId);
        if (!businessOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Business not found");
        }

        Business business = businessOptional.get();

        // Fetch packages related to this business
        List<PackageEntity> packages = packageRepository.findByBusiness(business);

        Map<String, Object> response = new HashMap<>();
        response.put("business", business);
        response.put("packages", packages);

        return ResponseEntity.ok(response);
    }
    @GetMapping("/packages/{id}")
    public ResponseEntity<PackageEntity> getPackageById(@PathVariable Long id) {
        return packageRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/my-bookings/{userId}")
public ResponseEntity<?> getMyBookings(@PathVariable Long userId) {
    // ✅ Step 1: Verify user exists
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

    // ✅ Step 2: Get only confirmed bookings for this user
    List<Booking> bookings = bookingRepository.findByUserIdAndStatus(userId, Booking.BookingStatus.CONFIRMED);

    LocalDate today = LocalDate.now();

    // ✅ Step 3: Separate bookings into upcoming and past
    List<Map<String, Object>> upcoming = new ArrayList<>();
    List<Map<String, Object>> past = new ArrayList<>();

    for (Booking b : bookings) {
        // Get package name safely
        String packageName = packageRepository.findById(b.getPackageId())
                .map(pkg -> pkg.getName())
                .orElse("N/A");

        Map<String, Object> bookingMap = new HashMap<>();
        bookingMap.put("id", b.getId());
        bookingMap.put("packageId", b.getPackageId());
        bookingMap.put("packageName", packageName);
        bookingMap.put("visitDate", b.getVisitDate());
        bookingMap.put("totalAmount", b.getTotalAmount());
        bookingMap.put("createdAt", b.getCreatedAt());

        // ✅ Upcoming: visitDate >= today
        if (b.getVisitDate() != null && !b.getVisitDate().isBefore(today)) {
            upcoming.add(bookingMap);
        } else {
            past.add(bookingMap);
        }
    }

    // ✅ Step 4: Prepare response
    Map<String, Object> response = new HashMap<>();
    response.put("upcoming", upcoming);
    response.put("past", past);

    return ResponseEntity.ok(response);
}

}
