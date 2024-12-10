/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.controller;

import com.backendvizsga.innovit_vizsga.model.Cars;
import com.backendvizsga.innovit_vizsga.model.Users;
import com.backendvizsga.innovit_vizsga.service.CarService;
import com.backendvizsga.innovit_vizsga.service.UserService;
import java.util.ArrayList;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * REST Web Service
 *
 * @author User
 */
@Path("CarController")
public class CarController {

    @Context
    private UriInfo context;
    private CarService layer = new CarService();

    /**
     * Creates a new instance of CarController
     */
    public CarController() {
    }

    /**
     * Retrieves representation of an instance of com.backendvizsga.innovit_vizsga.controller.CarController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of CarController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    @GET
    @Path("getAllCar")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCar() {
        JSONObject responseObj = new JSONObject();

        try {
            
            ArrayList<Cars> carList = layer.getAllCar();  

            // Initialize a JSON array to store user data
            JSONArray carsArray = new JSONArray();

            // Iterate over the user list and convert each user to a JSONObject
            for (Cars c : carList) {
                JSONObject carJson = new JSONObject();
                carJson.put("id", c.getId());
                carJson.put("brand",c.getBrand());
                carJson.put("model", c.getModel());
                carJson.put("licensePlate", c.getLicensePlate());
                carJson.put("year",c.getYear());
                carJson.put("fuelType", c.getFuelType());  
                carJson.put("pricePerDay", c.getPricePerDay());  
                carJson.put("transmission", c.getTransmission());  
                carJson.put("doors", c.getDoors());  
                carJson.put("AC", c.getAc());  
                carJson.put("seats", c.getSeats());  
                carJson.put("image", c.getImage());  
               
                carJson.put("isDeleted", c.getIsDeleted());  
                carJson.put("createdAt", c.getCreatedAt());
                carJson.put("deletedAt", c.getDeletedAt());
             

                // Add the user JSON object to the array
                carsArray.put(carJson);
            }

            // Add the users array to the response object
            responseObj.put("statusCode", 200);
            responseObj.put("cars", carsArray);

            // Return the response with a 200 OK status
            return Response.ok(responseObj.toString(), MediaType.APPLICATION_JSON).build();

        } catch (Exception e) {
            // Handle any exceptions
            responseObj.put("statusCode", 500);
            responseObj.put("message", "Failed to retrieve cars");
            responseObj.put("error", e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(responseObj.toString()).type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @GET
    @Path("getCarById")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getCarById(@QueryParam("id") Integer id){
        Cars response = layer.getCarById(id);
        JSONObject toReturn = new JSONObject();
        
        toReturn.put("id", response.getId());
        toReturn.put("brand", response.getBrand());
        toReturn.put("model", response.getModel());
        toReturn.put("licensePlate", response.getLicensePlate());
        toReturn.put("year", response.getYear());
        toReturn.put("fuelType", response.getFuelType());
        toReturn.put("pricePerDay", response.getPricePerDay());
        toReturn.put("transmission", response.getTransmission());
        toReturn.put("doors", response.getDoors());
        toReturn.put("AC", response.getAc());
        toReturn.put("seats", response.getSeats());
        toReturn.put("image", response.getImage());
        toReturn.put("isDeleted", response.getIsDeleted());
        toReturn.put("createdAt", response.getCreatedAt());
        toReturn.put("deletedAt", response.getDeletedAt());
        
        return Response.status(Response.Status.OK).entity(toReturn.toString()).type(MediaType.APPLICATION_JSON).build();
                
    }
    
    @GET
    @Path("getPage1")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPage1() {
        JSONObject responseObj = new JSONObject();

        try {
            
            ArrayList<Cars> carList = layer.getPage1();  

            // Initialize a JSON array to store user data
            JSONArray carsArray = new JSONArray();

            // Iterate over the user list and convert each user to a JSONObject
            for (Cars c : carList) {
                JSONObject carJson = new JSONObject();
                carJson.put("id", c.getId());
                carJson.put("brand",c.getBrand());
                carJson.put("model", c.getModel());
                carJson.put("licensePlate", c.getLicensePlate());
                carJson.put("year",c.getYear());
                carJson.put("fuelType", c.getFuelType());  
                carJson.put("pricePerDay", c.getPricePerDay());  
                carJson.put("transmission", c.getTransmission());  
                carJson.put("doors", c.getDoors());  
                carJson.put("AC", c.getAc());  
                carJson.put("seats", c.getSeats());  
                carJson.put("image", c.getImage());  
               
                carJson.put("isDeleted", c.getIsDeleted());  
                carJson.put("createdAt", c.getCreatedAt());
                carJson.put("deletedAt", c.getDeletedAt());
             

                // Add the user JSON object to the array
                carsArray.put(carJson);
            }

            // Add the users array to the response object
            responseObj.put("statusCode", 200);
            responseObj.put("cars", carsArray);

            // Return the response with a 200 OK status
            return Response.ok(responseObj.toString(), MediaType.APPLICATION_JSON).build();

        } catch (Exception e) {
            // Handle any exceptions
            responseObj.put("statusCode", 500);
            responseObj.put("message", "Failed to retrieve cars");
            responseObj.put("error", e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(responseObj.toString()).type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @GET
    @Path("getPage2")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPage2() {
        JSONObject responseObj = new JSONObject();

        try {
            
            ArrayList<Cars> carList = layer.getPage2();  

            // Initialize a JSON array to store user data
            JSONArray carsArray = new JSONArray();

            // Iterate over the user list and convert each user to a JSONObject
            for (Cars c : carList) {
                JSONObject carJson = new JSONObject();
                carJson.put("id", c.getId());
                carJson.put("brand",c.getBrand());
                carJson.put("model", c.getModel());
                carJson.put("licensePlate", c.getLicensePlate());
                carJson.put("year",c.getYear());
                carJson.put("fuelType", c.getFuelType());  
                carJson.put("pricePerDay", c.getPricePerDay());  
                carJson.put("transmission", c.getTransmission());  
                carJson.put("doors", c.getDoors());  
                carJson.put("AC", c.getAc());  
                carJson.put("seats", c.getSeats());  
                carJson.put("image", c.getImage());  
               
                carJson.put("isDeleted", c.getIsDeleted());  
                carJson.put("createdAt", c.getCreatedAt());
                carJson.put("deletedAt", c.getDeletedAt());
             

                // Add the user JSON object to the array
                carsArray.put(carJson);
            }

            // Add the users array to the response object
            responseObj.put("statusCode", 200);
            responseObj.put("cars", carsArray);

            // Return the response with a 200 OK status
            return Response.ok(responseObj.toString(), MediaType.APPLICATION_JSON).build();

        } catch (Exception e) {
            // Handle any exceptions
            responseObj.put("statusCode", 500);
            responseObj.put("message", "Failed to retrieve cars");
            responseObj.put("error", e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(responseObj.toString()).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @GET
    @Path("getPageInput")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPageInput() {
        JSONObject responseObj = new JSONObject();

        try {
            
            ArrayList<Cars> carList = layer.getPageInput(Integer.SIZE);  

            // Initialize a JSON array to store user data
            JSONArray carsArray = new JSONArray();

            // Iterate over the user list and convert each user to a JSONObject
            for (Cars c : carList) {
                JSONObject carJson = new JSONObject();
                carJson.put("id", c.getId());
                carJson.put("brand",c.getBrand());
                carJson.put("model", c.getModel());
                carJson.put("licensePlate", c.getLicensePlate());
                carJson.put("year",c.getYear());
                carJson.put("fuelType", c.getFuelType());  
                carJson.put("pricePerDay", c.getPricePerDay());  
                carJson.put("transmission", c.getTransmission());  
                carJson.put("doors", c.getDoors());  
                carJson.put("AC", c.getAc());  
                carJson.put("seats", c.getSeats());  
                carJson.put("image", c.getImage());  
               
                carJson.put("isDeleted", c.getIsDeleted());  
                carJson.put("createdAt", c.getCreatedAt());
                carJson.put("deletedAt", c.getDeletedAt());
             

                // Add the user JSON object to the array
                carsArray.put(carJson);
            }

            // Add the users array to the response object
            responseObj.put("statusCode", 200);
            responseObj.put("cars", carsArray);

            // Return the response with a 200 OK status
            return Response.ok(responseObj.toString(), MediaType.APPLICATION_JSON).build();

        } catch (Exception e) {
            // Handle any exceptions
            responseObj.put("statusCode", 500);
            responseObj.put("message", "Failed to retrieve cars");
            responseObj.put("error", e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(responseObj.toString()).type(MediaType.APPLICATION_JSON).build();
        }
    }
    
}
