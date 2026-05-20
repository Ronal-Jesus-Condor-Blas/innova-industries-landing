import {
  Award,
  BadgeCheck,
  ClipboardCheck,
  Factory,
  Leaf,
  ShieldCheck
} from "lucide-react";

export type Communication = {
  title: string;
  type: string;
  date: string;
  summary: string;
  icon: typeof ClipboardCheck;
};

export const communications: Communication[] = [
  {
    title: "Politica de calidad",
    type: "Calidad",
    date: "Documento institucional",
    summary:
      "Compromiso permanente con productos confiables, trazabilidad operativa, mejora continua y atencion tecnica alineada a los requerimientos de nuestros clientes industriales.",
    icon: ClipboardCheck
  },
  {
    title: "Comunicado institucional",
    type: "Comunicado oficial",
    date: "Actualizacion corporativa",
    summary:
      "Canal formal para informar novedades de la empresa, avances operativos, cambios relevantes y anuncios dirigidos a clientes, proveedores y aliados estrategicos.",
    icon: Factory
  },
  {
    title: "Certificaciones y controles",
    type: "Cumplimiento",
    date: "Gestion documentaria",
    summary:
      "Espacio destinado a compartir certificaciones, respaldos tecnicos, controles internos y evidencias de cumplimiento para operaciones industriales exigentes.",
    icon: Award
  },
  {
    title: "Seguridad, salud y medio ambiente",
    type: "SSOMA",
    date: "Gestion preventiva",
    summary:
      "Difusion de buenas practicas, lineamientos preventivos y compromisos ambientales orientados a una operacion responsable y sostenible.",
    icon: Leaf
  },
  {
    title: "Noticias institucionales",
    type: "Noticias",
    date: "Relacion corporativa",
    summary:
      "Publicaciones sobre hitos comerciales, fortalecimiento tecnico, participacion en proyectos y desarrollo de soluciones para mineria e industria.",
    icon: BadgeCheck
  },
  {
    title: "Seguridad de suministro",
    type: "Operaciones",
    date: "Continuidad",
    summary:
      "Informacion sobre fabricacion local, disponibilidad, seguimiento de despachos y capacidad de respuesta para proyectos criticos.",
    icon: ShieldCheck
  }
];
