package com.dresscode.service;

import com.dresscode.dto.loan.AdminLoanRequestDto;
import com.dresscode.dto.loan.LoanRequestDto;
import com.dresscode.dto.loan.LoanResponseDto;
import com.dresscode.dto.loan.LoanWithLightUserResponseDto;
import com.dresscode.error.exceptions.EntityNotFoundException;
import com.dresscode.error.exceptions.ResourceNotFoundException;
import com.dresscode.error.exceptions.UnauthorizedException;

import java.util.List;

/**
 * This interface provides methods for managing loans.
 */
public interface LoanService {

    /**
     * Retrieves a list of all loans.
     * 
     * @return a list of LoanResponseDto objects
     */
    List<LoanResponseDto> getAllLoans();

    /**
     * Retrieves a list of all loans.
     * 
     * @return a list of LoanWithLightUserResponseDto objects
     */
    List<LoanWithLightUserResponseDto> getAllLoansWithUserInfo();

    /**
     * Retrieves a loan by its ID.
     * 
     * @param id the ID of the loan to retrieve
     * @return the LoanResponseDto object
     * @throws ResourceNotFoundException if the loan is not found
     */
    LoanResponseDto getLoanById(Long id);

    /**
     * Retrieves a list of loans by user ID.
     * 
     * @param userId the ID of the user to retrieve loans for
     * @return a list of LoanResponseDto objects
     */
    List<LoanResponseDto> getLoansByUserId(Long userId);

    /**
     * Requests a loan for a user.
     * 
     * @param loanRequestDto the LoanRequestDto object containing the loan details
     * @return the created LoanResponseDto object
     */
    LoanResponseDto requestLoan(LoanRequestDto loanRequestDto);

    /**
     * Creates a loan with full control over fields for admin users.
     * 
     * This method allows an admin to create a loan where they can specify
     * the user, the accepting user, and the loan state. If the state is
     * not provided, it defaults to PENDING. The method maps the given
     * DTO to an entity, saves it in the repository, and then returns
     * the saved loan as a response DTO.
     * 
     * @param adminLoanRequestDto the AdminLoanRequestDto object containing
     *                            the loan details
     * @return the created LoanResponseDto object
     * @throws EntityNotFoundException if the specified user or acceptedBy
     *                                 user is not found
     */
    LoanResponseDto createLoanAsAdmin(AdminLoanRequestDto adminLoanRequestDto);

    /**
     * Updates a loan as an admin user.
     * 
     * @param id                  the ID of the loan to update
     * @param adminLoanRequestDto the AdminLoanRequestDto object containing the
     *                            updated
     *                            loan details
     * @return the updated LoanResponseDto object
     */
    LoanResponseDto updateLoan(Long id, AdminLoanRequestDto adminLoanRequestDto);

    /**
     * Deletes a loan by its ID.
     * 
     * @param id the ID of the loan to delete
     * @return the deleted LoanResponseDto object
     */
    LoanResponseDto deleteLoanById(Long id);

    /**
     * Retrieves a list of loans for the currently authenticated user.
     * 
     * @return a list of LoanResponseDto objects
     * @throws UnauthorizedException if the user is not in the security context
     */
    List<LoanResponseDto> getMyLoans();
}
