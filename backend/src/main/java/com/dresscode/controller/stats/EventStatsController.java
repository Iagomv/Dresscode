package com.dresscode.controller.stats;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dresscode.constants.ApiRoutes;
import com.dresscode.dto.stats.EventStatsDto;
import com.dresscode.service.stats.EventStatsService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiRoutes.EVENT_STATS)
public class EventStatsController {

    private final EventStatsService EventStatsService;

    @GetMapping()
    public ResponseEntity<EventStatsDto> getGlobalStats() {
        return ResponseEntity.ok(EventStatsService.getEventStats());
    }

}
