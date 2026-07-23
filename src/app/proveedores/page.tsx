import type { Metadata } from "next";

import { FloatingWhatsApp } from "@/components/sections/floating-whatsapp";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Suppliers } from "@/components/sections/suppliers";

export const metadata: Metadata = {
  title: "Proveedores | INNOVA INDUSTRIES AMERICA SAC",
  description: "Registra tu empresa para formar parte de la red de proveedores de Innova América.",
  alternates: {
    canonical: "/proveedores"
  }
};

export default function ProveedoresPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Suppliers />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
