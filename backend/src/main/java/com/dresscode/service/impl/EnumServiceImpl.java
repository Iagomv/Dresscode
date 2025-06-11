package com.dresscode.service.impl;

import java.util.Arrays;

import org.springframework.stereotype.Service;

import com.dresscode.dto.enums.ClothingItemEnumsDto;
import com.dresscode.enums.ClothingItemAvailabilityEnum;
import com.dresscode.enums.ClothingItemGenderEnum;
import com.dresscode.enums.ClothingItemSizeEnum;
import com.dresscode.enums.ClothingItemStateEnum;
import com.dresscode.enums.ClothingItemTypeEnum;
import com.dresscode.service.EnumService;

@Service
public class EnumServiceImpl implements EnumService {

        @Override
        public ClothingItemEnumsDto getAllClothingItemEnums() {
                ClothingItemEnumsDto dto = new ClothingItemEnumsDto();
                dto.setAvailability(Arrays.stream(ClothingItemAvailabilityEnum.values())
                                .map(Enum::name)
                                .toList());
                dto.setGender(Arrays.stream(ClothingItemGenderEnum.values())
                                .map(Enum::name)
                                .toList());
                dto.setSize(Arrays.stream(ClothingItemSizeEnum.values())
                                .map(Enum::name)
                                .toList());
                dto.setState(Arrays.stream(ClothingItemStateEnum.values())
                                .map(Enum::name)
                                .toList());
                dto.setType(Arrays.stream(ClothingItemTypeEnum.values())
                                .map(Enum::name)
                                .toList());
                return dto;
        }

}
