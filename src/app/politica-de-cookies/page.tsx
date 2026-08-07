import type { Metadata } from "next";

import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Política de cookies | INNOVA INDUSTRIES AMERICA SAC",
  description: "Información sobre el uso de cookies y almacenamiento local en el sitio web de Innova América.",
  alternates: { canonical: "/politica-de-cookies" }
};

export default function CookiePolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pb-20 pt-12 sm:pb-24 sm:pt-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">Privacidad</p>
          <h1 className="mt-4 text-4xl font-normal tracking-[-0.04em] text-innova-black sm:text-6xl">Política de cookies</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            Esta política explica qué información guarda este sitio en tu dispositivo y cómo puedes controlarla.
          </p>

          <Card className="carbon-card mt-10 space-y-8 rounded-2xl p-6 sm:p-10">
            <section>
              <h2 className="text-xl font-semibold text-innova-black">¿Qué utilizamos?</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                El sitio utiliza almacenamiento local estrictamente necesario para recordar el idioma, el tema visual y la confirmación de este aviso. Actualmente no utilizamos cookies publicitarias ni de seguimiento.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-innova-black">Finalidad</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Estas preferencias permiten mantener una experiencia consistente entre visitas y asegurar el funcionamiento correcto de la interfaz.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-innova-black">Cómo administrar tus preferencias</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Puedes eliminar los datos almacenados desde la configuración de privacidad de tu navegador. Al hacerlo, el sitio volverá a solicitar tus preferencias en la próxima visita.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-innova-black">Contacto</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Para consultas relacionadas con esta política, utiliza el formulario disponible en la sección de contacto.
              </p>
            </section>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
