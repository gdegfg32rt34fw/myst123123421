import React, { useState } from 'react';
import { generateVibeImage } from '../services/geminiService';
import { Button } from './Button';
import { Sparkles, Image as ImageIcon, Download, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const VibeGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setError(null);
    setLoading(true);

    try {
      // 1. Check for API Key selection for Pro model
      const aistudio = (window as any).aistudio;
      if (aistudio && aistudio.hasSelectedApiKey) {
        const hasKey = await aistudio.hasSelectedApiKey();
        if (!hasKey) {
          try {
            await aistudio.openSelectKey();
            // Race condition check (per rules): Assume success if no error thrown
          } catch (err: any) {
            if (err.message && err.message.includes("Requested entity was not found")) {
              setError("Session expired. Please try connecting again.");
              setLoading(false);
              return;
            }
          }
        }
      }

      // 2. Generate Image
      const result = await generateVibeImage(prompt, size);
      if (result.error) {
        setError(result.error);
      } else {
        setGeneratedImage(result.imageUrl);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-myst-panel border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Controls */}
          <div className="w-full md:w-1/3 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Create Your Vibe</h2>
              <p className="text-zinc-400 text-sm">
                Visualize your perfect lounge experience. Generate custom wallpapers in high definition using our AI engine.
              </p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A futuristic neon shisha bar with purple smoke and gold accents..."
                  className="w-full bg-myst-black border border-zinc-800 text-white p-4 rounded-xl focus:outline-none focus:border-myst-accent h-32 resize-none placeholder-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Resolution</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['1K', '2K', '4K'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                        size === s
                          ? 'bg-myst-accent text-white shadow-lg shadow-violet-900/20'
                          : 'bg-myst-black text-zinc-400 hover:bg-zinc-800'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-900/20 border border-red-800/50 rounded-lg flex items-start gap-2 text-red-200 text-sm">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} /> Generate Art
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Preview */}
          <div className="w-full md:w-2/3">
            <div className="w-full aspect-video bg-myst-black border border-zinc-800 rounded-2xl overflow-hidden relative group flex items-center justify-center">
              {generatedImage ? (
                <>
                  <img 
                    src={generatedImage} 
                    alt="Generated Vibe" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <a href={generatedImage} download={`myst-vibe-${Date.now()}.png`}>
                      <Button variant="primary" icon={<Download size={18} />}>
                        Download
                      </Button>
                    </a>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded text-xs text-white border border-white/10">
                    Generated by Gemini ({size})
                  </div>
                </>
              ) : (
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto bg-zinc-900 rounded-full flex items-center justify-center mb-4 text-zinc-700">
                    <ImageIcon size={32} />
                  </div>
                  <p className="text-zinc-500">Your generated artwork will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};