package com.hotel.booking.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;

@Data
public class BookingRequest {
    @NotNull
    private Long userId;

    @NotNull
    private Long roomId;

    @NotNull
    private LocalDate checkIn;

    @NotNull
    private LocalDate checkOut;

    @NotBlank
    @Size(max = 100)
    private String guestName;

    @NotBlank
    @Email
    private String guestEmail;

    @Size(max = 20)
    private String guestPhone;

    @Min(1)
    private Integer numGuests = 1;

    // Optional idempotency key to prevent duplicate bookings
    private String idempotencyKey;
}
