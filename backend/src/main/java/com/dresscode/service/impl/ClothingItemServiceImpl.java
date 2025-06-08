package com.dresscode.service.impl;

import com.dresscode.dto.clothingItem.ClothingItemRequestDto;
import com.dresscode.dto.clothingItem.ClothingItemResponseDto;
import com.dresscode.dto.clothingItem.ClothingItemSearchDto;
import com.dresscode.error.exceptions.ResourceNotFoundException;
import com.dresscode.mapper.ClothingItemMapper;
import com.dresscode.model.ClothingItem;
import com.dresscode.repository.ClothingItemRepository;
import com.dresscode.service.ClothingItemService;

import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClothingItemServiceImpl implements ClothingItemService {

    @Autowired
    private ClothingItemRepository clothingItemRepository;

    @Autowired
    private ClothingItemMapper clothingItemMapper;

    @Override
    public ClothingItemResponseDto getClothingItemById(Long id) {
        ClothingItemResponseDto item = clothingItemRepository.findById(id).map(clothingItemMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Clothing item not found with id: " + id));
        return item;
    }

    @Override
    public List<ClothingItemResponseDto> getAllClothingItems() {
        List<ClothingItem> clothes = clothingItemRepository.findAll();
        if (clothes.isEmpty()) {
            throw new ResourceNotFoundException("No clothing items were found.");
        }
        return clothes.stream()
                .map(clothingItemMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ClothingItemResponseDto> searchClothingItems(ClothingItemSearchDto searchDto) {
        List<ClothingItem> items = clothingItemRepository.findAll((Specification<ClothingItem>) (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (searchDto.getSize() != null)
                predicates.add(cb.equal(root.get("size"), searchDto.getSize()));
            if (searchDto.getColor() != null)
                predicates.add(cb.like(cb.lower(root.get("color")), "%" + searchDto.getColor().toLowerCase() + "%"));
            if (searchDto.getAvailability() != null)
                predicates.add(cb.equal(root.get("availability"), searchDto.getAvailability()));
            if (searchDto.getState() != null)
                predicates.add(cb.equal(root.get("state"), searchDto.getState()));
            if (searchDto.getGender() != null)
                predicates.add(cb.equal(root.get("gender"), searchDto.getGender()));
            if (searchDto.getType() != null)
                predicates.add(cb.equal(root.get("type"), searchDto.getType()));
            if (searchDto.getName() != null)
                predicates.add(cb.like(cb.lower(root.get("name")), "%" + searchDto.getName().toLowerCase() + "%"));

            return cb.and(predicates.toArray(new Predicate[0]));
        });

        return items.stream().map(clothingItemMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public ClothingItemResponseDto createClothingItem(ClothingItemRequestDto clothingItemDto) {
        ClothingItem clothingItem = clothingItemMapper.toEntity(clothingItemDto);
        ClothingItem savedItem = clothingItemRepository.save(clothingItem);
        return clothingItemMapper.toDto(savedItem);
    }

    @Override
    public ClothingItemResponseDto updateClothingItem(Long id, ClothingItemRequestDto clothingItemDto) {
        ClothingItem existingItem = clothingItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Clothing item not found with id: " + id));

        clothingItemMapper.updateClothingItemFromDto(clothingItemDto, existingItem);
        ClothingItem updatedItem = clothingItemRepository.save(existingItem);

        return clothingItemMapper.toDto(updatedItem);
    }

    @Override
    public ClothingItemResponseDto deleteClothingItemById(Long id) {
        ClothingItem item = clothingItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Clothing item not found with id: " + id));

        clothingItemRepository.delete(item);
        return clothingItemMapper.toDto(item);
    }

}
