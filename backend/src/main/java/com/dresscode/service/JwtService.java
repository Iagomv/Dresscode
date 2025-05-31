package com.dresscode.service;

import io.jsonwebtoken.Claims;
import com.dresscode.security.CustomUserDetails;

import java.util.function.Function;

public interface JwtService {

    String extractUsername(String token);

    <T> T extractClaim(String token, Function<Claims, T> claimsResolver);

    String generateToken(CustomUserDetails userDetails);

    boolean isTokenValid(String token, CustomUserDetails userDetails);

}
