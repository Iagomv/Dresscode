package com.dresscode.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Set;

import com.dresscode.enums.LoanStateEnum;

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

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL)
    private Set<ClothingItem> clothingItems;
    

    public Loan() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public LocalDate getStartingDate() { return startingDate; }
    public void setStartingDate(LocalDate startingDate) { this.startingDate = startingDate; }

    public LocalDate getEndingDate() { return endingDate; }
    public void setEndingDate(LocalDate endingDate) { this.endingDate = endingDate; }

    public LoanStateEnum getState() { return state; }
    public void setState(LoanStateEnum state) { this.state = state; }

    public Set<ClothingItem> getClothingItems() { return clothingItems; }
    public void setClothingItems(Set<ClothingItem> clothingItems) { this.clothingItems = clothingItems; }

}
