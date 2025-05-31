package com.dresscode.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dresscode.constants.ApiRoutes;
import com.dresscode.enums.ClothingItemAvailabilityEnum;
import com.dresscode.enums.ClothingItemSizeEnum;
import com.dresscode.enums.ClothingItemStateEnum;
import com.dresscode.model.ClothingItem;
import com.dresscode.service.ClothingItemService;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(ApiRoutes.CLOTHING_ITEMS)
public class ClotingItemController {

    @Autowired
    private ClothingItemService clothingItemService;

    @GetMapping()
    public ResponseEntity<List<ClothingItem>> getAllClotingItems() {
        return ResponseEntity.ok(clothingItemService.getAllClotingItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClothingItem> getClothingItemById(@PathVariable Long id) {
        return clothingItemService.getClothingItemById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<ClothingItem>> searchClothingItems(
            @RequestParam(required = false) ClothingItemSizeEnum size,
            @RequestParam(required = false) String color,
            @RequestParam(required = false) ClothingItemAvailabilityEnum availability,
            @RequestParam(required = false) ClothingItemStateEnum state,
            @RequestParam(required = false) String ciCode) {
        List<ClothingItem> results = clothingItemService.searchClothingItems(size, color, availability, state, ciCode);

        if (results.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(results);
    }

    @PostMapping()
    public ResponseEntity<ClothingItem> createClothingItem(@RequestBody ClothingItem newClothingItem) {
        ClothingItem createdClothingItem = clothingItemService.createClothingItem(newClothingItem);
        if (createdClothingItem == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.created(URI.create(ApiRoutes.CLOTHING_ITEMS + createdClothingItem.getId()))
                .body(createdClothingItem);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ClothingItem> updateClothingItem(@PathVariable Long id,
            @RequestBody ClothingItem updatedClothingItem) {
        ClothingItem clothingItem = clothingItemService.updateClothingItem(id, updatedClothingItem);
        if (clothingItem == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(clothingItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ClothingItem> deleteClothingItem(@PathVariable Long id) {
        if (clothingItemService.getClothingItemById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(clothingItemService.deleteClothingItemById(id));
    }
}
