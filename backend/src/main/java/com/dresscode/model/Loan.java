package com.dresscode.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

import com.dresscode.enums.LoanStateEnum;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@Entity
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many-to-one with User; consistent with User -> Loan relationship
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accepted_by_id")
    private User acceptedBy;

    @Column(nullable = false)
    private LocalDate startingDate;

    private LocalDate endingDate;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private LoanStateEnum state;

    @ManyToMany
    @JoinTable(name = "loan_clothing_items", joinColumns = @JoinColumn(name = "loan_id"), inverseJoinColumns = @JoinColumn(name = "clothing_item_id"))
    private Set<ClothingItem> clothingItems;

    @PrePersist
    public void prePersist() {
        if (startingDate == null) {
            this.startingDate = LocalDate.now();
        }
    }
}