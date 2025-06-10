package com.dresscode.dto.loan;

import com.dresscode.enums.LoanStateEnum;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

/**
 * DTO for creating a loan as an admin.
 */
@Data
public class AdminLoanRequestDto {

    /**
     * The ID of the user making the loan.
     */
    @NotNull(message = "userId is required")
    private Long userId;

    /**
     * Optional - if the loan has been accepted.
     */
    private Long acceptedById;

    /**
     * Optional can be prepersisted.
     */
    private LocalDate startingDate;

    /**
     * Optional - can be set later.
     */
    private LocalDate endingDate;

    /**
     * PENDING, ACTIVE, RETURNED, etc.
     */
    private LoanStateEnum state;

    /**
     * IDs of clothing items involved.
     */
    @NotNull(message = "ClothingItemIds are required")
    private Set<Long> clothingItemIds;
}
