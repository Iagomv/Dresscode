package com.dresscode.service;

import com.dresscode.dto.auth.LoginRequestDto;
import com.dresscode.dto.auth.LoginResponseDto;
import com.dresscode.dto.auth.RegisterRequestDto;
import com.dresscode.dto.auth.RegisterResponseDto;

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
    public RegisterResponseDto register(RegisterRequestDto dto);

    /**
     * Authenticates a user with the provided login credentials.
     * 
     * @param dto Login request data transfer object
     * @return A LoginResponseDto object containing the authentication result
     */
    public LoginResponseDto login(LoginRequestDto dto);
}
