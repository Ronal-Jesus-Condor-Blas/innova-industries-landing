import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { brand, navItems } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <Image
              src="/assets/logo-innova-transparent.png"
              alt="Logo Innova America"
              width={1187}
              height={438}
              className="h-14 w-auto object-contain sm:h-16"
            />
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Soluciones industriales para mineria, construccion y manufactura,
              con enfoque en calidad, soporte tecnico y mejora continua.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-innova-black">Enlaces rapidos</h3>
            <div className="mt-4 grid gap-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-innova-black">Contacto</h3>
            <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <Link href={`mailto:${brand.email}`} className="hover:text-primary">{brand.email}</Link>
              <span>{brand.domain}</span>
              <span>Direccion y mapa por confirmar</span>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {brand.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
