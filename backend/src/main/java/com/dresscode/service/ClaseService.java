package com.dresscode.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.dresscode.model.Clase;
import com.dresscode.model.User;

@Service
public interface ClaseService {
    
    public  List<Clase> getAllClases();
    
    public  Optional<Clase> getClaseById(Long id);
    
    public  Clase createClase(Clase clase);
    
    public  Clase updateClase(Long id, Clase clase);
    
    public  Clase deleteClaseById(Long id);

    public Set<User> getUsersByClaseId(Long claseId); 

}
