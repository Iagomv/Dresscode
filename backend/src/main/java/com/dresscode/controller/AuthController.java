package com.dresscode.controller;

import com.dresscode.constants.ApiRoutes;
import com.dresscode.dto.auth.LoginRequestDto;
import com.dresscode.dto.auth.LoginResponseDto;
import com.dresscode.dto.auth.RegisterRequestDto;
import com.dresscode.dto.auth.RegisterResponseDto;
import com.dresscode.dto.auth.TokenRequestDto;
import com.dresscode.dto.auth.TokenResponseDto;
import com.dresscode.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiRoutes.AUTH)
@Tag(name = "Authentication", description = "Endpoints related to user authentication and JWT validation")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    @Operation(summary = "Register new user", description = "Registers a new user and returns registration result")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User registered successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    public ResponseEntity<RegisterResponseDto> registerUser(@Valid @RequestBody RegisterRequestDto dto) {
        return ResponseEntity.ok().body(authService.register(dto));
    }

    @PostMapping("/login")
    @Operation(summary = "User login", description = "Authenticates a user and returns a JWT token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successful"),
            @ApiResponse(responseCode = "401", description = "Invalid credentials")
    })
    public ResponseEntity<LoginResponseDto> loginUser(@Valid @RequestBody LoginRequestDto dto) {
        return ResponseEntity.ok().body(authService.login(dto));
    }

    @PostMapping("/validate")
    @Operation(summary = "Validate token", description = "Validates the provided JWT token and returns token status")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token is valid"),
            @ApiResponse(responseCode = "401", description = "Token is invalid or expired")
    })
    public ResponseEntity<TokenResponseDto> validate(@RequestBody TokenRequestDto token) {
        TokenResponseDto dto = authService.validate(token);
        return ResponseEntity.status(dto.getStatus()).body(dto);
    }
}