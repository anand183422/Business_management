package com.example.PackageManager.repository;


import com.example.PackageManager.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByRazorpayOrderId(String orderId);
    //Optional<Payment> findByBookingId(Long bookingId);
     List<Payment> findByBusinessId(Long businessId);
     Payment findByBookingId(Long bookingId);

}

