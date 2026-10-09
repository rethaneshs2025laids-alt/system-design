import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import DestinationAutocomplete from './DestinationAutocomplete';
import DateRangePicker from './DateRangePicker';
import GuestRoomSelector from './GuestRoomSelector';

export default function HotelSearchBar({ compact = false, initialValues = {} }) {
  const navigate = useNavigate();
  const [destination, setDestination] = useState(initialValues.city || '');
  const [dates, setDates] = useState({ checkIn: initialValues.checkIn || '', checkOut: initialValues.checkOut || '' });
  const [guests, setGuests] = useState({ adults: Number(initialValues.adults) || 2, children: Number(initialValues.children) || 0, rooms: Number(initialValues.rooms) || 1 });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSearch() {
    if (!destination.trim()) { setError('Please enter a destination.'); return; }
    if (!dates.checkIn) { setError('Please select a check-in date.'); return; }
    if (!dates.checkOut) { setError('Please select a check-out date.'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const params = new URLSearchParams({
        city: destination,
        checkIn: dates.checkIn,
        checkOut: dates.checkOut,
        adults: guests.adults,
        children: guests.children,
        rooms: guests.rooms,
      });
      navigate(`/hotels?${params}`);
    }, 600);
  }

  return (
    <div className={compact ? '' : 'w-full max-w-5xl mx-auto'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`bg-white rounded-2xl shadow-luxury border border-amber-100 overflow-visible ${compact ? 'p-1' : 'p-2'}`}
      >
        <div className="flex flex-col md:flex-row items-stretch md:items-center divide-y md:divide-y-0 md:divide-x divide-amber-100">
          <DestinationAutocomplete value={destination} onChange={setDestination} />
          <DateRangePicker checkIn={dates.checkIn} checkOut={dates.checkOut} onChange={setDates} />
          <GuestRoomSelector value={guests} onChange={setGuests} />
          <div className="p-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSearch}
              disabled={loading}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3.5 gradient-gold text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-70 whitespace-nowrap"
            >
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}>
                  <Search size={18} />
                </motion.div>
              ) : <Search size={18} />}
              {loading ? 'Searching...' : 'Search Hotels'}
            </motion.button>
          </div>
        </div>
      </motion.div>
      {error && <p className="mt-2 text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
}
