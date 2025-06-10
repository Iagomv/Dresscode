package com.dresscode.service;

import com.dresscode.dto.clothingItem.ClothingItemRequestDto;
import com.dresscode.dto.clothingItem.ClothingItemResponseDto;
import com.dresscode.dto.clothingItem.ClothingItemSearchDto;
import com.dresscode.enums.ClothingItemAvailabilityEnum;
import com.dresscode.error.exceptions.ResourceNotFoundException;
import com.dresscode.mapper.ClothingItemMapper;
import com.dresscode.model.ClothingItem;
import com.dresscode.repository.ClothingItemRepository;
import com.dresscode.service.impl.ClothingItemServiceImpl;

import jakarta.validation.constraints.Min;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class ClothingItemServiceTest {

    @Mock
    private ClothingItemRepository clothingItemRepository;

    @Mock
    private ClothingItemMapper clothingItemMapper;

    @Mock
    private InventoryService inventoryService;

    @InjectMocks
    private ClothingItemServiceImpl clothingItemService;

    private ClothingItem mockClothingItem;
    private ClothingItemRequestDto clothingItemRequestDto;
    private ClothingItemResponseDto clothingItemResponseDto;

    @BeforeEach
    void setUp() {
        mockClothingItem = new ClothingItem();
        mockClothingItem.setId(1L);
        mockClothingItem.setQuantity(1);

        clothingItemRequestDto = new ClothingItemRequestDto();
        // populate fields if needed, e.g., clothingItemRequestDto.setName("Jacket");

        clothingItemResponseDto = new ClothingItemResponseDto();
        clothingItemResponseDto.setId(1L);
    }

    @Test
    void getClothingItemById_Success() {
        when(clothingItemRepository.findById(1L)).thenReturn(Optional.of(mockClothingItem));
        when(clothingItemMapper.toDto(mockClothingItem)).thenReturn(clothingItemResponseDto);

        ClothingItemResponseDto result = clothingItemService.getClothingItemById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(clothingItemRepository).findById(1L);
    }

    @Test
    void getClothingItemById_NotFound() {
        when(clothingItemRepository.findById(1L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> clothingItemService.getClothingItemById(1L));

        assertTrue(exception.getMessage().contains("Clothing item not found with id"));
    }

    @Test
    void getAllClothingItems_Success() {
        List<ClothingItem> items = List.of(mockClothingItem);
        when(clothingItemRepository.findAll()).thenReturn(items);
        when(clothingItemMapper.toDto(mockClothingItem)).thenReturn(clothingItemResponseDto);

        List<ClothingItemResponseDto> results = clothingItemService.getAllClothingItems();

        assertFalse(results.isEmpty());
        assertEquals(1, results.size());
        verify(clothingItemRepository).findAll();
    }

    @Test
    void getAllClothingItems_NotFound() {
        when(clothingItemRepository.findAll()).thenReturn(Collections.emptyList());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> clothingItemService.getAllClothingItems());

        assertTrue(exception.getMessage().contains("No clothing items were found"));
    }

    @Test
    void searchClothingItems_ReturnsResults() {
        ClothingItemSearchDto searchDto = new ClothingItemSearchDto();
        searchDto.setName("shirt");

        List<ClothingItem> foundItems = List.of(mockClothingItem);
        when(clothingItemRepository.findAll(any(Specification.class))).thenReturn(foundItems);
        when(clothingItemMapper.toDto(mockClothingItem)).thenReturn(clothingItemResponseDto);

        List<ClothingItemResponseDto> results = clothingItemService.searchClothingItems(searchDto);

        assertEquals(1, results.size());
        verify(clothingItemRepository).findAll(any(Specification.class));
    }

    @Test
    void createClothingItem_Success() {
        when(clothingItemMapper.toEntity(clothingItemRequestDto)).thenReturn(mockClothingItem);
        when(clothingItemRepository.save(mockClothingItem)).thenReturn(mockClothingItem);
        when(clothingItemMapper.toDto(mockClothingItem)).thenReturn(clothingItemResponseDto);

        ClothingItemResponseDto result = clothingItemService.createClothingItem(clothingItemRequestDto);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(clothingItemRepository).save(mockClothingItem);
    }

    @Test
    void updateClothingItem_Success() {
        when(clothingItemRepository.findById(1L)).thenReturn(Optional.of(mockClothingItem));
        doNothing().when(clothingItemMapper).updateClothingItemFromDto(clothingItemRequestDto, mockClothingItem);
        when(clothingItemRepository.save(mockClothingItem)).thenReturn(mockClothingItem);
        when(clothingItemMapper.toDto(mockClothingItem)).thenReturn(clothingItemResponseDto);

        ClothingItemResponseDto result = clothingItemService.updateClothingItem(1L, clothingItemRequestDto);

        assertNotNull(result);
        verify(clothingItemRepository).findById(1L);
        verify(clothingItemMapper).updateClothingItemFromDto(clothingItemRequestDto, mockClothingItem);
        verify(clothingItemRepository).save(mockClothingItem);
    }

    @Test
    void updateClothingItem_NotFound() {
        when(clothingItemRepository.findById(1L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> clothingItemService.updateClothingItem(1L, clothingItemRequestDto));

        assertTrue(exception.getMessage().contains("Clothing item not found with id"));
    }

    @Test
    void deleteClothingItemById_Success() {
        when(clothingItemRepository.findById(1L)).thenReturn(Optional.of(mockClothingItem));
        when(clothingItemMapper.toDto(mockClothingItem)).thenReturn(clothingItemResponseDto);

        ClothingItemResponseDto result = clothingItemService.deleteClothingItemById(1L);

        assertNotNull(result);
        verify(clothingItemRepository).delete(mockClothingItem);
    }

    @Test
    void deleteClothingItemById_NotFound() {
        when(clothingItemRepository.findById(1L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> clothingItemService.deleteClothingItemById(1L));

        assertTrue(exception.getMessage().contains("Clothing item not found with id"));
    }
}
