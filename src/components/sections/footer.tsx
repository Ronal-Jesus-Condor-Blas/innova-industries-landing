"use client";

import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

import { BrandLogo } from "@/components/brand-logo";
import { useLanguage } from "@/components/providers/language-provider";
import { brand, navItems } from "@/lib/site";

export function Footer() {
  const { locale } = useLanguage();
  const copy = locale === "es"
    ? {
        description: "Soluciones especializadas para minería, construcción e industria, respaldadas por experiencia técnica y atención cercana.",
        mobileDescription: "Soluciones especializadas para minería, construcción e industria, respaldadas por experiencia técnica y atención cercana.",
        company: "Empresa",
        contact: "Contacto",
        location: ["San Antonio, Huarochirí", "Lima, Perú"],
        rights: "Todos los derechos reservados",
        privacy: "Política de privacidad",
        terms: "Términos de uso",
        cookies: "Política de cookies",
        nav: ["Inicio", "Comunicados", "Contacto"]
      }
    : {
        description: "Specialized solutions for mining, construction and industry, backed by technical expertise and close support.",
        mobileDescription: "Specialized solutions for mining, construction and industry, backed by technical expertise and close support.",
        company: "Company",
        contact: "Contact",
        location: ["San Antonio, Huarochirí", "Lima, Peru"],
        rights: "All rights reserved",
        privacy: "Privacy policy",
        terms: "Terms of use",
        cookies: "Cookie policy",
        nav: ["Home", "Newsroom", "Contact"]
      };

  return (
    <footer className="border-t border-border/40 bg-background text-innova-black">
      <div className="mx-auto max-w-[68rem] px-6 pb-14 pt-20 sm:px-8 sm:pb-16 sm:pt-24 md:px-6 md:pb-12 md:pt-16 lg:px-8 xl:pb-9 xl:pt-12">
        <div className="grid gap-12 text-center md:grid-cols-[1.25fr_0.7fr_0.9fr] md:items-start md:gap-12 md:text-left lg:gap-20 xl:gap-14">
          <div className="flex flex-col items-center md:items-start">
            <BrandLogo
              darkVariant="white"
              className="h-8 w-[112px] min-[375px]:h-9 min-[375px]:w-[126px] sm:h-[46px] sm:w-[184px] xl:h-10 xl:w-40"
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
              <span>{brand.domain}</span>
              <a
                href={brand.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 transition-colors hover:text-primary focus:text-primary focus:outline-none"
                aria-label={
                  locale === "es"
                    ? "LinkedIn de Innova Industries America"
                    : "Innova Industries America on LinkedIn"
                }
              >
                <FaLinkedin className="h-[18px] w-[18px]" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
              <address className="mt-1 grid not-italic">
                {copy.location.map((line) => <span key={line}>{line}</span>)}
              </address>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-6 border-t border-border/40 px-4 pb-20 pt-6 text-center sm:mx-8 sm:px-6 sm:pb-8 md:mx-auto md:max-w-[68rem]">
        <p className="mx-auto max-w-md text-xs leading-5 text-muted-foreground">
          © 2026 {brand.name}. {copy.rights}
        </p>
        <nav
          aria-label={locale === "es" ? "Enlaces legales" : "Legal links"}
          className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          {[
            ["/politica-de-privacidad", copy.privacy],
            ["/terminos-de-uso", copy.terms],
            ["/politica-de-cookies", copy.cookies]
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline focus:text-primary focus:outline-none"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
