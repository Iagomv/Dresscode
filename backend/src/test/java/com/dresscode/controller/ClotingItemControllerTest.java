package com.dresscode.controller;

import com.dresscode.constants.ApiRoutes;
import com.dresscode.enums.ClothingItemSizeEnum;
import com.dresscode.model.ClothingItem;
import com.dresscode.service.ClothingItemService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ClotingItemController.class)
@AutoConfigureMockMvc(addFilters = false)
public class ClotingItemControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ClothingItemService clothingItemService;

    private ClothingItem mockItem;

    @BeforeEach
    void setup() {
        mockItem = new ClothingItem();
        mockItem.setId(1L);
        mockItem.setDescription("Jacket");
        mockItem.setSize(ClothingItemSizeEnum.M);
    }

    @Test
    void testGetAllClotingItems() throws Exception {
        when(clothingItemService.getAllClotingItems()).thenReturn(Arrays.asList(mockItem));

        mockMvc.perform(get(ApiRoutes.CLOTHING_ITEMS + "/"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].description").value("Jacket"));
    }

    @Test
    void testGetAllClotingItems_empty() throws Exception {
        when(clothingItemService.getAllClotingItems()).thenReturn(Collections.emptyList());

        mockMvc.perform(get(ApiRoutes.CLOTHING_ITEMS + "/"))
                .andExpect(status().isNoContent());
    }

    @Test
    void testGetClothingItemById_found() throws Exception {
        when(clothingItemService.getClothingItemById(1L)).thenReturn(Optional.of(mockItem));

        mockMvc.perform(get(ApiRoutes.CLOTHING_ITEMS + "/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description").value("Jacket"));
    }

    @Test
    void testGetClothingItemById_notFound() throws Exception {
        when(clothingItemService.getClothingItemById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(get(ApiRoutes.CLOTHING_ITEMS + "/{id}", 1L))
                .andExpect(status().isNotFound());
    }

    @Test
    void testSearchClothingItems_found() throws Exception {
        when(clothingItemService.searchClothingItems(any(), any(), any(), any(), any()))
                .thenReturn(Arrays.asList(mockItem));

        mockMvc.perform(get(ApiRoutes.CLOTHING_ITEMS + "/search")
                .param("size", "M")
                .param("color", "Black")
                .param("availability", "AVAILABLE")
                .param("state", "NEW")
                .param("ciCode", "ABC123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].description").value("Jacket"));
    }

    @Test
    void testSearchClothingItems_empty() throws Exception {
        when(clothingItemService.searchClothingItems(any(), any(), any(), any(), any()))
                .thenReturn(Collections.emptyList());

        mockMvc.perform(get(ApiRoutes.CLOTHING_ITEMS + "/search"))
                .andExpect(status().isNoContent());
    }

    @Test
    void testCreateClothingItem_success() throws Exception {
        when(clothingItemService.createClothingItem(any(ClothingItem.class))).thenReturn(mockItem);

        mockMvc.perform(post(ApiRoutes.CLOTHING_ITEMS + "/")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"description\":\"Jacket\", \"size\":\"M\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.description").value("Jacket"));
    }

    @Test
    void testCreateClothingItem_badRequest() throws Exception {
        when(clothingItemService.createClothingItem(any(ClothingItem.class))).thenReturn(null);

        mockMvc.perform(post(ApiRoutes.CLOTHING_ITEMS + "/")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"description\":\"Broken Item\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testUpdateClothingItem_success() throws Exception {
        ClothingItem updatedItem = new ClothingItem();
        updatedItem.setId(1L);
        updatedItem.setDescription("Updated Jacket");

        when(clothingItemService.updateClothingItem(eq(1L), any(ClothingItem.class)))
                .thenReturn(updatedItem);

        mockMvc.perform(patch(ApiRoutes.CLOTHING_ITEMS + "/{id}", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"description\": \"Updated Jacket\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description").value("Updated Jacket"));
    }

    @Test
    void testUpdateClothingItem_notFound() throws Exception {
        when(clothingItemService.updateClothingItem(eq(1L), any(ClothingItem.class))).thenReturn(null);

        mockMvc.perform(patch(ApiRoutes.CLOTHING_ITEMS + "/{id}", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"description\": \"Not Found Item\"}"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testDeleteClothingItem_success() throws Exception {
        when(clothingItemService.getClothingItemById(1L)).thenReturn(Optional.of(mockItem));
        when(clothingItemService.deleteClothingItemById(1L)).thenReturn(mockItem);

        mockMvc.perform(delete(ApiRoutes.CLOTHING_ITEMS + "/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description").value("Jacket"));
    }

    @Test
    void testDeleteClothingItem_notFound() throws Exception {
        when(clothingItemService.getClothingItemById(1L)).thenReturn(null);

        mockMvc.perform(delete(ApiRoutes.CLOTHING_ITEMS + "/{id}", 1L))
                .andExpect(status().isNotFound());
    }
}
