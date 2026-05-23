export interface TimelineItem {
  fecha: string;
  titulo: string;
  descripcion: string;
}

export interface Proyecto {
  nombre: string;
  descripcion: string;
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

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

// Tipos para eventos personalizados
export interface CustomNavigateEvent extends Event {
  destination: { url: string };
  intercept(options: { handler: () => Promise<void> }): void;
}
