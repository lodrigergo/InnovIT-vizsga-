/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.service;

import com.backendvizsga.innovit_vizsga.model.Payment;
import java.math.BigDecimal;
import org.json.JSONObject;

/**
 *
 * @author User
 */
public class PaymentService {
    private Payment layer = new Payment();
    
    public JSONObject updatePaymentStatus(Integer id, String paymentStatus) {
        JSONObject toReturn = new JSONObject();
        String status = "success";
        int statusCode = 200;

        try {
            if (paymentStatus == null || paymentStatus.trim().isEmpty()) {
                throw new IllegalArgumentException("Payment status cannot be null or empty.");
            }

            boolean result = layer.updatePaymentStatus(id, paymentStatus);

            if (!result) {
                status = "error";
                statusCode = 500;
                toReturn.put("errorMessage", "Failed to update payment status.");
            }

        } catch (IllegalArgumentException e) {
            status = "error";
            statusCode = 400;
            toReturn.put("errorMessage", e.getMessage());
        } catch (Exception e) {
            status = "error";
            statusCode = 500;
            toReturn.put("errorMessage", "Internal Server Error: " + e.getMessage());
        }

        toReturn.put("status", status);
        toReturn.put("statusCode", statusCode);
        return toReturn;
    }
    
     public JSONObject updatePaymentCost(Integer id, BigDecimal amount) {
        JSONObject toReturn = new JSONObject();
        String status = "success";
        int statusCode = 200;

        try {
            if (amount == null || amount.compareTo(BigDecimal.ZERO) < 0) {
                throw new IllegalArgumentException("Amount cannot be null or negative.");
            }

            boolean result = layer.updatePaymentCost(id, amount);

            if (!result) {
                status = "error";
                statusCode = 500;
                toReturn.put("errorMessage", "Failed to update payment cost.");
            }

        } catch (IllegalArgumentException e) {
            status = "error";
            statusCode = 400;
            toReturn.put("errorMessage", e.getMessage());
        } catch (Exception e) {
            status = "error";
            statusCode = 500;
            toReturn.put("errorMessage", "Internal Server Error: " + e.getMessage());
        }

        toReturn.put("status", status);
        toReturn.put("statusCode", statusCode);
        return toReturn;
    }

    
}
