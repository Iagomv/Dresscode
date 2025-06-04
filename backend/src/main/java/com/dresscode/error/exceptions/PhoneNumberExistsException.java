package com.dresscode.error.exceptions;

public class PhoneNumberExistsException extends RuntimeException {
    public PhoneNumberExistsException(String phoneNumber) {
        super("User with phone number " + phoneNumber + " already exists.");
    }
}
