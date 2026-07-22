"use client";

import { BadgeCheck, Leaf, Lightbulb, UsersRound } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";

const content = {
  es: {
    eyebrow: "¿Quiénes somos?",
    title: "Comprometidos con la excelencia y el",
    accent: "desarrollo sostenible",
    description: "En Innova América brindamos soluciones integrales para diferentes sectores industriales. Nuestra experiencia, capacidad técnica y equipo humano nos permiten desarrollar productos confiables y mantener relaciones de largo plazo con nuestros clientes",
    attributes: [
      { icon: BadgeCheck, title: "Calidad garantizada", text: "Procesos controlados y mejora continua" },
      { icon: Lightbulb, title: "Innovación constante", text: "Soluciones eficientes para cada operación" },
      { icon: UsersRound, title: "Equipo comprometido", text: "Profesionales orientados al soporte técnico" },
      { icon: Leaf, title: "Sostenibilidad", text: "Operaciones responsables con el entorno" }
    ]
  },
  en: {
    eyebrow: "Who we are",
    title: "Committed to excellence and",
    accent: "sustainable development",
    description: "At Innova America, we provide comprehensive solutions for different industrial sectors. Our experience, technical capabilities and people enable us to develop reliable products and build long-term customer relationships",
    attributes: [
      { icon: BadgeCheck, title: "Guaranteed quality", text: "Controlled processes and continuous improvement" },
      { icon: Lightbulb, title: "Constant innovation", text: "Efficient solutions for every operation" },
      { icon: UsersRound, title: "Committed team", text: "Professionals focused on technical support" },
      { icon: Leaf, title: "Sustainability", text: "Operations that respect the environment" }
    ]
  }
} as const;

export function HomeAbout() {
  const { locale } = useLanguage();
  const copy = content[locale];

  return (
    <section id="quienes-somos" className="bg-background pb-12 pt-16 sm:pb-14 sm:pt-16 lg:pb-16 lg:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{copy.eyebrow}</p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.025em] text-innova-black sm:text-4xl lg:text-[2.75rem]">
              {copy.title}{" "}<span className="text-primary">{copy.accent}</span>
            </h2>
          </div>
          <p className="max-w-2xl self-end text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{copy.description}</p>
        </div>

        <div className="mt-12 grid border-y border-border/50 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {copy.attributes.map((attribute, index) => (
            <article key={attribute.title} className={`flex min-h-44 flex-col justify-center py-7 sm:px-6 lg:min-h-48 lg:px-8 lg:py-8 ${index > 0 ? "border-t border-border/50 sm:border-t-0" : ""} ${index % 2 === 1 ? "sm:border-l sm:border-border/50" : ""} ${index >= 2 ? "sm:border-t sm:border-border/50 lg:border-t-0" : ""} ${index > 0 ? "lg:border-l lg:border-border/50" : ""}`}>
              <attribute.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-sm font-semibold text-innova-black sm:text-base">{attribute.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{attribute.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
