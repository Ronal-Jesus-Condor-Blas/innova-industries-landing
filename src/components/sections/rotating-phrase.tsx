"use client";

import { useEffect, useState } from "react";

import { useLanguage } from "@/components/providers/language-provider";

const phrases = {
  es: ["el futuro", "la industria", "confianza", "desarrollo sostenible"],
  en: ["the future", "industry", "trust", "sustainable development"]
} as const;

export function RotatingPhrase() {
  const { locale } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "exiting" | "entering">("idle");
  const activePhrase = phrases[locale][activeIndex];
  const isLongPhrase = activePhrase.length > 18;

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setActiveIndex((currentIndex) => (currentIndex + 1) % phrases[locale].length);
        return;
      }

      setPhase("exiting");
    }, 2500);

    return () => {
      window.clearInterval(interval);
    };
  }, [locale]);

  const handleAnimationEnd = () => {
    if (phase === "exiting") {
      setActiveIndex((currentIndex) => (currentIndex + 1) % phrases[locale].length);
      setPhase("entering");
      return;
    }

    if (phase === "entering") {
      setPhase("idle");
    }
  };

  return (
    <span
      className="relative mt-3 grid h-[1.2em] w-full overflow-hidden py-[0.04em] font-bold leading-[1.08] text-primary sm:mt-5"
      aria-live="off"
    >
      <span
        key={`${locale}-${activePhrase}`}
        onAnimationEnd={handleAnimationEnd}
        className={`col-start-1 row-start-1 flex whitespace-nowrap items-start justify-center text-center tracking-[-0.04em] sm:tracking-[inherit] ${
          phase === "exiting"
            ? "phrase-slide-exit"
            : phase === "entering"
              ? "phrase-slide-enter"
              : ""
        }`}
      >
        <span
          className={
            isLongPhrase
              ? "inline-block origin-center scale-x-[0.88] sm:scale-x-100"
              : undefined
          }
        >
          {activePhrase}
        </span>
      </span>
    </span>
  );
}
