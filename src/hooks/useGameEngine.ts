// Motor del juego: procesa comandos, actualiza estado, genera eventos
import { useCallback } from 'react';
import { useGameStore, LOCATIONS } from '../store/gameStore';

export function useGameEngine() {
  const {
    player, updatePlayer, world, updateWorld, advanceTime,
    addLog, setScreen, clearLogs, resetGame
  } = useGameStore();

  const processCommand = useCallback((rawCmd: string) => {
    if (!player) return;

    const cmd = rawCmd.toLowerCase().trim();
    updateWorld({
      turnCount: world.turnCount + 1,
      actionCount: world.actionCount + 1,
    });
    advanceTime(3);

    // Evento aleatorio cada 5 acciones (20% probabilidad)
    if (world.actionCount > 0 && world.actionCount % 5 === 0 && Math.random() < 0.2) {
      triggerRandomEvent();
    }

    // Procesar comandos
    if (cmd === 'salir' || cmd === 'exit' || cmd === 'menu') {
      addLog('[PARTIDA GUARDADA AUTOMÁTICAMENTE]', 'system');
      addLog('Volviendo al menú principal...', 'system');
      setTimeout(() => { setScreen('menu'); clearLogs(); }, 1000);
      return;
    }

    if (cmd === 'ayuda' || cmd === 'help') {
      showHelp();
      return;
    }

    if (cmd === 'inventario' || cmd === 'inv' || cmd === 'i') {
      showInventory();
      return;
    }

    if (cmd === 'estado' || cmd === 'status' || cmd === 'stats') {
      showStatus();
      return;
    }

    if (cmd === 'habilidades' || cmd === 'skills') {
      showSkills();
      return;
    }

    if (cmd === 'misiones' || cmd === 'quest' || cmd === 'diario') {
      showQuests();
      return;
    }

    if (cmd === 'mapa' || cmd === 'map' || cmd === 'm') {
      showMap();
      return;
    }

    if (cmd === 'facciones' || cmd === 'reputación') {
      showFactions();
      return;
    }

    if (cmd === 'cibernéticos' || cmd === 'implantes') {
      showCybernetics();
      return;
    }

    if (cmd === 'examinar' || cmd === 'mirar' || cmd === 'observar' || cmd === 'look') {
      examineSurroundings();
      return;
    }

    if (cmd === 'guardar' || cmd === 'save') {
      addLog('[PARTIDA GUARDADA EN LOCALSTORAGE]', 'system');
      addLog(`  Ubicación: ${player.location}`, 'system');
      addLog(`  Hora: ${String(world.hour).padStart(2, '0')}:${String(world.minute).padStart(2, '0')}`, 'system');
      return;
    }

    if (cmd === 'descansar' || cmd === 'dormir' || cmd === 'rest') {
      doRest();
      return;
    }

    // Comandos de movimiento
    if (cmd.startsWith('mover ') || cmd.startsWith('ir ') || cmd === 'n' || cmd === 's' || cmd === 'e' || cmd === 'o' ||
        cmd === 'norte' || cmd === 'sur' || cmd === 'este' || cmd === 'oeste') {
      let direction = '';
      if (cmd === 'n' || cmd === 'norte') direction = 'norte';
      else if (cmd === 's' || cmd === 'sur') direction = 'sur';
      else if (cmd === 'e' || cmd === 'este') direction = 'este';
      else if (cmd === 'o' || cmd === 'oeste') direction = 'oeste';
      else if (cmd.startsWith('mover ') || cmd.startsWith('ir ')) {
        direction = cmd.replace(/^(mover|ir)\s+/, '').trim();
      }
      movePlayer(direction);
      return;
    }

    if (cmd.startsWith('hablar') || cmd.startsWith('dialogar')) {
      const npc = cmd.replace(/^(hablar|dialogar)\s*(con)?\s*/, '').trim();
      talkToNPC(npc);
      return;
    }

    if (cmd.startsWith('atacar') || cmd.startsWith('pelear') || cmd.startsWith('combatir')) {
      const target = cmd.replace(/^(atacar|pelear|combatir)\s*/, '').trim();
      doCombat(target);
      return;
    }

    if (cmd.startsWith('usar ')) {
      const item = cmd.replace('usar ', '').trim();
      useItem(item);
      return;
    }

    if (cmd.startsWith('hackear') || cmd.startsWith('hack')) {
      const target = cmd.replace(/^(hackear|hack)\s*/, '').trim();
      doHack(target);
      return;
    }

    if (cmd.startsWith('recoger') || cmd.startsWith('coger') || cmd === 'loot') {
      doLoot();
      return;
    }

    if (cmd.startsWith('comprar') || cmd.startsWith('tienda')) {
      showShop();
      return;
    }

    // Comando libre - respuesta narrativa
    addLog(`> ${rawCmd}`, 'action');
    addLog('El entorno no reacciona significativamente a esa acción.', 'narrative');
    addLog('Escribe AYUDA para ver los comandos disponibles.', 'system');
  }, [player, world, addLog, advanceTime, updateWorld, setScreen, clearLogs, updatePlayer]);

  // ============ FUNCIONES DE COMANDOS ============

  const triggerRandomEvent = () => {
    const events = [
      { text: '[Un dron de Helix pasa sobrevolando. Sus sensores te escanean brevemente.]', type: 'narrative' as const },
      { text: '[Escuchas disparos a lo lejos. Alguien no sobrevivió a la noche.]', type: 'narrative' as const },
      { text: '[Un holograma parpadea: "HELIX CORP BUSCA DISIDENTES. RECOMPENSA: 10.000 CRÉDITOS."]', type: 'narrative' as const },
      { text: '[El suelo vibra. Algo grande se mueve bajo las alcantarillas.]', type: 'narrative' as const },
      { text: '[Un mendigo cibernético susurra: "Cuidado con los del Vacío..."]', type: 'dialog' as const },
      { text: '[Una ráfaga de viento ácido trae el olor de la selva bioluminiscente.]', type: 'narrative' as const },
      { text: '[Encuentras 25 créditos tirados en el suelo.]', type: 'loot' as const, action: () => updatePlayer({ credits: (player?.credits || 0) + 25 }) },
      { text: '[Una descarga de energía te golpea. -5 Salud]', type: 'combat' as const, action: () => updatePlayer({ health: Math.max(0, (player?.health || 0) - 5) }) },
    ];
    const event = events[Math.floor(Math.random() * events.length)];
    addLog(event.text, event.type);
    if (event.action) event.action();
  };

  const showHelp = () => {
    addLog('═══ COMANDOS DISPONIBLES ═══', 'system');
    addLog('  MOVER [norte/sur/este/oeste] - Moverse', 'system');
    addLog('  EXAMINAR - Observar entorno', 'system');
    addLog('  HABLAR [NPC] - Dialogar', 'system');
    addLog('  ATACAR [objetivo] - Combate', 'system');
    addLog('  USAR [objeto] - Usar item', 'system');
    addLog('  HACKEAR [sistema] - Hackear', 'system');
    addLog('  RECOGER - Buscar objetos', 'system');
    addLog('  DESCANSAR - Recuperar HP/EN', 'system');
    addLog('  INVENTARIO / MAPA / ESTADO', 'system');
    addLog('  MISIONES / HABILIDADES / FACTIONES', 'system');
    addLog('  COMPRAR / GUARDAR / SALIR', 'system');
  };

  const showInventory = () => {
    if (!player) return;
    addLog('═══ INVENTARIO ═══', 'system');
    if (player.inventory.length === 0) {
      addLog('  (Vacío)', 'system');
    } else {
      player.inventory.forEach(item => addLog(`  • ${item}`, 'loot'));
    }
    addLog(`  💰 Créditos: ${player.credits}`, 'loot');
    addLog(`  ⚖️ Peso: ${player.inventory.length * 2}/${50 + player.level * 5} kg`, 'system');
    addLog('', 'system');
    addLog('═══ EQUIPADO ═══', 'system');
    addLog(`  ⚔️ Arma: ${player.equipped.weapon}`, 'system');
    addLog(`  🛡️ Armadura: ${player.equipped.armor}`, 'system');
    addLog(`  🔌 Implante: ${player.equipped.implant}`, 'system');
  };

  const showStatus = () => {
    if (!player) return;
    addLog('═══ ESTADO DEL PERSONAJE ═══', 'system');
    addLog(`  Nombre: ${player.name} [${player.playerClass}]`, 'system');
    addLog(`  Nivel: ${player.level} | XP: ${player.xp}/${player.xpToNext}`, 'system');
    addLog(`  ❤️ Salud: ${player.health}/${player.maxHealth}`, 'combat');
    addLog(`  ⚡ Energía: ${player.energy}/${player.maxEnergy}`, 'system');
    addLog(`  🛡️ Escudo: ${player.shield}/${player.maxShield}`, 'system');
    addLog(`  💰 Créditos: ${player.credits}`, 'loot');
    addLog(`  📍 Ubicación: ${player.location}`, 'narrative');
    addLog(`  🎯 Misión: ${player.quest}`, 'alert');
  };

  const showSkills = () => {
    if (!player) return;
    addLog('═══ HABILIDADES ═══', 'system');
    player.skills.forEach(s => addLog(`  ★ ${s}`, 'system'));
    addLog(`  Puntos disponibles: ${player.level}`, 'system');
  };

  const showQuests = () => {
    if (!player) return;
    addLog('═══ MISIONES ACTIVAS ═══', 'system');
    addLog(`  ▸ ${player.quest}`, 'alert');
    addLog('', 'system');
    addLog('═══ MISIONES COMPLETADAS ═══', 'system');
    if (player.questsCompleted.length === 0) {
      addLog('  (Ninguna aún)', 'system');
    } else {
      player.questsCompleted.forEach(q => addLog(`  ✓ ${q}`, 'system'));
    }
  };

  const showMap = () => {
    if (!player) return;
    const loc = LOCATIONS[player.locationId];
    if (!loc) return;
    addLog(`═══ MAPA: ${loc.name.toUpperCase()} ═══`, 'system');
    addLog(`  Peligro: ${loc.danger}`, loc.danger === 'EXTREMO' ? 'combat' : loc.danger === 'ALTO' ? 'alert' : 'system');
    addLog('', 'system');
    addLog('  Salidas:', 'system');
    Object.entries(loc.exits).forEach(([dir, id]) => {
      const target = LOCATIONS[id];
      addLog(`    [${dir.toUpperCase()}] → ${target.name}`, 'narrative');
    });
    if (loc.npcs.length > 0) {
      addLog('', 'system');
      addLog(`  NPCs: ${loc.npcs.join(', ')}`, 'narrative');
    }
  };

  const showFactions = () => {
    if (!player) return;
    addLog('═══ REPUTACIÓN CON FACCIÓNES ═══', 'system');
    const rep = player.reputation;
    const format = (name: string, val: number) => `  ${name}: ${val > 0 ? '+' : ''}${val}`;
    addLog(format('Corporación Helix', rep.helix), 'system');
    addLog(format('Resistencia Sindical', rep.resistance), 'system');
    addLog(format('Culto del Vacío', rep.voidCult), 'system');
    addLog(format('Nómadas Cuánticos', rep.nomads), 'system');
    addLog(format('IA Libre', rep.aiFree), 'system');
  };

  const showCybernetics = () => {
    if (!player) return;
    addLog('═══ CIBERNÉTICOS INSTALADOS ═══', 'system');
    if (player.cybernetics.length === 0) {
      addLog('  No tienes implantes instalados.', 'system');
    } else {
      player.cybernetics.forEach(c => addLog(`  ◆ ${c}`, 'system'));
    }
    addLog(`  Ranuras: ${player.cybernetics.length}/3`, 'system');
  };

  const examineSurroundings = () => {
    if (!player) return;
    const loc = LOCATIONS[player.locationId];
    if (!loc) return;
    addLog('═══ EXAMINAR ═══', 'system');
    addLog(loc.description, 'narrative');
    addLog('', 'system');
    addLog(`[Zona de peligro: ${loc.danger}]`, loc.danger === 'EXTREMO' ? 'combat' : 'system');
    if (loc.npcs.length > 0) {
      addLog(`[NPCs presentes: ${loc.npcs.join(', ')}]`, 'narrative');
    }
    if (loc.loot.length > 0 && Math.random() < 0.5) {
      addLog(`[Detectas algo interesante cerca...]`, 'loot');
    }
  };

  const movePlayer = (direction: string) => {
    if (!player) return;
    const loc = LOCATIONS[player.locationId];
    if (!loc) {
      addLog('No sabes dónde estás.', 'error');
      return;
    }

    const dirKey = direction.toLowerCase();
    const targetId = loc.exits[dirKey];

    if (!targetId) {
      addLog(`No hay salida hacia "${direction}" desde aquí.`, 'error');
      addLog('Usa MAPA para ver las salidas disponibles.', 'system');
      return;
    }

    // Coste de energía
    if (player.energy < 5) {
      addLog('Estás demasiado agotado para moverte. Descansa primero.', 'error');
      return;
    }

    const target = LOCATIONS[targetId];
    addLog(`Te mueves hacia el ${dirKey}...`, 'action');
    addLog('', 'system');
    addLog(`📍 ${target.name}`, 'alert');
    addLog(target.description, 'narrative');

    updatePlayer({
      location: target.name,
      locationId: targetId,
      energy: Math.max(0, player.energy - 5),
    });

    addLog('', 'system');
    addLog(`[-5 Energía]`, 'system');

    // Eventos al entrar
    if (target.danger === 'ALTO' && Math.random() < 0.3) {
      addLog('', 'system');
      addLog('[¡ALERTA!] Una figura emerge de las sombras...', 'combat');
      addLog('ATACAR / HABLAR / HUIR', 'alert');
    }
  };

  const talkToNPC = (npcName: string) => {
    if (!player) return;
    const loc = LOCATIONS[player.locationId];
    if (!loc) return;

    if (!npcName) {
      addLog('¿Con quién quieres hablar? Especifica un NPC.', 'error');
      addLog(`NPCs disponibles: ${loc.npcs.join(', ') || 'Ninguno'}`, 'system');
      return;
    }

    const npc = loc.npcs.find(n => n.toLowerCase().includes(npcName.toLowerCase()));
    if (!npc) {
      addLog(`No hay nadie llamado "${npcName}" aquí.`, 'error');
      return;
    }

    // Diálogos específicos
    const dialogues: Record<string, string[]> = {
      'Fantasma': [
        '"Así que eres tú... Tengo información sobre el Proyecto Eternidad."',
        '"La Corporación Helix está excavando en las Ruinas del Sector 7. Han encontrado tecnología cuántica alienígena."',
        '"Necesito que te infiltres en un almacén de Helix. ¿Trato?"',
      ],
      'Vendedor Kael': [
        '"Bienvenido, amigo. Tengo lo que necesitas... si tienes créditos."',
        '"Pistolas láser, implantes, munición... todo de calidad."',
      ],
      'Mendigo cibernético': [
        '"Cuidado con los del Vacío... están buscando algo en las alcantarillas."',
        '"Una limosna, hermano... mi implante necesita energía..."',
      ],
      'Barman Zyx': [
        '"¿Qué te sirvo? Tengo licor de neón, sinte-whisky, o agua purificada."',
        '"Si buscas información, Fantasma suele sentarse en la esquina."',
      ],
    };

    addLog(`═══ ${npc.toUpperCase()} ═══`, 'system');
    const lines = dialogues[npc] || [`"${npc} te mira pero no dice nada."`];
    lines.forEach(line => addLog(line, 'dialog'));

    if (npc === 'Fantasma' && player.quest.includes('Sobrevivir')) {
      updatePlayer({ quest: 'Infiltrarse en el almacén de Helix y robar datos del Proyecto Eternidad.' });
      addLog('', 'system');
      addLog('[MISIÓN ACTUALIZADA]', 'alert');
    }
  };

  const doCombat = (target: string) => {
    if (!player) return;

    const damage = Math.floor(Math.random() * 25) + 10;
    const taken = Math.floor(Math.random() * 15) + 5;

    addLog('[¡COMBATE INICIADO!]', 'combat');
    addLog(`Atacas con tu ${player.equipped.weapon}.`, 'action');
    addLog(`[Infliges ${damage} de daño${target ? ` a ${target}` : ''}]`, 'combat');
    addLog(`[Recibes ${taken} de daño de contraataque]`, 'combat');

    const newHealth = Math.max(0, player.health - taken);
    const newXp = player.xp + 15;

    updatePlayer({
      health: newHealth,
      xp: newXp,
    });

    if (newHealth <= 0) {
      addLog('', 'system');
      addLog('[¡HAS CAÍDO EN COMBATE!]', 'combat');
      addLog('Tus implantes de rescate te reviven en el punto de control.', 'narrative');
      addLog('[-50% créditos] [-30 XP]', 'combat');
      updatePlayer({
        health: Math.floor(player.maxHealth * 0.5),
        energy: Math.floor(player.maxEnergy * 0.3),
        credits: Math.floor(player.credits * 0.5),
        xp: Math.max(0, newXp - 30),
        location: LOCATIONS['callejon-inicio'].name,
        locationId: 'callejon-inicio',
      });
    }

    // Check level up
    checkLevelUp(newXp);
  };

  const useItem = (itemName: string) => {
    if (!player) return;

    if (!itemName) {
      addLog('¿Qué objeto quieres usar?', 'error');
      return;
    }

    const item = player.inventory.find(i => i.toLowerCase().includes(itemName.toLowerCase()));
    if (!item) {
      addLog(`No tienes "${itemName}" en tu inventario.`, 'error');
      return;
    }

    if (item.includes('Medkit')) {
      const heal = item.includes('Avanzado') ? 50 : 30;
      addLog(`Aplicas ${item}. Nanobots reparan tus tejidos.`, 'action');
      addLog(`[+${heal} Salud]`, 'system');
      updatePlayer({
        health: Math.min(player.maxHealth, player.health + heal),
        inventory: player.inventory.filter(i => i !== item),
      });
    } else if (item.includes('comida') || item.includes('Ración')) {
      addLog(`Consumes ${item}.`, 'action');
      addLog('[+20 Energía]', 'system');
      updatePlayer({
        energy: Math.min(player.maxEnergy, player.energy + 20),
        inventory: player.inventory.filter(i => i !== item),
      });
    } else {
      addLog(`No puedes usar "${item}" de esta forma.`, 'error');
    }
  };

  const doHack = (target: string) => {
    if (!player) return;

    const isHacker = player.playerClass === 'HACKER';
    const hasSkill = player.skills.some(s => s.toLowerCase().includes('hack'));

    if (!isHacker && !hasSkill) {
      addLog('Intentas hackear pero no tienes las habilidades necesarias.', 'error');
      addLog('El sistema te rechaza con una descarga eléctrica. [-10 Salud]', 'combat');
      updatePlayer({ health: Math.max(0, player.health - 10) });
      return;
    }

    if (player.energy < 15) {
      addLog('No tienes suficiente energía para hackear. [-15 Energía requerida]', 'error');
      return;
    }

    addLog('Te conectas al sistema. Tu interfaz neural proyecta líneas de código.', 'narrative');
    addLog('[Firewall detectado... evadiendo...]', 'system');
    addLog('[Acceso concedido.]', 'loot');
    addLog('[+1 Datos encriptados] [+25 XP] [-15 Energía]', 'loot');

    updatePlayer({
      inventory: [...player.inventory, 'Datos encriptados'],
      xp: player.xp + 25,
      energy: Math.max(0, player.energy - 15),
    });

    checkLevelUp(player.xp + 25);
  };

  const doLoot = () => {
    if (!player) return;
    const loc = LOCATIONS[player.locationId];
    if (!loc || loc.loot.length === 0) {
      addLog('No hay nada que recoger aquí.', 'system');
      return;
    }

    const found = loc.loot[Math.floor(Math.random() * loc.loot.length)];
    const credits = Math.floor(Math.random() * 50) + 10;

    addLog(`Buscas en los alrededores...`, 'action');
    addLog(`[+1 ${found}]`, 'loot');
    addLog(`[+${credits} créditos]`, 'loot');

    updatePlayer({
      inventory: [...player.inventory, found],
      credits: player.credits + credits,
    });
  };

  const doRest = () => {
    if (!player) return;
    const healAmount = 20;
    const energyRestore = 30;

    addLog('Encuentras un rincón seguro y descansas brevemente.', 'narrative');
    addLog('[Tus implantes se recalibran.]', 'narrative');
    addLog(`[+${healAmount} Salud] [+${energyRestore} Energía]`, 'system');
    addLog('[Han pasado 60 minutos.]', 'system');

    updatePlayer({
      health: Math.min(player.maxHealth, player.health + healAmount),
      energy: Math.min(player.maxEnergy, player.energy + energyRestore),
    });
    advanceTime(60);
  };

  const showShop = () => {
    if (!player) return;
    addLog('═══ TIENDA ═══', 'system');
    addLog('  1. Pistola Láser MK-II — 350¢', 'loot');
    addLog('  2. Medkit Avanzado — 80¢', 'loot');
    addLog('  3. Implante Visión Nocturna — 500¢', 'loot');
    addLog('  4. Ración de Comida — 15¢', 'loot');
    addLog('  5. Granada EMP — 120¢', 'loot');
    addLog(`  💰 Tus créditos: ${player.credits}`, 'system');
    addLog('', 'system');
    addLog('Usa: COMPRAR [número]', 'alert');
  };

  const checkLevelUp = (currentXp: number) => {
    if (!player) return;
    if (currentXp >= player.xpToNext) {
      addLog('', 'system');
      addLog('[¡SUBIDA DE NIVEL!]', 'system');
      addLog(`[Nivel ${player.level} → Nivel ${player.level + 1}]`, 'system');
      addLog('[+10 Salud máxima] [+5 Energía máxima]', 'system');
      updatePlayer({
        level: player.level + 1,
        xp: currentXp - player.xpToNext,
        xpToNext: Math.floor(player.xpToNext * 1.5),
        maxHealth: player.maxHealth + 10,
        health: player.health + 10,
        maxEnergy: player.maxEnergy + 5,
        energy: player.energy + 5,
      });
    }
  };

  return { processCommand };
}
