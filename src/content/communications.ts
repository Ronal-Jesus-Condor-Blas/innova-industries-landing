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
};

export const communications: Communication[] = [
  {
    id: "politica-calidad-institucional",
    title: "Política de calidad institucional",
    category: "Política de calidad",
    date: "2026-05-19",
    summary:
      "INNOVA INDUSTRIES AMERICA SAC reafirma su compromiso con la fabricación, comercialización y soporte técnico de soluciones industriales bajo criterios de calidad, cumplimiento normativo y mejora continua.",
    icon: ClipboardCheck
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
    icon: Award
  },
  {
    id: "lineamientos-ssoma",
    title: "Lineamientos de seguridad, salud y medio ambiente",
    category: "Seguridad, salud y medio ambiente",
    date: "2026-05-19",
    summary:
      "Difusión de prácticas internas orientadas a operaciones responsables, prevención de riesgos, orden operativo y cuidado ambiental.",
    icon: Leaf
  },
  {
    id: "actualizaciones-institucionales",
    title: "Actualizaciones institucionales",
    category: "Noticias institucionales",
    date: "2026-05-19",
    summary:
      "Espacio para compartir novedades de la empresa, mejoras implementadas, nuevos proyectos y avances relevantes para clientes y aliados estratégicos.",
    icon: ShieldCheck
  }
];
