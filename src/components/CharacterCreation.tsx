// CharacterCreationScreen: Creación de personaje en 4 fases
import { useGameStore, CLASSES, BACKGROUNDS } from '../store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';

export function CharacterCreation() {
  const {
    creationStep, setCreationStep,
    tempName, setTempName,
    tempClass, setTempClass,
    tempBackground, setTempBackground,
    startGame, setScreen
  } = useGameStore();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative px-4 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0015] to-black" />
      <div className="rain-overlay" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <h2 className="text-xl neon-text tracking-widest text-center mb-4">
          CREACIÓN DE PERSONAJE
        </h2>
        <div className="text-xs text-gray-500 text-center mb-6">
          FASE {creationStep + 1}/4
        </div>

        <AnimatePresence mode="wait">
          {creationStep === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="hud-panel p-6 rounded"
            >
              <label className="text-cyan-400 text-sm tracking-widest block mb-4">
                NOMBRE DEL PERSONAJE:
              </label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full bg-black/50 border border-cyan-800 rounded px-4 py-2 text-cyan-300 focus:border-cyan-400 outline-none"
                placeholder="Introduce tu nombre..."
                maxLength={20}
                autoFocus
              />
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => setScreen('menu')}
                  className="menu-option text-gray-400 tracking-widest"
                >
                  ◂ ATRÁS
                </button>
                <button
                  onClick={() => { if (tempName.trim()) setCreationStep(1); }}
                  disabled={!tempName.trim()}
                  className="menu-option text-cyan-300 tracking-widest disabled:opacity-30"
                >
                  CONTINUAR ▸
                </button>
              </div>
            </motion.div>
          )}

          {creationStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="hud-panel p-6 rounded"
            >
              <label className="text-cyan-400 text-sm tracking-widest block mb-4">
                SELECCIONA TU CLASE:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CLASSES.map((cls) => (
                  <button
                    key={cls.name}
                    onClick={() => { setTempClass(cls.name); setCreationStep(2); }}
                    className={`p-3 rounded border text-left transition-all ${
                      tempClass === cls.name
                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                        : 'border-gray-700 hover:border-cyan-600 text-gray-300'
                    }`}
                  >
                    <div className="text-lg mb-1">{cls.icon} {cls.name}</div>
                    <div className="text-xs text-gray-500">{cls.desc}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {creationStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="hud-panel p-6 rounded"
            >
              <label className="text-cyan-400 text-sm tracking-widest block mb-4">
                SELECCIONA TU TRASFONDO:
              </label>
              <div className="flex flex-col gap-2">
                {BACKGROUNDS.map((bg, i) => (
                  <button
                    key={i}
                    onClick={() => { setTempBackground(bg); setCreationStep(3); }}
                    className={`p-3 rounded border text-left transition-all ${
                      tempBackground === bg
                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                        : 'border-gray-700 hover:border-cyan-600 text-gray-300'
                    }`}
                  >
                    <div className="text-sm">{bg}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {creationStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="hud-panel p-6 rounded"
            >
              <h3 className="text-cyan-400 text-sm tracking-widest mb-4">CONFIRMACIÓN:</h3>
              <div className="space-y-2 text-sm mb-6">
                <p><span className="text-gray-500">Nombre:</span> <span className="text-cyan-300">{tempName}</span></p>
                <p><span className="text-gray-500">Clase:</span> <span className="text-cyan-300">{tempClass}</span></p>
                <p><span className="text-gray-500">Trasfondo:</span> <span className="text-cyan-300">{tempBackground}</span></p>
                <p><span className="text-gray-500">Dificultad:</span> <span className="text-yellow-400">NORMAL</span></p>
                <p><span className="text-gray-500">Semilla:</span> <span className="text-gray-400">#{Math.floor(Math.random() * 999999)}</span></p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setCreationStep(2)} className="menu-option text-gray-400 tracking-widest">
                  ◂ ATRÁS
                </button>
                <button onClick={() => { startGame(); }} className="menu-option text-cyan-300 tracking-widest">
                  COMENZAR ▸
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
