package com.dresscode.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dresscode.constants.ApiRoutes;
import com.dresscode.dto.clothingItem.ClothingItemRequestDto;
import com.dresscode.dto.clothingItem.ClothingItemResponseDto;
import com.dresscode.dto.clothingItem.ClothingItemSearchDto;
import com.dresscode.service.ClothingItemService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(ApiRoutes.CLOTHING_ITEMS)
public class ClothingItemController {

    private final ClothingItemService clothingItemService;

    @Autowired
    public ClothingItemController(ClothingItemService clothingItemService) {
        this.clothingItemService = clothingItemService;
    }

    @PostMapping("/search")
    public ResponseEntity<List<ClothingItemResponseDto>> searchClothingItems(
            @RequestBody ClothingItemSearchDto searchDto) {
        List<ClothingItemResponseDto> results = clothingItemService.searchClothingItems(searchDto);
        return ResponseEntity.ok(results);
    }

    @GetMapping
    public ResponseEntity<List<ClothingItemResponseDto>> getAllClothingItems() {
        List<ClothingItemResponseDto> items = clothingItemService.getAllClothingItems();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/available")
    public ResponseEntity<List<ClothingItemResponseDto>> getAllAvailableClothingItems() {
        List<ClothingItemResponseDto> items = clothingItemService.getAllAvailableClothingItems();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClothingItemResponseDto> getClothingItemById(@PathVariable Long id) {
        ClothingItemResponseDto item = clothingItemService.getClothingItemById(id);
        return ResponseEntity.ok(item);
    }

    @PostMapping
    public ResponseEntity<ClothingItemResponseDto> createClothingItem(
            @RequestBody ClothingItemRequestDto requestDto) {
        ClothingItemResponseDto created = clothingItemService.createClothingItem(requestDto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClothingItemResponseDto> updateClothingItem(
            @PathVariable Long id,
            @RequestBody ClothingItemRequestDto requestDto) {
        ClothingItemResponseDto updated = clothingItemService.updateClothingItem(id, requestDto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClothingItem(@PathVariable Long id) {
        clothingItemService.deleteClothingItemById(id);
        return ResponseEntity.noContent().build();
    }
}
