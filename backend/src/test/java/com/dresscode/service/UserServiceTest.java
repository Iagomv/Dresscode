package com.dresscode.service;

import com.dresscode.dto.user.AdminUserCreationRequestDto;
import com.dresscode.dto.user.UserUpdateRequestDto;
import com.dresscode.error.exceptions.EmailExistsException;
import com.dresscode.error.exceptions.PhoneNumberExistsException;
import com.dresscode.error.exceptions.ResourceNotFoundException;
import com.dresscode.mapper.UserMapper;
import com.dresscode.model.User;
import com.dresscode.repository.UserRepository;
import com.dresscode.service.impl.UserServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    private User existingUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        existingUser = new User();
        existingUser.setId(1L);
        existingUser.setEmail("john@example.com");
        existingUser.setPhoneNumber("1234567890");
        existingUser.setPassword("encoded");
    }

    //
    // getAllUsers() / getUserById()
    //

    @Test
    void getAllUsers_WhenEmpty_Throws() {
        when(userRepository.findAll()).thenReturn(java.util.Collections.emptyList());
        assertThrows(ResourceNotFoundException.class, () -> userService.getAllUsers());
    }

    @Test
    void getAllUsers_ReturnsList() {
        when(userRepository.findAll()).thenReturn(java.util.List.of(existingUser));
        var list = userService.getAllUsers();
        assertEquals(1, list.size());
        assertSame(existingUser, list.get(0));
    }

    @Test
    void getUserById_Found() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(existingUser));
        Optional<User> userOpt = userService.getUserById(1L);
        assertTrue(userOpt.isPresent());
        assertSame(existingUser, userOpt.get());
    }

    @Test
    void getUserById_NotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        assertFalse(userService.getUserById(1L).isPresent());
    }

    //
    // createUser()
    //

    @Test
    void createUser_SavesAndReturns() {
        when(userRepository.save(existingUser)).thenReturn(existingUser);
        User result = userService.createUser(existingUser);
        assertSame(existingUser, result);
        verify(userRepository).save(existingUser);
    }

    //
    // adminUserCreation()
    //

    @Test
    void adminUserCreation_EmailExists_Throws() {
        var dto = new AdminUserCreationRequestDto();
        dto.setEmail("john@example.com");
        when(userRepository.existsByEmail(dto.getEmail())).thenReturn(true);

        assertThrows(EmailExistsException.class,
                () -> userService.adminUserCreation(dto));
    }

    @Test
    void adminUserCreation_Success() {
        var dto = new AdminUserCreationRequestDto();
        dto.setEmail("new@example.com");
        dto.setLastName("  Smith  ");
        dto.setPassword("plain");
        when(userRepository.existsByEmail(dto.getEmail())).thenReturn(false);

        User mapped = new User();
        mapped.setEmail(dto.getEmail());
        mapped.setLastName("Smith");
        mapped.setPassword("plain");
        when(userMapper.toUser(dto)).thenReturn(mapped);
        when(passwordEncoder.encode("plain")).thenReturn("encoded");
        when(userRepository.save(mapped)).thenAnswer(i -> {
            mapped.setId(42L);
            return mapped;
        });

        User created = userService.adminUserCreation(dto);
        assertEquals(42L, created.getId());
        assertEquals("encoded", created.getPassword());
        assertEquals("Smith", created.getLastName());
    }

    //
    // updateUser()
    //

    @Test
    void updateUser_NotFound_Throws() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class,
                () -> userService.updateUser(new UserUpdateRequestDto(), 1L));
    }

    @Test
    void updateUser_EmailConflict_Throws() {
        var dto = new UserUpdateRequestDto();
        dto.setEmail("other@example.com");
        dto.setPhoneNumber(existingUser.getPhoneNumber());
        when(userRepository.findById(1L)).thenReturn(Optional.of(existingUser));
        when(userRepository.existsByEmail(dto.getEmail())).thenReturn(true);

        assertThrows(EmailExistsException.class,
                () -> userService.updateUser(dto, 1L));
    }

    @Test
    void updateUser_PhoneConflict_Throws() {
        var dto = new UserUpdateRequestDto();
        dto.setEmail(existingUser.getEmail());
        dto.setPhoneNumber("000000");
        when(userRepository.findById(1L)).thenReturn(Optional.of(existingUser));
        when(userRepository.existsByPhoneNumber(dto.getPhoneNumber())).thenReturn(true);

        assertThrows(PhoneNumberExistsException.class,
                () -> userService.updateUser(dto, 1L));
    }

    @Test
    void updateUser_Success() {
        var dto = new UserUpdateRequestDto();
        dto.setEmail("new@example.com");
        dto.setPhoneNumber("000000");
        dto.setLastName("  Doe  ");

        when(userRepository.findById(1L)).thenReturn(Optional.of(existingUser));
        when(userRepository.existsByEmail(dto.getEmail())).thenReturn(false);
        when(userRepository.existsByPhoneNumber(dto.getPhoneNumber())).thenReturn(false);

        doAnswer(invocation -> {
            // simulate mapper updating fields
            existingUser.setEmail(dto.getEmail());
            existingUser.setPhoneNumber(dto.getPhoneNumber());
            existingUser.setLastName("Doe");
            return null;
        }).when(userMapper).updateUserFromDto(dto, existingUser);

        when(userRepository.save(existingUser)).thenReturn(existingUser);

        User updated = userService.updateUser(dto, 1L);
        assertEquals("new@example.com", updated.getEmail());
        assertEquals("000000", updated.getPhoneNumber());
        assertEquals("Doe", updated.getLastName());
    }

    //
    // toggleUserStatus()
    //

    @Test
    void toggleUserStatus_NotFound_Throws() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class,
                () -> userService.toggleUserStatus(1L));
    }

    @Test
    void toggleUserStatus_Toggles() {
        existingUser.setActive(true);
        when(userRepository.findById(1L)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(existingUser)).thenReturn(existingUser);

        boolean status1 = userService.toggleUserStatus(1L);
        assertFalse(status1);

        // next toggle
        existingUser.setActive(false);
        when(userRepository.findById(1L)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(existingUser)).thenReturn(existingUser);

        boolean status2 = userService.toggleUserStatus(1L);
        assertTrue(status2);
    }

    //
    // deleteUser()
    //

    // @Test
    // void deleteUser_NotFound_Throws() {
    // when(userRepository.findById(1L)).thenReturn(Optional.empty());
    // assertThrows(ResourceNotFoundException.class,
    // () -> userService.deleteUser(1L));
    // }

    // @Test
    // void deleteUser_Success() {
    // when(userRepository.findById(1L)).thenReturn(Optional.of(existingUser));
    // userService.deleteUser(1L);
    // verify(userRepository).delete(existingUser);
    // }
}
