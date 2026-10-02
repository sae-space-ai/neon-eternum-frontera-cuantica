// HUD: Muestra Salud, Energía, Escudo, Créditos, Nivel, Experiencia, Hora, Clima y Ubicación
import { useGameStore } from '../store/gameStore';
import { Heart, Zap, Shield, Coins, MapPin, Clock, CloudRain, Thermometer, Radio, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function HUD() {
  const { player, world } = useGameStore();

  if (!player) return null;

  const healthPercent = (player.health / player.maxHealth) * 100;
  const energyPercent = (player.energy / player.maxEnergy) * 100;
  const shieldPercent = (player.shield / player.maxShield) * 100;
  const xpPercent = (player.xp / player.xpToNext) * 100;

  const timeStr = `${String(world.hour).padStart(2, '0')}:${String(world.minute).padStart(2, '0')}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="hud-panel p-4 space-y-4 h-full overflow-y-auto"
    >
      {/* Header */}
      <div className="border-b border-cyan-900/50 pb-3">
        <div className="text-xs text-gray-500 tracking-widest">OPERADOR</div>
        <div className="text-cyan-300 font-bold text-lg">{player.name}</div>
        <div className="text-xs text-fuchsia-400">{player.playerClass}</div>
      </div>

      {/* Stats */}
      <div className="space-y-3">
        {/* Health */}
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-400" />
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">SALUD</span>
              <span className="text-red-400">{player.health}/{player.maxHealth}</span>
            </div>
            <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${healthPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Energy */}
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-blue-400" />
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">ENERGÍA</span>
              <span className="text-blue-400">{player.energy}/{player.maxEnergy}</span>
            </div>
            <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${energyPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Shield */}
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">ESCUDO</span>
              <span className="text-cyan-400">{player.shield}/{player.maxShield}</span>
            </div>
            <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${shieldPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* XP */}
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400" />
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">XP</span>
              <span className="text-yellow-400">{player.xp}/{player.xpToNext}</span>
            </div>
            <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${xpPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="border-t border-cyan-900/50 pt-3 space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <Star className="w-3 h-3 text-yellow-400" />
          <span className="text-gray-400">Nivel:</span>
          <span className="text-yellow-400 font-bold">{player.level}</span>
        </div>
        <div className="flex items-center gap-2">
          <Coins className="w-3 h-3 text-cyan-400" />
          <span className="text-gray-400">Créditos:</span>
          <span className="text-cyan-400 font-bold">{player.credits}¢</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3 text-fuchsia-400" />
          <span className="text-gray-400">Ubicación:</span>
          <span className="text-fuchsia-400 text-[10px]">{player.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 text-gray-400" />
          <span className="text-gray-400">Hora:</span>
          <span className="text-gray-300">{timeStr}</span>
        </div>
        <div className="flex items-center gap-2">
          <CloudRain className="w-3 h-3 text-blue-400" />
          <span className="text-gray-400">Clima:</span>
          <span className="text-gray-300 text-[10px]">{world.weather}</span>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer className="w-3 h-3 text-orange-400" />
          <span className="text-gray-400">Temp:</span>
          <span className="text-gray-300">{world.temperature}°C</span>
        </div>
        <div className="flex items-center gap-2">
          <Radio className="w-3 h-3 text-yellow-400" />
          <span className="text-gray-400">Radiación:</span>
          <span className="text-yellow-400">{world.radiation} mSv</span>
        </div>
      </div>

      {/* Quest */}
      <div className="border-t border-cyan-900/50 pt-3">
        <div className="text-xs text-gray-500 tracking-widest mb-1">MISIÓN ACTIVA</div>
        <div className="text-xs text-cyan-300 leading-tight">{player.quest}</div>
      </div>
    </motion.div>
  );
}
