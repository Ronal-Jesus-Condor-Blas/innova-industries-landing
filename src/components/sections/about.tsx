import { Building2, HardHat, Settings2 } from "lucide-react";

import { Separator } from "@/components/ui/separator";

const pillars = [
  {
    icon: HardHat,
    title: "Mineria y construccion",
    text: "Acompañamiento para operaciones donde el desempeño tecnico y la continuidad de suministro son criticos."
  },
  {
    icon: Settings2,
    title: "Manufactura e industria",
    text: "Soluciones quimicas y polimericas orientadas a procesos productivos, mantenimiento y mejora operativa."
  },
  {
    icon: Building2,
    title: "Gestion institucional",
    text: "Comunicacion formal sobre calidad, certificaciones, seguridad, medio ambiente y noticias corporativas."
  }
];

export function About() {
  return (
    <section className="bg-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Quienes somos</p>
            <h2 className="mt-4 text-3xl font-semibold text-innova-black sm:text-4xl">
              Una empresa industrial enfocada en confianza, calidad y soporte.
            </h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-muted-foreground">
              INNOVA INDUSTRIES AMERICA SAC desarrolla y comercializa soluciones
              para sectores industriales que requieren productos consistentes,
              respuesta tecnica y una relacion profesional de largo plazo. Su
              enfoque integra fabricacion local, control de calidad y mejora
              continua para atender proyectos de mineria, construccion y
              manufactura.
            </p>
            <Separator className="my-8" />
            <div className="grid gap-6 md:grid-cols-3">
              {pillars.map((pillar) => (
                <div key={pillar.title}>
                  <pillar.icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 font-semibold text-innova-black">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{pillar.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
