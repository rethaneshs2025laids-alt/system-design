import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Hash, X, Eye } from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/AppContext';
import EmptyState from '../components/EmptyState';
import { SkeletonCard } from '../components/LoadingSkeleton';

const STATUS_STYLES = {
  CONFIRMED: 'bg-emerald-100 text-emerald-700',
  PENDING: 'bg-amber-100 text-amber-700',
  CANCELLED: 'bg-gray-100 text-gray-500',
  PAYMENT_FAILED: 'bg-red-100 text-red-600',
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelModal, setCancelModal] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    api.getUserBookings()
      .then(setBookings)
      .finally(() => setLoading(false));
  }, []);

  async function confirmCancel() {
    setCancelling(true);
    try {
      const updated = await api.cancelBooking(cancelModal.id);
      setBookings(prev => prev.map(b => String(b.id) === String(cancelModal.id) ? { ...b, status: 'CANCELLED' } : b));
      addToast('Booking cancelled successfully.', 'info');
      setCancelModal(null);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setCancelling(false);
    }
  }

  return (
    <div className="min-h-screen bg-ivory pt-16">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-navy">My Bookings</h1>
          <p className="text-gray-400 mt-1">Manage your reservations</p>
        </div>

        {loading ? (
          <div className="space-y-4">{Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)}</div>
        ) : bookings.length === 0 ? (
          <EmptyState type="bookings" title="No bookings yet" message="Start exploring hotels and make your first booking." action="/" actionLabel="Explore Hotels" />
        ) : (
          <div className="space-y-4">
            {bookings.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl shadow-card border border-amber-50 p-6"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="font-semibold text-navy text-lg">{b.hotelName || 'Hotel Booking'}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[b.status] || STATUS_STYLES.PENDING}`}>
                        {b.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{b.roomType || b.roomId}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5"><Hash size={13} className="text-gold" /> #{b.id}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={13} className="text-gold" /> {b.checkIn} → {b.checkOut}</span>
                      {b.hotelLocation && <span className="flex items-center gap-1.5"><MapPin size={13} className="text-gold" /> {b.hotelLocation}</span>}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xl font-bold text-navy">
                      ₹{Number(b.totalPrice).toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-gray-400 mb-3">Total amount</div>
                    <div className="flex gap-2 justify-end">
                      {(b.status === 'CONFIRMED' || b.status === 'PENDING') && (
                        <button
                          onClick={() => setCancelModal(b)}
                          className="flex items-center gap-1.5 px-3 py-2 border border-red-200 text-red-500 rounded-xl text-xs font-semibold hover:bg-red-50 transition-colors"
                        >
                          <X size={13} /> Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      <AnimatePresence>
        {cancelModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setCancelModal(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-luxury p-8 max-w-sm w-full" onClick={e => e.stopPropagation()}>
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X size={24} className="text-red-500" />
                  </div>
                  <h3 className="font-semibold text-navy text-xl mb-2">Cancel Booking?</h3>
                  <p className="text-gray-500 text-sm">
                    Are you sure you want to cancel your booking at <strong>{cancelModal.hotelName || 'this hotel'}</strong>? This action cannot be undone.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCancelModal(null)}
                    className="flex-1 py-3 border-2 border-amber-200 text-navy rounded-xl font-semibold hover:border-gold transition-colors"
                  >
                    Keep Booking
                  </button>
                  <button
                    onClick={confirmCancel}
                    disabled={cancelling}
                    className="flex-1 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors disabled:opacity-60"
                  >
                    {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
