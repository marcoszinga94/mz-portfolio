# Portfolio de Marcos Zingaretti

> Sitio personal de una página para presentar servicios de desarrollo web y software a medida.

![Astro](https://img.shields.io/badge/Astro-FF5D01?logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

**Demo:** https://marcoszinga.vercel.app

## Características

- **Landing de una página:** hero, servicios, proyectos, proceso, métricas, sobre mí, experiencia, FAQ y contacto.
- **Contenido centralizado:** textos, proyectos, habilidades y servicios viven en `src/data/cv.ts`.
- **Proyectos enlazados:** tarjetas con descripción, stack y captura de cada sitio publicado.
- **SEO técnico:** título y descripción por página, canonical, Open Graph, JSON-LD (WebSite, Organization, Person), sitemap y `robots.txt`.
- **Landings locales:** `/desarrollo-web-cordoba` y `/desarrollo-web-la-carlota`, con FAQPage y BreadcrumbList.
- **Contacto directo:** CTA a WhatsApp, correo y descarga del CV en PDF.
- **Accesibilidad:** skip link, `aria-current` en la navegación, foco visible y soporte de `prefers-reduced-motion`.
- **Movimiento:** reveals de entrada con `IntersectionObserver` sobre atributos `data-reveal`.
- **Legal:** modales de privacidad y términos alimentados por `src/data/legal.ts`.
- **Automatización:** workflow semanal que regenera las capturas de los proyectos y las commitea.

## Stack

| Capa | Tecnología |
| --- | --- |
| Framework | Astro 7 con adapter de Vercel y sitemap |
| UI y estilos | Tailwind CSS 4 vía `@tailwindcss/vite` |
| Lenguaje | TypeScript en modo strict |
| Iconos y tipografía | `astro-icon` con Phosphor y Manrope Variable |
| Utilidades | `pdfkit` para el CV y Chromium headless para capturas |
| Deploy | Vercel con Analytics |

## Estructura del proyecto

```text
src/
  pages/        landing, 404 y landings locales
  layouts/      Layout con SEO, JSON-LD y reveals
  components/
    section/    secciones de la landing
    ui/         botones, cards, modales y helpers
  data/         cv.ts (contenido) y legal.ts
  styles/       Tailwind y tokens del tema
  types/        interfaces del contenido
scripts/        CV en PDF, capturas e imágenes de marca
public/         imágenes, CV, robots.txt y verificación
.github/        workflow de capturas
```

## Puesta en marcha

### Requisitos

- Node.js 22 o superior y npm.
- Chromium o Chrome solo si vas a regenerar las capturas de proyectos.

### Instalación

```bash
npm install
npm run dev
```

Astro sirve el sitio en `http://localhost:4321` por defecto.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run start` | Alias de `dev` |
| `npm run build` | `astro check` y build de producción |
| `npm run preview` | Sirve el build generado |
| `npm run astro` | Acceso directo al CLI de Astro |
| `npm run lint` | ESLint sobre todo el proyecto |
| `npm run format` | Prettier con plugin de Astro |
| `npm run format:check` | Verifica el formato sin escribir |
| `npm run generate-cv` | Genera el PDF del CV desde `cv.ts` |
| `npm run generate-shots` | Regenera las capturas de los proyectos |
| `npm run generate-google-images` | Genera imágenes de marca para Google |

## Despliegue

Pensado para Vercel con el adapter y Analytics ya configurados. La URL canónica se toma
de `PUBLIC_SITE_URL` y, si no está definida, usa la del sitio publicado. El workflow
`.github/workflows/update-project-shots.yml` actualiza las capturas cada lunes.

## Estado del proyecto

Sitio personal en producción. El contenido se edita en `src/data/cv.ts` y las landings
locales se mantienen como páginas independientes.

## Licencia

Sin licencia definida.

## Autor

Marcos Zingaretti — https://github.com/marcoszinga94
