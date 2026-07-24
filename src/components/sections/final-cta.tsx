"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";

export function FinalCta() {
  const { locale } = useLanguage();
  const copy = locale === "es"
    ? {
        eyebrow: "Conversemos",
        title: "¿Necesita una solución para su operación?",
        description: "Nuestro equipo puede orientarlo desde el primer contacto.",
        action: "Solicitar información"
      }
    : {
        eyebrow: "Let's talk",
        title: "Do you need a solution for your operation?",
        description: "Our team can guide you from the very first conversation.",
        action: "Request information"
      };

  return (
    <section className="bg-background px-4 pb-24 pt-4 sm:px-6 sm:pb-28 lg:px-8 lg:pb-32" aria-labelledby="final-cta-title">
      <Reveal className="mx-auto max-w-7xl">
        <Card className="overflow-hidden rounded-[1.75rem] border-border/60 bg-card shadow-none">
          <CardContent className="flex flex-col items-start gap-8 p-7 sm:p-10 md:flex-row md:items-center md:justify-between lg:p-12">
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-primary">{copy.eyebrow}</p>
              <h2 id="final-cta-title" className="mt-4 text-3xl font-normal leading-tight tracking-[-0.035em] text-innova-black sm:text-4xl lg:text-5xl">
                {copy.title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">{copy.description}</p>
            </div>
            <Button asChild size="lg" className="h-12 shrink-0 rounded-full bg-foreground px-6 font-semibold text-background shadow-none hover:bg-primary hover:text-primary-foreground">
              <Link href="/contacto">
                {copy.action}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}
