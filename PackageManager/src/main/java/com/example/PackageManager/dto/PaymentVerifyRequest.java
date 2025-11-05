package com.example.PackageManager.dto;

public class PaymentVerifyRequest {
    public Long bookingId;
    public String razorpayOrderId;
    public String razorpayPaymentId;
    public String razorpaySignature;
    public Long userId;  
}
