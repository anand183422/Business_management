package com.example.PackageManager.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)   // maps to payments.user_id column
    private User user;

     @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "business_id", nullable = false)
    private Business business;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
    private BigDecimal amount;
    private String currency;
    @Enumerated(EnumType.STRING)
    private Status status = Status.CREATED;
    private LocalDateTime paymentDate = LocalDateTime.now();

    public enum Status { CREATED, SUCCESS, FAILED, REFUNDED }

    // getters/setters
    public Long getId(){ return id; }
    public void setId(Long id){ this.id = id; }
     public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }  // <-- FIXED

    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }

    public Business getBusiness() { return business; }
    public void setBusiness(Business business) { this.business = business; }

    public String getRazorpayOrderId(){ return razorpayOrderId; }
    public void setRazorpayOrderId(String razorpayOrderId){ this.razorpayOrderId = razorpayOrderId; }
    public String getRazorpayPaymentId(){ return razorpayPaymentId; }
    public void setRazorpayPaymentId(String razorpayPaymentId){ this.razorpayPaymentId = razorpayPaymentId; }
    public String getRazorpaySignature(){ return razorpaySignature; }
    public void setRazorpaySignature(String razorpaySignature){ this.razorpaySignature = razorpaySignature; }
    public BigDecimal getAmount(){ return amount; }
    public void setAmount(BigDecimal amount){ this.amount = amount; }
    public String getCurrency(){ return currency; }
    public void setCurrency(String currency){ this.currency = currency; }
    public Status getStatus(){ return status; }
    public void setStatus(Status status){ this.status = status; }
    public LocalDateTime getPaymentDate(){ return paymentDate; }
    public void setPaymentDate(LocalDateTime paymentDate){ this.paymentDate = paymentDate; }
}

