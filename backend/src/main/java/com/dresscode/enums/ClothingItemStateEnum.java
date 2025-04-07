package com.dresscode.enums;

public enum ClothingItemStateEnum {
    NUEVA,
    USADA;

    public String getState() {
        return this.name(); 
    }
}
