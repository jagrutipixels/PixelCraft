import React from "react";
import { motion } from "motion/react";

export function Placeholder({ title }: { title: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-[70vh] text-center"
    >
      <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-xl">
        <span className="text-3xl">🚧</span>
      </div>
      <h2 className="text-3xl font-semibold tracking-tight mb-3">{title}</h2>
      <p className="text-white/50 max-w-md">
        This module is currently under construction. We are building out the architecture step-by-step to ensure a solid foundation.
      </p>
    </motion.div>
  );
}
