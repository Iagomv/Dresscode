package com.dresscode.service;

import com.dresscode.enums.UserRoleEnum;
import com.dresscode.model.User;
import com.dresscode.security.CustomUserDetails;
import com.dresscode.service.impl.JwtServiceImpl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private JwtServiceImpl jwtService;

    private String secretKey;
    private long jwtExpirationInMs;

    private CustomUserDetails userDetails;

    @BeforeEach
    void setUp() {
        jwtService = new JwtServiceImpl();

        // Generate a random secret key (HS256) for testing
        SecretKey key = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);
        secretKey = Base64.getEncoder().encodeToString(key.getEncoded());
        jwtExpirationInMs = 3600000L; // 1 hour

        // Inject values using reflection
        injectValues(jwtService, secretKey, jwtExpirationInMs);

        // Mock user details
        User user = new User();
        user.setId(1L);
        user.setName("John");
        user.setPassword("password");
        user.setEmail("john@example.com");
        user.setLastName("Doe");
        user.setPhoneNumber("1234567890");
        user.setRole(UserRoleEnum.STUDENT);

        userDetails = new CustomUserDetails(user);
    }

    private void injectValues(JwtServiceImpl service, String secret, long expiration) {
        try {
            java.lang.reflect.Field secretField = JwtServiceImpl.class.getDeclaredField("secretKey");
            secretField.setAccessible(true);
            secretField.set(service, secret);

            java.lang.reflect.Field expField = JwtServiceImpl.class.getDeclaredField("jwtExpirationInMs");
            expField.setAccessible(true);
            expField.set(service, expiration);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void generateToken_ShouldContainUsername() {
        String token = jwtService.generateToken(userDetails);
        String extractedUsername = jwtService.extractUsername(token);

        assertEquals(userDetails.getUsername(), extractedUsername);
    }

    @Test
    void isTokenValidDetails_ShouldReturnTrueForValidToken() {
        String token = jwtService.generateToken(userDetails);
        boolean isValid = jwtService.isTokenValidDetails(token, userDetails);

        assertTrue(isValid);
    }

    @Test
    void isTokenValidDetails_ShouldReturnFalseForInvalidUsername() {
        String token = jwtService.generateToken(userDetails);

        // Create another user with different username
        User anotherUser = new User();
        anotherUser.setId(2L);
        anotherUser.setName("Jane");
        anotherUser.setPassword("password");
        anotherUser.setEmail("jane@example.com");
        anotherUser.setLastName("Smith");
        anotherUser.setPhoneNumber("0987654321");
        anotherUser.setRole(UserRoleEnum.STUDENT);
        CustomUserDetails anotherUserDetails = new CustomUserDetails(anotherUser);

        boolean isValid = jwtService.isTokenValidDetails(token, anotherUserDetails);

        assertFalse(isValid);
    }

    @Test
    void isValid_ShouldReturnTrueForValidToken() {
        String token = jwtService.generateToken(userDetails);

        assertTrue(jwtService.isValid(token));
    }

    @Test
    void isValid_ShouldReturnFalseForExpiredToken() throws InterruptedException {
        // Set expiration to 1 ms to force quick expiration
        injectValues(jwtService, secretKey, 1L);

        String token = jwtService.generateToken(userDetails);

        // Wait to ensure token is expired
        Thread.sleep(5);

        assertFalse(jwtService.isValid(token));
    }

    @Test
    void extractClaim_ShouldReturnCorrectClaim() {
        String token = jwtService.generateToken(userDetails);
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(jwtService.getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        String extractedSubject = jwtService.extractClaim(token, Claims::getSubject);
        assertEquals(userDetails.getUsername(), extractedSubject);

        String extractedRole = (String) claims.get("role");
        assertEquals(userDetails.getUser().getRole().name(), extractedRole);
    }

    @Test
    void isValid_ShouldReturnFalseForInvalidSignature() {
        // Generate a token with a different secret key
        SecretKey otherKey = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);
        String otherSecret = Base64.getEncoder().encodeToString(otherKey.getEncoded());
        injectValues(jwtService, otherSecret, jwtExpirationInMs);

        String token = jwtService.generateToken(userDetails);

        // Reset to correct key
        injectValues(jwtService, secretKey, jwtExpirationInMs);

        assertFalse(jwtService.isValid(token));
    }

    @Test
    void isValid_ShouldReturnFalseForMalformedToken() {
        String token = "thisIsNotAValidToken";

        assertFalse(jwtService.isValid(token));
    }

    @Test
    void isValid_ShouldReturnFalseForTokenMissingSubject() {
        Map<String, Object> claims = new HashMap<>();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(jwtService.getSigningKey(), io.jsonwebtoken.SignatureAlgorithm.HS256)
                .compact();

        assertFalse(jwtService.isValid(token));
    }

}
