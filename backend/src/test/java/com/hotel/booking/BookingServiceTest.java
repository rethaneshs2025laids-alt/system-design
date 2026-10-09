package com.hotel.booking;

import com.hotel.booking.dto.BookingRequest;
import com.hotel.booking.entity.*;
import com.hotel.booking.exception.BookingException;
import com.hotel.booking.repository.*;
import com.hotel.booking.service.BookingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookingServiceTest {

    @Mock BookingRepository bookingRepository;
    @Mock UserRepository userRepository;
    @Mock RoomRepository roomRepository;
    @Mock HotelRepository hotelRepository;

    @InjectMocks BookingService bookingService;

    private User user;
    private Hotel hotel;
    private Room room;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setName("Alice");
        user.setEmail("alice@example.com");

        hotel = new Hotel();
        hotel.setId(1L);
        hotel.setName("Test Hotel");
        hotel.setLocation("Chennai");

        room = new Room();
        room.setId(1L);
        room.setHotel(hotel);
        room.setRoomType("Standard");
        room.setPricePerNight(new BigDecimal("2000"));
        room.setTotalRooms(5);
        room.setCapacity(2);
    }

    @Test
    void createBooking_success() {
        BookingRequest req = buildRequest(LocalDate.now().plusDays(1), LocalDate.now().plusDays(3));

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(roomRepository.findById(1L)).thenReturn(Optional.of(room));
        when(roomRepository.countOverlappingBookings(eq(1L), any(), any())).thenReturn(0L);
        when(bookingRepository.save(any())).thenAnswer(inv -> {
            Booking b = inv.getArgument(0);
            b.setId(100L);
            return b;
        });

        var result = bookingService.createBooking(req);

        assertNotNull(result);
        assertEquals("PENDING", result.getStatus());
        assertEquals(new BigDecimal("4000"), result.getTotalPrice()); // 2 nights * 2000
    }

    @Test
    void createBooking_roomNotAvailable_throws() {
        BookingRequest req = buildRequest(LocalDate.now().plusDays(1), LocalDate.now().plusDays(3));

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(roomRepository.findById(1L)).thenReturn(Optional.of(room));
        when(roomRepository.countOverlappingBookings(eq(1L), any(), any())).thenReturn(5L); // all rooms booked

        assertThrows(BookingException.class, () -> bookingService.createBooking(req));
    }

    @Test
    void createBooking_pastCheckIn_throws() {
        BookingRequest req = buildRequest(LocalDate.now().minusDays(1), LocalDate.now().plusDays(1));
        assertThrows(BookingException.class, () -> bookingService.createBooking(req));
    }

    @Test
    void createBooking_checkOutBeforeCheckIn_throws() {
        BookingRequest req = buildRequest(LocalDate.now().plusDays(3), LocalDate.now().plusDays(1));
        assertThrows(BookingException.class, () -> bookingService.createBooking(req));
    }

    @Test
    void cancelBooking_success() {
        Booking booking = new Booking();
        booking.setId(1L);
        booking.setUser(user);
        booking.setRoom(room);
        booking.setHotel(hotel);
        booking.setCheckIn(LocalDate.now().plusDays(2));
        booking.setCheckOut(LocalDate.now().plusDays(4));
        booking.setStatus("CONFIRMED");
        booking.setGuestName("Alice");
        booking.setGuestEmail("alice@example.com");
        booking.setTotalPrice(new BigDecimal("4000"));

        when(bookingRepository.findById(1L)).thenReturn(Optional.of(booking));
        when(bookingRepository.save(any())).thenReturn(booking);

        var result = bookingService.cancelBooking(1L);
        assertEquals("CANCELLED", result.getStatus());
    }

    @Test
    void cancelBooking_alreadyCancelled_throws() {
        Booking booking = new Booking();
        booking.setId(1L);
        booking.setStatus("CANCELLED");
        booking.setCheckIn(LocalDate.now().plusDays(2));

        when(bookingRepository.findById(1L)).thenReturn(Optional.of(booking));

        assertThrows(BookingException.class, () -> bookingService.cancelBooking(1L));
    }

    @Test
    void cancelBooking_pastCheckIn_throws() {
        Booking booking = new Booking();
        booking.setId(1L);
        booking.setStatus("CONFIRMED");
        booking.setCheckIn(LocalDate.now()); // today - not allowed

        when(bookingRepository.findById(1L)).thenReturn(Optional.of(booking));

        assertThrows(BookingException.class, () -> bookingService.cancelBooking(1L));
    }

    @Test
    void idempotency_returnsSameBooking() {
        Booking existing = new Booking();
        existing.setId(99L);
        existing.setUser(user);
        existing.setRoom(room);
        existing.setHotel(hotel);
        existing.setStatus("PENDING");
        existing.setCheckIn(LocalDate.now().plusDays(1));
        existing.setCheckOut(LocalDate.now().plusDays(2));
        existing.setGuestName("Alice");
        existing.setGuestEmail("alice@example.com");
        existing.setTotalPrice(new BigDecimal("2000"));

        BookingRequest req = buildRequest(LocalDate.now().plusDays(1), LocalDate.now().plusDays(2));
        req.setIdempotencyKey("key-123");

        when(bookingRepository.findByIdempotencyKey("key-123")).thenReturn(Optional.of(existing));

        var result = bookingService.createBooking(req);
        assertEquals(99L, result.getId());
        verify(bookingRepository, never()).save(any());
    }

    private BookingRequest buildRequest(LocalDate checkIn, LocalDate checkOut) {
        BookingRequest req = new BookingRequest();
        req.setUserId(1L);
        req.setRoomId(1L);
        req.setCheckIn(checkIn);
        req.setCheckOut(checkOut);
        req.setGuestName("Alice");
        req.setGuestEmail("alice@example.com");
        req.setNumGuests(1);
        return req;
    }
}
