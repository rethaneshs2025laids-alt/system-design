package com.hotel.booking.repository;

import com.hotel.booking.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByHotelId(Long hotelId);

    @Query("""
        SELECT r FROM Room r
        WHERE r.hotel.id = :hotelId
        AND r.totalRooms > (
            SELECT COUNT(b) FROM Booking b
            WHERE b.room.id = r.id
            AND b.status IN ('CONFIRMED', 'PENDING')
            AND b.checkIn < :checkOut
            AND b.checkOut > :checkIn
        )
    """)
    List<Room> findAvailableRooms(@Param("hotelId") Long hotelId,
                                   @Param("checkIn") LocalDate checkIn,
                                   @Param("checkOut") LocalDate checkOut);

    @Query("""
        SELECT COUNT(b) FROM Booking b
        WHERE b.room.id = :roomId
        AND b.status IN ('CONFIRMED', 'PENDING')
        AND b.checkIn < :checkOut
        AND b.checkOut > :checkIn
    """)
    long countOverlappingBookings(@Param("roomId") Long roomId,
                                   @Param("checkIn") LocalDate checkIn,
                                   @Param("checkOut") LocalDate checkOut);
}
