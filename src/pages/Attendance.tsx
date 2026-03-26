import { useState } from "react";
import { motion } from "motion/react";
import { 
  Clock, 
  Calendar as CalendarIcon, 
  Search, 
  Filter, 
  Download,
  UserCheck,
  UserX,
  AlertCircle,
  MoreHorizontal
} from "lucide-react";

const attendanceData = [
  { id: 1, name: "Abhishek Gujar", role: "Admin", date: "Today", checkIn: "09:00 AM", checkOut: "--:--", status: "Present", hours: "4h 30m", avatar: "A" },
  { id: 2, name: "Sarah Jenkins", role: "Designer", date: "Today", checkIn: "09:15 AM", checkOut: "--:--", status: "Late", hours: "4h 15m", avatar: "S" },
  { id: 3, name: "Michael Chen", role: "Developer", date: "Today", checkIn: "--:--", checkOut: "--:--", status: "On Leave", hours: "0h 0m", avatar: "M" },
  { id: 4, name: "Emma Watson", role: "Marketing", date: "Today", checkIn: "08:55 AM", checkOut: "--:--", status: "Present", hours: "4h 35m", avatar: "E" },
  { id: 5, name: "David Kumar", role: "Sales", date: "Today", checkIn: "10:30 AM", checkOut: "--:--", status: "Half Day", hours: "3h 0m", avatar: "D" },
];

export function Attendance() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isClockedIn, setIsClockedIn] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "Late": return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "On Leave": return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "Half Day": return "text-purple-400 bg-purple-500/10 border-purple-500/20";
      default: return "text-white/50 bg-white/5 border-white/10";
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight mb-1">Attendance Management</h2>
          <p className="text-white/50 text-sm">Track employee attendance, working hours, and status.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-md glass text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
            <Download size={16} /> Export Report
          </button>
          <button 
            onClick={() => setIsClockedIn(!isClockedIn)}
            className={`px-4 py-2 rounded-md text-white text-sm font-medium transition-colors flex items-center gap-2 shadow-lg ${
              isClockedIn 
                ? "bg-rose-600 hover:bg-rose-500 shadow-rose-500/20" 
                : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20"
            }`}
          >
            <Clock size={16} /> {isClockedIn ? "Clock Out" : "Clock In"}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
        <div className="glass-panel p-5 rounded-xl flex items-center justify-between border border-white/10">
          <div>
            <p className="text-sm text-white/50 mb-1">Present Today</p>
            <p className="text-2xl font-semibold">24</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <UserCheck size={20} />
          </div>
        </div>
        <div className="glass-panel p-5 rounded-xl flex items-center justify-between border border-white/10">
          <div>
            <p className="text-sm text-white/50 mb-1">Late Arrivals</p>
            <p className="text-2xl font-semibold">3</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Clock size={20} />
          </div>
        </div>
        <div className="glass-panel p-5 rounded-xl flex items-center justify-between border border-white/10">
          <div>
            <p className="text-sm text-white/50 mb-1">On Leave</p>
            <p className="text-2xl font-semibold">2</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <CalendarIcon size={20} />
          </div>
        </div>
        <div className="glass-panel p-5 rounded-xl flex items-center justify-between border border-white/10">
          <div>
            <p className="text-sm text-white/50 mb-1">Absent</p>
            <p className="text-2xl font-semibold">1</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
            <UserX size={20} />
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
              placeholder="Search employees..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70">
              <CalendarIcon size={14} /> Today
            </div>
            <button className="flex items-center gap-2 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10 transition-colors">
              <Filter size={14} /> Filter Status
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="sticky top-0 bg-[#0a0a0a] z-10">
              <tr className="text-white/50 border-b border-white/10">
                <th className="px-6 py-4 font-medium">Employee</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Check In</th>
                <th className="px-6 py-4 font-medium">Check Out</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Total Hours</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {attendanceData.map((record, i) => (
                <motion.tr 
                  key={record.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-xs">
                        {record.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-white/90">{record.name}</p>
                        <p className="text-xs text-white/40">{record.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/70">{record.date}</td>
                  <td className="px-6 py-4">
                    <span className={record.checkIn === "--:--" ? "text-white/30" : "text-white/90"}>
                      {record.checkIn}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={record.checkOut === "--:--" ? "text-white/30" : "text-white/90"}>
                      {record.checkOut}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/70">{record.hours}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-white/40 hover:text-white transition-colors p-1 opacity-0 group-hover:opacity-100">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
