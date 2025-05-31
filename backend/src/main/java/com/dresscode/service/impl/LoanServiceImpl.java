package com.dresscode.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dresscode.error.exceptions.ResourceNotFoundException;
import com.dresscode.model.Loan;
import com.dresscode.repository.LoanRepository;
import com.dresscode.service.LoanService;

@Service
public class LoanServiceImpl implements LoanService {

    @Autowired
    private LoanRepository loanRepository;

    @Override
    public List<Loan> getAllLoans() {
        List<Loan> loans = loanRepository.findAll();
        if (loans.isEmpty()) {
            throw new ResourceNotFoundException("No loans found");
        }
        return loans;
    }

    @Override
    public Optional<Loan> getLoanById(Long id) {
        return loanRepository.findById(id);
    }

    @Override
    public Loan createLoan(Loan Loan) {
        return loanRepository.save(Loan);
    }

    @Override
    public Loan updateLoan(Long id, Loan loan) {
        return loanRepository.findById(id).map(existingLoan -> {
            existingLoan.setStartingDate(loan.getStartingDate());
            existingLoan.setEndingDate(loan.getEndingDate());
            existingLoan.setState(loan.getState());
            existingLoan.setUser(loan.getUser());
            existingLoan.setClothingItems(loan.getClothingItems());
            return loanRepository.save(existingLoan);
        }).orElseThrow(() -> new ResourceNotFoundException("Loan not found with id " + id));
    }

    @Override
    public Loan deleteLoan(Long id) {
        return loanRepository.findById(id).map(existingLoan -> {
            loanRepository.delete(existingLoan);
            return existingLoan;
        }).orElseThrow(() -> new RuntimeException("Loan not found with id " + id));
    }

    @Override
    public List<Loan> getLoansByUserId(Long userId) {
        List<Loan> loans = loanRepository.findByUserId(userId);
        return loans != null ? loans : List.of();
    }

}
