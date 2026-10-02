// InventoryPanel: Muestra objetos equipados, mochila, peso y créditos
import { useGameStore } from '../store/gameStore';
import { Package, Sword, Shield, Cpu, Coins } from 'lucide-react';
import { motion } from 'framer-motion';

export function InventoryPanel() {
  const { player } = useGameStore();

  if (!player) return null;

  const weight = player.inventory.length * 2;
  const maxWeight = 50 + player.level * 5;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="hud-panel p-3 space-y-3 h-full overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-cyan-900/50 pb-2">
        <Package className="w-4 h-4 text-cyan-400" />
        <span className="text-xs text-cyan-400 tracking-widest">INVENTARIO</span>
      </div>

      {/* Equipped */}
      <div className="space-y-2">
        <div className="text-[10px] text-gray-500 tracking-widest">EQUIPADO</div>
        <div className="flex items-center gap-2 text-xs">
          <Sword className="w-3 h-3 text-red-400" />
          <span className="text-gray-300 truncate">{player.equipped.weapon}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Shield className="w-3 h-3 text-blue-400" />
          <span className="text-gray-300 truncate">{player.equipped.armor}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Cpu className="w-3 h-3 text-fuchsia-400" />
          <span className="text-gray-300 truncate">{player.equipped.implant}</span>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-1">
        <div className="text-[10px] text-gray-500 tracking-widest">MOCHILA</div>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {player.inventory.length === 0 ? (
            <div className="text-xs text-gray-600 italic">(Vacía)</div>
          ) : (
            player.inventory.map((item, i) => (
              <div key={i} className="text-xs text-gray-400 hover:text-cyan-300 cursor-default truncate">
                • {item}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Weight & Credits */}
      <div className="border-t border-cyan-900/50 pt-2 space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Peso:</span>
          <span className="text-gray-300">{weight}/{maxWeight} kg</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <Coins className="w-3 h-3 text-cyan-400" />
          <span className="text-cyan-400 font-bold">{player.credits}¢</span>
        </div>
      </div>
    </motion.div>
  );
}
