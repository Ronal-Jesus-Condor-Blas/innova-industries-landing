import { Contact } from "@/components/sections/contact";
import { FloatingWhatsApp } from "@/components/sections/floating-whatsapp";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
