/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.service;

import com.backendvizsga.innovit_vizsga.model.Cars;
import com.backendvizsga.innovit_vizsga.model.Users;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;

/**
 *
 * @author User
 */
public class CarService {
    
     private  Cars layer = new Cars();
     
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
     
     
    
    
   
    
}
