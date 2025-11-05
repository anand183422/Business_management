package com.example.PackageManager.controller;

import com.example.PackageManager.dto.PaymentResponse;
import com.example.PackageManager.model.Payment;
import com.example.PackageManager.model.User;
import com.example.PackageManager.repository.PaymentRepository;
import com.example.PackageManager.repository.UserRepository;
import com.example.PackageManager.repository.PackageRepository;
import com.example.PackageManager.repository.BusinessRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final PackageRepository packageRepository;
    private final BusinessRepository businessRepository;

    public PaymentController(PaymentRepository paymentRepository, UserRepository userRepository, PackageRepository packageRepository, BusinessRepository businessRepository) {
        this.paymentRepository = paymentRepository;
        this.userRepository = userRepository;
        this.packageRepository = packageRepository;
        this.businessRepository = businessRepository;
    }

    @GetMapping("/{adminId}")
    public ResponseEntity<?> getPaymentsByAdmin(@PathVariable Long adminId) {
        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (admin.getBusiness() == null) {
            return ResponseEntity.badRequest().body("Admin has no business assigned");
        }

        Long businessId = admin.getBusiness().getId();

        // Fetch payments
        List<Payment> payments = paymentRepository.findByBusinessId(businessId);
// Convert entities -> DTOs
List<PaymentResponse> response = payments.stream()
        .map(payment -> {
            String packageName = null;
            if (payment.getBooking() != null && payment.getBooking().getPackageId() != null) {
                packageName = packageRepository.findById(payment.getBooking().getPackageId())
                        .map(pkg -> pkg.getName())
                        .orElse(null);
            }
            return new PaymentResponse(
                payment.getId(),
                payment.getUser() != null ? payment.getUser().getName() : null,
                payment.getUser() != null ? payment.getUser().getEmail() : null,
                packageName,
                payment.getAmount() != null ? payment.getAmount().doubleValue() : null,
                payment.getStatus().name(),
              
                "Razorpay", 
                payment.getRazorpayPaymentId(),
                payment.getPaymentDate()
            );
        })
        .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
    @GetMapping("/superadmin/all")
    public ResponseEntity<?> getAllPaymentsForSuperAdmin() {
        List<Payment> payments = paymentRepository.findAll();

        List<PaymentResponse> response = payments.stream().map(payment -> {
            String packageName = null;
            String businessName = null;

            // Get package name
            if (payment.getBooking() != null && payment.getBooking().getPackageId() != null) {
                packageName = packageRepository.findById(payment.getBooking().getPackageId())
                        .map(pkg -> pkg.getName())
                        .orElse(null);
            }

            // Get business name
            if (payment.getBooking() != null && payment.getBooking().getBusinessId() != null) {
                businessName = businessRepository.findById(payment.getBooking().getBusinessId())
                        .map(biz -> biz.getName())
                        .orElse(null);
            }

            return new PaymentResponse(
                    payment.getId(),
                    payment.getUser() != null ? payment.getUser().getName() : null, // customer name
                    payment.getUser() != null ? payment.getUser().getEmail() : null, // customer email
                    packageName + (businessName != null ? " (" + businessName + ")" : ""), // combine
                    payment.getAmount() != null ? payment.getAmount().doubleValue() : null,
                    payment.getStatus() != null ? payment.getStatus().name() : "UNKNOWN",
                    "Razorpay", // default method
                    payment.getRazorpayPaymentId(),
                    payment.getPaymentDate()
            );
        }).collect(Collectors.toList());

        // ✅ Sort payments by latest date
        response.sort(Comparator.comparing(PaymentResponse::getCreatedAt).reversed());

        return ResponseEntity.ok(response);
    }
    
}
