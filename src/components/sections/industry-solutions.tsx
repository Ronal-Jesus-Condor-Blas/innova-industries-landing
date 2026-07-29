"use client";

import { Building2, Factory, Pickaxe } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { SolutionCardGrid } from "@/components/sections/solution-card-grid";
import { Reveal } from "@/components/ui/reveal";

const industries = {
  es: [
    {
      number: "01",
      icon: Pickaxe,
      title: "Minería",
      description:
        "Productos químicos, fibras de refuerzo y asistencia técnica para operaciones mineras que requieren seguridad, resistencia, productividad y continuidad operacional.",
      applications: ["Seguridad", "Productividad", "Continuidad Operacional"]
    },
    {
      number: "02",
      icon: Building2,
      title: "Construcción e infraestructura",
      description:
        "Aditivos, fibras y soluciones técnicas orientadas a mejorar el desempeño, la productividad y la durabilidad del concreto en obras civiles e industriales.",
      applications: ["Concreto", "Obras Civiles", "Durabilidad"]
    },
    {
      number: "03",
      icon: Factory,
      title: "Manufactura e industria",
      description:
        "Productos químicos y poliméricos para procesos que requieren suministro confiable, trazabilidad, soporte técnico y soluciones adaptadas a cada operación.",
      applications: ["Suministro Confiable", "Trazabilidad", "Soporte Técnico"]
    }
  ],
  en: [
    {
      number: "01",
      icon: Pickaxe,
      title: "Mining",
      description:
        "Chemical products, reinforcement fibers and technical assistance for mining operations that require safety, strength, productivity and operational continuity.",
      applications: ["Safety", "Productivity", "Operational Continuity"]
    },
    {
      number: "02",
      icon: Building2,
      title: "Construction and infrastructure",
      description:
        "Admixtures, fibers and technical solutions designed to improve concrete performance, productivity and durability in civil and industrial projects.",
      applications: ["Concrete", "Civil Works", "Durability"]
    },
    {
      number: "03",
      icon: Factory,
      title: "Manufacturing and industry",
      description:
        "Chemical and polymeric products for processes that require reliable supply, traceability, technical support and solutions adapted to each operation.",
      applications: ["Reliable Supply", "Traceability", "Technical Support"]
    }
  ]
} as const;

export function IndustrySolutions() {
  const { locale } = useLanguage();
  const copy =
    locale === "es"
      ? {
          eyebrow: "Soluciones por industria",
          title: "Experiencia aplicada a",
          accent: "cada operación",
          description:
            "Integramos conocimiento técnico, productos especializados y acompañamiento continuo para responder con precisión a las exigencias de cada industria."
        }
      : {
          eyebrow: "Solutions by industry",
          title: "Expertise applied to",
          accent: "every operation",
          description:
            "We combine technical knowledge, specialized products and continuous support to respond precisely to the demands of each industry."
        };

  return (
    <section id="soluciones" className="bg-background pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
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

        <SolutionCardGrid items={industries[locale]} valuePrefix="industry" />
      </div>
    </section>
  );
}
