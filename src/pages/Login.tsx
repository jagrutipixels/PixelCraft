import React, { useState } from "react";
import { motion } from "motion/react";
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, Activity, Zap, Settings, ShieldCheck } from "lucide-react";

export function Login({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      setLoading(false);
      if (email === "abhishek.gujar1202@gmail.com" && password === "Abhi@1202") {
        onLogin();
      } else {
        setError("Invalid email or password. Please try again.");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden font-sans selection:bg-white/20 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[120px]" />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-7xl mx-auto z-10 relative">
        {/* Left Side - Branding & Features */}
        <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center font-bold text-2xl">
                P
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">PixelCraft</h1>
                <p className="text-sm text-white/50">by icreatepixels</p>
              </div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              One platform to manage your entire organization
            </h2>
            <p className="text-lg text-white/60 mb-12 max-w-xl">
              Sales, service, inventory, approvals & insights — all in one intelligent system.
            </p>

            <div className="space-y-4 max-w-xl">
              {[
                { icon: Activity, title: "End-to-End Operations", desc: "Not just CRM or ERP fragments", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                { icon: Zap, title: "Faster Deployment", desc: "Weeks, not months vs traditional ERP", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                { icon: Settings, title: "Configurable Workflows", desc: "No heavy customization required", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border ${feature.border} ${feature.bg} backdrop-blur-sm`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${feature.color} bg-black/20 shrink-0`}>
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white/90">{feature.title}</h3>
                    <p className="text-sm text-white/50">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-medium"
            >
              <ShieldCheck size={16} />
              Proudly Made in India
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 p-8 lg:p-16 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-md glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden"
          >
            {/* Subtle gradient glow inside the card */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            <div className="flex flex-col items-center text-center mb-8 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 p-[1px] mb-6 shadow-lg shadow-orange-500/20">
                <div className="w-full h-full bg-zinc-900 rounded-2xl flex items-center justify-center">
                  <Shield className="text-amber-400" size={28} />
                </div>
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-2">Welcome Back</h3>
              <p className="text-white/50 text-sm">Sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5 relative z-10">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-white/70 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-white/70 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-12 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </a>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-5 h-5 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                ) : (
                  <>
                    Sign In to Dashboard <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center space-y-4 relative z-10">
              <p className="text-sm text-white/50">
                Don't have an account? <a href="#" className="text-white hover:underline font-medium">Sign up here</a>
              </p>
              <div className="h-px w-full bg-white/10" />
              <p className="text-sm text-white/50">
                Are you a client? <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">Sign in to Client Portal</a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
