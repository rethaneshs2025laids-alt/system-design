import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { DESTINATIONS } from '../data/demoData';

export default function DestinationAutocomplete({ value, onChange }) {
  const [query, setQuery] = useState(value || '');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const suggestions = DESTINATIONS.filter(d =>
    d.toLowerCase().includes(query.toLowerCase()) && query.length > 0
  );

  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function select(dest) {
    setQuery(dest);
    onChange(dest);
    setOpen(false);
  }

  function handleKey(e) {
    if (e.key === 'Escape') setOpen(false);
  }

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <div className="flex items-center gap-2 px-4 py-3">
        <MapPin size={18} className="text-gold shrink-0" />
        <div className="flex-1 min-w-0">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Destination</label>
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); onChange(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKey}
            placeholder="Where are you going?"
            className="w-full text-navy font-medium text-sm bg-transparent outline-none placeholder-gray-400"
          />
        </div>
      </div>
      <AnimatePresence>
        {open && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-luxury border border-amber-100 overflow-hidden z-50"
          >
            {suggestions.map(dest => (
              <li key={dest}>
                <button
                  onMouseDown={() => select(dest)}
                  className="w-full flex items-center gap-3 px-5 py-3 text-sm text-navy hover:bg-amber-50 hover:text-gold transition-colors text-left"
                >
                  <MapPin size={14} className="text-gold" /> {dest}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
