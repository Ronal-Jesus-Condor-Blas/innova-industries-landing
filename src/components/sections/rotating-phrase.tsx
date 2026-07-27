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
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        setPreviousIndex(mediaQuery.matches ? null : currentIndex);
        return (currentIndex + 1) % phrases[locale].length;
      });
    }, 3200);

    return () => window.clearInterval(interval);
  }, [locale]);

  return (
    <span
      className="relative mt-4 block h-[1.08em] overflow-hidden font-bold text-primary sm:mt-5"
      aria-live="off"
    >
      {previousIndex !== null ? (
        <span
          key={`out-${locale}-${previousIndex}-${activeIndex}`}
          className="phrase-exit absolute inset-0 flex items-start justify-center"
          aria-hidden="true"
        >
          {phrases[locale][previousIndex]}
        </span>
      ) : null}
      <span
        key={`in-${locale}-${activeIndex}`}
        className={
          previousIndex === null
            ? "block"
            : "phrase-enter absolute inset-0 flex items-start justify-center"
        }
      >
        {phrases[locale][activeIndex]}
      </span>
    </span>
  );
}
