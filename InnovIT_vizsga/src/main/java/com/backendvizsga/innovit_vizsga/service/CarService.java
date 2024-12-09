/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.service;

import com.backendvizsga.innovit_vizsga.model.Cars;
import com.backendvizsga.innovit_vizsga.model.Users;

/**
 *
 * @author User
 */
public class CarService {
    
     private  Cars layer = new Cars();
    
    public Cars getCarById(Integer id){
        return layer.getCarById(id);
    }
    
   
    
}
