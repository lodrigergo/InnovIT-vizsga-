/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.controller;

import com.backendvizsga.innovit_vizsga.service.PaymentService;
import java.math.BigDecimal;
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
@Path("payment")
public class PaymentController {

    @Context
    private UriInfo context;
     private PaymentService layer = new PaymentService();

    /**
     * Creates a new instance of PaymentController
     */
    public PaymentController() {
    }

    /**
     * Retrieves representation of an instance of com.backendvizsga.innovit_vizsga.controller.PaymentController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of PaymentController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    @PUT
    @Path("updatePaymentStatus")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updatePaymentStatus(@QueryParam("id") Integer id, String json) {
        JSONObject jsonObject = new JSONObject(json);
        JSONObject response = new JSONObject();

        try {
            String paymentStatus = jsonObject.getString("paymentStatus");

            response = layer.updatePaymentStatus(id, paymentStatus);

            if (response.getString("status").equals("success")) {
                return Response.status(Response.Status.OK).entity(response.toString()).type(MediaType.APPLICATION_JSON).build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST).entity(response.toString()).type(MediaType.APPLICATION_JSON).build();
            }

        } catch (JSONException e) {
            response.put("status", "error");
            response.put("statusCode", 400);
            response.put("errorMessage", "Invalid JSON format: " + e.getMessage());
            return Response.status(Response.Status.BAD_REQUEST).entity(response.toString()).type(MediaType.APPLICATION_JSON).build();
        } catch (Exception e) {
            response.put("status", "error");
            response.put("statusCode", 500);
            response.put("errorMessage", "Internal Server Error: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(response.toString()).type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @PUT
    @Path("updatePaymentCost")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updatePaymentCost(@QueryParam("id") Integer id, String json) {
        JSONObject jsonObject = new JSONObject(json);
        JSONObject response = new JSONObject();

        try {
            BigDecimal amount = jsonObject.getBigDecimal("amount");

            response = layer.updatePaymentCost(id, amount);

            if (response.getString("status").equals("success")) {
                return Response.status(Response.Status.OK).entity(response.toString()).type(MediaType.APPLICATION_JSON).build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST).entity(response.toString()).type(MediaType.APPLICATION_JSON).build();
            }

        } catch (JSONException e) {
            response.put("status", "error");
            response.put("statusCode", 400);
            response.put("errorMessage", "Invalid JSON format: " + e.getMessage());
            return Response.status(Response.Status.BAD_REQUEST).entity(response.toString()).type(MediaType.APPLICATION_JSON).build();
        } catch (Exception e) {
            response.put("status", "error");
            response.put("statusCode", 500);
            response.put("errorMessage", "Internal Server Error: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(response.toString()).type(MediaType.APPLICATION_JSON).build();
        }
    }
}
