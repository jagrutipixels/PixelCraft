import { useState } from "react";
import { 
  Home,
  Bell,
  Settings,
  Calendar,
  UserPlus,
  Clock,
  Folder,
  Target,
  CheckSquare,
  Users,
  FileText,
  Network,
  BarChart2,
  Tag,
  ChevronDown,
  ChevronRight,
  Search,
  Zap,
  ChevronLeft,
  LayoutDashboard,
  Briefcase
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

const navigationCategories = [
  {
    name: "DASHBOARD",
    icon: LayoutDashboard,
    count: 3,
    items: [
      { name: "Reminder System", icon: Bell, href: "/reminders" },
      { name: "My Pending Approvals", icon: Settings, href: "/approvals" },
      { name: "Calendar", icon: Calendar, href: "/calendar" },
    ]
  },
  {
    name: "CRM",
    icon: Users,
    count: 1,
    items: [
      { name: "Lead Management", icon: UserPlus, href: "/crm" },
    ]
  },
  {
    name: "HR",
    icon: Briefcase,
    count: 3,
    items: [
      { name: "Attendance Management", icon: Clock, href: "/hr/attendance" },
      { name: "Leave Management", icon: Calendar, href: "/hr/leaves" },
      { name: "Holidays", icon: Calendar, href: "/hr/holidays" },
    ]
  },
  {
    name: "PROJECT MANAGEMENT",
    icon: Folder,
    count: 8,
    items: [
      { name: "Project Management", icon: Folder, href: "/projects" },
      { name: "Milestone Management", icon: Target, href: "/projects/milestones" },
      { name: "Task Management", icon: CheckSquare, href: "/projects/tasks" },
      { name: "Task Assignment", icon: Users, href: "/projects/assignments" },
      { name: "My Tasks", icon: Settings, href: "/projects/my-tasks" },
      { name: "Project Templates", icon: FileText, href: "/projects/templates" },
      { name: "Workflow Management", icon: Network, href: "/projects/workflows" },
      { name: "Task Status Report", icon: Settings, href: "/projects/reports" },
    ]
  },
  {
    name: "ANALYTICS & REPORTING",
    icon: BarChart2,
    count: 2,
    items: [
      { name: "Team Utilization", icon: Users, href: "/analytics/team" },
      { name: "Project Reports", icon: BarChart2, href: "/analytics/reports" },
    ]
  },
  {
    name: "DOCUMENT MANAGEMENT",
    icon: FileText,
    count: 1,
    items: [
      { name: "Document Management", icon: FileText, href: "/documents" },
    ]
  },
  {
    name: "SYSTEM ADMINISTRATION",
    icon: Tag,
    count: 1,
    items: [
      { name: "Type Masters", icon: Tag, href: "/admin/type-masters" },
    ]
  }
];

export function Sidebar({ 
  collapsed, 
  setCollapsed,
}: { 
  collapsed: boolean; 
  setCollapsed: (c: boolean) => void;
  activeTenant: string;
  setActiveTenant: (t: string) => void;
}) {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "PROJECT MANAGEMENT": true,
    "CRM": true
  });

  const toggleCategory = (name: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <motion.div 
      animate={{ width: collapsed ? 80 : 320 }}
      className="h-screen glass border-r border-white/5 flex flex-col relative z-20 transition-all duration-300"
    >
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 bg-zinc-800 border border-white/10 rounded-full p-1 text-white/70 hover:text-white z-30"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded bg-white text-black flex items-center justify-center font-bold text-xl shrink-0">
          K
        </div>
        {!collapsed && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-lg tracking-tight whitespace-nowrap"
          >
            Karn OS
          </motion.span>
        )}
      </div>

      {!collapsed && (
        <div className="px-4 pb-2 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
            <input 
              type="text" 
              placeholder="Search navigation... (Press '/')" 
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors"
            />
          </div>
        </div>
      )}

      {!collapsed && (
        <div className="px-4 py-2 flex items-center justify-between text-[11px] font-semibold text-white/40 uppercase tracking-wider shrink-0">
          <span>Categories</span>
          <ChevronDown size={14} />
        </div>
      )}

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto pb-4 custom-scrollbar">
        {collapsed ? (
          <div className="flex flex-col items-center gap-4 pt-2">
            <Link to="/" className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors" title="Welcome Home">
              <Home size={20} />
            </Link>
            <div className="w-8 h-px bg-white/10 my-1" />
            {navigationCategories.map(category => (
              <button 
                key={category.name} 
                className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors relative group" 
                title={category.name}
              >
                <category.icon size={20} />
                {/* Tooltip for collapsed state */}
                <div className="absolute left-full ml-4 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible whitespace-nowrap z-50 pointer-events-none">
                  {category.name}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-3 px-6 py-3 text-white/90 hover:bg-white/5 transition-colors">
              <Home size={20} className="text-white/70" />
              <span className="font-medium text-sm">Welcome Home</span>
            </Link>

            <div className="mt-2">
              {navigationCategories.map(category => (
                <div key={category.name} className="mb-1">
                  <button 
                    onClick={() => toggleCategory(category.name)}
                    className="w-full flex items-center justify-between px-6 py-2 text-[13px] font-bold text-white/50 hover:text-white/80 transition-colors uppercase tracking-wide"
                  >
                    <span>{category.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">{category.count}</span>
                      {expandedCategories[category.name] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </div>
                  </button>
                  
                  {expandedCategories[category.name] && (
                    <div className="py-1">
                      {category.items.map(item => {
                        const isActive = location.pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={cn(
                              "flex items-center gap-3 px-6 py-2.5 text-sm transition-all relative",
                              isActive 
                                ? "bg-blue-500/10 text-blue-400 font-medium" 
                                : "text-white/70 hover:bg-white/5 hover:text-white"
                            )}
                          >
                            {isActive && (
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-rose-500 rounded-r-full" />
                            )}
                            <item.icon size={18} className={isActive ? "text-blue-400" : "text-white/50"} />
                            <span>{item.name}</span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Widget */}
      <div className="p-4 border-t border-white/5 bg-white/5 shrink-0">
        {collapsed ? (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white cursor-pointer hover:bg-emerald-600 transition-colors" title="Basic Monthly - Active">
              <Zap size={20} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/20">
                <Zap size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Basic Monthly</p>
                <p className="text-xs text-white/50">Active</p>
              </div>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
              Active
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
