import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, Star, Trash2 } from 'lucide-react';
import { useWishlist, useToast } from '../context/AppContext';
import EmptyState from '../components/EmptyState';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();
  const navigate = useNavigate();

  function handleRemove(hotel) {
    toggleWishlist(hotel);
    addToast(`${hotel.name} removed from wishlist.`, 'info');
  }

  return (
    <div className="min-h-screen bg-ivory pt-16">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 gradient-gold rounded-xl flex items-center justify-center">
            <Heart size={18} className="text-white fill-white" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold text-navy">My Wishlist</h1>
            <p className="text-gray-400 text-sm">{wishlist.length} saved {wishlist.length === 1 ? 'property' : 'properties'}</p>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <EmptyState type="wishlist" title="Your wishlist is empty" message="Save hotels you love by clicking the heart icon on any property." action="/hotels" actionLabel="Explore Hotels" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {wishlist.map((hotel, i) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl overflow-hidden shadow-card group"
              >
                <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => navigate(`/hotels/${hotel.id}`)}>
                  <motion.img
                    src={hotel.images[0]}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <button
                    onClick={e => { e.stopPropagation(); handleRemove(hotel); }}
                    className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={15} className="text-red-400" />
                  </button>
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 rounded-full px-2.5 py-1">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-navy">{hotel.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-navy mb-1 cursor-pointer hover:text-gold transition-colors" onClick={() => navigate(`/hotels/${hotel.id}`)}>
                    {hotel.name}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                    <MapPin size={11} /> {hotel.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-navy">₹{hotel.pricePerNight.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-gray-400">/night</span>
                    </div>
                    <button
                      onClick={() => navigate(`/hotels/${hotel.id}`)}
                      className="px-4 py-2 gradient-gold text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity"
                    >
                      View Hotel
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
