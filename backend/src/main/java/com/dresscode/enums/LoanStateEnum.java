package com.dresscode.enums;

public enum LoanStateEnum {
    LOANED,
    RETURNED,
    EXPIRED, PENDING;

    public String getState() {
        return this.name();
    }
}
