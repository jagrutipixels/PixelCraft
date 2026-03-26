import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, Plus, Search, ChevronDown, X, Calendar, Clock, CheckCircle2, Circle } from "lucide-react";

interface Reminder {
  id: number;
  title: string;
  date: string;
  time: string;
  priority: string;
  status: 'pending' | 'completed';
}

export function Reminders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReminder, setNewReminder] = useState({ title: "", date: "", time: "", priority: "Normal" });

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminder.title) return;
    
    setReminders([{
      id: Date.now(),
      ...newReminder,
      status: 'pending'
    }, ...reminders]);
    
    setIsModalOpen(false);
    setNewReminder({ title: "", date: "", time: "", priority: "Normal" });
  };

  const toggleStatus = (id: number) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, status: r.status === 'pending' ? 'completed' : 'pending' } : r
    ));
  };

  const filteredReminders = reminders.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 h-full flex flex-col relative">
      {/* Header */}
      <div className="flex items-start justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight mb-1">Reminders</h2>
          <p className="text-white/50 text-sm">Manage your reminders, notifications, and recurring tasks</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
        >
          <Plus size={16} /> New Reminder
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 glass-panel rounded-xl border border-white/10 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-white/5">
          <div className="relative flex-1 min-w-[250px] max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
            <input 
              type="text" 
              placeholder="Search reminders..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10 transition-colors">
              All Status <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-2 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10 transition-colors">
              All Priority <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          {reminders.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6"
              >
                <Bell size={32} className="text-white/30" />
              </motion.div>
              <h3 className="text-xl font-medium text-white/90 mb-2">No reminders found</h3>
              <p className="text-white/50 text-sm max-w-sm">
                Create your first reminder to get started. You can set up one-time notifications or recurring tasks.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {filteredReminders.map(reminder => (
                  <motion.div
                    key={reminder.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                      reminder.status === 'completed' 
                        ? 'bg-white/5 border-white/5 opacity-50' 
                        : 'bg-white/10 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => toggleStatus(reminder.id)}
                        className={`transition-colors ${reminder.status === 'completed' ? 'text-emerald-400' : 'text-white/30 hover:text-emerald-400'}`}
                      >
                        {reminder.status === 'completed' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                      </button>
                      <div>
                        <h4 className={`font-medium ${reminder.status === 'completed' ? 'line-through text-white/50' : 'text-white/90'}`}>
                          {reminder.title}
                        </h4>
                        <div className="flex items-center gap-4 mt-1 text-xs text-white/50">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {reminder.date || "No date"}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {reminder.time || "No time"}</span>
                          <span className={`px-2 py-0.5 rounded-full border ${
                            reminder.priority === 'High' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
                            reminder.priority === 'Medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                            'bg-blue-500/10 border-blue-500/20 text-blue-400'
                          }`}>
                            {reminder.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setReminders(reminders.filter(r => r.id !== reminder.id))}
                      className="p-2 text-white/30 hover:text-rose-400 transition-colors rounded-lg hover:bg-white/5"
                    >
                      <X size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredReminders.length === 0 && reminders.length > 0 && (
                <div className="text-center py-12 text-white/50">
                  No reminders match your search.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* New Reminder Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md glass-panel rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                <h3 className="text-xl font-semibold">Create Reminder</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddReminder} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-white/70">What to remind?</label>
                  <input 
                    type="text" 
                    required
                    autoFocus
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                    placeholder="E.g., Follow up with client"
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-white/30"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-white/70">Date</label>
                    <input 
                      type="date" 
                      value={newReminder.date}
                      onChange={(e) => setNewReminder({...newReminder, date: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-white/30 [color-scheme:dark]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-white/70">Time</label>
                    <input 
                      type="time" 
                      value={newReminder.time}
                      onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-white/30 [color-scheme:dark]"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-white/70">Priority</label>
                  <select 
                    value={newReminder.priority}
                    onChange={(e) => setNewReminder({...newReminder, priority: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-white/30 appearance-none"
                  >
                    <option value="Low" className="bg-zinc-900">Low</option>
                    <option value="Normal" className="bg-zinc-900">Normal</option>
                    <option value="High" className="bg-zinc-900">High</option>
                  </select>
                </div>
                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors font-medium"
                  >
                    Save Reminder
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
