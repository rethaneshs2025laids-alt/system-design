import { motion } from 'framer-motion';
import { Heart, Star, MapPin, Wifi, Car, Coffee, Waves } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWishlist, useToast } from '../context/AppContext';

const AMENITY_ICONS = { WiFi: Wifi, Parking: Car, Breakfast: Coffee, Pool: Waves };
const TYPE_EMOJI = { Hotel: '🏨', Resort: '🌴', Villa: '🏡', Boutique: '✨' };

export default function HotelCard({ hotel, checkIn, checkOut, adults, index = 0 }) {
  const navigate = useNavigate();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const wishlisted = isWishlisted(hotel.id);

  const nights = checkIn && checkOut
    ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000)
    : 1;

  function handleWishlist(e) {
    e.stopPropagation();
    toggleWishlist(hotel);
    addToast(wishlisted ? `Removed from wishlist` : `${hotel.name} saved to wishlist`, wishlisted ? 'info' : 'success');
  }

  function goToDetail() {
    const params = new URLSearchParams();
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (adults) params.set('adults', adults);
    navigate(`/hotels/${hotel.id}?${params}`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-luxury transition-shadow duration-300 group cursor-pointer"
      onClick={goToDetail}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <motion.img
          src={hotel.images[0]}
          alt={hotel.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Wishlist */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <motion.div animate={{ scale: wishlisted ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }}>
            <Heart size={16} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'} />
          </motion.div>
        </motion.button>
        {/* Stars */}
        <div className="absolute bottom-3 left-3 flex gap-0.5">
          {Array(hotel.stars).fill(0).map((_, i) => (
            <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
        {/* Type badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-navy">
          <span>{TYPE_EMOJI[hotel.type] || '🏨'}</span> {hotel.type}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-navy text-base leading-tight group-hover:text-gold transition-colors line-clamp-1">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold text-navy">{hotel.rating}</span>
            <span className="text-xs text-gray-400">({hotel.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
          <MapPin size={12} />
          <span className="truncate">{hotel.location}</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hotel.amenities.slice(0, 4).map(a => {
            const Icon = AMENITY_ICONS[a];
            return (
              <span key={a} className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                {Icon && <Icon size={10} />} {a}
              </span>
            );
          })}
        </div>

        {/* Price & CTA */}
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs text-gray-400">from</div>
            <div className="text-xl font-bold text-navy">
              ₹{hotel.pricePerNight.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-gray-400">/night</span>
            </div>
            {nights > 1 && (
              <div className="text-xs text-gold font-medium">
                ₹{(hotel.pricePerNight * nights).toLocaleString('en-IN')} total ({nights}n)
              </div>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={goToDetail}
            className="px-4 py-2.5 gradient-gold text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            View Rooms
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
