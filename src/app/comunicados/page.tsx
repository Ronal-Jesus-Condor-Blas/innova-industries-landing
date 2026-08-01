"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { FloatingWhatsApp } from "@/components/sections/floating-whatsapp";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { NewsQuality } from "@/components/sections/news-quality";

export default function ComunicadosPage() {
  const { locale } = useLanguage();
  const copy = locale === "es"
    ? { eyebrow: "Sala de prensa", title: "Comunicados", accent: "institucionales", description: "Políticas de calidad y actualizaciones oficiales de Innova América, reunidas en un espacio claro y accesible." }
    : { eyebrow: "Newsroom", title: "Company", accent: "announcements", description: "Quality policies and official updates from Innova America, brought together in a clear and accessible space." };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="bg-background pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{copy.eyebrow}</p>
            <h1 className="mt-5 text-[2.55rem] font-normal leading-[0.98] tracking-[-0.045em] text-innova-black min-[375px]:text-5xl sm:text-6xl lg:text-7xl">{copy.title}<span className="block font-semibold text-primary">{copy.accent}</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{copy.description}</p>
          </div>
        </div>
      </section>
      <NewsQuality />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
