"use client";

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
  description: string;
  applications: readonly string[];
};

type SolutionCardGridProps = {
  items: readonly SolutionCardItem[];
  valuePrefix: string;
  columns?: 3 | 4;
};

export function SolutionCardGrid({
  items,
  valuePrefix,
  columns = 3
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
              <p className="text-base leading-7 text-muted-foreground">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.applications.map((application) => (
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
                <p className="text-base leading-7 text-muted-foreground xl:text-[0.9rem] xl:leading-[1.65]">
                  {item.description}
                </p>
                <div className="mt-auto pt-7">
                  <div className="flex flex-wrap gap-2 border-t border-border/60 pt-6">
                    {item.applications.map((application) => (
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
