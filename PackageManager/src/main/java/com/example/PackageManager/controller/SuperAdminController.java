package com.example.PackageManager.controller;

import com.example.PackageManager.dto.BookingResponse;
import com.example.PackageManager.dto.CreateBusinessRequest;
import com.example.PackageManager.dto.PaymentResponse;
import com.example.PackageManager.dto.ProductResponse;
import com.example.PackageManager.model.Booking;
import com.example.PackageManager.model.Business;
import com.example.PackageManager.model.PackageEntity;
import com.example.PackageManager.model.User;
import com.example.PackageManager.repository.BookingRepository;
import com.example.PackageManager.repository.BusinessRepository;
import com.example.PackageManager.repository.PackageRepository;
import com.example.PackageManager.repository.PaymentRepository;
import com.example.PackageManager.repository.ProductRepository;
import com.example.PackageManager.repository.UserRepository;
import com.example.PackageManager.service.UserService;
import com.example.PackageManager.service.BusinessService;
import java.util.Comparator;
import com.example.PackageManager.model.Payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/superadmin")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class SuperAdminController {

    @Autowired private UserService userService;
    @Autowired private BusinessService businessService;
    @Autowired private PackageRepository packageRepository;
    @Autowired private PaymentRepository paymentRepository;
    @Autowired private BusinessRepository businessRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private BookingRepository bookingRepository;

    @PostMapping("/create-admin")
  
    public ResponseEntity<User> createAdmin(@RequestBody User adminRequest) {
        User admin = userService.createAdmin(adminRequest);
        return ResponseEntity.ok(admin);
    }

    @PostMapping("/business")
public Business createBusiness(@RequestBody CreateBusinessRequest request) {
    return businessService.createBusiness(request);
}
@GetMapping("/businesses/count")
public ResponseEntity<?> getBusinessCount() {
    long count = businessService.getBusinessCount(); // Implement in service
    return ResponseEntity.ok(Map.of("count", count));
}

    @GetMapping("/business")
    public ResponseEntity<List<Map<String, Object>>> getAllBusinesses() {
    return ResponseEntity.ok(businessService.getAllBusinessesWithAdmin());
}

    @PutMapping("/business/{id}")
    public ResponseEntity<Business> updateBusiness(@PathVariable Long id, @RequestBody Business updatedBusiness) {
        return ResponseEntity.ok(businessService.updateBusiness(id, updatedBusiness));
    }

    @DeleteMapping("/business/{id}")
    public ResponseEntity<String> deleteBusiness(@PathVariable Long id) {
        businessService.deleteBusiness(id);
        return ResponseEntity.ok("Business deleted successfully");
    }

    @GetMapping("/admins")
    public ResponseEntity<List<User>> getAllAdmins() {
        return ResponseEntity.ok(userService.getAllAdmins());
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable Long id) {
        userService.deleteAdmin(id);
        return ResponseEntity.ok("Admin deleted successfully");
    }

    @GetMapping("/admins_no_business")
public ResponseEntity<List<User>> getAdminsNoBusiness() {
    return ResponseEntity.ok(userService.getAdminsNoBusiness());
}
@GetMapping("/admins/count")
public ResponseEntity<?> getAdminCount() {
    long count = userService.getAdminCount(); // Implement in service
    return ResponseEntity.ok(Map.of("count", count));
}
// SuperAdminController.java
@GetMapping("/packages")
public ResponseEntity<?> getAllPackages() {
    List<PackageEntity> packages = packageRepository.findAll();

    // Map with Admin/Business details
    List<Map<String, Object>> response = packages.stream().map(p -> {
        Map<String, Object> map = new java.util.HashMap<>();
        map.put("id", p.getId());
        map.put("name", p.getName());
        map.put("price", p.getPrice());
        map.put("description", p.getDescription());
        map.put("businessName", p.getBusiness() != null ? p.getBusiness().getName() : "N/A");
        
        return map;
    }).collect(java.util.stream.Collectors.toList());

    return ResponseEntity.ok(response);
}

// @GetMapping("/superadmin/payments")
// public ResponseEntity<?> getAllPayments() {
//     List<Payment> payments = paymentRepository.findAll();
//     return ResponseEntity.ok(payments);
// }
 @GetMapping("/visitors")
public ResponseEntity<List<User>> getAllVisitors() {
    List<User> visitors = userRepository.findByRole(User.Role.VISITOR);
    return ResponseEntity.ok(visitors);
}
 @GetMapping("/products")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        List<ProductResponse> products = productRepository.findAll().stream()
                .map(p -> new ProductResponse(
                        p.getId(),
                        p.getName(),
                        p.getPrice(),
                        p.getDescription(),
                        p.getBusiness() != null ? p.getBusiness().getName() : "N/A"
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(products);
    }


   @GetMapping("/bookings")
public ResponseEntity<?> getAllBookingsGroupedByStatus() {
    List<Booking> allBookings = bookingRepository.findAll();

    // Group bookings by status
    Map<String, List<Map<String, Object>>> grouped = allBookings.stream()
        .collect(Collectors.groupingBy(
            b -> b.getStatus().name(),
            Collectors.mapping(b -> {
                String packageName = packageRepository.findById(b.getPackageId())
                        .map(pkg -> pkg.getName())
                        .orElse("N/A");

                String businessName = businessRepository.findById(b.getBusinessId())
                        .map(biz -> biz.getName())
                        .orElse("N/A");

                String userName = userRepository.findById(b.getUserId())
                        .map(u -> u.getName())
                        .orElse("N/A");

                Map<String, Object> bookingMap = new HashMap<>();
                bookingMap.put("id", b.getId());
                bookingMap.put("userName", userName);
                bookingMap.put("packageName", packageName);
                bookingMap.put("businessName", businessName);
                bookingMap.put("visitDate", b.getVisitDate());
                bookingMap.put("numberOfPeople", b.getNumberOfPeople());
                bookingMap.put("totalAmount", b.getTotalAmount());
                bookingMap.put("paymentStatus", b.getPaymentStatus());
                bookingMap.put("status", b.getStatus());
                bookingMap.put("bookingDate", b.getCreatedAt());
                return bookingMap;
            }, Collectors.toList())
        ));

    return ResponseEntity.ok(grouped);
}



}


