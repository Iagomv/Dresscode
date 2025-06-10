package com.dresscode.dto.clothingItem;

import com.dresscode.enums.ClothingItemGenderEnum;
import com.dresscode.enums.ClothingItemSizeEnum;
import com.dresscode.enums.ClothingItemStateEnum;
import com.dresscode.enums.ClothingItemTypeEnum;

import lombok.Data;

@Data
public class LightClothingItemResponseDto {
    private Long id;
    private String name;
    private String imageUrl;
    private String description;
    private String color;
    private ClothingItemStateEnum state;
    private ClothingItemGenderEnum gender;
    private ClothingItemTypeEnum type;
    private ClothingItemSizeEnum size;
}
