import { motion } from 'framer-motion';
import { SearchX, Heart, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const icons = { search: SearchX, wishlist: Heart, bookings: Calendar };

export default function EmptyState({ type = 'search', title, message, action, actionLabel }) {
  const navigate = useNavigate();
  const Icon = icons[type] || SearchX;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-6">
        <Icon size={36} className="text-gold" />
      </div>
      <h3 className="text-xl font-semibold text-navy mb-2">{title}</h3>
      <p className="text-gray-500 max-w-sm mb-6">{message}</p>
      {action && (
        <button
          onClick={() => navigate(action)}
          className="px-6 py-3 gradient-gold text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
