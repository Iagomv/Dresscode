package com.dresscode.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dresscode.dto.loan.AdminLoanRequestDto;
import com.dresscode.dto.loan.LoanRequestDto;
import com.dresscode.enums.ClothingItemAvailabilityEnum;
import com.dresscode.error.exceptions.InvalidQuantityException;
import com.dresscode.error.exceptions.ResourceNotFoundException;
import com.dresscode.model.ClothingItem;
import com.dresscode.repository.ClothingItemRepository;
import com.dresscode.service.InventoryService;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private ClothingItemRepository clothingItemRepository;

    private enum QuantityUpdateType {
        INCREMENT,
        DECREMENT
    }

    @Override
    public void updateQuantityOnLoan(LoanRequestDto dto) {
        dto.getClothingItemIds().forEach(id -> {
            qtyOnLoanFromClothingItemIds(id);
        });
    }

    @Override
    public void updateQuantityOnLoan(AdminLoanRequestDto dto) {
        dto.getClothingItemIds().forEach(id -> {
            qtyOnLoanFromClothingItemIds(id);
        });
    }

    @Override
    public void updateQuantityOnReturn(LoanRequestDto dto) {
        dto.getClothingItemIds().forEach(id -> {
            qtyOnReturnFromClothingItemIds(id);
        });
    }

    @Override
    public void updateQuantityOnReturn(AdminLoanRequestDto dto) {
        dto.getClothingItemIds().forEach(id -> {
            qtyOnReturnFromClothingItemIds(id);
        });
    }

    @Override
    public void updateAvailabilityOnCreation(ClothingItem clothingItem) {

        if (clothingItem.getQuantity() == 0) {
            clothingItem.setAvailability(ClothingItemAvailabilityEnum.UNAVAILABLE);
        } else {
            clothingItem.setAvailability(ClothingItemAvailabilityEnum.AVAILABLE);
        }
    }

    // Helper methods
    private void qtyOnReturnFromClothingItemIds(Long id) {
        updateClothingItem(clothingItemRepository.findById(id).orElseThrow(() -> {
            throw new ResourceNotFoundException("Clothing item not found with id: " + id);
        }), QuantityUpdateType.INCREMENT);
    }

    private void qtyOnLoanFromClothingItemIds(Long id) {
        updateClothingItem(clothingItemRepository.findById(id).orElseThrow(() -> {
            throw new ResourceNotFoundException("Clothing item not found with id: " + id);
        }), QuantityUpdateType.DECREMENT);
    }

    private void updateClothingItem(ClothingItem item, QuantityUpdateType updateType) {
        Integer qty = item.getQuantity();

        if (qty == 0) {
            if (updateType == QuantityUpdateType.DECREMENT) {
                throw new InvalidQuantityException("Clothing item with id: " + item.getId() + " is out of stock.");
            } else {
                item.setAvailability(ClothingItemAvailabilityEnum.AVAILABLE);
            }
        }

        if (updateType == QuantityUpdateType.DECREMENT && qty == 1) {
            item.setAvailability(ClothingItemAvailabilityEnum.UNAVAILABLE);
        }

        item.setQuantity(qty + (updateType == QuantityUpdateType.INCREMENT ? 1 : -1));
        clothingItemRepository.save(item);
    }

}
