package com.dresscode.service;

import com.dresscode.enums.ClothingItemAvailabilityEnum;
import com.dresscode.enums.ClothingItemSizeEnum;
import com.dresscode.enums.ClothingItemStateEnum;
import com.dresscode.model.ClothingItem;
import com.dresscode.repository.ClothingItemRepository;
import com.dresscode.service.impl.ClothingItemServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClothingItemServiceImplTest {

    @Mock
    private ClothingItemRepository clothingItemRepository;

    @InjectMocks
    private ClothingItemServiceImpl clothingItemService;

    private ClothingItem mockItem;

    @BeforeEach
    void setup() {
        mockItem = new ClothingItem();
        mockItem.setId(1L);
        mockItem.setCiCode("CI123");
        mockItem.setSize(ClothingItemSizeEnum.M);
        mockItem.setColor("Red");
        mockItem.setAvailability(ClothingItemAvailabilityEnum.AVAILABLE);
        mockItem.setState(ClothingItemStateEnum.NEW);
    }

    @Test
    void testGetAllClothingItems() {
        when(clothingItemRepository.findAll()).thenReturn(Arrays.asList(mockItem));

        List<ClothingItem> items = clothingItemService.getAllClotingItems();
        assertThat(items).hasSize(1);
        verify(clothingItemRepository, times(1)).findAll();
    }

    @Test
    void testGetClothingItemById() {
        when(clothingItemRepository.findById(1L)).thenReturn(Optional.of(mockItem));

        Optional<ClothingItem> item = clothingItemService.getClothingItemById(1L);
        assertThat(item).isPresent();
        assertThat(item.get().getCiCode()).isEqualTo("CI123");
    }

    @Test
    void testCreateClothingItem() {
        when(clothingItemRepository.save(mockItem)).thenReturn(mockItem);

        ClothingItem created = clothingItemService.createClothingItem(mockItem);
        assertThat(created.getCiCode()).isEqualTo("CI123");
        verify(clothingItemRepository).save(mockItem);
    }

    @Test
    void testUpdateClothingItem() {
        ClothingItem updated = new ClothingItem();
        updated.setCiCode("CI456");

        when(clothingItemRepository.findById(1L)).thenReturn(Optional.of(mockItem));
        when(clothingItemRepository.save(any())).thenReturn(updated);

        ClothingItem result = clothingItemService.updateClothingItem(1L, updated);
        assertThat(result.getCiCode()).isEqualTo("CI456");
    }

    @Test
    void testDeleteClothingItemById_itemExists() {
        when(clothingItemRepository.findById(1L)).thenReturn(Optional.of(mockItem));
    
        ClothingItem deleted = clothingItemService.deleteClothingItemById(1L);
    
        assertThat(deleted).isNotNull();
        verify(clothingItemRepository).findById(1L);
        verify(clothingItemRepository).deleteById(1L);
        verifyNoMoreInteractions(clothingItemRepository);
    }
    
    @Test
    void testDeleteClothingItemById_itemDoesNotExist() {
        when(clothingItemRepository.findById(1L)).thenReturn(Optional.empty());
    
        ClothingItem deleted = clothingItemService.deleteClothingItemById(1L);
    
        assertThat(deleted).isNull();
        verify(clothingItemRepository).findById(1L);
        verifyNoMoreInteractions(clothingItemRepository);
    }
}    