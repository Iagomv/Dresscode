package com.dresscode.service;

import java.util.List;
import java.util.Optional;

import com.dresscode.dto.clothingItem.ClothingItemRequestDto;
import com.dresscode.dto.clothingItem.ClothingItemResponseDto;
import com.dresscode.dto.clothingItem.ClothingItemSearchDto;

public interface ClothingItemService {

    List<ClothingItemResponseDto> getAllClothingItems();

    ClothingItemResponseDto getClothingItemById(Long id);

    List<ClothingItemResponseDto> searchClothingItems(ClothingItemSearchDto searchDto);

    ClothingItemResponseDto createClothingItem(ClothingItemRequestDto clothingItemDto);

    ClothingItemResponseDto updateClothingItem(Long id, ClothingItemRequestDto clothingItemDto);

    ClothingItemResponseDto deleteClothingItemById(Long id);
}
