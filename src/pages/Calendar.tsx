import { useState } from "react";
import { motion } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  RefreshCw 
} from "lucide-react";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)); // March 2026
  const [view, setView] = useState("Month");

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Generate days for March 2026 (starts on Sunday)
  const daysInMonth = 31;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight mb-1">Calendar</h2>
          <p className="text-white/50 text-sm">Manage your schedule and events</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white/50 hover:text-white transition-colors">
            <RefreshCw size={18} />
          </button>
          <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
            {["Month", "Week", "Day"].map(v => (
              <button 
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  view === v ? "bg-blue-600 text-white shadow-sm" : "text-white/60 hover:text-white"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20">
            <Plus size={16} /> New Event
          </button>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button className="p-1.5 rounded-md hover:bg-white/10 text-white/70 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <h3 className="text-xl font-medium w-36 text-center">March 2026</h3>
          <button className="p-1.5 rounded-md hover:bg-white/10 text-white/70 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
        <button className="px-4 py-1.5 rounded-md border border-white/10 bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors">
          Today
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 glass-panel rounded-xl border border-white/10 flex flex-col overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-white/10 bg-white/5">
          {daysOfWeek.map(day => (
            <div key={day} className="py-3 text-center text-sm font-medium text-white/50">
              {day}
            </div>
          ))}
        </div>
        
        {/* Days Grid */}
        <div className="flex-1 grid grid-cols-7 grid-rows-5">
          {days.map((day) => {
            const isToday = day === 26; // Highlight March 26th based on screenshot
            return (
              <div 
                key={day} 
                className={`border-r border-b border-white/5 p-2 min-h-[100px] transition-colors hover:bg-white/5 ${
                  isToday ? "bg-blue-500/10" : ""
                }`}
              >
                <div className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${
                  isToday ? "bg-blue-500 text-white" : "text-white/70"
                }`}>
                  {day}
                </div>
                {/* Placeholder for events */}
                {day === 12 && (
                  <div className="mt-1 px-2 py-1 rounded bg-purple-500/20 text-purple-400 text-xs truncate border border-purple-500/20">
                    Client Lunch
                  </div>
                )}
                {day === 24 && (
                  <div className="mt-1 px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs truncate border border-emerald-500/20">
                    Project Deadline
                  </div>
                )}
              </div>
            );
          })}
          {/* Fill remaining cells for a 5-week view (35 cells total) */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`empty-${i}`} className="border-r border-b border-white/5 p-2 bg-white/[0.02]" />
          ))}
        </div>
      </div>
    </div>
  );
}
