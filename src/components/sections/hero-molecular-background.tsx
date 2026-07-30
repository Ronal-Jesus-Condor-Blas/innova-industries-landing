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
      <Image
        src="/images/hero-molecular-3d.png"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-[62%_center] opacity-100 dark:hidden md:hidden"
      />
      <Image
        src="/images/hero-molecular-3d-0a-transparent.png"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="hidden object-cover object-[62%_center] opacity-[0.94] dark:block md:dark:hidden"
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

      {/* One ambient layer creates depth without retracing or blurring the render. */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.22)_18%,transparent_40%)] md:bg-[linear-gradient(90deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.48)_12%,rgba(255,255,255,0.14)_24%,transparent_38%)] dark:bg-[linear-gradient(90deg,#0a0a0a_0%,rgba(10,10,10,0.98)_31%,rgba(10,10,10,0.78)_38%,rgba(10,10,10,0.22)_46%,transparent_53%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_65%_at_69%_48%,transparent_0%,transparent_58%,rgba(255,255,255,0.16)_100%)] dark:bg-[radial-gradient(ellipse_58%_65%_at_69%_48%,transparent_0%,transparent_62%,rgba(10,10,10,0.22)_100%)]" />
    </div>
  );
}
