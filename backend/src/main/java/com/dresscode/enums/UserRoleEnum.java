package com.dresscode.enums;

public enum UserRoleEnum {
    STUDENT,
    TEACHER,
    ADMIN;

    public String getRole() {
        return this.name();
    }
}
