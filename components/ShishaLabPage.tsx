import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, FlaskConical, Sparkles, Wind, Palette, Award, Fingerprint } from 'lucide-react';
import { AiConcierge } from './AiConcierge';

interface ShishaLabPageProps {
  onBack: () => void;
}

export const ShishaLabPage: React.FC<ShishaLabPageProps> = ({ onBack }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-myst-black pt-36 pb-20 relative overflow-x-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-myst-accent/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack} 
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group mb-12"
        >
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-myst-accent transition-colors border border-white/5">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="text-sm uppercase tracking-widest font-medium">Back to Lounge</span>
        </motion.button>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
          
          {/* Text Column */}
          <div className="order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-myst-accent text-white text-xs font-bold uppercase tracking-widest mb-6 shadow-lg shadow-myst-accent/40"
            >
              <FlaskConical size={14} />
              <span>Western Sydney Exclusive</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight"
            >
              The Shisha Lab
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-zinc-300 text-lg md:text-xl font-light leading-relaxed mb-8"
            >
              Where science meets tradition. Experience the only dedicated Shisha Mixology Lab in Western Sydney.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-4 max-w-md"
            >
               <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-myst-accent/50 transition-colors">
                 <div className="text-3xl font-bold text-myst-accent mb-1">200+</div>
                 <div className="text-zinc-500 text-xs uppercase tracking-wider">Flavours</div>
               </div>
               <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-myst-accent/50 transition-colors">
                 <div className="text-3xl font-bold text-myst-accent mb-1">100%</div>
                 <div className="text-zinc-500 text-xs uppercase tracking-wider">Customisable</div>
               </div>
            </motion.div>
          </div>

          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="order-1 lg:order-2 relative h-[250px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl shadow-myst-accent/20 border border-white/10 group"
          >
            <img 
              src="https://github.com/janyaski-byte/chatgpt/blob/main/myst%20labb.jpg?raw=true" 
              alt="The Shisha Lab" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-myst-black via-transparent to-transparent opacity-60" />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-3"
            >
               <Fingerprint className="text-myst-accent" size={24} />
               <div>
                 <p className="text-white text-xs font-bold uppercase">Signature</p>
                 <p className="text-zinc-400 text-xs">Mixology</p>
               </div>
            </motion.div>
          </motion.div>
        </div>

        {/* New AI Dashboard Section - Moved Above Features */}
        <div className="max-w-5xl mx-auto mb-32">
           <motion.div 
             className="text-center mb-12"
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Meet Your Virtual Sommelier</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Not sure what to mix? Let our AI Concierge scan our 200+ flavour database to generate the perfect recipe for your session.
              </p>
           </motion.div>
           
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
           >
              <AiConcierge />
           </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-32">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Engineered for Perfection</h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              At MYST, we believe shisha is an art form. Our one-of-a-kind Shisha Lab brings a unique experience that allows you to fully customise your smoke.
            </p>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              From selecting your preferred head type to choosing from over 200 premium flavours, we give you control through the entire process.
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              { icon: <Palette size={24} />, title: "200+ Flavours", desc: "Unlimited mix combinations from brands worldwide." },
              { icon: <FlaskConical size={24} />, title: "Custom Mixes", desc: "Create your own signature blend or try ours." },
              { icon: <Fingerprint size={24} />, title: "Personalised", desc: "Adjust heaviness and strength to your liking." },
              { icon: <Sparkles size={24} />, title: "Hygiene First", desc: "Disposable mouth tips and sanitised equipment." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-myst-accent/50 transition-colors hover:bg-white/5 hover:-translate-y-1 duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-myst-accent/10 flex items-center justify-center text-myst-accent mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};