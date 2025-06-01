package com.dresscode.service;

import com.dresscode.dto.auth.LoginRequestDto;
import com.dresscode.dto.auth.LoginResponseDto;
import com.dresscode.dto.auth.RegisterRequestDto;
import com.dresscode.dto.auth.RegisterResponseDto;
import com.dresscode.dto.auth.TokenRequestDto;
import com.dresscode.dto.auth.TokenResponseDto;

/**
 * Interface for authentication services.
 * Provides methods for user registration and login.
 */
public interface AuthService {

    /**
     * Registers a new user with the provided registration data.
     * 
     * @param dto Registration request data transfer object
     * @return The newly created User object
     */
    RegisterResponseDto register(RegisterRequestDto dto);

    /**
     * Authenticates a user with the provided login credentials.
     * 
     * @param dto Login request data transfer object
     * @return A LoginResponseDto object containing the authentication result
     */
    LoginResponseDto login(LoginRequestDto dto);

    /**
     * Validates a token and returns a TokenResponseDto object.
     * 
     * @param token The token to validate
     * @return A TokenResponseDto object containing the validation result
     */
    TokenResponseDto validate(TokenRequestDto token);
}
