# 🎮 NEON ETERNUM: FRONTERA CUÁNTICA

> Juego RPG de acción cyberpunk de mundo abierto — Ciencia ficción y fantasía espacial.

![Plataforma](https://img.shields.io/badge/Plataforma-Web-00ffcc?style=flat-square)
![Motor](https://img.shields.io/badge/Motor-React%20%2B%20Vite-61dafb?style=flat-square)
![Estilo](https://img.shields.io/badge/Estilo-Cyberpunk-ff00ff?style=flat-square)
![Estado](https://img.shields.io/badge/Estado-Jugable-00ff88?style=flat-square)

---

## 🌌 Descripción

**NEON ETERNUM: FRONTERA CUÁNTICA** es un videojuego RPG de texto interactivo con interfaz HUD diegética, ambientado en el planeta Kepler-186F (Eternum), año 2187. Explora las megaciudades, desiertos de ceniza, selvas bioluminiscentes y ruinas alienígenas en un mundo cyberpunk de ciencia ficción.

### Características

- 🗺️ Mundo abierto con múltiples zonas explorables
- 👤 Creación de personaje con 6 clases y 6 trasfondos
- 💬 Sistema de diálogos con NPCs con memoria
- ⚔️ Combate táctico con sistema de daño
- 📦 Inventario con objetos y equipo
- 🎯 Sistema de misiones con progresión
- 📊 HUD completo (salud, energía, escudo, XP, créditos)
- 🌧️ Clima dinámico y ciclo día/noche
- 🏆 Sistema de reputación con 5 facciones
- 💾 Guardado automático

---

## 🚀 Despliegue en Vercel

### Opción 1: Despliegue automático desde GitHub (Recomendado)

1. **Sube el proyecto a GitHub:**

```bash
git init
git add .
git commit -m "NEON ETERNUM: Frontera Cuántica - Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/neon-eternum-frontera-cuantica.git
git push -u origin main
```

2. **Ve a [vercel.com](https://vercel.com)** e inicia sesión con GitHub.

3. **Haz clic en "Add New..." → "Project".**

4. **Importa el repositorio** `neon-eternum-frontera-cuantica`.

5. **Vercel detectará automáticamente** el framework (Vite) y la configuración de `vercel.json`.

6. **Haz clic en "Deploy".**

7. ¡Listo! Tendrás una URL pública para jugar.

### Opción 2: Despliegue con Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
vercel

# Desplegar a producción
vercel --prod
```

### Opción 3: Desarrollo local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build
npm run preview
```

---

## 🎮 Comandos del juego

| Comando | Descripción |
|---------|-------------|
| `MOVER [N/S/E/O]` | Moverse en una dirección |
| `INVENTARIO` | Ver objetos |
| `ESTADO` | Ver stats del personaje |
| `MAPA` | Ver mapa de la zona |
| `MISIONES` | Ver misiones activas |
| `HABLAR [NPC]` | Dialogar con un NPC |
| `EXAMINAR` | Observar el entorno |
| `HACKEAR` | Hackear sistemas |
| `ATACAR` | Entrar en combate |
| `DESCANSAR` | Recuperar salud/energía |
| `COMPRAR` | Abrir tienda |
| `GUARDAR` | Guardar partida |
| `USAR [objeto]` | Usar un objeto |
| `SALIR` | Volver al menú |

---

## 🛠️ Tecnologías

- **React 19** — UI framework
- **Vite 6** — Build tool
- **Tailwind CSS 4** — Estilos
- **TypeScript** — Tipado estático

---

## 📁 Estructura del proyecto

```
neon-eternum-frontera-cuantica/
├── index.html          # HTML base
├── vercel.json         # Configuración Vercel
├── package.json        # Dependencias
├── vite.config.ts      # Configuración Vite
├── tsconfig.json       # Configuración TypeScript
├── tailwind.config.js  # Configuración Tailwind
├── README.md           # Este archivo
├── public/             # Assets estáticos
└── src/
    ├── App.tsx         # Componente principal del juego
    ├── main.tsx        # Entry point React
    └── index.css       # Estilos globales cyberpunk
```

---

## 📄 Licencia

MIT — Proyecto educativo/demo.

---

<p align="center">
  <strong>NEON ETERNUM: FRONTERA CUÁNTICA</strong><br>
  <em>Planeta Kepler-186F — Año 2187 — Ciclo 47</em>
</p>
