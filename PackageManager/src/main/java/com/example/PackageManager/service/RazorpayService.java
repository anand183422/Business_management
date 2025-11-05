package com.example.PackageManager.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Hex;

@Service
public class RazorpayService {
    @Value("${razorpay.key_id}")
    private String keyId;
    @Value("${razorpay.key_secret}")
    private String keySecret;

    public Order createOrder(long amountPaise, String receipt) throws Exception {
        RazorpayClient client = new RazorpayClient(keyId, keySecret);
        JSONObject options = new JSONObject();
        options.put("amount", amountPaise);
        options.put("currency", "INR");
        options.put("receipt", receipt);
        options.put("payment_capture", 1); // auto-capture
        return client.orders.create(options);

    }

    public boolean verifySignature(String orderId, String paymentId, String signature) throws Exception {
    String payload = orderId + "|" + paymentId;

    Mac mac = Mac.getInstance("HmacSHA256");
    SecretKeySpec secretKeySpec = new SecretKeySpec(keySecret.getBytes(), "HmacSHA256");
    mac.init(secretKeySpec);

    byte[] digest = mac.doFinal(payload.getBytes());
    String generatedSignature = Hex.encodeHexString(digest);

    System.out.println("Generated Signature: " + generatedSignature);
    System.out.println("Received Signature: " + signature);

    // Always compare ignoring case
    return generatedSignature.equalsIgnoreCase(signature);
}

}
