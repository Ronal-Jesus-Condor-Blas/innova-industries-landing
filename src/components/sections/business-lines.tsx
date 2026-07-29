"use client";

import { Beaker, Factory, FlaskConical, Layers3 } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { SolutionCardGrid } from "@/components/sections/solution-card-grid";
import { Reveal } from "@/components/ui/reveal";

const businessLines = {
  es: [
    {
      number: "01",
      icon: FlaskConical,
      title: "Aditivos para concreto y shotcrete",
      description:
        "Soluciones químicas para mejorar la trabajabilidad, el bombeo, el fraguado y el desempeño del concreto en proyectos de minería, infraestructura y construcción.",
      applications: ["Trabajabilidad", "Bombeo", "Fraguado"]
    },
    {
      number: "02",
      icon: Layers3,
      title: "Fibras para concreto y shotcrete",
      description:
        "Fibras sintéticas de refuerzo desarrolladas para mejorar el control de fisuras, la tenacidad y el comportamiento del concreto en aplicaciones de alta exigencia.",
      applications: ["Control de Fisuras", "Tenacidad", "Refuerzo"]
    },
    {
      number: "03",
      icon: Factory,
      title: "Polímeros industriales",
      description:
        "Materiales y productos poliméricos para procesos industriales que requieren consistencia, durabilidad, trazabilidad y capacidad de respuesta local.",
      applications: ["Durabilidad", "Trazabilidad", "Respuesta Local"]
    },
    {
      number: "04",
      icon: Beaker,
      title: "Soluciones químicas industriales",
      description:
        "Desarrollo y suministro de productos químicos para manufactura, mantenimiento, tratamiento de materiales y operaciones industriales especializadas.",
      applications: ["Manufactura", "Mantenimiento", "Tratamiento"]
    }
  ],
  en: [
    {
      number: "01",
      icon: FlaskConical,
      title: "Concrete and shotcrete admixtures",
      description:
        "Chemical solutions that improve workability, pumping, setting and concrete performance in mining, infrastructure and construction projects.",
      applications: ["Workability", "Pumping", "Setting"]
    },
    {
      number: "02",
      icon: Layers3,
      title: "Concrete and shotcrete fibers",
      description:
        "Synthetic reinforcement fibers developed to improve crack control, toughness and concrete behavior in high-demand applications.",
      applications: ["Crack Control", "Toughness", "Reinforcement"]
    },
    {
      number: "03",
      icon: Factory,
      title: "Industrial polymers",
      description:
        "Polymeric materials and products for industrial processes that require consistency, durability, traceability and responsive local support.",
      applications: ["Durability", "Traceability", "Local Response"]
    },
    {
      number: "04",
      icon: Beaker,
      title: "Industrial chemical solutions",
      description:
        "Development and supply of chemical products for manufacturing, maintenance, material treatment and specialized industrial operations.",
      applications: ["Manufacturing", "Maintenance", "Treatment"]
    }
  ]
} as const;

export function BusinessLines() {
  const { locale } = useLanguage();
  const copy =
    locale === "es"
      ? {
          eyebrow: "Líneas de negocio",
          title: "Soluciones especializadas para",
          accent: "operaciones industriales",
          description:
            "Desarrollamos, fabricamos y suministramos productos técnicos para minería, construcción y procesos industriales, combinando capacidad productiva, control de calidad y acompañamiento especializado."
        }
      : {
          eyebrow: "Business lines",
          title: "Specialized solutions for",
          accent: "industrial operations",
          description:
            "We develop, manufacture and supply technical products for mining, construction and industrial processes, combining production capabilities, quality control and specialized support."
        };

  return (
    <section id="lineas-de-negocio" className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="grid items-end gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
              {copy.eyebrow}
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-normal leading-[1.05] tracking-[-0.035em] text-innova-black sm:text-5xl lg:text-6xl">
              {copy.title}
              <span className="block font-semibold text-primary">{copy.accent}</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:justify-self-end">
            {copy.description}
          </p>
        </Reveal>

        <SolutionCardGrid
          items={businessLines[locale]}
          valuePrefix="business-line"
          columns={4}
        />
      </div>
    </section>
  );
}
