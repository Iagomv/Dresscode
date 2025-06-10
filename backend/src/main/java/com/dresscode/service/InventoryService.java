package com.dresscode.service;

import com.dresscode.dto.loan.AdminLoanRequestDto;
import com.dresscode.dto.loan.LoanRequestDto;
import com.dresscode.model.ClothingItem;

public interface InventoryService {

    /**
     * Updates the quantity of the specified clothing items when a loan is created.
     *
     * @param loanRequestDto the clothing item ids loaned
     */
    void updateQuantityOnLoan(LoanRequestDto loanRequestDto);

    /**
     * Updates the quantity of the specified clothing items when an admin loan is
     * created.
     *
     * @param adminLoanRequestDto the clothing item ids loaned
     */
    void updateQuantityOnLoan(AdminLoanRequestDto adminLoanRequestDto);

    /**
     * Updates the quantity of the specified clothing items when a loan is returned.
     *
     * @param loanRequestDto the clothing item ids returned
     */
    void updateQuantityOnReturn(LoanRequestDto loanRequestDto);

    /**
     * Updates the quantity of the specified clothing items when an admin loan is
     * returned.
     *
     * @param adminLoanRequestDto the clothing item ids returned
     */
    void updateQuantityOnReturn(AdminLoanRequestDto adminLoanRequestDto);

    void updateAvailabilityOnCreation(ClothingItem clothingItem);
}
