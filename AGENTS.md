# AGENTS.md - Portfolio Project Guidelines

## Project Overview

Portfolio de una sola página para Marcos F. Zingaretti, desarrollador web full stack. Construido
con Astro, TailwindCSS v4 y TypeScript. Desplegado en Vercel; las páginas se prerenderizan como
estáticas (`output: "server"` + `export const prerender = true`).

## Commands

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo (astro dev)
npm run start        # Alias de dev

# Build y preview
npm run build        # Type check (astro check) + build (astro build)
npm run preview      # Preview del build de producción

# Astro CLI
npm run astro        # Acceso directo al CLI

# Calidad de código
npm run lint         # ESLint (astro + typescript)
npm run format       # Prettier (incluye prettier-plugin-astro)
npm run format:check # Verifica el formato

# Utilidades
npm run generate-cv  # Genera el PDF del CV a partir de src/data/cv.ts
```

**No hay framework de tests.** Verificá con `npm run lint` y `npm run build` (incluye `astro check`).

## Tech Stack

- **Framework**: Astro 7.x (Vercel adapter, páginas prerenderizadas)
- **Estilos**: TailwindCSS v4 vía `@tailwindcss/vite` (sin `tailwind.config.js`)
- **Lenguaje**: TypeScript 6.x (strict)
- **Iconos**: `astro-icon` + `@iconify-json/ph` (set Phosphor)
- **Tipografía**: Manrope Variable (`@fontsource-variable/manrope`)
- **Deploy**: Vercel (con analytics)

## Design System

El sitio sigue el sistema definido en `src/styles/global.css` (`@theme`). Respetá estos tokens,
no inventes valores sueltos.

- **Colores** (paleta oscura plana, sin gradientes de fondo):
  `acento` (#ff3b3b), `medio` (#ff7676), `claro` (#ededed), `hero-end` (#9b9b9b),
  `fondo` (#000000), `superficie` (#181818), `elevada` (#1f1f1f), `borde` (#313131)
- **Tipografía**: una sola familia (Manrope). El gradiente de texto se usa solo en el título del
  hero (blanco → `hero-end`). Sin itálicas ni pesos ultra bold (máx. `font-extrabold`).
- **Espaciado**: solo valores de la escala de Tailwind (2, 4, 8, 12, 16, 24, 32, 40, 48, 64…).
- **Radios**: solo utilidades de Tailwind (`rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-full`).
- **Bordes**: siempre completos, nunca de un solo lado en tarjetas. Sin degradados de fondo.
- **Movimiento**: transiciones con `ease-fluid` (`cubic-bezier(0.32,0.72,0,1)`) y duración ~300-800 ms.
  Los reveals usan `data-reveal` (fade + subida + blur, vía `IntersectionObserver`). Nunca
  `window.addEventListener("scroll")`.
- **Accesibilidad**: foco visible (global), skip link, `aria-current` en la navegación, `prefers-reduced-motion`.

## Project Structure

```
src/
  assets/
    selfie.webp           # Imagen del hero (importada para optimizar con sharp)
  components/
    Header.astro          # Nav "isla flotante" + overlay móvil
    Footer.astro          # Redes + enlaces legales
    section/              # Hero, TaglineReveal, Services, Projects, Process,
                          # Proof, About, Experience, FAQ, Contact
    ui/                   # card, timeline, WhatsAppButton, WhatsAppFloat,
                          # CallToActionButtons, ScrollToTop, SectionHeading
  data/
    cv.ts                 # Todo el contenido (único default export)
  layouts/
    Layout.astro          # HTML raíz, SEO/OG, JSON-LD, reveals
  pages/
    index.astro           # Landing de una página
    404.astro             # 404 con marca
    privacidad.astro      # Política de privacidad
    terminos.astro        # Términos y condiciones
  styles/
    global.css            # Tailwind + @theme + estilos base
  types/index.ts          # Interfaces
  env.d.ts
public/
  Fonts/                  # (legacy) fuentes estáticas
  Images/                 # og-image.jpg, screenshots de proyectos, logos de stack
```

## Content Management

Todo el contenido vive en `src/data/cv.ts` (default export) con estas claves:

- `sobreMi`: string[] — párrafos de "Sobre mí"
- `habilidades`: Habilidad[] — stack con logo
- `experiencias`: TimelineItem[] — trayectoria
- `proyectos`: Proyecto[] — tarjetas de proyectos
- `socialLinks`: SocialLink[] — Email / WhatsApp / GitHub
- `servicios`: Servicio[] — servicios (`icono` es un nombre de icono Phosphor)
- `proceso`: ProcesoStep[] — pasos de trabajo
- `metricas`: Metrica[] — cifras de resultados
- `faq`: FaqItem[] — preguntas frecuentes

## Code Style

- **TS**: strict, `verbatimModuleSyntax` (usá `import type`), alias `@/*` → `src/*`
- **Componentes Astro**: frontmatter `---`, interface `Props`, `<script>` para JS de cliente
- **Nombres**: PascalCase para secciones, lowercase para UI; tipos y campos en español
- **Contenido**: oraciones en sentence case, sin guiones dentro del texto, copy real (sin placeholders)
- **Enlaces externos**: siempre `target="_blank" rel="noopener noreferrer"`
- **Imágenes**: `<Image>` de `astro:assets` para assets en `src/assets`; `<img>` para los de `public/`

## Contenido pendiente de personalizar

- Los textos de `privacidad.astro` y `terminos.astro` son plantillas base: revisalos con un
  profesional antes de publicarlos.
