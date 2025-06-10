package com.dresscode.error.exceptions;

public class InvalidQuantityException extends RuntimeException {
    public InvalidQuantityException(String message) {
        super(message);
    }

    public InvalidQuantityException() {
        super("There was an inventory error");
    }
}
