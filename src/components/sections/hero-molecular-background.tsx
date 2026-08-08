import Image from "next/image";

export function HeroMolecularBackground() {
  return (
    <div
      aria-hidden="true"
      className="hero-molecule-bottom-fade pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-white dark:bg-[#0a0a0a] md:hidden" />
      <div className="hero-molecule-breathe absolute inset-0 origin-[55%_50%] md:-inset-3 md:origin-[62%_50%]">
        <div className="absolute inset-0 md:scale-[1.025]">
          <Image
            src="/images/hero-molecular-3d.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[54%_center] opacity-[0.92] contrast-[1.06] saturate-[0.8] dark:hidden md:object-[62%_center] md:opacity-100 md:saturate-100 lg:object-center"
          />
          <Image
            src="/images/hero-molecular-3d-0a-transparent.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hidden object-cover object-[55%_center] opacity-[0.82] dark:block md:object-[62%_center] md:opacity-[0.94] lg:object-center"
          />
        </div>
      </div>

      {/* Light mode keeps its soft wash; dark mode preserves the original molecular render. */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.48)_12%,rgba(255,255,255,0.14)_24%,transparent_38%)] md:block dark:hidden" />
      {/* Keep the light-theme edge wash; hiding it in dark mode removes the visible oval. */}
      <div className="absolute inset-0 hidden bg-[radial-gradient(ellipse_58%_65%_at_69%_48%,transparent_0%,transparent_58%,rgba(255,255,255,0.16)_100%)] md:block dark:hidden" />
    </div>
  );
}
