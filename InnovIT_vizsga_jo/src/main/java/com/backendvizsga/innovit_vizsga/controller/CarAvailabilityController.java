package com.backendvizsga.innovit_vizsga.controller;

import com.backendvizsga.innovit_vizsga.model.CarAvailability;
import com.backendvizsga.innovit_vizsga.service.CarAvailabilityService;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import org.json.JSONArray;
import org.json.JSONObject;

@Path("carAvailability")
public class CarAvailabilityController {

    @Context
    private UriInfo context;
    private CarAvailabilityService layer = new CarAvailabilityService();

    public CarAvailabilityController() {
    }

    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        throw new UnsupportedOperationException();
    }

    @PUT
    @Path("update")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateCarAvailability(
            @QueryParam("id") Integer id,
            @QueryParam("date") String dateStr,
            @QueryParam("status") Boolean status) {
        
        JSONObject responseObj = new JSONObject();

        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date date = sdf.parse(dateStr);
//            
//            Boolean result = layer.updateCarAvailability(id, date, status);
            
//            if (result) {
//                responseObj.put("statusCode", 200);
//                responseObj.put("message", "Availability updated successfully");
//            } else {
//                responseObj.put("statusCode", 400);
//                responseObj.put("message", "Failed to update availability");
//            }
//            
            return Response.ok(responseObj.toString(), MediaType.APPLICATION_JSON).build();
            
        } catch (Exception e) {
            responseObj.put("statusCode", 500);
            responseObj.put("message", "Error updating availability");
            responseObj.put("error", e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                          .entity(responseObj.toString())
                          .type(MediaType.APPLICATION_JSON)
                          .build();
        }
    }

    @GET
    @Path("getCarAvailabilityByCarId")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCarAvailabilityByCarId(@QueryParam("carId") Integer carId) {
        JSONObject responseObj = new JSONObject();

        try {
            ArrayList<CarAvailability> availabilityList = layer.getAvailabilityByCarId(carId);
            JSONArray availabilityArray = new JSONArray();

            for (CarAvailability ca : availabilityList) {
                JSONObject availabilityJson = new JSONObject();
                availabilityJson.put("id", ca.getId());
                availabilityJson.put("carId", ca.getCarId());
                availabilityJson.put("date", ca.getDate());
                availabilityJson.put("status", ca.getStatus());
                availabilityJson.put("isDeleted", ca.getIsDeleted());
                availabilityJson.put("createdAt", ca.getCreatedAt());
                availabilityJson.put("deletedAt", ca.getDeletedAt());
                availabilityArray.put(availabilityJson);
            }

            responseObj.put("statusCode", 200);
            responseObj.put("availability", availabilityArray);
            return Response.ok(responseObj.toString(), MediaType.APPLICATION_JSON).build();

        } catch (Exception e) {
            responseObj.put("statusCode", 500);
            responseObj.put("message", "Failed to retrieve availability");
            responseObj.put("error", e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                          .entity(responseObj.toString())
                          .type(MediaType.APPLICATION_JSON)
                          .build();
        }
    }
}