package com.dresscode.service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.dresscode.model.Clase;
import com.dresscode.model.User;
import com.dresscode.repository.ClaseRepository;
import com.dresscode.service.impl.ClaseServiceImpl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClaseServiceTest {

    @Mock
    private ClaseRepository claseRepository;

    @InjectMocks
    private ClaseServiceImpl claseService;

    private Clase mockClase;

    @BeforeEach
    void setup() {
        mockClase = new Clase();
        mockClase.setId(1L);
        mockClase.setName("Danza");
        mockClase.setUsers(null);
    }

    @Test
    void getAllClasesTest() {
        when(claseRepository.findAll()).thenReturn(Arrays.asList(mockClase));

        List<Clase> clases = claseService.getAllClases();
        assertThat(clases).hasSize(1);
        verify(claseRepository, times(1)).findAll();
    }

    @Test
    void getClaseByIdTest() {
        when(claseRepository.findById(1L)).thenReturn(Optional.of(mockClase));

        Optional<Clase> clase = claseService.getClaseById(1L);
        assertThat(clase).isNotNull();
        assertThat(clase).isPresent();
        assertThat(clase.get().getName()).isEqualTo("Danza");
    }

    @Test
    void createClaseTest() {
        when(claseRepository.save(mockClase)).thenReturn(mockClase);

        Clase clase = claseService.createClase(mockClase);
        assertThat(clase).isNotNull();
        assertThat(clase.getId()).isEqualTo(1L);
        assertThat(clase.getName()).isEqualTo("Danza");
        verify(claseRepository, times(1)).save(mockClase);
    }

    void updateClaseTest() {
        when(claseRepository.findById(mockClase.getId())).thenReturn(Optional.of(mockClase));
        when(claseRepository.save(mockClase)).thenReturn(mockClase);

        Clase clase = claseService.updateClase(mockClase.getId(), mockClase);

        assertThat(clase).isNotNull();
        assertThat(clase.getId()).isEqualTo(1L);
        assertThat(clase.getName()).isEqualTo("Danza");
    }

    @Test
    void deleteClaseTest() {
        when(claseRepository.findById(mockClase.getId())).thenReturn(Optional.of(mockClase));

        Clase clase = claseService.deleteClaseById(mockClase.getId());

        assertThat(clase).isNotNull();
        assertThat(clase.getId()).isEqualTo(1L);
        assertThat(clase.getName()).isEqualTo("Danza");
        assertThat(claseService.getAllClases().size()).isEqualTo(0);
        verify(claseRepository, times(1)).delete(mockClase);
    }

    @Test
    void getUsersByClaseIdTest() {
        Set<User> mockedUsers = new HashSet<>();
        mockedUsers.add(new User(1L, "user1", null, null, "user1@email.test", null, null, null, null, false));
        mockedUsers.add(new User(2L, "user2", null, null, null, null, null, null, null, true));

        mockClase.setUsers(mockedUsers);

        when(claseRepository.findById(mockClase.getId())).thenReturn(Optional.of(mockClase));

        Set<User> users = claseService.getUsersByClaseId(mockClase.getId());

        assertThat(users).isEqualTo(mockedUsers);
        User foundUser = users.stream().filter(u -> u.getId().equals(1L)).findFirst().orElse(null);
        assertThat(foundUser).isNotNull();
        assertThat(foundUser.getName()).isEqualTo("user1");
        assertThat(foundUser.getEmail()).isEqualTo("user1@email.test");
        verify(claseRepository, times(1)).findById(mockClase.getId());
    }

}
