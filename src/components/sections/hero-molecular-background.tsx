"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const PARALLAX_X = 18;
const PARALLAX_Y = 12;

export function HeroMolecularBackground() {
  const layerRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const light = lightRef.current;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 768px) and (pointer: fine)");

    if (!layer || !light || motionQuery.matches || !desktopQuery.matches) {
      return;
    }

    const reset = () => {
      layer.style.transform = "translate3d(0, 0, 0) scale(1.035)";
      light.style.opacity = "0";
    };

    const handlePointerMove = (event: PointerEvent) => {
      const normalizedX = event.clientX / window.innerWidth - 0.5;
      const normalizedY = event.clientY / window.innerHeight - 0.5;
      const offsetX = normalizedX * -PARALLAX_X;
      const offsetY = normalizedY * -PARALLAX_Y;

      layer.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) scale(1.055)`;
      light.style.background = `radial-gradient(circle 190px at ${event.clientX}px ${event.clientY}px, rgb(28 109 181 / 0.08), transparent 72%)`;
      light.style.opacity = "1";
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
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <svg className="absolute h-0 w-0">
        <filter id="molecule-white" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -0.2126 -0.7152 -0.0722 1 0"
          />
          <feComponentTransfer>
            <feFuncA type="linear" slope="2.8" />
          </feComponentTransfer>
        </filter>
      </svg>
      <div
        ref={layerRef}
        className="absolute -inset-5 will-change-transform transition-transform duration-700 ease-out md:scale-[1.035]"
      >
        <Image
          src="/images/hero-molecular-3d.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-molecule-breathe object-cover object-[62%_center] opacity-[0.44] brightness-[0.96] contrast-[1.24] saturate-[1.08] dark:hidden sm:opacity-55 lg:object-center lg:opacity-[0.72]"
        />
        <Image
          src="/images/hero-molecular-3d.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-molecule-breathe hidden object-cover object-[62%_center] opacity-[0.42] dark:block sm:opacity-[0.68] lg:object-center lg:opacity-80"
          style={{ filter: "url(#molecule-white)" }}
        />
      </div>
      <div
        ref={lightRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-700"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_44%,rgba(28,109,181,0.085)_0%,transparent_40%)] dark:hidden" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0.08)_48%,rgba(255,255,255,0)_74%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.64)_0%,rgba(0,0,0,0.18)_58%,rgba(0,0,0,0.36)_100%)]" />
    </div>
  );
}
