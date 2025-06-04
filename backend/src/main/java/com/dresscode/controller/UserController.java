package com.dresscode.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dresscode.constants.ApiRoutes;
import com.dresscode.dto.user.AdminUserCreationRequestDto;
import com.dresscode.dto.user.UserUpdateRequestDto;
import com.dresscode.error.exceptions.ResourceNotFoundException;
import com.dresscode.model.User;
import com.dresscode.service.UserService;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping(ApiRoutes.USERS)
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping()
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found with id " + id));
    }

    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PostMapping("/admin-user-creation")
    public ResponseEntity<User> adminUserCreation(@Valid @RequestBody AdminUserCreationRequestDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.adminUserCreation(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@Valid @RequestBody UserUpdateRequestDto dto, @PathVariable Long id) {
        return ResponseEntity.ok().body(userService.updateUser(dto, id));
    }

    @PatchMapping("/{id}/toggle-status")
    public ResponseEntity<Boolean> toggleUserStatus(@PathVariable Long id) {
        return ResponseEntity.ok().body(userService.toggleUserStatus(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        return ResponseEntity.noContent().build();
    }
}
