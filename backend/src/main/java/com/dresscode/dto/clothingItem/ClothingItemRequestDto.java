package com.dresscode.dto.clothingItem;

import com.dresscode.enums.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
public class ClothingItemRequestDto {

    @Size(min = 3, max = 100)
    private String name;

    @Size(max = 255)
    private String imageUrl;

    private String description;

    private int quantity;

    @Size(max = 50)
    private String color;

    private BigDecimal price;

    private ClothingItemStateEnum state;

    private ClothingItemGenderEnum gender;

    private ClothingItemTypeEnum type;

    private ClothingItemSizeEnum size;

    private ClothingItemAvailabilityEnum availability;

}