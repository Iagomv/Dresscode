package com.dresscode.error;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.dresscode.error.exceptions.WrongCredentialsException;
import com.dresscode.error.exceptions.BadRequestException;
import com.dresscode.error.exceptions.EmailExistsException;
import com.dresscode.error.exceptions.PhoneNumberExistsException;
import com.dresscode.error.exceptions.ResourceNotFoundException;
import com.dresscode.error.exceptions.UserNotFoundException;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(ResourceNotFoundException ex, HttpServletRequest request) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(EmailExistsException.class)
    public ResponseEntity<ApiError> handleEmailExists(EmailExistsException ex, HttpServletRequest request) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.CONFLICT, request);
    }

    @ExceptionHandler(PhoneNumberExistsException.class)
    public ResponseEntity<ApiError> handlePhoneNumberExists(PhoneNumberExistsException ex, HttpServletRequest request) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.CONFLICT, request);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationErrors(MethodArgumentNotValidException ex,
            HttpServletRequest request) {
        String errorMessage = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .collect(Collectors.joining(", "));

        return buildErrorResponse(errorMessage, HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiError> handleBadRequest(BadRequestException ex, HttpServletRequest request) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiError> handleUserNotFound(UserNotFoundException ex, HttpServletRequest request) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(WrongCredentialsException.class)
    public ResponseEntity<ApiError> handleBadCredentials(WrongCredentialsException ex, HttpServletRequest request) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.UNAUTHORIZED, request);
    }

    // 🔁 Reusable private helper
    private ResponseEntity<ApiError> buildErrorResponse(String message, HttpStatus status, HttpServletRequest request) {
        ApiError error = new ApiError(status.value(), message, request.getRequestURI());
        return ResponseEntity.status(status).body(error);
    }
}
