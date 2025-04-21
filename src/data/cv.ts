interface Proyecto {
  nombre: string;
  descripcion: string;
  imagen: string;
  enlace: string;
  caracteristicas?: string[];
  tecnologias?: string[];
}

interface Experiencia {
  fecha: string;
  titulo: string;
  descripcion: string;
}

interface Habilidad {
  nombre: string;
  icon: string;
}

export default {
  sobreMi: [
    "Desde pequeño, la tecnología me llamó la atención, y a los 15 años descubrí que escribir código era mucho más interesante que cualquier otra cosa.",
    "Comencé con pequeños proyectos, intentando entender qué hacía cada línea. Con el tiempo, comprendí que la programación no es solo sobre código, sino sobre crear soluciones.",
    "Hoy, con una sólida experiencia, desarrollo proyectos desde cero, aplicando lo aprendido y evitando —en lo posible— los errores del pasado.",
  ],
  habilidades: [
    { nombre: "JavaScript", icon: "JavaScript" },
    { nombre: "React", icon: "React" },
    { nombre: "Astro", icon: "Astro" },
    { nombre: "Tailwind", icon: "Tailwind" },
  ],
  experiencias: [
    {
      fecha: "...Actualidad",
      titulo: "Desarrollador Web Full-Stack",
      descripcion:
        "Desarrollo de aplicaciones web modernas utilizando React, Node.js y tecnologías relacionadas. Implementación de arquitecturas escalables y mantenibles.",
    },
    {
      fecha: "2020 - 2021",
      titulo: "Argentina Programa 2.0 - Formalización de Estudios",
      descripcion:
        "Avancé en mi trayectoria profesional formalizando mis estudios en programación a través del programa Argentina Programa 2.0. Durante esta etapa, adquirí competencias avanzadas trabajando con frameworks como Angular y optimizando el uso de diversas tecnologías.",
    },
    {
      fecha: "...2020",
      titulo: "Autodidacta en Programación",
      descripcion:
        "Mi pasión por la programación comenzó con aprendizaje autodidacta. A través de plataformas como Stack Overflow, tutoriales en YouTube y repositorios de GitHub, desarrollé las bases fundamentales que han impulsado mi crecimiento constante en el campo.",
    },
  ],
  proyectos: [
    {
      nombre: "Argentista",
      descripcion:
        "Plataforma de comercio electrónico especializada en fotografía analógica",
      imagen: "argentista",
      enlace: "https://argentista.vercel.app",
      caracteristicas: [
        "Catálogo de productos dinámico",
        "Sistema de autenticación",
        "Carrito de compras",
        "Panel de administración",
      ],
      tecnologias: ["Astro", "React", "Tailwind"],
    },
    {
      nombre: "El Socorro",
      descripcion: "Sitio web institucional para una empresa agrícola",
      imagen: "elsocorro",
      enlace: "https://elsocorro.vercel.app",
      caracteristicas: [
        "Diseño responsive",
        "Optimización SEO",
        "Galería de imágenes",
        "Formulario de contacto",
      ],
      tecnologias: ["Astro", "Tailwind"],
    },
  ],
};
