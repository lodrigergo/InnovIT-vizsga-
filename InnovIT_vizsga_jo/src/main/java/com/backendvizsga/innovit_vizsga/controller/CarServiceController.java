/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.controller;

import com.backendvizsga.innovit_vizsga.service.CarServiceService;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * REST Web Service
 *
 * @author User
 */
@Path("carService")
public class CarServiceController {

    @Context
    private UriInfo context;
    private CarServiceService layer = new CarServiceService();

    /**
     * Creates a new instance of CarServiceController
     */
    public CarServiceController() {
    }

    /**
     * Retrieves representation of an instance of com.backendvizsga.innovit_vizsga.controller.CarServiceController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of CarServiceController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
//    @PUT
//    @Path("updateCarService")
//    @Consumes(MediaType.APPLICATION_JSON)
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response updateCarService(@QueryParam("carId") Integer carId, String json) {
//        JSONObject jsonObject = new JSONObject(json);
//        JSONObject response = new JSONObject();
//
//        try {
//            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            Date serviceDate = sdf.parse(jsonObject.getString("serviceDate"));
//            String description = jsonObject.getString("description");
//            BigDecimal cost = jsonObject.getBigDecimal("cost");
//
//            response = layer.updateCarService(carId, serviceDate, description, cost);
//
//            if (response.getString("status").equals("success")) {
//                return Response.status(Response.Status.OK).entity(response.toString()).type(MediaType.APPLICATION_JSON).build();
//            } else {
//                return Response.status(Response.Status.BAD_REQUEST).entity(response.toString()).type(MediaType.APPLICATION_JSON).build();
//            }
//
//        } catch (java.text.ParseException e) {
//            response.put("status", "error");
//            response.put("statusCode", 400);
//            response.put("errorMessage", "Invalid date format. ExpectedTimeControl-MM-dd HH:mm:ss");
//            return Response.status(Response.Status.BAD_REQUEST).entity(response.toString()).type(MediaType.APPLICATION_JSON).build();
//        } catch (JSONException e) {
//            response.put("status", "error");
//            response.put("statusCode", 400);
//            response.put("errorMessage", "Invalid JSON format: " + e.getMessage());
//            return Response.status(Response.Status.BAD_REQUEST).entity(response.toString()).type(MediaType.APPLICATION_JSON).build();
//        } catch (Exception e) {
//            response.put("status", "error");
//            response.put("statusCode", 500);
//            response.put("errorMessage", "Internal Server Error: " + e.getMessage());
//            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(response.toString()).type(MediaType.APPLICATION_JSON).build();
//        }
//    }
}
