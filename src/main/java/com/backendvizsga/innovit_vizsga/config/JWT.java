/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.config;


import com.backendvizsga.innovit_vizsga.model.Users;
import com.fasterxml.jackson.databind.JsonSerializable;
import java.security.SignatureException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.impl.TextCodec;
import io.jsonwebtoken.security.WeakKeyException;

/**
 *
 * @author User
 */
public class JWT {
    private static final String SIGN = "09ce78e64c7d6667e04798aa897e2bbc194d0ce5d19aef677b4477ba0932d972";
    private static final byte[] SECRET = Base64.getDecoder().decode(SIGN);
    
    
     public static String createJWT(Users u){
        Instant now = Instant.now();
        String token = Jwts.builder()
                .setIssuer("IAKK")
                .setSubject("valamit")
                .claim("id", u.getId())
                .claim("isAdmin", u.getIsAdmin())
                .claim("createdAt", u.getCreatedAt())
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plus(1,ChronoUnit.DAYS)))
                .signWith(
                        io.jsonwebtoken.SignatureAlgorithm.HS256,
                        Keys.hmacShaKeyFor(SECRET)
                )
                .compact();
        
        return token;
    }
    
     public static int validateJWT(String jwt) {
         
       
       Jws<Claims> result;
       result = Jwts.parser().setSigningKey(Keys.hmacShaKeyFor(SECRET)).parseClaimsJws(jwt);
       int id = result.getBody().get("id", Integer.class);
       Users u = new Users(id);
       
        try {
            if(u.getId()== id){
           return 1;
       }else{
           return 2;
       }
        } catch (ExpiredJwtException | MalformedJwtException | UnsupportedJwtException | WeakKeyException ex) {
            System.err.println("Hiba: " + ex.getLocalizedMessage());
        }
        return 0;
     
    }
       
       
}
