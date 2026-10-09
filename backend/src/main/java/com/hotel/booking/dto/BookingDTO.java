package com.hotel.booking.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class BookingDTO {
    private Long id;
    private Long userId;
    private Long roomId;
    private String roomType;
    private Long hotelId;
    private String hotelName;
    private String hotelLocation;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private String guestName;
    private String guestEmail;
    private String guestPhone;
    private Integer numGuests;
    private BigDecimal totalPrice;
    private String status;
    private LocalDateTime createdAt;
}
