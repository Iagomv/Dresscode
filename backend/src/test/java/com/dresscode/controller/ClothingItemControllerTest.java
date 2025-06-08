package com.dresscode.controller;

import com.dresscode.constants.ApiRoutes;
import com.dresscode.dto.clothingItem.ClothingItemRequestDto;
import com.dresscode.dto.clothingItem.ClothingItemResponseDto;
import com.dresscode.dto.clothingItem.ClothingItemSearchDto;
import com.dresscode.enums.*;
import com.dresscode.service.ClothingItemService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ClothingItemController.class)
@AutoConfigureMockMvc(addFilters = false)
public class ClothingItemControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @MockBean
        private ClothingItemService clothingItemService;

        @Autowired
        private ObjectMapper objectMapper;

        private ClothingItemResponseDto responseDto;
        private ClothingItemRequestDto requestDto;

        @BeforeEach
        void setup() {
                responseDto = new ClothingItemResponseDto();
                responseDto.setId(1L);
                responseDto.setName("Jacket");
                responseDto.setDescription("Warm winter jacket");
                responseDto.setQuantity(5);
                responseDto.setColor("Black");
                responseDto.setPrice(new BigDecimal("99.99"));
                responseDto.setState(ClothingItemStateEnum.NEW);
                responseDto.setGender(ClothingItemGenderEnum.UNISEX);
                responseDto.setType(ClothingItemTypeEnum.JACKET);
                responseDto.setSize(ClothingItemSizeEnum.M);
                responseDto.setAvailability(ClothingItemAvailabilityEnum.AVAILABLE);

                requestDto = new ClothingItemRequestDto();
                requestDto.setName("Jacket");
                requestDto.setDescription("Warm winter jacket");
                requestDto.setQuantity(5);
                requestDto.setColor("Black");
                requestDto.setPrice(new BigDecimal("99.99"));
                requestDto.setState(ClothingItemStateEnum.NEW);
                requestDto.setGender(ClothingItemGenderEnum.UNISEX);
                requestDto.setType(ClothingItemTypeEnum.JACKET);
                requestDto.setSize(ClothingItemSizeEnum.M);
                requestDto.setAvailability(ClothingItemAvailabilityEnum.AVAILABLE);
        }

        @Test
        void testGetAllClothingItems() throws Exception {
                when(clothingItemService.getAllClothingItems())
                                .thenReturn(Arrays.asList(responseDto));

                mockMvc.perform(get(ApiRoutes.CLOTHING_ITEMS))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$[0].id").value(1))
                                .andExpect(jsonPath("$[0].name").value("Jacket"));
        }

        @Test
        void testGetAllClothingItems_empty() throws Exception {
                when(clothingItemService.getAllClothingItems())
                                .thenThrow(new com.dresscode.error.exceptions.ResourceNotFoundException("No items"));

                mockMvc.perform(get(ApiRoutes.CLOTHING_ITEMS))
                                .andExpect(status().isNotFound());
        }

        @Test
        void testGetClothingItemById_found() throws Exception {
                when(clothingItemService.getClothingItemById(1L))
                                .thenReturn(responseDto);

                mockMvc.perform(get(ApiRoutes.CLOTHING_ITEMS + "/{id}", 1))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.description").value("Warm winter jacket"));
        }

        @Test
        void testGetClothingItemById_notFound() throws Exception {
                when(clothingItemService.getClothingItemById(1L))
                                .thenReturn(null);

                mockMvc.perform(get(ApiRoutes.CLOTHING_ITEMS + "/{id}", 1))
                                .andExpect(status().isNotFound());
        }

        @Test
        void testSearchClothingItems_found() throws Exception {
                ClothingItemSearchDto searchDto = new ClothingItemSearchDto();
                searchDto.setSize(ClothingItemSizeEnum.M);
                searchDto.setColor("Black");

                when(clothingItemService.searchClothingItems(any(ClothingItemSearchDto.class)))
                                .thenReturn(Arrays.asList(responseDto));

                mockMvc.perform(post(ApiRoutes.CLOTHING_ITEMS + "/search")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(searchDto)))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$[0].id").value(1))
                                .andExpect(jsonPath("$[0].color").value("Black"));
        }

        @Test
        void testSearchClothingItems_empty() throws Exception {
                when(clothingItemService.searchClothingItems(any(ClothingItemSearchDto.class)))
                                .thenReturn(Collections.emptyList());

                mockMvc.perform(post(ApiRoutes.CLOTHING_ITEMS + "/search")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(new ClothingItemSearchDto())))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$").isEmpty());
        }

        @Test
        void testCreateClothingItem_success() throws Exception {
                when(clothingItemService.createClothingItem(any(ClothingItemRequestDto.class)))
                                .thenReturn(responseDto);

                mockMvc.perform(post(ApiRoutes.CLOTHING_ITEMS)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(requestDto)))
                                .andExpect(status().isCreated())
                                .andExpect(jsonPath("$.name").value("Jacket"))
                                .andExpect(jsonPath("$.price").value(99.99));
        }

        @Test
        void testCreateClothingItem_badRequest() throws Exception {
                when(clothingItemService.createClothingItem(any(ClothingItemRequestDto.class)))
                                .thenThrow(new IllegalArgumentException("Invalid data"));

                mockMvc.perform(post(ApiRoutes.CLOTHING_ITEMS)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{ }"))
                                .andExpect(status().isBadRequest());
        }

        @Test
        void testUpdateClothingItem_success() throws Exception {
                ClothingItemResponseDto updated = new ClothingItemResponseDto();
                updated.setId(1L);
                updated.setDescription("Updated Jacket");
                updated.setName("Jacket");
                // ... set other required fields ...

                when(clothingItemService.updateClothingItem(eq(1L), any(ClothingItemRequestDto.class)))
                                .thenReturn(updated);

                mockMvc.perform(put(ApiRoutes.CLOTHING_ITEMS + "/{id}", 1)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"description\":\"Updated Jacket\"}"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.description").value("Updated Jacket"));
        }

        @Test
        void testUpdateClothingItem_notFound() throws Exception {
                when(clothingItemService.updateClothingItem(eq(1L), any(ClothingItemRequestDto.class)))
                                .thenThrow(new com.dresscode.error.exceptions.ResourceNotFoundException("Not found"));

                mockMvc.perform(put(ApiRoutes.CLOTHING_ITEMS + "/{id}", 1)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"description\":\"Doesn't matter\"}"))
                                .andExpect(status().isNotFound());
        }

        @Test
        void testDeleteClothingItem_success() throws Exception {
                when(clothingItemService.deleteClothingItemById(1L))
                                .thenReturn(responseDto);

                mockMvc.perform(delete(ApiRoutes.CLOTHING_ITEMS + "/{id}", 1))
                                .andExpect(status().isNoContent());
        }

        @Test
        void testDeleteClothingItem_notFound() throws Exception {
                when(clothingItemService.deleteClothingItemById(1L))
                                .thenThrow(new com.dresscode.error.exceptions.ResourceNotFoundException("Not found"));

                mockMvc.perform(delete(ApiRoutes.CLOTHING_ITEMS + "/{id}", 1))
                                .andExpect(status().isNotFound());
        }
}
