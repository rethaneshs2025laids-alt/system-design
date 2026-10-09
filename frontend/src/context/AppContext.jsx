import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const WishlistContext = createContext(null);
const ToastContext = createContext(null);

export function AppProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('luxestay_wishlist') || '[]'); }
    catch { return []; }
  });
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('luxestay_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = useCallback((hotel) => {
    setWishlist(prev => {
      const exists = prev.find(h => h.id === hotel.id);
      return exists ? prev.filter(h => h.id !== hotel.id) : [...prev, hotel];
    });
  }, []);

  const isWishlisted = useCallback((id) => wishlist.some(h => h.id === id), [wishlist]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const removeToast = useCallback((id) => setToasts(prev => prev.filter(t => t.id !== id)), []);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
        {children}
      </ToastContext.Provider>
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
export const useToast = () => useContext(ToastContext);
