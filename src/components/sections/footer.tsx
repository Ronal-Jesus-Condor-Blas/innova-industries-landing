"use client";

import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { useLanguage } from "@/components/providers/language-provider";
import { brand, navItems } from "@/lib/site";

export function Footer() {
  const { locale } = useLanguage();
  const copy = locale === "es"
    ? { description: "Soluciones industriales para minería, construcción y manufactura, con enfoque en calidad, soporte técnico y mejora continua", mobileDescription: "Soluciones industriales para minería, construcción y manufactura", links: "Enlaces rápidos", contact: "Contacto", location: "San Antonio, Huarochirí · Lima, Perú", rights: "Todos los derechos reservados", emailTitle: "Enviar correo a INNOVA", nav: ["Inicio", "Comunicados", "Contacto"] }
    : { description: "Industrial solutions for mining, construction and manufacturing, focused on quality, technical support and continuous improvement", mobileDescription: "Industrial solutions for mining, construction and manufacturing", links: "Quick links", contact: "Contact", location: "San Antonio, Huarochirí · Lima, Peru", rights: "All rights reserved", emailTitle: "Email INNOVA", nav: ["Home", "Newsroom", "Contact"] };

  return (
    <footer className="border-t border-border/40 bg-background text-innova-black">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-12 sm:px-8 sm:pb-10 sm:pt-14 md:px-6 md:pb-8 md:pt-16 lg:px-8">
        <div className="grid gap-8 text-center min-[520px]:grid-cols-2 min-[520px]:gap-x-10 min-[520px]:gap-y-8 md:grid-cols-[1.25fr_0.75fr_0.9fr] md:items-start md:gap-12 md:text-left lg:gap-16">
          <div className="flex flex-col items-center min-[520px]:col-span-2 md:col-span-1 md:items-start">
            <BrandLogo className="h-12 w-48 max-w-full sm:h-14 sm:w-56 md:h-16 md:w-64" />
            <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-muted-foreground md:hidden">{copy.mobileDescription}</p>
            <p className="mt-4 hidden max-w-md text-sm leading-6 text-muted-foreground md:block">{copy.description}</p>
          </div>
          <nav aria-label={copy.links} className="min-[520px]:text-left">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground md:text-sm md:normal-case md:tracking-normal md:text-innova-black">{copy.links}</h3>
            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 min-[520px]:justify-start md:grid md:justify-items-start md:gap-2">
              {navItems.map((item, index) => <Link key={item.href} href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary focus:text-primary focus:outline-none">{copy.nav[index]}</Link>)}
            </div>
          </nav>
          <div className="min-[520px]:text-left">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground md:text-sm md:normal-case md:tracking-normal md:text-innova-black">{copy.contact}</h3>
            <div className="mt-4 grid justify-items-center gap-2 text-sm leading-6 text-muted-foreground min-[520px]:justify-items-start">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=a.rios@innovaindustriesperu.com" target="_blank" rel="noopener noreferrer" className="break-all underline decoration-primary/50 underline-offset-2 outline-none transition hover:text-primary hover:decoration-2 focus:text-primary sm:break-normal" title={copy.emailTitle} aria-label={copy.emailTitle}>a.rios@innovaindustriesperu.com</a>
              <span>{brand.domain}</span>
              <address className="mx-auto max-w-sm not-italic min-[520px]:mx-0">{copy.location}</address>
            </div>
          </div>
        </div>
      </div>
      <div className="px-20 pb-5 pt-4 text-center sm:px-6 sm:pb-6">
        <p className="mx-auto max-w-md text-xs leading-5 text-muted-foreground">© 2026 {brand.name}. {copy.rights}</p>
      </div>
    </footer>
  );
}
