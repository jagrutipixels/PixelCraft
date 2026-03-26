import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Clock, 
  AlertCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Check, 
  X,
  IndianRupee,
  User
} from "lucide-react";

const initialApprovals = [
  {
    id: 1,
    title: "Approval Required: Sales Quotation QT-2026-00002-WNZ",
    badges: [{ text: "SALES QUOTATION", color: "bg-blue-500/20 text-blue-400" }, { text: "NORMAL", color: "bg-emerald-500/20 text-emerald-400" }],
    description: "Sales quotation requires approval for amount 118000.0",
    amount: "118,000.00",
    requestedBy: "Rekha Giri",
    requestedAt: "Mar 6, 2026, 03:04 PM",
    type: "normal"
  },
  {
    id: 2,
    title: "Client Lunch",
    badges: [{ text: "EXPENSE", color: "bg-purple-500/20 text-purple-400" }, { text: "NORMAL", color: "bg-emerald-500/20 text-emerald-400" }],
    description: "Lunch with client to discuss project scope",
    amount: "2,500.00",
    requestedBy: "Rekha Giri",
    requestedAt: "Mar 6, 2026, 03:39 PM",
    type: "normal"
  },
  {
    id: 3,
    title: "Approval Required: Client Lunch",
    badges: [{ text: "EXPENSE", color: "bg-purple-500/20 text-purple-400" }, { text: "NORMAL", color: "bg-emerald-500/20 text-emerald-400" }],
    description: "Expense requires approval for amount 2500.0",
    amount: "2,500.00",
    requestedBy: "Rekha Giri",
    requestedAt: "Mar 6, 2026, 03:40 PM",
    type: "normal"
  },
  {
    id: 4,
    title: "Office Supplies",
    badges: [{ text: "EXPENSE", color: "bg-purple-500/20 text-purple-400" }, { text: "NORMAL", color: "bg-emerald-500/20 text-emerald-400" }],
    description: "Monthly office supplies restock",
    amount: "4,250.00",
    requestedBy: "Amit Patel",
    requestedAt: "Mar 7, 2026, 10:15 AM",
    type: "normal"
  }
];

export function Approvals() {
  const [approvals, setApprovals] = useState(initialApprovals);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAction = (id: number, action: 'approve' | 'reject') => {
    // In a real app, this would make an API call. Here we just remove it from the list.
    setApprovals(prev => prev.filter(a => a.id !== id));
  };

  const filteredApprovals = approvals.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.requestedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight mb-1">My Pending Approvals</h2>
          <p className="text-white/50 text-sm">Review and take action on approvals assigned to you</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
        <div className="glass-panel p-5 rounded-xl flex items-center justify-between border border-blue-500/30 bg-blue-500/5">
          <div>
            <p className="text-sm text-blue-400/80 mb-1 font-medium">Total Pending</p>
            <p className="text-3xl font-semibold text-blue-400">{approvals.length}</p>
          </div>
          <Clock size={24} className="text-blue-400/50" />
        </div>
        <div className="glass-panel p-5 rounded-xl flex items-center justify-between border border-rose-500/30 bg-rose-500/5">
          <div>
            <p className="text-sm text-rose-400/80 mb-1 font-medium">Overdue</p>
            <p className="text-3xl font-semibold text-rose-400">0</p>
          </div>
          <AlertCircle size={24} className="text-rose-400/50" />
        </div>
        <div className="glass-panel p-5 rounded-xl flex items-center justify-between border border-amber-500/30 bg-amber-500/5">
          <div>
            <p className="text-sm text-amber-400/80 mb-1 font-medium">Urgent</p>
            <p className="text-3xl font-semibold text-amber-400">0</p>
          </div>
          <AlertTriangle size={24} className="text-amber-400/50" />
        </div>
        <div className="glass-panel p-5 rounded-xl flex items-center justify-between border border-emerald-500/30 bg-emerald-500/5">
          <div>
            <p className="text-sm text-emerald-400/80 mb-1 font-medium">Normal</p>
            <p className="text-3xl font-semibold text-emerald-400">{approvals.length}</p>
          </div>
          <CheckCircle2 size={24} className="text-emerald-400/50" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-4 mb-4 shrink-0">
          <div className="space-y-1.5 flex-1 min-w-[250px]">
            <label className="text-xs font-medium text-white/50">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
              <input 
                type="text" 
                placeholder="Search approvals..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>
          <div className="space-y-1.5 w-48">
            <label className="text-xs font-medium text-white/50">Type</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/30 appearance-none">
              <option className="bg-zinc-900">All Types</option>
            </select>
          </div>
          <div className="space-y-1.5 w-48">
            <label className="text-xs font-medium text-white/50">Priority</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/30 appearance-none">
              <option className="bg-zinc-900">All Priorities</option>
            </select>
          </div>
          <div className="flex items-center gap-2 mt-6">
            <input type="checkbox" id="overdue" className="rounded border-white/20 bg-white/5" />
            <label htmlFor="overdue" className="text-sm text-white/70 cursor-pointer">Overdue Only</label>
          </div>
        </div>

        {/* Approvals List */}
        <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pb-4">
          <AnimatePresence>
            {filteredApprovals.map((approval) => (
              <motion.div 
                key={approval.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className="glass-panel rounded-xl border border-white/10 p-5 hover:border-white/20 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div>
                      <h3 className="text-lg font-medium text-white/90 mb-2">{approval.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {approval.badges.map((badge, i) => (
                          <span key={i} className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${badge.color}`}>
                            {badge.text}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-white/60">{approval.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-white/50">
                      <div className="flex items-center gap-1.5">
                        <IndianRupee size={14} className="text-white/40" />
                        <span className="text-white/80 font-medium">Amount: ₹{approval.amount}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User size={14} className="text-white/40" />
                        <span>Requested by: <span className="text-white/80">{approval.requestedBy}</span></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-white/40" />
                        <span>Requested: {approval.requestedAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
                    <button 
                      onClick={() => handleAction(approval.id, 'reject')}
                      className="px-4 py-2 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400 text-sm font-medium hover:bg-rose-500/20 transition-colors flex items-center gap-2"
                    >
                      <X size={16} /> Reject
                    </button>
                    <button 
                      onClick={() => handleAction(approval.id, 'approve')}
                      className="px-4 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors flex items-center gap-2"
                    >
                      <Check size={16} /> Approve
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            {approvals.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center p-12 text-center glass-panel rounded-xl border border-white/10"
              >
                <CheckCircle2 size={48} className="text-emerald-400/50 mb-4" />
                <h3 className="text-xl font-medium text-white/90 mb-2">All caught up!</h3>
                <p className="text-white/50 text-sm">You have no pending approvals at the moment.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
