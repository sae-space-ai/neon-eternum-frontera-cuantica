// Store global del juego usando Zustand con persistencia en localStorage
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ============ TIPOS ============
export type GameScreen = 'title' | 'menu' | 'creation' | 'intro' | 'playing';
export type LogType = 'narrative' | 'system' | 'dialog' | 'action' | 'combat' | 'loot' | 'alert' | 'error';
export type PlayerClass = 'MERCENARIO' | 'HACKER' | 'INGENIERO' | 'MÉDICO' | 'EXPLORADOR' | 'PSIÓNICO';

export interface GameLog {
  id: string;
  text: string;
  type: LogType;
  timestamp: number;
}

export interface Reputation {
  helix: number;
  resistance: number;
  voidCult: number;
  nomads: number;
  aiFree: number;
}

export interface PlayerState {
  name: string;
  playerClass: PlayerClass;
  background: string;
  level: number;
  xp: number;
  xpToNext: number;
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  shield: number;
  maxShield: number;
  credits: number;
  reputation: Reputation;
  inventory: string[];
  equipped: { weapon: string; armor: string; implant: string };
  skills: string[];
  cybernetics: string[];
  location: string;
  locationId: string;
  quest: string;
  questsCompleted: string[];
  alive: boolean;
}

export interface WorldState {
  hour: number;
  minute: number;
  weather: string;
  temperature: number;
  radiation: number;
  turnCount: number;
  actionCount: number;
}

// ============ DATOS DEL MUNDO ============
export const LOCATIONS: Record<string, {
  name: string;
  description: string;
  exits: Record<string, string>;
  danger: 'BAJO' | 'MEDIO' | 'ALTO' | 'EXTREMO';
  npcs: string[];
  loot: string[];
}> = {
  'callejon-inicio': {
    name: 'Callejón Oscuro - Distrito Bajo',
    description: 'Un callejón estrecho bañado por la lluvia ácida. Carteles de neón rotos parpadean débilmente. El suelo está cubierto de charcos que reflejan luces púrpuras y cyan. El olor a ozono y basura quemada satura el aire.',
    exits: { norte: 'calle-principal', sur: 'callejon-profundo', este: 'bar-neon-rojo', oeste: 'alcantarillas' },
    danger: 'MEDIO',
    npcs: ['Mendigo cibernético'],
    loot: ['Batería usada', 'Chip de memoria'],
  },
  'calle-principal': {
    name: 'Calle Principal - Distrito Bajo',
    description: 'La arteria principal del Distrito Bajo. Drones de vigilancia surcan el cielo. Vendedores ambulantes ofrecen mercancía dudosa bajo toldos holográficos. El ruido es ensordecedor.',
    exits: { sur: 'callejon-inicio', este: 'mercado-negro', oeste: 'plaza-helix', norte: 'distrito-medio' },
    danger: 'MEDIO',
    npcs: ['Vendedor Kael', 'Patrulla Helix'],
    loot: ['Ración de comida', 'Datos corporativos'],
  },
  'callejon-profundo': {
    name: 'Callejón Profundo - Distrito Bajo',
    description: 'La oscuridad te envuelve. Solo el parpadeo errático de un neón moribundo ilumina el camino. Goteo constante. Un gato cibernético te observa con ojos rojos.',
    exits: { norte: 'callejon-inicio', este: 'tunel-oculto' },
    danger: 'ALTO',
    npcs: ['Atracador', 'Gato cibernético'],
    loot: ['Medkit básico', 'Pistola de dardos', 'Fragmento de armadura'],
  },
  'bar-neon-rojo': {
    name: 'Bar "El Neón Rojo"',
    description: 'Un antro de mercenarios, hackers y desechos de la sociedad. Música synthwave suave. Humo sintético. Olor a licor de neón y sudor.',
    exits: { oeste: 'callejon-inicio' },
    danger: 'BAJO',
    npcs: ['Fantasma', 'Barman Zyx', 'Mercenario borracho'],
    loot: [],
  },
  'alcantarillas': {
    name: 'Alcantarillas del Distrito Bajo',
    description: 'Laberinto subterráneo. Bioluminiscencia azulada crece en las paredes. Eco de gotas. Algo se mueve en el agua oscura.',
    exits: { este: 'callejon-inicio', sur: 'tunel-minas' },
    danger: 'ALTO',
    npcs: ['Ratas mutantes', 'Terminal abandonado'],
    loot: ['Datos encriptados', 'Implante dañado'],
  },
  'mercado-negro': {
    name: 'Mercado Negro',
    description: 'Puestos ilegales bajo arcos holográficos. Mercancía robada, implantes de segunda mano, armas modificadas. El aire huele a plástico quemado.',
    exits: { oeste: 'calle-principal' },
    danger: 'MEDIO',
    npcs: ['Vendedor Rix', 'Técnica de implantes Mira'],
    loot: ['Implante de visión nocturna', 'Pistola láser MK-II'],
  },
  'plaza-helix': {
    name: 'Plaza Corporativa Helix',
    description: 'Espacio controlado por la Corporación Helix. Hologramas publicitarios gigantes. Seguridad armada. Cámaras por todas partes.',
    exits: { este: 'calle-principal' },
    danger: 'EXTREMO',
    npcs: ['Guardia Helix', 'Ejecutivo'],
    loot: [],
  },
  'tunel-oculto': {
    name: 'Túnel Oculto',
    description: 'Un pasadizo secreto cubierto de graffitis luminiscentes. Marcas de la Resistencia Sindical.',
    exits: { oeste: 'callejon-profundo' },
    danger: 'MEDIO',
    npcs: ['Contacto de la Resistencia'],
    loot: ['Chip de datos: Planos Helix', 'Tarjeta de acceso falsificada'],
  },
  'tunel-minas': {
    name: 'Túnel hacia las Minas',
    description: 'Pasadizo que desciende hacia las antiguas Minas Subterráneas. El aire se vuelve más denso.',
    exits: { norte: 'alcantarillas' },
    danger: 'ALTO',
    npcs: ['Mineros esclavos'],
    loot: ['Mineral raro', 'Herramienta de minería'],
  },
  'distrito-medio': {
    name: 'Distrito Medio',
    description: 'Zona de transición. Menos peligrosa que el Bajo, más que el Alto. Edificios corporativos medianos.',
    exits: { sur: 'calle-principal' },
    danger: 'MEDIO',
    npcs: ['Civiles', 'Patrulla Helix'],
    loot: [],
  },
};

export const CLASSES: { name: PlayerClass; desc: string; icon: string }[] = [
  { name: 'MERCENARIO', desc: 'Combate cuerpo a cuerpo y armas de fuego. +30% daño físico.', icon: '⚔️' },
  { name: 'HACKER', desc: 'Dominio de sistemas digitales y redes. +30% hackeo.', icon: '💻' },
  { name: 'INGENIERO', desc: 'Construcción, crafting y drones. +30% tecnología.', icon: '🔧' },
  { name: 'MÉDICO', desc: 'Curación y biotecnología. +30% supervivencia.', icon: '💉' },
  { name: 'EXPLORADOR', desc: 'Sigilo y reconocimiento. +30% movilidad.', icon: '🗺️' },
  { name: 'PSIÓNICO', desc: 'Magia tecnológica y poderes mentales. +30% energía.', icon: '🧠' },
];

export const BACKGROUNDS = [
  'Ex-soldado de la Corporación Helix, desertor con secretos.',
  'Hijo/a de las calles de Neokyoto, superviviente nato.',
  'Científico/a renegado/a del Proyecto Eternidad.',
  'Nómada cuántico/a, viajero/a entre dimensiones.',
  'Hacker de la Resistencia Sindical, activista digital.',
  'Restos de una IA liberada en cuerpo sintético.',
];

// ============ STORE ============
interface GameState {
  // Navegación
  screen: GameScreen;
  setScreen: (screen: GameScreen) => void;

  // Jugador
  player: PlayerState | null;
  setPlayer: (player: PlayerState | null) => void;
  updatePlayer: (updates: Partial<PlayerState>) => void;

  // Mundo
  world: WorldState;
  updateWorld: (updates: Partial<WorldState>) => void;
  advanceTime: (mins: number) => void;

  // Logs
  logs: GameLog[];
  addLog: (text: string, type: LogType) => void;
  clearLogs: () => void;

  // Creación de personaje
  tempName: string;
  tempClass: PlayerClass | '';
  tempBackground: string;
  creationStep: number;
  setTempName: (name: string) => void;
  setTempClass: (cls: PlayerClass) => void;
  setTempBackground: (bg: string) => void;
  setCreationStep: (step: number) => void;

  // Acciones del juego
  startGame: () => void;
  resetGame: () => void;
}

const initialWorld: WorldState = {
  hour: 21,
  minute: 47,
  weather: 'Lluvia ácida ligera',
  temperature: 18,
  radiation: 2,
  turnCount: 0,
  actionCount: 0,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Navegación
      screen: 'title',
      setScreen: (screen) => set({ screen }),

      // Jugador
      player: null,
      setPlayer: (player) => set({ player }),
      updatePlayer: (updates) => set((state) => ({
        player: state.player ? { ...state.player, ...updates } : null,
      })),

      // Mundo
      world: initialWorld,
      updateWorld: (updates) => set((state) => ({
        world: { ...state.world, ...updates },
      })),
      advanceTime: (mins) => set((state) => {
        const totalMins = state.world.minute + mins;
        const hoursToAdd = Math.floor(totalMins / 60);
        const newMinute = totalMins % 60;
        const newHour = (state.world.hour + hoursToAdd) % 24;
        return {
          world: { ...state.world, hour: newHour, minute: newMinute },
        };
      }),

      // Logs
      logs: [],
      addLog: (text, type) => set((state) => ({
        logs: [...state.logs, {
          id: `${Date.now()}-${Math.random()}`,
          text,
          type,
          timestamp: Date.now(),
        }],
      })),
      clearLogs: () => set({ logs: [] }),

      // Creación
      tempName: '',
      tempClass: '',
      tempBackground: '',
      creationStep: 0,
      setTempName: (name) => set({ tempName: name }),
      setTempClass: (cls) => set({ tempClass: cls }),
      setTempBackground: (bg) => set({ tempBackground: bg }),
      setCreationStep: (step) => set({ creationStep: step }),

      // Acciones
      startGame: () => {
        const { tempName, tempClass, tempBackground } = get();
        if (!tempName || !tempClass || !tempBackground) return;

        const newPlayer: PlayerState = {
          name: tempName,
          playerClass: tempClass as PlayerClass,
          background: tempBackground,
          level: 1,
          xp: 0,
          xpToNext: 100,
          health: 100,
          maxHealth: 100,
          energy: 100,
          maxEnergy: 100,
          shield: 0,
          maxShield: 50,
          credits: 500,
          reputation: { helix: 0, resistance: 0, voidCult: 0, nomads: 0, aiFree: 0 },
          inventory: ['Ración de comida sintética', 'Medkit básico', 'Navaja oxidada'],
          equipped: { weapon: 'Navaja oxidada', armor: 'Ropa civil desgastada', implant: 'Ninguno' },
          skills: ['Combate básico', 'Sigilo básico'],
          cybernetics: [],
          location: LOCATIONS['callejon-inicio'].name,
          locationId: 'callejon-inicio',
          quest: 'Sobrevivir a la noche en el Distrito Bajo.',
          questsCompleted: [],
          alive: true,
        };

        set({
          player: newPlayer,
          world: initialWorld,
          logs: [],
          screen: 'intro',
        });
      },

      resetGame: () => set({
        screen: 'title',
        player: null,
        world: initialWorld,
        logs: [],
        tempName: '',
        tempClass: '',
        tempBackground: '',
        creationStep: 0,
      }),
    }),
    {
      name: 'neon-eternum-save',
      partialize: (state) => ({
        player: state.player,
        world: state.world,
        logs: state.logs.slice(-100), // Solo últimos 100 logs
      }),
    }
  )
);
