package com.dresscode.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dresscode.constants.ApiRoutes;
import com.dresscode.dto.stats.UserStatsDto;
import com.dresscode.service.stats.UserStatsService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiRoutes.USER_STATS)
public class UserStatsController {

    private final UserStatsService userStatsService;

    @GetMapping()
    public ResponseEntity<UserStatsDto> getGlobalStats() {
        return ResponseEntity.ok(userStatsService.getUserStats());
    }

}
