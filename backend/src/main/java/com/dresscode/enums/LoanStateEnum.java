package com.dresscode.enums;

public enum LoanStateEnum {
    ACTIVE,
    RETURNED,
    EXPIRED, PENDING;

    public String getState() {
        return this.name();
    }
}
