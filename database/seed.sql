USE hotel_booking;

-- Sample Users
INSERT INTO users (name, email, phone) VALUES
('Alice Johnson', 'alice@example.com', '9876543210'),
('Bob Smith', 'bob@example.com', '9123456789');

-- Sample Hotels
INSERT INTO hotels (name, location, city, description, rating, image_url, amenities) VALUES
('The Grand Palace', '12 Marina Beach Road, Chennai', 'Chennai', 'Luxury beachfront hotel with stunning ocean views and world-class amenities.', 4.8, '/images/hotel1.jpg', 'WiFi,Pool,Spa,Gym,Restaurant,Bar,Parking'),
('City Comfort Inn', '45 Anna Salai, Chennai', 'Chennai', 'Modern business hotel in the heart of the city, perfect for corporate travelers.', 4.2, '/images/hotel2.jpg', 'WiFi,Gym,Restaurant,Parking,Conference Room'),
('Sunset Resort', '78 ECR Road, Chennai', 'Chennai', 'Peaceful resort with private beach access and lush gardens.', 4.5, '/images/hotel3.jpg', 'WiFi,Pool,Spa,Beach Access,Restaurant,Bar'),
('Metro Stay', '23 MG Road, Bangalore', 'Bangalore', 'Affordable and comfortable stay in the tech hub of India.', 4.0, '/images/hotel4.jpg', 'WiFi,Gym,Restaurant,Parking'),
('Royal Orchid', '56 Brigade Road, Bangalore', 'Bangalore', 'Premium hotel with rooftop dining and panoramic city views.', 4.6, '/images/hotel5.jpg', 'WiFi,Pool,Spa,Gym,Restaurant,Bar,Rooftop'),
('Sea Pearl Hotel', '10 Marine Drive, Mumbai', 'Mumbai', 'Iconic hotel overlooking the Arabian Sea with heritage architecture.', 4.7, '/images/hotel6.jpg', 'WiFi,Pool,Spa,Gym,Restaurant,Bar,Concierge');

-- Sample Rooms for Hotel 1 (The Grand Palace)
INSERT INTO rooms (hotel_id, room_type, capacity, price_per_night, amenities, image_url, total_rooms) VALUES
(1, 'Standard Room', 2, 3500.00, 'AC,TV,WiFi,Mini Bar', '/images/room1.jpg', 10),
(1, 'Deluxe Room', 2, 5500.00, 'AC,TV,WiFi,Mini Bar,Sea View,Balcony', '/images/room2.jpg', 8),
(1, 'Suite', 4, 12000.00, 'AC,TV,WiFi,Mini Bar,Sea View,Jacuzzi,Living Room', '/images/room3.jpg', 4);

-- Sample Rooms for Hotel 2 (City Comfort Inn)
INSERT INTO rooms (hotel_id, room_type, capacity, price_per_night, amenities, image_url, total_rooms) VALUES
(2, 'Standard Room', 2, 2500.00, 'AC,TV,WiFi', '/images/room1.jpg', 15),
(2, 'Deluxe Room', 2, 4000.00, 'AC,TV,WiFi,Work Desk,City View', '/images/room2.jpg', 10),
(2, 'Executive Suite', 3, 8000.00, 'AC,TV,WiFi,Work Desk,City View,Lounge', '/images/room3.jpg', 5);

-- Sample Rooms for Hotel 3 (Sunset Resort)
INSERT INTO rooms (hotel_id, room_type, capacity, price_per_night, amenities, image_url, total_rooms) VALUES
(3, 'Garden Room', 2, 4500.00, 'AC,TV,WiFi,Garden View', '/images/room1.jpg', 12),
(3, 'Beach Villa', 2, 9000.00, 'AC,TV,WiFi,Private Pool,Beach Access', '/images/room2.jpg', 6),
(3, 'Family Suite', 5, 15000.00, 'AC,TV,WiFi,Private Pool,Beach Access,Kitchen', '/images/room3.jpg', 3);

-- Sample Rooms for Hotel 4 (Metro Stay)
INSERT INTO rooms (hotel_id, room_type, capacity, price_per_night, amenities, image_url, total_rooms) VALUES
(4, 'Standard Room', 2, 1800.00, 'AC,TV,WiFi', '/images/room1.jpg', 20),
(4, 'Deluxe Room', 2, 2800.00, 'AC,TV,WiFi,City View', '/images/room2.jpg', 12);

-- Sample Rooms for Hotel 5 (Royal Orchid)
INSERT INTO rooms (hotel_id, room_type, capacity, price_per_night, amenities, image_url, total_rooms) VALUES
(5, 'Superior Room', 2, 5000.00, 'AC,TV,WiFi,Mini Bar', '/images/room1.jpg', 10),
(5, 'Deluxe Suite', 3, 9500.00, 'AC,TV,WiFi,Mini Bar,City View,Jacuzzi', '/images/room2.jpg', 6),
(5, 'Penthouse', 4, 25000.00, 'AC,TV,WiFi,Mini Bar,Panoramic View,Private Terrace,Butler', '/images/room3.jpg', 2);

-- Sample Rooms for Hotel 6 (Sea Pearl Hotel)
INSERT INTO rooms (hotel_id, room_type, capacity, price_per_night, amenities, image_url, total_rooms) VALUES
(6, 'Classic Room', 2, 6000.00, 'AC,TV,WiFi,Heritage Decor', '/images/room1.jpg', 8),
(6, 'Sea View Room', 2, 9000.00, 'AC,TV,WiFi,Sea View,Balcony', '/images/room2.jpg', 6),
(6, 'Presidential Suite', 4, 30000.00, 'AC,TV,WiFi,Sea View,Private Pool,Butler,Dining Room', '/images/room3.jpg', 2);
