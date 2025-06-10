package com.dresscode.controller;

import com.dresscode.constants.ApiRoutes;
import com.dresscode.dto.loan.AdminLoanRequestDto;
import com.dresscode.dto.loan.LoanRequestDto;
import com.dresscode.dto.loan.LoanResponseDto;
import com.dresscode.dto.loan.LoanWithLightUserResponseDto;
import com.dresscode.service.LoanService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiRoutes.LOANS)
public class LoanController {

    private final LoanService loanService;

    @Autowired
    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    @GetMapping
    public ResponseEntity<List<LoanResponseDto>> getAllLoans() {
        List<LoanResponseDto> loans = loanService.getAllLoans();
        return ResponseEntity.ok(loans);
    }

    @GetMapping("/with-user-info")
    public ResponseEntity<List<LoanWithLightUserResponseDto>> getAllLoansWithUserInfo() {
        List<LoanWithLightUserResponseDto> loans = loanService.getAllLoansWithUserInfo();
        return ResponseEntity.ok(loans);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanResponseDto> getLoanById(@PathVariable Long id) {
        LoanResponseDto loan = loanService.getLoanById(id);
        return ResponseEntity.ok(loan);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LoanResponseDto>> getLoansByUserId(@PathVariable Long userId) {
        List<LoanResponseDto> loans = loanService.getLoansByUserId(userId);
        return ResponseEntity.ok(loans);
    }

    /**
     * Endpoint for regular users to create a loan request.
     * The loan state will be set to PENDING automatically.
     */
    @PostMapping
    public ResponseEntity<LoanResponseDto> requestLoan(@Valid @RequestBody LoanRequestDto loanRequestDto) {
        LoanResponseDto created = loanService.requestLoan(loanRequestDto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    /**
     * Admin endpoint to create loans with full control over all fields,
     * including state, acceptedBy, and dates.
     */
    @PostMapping("/admin")
    public ResponseEntity<LoanResponseDto> createLoanAsAdmin(
            @Valid @RequestBody AdminLoanRequestDto adminLoanRequestDto) {
        LoanResponseDto created = loanService.createLoanAsAdmin(adminLoanRequestDto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    /**
     * Admin endpoint to update existing loans.
     */
    @PutMapping("/admin/{id}")
    public ResponseEntity<LoanResponseDto> updateLoan(
            @PathVariable Long id,
            @RequestBody AdminLoanRequestDto adminLoanRequestDto) {
        LoanResponseDto updated = loanService.updateLoan(id, adminLoanRequestDto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoan(@PathVariable Long id) {
        loanService.deleteLoanById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/my-loans")
    public ResponseEntity<List<LoanResponseDto>> getMyLoans() {
        List<LoanResponseDto> loans = loanService.getMyLoans();
        return ResponseEntity.ok(loans);
    }
}
