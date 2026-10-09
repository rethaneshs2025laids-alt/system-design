import { motion } from 'framer-motion';
import { Star, X, Wifi, Waves, Sparkles, Dumbbell, UtensilsCrossed, Wine, Car, Coffee, Umbrella } from 'lucide-react';

const PROPERTY_TYPES = [
  { value: 'Hotel',    emoji: '🏨' },
  { value: 'Resort',   emoji: '🌴' },
  { value: 'Villa',    emoji: '🏡' },
  { value: 'Boutique', emoji: '✨' },
];

const AMENITY_OPTIONS = [
  { label: 'WiFi',         icon: Wifi },
  { label: 'Pool',         icon: Waves },
  { label: 'Spa',          icon: Sparkles },
  { label: 'Gym',          icon: Dumbbell },
  { label: 'Restaurant',   icon: UtensilsCrossed },
  { label: 'Bar',          icon: Wine },
  { label: 'Parking',      icon: Car },
  { label: 'Breakfast',    icon: Coffee },
  { label: 'Beach Access', icon: Umbrella },
];

export default function FilterSidebar({ filters, onChange, onClear }) {
  function toggle(key, val) {
    const arr = filters[key] || [];
    onChange({ ...filters, [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] });
  }

  const hasFilters =
    (filters.minPrice || 0) > 0 ||
    (filters.maxPrice || 100000) < 100000 ||
    filters.stars?.length > 0 ||
    filters.amenities?.length > 0 ||
    filters.types?.length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-card p-6 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-navy text-base">Filters</h3>
        {hasFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs text-gold hover:opacity-70 font-medium transition-opacity"
          >
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      {/* ── Price Range ── */}
      <div className="mb-6 pb-6 border-b border-amber-50">
        <h4 className="text-sm font-semibold text-navy mb-3">Price per night</h4>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1">
            <label className="text-xs text-gray-400 mb-1 block">Min ₹</label>
            <input
              type="number"
              value={filters.minPrice || 0}
              onChange={e => onChange({ ...filters, minPrice: Number(e.target.value) })}
              className="w-full border border-amber-200 rounded-lg px-3 py-2 text-sm text-navy outline-none focus:border-gold transition-colors"
              placeholder="0"
            />
          </div>
          <span className="text-gray-300 mt-5">—</span>
          <div className="flex-1">
            <label className="text-xs text-gray-400 mb-1 block">Max ₹</label>
            <input
              type="number"
              value={filters.maxPrice || 100000}
              onChange={e => onChange({ ...filters, maxPrice: Number(e.target.value) })}
              className="w-full border border-amber-200 rounded-lg px-3 py-2 text-sm text-navy outline-none focus:border-gold transition-colors"
              placeholder="100000"
            />
          </div>
        </div>
        <input
          type="range" min={0} max={100000} step={500}
          value={filters.maxPrice || 100000}
          onChange={e => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-amber-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>₹0</span>
          <span className="font-medium text-gold">₹{(filters.maxPrice || 100000).toLocaleString('en-IN')}</span>
          <span>₹1,00,000</span>
        </div>
      </div>

      {/* ── Star Rating ── */}
      <div className="mb-6 pb-6 border-b border-amber-50">
        <h4 className="text-sm font-semibold text-navy mb-3">Star Rating</h4>
        <div className="flex flex-wrap gap-2">
          {[5, 4, 3].map(s => (
            <button
              key={s}
              onClick={() => toggle('stars', s)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                (filters.stars || []).includes(s)
                  ? 'border-gold bg-amber-50 text-gold shadow-sm'
                  : 'border-amber-200 text-gray-500 hover:border-gold hover:text-gold'
              }`}
            >
              {s} <Star size={10} className="fill-amber-400 text-amber-400" />
            </button>
          ))}
        </div>
      </div>

      {/* ── Property Type ── */}
      <div className="mb-6 pb-6 border-b border-amber-50">
        <h4 className="text-sm font-semibold text-navy mb-3">Property Type</h4>
        <div className="grid grid-cols-2 gap-2">
          {PROPERTY_TYPES.map(({ value, emoji }) => {
            const active = (filters.types || []).includes(value);
            return (
              <motion.button
                key={value}
                whileTap={{ scale: 0.96 }}
                onClick={() => toggle('types', value)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  active
                    ? 'border-gold bg-amber-50 text-gold shadow-sm'
                    : 'border-amber-100 text-gray-600 hover:border-amber-300 hover:text-navy'
                }`}
              >
                <span className="text-base">{emoji}</span>
                <span>{value}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── Amenities ── */}
      <div>
        <h4 className="text-sm font-semibold text-navy mb-3">Amenities</h4>
        <div className="flex flex-col gap-1.5">
          {AMENITY_OPTIONS.map(({ label, icon: Icon }) => {
            const active = (filters.amenities || []).includes(label);
            return (
              <label
                key={label}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  active ? 'bg-amber-50 border border-gold' : 'border border-transparent hover:bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => toggle('amenities', label)}
                  className="sr-only"
                />
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  active ? 'bg-gold' : 'bg-amber-100'
                }`}>
                  <Icon size={13} className={active ? 'text-white' : 'text-gold'} />
                </div>
                <span className={`text-sm font-medium transition-colors ${active ? 'text-gold' : 'text-gray-600'}`}>
                  {label}
                </span>
                {active && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-4 h-4 rounded-full bg-gold flex items-center justify-center"
                  >
                    <X size={9} className="text-white" />
                  </motion.div>
                )}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
