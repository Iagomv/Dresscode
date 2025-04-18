package com.dresscode.enums;

public enum ClothingItemStateEnum {
    NEW,
    USED;

    public String getState() {
        return this.name(); 
    }
}
