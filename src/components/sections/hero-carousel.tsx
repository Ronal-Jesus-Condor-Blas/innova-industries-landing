"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const heroImages = [
  {
    src: "/assets/hero/mineria-industrial.jpg",
    alt: "Operacion minera industrial con agregados y maquinaria pesada",
    objectPosition: "center center"
  },
  {
    src: "/assets/hero/tuberias-polimeros.jpg",
    alt: "Tuberias polimericas industriales para infraestructura",
    objectPosition: "center center"
  },
  {
    src: "/assets/hero/fiberims-50.jpg",
    alt: "FIBERIMS 50 fibra sintetica para concreto de Innova America",
    objectPosition: "center 38%"
  },
  {
    src: "/assets/hero/operacion-industrial.avif",
    alt: "Operacion industrial relacionada a soluciones quimicas y manufactura",
    objectPosition: "center center"
  }
];

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[320px] overflow-hidden rounded-[24px] bg-innova-black shadow-[0_24px_70px_rgba(29,29,27,0.16)] sm:min-h-[420px] lg:min-h-[560px]">
      {heroImages.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          priority={index === 0}
          unoptimized
          sizes="(min-width: 1024px) 48vw, 100vw"
          style={{ objectPosition: image.objectPosition }}
          className={cn(
            "object-cover transition-opacity duration-1000 ease-out",
            index === activeIndex ? "z-10 opacity-100" : "z-0 opacity-0"
          )}
        />
      ))}
      <div className="absolute inset-0 z-20 bg-[linear-gradient(135deg,rgba(28,109,181,0.22),rgba(29,29,27,0.04)_42%,rgba(29,29,27,0.18))]" />
      <div className="absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-black/30 to-transparent" />
      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/85 px-3 py-2 shadow-sm backdrop-blur">
        {heroImages.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Mostrar imagen ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              index === activeIndex ? "w-7 bg-primary" : "w-2 bg-innova-gray/40 hover:bg-innova-gray"
            )}
          />
        ))}
      </div>
    </div>
  );
}
