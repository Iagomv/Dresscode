package com.dresscode.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.dresscode.enums.ClothingItemAvailabilityEnum;
import com.dresscode.enums.ClothingItemGenderEnum;
import com.dresscode.enums.ClothingItemSizeEnum;
import com.dresscode.enums.ClothingItemStateEnum;
import com.dresscode.enums.ClothingItemTypeEnum;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class ClothingItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Identificador único de la prenda

    @Size(min = 3, max = 100)
    private String name; // Nombre de la prenda

    @Size(max = 255)
    private String imageUrl; // URL de la imagen de la prenda

    private String description; // Descripción de la prenda (detalles sobre el material, el estilo, etc.)\

    private Integer quantity; // Cantidad de prendas disponibles

    @Size(max = 50)
    private String color; // Color de la prenda

    @Column(precision = 10, scale = 2)
    private BigDecimal price; // Precio de la prenda

    private LocalDateTime acquisitionDate; // Acquisition date (fecha de adquisición de la prenda)

    @Enumerated(EnumType.STRING)
    private ClothingItemStateEnum state; // Estado de la prenda (e.g., "Nueva", "Usada")

    @Enumerated(EnumType.STRING)
    private ClothingItemGenderEnum gender; // Genero de la prenda

    @Enumerated(EnumType.STRING)
    private ClothingItemTypeEnum type; // Genero de la prenda

    @Enumerated(EnumType.STRING)
    private ClothingItemSizeEnum size; // Tamaño de la prenda (e.g., S, M, L)

    @Enumerated(EnumType.STRING)
    private ClothingItemAvailabilityEnum availability; // Disponibilidad de la prenda (e.g., "Disponible", "No
                                                       // Disponible", "Perdido", "Vendido", "Reservado")

    @PrePersist
    protected void onCreate() {
        this.acquisitionDate = LocalDateTime.now();
    }
}
