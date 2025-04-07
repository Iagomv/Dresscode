package com.dresscode.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.dresscode.model.ClothingItem;

@Service
public interface ClothingItemService {
    
    public  List<ClothingItem> getAllClotingItems();
    
    public  Optional<ClothingItem> getClothingItemById(Long id);
    
    public  ClothingItem createClothingItem(ClothingItem ClothingItem);
    
    public  ClothingItem updateClothingItem(Long id, ClothingItem ClothingItem);

    public  void deleteClothingItem(ClothingItem ClothingItem);

    public  void deleteClothingItemById(Long id);

    // public  List<ClothingItem> getClothingItemsByLoanId(Long loanId);

}
