import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, Search, Filter, Download, Upload, Users, Grid, 
  ChevronDown, MoreHorizontal, Eye, Edit2, Trash2, Mail,
  CheckCircle2, AlertCircle, TrendingUp, DollarSign, X, FileSpreadsheet,
  Building, Phone, Briefcase, Calendar, Tag, AlignLeft, BarChart2
} from "lucide-react";

// --- MOCK DATA ---
const INITIAL_LEADS = [
  {
    id: 1,
    contact: { name: "Vijay", industry: "banking", initial: "V", color: "bg-rose-500" },
    score: 60,
    company: "GraminIO",
    status: "New",
    classifications: [
      { text: "General Nurture", color: "bg-blue-500/20 text-blue-400" },
      { text: "Consideration", color: "bg-amber-500/20 text-amber-400" },
      { text: "Influencer", color: "bg-purple-500/20 text-purple-400" }
    ],
    priority: "Medium",
    budget: "₹0",
    assignedTo: { name: "Tanvi Jadhav", initial: "T", color: "bg-blue-600" },
    tags: "-",
    createdAt: "3/26/2026",
    expectedClose: "4/25/2026"
  },
  {
    id: 2,
    contact: { name: "Karishma", industry: "consulting", initial: "K", color: "bg-purple-500" },
    score: 70,
    company: "Casuall",
    status: "Contacted",
    classifications: [
      { text: "High Intent", color: "bg-purple-500/20 text-purple-400" },
      { text: "Awareness", color: "bg-emerald-500/20 text-emerald-400" },
      { text: "Influencer", color: "bg-pink-500/20 text-pink-400" }
    ],
    priority: "Medium",
    budget: "₹0",
    assignedTo: { name: "Karishma Awaleg...", initial: "K", color: "bg-indigo-500" },
    tags: "-",
    createdAt: "2/19/2026",
    expectedClose: "3/21/2026"
  }
];

const TEAM_WORKLOAD = [
  { id: 1, name: "Abhishek Gujar", status: "unassigned", utilized: "0/5", percent: 0, color: "bg-blue-500" },
  { id: 2, name: "Akshya Khopade", status: "unassigned", utilized: "0/5", percent: 0, color: "bg-blue-600" },
  { id: 3, name: "Harshita Jain", status: "unassigned", utilized: "0/5", percent: 0, color: "bg-indigo-500" },
  { id: 4, name: "Jayesh Chavan", status: "unassigned", utilized: "0/5", percent: 0, color: "bg-blue-400" },
  { id: 5, name: "Karishma Awalegoankar", status: "underutilized", utilized: "1/5", percent: 20, color: "bg-purple-500" },
  { id: 6, name: "Rekha Giri", status: "unassigned", utilized: "0/5", percent: 0, color: "bg-blue-700" },
];

export function CRM() {
  const [activeTab, setActiveTab] = useState<'grid' | 'summary'>('grid');
  const [searchQuery, setSearchQuery] = useState("");
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  
  // Modals state
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  // Create Lead Form State
  const [createStep, setCreateStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    companyName: "", leadType: "", contactName: "", website: "", 
    email: "", phone: "", street: "", city: "", state: "", zip: "", country: "India",
    // Step 2
    industry: "", priority: "Medium", budget: "", expectedClose: "", assignedTo: "",
    // Step 3
    status: "New", score: "50", tags: "", notes: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedLeads(leads.map(l => l.id));
    else setSelectedLeads([]);
  };

  const handleSelectLead = (id: number) => {
    if (selectedLeads.includes(id)) setSelectedLeads(selectedLeads.filter(lId => lId !== id));
    else setSelectedLeads([...selectedLeads, id]);
  };

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!formData.companyName) errors.companyName = "Company name is required";
    if (!formData.contactName) errors.contactName = "Contact name is required";
    if (!formData.phone) errors.phone = "Phone number is required";
    if (!formData.city) errors.city = "City is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};
    if (!formData.industry) errors.industry = "Industry is required";
    if (!formData.expectedClose) errors.expectedClose = "Expected close date is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (createStep === 1 && validateStep1()) {
      setCreateStep(2);
    } else if (createStep === 2 && validateStep2()) {
      setCreateStep(3);
    } else if (createStep === 3) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const newLead = {
      id: Date.now(),
      contact: { 
        name: formData.contactName, 
        industry: formData.industry || "Other", 
        initial: formData.contactName.charAt(0).toUpperCase(), 
        color: "bg-emerald-500" 
      },
      score: parseInt(formData.score) || 50,
      company: formData.companyName,
      status: formData.status,
      classifications: [
        { text: "New Entry", color: "bg-blue-500/20 text-blue-400" }
      ],
      priority: formData.priority,
      budget: formData.budget ? `₹${formData.budget}` : "₹0",
      assignedTo: { 
        name: formData.assignedTo || "Unassigned", 
        initial: (formData.assignedTo || "U").charAt(0).toUpperCase(), 
        color: "bg-zinc-500" 
      },
      tags: formData.tags || "-",
      createdAt: new Date().toLocaleDateString('en-US'),
      expectedClose: formData.expectedClose ? new Date(formData.expectedClose).toLocaleDateString('en-US') : "-"
    };

    setLeads([newLead, ...leads]);
    setIsCreateOpen(false);
    
    // Reset form
    setCreateStep(1);
    setFormData({
      companyName: "", leadType: "", contactName: "", website: "", 
      email: "", phone: "", street: "", city: "", state: "", zip: "", country: "India",
      industry: "", priority: "Medium", budget: "", expectedClose: "", assignedTo: "",
      status: "New", score: "50", tags: "", notes: ""
    });
  };

  const filteredLeads = leads.filter(lead => 
    lead.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 h-full flex flex-col relative">
      {/* Header */}
      <div className="flex items-start justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight mb-1">Lead Management</h2>
          <p className="text-white/50 text-sm">Track and manage your sales leads</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-md border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21v-5h5"/></svg>
          </button>
          <button className="px-4 py-2 rounded-md border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium hover:bg-blue-500/20 transition-colors flex items-center gap-2">
            <Download size={16} /> Export
          </button>
          <button 
            onClick={() => setIsImportOpen(true)}
            className="px-4 py-2 rounded-md border border-white/10 bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <Upload size={16} /> Import
          </button>
          <button 
            onClick={() => { setIsCreateOpen(true); setCreateStep(1); }}
            className="px-4 py-2 rounded-md bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 transition-colors flex items-center gap-2 shadow-lg shadow-rose-500/20"
          >
            <Plus size={16} /> New Lead
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 shrink-0">
        <button 
          onClick={() => setActiveTab('grid')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'grid' ? 'bg-blue-500 text-white' : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
          }`}
        >
          <Grid size={16} /> Leads Grid
        </button>
        <button 
          onClick={() => setActiveTab('summary')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'summary' ? 'bg-blue-500 text-white' : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
          }`}
        >
          <Users size={16} /> Users Leads Summary
        </button>
      </div>

      {/* TAB CONTENT: LEADS GRID */}
      {activeTab === 'grid' && (
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          {/* Lead Overview KPIs */}
          <div className="shrink-0">
            <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Target size={14} />
              </div>
              Lead Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass-panel p-4 rounded-xl border border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs text-white/50">Total Leads</p>
                  <Target size={14} className="text-blue-400" />
                </div>
                <p className="text-2xl font-semibold">2</p>
                <p className="text-xs text-white/40 mt-1">All leads in system</p>
              </div>
              <div className="glass-panel p-4 rounded-xl border border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs text-white/50">New This Month</p>
                  <TrendingUp size={14} className="text-emerald-400" />
                </div>
                <p className="text-2xl font-semibold">1</p>
                <p className="text-xs text-white/40 mt-1">Last 30 days</p>
              </div>
              <div className="glass-panel p-4 rounded-xl border border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs text-white/50">Total Budget</p>
                  <DollarSign size={14} className="text-purple-400" />
                </div>
                <p className="text-2xl font-semibold">₹0</p>
                <p className="text-xs text-white/40 mt-1">Pipeline value</p>
              </div>
              <div className="glass-panel p-4 rounded-xl border border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs text-white/50">Conversion Rate</p>
                  <AlertCircle size={14} className="text-amber-400" />
                </div>
                <p className="text-2xl font-semibold">0.0%</p>
                <p className="text-xs text-white/40 mt-1">Won leads ratio</p>
              </div>
            </div>
          </div>

          {/* Data Grid Area */}
          <div className="flex-1 glass-panel rounded-xl border border-white/10 flex flex-col overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-white/5">
              <div className="relative flex-1 min-w-[250px] max-w-2xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                <input 
                  type="text" 
                  placeholder="Search leads by name, company, or email..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div className="flex items-center gap-2">
                <select className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 outline-none focus:border-white/30 appearance-none">
                  <option className="bg-zinc-900">All Status</option>
                </select>
                <select className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 outline-none focus:border-white/30 appearance-none">
                  <option className="bg-zinc-900">All Priorities</option>
                </select>
              </div>
            </div>

            {/* Bulk Actions */}
            <div className="p-3 border-b border-white/10 bg-black/20 flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-sm text-white/70">
                <Filter size={14} /> {selectedLeads.length} selected
              </div>
              <button disabled={selectedLeads.length === 0} className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-sm text-white/50 disabled:opacity-50 flex items-center gap-2">
                <CheckCircle2 size={14} /> Bulk Classify
              </button>
              <button disabled={selectedLeads.length === 0} className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-sm text-white/50 disabled:opacity-50 flex items-center gap-2">
                <Users size={14} /> Bulk Nurture
              </button>
              <button disabled={selectedLeads.length === 0} className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-sm text-white/50 disabled:opacity-50 flex items-center gap-2">
                <Edit2 size={14} /> Bulk Edit
              </button>
              <button disabled={selectedLeads.length === 0} className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-sm text-white/50 disabled:opacity-50 flex items-center gap-2">
                <Trash2 size={14} /> Bulk Delete
              </button>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[1200px]">
                <thead>
                  <tr className="bg-blue-500/20 text-blue-400 text-xs uppercase tracking-wider">
                    <th className="p-3 font-medium w-10">
                      <input type="checkbox" className="rounded border-white/20 bg-black/20" onChange={handleSelectAll} checked={selectedLeads.length === leads.length && leads.length > 0} />
                    </th>
                    <th className="p-3 font-medium">Contact <Filter size={12} className="inline ml-1 opacity-50" /></th>
                    <th className="p-3 font-medium">Score <Filter size={12} className="inline ml-1 opacity-50" /></th>
                    <th className="p-3 font-medium">Company <Filter size={12} className="inline ml-1 opacity-50" /></th>
                    <th className="p-3 font-medium">Status <Filter size={12} className="inline ml-1 opacity-50" /></th>
                    <th className="p-3 font-medium">Classification <Filter size={12} className="inline ml-1 opacity-50" /></th>
                    <th className="p-3 font-medium">Priority <Filter size={12} className="inline ml-1 opacity-50" /></th>
                    <th className="p-3 font-medium">Budget <Filter size={12} className="inline ml-1 opacity-50" /></th>
                    <th className="p-3 font-medium">Assigned To <Filter size={12} className="inline ml-1 opacity-50" /></th>
                    <th className="p-3 font-medium">Tags <Filter size={12} className="inline ml-1 opacity-50" /></th>
                    <th className="p-3 font-medium">Created At <Filter size={12} className="inline ml-1 opacity-50" /></th>
                    <th className="p-3 font-medium">Expected Close Date <Filter size={12} className="inline ml-1 opacity-50" /></th>
                    <th className="p-3 font-medium text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3">
                        <input 
                          type="checkbox" 
                          className="rounded border-white/20 bg-black/20" 
                          checked={selectedLeads.includes(lead.id)}
                          onChange={() => handleSelectLead(lead.id)}
                        />
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${lead.contact.color} flex items-center justify-center text-white font-medium text-xs`}>
                            {lead.contact.initial}
                          </div>
                          <div>
                            <p className="font-medium text-white/90">{lead.contact.name}</p>
                            <p className="text-xs text-white/40">{lead.contact.industry}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-amber-400 flex items-center gap-1 mt-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        {lead.score}
                      </td>
                      <td className="p-3 text-white/70 flex items-center gap-2 mt-2">
                        <Building size={14} className="text-white/40" /> {lead.company}
                      </td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                          lead.status === 'New' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col gap-1">
                          {lead.classifications.map((c, i) => (
                            <span key={i} className={`px-2 py-0.5 rounded text-[10px] font-medium w-max ${c.color}`}>
                              {c.text}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-amber-400">{lead.priority}</td>
                      <td className="p-3 text-emerald-400">{lead.budget}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full ${lead.assignedTo.color} flex items-center justify-center text-white text-[10px]`}>
                            {lead.assignedTo.initial}
                          </div>
                          <span className="text-white/70 text-xs">{lead.assignedTo.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-white/50">{lead.tags}</td>
                      <td className="p-3 text-white/70">{lead.createdAt}</td>
                      <td className="p-3 text-rose-400">{lead.expectedClose}</td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded transition-colors"><Eye size={14} /></button>
                          <button className="p-1.5 text-emerald-400 hover:bg-emerald-500/10 rounded transition-colors"><Edit2 size={14} /></button>
                          <button className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded transition-colors"><Trash2 size={14} /></button>
                          <button className="p-1.5 text-amber-400 hover:bg-amber-500/10 rounded transition-colors"><Mail size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: USERS LEADS SUMMARY */}
      {activeTab === 'summary' && (
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          <div className="shrink-0">
            <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Users size={14} />
              </div>
              Users Leads Summary
            </h3>
            <p className="text-sm text-white/50 mb-4">Overview of lead assignments and workload distribution across team members</p>
            
            <div className="glass-panel p-6 rounded-xl border border-white/10 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-medium">Team Workload Overview</h4>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Optimal</span>
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Underutilized</span>
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Overloaded</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-black/20 border border-white/5 text-center">
                  <p className="text-3xl font-semibold mb-1">0</p>
                  <p className="text-xs text-white/50">Optimal Load</p>
                </div>
                <div className="p-4 rounded-lg bg-black/20 border border-white/5 text-center">
                  <p className="text-3xl font-semibold mb-1">2</p>
                  <p className="text-xs text-white/50">Underutilized</p>
                </div>
                <div className="p-4 rounded-lg bg-black/20 border border-white/5 text-center">
                  <p className="text-3xl font-semibold mb-1">0</p>
                  <p className="text-xs text-white/50">Overloaded</p>
                </div>
                <div className="p-4 rounded-lg bg-black/20 border border-white/5 text-center">
                  <p className="text-3xl font-semibold mb-1">6</p>
                  <p className="text-xs text-white/50">Unassigned</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={14} />
                <input 
                  type="text" 
                  placeholder="Search team members" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TEAM_WORKLOAD.map(user => (
                <div key={user.id} className="glass-panel p-4 rounded-xl border border-white/10 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white font-medium text-xs`}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-white/90">{user.name}</p>
                        <p className="text-xs text-white/50">{user.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{user.utilized}</p>
                      <p className="text-xs text-white/50">{user.percent}% utilized</p>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${user.percent > 0 ? 'bg-blue-500' : 'bg-transparent'}`} 
                      style={{ width: `${user.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* IMPORT MODAL */}
      <AnimatePresence>
        {isImportOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsImportOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl glass-panel rounded-2xl border border-white/10 shadow-2xl overflow-hidden bg-[#1a1d24]"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Upload size={20} className="text-amber-400" /> Import Leads from Excel
                </h3>
                <button onClick={() => setIsImportOpen(false)} className="text-white/50 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <p className="text-sm text-white/60 -mt-2">Download the template, then upload your filled file (.xlsx, .xls, or .csv)</p>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Step 1: Download template</h4>
                  <div className="border border-dashed border-white/20 rounded-xl p-6 flex flex-col items-start gap-4 bg-white/5">
                    <div className="flex items-start gap-3">
                      <FileSpreadsheet size={24} className="text-emerald-400 shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Leads import template</p>
                        <p className="text-xs text-white/50 mt-1">Includes Leads sheet, Instructions, and sample rows (same pattern as Item Master)</p>
                        <p className="text-xs text-white/40 mt-1">File: leads_import_template.xlsx</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm font-medium hover:bg-emerald-500/30 transition-colors flex items-center gap-2">
                      <Download size={16} /> Download template
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Step 2: Upload file</h4>
                  <div className="border border-dashed border-white/20 rounded-xl p-10 flex flex-col items-center justify-center gap-4 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <Upload size={32} className="text-amber-400" />
                    <div className="text-center">
                      <p className="font-medium">Drop your Excel or CSV file here</p>
                      <p className="text-sm text-white/50 mt-1">or click to browse</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-white/40">
                  Columns: Contact Name, Company Name, Email, Phone, Industry, Status, Priority, Budget Min, Budget Max, Source, Address City, Address State, Address Country, Score
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE LEAD MODAL (MULTI-STEP) */}
      <AnimatePresence>
        {isCreateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCreateOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl glass-panel rounded-2xl border border-white/10 shadow-2xl overflow-hidden bg-[#1a1d24]"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div>
                  <h3 className="text-xl font-semibold">Create New Lead</h3>
                  <p className="text-xs text-white/50 mt-1">Step {createStep} of 3</p>
                </div>
                <button onClick={() => setIsCreateOpen(false)} className="text-white/50 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                {/* Stepper */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${createStep >= 1 ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/50'}`}>1</div>
                    <div className={`h-0.5 w-12 ${createStep >= 2 ? 'bg-blue-500' : 'bg-white/10'}`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${createStep >= 2 ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/50'}`}>2</div>
                    <div className={`h-0.5 w-12 ${createStep >= 3 ? 'bg-blue-500' : 'bg-white/10'}`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${createStep >= 3 ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/50'}`}>3</div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h4 className="text-lg font-medium">Contact & Address Information</h4>
                  <p className="text-sm text-white/50">Basic contact details and address for the lead</p>
                </div>

                {/* Form Step 1 */}
                {createStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-white/70">Company Name <span className="text-rose-500">*</span></label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                          <input 
                            type="text" 
                            value={formData.companyName}
                            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                            placeholder="Enter company name"
                            className={`w-full bg-black/20 border ${formErrors.companyName ? 'border-rose-500/50' : 'border-white/10'} rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-white/30`}
                          />
                        </div>
                        {formErrors.companyName && <p className="text-xs text-rose-400 mt-1">{formErrors.companyName}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-white/70">Lead Type</label>
                        <select className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-white/30 appearance-none">
                          <option value="" className="bg-zinc-900">Select lead type</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-white/70">Contact Name <span className="text-rose-500">*</span></label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                          <input 
                            type="text" 
                            value={formData.contactName}
                            onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                            placeholder="Enter contact name"
                            className={`w-full bg-black/20 border ${formErrors.contactName ? 'border-rose-500/50' : 'border-white/10'} rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-white/30`}
                          />
                        </div>
                        {formErrors.contactName && <p className="text-xs text-rose-400 mt-1">{formErrors.contactName}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-white/70">Website</label>
                        <div className="relative">
                          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
                          <input 
                            type="text" 
                            value={formData.website}
                            onChange={(e) => setFormData({...formData, website: e.target.value})}
                            placeholder="Enter website URL or domain"
                            className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-white/30"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-white/70">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                          <input 
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="Enter email address"
                            className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-white/30"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-white/70">Phone Number <span className="text-rose-500">*</span></label>
                        <div className="relative">
                          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          <input 
                            type="tel" 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="Enter phone number"
                            className={`w-full bg-black/20 border ${formErrors.phone ? 'border-rose-500/50' : 'border-white/10'} rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-white/30`}
                          />
                        </div>
                        {formErrors.phone && <p className="text-xs text-rose-400 mt-1">{formErrors.phone}</p>}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <h4 className="text-sm font-medium flex items-center gap-2 mb-4">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        Address Information
                      </h4>
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-white/50">Street Address</label>
                          <input 
                            type="text" 
                            value={formData.street}
                            onChange={(e) => setFormData({...formData, street: e.target.value})}
                            placeholder="Enter street address"
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-white/30"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-white/50">City <span className="text-rose-500">*</span></label>
                            <input 
                              type="text" 
                              value={formData.city}
                              onChange={(e) => setFormData({...formData, city: e.target.value})}
                              placeholder="Enter city"
                              className={`w-full bg-black/20 border ${formErrors.city ? 'border-rose-500/50' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-white/30`}
                            />
                            {formErrors.city && <p className="text-xs text-rose-400 mt-1">{formErrors.city}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-white/50">State</label>
                            <input 
                              type="text" 
                              value={formData.state}
                              onChange={(e) => setFormData({...formData, state: e.target.value})}
                              placeholder="Enter state"
                              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-white/30"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-white/50">Postal Code</label>
                            <input 
                              type="text" 
                              value={formData.zip}
                              onChange={(e) => setFormData({...formData, zip: e.target.value})}
                              placeholder="Enter postal code"
                              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-white/30"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-white/50">Country <span className="text-rose-500">*</span></label>
                            <select 
                              value={formData.country}
                              onChange={(e) => setFormData({...formData, country: e.target.value})}
                              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-white/30 appearance-none"
                            >
                              <option value="India" className="bg-zinc-900">India</option>
                              <option value="USA" className="bg-zinc-900">United States</option>
                              <option value="UK" className="bg-zinc-900">United Kingdom</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Form Step 2 */}
                {createStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h4 className="text-lg font-medium">Lead Details & Qualification</h4>
                      <p className="text-sm text-white/50">Provide industry, budget, and assignment details</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-white/70">Industry <span className="text-rose-500">*</span></label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                          <input 
                            type="text" 
                            value={formData.industry}
                            onChange={(e) => setFormData({...formData, industry: e.target.value})}
                            placeholder="e.g. Technology, Healthcare"
                            className={`w-full bg-black/20 border ${formErrors.industry ? 'border-rose-500/50' : 'border-white/10'} rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-white/30`}
                          />
                        </div>
                        {formErrors.industry && <p className="text-xs text-rose-400 mt-1">{formErrors.industry}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-white/70">Priority</label>
                        <select 
                          value={formData.priority}
                          onChange={(e) => setFormData({...formData, priority: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-white/30 appearance-none"
                        >
                          <option value="Low" className="bg-zinc-900">Low</option>
                          <option value="Medium" className="bg-zinc-900">Medium</option>
                          <option value="High" className="bg-zinc-900">High</option>
                          <option value="Critical" className="bg-zinc-900">Critical</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-white/70">Estimated Budget</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                          <input 
                            type="number" 
                            value={formData.budget}
                            onChange={(e) => setFormData({...formData, budget: e.target.value})}
                            placeholder="e.g. 50000"
                            className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-white/30"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-white/70">Expected Close Date <span className="text-rose-500">*</span></label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                          <input 
                            type="date" 
                            value={formData.expectedClose}
                            onChange={(e) => setFormData({...formData, expectedClose: e.target.value})}
                            className={`w-full bg-black/20 border ${formErrors.expectedClose ? 'border-rose-500/50' : 'border-white/10'} rounded-lg pl-10 pr-4 py-2.5 text-white outline-none focus:border-white/30 [color-scheme:dark]`}
                          />
                        </div>
                        {formErrors.expectedClose && <p className="text-xs text-rose-400 mt-1">{formErrors.expectedClose}</p>}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-white/70">Assign To</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                        <select 
                          value={formData.assignedTo}
                          onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white outline-none focus:border-white/30 appearance-none"
                        >
                          <option value="" className="bg-zinc-900">Unassigned</option>
                          {TEAM_WORKLOAD.map(user => (
                            <option key={user.id} value={user.name} className="bg-zinc-900">{user.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Step 3 */}
                {createStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h4 className="text-lg font-medium">Status & Additional Notes</h4>
                      <p className="text-sm text-white/50">Finalize lead status, scoring, and tags</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-white/70">Initial Status</label>
                        <select 
                          value={formData.status}
                          onChange={(e) => setFormData({...formData, status: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-white/30 appearance-none"
                        >
                          <option value="New" className="bg-zinc-900">New</option>
                          <option value="Contacted" className="bg-zinc-900">Contacted</option>
                          <option value="Qualified" className="bg-zinc-900">Qualified</option>
                          <option value="Proposal" className="bg-zinc-900">Proposal Sent</option>
                          <option value="Won" className="bg-zinc-900">Closed Won</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-white/70">Lead Score (0-100)</label>
                        <div className="relative">
                          <BarChart2 className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                          <input 
                            type="number" 
                            min="0" max="100"
                            value={formData.score}
                            onChange={(e) => setFormData({...formData, score: e.target.value})}
                            className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white outline-none focus:border-white/30"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-white/70">Tags (comma separated)</label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                        <input 
                          type="text" 
                          value={formData.tags}
                          onChange={(e) => setFormData({...formData, tags: e.target.value})}
                          placeholder="e.g. enterprise, q3-target, referral"
                          className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-white/30"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-white/70">Notes / Description</label>
                      <div className="relative">
                        <AlignLeft className="absolute left-3 top-3 text-white/40" size={16} />
                        <textarea 
                          value={formData.notes}
                          onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          placeholder="Add any additional context or notes about this lead..."
                          rows={4}
                          className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-white/30 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-8 flex items-center justify-between border-t border-white/10 mt-8">
                  <button 
                    type="button"
                    disabled={createStep === 1}
                    onClick={() => setCreateStep(createStep - 1)}
                    className="px-6 py-2.5 rounded-lg border border-white/10 text-white/70 hover:bg-white/5 hover:text-white transition-colors font-medium disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    Previous
                  </button>
                  <div className="flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setIsCreateOpen(false)}
                      className="px-6 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button 
                      type="button"
                      onClick={handleNextStep}
                      className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-rose-500 hover:from-blue-500 hover:to-rose-400 text-white transition-colors font-medium shadow-lg shadow-rose-500/20"
                    >
                      {createStep === 3 ? 'Submit' : 'Next'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
