"use client";

import Image from "next/image";
import { Building2, CarFront, Factory, Pickaxe } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const industries = {
  es: [
    {
      number: "01",
      icon: Pickaxe,
      title: "Minería",
      image: "/assets/industries/mining.png"
    },
    {
      number: "02",
      icon: Building2,
      title: "Construcción",
      image: "/assets/industries/infrastructure-tunnel.png"
    },
    {
      number: "03",
      icon: Factory,
      title: "Manufactura",
      image: "/assets/industries/mining-manufacturing.png"
    },
    {
      number: "04",
      icon: CarFront,
      title: "Automotriz",
      image: "/assets/industries/mining-vehicle.png"
    }
  ],
  en: [
    {
      number: "01",
      icon: Pickaxe,
      title: "Mining",
      image: "/assets/industries/mining.png"
    },
    {
      number: "02",
      icon: Building2,
      title: "Construction",
      image: "/assets/industries/infrastructure-tunnel.png"
    },
    {
      number: "03",
      icon: Factory,
      title: "Manufacturing",
      image: "/assets/industries/mining-manufacturing.png"
    },
    {
      number: "04",
      icon: CarFront,
      title: "Automotive",
      image: "/assets/industries/mining-vehicle.png"
    }
  ]
} as const;

export function IndustrySolutions() {
  const { locale } = useLanguage();
  const copy =
    locale === "es"
      ? {
          eyebrow: "Soluciones por industria",
          title: "Experiencia aplicada a",
          accent: "cada operación"
        }
      : {
          eyebrow: "Solutions by industry",
          title: "Expertise applied to",
          accent: "every operation"
        };

  return (
    <section id="soluciones" className="bg-background pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20 xl:pb-[4.5rem] xl:pt-14">
      <div className="mx-auto max-w-[68rem] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
              {copy.eyebrow}
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-normal leading-[1.05] tracking-[-0.035em] text-innova-black sm:text-5xl lg:text-6xl xl:text-[3.15rem]">
              {copy.title}
              <span className="block font-semibold text-primary">{copy.accent}</span>
            </h2>
          </div>
        </Reveal>

        <ol className="industry-route relative mx-auto mt-12 max-w-6xl sm:mt-14 lg:mt-16">
          <span
            aria-hidden="true"
            className="absolute bottom-7 left-6 top-7 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent md:left-1/2"
          />

          {industries[locale].map((industry, index) => {
            const isLeft = index % 2 === 0;
            const Icon = industry.icon;

            return (
              <li
                key={industry.number}
                className="industry-route-item group relative grid min-h-56 grid-cols-[3rem_1fr] items-center gap-5 py-5 md:min-h-64 md:grid-cols-[1fr_4rem_1fr] md:gap-8"
              >
                <Reveal
                  delay={index * 0.06}
                  className={cn(
                    "col-start-2 row-start-1",
                    isLeft
                      ? "md:col-start-1 md:justify-self-end md:text-right"
                      : "md:col-start-3 md:justify-self-start md:text-left"
                  )}
                >
                  <div
                    className={cn(
                      "relative flex items-center gap-4 md:gap-5",
                      isLeft && "md:flex-row-reverse"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="hidden h-px w-10 bg-border transition-all duration-300 group-hover:w-14 group-hover:bg-foreground/35 md:block"
                    />
                    <div
                      className={cn(
                        "w-full max-w-80 shrink-0 md:w-72",
                        isLeft && "md:flex md:flex-col md:items-end"
                      )}
                    >
                      <Badge
                        variant="outline"
                        className="h-6 rounded-full border-border/80 bg-background px-2.5 font-mono text-[10px] font-medium tracking-[0.18em] text-muted-foreground shadow-none"
                      >
                        {industry.number}
                      </Badge>
                      <h3 className="mt-3 text-xl font-semibold tracking-[-0.025em] text-innova-black sm:text-2xl">
                        {industry.title}
                      </h3>
                      <div className="relative mt-4 aspect-[2/1] w-full overflow-hidden rounded-xl border border-border/70 bg-muted shadow-[0_12px_34px_rgba(0,0,0,0.08)] transition-[box-shadow,border-color] duration-500 group-hover:border-foreground/20 group-hover:shadow-[0_22px_50px_rgba(0,0,0,0.16)]">
                        <Image
                          src={industry.image}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 288px, 80vw"
                          className="object-cover grayscale-[0.2] brightness-[0.7] contrast-[1.08] transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.07] group-hover:grayscale-0 group-hover:brightness-[0.82]"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/[0.04]"
                        />
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal
                  delay={index * 0.06 + 0.04}
                  className="relative z-10 col-start-1 row-start-1 flex justify-center md:col-start-2"
                >
                  <span className="flex size-14 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-[transform,border-color,box-shadow] duration-300 group-hover:scale-110 group-hover:border-foreground/25 group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.14)]">
                    <Icon className="size-6" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
