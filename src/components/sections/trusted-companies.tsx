"use client";

import Image from "next/image";

import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

const companies = [
  { name: "Nexa Resources", src: "/brands/nexa.svg", width: 1599, height: 397, className: "max-h-9 max-w-[145px] sm:max-w-[158px]" },
  { name: "Buenaventura", src: "/brands/buenaventura.png", width: 245, height: 32, className: "max-h-8 max-w-[155px] sm:max-w-[170px]" },
  { name: "AESA", src: "/brands/aesa.png", width: 1209, height: 405, className: "max-h-10 max-w-[130px] sm:max-w-[145px]" },
  { name: "Alpayana", src: "/brands/alpayana.png", width: 135, height: 44, className: "max-h-9 max-w-[130px] sm:max-w-[145px]" },
  { name: "JRC", src: "/brands/jrc.png", width: 380, height: 122, className: "max-h-9 max-w-[118px] sm:max-w-[132px]" },
  { name: "Estrella Resources", src: "/brands/estrella.png", width: 300, height: 117, className: "max-h-10 max-w-[128px] sm:max-w-[142px]" },
  { name: "Consorcio Minero Horizonte", src: "/brands/cmh.png", width: 2610, height: 1091, className: "max-h-11 max-w-[118px] brightness-100 sm:max-w-[132px]" },
  { name: "Tambojasa", src: "/brands/tambojasa.svg", width: 360, height: 80, className: "max-h-9 max-w-[150px] sm:max-w-[165px]" }
] as const;

function CompanyRow({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={duplicate || undefined}>
      {companies.map((company) => (
        <li key={`${duplicate ? "duplicate-" : ""}${company.name}`} className="relative flex h-20 w-[190px] shrink-0 items-center justify-center px-6 after:absolute after:right-0 after:h-8 after:w-px after:bg-border/70 sm:w-[220px] sm:px-8">
          <Image
            src={company.src}
            alt={duplicate ? "" : company.name}
            width={company.width}
            height={company.height}
            sizes="180px"
            className={cn("h-auto w-auto object-contain brightness-0 grayscale opacity-60 transition-opacity duration-300 hover:opacity-85 dark:invert", company.className)}
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
    <section className="overflow-hidden bg-background pb-14 pt-10 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-14" aria-labelledby="trusted-companies-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="trusted-companies-title" className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-innova-black">{title}</h2>
      </div>
      <div className="trusted-marquee mt-8 overflow-hidden bg-background sm:mt-9" tabIndex={0} aria-label={`${title}: ${companies.map((company) => company.name).join(", ")}`}>
        <div className="trusted-marquee-track flex w-max items-center"><CompanyRow /><CompanyRow duplicate /></div>
      </div>
    </section>
  );
}
