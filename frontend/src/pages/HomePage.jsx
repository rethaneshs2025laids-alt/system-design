import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight, MapPin } from 'lucide-react';
import HotelSearchBar from '../components/HotelSearchBar';
import { DEMO_HOTELS, DESTINATIONS } from '../data/demoData';

// Pick one of each type for featured showcase
const FEATURED = [
  DEMO_HOTELS.find(h => h.type === 'Resort'),
  DEMO_HOTELS.find(h => h.type === 'Villa'),
  DEMO_HOTELS.find(h => h.type === 'Boutique'),
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=90"
            alt="Luxury Hotel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/70" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-gold font-medium tracking-[0.3em] text-sm uppercase mb-4">Premium Hotel Booking</p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
              Your Perfect<br />
              <span className="text-gold">Escape</span> Awaits
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-10 max-w-xl mx-auto">
              Discover handpicked luxury hotels and resorts across India's most breathtaking destinations.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <HotelSearchBar />
          </motion.div>

          {/* Quick destinations */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 mt-6"
          >
            {DESTINATIONS.slice(0, 6).map(d => (
              <button
                key={d}
                onClick={() => navigate(`/hotels?city=${d}`)}
                className="px-4 py-1.5 bg-white/15 backdrop-blur-sm text-white/90 rounded-full text-sm hover:bg-white/25 transition-colors border border-white/20"
              >
                {d}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-navy py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: '500+', label: 'Luxury Hotels' },
            { num: '50+', label: 'Destinations' },
            { num: '2M+', label: 'Happy Guests' },
            { num: '4.9★', label: 'Average Rating' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-gold mb-1">{s.num}</div>
              <div className="text-white/60 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-2">Handpicked for You</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy">Featured Properties</h2>
          </div>
          <button
            onClick={() => navigate('/hotels')}
            className="hidden md:flex items-center gap-2 text-gold font-medium hover:gap-3 transition-all"
          >
            View all <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED.map((hotel, i) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
              onClick={() => navigate(`/hotels/${hotel.id}`)}
            >
              <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                <motion.img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg leading-tight">{hotel.name}</h3>
                  <div className="flex items-center gap-1 text-white/80 text-sm mt-1">
                    <MapPin size={12} /> {hotel.city}
                  </div>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 rounded-full px-2.5 py-1">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-navy">{hotel.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between px-1">
                <span className="text-gray-500 text-sm">{hotel.type}</span>
                <span className="font-bold text-navy">
                  ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-gray-400">/night</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Browse by Type */}
      <section className="max-w-7xl mx-auto px-6 pb-4">
        <div className="text-center mb-8">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-2">Every Style of Stay</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy">Browse by Property Type</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { type: 'Hotel',    emoji: '🏨', img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80', desc: 'Classic comfort & service' },
            { type: 'Resort',   emoji: '🌴', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', desc: 'All-inclusive escapes' },
            { type: 'Villa',    emoji: '🏡', img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80', desc: 'Private & exclusive' },
            { type: 'Boutique', emoji: '✨', img: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=600&q=80', desc: 'Unique & handcrafted' },
          ].map((item, i) => (
            <motion.button
              key={item.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/hotels?type=${item.type}`)}
              className="group relative rounded-2xl overflow-hidden h-44 shadow-card hover:shadow-luxury transition-shadow"
            >
              <img src={item.img} alt={item.type} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                <div className="text-2xl mb-1">{item.emoji}</div>
                <div className="text-white font-bold text-base">{item.type}</div>
                <div className="text-white/70 text-xs">{item.desc}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Destinations */}
      <section className="bg-ivory-dark py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-2">Explore India</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy">Popular Destinations</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {DESTINATIONS.slice(0, 6).map((dest, i) => (
              <motion.button
                key={dest}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/hotels?city=${dest}`)}
                className="bg-white rounded-2xl p-5 text-center shadow-card hover:shadow-luxury transition-shadow"
              >
                <div className="text-3xl mb-2">
                  {['🏖️','🌴','🏙️','🌿','🏔️','🌊'][i]}
                </div>
                <div className="font-semibold text-navy text-sm">{dest}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1400&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/75" />
        </div>
        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-4xl font-bold text-white mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-white/70 mb-8">Join millions of travellers who trust LuxeStay for their perfect getaway.</p>
          <button
            onClick={() => navigate('/hotels')}
            className="px-10 py-4 gradient-gold text-white rounded-2xl font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Explore All Hotels
          </button>
        </div>
      </section>
    </div>
  );
}
