import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function HotelGallery({ images, name }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  function prev(e) { e?.stopPropagation(); setActive(a => (a - 1 + images.length) % images.length); }
  function next(e) { e?.stopPropagation(); setActive(a => (a + 1) % images.length); }

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-80 md:h-96 rounded-2xl overflow-hidden">
        {/* Main image */}
        <div
          className="col-span-2 row-span-2 relative cursor-pointer group"
          onClick={() => setLightbox(true)}
        >
          <img src={images[active]} alt={name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        {/* Thumbnails */}
        {images.slice(0, 4).map((img, i) => (
          <div
            key={i}
            className={`relative cursor-pointer overflow-hidden ${i === active ? 'ring-2 ring-gold' : ''}`}
            onClick={() => setActive(i)}
          >
            <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            {i === 3 && images.length > 4 && (
              <div
                className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                onClick={() => setLightbox(true)}
              >
                <span className="text-white font-semibold text-sm">+{images.length - 4} more</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <button onClick={() => setLightbox(false)} className="absolute top-4 right-4 text-white/80 hover:text-white">
              <X size={28} />
            </button>
            <button onClick={prev} className="absolute left-4 text-white/80 hover:text-white p-2">
              <ChevronLeft size={36} />
            </button>
            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              src={images[active]}
              alt={name}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
              onClick={e => e.stopPropagation()}
            />
            <button onClick={next} className="absolute right-4 text-white/80 hover:text-white p-2">
              <ChevronRight size={36} />
            </button>
            <div className="absolute bottom-4 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setActive(i); }}
                  className={`w-2 h-2 rounded-full transition-all ${i === active ? 'bg-gold w-6' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
