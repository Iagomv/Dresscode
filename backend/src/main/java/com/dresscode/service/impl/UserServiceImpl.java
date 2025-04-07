package com.dresscode.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dresscode.model.User;
import com.dresscode.repository.UserRepository;
import com.dresscode.service.UserService;

@Service
public class UserServiceImpl implements UserService{


    @Autowired
    private UserRepository userRepository;

    
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User createUser(User User) {
        return userRepository.save(User);
    }

    @Override
    public User updateUser(Long id, User User) {
        return userRepository.findById(id).map(existingUser -> {
            existingUser.setName(User.getName());
            existingUser.setLastName(User.getLastName());
            existingUser.setPhoneNumber(User.getPhoneNumber());
            existingUser.setEmail(User.getEmail());
            existingUser.setPassword(User.getPassword());
            existingUser.setClases(User.getClases());
            existingUser.setLoans(User.getLoans());
            existingUser.setRole(User.getRole());
            existingUser.setActive(User.isActive());
            return userRepository.save(existingUser);
        }).orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }

    @Override
    public User deleteUser(Long id) {
        return userRepository.findById(id).map(existingUser -> {
            userRepository.delete(existingUser);
            return existingUser;
        }).orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }

    
    
}
