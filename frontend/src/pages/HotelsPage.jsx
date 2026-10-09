import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { api } from '../services/api';
import HotelCard from '../components/HotelCard';
import FilterSidebar from '../components/FilterSidebar';
import HotelSearchBar from '../components/HotelSearchBar';
import { SkeletonCard } from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price_asc', label: 'Lowest Price' },
  { value: 'price_desc', label: 'Highest Price' },
  { value: 'rating', label: 'Highest Rating' },
  { value: 'reviews', label: 'Most Reviewed' },
];

const DEFAULT_FILTERS = { minPrice: 0, maxPrice: 100000, stars: [], amenities: [], types: [] };

export default function HotelsPage() {
  const [searchParams] = useSearchParams();
  const city = searchParams.get('city') || searchParams.get('location') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const adults = searchParams.get('adults') || '2';
  const typeParam = searchParams.get('type') || '';

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(() => ({
    ...DEFAULT_FILTERS,
    types: typeParam ? [typeParam] : [],
  }));
  const [sort, setSort] = useState(searchParams.get('sort') || 'recommended');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(6);

  useEffect(() => {
    setLoading(true);
    setPage(6);
    api.searchHotels(city)
      .then(setHotels)
      .finally(() => setLoading(false));
  }, [city]);

  const filtered = useMemo(() => {
    let result = hotels.filter(h => {
      if (h.pricePerNight < filters.minPrice) return false;
      if (h.pricePerNight > filters.maxPrice) return false;
      if (filters.stars.length && !filters.stars.includes(h.stars)) return false;
      if (filters.types.length && !filters.types.includes(h.type)) return false;
      if (filters.amenities.length && !filters.amenities.every(a => h.amenities.includes(a))) return false;
      return true;
    });

    if (sort === 'price_asc') result = [...result].sort((a, b) => a.pricePerNight - b.pricePerNight);
    else if (sort === 'price_desc') result = [...result].sort((a, b) => b.pricePerNight - a.pricePerNight);
    else if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    else if (sort === 'reviews') result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);

    return result;
  }, [hotels, filters, sort]);

  const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000) : 1;

  return (
    <div className="min-h-screen bg-ivory pt-16">
      {/* Search bar strip */}
      <div className="bg-white border-b border-amber-100 py-4 px-4">
        <HotelSearchBar compact initialValues={{ city, checkIn, checkOut, adults }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-navy">
              {city ? `Hotels in ${city}` : 'All Hotels'}
            </h1>
            <p className="text-gray-400 text-sm mt-0.5">
              {loading ? 'Searching...' : `${filtered.length} properties found`}
              {checkIn && checkOut && ` · ${checkIn} → ${checkOut} (${nights}n)`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile filter button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2 border border-amber-200 rounded-xl text-sm font-medium text-navy hover:border-gold transition-colors"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="appearance-none pl-4 pr-8 py-2 border border-amber-200 rounded-xl text-sm font-medium text-navy bg-white outline-none focus:border-gold cursor-pointer"
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar — desktop */}
          <div className="hidden md:block w-64 shrink-0">
            <FilterSidebar filters={filters} onChange={setFilters} onClear={() => setFilters(DEFAULT_FILTERS)} />
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState
                type="search"
                title="No hotels found"
                message="Try adjusting your filters or searching a different destination."
                action="/"
                actionLabel="Back to Search"
              />
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {filtered.slice(0, page).map((hotel, i) => (
                    <HotelCard key={hotel.id} hotel={hotel} checkIn={checkIn} checkOut={checkOut} adults={adults} index={i} />
                  ))}
                </div>
                {page < filtered.length && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => setPage(p => p + 6)}
                      className="px-8 py-3 border-2 border-gold text-gold rounded-xl font-semibold hover:bg-gold hover:text-white transition-all"
                    >
                      Load More Hotels
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 overflow-y-auto p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy text-lg">Filters</h3>
                <button onClick={() => setDrawerOpen(false)}><X size={20} /></button>
              </div>
              <FilterSidebar filters={filters} onChange={setFilters} onClear={() => setFilters(DEFAULT_FILTERS)} />
              <button
                onClick={() => setDrawerOpen(false)}
                className="mt-4 w-full py-3 gradient-gold text-white rounded-xl font-semibold"
              >
                Show {filtered.length} Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
