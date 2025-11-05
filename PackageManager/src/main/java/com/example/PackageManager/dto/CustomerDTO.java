package com.example.PackageManager.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class CustomerDTO {

    private Long id;
    private String name;
    private String email;
    private LocalDate firstVisit;
    private LocalDate lastVisit;
    private Long totalBookings;
    private BigDecimal totalPayments;
    private String status;

    // ✅ Constructor matching JPQL
    public CustomerDTO(Long id, String name, String email,
                       LocalDate firstVisit, LocalDate lastVisit,
                       Long totalBookings, BigDecimal totalPayments,
                       String status) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.firstVisit = firstVisit;
        this.lastVisit = lastVisit;
        this.totalBookings = totalBookings;
        this.totalPayments = totalPayments;
        this.status = status;
    }

    // ✅ Getters & Setters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public LocalDate getFirstVisit() { return firstVisit; }
    public LocalDate getLastVisit() { return lastVisit; }
    public Long getTotalBookings() { return totalBookings; }
    public BigDecimal getTotalPayments() { return totalPayments; }
    public String getStatus() { return status; }

    public void setStatus(String status) {
        this.status = status;
    }
}
