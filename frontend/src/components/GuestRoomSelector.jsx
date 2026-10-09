import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Minus } from 'lucide-react';

export default function GuestRoomSelector({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const { adults = 2, children = 0, rooms = 1 } = value || {};

  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function update(key, delta) {
    const limits = { adults: [1, 10], children: [0, 8], rooms: [1, 5] };
    const [min, max] = limits[key];
    const current = value[key] ?? (key === 'adults' ? 2 : 0);
    onChange({ ...value, [key]: Math.min(max, Math.max(min, current + delta)) });
  }

  const summary = `${adults} Adult${adults !== 1 ? 's' : ''}${children > 0 ? `, ${children} Child${children !== 1 ? 'ren' : ''}` : ''}, ${rooms} Room${rooms !== 1 ? 's' : ''}`;

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <button onClick={() => setOpen(p => !p)} className="w-full flex items-center gap-2 px-4 py-3 text-left">
        <Users size={18} className="text-gold shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Guests & Rooms</div>
          <div className="text-sm font-medium text-navy truncate">{summary}</div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-luxury border border-amber-100 p-5 z-50 w-72"
          >
            {[
              { key: 'adults', label: 'Adults', sub: 'Age 13+' },
              { key: 'children', label: 'Children', sub: 'Age 0–12' },
              { key: 'rooms', label: 'Rooms', sub: '' },
            ].map(({ key, label, sub }) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-amber-50 last:border-0">
                <div>
                  <div className="text-sm font-semibold text-navy">{label}</div>
                  {sub && <div className="text-xs text-gray-400">{sub}</div>}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => update(key, -1)}
                    className="w-8 h-8 rounded-full border border-amber-200 flex items-center justify-center text-navy hover:border-gold hover:text-gold transition-colors disabled:opacity-30"
                    disabled={(value[key] ?? (key === 'adults' ? 2 : 0)) <= (key === 'adults' ? 1 : 0)}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center font-semibold text-navy text-sm">
                    {value[key] ?? (key === 'adults' ? 2 : 0)}
                  </span>
                  <button
                    onClick={() => update(key, 1)}
                    className="w-8 h-8 rounded-full border border-amber-200 flex items-center justify-center text-navy hover:border-gold hover:text-gold transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => setOpen(false)}
              className="mt-3 w-full py-2.5 gradient-gold text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
