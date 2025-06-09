package com.dresscode.service.impl;

import com.dresscode.dto.loan.AdminLoanRequestDto;
import com.dresscode.dto.loan.LoanRequestDto;
import com.dresscode.dto.loan.LoanResponseDto;
import com.dresscode.enums.LoanStateEnum;
import com.dresscode.error.exceptions.EntityNotFoundException;
import com.dresscode.error.exceptions.UnauthorizedException;
import com.dresscode.mapper.LoanMapper;
import com.dresscode.model.Loan;
import com.dresscode.model.User;
import com.dresscode.repository.LoanRepository;
import com.dresscode.repository.UserRepository;
import com.dresscode.service.LoanService;
import com.dresscode.utils.SecurityUtils;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class LoanServiceImpl implements LoanService {

    private final LoanRepository loanRepository;
    private final LoanMapper loanMapper;
    private final UserRepository userRepository;

    @Override
    public List<LoanResponseDto> getAllLoans() {
        return loanRepository.findAll().stream()
                .map(loanMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public LoanResponseDto getLoanById(Long id) {
        Loan loan = loanRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Loan not found with id: " + id));
        return loanMapper.toDto(loan);
    }

    @Override
    public List<LoanResponseDto> getLoansByUserId(Long userId) {
        return loanRepository.findByUserId(userId).stream()
                .map(loanMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public LoanResponseDto requestLoan(LoanRequestDto loanRequestDto) {
        Long currentUserId = SecurityUtils.getCurrentUserId();
        if (currentUserId == null) {
            throw new UnauthorizedException("User must be logged in to request a loan.");
        }
        User user = userRepository.findById(currentUserId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + currentUserId));

        Loan loan = loanMapper.toEntity(loanRequestDto);
        loan.setUser(user);
        loan.setState(LoanStateEnum.PENDING); // Always start with PENDING state for user-created loans
        Loan savedLoan = loanRepository.save(loan);
        return loanMapper.toDto(savedLoan);
    }

    @Override
    public LoanResponseDto createLoanAsAdmin(AdminLoanRequestDto adminLoanRequestDto) {
        // Load the user making the loan
        User user = getUser(adminLoanRequestDto.getUserId());

        // Load the acceptedBy user (optional)
        User acceptedBy = null;
        if (adminLoanRequestDto.getAcceptedById() != null) {
            acceptedBy = getUser(adminLoanRequestDto.getAcceptedById());
        }

        // Map DTO to Entity
        Loan loan = loanMapper.toEntity(adminLoanRequestDto);

        // Assign users
        loan.setUser(user);
        loan.setAcceptedBy(acceptedBy);
        // If state is not provided, default to PENDING
        loan.setState(loan.getState() == null ? LoanStateEnum.PENDING : loan.getState());

        // Save and return
        Loan savedLoan = loanRepository.save(loan);
        return loanMapper.toDto(savedLoan);
    }

    @Override
    public LoanResponseDto updateLoan(Long id, AdminLoanRequestDto adminLoanRequestDto) {
        Loan existingLoan = loanRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Loan not found with id: " + id));
        loanMapper.updateLoanFromDto(adminLoanRequestDto, existingLoan);
        Loan updatedLoan = loanRepository.save(existingLoan);
        return loanMapper.toDto(updatedLoan);
    }

    @Override
    public LoanResponseDto deleteLoanById(Long id) {
        Loan loan = loanRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Loan not found with id: " + id));
        loanRepository.delete(loan);
        return loanMapper.toDto(loan);
    }

    // PRIVATE METHODS

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
    }
}
