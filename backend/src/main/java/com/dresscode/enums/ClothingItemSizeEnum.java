package com.dresscode.enums;

public enum ClothingItemSizeEnum {
    SIZE_6("6"),
    SIZE_8("8"),
    SIZE_10("10"),
    SIZE_12("12"),
    SIZE_14("14"),
    XS("XS"),
    S("S"),
    M("M"),
    L("L"),
    XL("XL"),
    XXL("XXL");

    private final String size;

    ClothingItemSizeEnum(String size) {
        this.size = size;
    }

    public String getSize() {
        return size;
    }
}
