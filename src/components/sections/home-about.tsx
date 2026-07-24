"use client";

import { BadgeCheck, Leaf, Lightbulb, UsersRound } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { Reveal } from "@/components/ui/reveal";

const content = {
  es: {
    eyebrow: "¿Quiénes somos?",
    title: "Comprometidos con la excelencia y el",
    accent: "desarrollo sostenible",
    description: "En Innova América desarrollamos y suministramos soluciones especializadas para operaciones exigentes. Integramos experiencia técnica, productos confiables y atención cercana para generar resultados sostenibles y relaciones de largo plazo.",
    mobileDescription: "Experiencia técnica, soluciones confiables y acompañamiento orientado al largo plazo.",
    attributes: [
      { icon: BadgeCheck, title: "Calidad garantizada", text: "Control riguroso de procesos y mejora continua." },
      { icon: Lightbulb, title: "Innovación constante", text: "Desarrollo de soluciones eficientes para cada operación." },
      { icon: UsersRound, title: "Equipo comprometido", text: "Especialistas enfocados en acompañamiento y respuesta técnica." },
      { icon: Leaf, title: "Sostenibilidad", text: "Gestión responsable orientada al entorno y al largo plazo." }
    ]
  },
  en: {
    eyebrow: "Who we are",
    title: "Committed to excellence and",
    accent: "sustainable development",
    description: "At Innova America, we develop and supply specialized solutions for demanding operations. We combine technical expertise, reliable products and close support to deliver sustainable results and build long-term relationships.",
    mobileDescription: "Technical expertise, reliable solutions and long-term support.",
    attributes: [
      { icon: BadgeCheck, title: "Guaranteed quality", text: "Rigorous process control and continuous improvement." },
      { icon: Lightbulb, title: "Constant innovation", text: "Development of efficient solutions for every operation." },
      { icon: UsersRound, title: "Committed team", text: "Specialists focused on technical guidance and response." },
      { icon: Leaf, title: "Sustainability", text: "Responsible management focused on the environment and long term." }
    ]
  }
} as const;

export function HomeAbout() {
  const { locale } = useLanguage();
  const copy = content[locale];

  return (
    <section id="quienes-somos" className="bg-background pb-14 pt-16 sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-primary">{copy.eyebrow}</p>
            <h2 className="mt-4 max-w-xl text-3xl font-normal leading-tight tracking-[-0.025em] text-innova-black sm:text-4xl lg:text-[2.75rem]">
              {copy.title}{" "}<span className="font-semibold text-primary">{copy.accent}</span>
            </h2>
          </div>
          <p className="max-w-xl self-end text-sm leading-6 text-muted-foreground md:hidden">{copy.mobileDescription}</p>
          <p className="hidden max-w-2xl self-end text-base leading-7 text-muted-foreground md:block md:text-lg md:leading-8">{copy.description}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 border-y border-border/50 lg:mt-14 lg:grid-cols-4">
          {copy.attributes.map((attribute, index) => (
            <Reveal key={attribute.title} delay={index * 70} className={`flex min-h-36 flex-col justify-center px-3 py-5 sm:min-h-44 sm:px-6 sm:py-7 lg:min-h-48 lg:px-8 lg:py-8 ${index % 2 === 1 ? "border-l border-border/50" : ""} ${index >= 2 ? "border-t border-border/50 lg:border-t-0" : ""} ${index > 0 ? "lg:border-l lg:border-border/50" : ""}`}>
              <attribute.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 text-sm font-semibold leading-5 text-innova-black sm:mt-4 sm:text-base">{attribute.title}</h3>
              <p className="mt-1.5 text-xs leading-5 text-muted-foreground sm:mt-2 sm:text-sm sm:leading-6">{attribute.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
