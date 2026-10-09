package com.hotel.booking.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class RoomDTO {
    private Long id;
    private Long hotelId;
    private String hotelName;
    private String roomType;
    private Integer capacity;
    private BigDecimal pricePerNight;
    private String amenities;
    private String imageUrl;
    private Integer totalRooms;
    private Integer availableRooms;
}
