package com.dresscode.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dresscode.model.Clase;

public interface ClaseRepository extends JpaRepository<Clase, Long> {
    // Custom query methods can be defined here if needed
    
}
