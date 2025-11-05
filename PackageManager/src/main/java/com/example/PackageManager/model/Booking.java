package com.example.PackageManager.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long packageId;
    @Column(name = "business_id", nullable = false)
    private Long businessId;

    private String customerName;
    private String customerEmail;
    private LocalDate visitDate;
    private Integer numberOfPeople;
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    private String transactionId;
 
    @Enumerated(EnumType.STRING)
   private BookingStatus status = BookingStatus.PENDING;

    @Column(columnDefinition = "TEXT")
    private String specialRequest;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    // enums
    public enum PaymentStatus { PENDING, SUCCESS, FAILED, REFUNDED }
    public enum PaymentMethod { CREDIT_CARD, DEBIT_CARD, UPI, NET_BANKING, CASH }
    public enum BookingStatus { PENDING, CONFIRMED, CANCELLED, COMPLETED }

    // getters/setters (only core ones shown for brevity)
    public Long getId(){ return id; }
    public void setId(Long id){ this.id = id; }
    public Long getUserId(){ return userId; }
    public void setUserId(Long userId){ this.userId = userId; }
    
    public Long getPackageId(){ return packageId; }
    public void setPackageId(Long packageId){ this.packageId = packageId; }
    public Long getBusinessId(){ return businessId; }
    public void setBusinessId(Long businessId){ this.businessId = businessId; }
    public String getCustomerName(){ return customerName; }
    public void setCustomerName(String customerName){ this.customerName = customerName; }
    public String getCustomerEmail(){ return customerEmail; }
    public void setCustomerEmail(String customerEmail){ this.customerEmail = customerEmail; }
    public LocalDate getVisitDate(){ return visitDate; }
    public void setVisitDate(LocalDate visitDate){ this.visitDate = visitDate; }
    public Integer getNumberOfPeople(){ return numberOfPeople; }
    public void setNumberOfPeople(Integer numberOfPeople){ this.numberOfPeople = numberOfPeople; }
    public BigDecimal getTotalAmount(){ return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount){ this.totalAmount = totalAmount; }
    public PaymentStatus getPaymentStatus(){ return paymentStatus; }
    public void setPaymentStatus(PaymentStatus paymentStatus){ this.paymentStatus = paymentStatus; }
    public PaymentMethod getPaymentMethod(){ return paymentMethod; }
    public void setPaymentMethod(PaymentMethod paymentMethod){ this.paymentMethod = paymentMethod; }
    public String getTransactionId(){ return transactionId; }
    public void setTransactionId(String transactionId){ this.transactionId = transactionId; }
    public BookingStatus getStatus(){ return status; }
    public void setStatus(BookingStatus status){ this.status = status; }
    public String getSpecialRequest(){ return specialRequest; }
    public void setSpecialRequest(String specialRequest){ this.specialRequest = specialRequest; }
    public LocalDateTime getCreatedAt(){ return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt){ this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt(){ return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt){ this.updatedAt = updatedAt; }
    public Object getAPackage() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAPackage'");
    }
}
