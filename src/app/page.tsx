import { About } from "@/components/sections/about";
import { BusinessLines } from "@/components/sections/business-lines";
import { Contact } from "@/components/sections/contact";
import { Differentiators } from "@/components/sections/differentiators";
import { FloatingWhatsApp } from "@/components/sections/floating-whatsapp";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { NewsQuality } from "@/components/sections/news-quality";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <BusinessLines />
      <Differentiators />
      <NewsQuality />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
