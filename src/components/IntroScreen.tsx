// IntroScreen: Cinemática de apertura del juego
import { useGameStore } from '../store/gameStore';
import { motion } from 'framer-motion';

export function IntroScreen() {
  const { tempName, tempBackground, setScreen, addLog } = useGameStore();

  const startPlaying = () => {
    setScreen('playing');
    addLog('═══════════════════════════════════════', 'system');
    addLog('NEON ETERNUM: FRONTERA CUÁNTICA', 'system');
    addLog('═══════════════════════════════════════', 'system');
    addLog('', 'system');
    addLog('[CINEMÁTICA FINALIZADA]', 'system');
    addLog('', 'system');
    addLog('Te encuentras en un callejón oscuro del Distrito Bajo de Neokyoto. La lluvia ácida cae sobre los carteles de neón rotos. El olor a ozono y basura quemada llena el aire. A lo lejos, el zumbido de un dron de vigilancia de Helix.', 'narrative');
    addLog('', 'system');
    addLog('[Sonido de lluvia ácida golpeando metal. Un holograma publicitario parpadea: "HELIX CORP — CONSTRUYENDO TU FUTURO"]', 'narrative');
    addLog('', 'system');
    addLog('Al norte: La calle principal con más tráfico de drones.', 'narrative');
    addLog('Al sur: Un callejón más profundo, oscuro y peligroso.', 'narrative');
    addLog('Al este: La puerta trasera de un bar llamado "EL NEÓN ROJO".', 'narrative');
    addLog('Al oeste: Una escalera que desciende hacia las alcantarillas.', 'narrative');
    addLog('', 'system');
    addLog('Escribe AYUDA para ver los comandos disponibles.', 'system');
    addLog('', 'system');
    addLog('¿QUÉ HACES?', 'alert');
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative px-4 bg-black">
      <div className="rain-overlay" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-2xl text-center"
      >
        <div className="space-y-6 text-sm md:text-base text-gray-300 leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-cyan-400 tracking-widest text-xs mb-8"
          >
            [ CINEMÁTICA DE APERTURA ]
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            La lluvia cae sobre <span className="text-cyan-300">Neokyoto</span> como lágrimas de ácido.
            Los neones parpadean entre la niebla tóxica, proyectando sombras que se mueven con vida propia.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Tu nombre es <span className="text-fuchsia-400">{tempName}</span>. {tempBackground}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            Has llegado al <span className="text-cyan-300">Distrito Bajo</span> huyendo de tu pasado.
            La Corporación Helix controla cada átomo de este mundo, pero aquí, en las profundidades,
            todavía queda un resquicio de libertad.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            Tu único objetivo ahora: <span className="text-yellow-400">sobrevivir a la noche</span>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="text-xs text-gray-600 mt-8"
          >
            [ Los sistemas cuánticos del planeta emiten un pulso. Algo se agita en las ruinas alienígenas del sector 7... ]
          </motion.p>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={startPlaying}
          className="mt-8 menu-option text-cyan-300 tracking-widest"
        >
          [ COMENZAR ]
        </motion.button>
      </motion.div>
    </div>
  );
}
