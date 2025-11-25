
import React from 'react';
import { MenuItem, ProductCategory } from '../types';
import { Button } from './Button';
import { X, Phone, Instagram, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductModalProps {
  item: MenuItem | null;
  onClose: () => void;
  phone: string;
}

export const ProductModal: React.FC<ProductModalProps> = ({ item, onClose, phone }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-4xl bg-myst-panel border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh] md:max-h-[600px]"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* Image Side */}
          <div className="w-full md:w-1/2 h-48 md:h-auto relative shrink-0">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-myst-panel via-transparent to-transparent md:hidden" />
          </div>

          {/* Info Side */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
            <div className="flex justify-between items-start mb-2">
              <div className="text-myst-accent text-sm font-bold uppercase tracking-widest">
                {item.category}
              </div>
            </div>
            
            {/* Title and Price Row */}
            <div className="flex justify-between items-start mb-4 gap-4">
              <h2 className="text-3xl md:text-4xl font-serif text-white">{item.name}</h2>
              {item.price && (
                <span className="text-2xl md:text-3xl font-serif text-myst-accent shrink-0">{item.price}</span>
              )}
            </div>
            
            <p className="text-zinc-400 mb-6 leading-relaxed">
              {item.description}
            </p>

            {/* Heaviness Meter (Only for Shisha) */}
            {item.category !== ProductCategory.DRINKS && item.heaviness && (
              <div className="mb-6">
                <div className="flex justify-between text-xs text-zinc-500 mb-2 uppercase tracking-wider">
                  <span>Light</span>
                  <span>Heavy</span>
                </div>
                <div className="flex gap-1 h-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div 
                      key={level}
                      className={`flex-1 rounded-full ${level <= item.heaviness! ? 'bg-myst-accent' : 'bg-zinc-800'}`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto space-y-3">
              <p className="text-center text-zinc-500 text-xs mb-2">
                Contact us directly to reserve your mix or book a table
              </p>
              
              {/* Primary Button: Message on Instagram */}
              <a href="https://www.instagram.com/mystloungesyd" target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button className="w-full justify-center" icon={<Instagram size={18} />}>
                  Message on Instagram
                </Button>
              </a>

              <div className="grid grid-cols-2 gap-3">
                {/* Secondary Buttons */}
                <a href={`tel:${phone.replace(/\s/g, '')}`}>
                  <Button variant="outline" className="w-full justify-center" icon={<Phone size={18} />}>
                    Call
                  </Button>
                </a>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full justify-center" icon={<MapPin size={18} />}>
                    Map
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
