import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Lock, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/AppContext';

export default function PaymentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const bookingId = searchParams.get('bookingId');
  const total = searchParams.get('total');
  const hotelName = searchParams.get('hotelName');
  const roomType = searchParams.get('roomType');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const nights = searchParams.get('nights');

  const [cardLast4, setCardLast4] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  function validate() {
    const e = {};
    if (!/^\d{4}$/.test(cardLast4)) e.cardLast4 = 'Enter exactly 4 digits.';
    if (!cardName.trim()) e.cardName = 'Cardholder name is required.';
    if (!/^\d{2}\/\d{2}$/.test(expiry)) e.expiry = 'Enter expiry as MM/YY.';
    return e;
  }

  async function handlePay(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setProcessing(true);
    try {
      const payment = await api.processPayment({ bookingId: Number(bookingId), mockCardLast4: cardLast4 });
      navigate(`/confirmation?bookingId=${bookingId}&paymentStatus=${payment.status}&transactionId=${payment.transactionId}&total=${total}&hotelName=${encodeURIComponent(hotelName)}&roomType=${encodeURIComponent(roomType)}&checkIn=${checkIn}&checkOut=${checkOut}&nights=${nights}`);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setProcessing(false);
    }
  }

  function formatExpiry(val) {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  }

  return (
    <div className="min-h-screen bg-ivory pt-16">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-navy/60 hover:text-gold mb-6 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back
        </button>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8 text-xs font-medium">
          {['Select Room', 'Guest Details', 'Payment', 'Confirmation'].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 2 ? 'gradient-gold text-white' : i < 2 ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                {i < 2 ? '✓' : i + 1}
              </div>
              <span className={i === 2 ? 'text-navy font-semibold' : 'text-gray-400'}>{step}</span>
              {i < 3 && <div className="w-8 h-px bg-gray-200" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 gradient-gold rounded-xl flex items-center justify-center">
                  <Lock size={18} className="text-white" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-navy">Secure Payment</h2>
                  <p className="text-xs text-gray-400">Demo mode — no real card data is stored</p>
                </div>
              </div>

              {/* Mock card visual */}
              <div className="gradient-navy rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-gold font-serif font-bold text-lg">LUXESTAY</span>
                    <CreditCard size={28} className="text-white/60" />
                  </div>
                  <div className="text-xl font-mono tracking-widest mb-4 text-white/80">
                    **** **** **** {cardLast4 || '____'}
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <div className="text-white/50 text-xs uppercase tracking-wider">Card Holder</div>
                      <div className="font-medium">{cardName || 'YOUR NAME'}</div>
                    </div>
                    <div>
                      <div className="text-white/50 text-xs uppercase tracking-wider">Expires</div>
                      <div className="font-medium">{expiry || 'MM/YY'}</div>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handlePay} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-1.5">Cardholder Name *</label>
                  <input
                    type="text" placeholder="Name on card"
                    value={cardName} onChange={e => setCardName(e.target.value)}
                    className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition-colors ${errors.cardName ? 'border-red-400' : 'border-amber-100 focus:border-gold'}`}
                  />
                  {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">Last 4 Digits *</label>
                    <input
                      type="text" maxLength={4} placeholder="e.g. 1234"
                      value={cardLast4} onChange={e => setCardLast4(e.target.value.replace(/\D/g, ''))}
                      className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition-colors ${errors.cardLast4 ? 'border-red-400' : 'border-amber-100 focus:border-gold'}`}
                    />
                    {errors.cardLast4 && <p className="text-red-500 text-xs mt-1">{errors.cardLast4}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">Expiry *</label>
                    <input
                      type="text" placeholder="MM/YY" maxLength={5}
                      value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))}
                      className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition-colors ${errors.expiry ? 'border-red-400' : 'border-amber-100 focus:border-gold'}`}
                    />
                    {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
                  💡 <strong>Demo tip:</strong> Any 4 digits work. Digits starting with <strong>0</strong> (e.g. 0123) simulate a failed payment.
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={processing}
                  className="w-full py-4 gradient-gold text-white rounded-xl font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}>
                      <Lock size={18} />
                    </motion.div>
                  ) : <Lock size={18} />}
                  {processing ? 'Processing Payment...' : `Pay ₹${Number(total).toLocaleString('en-IN')}`}
                </motion.button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  256-bit SSL encrypted · Demo mode only
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-2xl shadow-card border border-amber-100 p-6">
              <h3 className="font-semibold text-navy mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="font-semibold text-navy">{hotelName}</div>
                <div className="p-2.5 bg-amber-50 rounded-lg text-xs text-amber-800 font-medium">{roomType}</div>
                <div className="flex justify-between text-gray-600"><span>Check-in</span><span className="font-medium text-navy">{checkIn}</span></div>
                <div className="flex justify-between text-gray-600"><span>Check-out</span><span className="font-medium text-navy">{checkOut}</span></div>
                <div className="flex justify-between text-gray-600"><span>Nights</span><span className="font-medium text-navy">{nights}</span></div>
                <div className="border-t border-amber-100 pt-3">
                  <div className="flex justify-between font-bold text-navy text-base">
                    <span>Total</span>
                    <span className="text-gold">₹{Number(total).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
