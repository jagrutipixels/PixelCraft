import React, { useState } from "react";
import { motion } from "motion/react";
import { Image as ImageIcon, Loader2, Download } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export function ImageGen() {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState<"1K" | "2K" | "4K">("1K");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      // Check if user has selected an API key (required for image gen)
      if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
        await window.aistudio.openSelectKey();
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: size
          }
        },
      });

      let foundImage = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          setImageUrl(`data:image/png;base64,${base64EncodeString}`);
          foundImage = true;
          break;
        }
      }

      if (!foundImage) {
        setError("No image was generated. Please try a different prompt.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6 shrink-0">
        <h2 className="text-3xl font-semibold tracking-tight mb-2">Creative Asset Generator</h2>
        <p className="text-white/50">Generate high-quality images for campaigns using Gemini 3.1 Flash Image.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        {/* Controls */}
        <div className="glass-panel p-6 rounded-xl flex flex-col gap-6 lg:col-span-1 border border-white/10">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Prompt</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A cinematic, high-end studio shot of a sleek electric scooter..."
              className="w-full h-32 bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Resolution</label>
            <div className="flex gap-2">
              {(["1K", "2K", "4K"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors border ${
                    size === s 
                      ? "bg-white text-black border-white" 
                      : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={!prompt.trim() || loading}
            className="mt-auto w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18} />}
            {loading ? "Generating..." : "Generate Asset"}
          </button>

          {error && (
            <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 glass-panel rounded-xl border border-white/10 flex flex-col overflow-hidden relative">
          {imageUrl ? (
            <>
              <div className="absolute top-4 right-4 z-10">
                <a 
                  href={imageUrl} 
                  download={`karnos-asset-${Date.now()}.png`}
                  className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors border border-white/10"
                >
                  <Download size={18} />
                </a>
              </div>
              <img 
                src={imageUrl} 
                alt="Generated asset" 
                className="w-full h-full object-contain bg-black/40"
              />
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-white/30 p-8 text-center">
              <ImageIcon size={48} className="mb-4 opacity-50" />
              <p className="text-lg font-medium text-white/50">No Asset Generated</p>
              <p className="text-sm mt-2 max-w-sm">Enter a prompt and select a resolution to generate a new creative asset for your campaigns.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
