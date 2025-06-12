package com.dresscode.dto.stats;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoanStatsDto {
    private long totalLoans;
    private Map<String, Long> loansByState;
    private Map<String, Long> loansByUser;
    private Map<String, Long> loansByApprover;
    private long recentLoansCount;
    private double averageItemsPerLoan;
    private long overdueLoans;
}
