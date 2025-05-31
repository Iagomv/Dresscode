package com.dresscode.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dresscode.error.exceptions.ResourceNotFoundException;
import com.dresscode.model.Clase;
import com.dresscode.model.User;
import com.dresscode.repository.ClaseRepository;
import com.dresscode.service.ClaseService;

@Service
public class ClaseServiceImpl implements ClaseService {

    @Autowired
    private ClaseRepository claseRepository;

    @Override
    public List<Clase> getAllClases() {
        List<Clase> clases = claseRepository.findAll();
        if (clases.isEmpty()) {
            throw new ResourceNotFoundException("No clases found");
        }
        return clases;
    }

    @Override
    public Optional<Clase> getClaseById(Long id) {
        return claseRepository.findById(id);
    }

    @Override
    public Clase createClase(Clase clase) {
        return claseRepository.save(clase);
    }

    @Override
    public Clase updateClase(Long id, Clase clase) {
        return claseRepository.findById(id).map(existingClase -> {
            existingClase.setName(clase.getName());
            existingClase.setUsers(clase.getUsers());
            return claseRepository.save(existingClase);
        }).orElseThrow(() -> new RuntimeException("Clase not found with id " + id));
    }

    @Override
    public Clase deleteClaseById(Long id) {
        return claseRepository.findById(id).map(existingClase -> {
            claseRepository.delete(existingClase);
            return existingClase;
        }).orElseThrow(() -> new RuntimeException("Clase not found with id " + id));
    }

    @Override
    public Set<User> getUsersByClaseId(Long claseId) {
        Clase clase = claseRepository.findById(claseId)
                .orElseThrow(() -> new RuntimeException("Clase not found with id " + claseId));
        return clase.getUsers();
    }

}