"use client";

import Link from "next/link";

import { useLanguage } from "@/components/providers/language-provider";
import { HeroMolecularBackground } from "@/components/sections/hero-molecular-background";
import { RotatingPhrase } from "@/components/sections/rotating-phrase";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { locale } = useLanguage();
  const copy = locale === "es"
    ? {
        title: "Soluciones que construyen",
        description:
          "Desarrollamos y suministramos soluciones químicas, poliméricas e industriales para minería, construcción y manufactura, con enfoque técnico, calidad y atención local",
        about: "Conócenos",
        contact: "Contáctanos"
      }
    : {
        title: "Solutions that build",
        description:
          "We develop and supply chemical, polymeric and industrial solutions for mining, construction and manufacturing, with technical expertise, quality and local support",
        about: "About us",
        contact: "Contact us"
      };

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-background pt-[92px] sm:pt-[96px]"
    >
      <HeroMolecularBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-[980px] flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <div className="animate-fade-up flex w-full flex-col items-center">
          <h1 className="max-w-5xl text-[clamp(2.6rem,6.2vw,4.85rem)] leading-[1.02] tracking-[-0.045em] text-innova-black">
            <span className="block font-normal">{copy.title}</span>
            <RotatingPhrase />
          </h1>
          <p className="mt-10 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {copy.description}
          </p>
          <div className="mt-9 flex w-full max-w-md flex-col justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 min-w-36 rounded-full bg-foreground px-7 text-base font-semibold text-background shadow-none hover:bg-primary hover:text-primary-foreground"
            >
              <Link href="#quienes-somos">{copy.about}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 min-w-36 rounded-full border-border bg-background px-7 text-base font-semibold shadow-none"
            >
              <Link href="/contacto">{copy.contact}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
