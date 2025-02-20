<<<<<<< HEAD
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
import java.util.ArrayList;
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
import static sun.security.krb5.internal.crypto.KeyUsage.isValid;

/**
 * REST Web Service
 *
 * @author User
 */
@Path("user")
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
    
    @POST
    @Path("login")
    @Consumes(MediaType.APPLICATION_JSON)
    //@Produces(MediaType.APPLICATION_JSON)
    public Response login(String bodyString) {
        JSONObject body = new JSONObject(bodyString);
        
        JSONObject obj = layer.login(body.getString("email"), body.getString("password"));
        return Response.status(obj.getInt("statusCode")).entity(obj.toString()).type(MediaType.APPLICATION_JSON).build();
    }   
    
    @GET
    @Path("getAllUser")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUser() {
        JSONObject responseObj = new JSONObject();

        try {
            // Call the service to get the list of users
            ArrayList<Users> userList = layer.getAllUser();  // Assuming layer.getAllUsers() returns an ArrayList<User>

            // Initialize a JSON array to store user data
            JSONArray usersArray = new JSONArray();

            // Iterate over the user list and convert each user to a JSONObject
            for (Users u : userList) {
                JSONObject userJson = new JSONObject();
                userJson.put("id", u.getId());
                userJson.put("name",u.getName());
                userJson.put("email", u.getEmail());
                userJson.put("password", u.getPassword());
                userJson.put("personalId",u.getPersonalId());
                userJson.put("isAdmin", u.getIsAdmin());  // Method to get boolean field isAdmin
               
                userJson.put("isDeleted", u.getIsDeleted());  // Method to get boolean field isDeleted
                userJson.put("createdAt", u.getCreatedAt());
                userJson.put("deletedAt", u.getDeletedAt());
             

                // Add the user JSON object to the array
                usersArray.put(userJson);
            }

            // Add the users array to the response object
            responseObj.put("statusCode", 200);
            responseObj.put("users", usersArray);

            // Return the response with a 200 OK status
            return Response.ok(responseObj.toString(), MediaType.APPLICATION_JSON).build();

        } catch (Exception e) {
            // Handle any exceptions
            responseObj.put("statusCode", 500);
            responseObj.put("message", "Failed to retrieve users");
            responseObj.put("error", e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(responseObj.toString()).type(MediaType.APPLICATION_JSON).build();
        }
    }

    
     @GET
    @Path("getAllAdmin")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllAdmin() {
        JSONObject responseObj = new JSONObject();

        try {
            // Call the service to get the list of users
            ArrayList<Users> userList = layer.getAllAdmin();  // Assuming layer.getAllUsers() returns an ArrayList<User>

            // Initialize a JSON array to store user data
            JSONArray usersArray = new JSONArray();

            // Iterate over the user list and convert each user to a JSONObject
            for (Users u : userList) {
                JSONObject userJson = new JSONObject();
                userJson.put("id", u.getId());
                userJson.put("name",u.getName());
                userJson.put("email", u.getEmail());
                userJson.put("password", u.getPassword());
                userJson.put("personalId",u.getPersonalId());
                userJson.put("isAdmin", u.getIsAdmin());  // Method to get boolean field isAdmin
               
                userJson.put("isDeleted", u.getIsDeleted());  // Method to get boolean field isDeleted
                userJson.put("createdAt", u.getCreatedAt());
                userJson.put("deletedAt", u.getDeletedAt());
             

                // Add the user JSON object to the array
                usersArray.put(userJson);
            }

            // Add the users array to the response object
            responseObj.put("statusCode", 200);
            responseObj.put("users", usersArray);

            // Return the response with a 200 OK status
            return Response.ok(responseObj.toString(), MediaType.APPLICATION_JSON).build();

        } catch (Exception e) {
            // Handle any exceptions
            responseObj.put("statusCode", 500);
            responseObj.put("message", "Failed to retrieve admins");
            responseObj.put("error", e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(responseObj.toString()).type(MediaType.APPLICATION_JSON).build();
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
        toReturn.put("createdAt", response.getCreatedAt());
        toReturn.put("deletedAt", response.getDeletedAt());

        
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
        toReturn.put("createdAt", response.getCreatedAt());
        toReturn.put("deletedAt", response.getDeletedAt());
        
        return Response.status(Response.Status.OK).entity(toReturn.toString()).type(MediaType.APPLICATION_JSON).build();
                
    }
    
    
    @POST
    @Path("registerUser")
    @Consumes(MediaType.APPLICATION_JSON)
    //@Produces(MediaType.APPLICATION_JSON)
    public Response registerUser(String bodyString) {
        JSONObject body = new JSONObject(bodyString);
        
        Users u = new Users(
                body.getString("name"),
                body.getString("email"),
                body.getString("password"),
                body.getString("personalId")     
        );
        
        JSONObject obj = layer.registerUser(u);
        return Response.status(obj.getInt("statusCode")).entity(obj.toString()).type(MediaType.APPLICATION_JSON).build();
    }
    
    @POST
    @Path("deleteUserById")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteUserById(@QueryParam("id") Integer id){
        Boolean response = layer.deleteUserById(id);
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
   
    @PUT
    @Path("changePassword")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response changePassword(@HeaderParam("token") String jwt, @QueryParam("userId") Integer userId, String bodyString) {
        int isValid = JWT.validateJWT(jwt);

        if (isValid == 1) {
            Users user = layer.getUserById(JWT.getUserIdByToken(jwt));
            JSONObject obj = new JSONObject();
        obj.put("userId", user.getUserById(userId));
        obj.put("name", user.getName());
            return Response.status(obj.getInt("statusCode")).entity(obj.toString()).type(MediaType.APPLICATION_JSON).build();
        } else if (isValid == 2) {
            return Response.status(498).entity("InvalidToken").type(MediaType.APPLICATION_JSON).build();
        } else {
            return Response.status(401).entity("TokenExpired").type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @POST
    @Path("sendEmail")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response sendEmail(@HeaderParam("token") String jwt, String bodyString) {
        int isValid = JWT.validateJWT(jwt);

        if (isValid == 1) {
            JSONObject body = new JSONObject(bodyString);
            
            Boolean obj = Users.sendEmail(body.getString("to"), body.getBoolean("ccMe"));
            return Response.status(200).entity(obj.toString()).type(MediaType.APPLICATION_JSON).build();
        } else if (isValid == 2) {
            return Response.status(498).entity("InvalidToken").type(MediaType.APPLICATION_JSON).build();
        } else {
            return Response.status(401).entity("TokenExpired").type(MediaType.APPLICATION_JSON).build();
        }

    }
    
    
    
}
=======
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
import java.util.ArrayList;
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
import static sun.security.krb5.internal.crypto.KeyUsage.isValid;

/**
 * REST Web Service
 *
 * @author User
 */
@Path("user")
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
    
    @POST
    @Path("login")
    @Consumes(MediaType.APPLICATION_JSON)
    //@Produces(MediaType.APPLICATION_JSON)
    public Response login(String bodyString) {
        JSONObject body = new JSONObject(bodyString);
        
        JSONObject obj = layer.login(body.getString("email"), body.getString("password"));
        return Response.status(obj.getInt("statusCode")).entity(obj.toString()).type(MediaType.APPLICATION_JSON).build();
    }
    
    @GET
    @Path("getAllUser")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUser() {
        JSONObject responseObj = new JSONObject();

        try {
            // Call the service to get the list of users
            ArrayList<Users> userList = layer.getAllUser();  // Assuming layer.getAllUsers() returns an ArrayList<User>

            // Initialize a JSON array to store user data
            JSONArray usersArray = new JSONArray();

            // Iterate over the user list and convert each user to a JSONObject
            for (Users u : userList) {
                JSONObject userJson = new JSONObject();
                userJson.put("id", u.getId());
                userJson.put("name",u.getName());
                userJson.put("email", u.getEmail());
                userJson.put("password", u.getPassword());
                userJson.put("personalId",u.getPersonalId());
                userJson.put("isAdmin", u.getIsAdmin());  // Method to get boolean field isAdmin
               
                userJson.put("isDeleted", u.getIsDeleted());  // Method to get boolean field isDeleted
                userJson.put("createdAt", u.getCreatedAt());
                userJson.put("deletedAt", u.getDeletedAt());
             

                // Add the user JSON object to the array
                usersArray.put(userJson);
            }

            // Add the users array to the response object
            responseObj.put("statusCode", 200);
            responseObj.put("users", usersArray);

            // Return the response with a 200 OK status
            return Response.ok(responseObj.toString(), MediaType.APPLICATION_JSON).build();

        } catch (Exception e) {
            // Handle any exceptions
            responseObj.put("statusCode", 500);
            responseObj.put("message", "Failed to retrieve users");
            responseObj.put("error", e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(responseObj.toString()).type(MediaType.APPLICATION_JSON).build();
        }
    }

    
     @GET
    @Path("getAllAdmin")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllAdmin() {
        JSONObject responseObj = new JSONObject();

        try {
            // Call the service to get the list of users
            ArrayList<Users> userList = layer.getAllAdmin();  // Assuming layer.getAllUsers() returns an ArrayList<User>

            // Initialize a JSON array to store user data
            JSONArray usersArray = new JSONArray();

            // Iterate over the user list and convert each user to a JSONObject
            for (Users u : userList) {
                JSONObject userJson = new JSONObject();
                userJson.put("id", u.getId());
                userJson.put("name",u.getName());
                userJson.put("email", u.getEmail());
                userJson.put("password", u.getPassword());
                userJson.put("personalId",u.getPersonalId());
                userJson.put("isAdmin", u.getIsAdmin());  // Method to get boolean field isAdmin
               
                userJson.put("isDeleted", u.getIsDeleted());  // Method to get boolean field isDeleted
                userJson.put("createdAt", u.getCreatedAt());
                userJson.put("deletedAt", u.getDeletedAt());
             

                // Add the user JSON object to the array
                usersArray.put(userJson);
            }

            // Add the users array to the response object
            responseObj.put("statusCode", 200);
            responseObj.put("users", usersArray);

            // Return the response with a 200 OK status
            return Response.ok(responseObj.toString(), MediaType.APPLICATION_JSON).build();

        } catch (Exception e) {
            // Handle any exceptions
            responseObj.put("statusCode", 500);
            responseObj.put("message", "Failed to retrieve admins");
            responseObj.put("error", e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(responseObj.toString()).type(MediaType.APPLICATION_JSON).build();
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
        toReturn.put("createdAt", response.getCreatedAt());
        toReturn.put("deletedAt", response.getDeletedAt());

        
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
        toReturn.put("createdAt", response.getCreatedAt());
        toReturn.put("deletedAt", response.getDeletedAt());
        
        return Response.status(Response.Status.OK).entity(toReturn.toString()).type(MediaType.APPLICATION_JSON).build();
                
    }
    
    
    @POST
    @Path("registerUser")
    @Consumes(MediaType.APPLICATION_JSON)
    //@Produces(MediaType.APPLICATION_JSON)
    public Response registerUser(String bodyString) {
        JSONObject body = new JSONObject(bodyString);
        
        Users u = new Users(
                body.getString("name"),
                body.getString("email"),
                body.getString("password"),
                body.getString("personalId")     
        );
        
        JSONObject obj = layer.registerUser(u);
        return Response.status(obj.getInt("statusCode")).entity(obj.toString()).type(MediaType.APPLICATION_JSON).build();
    }
    
    @DELETE
    @Path("deleteUserById")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteUserById(@QueryParam("id") Integer id){
        Boolean response = layer.deleteUserById(id);
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
   
    
    
    
}
>>>>>>> parent of 058b7b6 (login javítás)
