// TitleScreen: Pantalla de título con efectos cyberpunk
import { useGameStore } from '../store/gameStore';
import { motion } from 'framer-motion';

export function TitleScreen() {
  const { setScreen } = useGameStore();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0020] to-black" />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, #0ff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #f0f 1px, transparent 1px)',
        backgroundSize: '60px 60px, 80px 80px'
      }} />

      {/* CRT Effects */}
      <div className="rain-overlay" />
      <div className="scanline-overlay" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center"
      >
        <div className="mb-4 text-sm tracking-[0.5em] text-cyan-400 opacity-60">
          UNREAL ENGINE 5.5 // 8K // 120FPS // RAY TRACING
        </div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="title-text mb-2 float-anim"
        >
          NEON ETERNUM
        </motion.h1>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-2xl md:text-3xl neon-pink tracking-[0.3em] mb-8"
        >
          FRONTERA CUÁNTICA
        </motion.h2>

        <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-8" />

        <p className="text-xs text-gray-500 tracking-widest mb-12">
          PLANETA KEPLER-186F // AÑO 2187 // CICLO 47
        </p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={() => setScreen('menu')}
          className="menu-option text-cyan-300 text-lg tracking-widest"
        >
          [ PULSA PARA CONTINUAR ]
        </motion.button>
      </motion.div>
    </div>
  );
}
