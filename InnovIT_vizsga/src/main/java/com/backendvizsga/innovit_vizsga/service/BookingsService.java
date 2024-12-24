/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.service;

import com.backendvizsga.innovit_vizsga.model.Bookings;
import java.math.BigDecimal;
import java.util.Date;
import org.json.JSONObject;

/**
 *
 * @author User
 */
public class BookingsService {
    
    private  Bookings layer = new Bookings();
    
    private void validateBookings(Integer user_id, Integer car_id, Date pickupDate, Date returnDate, BigDecimal totalPrice) {
    if (user_id == null || user_id <= 0) {
        throw new IllegalArgumentException("A user ID nem lehet null vagy kisebb, mint 1.");
    }
    if (car_id == null || car_id <= 0) {
        throw new IllegalArgumentException("A car ID nem lehet null vagy kisebb, mint 1.");
    }
    if (pickupDate == null || returnDate == null) {
        throw new IllegalArgumentException("A dátumok nem lehetnek null értékűek.");
    }
    if (returnDate.before(pickupDate)) {
        throw new IllegalArgumentException("A visszaadási dátumnak későbbinek kell lennie, mint a felvételi dátum.");
    }
    if (pickupDate.before(new Date())) {
        throw new IllegalArgumentException("A felvételi dátum nem lehet a múltban.");
    }
    if (totalPrice == null || totalPrice.compareTo(BigDecimal.ZERO) <= 0) {
        throw new IllegalArgumentException("Az összeg nem lehet null vagy kisebb egyenlő, mint 0.");
        }
    }
    
    public JSONObject addBookings(Bookings b) {
    JSONObject toReturn = new JSONObject();
    String status = "success";
    int statusCode = 200;
    
    try {
            
            validateBookings(b.getUserId(), b.getCarId(), b.getPickupDate(), b.getReturnDate(), b.getTotalPrice());

            
            System.out.println("Booking added successfully.");

        } catch (IllegalArgumentException e) {
            // Validációs hiba esetén visszatérés hibával
            status = "error";
            statusCode = 400;
            toReturn.put("errorMessage", e.getMessage());
        } catch (Exception e) {
            // Egyéb hibakezelés
            status = "error";
            statusCode = 500;
            toReturn.put("errorMessage", "Internal Server Error: " + e.getMessage());
        }
    
    toReturn.put("status", status);
    toReturn.put("statusCode", statusCode);
    return toReturn;
}
    
}
