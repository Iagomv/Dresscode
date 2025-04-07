package com.dresscode.enums;

public enum ClothingItemAvailabilityEnum {

    AVAILABLE,   
    UNAVAILABLE, 
    LOST,     
    SOLD,        
    RESERVED;    

    // You can add additional methods or fields if needed, for example:
    public String getStatus() {
        return this.name(); 
    }
}
