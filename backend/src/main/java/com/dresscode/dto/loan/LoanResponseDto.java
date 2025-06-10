package com.dresscode.dto.loan;

import com.dresscode.enums.LoanStateEnum;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

/**
 * DTO for a loan response.
 */
@Data
public class LoanResponseDto {

    /**
     * Unique identifier of the loan.
     */
    private Long id;

    /**
     * User identifier of the user who requested the loan.
     */
    private Long userId;

    /**
     * User name of the user who requested the loan.
     */
    private String userName;

    /**
     * User identifier of the user who accepted the loan.
     */
    private Long acceptedById;

    /**
     * User name of the user who accepted the loan.
     */
    private String acceptedByName;

    /**
     * Starting date of the loan.
     */
    private LocalDate startingDate;

    /**
     * Ending date of the loan.
     */
    private LocalDate endingDate;

    /**
     * State of the loan.
     */
    private LoanStateEnum state;

    /**
     * Clothing item identifiers associated with the loan.
     */
    private Set<Long> clothingItemIds;
}
