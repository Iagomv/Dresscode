package com.dresscode.service;

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
import com.dresscode.service.impl.LoanServiceImpl;
import com.dresscode.utils.SecurityUtils;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class LoanServiceTest {

    @Mock
    private LoanRepository loanRepository;

    @Mock
    private LoanMapper loanMapper;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private LoanServiceImpl loanService;

    private User mockUser;
    private Loan mockLoan;
    private LoanRequestDto loanRequestDto;
    private AdminLoanRequestDto adminLoanRequestDto;
    private LoanResponseDto loanResponseDto;

    @BeforeEach
    void setUp() {
        mockUser = new User();
        mockUser.setId(1L);

        mockLoan = new Loan();
        mockLoan.setId(1L);
        mockLoan.setUser(mockUser);
        mockLoan.setState(LoanStateEnum.PENDING);

        loanRequestDto = new LoanRequestDto();
        // Populate as needed, e.g., loanRequestDto.setAmount(1000.0);

        adminLoanRequestDto = new AdminLoanRequestDto();
        adminLoanRequestDto.setUserId(1L);
        adminLoanRequestDto.setClothingItemIds(Set.of(100L, 101L)); // Required field
        adminLoanRequestDto.setStartingDate(LocalDate.now());
        adminLoanRequestDto.setEndingDate(LocalDate.now().plusDays(30));
        adminLoanRequestDto.setState(LoanStateEnum.ACTIVE);

        loanResponseDto = new LoanResponseDto();
        loanResponseDto.setId(1L);
    }

    @Test
    void testRequestLoan_Success() {
        try (var mocked = mockStatic(SecurityUtils.class)) {
            mocked.when(SecurityUtils::getCurrentUserId).thenReturn(1L);

            when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
            when(loanMapper.toEntity(loanRequestDto)).thenReturn(mockLoan);
            when(loanRepository.save(any(Loan.class))).thenReturn(mockLoan);
            when(loanMapper.toDto(any(Loan.class))).thenReturn(loanResponseDto);

            LoanResponseDto result = loanService.requestLoan(loanRequestDto);

            assertNotNull(result);
            assertEquals(loanResponseDto.getId(), result.getId());
            verify(loanRepository, times(1)).save(any(Loan.class));
        }
    }

    @Test
    void testRequestLoan_Unauthorized() {
        try (var mocked = mockStatic(SecurityUtils.class)) {
            mocked.when(SecurityUtils::getCurrentUserId).thenReturn(null);

            assertThrows(UnauthorizedException.class, () -> loanService.requestLoan(loanRequestDto));
        }
    }

    @Test
    void testRequestLoan_UserNotFound() {
        try (var mocked = mockStatic(SecurityUtils.class)) {
            mocked.when(SecurityUtils::getCurrentUserId).thenReturn(1L);

            when(userRepository.findById(1L)).thenReturn(Optional.empty());

            assertThrows(EntityNotFoundException.class, () -> loanService.requestLoan(loanRequestDto));
        }
    }

    @Test
    void testCreateLoanAsAdmin_Success() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(loanMapper.toEntity(adminLoanRequestDto)).thenReturn(mockLoan);
        when(loanRepository.save(any(Loan.class))).thenReturn(mockLoan);
        when(loanMapper.toDto(any(Loan.class))).thenReturn(loanResponseDto);

        LoanResponseDto result = loanService.createLoanAsAdmin(adminLoanRequestDto);

        assertNotNull(result);
        assertEquals(loanResponseDto.getId(), result.getId());
        verify(loanRepository, times(1)).save(any(Loan.class));
    }

    @Test
    void testCreateLoanAsAdmin_UserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> loanService.createLoanAsAdmin(adminLoanRequestDto));
    }

    @Test
    void testGetLoanById_Success() {
        when(loanRepository.findById(1L)).thenReturn(Optional.of(mockLoan));
        when(loanMapper.toDto(mockLoan)).thenReturn(loanResponseDto);

        LoanResponseDto result = loanService.getLoanById(1L);

        assertNotNull(result);
        assertEquals(loanResponseDto.getId(), result.getId());
    }

    @Test
    void testGetLoanById_NotFound() {
        when(loanRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> loanService.getLoanById(1L));
    }

    @Test
    void testDeleteLoanById_Success() {
        when(loanRepository.findById(1L)).thenReturn(Optional.of(mockLoan));
        when(loanMapper.toDto(mockLoan)).thenReturn(loanResponseDto);

        LoanResponseDto result = loanService.deleteLoanById(1L);

        assertNotNull(result);
        verify(loanRepository, times(1)).delete(mockLoan);
    }

    @Test
    void testDeleteLoanById_NotFound() {
        when(loanRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> loanService.deleteLoanById(1L));
    }
}
