package com.hotel.booking.service;

import com.hotel.booking.dto.BookingDTO;
import com.hotel.booking.dto.BookingRequest;
import com.hotel.booking.entity.Booking;
import com.hotel.booking.entity.Hotel;
import com.hotel.booking.entity.Room;
import com.hotel.booking.entity.User;
import com.hotel.booking.exception.BookingException;
import com.hotel.booking.exception.ResourceNotFoundException;
import com.hotel.booking.repository.BookingRepository;
import com.hotel.booking.repository.HotelRepository;
import com.hotel.booking.repository.RoomRepository;
import com.hotel.booking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;

    @Transactional
    public BookingDTO createBooking(BookingRequest req) {
        // Idempotency check
        if (req.getIdempotencyKey() != null) {
            var existing = bookingRepository.findByIdempotencyKey(req.getIdempotencyKey());
            if (existing.isPresent()) return toDTO(existing.get());
        }

        validateDates(req.getCheckIn(), req.getCheckOut());

        User user = userRepository.findById(req.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + req.getUserId()));

        Room room = roomRepository.findById(req.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found: " + req.getRoomId()));

        Hotel hotel = room.getHotel();

        // Check availability with pessimistic lock via count query
        long overlapping = roomRepository.countOverlappingBookings(room.getId(), req.getCheckIn(), req.getCheckOut());
        if (overlapping >= room.getTotalRooms()) {
            throw new BookingException("Room is not available for the selected dates.");
        }

        long nights = ChronoUnit.DAYS.between(req.getCheckIn(), req.getCheckOut());
        BigDecimal totalPrice = room.getPricePerNight().multiply(BigDecimal.valueOf(nights));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setRoom(room);
        booking.setHotel(hotel);
        booking.setCheckIn(req.getCheckIn());
        booking.setCheckOut(req.getCheckOut());
        booking.setGuestName(req.getGuestName());
        booking.setGuestEmail(req.getGuestEmail());
        booking.setGuestPhone(req.getGuestPhone());
        booking.setNumGuests(req.getNumGuests());
        booking.setTotalPrice(totalPrice);
        booking.setStatus("PENDING");
        booking.setIdempotencyKey(req.getIdempotencyKey());

        return toDTO(bookingRepository.save(booking));
    }

    public BookingDTO getBooking(Long id) {
        return toDTO(bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + id)));
    }

    public List<BookingDTO> getUserBookings(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
        return bookingRepository.findByUserId(userId).stream().map(this::toDTO).toList();
    }

    @Transactional
    public BookingDTO cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + id));

        if ("CANCELLED".equals(booking.getStatus())) {
            throw new BookingException("Booking is already cancelled.");
        }
        if ("PAYMENT_FAILED".equals(booking.getStatus())) {
            throw new BookingException("Cannot cancel a failed booking.");
        }
        // Allow cancellation only if check-in is in the future
        if (!booking.getCheckIn().isAfter(LocalDate.now())) {
            throw new BookingException("Cannot cancel a booking on or after check-in date.");
        }

        booking.setStatus("CANCELLED");
        return toDTO(bookingRepository.save(booking));
    }

    @Transactional
    public void confirmBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + id));
        booking.setStatus("CONFIRMED");
        bookingRepository.save(booking);
    }

    @Transactional
    public void failBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + id));
        booking.setStatus("PAYMENT_FAILED");
        bookingRepository.save(booking);
    }

    private void validateDates(LocalDate checkIn, LocalDate checkOut) {
        if (checkIn == null || checkOut == null) {
            throw new BookingException("Check-in and check-out dates are required.");
        }
        if (!checkIn.isAfter(LocalDate.now().minusDays(1))) {
            throw new BookingException("Check-in date must be today or in the future.");
        }
        if (!checkOut.isAfter(checkIn)) {
            throw new BookingException("Check-out date must be after check-in date.");
        }
    }

    public BookingDTO toDTO(Booking b) {
        BookingDTO dto = new BookingDTO();
        dto.setId(b.getId());
        dto.setUserId(b.getUser().getId());
        dto.setRoomId(b.getRoom().getId());
        dto.setRoomType(b.getRoom().getRoomType());
        dto.setHotelId(b.getHotel().getId());
        dto.setHotelName(b.getHotel().getName());
        dto.setHotelLocation(b.getHotel().getLocation());
        dto.setCheckIn(b.getCheckIn());
        dto.setCheckOut(b.getCheckOut());
        dto.setGuestName(b.getGuestName());
        dto.setGuestEmail(b.getGuestEmail());
        dto.setGuestPhone(b.getGuestPhone());
        dto.setNumGuests(b.getNumGuests());
        dto.setTotalPrice(b.getTotalPrice());
        dto.setStatus(b.getStatus());
        dto.setCreatedAt(b.getCreatedAt());
        return dto;
    }
}
