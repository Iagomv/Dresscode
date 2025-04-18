package com.dresscode.service;


import com.dresscode.model.Loan;
import com.dresscode.model.User;
import com.dresscode.repository.LoanRepository;
import com.dresscode.service.impl.LoanServiceImpl;
import com.dresscode.enums.LoanStateEnum;
import com.dresscode.error.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LoanServiceTest {

    @Mock
    private LoanRepository loanRepository;

    @InjectMocks
    private LoanServiceImpl loanService;

    private Loan mockLoan;

    @BeforeEach
    void setup() {
        mockLoan = new Loan();
        mockLoan.setId(1L);
        mockLoan.setStartingDate(LocalDate.parse("2025-04-01"));
        mockLoan.setEndingDate(LocalDate.parse("2025-04-15"));
        mockLoan.setState(LoanStateEnum.LOANED);
        mockLoan.setUser(new User(1L, "user1",null, null,"user1@email.test", null, null, null, null, false));
        mockLoan.setClothingItems(null);  
    }

    @Test
    void getAllLoansTest() {
        when(loanRepository.findAll()).thenReturn(List.of(mockLoan));

        List<Loan> loans = loanService.getAllLoans();
        assertThat(loans).hasSize(1);
        assertThat(loans.get(0).getId()).isEqualTo(1L);
        verify(loanRepository, times(1)).findAll();
    }

    @Test
    void getLoanByIdTest() {
        when(loanRepository.findById(1L)).thenReturn(Optional.of(mockLoan));

        Optional<Loan> loan = loanService.getLoanById(1L);
        assertThat(loan).isPresent();
        assertThat(loan.get().getId()).isEqualTo(1L);
        verify(loanRepository, times(1)).findById(1L);
    }

    @Test
    void createLoanTest() {
        when(loanRepository.save(mockLoan)).thenReturn(mockLoan);

        Loan createdLoan = loanService.createLoan(mockLoan);
        assertThat(createdLoan).isNotNull();
        assertThat(createdLoan.getId()).isEqualTo(1L);
        assertThat(createdLoan.getStartingDate()).isEqualTo("2025-04-01");
        verify(loanRepository, times(1)).save(mockLoan);
    }

    @Test
    void updateLoanTest() {
        when(loanRepository.findById(mockLoan.getId())).thenReturn(Optional.of(mockLoan));
        when(loanRepository.save(mockLoan)).thenReturn(mockLoan);

        mockLoan.setEndingDate(LocalDate.parse("2025-04-20"));
        Loan updatedLoan = loanService.updateLoan(mockLoan.getId(), mockLoan);

        assertThat(updatedLoan).isNotNull();
        assertThat(updatedLoan.getEndingDate()).isEqualTo("2025-04-20");
        verify(loanRepository, times(1)).findById(mockLoan.getId());
        verify(loanRepository, times(1)).save(mockLoan);
    }

    @Test
    void updateLoanNotFoundTest() {
        when(loanRepository.findById(999L)).thenReturn(Optional.empty());

        // Simulate a Loan not found scenario and assert that an exception is thrown
        try {
            loanService.updateLoan(999L, mockLoan);
        } catch (ResourceNotFoundException ex) {
            assertThat(ex.getMessage()).isEqualTo("Loan not found with id 999");
        }
    }

    @Test
    void deleteLoanTest() {
        when(loanRepository.findById(mockLoan.getId())).thenReturn(Optional.of(mockLoan));

        Loan deletedLoan = loanService.deleteLoan(mockLoan.getId());

        assertThat(deletedLoan).isNotNull();
        assertThat(deletedLoan.getId()).isEqualTo(1L);
        assertThat(deletedLoan.getState()).isEqualTo(LoanStateEnum.LOANED);
        verify(loanRepository, times(1)).findById(mockLoan.getId());
        verify(loanRepository, times(1)).delete(mockLoan);
    }

    @Test
    void deleteLoanNotFoundTest() {
        when(loanRepository.findById(999L)).thenReturn(Optional.empty());

        // Simulate a Loan not found scenario and assert that an exception is thrown
        try {
            loanService.deleteLoan(999L);
        } catch (RuntimeException ex) {
            assertThat(ex.getMessage()).isEqualTo("Loan not found with id 999");
        }
    }

    @Test
    void getLoansByUserIdTest() {
        Loan loan1 = new Loan();
        loan1.setId(1L);
        loan1.setUser(mockLoan.getUser());

        Loan loan2 = new Loan();
        loan2.setId(2L);
        loan2.setUser(mockLoan.getUser());

        when(loanRepository.findByUserId(mockLoan.getUser().getId())).thenReturn(List.of(loan1, loan2));

        List<Loan> loans = loanService.getLoansByUserId(mockLoan.getUser().getId());

        assertThat(loans).hasSize(2);
        assertThat(loans.get(0).getId()).isEqualTo(1L);
        assertThat(loans.get(1).getId()).isEqualTo(2L);
        verify(loanRepository, times(1)).findByUserId(mockLoan.getUser().getId());
    }
}