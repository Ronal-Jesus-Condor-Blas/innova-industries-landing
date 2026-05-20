import { Boxes, Droplets, FlaskConical, Waves } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const lines = [
  {
    icon: Droplets,
    title: "Aditivos para concreto",
    text: "Soluciones para mejorar trabajabilidad, desempeño y control en mezclas de concreto."
  },
  {
    icon: Waves,
    title: "Fibras para concreto y shotcrete",
    text: "Refuerzo orientado a aplicaciones en obra civil, mineria subterranea y sostenimiento."
  },
  {
    icon: Boxes,
    title: "Polimeros industriales",
    text: "Materiales y formulaciones para procesos industriales que requieren estabilidad y rendimiento."
  },
  {
    icon: FlaskConical,
    title: "Soluciones quimicas industriales",
    text: "Productos especializados para operaciones, mantenimiento y necesidades tecnicas de planta."
  }
];

export function BusinessLines() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Lineas de negocio</p>
          <h2 className="mt-4 text-3xl font-semibold text-innova-black sm:text-4xl">
            Portafolio tecnico para aplicaciones industriales.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {lines.map((line) => (
            <Card key={line.title} className="rounded-lg shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
              <CardHeader>
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <line.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg leading-6">{line.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{line.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
