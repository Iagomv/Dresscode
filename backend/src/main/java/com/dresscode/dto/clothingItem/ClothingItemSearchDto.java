package com.dresscode.dto.clothingItem;

import com.dresscode.enums.ClothingItemAvailabilityEnum;
import com.dresscode.enums.ClothingItemGenderEnum;
import com.dresscode.enums.ClothingItemSizeEnum;
import com.dresscode.enums.ClothingItemStateEnum;
import com.dresscode.enums.ClothingItemTypeEnum;
import lombok.Data;

@Data
public class ClothingItemSearchDto {
    private ClothingItemSizeEnum size;
    private String color;
    private ClothingItemAvailabilityEnum availability;
    private ClothingItemStateEnum state;
    private ClothingItemGenderEnum gender;
    private ClothingItemTypeEnum type;
    private String name;
}
