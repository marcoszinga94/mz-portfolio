export interface TimelineItem {
  fecha: string;
  titulo: string;
  descripcion: string;
}

export interface Proyecto {
  nombre: string;
  descripcion: string;
  descripcionLarga?: string;
  imagen: string;
  enlace: string;
  tecnologias?: string[];
}

export interface Habilidad {
  nombre: string;
  icon: string;
}

export interface MenuItem {
  name: string;
  url: string;
}

export interface Servicio {
  nombre: string;
  descripcion: string;
  caracteristicas: string[];
  /** Nombre de icono Phosphor (ej: "ph:storefront") */
  icono: string;
}

export interface ProcesoStep {
  paso: string;
  titulo: string;
  descripcion: string;
}

export interface SocialLink {
  name: "Email" | "WhatsApp" | "GitHub" | "LinkedIn" | "Instagram";
  url: string;
}

export interface FaqItem {
  pregunta: string;
  respuesta: string;
}

export interface Metrica {
  valor: string;
  etiqueta: string;
}
