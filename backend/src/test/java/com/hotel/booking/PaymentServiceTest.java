package com.hotel.booking;

import com.hotel.booking.dto.PaymentRequest;
import com.hotel.booking.entity.Booking;
import com.hotel.booking.entity.Hotel;
import com.hotel.booking.entity.Room;
import com.hotel.booking.entity.User;
import com.hotel.booking.exception.BookingException;
import com.hotel.booking.repository.BookingRepository;
import com.hotel.booking.repository.PaymentRepository;
import com.hotel.booking.service.BookingService;
import com.hotel.booking.service.PaymentService;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PaymentServiceTest {

    @Mock PaymentRepository paymentRepository;
    @Mock BookingRepository bookingRepository;
    @Mock BookingService bookingService;

    @InjectMocks PaymentService paymentService;

    private Booking pendingBooking;

    @BeforeEach
    void setUp() {
        User user = new User();
        user.setId(1L);

        Hotel hotel = new Hotel();
        hotel.setId(1L);
        hotel.setName("Test Hotel");

        Room room = new Room();
        room.setId(1L);
        room.setHotel(hotel);
        room.setRoomType("Standard");

        pendingBooking = new Booking();
        pendingBooking.setId(1L);
        pendingBooking.setUser(user);
        pendingBooking.setRoom(room);
        pendingBooking.setHotel(hotel);
        pendingBooking.setStatus("PENDING");
        pendingBooking.setTotalPrice(new BigDecimal("4000"));
        pendingBooking.setCheckIn(LocalDate.now().plusDays(1));
        pendingBooking.setCheckOut(LocalDate.now().plusDays(3));
    }

    @Test
    void payment_success() {
        when(bookingRepository.findById(1L)).thenReturn(Optional.of(pendingBooking));
        when(paymentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        PaymentRequest req = new PaymentRequest();
        req.setBookingId(1L);
        req.setMockCardLast4("1234");

        var result = paymentService.processPayment(req);

        assertEquals("SUCCESS", result.getStatus());
        verify(bookingService).confirmBooking(1L);
    }

    @Test
    void payment_failure_cardStartsWithZero() {
        when(bookingRepository.findById(1L)).thenReturn(Optional.of(pendingBooking));
        when(paymentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        PaymentRequest req = new PaymentRequest();
        req.setBookingId(1L);
        req.setMockCardLast4("0000");

        var result = paymentService.processPayment(req);

        assertEquals("FAILED", result.getStatus());
        verify(bookingService).failBooking(1L);
    }

    @Test
    void payment_nonPendingBooking_throws() {
        pendingBooking.setStatus("CONFIRMED");
        when(bookingRepository.findById(1L)).thenReturn(Optional.of(pendingBooking));

        PaymentRequest req = new PaymentRequest();
        req.setBookingId(1L);
        req.setMockCardLast4("1234");

        assertThrows(BookingException.class, () -> paymentService.processPayment(req));
    }
}
