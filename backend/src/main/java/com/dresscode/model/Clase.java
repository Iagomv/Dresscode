package com.dresscode.model;
import jakarta.persistence.*;
import java.util.Set;

import io.micrometer.common.lang.NonNull;

@Entity
public class Clase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Identificador único de la clase

    @NonNull
    private String name; // Nombre de la clase (Ejemplo: "Matemáticas")

    @ManyToMany(mappedBy = "clases") // Relación muchos a muchos inversa
    private Set<User> users; // Lista de users que pertenecen a esta clase


    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String nombre) {
        this.name = nombre;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}
