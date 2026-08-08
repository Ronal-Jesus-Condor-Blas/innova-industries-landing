import { ClipboardCheck, Factory } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const communicationCategories = [
  "Política de calidad",
  "Comunicados oficiales"
] as const;

export type CommunicationCategory = (typeof communicationCategories)[number];

export type Communication = {
  id: string;
  title: string;
  titleEn: string;
  category: CommunicationCategory;
  date: string;
  summary: string;
  summaryEn: string;
  icon: LucideIcon;
  featured?: boolean;
};

export const communications: Communication[] = [
  {
    id: "politica-calidad-institucional",
    title: "Política de calidad institucional",
    titleEn: "Institutional quality policy",
    category: "Política de calidad",
    date: "2026-05-19",
    summary: "INNOVA INDUSTRIES AMERICA SAC reafirma su compromiso con la fabricación, comercialización y soporte técnico de soluciones industriales bajo criterios de calidad, cumplimiento normativo y mejora continua.",
    summaryEn: "INNOVA INDUSTRIES AMERICA SAC reaffirms its commitment to manufacturing, commercialization and technical support for industrial solutions under quality, regulatory compliance and continuous improvement standards.",
    icon: ClipboardCheck,
    featured: true
  },
  {
    id: "comunicados-oficiales-corporativos",
    title: "Comunicados oficiales corporativos",
    titleEn: "Official corporate announcements",
    category: "Comunicados oficiales",
    date: "2026-05-19",
    summary: "Canal destinado a publicar actualizaciones institucionales, disposiciones internas, novedades operativas y mensajes oficiales de la empresa.",
    summaryEn: "A channel for institutional updates, internal provisions, operational news and official company messages.",
    icon: Factory
  },
  {
    id: "comunicado-operativo-mayo",
    title: "Comunicado operativo de mayo",
    titleEn: "May operational announcement",
    category: "Comunicados oficiales",
    date: "2026-05-20",
    summary: "Informamos sobre la actualización de los horarios de atención y protocolos de ingreso a planta.",
    summaryEn: "We are sharing updates to service hours and plant access protocols.",
    icon: Factory
  },
  {
    id: "nueva-politica-calidad-2026",
    title: "Nueva política de calidad 2026",
    titleEn: "New 2026 quality policy",
    category: "Política de calidad",
    date: "2026-05-20",
    summary: "Se refuerzan los estándares de inspección y control en todos los procesos productivos.",
    summaryEn: "Inspection and control standards are being strengthened across all production processes.",
    icon: ClipboardCheck
  },
  {
    id: "comunicado-operativo-agosto",
    title: "Comunicado operativo de agosto",
    titleEn: "August operational announcement",
    category: "Comunicados oficiales",
    date: "2026-08-05",
    summary:
      "Innova Industries America informa los lineamientos de coordinación operativa para agosto, orientados a asegurar la continuidad de las actividades, la atención oportuna y el cumplimiento de los protocolos internos.",
    summaryEn:
      "Innova Industries America announces its operational coordination guidelines for August, focused on ensuring business continuity, timely service and compliance with internal protocols.",
    icon: Factory
  },
  {
    id: "comunicado-operativo-julio",
    title: "Comunicado operativo de julio",
    titleEn: "July operational announcement",
    category: "Comunicados oficiales",
    date: "2026-07-08",
    summary:
      "Se comunican las disposiciones operativas vigentes para julio, con énfasis en la planificación de entregas, la coordinación entre áreas y la continuidad del servicio.",
    summaryEn:
      "The operational provisions for July are announced, with an emphasis on delivery planning, cross-functional coordination and service continuity.",
    icon: Factory
  }
];
