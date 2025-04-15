package com.dresscode.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.dresscode.enums.ClothingItemAvailabilityEnum;
import com.dresscode.enums.ClothingItemSizeEnum;
import com.dresscode.enums.ClothingItemStateEnum;
import com.dresscode.model.ClothingItem;

@Service
public interface ClothingItemService {
    
    public  List<ClothingItem> getAllClotingItems();
    
    public  Optional<ClothingItem> getClothingItemById(Long id);

    public List<ClothingItem> searchClothingItems(
        ClothingItemSizeEnum size,
        String color,
        ClothingItemAvailabilityEnum availability,
        ClothingItemStateEnum state,
        String ciCode
    );
    
    public  ClothingItem createClothingItem(ClothingItem ClothingItem);
    
    public  ClothingItem updateClothingItem(Long id, ClothingItem ClothingItem);

    public  ClothingItem deleteClothingItemById(Long id);

    // public  List<ClothingItem> getClothingItemsByLoanId(Long loanId);

}
