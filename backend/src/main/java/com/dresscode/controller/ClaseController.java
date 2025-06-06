package com.dresscode.controller;

import com.dresscode.constants.ApiRoutes;
import com.dresscode.model.Clase;
import com.dresscode.model.User;
import com.dresscode.service.ClaseService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(ApiRoutes.CLASES)
@Validated
public class ClaseController {

    @Autowired
    private ClaseService claseService;

    @GetMapping()
    public ResponseEntity<List<Clase>> getAllClases() {
        return ResponseEntity.ok(claseService.getAllClases());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Clase> getClaseById(@PathVariable Long id) {
        return claseService.getClaseById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/users/{claseId}")
    public ResponseEntity<?> getClaseUsers(@PathVariable Long claseId) {
        Set<User> users = claseService.getUsersByClaseId(claseId);
        return users.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(users);
    }

    @PostMapping()
    public ResponseEntity<Clase> insertClase(@RequestBody @Valid Clase clase) {
        Clase createdClase = claseService.createClase(clase);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdClase);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Clase> updateClase(@PathVariable Long id, @RequestBody @Valid Clase clase) {
        Clase responseClase = claseService.updateClase(id, clase);
        return responseClase != null ? ResponseEntity.ok(responseClase) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Clase> deleteClase(@PathVariable Long id) {
        Clase deletedClase = claseService.deleteClaseById(id);
        return deletedClase != null ? ResponseEntity.ok(deletedClase) : ResponseEntity.notFound().build();
    }

}
