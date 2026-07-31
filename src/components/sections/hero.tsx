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
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-background pt-[84px] sm:pt-[96px]"
    >
      <HeroMolecularBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-[860px] -translate-y-6 flex-col items-center px-5 py-14 text-center sm:translate-y-0 sm:px-6 sm:py-20 lg:px-8 xl:py-14">
        <div className="animate-fade-up flex w-full flex-col items-center">
          <h1 className="w-[calc(100vw-1rem)] max-w-[28rem] text-[clamp(2.15rem,9.4vw,2.5rem)] leading-[1.03] tracking-[-0.045em] text-innova-black sm:w-auto sm:max-w-5xl sm:text-[clamp(2.6rem,6.2vw,4.85rem)] sm:leading-[1.02] sm:tracking-[-0.045em] xl:text-[clamp(2.5rem,5.1vw,4.15rem)]">
            <span className="mx-auto block max-w-[20rem] text-balance font-normal sm:max-w-none">{copy.title}</span>
            <RotatingPhrase />
          </h1>
          <p className="mt-7 max-w-[19rem] text-[0.95rem] leading-6 text-foreground/76 [text-shadow:0_1px_12px_rgba(255,255,255,0.7)] dark:text-white/82 dark:[text-shadow:0_1px_10px_rgba(0,0,0,0.82)] sm:max-w-3xl sm:text-lg sm:leading-8 sm:[text-shadow:none] xl:mt-7 xl:leading-7">
            {copy.description}
          </p>
          <div className="mt-7 flex w-full max-w-[21rem] flex-row justify-center gap-3 sm:mt-10 sm:w-auto sm:max-w-none">
            <Button
              asChild
              size="lg"
              className="h-12 min-w-0 flex-1 rounded-full bg-foreground px-3 text-sm font-semibold text-background shadow-none hover:bg-primary hover:text-primary-foreground min-[375px]:text-[0.95rem] sm:h-[52px] sm:min-w-40 sm:flex-none sm:px-8 sm:text-base xl:h-[46px] xl:min-w-32 xl:text-sm"
            >
              <Link href="/contacto">{copy.contact}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="hero-secondary-button carbon-card group h-12 min-w-0 flex-1 rounded-full px-3 text-sm font-semibold text-foreground transition-[transform,border-color,background-color,box-shadow] active:scale-[0.98] min-[375px]:text-[0.95rem] sm:h-[52px] sm:min-w-40 sm:flex-none sm:px-7 sm:text-base xl:h-[46px] xl:min-w-32 xl:text-sm"
            >
              <Link href="#quienes-somos">{copy.about}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
