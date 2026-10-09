import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year, month) {
  return new Date(year, month, 1).getDay();
}
function toDateStr(d) {
  return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` : '';
}

export default function DateRangePicker({ checkIn, checkOut, onChange }) {
  const [open, setOpen] = useState(false);
  const [selecting, setSelecting] = useState('checkIn');
  const [hovered, setHovered] = useState(null);
  const today = new Date(); today.setHours(0,0,0,0);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const ref = useRef(null);

  const ciDate = checkIn ? new Date(checkIn + 'T00:00:00') : null;
  const coDate = checkOut ? new Date(checkOut + 'T00:00:00') : null;

  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  function selectDay(day) {
    const d = new Date(viewYear, viewMonth, day);
    if (d < today) return;
    const ds = toDateStr(d);
    if (selecting === 'checkIn') {
      onChange({ checkIn: ds, checkOut: coDate && d >= coDate ? '' : checkOut });
      setSelecting('checkOut');
    } else {
      if (ciDate && d <= ciDate) {
        onChange({ checkIn: ds, checkOut: '' });
        setSelecting('checkOut');
      } else {
        onChange({ checkIn, checkOut: ds });
        setOpen(false);
        setSelecting('checkIn');
      }
    }
  }

  function isInRange(day) {
    const d = new Date(viewYear, viewMonth, day);
    const end = hovered ? new Date(hovered + 'T00:00:00') : coDate;
    return ciDate && end && d > ciDate && d < end;
  }
  function isStart(day) { return ciDate && toDateStr(new Date(viewYear, viewMonth, day)) === checkIn; }
  function isEnd(day) { return coDate && toDateStr(new Date(viewYear, viewMonth, day)) === checkOut; }
  function isPast(day) { return new Date(viewYear, viewMonth, day) < today; }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDay(viewYear, viewMonth);

  const nights = ciDate && coDate ? Math.ceil((coDate - ciDate) / 86400000) : 0;

  const displayText = checkIn && checkOut
    ? `${checkIn} → ${checkOut} (${nights}n)`
    : checkIn ? `${checkIn} → Select checkout`
    : 'Select dates';

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <button
        onClick={() => { setOpen(p => !p); setSelecting('checkIn'); }}
        className="w-full flex items-center gap-2 px-4 py-3 text-left"
      >
        <Calendar size={18} className="text-gold shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Dates</div>
          <div className={`text-sm font-medium truncate ${checkIn ? 'text-navy' : 'text-gray-400'}`}>{displayText}</div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-luxury border border-amber-100 p-5 z-50 w-80"
          >
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-amber-50 text-navy transition-colors">
                <ChevronLeft size={18} />
              </button>
              <span className="font-semibold text-navy text-sm">{MONTHS[viewMonth]} {viewYear}</span>
              <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-amber-50 text-navy transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-7 mb-2">
              {DAYS.map(d => (
                <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1">
              {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
              {Array(daysInMonth).fill(null).map((_, i) => {
                const day = i + 1;
                const past = isPast(day);
                const start = isStart(day);
                const end = isEnd(day);
                const inRange = isInRange(day);
                return (
                  <button
                    key={day}
                    disabled={past}
                    onClick={() => selectDay(day)}
                    onMouseEnter={() => selecting === 'checkOut' && setHovered(toDateStr(new Date(viewYear, viewMonth, day)))}
                    onMouseLeave={() => setHovered(null)}
                    className={`
                      h-9 w-full text-sm font-medium rounded-lg transition-all
                      ${past ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
                      ${start || end ? 'gradient-gold text-white shadow-sm' : ''}
                      ${inRange ? 'bg-amber-100 text-amber-800 rounded-none' : ''}
                      ${!past && !start && !end && !inRange ? 'hover:bg-amber-50 text-navy' : ''}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-amber-100 flex justify-between text-xs text-gray-500">
              <span className={selecting === 'checkIn' ? 'text-gold font-semibold' : ''}>
                Check-in: {checkIn || '—'}
              </span>
              <span className={selecting === 'checkOut' ? 'text-gold font-semibold' : ''}>
                Check-out: {checkOut || '—'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
