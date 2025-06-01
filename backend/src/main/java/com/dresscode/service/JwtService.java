package com.dresscode.service;

import io.jsonwebtoken.Claims;
import com.dresscode.security.CustomUserDetails;

import java.util.function.Function;

public interface JwtService {

    /**
     * Extracts the username from the given JWT token.
     * 
     * @param token the JWT token
     * @return the username contained in the token
     */
    String extractUsername(String token);

    /**
     * Extracts a specific claim from the given JWT token.
     * 
     * @param <T>            the type of the claim
     * @param token          the JWT token
     * @param claimsResolver a function to extract the claim from the token's claims
     * @return the extracted claim
     */
    <T> T extractClaim(String token, Function<Claims, T> claimsResolver);

    /**
     * Generates a JWT token for the given user details.
     * 
     * @param userDetails the user details
     * @return the generated JWT token
     */
    String generateToken(CustomUserDetails userDetails);

    /**
     * Checks if the given JWT token is valid for the specified user details.
     * 
     * @param token       the JWT token
     * @param userDetails the user details
     * @return true if the token is valid, false otherwise
     */
    boolean isTokenValidDetails(String token, CustomUserDetails userDetails);

    /**
     * Validates the given JWT token.
     * 
     * @param token the JWT token
     * @return true if the token is valid, false otherwise
     * @throws io.jsonwebtoken.JwtException if the token is invalid or expired
     */
    boolean isValid(String token) throws io.jsonwebtoken.JwtException;
}
