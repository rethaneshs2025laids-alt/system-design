package com.hotel.booking.service;

import com.hotel.booking.dto.HotelDTO;
import com.hotel.booking.dto.RoomDTO;
import com.hotel.booking.entity.Hotel;
import com.hotel.booking.entity.Room;
import com.hotel.booking.exception.ResourceNotFoundException;
import com.hotel.booking.repository.HotelRepository;
import com.hotel.booking.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HotelService {

    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;

    public List<HotelDTO> searchByCity(String city) {
        List<Hotel> hotels = (city == null || city.isBlank())
                ? hotelRepository.findAll()
                : hotelRepository.findByCityIgnoreCase(city);
        return hotels.stream().map(this::toDTO).toList();
    }

    public HotelDTO getHotelById(Long id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id: " + id));
        return toDTO(hotel);
    }

    public List<RoomDTO> getRooms(Long hotelId) {
        hotelRepository.findById(hotelId)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id: " + hotelId));
        return roomRepository.findByHotelId(hotelId).stream().map(this::toRoomDTO).toList();
    }

    public List<RoomDTO> getAvailableRooms(Long hotelId, LocalDate checkIn, LocalDate checkOut) {
        hotelRepository.findById(hotelId)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id: " + hotelId));
        return roomRepository.findAvailableRooms(hotelId, checkIn, checkOut)
                .stream().map(r -> toRoomDTOWithAvailability(r, checkIn, checkOut)).toList();
    }

    private HotelDTO toDTO(Hotel h) {
        HotelDTO dto = new HotelDTO();
        dto.setId(h.getId());
        dto.setName(h.getName());
        dto.setLocation(h.getLocation());
        dto.setCity(h.getCity());
        dto.setDescription(h.getDescription());
        dto.setRating(h.getRating());
        dto.setImageUrl(h.getImageUrl());
        dto.setAmenities(h.getAmenities());
        return dto;
    }

    private RoomDTO toRoomDTO(Room r) {
        RoomDTO dto = new RoomDTO();
        dto.setId(r.getId());
        dto.setHotelId(r.getHotel().getId());
        dto.setHotelName(r.getHotel().getName());
        dto.setRoomType(r.getRoomType());
        dto.setCapacity(r.getCapacity());
        dto.setPricePerNight(r.getPricePerNight());
        dto.setAmenities(r.getAmenities());
        dto.setImageUrl(r.getImageUrl());
        dto.setTotalRooms(r.getTotalRooms());
        return dto;
    }

    private RoomDTO toRoomDTOWithAvailability(Room r, LocalDate checkIn, LocalDate checkOut) {
        RoomDTO dto = toRoomDTO(r);
        long booked = roomRepository.countOverlappingBookings(r.getId(), checkIn, checkOut);
        dto.setAvailableRooms((int) (r.getTotalRooms() - booked));
        return dto;
    }
}
