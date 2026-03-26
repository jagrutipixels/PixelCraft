import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle, 
  Play, 
  MoreVertical, 
  Calendar, 
  Flag,
  Search,
  Filter,
  Plus,
  CheckSquare,
  Briefcase,
  X
} from "lucide-react";

const initialTasks = [
  { 
    id: 1, 
    title: "Setup Firebase Authentication", 
    project: "GraminIO E-Com Portal", 
    priority: "Critical", 
    dueDate: "Overdue", 
    status: "pending", 
    timeSpent: "2h 15m",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20"
  },
  { 
    id: 2, 
    title: "Review Q3 Marketing Assets", 
    project: "KARN MARKETING WARFARE", 
    priority: "High", 
    dueDate: "Today", 
    status: "pending", 
    timeSpent: "0h 0m",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20"
  },
  { 
    id: 3, 
    title: "Draft Client Proposal", 
    project: "Savoir Studio", 
    priority: "Medium", 
    dueDate: "Tomorrow", 
    status: "pending", 
    timeSpent: "0h 0m",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  { 
    id: 4, 
    title: "Weekly Sync Preparation", 
    project: "Internal", 
    priority: "Low", 
    dueDate: "Today", 
    status: "completed", 
    timeSpent: "0h 45m",
    color: "text-white/50",
    bg: "bg-white/5",
    border: "border-white/10"
  },
];

export function MyTasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", project: "Internal", priority: "Medium", dueDate: "Today" });

  const toggleTaskStatus = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === "completed" ? "pending" : "completed" } 
        : task
    ));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;

    let color = "text-blue-400";
    let bg = "bg-blue-500/10";
    let border = "border-blue-500/20";

    if (newTask.priority === "Critical" || newTask.priority === "High") {
      color = "text-rose-400"; bg = "bg-rose-500/10"; border = "border-rose-500/20";
    } else if (newTask.priority === "Low") {
      color = "text-white/50"; bg = "bg-white/5"; border = "border-white/10";
    }

    setTasks([{
      id: Date.now(),
      ...newTask,
      status: "pending",
      timeSpent: "0h 0m",
      color, bg, border
    }, ...tasks]);
    
    setIsModalOpen(false);
    setNewTask({ title: "", project: "Internal", priority: "Medium", dueDate: "Today" });
  };

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingTasks = filteredTasks.filter(t => t.status === "pending");
  const completedTasks = filteredTasks.filter(t => t.status === "completed");

  return (
    <div className="space-y-6 h-full flex flex-col relative">
      {/* Header */}
      <div className="flex items-start justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight mb-1">My Tasks</h2>
          <p className="text-white/50 text-sm">Organize, prioritize, and track your daily work.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
          >
            <Plus size={16} /> New Task
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
        <div className="glass-panel p-5 rounded-xl flex items-center justify-between border border-white/10">
          <div>
            <p className="text-sm text-white/50 mb-1">Total Pending</p>
            <p className="text-2xl font-semibold">{tasks.filter(t => t.status === "pending").length}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <CheckSquare size={20} />
          </div>
        </div>
        <div className="glass-panel p-5 rounded-xl flex items-center justify-between border border-white/10">
          <div>
            <p className="text-sm text-white/50 mb-1">Due Today</p>
            <p className="text-2xl font-semibold">{tasks.filter(t => t.dueDate === "Today" && t.status === "pending").length}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Calendar size={20} />
          </div>
        </div>
        <div className="glass-panel p-5 rounded-xl flex items-center justify-between border border-white/10">
          <div>
            <p className="text-sm text-white/50 mb-1">Overdue</p>
            <p className="text-2xl font-semibold">{tasks.filter(t => t.dueDate === "Overdue" && t.status === "pending").length}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
            <AlertCircle size={20} />
          </div>
        </div>
        <div className="glass-panel p-5 rounded-xl flex items-center justify-between border border-white/10">
          <div>
            <p className="text-sm text-white/50 mb-1">Completed</p>
            <p className="text-2xl font-semibold">{tasks.filter(t => t.status === "completed").length}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 glass-panel rounded-xl border border-white/10 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-white/5">
          <div className="relative flex-1 min-w-[250px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
            <input 
              type="text" 
              placeholder="Search my tasks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10 transition-colors">
              <Filter size={14} /> Filter
            </button>
            <button className="flex items-center gap-2 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10 transition-colors">
              <Clock size={14} /> Sort by Date
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
          {filteredTasks.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-center text-white/50">
               <CheckSquare size={48} className="mb-4 opacity-20" />
               <p>No tasks found matching "{searchQuery}"</p>
             </div>
          ) : (
            <div className="space-y-1">
              {/* Pending Tasks */}
              {pendingTasks.map((task) => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 transition-all"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <button 
                      onClick={() => toggleTaskStatus(task.id)}
                      className="text-white/30 hover:text-emerald-400 transition-colors shrink-0"
                    >
                      <Circle size={20} />
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white/90 truncate">{task.title}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-white/50">
                        <span className="flex items-center gap-1 truncate">
                          <Briefcase size={12} /> {task.project}
                        </span>
                        <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded ${task.bg} ${task.color} border ${task.border}`}>
                          <Flag size={10} /> {task.priority}
                        </span>
                        <span className={`flex items-center gap-1 ${task.dueDate === 'Overdue' ? 'text-rose-400' : ''}`}>
                          <Calendar size={12} /> {task.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <div className="flex items-center gap-2 text-xs text-white/50 bg-black/20 px-2 py-1 rounded border border-white/5">
                      <Clock size={12} /> {task.timeSpent}
                    </div>
                    <button className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center hover:bg-emerald-500/20 transition-colors">
                      <Play size={14} className="ml-0.5" />
                    </button>
                    <button 
                      onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                      className="text-white/40 hover:text-rose-400 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Completed Tasks Divider */}
              {completedTasks.length > 0 && (
                <div className="pt-6 pb-2 px-3">
                  <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Completed</h3>
                </div>
              )}

              {/* Completed Tasks */}
              {completedTasks.map((task) => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 transition-all opacity-60"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <button 
                      onClick={() => toggleTaskStatus(task.id)}
                      className="text-emerald-400 hover:text-white/30 transition-colors shrink-0"
                    >
                      <CheckCircle2 size={20} />
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white/50 line-through truncate">{task.title}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-white/40">
                        <span className="flex items-center gap-1 truncate">
                          <Briefcase size={12} /> {task.project}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {task.timeSpent}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <button 
                      onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                      className="text-white/40 hover:text-rose-400 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* New Task Modal */}
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
                <h3 className="text-xl font-semibold">Create Task</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddTask} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-white/70">Task Title</label>
                  <input 
                    type="text" 
                    required
                    autoFocus
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    placeholder="E.g., Design landing page"
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-white/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-white/70">Project</label>
                  <input 
                    type="text" 
                    value={newTask.project}
                    onChange={(e) => setNewTask({...newTask, project: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-white/30"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-white/70">Due Date</label>
                    <input 
                      type="text" 
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                      placeholder="e.g. Today, Tomorrow"
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-white/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-white/70">Priority</label>
                    <select 
                      value={newTask.priority}
                      onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-white/30 appearance-none"
                    >
                      <option value="Low" className="bg-zinc-900">Low</option>
                      <option value="Medium" className="bg-zinc-900">Medium</option>
                      <option value="High" className="bg-zinc-900">High</option>
                      <option value="Critical" className="bg-zinc-900">Critical</option>
                    </select>
                  </div>
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
                    Create Task
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
