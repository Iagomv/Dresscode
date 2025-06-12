package com.dresscode.controller.stats;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dresscode.constants.ApiRoutes;
import com.dresscode.dto.stats.LoanStatsDto;
import com.dresscode.service.stats.LoanStatsService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiRoutes.LOAN_STATS)
public class LoanStatsController {

    private final LoanStatsService LoanStatsService;

    @GetMapping()
    public ResponseEntity<LoanStatsDto> getGlobalStats() {
        return ResponseEntity.ok(LoanStatsService.getLoanStats());
    }

}
