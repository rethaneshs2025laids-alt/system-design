import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Spinner from '../components/Spinner';

const ROOM_IMAGES = [
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
];

export default function RoomsPage() {
  const { hotelId } = useParams();
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');

  useEffect(() => {
    if (!checkIn || !checkOut) {
      setError('Check-in and check-out dates are required.');
      setLoading(false);
      return;
    }
    Promise.all([
      api.getHotel(hotelId),
      api.getRooms(hotelId, checkIn, checkOut),
    ])
      .then(([h, r]) => { setHotel(h); setRooms(r); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [hotelId, checkIn, checkOut]);

  function handleBook(room) {
    navigate(`/booking?hotelId=${hotelId}&roomId=${room.id}&checkIn=${checkIn}&checkOut=${checkOut}`);
  }

  const nights = checkIn && checkOut
    ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000)
    : 0;

  if (loading) return <Spinner />;
  if (error) return <p className="error-msg page-container">{error}</p>;

  return (
    <div className="page-container">
      <button className="btn-back" onClick={() => navigate(-1)}>← Back</button>
      <div className="page-header">
        <h2>Available Rooms — {hotel?.name}</h2>
        <p className="date-range">📅 {checkIn} → {checkOut} ({nights} night{nights !== 1 ? 's' : ''})</p>
      </div>

      {rooms.length === 0 && (
        <p className="empty-msg">No rooms available for the selected dates.</p>
      )}

      <div className="room-grid">
        {rooms.map((room, idx) => {
          const imgSrc = ROOM_IMAGES[idx % ROOM_IMAGES.length];
          const total = (room.pricePerNight * nights).toFixed(2);
          const amenityList = room.amenities ? room.amenities.split(',') : [];
          return (
            <div key={room.id} className="room-card">
              <img src={imgSrc} alt={room.roomType} className="room-img" />
              <div className="room-info">
                <h3>{room.roomType}</h3>
                <p className="room-capacity">👥 Up to {room.capacity} guests</p>
                <div className="amenity-tags small">
                  {amenityList.map((a) => (
                    <span key={a} className="amenity-tag">{a.trim()}</span>
                  ))}
                </div>
                <div className="room-footer">
                  <div className="room-price">
                    <span className="price">₹{room.pricePerNight}/night</span>
                    <span className="total-price">Total: ₹{total}</span>
                  </div>
                  <button className="btn-primary" onClick={() => handleBook(room)}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
