package com.dresscode.controller;

import com.dresscode.constants.ApiRoutes;
import com.dresscode.dto.auth.LoginRequestDto;
import com.dresscode.dto.auth.LoginResponseDto;
import com.dresscode.dto.auth.RegisterRequestDto;
import com.dresscode.dto.auth.RegisterResponseDto;
import com.dresscode.dto.auth.TokenRequestDto;
import com.dresscode.dto.auth.TokenResponseDto;
import com.dresscode.service.AuthService;
import jakarta.validation.Valid;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiRoutes.AUTH)
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDto> registerUser(@Valid @RequestBody RegisterRequestDto dto) {
        return ResponseEntity.ok().body(authService.register(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> loginUser(@Valid @RequestBody LoginRequestDto dto) {
        return ResponseEntity.ok().body(authService.login(dto));
    }

    @PostMapping("/validate")
    public ResponseEntity<TokenResponseDto> validate(@RequestBody TokenRequestDto token) {
        TokenResponseDto dto = authService.validate(token);
        return ResponseEntity.status(dto.getStatus()).body(dto);
    }

}
