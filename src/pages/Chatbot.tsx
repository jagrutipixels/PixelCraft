import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Send, Bot, User } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

type Message = {
  role: "user" | "model";
  content: string;
};

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: "Hello! I am the PixelCraft AI Assistant. How can I help you manage your business today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const chat = ai.chats.create({
        model: "gemini-3.1-pro-preview",
        config: {
          systemInstruction: "You are the AI assistant for PixelCraft, a high-end business operating system managing icreatepixels, Tech EV, Savoir Studio, and Kaapad & Co. Be professional, concise, and helpful.",
        }
      });

      // Send history (excluding the first greeting if needed, or just send the latest)
      // For simplicity, we just send the latest message in this demo
      const response = await chat.sendMessage({ message: userMsg });
      
      setMessages(prev => [...prev, { role: "model", content: response.text || "I couldn't process that." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "model", content: "Sorry, I encountered an error connecting to the AI." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6 shrink-0">
        <h2 className="text-3xl font-semibold tracking-tight mb-2">AI Assistant</h2>
        <p className="text-white/50">Powered by Gemini 3.1 Pro. Ask anything about your business.</p>
      </div>

      <div className="flex-1 glass-panel rounded-xl flex flex-col overflow-hidden border border-white/10">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "user" ? "bg-white text-black" : "bg-blue-500/20 text-blue-400"
              }`}>
                {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                msg.role === "user" 
                  ? "bg-white/10 text-white" 
                  : "bg-transparent border border-white/10 text-white/90"
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed text-sm">{msg.content}</p>
              </div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
              <div className="bg-transparent border border-white/10 rounded-2xl px-5 py-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-white/10 bg-black/20">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Gemini to analyze leads, draft an email..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-6 pr-14 py-4 text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
            />
            <button 
              type="submit"
              disabled={!input.trim() || loading}
              className="absolute right-2 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90 transition-colors"
            >
              <Send size={18} className="ml-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
