import { FloatingWhatsApp } from "@/components/sections/floating-whatsapp";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { NewsQuality } from "@/components/sections/news-quality";
import { Badge } from "@/components/ui/badge";

export default function ComunicadosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="border-b bg-muted/40 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up max-w-4xl">
            <Badge variant="outline" className="border-primary/30 bg-white text-primary shadow-sm">
              Comunicados
            </Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal text-innova-black sm:text-5xl">
              Comunicados institucionales
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Canal oficial para publicar políticas, certificaciones, lineamientos internos,
              comunicados corporativos y actualizaciones relevantes de INNOVA INDUSTRIES AMERICA SAC.
            </p>
          </div>
        </div>
      </section>
      <NewsQuality />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
