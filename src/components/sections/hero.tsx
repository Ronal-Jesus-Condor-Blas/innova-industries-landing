import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { HeroCarousel } from "@/components/sections/hero-carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-12 lg:min-h-[680px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-8 lg:py-14">
        <div className="max-w-2xl">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/10">
            Industria, calidad y soporte técnico
          </Badge>
          <h1 className="text-4xl font-semibold leading-tight tracking-normal text-innova-black sm:text-5xl lg:text-6xl">
            Calidad industrial para minería, construcción y manufactura.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            INNOVA INDUSTRIES AMERICA SAC desarrolla, fabrica y suministra
            soluciones químicas e industriales con enfoque técnico, control de
            calidad y atención local.
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
            {["Fabricación local", "Control de calidad", "Soporte técnico"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-medium text-innova-black">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <HeroCarousel />
      </div>
    </section>
  );
}
