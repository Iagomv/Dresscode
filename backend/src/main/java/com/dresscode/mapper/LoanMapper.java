package com.dresscode.mapper;

import com.dresscode.dto.clothingItem.LightClothingItemResponseDto;
import com.dresscode.dto.loan.AdminLoanRequestDto;
import com.dresscode.dto.loan.LoanRequestDto;
import com.dresscode.dto.loan.LoanResponseDto;
import com.dresscode.dto.loan.LoanWithLightInfoResponseDto;
import com.dresscode.dto.user.LightUserResponseDto;
import com.dresscode.model.Loan;
import com.dresscode.model.User;
import com.dresscode.model.ClothingItem;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface LoanMapper {

    LoanMapper INSTANCE = Mappers.getMapper(LoanMapper.class);

    // Admin DTO -> Entity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", source = "userId", qualifiedByName = "mapUserById")
    @Mapping(target = "acceptedBy", source = "acceptedById", qualifiedByName = "mapUserById")
    @Mapping(target = "clothingItems", source = "clothingItemIds", qualifiedByName = "mapClothingItemsByIds")
    Loan toEntity(AdminLoanRequestDto dto);

    // User DTO -> Entity (state will be set in service, not here)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", source = "userId", qualifiedByName = "mapUserById")
    @Mapping(target = "state", ignore = true) // to be set in service as PENDING
    @Mapping(target = "clothingItems", source = "clothingItemIds", qualifiedByName = "mapClothingItemsByIds")
    Loan toEntity(LoanRequestDto dto);

    // Entity -> Response DTO
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "acceptedById", source = "acceptedBy.id")
    @Mapping(target = "clothingItemIds", source = "clothingItems", qualifiedByName = "mapClothingItemsToIds")
    LoanResponseDto toDto(Loan loan);

    // Partial update from AdminLoanRequestDto
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", source = "userId", qualifiedByName = "mapUserById")
    @Mapping(target = "acceptedBy", source = "acceptedById", qualifiedByName = "mapUserById")
    @Mapping(target = "clothingItems", source = "clothingItemIds", qualifiedByName = "mapClothingItemsByIds")
    void updateLoanFromDto(AdminLoanRequestDto dto, @MappingTarget Loan entity);

    @Mapping(target = "user", source = "user", qualifiedByName = "mapUserToLightUserResponseDto")
    @Mapping(target = "acceptedBy", source = "acceptedBy", qualifiedByName = "mapUserToLightUserResponseDto")
    @Mapping(target = "clothingItems", source = "clothingItems", qualifiedByName = "mapClothingItemsToLightClothingItemResponseDtos")
    LoanWithLightInfoResponseDto toLightInfoResponseDto(Loan loan);

    // Helper to map userId to User entity (only with ID set)
    @Named("mapUserById")
    default User mapUserById(Long id) {
        if (id == null)
            return null;
        User user = new User();
        user.setId(id);
        return user;
    }

    // Helper to map Set<Long> clothingItemIds to Set<ClothingItem> entities (only
    // with IDs set)
    @Named("mapClothingItemsByIds")
    default Set<ClothingItem> mapClothingItemsByIds(Set<Long> ids) {
        if (ids == null)
            return null;
        return ids.stream().map(id -> {
            ClothingItem ci = new ClothingItem();
            ci.setId(id);
            return ci;
        }).collect(Collectors.toSet());
    }

    // Helper to map Set<ClothingItem> to Set<Long> ids
    @Named("mapClothingItemsToIds")
    default Set<Long> mapClothingItemsToIds(Set<ClothingItem> clothingItems) {
        if (clothingItems == null)
            return null;
        return clothingItems.stream().map(ClothingItem::getId).collect(Collectors.toSet());
    }

    @Named("mapUserToLightUserResponseDto")
    default LightUserResponseDto mapUserToLightUserResponseDto(User user) {
        if (user == null) {
            return null;
        }
        LightUserResponseDto lightUserResponseDto = new LightUserResponseDto();
        lightUserResponseDto.setId(user.getId());
        lightUserResponseDto.setName(user.getName());
        lightUserResponseDto.setLastName(user.getLastName());
        lightUserResponseDto.setEmail(user.getEmail());
        return lightUserResponseDto;
    }

    @Named("mapClothingItemsToLightClothingItemResponseDtos")
    default Set<LightClothingItemResponseDto> mapClothingItemsToLightClothingItemResponseDtos(
            Set<ClothingItem> clothingItems) {
        if (clothingItems == null) {
            return null;
        }
        return clothingItems.stream()
                .map(clothingItem -> {
                    LightClothingItemResponseDto lightClothingItemResponseDto = new LightClothingItemResponseDto();
                    lightClothingItemResponseDto.setId(clothingItem.getId());
                    lightClothingItemResponseDto.setName(clothingItem.getName());
                    // Add other fields as needed
                    return lightClothingItemResponseDto;
                })
                .collect(Collectors.toSet());
    }
}
