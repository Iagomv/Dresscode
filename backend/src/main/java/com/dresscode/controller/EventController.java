package com.dresscode.controller;

import com.dresscode.constants.ApiRoutes;
import com.dresscode.dto.event.EventByCategoryAndStatusRequestDto;
import com.dresscode.dto.event.EventRequestDto;
import com.dresscode.dto.event.EventResponseDto;
import com.dresscode.error.exceptions.ResourceNotFoundException;
import com.dresscode.service.EventService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiRoutes.EVENTS)
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public ResponseEntity<List<EventResponseDto>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventResponseDto> getEventById(@PathVariable Long id) {
        return eventService.getEventById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id " + id));
    }

    @PostMapping("/by-category-and-status")
    public ResponseEntity<List<EventResponseDto>> getEventsByCategoryAndStatus(
            @Valid @RequestBody EventByCategoryAndStatusRequestDto dto) {
        return ResponseEntity.ok().body(eventService.getEventsByCategoryAndStatus(dto));
    }

    @GetMapping("/my-events")
    public ResponseEntity<List<EventResponseDto>> geteEventsByUserRole() {
        return ResponseEntity.ok().body(eventService.getEventsByUserRole());
    }

    @PostMapping
    public ResponseEntity<EventResponseDto> createEvent(@Valid @RequestBody EventRequestDto dto) {
        EventResponseDto created = eventService.createEvent(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventResponseDto> updateEvent(@PathVariable Long id,
            @Valid @RequestBody EventRequestDto dto) {
        EventResponseDto updated = eventService.updateEvent(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
}
