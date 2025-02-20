/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.controller;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author User
 */
@javax.ws.rs.ApplicationPath("webresources")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(com.backendvizsga.innovit_vizsga.controller.BookingXCarExtrasController.class);
        resources.add(com.backendvizsga.innovit_vizsga.controller.BookingsController.class);
        resources.add(com.backendvizsga.innovit_vizsga.controller.CarAvailabilityController.class);
        resources.add(com.backendvizsga.innovit_vizsga.controller.CarController.class);
        resources.add(com.backendvizsga.innovit_vizsga.controller.CarExtrasController.class);
        resources.add(com.backendvizsga.innovit_vizsga.controller.CarServiceController.class);
        resources.add(com.backendvizsga.innovit_vizsga.controller.GenericResource.class);
        resources.add(com.backendvizsga.innovit_vizsga.controller.LoginController.class);
        resources.add(com.backendvizsga.innovit_vizsga.controller.PaymentController.class);
        resources.add(com.backendvizsga.innovit_vizsga.controller.RegisterController.class);
        resources.add(com.backendvizsga.innovit_vizsga.controller.UserControllerResource.class);
    }
    
}
