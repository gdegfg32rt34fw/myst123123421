
import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  Facebook, 
  MapPin, 
  Clock, 
  Phone, 
  Gamepad2, 
  FlaskConical, 
  Menu as MenuIcon,
  X,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Popcorn
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence, Variants } from 'framer-motion';

import { BUSINESS_INFO, MENU_ITEMS, REVIEWS } from './constants';
import { MenuItem, ProductCategory } from './types';
import { Button } from './components/Button';
import { ProductModal } from './components/ProductModal';
import { Typewriter } from './components/Typewriter';
import { ReviewsCarousel } from './components/ReviewsCarousel';
import { ShishaLabPage } from './components/ShishaLabPage';

// Helper Component for Global Section Animations
const SectionWrapper = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
};

const TikTokIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.394 6.394 0 0 0-5.394 9.365 6.394 6.394 0 0 0 10.964-2.413V8.25c1.2.918 2.796 1.63 4.5 1.63V6.486c-.783 0-1.554-.078-2.288-.225a4.846 4.846 0 0 1-.55-.175z"/>
  </svg>
);

const MystLogo = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 200 200" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="5" />
    <text 
      x="100" 
      y="112" 
      textAnchor="middle" 
      fontFamily="'Playfair Display', serif" 
      fontSize="65" 
      fill="currentColor" 
    >
      MYST
    </text>
    <text 
      x="100" 
      y="148" 
      textAnchor="middle" 
      fontFamily="'Outfit', sans-serif" 
      fontSize="16" 
      fill="currentColor" 
      letterSpacing="0.4em"
      fontWeight="400"
    >
      LOUNGE
    </text>
  </svg>
);

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: { duration: 0.2, ease: "easeIn" } 
  }
};

const categoryPrices: Record<string, string> = {
  [ProductCategory.CLASSICS]: '$50',
  [ProductCategory.HOUSE_SPECIALS]: '$50',
  [ProductCategory.MOST_WANTED]: '$60',
};

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'lab'>('home');
  // Set default to Classics since "All" is removed
  const [activeCategory, setActiveCategory] = useState<string>(ProductCategory.CLASSICS);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  // Explicit scroll helper
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  // Removed 'All', strictly using Enum values
  const categories = Object.values(ProductCategory);

  const typewriterWords = [
    "Choose your flavour.",
    "Feel the night.",
    "Find your mix.",
    "Follow the smoke.",
    "Experience the vibe.",
    "Your flavour, your way.",
    "Relax. Unwind.",
    "Where nights come alive.",
    "Taste the clouds.",
    "Discover your smoke."
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // Always scroll to top first
    if (id === 'hero') {
       setView('home');
       scrollToTop();
       return;
    }

    if (view === 'lab') {
      setView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-myst-black font-sans text-zinc-100 selection:bg-myst-accent selection:text-white overflow-x-hidden">
      
      <div className="smoke-container">
        <div className="smoke-layer"></div>
        <div className="smoke-layer"></div>
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl py-2 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a 
            href="#hero" 
            onClick={(e) => {
              e.preventDefault();
              setView('home');
              scrollToTop();
            }} 
            className="group transition-transform hover:scale-105"
          >
            <MystLogo className={`w-16 h-16 text-white group-hover:text-myst-accent transition-colors duration-300 ${scrolled ? 'w-12 h-12' : 'w-20 h-20'}`} />
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#hero" 
              onClick={(e) => {
                e.preventDefault();
                setView('home');
                scrollToTop();
              }} 
              className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-300 hover:text-myst-accent transition-colors cursor-pointer"
            >
              Home
            </a>
            <button onClick={() => setView('lab')} className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-300 hover:text-myst-accent transition-colors cursor-pointer">Shisha Lab</button>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-300 hover:text-myst-accent transition-colors cursor-pointer">About</a>
            <a href="#menu" onClick={(e) => handleNavClick(e, 'menu')} className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-300 hover:text-myst-accent transition-colors cursor-pointer">Menu</a>
            <a href="#reviews" onClick={(e) => handleNavClick(e, 'reviews')} className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-300 hover:text-myst-accent transition-colors cursor-pointer">Reviews</a>
          </div>

          <button 
            className="md:hidden text-white hover:text-myst-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-myst-black/98 backdrop-blur-xl flex flex-col justify-center items-center md:hidden"
          >
            <div className="flex flex-col gap-10 text-center items-center w-full px-8">
              <a 
                href="#hero" 
                onClick={(e) => {
                  e.preventDefault();
                  setView('home');
                  scrollToTop();
                  setIsMenuOpen(false);
                }} 
                className="text-3xl font-sans font-light tracking-[0.1em] text-white hover:text-myst-accent transition-colors"
              >
                Home
              </a>
              <button onClick={() => { setIsMenuOpen(false); setView('lab'); }} className="text-3xl font-sans font-light tracking-[0.1em] text-white hover:text-myst-accent transition-colors">Shisha Lab</button>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-3xl font-sans font-light tracking-[0.1em] text-white hover:text-myst-accent transition-colors">About</a>
              <a href="#menu" onClick={(e) => handleNavClick(e, 'menu')} className="text-3xl font-sans font-light tracking-[0.1em] text-white hover:text-myst-accent transition-colors">Menu</a>
              <a href="#reviews" onClick={(e) => handleNavClick(e, 'reviews')} className="text-3xl font-sans font-light tracking-[0.1em] text-white hover:text-myst-accent transition-colors">Reviews</a>
              
              <div className="pt-8 w-full max-w-xs">
                 <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`} className="block w-full">
                  <Button className="w-full justify-center text-lg py-4">Call Now</Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {view === 'lab' ? (
        <ShishaLabPage onBack={() => setView('home')} />
      ) : (
        <>
          <header id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-myst-black/30 via-myst-black/50 to-myst-black z-10" />
              
              <div className="absolute inset-0 z-[5] opacity-50 mix-blend-screen pointer-events-none overflow-hidden">
                <div className="smoke-layer" style={{ animationDuration: '20s', opacity: 0.4 }}></div>
                <div className="smoke-layer" style={{ animationDelay: '-10s', animationDuration: '25s', opacity: 0.3 }}></div>
              </div>

              <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2 }}
                className="w-full h-full"
              >
                <picture className="w-full h-full">
                  <source media="(min-width: 768px)" srcSet="https://github.com/janyaski-byte/chatgpt/blob/main/myst%20hero.jpg?raw=true" />
                  <img 
                    src="https://github.com/janyaski-byte/chatgpt/blob/main/myst%20heroo.jpg?raw=true" 
                    alt="MYST Lounge Atmosphere" 
                    className="w-full h-full object-cover"
                  />
                </picture>
              </motion.div>
            </div>

            <motion.div 
              style={{ opacity: heroOpacity }}
              className="container mx-auto px-4 relative z-20 text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <h2 className="text-myst-accent uppercase tracking-[0.4em] text-xs md:text-sm mb-6 font-bold animate-pulse">Western Sydney's Finest</h2>
                <h1 className="text-6xl md:text-9xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 mb-8 tracking-tighter drop-shadow-2xl">
                  MYST LOUNGE
                </h1>
                
                <div className="h-8 md:h-12 mb-12">
                  <Typewriter 
                    words={typewriterWords} 
                    className="text-lg md:text-2xl text-zinc-400 font-light italic font-serif tracking-wide"
                  />
                </div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <a href="#menu" onClick={(e) => handleNavClick(e, 'menu')}>
                    <Button className="min-w-[160px]">View Menu</Button>
                  </a>
                  <motion.div
                    animate={{ rotate: [0, -1, 1, -1, 1, 0], scale: [1, 1.02, 1, 1.02, 1] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3, 
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Button 
                      variant="outline" 
                      icon={<FlaskConical size={18} />} 
                      className="min-w-[160px]"
                      onClick={() => setView('lab')}
                    >
                      Take Me to the Shisha Lab
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-zinc-500 cursor-pointer"
              onClick={(e) => handleNavClick(e as any, 'about')}
            >
              <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown size={24} className="text-myst-accent" />
              </motion.div>
            </motion.div>
          </header>

          <div className="bg-white/5 border-y border-white/5 py-8 relative z-20 backdrop-blur-sm">
            <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-zinc-400 text-sm md:text-base">
              <div className="flex items-center gap-3 hover:text-white transition-colors cursor-default group">
                <Clock className="text-myst-accent group-hover:scale-110 transition-transform" size={20} />
                <span className="tracking-wide">Open Daily from 7PM</span>
              </div>
              <a href="https://www.google.com/maps/search/?api=1&query=MYST+Lounge+188+Sunnyholt+Rd+Kings+Park+NSW+2148" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                <MapPin className="text-myst-accent group-hover:scale-110 transition-transform" size={20} />
                <span className="tracking-wide">Kings Park, NSW</span>
              </a>
              <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 hover:text-white transition-colors group">
                <Phone className="text-myst-accent group-hover:scale-110 transition-transform" size={20} />
                <span className="tracking-wide">{BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* About Section - Reduced spacing */}
          <SectionWrapper id="about" className="py-16 md:py-32 container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start md:items-center">
              <div className="space-y-10">
                <h3 className="text-4xl md:text-6xl font-serif text-white leading-tight">
                  The Ultimate <br />
                  <span className="text-zinc-500">Hangout Spot</span>
                </h3>
                <p className="text-zinc-300 leading-relaxed text-lg font-light">
                  MYST Lounge provides a luxurious and comfortable experience in the heart of Western Sydney. Whether you're looking for the best night out in Sydney or a chilled evening with friends, we are the place to be.
                </p>
                
                <div className="grid gap-8">
                  <motion.div className="flex gap-6 group" whileHover={{ x: 10 }}>
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-myst-accent shrink-0 group-hover:border-myst-accent/50 group-hover:bg-myst-accent/10 transition-all shadow-lg shadow-myst-accent/5">
                      <Gamepad2 size={28} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2 text-lg">Entertainment</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">PS5s, Nintendo Switches, and board games available for your enjoyment.</p>
                    </div>
                  </motion.div>

                  <motion.div className="flex gap-6 group" whileHover={{ x: 10 }}>
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-myst-accent shrink-0 group-hover:border-myst-accent/50 group-hover:bg-myst-accent/10 transition-all shadow-lg shadow-myst-accent/5">
                      <FlaskConical size={28} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2 text-lg">The Shisha Lab</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">One-of-a-kind experience to customise your smoke. From heads to over 200 flavours.</p>
                    </div>
                  </motion.div>

                  <motion.div className="flex gap-6 group" whileHover={{ x: 10 }}>
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-myst-accent shrink-0 group-hover:border-myst-accent/50 group-hover:bg-myst-accent/10 transition-all shadow-lg shadow-myst-accent/5">
                      <Popcorn size={28} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2 text-lg">Complimentary Snacks</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">Enjoy complimentary popcorn and pretzels with your session.</p>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <motion.div 
                className="relative h-[300px] md:h-[600px] rounded-2xl overflow-hidden group border border-white/10 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src="https://github.com/janyaski-byte/chatgpt/blob/main/myst%20atmosphere.jpg?raw=true" 
                  alt="MYST Interior" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-myst-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-10">
                  <div className="w-12 h-1 bg-myst-accent mb-6" />
                  <p className="text-white font-serif text-3xl italic leading-snug">"Atmosphere is everything."</p>
                </div>
              </motion.div>
            </div>
          </SectionWrapper>

          {/* Menu Section - Wrapped */}
          <SectionWrapper id="menu" className="py-32 relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/3 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]"></div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-20">
                <h3 className="text-myst-accent uppercase tracking-[0.3em] font-bold mb-4 text-xs">Our Collection</h3>
                <h2 className="text-5xl md:text-7xl font-serif text-white">Curated Flavours</h2>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-16">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm transition-all duration-300 ${
                      activeCategory === cat 
                        ? 'bg-myst-accent text-white font-bold shadow-lg shadow-myst-accent/40 transform scale-105' 
                        : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5 hover:border-white/20 backdrop-blur-sm'
                    }`}
                  >
                    {cat}
                    {categoryPrices[cat] && (
                      <span className={`px-2.5 py-1 rounded-md text-sm font-extrabold tracking-wide ${
                        activeCategory === cat 
                          ? 'bg-white/20 text-white' 
                          : 'bg-myst-accent/10 text-myst-accent group-hover:bg-myst-accent/20'
                      }`}>
                        {categoryPrices[cat]}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[50vh]"
                style={{ overflowAnchor: 'none' }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item) => (
                    <motion.div 
                      key={item.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="bg-gradient-to-br from-zinc-900/80 to-black/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group cursor-pointer hover:border-myst-accent/40 transition-all duration-500 hover:-translate-y-2 shadow-xl shadow-black/50"
                      onClick={() => setSelectedProduct(item)}
                    >
                      <div className="h-64 overflow-hidden relative">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-myst-black via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                           <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-xs text-white uppercase tracking-wider font-medium shadow-lg">
                             {item.category}
                           </span>
                        </div>
                      </div>
                      <div className="p-8 relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-myst-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                          <div className="relative z-10">
                            {/* Updated Header Layout with Price in normal flow next to title/arrow to avoid overlap */}
                            <div className="flex justify-between items-start mb-3 gap-3">
                              <h4 className="text-2xl font-serif text-white group-hover:text-myst-accent transition-colors drop-shadow-sm leading-tight">{item.name}</h4>
                              
                              <div className="flex items-center gap-2 shrink-0 self-start">
                                {item.price && (
                                   <span className="text-myst-accent font-bold text-lg bg-myst-accent/10 px-2 py-0.5 rounded">{item.price}</span>
                                )}
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-myst-accent group-hover:text-white transition-colors text-zinc-400">
                                  <ChevronRight size={16} />
                                </div>
                              </div>
                            </div>

                            <p className="text-zinc-400 text-sm line-clamp-2 mb-6 leading-relaxed group-hover:text-zinc-300 transition-colors">{item.description}</p>
                            <div className="flex flex-wrap gap-2 text-xs text-zinc-300">
                              {item.features.slice(0, 3).map((f, i) => (
                                <span key={i} className="bg-white/5 px-3 py-1.5 rounded-md border border-white/5 group-hover:border-myst-accent/20 group-hover:bg-myst-accent/10 transition-colors">{f}</span>
                              ))}
                            </div>
                          </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </SectionWrapper>

          {/* Reviews Section - Wrapped */}
          <SectionWrapper id="reviews" className="py-32 container mx-auto px-4 border-t border-white/5 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-myst-black pointer-events-none" />
            <div className="text-center mb-20 relative z-10">
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">Community Vibes</h2>
              <p className="text-zinc-500 uppercase tracking-widest text-sm">What people are saying</p>
            </div>
            <div className="relative z-10">
              <ReviewsCarousel reviews={REVIEWS} />
            </div>
          </SectionWrapper>
        </>
      )}

      {/* --- Footer (Wrapped for stagger effect on content) --- */}
      <footer className="bg-myst-panel/80 backdrop-blur-xl border-t border-white/5 pt-20 pb-10 relative z-20">
        <div className="container mx-auto px-4">
          <SectionWrapper>
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-1 space-y-6">
                <div className="text-3xl font-serif font-bold text-white">MYST<span className="text-myst-accent">.</span></div>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  The premier destination for shisha enthusiasts in Western Sydney. Luxury, comfort, and flavour in every session.
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em] text-myst-accent">Visit Us</h4>
                <p className="text-zinc-400 text-sm mb-3">{BUSINESS_INFO.address}</p>
                <a href={BUSINESS_INFO.links.maps} target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-myst-accent transition-colors flex items-center gap-2">
                  Open in Maps <ChevronRight size={14} />
                </a>
              </div>

              <div>
                <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em] text-myst-accent">Hours</h4>
                <ul className="space-y-3 text-zinc-400 text-sm">
                  {Object.entries(BUSINESS_INFO.hours).map(([day, hours]) => (
                    <li key={day} className="flex justify-between border-b border-white/5 pb-2 last:border-0">
                      <span>{day}</span>
                      <span className="text-zinc-200">{hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em] text-myst-accent">Connect</h4>
                <div className="flex gap-4 mb-8">
                  <a href={BUSINESS_INFO.links.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-myst-accent hover:scale-110 transition-all duration-300 border border-white/5">
                    <Instagram size={20} />
                  </a>
                  <a href={BUSINESS_INFO.links.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-myst-accent hover:scale-110 transition-all duration-300 border border-white/5">
                    <Facebook size={20} />
                  </a>
                  <a href={BUSINESS_INFO.links.tiktok} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-myst-accent hover:scale-110 transition-all duration-300 border border-white/5">
                    <TikTokIcon size={20} />
                  </a>
                </div>
                <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`}>
                  <Button variant="outline" className="w-full text-xs py-4 border-white/10 hover:border-white">
                    {BUSINESS_INFO.phone}
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-xs">
              <p>&copy; {new Date().getFullYear()} MYST Lounge. All rights reserved.</p>
              <p>Designed for luxury.</p>
            </div>
          </SectionWrapper>
        </div>
      </footer>

      <ProductModal 
        item={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        phone={BUSINESS_INFO.phone}
      />

    </div>
  );
};

export default App;
