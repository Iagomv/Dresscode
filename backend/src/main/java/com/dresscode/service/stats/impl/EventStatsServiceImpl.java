package com.dresscode.service.stats.impl;

import com.dresscode.dto.stats.EventStatsDto;
import com.dresscode.repository.EventRepository;
import com.dresscode.service.stats.EventStatsService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventStatsServiceImpl implements EventStatsService {

    private final EventRepository eventRepository;

    @Override
    public EventStatsDto getEventStats() {
        long total = eventRepository.count();

        Map<String, Long> byStatus = toMap(eventRepository.countByStatus());
        Map<String, Long> byCategory = toMap(eventRepository.countByCategory());

        return EventStatsDto.builder()
                .totalEvents(total)
                .eventsByStatus(byStatus)
                .eventsByCategory(byCategory)
                .build();
    }

    private Map<String, Long> toMap(List<Object[]> data) {
        return data.stream()
                .collect(Collectors.toMap(
                        row -> row[0] == null ? "UNKNOWN" : row[0].toString(),
                        row -> (Long) row[1]));
    }
}
