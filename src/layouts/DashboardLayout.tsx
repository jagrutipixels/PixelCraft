import React, { ReactNode, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { CommandBar } from "../components/CommandBar";
import { Bell, User, LogOut } from "lucide-react";

export function DashboardLayout({ children, onLogout }: { children: ReactNode, onLogout: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTenant, setActiveTenant] = useState("pixelcraft");

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-sans selection:bg-white/20">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
      </div>

      <Sidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        activeTenant={activeTenant}
        setActiveTenant={setActiveTenant}
      />
      
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-20 glass border-b border-white/5 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-medium tracking-tight">
              {activeTenant === "pixelcraft" && "icreatepixels"}
              {activeTenant === "tech-ev" && "Tech EV"}
              {activeTenant === "savoir" && "Savoir Studio"}
              {activeTenant === "kaapad" && "Kaapad & Co"}
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <CommandBar />
            <button className="relative text-white/60 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            
            <div className="relative group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-600 flex items-center justify-center border border-white/10 cursor-pointer">
                <User size={18} className="text-white/80" />
              </div>
              
              <div className="absolute right-0 mt-2 w-48 glass-panel rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-white/10 overflow-hidden py-1">
                <button 
                  onClick={onLogout} 
                  className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2 transition-colors"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
