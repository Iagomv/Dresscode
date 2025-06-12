package com.dresscode.service.stats.impl;

import com.dresscode.dto.stats.LoanStatsDto;
import com.dresscode.repository.LoanRepository;
import com.dresscode.service.stats.LoanStatsService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LoanStatsServiceImpl implements LoanStatsService {

    private final LoanRepository loanRepository;

    @Override
    public LoanStatsDto getLoanStats() {
        long totalLoans = loanRepository.count();
        Map<String, Long> byState = toMap(loanRepository.countByState());
        Map<String, Long> byUser = toMap(loanRepository.countByUser());
        Map<String, Long> byApprover = toMap(loanRepository.countByApprover());

        long recent = loanRepository.countRecentLoans(LocalDate.now().minusDays(30));
        long overdue = loanRepository.countOverdueLoans();
        double avgItems = loanRepository.averageItemsPerLoan() != null
                ? loanRepository.averageItemsPerLoan()
                : 0.0;

        return LoanStatsDto.builder()
                .totalLoans(totalLoans)
                .loansByState(byState)
                .loansByUser(byUser)
                .loansByApprover(byApprover)
                .recentLoansCount(recent)
                .averageItemsPerLoan(avgItems)
                .overdueLoans(overdue)
                .build();
    }

    private Map<String, Long> toMap(List<Object[]> data) {
        return data.stream()
                .collect(Collectors.toMap(
                        row -> row[0] == null ? "UNKNOWN" : row[0].toString(),
                        row -> (Long) row[1]));
    }
}
