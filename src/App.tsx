import { useState, useEffect, useRef, useCallback } from 'react';

// ============ GAME STATE TYPES ============
interface PlayerState {
  name: string;
  class: string;
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
  reputation: { helix: number; resistance: number; void_cult: number; nomads: number; ai_free: number };
  inventory: string[];
  equipped: { weapon: string; armor: string; implant: string };
  skills: string[];
  cybernetics: string[];
  location: string;
  quest: string;
  alive: boolean;
}

interface GameLog {
  text: string;
  type: 'narrative' | 'system' | 'dialog' | 'action' | 'combat' | 'loot' | 'alert';
}

type GameScreen = 'title' | 'menu' | 'character_creation' | 'intro' | 'playing';

// ============ GAME DATA ============
const CLASSES = [
  { name: 'MERCENARIO', desc: 'Combate cuerpo a cuerpo y armas de fuego. +30% daño físico.', icon: '⚔️' },
  { name: 'HACKER', desc: 'Dominio de sistemas digitales y redes. +30% hackeo.', icon: '💻' },
  { name: 'INGENIERO', desc: 'Construcción, crafting y drones. +30% tecnología.', icon: '🔧' },
  { name: 'MÉDICO', desc: 'Curación y biotecnología. +30% supervivencia.', icon: '💉' },
  { name: 'EXPLORADOR', desc: 'Sigilo y reconocimiento. +30% movilidad.', icon: '🗺️' },
  { name: 'PSIÓNICO', desc: 'Magia tecnológica y poderes mentales. +30% energía.', icon: '🧠' },
];

const BACKGROUNDS = [
  'Ex-soldado de la Corporación Helix, desertor con secretos.',
  'Hijo/a de las calles de Neokyoto, superviviente nato.',
  'Científico/a renegado/a del Proyecto Eternidad.',
  'Nómada cuántico/a, viajero/a entre dimensiones.',
  'Hacker de la Resistencia Sindical, activista digital.',
  'Restos de una IA liberada en cuerpo sintético.',
];

const INITIAL_QUESTS = [
  'Sobrevivir a la noche en el Distrito Bajo.',
  'Encontrar refugio antes de la tormenta ácida.',
  'Contactar con el informante "Fantasma" en el Bar Neón.',
];

// ============ MAIN APP ============
export default function App() {
  const [screen, setScreen] = useState<GameScreen>('title');
  const [gameLogs, setGameLogs] = useState<GameLog[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [player, setPlayer] = useState<PlayerState | null>(null);
  const [creationStep, setCreationStep] = useState(0);
  const [tempName, setTempName] = useState('');
  const [tempClass, setTempClass] = useState('');
  const [tempBackground, setTempBackground] = useState('');
  const [hour, setHour] = useState(21);
  const [minute, setMinute] = useState(47);
  const [weather] = useState('Lluvia ácida ligera');
  const [temperature] = useState(18);
  const [radiation] = useState(2);
  const logEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [gameLogs]);

  // Focus input when playing
  useEffect(() => {
    if (screen === 'playing') {
      inputRef.current?.focus();
    }
  }, [screen]);

  // Check for level up when player XP changes
  useEffect(() => {
    if (!player) return;
    if (player.xp >= player.xpToNext) {
      addLog('[¡SUBIDA DE NIVEL!]', 'system');
      addLog(`[Nivel ${player.level} → Nivel ${player.level + 1}]`, 'system');
      addLog('[+10 Salud máxima] [+5 Energía máxima] [+1 punto de habilidad]', 'system');
      setPlayer(prev => prev ? {
        ...prev,
        level: prev.level + 1,
        xp: prev.xp - prev.xpToNext,
        xpToNext: Math.floor(prev.xpToNext * 1.5),
        maxHealth: prev.maxHealth + 10,
        health: prev.health + 10,
        maxEnergy: prev.maxEnergy + 5,
        energy: prev.energy + 5,
      } : null);
    }
  }, [player?.xp]);

  const addLog = useCallback((text: string, type: GameLog['type'] = 'narrative') => {
    setGameLogs(prev => [...prev, { text, type }]);
  }, []);

  const advanceTime = useCallback((mins: number = 5) => {
    setMinute(prev => {
      const newMin = prev + mins;
      if (newMin >= 60) {
        setHour(h => (h + Math.floor(newMin / 60)) % 24);
        return newMin % 60;
      }
      return newMin;
    });
  }, []);

  // ============ TITLE SCREEN ============
  const renderTitle = () => (
    <div className="flex flex-col items-center justify-center h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0020] to-black" />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, #0ff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #f0f 1px, transparent 1px)',
        backgroundSize: '60px 60px, 80px 80px'
      }} />
      <div className="relative z-10 text-center">
        <div className="mb-4 text-sm tracking-[0.5em] text-cyan-400 opacity-60">UNREAL ENGINE 5.5 // 8K // 120FPS // RAY TRACING</div>
        <h1 className="title-text mb-2 float-anim">NEON ETERNUM</h1>
        <h2 className="text-2xl md:text-3xl neon-pink tracking-[0.3em] mb-8">FRONTERA CUÁNTICA</h2>
        <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-8" />
        <p className="text-xs text-gray-500 tracking-widest mb-12">PLANETA KEPLER-186F // AÑO 2187 // CICLO 47</p>
        <button
          onClick={() => setScreen('menu')}
          className="menu-option text-cyan-300 text-lg tracking-widest"
        >
          [ PULSA PARA CONTINUAR ]
        </button>
      </div>
      <div className="rain-overlay" />
      <div className="scanline-overlay" />
    </div>
  );

  // ============ MAIN MENU ============
  const renderMenu = () => (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black" />
      <div className="relative z-10 text-center">
        <h1 className="text-3xl neon-text tracking-[0.3em] mb-12">NEON ETERNUM</h1>
        <div className="flex flex-col gap-4 items-center">
          <button onClick={() => { setScreen('character_creation'); setCreationStep(0); }}
            className="menu-option text-cyan-300 text-lg tracking-widest w-64">
            ▸ NUEVA PARTIDA
          </button>
          <button onClick={() => addLog('No hay partidas guardadas.', 'system')}
            className="menu-option text-cyan-300 text-lg tracking-widest w-64">
            ▸ CARGAR PARTIDA
          </button>
          <button onClick={() => addLog('Opciones: Volumen, Gráficos, Accesibilidad...', 'system')}
            className="menu-option text-cyan-300 text-lg tracking-widest w-64">
            ▸ OPCIONES
          </button>
          <button onClick={() => {
            setGameLogs([{ text: 'NEON ETERNUM: FRONTERA CUÁNTICA — Desarrollado por Quantum Dreams Studio. Motor: Unreal Engine 5.5. Mundo: Kepler-186f. Todos los derechos reservados 2187.', type: 'system' }]);
          }}
            className="menu-option text-cyan-300 text-lg tracking-widest w-64">
            ▸ CRÉDITOS
          </button>
          <button onClick={() => setScreen('title')}
            className="menu-option text-red-400 text-lg tracking-widest w-64">
            ▸ SALIR
          </button>
        </div>
        {gameLogs.length > 0 && (
          <div className="mt-8 text-sm text-gray-500 max-w-md">
            {gameLogs[gameLogs.length - 1].text}
          </div>
        )}
      </div>
      <div className="rain-overlay" />
    </div>
  );

  // ============ CHARACTER CREATION ============
  const renderCharacterCreation = () => (
    <div className="flex flex-col items-center justify-center h-screen relative px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0015] to-black" />
      <div className="relative z-10 w-full max-w-2xl">
        <h2 className="text-xl neon-text tracking-widest text-center mb-8">CREACIÓN DE PERSONAJE</h2>
        <div className="text-xs text-gray-500 text-center mb-6">FASE {creationStep + 1}/4</div>

        {creationStep === 0 && (
          <div className="hud-panel p-6 rounded">
            <label className="text-cyan-400 text-sm tracking-widest block mb-4">NOMBRE DEL PERSONAJE:</label>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full bg-black/50 border border-cyan-800 rounded px-4 py-2 text-cyan-300 focus:border-cyan-400 outline-none"
              placeholder="Introduce tu nombre..."
              maxLength={20}
              autoFocus
            />
            <button
              onClick={() => { if (tempName.trim()) setCreationStep(1); }}
              className="mt-4 menu-option text-cyan-300 tracking-widest"
            >
              CONTINUAR ▸
            </button>
          </div>
        )}

        {creationStep === 1 && (
          <div className="hud-panel p-6 rounded">
            <label className="text-cyan-400 text-sm tracking-widest block mb-4">SELECCIONA TU CLASE:</label>
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
          </div>
        )}

        {creationStep === 2 && (
          <div className="hud-panel p-6 rounded">
            <label className="text-cyan-400 text-sm tracking-widest block mb-4">SELECCIONA TU TRASFONDO:</label>
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
          </div>
        )}

        {creationStep === 3 && (
          <div className="hud-panel p-6 rounded">
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
              <button onClick={() => startGame()} className="menu-option text-cyan-300 tracking-widest">
                COMENZAR ▸
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="rain-overlay" />
    </div>
  );

  // ============ START GAME ============
  const startGame = () => {
    const newPlayer: PlayerState = {
      name: tempName,
      class: tempClass,
      background: tempBackground,
      level: 1,
      xp: 0,
      xpToNext: 100,
      health: 100,
      maxHealth: 100,
      energy: 80,
      maxEnergy: 80,
      shield: 0,
      maxShield: 50,
      credits: 500,
      reputation: { helix: 0, resistance: 0, void_cult: 0, nomads: 0, ai_free: 0 },
      inventory: ['Ración de comida sintética', 'Medkit básico', 'Navaja oxidada'],
      equipped: { weapon: 'Navaja oxidada', armor: 'Ropa civil desgastada', implant: 'Ninguno' },
      skills: ['Combate básico', 'Sigilo básico'],
      cybernetics: [],
      location: 'Distrito Bajo de Neokyoto',
      quest: INITIAL_QUESTS[0],
      alive: true,
    };
    setPlayer(newPlayer);
    setScreen('intro');
  };

  // ============ INTRO CINEMATIC ============
  const renderIntro = () => (
    <div className="flex flex-col items-center justify-center h-screen relative px-4">
      <div className="absolute inset-0 bg-black" />
      <div className="relative z-10 max-w-2xl text-center">
        <div className="space-y-6 text-sm md:text-base text-gray-300 leading-relaxed">
          <p className="text-cyan-400 tracking-widest text-xs mb-8">[ CINEMÁTICA DE APERTURA ]</p>
          <p>La lluvia cae sobre <span className="text-cyan-300">Neokyoto</span> como lágrimas de ácido. Los neones parpadean entre la niebla tóxica, proyectando sombras que se mueven con vida propia.</p>
          <p>Tu nombre es <span className="text-fuchsia-400">{tempName}</span>. {tempBackground}</p>
          <p>Has llegado al <span className="text-cyan-300">Distrito Bajo</span> huyendo de tu pasado. La Corporación Helix controla cada átomo de este mundo, pero aquí, en las profundidades, todavía queda un resquicio de libertad.</p>
          <p>Tu único objetivo ahora: <span className="text-yellow-400">sobrevivir a la noche</span>.</p>
          <p className="text-xs text-gray-600 mt-8">[ Los sistemas cuánticos del planeta emiten un pulso. Algo se agita en las ruinas alienígenas del sector 7... ]</p>
        </div>
        <button
          onClick={() => {
            setScreen('playing');
            addLog('═══════════════════════════════════════', 'system');
            addLog('NEON ETERNUM: FRONTERA CUÁNTICA', 'system');
            addLog('═══════════════════════════════════════', 'system');
            addLog('', 'system');
            addLog(`[CINEMÁTICA FINALIZADA]`, 'system');
            addLog('', 'system');
            addLog(`Te encuentras en un callejón oscuro del Distrito Bajo de Neokyoto. La lluvia ácida cae sobre los carteles de neón rotos. El olor a ozono y basura quemada llena el aire. A lo lejos, el zumbido de un dron de vigilancia de Helix. El suelo está cubierto de charcos que reflejan luces púrpuras y cyan.`, 'narrative');
            addLog('', 'system');
            addLog(`[Sonido de lluvia ácida golpeando metal. Un holograma publicitario parpadea: "HELIX CORP — CONSTRUYENDO TU FUTURO"]`, 'narrative');
            addLog('', 'system');
            addLog('Al norte: La calle principal con más tráfico de drones.', 'narrative');
            addLog('Al sur: Un callejón más profundo, oscuro y peligroso.', 'narrative');
            addLog('Al este: La puerta trasera de un bar llamado "EL NEÓN ROJO".', 'narrative');
            addLog('Al oeste: Una escalera que desciende hacia las alcantarillas.', 'narrative');
            addLog('', 'system');
            addLog('¿QUÉ HACES?', 'alert');
          }}
          className="mt-8 menu-option text-cyan-300 tracking-widest"
        >
          [ COMENZAR ]
        </button>
      </div>
    </div>
  );

  // ============ GAME PROCESSOR ============
  const processCommand = (cmd: string) => {
    if (!player) return;
    const command = cmd.toLowerCase().trim();
    advanceTime(3);

    // Random events
    if (Math.random() < 0.15) {
      const events = [
        '[Un dron de Helix pasa sobrevolando. Sus sensores te escanean brevemente.]',
        '[Escuchas disparos a lo lejos. Alguien no sobrevivió a la noche.]',
        '[Un holograma de propaganda parpadea: "HELIX CORP BUSCA DISIDENTES. RECOMPENSA: 10.000 CRÉDITOS."]',
        '[El suelo vibra. Algo grande se mueve bajo las alcantarillas.]',
        '[Un mendigo cibernético te mira con su único ojo orgánico. "Cuidado con los del Vacío..." susurra.]',
        '[Una ráfaga de viento ácido trae el olor de la selva bioluminiscente del sector 5.]',
      ];
      addLog(events[Math.floor(Math.random() * events.length)], 'narrative');
    }

    // Command processing
    if (command === 'salir' || command === 'exit') {
      addLog('[PARTIDA GUARDADA AUTOMÁTICAMENTE]', 'system');
      addLog('Volviendo al menú principal...', 'system');
      setTimeout(() => { setScreen('menu'); setGameLogs([]); }, 1500);
      return;
    }

    if (command === 'inventario' || command === 'inv') {
      addLog('═══ INVENTARIO ═══', 'system');
      player.inventory.forEach(item => addLog(`  • ${item}`, 'loot'));
      addLog(`  Créditos: ${player.credits}`, 'loot');
      addLog(`  Peso: ${player.inventory.length * 2}/${50 + player.level * 5} kg`, 'system');
      return;
    }

    if (command === 'estado' || command === 'status') {
      addLog('═══ ESTADO DEL PERSONAJE ═══', 'system');
      addLog(`  Nombre: ${player.name} [${player.class}]`, 'system');
      addLog(`  Nivel: ${player.level} | XP: ${player.xp}/${player.xpToNext}`, 'system');
      addLog(`  Salud: ${player.health}/${player.maxHealth}`, 'combat');
      addLog(`  Energía: ${player.energy}/${player.maxEnergy}`, 'system');
      addLog(`  Escudo: ${player.shield}/${player.maxShield}`, 'system');
      addLog(`  Créditos: ${player.credits}`, 'loot');
      addLog(`  Ubicación: ${player.location}`, 'narrative');
      addLog(`  Misión: ${player.quest}`, 'alert');
      return;
    }

    if (command === 'habilidades' || command === 'skills') {
      addLog('═══ HABILIDADES ═══', 'system');
      player.skills.forEach(s => addLog(`  ★ ${s}`, 'system'));
      addLog(`  Puntos disponibles: ${player.level}`, 'system');
      return;
    }

    if (command === 'misiones' || command === 'diario' || command === 'quest') {
      addLog('═══ MISIONES ACTIVAS ═══', 'system');
      addLog(`  ▸ ${player.quest}`, 'alert');
      addLog('', 'system');
      addLog('═══ MISIONES COMPLETADAS ═══', 'system');
      addLog('  (Ninguna aún)', 'system');
      return;
    }

    if (command === 'mapa') {
      addLog('═══ MAPA: DISTRITO BAJO DE NEOKYOTO ═══', 'system');
      addLog('  [N] Calle Principal — Tráfico de drones, puestos ilegales', 'narrative');
      addLog('  [S] Callejón Profundo — Peligroso, posible loot', 'narrative');
      addLog('  [E] Bar "El Neón Rojo" — NPC: "Fantasma" (informante)', 'narrative');
      addLog('  [O] Escaleras a Alcantarillas — Zona desconocida', 'narrative');
      addLog('', 'system');
      addLog('  [Zona general] Distrito Bajo — Nivel de peligro: MEDIO', 'alert');
      return;
    }

    if (command.includes('norte') || command.includes('avanzar') || command === 'n') {
      addLog('Caminas hacia la calle principal. Los drones de vigilancia zumban sobre tu cabeza.', 'narrative');
      addLog('[Sonido de motores de drones. Voces de vendedores ambulantes. Música electrónica lejana.]', 'narrative');
      addLog('Ves un puesto de armas ilegales regentado por un hombre con brazo robótico. Más adelante, un grupo de matones de Helix patrulla.', 'narrative');
      addLog('', 'system');
      addLog('NPCs presentes: Vendedor Kael (puesto de armas), Patrulla Helix (3 soldados).', 'narrative');
      setPlayer(prev => prev ? { ...prev, location: 'Calle Principal - Distrito Bajo' } : null);
      addLog('', 'system');
      addLog('¿QUÉ HACES?', 'alert');
      return;
    }

    if (command.includes('sur') || command.includes('retroceder') || command === 's') {
      addLog('Te adentras en el callejón profundo. La oscuridad te envuelve. Solo el parpadeo de un neón roto ilumina el camino.', 'narrative');
      addLog('[Goteo de agua. Un gato cibernético maúlla. Olor a descomposición.]', 'narrative');
      if (Math.random() < 0.4) {
        addLog('[¡ALERTA!] ¡Una figura emerge de las sombras! Un atracador con implantes de combate te apunta con una pistola láser.', 'combat');
        addLog('', 'system');
        addLog('ATACAR / ESQUIVAR / HABLAR / HUIR', 'alert');
        setPlayer(prev => prev ? { ...prev, location: 'Callejón Profundo - Distrito Bajo' } : null);
      } else {
        addLog('Encuentras un cajón volcado. Dentro hay algunos objetos útiles.', 'narrative');
        addLog('[+1 Medkit básico encontrado] [+45 créditos encontrados]', 'loot');
        setPlayer(prev => prev ? {
          ...prev,
          credits: prev.credits + 45,
          inventory: [...prev.inventory, 'Medkit básico'],
          location: 'Callejón Profundo - Distrito Bajo'
        } : null);
        addLog('', 'system');
        addLog('¿QUÉ HACES?', 'alert');
      }
      return;
    }

    if (command.includes('este') || command.includes('bar') || command === 'e') {
      addLog('Entras por la puerta trasera del Bar "El Neón Rojo". El aire está cargado de humo sintético y bajos de música ambient.', 'narrative');
      addLog('[Música synthwave suave. Vasos chocando. Murmullos. Olor a licor de neón.]', 'narrative');
      addLog('El bar es un antro de mercenarios, hackers y desechos de la sociedad. En una esquina, una figura encapuchada te hace señas discretamente. Es "Fantasma", tu contacto.', 'narrative');
      addLog('', 'system');
      addLog('"Fantasma" dice: "Así que eres tú... Tengo información sobre el Proyecto Eternidad. Pero no es gratis. 200 créditos, o hazme un favor."', 'dialog');
      setPlayer(prev => prev ? { ...prev, location: 'Bar El Neón Rojo - Distrito Bajo' } : null);
      addLog('', 'system');
      addLog('PAGAR 200 / HACER FAVOR / NEGAR / MIRAR ALREDEDOR', 'alert');
      return;
    }

    if (command.includes('oeste') || command.includes('alcantarilla') || command === 'o') {
      addLog('Desciendes por las escaleras resbaladizas hacia las alcantarillas. El olor es insoportable. Bioluminiscencia azulada crece en las paredes.', 'narrative');
      addLog('[Eco de gotas. Algo se mueve en el agua. Zumbido eléctrico de cables expuestos.]', 'narrative');
      addLog('Las alcantarillas forman un laberinto. Ves marcas de la Resistencia Sindical en las paredes — un camino seguro, si sabes leerlo.', 'narrative');
      addLog('', 'system');
      addLog('Encuentras un terminal hackeable medio sumergido. También hay un túnel que parece llevar a las Minas Subterráneas.', 'narrative');
      setPlayer(prev => prev ? { ...prev, location: 'Alcantarillas - Distrito Bajo' } : null);
      addLog('', 'system');
      addLog('HACKEAR TERMINAL / SEGUIR TÚNEL / VOLVER / EXAMINAR MARCAS', 'alert');
      return;
    }

    if (command.includes('hablar') || command.includes('dialogar')) {
      addLog('"Fantasma" se inclina hacia ti. Su rostro está medio oculto por un implante facial de camuflaje.', 'narrative');
      addLog('"La Corporación Helix está excavando en las Ruinas del Sector 7. Han encontrado algo... algo que no debería existir. Tecnología cuántica alienígena. Si la Resistencia la consigue antes, podríamos cambiar el equilibrio de poder en todo Eternum."', 'dialog');
      addLog('', 'system');
      addLog('"Necesito que te infiltres en un almacén de Helix en el Distrito Medio. Roba los datos del Proyecto Eternidad. ¿Trato?"', 'dialog');
      setPlayer(prev => prev ? { ...prev, quest: 'Infiltrarse en el almacén de Helix y robar datos del Proyecto Eternidad.' } : null);
      addLog('', 'system');
      addLog('[MISIÓN ACTUALIZADA]', 'alert');
      addLog('', 'system');
      addLog('ACEPTAR / RECHAZAR / NEGOCIAR RECOMPENSA', 'alert');
      return;
    }

    if (command.includes('aceptar') || command.includes('trato') || command.includes('sí')) {
      addLog('"Fantasma" sonríe. "Sabía que eras de fiar. Toma." Te pasa un chip de datos con los planos del almacén.', 'narrative');
      addLog('[+1 Chip de datos: Planos Almacén Helix] [+1 Tarjeta de acceso falsificada]', 'loot');
      setPlayer(prev => prev ? {
        ...prev,
        inventory: [...prev.inventory, 'Chip de datos: Planos Almacén Helix', 'Tarjeta de acceso falsificada'],
        reputation: { ...prev.reputation, resistance: prev.reputation.resistance + 10 }
      } : null);
      addLog('[REPUTACIÓN: Resistencia Sindical +10]', 'system');
      addLog('', 'system');
      addLog('¿QUÉ HACES?', 'alert');
      return;
    }

    if (command.includes('hackear') || command.includes('hack')) {
      if (player.class === 'HACKER' || player.skills.includes('Hackeo básico')) {
        addLog('Te conectas al terminal. Tu interfaz neural proyecta líneas de código en tu visión.', 'narrative');
        addLog('[Sonido de teclas virtuales. Flujo de datos. Un firewall de nivel 2 se materializa.]', 'narrative');
        addLog('Logras acceder parcialmente. Descargas un fragmento de datos encriptados.', 'action');
        addLog('[+1 Datos encriptados] [+25 XP]', 'loot');
        setPlayer(prev => prev ? {
          ...prev,
          inventory: [...prev.inventory, 'Datos encriptados'],
          xp: prev.xp + 25,
          energy: Math.max(0, prev.energy - 15)
        } : null);
      } else {
        addLog('Intentas hackear el terminal pero no tienes las habilidades necesarias. El sistema te rechaza con una descarga eléctrica.', 'combat');
        addLog('[-10 Salud]', 'combat');
        setPlayer(prev => prev ? { ...prev, health: Math.max(0, prev.health - 10) } : null);
      }
      addLog('', 'system');
      addLog('¿QUÉ HACES?', 'alert');
      return;
    }

    if (command.includes('descansar') || command.includes('dormir')) {
      addLog('Encuentras un rincón relativamente seguro y descansas brevemente.', 'narrative');
      addLog('[Sonido ambiente lejano. Tus implantes se recalibran.]', 'narrative');
      const healAmount = 20;
      const energyRestore = 30;
      setPlayer(prev => prev ? {
        ...prev,
        health: Math.min(prev.maxHealth, prev.health + healAmount),
        energy: Math.min(prev.maxEnergy, prev.energy + energyRestore),
      } : null);
      advanceTime(60);
      addLog(`[+${healAmount} Salud] [+${energyRestore} Energía]`, 'system');
      addLog('[Han pasado 60 minutos.]', 'system');
      addLog('', 'system');
      addLog('¿QUÉ HACES?', 'alert');
      return;
    }

    if (command.includes('usar') && command.includes('medkit')) {
      if (player.inventory.includes('Medkit básico')) {
        addLog('Aplicas el medkit. Nanobots reparan tus tejidos dañados.', 'action');
        addLog('[+30 Salud]', 'system');
        setPlayer(prev => prev ? {
          ...prev,
          health: Math.min(prev.maxHealth, prev.health + 30),
          inventory: prev.inventory.filter((_, i) => i !== prev.inventory.indexOf('Medkit básico'))
        } : null);
      } else {
        addLog('No tienes medkits en tu inventario.', 'system');
      }
      addLog('', 'system');
      addLog('¿QUÉ HACES?', 'alert');
      return;
    }

    if (command.includes('comprar')) {
      addLog('═══ TIENDA ═══', 'system');
      addLog('  1. Pistola Láser MK-II — 350 créditos', 'loot');
      addLog('  2. Medkit Avanzado — 80 créditos', 'loot');
      addLog('  3. Implante de Visión Nocturna — 500 créditos', 'loot');
      addLog('  4. Ración de Comida — 15 créditos', 'loot');
      addLog('  5. Granada EMP — 120 créditos', 'loot');
      addLog(`  Tus créditos: ${player.credits}`, 'system');
      addLog('', 'system');
      addLog('COMPRA [NÚMERO] / SALIR', 'alert');
      return;
    }

    if (command.includes('guardar')) {
      addLog('[PARTIDA GUARDADA AUTOMÁTICAMENTE]', 'system');
      addLog(`  Ubicación: ${player.location}`, 'system');
      addLog(`  Hora: ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`, 'system');
      addLog(`  Nivel: ${player.level}`, 'system');
      addLog('[Datos persistidos en la nube cuántica.]', 'system');
      return;
    }

    if (command.includes('cibernéticos') || command.includes('implantes')) {
      addLog('═══ CIBERNÉTICOS INSTALADOS ═══', 'system');
      if (player.cybernetics.length === 0) {
        addLog('  No tienes implantes instalados.', 'system');
      } else {
        player.cybernetics.forEach(c => addLog(`  ◆ ${c}`, 'system'));
      }
      addLog(`  Ranuras disponibles: ${3 - player.cybernetics.length}/3`, 'system');
      return;
    }

    if (command.includes('reputación') || command.includes('facciones')) {
      addLog('═══ REPUTACIÓN CON FACCIÓNES ═══', 'system');
      addLog(`  Corporación Helix: ${player.reputation.helix > 0 ? '+' : ''}${player.reputation.helix}`, 'system');
      addLog(`  Resistencia Sindical: ${player.reputation.resistance > 0 ? '+' : ''}${player.reputation.resistance}`, 'system');
      addLog(`  Culto del Vacío: ${player.reputation.void_cult > 0 ? '+' : ''}${player.reputation.void_cult}`, 'system');
      addLog(`  Nómadas Cuánticos: ${player.reputation.nomads > 0 ? '+' : ''}${player.reputation.nomads}`, 'system');
      addLog(`  IA Libre: ${player.reputation.ai_free > 0 ? '+' : ''}${player.reputation.ai_free}`, 'system');
      return;
    }

    if (command.includes('atacar') || command.includes('pelear') || command.includes('combatir')) {
      addLog('[¡COMBATE INICIADO!]', 'combat');
      const damage = Math.floor(Math.random() * 25) + 10;
      const taken = Math.floor(Math.random() * 15) + 5;
      addLog(`Atacas con tu ${player.equipped.weapon}. Impacto crítico.`, 'action');
      addLog(`[Infliges ${damage} de daño]`, 'combat');
      addLog(`[Recibes ${taken} de daño contraataque]`, 'combat');
      
      const newHealth = Math.max(0, player.health - taken);
      setPlayer(prev => prev ? {
        ...prev,
        health: newHealth,
        xp: prev.xp + 15
      } : null);
      
      if (newHealth <= 0) {
        addLog('[¡HAS CAÍDO EN COMBATE!]', 'combat');
        addLog('La oscuridad te envuelve... pero tus implantes de rescate te reviven en el punto de control más cercano.', 'narrative');
        addLog('[-50% créditos] [-30 XP]', 'combat');
        setPlayer(prev => prev ? {
          ...prev,
          health: Math.floor(prev.maxHealth * 0.5),
          energy: Math.floor(prev.maxEnergy * 0.3),
          credits: Math.floor(prev.credits * 0.5),
          location: 'Punto de Control - Distrito Bajo',
          xp: Math.max(0, prev.xp - 30)
        } : null);
      }
      addLog('', 'system');
      addLog('¿QUÉ HACES?', 'alert');
      return;
    }

    if (command.includes('examinar') || command.includes('mirar') || command.includes('observar')) {
      addLog('Observas tu entorno con atención...', 'narrative');
      addLog(`Estás en: ${player.location}`, 'narrative');
      addLog('Los detalles se revelan ante ti: cables colgando del techo, graffitis luminiscentes en las paredes, el reflejo distorsionado de tu figura en un charco de agua ácida.', 'narrative');
      addLog('[Detectas: Posible escondite tras un contenedor. Terminal público en la esquina. Cámara de vigilancia de Helix apuntando al norte.]', 'narrative');
      addLog('', 'system');
      addLog('¿QUÉ HACES?', 'alert');
      return;
    }

    if (command.includes('recoger') || command.includes('coger') || command.includes('loot')) {
      const items = ['Batería usada', 'Chip de memoria', 'Pistola de dardos', 'Fragmento de armadura', 'Datos corporativos'];
      const found = items[Math.floor(Math.random() * items.length)];
      addLog(`Buscas en los alrededores y encuentras: ${found}`, 'loot');
      addLog(`[+1 ${found}]`, 'loot');
      setPlayer(prev => prev ? { ...prev, inventory: [...prev.inventory, found] } : null);
      addLog('', 'system');
      addLog('¿QUÉ HACES?', 'alert');
      return;
    }

    // Default response
    addLog(`Intentas: "${cmd}"`, 'action');
    const responses = [
      'El entorno no reacciona de forma significativa a esa acción.',
      'No parece haber nada interesante en esa dirección por ahora.',
      'Una fuerza invisible te impide proceder. Quizás necesites otra aproximación.',
      'El mundo sigue su curso indiferente a tu acción.',
    ];
    addLog(responses[Math.floor(Math.random() * responses.length)], 'narrative');
    addLog('', 'system');
    addLog('Comandos útiles: MOVER [N/S/E/O], INVENTARIO, ESTADO, HABLAR, EXAMINAR, MAPA, MISIONES, HACKEAR, DESCANSAR, COMPRAR, GUARDAR', 'system');
    addLog('', 'system');
    addLog('¿QUÉ HACES?', 'alert');
  };

  // ============ GAME SCREEN ============
  const renderGame = () => {
    if (!player) return null;
    const healthPercent = (player.health / player.maxHealth) * 100;
    const energyPercent = (player.energy / player.maxEnergy) * 100;
    const shieldPercent = (player.shield / player.maxShield) * 100;
    const xpPercent = (player.xp / player.xpToNext) * 100;

    return (
      <div className="flex flex-col h-screen relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#0a0a20] to-[#050510]" />
        <div className="rain-overlay" />
        <div className="scanline-overlay" />

        {/* Top HUD */}
        <div className="relative z-10 flex flex-wrap items-center justify-between px-3 py-2 bg-black/80 border-b border-cyan-900/50 gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="text-xs">
              <span className="text-gray-500">📍</span> <span className="text-cyan-400">{player.location}</span>
            </div>
            <div className="text-xs">
              <span className="text-gray-500">🕐</span> <span className="text-gray-300">{String(hour).padStart(2, '0')}:{String(minute).padStart(2, '0')}</span>
            </div>
            <div className="text-xs">
              <span className="text-gray-500">🌧️</span> <span className="text-gray-400">{weather}</span>
            </div>
            <div className="text-xs">
              <span className="text-gray-500">🌡️</span> <span className="text-gray-400">{temperature}°C</span>
            </div>
            <div className="text-xs">
              <span className="text-gray-500">☢️</span> <span className="text-yellow-500">{radiation} mSv</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-yellow-400">LVL {player.level}</span>
            <span className="text-xs text-cyan-400">{player.credits}¢</span>
          </div>
        </div>

        {/* Status Bars */}
        <div className="relative z-10 flex gap-2 px-3 py-1 bg-black/60 border-b border-cyan-900/30">
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-red-400 w-6">HP</span>
              <div className="flex-1 h-2 bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-500" style={{ width: `${healthPercent}%` }} />
              </div>
              <span className="text-[10px] text-red-400 w-12 text-right">{player.health}/{player.maxHealth}</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-blue-400 w-6">EN</span>
              <div className="flex-1 h-2 bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-500" style={{ width: `${energyPercent}%` }} />
              </div>
              <span className="text-[10px] text-blue-400 w-12 text-right">{player.energy}/{player.maxEnergy}</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-cyan-400 w-6">SH</span>
              <div className="flex-1 h-2 bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full transition-all duration-500" style={{ width: `${shieldPercent}%` }} />
              </div>
              <span className="text-[10px] text-cyan-400 w-12 text-right">{player.shield}/{player.maxShield}</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-yellow-400 w-6">XP</span>
              <div className="flex-1 h-2 bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full transition-all duration-500" style={{ width: `${xpPercent}%` }} />
              </div>
              <span className="text-[10px] text-yellow-400 w-12 text-right">{player.xp}/{player.xpToNext}</span>
            </div>
          </div>
        </div>

        {/* Main Content - Game Log */}
        <div className="relative z-10 flex-1 overflow-y-auto px-4 py-3">
          <div className="max-w-3xl mx-auto space-y-1">
            {gameLogs.map((log, i) => (
              <div key={i} className={`log-entry text-sm leading-relaxed ${
                log.type === 'system' ? 'text-gray-500 text-xs' :
                log.type === 'dialog' ? 'text-green-400 italic' :
                log.type === 'combat' ? 'text-red-400' :
                log.type === 'action' ? 'text-yellow-300' :
                log.type === 'loot' ? 'text-fuchsia-400' :
                log.type === 'alert' ? 'text-cyan-300 font-bold' :
                'text-gray-300'
              }`}>
                {log.text}
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>

        {/* Quest Tracker - Side Panel */}
        <div className="relative z-10 absolute top-16 right-2 w-48 hidden lg:block">
          <div className="hud-panel rounded p-2 text-xs">
            <div className="text-cyan-400 tracking-widest mb-1 text-[10px]">MISIÓN ACTIVA</div>
            <div className="text-gray-400 leading-tight">{player.quest}</div>
          </div>
        </div>

        {/* Bottom Input */}
        <div className="relative z-10 border-t border-cyan-900/50 bg-black/90 px-4 py-3">
          <div className="max-w-3xl mx-auto flex items-center gap-2">
            <span className="text-cyan-500 text-sm">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && inputValue.trim()) {
                  addLog(`> ${inputValue}`, 'action');
                  processCommand(inputValue);
                  setInputValue('');
                }
              }}
              className="terminal-input flex-1 text-sm"
              placeholder="Escribe un comando... (MOVER, INVENTARIO, HABLAR, EXAMINAR...)"
              autoFocus
            />
            <button
              onClick={() => {
                if (inputValue.trim()) {
                  addLog(`> ${inputValue}`, 'action');
                  processCommand(inputValue);
                  setInputValue('');
                }
              }}
              className="text-cyan-400 text-xs border border-cyan-800 px-2 py-1 rounded hover:bg-cyan-900/30 transition-colors"
            >
              EJECUTAR
            </button>
          </div>
          <div className="max-w-3xl mx-auto mt-1 flex gap-2 flex-wrap">
            {['INVENTARIO', 'MAPA', 'ESTADO', 'MISIONES', 'EXAMINAR', 'DESCANSAR'].map(cmd => (
              <button
                key={cmd}
                onClick={() => {
                  addLog(`> ${cmd}`, 'action');
                  processCommand(cmd);
                }}
                className="text-[10px] text-gray-500 border border-gray-800 px-2 py-0.5 rounded hover:border-cyan-700 hover:text-cyan-400 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ============ RENDER ============
  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      {screen === 'title' && renderTitle()}
      {screen === 'menu' && renderMenu()}
      {screen === 'character_creation' && renderCharacterCreation()}
      {screen === 'intro' && renderIntro()}
      {screen === 'playing' && renderGame()}
    </div>
  );
}
