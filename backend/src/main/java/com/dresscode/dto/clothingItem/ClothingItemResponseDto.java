package com.dresscode.dto.clothingItem;

import com.dresscode.enums.*;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ClothingItemResponseDto {

    private Long id;

    private String name;

    private String imageUrl;

    private String description;

    private int quantity;

    private String color;

    private BigDecimal price;

    private ClothingItemStateEnum state;

    private ClothingItemGenderEnum gender;

    private ClothingItemTypeEnum type;

    private ClothingItemSizeEnum size;

    private ClothingItemAvailabilityEnum availability;

}