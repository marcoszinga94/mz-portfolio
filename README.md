# Portfolio — Marcos F. Zingaretti

Portfolio personal con展示 de proyectos, experiencia profesional y habilidades técnicas. Desarrollado con Astro, TailwindCSS v4 y TypeScript, desplegado en Vercel con SSR.

## Stack

| Tecnología | Uso |
|---|---|
| **Astro 6** | Framework web con SSR |
| **TailwindCSS v4** | Estilos utilitarios |
| **TypeScript 5** | Tipado estricto |
| **@astrojs/vercel** | Adaptador de despliegue |
| **Vercel Analytics** | Métricas de visitas |

## Estructura

```
src/
  components/       # Componentes reutilizables
    section/        # Secciones de página (Hero, About, Projects, Experience)
    ui/             # UI atómica (card, timeline, socialLinks)
  data/
    cv.ts           # Contenido del portfolio (única fuente de datos)
  layouts/
    Layout.astro    # Layout raíz con SEO, fuentes y estilos globales
  pages/
    index.astro     # Single-page portfolio
    404.astro       # Página de error personalizada
  styles/
    global.css      # Tema Tailwind, keyframes, utilidades globales
  types/
    index.ts        # Interfaces TypeScript (Proyecto, Habilidad, etc.)
public/
  Fonts/            # FiraCode
  Images/           # Imágenes del portfolio (proyectos, stacks, avatar)
```

## Desarrollo

```bash
npm run dev        # Iniciar servidor de desarrollo
npm run build      # Type-check + build de producción
npm run preview    # Vista previa del build
```

## Contenido

Todo el contenido se centraliza en `src/data/cv.ts`:

- **sobreMi** — párrafos descriptivos
- **habilidades** — tecnologías con iconos SVG
- **experiencias** — línea de tiempo profesional y académica
- **proyectos** — tarjetas con imagen, descripción y tecnologías
- **socialLinks** — enlaces a GitHub y LinkedIn

## Vistas de proyectos

El portafolio incluye dos modos de visualización para los proyectos:

- **Grid** — cuadrícula responsive de 1, 2 o 3 columnas
- **Lista** — cards horizontales con imagen y contenido lado a lado

La transición entre vistas usa la Web Animations API para desplazar suavemente cada card de su posición anterior a la nueva (FLIP animation).

## Personalización

1. Editar `src/data/cv.ts` con la información personal
2. Agregar imágenes de proyectos en `public/Images/paginas/` en formato `.webp`
3. Agregar iconos de tecnologías en `public/Images/stacks/` en formato `.svg`
4. Ajustar colores del tema en `src/styles/global.css` (bloque `@theme`)

## Despliegue

El proyecto se despliega automáticamente en Vercel desde el repositorio de GitHub. Incluye analíticas web y speed insights.

```bash
npm run build
# El adaptador de Vercel genera la salida en .vercel/output
```
