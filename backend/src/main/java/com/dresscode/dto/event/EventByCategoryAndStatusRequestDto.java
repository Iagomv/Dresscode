package com.dresscode.dto.event;

import com.dresscode.enums.EventCategoryEnum;
import com.dresscode.enums.EventStatusEnum;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class EventByCategoryAndStatusRequestDto {
    private EventCategoryEnum category;
    private EventStatusEnum status;
}
