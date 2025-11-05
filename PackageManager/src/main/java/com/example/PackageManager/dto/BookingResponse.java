// com.example.PackageManager.dto.BookingResponse.java
package com.example.PackageManager.dto;

import com.example.PackageManager.model.Booking.*;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data @Builder
public class BookingResponse {
    private Long id;
    private Long userId;
    private Long packageId;
    private Long businessId;
    private LocalDate visitDate;
    private Integer numberOfPeople;
    private BigDecimal totalAmount;
    private PaymentStatus paymentStatus;
    private PaymentMethod paymentMethod;
    private String transactionId;
    private BookingStatus status;
    private String specialRequest;
    private LocalDateTime bookingDate;
}
