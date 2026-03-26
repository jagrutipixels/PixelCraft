import { useState } from "react";
import { motion } from "motion/react";
import { 
  Folder, 
  PlayCircle, 
  IndianRupee, 
  Clock, 
  Search, 
  Filter, 
  RefreshCw, 
  Plus, 
  Upload, 
  Download,
  Eye,
  Edit,
  BarChart2,
  Trash2,
  MessageSquare,
  LayoutList
} from "lucide-react";

const tabs = [
  { id: "overview", label: "Project Overview", icon: LayoutList },
  { id: "management", label: "Project Management", icon: BarChart2 },
  { id: "communications", label: "Internal Communications", icon: MessageSquare },
];

const projects = [
  { 
    id: 1, 
    name: "GraminIO E-Com Portal", 
    status: "In Progress", 
    priority: "Medium", 
    progress: 28, 
    timeline: "No dates set", 
    budget: 0, 
    team: 2, 
    hours: 0,
    initial: "G",
    color: "bg-blue-500"
  },
  { 
    id: 2, 
    name: "KARN MARKETING WARFARE", 
    status: "Planning", 
    priority: "Medium", 
    progress: 0, 
    timeline: "No dates set", 
    budget: 0, 
    team: 1, 
    hours: 0,
    initial: "K",
    color: "bg-rose-500"
  },
];

export function ProjectManagement() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSubTab, setActiveSubTab] = useState("communications");

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight mb-1">Projects</h2>
          <p className="text-white/50 text-sm">Manage and track all your projects</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors flex items-center gap-2">
            <Plus size={16} /> New Project
          </button>
          <button className="px-4 py-2 rounded-md glass text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
            <Upload size={16} /> Import
          </button>
          <button className="px-4 py-2 rounded-md glass text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-white/10 shrink-0 px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-medium transition-colors relative flex items-center gap-2 ${
              activeTab === tab.id ? "text-amber-400" : "text-white/50 hover:text-white/80"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto pb-8">
        {activeTab === "overview" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel p-5 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/50 mb-1">Total Projects</p>
                  <p className="text-2xl font-semibold">2</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Folder size={20} />
                </div>
              </div>
              <div className="glass-panel p-5 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/50 mb-1">In Progress</p>
                  <p className="text-2xl font-semibold">1</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <PlayCircle size={20} />
                </div>
              </div>
              <div className="glass-panel p-5 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/50 mb-1">Total Budget</p>
                  <p className="text-2xl font-semibold flex items-center"><IndianRupee size={20} className="mr-1"/> 0</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <IndianRupee size={20} />
                </div>
              </div>
              <div className="glass-panel p-5 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/50 mb-1">Total Hours</p>
                  <p className="text-2xl font-semibold">0h</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Clock size={20} />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 p-4 glass-panel rounded-xl">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30"
                />
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 cursor-pointer hover:bg-white/10">
                <Filter size={14} /> All Status
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 cursor-pointer hover:bg-white/10">
                <Filter size={14} /> All Priority
              </div>
              <button className="text-sm text-white/50 hover:text-white flex items-center gap-2 px-2">
                <Filter size={14} /> Clear Filters
              </button>
              <button className="ml-auto bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                <RefreshCw size={14} /> Refresh
              </button>
            </div>

            {/* Data Table */}
            <div className="glass-panel rounded-xl overflow-hidden border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead>
                    <tr className="bg-blue-600/20 text-white/80 border-b border-white/10">
                      <th className="px-4 py-3 font-medium">PROJECT</th>
                      <th className="px-4 py-3 font-medium w-8"><input type="checkbox" className="rounded border-white/20 bg-white/5" /></th>
                      <th className="px-4 py-3 font-medium">STATUS</th>
                      <th className="px-4 py-3 font-medium">PRIORITY</th>
                      <th className="px-4 py-3 font-medium">PROGRESS</th>
                      <th className="px-4 py-3 font-medium">TIMELINE</th>
                      <th className="px-4 py-3 font-medium">BUDGET</th>
                      <th className="px-4 py-3 font-medium">TEAM</th>
                      <th className="px-4 py-3 font-medium">HOURS</th>
                      <th className="px-4 py-3 font-medium text-right">ACTIONS</th>
                    </tr>
                    {/* Inline Filters Row */}
                    <tr className="bg-blue-600/10 border-b border-white/10">
                      <td className="px-2 py-2"><input type="text" className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-xs outline-none" /></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"><input type="text" className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-xs outline-none" /></td>
                      <td className="px-2 py-2"><input type="text" className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-xs outline-none" /></td>
                      <td className="px-2 py-2"><input type="text" className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-xs outline-none" /></td>
                      <td className="px-2 py-2"><input type="text" className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-xs outline-none" /></td>
                      <td className="px-2 py-2"><input type="text" className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-xs outline-none" /></td>
                      <td className="px-2 py-2"><input type="text" className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-xs outline-none" /></td>
                      <td className="px-2 py-2"><input type="text" className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-xs outline-none" /></td>
                      <td className="px-2 py-2"></td>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {projects.map((project) => (
                      <tr key={project.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded flex items-center justify-center text-white font-medium ${project.color}`}>
                              {project.initial}
                            </div>
                            <span className="font-medium text-white/90">{project.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4"><input type="checkbox" className="rounded border-white/20 bg-white/5" /></td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">
                            <Clock size={12} /> {project.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400">
                            <Filter size={12} /> {project.priority}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-white/70 w-8">{project.progress}%</span>
                            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${project.progress}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 text-white/50 text-xs">
                            <Clock size={14} />
                            <div>
                              <p className="text-white/80">{project.timeline}</p>
                              <p>No end date</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-xs">
                            <p className="text-emerald-400 flex items-center"><IndianRupee size={12} className="mr-0.5"/> {project.budget}</p>
                            <p className="text-white/40">Budget allocated</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1.5 text-xs text-white/70">
                            <div className="flex -space-x-2">
                              <div className="w-6 h-6 rounded-full bg-zinc-700 border border-zinc-900 flex items-center justify-center"><User size={10}/></div>
                            </div>
                            {project.team} Members
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 text-white/50 text-xs">
                            <Clock size={14} />
                            <div>
                              <p className="text-white/80">{project.hours}h</p>
                              <p>of 0h</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded"><Eye size={16} /></button>
                            <button className="p-1.5 text-emerald-400 hover:bg-emerald-400/10 rounded"><Edit size={16} /></button>
                            <button className="p-1.5 text-amber-400 hover:bg-amber-400/10 rounded"><BarChart2 size={16} /></button>
                            <button className="p-1.5 text-rose-400 hover:bg-rose-400/10 rounded"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "management" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight mb-1">Task Board</h3>
                <p className="text-white/50 text-sm">Manage tasks and workflows across your projects</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors flex items-center gap-2">
                  <Plus size={16} /> Add Task
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* To Do Column */}
              <div className="glass-panel rounded-xl p-4 border border-white/10 flex flex-col h-[600px]">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-white/90 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                    To Do
                  </h4>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-white/70">2</span>
                </div>
                <div className="space-y-3 overflow-y-auto flex-1 pr-2">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-medium px-2 py-1 rounded bg-blue-500/20 text-blue-400">Design</span>
                      <button className="text-white/40 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"><Edit size={14} /></button>
                    </div>
                    <h5 className="text-sm font-medium text-white/90 mb-2">Create UI Mockups for Dashboard</h5>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-zinc-700 border border-zinc-900 flex items-center justify-center"><User size={10}/></div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white/50">
                        <Clock size={12} /> 2 days
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-medium px-2 py-1 rounded bg-emerald-500/20 text-emerald-400">Development</span>
                      <button className="text-white/40 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"><Edit size={14} /></button>
                    </div>
                    <h5 className="text-sm font-medium text-white/90 mb-2">Setup Firebase Auth</h5>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-zinc-700 border border-zinc-900 flex items-center justify-center"><User size={10}/></div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-rose-400">
                        <Clock size={12} /> Overdue
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* In Progress Column */}
              <div className="glass-panel rounded-xl p-4 border border-white/10 flex flex-col h-[600px]">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-white/90 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    In Progress
                  </h4>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-white/70">1</span>
                </div>
                <div className="space-y-3 overflow-y-auto flex-1 pr-2">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-medium px-2 py-1 rounded bg-purple-500/20 text-purple-400">Marketing</span>
                      <button className="text-white/40 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"><Edit size={14} /></button>
                    </div>
                    <h5 className="text-sm font-medium text-white/90 mb-2">Draft Q3 Campaign Strategy</h5>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '60%' }} />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-zinc-700 border border-zinc-900 flex items-center justify-center"><User size={10}/></div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white/50">
                        <Clock size={12} /> Today
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Done Column */}
              <div className="glass-panel rounded-xl p-4 border border-white/10 flex flex-col h-[600px]">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-white/90 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    Done
                  </h4>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-white/70">1</span>
                </div>
                <div className="space-y-3 overflow-y-auto flex-1 pr-2">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group opacity-60">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-medium px-2 py-1 rounded bg-blue-500/20 text-blue-400">Design</span>
                      <button className="text-white/40 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"><Edit size={14} /></button>
                    </div>
                    <h5 className="text-sm font-medium text-white/90 mb-2 line-through">Initial Client Meeting</h5>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-zinc-700 border border-zinc-900 flex items-center justify-center"><User size={10}/></div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-emerald-400">
                        Completed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "communications" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-semibold tracking-tight mb-1">Internal Communications & Feedback</h3>
              <p className="text-white/50 text-sm">Manage client communications and feedback from a unified dashboard</p>
            </div>

            <div className="glass-panel rounded-xl border border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-2 font-medium">
                  <MessageSquare size={18} className="text-white/70" />
                  Communications & Feedback Management
                </div>
                <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                  <Plus size={16} /> New Communication
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search communications and feedback..." 
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30"
                    />
                  </div>
                  <button className="px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
                    <Filter size={16} /> Filters
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/60">Project</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-white/30 appearance-none">
                      <option className="bg-zinc-900">All Projects</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/60">Client</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-white/30 appearance-none">
                      <option className="bg-zinc-900">All Clients</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/60">Direction</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-white/30 appearance-none">
                      <option className="bg-zinc-900">All Directions</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/60">Type</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-white/30 appearance-none">
                      <option className="bg-zinc-900">All Types</option>
                    </select>
                  </div>
                </div>

                <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                  <button 
                    onClick={() => setActiveSubTab("communications")}
                    className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-colors ${
                      activeSubTab === "communications" ? "bg-white text-black shadow-sm" : "text-white/60 hover:text-white"
                    }`}
                  >
                    <MessageSquare size={16} /> Communications (0)
                  </button>
                  <button 
                    onClick={() => setActiveSubTab("feedback")}
                    className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-colors ${
                      activeSubTab === "feedback" ? "bg-white text-black shadow-sm" : "text-white/60 hover:text-white"
                    }`}
                  >
                    <MessageSquare size={16} /> Feedback (0)
                  </button>
                </div>

                <div className="py-12 text-center text-white/40">
                  <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No {activeSubTab} found matching your criteria.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Dummy User icon component since it wasn't imported at the top
function User(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
