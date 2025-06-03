package com.dresscode.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.dresscode.dto.user.AdminUserCreationRequestDto;
import com.dresscode.dto.user.UserUpdateRequestDto;
import com.dresscode.error.exceptions.EmailExistsException;
import com.dresscode.error.exceptions.PhoneNumberExistsException;
import com.dresscode.error.exceptions.ResourceNotFoundException;
import com.dresscode.mapper.UserMapper;
import com.dresscode.model.User;
import com.dresscode.repository.UserRepository;
import com.dresscode.service.UserService;
import com.dresscode.utils.CleanupLastName;

import jakarta.transaction.Transactional;

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

    @Transactional
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

    @Transactional
    @Override
    public User updateUser(UserUpdateRequestDto dto, Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));

        if (!user.getEmail().equals(dto.getEmail()) && userRepository.existsByEmail(dto.getEmail())) {
            throw new EmailExistsException(dto.getEmail());
        }

        if (!user.getPhoneNumber().equals(dto.getPhoneNumber())
                && userRepository.existsByPhoneNumber(dto.getPhoneNumber())) {
            throw new PhoneNumberExistsException(dto.getPhoneNumber());
        }

        userMapper.updateUserFromDto(dto, user);
        return userRepository.save(user);
    }

    @Transactional
    @Override
    public Boolean toggleUserStatus(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
        user.setActive(!user.isActive());
        userRepository.save(user);
        return user.isActive();
    }

    @Transactional
    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
        userRepository.delete(user);
    }

}
