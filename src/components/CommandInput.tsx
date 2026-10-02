// CommandInput: Campo de texto donde el jugador escribe comandos
import { useState, useRef, useEffect } from 'react';
import { useGameEngine } from '../hooks/useGameEngine';
import { useGameStore } from '../store/gameStore';
import { Send, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const COMMANDS = [
  'mover norte', 'mover sur', 'mover este', 'mover oeste',
  'examinar', 'hablar', 'atacar', 'usar', 'hackear',
  'recoger', 'descansar', 'comprar', 'guardar', 'salir',
  'inventario', 'mapa', 'estado', 'misiones', 'habilidades',
  'facciones', 'cibernéticos', 'ayuda',
];

export function CommandInput() {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { processCommand } = useGameEngine();
  const { addLog, screen } = useGameStore();

  // Focus automático
  useEffect(() => {
    if (screen === 'playing') {
      inputRef.current?.focus();
    }
  }, [screen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);

    // Autocompletado
    if (val.length > 0) {
      const matches = COMMANDS.filter(cmd =>
        cmd.toLowerCase().startsWith(val.toLowerCase())
      );
      setSuggestions(matches.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = () => {
    if (!value.trim()) return;

    addLog(`> ${value}`, 'action');
    processCommand(value);
    setHistory(prev => [value, ...prev].slice(0, 20));
    setHistoryIndex(-1);
    setValue('');
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(newIndex);
        setValue(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setValue(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setValue('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setValue(suggestions[0]);
        setSuggestions([]);
      }
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setValue(suggestion);
    setSuggestions([]);
    inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-t border-cyan-900/50 bg-black/90"
    >
      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="px-4 pt-2 flex gap-2 flex-wrap">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => selectSuggestion(s)}
              className="text-[10px] text-cyan-400 border border-cyan-800/50 px-2 py-0.5 rounded hover:bg-cyan-900/30 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-3">
        <Terminal className="w-4 h-4 text-cyan-500 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-cyan-300 font-mono text-sm placeholder:text-gray-600"
          placeholder="Escribe un comando... (AYUDA para ver opciones)"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className="flex items-center gap-1 px-3 py-1 bg-cyan-900/30 border border-cyan-700 rounded text-cyan-400 text-xs hover:bg-cyan-800/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <Send className="w-3 h-3" />
          <span className="hidden sm:inline">ENVIAR</span>
        </button>
      </div>

      {/* Quick Commands */}
      <div className="px-4 pb-2 flex gap-1.5 flex-wrap">
        {['NORTE', 'SUR', 'ESTE', 'OESTE', 'EXAMINAR', 'MAPA', 'INV', 'AYUDA'].map(cmd => (
          <button
            key={cmd}
            onClick={() => {
              addLog(`> ${cmd.toLowerCase()}`, 'action');
              processCommand(cmd.toLowerCase());
            }}
            className="text-[9px] text-gray-500 border border-gray-800/50 px-1.5 py-0.5 rounded hover:border-cyan-700 hover:text-cyan-400 transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
