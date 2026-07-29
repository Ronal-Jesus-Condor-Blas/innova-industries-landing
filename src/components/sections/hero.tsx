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
          "Soluciones especializadas para minería, construcción e industria.",
        about: "Conócenos",
        contact: "Contáctanos"
      }
    : {
        title: "Solutions that build",
        description:
          "Specialized solutions for mining, construction and industry.",
        about: "About us",
        contact: "Contact us"
      };

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-background pt-[92px] sm:pt-[96px]"
    >
      <HeroMolecularBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-[980px] -translate-y-3 flex-col items-center px-4 py-14 text-center sm:translate-y-0 sm:px-6 sm:py-20 lg:px-8">
        <div className="animate-fade-up flex w-full flex-col items-center">
          <h1 className="max-w-5xl text-[clamp(2.25rem,10vw,2.7rem)] leading-[1.03] tracking-[-0.04em] text-innova-black sm:text-[clamp(2.6rem,6.2vw,4.85rem)] sm:leading-[1.02] sm:tracking-[-0.045em]">
            <span className="block font-normal">{copy.title}</span>
            <RotatingPhrase />
          </h1>
          <p className="mt-8 max-w-[22rem] text-base leading-7 text-foreground/65 dark:text-white/72 sm:mt-10 sm:max-w-3xl sm:text-lg sm:leading-8">
            {copy.description}
          </p>
          <div className="mt-9 flex w-full max-w-[26rem] flex-row justify-center gap-2.5 sm:mt-10 sm:w-auto sm:max-w-none sm:gap-3">
            <Button
              asChild
              size="lg"
              className="h-[52px] min-w-0 flex-1 rounded-full bg-foreground px-3 text-sm font-semibold text-background shadow-none hover:bg-primary hover:text-primary-foreground min-[375px]:text-base sm:min-w-40 sm:flex-none sm:px-8"
            >
              <Link href="/contacto">{copy.contact}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-[52px] min-w-0 flex-1 rounded-full border-border bg-background px-3 text-sm font-semibold shadow-none min-[375px]:text-base sm:min-w-40 sm:flex-none sm:px-8"
            >
              <Link href="#quienes-somos">{copy.about}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
