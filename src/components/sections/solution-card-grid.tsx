"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import type { MouseEvent } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const CARD_TILT_STRENGTH = 3;

export type SolutionCardItem = {
  number: string;
  icon: LucideIcon;
  title: string;
  description?: string;
  applications?: readonly string[];
  image?: string;
};

type SolutionCardGridProps = {
  items: readonly SolutionCardItem[];
  valuePrefix: string;
  columns?: 3 | 4;
  variant?: "default" | "image" | "title-only";
};

export function SolutionCardGrid({
  items,
  valuePrefix,
  columns = 3,
  variant = "default"
}: SolutionCardGridProps) {
  const handleCardPointer = (event: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return;

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    card.style.setProperty("--card-rotate-x", `${y * -CARD_TILT_STRENGTH}deg`);
    card.style.setProperty("--card-rotate-y", `${x * CARD_TILT_STRENGTH}deg`);
  };

  const resetCardPointer = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--card-rotate-x", "0deg");
    event.currentTarget.style.setProperty("--card-rotate-y", "0deg");
  };

  if (variant === "image") {
    return (
      <>
        <Accordion
          type="single"
          defaultValue={`${valuePrefix}-${items[0]?.number}`}
          className="mt-9 space-y-3 md:hidden"
        >
          {items.map((item) => (
            <AccordionItem
              key={item.title}
              value={`${valuePrefix}-${item.number}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] text-white shadow-[0_16px_40px_rgba(0,0,0,0.14)] transition-[min-height,box-shadow] duration-500 data-[state=closed]:min-h-[7.75rem] data-[state=open]:min-h-[25rem] data-[state=open]:shadow-[0_24px_55px_rgba(0,0,0,0.2)]"
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover transition-[transform,filter] duration-700 ease-out group-data-[state=open]:scale-[1.035] group-data-[state=closed]:brightness-[0.55] group-data-[state=open]:brightness-[0.72]"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/95 transition-opacity duration-500 group-data-[state=closed]:opacity-80" />

              <AccordionTrigger className="relative z-10 items-start gap-4 px-5 py-5 text-left hover:no-underline [&>svg]:mt-3 [&>svg]:size-5 [&>svg]:text-white/70">
                <span className="flex min-w-0 flex-1 items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-black/30 text-white backdrop-blur-sm">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 pt-0.5">
                    <span className="block font-mono text-[10px] tracking-[0.18em] text-white/65">
                      [{item.number}]
                    </span>
                    <span className="mt-2 block text-lg font-semibold leading-tight tracking-[-0.025em] text-white">
                      {item.title}
                    </span>
                  </span>
                </span>
              </AccordionTrigger>

              <AccordionContent className="relative z-10 px-5 pb-5 pt-2">
                {item.description ? (
                  <p className="text-[0.95rem] leading-7 text-white/85">{item.description}</p>
                ) : null}
                {item.applications?.length ? (
                  <p className="mt-8 border-t border-white/20 pt-4 text-xs font-semibold leading-5 tracking-[0.035em] text-white/90">
                    {item.applications.join(" · ")}
                  </p>
                ) : null}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="solution-image-grid isolate mt-10 hidden gap-5 md:grid md:grid-cols-2 lg:mt-14 xl:grid-cols-4 xl:gap-4">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <Card
                className="solution-image-card surface-featured group relative flex h-full min-h-[28rem] flex-col overflow-hidden rounded-2xl border-white/10 bg-[#111] text-white"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 25vw, 50vw"
                    className="object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.07] group-hover:brightness-[0.82] group-hover:contrast-[1.08]"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/95" />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                <CardHeader className="relative z-10 space-y-0 p-6 pb-4">
                  <div className="flex items-start justify-between gap-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-black/25 text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-white/30 group-hover:bg-black/45">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs tracking-[0.18em] text-white/65">
                      [{item.number}]
                    </span>
                  </div>
                  <CardTitle className="mt-7 text-[1.45rem] font-semibold leading-tight tracking-[-0.025em] text-white">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 flex flex-1 flex-col px-6 pb-6 pt-0">
                  {item.description ? (
                    <p className="text-sm leading-6 text-white/80">{item.description}</p>
                  ) : null}
                  {item.applications?.length ? (
                    <p className="mt-auto border-t border-white/15 pt-4 text-xs font-medium leading-5 tracking-[0.04em] text-white/90">
                      {item.applications.join(" · ")}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </>
    );
  }

  if (variant === "title-only") {
    return (
      <div className="mt-9 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 70}>
            <Card
              className="carbon-card surface-featured tummy-tilt-card group relative flex h-full min-h-[10.5rem] flex-col overflow-hidden rounded-xl sm:min-h-[12rem]"
              onMouseMove={handleCardPointer}
              onMouseLeave={resetCardPointer}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <CardHeader className="flex flex-row items-start justify-between space-y-0 p-4 pb-0 sm:p-6 sm:pb-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.06] text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground sm:h-11 sm:w-11">
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground/70 sm:text-xs">
                  [{item.number}]
                </span>
              </CardHeader>
              <CardContent className="mt-auto p-4 pt-8 sm:p-6 sm:pt-10">
                <CardTitle className="text-lg font-semibold tracking-[-0.02em] text-innova-black sm:text-xl">
                  {item.title}
                </CardTitle>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    );
  }

  return (
    <>
      <Accordion
        type="single"
        collapsible
        defaultValue={`${valuePrefix}-${items[0]?.number}`}
        className="mt-9 border-t border-border/60 md:hidden"
      >
        {items.map((item) => (
          <AccordionItem
            key={item.title}
            value={`${valuePrefix}-${item.number}`}
            className="border-border/60"
          >
            <AccordionTrigger className="py-5 text-left hover:no-underline">
              <span className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.06] text-primary">
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-base font-semibold text-innova-black">{item.title}</span>
                  <span className="mt-0.5 block font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
                    [{item.number}]
                  </span>
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-5 pl-[3.25rem]">
              {item.description ? <p className="text-base leading-7 text-muted-foreground">{item.description}</p> : null}
              <div className="mt-4 flex flex-wrap gap-2">
                {item.applications?.map((application) => (
                  <Badge
                    key={application}
                    variant="outline"
                    className="rounded-full border-border/80 bg-background/55 px-2.5 py-1 text-xs font-medium text-foreground/70 shadow-none dark:text-[#b8b8b8]"
                  >
                    {application}
                  </Badge>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div
        className={cn(
          "mt-12 hidden gap-5 md:grid lg:mt-16 xl:mt-14 xl:gap-4",
          columns === 4 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3"
        )}
      >
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 80}>
            <Card
              className="carbon-card surface-featured tummy-tilt-card group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl"
              onMouseMove={handleCardPointer}
              onMouseLeave={resetCardPointer}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <CardHeader className="space-y-0 p-7 pb-5 sm:p-8 sm:pb-5 xl:p-6 xl:pb-5">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.06] text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs tracking-[0.18em] text-muted-foreground/70">
                    [{item.number}]
                  </span>
                </div>
                <CardTitle className="mt-8 text-2xl font-semibold tracking-[-0.02em] text-innova-black xl:mt-6 xl:text-xl">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col px-7 pb-7 pt-0 sm:px-8 sm:pb-8 xl:px-6 xl:pb-6">
                {item.description ? (
                  <p className="text-base leading-7 text-muted-foreground xl:text-[0.9rem] xl:leading-[1.65]">
                    {item.description}
                  </p>
                ) : null}
                <div className="mt-auto pt-7">
                  <div className="flex flex-wrap gap-2 border-t border-border/60 pt-6">
                    {item.applications?.map((application) => (
                      <Badge
                        key={application}
                        variant="outline"
                        className="rounded-full border-border/80 bg-background/55 px-3 py-1 font-medium text-foreground/70 shadow-none transition-colors group-hover:border-border group-hover:bg-muted/35 dark:text-[#b8b8b8]"
                      >
                        {application}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </>
  );
}
