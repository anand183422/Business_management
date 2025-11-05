// AdminController.java
package com.example.PackageManager.controller;

import com.example.PackageManager.dto.CreatePackageRequest;
import com.example.PackageManager.dto.CustomerDTO;
import com.example.PackageManager.model.*;
import com.example.PackageManager.repository.BookingRepository;
import com.example.PackageManager.repository.BusinessRepository;
import com.example.PackageManager.repository.PaymentRepository;
import com.example.PackageManager.repository.UserRepository;
import com.example.PackageManager.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// import java.io.File;
// import java.io.IOException;
// import java.nio.file.Files;
// import java.nio.file.Paths;
// import java.nio.file.Path;
import java.util.*;
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/admin")

public class AdminController {

    private final AdminService adminService;
    @Autowired private BookingRepository bookingRepo;
    @Autowired private BusinessRepository businessRepo;
    @Autowired private BookingRepository bookingRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private PaymentRepository paymentRepository;
    @Autowired private com.example.PackageManager.repository.PackageRepository packageRepository;
    @Autowired private UserRepository userRepo;
      public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }
    @GetMapping("/products/{adminId}")
    public List<Product> getAllProducts(@PathVariable Long adminId) {
        return adminService.getAllProducts(adminId);
    }

    @PostMapping("/product/{adminId}")
    public Product createProduct(@PathVariable Long adminId, @RequestBody Product product) {
        return adminService.createProduct(product, adminId);
    }

    @DeleteMapping("/product/{productId}")
    public void deleteProduct(@PathVariable Long productId) {
        adminService.deleteProduct(productId);
    }

    @GetMapping("/packages/{businessId}")
    public List<PackageEntity> getAllPackagesByBusinessId(@PathVariable Long businessId) {
        return adminService.getAllPackagesByBusinessId(businessId);
    }

   // 🎁 Total Products by Business
@GetMapping("/products/count/{businessId}")
public Map<String, Long> getProductCount(@PathVariable Long businessId) {
    long count = adminService.getProductCount(businessId);
    return Map.of("count", count);
}

// 🎁 Total Packages by Business
@GetMapping("/packages/count/{businessId}")
public Map<String, Long> getPackageCount(@PathVariable Long businessId) {
    long count = adminService.getPackageCount(businessId);
    return Map.of("count", count);
}


//📝 Total Bookings  by Business
// @GetMapping("/bookings/count/{businessId}")
// public Map<String, Long> getBookingCount(@PathVariable Long businessId) {
//     long count = adminService.getBookingCount(businessId);
//     return Map.of("count", count);
// }

// 💰 Total Revenue by Business
// @GetMapping("/revenue/{businessId}")
// public Map<String, Double> getRevenue(@PathVariable Long businessId) {
//     double revenue = adminService.getRevenue(businessId);
//     return Map.of("revenue", revenue);
// }

 @PostMapping("/package/{adminId}")
public PackageEntity createPackage(
        @RequestBody CreatePackageRequest data,
        @PathVariable Long adminId) {

    if (data.getProductIds() == null || data.getProductIds().isEmpty()) {
        throw new IllegalArgumentException("Product IDs must not be null or empty");
    }

    PackageEntity packageEntity = new PackageEntity();
    packageEntity.setName(data.getName());
    packageEntity.setDescription(data.getDescription());
    packageEntity.setStartDate(data.getStartDate()); // ✅ Fixed method name
    packageEntity.setEndDate(data.getEndDate());
    packageEntity.setPrice(data.getPrice());
    packageEntity.setStatus(data.getStatus()); // ✅ Fixed typo: packageEntiity → packageEntity
    packageEntity.setValidity(data.getValidity());
    //packageEntity.setDiscount(data.getDiscount());
    packageEntity.setAgeLimit(data.getAgeLimit());
    packageEntity.setFeatures(data.getFeatures());
    packageEntity.setGroupDiscount(data.getGroupDiscount());
    packageEntity.setImageUrl(data.getImageUrl());

    return adminService.createPackage(adminId, packageEntity, data.getProductIds());
}
//  @GetMapping("/bookings/{businessId}")
//     public List<Booking> getBookings(@PathVariable Long businessId) {
//         return bookingRepo.findByBusinessId(businessId);
//     }
@GetMapping("/bookings/count/{businessId}")
public Map<String, Long> getConfirmedPaidBookingCount(@PathVariable Long businessId) {
   long count = bookingRepository.countByBusinessIdAndStatus(
    businessId,
    Booking.BookingStatus.CONFIRMED
);

    return Map.of("count", count);
}



    // 2️⃣ Fetch revenue summary
    @GetMapping("/revenue/{businessId}")
    public Map<String, Object> getRevenue(@PathVariable Long businessId) {
        Double totalRevenue = bookingRepo.getTotalRevenueByBusiness(businessId);
        long totalBookings = bookingRepo.findByBusinessId(businessId).size();

        return Map.of(
            "totalRevenue", totalRevenue,
            "totalBookings", totalBookings
        );
    }

    @GetMapping("/bookings/{adminId}")
    public ResponseEntity<?> getBookingsByAdmin(@PathVariable Long adminId) {
    // Find admin
    User admin = userRepository.findById(adminId)
            .orElseThrow(() -> new RuntimeException("Admin not found"));

    if (admin.getBusiness() == null) {
        return ResponseEntity.badRequest().body(Map.of("message", "Admin has no business assigned"));
    }

    Long businessId = admin.getBusiness().getId();

    // Fetch all bookings of that business
    List<Booking> bookings = bookingRepository.findByBusinessId(businessId);

    List<Map<String, Object>> bookingDTOs = bookings.stream().map(b -> {
        String packageName = packageRepository.findById(b.getPackageId())
                .map(pkg -> pkg.getName())
                .orElse("N/A");

        Map<String, Object> bookingMap = new HashMap<>();
        bookingMap.put("id", b.getId());
        bookingMap.put("userId", b.getUserId());
        bookingMap.put("packageId", b.getPackageId());
        bookingMap.put("packageName", packageName); // ✅ added
        bookingMap.put("businessId", b.getBusinessId());
        bookingMap.put("customerName", b.getCustomerName());
        bookingMap.put("customerEmail", b.getCustomerEmail());
        bookingMap.put("visitDate", b.getVisitDate());
        bookingMap.put("numberOfPeople", b.getNumberOfPeople());
        bookingMap.put("totalAmount", b.getTotalAmount());
        bookingMap.put("paymentStatus", b.getPaymentStatus().toString());
        bookingMap.put("paymentMethod", b.getPaymentMethod() == null ? null : b.getPaymentMethod().toString());
        bookingMap.put("transactionId", b.getTransactionId());
        bookingMap.put("status", b.getStatus().toString());
        bookingMap.put("specialRequest", b.getSpecialRequest());
        bookingMap.put("createdAt", b.getCreatedAt());
        bookingMap.put("updatedAt", b.getUpdatedAt());
        return bookingMap;
    }).collect(java.util.stream.Collectors.toList());

    return ResponseEntity.ok(bookingDTOs);
}
@PutMapping("/bookings/cancel/{id}")
public ResponseEntity<?> cancelBooking(@PathVariable Long id) {
    // Find the booking
    Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

    // Set booking status to CANCELLED
    booking.setStatus(Booking.BookingStatus.CANCELLED);
    bookingRepository.save(booking);

    // Update related payment
    Payment payment = paymentRepository.findByBookingId(booking.getId());
    if (payment != null) {
        payment.setStatus(Payment.Status.REFUNDED);
        paymentRepository.save(payment);
    }

    return ResponseEntity.ok("Booking with ID " + id + " has been cancelled and payment marked as REFUNDED.");
}
//  @GetMapping("/customers/{businessId}")
//     public List<CustomerDTO> getCustomers(@PathVariable Long businessId) {
//         return userRepo.findCustomersByBusiness(businessId);
//     }
    @GetMapping("/customers")
    public List<User> getCustomers() {
        return adminService.getAllCustomers();
    }

    // 🔹 Customers by Business
    @GetMapping("/customers/{businessId}")
    public List<CustomerDTO> getCustomersByBusiness(@PathVariable Long businessId) {
        return adminService.getCustomersByBusiness(businessId);
    }


}
