import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, Users, MessageSquare } from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/AppContext';

const DEMO_USER_ID = 1;

function Field({ label, icon: Icon, error, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-navy mb-1.5">{label}</label>
      <div className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 transition-colors ${error ? 'border-red-400' : 'border-amber-100 focus-within:border-gold'}`}>
        <Icon size={16} className="text-gold shrink-0" />
        <input className="flex-1 outline-none text-sm text-navy bg-transparent placeholder-gray-400" {...props} />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const hotelId = searchParams.get('hotelId');
  const roomId = searchParams.get('roomId');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const adults = searchParams.get('adults') || '2';
  const hotelName = searchParams.get('hotelName');
  const roomType = searchParams.get('roomType');
  const price = Number(searchParams.get('price'));
  const hotelLocation = searchParams.get('hotelLocation');

  const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000) : 1;
  const subtotal = price * nights;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const [form, setForm] = useState({ guestName: '', guestEmail: '', guestPhone: '', numGuests: adults, specialRequests: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const e = {};
    if (!form.guestName.trim()) e.guestName = 'Full name is required.';
    if (!form.guestEmail.trim()) e.guestEmail = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.guestEmail)) e.guestEmail = 'Enter a valid email.';
    if (!form.guestPhone.trim()) e.guestPhone = 'Phone number is required.';
    else if (!/^\d{10}$/.test(form.guestPhone.replace(/\s/g, ''))) e.guestPhone = 'Enter a valid 10-digit number.';
    if (Number(form.numGuests) < 1) e.numGuests = 'At least 1 guest required.';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);
    try {
      const booking = await api.createBooking({
        userId: DEMO_USER_ID,
        roomId: Number(roomId),
        hotelId: Number(hotelId),
        checkIn, checkOut,
        guestName: form.guestName,
        guestEmail: form.guestEmail,
        guestPhone: form.guestPhone,
        numGuests: Number(form.numGuests),
        specialRequests: form.specialRequests,
        totalPrice: total,
        hotelName, roomType, hotelLocation,
        idempotencyKey: `${DEMO_USER_ID}-${roomId}-${checkIn}-${checkOut}-${Date.now()}`,
      });
      navigate(`/payment?bookingId=${booking.id}&total=${total}&hotelName=${encodeURIComponent(hotelName)}&roomType=${encodeURIComponent(roomType)}&checkIn=${checkIn}&checkOut=${checkOut}&nights=${nights}`);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
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
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 1 ? 'gradient-gold text-white' : i < 1 ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                {i < 1 ? '✓' : i + 1}
              </div>
              <span className={i === 1 ? 'text-navy font-semibold' : 'text-gray-400'}>{step}</span>
              {i < 3 && <div className="w-8 h-px bg-gray-200" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
              <h2 className="font-serif text-2xl font-bold text-navy mb-6">Guest Details</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <Field label="Full Name *" icon={User} type="text" placeholder="Enter your full name"
                  value={form.guestName} onChange={e => setForm({ ...form, guestName: e.target.value })} error={errors.guestName} />
                <Field label="Email Address *" icon={Mail} type="email" placeholder="your@email.com"
                  value={form.guestEmail} onChange={e => setForm({ ...form, guestEmail: e.target.value })} error={errors.guestEmail} />
                <Field label="Phone Number *" icon={Phone} type="tel" placeholder="10-digit mobile number"
                  value={form.guestPhone} onChange={e => setForm({ ...form, guestPhone: e.target.value })} error={errors.guestPhone} />
                <Field label="Number of Guests *" icon={Users} type="number" min="1" max="10"
                  value={form.numGuests} onChange={e => setForm({ ...form, numGuests: e.target.value })} error={errors.numGuests} />

                <div>
                  <label className="block text-sm font-semibold text-navy mb-1.5">Special Requests (optional)</label>
                  <div className="flex items-start gap-3 border-2 border-amber-100 focus-within:border-gold rounded-xl px-4 py-3 transition-colors">
                    <MessageSquare size={16} className="text-gold shrink-0 mt-0.5" />
                    <textarea
                      rows={3}
                      placeholder="Any special requests or preferences..."
                      value={form.specialRequests}
                      onChange={e => setForm({ ...form, specialRequests: e.target.value })}
                      className="flex-1 outline-none text-sm text-navy bg-transparent placeholder-gray-400 resize-none"
                    />
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 gradient-gold text-white rounded-xl font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {submitting ? 'Processing...' : 'Proceed to Payment →'}
                </motion.button>
              </form>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-2xl shadow-card border border-amber-100 p-6">
              <h3 className="font-semibold text-navy mb-4">Booking Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="font-semibold text-navy text-base">{hotelName}</div>
                <div className="text-gray-500 text-xs">{hotelLocation}</div>
                <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-800 font-medium">{roomType}</div>
                <div className="flex justify-between text-gray-600"><span>Check-in</span><span className="font-medium text-navy">{checkIn}</span></div>
                <div className="flex justify-between text-gray-600"><span>Check-out</span><span className="font-medium text-navy">{checkOut}</span></div>
                <div className="flex justify-between text-gray-600"><span>Nights</span><span className="font-medium text-navy">{nights}</span></div>
                <div className="border-t border-amber-100 pt-3 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>₹{price.toLocaleString('en-IN')} × {nights}n</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes (18%)</span><span>₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-navy border-t border-amber-100 pt-2">
                    <span>Total</span><span className="text-gold text-base">₹{total.toLocaleString('en-IN')}</span>
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
