import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { brand, navItems } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-innova-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="inline-flex rounded-md bg-white px-3 py-2">
              <Image
                src="/assets/logo-innova-transparent.png"
                alt="Logo Innova America"
                width={1187}
                height={438}
                className="h-14 w-auto object-contain sm:h-16"
              />
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/70">
              Soluciones industriales para minería, construcción y manufactura,
              con enfoque en calidad, soporte técnico y mejora continua.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Enlaces rápidos</h3>
            <div className="mt-4 grid gap-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-white/70 transition hover:text-primary">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Contacto</h3>
            <div className="mt-4 grid gap-2 text-sm text-white/70">
              <Link href={`mailto:${brand.email}`} className="transition hover:text-primary">{brand.email}</Link>
              <span>{brand.domain}</span>
              <span>Dirección y mapa por confirmar</span>
            </div>
          </div>
        </div>
        <Separator className="my-8 bg-white/10" />
        <p className="text-center text-sm text-white/60">
          © 2026 {brand.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
