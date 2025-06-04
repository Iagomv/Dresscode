package com.dresscode.dto.event;

import com.dresscode.enums.EventCategoryEnum;
import com.dresscode.enums.EventStatusEnum;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventRequestDto {

    @NotBlank
    @Size(max = 255)
    private String title;

    private String description;

    @Size(max = 255)
    private String location;

    @NotNull
    private LocalDate eventDate;

    @Size(max = 255)
    private String imageUrl;

    @NotNull
    private EventCategoryEnum category;

    @NotNull
    private EventStatusEnum status;

    @Size(max = 100)
    private String createdBy;
}
