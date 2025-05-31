package com.dresscode.controller;

import com.dresscode.constants.ApiRoutes;
import com.dresscode.model.User;
import com.dresscode.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    private User mockUser;

    @BeforeEach
    void setup() {
        mockUser = new User();
        mockUser.setId(1L);
        mockUser.setName("TestUser");
        // Set other fields as needed
    }

    @Test
    void testGetAllUsers_withResults() throws Exception {
        when(userService.getAllUsers()).thenReturn(Arrays.asList(mockUser));

        mockMvc.perform(get(ApiRoutes.USERS + "/")
                .param("param", "dummy"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].name").value("TestUser"));
    }

    @Test
    void testGetAllUsers_empty() throws Exception {
        when(userService.getAllUsers()).thenReturn(Collections.emptyList());

        mockMvc.perform(get(ApiRoutes.USERS + "/")
                .param("param", "dummy"))
                .andExpect(status().isNoContent());
    }

    @Test
    void testGetUserById_found() throws Exception {
        when(userService.getUserById(1L)).thenReturn(Optional.of(mockUser));

        mockMvc.perform(get(ApiRoutes.USERS + "/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("TestUser"));
    }

    @Test
    void testGetUserById_notFound() throws Exception {
        when(userService.getUserById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(get(ApiRoutes.USERS + "/{id}", 1L))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCreateUser() throws Exception {
        when(userService.createUser(any(User.class))).thenReturn(mockUser);

        mockMvc.perform(post(ApiRoutes.USERS + "/")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\": \"TestUser\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("TestUser"));
    }

    @Test
    void testUpdateUser() throws Exception {
        User updatedUser = new User();
        updatedUser.setId(1L);
        updatedUser.setName("UpdatedUser");

        when(userService.updateUser(eq(1L), any(User.class))).thenReturn(updatedUser);

        mockMvc.perform(put(ApiRoutes.USERS + "/{id}", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\": \"UpdatedUser\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("UpdatedUser"));
    }

    @Test
    void testDeleteUser() throws Exception {
        when(userService.deleteUser(1L)).thenReturn(mockUser);

        mockMvc.perform(delete(ApiRoutes.USERS + "/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }
}
