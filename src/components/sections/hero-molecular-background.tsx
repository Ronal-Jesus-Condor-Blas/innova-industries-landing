"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const PARALLAX_X = 10;
const PARALLAX_Y = 7;

export function HeroMolecularBackground() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 768px) and (pointer: fine)");

    if (!layer || motionQuery.matches || !desktopQuery.matches) {
      return;
    }

    const reset = () => {
      layer.style.transform = "translate3d(0, 0, 0) scale(1.025)";
    };

    const handlePointerMove = (event: PointerEvent) => {
      const normalizedX = event.clientX / window.innerWidth - 0.5;
      const normalizedY = event.clientY / window.innerHeight - 0.5;
      const offsetX = normalizedX * -PARALLAX_X;
      const offsetY = normalizedY * -PARALLAX_Y;

      layer.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) scale(1.035)`;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", reset);
    window.addEventListener("blur", reset);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", reset);
      window.removeEventListener("blur", reset);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="hero-molecule-bottom-fade pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Mobile remains static so Safari renders both theme assets consistently. */}
      <div className="absolute inset-0 bg-white dark:bg-[#0a0a0a] md:hidden" />
      <Image
        src="/images/hero-molecular-3d.png"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-[60%_center] contrast-[1.06] saturate-[0.8] dark:hidden md:hidden"
      />
      <Image
        src="/images/hero-molecular-3d-0a-transparent.png"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="hidden object-cover object-[59%_center] opacity-[0.82] dark:block md:dark:hidden"
      />

      <div
        ref={layerRef}
        className="absolute -inset-3 hidden scale-[1.025] will-change-transform transition-transform duration-700 ease-out md:block"
      >
        <Image
          src="/images/hero-molecular-3d.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] opacity-100 dark:hidden lg:object-center"
        />
        <Image
          src="/images/hero-molecular-3d-0a-transparent.png"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hidden object-cover object-[62%_center] opacity-[0.94] dark:block lg:object-center"
        />
      </div>

      {/* Light mode keeps its soft wash; dark mode preserves the original molecular render. */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.48)_12%,rgba(255,255,255,0.14)_24%,transparent_38%)] md:block dark:hidden" />
      {/* Keep the light-theme edge wash; hiding it in dark mode removes the visible oval. */}
      <div className="absolute inset-0 hidden bg-[radial-gradient(ellipse_58%_65%_at_69%_48%,transparent_0%,transparent_58%,rgba(255,255,255,0.16)_100%)] md:block dark:hidden" />
    </div>
  );
}
