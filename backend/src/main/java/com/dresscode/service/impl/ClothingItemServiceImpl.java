package com.dresscode.service.impl;
import com.dresscode.service.ClothingItemService;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dresscode.model.ClothingItem;
import com.dresscode.repository.ClothingItemRepository;

@Service
public class ClothingItemServiceImpl implements ClothingItemService{


    @Autowired
    private ClothingItemRepository clothingItemRepository;

    @Override
    public List<ClothingItem> getAllClotingItems() {
        return clothingItemRepository.findAll();
    }

    @Override
    public Optional<ClothingItem> getClothingItemById(Long id) {
        return clothingItemRepository.findById(id);
    }

    @Override
    public ClothingItem createClothingItem(ClothingItem ClothingItem) {
        return clothingItemRepository.save(ClothingItem);   
    }

    @Override
    public ClothingItem updateClothingItem(Long id, ClothingItem ClothingItem) {
        return clothingItemRepository.findById(id).map(existingClothingItem -> {
            existingClothingItem.setCiCode(ClothingItem.getCiCode());
            existingClothingItem.setSize(ClothingItem.getSize());
            existingClothingItem.setAvailability(ClothingItem.getAvailability());
            existingClothingItem.setDescription(ClothingItem.getDescription());
            existingClothingItem.setColor(ClothingItem.getColor());
            existingClothingItem.setPrize(ClothingItem.getPrize());
            existingClothingItem.setAcquisitionDate(ClothingItem.getAcquisitionDate());
            existingClothingItem.setState(ClothingItem.getState());
            existingClothingItem.setDeleted(ClothingItem.isDeleted());
            existingClothingItem.setUser(ClothingItem.getUser());
            existingClothingItem.setLoan(ClothingItem.getLoan());
            return clothingItemRepository.save(existingClothingItem);
        }).orElseThrow(() -> new RuntimeException("Clothing item not found with id " + id));
    }

    @Override
    public void deleteClothingItem(ClothingItem clothingItem) {
        clothingItemRepository.delete(clothingItem);
    }

    @Override
    public void deleteClothingItemById(Long id) {
        clothingItemRepository.deleteById(id);
    }

    //TODO
    // @Override
    // public List<ClothingItem> getClothingItemsByLoanId(Long loanId) {
    // }
    

}
