import { motion } from "motion/react";
import { Plus, MoreHorizontal, Clock } from "lucide-react";

const columns = [
  { id: "new", title: "New Leads", count: 12 },
  { id: "contacted", title: "Contacted", count: 8 },
  { id: "qualified", title: "Qualified", count: 5 },
  { id: "won", title: "Closed Won", count: 24 },
];

const leads = [
  { id: 1, name: "Sarah Jenkins", company: "Tech EV", status: "new", lastContact: "2h ago", value: "$4,500" },
  { id: 2, name: "Michael Chen", company: "Savoir Studio", status: "new", lastContact: "5h ago", value: "$12,000" },
  { id: 3, name: "Emma Watson", company: "Kaapad & Co", status: "contacted", lastContact: "1d ago", value: "$2,100" },
];

export function CRM() {
  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex items-end justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight mb-2">CRM & Lead Pipeline</h2>
          <p className="text-white/50">Manage your sales pipeline and automated follow-ups.</p>
        </div>
        <button className="px-4 py-2 rounded-md bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors flex items-center gap-2">
          <Plus size={16} /> Add Lead
        </button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max h-full">
          {columns.map((col, i) => (
            <motion.div 
              key={col.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="w-80 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white/80 flex items-center gap-2">
                  {col.title}
                  <span className="bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded-full">
                    {col.count}
                  </span>
                </h3>
                <button className="text-white/40 hover:text-white/80">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              <div className="flex-1 space-y-3">
                {leads.filter(l => l.status === col.id).map(lead => (
                  <div key={lead.id} className="glass-panel p-4 rounded-lg cursor-grab active:cursor-grabbing hover:border-white/20 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-sm">{lead.name}</h4>
                      <span className="text-xs font-mono text-emerald-400">{lead.value}</span>
                    </div>
                    <p className="text-xs text-white/50 mb-4">{lead.company}</p>
                    <div className="flex items-center justify-between text-xs text-white/40">
                      <div className="flex items-center gap-1">
                        <Clock size={12} className={lead.lastContact.includes('h') ? "text-amber-400" : ""} />
                        <span>{lead.lastContact}</span>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        {lead.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
