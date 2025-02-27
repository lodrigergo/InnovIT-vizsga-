/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.service;

import java.math.BigDecimal;
import java.util.Date;
import org.json.JSONObject;

/**
 *
 * @author User
 */
public class CarServiceService {
    private CarService layer = new CarService();
    
     public JSONObject updateCarService(Integer carId, Date serviceDate, String description, BigDecimal cost) {
        JSONObject toReturn = new JSONObject();
        String status = "success";
        int statusCode = 200;

        try {
            if (serviceDate == null) {
                throw new IllegalArgumentException("Service date cannot be null.");
            }
            if (description == null || description.trim().isEmpty()) {
                throw new IllegalArgumentException("Description cannot be null or empty.");
            }
            if (cost == null || cost.compareTo(BigDecimal.ZERO) < 0) {
                throw new IllegalArgumentException("Cost cannot be null or negative.");
            }

            boolean result = layer.updateCarService(carId, serviceDate, description, cost);

            if (!result) {
                status = "error";
                statusCode = 500;
                toReturn.put("errorMessage", "Failed to update car service.");
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
