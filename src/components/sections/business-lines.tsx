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
      title: "Sostenimiento y tunelería",
      description:
        "Aditivos y fibras de refuerzo desarrollados para mejorar el desempeño en operaciones subterráneas y proyectos de alta exigencia.",
      applications: ["Refuerzo", "Control", "Desempeño"],
      image: "/assets/industries/infrastructure-tunnel.png"
    },
    {
      number: "02",
      icon: Layers3,
      title: "Sistemas poliméricos y conducción",
      description:
        "Tuberías, acoples y componentes diseñados para brindar conexiones seguras, alta durabilidad y continuidad operativa.",
      applications: ["Conducción", "Conexión", "Durabilidad"],
      image: "/assets/industries/polymer-piping.png"
    },
    {
      number: "03",
      icon: Factory,
      title: "Química para movilidad e industria",
      description:
        "Soluciones especializadas orientadas a proteger equipos, optimizar procesos y contribuir a operaciones más eficientes.",
      applications: ["Protección", "Eficiencia", "Sostenibilidad"],
      image: "/assets/industries/industrial-chemistry-natural.png"
    },
    {
      number: "04",
      icon: Beaker,
      title: "Concreto para proyectos",
      description:
        "Diseños adaptados a distintas aplicaciones de obra, con enfoque en consistencia, desempeño y respuesta técnica.",
      applications: ["Adaptabilidad", "Consistencia", "Confiabilidad"],
      image: "/assets/industries/concrete-additive.png"
    }
  ],
  en: [
    {
      number: "01",
      icon: FlaskConical,
      title: "Ground support and tunneling",
      description:
        "Admixtures and reinforcement fibers developed to improve performance in underground operations and high-demand projects.",
      applications: ["Reinforcement", "Control", "Performance"],
      image: "/assets/industries/infrastructure-tunnel.png"
    },
    {
      number: "02",
      icon: Layers3,
      title: "Polymer systems and conveyance",
      description:
        "Pipes, couplings and components designed to provide secure connections, high durability and operational continuity.",
      applications: ["Conveyance", "Connection", "Durability"],
      image: "/assets/industries/polymer-piping.png"
    },
    {
      number: "03",
      icon: Factory,
      title: "Chemistry for mobility and industry",
      description:
        "Specialized solutions focused on protecting equipment, optimizing processes and contributing to more efficient operations.",
      applications: ["Protection", "Efficiency", "Sustainability"],
      image: "/assets/industries/industrial-chemistry-natural.png"
    },
    {
      number: "04",
      icon: Beaker,
      title: "Concrete for projects",
      description:
        "Designs adapted to different project applications, with a focus on consistency, performance and technical response.",
      applications: ["Adaptability", "Consistency", "Reliability"],
      image: "/assets/industries/concrete-additive.png"
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
    <section id="lineas-de-negocio" className="bg-background py-16 sm:py-20 lg:py-24 xl:py-[4.5rem]">
      <div className="mx-auto max-w-[68rem] px-4 sm:px-6 lg:px-8">
        <Reveal className="grid items-end gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
              {copy.eyebrow}
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-normal leading-[1.05] tracking-[-0.035em] text-innova-black sm:text-5xl lg:text-6xl xl:text-[3.15rem]">
              {copy.title}
              <span className="block font-semibold text-primary">{copy.accent}</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:justify-self-end xl:text-base xl:leading-7">
            {copy.description}
          </p>
        </Reveal>

        <SolutionCardGrid
          items={businessLines[locale]}
          valuePrefix="business-line"
          columns={4}
          variant="image"
        />
      </div>
    </section>
  );
}
