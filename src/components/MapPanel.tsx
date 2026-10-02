// MapPanel: Minimapa visual/textual que muestra ubicación actual y puntos de interés
import { useGameStore, LOCATIONS } from '../store/gameStore';
import { Map, Navigation, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export function MapPanel() {
  const { player } = useGameStore();

  if (!player) return null;

  const currentLoc = LOCATIONS[player.locationId];
  if (!currentLoc) return null;

  const dangerColors = {
    'BAJO': 'text-green-400 border-green-800',
    'MEDIO': 'text-yellow-400 border-yellow-800',
    'ALTO': 'text-orange-400 border-orange-800',
    'EXTREMO': 'text-red-400 border-red-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="hud-panel p-3 space-y-3 h-full overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-cyan-900/50 pb-2">
        <Map className="w-4 h-4 text-cyan-400" />
        <span className="text-xs text-cyan-400 tracking-widest">MINIMAPA</span>
      </div>

      {/* Current Location */}
      <div className="space-y-1">
        <div className="text-[10px] text-gray-500 tracking-widest">POSICIÓN ACTUAL</div>
        <div className="text-xs text-cyan-300 font-bold">{currentLoc.name}</div>
        <div className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border ${dangerColors[currentLoc.danger]}`}>
          <AlertTriangle className="w-2.5 h-2.5" />
          <span>Peligro: {currentLoc.danger}</span>
        </div>
      </div>

      {/* Mini Map Visual */}
      <div className="relative bg-black/50 border border-cyan-900/30 rounded p-2 aspect-square max-w-[160px] mx-auto">
        {/* Grid */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5 opacity-20">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border border-cyan-900/50" />
          ))}
        </div>

        {/* Center marker (current) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" />

        {/* Exits */}
        {currentLoc.exits.norte && (
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-gray-600 rounded" />
        )}
        {currentLoc.exits.sur && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-gray-600 rounded" />
        )}
        {currentLoc.exits.este && (
          <div className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-1.5 bg-gray-600 rounded" />
        )}
        {currentLoc.exits.oeste && (
          <div className="absolute left-1 top-1/2 -translate-y-1/2 w-3 h-1.5 bg-gray-600 rounded" />
        )}

        {/* Direction labels */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[8px] text-gray-600">N</div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[8px] text-gray-600">S</div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[8px] text-gray-600">E</div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[8px] text-gray-600">O</div>
      </div>

      {/* Exits List */}
      <div className="space-y-1">
        <div className="text-[10px] text-gray-500 tracking-widest flex items-center gap-1">
          <Navigation className="w-2.5 h-2.5" />
          SALIDAS
        </div>
        {Object.entries(currentLoc.exits).map(([dir, id]) => {
          const target = LOCATIONS[id];
          return (
            <div key={dir} className="text-[10px] flex items-center gap-1">
              <span className="text-cyan-500 uppercase w-4">{dir[0]}</span>
              <span className="text-gray-400 truncate">{target?.name || id}</span>
            </div>
          );
        })}
      </div>

      {/* NPCs */}
      {currentLoc.npcs.length > 0 && (
        <div className="space-y-1 border-t border-cyan-900/50 pt-2">
          <div className="text-[10px] text-gray-500 tracking-widest">NPCs</div>
          {currentLoc.npcs.map((npc, i) => (
            <div key={i} className="text-[10px] text-green-400">• {npc}</div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
