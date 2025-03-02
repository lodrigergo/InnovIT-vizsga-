/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.controller;

import com.backendvizsga.innovit_vizsga.config.JWT;
import com.backendvizsga.innovit_vizsga.model.Cars;
import com.backendvizsga.innovit_vizsga.model.Users;
import com.backendvizsga.innovit_vizsga.service.CarService;
import com.backendvizsga.innovit_vizsga.service.UserService;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
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
@Path("car")
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
    
    private Date parseYearString(String yearString) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy"); 
        return sdf.parse(yearString);
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
    
    @POST
    @Path("addCar")
    @Consumes(MediaType.APPLICATION_JSON)
    //@Produces(MediaType.APPLICATION_JSON)
    public Response addCar(String bodyString) throws ParseException {
        JSONObject body = new JSONObject(bodyString);
        
        String yearString = body.getString("year");
        Date year = parseYearString(yearString); // String -> Date átalakítás
        Cars c = new Cars(
                body.getString("brand"),
                body.getString("model"),
                body.getString("licensePlate"),
                year,
                body.getString("fuelType"),    
                body.getBigDecimal("price"),   
                body.getString("transmission"),    
                body.getInt("doors"),    
                body.getBoolean("AC"), 
                body.getInt("seat"),     
                body.getString("image")     
        );
        
        JSONObject obj = layer.addCar(c);
        return Response.status(obj.getInt("statusCode")).entity(obj.toString()).type(MediaType.APPLICATION_JSON).build();
    }
    
    @DELETE
    @Path("deleteCarById")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteCarById(@QueryParam("id") Integer id){
        Boolean response = layer.deleteCarById(id);
        JSONObject toReturn = new JSONObject();
        
        String result = "";
        
        if(response == false){
            result = "fail";
        } else{
            result = "success";
        }
        
        toReturn.put("result", result);
        
        return Response.status(Response.Status.OK).entity(toReturn.toString()).type(MediaType.APPLICATION_JSON).build();
                
    }
    
    @GET
    @Path("getAllCarsPage")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAllCarsPage(@HeaderParam("token") String jwt, @QueryParam("page") int page, @QueryParam("amount") int amount) {
        int isValid = JWT.validateJWT(jwt);

        if (isValid == 1) {
            
            JSONObject obj = layer.getAllCarsPage(page, amount);
            
            return Response.status(200).entity(obj.toString()).type(MediaType.APPLICATION_JSON).build();
        } else if (isValid == 2) {
            return Response.status(498).entity("InvalidToken").type(MediaType.APPLICATION_JSON).build();
        } else {
            return Response.status(401).entity("TokenExpired").type(MediaType.APPLICATION_JSON).build();
        }

    }
}
