package com.dresscode.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

import com.dresscode.enums.LoanStateEnum;

@Data
@Entity
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDate startingDate;
    private LocalDate endingDate;

    @Enumerated(EnumType.STRING)
    private LoanStateEnum state;

    @ManyToMany
    @JoinTable(name = "loan_clothing_items", joinColumns = @JoinColumn(name = "loan_id"), inverseJoinColumns = @JoinColumn(name = "clothing_item_id"))
    private Set<ClothingItem> clothingItems;

}