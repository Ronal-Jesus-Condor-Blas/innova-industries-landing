import type { Metadata } from "next";

import { Careers } from "@/components/sections/careers";
import { FloatingWhatsApp } from "@/components/sections/floating-whatsapp";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";

export const metadata: Metadata = {
  title: "Talento | INNOVA INDUSTRIES AMERICA SAC",
  description:
    "Conoce las oportunidades para desarrollar tu talento y formar parte del equipo de Innova América.",
  alternates: {
    canonical: "/trabaja-con-nosotros"
  }
};

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <Careers />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
