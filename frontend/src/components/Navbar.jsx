import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, User, ChevronDown } from 'lucide-react';
import { useWishlist } from '../context/AppContext';

const NAV_LINKS = [
  { label: 'Discover', to: '/hotels' },
  { label: 'Destinations', to: '/hotels' },
  { label: 'Offers', to: '/hotels?sort=price_asc' },
  { label: 'My Bookings', to: '/my-bookings' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { wishlist } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const navBg = isHome && !scrolled
    ? 'bg-transparent'
    : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-amber-100';
  const textColor = isHome && !scrolled ? 'text-white' : 'text-navy';
  const logoColor = isHome && !scrolled ? 'text-white' : 'text-gold';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className={`text-2xl font-serif font-bold tracking-wide ${logoColor}`}>LUXE</span>
          <span className={`text-2xl font-serif font-light tracking-widest ${isHome && !scrolled ? 'text-white/80' : 'text-navy/70'}`}>STAY</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link
              key={link.label}
              to={link.to}
              className={`text-sm font-medium tracking-wide hover:text-gold transition-colors ${textColor}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate('/wishlist')}
            className={`relative p-2 rounded-full hover:bg-white/10 transition-colors ${textColor}`}
          >
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 gradient-gold text-white text-xs rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(p => !p)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                isHome && !scrolled
                  ? 'border-white/40 text-white hover:bg-white/10'
                  : 'border-amber-200 text-navy hover:border-gold'
              }`}
            >
              <User size={16} />
              <span className="text-sm font-medium">Sign In</span>
              <ChevronDown size={14} />
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  className="absolute right-0 top-12 w-48 bg-white rounded-2xl shadow-luxury border border-amber-100 overflow-hidden"
                >
                  {[
                    { label: 'My Profile', to: '/my-bookings' },
                    { label: 'My Bookings', to: '/my-bookings' },
                    { label: 'Wishlist', to: '/wishlist' },
                  ].map(item => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setProfileOpen(false)}
                      className="block px-5 py-3 text-sm text-navy hover:bg-amber-50 hover:text-gold transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <button onClick={() => navigate('/wishlist')} className={`relative p-2 ${textColor}`}>
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 gradient-gold text-white text-xs rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(p => !p)} className={`p-2 ${textColor}`}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-amber-100 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="px-4 py-3 text-navy font-medium rounded-xl hover:bg-amber-50 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-amber-100 mt-2 pt-2">
                <Link to="/my-bookings" className="px-4 py-3 text-navy font-medium rounded-xl hover:bg-amber-50 hover:text-gold transition-colors flex items-center gap-2">
                  <User size={16} /> Sign In / Profile
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
