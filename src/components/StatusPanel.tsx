// StatusPanel: Muestra el estado de las facciones, reputación y misiones activas
import { useGameStore } from '../store/gameStore';
import { Users, Target, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export function StatusPanel() {
  const { player } = useGameStore();

  if (!player) return null;

  const factions = [
    { name: 'Helix', value: player.reputation.helix, color: 'bg-red-500' },
    { name: 'Resistencia', value: player.reputation.resistance, color: 'bg-green-500' },
    { name: 'Culto Vacío', value: player.reputation.voidCult, color: 'bg-purple-500' },
    { name: 'Nómadas', value: player.reputation.nomads, color: 'bg-blue-500' },
    { name: 'IA Libre', value: player.reputation.aiFree, color: 'bg-cyan-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="hud-panel p-3 space-y-3 h-full overflow-y-auto"
    >
      {/* Factions */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 border-b border-cyan-900/50 pb-2">
          <Users className="w-4 h-4 text-cyan-400" />
          <span className="text-xs text-cyan-400 tracking-widest">FACCIONES</span>
        </div>
        <div className="space-y-1.5">
          {factions.map((faction) => (
            <div key={faction.name} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${faction.color}`} />
              <span className="text-[10px] text-gray-400 flex-1 truncate">{faction.name}</span>
              <span className={`text-[10px] font-bold ${
                faction.value > 0 ? 'text-green-400' :
                faction.value < 0 ? 'text-red-400' : 'text-gray-500'
              }`}>
                {faction.value > 0 ? '+' : ''}{faction.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quest */}
      <div className="space-y-2 border-t border-cyan-900/50 pt-2">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-cyan-400" />
          <span className="text-xs text-cyan-400 tracking-widest">MISIÓN</span>
        </div>
        <div className="text-[10px] text-cyan-300 leading-tight">
          {player.quest}
        </div>
      </div>

      {/* Completed */}
      {player.questsCompleted.length > 0 && (
        <div className="space-y-1 border-t border-cyan-900/50 pt-2">
          <div className="flex items-center gap-2">
            <Award className="w-3 h-3 text-yellow-400" />
            <span className="text-[10px] text-gray-500 tracking-widest">COMPLETADAS</span>
          </div>
          {player.questsCompleted.map((q, i) => (
            <div key={i} className="text-[10px] text-gray-500 truncate">✓ {q}</div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
