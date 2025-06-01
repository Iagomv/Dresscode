package com.dresscode.controller;

import com.dresscode.constants.ApiRoutes;
import com.dresscode.model.Clase;
import com.dresscode.model.User;
import com.dresscode.service.ClaseService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ClaseController.class)
@AutoConfigureMockMvc(addFilters = false)
public class ClaseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean // This mocks the ClaseService for the controller
    private ClaseService claseService;

    private Clase mockClase;
    private Set<User> mockUsers;

    @BeforeEach
    void setup() {
        mockClase = new Clase();
        mockClase.setId(1L);
        mockClase.setName("Danza");

        mockUsers = new HashSet<>();
        User user1 = new User(1L, "user1", null, null, null, null, null, null, null, false);
        mockUsers.add(user1);
    }

    @Test
    void testGetAllClases() throws Exception {
        List<Clase> mockClases = Arrays.asList(mockClase);
        when(claseService.getAllClases()).thenReturn(mockClases);

        mockMvc.perform(get(ApiRoutes.CLASES + "/"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].name").value("Danza"));
    }

    @Test
    void testGetClaseById_found() throws Exception {
        when(claseService.getClaseById(1L)).thenReturn(Optional.of(mockClase));

        mockMvc.perform(get(ApiRoutes.CLASES + "/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Danza"));
    }

    @Test
    void testGetClaseById_notFound() throws Exception {
        when(claseService.getClaseById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(get(ApiRoutes.CLASES + "/{id}", 1L))
                .andExpect(status().isNotFound());
    }

    @Test
    void testGetClaseUsers() throws Exception {
        when(claseService.getUsersByClaseId(1L)).thenReturn(mockUsers);

        mockMvc.perform(get(ApiRoutes.CLASES + "/users/{claseId}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].name").value("user1"));
    }

    @Test
    void testInsertClase() throws Exception {
        when(claseService.createClase(any(Clase.class))).thenReturn(mockClase);

        mockMvc.perform(post(ApiRoutes.CLASES + "/")
                .contentType("application/json")
                .content("{\"name\": \"Danza\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Danza"));
    }

    @Test
    void testUpdateClase() throws Exception {
        Clase updatedClase = new Clase();
        updatedClase.setId(1L);
        updatedClase.setName("Danza Updated");

        when(claseService.updateClase(eq(1L), any(Clase.class))).thenReturn(updatedClase);

        mockMvc.perform(patch(ApiRoutes.CLASES + "/{id}", 1L)
                .contentType("application/json")
                .content("{\"name\": \"Danza Updated\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Danza Updated"));
    }

    @Test
    void testDeleteClase() throws Exception {
        when(claseService.deleteClaseById(1L)).thenReturn(mockClase);

        mockMvc.perform(delete(ApiRoutes.CLASES + "/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Danza"));
    }

    @Test
    void testDeleteClase_notFound() throws Exception {
        when(claseService.deleteClaseById(1L)).thenReturn(null);

        mockMvc.perform(delete(ApiRoutes.CLASES + "/{id}", 1L))
                .andExpect(status().isNotFound());
    }
}
