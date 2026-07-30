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
  const [phase, setPhase] = useState<"visible" | "exit" | "enter">("visible");
  const activePhrase = phrases[locale][activeIndex];
  const isLongPhrase = activePhrase.length > 18;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let enterTimeout: number | undefined;
    let settleTimeout: number | undefined;

    const interval = window.setInterval(() => {
      if (mediaQuery.matches) {
        setActiveIndex((currentIndex) => (currentIndex + 1) % phrases[locale].length);
        return;
      }

      setPhase("exit");
      enterTimeout = window.setTimeout(() => {
        setActiveIndex((currentIndex) => (currentIndex + 1) % phrases[locale].length);
        setPhase("enter");

        settleTimeout = window.setTimeout(() => {
          setPhase("visible");
        }, 250);
      }, 250);
    }, 2500);

    return () => {
      window.clearInterval(interval);
      if (enterTimeout) window.clearTimeout(enterTimeout);
      if (settleTimeout) window.clearTimeout(settleTimeout);
    };
  }, [locale]);

  return (
    <span
      className="relative mt-4 grid h-[1.16em] overflow-hidden py-[0.04em] font-bold text-primary sm:mt-5"
      aria-live="off"
    >
      <span
        key={`${locale}-${activeIndex}`}
        className={`col-start-1 row-start-1 flex items-start justify-center text-center ${
          isLongPhrase ? "text-[0.78em] sm:text-[0.9em] lg:text-[1em]" : ""
        } ${
          phase === "exit" ? "phrase-exit" : phase === "enter" ? "phrase-enter" : ""
        }`}
      >
        {activePhrase}
      </span>
    </span>
  );
}
