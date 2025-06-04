package com.dresscode.service;

import com.dresscode.dto.event.EventRequestDto;
import com.dresscode.dto.event.EventResponseDto;

import java.util.List;
import java.util.Optional;

/**
 * Service interface for managing events.
 */
public interface EventService {

    /**
     * Retrieves a list of all events.
     *
     * @return a list of EventResponseDto objects
     */
    List<EventResponseDto> getAllEvents();

    /**
     * Retrieves an event by its ID.
     *
     * @param id the ID of the event to retrieve
     * @return an Optional containing the EventResponseDto object, or an empty
     *         Optional if not found
     */
    Optional<EventResponseDto> getEventById(Long id);

    /**
     * Creates a new event.
     *
     * @param dto the EventRequestDto object containing the event details
     * @return the created EventResponseDto object
     */
    EventResponseDto createEvent(EventRequestDto dto);

    /**
     * Updates an existing event.
     *
     * @param id  the ID of the event to update
     * @param dto the EventRequestDto object containing the updated event details
     * @return the updated EventResponseDto object
     */
    EventResponseDto updateEvent(Long id, EventRequestDto dto);

    /**
     * Deletes an event by its ID.
     *
     * @param id the ID of the event to delete
     */
    void deleteEvent(Long id);
}