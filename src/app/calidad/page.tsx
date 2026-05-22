import { FloatingWhatsApp } from "@/components/sections/floating-whatsapp";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { QualityPolicies } from "@/components/sections/quality-policies";
import { Badge } from "@/components/ui/badge";

export default function CalidadPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="border-b bg-muted/40 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up max-w-4xl">
            <Badge variant="outline" className="border-primary/30 bg-white text-primary shadow-sm">
              Gestión institucional
            </Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal text-innova-black sm:text-5xl">
              Calidad, políticas y mejora continua
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Compromisos institucionales orientados a calidad, cumplimiento, seguridad, mejora
              continua y gestión responsable.
            </p>
          </div>
        </div>
      </section>
      <QualityPolicies />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
