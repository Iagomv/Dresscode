package com.dresscode.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dresscode.constants.ApiRoutes;
import com.dresscode.dto.enums.ClothingItemEnumsDto;
import com.dresscode.service.EnumService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiRoutes.ENUMS)
public class EnumController {
    private final EnumService enumService;

    @GetMapping("/clothing-items")
    @Operation(summary = "Get all clothing item enums")
    public ResponseEntity<ClothingItemEnumsDto> getAllClothingItemEnums() {
        return ResponseEntity.ok(enumService.getAllClothingItemEnums());
    }

}
