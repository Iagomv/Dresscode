package com.dresscode.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
import com.dresscode.enums.UserRoleEnum;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name; 
    private String lastName;
    private Integer phoneNumber;
    private String email; 
    private String password; 

    @ManyToMany // Relación muchos a muchos con Clase
    @JoinTable(
        name = "user_class",
        joinColumns = @JoinColumn(name = "user_id"), 
        inverseJoinColumns = @JoinColumn(name = "class_id") 
    )
    private Set<Clase> clases; 

    @OneToMany(mappedBy = "user") // Relación uno a muchos con Loan
    private Set<Loan> loans;

    @Enumerated(EnumType.STRING)
    private UserRoleEnum role; 
    private boolean active;



    

    // // Getters y Setters

    // public Long getId() {
    //     return id;
    // }

    // public void setId(Long id) {
    //     this.id = id;
    // }

    // public String getName() {
    //     return name;
    // }

    // public void setName(String nombre) {
    //     this.name = nombre;
    // }
    // public String getLastName() {
    //     return lastName;
    // }

    // public void setLastName(String lastNamel) {
    //     this.lastName = lastNamel;
    // }

    // public Integer getPhoneNumber() {
    //     return phoneNumber;
    // }

    // public void setPhoneNumber(Integer phoneNumber) {
    //     this.phoneNumber = phoneNumber;
    // }

    // public String getEmail() {
    //     return email;
    // }

    // public void setEmail(String correo) {
    //     this.email = correo;
    // }

    // public String getPassword() {
    //     return password;
    // }

    // public void setPassword(String contrasena) {
    //     this.password = contrasena;
    // }

    // public Set<Clase> getClases() {
    //     return clases;
    // }

    // public void setClases(Set<Clase> clases) {
    //     this.clases = clases;
    // }

    // public UserRoleEnum getRole() {
    //     return role;
    // }

    // public void setRole(UserRoleEnum role) {
    //     this.role = role;
    // }
    
    // public boolean isActive() {
    //     return active;
    // }

    // public void setActive(boolean active) {
    //     this.active = active;
    // }

    // public Set<Loan> getLoans() {
    //     return loans;
    // }

    // public void setLoans(Set<Loan> loans) {
    //     this.loans = loans;
    // }
    
}
