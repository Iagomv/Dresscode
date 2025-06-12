package com.dresscode.service.impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dresscode.dto.stats.UserStatsDto;
import com.dresscode.repository.UserRepository;
import com.dresscode.service.stats.UserStatsService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserStatsServiceImpl implements UserStatsService {

    private final UserRepository userRepository;

    @Override
    public UserStatsDto getUserStats() {
        long totalUsers = userRepository.count();

        List<Object[]> rawRoleCounts = userRepository.countByRole();
        List<Object[]> rawActiveCounts = userRepository.countByActiveStatus();

        Map<String, Long> usersByRole = toMap(rawRoleCounts);
        Map<String, Long> usersByActiveStatus = toMap(rawActiveCounts);

        return UserStatsDto.builder()
                .totalUsers(totalUsers)
                .usersByRole(usersByRole)
                .usersByActiveStatus(usersByActiveStatus)
                .build();
    }

    private Map<String, Long> toMap(List<Object[]> data) {
        return data.stream()
                .collect(Collectors.toMap(
                        entry -> entry[0] == null ? "UNKNOWN" : entry[0].toString(),
                        entry -> (Long) entry[1]));
    }
}
