"use client";

import { Building2, CarFront, Pickaxe } from "lucide-react";
import type { MouseEvent } from "react";

import { useLanguage } from "@/components/providers/language-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";

const industries = {
  es: [
    {
      number: "01",
      icon: Pickaxe,
      title: "Minería",
      description: "Productos Químicos, Fibras de Refuerzo y Asistencia Técnica Especializada para operaciones que exigen seguridad, resistencia y continuidad operacional.",
      applications: ["Sostenimiento", "Continuidad Operacional", "Asistencia Técnica"]
    },
    {
      number: "02",
      icon: Building2,
      title: "Construcción",
      description: "Aditivos y Soluciones Poliméricas diseñados para optimizar el desempeño del concreto, la productividad y la durabilidad de cada proyecto.",
      applications: ["Concreto", "Obras Civiles", "Eficiencia Constructiva"]
    },
    {
      number: "03",
      icon: CarFront,
      title: "Automotriz",
      description: "Soluciones Químicas y Productos Técnicos para el mantenimiento, la protección y el rendimiento confiable de componentes y sistemas automotrices.",
      applications: ["Mantenimiento Automotriz", "Protección", "Rendimiento"]
    }
  ],
  en: [
    {
      number: "01",
      icon: Pickaxe,
      title: "Mining",
      description: "Chemical products, reinforcement fibers and specialized technical support for operations that demand safety, strength and operational continuity.",
      applications: ["Ground Support", "Operational Continuity", "Technical Assistance"]
    },
    {
      number: "02",
      icon: Building2,
      title: "Construction",
      description: "Additives and polymeric solutions designed to optimize concrete performance, productivity and long-term project durability.",
      applications: ["Concrete", "Civil Works", "Construction Efficiency"]
    },
    {
      number: "03",
      icon: CarFront,
      title: "Automotive",
      description: "Chemical solutions and technical products for the maintenance, protection and reliable performance of automotive components and systems.",
      applications: ["Automotive Maintenance", "Protection", "Performance"]
    }
  ]
} as const;

export function IndustrySolutions() {
  const { locale } = useLanguage();
  const copy = locale === "es"
    ? {
        eyebrow: "Soluciones por industria",
        title: "Experiencia aplicada a",
        accent: "cada operación",
        description: "Integramos conocimiento técnico, productos especializados y acompañamiento continuo para responder con precisión a las exigencias de cada industria."
      }
    : {
        eyebrow: "Solutions by industry",
        title: "Expertise applied to",
        accent: "every operation",
        description: "We combine technical knowledge, specialized products and continuous support to respond precisely to the demands of each industry."
      };

  const handleCardPointer = (event: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return;

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    card.style.setProperty("--card-rotate-x", `${y * -7}deg`);
    card.style.setProperty("--card-rotate-y", `${x * 7}deg`);
  };

  const resetCardPointer = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--card-rotate-x", "0deg");
    event.currentTarget.style.setProperty("--card-rotate-y", "0deg");
  };

  return (
    <section id="soluciones" className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="grid items-end gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">{copy.eyebrow}</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-normal leading-[1.05] tracking-[-0.035em] text-innova-black sm:text-5xl lg:text-6xl">
              {copy.title}
              <span className="block font-semibold text-primary">{copy.accent}</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:justify-self-end">{copy.description}</p>
        </Reveal>

        <Accordion type="single" collapsible defaultValue="industry-01" className="mt-9 border-t border-border/60 md:hidden">
          {industries[locale].map((industry) => (
            <AccordionItem key={industry.title} value={`industry-${industry.number}`} className="border-border/60">
              <AccordionTrigger className="py-5 text-left hover:no-underline">
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.06] text-primary">
                    <industry.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-base font-semibold text-innova-black">{industry.title}</span>
                    <span className="mt-0.5 block font-mono text-[10px] tracking-[0.16em] text-muted-foreground">[{industry.number}]</span>
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-[3.25rem]">
                <p className="text-base leading-7 text-muted-foreground">{industry.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {industry.applications.map((application) => (
                    <Badge key={application} variant="outline" className="rounded-full border-border/70 bg-background px-2.5 py-1 text-xs font-normal text-muted-foreground shadow-none">{application}</Badge>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 hidden gap-5 md:grid md:grid-cols-3 lg:mt-16">
          {industries[locale].map((industry, index) => (
            <Reveal key={industry.title} delay={index * 80}>
            <Card
              className="carbon-card tummy-tilt-card group relative h-full cursor-pointer overflow-hidden rounded-xl shadow-none"
              onMouseMove={handleCardPointer}
              onMouseLeave={resetCardPointer}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <CardHeader className="space-y-0 p-7 pb-5 sm:p-8 sm:pb-5">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.06] text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <industry.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs tracking-[0.18em] text-muted-foreground/70">[{industry.number}]</span>
                </div>
                <CardTitle className="mt-8 text-2xl font-semibold tracking-[-0.02em] text-innova-black">{industry.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-7 pb-7 pt-0 sm:px-8 sm:pb-8">
                <p className="min-h-[5.25rem] text-base leading-7 text-muted-foreground">{industry.description}</p>
                <div className="mt-7 flex flex-wrap gap-2 border-t border-border/60 pt-6">
                  {industry.applications.map((application) => (
                    <Badge key={application} variant="outline" className="rounded-full border-border/70 bg-background px-3 py-1 font-normal text-muted-foreground shadow-none">{application}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
