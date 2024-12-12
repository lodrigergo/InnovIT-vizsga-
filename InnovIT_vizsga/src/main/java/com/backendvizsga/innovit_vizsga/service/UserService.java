/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.service;

import com.backendvizsga.innovit_vizsga.config.JWT;
import com.backendvizsga.innovit_vizsga.model.Users;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONObject;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.json.JSONArray;

/**
 *
 * @author User
 */
public class UserService {
    private final  Users layer = new Users();
    private static final String EMAIL_REGEX = "^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
    
    public static boolean isValidEmail(String email) {
        Pattern pattern = Pattern.compile(EMAIL_REGEX);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public static boolean isValidPassword(String password) {
        // Ellenőrzi, hogy legalább 8 karakter hosszú-e
        if (password.length() < 8) {
            return false;
        }

        // Kisbetűk, nagybetűk, számok és speciális karakterek mintázatai
        Pattern lowercase = Pattern.compile("[a-z]");
        Pattern uppercase = Pattern.compile("[A-Z]");
        Pattern digit = Pattern.compile("\\d");
        Pattern specialChar = Pattern.compile("[^a-zA-Z0-9]");

        // Ellenőrzi, hogy mindegyik feltétel teljesül-e
        boolean hasLowercase = lowercase.matcher(password).find();
        boolean hasUppercase = uppercase.matcher(password).find();
        boolean hasDigit = digit.matcher(password).find();
        boolean hasSpecialChar = specialChar.matcher(password).find();

        return hasLowercase && hasUppercase && hasDigit && hasSpecialChar;
    }
    
    public Users login_old(String email, String password){
        return layer.login(email, password);
    }
    
    public JSONObject login(String email, String password) {
    JSONObject toReturn = new JSONObject();
    String status = "success";
    int statusCode = 200;

    if (isValidEmail(email)) {
        Users modelResult = layer.login(email, password);

        if (modelResult == null) {
            status = "modelException";
            statusCode = 417;
        } else {
            JSONObject result = new JSONObject();
            result.put("id", modelResult.getId());
            result.put("name", modelResult.getName());
            result.put("email", modelResult.getEmail());
            result.put("password", modelResult.getPassword());
            result.put("personalId", modelResult.getPersonalId());
            result.put("isAdmin", modelResult.getIsAdmin());
            result.put("isDeleted", modelResult.getIsDeleted());
            result.put("createdAt", modelResult.getCreatedAt());
            result.put("deletedAt", modelResult.getDeletedAt());
            result.put("jwt", JWT.createJWT(modelResult));

            toReturn.put("result", result);
        }
    } else {
        status = "invalidEmail";
        statusCode = 417;
    }

    toReturn.put("status", status);
    toReturn.put("statusCode", statusCode); 

    return toReturn;
}
    
    public ArrayList<Users> getAllUser() {
        ArrayList<Users> userList = new ArrayList<>();
        try {
            userList = layer.getAllUser();

        } catch (Exception e) {
            System.err.println("Error fetching users: " + e.getMessage());
        }

        return userList;
    }
    
    public ArrayList<Users> getAllAdmin() {
        ArrayList<Users> userList = new ArrayList<>();
        try {
            userList = layer.getAllAdmin();

        } catch (Exception e) {
            System.err.println("Error fetching admins: " + e.getMessage());
        }

        return userList;
    }
     
     public Users getUserById(Integer id){
        return layer.getUserById(id);
    }
     
     public Users getUserDetailsByCarId(Integer car_id){
        return layer.getUserDetailsByCarId(car_id);
    }

   public JSONObject registerUser(Users u) {
    JSONObject toReturn = new JSONObject();
    String status = "success";
    int statusCode = 200;

    if(isValidEmail(u.getEmail())){
        if(isValidPassword(u.getPassword())){
            boolean userIsExists = Users.isUserExists(u.getEmail());
            if(Users.isUserExists(u.getEmail()) == null){
                status = "modelExeption";
                statusCode = 500;
            }else if(userIsExists == true){
            status = "UserAlreadyExists";
            statusCode = 417;
        }else{
                boolean registerUser = layer.registerUser(u);
                if(registerUser == false){
                    status = "fail";
                    statusCode = 417;
                }
                }
        }else{
            status = "InvalidPassword";
            statusCode = 417;
        }
    }else{
        status = "InvalidEmail";
        statusCode = 417;
    }

    toReturn.put("status", status);
    toReturn.put("statusCode", statusCode); 
    return toReturn;
}
   
   public String registerUser(String name, String email, String password, String personalId){
        if(isValidPassword(password)){
            if(isValidEmail(email)){
                Boolean modelResult = layer.registerUser(name, email, password, personalId);
                if (modelResult){
                    return "success";
                }else {
                    return  "fail";
                }
            } else {
                return "invalidEmail";
            } 
             }else {
                return "successEmail";
        }
    }
    
}
