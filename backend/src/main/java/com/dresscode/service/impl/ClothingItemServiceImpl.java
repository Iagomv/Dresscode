package com.dresscode.service.impl;

import com.dresscode.service.ClothingItemService;

import jakarta.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.dresscode.enums.ClothingItemAvailabilityEnum;
import com.dresscode.enums.ClothingItemSizeEnum;
import com.dresscode.enums.ClothingItemStateEnum;
import com.dresscode.error.exceptions.ResourceNotFoundException;
import com.dresscode.model.ClothingItem;
import com.dresscode.repository.ClothingItemRepository;

@Service
public class ClothingItemServiceImpl implements ClothingItemService {

    @Autowired
    private ClothingItemRepository clothingItemRepository;

    @Override
    public List<ClothingItem> getAllClotingItems() {
        List<ClothingItem> clothes = clothingItemRepository.findAll();
        if (clothes.isEmpty()) {
            throw new ResourceNotFoundException("No clothing item was found");
        }
        return clothes;
    }

    @Override
    public Optional<ClothingItem> getClothingItemById(Long id) {
        return clothingItemRepository.findById(id);
    }

    @Override
    public List<ClothingItem> searchClothingItems(
            ClothingItemSizeEnum size,
            String color,
            ClothingItemAvailabilityEnum availability,
            ClothingItemStateEnum state,
            String ciCode) {
        return clothingItemRepository.findAll((Specification<ClothingItem>) (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (size != null)
                predicates.add(cb.equal(root.get("size"), size));
            if (color != null)
                predicates.add(cb.like(cb.lower(root.get("color")), "%" + color.toLowerCase() + "%"));
            if (availability != null)
                predicates.add(cb.equal(root.get("availability"), availability));
            if (state != null)
                predicates.add(cb.equal(root.get("state"), state));
            if (ciCode != null)
                predicates.add(cb.like(cb.lower(root.get("ciCode")), "%" + ciCode.toLowerCase() + "%"));

            return cb.and(predicates.toArray(new Predicate[0]));
        });

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
            existingClothingItem.setUser(ClothingItem.getUser());
            existingClothingItem.setLoan(ClothingItem.getLoan());
            return clothingItemRepository.save(existingClothingItem);
        }).orElseThrow(() -> new RuntimeException("Clothing item not found with id " + id));
    }

    @Override
    public ClothingItem deleteClothingItemById(Long id) {
        Optional<ClothingItem> clothingItem = getClothingItemById(id);

        if (!clothingItem.isPresent()) {
            return null;
        }

        else {
            clothingItemRepository.deleteById(id);
            return clothingItem.get();
        }
    }

}
