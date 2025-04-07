package com.dresscode.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dresscode.model.Loan;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    
    public List<Loan> findByUserId(Long userId);
    
}
