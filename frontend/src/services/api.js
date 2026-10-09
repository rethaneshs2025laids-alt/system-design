import { DEMO_HOTELS } from '../data/demoData';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
let backendAvailable = null;

async function checkBackend() {
  if (backendAvailable !== null) return backendAvailable;
  try {
    const res = await fetch(`${BASE_URL}/hotels?location=Chennai`, { signal: AbortSignal.timeout(2000) });
    backendAvailable = res.ok;
  } catch {
    backendAvailable = false;
  }
  return backendAvailable;
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
  return data;
}

// Normalize backend hotel shape to match demo shape
function normalizeHotel(h) {
  const demo = DEMO_HOTELS.find(d => d.id === h.id) || DEMO_HOTELS[0];
  return {
    ...demo,
    id: h.id,
    name: h.name,
    city: h.city,
    location: h.location,
    description: h.description,
    rating: parseFloat(h.rating),
    stars: Math.round(parseFloat(h.rating)),
    pricePerNight: h.rooms?.[0]?.pricePerNight || demo.pricePerNight,
    amenities: h.amenities ? h.amenities.split(',').map(a => a.trim()) : demo.amenities,
  };
}

export const api = {
  async searchHotels(city) {
    const live = await checkBackend();
    if (live) {
      try {
        const data = await request(`/hotels${city ? `?location=${encodeURIComponent(city)}` : ''}`);
        return data.map(normalizeHotel);
      } catch { /* fall through to demo */ }
    }
    if (!city) return DEMO_HOTELS;
    return DEMO_HOTELS.filter(h => h.city.toLowerCase().includes(city.toLowerCase()));
  },

  async getHotel(id) {
    const live = await checkBackend();
    if (live) {
      try {
        const h = await request(`/hotels/${id}`);
        return normalizeHotel(h);
      } catch { /* fall through */ }
    }
    return DEMO_HOTELS.find(h => h.id === Number(id)) || null;
  },

  async getAvailableRooms(hotelId, checkIn, checkOut) {
    const live = await checkBackend();
    if (live) {
      try {
        return await request(`/hotels/${hotelId}/rooms?checkIn=${checkIn}&checkOut=${checkOut}`);
      } catch { /* fall through */ }
    }
    const hotel = DEMO_HOTELS.find(h => h.id === Number(hotelId));
    return hotel ? hotel.rooms : [];
  },

  async createBooking(payload) {
    const live = await checkBackend();
    if (live) {
      try { return await request('/bookings', { method: 'POST', body: JSON.stringify(payload) }); }
      catch { /* fall through */ }
    }
    // Demo booking
    const booking = {
      id: Math.floor(Math.random() * 90000) + 10000,
      ...payload,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      hotelName: payload.hotelName,
      roomType: payload.roomType,
      hotelLocation: payload.hotelLocation,
    };
    const bookings = JSON.parse(localStorage.getItem('luxestay_bookings') || '[]');
    bookings.unshift(booking);
    localStorage.setItem('luxestay_bookings', JSON.stringify(bookings));
    return booking;
  },

  async processPayment(payload) {
    const live = await checkBackend();
    if (live) {
      try { return await request('/payments/mock', { method: 'POST', body: JSON.stringify(payload) }); }
      catch { /* fall through */ }
    }
    const success = !payload.mockCardLast4.startsWith('0');
    const bookings = JSON.parse(localStorage.getItem('luxestay_bookings') || '[]');
    const idx = bookings.findIndex(b => b.id === payload.bookingId);
    if (idx !== -1) bookings[idx].status = success ? 'CONFIRMED' : 'PAYMENT_FAILED';
    localStorage.setItem('luxestay_bookings', JSON.stringify(bookings));
    return { status: success ? 'SUCCESS' : 'FAILED', transactionId: `TXN${Date.now()}` };
  },

  async getUserBookings() {
    const live = await checkBackend();
    if (live) {
      try { return await request('/users/1/bookings'); }
      catch { /* fall through */ }
    }
    return JSON.parse(localStorage.getItem('luxestay_bookings') || '[]');
  },

  async getBooking(id) {
    const live = await checkBackend();
    if (live) {
      try { return await request(`/bookings/${id}`); }
      catch { /* fall through */ }
    }
    const bookings = JSON.parse(localStorage.getItem('luxestay_bookings') || '[]');
    return bookings.find(b => String(b.id) === String(id)) || null;
  },

  async cancelBooking(id) {
    const live = await checkBackend();
    if (live) {
      try { return await request(`/bookings/${id}`, { method: 'DELETE' }); }
      catch { /* fall through */ }
    }
    const bookings = JSON.parse(localStorage.getItem('luxestay_bookings') || '[]');
    const idx = bookings.findIndex(b => String(b.id) === String(id));
    if (idx !== -1) bookings[idx].status = 'CANCELLED';
    localStorage.setItem('luxestay_bookings', JSON.stringify(bookings));
    return bookings[idx];
  },
};
