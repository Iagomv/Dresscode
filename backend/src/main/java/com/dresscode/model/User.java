package com.dresscode.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
import com.dresscode.enums.UserRoleEnum;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    @Size(min = 3, max = 20)
    private String name;
    private String lastName;
    private String phoneNumber;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @JsonIgnore
    private String password;

    @ManyToMany // Relación muchos a muchos con Clase
    @JoinTable(name = "user_class", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "class_id"))
    private Set<Clase> clases;

    @OneToMany(mappedBy = "user") // Relación uno a muchos con Loan
    private Set<Loan> loans;

    @Enumerated(EnumType.STRING)
    private UserRoleEnum role;
    private boolean active;

    public User(String name, String lastName, String phoneNumber, String email, String password, Set<Clase> clases,
            Set<Loan> loans, UserRoleEnum role, boolean active) {
        this.name = name;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.clases = clases;
        this.loans = loans;
        this.role = role;
        this.active = active;
    }

}
