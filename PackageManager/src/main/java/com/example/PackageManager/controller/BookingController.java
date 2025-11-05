// com.example.PackageManager.controller.BookingController.java
package com.example.PackageManager.controller;

import com.example.PackageManager.dto.BookingRequest;
import com.example.PackageManager.dto.CreateOrderResponse;
import com.example.PackageManager.dto.PaymentVerifyRequest;

import com.example.PackageManager.service.BookingService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api")
public class BookingController {

    @Autowired private BookingService bookingService;

    // Create booking and Razorpay order
    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody BookingRequest req) {
        try {
            CreateOrderResponse resp = bookingService.createBookingAndOrder(req);
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error creating booking: " + e.getMessage());
        }
    }

    // Verify payment after checkout
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody PaymentVerifyRequest req) {
        try {
            boolean ok = bookingService.verifyAndConfirmPayment(req);
            if (ok) return ResponseEntity.ok().body("Payment verified and booking confirmed");
            else return ResponseEntity.status(400).body("Signature mismatch");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error verifying payment: " + e.getMessage());
        }
    }
}
