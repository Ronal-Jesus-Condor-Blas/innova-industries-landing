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

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % phrases[locale].length);
    }, 2500);

    return () => {
      window.clearInterval(interval);
    };
  }, [locale]);

  return (
    <span
      className="relative mt-3 grid h-[1.2em] overflow-hidden py-[0.04em] font-bold leading-[1.08] text-primary sm:mt-5"
      aria-live="off"
    >
      {phrases[locale].map((phrase, index) => {
        const isActive = index === activeIndex;
        const isLongPhrase = phrase.length > 18;

        return (
          <span
            key={`${locale}-${phrase}`}
            aria-hidden={!isActive}
            className={`col-start-1 row-start-1 flex items-start justify-center text-center transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
              isLongPhrase ? "text-[0.82em] tracking-[-0.035em] sm:text-[0.9em] lg:text-[1em]" : ""
            } ${
              isActive
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-[0.12em] opacity-0"
            }`}
          >
            {phrase}
          </span>
        );
      })}
    </span>
  );
}
