package com.dresscode.dto.stats;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventStatsDto {
    private long totalEvents;
    private Map<String, Long> eventsByStatus;
    private Map<String, Long> eventsByCategory;
}
