/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.service;

import com.backendvizsga.innovit_vizsga.model.Cars;
import com.backendvizsga.innovit_vizsga.model.Users;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import org.json.JSONObject;

/**
 *
 * @author User
 */
public class CarService {
    
     private  Cars layer = new Cars();
     
     private boolean isValidLicensePlate(String plate) {
    if (plate == null) {
        return false; // A null érték nem érvényes.
    }

    // Ellenőrizze a rendszám hosszát: 7 karakternek kell lennie (pl. ABC-123)
    if (plate.length() != 7) {
        return false;
    }

    // Karakterek ellenőrzése pozíció szerint
    for (int i = 0; i < 3; i++) { // Az első 3 karakternek nagybetűnek kell lennie
        if (!Character.isUpperCase(plate.charAt(i))) {
            return false;
        }
    }

    // Ellenőrizzük a kötőjelet a 4. pozíción
    if (plate.charAt(3) != '-') {
        return false;
    }

    // Az utolsó 3 karakternek számjegynek kell lennie
    for (int i = 4; i < 7; i++) {
        if (!Character.isDigit(plate.charAt(i))) {
            return false;
        }
    }

    // Ha minden feltétel teljesült
    return true;
}
     
     private void validateCarInputs(String brand, String model, String licensePlate, Date year, String fuelType, BigDecimal pricePerDay, String transmission, int doors, int seats, String image) {
    if (brand == null || brand.trim().isEmpty()) {
        throw new IllegalArgumentException("Brand cannot be null or empty.");
    }
    if (model == null || model.trim().isEmpty()) {
        throw new IllegalArgumentException("Model cannot be null or empty.");
    }
    licensePlate = licensePlate.trim();
    if (licensePlate == null || !isValidLicensePlate(licensePlate)) {
        throw new IllegalArgumentException("License plate must match the format ABC-123.");
    }
    if (year == null || year.after(new Date())) {
        throw new IllegalArgumentException("Year cannot be null or in the future.");
    }
    if (fuelType == null || (!fuelType.equalsIgnoreCase("PETROL") &&
                             !fuelType.equalsIgnoreCase("DIESEL") &&
                             !fuelType.equalsIgnoreCase("ELECTRIC") &&
                             !fuelType.equalsIgnoreCase("HYBRID"))) {
        throw new IllegalArgumentException("Invalid fuel type. Allowed values: PETROL, DIESEL, ELECTRIC, HYBRID.");
    }
    if (pricePerDay == null || pricePerDay.compareTo(BigDecimal.ZERO) <= 0) {
        throw new IllegalArgumentException("Price per day must be greater than zero.");
    }
    if (transmission == null || (!transmission.equalsIgnoreCase("MANUAL") && !transmission.equalsIgnoreCase("AUTOMATIC"))) {
        throw new IllegalArgumentException("Transmission must be either MANUAL or AUTOMATIC.");
    }
    if (doors <= 0) {
        throw new IllegalArgumentException("Doors must be a positive number.");
    }
    if (seats <= 0) {
        throw new IllegalArgumentException("Seats must be a positive number.");
    
    }
}
     
     public ArrayList<Cars> getAllCar() {
        ArrayList<Cars> carList = new ArrayList<>();
        try {
            carList = layer.getAllCar();

        } catch (Exception e) {
            System.err.println("Error fetching cars: " + e.getMessage());
        }

        return carList;
    }
    
    public Cars getCarById(Integer id){
        return layer.getCarById(id);
    }
    
    public ArrayList<Cars> getPage1() {
        ArrayList<Cars> carList = new ArrayList<>();
        try {
            carList = layer.getPage1();

        } catch (Exception e) {
            System.err.println("Error fetching cars: " + e.getMessage());
        }

        return carList;
    }
    
    public ArrayList<Cars> getPage2() {
        ArrayList<Cars> carList = new ArrayList<>();
        try {
            carList = layer.getPage2();

        } catch (Exception e) {
            System.err.println("Error fetching cars: " + e.getMessage());
        }

        return carList;
    }
    
     public ArrayList<Cars> getPageInput(Integer pageIN){
        return layer.getPageInput(pageIN);
    }
     
public JSONObject addCar(Cars c) {
    JSONObject toReturn = new JSONObject();
    String status = "success";
    int statusCode = 200;

    try {
        // Validáció meghívása
        validateCarInputs(c.getBrand(), c.getModel(), c.getLicensePlate(), c.getYear(), c.getFuelType(), 
                          c.getPricePerDay(), c.getTransmission(), c.getDoors(), c.getSeats(), c.getImage());

        // Adatbázis művelet meghívása (year most Integer)
        Boolean result = layer.addCar(c.getBrand(), c.getModel(), c.getLicensePlate(), 
                                     Integer.parseInt(new SimpleDateFormat("yyyy").format(c.getYear())), 
                                     c.getFuelType(), c.getPricePerDay(), c.getTransmission(), c.getDoors(), 
                                     c.getAc(), c.getSeats(), c.getImage());

        if (!result) {
            throw new Exception("Failed to add car to the database.");
        }

        toReturn.put("message", "Car added successfully");

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
    
    public Boolean deleteCarById(Integer id){
        Cars c = getCarById(id);
        
        if(c != null){
            return layer.deleteCarById(id);
        } else{
            System.err.println("A car nem létezik");
            return false;
        }
    }
     
     
    
    
   
    
}
