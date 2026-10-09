package com.hotel.booking.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class HotelDTO {
    private Long id;
    private String name;
    private String location;
    private String city;
    private String description;
    private BigDecimal rating;
    private String imageUrl;
    private String amenities;
}
