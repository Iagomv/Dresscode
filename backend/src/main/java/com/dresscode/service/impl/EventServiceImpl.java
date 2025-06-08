package com.dresscode.service.impl;

import com.dresscode.dto.event.EventByCategoryAndStatusRequestDto;
import com.dresscode.dto.event.EventRequestDto;
import com.dresscode.dto.event.EventResponseDto;
import com.dresscode.enums.EventCategoryEnum;
import com.dresscode.enums.EventStatusEnum;
import com.dresscode.error.exceptions.ResourceNotFoundException;
import com.dresscode.mapper.EventMapper;
import com.dresscode.model.Event;
import com.dresscode.repository.EventRepository;
import com.dresscode.service.EventService;
import com.dresscode.utils.SecurityUtils;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final EventMapper eventMapper;

    public EventServiceImpl(EventRepository eventRepository, EventMapper eventMapper) {
        this.eventRepository = eventRepository;
        this.eventMapper = eventMapper;
    }

    @Override
    public List<EventResponseDto> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        if (events.isEmpty()) {
            throw new ResourceNotFoundException("No events found");
        }
        return events.stream()
                .map(eventMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<EventResponseDto> getEventById(Long id) {
        return eventRepository.findById(id).map(eventMapper::toDto);
    }

    @Override
    public List<EventResponseDto> getEventsByCategoryAndStatus(EventByCategoryAndStatusRequestDto dto) {
        List<Event> events = eventRepository.findByCategoryAndStatus(dto.getCategory(), dto.getStatus());

        if (events.isEmpty()) {
            throw new ResourceNotFoundException(
                    "Events not found with category " + dto.getCategory() + " and status " + dto.getStatus());
        }

        return events.stream()
                .map(eventMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<EventResponseDto> getEventsByUserRole() {
        String role = SecurityUtils.getCurrentUserRole();
        List<EventStatusEnum> privateStatuses = List.of(EventStatusEnum.DRAFT, EventStatusEnum.ARCHIVED);

        if (role.equals("ROLE_STUDENT") || role.equals("ROLE_TEACHER")) {
            return eventRepository.findByStatusNotIn(privateStatuses).stream()
                    .map(eventMapper::toDto)
                    .collect(Collectors.toList());
        }

        if (role.equals("ROLE_ADMIN")) {
            return getAllEvents();
        }

        return eventRepository.findByCategoryAndStatusNotIn(EventCategoryEnum.PUBLIC, privateStatuses).stream()
                .map(eventMapper::toDto)
                .collect(Collectors.toList());

    }

    @Transactional
    @Override
    public EventResponseDto createEvent(EventRequestDto dto) {
        Event event = eventMapper.toEntity(dto);
        Event saved = eventRepository.save(event);
        return eventMapper.toDto(saved);
    }

    @Transactional
    @Override
    public EventResponseDto updateEvent(Long id, EventRequestDto dto) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id " + id));

        // Manual field updates, since some fields might be system-managed
        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setLocation(dto.getLocation());
        event.setEventDate(dto.getEventDate());
        event.setImageUrl(dto.getImageUrl());
        event.setCategory(dto.getCategory());
        event.setStatus(dto.getStatus());
        event.setCreatedBy(dto.getCreatedBy());

        Event updated = eventRepository.save(event);
        return eventMapper.toDto(updated);
    }

    @Transactional
    @Override
    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id " + id));
        eventRepository.delete(event);
    }
}
