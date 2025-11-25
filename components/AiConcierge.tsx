import React, { useState } from 'react';
import { getAiRecommendation } from '../services/geminiService';
import { Sparkles, Send, Loader2, RefreshCw, Flame, Snowflake, Grape, Coffee, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VIBE_CHIPS = [
  { label: 'Fruity', icon: <Grape size={14} />, color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
  { label: 'Icy', icon: <Snowflake size={14} />, color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  { label: 'Dark', icon: <Coffee size={14} />, color: 'bg-amber-900/40 text-amber-300 border-amber-700/50' },
  { label: 'Strong', icon: <Flame size={14} />, color: 'bg-red-600/20 text-red-300 border-red-600/30' },
  { label: 'Surprise Me', icon: <Zap size={14} />, color: 'bg-myst-accent/20 text-myst-accent border-myst-accent/30' },
];

export const AiConcierge: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [response, setResponse] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleVibe = (vibe: string) => {
    if (selectedVibes.includes(vibe)) {
      setSelectedVibes(prev => prev.filter(v => v !== vibe));
    } else {
      setSelectedVibes(prev => [...prev, vibe]);
    }
  };

  const handleAsk = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const combinedQuery = `${selectedVibes.join(', ')} ${query}`.trim();
    if (!combinedQuery) return;

    setLoading(true);
    setResponse(null);
    
    // Simulate "Scanning" delay for effect if API is too fast
    await new Promise(r => setTimeout(r, 1500));

    const resultRaw = await getAiRecommendation(combinedQuery);
    
    // Parse the pipe-separated response
    const parts = resultRaw.split('|').map(s => s.trim());
    const parsed = {
      name: parts[0] || 'Mystery Mix',
      ingredients: parts[1] || 'Chef\'s Special Selection',
      desc: parts[2] || 'A perfectly balanced mix for your mood.',
      pairing: parts[3] || 'Ice Water'
    };

    setResponse(parsed);
    setLoading(false);
  };

  return (
    <div className="w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl">
      {/* Dashboard Header */}
      <div className="bg-white/5 p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-myst-accent/20 flex items-center justify-center text-myst-accent animate-pulse-slow">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-white font-serif text-xl">Virtual Mixologist</h3>
            <p className="text-zinc-500 text-xs uppercase tracking-wider">AI Powered Engine v2.5</p>
          </div>
        </div>
        <div className="hidden md:block text-zinc-600 text-xs font-mono">
          STATUS: {loading ? <span className="text-myst-accent animate-pulse">ANALYSING...</span> : <span className="text-emerald-500">ONLINE</span>}
        </div>
      </div>

      <div className="p-6 md:p-10 grid lg:grid-cols-2 gap-10">
        
        {/* Input Section */}
        <div className="space-y-8">
          <div>
            <label className="text-zinc-400 text-sm font-medium mb-4 block">Select your Vibe:</label>
            <div className="flex flex-wrap gap-3">
              {VIBE_CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => toggleVibe(chip.label)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                    selectedVibes.includes(chip.label)
                      ? chip.color + ' shadow-[0_0_15px_rgba(139,92,246,0.3)] scale-105'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'
                  }`}
                >
                  {chip.icon}
                  <span className="text-sm font-medium">{chip.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-zinc-400 text-sm font-medium mb-4 block">Or describe your mood:</label>
            <div className="relative">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. 'Something sweet but not too heavy...'"
                className="w-full bg-zinc-900/50 border border-zinc-700 text-white pl-5 pr-14 py-4 rounded-xl focus:outline-none focus:border-myst-accent focus:ring-1 focus:ring-myst-accent transition-all placeholder-zinc-600"
              />
              <button 
                onClick={(e) => handleAsk(e)}
                disabled={loading || (!query && selectedVibes.length === 0)}
                className="absolute right-2 top-2 p-2 bg-myst-accent text-white rounded-lg hover:bg-violet-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="relative min-h-[300px] flex items-center justify-center bg-zinc-900/30 rounded-2xl border border-white/5 overflow-hidden">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-myst-accent/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-myst-accent rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-4 bg-myst-accent/10 rounded-full blur-md animate-pulse"></div>
                </div>
                <p className="text-myst-accent text-sm font-mono tracking-widest animate-pulse">GENERATING MIX...</p>
              </motion.div>
            ) : response ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="w-full h-full p-6 relative group"
              >
                {/* Result Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-myst-accent/10 via-transparent to-blue-900/10 pointer-events-none" />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Recommended Mix</h4>
                      <h2 className="text-3xl font-serif text-white">{response.name}</h2>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-myst-accent/10 flex items-center justify-center text-myst-accent">
                      <Flame size={20} />
                    </div>
                  </div>

                  <div className="space-y-6 flex-grow">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-xs text-zinc-400 uppercase tracking-wider block mb-2">Ingredients</span>
                      <p className="text-zinc-200 font-medium text-lg">{response.ingredients}</p>
                    </div>

                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                       <span className="text-xs text-zinc-400 uppercase tracking-wider block mb-2">Flavor Profile</span>
                       <p className="text-zinc-300 italic">"{response.desc}"</p>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-900/20 border border-blue-500/20">
                      <div className="text-blue-400"><Coffee size={16} /></div>
                      <div className="text-sm">
                        <span className="text-blue-200 font-bold">Best Paired With: </span>
                        <span className="text-blue-100">{response.pairing}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                    <span className="text-xs text-zinc-600 font-mono">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                    <button 
                      onClick={() => setResponse(null)}
                      className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      <RefreshCw size={12} /> Reset
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center p-8"
              >
                <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/5">
                  <Sparkles size={32} className="text-zinc-600" />
                </div>
                <h4 className="text-white font-medium mb-2">Ready to Mix</h4>
                <p className="text-zinc-500 text-sm max-w-xs mx-auto">
                  Select a vibe or type your preferences to generate a custom recipe card.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};