package com.dresscode.enums;

public enum LoanStateEnum {
    ACTIVE,
    PENDING,
    REJECTED,
    RETURNED,
    EXPIRED,;

    public String getState() {
        return this.name();
    }
}
