package com.dresscode.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.dresscode.model.ClothingItem;

@Repository
public interface ClothingItemRepository extends JpaRepository<ClothingItem, Long>, JpaSpecificationExecutor<ClothingItem> {

}
