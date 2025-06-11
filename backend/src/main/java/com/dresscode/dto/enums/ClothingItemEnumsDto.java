package com.dresscode.dto.enums;

import java.util.List;

import lombok.Data;

@Data
public class ClothingItemEnumsDto {

    private List<String> availability;
    private List<String> gender;
    private List<String> size;
    private List<String> state;
    private List<String> type;
}
