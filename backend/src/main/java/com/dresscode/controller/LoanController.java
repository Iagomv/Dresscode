package com.dresscode.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dresscode.constants.ApiRoutes;
import com.dresscode.error.exceptions.ResourceNotFoundException;
import com.dresscode.model.Loan;
import com.dresscode.service.LoanService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping(ApiRoutes.LOANS)
public class LoanController {

    @Autowired
    private LoanService loanService;

    @GetMapping()
    public ResponseEntity<List<Loan>> getAllLoans() {
        return ResponseEntity.ok(loanService.getAllLoans());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Loan> getLoanById(@PathVariable Long id) {
        return loanService.getLoanById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found with id " + id));
    }

    @PostMapping()
    public ResponseEntity<Loan> createLoan(@RequestBody Loan loan) {
        Loan savedLoan = loanService.createLoan(loan);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedLoan);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Loan> updateLoan(@PathVariable Long id, @RequestBody Loan loan) {
        Loan updatedLoan = loanService.updateLoan(id, loan);
        return ResponseEntity.ok(updatedLoan);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Loan> deleteLoan(@PathVariable Long id) {
        Loan loan = loanService.deleteLoan(id);
        return loan == null
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok().body(loan);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Loan>> getLoansByUserId(@PathVariable Long userId) {
        List<Loan> userLoans = loanService.getLoansByUserId(userId);
        return userLoans.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(userLoans);
    }
}
