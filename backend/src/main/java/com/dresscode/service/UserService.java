package com.dresscode.service;

import java.util.List;
import java.util.Optional;

import com.dresscode.model.User;

public interface UserService {
    public List<User> getAllUsers();

    public Optional<User> getUserById(Long id);

    public User createUser(User User);

    public User updateUser(Long id, User User);

    public User deleteUser(Long id);

}
