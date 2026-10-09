import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Heart, Wifi, Car, Coffee, Waves, Dumbbell, UtensilsCrossed, Wine, ArrowLeft } from 'lucide-react';
import { api } from '../services/api';
import HotelGallery from '../components/HotelGallery';
import RoomCard from '../components/RoomCard';
import { SkeletonDetail } from '../components/LoadingSkeleton';
import { useWishlist, useToast } from '../context/AppContext';

const AMENITY_ICONS = { WiFi: Wifi, Parking: Car, Breakfast: Coffee, Pool: Waves, Gym: Dumbbell, Restaurant: UtensilsCrossed, Bar: Wine };

export default function HotelDetailPage() {
  const { hotelId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const adults = searchParams.get('adults') || '2';

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const wishlisted = hotel ? isWishlisted(hotel.id) : false;

  const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000) : 1;

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.getHotel(hotelId),
      checkIn && checkOut ? api.getAvailableRooms(hotelId, checkIn, checkOut) : Promise.resolve([]),
    ]).then(([h, r]) => {
      setHotel(h);
      setRooms(r.length ? r : (h?.rooms || []));
    }).finally(() => setLoading(false));
  }, [hotelId, checkIn, checkOut]);

  function handleBook() {
    if (!selectedRoom) { addToast('Please select a room first.', 'error'); return; }
    if (!checkIn || !checkOut) { addToast('Please go back and select dates.', 'error'); return; }
    const params = new URLSearchParams({
      hotelId, roomId: selectedRoom.id,
      checkIn, checkOut, adults,
      hotelName: hotel.name, roomType: selectedRoom.type,
      price: selectedRoom.price, hotelLocation: hotel.location,
    });
    navigate(`/booking?${params}`);
  }

  if (loading) return <div className="pt-20 max-w-6xl mx-auto px-4 py-8"><SkeletonDetail /></div>;
  if (!hotel) return <div className="pt-20 text-center py-20 text-gray-400">Hotel not found.</div>;

  const tax = selectedRoom ? Math.round(selectedRoom.price * nights * 0.18) : 0;
  const total = selectedRoom ? selectedRoom.price * nights + tax : 0;

  return (
    <div className="min-h-screen bg-ivory pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-navy/60 hover:text-gold mb-6 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to results
        </button>

        <HotelGallery images={hotel.images} name={hotel.name} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {Array(hotel.stars).fill(0).map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs text-gray-400 font-medium">{hotel.type}</span>
                  </div>
                  <h1 className="font-serif text-3xl font-bold text-navy">{hotel.name}</h1>
                  <div className="flex items-center gap-1.5 text-gray-400 mt-2">
                    <MapPin size={15} />
                    <span className="text-sm">{hotel.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Star size={16} className="fill-amber-400 text-amber-400" />
                      <span className="font-bold text-navy text-lg">{hotel.rating}</span>
                    </div>
                    <div className="text-xs text-gray-400">{hotel.reviewCount} reviews</div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => { toggleWishlist(hotel); addToast(wishlisted ? 'Removed from wishlist' : `${hotel.name} saved!`, wishlisted ? 'info' : 'success'); }}
                    className="w-10 h-10 rounded-full border border-amber-200 flex items-center justify-center hover:border-red-300 transition-colors"
                  >
                    <Heart size={18} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                  </motion.button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-navy text-lg mb-3">About this property</h2>
              <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
            </div>

            <div>
              <h2 className="font-semibold text-navy text-lg mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {hotel.amenities.map(a => {
                  const Icon = AMENITY_ICONS[a] || Wifi;
                  return (
                    <div key={a} className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-amber-100">
                      <Icon size={16} className="text-gold" />
                      <span className="text-sm text-navy font-medium">{a}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-navy text-lg mb-4">
                Available Rooms
                {checkIn && checkOut && <span className="text-sm font-normal text-gray-400 ml-2">· {checkIn} → {checkOut} ({nights}n)</span>}
              </h2>
              {!checkIn || !checkOut ? (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
                  Please go back and select check-in and check-out dates to see room availability.
                </div>
              ) : (
                <div className="space-y-4">
                  {rooms.map(room => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      selected={selectedRoom?.id === room.id}
                      onSelect={setSelectedRoom}
                      nights={nights}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Sticky Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-2xl shadow-luxury border border-amber-100 p-6">
              <h3 className="font-semibold text-navy text-base mb-4">Booking Summary</h3>
              {selectedRoom ? (
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-amber-50 rounded-xl">
                    <div className="font-semibold text-navy">{selectedRoom.type}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{selectedRoom.bed} · {selectedRoom.capacity} guests</div>
                  </div>
                  {checkIn && checkOut && (
                    <>
                      <div className="flex justify-between text-gray-600"><span>Check-in</span><span className="font-medium text-navy">{checkIn}</span></div>
                      <div className="flex justify-between text-gray-600"><span>Check-out</span><span className="font-medium text-navy">{checkOut}</span></div>
                      <div className="flex justify-between text-gray-600"><span>Duration</span><span className="font-medium text-navy">{nights} night{nights !== 1 ? 's' : ''}</span></div>
                      <div className="border-t border-amber-100 pt-3 space-y-2">
                        <div className="flex justify-between text-gray-600">
                          <span>₹{selectedRoom.price.toLocaleString('en-IN')} × {nights}n</span>
                          <span>₹{(selectedRoom.price * nights).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Taxes & fees (18%)</span><span>₹{tax.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between font-bold text-navy text-base border-t border-amber-100 pt-2">
                          <span>Total</span><span className="text-gold">₹{total.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-400 text-sm">
                  <div className="text-3xl mb-2">🛏️</div>
                  Select a room to see pricing
                </div>
              )}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleBook}
                disabled={!selectedRoom || !checkIn || !checkOut}
                className="mt-5 w-full py-3.5 gradient-gold text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {!checkIn || !checkOut ? 'Select Dates First' : !selectedRoom ? 'Select a Room' : 'Book Now'}
              </motion.button>
              <p className="text-xs text-gray-400 text-center mt-3">No payment charged yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
