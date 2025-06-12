package com.dresscode.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dresscode.enums.EventCategoryEnum;
import com.dresscode.enums.EventStatusEnum;
import com.dresscode.model.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByCategoryAndStatus(EventCategoryEnum category, EventStatusEnum status);

    List<Event> findByCategoryAndStatusNotIn(EventCategoryEnum category, Collection<EventStatusEnum> statuses);

    List<Event> findByStatusNotIn(Collection<EventStatusEnum> statuses);

    @Query("SELECT e.status, COUNT(e) FROM Event e GROUP BY e.status")
    List<Object[]> countByStatus();

    @Query("SELECT e.category, COUNT(e) FROM Event e GROUP BY e.category")
    List<Object[]> countByCategory();
}
