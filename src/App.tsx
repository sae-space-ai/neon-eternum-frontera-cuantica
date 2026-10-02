// App.tsx - Componente principal de NEON ETERNUM: FRONTERA CUÁNTICA
import { useGameStore } from './store/gameStore';
import { TitleScreen } from './components/TitleScreen';
import { MenuScreen } from './components/MenuScreen';
import { CharacterCreation } from './components/CharacterCreation';
import { IntroScreen } from './components/IntroScreen';
import { GameLayout } from './components/GameLayout';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const { screen } = useGameStore();

  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {screen === 'title' && (
          <motion.div
            key="title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TitleScreen />
          </motion.div>
        )}

        {screen === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MenuScreen />
          </motion.div>
        )}

        {screen === 'creation' && (
          <motion.div
            key="creation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CharacterCreation />
          </motion.div>
        )}

        {screen === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <IntroScreen />
          </motion.div>
        )}

        {screen === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GameLayout />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
