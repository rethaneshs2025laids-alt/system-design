package com.hotel.booking.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PaymentDTO {
    private Long id;
    private Long bookingId;
    private BigDecimal amount;
    private String status;
    private String mockCardLast4;
    private String transactionId;
    private LocalDateTime createdAt;
}
