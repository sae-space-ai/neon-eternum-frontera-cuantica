// Terminal: Área de texto donde se muestra la narrativa, resultados y diálogos
import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';

export function Terminal() {
  const { logs } = useGameStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al final
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogColor = (type: string) => {
    switch (type) {
      case 'system': return 'text-gray-500 text-xs';
      case 'dialog': return 'text-green-400 italic';
      case 'combat': return 'text-red-400';
      case 'action': return 'text-yellow-300';
      case 'loot': return 'text-fuchsia-400';
      case 'alert': return 'text-cyan-300 font-bold';
      case 'error': return 'text-red-500';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-black/60 border-b border-cyan-900/30">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-xs text-gray-500 ml-2 tracking-widest">TERMINAL // NEOKYOTO-NET</span>
      </div>

      {/* Terminal Content */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-0.5"
      >
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`leading-relaxed ${getLogColor(log.type)}`}
            >
              {log.text || '\u00A0'}
            </motion.div>
          ))}
        </AnimatePresence>

        {logs.length === 0 && (
          <div className="text-gray-600 text-sm italic">
            [Sistema iniciado. Esperando comandos...]
          </div>
        )}
      </div>
    </div>
  );
}
