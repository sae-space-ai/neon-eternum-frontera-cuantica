// GameLayout: Estructura principal de la pantalla del juego
import { HUD } from './HUD';
import { Terminal } from './Terminal';
import { CommandInput } from './CommandInput';
import { InventoryPanel } from './InventoryPanel';
import { MapPanel } from './MapPanel';
import { StatusPanel } from './StatusPanel';
import { motion } from 'framer-motion';

export function GameLayout() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen w-screen flex flex-col bg-black overflow-hidden relative"
    >
      {/* CRT Effects */}
      <div className="rain-overlay pointer-events-none" />
      <div className="scanline-overlay pointer-events-none" />

      {/* Main Layout: 3 columns */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: HUD */}
        <div className="w-64 flex-shrink-0 border-r border-cyan-900/30 overflow-hidden hidden md:flex md:flex-col">
          <HUD />
        </div>

        {/* Center Panel: Terminal + Input */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile HUD (only on small screens) */}
          <div className="md:hidden border-b border-cyan-900/30">
            <MobileHUD />
          </div>

          {/* Terminal */}
          <div className="flex-1 overflow-hidden">
            <Terminal />
          </div>

          {/* Command Input */}
          <CommandInput />
        </div>

        {/* Right Panel: Inventory, Map, Status */}
        <div className="w-56 flex-shrink-0 border-l border-cyan-900/30 overflow-hidden hidden lg:flex lg:flex-col divide-y divide-cyan-900/30">
          <div className="flex-1 overflow-hidden">
            <InventoryPanel />
          </div>
          <div className="flex-1 overflow-hidden">
            <MapPanel />
          </div>
          <div className="flex-1 overflow-hidden">
            <StatusPanel />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Mobile HUD compacto
function MobileHUD() {
  const { player, world } = useGameStore();
  if (!player) return null;

  const healthPercent = (player.health / player.maxHealth) * 100;
  const energyPercent = (player.energy / player.maxEnergy) * 100;
  const timeStr = `${String(world.hour).padStart(2, '0')}:${String(world.minute).padStart(2, '0')}`;

  return (
    <div className="px-3 py-2 bg-black/80 space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-cyan-300 font-bold">{player.name}</span>
        <span className="text-gray-400">LVL {player.level} | {player.credits}¢</span>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 rounded-full" style={{ width: `${healthPercent}%` }} />
          </div>
          <div className="text-[9px] text-red-400 mt-0.5">{player.health}HP</div>
        </div>
        <div className="flex-1">
          <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${energyPercent}%` }} />
          </div>
          <div className="text-[9px] text-blue-400 mt-0.5">{player.energy}EN</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-[10px] text-gray-500">
        <span>📍 {player.location}</span>
        <span>🕐 {timeStr}</span>
      </div>
    </div>
  );
}

// Import necesario para MobileHUD
import { useGameStore } from '../store/gameStore';
