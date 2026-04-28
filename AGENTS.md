# AGENTS.md - Portfolio Project Guidelines

## Project Overview

Astro portfolio website for Marcos F. Zingaretti, a web developer. Built with Astro, TailwindCSS v4, and TypeScript. Deployed to Vercel with SSR (`output: "server"`).

## Commands

```bash
# Development
npm run dev          # Start dev server (astro dev)
npm run start        # Alias for dev

# Build & Preview
npm run build        # Type-check (astro check) + build (astro build)
npm run preview      # Preview production build

# Astro CLI
npm run astro        # Direct astro CLI access
```

**No test framework is configured.** No lint script exists. Run `npm run build` (which includes `astro check`) to verify correctness.

## Tech Stack

- **Framework**: Astro 5.x with SSR (Vercel adapter)
- **Styling**: TailwindCSS v4 via `@tailwindcss/vite` plugin
- **Language**: TypeScript 5.9 (strict mode)
- **Deployment**: Vercel (with analytics and speed insights)

## Project Structure

```
src/
  components/
    Header.astro          # Site header with responsive nav
    Footer.astro          # Site footer with social links
    section/              # Page sections (Hero, About, Projects, Experience)
    ui/                   # Reusable UI components (card, timeline, socialLinks, etc.)
  data/
    cv.ts                 # All portfolio content data (single default export)
  layouts/
    Layout.astro          # Root HTML layout with SEO meta
  pages/
    index.astro           # Single-page portfolio
    404.astro             # Custom 404 page
  styles/
    global.css            # Tailwind import + custom theme + animations
  types/
    index.ts              # TypeScript interfaces
  env.d.ts                # Env vars + JSX module declarations
public/
  Fonts/                  # FiraCode font
  Images/                 # Images, project screenshots, stack icons
```

## Code Style Guidelines

### TypeScript

- **Strict mode** enabled via `astro/tsconfigs/strict`
- `verbatimModuleSyntax: true` - use `import type` for type-only imports
- `noUnusedLocals: false` and `noUnusedParameters: false` (not enforced)
- Path alias: `@/*` maps to `src/*` (e.g., `import { X } from "@/types"`)
- Prefer interfaces over type aliases for object shapes

### Imports

```typescript
// Type-only imports must use "import type"
import type { MenuItem } from "../types";
import type { Proyecto } from "../../types/index.ts";

// Value imports use standard syntax
import data from "../../data/cv";
import { Image } from "astro:assets";

// Component imports use relative paths
import Header from "../components/Header.astro";
import Card from "../ui/card.astro";
```

### Astro Components

- Frontmatter goes in `---` blocks at the top
- Define `Props` interface for component props
- Destructure props via `const { ... } = Astro.props;`
- Use `<script>` tags for client-side JS (no framework like React/Vue)
- Use `<style>` tags for component-scoped CSS (supports `is:global` when needed)

```astro
---
import type { SomeType } from "../types";

interface Props {
  item: SomeType;
}

const { item } = Astro.props;
---
<div>{item.name}</div>
```

### Naming Conventions

- **Files**: PascalCase for section components (`Hero.astro`, `About.astro`), lowercase for UI components (`card.astro`, `timeline.astro`)
- **Types/Interfaces**: PascalCase, Spanish names (`Proyecto`, `Habilidad`, `TimelineItem`)
- **Variables/functions**: camelCase
- **CSS classes**: Tailwind utility classes; custom color names are Spanish (`acento`, `medio`, `claro`, `oscuro`, `fondo`, `gray-custom`)
- **Data fields**: Spanish (`nombre`, `descripcion`, `enlace`, `fecha`, `titulo`)

### TailwindCSS

- Tailwind v4 with `@tailwindcss/vite` plugin (no `tailwind.config.js`)
- Custom theme defined in `src/styles/global.css` using `@theme` block:
  - `acento` (#ff3b3b), `medio` (#ff7676), `claro` (#fff5f5)
  - `oscuro` (#0a0a0a), `fondo` (#1a1a2e), `gray-custom` (#2a2a3e)
- Use Tailwind utility classes directly in markup
- Custom animations defined in `global.css` and component `<style>` blocks

### Styling Patterns

- Gradients: `bg-gradient-to-r from-acento to-medio`
- Text gradient: `bg-gradient-to-r from-acento to-medio bg-clip-text text-transparent`
- Hover effects: `hover:scale-[1.02]`, `hover:text-acento transition-colors duration-300`
- Accessibility: `sr-only` class for screen readers, `focus-visible:ring-2` patterns

### External Links

- Always use `target="_blank" rel="noopener noreferrer"` for external links
- Internal anchor links use `#section-id` format

### Images

- Use Astro's `<Image>` component from `astro:assets` for optimization
- Use `<img>` tags for dynamic sources (e.g., stack icons in loops)
- Project images stored as `.webp` in `/Images/paginas/`
- Stack icons stored as `.svg` in `/Images/stacks/`

### Error Handling

- No explicit error handling patterns; components assume data is correct
- Use optional chaining (`?.`) for DOM element access in scripts
- Use optional properties in interfaces where data may be absent (`caracteristicas?: string[]`)

## Content Management

All portfolio content lives in `src/data/cv.ts` as a single default export object with these keys:
- `sobreMi`: string[] - About me paragraphs
- `habilidades`: Habilidad[] - Skills with icons
- `experiencias`: TimelineItem[] - Work/education timeline
- `proyectos`: Proyecto[] - Project cards
- `socialLinks`: SocialLink[] - GitHub/LinkedIn links with SVG paths

## Animations

- Scroll-triggered animations use Intersection Observer (not a library)
- Elements use `data-aos` attributes with optional `data-aos-delay`
- Animation class `aos-animate` is added on intersection
- Custom keyframes defined per-component in `<style>` blocks

## Environment Variables

- `PUBLIC_SITE_URL`: Public site URL (defined in `env.d.ts`)

## Deployment

- Vercel with SSR adapter
- Web analytics and speed insights enabled in `astro.config.mjs`
- Build output: `dist/`
