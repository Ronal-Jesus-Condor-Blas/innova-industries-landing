"use client";

import Image from "next/image";

import { useLanguage } from "@/components/providers/language-provider";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const companies = [
  { name: "Nexa Resources", src: "/brands/nexa.svg", width: 1599, height: 397, className: "max-h-10 max-w-[165px] sm:max-w-[180px]" },
  { name: "Buenaventura", src: "/brands/buenaventura.png", width: 245, height: 32, className: "max-h-9 max-w-[175px] sm:max-w-[190px]" },
  { name: "AESA", src: "/brands/aesa.png", width: 1209, height: 405, className: "max-h-11 max-w-[145px] sm:max-w-[160px]" },
  { name: "Alpayana", src: "/brands/alpayana.png", width: 135, height: 44, className: "max-h-10 max-w-[145px] sm:max-w-[160px]" },
  { name: "JRC", src: "/brands/jrc.png", width: 380, height: 122, className: "max-h-10 max-w-[132px] sm:max-w-[148px]" },
  { name: "Estrella Resources", src: "/brands/estrella.png", width: 300, height: 117, className: "max-h-11 max-w-[145px] sm:max-w-[160px]" },
  { name: "Consorcio Minero Horizonte", src: "/brands/cmh.png", width: 2610, height: 1091, className: "max-h-12 max-w-[135px] brightness-100 sm:max-w-[150px]" },
  { name: "Tambojasa", src: "/brands/tambojasa.svg", width: 360, height: 80, className: "max-h-10 max-w-[170px] sm:max-w-[185px]" }
] as const;

function CompanyRow({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={duplicate || undefined}>
      {companies.map((company) => (
        <li key={`${duplicate ? "duplicate-" : ""}${company.name}`} className="relative flex h-24 w-[220px] shrink-0 items-center justify-center px-8 after:absolute after:right-0 after:h-9 after:w-px after:bg-border/60 sm:w-[250px] sm:px-10">
          <Image
            src={company.src}
            alt={duplicate ? "" : company.name}
            width={company.width}
            height={company.height}
            sizes="180px"
            className={cn("h-auto w-auto object-contain brightness-0 grayscale opacity-60 transition-[opacity,transform] duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:opacity-85 dark:invert", company.className)}
          />
        </li>
      ))}
    </ul>
  );
}

export function TrustedCompanies() {
  const { locale } = useLanguage();
  const title = locale === "es" ? "Empresas que confían en nosotros" : "Companies that trust us";

  return (
    <section className="overflow-hidden bg-background pb-28 pt-12 sm:pb-32 sm:pt-16 lg:pb-36 lg:pt-20" aria-labelledby="trusted-companies-title">
      <Reveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="trusted-companies-title" className="text-center font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-innova-black">{title}</h2>
      </Reveal>
      <Reveal delay={80} className="trusted-marquee mt-10 overflow-hidden bg-background sm:mt-12" tabIndex={0} aria-label={`${title}: ${companies.map((company) => company.name).join(", ")}`}>
        <div className="trusted-marquee-track flex w-max items-center"><CompanyRow /><CompanyRow duplicate /></div>
      </Reveal>
    </section>
  );
}
