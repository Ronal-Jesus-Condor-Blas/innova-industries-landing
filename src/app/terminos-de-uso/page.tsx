import type { Metadata } from "next";

import { TermsOfUseContent } from "@/components/legal-pages";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Términos de uso",
  description: "Condiciones aplicables al acceso y uso del sitio web de Innova Industries America.",
  path: "/terminos-de-uso"
});

export default function TermsOfUsePage() {
  return <><Header /><TermsOfUseContent /><Footer /></>;
}
