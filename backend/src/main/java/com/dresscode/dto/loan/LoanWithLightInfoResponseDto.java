package com.dresscode.dto.loan;

import java.util.Set;

import com.dresscode.dto.clothingItem.LightClothingItemResponseDto;
import com.dresscode.dto.user.LightUserResponseDto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class LoanWithLightInfoResponseDto extends LoanResponseDto {
    private LightUserResponseDto user;

    private LightUserResponseDto acceptedBy;

    private Set<LightClothingItemResponseDto> clothingItems;

}
