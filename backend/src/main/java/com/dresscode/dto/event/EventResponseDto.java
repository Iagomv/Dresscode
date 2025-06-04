package com.dresscode.dto.event;

import com.dresscode.enums.EventCategoryEnum;
import com.dresscode.enums.EventStatusEnum;

import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventResponseDto {

    private Long id;

    private String title;

    private String description;

    private String location;

    private LocalDate eventDate;

    private String imageUrl;

    private EventCategoryEnum category;

    private EventStatusEnum status;

    private String createdBy;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
