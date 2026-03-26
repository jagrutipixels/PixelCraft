import { motion } from "motion/react";
import { Film, Play, Folder } from "lucide-react";

export function PixelCraft() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight mb-2">Pixel Craft IP</h2>
          <p className="text-white/50">Proprietary creative asset tracker and storytelling workflows.</p>
        </div>
        <button className="px-4 py-2 rounded-md bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Tech EV Launch Video", status: "In Production", progress: 65, type: "Video" },
          { title: "Savoir Studio Rebrand", status: "Review", progress: 90, type: "Brand" },
          { title: "Kaapad Summer Collection", status: "Pre-Production", progress: 15, type: "Campaign" },
        ].map((project, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-xl flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                {project.type === 'Video' ? <Film size={20} /> : <Folder size={20} />}
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-white/70">
                {project.status}
              </span>
            </div>
            <h3 className="text-lg font-medium mb-1">{project.title}</h3>
            <p className="text-sm text-white/50 mb-6">{project.type}</p>
            
            <div className="mt-auto">
              <div className="flex justify-between text-xs text-white/60 mb-2">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full" 
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
