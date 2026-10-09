import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Calendar, MapPin, Hash, Download } from 'lucide-react';

export default function ConfirmationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const paymentStatus = searchParams.get('paymentStatus');
  const bookingId = searchParams.get('bookingId');
  const transactionId = searchParams.get('transactionId');
  const total = searchParams.get('total');
  const hotelName = searchParams.get('hotelName');
  const roomType = searchParams.get('roomType');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const nights = searchParams.get('nights');

  const success = paymentStatus === 'SUCCESS';

  return (
    <div className="min-h-screen bg-ivory pt-16 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className={`bg-white rounded-3xl shadow-luxury overflow-hidden border-t-4 ${success ? 'border-emerald-400' : 'border-red-400'}`}>
          {/* Header */}
          <div className={`px-8 py-10 text-center ${success ? 'bg-emerald-50' : 'bg-red-50'}`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-4"
            >
              {success
                ? <CheckCircle size={64} className="text-emerald-500" />
                : <XCircle size={64} className="text-red-400" />
              }
            </motion.div>
            <h1 className="font-serif text-3xl font-bold text-navy mb-2">
              {success ? 'Booking Confirmed!' : 'Payment Failed'}
            </h1>
            <p className="text-gray-500">
              {success
                ? 'Your reservation is confirmed. Have a wonderful stay!'
                : 'Your payment could not be processed. Please try again.'}
            </p>
          </div>

          {/* Details */}
          <div className="px-8 py-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1"><Hash size={12} /> Booking ID</div>
                <div className="font-bold text-navy">#{bookingId}</div>
              </div>
              <div className="bg-amber-50 rounded-xl p-4">
                <div className="text-xs text-gray-400 mb-1">Status</div>
                <div className={`font-bold text-sm ${success ? 'text-emerald-600' : 'text-red-500'}`}>
                  {success ? 'CONFIRMED' : 'PAYMENT FAILED'}
                </div>
              </div>
            </div>

            <div className="border border-amber-100 rounded-xl p-4 space-y-3 text-sm">
              <div className="font-semibold text-navy text-base">{hotelName}</div>
              <div className="text-gray-500 text-xs">{roomType}</div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={14} className="text-gold" />
                <span>{checkIn} → {checkOut} ({nights} nights)</span>
              </div>
              {success && (
                <div className="flex justify-between font-bold text-navy border-t border-amber-100 pt-3">
                  <span>Amount Paid</span>
                  <span className="text-gold">₹{Number(total).toLocaleString('en-IN')}</span>
                </div>
              )}
              {transactionId && (
                <div className="text-xs text-gray-400">Transaction: {transactionId}</div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="px-8 pb-8 flex flex-col gap-3">
            {success ? (
              <>
                <button
                  onClick={() => navigate('/my-bookings')}
                  className="w-full py-3.5 gradient-gold text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  View My Bookings
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full py-3.5 border-2 border-amber-200 text-navy rounded-xl font-semibold hover:border-gold transition-colors"
                >
                  Back to Home
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate(-1)}
                  className="w-full py-3.5 gradient-gold text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  Try Payment Again
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full py-3.5 border-2 border-amber-200 text-navy rounded-xl font-semibold hover:border-gold transition-colors"
                >
                  Back to Home
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
