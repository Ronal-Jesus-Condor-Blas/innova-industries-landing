import type { Metadata } from "next";

import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contacto",
  description:
    "Contacta al equipo de Innova Industries America para evaluar soluciones industriales para tu operación en Perú.",
  path: "/contacto"
});

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Contact />
      <Footer />
    </main>
  );
}
