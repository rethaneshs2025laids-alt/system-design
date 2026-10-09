import { Link } from 'react-router-dom';
import { Globe, Share2, Rss, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-2xl font-serif font-bold text-gold">LUXE</span>
            <span className="text-2xl font-serif font-light text-white/60">STAY</span>
          </div>
          <p className="text-sm leading-relaxed mb-5">Curating extraordinary stays for the discerning traveller across India's finest destinations.</p>
          <div className="flex gap-3">
            {[Globe, Share2, Rss, Mail].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {[
          { title: 'Explore', links: [{ label: 'All Hotels', to: '/hotels' }, { label: 'Destinations', to: '/hotels' }, { label: 'Special Offers', to: '/hotels' }, { label: 'Wishlist', to: '/wishlist' }] },
          { title: 'Account', links: [{ label: 'My Bookings', to: '/my-bookings' }, { label: 'Sign In', to: '/my-bookings' }, { label: 'Help Centre', to: '/' }] },
          { title: 'Company', links: [{ label: 'About Us', to: '/' }, { label: 'Privacy Policy', to: '/' }, { label: 'Terms of Service', to: '/' }] },
        ].map(col => (
          <div key={col.title}>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm hover:text-gold transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © 2024 LuxeStay. A student demo project. No real payments are processed.
      </div>
    </footer>
  );
}
