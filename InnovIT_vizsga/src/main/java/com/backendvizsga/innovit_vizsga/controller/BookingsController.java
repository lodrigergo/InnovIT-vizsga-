/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.controller;

import com.backendvizsga.innovit_vizsga.model.Bookings;
import com.backendvizsga.innovit_vizsga.service.BookingsService;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
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
}
