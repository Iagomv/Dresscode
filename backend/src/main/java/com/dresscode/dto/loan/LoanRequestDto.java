package com.dresscode.dto.loan;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Set;

/**
 * DTO for users to create a new loan request.
 * The loan is always created as PENDING by default.
 */
@Data
public class LoanRequestDto {

    /**
     * Optional: The ID of the user making the loan.
     * If omitted, the system should use the authenticated user's ID.
     */
    private Long userId;

    /**
     * IDs of clothing items requested.
     */
    @NotNull(message = "clothingItemIds are required")
    private Set<Long> clothingItemIds;
}
