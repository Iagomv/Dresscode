package com.dresscode.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dresscode.model.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

}
