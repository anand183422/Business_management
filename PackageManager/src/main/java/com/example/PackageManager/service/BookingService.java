// com.example.PackageManager.service.BookingService.java
package com.example.PackageManager.service;

import com.example.PackageManager.dto.BookingRequest;
import com.example.PackageManager.dto.CreateOrderResponse;
import com.example.PackageManager.dto.PaymentVerifyRequest;
import com.example.PackageManager.model.*;
import com.example.PackageManager.repository.*;
import com.razorpay.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
public class BookingService {
    @Autowired private BookingRepository bookingRepo;
    @Autowired private PaymentRepository paymentRepo;
    @Autowired private PackageRepository packageRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private BusinessRepository businessRepo;
    @Autowired private RazorpayService razorpayService;

    public CreateOrderResponse createBookingAndOrder(BookingRequest req) throws Exception {
        // --- validate input (basic)
        if (req.totalAmount == null) throw new IllegalArgumentException("totalAmount is required");

        // 1) create booking (PENDING)
        Booking booking = new Booking();
        booking.setUserId(req.userId);
        booking.setPackageId(req.packageId);
        booking.setBusinessId(req.businessId);
        booking.setCustomerName(req.customerName);
        booking.setCustomerEmail(req.customerEmail);
        booking.setVisitDate(LocalDate.parse(req.visitDate));
        booking.setNumberOfPeople(req.numberOfPeople == null ? 1 : req.numberOfPeople);
        booking.setSpecialRequest(req.specialRequest);
        booking.setTotalAmount(req.totalAmount);
        booking = bookingRepo.save(booking);

        // 2) create Razorpay order (amount in paise)
 BigDecimal paise = req.totalAmount.multiply(new BigDecimal(100));
    long amountPaise = paise.longValueExact();

    // 3️⃣ Create Razorpay Order
    Order order = razorpayService.createOrder(amountPaise, 
        req.receipt == null ? "booking_" + booking.getId() : req.receipt);

        // 3) create Payment record (set user & business relations)
        User user = userRepo.findById(req.userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Business business = businessRepo.findById(req.businessId)
                .orElseThrow(() -> new RuntimeException("Business not found"));

        Payment payment = new Payment();
        payment.setUser(user);
        payment.setBusiness(business);
        payment.setBooking(booking);
        payment.setRazorpayOrderId(order.get("id"));
        payment.setAmount(req.totalAmount);
        payment.setCurrency(order.get("currency"));
        payment.setStatus(Payment.Status.CREATED);
        paymentRepo.save(payment);

        CreateOrderResponse resp = new CreateOrderResponse();
        resp.bookingId = booking.getId();
        resp.razorpayOrderId = order.get("id");
        resp.amount = req.totalAmount;
         resp.amountPaise = amountPaise;
        resp.currency = order.get("currency");
        return resp;
    }

    public boolean verifyAndConfirmPayment(PaymentVerifyRequest req) throws Exception {
        // verify signature
        boolean ok = razorpayService.verifySignature(req.razorpayOrderId, req.razorpayPaymentId, req.razorpaySignature);
        if (!ok) return false;

        // update Payment by order id (safer)
        Payment payment = paymentRepo.findByRazorpayOrderId(req.razorpayOrderId)
                .orElseThrow(() -> new RuntimeException("Payment not found for order: " + req.razorpayOrderId));

        payment.setRazorpayPaymentId(req.razorpayPaymentId);
        payment.setRazorpaySignature(req.razorpaySignature);
        payment.setStatus(Payment.Status.SUCCESS);
        paymentRepo.save(payment);

        // update Booking
        Booking booking = payment.getBooking();
        booking.setPaymentStatus(Booking.PaymentStatus.SUCCESS);
        booking.setTransactionId(req.razorpayPaymentId);
        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        bookingRepo.save(booking);

        return true;
    }

    // webhook helper (verifies by orderId and updates if payment captured)
    public void handleWebhookPaymentCaptured(String razorpayOrderId, String razorpayPaymentId) {
        Payment payment = paymentRepo.findByRazorpayOrderId(razorpayOrderId).orElse(null);
        if (payment == null) return;
        payment.setRazorpayPaymentId(razorpayPaymentId);
        payment.setStatus(Payment.Status.SUCCESS);
        paymentRepo.save(payment);

        Booking booking = payment.getBooking();
        booking.setPaymentStatus(Booking.PaymentStatus.SUCCESS);
        booking.setTransactionId(razorpayPaymentId);
        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        bookingRepo.save(booking);
    }
}
