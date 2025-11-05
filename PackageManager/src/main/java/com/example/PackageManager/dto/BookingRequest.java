// com.example.PackageManager.dto.BookingRequest.java
package com.example.PackageManager.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class BookingRequest {
    public Long packageId;
    public Long businessId;
    public Long userId;
    public String visitDate;          // ISO date: yyyy-MM-dd
    public Integer numberOfPeople;
    public String customerName;
    public String customerEmail;
    public String specialRequest;
    public BigDecimal totalAmount;    // IMPORTANT: BigDecimal
    public String receipt;
}
