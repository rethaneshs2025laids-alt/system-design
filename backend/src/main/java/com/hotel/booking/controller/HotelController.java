package com.hotel.booking.controller;

import com.hotel.booking.dto.HotelDTO;
import com.hotel.booking.dto.RoomDTO;
import com.hotel.booking.service.HotelService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/hotels")
@RequiredArgsConstructor
@Tag(name = "Hotels", description = "Hotel search and details")
public class HotelController {

    private final HotelService hotelService;

    @GetMapping
    @Operation(summary = "Search hotels by city")
    public ResponseEntity<List<HotelDTO>> searchHotels(@RequestParam(required = false) String location) {
        return ResponseEntity.ok(hotelService.searchByCity(location));
    }

    @GetMapping("/{hotelId}")
    @Operation(summary = "Get hotel details")
    public ResponseEntity<HotelDTO> getHotel(@PathVariable Long hotelId) {
        return ResponseEntity.ok(hotelService.getHotelById(hotelId));
    }

    @GetMapping("/{hotelId}/rooms")
    @Operation(summary = "Get available rooms for a hotel and date range")
    public ResponseEntity<List<RoomDTO>> getRooms(
            @PathVariable Long hotelId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut) {

        if (checkIn != null && checkOut != null) {
            return ResponseEntity.ok(hotelService.getAvailableRooms(hotelId, checkIn, checkOut));
        }
        return ResponseEntity.ok(hotelService.getRooms(hotelId));
    }
}
