export interface LegalSection {
  title: string;
  paragraphs: string[];
}

export interface LegalDoc {
  id: "privacy" | "terms";
  title: string;
  updated: string;
  sections: LegalSection[];
}

const disclaimer =
  "Este texto es informativo y no constituye asesoramiento legal. Te recomiendo revisarlo con un profesional antes de publicar tu sitio.";

export const legalDocuments: LegalDoc[] = [
  {
    id: "privacy",
    title: "Política de privacidad",
    updated: "octubre de 2026",
    sections: [
      {
        title: "Responsable",
        paragraphs: [
          "Este sitio pertenece y es operado por Marcos F. Zingaretti, desarrollador web. Cualquier consulta sobre tus datos podés hacerla a marcoszinga94@gmail.com.",
        ],
      },
      {
        title: "Datos que recopilo",
        paragraphs: [
          "Este sitio no tiene formularios que almacenen información por sí solos. Solo recibo los datos que me enviás voluntariamente por correo o WhatsApp: tu nombre, tu contacto y los detalles de tu proyecto.",
          "No se pide ni se almacena información de pago en este sitio.",
        ],
      },
      {
        title: "Finalidad",
        paragraphs: [
          "Uso esos datos únicamente para responder tu consulta, preparar una propuesta, coordinar el trabajo y, si corresponde, emitir la facturación.",
        ],
      },
      {
        title: "Base legal",
        paragraphs: [
          "Tratamos tus datos sobre la base de tu consentimiento (al contactarme) y, si avanzamos, de la ejecución del contrato de servicios.",
        ],
      },
      {
        title: "Conservación",
        paragraphs: [
          "Los datos se conservan mientras dure la relación o el tiempo necesario para cumplir obligaciones legales. Podés pedir su eliminación en cualquier momento.",
        ],
      },
      {
        title: "Compartir con terceros",
        paragraphs: [
          "No vendo ni comparto tus datos con terceros con fines publicitarios. Uso proveedores de hosting y comunicación (Vercel para el alojamiento, y el servicio de correo o WhatsApp) que actúan como encargados del tratamiento.",
        ],
      },
      {
        title: "Analítica",
        paragraphs: [
          "Este sitio utiliza analítica anónima y agregada (Vercel Analytics) para conocer el volumen de visitas. No se usan cookies de seguimiento personal ni perfiles publicitarios.",
        ],
      },
      {
        title: "Tus derechos",
        paragraphs: [
          "Según la normativa aplicable (Reglamento General de Protección de Datos europeo y Ley Argentina 25.326), tenés derecho al acceso, la rectificación, la supresión, la limitación, la oposición y la portabilidad de tus datos. Podés ejercerlos escribiendo a marcoszinga94@gmail.com.",
        ],
      },
      {
        title: "Enlaces a terceros",
        paragraphs: [
          "Este sitio enlaza a servicios externos (WhatsApp, GitHub y proyectos propios). Cada servicio aplica su propia política de privacidad.",
        ],
      },
      {
        title: "Vigencia",
        paragraphs: [
          "Esta política puede actualizarse; la fecha de la última versión figura al inicio del documento. El uso continuado del sitio implica la aceptación de la versión vigente.",
          disclaimer,
        ],
      },
    ],
  },
  {
    id: "terms",
    title: "Términos y condiciones",
    updated: "octubre de 2026",
    sections: [
      {
        title: "Objeto",
        paragraphs: [
          "Estos términos regulan la contratación de servicios de diseño y desarrollo web de Marcos F. Zingaretti.",
          "Al solicitar un presupuesto y aceptar una propuesta, se entiende que aceptás estas condiciones.",
        ],
      },
      {
        title: "Presupuestos y alcance",
        paragraphs: [
          "Cada proyecto se cotiza de forma individual. La propuesta escrita describe el alcance, los plazos y el precio antes de comenzar.",
          "Cualquier tarea no incluida en el alcance se cotiza por separado y debe aprobarse antes de ejecutarse.",
        ],
      },
      {
        title: "Forma de pago",
        paragraphs: [
          "Los proyectos se abonan de forma fraccionada, por lo general parte al inicio y el saldo a la entrega, según lo acordado en la propuesta.",
        ],
      },
      {
        title: "Propiedad intelectual",
        paragraphs: [
          "Una vez abonado el proyecto, el sitio o sistema y los contenidos entregados pasan a ser de tu propiedad.",
          "Me reservo el derecho de mostrar el trabajo en mi portafolio, salvo que pidamos lo contrario por escrito.",
          "Las librerías y herramientas de terceros se integran respetando sus propias licencias.",
        ],
      },
      {
        title: "Plazos",
        paragraphs: [
          "Los plazos indicados en la propuesta son estimados. Las demoras originadas en el cliente, como la entrega de contenidos, accesos o definiciones, pueden extenderlos y se notifican en cada caso.",
        ],
      },
      {
        title: "Garantía y correcciones",
        paragraphs: [
          "Después de la entrega se incluye un período de corrección de errores, en general de 30 días, para fallas del desarrollo, sin costo.",
          "Los cambios de alcance o las nuevas funcionalidades se cotizan aparte.",
        ],
      },
      {
        title: "Mantenimiento y soporte",
        paragraphs: [
          "El mantenimiento continuo es un servicio aparte y opcional, que se contrata con sus propias condiciones.",
        ],
      },
      {
        title: "Responsabilidad",
        paragraphs: [
          "La responsabilidad del desarrollador se limita al importe efectivamente facturado por el proyecto. No se responde por daños indirectos ni lucro cesante.",
        ],
      },
      {
        title: "Ley aplicable",
        paragraphs: [
          "Estas condiciones se rigen por la legislación argentina. Ante cualquier controversia, las partes se someten a los tribunales de la Ciudad de Córdoba, Argentina.",
        ],
      },
      {
        title: "Vigencia",
        paragraphs: [
          "Estos términos pueden actualizarse; la fecha de la versión vigente figura al inicio del documento.",
          disclaimer,
        ],
      },
    ],
  },
];
