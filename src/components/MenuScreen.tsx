// MenuScreen: Menú principal del juego
import { useGameStore } from '../store/gameStore';
import { motion } from 'framer-motion';

export function MenuScreen() {
  const { setScreen, player } = useGameStore();

  const hasSave = player !== null;

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black" />
      <div className="rain-overlay" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-3xl neon-text tracking-[0.3em] mb-12">NEON ETERNUM</h1>

        <div className="flex flex-col gap-4 items-center">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setScreen('creation')}
            className="menu-option text-cyan-300 text-lg tracking-widest w-64"
          >
            ▸ NUEVA PARTIDA
          </motion.button>

          {hasSave && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setScreen('playing')}
              className="menu-option text-cyan-300 text-lg tracking-widest w-64"
            >
              ▸ CONTINUAR PARTIDA
            </motion.button>
          )}

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => alert('Opciones: Volumen, Gráficos, Accesibilidad...')}
            className="menu-option text-cyan-300 text-lg tracking-widest w-64"
          >
            ▸ OPCIONES
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => alert('NEON ETERNUM: FRONTERA CUÁNTICA\nDesarrollado por Quantum Dreams Studio\nMotor: Unreal Engine 5.5\nMundo: Kepler-186f\n© 2187')}
            className="menu-option text-cyan-300 text-lg tracking-widest w-64"
          >
            ▸ CRÉDITOS
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => window.close()}
            className="menu-option text-red-400 text-lg tracking-widest w-64"
          >
            ▸ SALIR
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
