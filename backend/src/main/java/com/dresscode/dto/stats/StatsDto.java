package com.dresscode.dto.stats;

import java.math.BigDecimal;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatsDto {
    private long totalClothingItems;
    private Map<String, Long> clothingItemsByAvailability; // e.g. "Disponible": 20
    private Map<String, Long> clothingItemsByGender;
    private Map<String, Long> clothingItemsBySize;
    private Map<String, Long> clothingItemsByType;

    private BigDecimal totalInventoryValue;

    private long totalLoans;
    private Map<String, Long> loansByState;

    private long totalUsers;
    private Map<String, Long> usersByRole;
    private Map<String, Long> usersByActiveStatus;

    private long totalEvents;
    private Map<String, Long> eventsByCategory;
    private Map<String, Long> eventsByStatus;
}
