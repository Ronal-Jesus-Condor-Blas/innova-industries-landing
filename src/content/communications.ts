import {
  Award,
  ClipboardCheck,
  Factory,
  Leaf,
  ShieldCheck
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const communicationCategories = [
  "Política de calidad",
  "Comunicados oficiales",
  "Certificaciones",
  "Seguridad, salud y medio ambiente",
  "Noticias institucionales"
] as const;

export type CommunicationCategory = (typeof communicationCategories)[number];

export type Communication = {
  id: string;
  title: string;
  category: CommunicationCategory;
  date: string;
  summary: string;
  icon: LucideIcon;
  featured?: boolean;
};

export const communications: Communication[] = [
  {
    id: "politica-calidad-institucional",
    title: "Política de calidad institucional",
    category: "Política de calidad",
    date: "2026-05-19",
    summary:
      "INNOVA INDUSTRIES AMERICA SAC reafirma su compromiso con la fabricación, comercialización y soporte técnico de soluciones industriales bajo criterios de calidad, cumplimiento normativo y mejora continua.",
    icon: ClipboardCheck,
    featured: true
  },
  {
    id: "comunicados-oficiales-corporativos",
    title: "Comunicados oficiales corporativos",
    category: "Comunicados oficiales",
    date: "2026-05-19",
    summary:
      "Canal destinado a publicar actualizaciones institucionales, disposiciones internas, novedades operativas y mensajes oficiales de la empresa.",
    icon: Factory
  },
  {
    id: "avances-gestion-certificacion",
    title: "Avances en gestión y certificación",
    category: "Certificaciones",
    date: "2026-05-19",
    summary:
      "La empresa fortalece sus procesos documentarios, técnicos y operativos para sostener estándares de calidad aplicables a sus líneas industriales.",
    icon: Award,
    featured: true
  },
  {
    id: "lineamientos-ssoma",
    title: "Lineamientos de seguridad, salud y medio ambiente",
    category: "Seguridad, salud y medio ambiente",
    date: "2026-05-18",
    summary:
      "Difusión de prácticas internas orientadas a operaciones responsables, prevención de riesgos, orden operativo y cuidado ambiental.",
    icon: Leaf
  },
  {
    id: "actualizaciones-institucionales",
    title: "Actualizaciones institucionales",
    category: "Noticias institucionales",
    date: "2026-05-18",
    summary:
      "Espacio para compartir novedades de la empresa, mejoras implementadas, nuevos proyectos y avances relevantes para clientes y aliados estratégicos.",
    icon: ShieldCheck
  },
  {
    id: "nueva-certificacion-iso-9001",
    title: "Obtención de certificación ISO 9001:2015",
    category: "Certificaciones",
    date: "2026-05-10",
    summary:
      "Nos complace anunciar que hemos revalidado nuestra certificación internacional, garantizando la eficiencia en nuestros procesos de gestión.",
    icon: Award,
    featured: true
  },
  {
    id: "capacitacion-primeros-auxilios",
    title: "Capacitación anual en primeros auxilios industriales",
    category: "Seguridad, salud y medio ambiente",
    date: "2026-05-02",
    summary:
      "Como parte de nuestro plan SSOMA, el equipo de planta y operaciones completó satisfactoriamente el taller práctico de respuesta a emergencias.",
    icon: Leaf
  },
  {
    id: "horario-feriado-junio",
    title: "Horarios operativos por feriado nacional",
    category: "Comunicados oficiales",
    date: "2026-04-25",
    summary:
      "Se informa a todos nuestros proveedores y socios estratégicos que la planta operará en horario reducido durante los próximos feriados.",
    icon: Factory
  },
  {
    id: "participacion-perumin-2026",
    title: "Participación en PERUMIN 2026",
    category: "Noticias institucionales",
    date: "2026-04-15",
    summary:
      "Innova America estará presente en la convención minera más importante del país exponiendo nuestras últimas soluciones estructurales.",
    icon: ShieldCheck
  },
  {
    id: "revision-manual-calidad",
    title: "Actualización del manual de control de calidad",
    category: "Política de calidad",
    date: "2026-04-01",
    summary:
      "El comité técnico ha aprobado la versión 4.0 de nuestro manual de inspección, endureciendo las tolerancias radiográficas y dimensionales.",
    icon: ClipboardCheck
  },
  {
    id: "nueva-politica-seguridad-industrial",
    title: "Nueva política de seguridad industrial",
    category: "Seguridad, salud y medio ambiente",
    date: "2026-05-20",
    summary:
      "Implementamos nuevas normas para la protección de nuestro personal y la prevención de accidentes en planta.",
    icon: Leaf
  },
  {
    id: "certificacion-ambiental-2026",
    title: "Certificación ambiental 2026",
    category: "Certificaciones",
    date: "2026-05-20",
    summary:
      "Logramos la certificación ambiental por buenas prácticas en gestión de residuos y uso eficiente de recursos.",
    icon: Award
  },
  {
    id: "comunicado-operativo-mayo",
    title: "Comunicado operativo de mayo",
    category: "Comunicados oficiales",
    date: "2026-05-20",
    summary:
      "Informamos sobre la actualización de los horarios de atención y protocolos de ingreso a planta.",
    icon: Factory
  },
  {
    id: "nueva-politica-calidad-2026",
    title: "Nueva política de calidad 2026",
    category: "Política de calidad",
    date: "2026-05-20",
    summary:
      "Se refuerzan los estándares de inspección y control en todos los procesos productivos.",
    icon: ClipboardCheck
  },
  {
    id: "noticia-institucional-premio",
    title: "Premio a la innovación institucional 2026",
    category: "Noticias institucionales",
    date: "2026-05-20",
    summary:
      "INNOVA INDUSTRIES AMERICA SAC ha sido reconocida por su aporte a la innovación en soluciones industriales.",
    icon: ShieldCheck
  },
  {
    id: "campana-salud-trabajadores",
    title: "Campaña de salud para trabajadores",
    category: "Seguridad, salud y medio ambiente",
    date: "2026-05-19",
    summary:
      "Se realizó una campaña médica preventiva para todo el personal operativo y administrativo.",
    icon: Leaf
  },
  {
    id: "noticia-institucional-expansion",
    title: "Expansión de operaciones a nivel nacional",
    category: "Noticias institucionales",
    date: "2026-05-19",
    summary:
      "La empresa amplía su cobertura de servicios industriales a nuevas regiones del país.",
    icon: ShieldCheck
  },
  {
    id: "comunicado-cambio-gerencia",
    title: "Cambio en la gerencia general",
    category: "Comunicados oficiales",
    date: "2026-05-18",
    summary:
      "Se comunica el nombramiento de un nuevo gerente general para el periodo 2026-2028.",
    icon: Factory
  },
  {
    id: "certificacion-seguridad-industrial",
    title: "Certificación en seguridad industrial avanzada",
    category: "Certificaciones",
    date: "2026-05-18",
    summary:
      "Obtuvimos la certificación por la implementación de sistemas avanzados de seguridad en planta.",
    icon: Award
  },
  {
    id: "noticia-institucional-aniversario",
    title: "Celebración del aniversario institucional",
    category: "Noticias institucionales",
    date: "2026-05-17",
    summary:
      "Conmemoramos un año más de logros y crecimiento junto a nuestros colaboradores y clientes.",
    icon: ShieldCheck
  }
];
