import { BusinessLines } from "@/components/sections/business-lines";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { HomeAbout } from "@/components/sections/home-about";
import { IndustrySolutions } from "@/components/sections/industry-solutions";
import { TrustedCompanies } from "@/components/sections/trusted-companies";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <Hero />
        <BusinessLines />
        <IndustrySolutions />
        <HomeAbout />
        <TrustedCompanies />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
