package com.dresscode.service;

import com.dresscode.dto.event.EventByCategoryAndStatusRequestDto;
import com.dresscode.dto.event.EventRequestDto;
import com.dresscode.dto.event.EventResponseDto;
import com.dresscode.enums.EventCategoryEnum;
import com.dresscode.enums.EventStatusEnum;
import com.dresscode.error.exceptions.ResourceNotFoundException;
import com.dresscode.mapper.EventMapper;
import com.dresscode.model.Event;
import com.dresscode.repository.EventRepository;
import com.dresscode.service.impl.EventServiceImpl;
import com.dresscode.utils.SecurityUtils;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @Mock
    private EventMapper eventMapper;

    @InjectMocks
    private EventServiceImpl eventService;

    private Event mockEvent;
    private EventRequestDto eventRequestDto;
    private EventResponseDto eventResponseDto;

    @BeforeEach
    void setUp() {
        mockEvent = new Event();
        mockEvent.setId(1L);
        mockEvent.setTitle("Test Event");
        mockEvent.setDescription("Test Description");
        mockEvent.setEventDate(LocalDate.now());
        mockEvent.setCategory(EventCategoryEnum.PUBLIC);
        mockEvent.setStatus(EventStatusEnum.PUBLISHED);

        eventRequestDto = new EventRequestDto();
        eventRequestDto.setTitle("Updated Event");
        eventRequestDto.setDescription("Updated Description");
        eventRequestDto.setEventDate(LocalDate.now().plusDays(1));
        eventRequestDto.setCategory(EventCategoryEnum.PRIVATE);
        eventRequestDto.setStatus(EventStatusEnum.DRAFT);

        eventResponseDto = new EventResponseDto();
        eventResponseDto.setId(1L);
        eventResponseDto.setTitle("Test Event");
    }

    @Test
    void getAllEvents_Success() {
        when(eventRepository.findAll()).thenReturn(List.of(mockEvent));
        when(eventMapper.toDto(mockEvent)).thenReturn(eventResponseDto);

        List<EventResponseDto> results = eventService.getAllEvents();

        assertEquals(1, results.size());
        assertEquals("Test Event", results.get(0).getTitle());
    }

    @Test
    void getAllEvents_NoEventsFound() {
        when(eventRepository.findAll()).thenReturn(Collections.emptyList());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> eventService.getAllEvents());

        assertTrue(exception.getMessage().contains("No events found"));
    }

    @Test
    void getEventById_Success() {
        when(eventRepository.findById(1L)).thenReturn(Optional.of(mockEvent));
        when(eventMapper.toDto(mockEvent)).thenReturn(eventResponseDto);

        Optional<EventResponseDto> result = eventService.getEventById(1L);

        assertTrue(result.isPresent());
        assertEquals("Test Event", result.get().getTitle());
    }

    @Test
    void getEventById_NotFound() {
        when(eventRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<EventResponseDto> result = eventService.getEventById(1L);

        assertFalse(result.isPresent());
    }

    @Test
    void getEventsByCategoryAndStatus_Success() {
        EventByCategoryAndStatusRequestDto dto = new EventByCategoryAndStatusRequestDto();
        dto.setCategory(EventCategoryEnum.PUBLIC);
        dto.setStatus(EventStatusEnum.PUBLISHED);

        when(eventRepository.findByCategoryAndStatus(dto.getCategory(), dto.getStatus()))
                .thenReturn(List.of(mockEvent));
        when(eventMapper.toDto(mockEvent)).thenReturn(eventResponseDto);

        List<EventResponseDto> results = eventService.getEventsByCategoryAndStatus(dto);

        assertEquals(1, results.size());
        assertEquals("Test Event", results.get(0).getTitle());
    }

    @Test
    void getEventsByCategoryAndStatus_NotFound() {
        EventByCategoryAndStatusRequestDto dto = new EventByCategoryAndStatusRequestDto();
        dto.setCategory(EventCategoryEnum.PUBLIC);
        dto.setStatus(EventStatusEnum.PUBLISHED);

        when(eventRepository.findByCategoryAndStatus(dto.getCategory(), dto.getStatus()))
                .thenReturn(Collections.emptyList());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> eventService.getEventsByCategoryAndStatus(dto));

        assertTrue(exception.getMessage().contains("Events not found with category"));
    }

    @Test
    void getEventsByUserRole_Admin() {
        try (MockedStatic<SecurityUtils> mockedSecurityUtils = mockStatic(SecurityUtils.class)) {
            mockedSecurityUtils.when(SecurityUtils::getCurrentUserRole)
                    .thenReturn("ROLE_ADMIN");

            when(eventRepository.findAll()).thenReturn(List.of(mockEvent));
            when(eventMapper.toDto(mockEvent)).thenReturn(eventResponseDto);

            List<EventResponseDto> results = eventService.getEventsByUserRole();

            assertEquals(1, results.size());
            assertEquals("Test Event", results.get(0).getTitle());
        }
    }

    @Test
    void getEventsByUserRole_Student() {
        try (MockedStatic<SecurityUtils> mockedSecurityUtils = mockStatic(SecurityUtils.class)) {
            mockedSecurityUtils.when(SecurityUtils::getCurrentUserRole)
                    .thenReturn("ROLE_STUDENT");

            when(eventRepository.findByStatusNotIn(anyList())).thenReturn(List.of(mockEvent));
            when(eventMapper.toDto(mockEvent)).thenReturn(eventResponseDto);

            List<EventResponseDto> results = eventService.getEventsByUserRole();

            assertEquals(1, results.size());
            assertEquals("Test Event", results.get(0).getTitle());
        }
    }

    @Test
    void createEvent_Success() {
        when(eventMapper.toEntity(eventRequestDto)).thenReturn(mockEvent);
        when(eventRepository.save(mockEvent)).thenReturn(mockEvent);
        when(eventMapper.toDto(mockEvent)).thenReturn(eventResponseDto);

        EventResponseDto result = eventService.createEvent(eventRequestDto);

        assertNotNull(result);
        assertEquals("Test Event", result.getTitle());
    }

    @Test
    void updateEvent_Success() {
        when(eventRepository.findById(1L)).thenReturn(Optional.of(mockEvent));
        when(eventRepository.save(mockEvent)).thenReturn(mockEvent);
        when(eventMapper.toDto(mockEvent)).thenReturn(eventResponseDto);

        EventResponseDto result = eventService.updateEvent(1L, eventRequestDto);

        assertNotNull(result);
        assertEquals("Test Event", result.getTitle());
    }

    @Test
    void updateEvent_NotFound() {
        when(eventRepository.findById(1L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> eventService.updateEvent(1L, eventRequestDto));

        assertTrue(exception.getMessage().contains("Event not found with id"));
    }

    @Test
    void deleteEvent_Success() {
        when(eventRepository.findById(1L)).thenReturn(Optional.of(mockEvent));

        eventService.deleteEvent(1L);

        verify(eventRepository).delete(mockEvent);
    }

    @Test
    void deleteEvent_NotFound() {
        when(eventRepository.findById(1L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> eventService.deleteEvent(1L));

        assertTrue(exception.getMessage().contains("Event not found with id"));
    }
}
