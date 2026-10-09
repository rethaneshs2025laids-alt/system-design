package com.hotel.booking.service;

import com.hotel.booking.dto.PaymentDTO;
import com.hotel.booking.dto.PaymentRequest;
import com.hotel.booking.entity.Booking;
import com.hotel.booking.entity.Payment;
import com.hotel.booking.exception.BookingException;
import com.hotel.booking.exception.ResourceNotFoundException;
import com.hotel.booking.repository.BookingRepository;
import com.hotel.booking.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final BookingService bookingService;

    @Transactional
    public PaymentDTO processPayment(PaymentRequest req) {
        Booking booking = bookingRepository.findById(req.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + req.getBookingId()));

        if (!"PENDING".equals(booking.getStatus())) {
            throw new BookingException("Payment can only be made for PENDING bookings. Current status: " + booking.getStatus());
        }

        // Simulate: card starting with "0" triggers failure
        boolean success = !req.getMockCardLast4().startsWith("0");

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(booking.getTotalPrice());
        payment.setMockCardLast4(req.getMockCardLast4());
        payment.setTransactionId(UUID.randomUUID().toString());
        payment.setStatus(success ? "SUCCESS" : "FAILED");

        paymentRepository.save(payment);

        if (success) {
            bookingService.confirmBooking(booking.getId());
        } else {
            bookingService.failBooking(booking.getId());
        }

        return toDTO(payment);
    }

    private PaymentDTO toDTO(Payment p) {
        PaymentDTO dto = new PaymentDTO();
        dto.setId(p.getId());
        dto.setBookingId(p.getBooking().getId());
        dto.setAmount(p.getAmount());
        dto.setStatus(p.getStatus());
        dto.setMockCardLast4(p.getMockCardLast4());
        dto.setTransactionId(p.getTransactionId());
        dto.setCreatedAt(p.getCreatedAt());
        return dto;
    }
}
