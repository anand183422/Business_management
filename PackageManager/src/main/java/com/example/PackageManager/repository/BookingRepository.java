// com.example.PackageManager.repository.BookingRepository.java
package com.example.PackageManager.repository;

import com.example.PackageManager.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
public interface BookingRepository extends JpaRepository<Booking, Long> {
    // List<Booking> findByBusinessIdOrderByCreatedAtDesc(Long businessId);
    // List<Booking> findByUserIdOrderByCreatedAtDesc(Long userId);
    // List<Booking> findByPackageId(Long packageId);
    long countByBusinessIdAndStatus(Long businessId, Booking.BookingStatus status);

    Optional<Booking> findById(Long id);
    List<Booking> findByBusinessId(Long businessId);
    List<Booking> findByUserIdAndStatus(Long userId, Booking.BookingStatus status);
    // Calculate total revenue (only successful payments)
    @Query("SELECT COALESCE(SUM(b.totalAmount),0) FROM Booking b WHERE b.businessId = :businessId AND b.status = com.example.PackageManager.model.Booking.BookingStatus.CONFIRMED")
    Double getTotalRevenueByBusiness(Long businessId);
   
}
