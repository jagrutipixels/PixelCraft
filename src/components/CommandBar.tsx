import React, { useState, useEffect } from "react";
import { Search, Command } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI } from "@google/genai";

export function CommandBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResult("");
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are the AI assistant for PixelCraft, a business operating system. 
        The user asked: "${query}". 
        Provide a concise, professional, and helpful response. If they ask to create something (like an invoice), simulate the creation process and confirm it's done.`,
      });
      setResult(response.text || "No response generated.");
    } catch (error) {
      console.error(error);
      setResult("Error connecting to AI. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div 
        onClick={() => setOpen(true)}
        className="glass rounded-full px-4 py-2 flex items-center gap-2 text-white/50 hover:text-white/80 cursor-text transition-colors w-64 border border-white/10"
      >
        <Search size={16} />
        <span className="text-sm flex-1">Search or command...</span>
        <kbd className="text-xs bg-white/10 px-1.5 py-0.5 rounded flex items-center gap-1">
          <Command size={12} /> K
        </kbd>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 glass-panel rounded-xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <form onSubmit={handleSearch} className="flex items-center px-4 py-3 border-b border-white/10">
                <Search size={20} className="text-white/50 mr-3" />
                <input 
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask Gemini to create an invoice, summarize leads..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-white/30"
                />
                <kbd className="text-xs bg-white/10 px-1.5 py-0.5 rounded text-white/50">ESC</kbd>
              </form>

              <div className="p-4 max-h-[60vh] overflow-y-auto">
                {loading ? (
                  <div className="flex items-center gap-3 text-white/60 py-4">
                    <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    Processing command...
                  </div>
                ) : result ? (
                  <div className="text-white/90 leading-relaxed whitespace-pre-wrap">
                    {result}
                  </div>
                ) : (
                  <div className="text-white/40 text-sm py-8 text-center">
                    Try: "Create an invoice for Tech EV" or "Summarize the latest leads"
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
