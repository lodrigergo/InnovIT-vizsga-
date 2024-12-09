/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.service;

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
    
    public ArrayList<Users> getAllUser() {
        ArrayList<Users> userList = new ArrayList<>();
        try {
            userList = layer.getAllUser();

        } catch (Exception e) {
            System.err.println("Error fetching users: " + e.getMessage());
        }

        return userList;
    }
    
     public JSONObject getAllAdmin(){
        JSONObject toReturn = new JSONObject();
        String status = "success";
        int statusCode = 200;

        List<Users> modelResult = layer.getAllAdmin();
        
        if(modelResult == null){
            status = "ModelExeption";
            statusCode = 500;
        }else if (modelResult.isEmpty()){
            status = "NoAdminFound";
            statusCode = 417;
        }else {
            JSONArray result = new JSONArray();
            
            for(Users actualUser: modelResult){
                JSONObject toAdd = new JSONObject();
                
                toAdd.put("id", actualUser.getId());
                toAdd.put("name", actualUser.getName());
                toAdd.put("email", actualUser.getEmail());
                toAdd.put("password", actualUser.getPassword());
                toAdd.put("personalId", actualUser.getPersonalId());
                toAdd.put("isAdmin", actualUser.getIsAdmin());
                toAdd.put("isDeleted", actualUser.getIsDeleted());
                toAdd.put("createdAt", actualUser.getCreatedAt());
                toAdd.put("deletedAt", actualUser.getDeletedAt());
                
                result.put(toAdd);
            }
            
            toReturn.put("result", result);
        }



        toReturn.put("status", status);
        toReturn.put("statusCode", statusCode); 
        return toReturn;
    }
     
     public Users getUserById(Integer id){
        return layer.getUserById(id);
    }
     
     public Users getUserDetailsByCarId(Integer car_id){
        return layer.getUserById(car_id);
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
    
}
