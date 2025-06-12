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
public class UserStatsDto {
    private long totalUsers;
    private Map<String, Long> usersByRole;
    private Map<String, Long> usersByActiveStatus;
}
