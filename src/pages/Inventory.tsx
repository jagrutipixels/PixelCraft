import { motion } from "motion/react";
import { Package, AlertTriangle, TrendingUp } from "lucide-react";

export function Inventory() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight mb-2">Inventory & Dealers</h2>
          <p className="text-white/50">Tech EV scooter stock, parts, and dealer performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div className="glass-panel p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm text-white/50">Total Scooters</p>
            <p className="text-2xl font-semibold">1,248</p>
          </div>
        </motion.div>
        <motion.div className="glass-panel p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-sm text-white/50">Low Stock Alerts</p>
            <p className="text-2xl font-semibold">12 Parts</p>
          </div>
        </motion.div>
        <motion.div className="glass-panel p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-white/50">Top Dealer</p>
            <p className="text-xl font-semibold">Mumbai Central</p>
          </div>
        </motion.div>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 border-b border-white/10 text-white/60">
            <tr>
              <th className="px-6 py-4 font-medium">Model</th>
              <th className="px-6 py-4 font-medium">SKU</th>
              <th className="px-6 py-4 font-medium">In Stock</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              { model: "Tech EV Pro", sku: "TEV-PRO-BLK", stock: 142, status: "Healthy" },
              { model: "Tech EV Lite", sku: "TEV-LTE-WHT", stock: 18, status: "Low Stock" },
              { model: "Battery Pack V2", sku: "BP-V2-500", stock: 4, status: "Critical" },
            ].map((item, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-medium">{item.model}</td>
                <td className="px-6 py-4 text-white/50 font-mono">{item.sku}</td>
                <td className="px-6 py-4">{item.stock}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.status === 'Healthy' ? 'bg-emerald-500/20 text-emerald-400' :
                    item.status === 'Low Stock' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
