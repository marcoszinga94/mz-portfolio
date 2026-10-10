import type {
  Habilidad,
  TimelineItem,
  Proyecto,
  SocialLink,
  Servicio,
  ProcesoStep,
  FaqItem,
  Metrica,
} from "../types";

interface PortfolioData {
  sobreMi: string[];
  sobreMiCorto: string;
  habilidades: Habilidad[];
  experiencias: TimelineItem[];
  proyectos: Proyecto[];
  socialLinks: SocialLink[];
  servicios: Servicio[];
  proceso: ProcesoStep[];
  metricas: Metrica[];
  faq: FaqItem[];
}

const data: PortfolioData = {
  sobreMi: [
    "Mi interés por la tecnología arrancó en la adolescencia: a los 15 años descubrí en la programación una vocación que terminó definiendo mi carrera profesional.",
    "Empecé con proyectos personales, explorando cada línea de código hasta entender que desarrollar software va más allá de la sintaxis: se trata de resolver problemas reales y crear soluciones con impacto.",
    "Hoy trabajo en el desarrollo de aplicaciones completas, aplicando buenas prácticas y priorizando la eficiencia y la calidad en cada entrega.",
  ],
  sobreMiCorto:
    "Soy desarrollador web full stack. Empecé de forma autodidacta y hoy construyo aplicaciones completas, con foco en resolver problemas reales y cuidar la calidad en cada entrega.",
  habilidades: [
    { nombre: "Astro", icon: "Astro" },
    { nombre: "Node.js", icon: "Node" },
    { nombre: "React", icon: "React" },
    { nombre: "TailwindCSS", icon: "TailwindCSS" },
    { nombre: "TypeScript", icon: "TypeScript" },
    { nombre: "JavaScript", icon: "JavaScript" },
    { nombre: "Python", icon: "Python" },
    { nombre: "IA", icon: "IA" },
  ],
  experiencias: [
    {
      fecha: "2025 - 2028",
      titulo: "Tecnicatura Superior en Desarrollo de Software",
      descripcion:
        "Formalizando mis conocimientos a nivel técnico y ampliando mi desarrollo web hacia todo tipo de software.",
    },
    {
      fecha: "2020 - 2021",
      titulo: "Argentina Programa 2.0 - Formalización de estudios",
      descripcion:
        "Avancé en mi trayectoria formalizando mis estudios en programación a través del programa Argentina Programa 2.0. En esta etapa adquirí competencias avanzadas trabajando con frameworks como Angular y optimizando el uso de diversas tecnologías.",
    },
    {
      fecha: "...2020",
      titulo: "Autodidacta en programación",
      descripcion:
        "Mi pasión por la programación comenzó de forma autodidacta. A través de pequeños proyectos, tutoriales y repositorios de GitHub, desarrollé las bases que impulsan mi crecimiento constante.",
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
    { name: "Email", url: "marcoszinga94@gmail.com" },
    { name: "WhatsApp", url: "https://wa.me/+5493584406950" },
    { name: "GitHub", url: "https://github.com/marcoszinga94" },
  ],
  servicios: [
    {
      nombre: "Webs que traen consultas",
      descripcion: "Sitios modernos, veloces y pensados para convertir visitas en clientes reales.",
      caracteristicas: [
        "Diseño a medida y responsive",
        "Optimización SEO desde el inicio",
        "WhatsApp y formularios integrados",
        "Carga rápida en cualquier dispositivo",
      ],
      icono: "ph:storefront",
    },
    {
      nombre: "Sistemas que ordenan tu negocio",
      descripcion:
        "Plataformas completas con panel de administración, usuarios y datos en la nube.",
      caracteristicas: [
        "Panel de administración claro",
        "Autenticación segura y permisos por rol",
        "Base de datos en la nube",
        "Funciones a medida para tu operación",
      ],
      icono: "ph:devices",
    },
    {
      nombre: "Soporte que te quita problemas",
      descripcion: "Tu sitio siempre actualizado, seguro y funcionando sin sobresaltos.",
      caracteristicas: [
        "Actualizaciones y mejoras continuas",
        "Copias de seguridad y monitoreo",
        "Corrección de errores prioritaria",
        "Asesoramiento técnico permanente",
      ],
      icono: "ph:headset",
    },
  ],
  proceso: [
    {
      paso: "1",
      titulo: "Consulta inicial",
      descripcion:
        "Hablamos de tu proyecto, tus objetivos y tus necesidades. Sin costo y sin compromiso.",
    },
    {
      paso: "2",
      titulo: "Propuesta y presupuesto",
      descripcion: "Te presento un plan claro con alcance, plazos y precio antes de empezar.",
    },
    {
      paso: "3",
      titulo: "Desarrollo",
      descripcion: "Construyo tu solución con avances periódicos y comunicación constante.",
    },
    {
      paso: "4",
      titulo: "Entrega y soporte",
      descripcion: "Ponemos el proyecto en marcha y te acompaño después del lanzamiento.",
    },
  ],
  metricas: [
    { valor: "6", etiqueta: "Proyectos en producción" },
    { valor: "24 h", etiqueta: "Respuesta a tu consulta" },
    { valor: "2 a 8", etiqueta: "Semanas según el proyecto" },
  ],
  faq: [
    {
      pregunta: "¿Cuánto tarda mi proyecto?",
      respuesta:
        "Una web institucional suele estar lista en 2 a 3 semanas. Un sistema con panel y usuarios toma entre 4 y 8 semanas, según el alcance. Los plazos quedan fijados en la propuesta antes de empezar.",
    },
    {
      pregunta: "¿Cuánto cuesta una web o un sistema?",
      respuesta:
        "Cada proyecto es distinto, por eso no manejo precios de lista. Después de la consulta inicial te paso un presupuesto cerrado, con alcance y plazos, sin costos escondidos.",
    },
    {
      pregunta: "¿Trabajás con negocios de otras ciudades?",
      respuesta:
        "Sí. Trabajo de forma remota con clientes de todo el país. Las reuniones se hacen por videollamada y la comunicación diaria es por WhatsApp.",
    },
    {
      pregunta: "¿Hacés webs a medida o usás plantillas?",
      respuesta:
        "Diseño y desarrollo a medida. No uso plantillas genéricas: cada web se adapta a tu negocio, no al revés.",
    },
    {
      pregunta: "¿Qué necesito tener listo para empezar?",
      respuesta:
        "Solo tus objetivos y, si los tenés, tu logo, textos e imágenes. Todo lo demás lo definimos juntos en la consulta inicial.",
    },
    {
      pregunta: "¿Qué pasa después de la entrega?",
      respuesta:
        "Incluyo una capacitación para que puedas usarlo y un período de acompañamiento. Si querés, podés sumar un plan de mantenimiento mensual.",
    },
    {
      pregunta: "¿Puedo pedir cambios más adelante?",
      respuesta:
        "Sí. El proyecto queda a tu nombre y cualquier cambio se cotiza aparte, siempre avisándote antes de avanzar.",
    },
    {
      pregunta: "¿Mis datos y los de mis clientes están seguros?",
      respuesta:
        "Trabajo con bases de datos en la nube, autenticación segura y permisos por rol. Todos los accesos quedan bajo tu control.",
    },
  ],
};

export default data;
