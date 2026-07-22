"use client";

import { Building2, Factory, Pickaxe } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <section id="soluciones" className="bg-background pb-12 pt-20 sm:pb-14 sm:pt-24 lg:pb-16 lg:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{copy.eyebrow}</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-normal leading-[1.05] tracking-[-0.035em] text-innova-black sm:text-5xl lg:text-6xl">
              {copy.title}
              <span className="block font-semibold text-primary">{copy.accent}</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:justify-self-end">{copy.description}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16">
          {industries[locale].map((industry) => (
            <Card key={industry.title} className="group relative overflow-hidden rounded-2xl border-border/60 bg-card shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_20px_48px_rgba(0,0,0,0.14)]">
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
          ))}
        </div>
      </div>
    </section>
  );
}
