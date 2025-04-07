package com.dresscode.enums;

public enum LoanStateEnum {
    LOANED,
    RETURNED,
    EXPIRED;

    public String getState() {
        return this.name();
    }
}
