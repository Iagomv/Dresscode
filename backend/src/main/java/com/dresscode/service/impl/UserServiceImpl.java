package com.dresscode.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dresscode.dto.user.AdminUserCreationRequestDto;
import com.dresscode.enums.UserRoleEnum;
import com.dresscode.error.exceptions.EmailExistsException;
import com.dresscode.error.exceptions.ResourceNotFoundException;
import com.dresscode.mapper.UserMapper;
import com.dresscode.model.User;
import com.dresscode.repository.UserRepository;
import com.dresscode.service.UserService;
import com.dresscode.utils.CleanupLastName;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> getAllUsers() {
        List<User> userList = userRepository.findAll();
        if (userList.isEmpty()) {
            throw new ResourceNotFoundException("No users found");
        }
        return userList;
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User adminUserCreation(AdminUserCreationRequestDto dto) {

        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new EmailExistsException(dto.getEmail());
        }

        User user = userMapper.toUser(dto);
        user.setLastName(CleanupLastName.clean(dto.getLastName()));
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, User user) {
        return userRepository.findById(id).map(existingUser -> {
            existingUser.setName(user.getName());
            existingUser.setLastName(user.getLastName());
            existingUser.setPhoneNumber(user.getPhoneNumber());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            existingUser.setClases(user.getClases());
            existingUser.setLoans(user.getLoans());
            existingUser.setRole(user.getRole());
            existingUser.setActive(user.isActive());
            return userRepository.save(existingUser);
        }).orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
    }

    @Override
    public User deleteUser(Long id) {
        return userRepository.findById(id).map(existingUser -> {
            userRepository.delete(existingUser);
            return existingUser;
        }).orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
    }

}
