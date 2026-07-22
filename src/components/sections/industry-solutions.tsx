"use client";

import { Building2, Factory, Pickaxe } from "lucide-react";

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
      description: "Soluciones químicas, fibras y soporte técnico para operaciones que requieren seguridad, resistencia y continuidad",
      applications: ["Sostenimiento", "Operación", "Soporte técnico"]
    },
    {
      number: "02",
      icon: Building2,
      title: "Construcción",
      description: "Aditivos y soluciones poliméricas orientadas a mejorar el desempeño del concreto y la eficiencia en obra",
      applications: ["Concreto", "Obra civil", "Desempeño"]
    },
    {
      number: "03",
      icon: Factory,
      title: "Manufactura",
      description: "Productos industriales para procesos, mantenimiento y necesidades técnicas que exigen resultados consistentes",
      applications: ["Procesos", "Mantenimiento", "Continuidad"]
    }
  ],
  en: [
    {
      number: "01",
      icon: Pickaxe,
      title: "Mining",
      description: "Chemical solutions, fibers and technical support for operations that demand safety, strength and continuity",
      applications: ["Ground support", "Operations", "Technical support"]
    },
    {
      number: "02",
      icon: Building2,
      title: "Construction",
      description: "Additives and polymeric solutions designed to improve concrete performance and on-site efficiency",
      applications: ["Concrete", "Civil works", "Performance"]
    },
    {
      number: "03",
      icon: Factory,
      title: "Manufacturing",
      description: "Industrial products for processes, maintenance and technical needs that require consistent results",
      applications: ["Processes", "Maintenance", "Continuity"]
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
        description: "Atendemos los retos técnicos de cada sector con soluciones confiables, acompañamiento cercano y una visión de largo plazo"
      }
    : {
        eyebrow: "Solutions by industry",
        title: "Expertise applied to",
        accent: "every operation",
        description: "We address each sector's technical challenges with reliable solutions, close support and a long-term vision"
      };

  return (
    <section id="soluciones" className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="grid items-end gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">{copy.eyebrow}</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-normal leading-[1.05] tracking-[-0.035em] text-innova-black sm:text-5xl lg:text-6xl">
              {copy.title}
              <span className="block font-semibold text-primary">{copy.accent}</span>
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-base md:leading-7 lg:justify-self-end lg:text-lg lg:leading-8">{copy.description}</p>
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
                <p className="text-sm leading-6 text-muted-foreground">{industry.description}</p>
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
            <Card className="interactive-card group relative h-full overflow-hidden rounded-2xl border-border/60 bg-card shadow-none hover:border-primary/20">
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
                <p className="min-h-[5.25rem] text-sm leading-7 text-muted-foreground sm:text-base">{industry.description}</p>
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
