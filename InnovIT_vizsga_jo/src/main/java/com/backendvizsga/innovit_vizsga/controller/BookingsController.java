/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.controller;

import com.backendvizsga.innovit_vizsga.model.Bookings;
import com.backendvizsga.innovit_vizsga.service.BookingsService;
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
@Path("BookingsController")
public class BookingsController {

    @Context
    private UriInfo context;
    private BookingsService layer = new BookingsService();

    /**
     * Creates a new instance of BookingsController
     */
    public BookingsController() {
    }

    /**
     * Retrieves representation of an instance of com.backendvizsga.innovit_vizsga.controller.BookingsController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of BookingsController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    private Date parsepickupDateString(String pickupDateString) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX"); 
        return sdf.parse(pickupDateString);
    }
    
    private Date parsereturnDateString(String returnDateString) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX"); 
        return sdf.parse(returnDateString);
    }
    
    @POST
    @Path("addBookings")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addBookings(String bodyString) throws ParseException {
        JSONObject body = new JSONObject(bodyString);
        
        String pickupDateString = body.getString("pickupDate");
        Date pickupDate = parsepickupDateString(pickupDateString); 
        
         String returnDateString = body.getString("returnDate");
        Date returnDate = parsereturnDateString(returnDateString); 
        Bookings b = new Bookings(
                body.getInt("userId"),
                body.getInt("carId"),
                pickupDate,
                returnDate,
                body.getBigDecimal("totalPrice"),
                body.getBoolean("fullToFull")
        );
        
        JSONObject obj = layer.addBookings(b);
        return Response.status(obj.getInt("statusCode")).entity(obj.toString()).type(MediaType.APPLICATION_JSON).build();
    }
    
    @GET
    @Path("getAllBookings")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllBookings() {
        JSONObject responseObj = new JSONObject();

        try {
            
            ArrayList<Bookings> bookingList = layer.getAllBookings();  

            // Initialize a JSON array to store user data
            JSONArray carsArray = new JSONArray();

            // Iterate over the user list and convert each user to a JSONObject
            for (Bookings b : bookingList) {
                JSONObject bookingJson = new JSONObject();
                bookingJson.put("id", b.getId());
                bookingJson.put("userId",b.getUserId());
                bookingJson.put("carId", b.getCarId());
                bookingJson.put("pickupDate", b.getPickupDate());
                bookingJson.put("returnDate", b.getReturnDate());
                bookingJson.put("totalPrice", b.getTotalPrice());
                bookingJson.put("fullToFull", b.getFullToFulll());
                bookingJson.put("isDeleted", b.getIsDeleted());
                bookingJson.put("createdAt", b.getCreatedAt());
                bookingJson.put("deletedAt", b.getDeletedAt());  
               
             

                // Add the user JSON object to the array
                carsArray.put(bookingJson);
            }

            // Add the users array to the response object
            responseObj.put("statusCode", 200);
            responseObj.put("Bookings", carsArray);

            // Return the response with a 200 OK status
            return Response.ok(responseObj.toString(), MediaType.APPLICATION_JSON).build();

        } catch (Exception e) {
            // Handle any exceptions
            responseObj.put("statusCode", 500);
            responseObj.put("message", "Failed to retrieve bookings");
            responseObj.put("error", e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(responseObj.toString()).type(MediaType.APPLICATION_JSON).build();
        }
    }
    @GET
    @Path("getBookingByUserId")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getBookingByUserId(@QueryParam("user_id") Integer user_id) {
        Bookings response = layer.getBookingByUserId(user_id);
        if (response == null) {
            JSONObject error = new JSONObject();
            error.put("error", "Nem található foglalás ezzel a user_id-vel: " + user_id);
            return Response.status(Response.Status.NOT_FOUND).entity(error.toString()).type(MediaType.APPLICATION_JSON).build();
        }

        JSONObject toReturn = new JSONObject();
        toReturn.put("id", response.getId());
        toReturn.put("userId", response.getUserId());
        toReturn.put("carId", response.getCarId());
        toReturn.put("pickupDate", response.getPickupDate());
        toReturn.put("returnDate", response.getReturnDate());
        toReturn.put("totalPrice", response.getTotalPrice());
        toReturn.put("fullToFull", response.getFullToFulll());
        toReturn.put("isDeleted", response.getIsDeleted());
        toReturn.put("createdAt", response.getCreatedAt());
        toReturn.put("deletedAt", response.getDeletedAt());

        return Response.status(Response.Status.OK).entity(toReturn.toString()).type(MediaType.APPLICATION_JSON).build();
    }
     @GET
    @Path("getBookingById")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getBookingById(@QueryParam("id") Integer id){
        Bookings response = layer.getBookingById(id);
        JSONObject toReturn = new JSONObject();
        
        toReturn.put("id", response.getId());
        toReturn.put("userId", response.getUserId());
        toReturn.put("carId", response.getCarId());
        toReturn.put("pickupDate", response.getPickupDate());
        toReturn.put("returnDate", response.getReturnDate());
        toReturn.put("totalPrice", response.getTotalPrice());
        toReturn.put("fullToFull", response.getFullToFulll());
        toReturn.put("isDeleted", response.getIsDeleted());
        toReturn.put("createdAt", response.getCreatedAt());
        toReturn.put("deletedAt", response.getDeletedAt());

        
        return Response.status(Response.Status.OK).entity(toReturn.toString()).type(MediaType.APPLICATION_JSON).build();
                
    }
    @DELETE
    @Path("deleteBookingById")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteBookingById(@QueryParam("id") Integer id){
        Boolean response = layer.deleteBookingById(id);
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
    @Path("searchCarsBetweenDates")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchCarsBetweenDates(@QueryParam("pickupDate") String pickupDate, @QueryParam("returnDate") String returnDate) {
        JSONArray response = layer.searchCarsBetweenDates(pickupDate, returnDate);

        if (response != null) {
            return Response.status(Response.Status.OK).entity(response.toString()).type(MediaType.APPLICATION_JSON).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No cars found for the given date range.").type(MediaType.APPLICATION_JSON).build();
        }
    }
}

