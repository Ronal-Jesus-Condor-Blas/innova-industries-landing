"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const PARALLAX_X = 18;
const PARALLAX_Y = 12;

export function HeroMolecularBackground() {
  const layerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const detail = detailRef.current;
    const light = lightRef.current;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 768px) and (pointer: fine)");

    if (!layer || !detail || !light || motionQuery.matches || !desktopQuery.matches) {
      return;
    }

    const reset = () => {
      layer.style.transform = "translate3d(0, 0, 0) scale(1.035)";
      detail.style.transform = "translate3d(0, 0, 0) scale(1.035)";
      light.style.opacity = "0";
    };

    const handlePointerMove = (event: PointerEvent) => {
      const normalizedX = event.clientX / window.innerWidth - 0.5;
      const normalizedY = event.clientY / window.innerHeight - 0.5;
      const offsetX = normalizedX * -PARALLAX_X;
      const offsetY = normalizedY * -PARALLAX_Y;

      const transform = `translate3d(${offsetX}px, ${offsetY}px, 0) scale(1.055)`;
      layer.style.transform = transform;
      detail.style.transform = transform;
      light.style.background = `radial-gradient(circle 190px at ${event.clientX}px ${event.clientY}px, rgb(28 109 181 / 0.1), transparent 72%)`;
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
    <div aria-hidden="true" className="hero-molecule-bottom-fade pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/*
        Mobile Safari can change the color of filtered, blended and animated
        layers when it promotes them to the GPU. Keep the mobile composition
        deliberately static: one image, one opacity and no blend mode.
      */}
      <Image
        src="/images/hero-molecular-3d.png"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-[62%_center] opacity-[0.62] dark:hidden md:hidden"
      />
      <Image
        src="/images/hero-molecular-3d-0a-transparent.png"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="hero-molecule-focus-mask hidden object-cover object-[62%_center] opacity-[0.66] dark:block md:dark:hidden"
      />
      <Image
        src="/images/hero-molecular-outline.png"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="hero-molecule-focus-mask hidden object-cover object-[62%_center] opacity-[0.42] dark:block md:dark:hidden"
      />
      <div
        ref={layerRef}
        className="absolute -inset-5 hidden will-change-transform transition-transform duration-700 ease-out md:block md:scale-[1.035]"
      >
        <Image
          src="/images/hero-molecular-3d.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-molecule-breathe object-cover object-[62%_center] opacity-[0.48] brightness-[1.015] contrast-[1.24] saturate-[1.06] dark:hidden sm:opacity-[0.59] lg:object-center lg:opacity-[0.76]"
        />
        <Image
          src="/images/hero-molecular-3d-0a-transparent.png"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hero-molecule-focus-mask hidden object-cover object-[62%_center] opacity-[0.72] dark:block lg:object-center"
        />
        <Image
          src="/images/hero-molecular-outline.png"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hero-molecule-focus-mask hidden object-cover object-[62%_center] opacity-[0.42] dark:block lg:object-center"
        />
      </div>
      <div
        ref={lightRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-700 dark:hidden"
      />
      <div className="absolute inset-0 hidden bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.015)_48%,rgba(255,255,255,0)_72%)] md:block dark:hidden" />
      <div
        ref={detailRef}
        className="absolute -inset-5 hidden will-change-transform transition-transform duration-700 ease-out dark:hidden md:block md:scale-[1.035]"
      >
        <div className="absolute inset-0 [mask-image:linear-gradient(to_right,black_0%,black_44%,transparent_76%)] [-webkit-mask-image:linear-gradient(to_right,black_0%,black_44%,transparent_76%)]">
          <Image
            src="/images/hero-molecular-3d.png"
            alt=""
            fill
            sizes="100vw"
            className="hero-molecule-breathe object-cover object-[62%_center] opacity-[0.29] brightness-[1.03] grayscale contrast-[2] mix-blend-multiply sm:opacity-[0.27] lg:object-center lg:opacity-[0.23]"
          />
        </div>
      </div>
    </div>
  );
}
