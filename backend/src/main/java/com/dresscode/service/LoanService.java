package com.dresscode.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.dresscode.model.Loan;

@Service
public interface LoanService {
        
    public  List<Loan> getAllLoans();
    
    public  Optional<Loan> getLoanById(Long id);
    
    public  Loan createLoan(Loan Loan);
    
    public  Loan updateLoan(Long id, Loan Loan);
    
    public  Loan deleteLoan(Long id);
    
    public  List<Loan> getLoansByUserId(Long userId);
    
}
