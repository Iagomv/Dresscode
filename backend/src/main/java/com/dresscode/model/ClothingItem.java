package com.dresscode.model;

import java.sql.Timestamp;
import com.dresscode.enums.ClothingItemAvailabilityEnum;
import com.dresscode.enums.ClothingItemSizeEnum;
import com.dresscode.enums.ClothingItemStateEnum;

import jakarta.persistence.*;

@Entity
public class ClothingItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Identificador único de la prenda

    private String ciCode; // Código que identifica el tipo de ropa (e.g., "Pantalón Hombre")

    @Enumerated(EnumType.STRING)
    private ClothingItemSizeEnum size; // Tamaño de la prenda (e.g., S, M, L)

    @Enumerated(EnumType.STRING)
    private ClothingItemAvailabilityEnum availability; // Disponibilidad de la prenda (e.g., "Disponible", "No Disponible", "Perdido", "Vendido", "Reservado")

    private String description; // Descripción de la prenda (detalles sobre el material, el estilo, etc.)

    private String color; // Color de la prenda

    private double prize; // Precio de la prenda (si es necesario)

    private Timestamp acquisitionDate; // Acquisition date (fecha de adquisición de la prenda)

    private ClothingItemStateEnum state; // Estado de la prenda (e.g., "Nueva", "Usada")

    

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = true) // El usuario que tiene la prenda (puede ser null si la prenda está disponible)
    private User user;

    @ManyToOne
    @JoinColumn(name = "prestamo_id", nullable = true) // El préstamo al que pertenece la prenda
    private Loan loan;

    // Constructor
    public ClothingItem() {}

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCiCode() {
        return ciCode;
    }

    public void setCiCode(String codigoPrenda) {
        this.ciCode = codigoPrenda;
    }

   

    public ClothingItemAvailabilityEnum getAvailability() {
        return availability;
    }

    public void setAvailability(ClothingItemAvailabilityEnum disponibilidad) {
        this.availability = disponibilidad;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String descripcion) {
        this.description = descripcion;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public double getPrize() {
        return prize;
    }

    public void setPrize(double precio) {
        this.prize = precio;
    }

    public Timestamp getAcquisitionDate() {
        return acquisitionDate;
    }

    public void setAcquisitionDate(Timestamp fechaAdquisicion) {
        this.acquisitionDate = fechaAdquisicion;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User usuario) {
        this.user = usuario;
    }

    public Loan getLoan() {
        return loan;
    }

    public void setLoan(Loan prestamo) {
        this.loan = prestamo;
    }

    public ClothingItemSizeEnum getSize() {
        return size;
    }

    public void setSize(ClothingItemSizeEnum size) {
        this.size = size;
    }
    public ClothingItemStateEnum getState() {
        return state;
    }

    public void setState(ClothingItemStateEnum state) {
        this.state = state;
    }
}
