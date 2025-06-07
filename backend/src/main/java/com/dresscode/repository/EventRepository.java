package com.dresscode.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dresscode.enums.EventCategoryEnum;
import com.dresscode.enums.EventStatusEnum;
import com.dresscode.model.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByCategoryAndStatus(EventCategoryEnum category, EventStatusEnum status);
}
