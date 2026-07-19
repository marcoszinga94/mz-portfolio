import type { Habilidad, TimelineItem, Proyecto, SocialLink } from "../types";

interface PortfolioData {
  sobreMi: string[];
  habilidades: Habilidad[];
  experiencias: TimelineItem[];
  proyectos: Proyecto[];
  socialLinks: SocialLink[];
}

const data: PortfolioData = {
  sobreMi: [
    "Mi interés por la tecnología comenzó en la adolescencia, y a los 15 años descubrí en la programación una vocación que definiría mi carrera profesional.",
    "Empecé con proyectos personales, explorando cada línea de código hasta comprender que el desarrollo de software va más allá de la sintaxis: se trata de resolver problemas y crear soluciones con impacto real.",
    "Hoy, con experiencia en el desarrollo de aplicaciones completas, abordo cada proyecto aplicando buenas prácticas y aprendizajes acumulados, buscando siempre la mejor solución sin perder de vista la eficiencia y la calidad.",
  ],
  habilidades: [
    { nombre: "Astro", icon: "Astro" },
    { nombre: "Node.js", icon: "Node" },
    { nombre: "React", icon: "React" },
    { nombre: "TailwindCSS", icon: "TailwindCSS" },
    { nombre: "TypeScript", icon: "TypeScript" },
    { nombre: "JavaScript", icon: "JavaScript" },
  ],
  experiencias: [
    {
      fecha: "2025 - 2028",
      titulo: "Tecnicatura Superior en Desarrollo de Software",
      descripcion:
        "Formalizando mis conocimiento a grado técnico y generalizando mis conocimientos de desarrollo web hacia un abanico más grande aún, todo tipo de software.",
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
        "Mi pasión por la programación comenzó con aprendizaje autodidacta. A través de peuqeños proyectos, tutoriales en YouTube y repositorios de GitHub, desarrollé las bases fundamentales que han impulsado mi crecimiento constante en el campo.",
    },
  ],
  proyectos: [
    {
      nombre: "Kura Medical",
      descripcion: "Plataforma de gestión de historias clínicas.",
      descripcionLarga:
        "Sistema completo de gestión clínica desarrollado con React, TypeScript y Supabase, diseñado para digitalizar por completo el historial médico de los pacientes y modernizar la administración de consultorios y centros de salud. Permite crear y gestionar historias clínicas electrónicas con soporte para recetas digitales, órdenes de estudios y derivaciones a especialistas. El módulo de turnos automatiza la asignación de horarios y envía recordatorios inteligentes para reducir las ausencias. Los profesionales pueden acceder al historial completo de cada paciente desde cualquier dispositivo, con búsqueda avanzada y filtros por fecha, especialidad o diagnóstico. Todo respaldado por Supabase con autenticación segura y permisos por rol.",
      imagen: "kura",
      enlace: "https://kuramedical.com.ar",
      tecnologias: ["React", "TailwindCSS", "TypeScript", "Supabase"],
    },
    {
      nombre: "Argentista",
      descripcion: "Proyecto personal para mostrar datos económicos de Argentina.",
      descripcionLarga:
        "Visualizador interactivo de indicadores económicos argentinos construido con Astro y React, diseñado para mantenerte al tanto de la compleja realidad económica del país con datos siempre actualizados. Consume múltiples APIs públicas en tiempo real para mostrar inflación, cotización del dólar oficial y blue, índices de riesgo país, tasas de interés y reservas del Banco Central. Los datos se presentan mediante gráficos dinámicos interactivos que permiten filtrar por rango de fechas, comparar indicadores entre sí y visualizar tendencias históricas. Incluye alertas personalizables para recibir notificaciones cuando ciertos indicadores alcanzan valores críticos, y un modo oscuro para facilitar la lectura nocturna.",
      imagen: "argentista",
      enlace: "https://argentista.vercel.app",
      tecnologias: ["Astro", "React", "TailwindCSS"],
    },
    {
      nombre: "EspartaGym",
      descripcion: "Sistema de gimnasio online para un gimnasio local.",
      descripcionLarga:
        "Plataforma integral para la administración de gimnasios desarrollada con Astro y React, pensada para simplificar la gestión diaria de centros deportivos. Permite registrar socios, asignar planes de entrenamiento personalizados y hacer seguimiento detallado del progreso físico de cada miembro. El panel administrativo centraliza el control de asistencias, la gestión de pagos y la comunicación directa con los socios a través de notificaciones push y correo electrónico. También incluye un módulo de reporting que genera estadísticas de retención, asistencia y rendimiento, facilitando la toma de decisiones para los dueños del gimnasio.",
      imagen: "espartagym",
      enlace: "https://www.espartagym.com",
      tecnologias: ["Astro", "React", "TailwindCSS"],
    },
    {
      nombre: "TurnoMaster",
      descripcion: "Plataforma para la gestión de turnos y citas.",
      descripcionLarga:
        "Sistema completo de reservas online construido desde cero con Astro y React, diseñado para profesionales que necesitan optimizar su agenda sin complicaciones. Cuenta con un panel de administración intuitivo desde donde se gestionan horarios, servicios y profesionales de forma centralizada. Los clientes pueden reservar turnos en segundos, recibir recordatorios automáticos por correo electrónico y sincronizar sus citas con Google Calendar y otras plataformas. Además, incluye un sistema de notificaciones inteligentes que reduce las inasistencias y permite reprogramar sobre la marcha. Todo el flujo está optimizado para funcionar tanto en dispositivos móviles como en escritorio, garantizando una experiencia fluida sin importar desde dónde se acceda.",
      imagen: "turnomaster",
      enlace: "https://www.turnomaster.com.ar/",
      tecnologias: ["Astro", "React", "TailwindCSS"],
    },
    {
      nombre: "El Socorro",
      descripcion: "Sitio web institucional para una empresa agrícola zonal.",
      descripcionLarga:
        "Web corporativa moderna construida con Astro y TailwindCSS para El Socorro SRL, una empresa del sector agropecuario con amplia trayectoria zonal. El sitio presenta un catálogo completo de productos y servicios agrícolas organizado por categorías, con fotos de alta calidad, descripciones técnicas y precios de referencia. Incluye una galería interactiva de maquinaria y proyectos realizados, un blog con noticias del sector y un formulario de contacto inteligente que deriva las consultas al área correspondiente. Todo el sitio está optimizado para SEO con meta tags, Open Graph y datos estructurados, logrando un excelente rendimiento en buscadores y una experiencia de navegación fluida tanto en desktop como en dispositivos móviles.",
      imagen: "elsocorro",
      enlace: "https://elsocorrosrl.com",
      tecnologias: ["Astro", "TailwindCSS"],
    },
    {
      nombre: "MadMind",
      descripcion: "Aplicación web para ayudar a personas con depresión y ansiedad.",
      descripcionLarga:
        "Plataforma de apoyo para la salud mental desarrollada con React, TypeScript y TailwindCSS, creada con el objetivo de brindar herramientas accesibles y gratuitas a personas que enfrentan depresión y ansiedad. Ofrece un diario personal privado con protección por PIN, ejercicios de respiración guiada con animaciones y temporizador integrado, y un sistema de seguimiento del estado de ánimo que genera gráficos semanales y mensuales para visualizar patrones emocionales. Incluye una biblioteca de recursos con artículos informativos, técnicas de relajación y una sección de emergencia con contactos de ayuda profesional. Todo el contenido está diseñado con un enfoque empático y colores suaves que transmiten calma, manteniendo la privacidad del usuario como prioridad absoluta al almacenar los datos únicamente en el navegador.",
      imagen: "madmind",
      enlace: "https://madmind.vercel.app",
      tecnologias: ["React", "TailwindCSS", "TypeScript"],
    },
  ],
  socialLinks: [
    {
      name: "Email",
      url: "marcoszinga94@gmail.com",
      icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6l-10,7L2,6",
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/+5493584406950",
      icon: "M16.8 5.7C14.4 2 9.5.9 5.7 3.2 2 5.5.8 10.5 3.2 14.2l.2.3-.8 3 3-.8.3.2c1.3.7 2.7 1.1 4.1 1.1 1.5 0 3-.4 4.3-1.2 3.7-2.4 4.8-7.3 2.5-11.1zm-2.1 7.7c-.4.6-.9 1-1.6 1.1-.4 0-.9.2-2.9-.6-1.7-.8-3.1-2.1-4.1-3.6-.6-.7-.9-1.6-1-2.5 0-.8.3-1.5.8-2 .2-.2.4-.3.6-.3H7c.2 0 .4 0 .5.4.2.5.7 1.7.7 1.8.1.1.1.3 0 .4.1.2 0 .4-.1.5-.1.1-.2.3-.3.4-.2.1-.3.3-.2.5.4.6.9 1.2 1.4 1.7.6.5 1.2.9 1.9 1.2.2.1.4.1.5-.1s.6-.7.8-.9c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.5.3.1.3.1.7-.1 1z",
    },
    {
      name: "GitHub",
      url: "https://github.com/marcoszinga94",
      icon: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    },
  ],
};

export default data;
