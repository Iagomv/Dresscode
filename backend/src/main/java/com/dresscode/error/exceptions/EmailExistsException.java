package com.dresscode.error.exceptions;

public class EmailExistsException extends RuntimeException {
    public EmailExistsException(String email) {
        super("User with email " + email + " already exists.");
    }
}
