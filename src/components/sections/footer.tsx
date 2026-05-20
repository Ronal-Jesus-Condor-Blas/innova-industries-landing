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
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=a.rios@innovaindustriesperu.com&su=Consulta%20desde%20la%20landing%20page%20de%20INNOVA&body=Hola%20equipo%20de%20INNOVA%2C%0A%0AMe%20comunico%20desde%20la%20landing%20page%20para%20realizar%20una%20consulta.%0A%0ANombre%3A%0AEmpresa%3A%0ATel%C3%A9fono%3A%0AMensaje%3A"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-[#1C6DB5] focus:text-[#1C6DB5] outline-none underline underline-offset-2 decoration-[#1C6DB5] hover:decoration-2"
                title="Enviar correo a INNOVA"
                aria-label="Enviar correo a INNOVA"
              >
                a.rios@innovaindustriesperu.com
              </a>
              <span>{brand.domain}</span>
              <address className="not-italic mt-2">
                Mza. B1 Lote. 3b Z.I. Lotizacion Industrial Hua (Alt. Petramas)<br />
                San Antonio, Huarochiri<br />
                Lima, Perú
              </address>
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
