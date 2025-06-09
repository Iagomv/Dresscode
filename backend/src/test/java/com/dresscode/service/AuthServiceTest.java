package com.dresscode.service;

import com.dresscode.dto.auth.*;
import com.dresscode.enums.UserRoleEnum;
import com.dresscode.error.exceptions.EmailExistsException;
import com.dresscode.error.exceptions.WrongCredentialsException;
import com.dresscode.mapper.UserMapper;
import com.dresscode.model.User;
import com.dresscode.repository.UserRepository;
import com.dresscode.security.CustomUserDetails;
import com.dresscode.service.impl.AuthServiceImpl;
import io.jsonwebtoken.JwtException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private JwtService jwtService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private UserDetailsService userDetailsService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthServiceImpl authService;

    private RegisterRequestDto registerRequestDto;
    private RegisterResponseDto registerResponseDto;
    private User user;
    private LoginRequestDto loginRequestDto;
    private CustomUserDetails customUserDetails;
    private LoginResponseDto loginResponseDto;
    private TokenRequestDto tokenRequestDto;

    @BeforeEach
    void setUp() {
        registerRequestDto = new RegisterRequestDto();
        registerRequestDto.setEmail("test@example.com");
        registerRequestDto.setLastName("  Doe  ");
        registerRequestDto.setPassword("plainPassword");

        user = new User();
        user.setEmail(registerRequestDto.getEmail());
        user.setLastName("Doe"); // after cleanup
        user.setPassword("encodedPassword");
        user.setRole(UserRoleEnum.STUDENT);

        registerResponseDto = new RegisterResponseDto();
        registerResponseDto.setEmail(user.getEmail());

        loginRequestDto = new LoginRequestDto();
        loginRequestDto.setEmail("test@example.com");
        loginRequestDto.setPassword("plainPassword");

        customUserDetails = mock(CustomUserDetails.class);

        loginResponseDto = new LoginResponseDto();
        loginResponseDto.setToken("jwt-token");

        tokenRequestDto = new TokenRequestDto();
        tokenRequestDto.setToken("jwt-token");
    }

    @Test
    void register_Success() {
        when(userRepository.existsByEmail(registerRequestDto.getEmail())).thenReturn(false);
        when(userMapper.toUser(registerRequestDto)).thenReturn(user);
        // CleanupLastName.clean is static, so let's mock it using static mocking if
        // necessary,
        // otherwise, assume it works as expected here.
        // For simplicity, we rely on the actual method working correctly.
        when(passwordEncoder.encode(user.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(user)).thenReturn(user);
        when(userMapper.toRegisterResponseDto(user)).thenReturn(registerResponseDto);

        RegisterResponseDto result = authService.register(registerRequestDto);

        assertNotNull(result);
        assertEquals(registerResponseDto.getEmail(), result.getEmail());

        verify(userRepository).existsByEmail(registerRequestDto.getEmail());
        verify(userMapper).toUser(registerRequestDto);
        verify(passwordEncoder).encode(user.getPassword());
        verify(userRepository).save(user);
        verify(userMapper).toRegisterResponseDto(user);
    }

    @Test
    void register_EmailExists_ThrowsEmailExistsException() {
        when(userRepository.existsByEmail(registerRequestDto.getEmail())).thenReturn(true);

        EmailExistsException exception = assertThrows(EmailExistsException.class,
                () -> authService.register(registerRequestDto));
        assertTrue(exception.getMessage().contains(registerRequestDto.getEmail()));

        verify(userRepository).existsByEmail(registerRequestDto.getEmail());
        verifyNoMoreInteractions(userRepository, userMapper, passwordEncoder);
    }

    @Test
    void login_Success() {
        when(userDetailsService.loadUserByUsername(loginRequestDto.getEmail())).thenReturn(customUserDetails);
        when(passwordEncoder.matches(loginRequestDto.getPassword(), customUserDetails.getPassword())).thenReturn(true);
        when(jwtService.generateToken(customUserDetails)).thenReturn("jwt-token");

        LoginResponseDto result = authService.login(loginRequestDto);

        assertNotNull(result);
        assertEquals("jwt-token", result.getToken());

        verify(userDetailsService).loadUserByUsername(loginRequestDto.getEmail());
        verify(passwordEncoder).matches(loginRequestDto.getPassword(), customUserDetails.getPassword());
        verify(jwtService).generateToken(customUserDetails);
    }

    @Test
    void login_UserNotFound_ThrowsWrongCredentialsException() {
        when(userDetailsService.loadUserByUsername(loginRequestDto.getEmail()))
                .thenThrow(UsernameNotFoundException.class);

        assertThrows(WrongCredentialsException.class, () -> authService.login(loginRequestDto));

        verify(userDetailsService).loadUserByUsername(loginRequestDto.getEmail());
        verifyNoMoreInteractions(passwordEncoder, jwtService);
    }

    @Test
    void login_WrongPassword_ThrowsWrongCredentialsException() {
        when(userDetailsService.loadUserByUsername(loginRequestDto.getEmail())).thenReturn(customUserDetails);
        when(passwordEncoder.matches(loginRequestDto.getPassword(), customUserDetails.getPassword())).thenReturn(false);

        assertThrows(WrongCredentialsException.class, () -> authService.login(loginRequestDto));

        verify(userDetailsService).loadUserByUsername(loginRequestDto.getEmail());
        verify(passwordEncoder).matches(loginRequestDto.getPassword(), customUserDetails.getPassword());
        verifyNoMoreInteractions(jwtService);
    }

    @Test
    void validate_ValidToken_ReturnsValidResponse() {
        when(jwtService.isValid(tokenRequestDto.getToken())).thenReturn(true);

        TokenResponseDto response = authService.validate(tokenRequestDto);

        assertEquals(HttpStatus.OK.value(), response.getStatus());
        assertTrue(response.isValid());
        assertEquals("Valid token", response.getMessage());

        verify(jwtService).isValid(tokenRequestDto.getToken());
    }

    @Test
    void validate_InvalidToken_ReturnsInvalidResponse() {
        when(jwtService.isValid(tokenRequestDto.getToken())).thenReturn(false);

        TokenResponseDto response = authService.validate(tokenRequestDto);

        assertEquals(HttpStatus.OK.value(), response.getStatus());
        assertFalse(response.isValid());
        assertEquals("Invalid token", response.getMessage());

        verify(jwtService).isValid(tokenRequestDto.getToken());
    }

    @Test
    void validate_JwtException_ReturnsUnauthorizedResponse() {
        when(jwtService.isValid(tokenRequestDto.getToken())).thenThrow(new JwtException("Invalid"));

        TokenResponseDto response = authService.validate(tokenRequestDto);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.getStatus());
        assertFalse(response.isValid());
        assertEquals("Invalid token", response.getMessage());

        verify(jwtService).isValid(tokenRequestDto.getToken());
    }
}
