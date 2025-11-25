import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Review } from '../types';

interface ReviewsCarouselProps {
  reviews: Review[];
}

export const ReviewsCarousel: React.FC<ReviewsCarouselProps> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000); // Rotate every 6 seconds
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[450px] md:h-[400px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.05, y: -20, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <div className="mb-6 text-myst-accent opacity-40">
            <Quote size={56} className="rotate-180" />
          </div>
          
          <p className="text-lg md:text-2xl font-serif text-zinc-200 italic mb-8 leading-relaxed max-w-3xl">
            "{reviews[currentIndex].content}"
          </p>

          <div className="flex gap-1 text-myst-gold mb-6">
            {[...Array(reviews[currentIndex].rating)].map((_, i) => (
              <Star key={i} size={20} fill="currentColor" />
            ))}
          </div>

          <div className="flex flex-col items-center">
             <div className="w-14 h-14 rounded-full bg-gradient-to-br from-myst-accent to-blue-600 flex items-center justify-center text-white font-bold text-xl mb-3 shadow-lg shadow-violet-900/30">
                {reviews[currentIndex].author[0]}
              </div>
            <h4 className="text-white font-bold text-lg">{reviews[currentIndex].author}</h4>
            {reviews[currentIndex].role && (
              <span className="text-zinc-500 text-xs uppercase tracking-widest mt-1 border-t border-zinc-800 pt-1">{reviews[currentIndex].role}</span>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots Indicator */}
      <div className="absolute bottom-0 flex gap-3 z-10">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 rounded-full transition-all duration-500 ${
              idx === currentIndex ? 'bg-myst-accent w-12' : 'bg-zinc-800 w-2 hover:bg-zinc-600'
            }`}
            aria-label={`Go to review ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};