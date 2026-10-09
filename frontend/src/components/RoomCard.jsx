import { motion } from 'framer-motion';
import { Users, BedDouble, CheckCircle, XCircle } from 'lucide-react';

export default function RoomCard({ room, selected, onSelect, nights = 1 }) {
  const total = room.price * nights;
  const free = room.cancellation?.toLowerCase().includes('free');

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={() => onSelect(room)}
      className={`border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 ${
        selected ? 'border-gold shadow-luxury' : 'border-amber-100 hover:border-amber-300'
      }`}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-44 h-36 sm:h-auto shrink-0 overflow-hidden">
          <img src={room.image} alt={room.type} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-semibold text-navy text-base">{room.type}</h4>
            {selected && (
              <span className="px-2.5 py-1 gradient-gold text-white text-xs rounded-full font-semibold shrink-0">Selected</span>
            )}
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1"><BedDouble size={13} /> {room.bed}</span>
            <span className="flex items-center gap-1"><Users size={13} /> Up to {room.capacity} guests</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {room.amenities.map(a => (
              <span key={a} className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-xs">{a}</span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs mb-4">
            {free
              ? <><CheckCircle size={13} className="text-emerald-500" /><span className="text-emerald-600">{room.cancellation}</span></>
              : <><XCircle size={13} className="text-red-400" /><span className="text-red-500">{room.cancellation}</span></>
            }
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-xl font-bold text-navy">
                ₹{room.price.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-gray-400">/night</span>
              </div>
              {nights > 1 && (
                <div className="text-xs text-gold font-medium">
                  ₹{total.toLocaleString('en-IN')} for {nights} nights
                </div>
              )}
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={e => { e.stopPropagation(); onSelect(room); }}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                selected
                  ? 'bg-navy text-white'
                  : 'gradient-gold text-white hover:opacity-90'
              }`}
            >
              {selected ? 'Selected ✓' : 'Select Room'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
