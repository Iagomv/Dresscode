package com.dresscode.service.impl;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dresscode.dto.auth.LoginRequestDto;
import com.dresscode.dto.auth.LoginResponseDto;
import com.dresscode.dto.auth.RegisterRequestDto;
import com.dresscode.dto.auth.RegisterResponseDto;
import com.dresscode.enums.UserRoleEnum;
import com.dresscode.error.exceptions.EmailExistsException;
import com.dresscode.error.exceptions.WrongCredentialsException;
import com.dresscode.mapper.UserMapper;
import com.dresscode.model.User;
import com.dresscode.repository.UserRepository;
import com.dresscode.security.CustomUserDetails;
import com.dresscode.service.AuthService;
import com.dresscode.service.JwtService;

@Service
public class AuthServiceImpl implements AuthService {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(
            JwtService jwtService,
            UserRepository userRepository,
            UserMapper userMapper, UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public RegisterResponseDto register(RegisterRequestDto dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new EmailExistsException(dto.getEmail());
        }

        User user = userMapper.toUser(dto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(UserRoleEnum.STUDENT);
        return userMapper.toRegisterResponseDto(userRepository.save(user));
    }

    @Override
    public LoginResponseDto login(LoginRequestDto dto) {
        CustomUserDetails userDetails;
        try {
            userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(dto.getEmail());
        } catch (UsernameNotFoundException e) {
            throw new WrongCredentialsException();
        }

        if (!passwordEncoder.matches(dto.getPassword(), userDetails.getPassword())) {
            throw new WrongCredentialsException();
        }

        return new LoginResponseDto(jwtService.generateToken(userDetails));
    }

}
