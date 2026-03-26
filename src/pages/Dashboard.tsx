import { motion } from "motion/react";
import { ArrowUpRight, Users, DollarSign, Activity, TrendingUp } from "lucide-react";

const stats = [
  { name: "Total Revenue", value: "$2.4M", change: "+14.5%", icon: DollarSign },
  { name: "Active Leads", value: "842", change: "+5.2%", icon: Users },
  { name: "Conversion Rate", value: "24.8%", change: "+2.1%", icon: Activity },
  { name: "Brand Sentiment", value: "92/100", change: "+1.2%", icon: TrendingUp },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight mb-2">Overview</h2>
          <p className="text-white/50">Welcome back to PixelCraft. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-md glass text-sm font-medium hover:bg-white/10 transition-colors">
            Download Report
          </button>
          <button className="px-4 py-2 rounded-md bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">
            New Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-xl flex flex-col gap-4"
          >
            <div className="flex items-center justify-between text-white/60">
              <span className="text-sm font-medium">{stat.name}</span>
              <stat.icon size={18} />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-semibold tracking-tight">{stat.value}</span>
              <span className="text-sm text-emerald-400 flex items-center gap-1">
                {stat.change} <ArrowUpRight size={14} />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-panel p-6 rounded-xl min-h-[400px]"
        >
          <h3 className="text-lg font-medium mb-6">Revenue Overview</h3>
          <div className="flex items-center justify-center h-[300px] text-white/30 border border-dashed border-white/10 rounded-lg">
            [Chart Visualization Placeholder]
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel p-6 rounded-xl min-h-[400px] flex flex-col"
        >
          <h3 className="text-lg font-medium mb-6">Recent Activity</h3>
          <div className="flex-1 space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-white/40 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white/90">New lead captured from Tech EV</p>
                  <p className="text-xs text-white/50 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
