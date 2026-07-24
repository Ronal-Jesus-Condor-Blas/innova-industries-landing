"use client";

import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { useLanguage } from "@/components/providers/language-provider";
import { brand, navItems } from "@/lib/site";

export function Footer() {
  const { locale } = useLanguage();
  const copy = locale === "es"
    ? {
        description: "Soluciones especializadas para minería, construcción y el sector automotriz, respaldadas por experiencia técnica y atención cercana.",
        mobileDescription: "Soluciones especializadas para minería, construcción y el sector automotriz.",
        company: "Empresa",
        contact: "Contacto",
        location: ["San Antonio, Huarochirí", "Lima, Perú"],
        rights: "Todos los derechos reservados",
        emailTitle: "Enviar correo a INNOVA",
        nav: ["Inicio", "Comunicados", "Talento", "Contacto"]
      }
    : {
        description: "Specialized solutions for mining, construction and automotive operations, backed by technical expertise and close support.",
        mobileDescription: "Specialized solutions for mining, construction and automotive operations.",
        company: "Company",
        contact: "Contact",
        location: ["San Antonio, Huarochirí", "Lima, Peru"],
        rights: "All rights reserved",
        emailTitle: "Email INNOVA",
        nav: ["Home", "Newsroom", "Careers", "Contact"]
      };

  return (
    <footer className="border-t border-border/40 bg-background text-innova-black">
      <div className="mx-auto max-w-7xl px-6 pb-14 pt-20 sm:px-8 sm:pb-16 sm:pt-24 md:px-6 md:pb-12 md:pt-16 lg:px-8">
        <div className="grid gap-12 text-center md:grid-cols-[1.25fr_0.7fr_0.9fr] md:items-start md:gap-12 md:text-left lg:gap-20">
          <div className="flex flex-col items-center md:items-start">
            <BrandLogo
              darkVariant="white"
              className="h-8 w-[112px] min-[375px]:h-9 min-[375px]:w-[126px] sm:h-[46px] sm:w-[184px]"
            />
            <p className="mx-auto mt-5 max-w-[18rem] text-sm leading-6 text-muted-foreground md:hidden">
              {copy.mobileDescription}
            </p>
            <p className="mt-5 hidden max-w-md text-sm leading-6 text-muted-foreground md:block">
              {copy.description}
            </p>
          </div>

          <nav aria-label={copy.company}>
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {copy.company}
            </h3>
            <div className="mt-5 grid justify-items-center gap-3 md:justify-items-start">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary focus:text-primary focus:outline-none"
                >
                  {copy.nav[index]}
                </Link>
              ))}
            </div>
          </nav>

          <div>
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {copy.contact}
            </h3>
            <div className="mt-5 grid justify-items-center gap-3 text-sm leading-6 text-muted-foreground md:justify-items-start">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=a.rios@innovaindustriesperu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="break-all underline decoration-primary/50 underline-offset-2 outline-none transition hover:text-primary hover:decoration-2 focus:text-primary sm:break-normal"
                title={copy.emailTitle}
                aria-label={copy.emailTitle}
              >
                a.rios@innovaindustriesperu.com
              </a>
              <span>{brand.domain}</span>
              <address className="mt-1 grid not-italic">
                {copy.location.map((line) => <span key={line}>{line}</span>)}
              </address>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-6 border-t border-border/40 px-4 pb-20 pt-6 text-center sm:mx-8 sm:px-6 sm:pb-8 md:mx-auto md:max-w-7xl">
        <p className="mx-auto max-w-md text-xs leading-5 text-muted-foreground">
          © 2026 {brand.name}. {copy.rights}
        </p>
      </div>
    </footer>
  );
}
