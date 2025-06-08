package com.dresscode.mapper;

import com.dresscode.dto.clothingItem.*;
import com.dresscode.model.ClothingItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ClothingItemMapper {

    ClothingItemMapper INSTANCE = Mappers.getMapper(ClothingItemMapper.class);

    // Map from DTO to Entity
    @Mapping(target = "id", ignore = true)
    ClothingItem toEntity(ClothingItemRequestDto dto);

    // Map from Entity to DTO (Response)
    ClothingItemResponseDto toDto(ClothingItem clothingItem);

    // Partial update of entity from DTO
    @Mapping(target = "id", ignore = true)
    void updateClothingItemFromDto(ClothingItemRequestDto dto, @MappingTarget ClothingItem entity);
}
