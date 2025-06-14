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
    XXL("XXL"),
    SIZE_35("35"),
    SIZE_36("36"),
    SIZE_37("37"),
    SIZE_38("38"),
    SIZE_39("39"),
    SIZE_40("40"),
    SIZE_41("41"),
    SIZE_42("42"),
    SIZE_43("43"),
    SIZE_44("44"),
    SIZE_45("45"),
    ONE_SIZE("ONE_SIZE");

    private final String size;

    ClothingItemSizeEnum(String size) {
        this.size = size;
    }

    public String getSize() {
        return size;
    }
}
