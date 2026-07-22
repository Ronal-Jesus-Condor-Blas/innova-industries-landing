"use client";

import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { useLanguage } from "@/components/providers/language-provider";
import { Separator } from "@/components/ui/separator";
import { brand, navItems } from "@/lib/site";

export function Footer() {
  const { locale } = useLanguage();
  const copy = locale === "es"
    ? { description: "Soluciones industriales para minería, construcción y manufactura, con enfoque en calidad, soporte técnico y mejora continua", links: "Enlaces rápidos", contact: "Contacto", rights: "Todos los derechos reservados", emailTitle: "Enviar correo a INNOVA", nav: ["Inicio", "Comunicados", "Contacto"] }
    : { description: "Industrial solutions for mining, construction and manufacturing, focused on quality, technical support and continuous improvement", links: "Quick links", contact: "Contact", rights: "All rights reserved", emailTitle: "Email INNOVA", nav: ["Home", "Newsroom", "Contact"] };

  return (
    <footer className="border-t border-border/40 bg-background text-innova-black">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 sm:px-6 sm:pb-14 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="grid gap-12 text-center md:grid-cols-[1.25fr_0.75fr_0.85fr] md:items-start md:gap-12 md:text-left lg:gap-16">
          <div className="flex flex-col items-center md:items-start">
            <BrandLogo className="h-14 w-56 max-w-full sm:h-16 sm:w-64 md:h-[72px] md:w-[288px]" />
            <p className="mx-auto mt-5 max-w-sm text-sm leading-6 text-muted-foreground md:mx-0 md:max-w-md">{copy.description}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-innova-black">{copy.links}</h3>
            <div className="mt-4 grid justify-items-center gap-2 md:justify-items-start">
              {navItems.map((item, index) => <Link key={item.href} href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary focus:text-primary focus:outline-none">{copy.nav[index]}</Link>)}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-innova-black">{copy.contact}</h3>
            <div className="mt-4 grid justify-items-center gap-2 text-sm text-muted-foreground md:justify-items-start">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=a.rios@innovaindustriesperu.com" target="_blank" rel="noopener noreferrer" className="break-all underline decoration-primary/50 underline-offset-2 outline-none transition hover:text-primary hover:decoration-2 focus:text-primary sm:break-normal" title={copy.emailTitle} aria-label={copy.emailTitle}>a.rios@innovaindustriesperu.com</a>
              <span>{brand.domain}</span>
              <address className="mx-auto mt-2 max-w-sm not-italic md:mx-0">Mza. B1 Lote. 3b Z.I. Lotización Industrial Hua (Alt. Petramas)<br />San Antonio, Huarochirí<br />Lima, Perú</address>
            </div>
          </div>
        </div>
        <Separator className="my-9 bg-border/50" />
        <p className="mx-auto max-w-lg text-center text-sm leading-6 text-muted-foreground">© 2026 {brand.name}. {copy.rights}</p>
      </div>
    </footer>
  );
}
