import Link from "next/link";
import { ArrowRight, CheckCircle2, Factory, FlaskConical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-innova-blue to-transparent" />
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
        <div>
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/10">
            Industria, calidad y soporte tecnico
          </Badge>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-innova-black sm:text-5xl lg:text-6xl">
            Soluciones industriales confiables para operaciones exigentes.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            INNOVA INDUSTRIES AMERICA SAC acompaña proyectos de mineria,
            construccion y manufactura con aditivos, fibras, polimeros y
            soluciones quimicas desarrolladas con criterio tecnico y control de
            calidad.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12">
              <Link href="#contacto">
                Contactar <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12">
              <Link href="#comunicados-calidad">Ver comunicados</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-4 border-l-2 border-primary/40 pl-5 sm:grid-cols-3 sm:border-l-0 sm:pl-0">
            {["Fabricacion local", "Control de calidad", "Soporte tecnico"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-medium text-innova-black">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-lg border bg-innova-black text-white shadow-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(28,109,181,.85),rgba(29,29,27,.96)_45%,rgba(29,29,27,.9)),repeating-linear-gradient(90deg,rgba(255,255,255,.08)_0_1px,transparent_1px_72px)]" />
          <div className="absolute inset-x-8 top-8 h-24 border border-white/15" />
          <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-20 translate-y-20 rounded-full border border-white/10" />
          <div className="relative flex h-full min-h-[420px] flex-col justify-between p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-white/60">Innova America</p>
                <p className="mt-2 max-w-sm text-2xl font-semibold">Respuesta tecnica para proyectos industriales.</p>
              </div>
              <Factory className="h-10 w-10 text-white/70" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
                <FlaskConical className="mb-5 h-7 w-7 text-white" />
                <p className="text-sm text-white/70">Lineas especializadas</p>
                <p className="mt-1 text-3xl font-semibold">04</p>
              </div>
              <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
                <CheckCircle2 className="mb-5 h-7 w-7 text-white" />
                <p className="text-sm text-white/70">Enfoque</p>
                <p className="mt-1 text-3xl font-semibold">Calidad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
