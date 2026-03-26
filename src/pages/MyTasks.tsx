import { useState } from "react";
import { motion } from "motion/react";
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
  Briefcase
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

  const toggleTaskStatus = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === "completed" ? "pending" : "completed" } 
        : task
    ));
  };

  const pendingTasks = tasks.filter(t => t.status === "pending");
  const completedTasks = tasks.filter(t => t.status === "completed");

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight mb-1">My Tasks</h2>
          <p className="text-white/50 text-sm">Organize, prioritize, and track your daily work.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20">
            <Plus size={16} /> New Task
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
        <div className="glass-panel p-5 rounded-xl flex items-center justify-between border border-white/10">
          <div>
            <p className="text-sm text-white/50 mb-1">Total Pending</p>
            <p className="text-2xl font-semibold">{pendingTasks.length}</p>
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
            <p className="text-2xl font-semibold">{completedTasks.length}</p>
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
                  <button className="text-white/40 hover:text-white transition-colors">
                    <MoreVertical size={16} />
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
                  <button className="text-white/40 hover:text-white transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
