# 🎮 NEON ETERNUM: FRONTERA CUÁNTICA

> Juego RPG cyberpunk de mundo abierto — Ciencia ficción y fantasía espacial.

![Plataforma](https://img.shields.io/badge/Plataforma-Web-00ffcc?style=flat-square)
![Stack](https://img.shields.io/badge/Stack-React%20%2B%20Vite%20%2B%20Zustand-61dafb?style=flat-square)
![Estilo](https://img.shields.io/badge/Estilo-Cyberpunk-ff00ff?style=flat-square)

---

## 🌌 Descripción

**NEON ETERNUM: FRONTERA CUÁNTICA** es un videojuego RPG de texto interactivo con interfaz HUD diegética, ambientado en el planeta Kepler-186F (Eternum), año 2187.

### Características

- 🗺️ Mundo abierto con 10+ zonas explorables
- 👤 Creación de personaje con 6 clases y 6 trasfondos
- 💬 Sistema de diálogos con NPCs con memoria
- ⚔️ Combate táctico con sistema de daño
- 📦 Inventario con objetos y equipo
- 🎯 Sistema de misiones con progresión
- 📊 HUD completo (salud, energía, escudo, XP, créditos)
- 🌧️ Clima dinámico y ciclo día/noche
- 🏆 Sistema de reputación con 5 facciones
- 💾 Persistencia automática en localStorage
- 🎨 Efectos CRT, scanlines y animaciones Framer Motion

---

## 🛠️ Stack Tecnológico

- **React 19** + **TypeScript**
- **Vite 6** (build tool)
- **Tailwind CSS 4** (estilos)
- **Zustand** (estado global con persistencia)
- **Framer Motion** (animaciones)
- **Lucide React** (iconos)

---

## 🚀 DESPLIEGUE EN VERCEL

### Método 1: Desde GitHub (Recomendado)

1. **Sube este repositorio a GitHub:**
```bash
git init
git add .
git commit -m "NEON ETERNUM v2.0"
git remote add origin https://github.com/TU_USUARIO/neon-eternum.git
git push -u origin main
```

2. **Ve a [vercel.com](https://vercel.com)** → Inicia sesión con GitHub.

3. **Click en "Add New..." → "Project".**

4. **Importa el repositorio.**

5. **Vercel detectará Vite automáticamente.** Verifica estos valores:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

6. **Click en "Deploy".** Espera ~30 segundos.

7. ✅ ¡Listo! Tu URL pública estará disponible.

### Método 2: Vercel CLI

```bash
npm install -g vercel
vercel --prod
```

### Método 3: Desarrollo local

```bash
npm install
npm run dev      # Desarrollo en localhost:3000
npm run build    # Compilar para producción
npm run preview  # Previsualizar build
```

---

## ⚠️ SOLUCIÓN DE PROBLEMAS

### Si ves error 404 después del deploy:

1. Ve a **Vercel Dashboard → Tu proyecto → Settings → General**
2. En **Build & Development Settings** verifica:
   - Framework Preset: **Vite**
   - Output Directory: **dist**
   - Build Command: **npm run build**
3. Ve a **Deployments → (...) → Redeploy** (desmarca "Use existing build cache")

### Si el build falla:

```bash
npm run build   # Verifica que compila localmente
```

---

## 🎮 Comandos del juego

| Comando | Descripción |
|---------|-------------|
| `MOVER [N/S/E/O]` | Moverse en una dirección |
| `INVENTARIO` | Ver objetos |
| `ESTADO` | Ver stats |
| `MAPA` | Ver mapa |
| `MISIONES` | Misiones activas |
| `HABLAR [NPC]` | Dialogar con NPC |
| `EXAMINAR` | Observar entorno |
| `HACKEAR` | Hackear sistemas |
| `ATACAR` | Combate |
| `USAR [objeto]` | Usar item |
| `DESCANSAR` | Recuperar HP/EN |
| `COMPRAR` | Tienda |
| `GUARDAR` | Guardar partida |
| `SALIR` | Menú principal |
| `AYUDA` | Ver comandos |

---

## 📁 Estructura del proyecto

```
├── index.html              # HTML base
├── package.json            # Dependencias
├── vite.config.js          # Config Vite
├── tsconfig.json           # Config TypeScript
├── README.md               # Este archivo
└── src/
    ├── App.tsx             # Componente principal
    ├── main.tsx            # Entry point
    ├── index.css           # Estilos cyberpunk
    ├── store/
    │   └── gameStore.ts    # Zustand store (estado global)
    ├── hooks/
    │   └── useGameEngine.ts # Motor del juego
    └── components/
        ├── GameLayout.tsx      # Layout principal (3 paneles)
        ├── HUD.tsx             # Panel izquierdo (stats)
        ├── Terminal.tsx        # Panel central (narrativa)
        ├── CommandInput.tsx    # Input de comandos
        ├── InventoryPanel.tsx  # Panel derecho (inventario)
        ├── MapPanel.tsx        # Panel derecho (minimapa)
        ├── StatusPanel.tsx     # Panel derecho (facciones)
        ├── TitleScreen.tsx     # Pantalla de título
        ├── MenuScreen.tsx      # Menú principal
        ├── CharacterCreation.tsx # Creación de personaje
        └── IntroScreen.tsx     # Cinemática de apertura
```

---

<p align="center">
  <strong>NEON ETERNUM: FRONTERA CUÁNTICA</strong><br>
  <em>Planeta Kepler-186F — Año 2187 — Ciclo 47</em>
</p>
