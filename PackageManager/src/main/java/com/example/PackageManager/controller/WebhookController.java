// com.example.PackageManager.controller.WebhookController.java
package com.example.PackageManager.controller;

import com.example.PackageManager.service.BookingService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Hex;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/webhook")
public class WebhookController {
    @Value("${razorpay.webhook_secret}")
    private String webhookSecret;

    @Autowired private BookingService bookingService;

    @PostMapping("/razorpay")
    public ResponseEntity<String> handleRazorpayWebhook(HttpServletRequest request,
                                                        @RequestHeader(value="X-Razorpay-Signature", required=false) String signature) throws Exception {
        String body = StreamUtils.copyToString(request.getInputStream(), StandardCharsets.UTF_8);

        // validate header present
        if (signature == null) return ResponseEntity.status(400).body("Missing signature header");

        // verify signature
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec(webhookSecret.getBytes(), "HmacSHA256");
        mac.init(secretKey);
        String generated = Hex.encodeHexString(mac.doFinal(body.getBytes()));

        if (!generated.equals(signature)) {
            return ResponseEntity.status(400).body("Invalid signature");
        }

        // parse payload
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> payload = mapper.readValue(body, Map.class);
        String event = (String) payload.get("event");
        Map<String, Object> payloadObj = (Map<String, Object>) payload.get("payload");

        if ("payment.captured".equals(event) || "payment.authorized".equals(event)) {
            Map<String, Object> payment = (Map<String, Object>) payloadObj.get("payment");
            Map<String, Object> entity = (Map<String, Object>) payment.get("entity");
            String razorpayOrderId = (String) entity.get("order_id");
            String razorpayPaymentId = (String) entity.get("id");

            // update booking/payment via service
            bookingService.handleWebhookPaymentCaptured(razorpayOrderId, razorpayPaymentId);
        }

        return ResponseEntity.ok("ok");
    }
}
