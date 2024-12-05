/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.controller;

import com.backendvizsga.innovit_vizsga.config.JWT;
import com.backendvizsga.innovit_vizsga.model.Users;
import com.backendvizsga.innovit_vizsga.service.UserService;
import static com.sun.org.apache.xerces.internal.util.XMLChar.isValid;
import static com.sun.org.apache.xml.internal.utils.XMLChar.isValid;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONObject;
import static sun.security.krb5.internal.crypto.KeyUsage.isValid;

/**
 * REST Web Service
 *
 * @author User
 */
@Path("UserController")
public class UserControllerResource {

    @Context
    private UriInfo context;
    private UserService layer = new UserService();

    /**
     * Creates a new instance of UserControllerResource
     */
    public UserControllerResource() {
    }

    /**
     * Retrieves representation of an instance of com.backendvizsga.innovit_vizsga.controller.UserControllerResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of UserControllerResource
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
     @GET
    @Path("getAllUser")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    //@Produces(MediaType.APPLICATION_JSON)
    public Response getAllUser(@HeaderParam("token")String jwt) {
        int isValid = JWT.validateJWT(jwt);
        
        if(isValid == 1){
            JSONObject obj = layer.getAllUser();
            return Response.status(obj.getInt("statusCode")).entity(obj.toString()).type(MediaType.APPLICATION_JSON).build();
        }else if (isValid == 2){
            return Response.status(400).entity("InvalidToken").type(MediaType.APPLICATION_JSON).build();
        }else{
            return Response.status((400)).entity("TokenExpireds").type(MediaType.APPLICATION_JSON).build();
        }
    }
    
     @GET
    @Path("getAllAdmin")
    @Consumes(MediaType.APPLICATION_JSON)
    //@Produces(MediaType.APPLICATION_JSON)
    public Response getAllAdmin(@HeaderParam("token")String jwt) {
        int isValid = JWT.validateJWT(jwt);
        
        if(isValid == 1){
            JSONObject obj = layer.getAllAdmin();
            return Response.status(obj.getInt("statusCode")).entity(obj.toString()).type(MediaType.APPLICATION_JSON).build();
        }else if (isValid == 2){
            return Response.status(400).entity("InvalidToken").type(MediaType.APPLICATION_JSON).build();
        }else{
            return Response.status((400)).entity("TokenExpireds").type(MediaType.APPLICATION_JSON).build();
        }
    }
    
     @GET
    @Path("getUserById")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getUserById(@QueryParam("id") Integer id){
        Users response = layer.getUserById(id);
        JSONObject toReturn = new JSONObject();
        
        toReturn.put("id", response.getId());
        toReturn.put("name", response.getName());
        toReturn.put("email", response.getEmail());
        toReturn.put("password", response.getPassword());
        toReturn.put("personalId", response.getPersonalId());
        toReturn.put("isAdmin", response.getIsAdmin());
        toReturn.put("isDeleted", response.getIsDeleted());
        
        return Response.status(Response.Status.OK).entity(toReturn.toString()).type(MediaType.APPLICATION_JSON).build();
                
    }
    
     @GET
    @Path("getUserDetailsByCarId")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getUserDetailsByCarId(@QueryParam("car_id") Integer car_id){
        Users response = layer.getUserDetailsByCarId(car_id);
        JSONObject toReturn = new JSONObject();
        
        toReturn.put("id", response.getId());
        toReturn.put("name", response.getName());
        toReturn.put("email", response.getEmail());
        toReturn.put("password", response.getPassword());
        toReturn.put("personalId", response.getPersonalId());
        toReturn.put("isAdmin", response.getIsAdmin());
        toReturn.put("isDeleted", response.getIsDeleted());
        
        return Response.status(Response.Status.OK).entity(toReturn.toString()).type(MediaType.APPLICATION_JSON).build();
                
    }
  @POST
    @Path("registerUser")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response registerUser(String bodyString){
        JSONObject body = new JSONObject(bodyString);
        
        Users u = new Users(
                body.getString("name"),
                body.getString("email"),
                body.getString("password"),
                body.getString("personal_id"),
                body.getBoolean("isAdmin")
        );
        
        JSONObject obj = layer.registerUser(u);
        return Response.status(obj.getInt("statusCode")).entity(obj.toString()).type(MediaType.APPLICATION_JSON).build();
    }
   
    
    
    
}
