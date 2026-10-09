package com.hotel.booking.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class PaymentRequest {
    @NotNull
    private Long bookingId;

    @NotBlank
    @Size(min = 4, max = 4)
    private String mockCardLast4;

    // Simulated: SUCCESS if card doesn't start with "0", FAILED otherwise
}
