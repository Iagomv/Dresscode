package com.dresscode.service;

import java.util.List;
import java.util.Optional;

import com.dresscode.dto.user.AdminUserCreationRequestDto;
import com.dresscode.dto.user.UserUpdateRequestDto;
import com.dresscode.model.User;

public interface UserService {
    public List<User> getAllUsers();

    public List<User> getUsersByActive(boolean flag);

    public Optional<User> getUserById(Long id);

    public User createUser(User User);

    public User adminUserCreation(AdminUserCreationRequestDto dto);

    public User updateUser(UserUpdateRequestDto User, Long id);

    public Boolean toggleUserStatus(Long id);

    public void deleteUser(Long id);

}
