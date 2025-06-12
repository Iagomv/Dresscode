package com.dresscode.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dresscode.model.Loan;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {

    public List<Loan> findByUserId(Long userId);

    @Query("SELECT l.state, COUNT(l) FROM Loan l GROUP BY l.state")
    List<Object[]> countByState();

    @Query("SELECT l.user.name, COUNT(l) FROM Loan l GROUP BY l.user.name")
    List<Object[]> countByUser();

    @Query("SELECT l.acceptedBy.name, COUNT(l) FROM Loan l WHERE l.acceptedBy IS NOT NULL GROUP BY l.acceptedBy.name")
    List<Object[]> countByApprover();

    @Query("SELECT COUNT(l) FROM Loan l WHERE l.startingDate >= :since")
    long countRecentLoans(LocalDate since);

    @Query("SELECT AVG(SIZE(l.clothingItems)) FROM Loan l")
    Double averageItemsPerLoan();

    @Query("SELECT COUNT(l) FROM Loan l WHERE l.endingDate < CURRENT_DATE AND l.state != 'RETURNED'")
    long countOverdueLoans();
}
