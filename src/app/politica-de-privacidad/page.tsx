import type { Metadata } from "next";

import { PrivacyPolicyContent } from "@/components/legal-pages";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Política de privacidad",
  description: "Conoce cómo Innova Industries America trata y protege los datos personales recibidos mediante su sitio web.",
  path: "/politica-de-privacidad"
});

export default function PrivacyPolicyPage() {
  return <><Header /><PrivacyPolicyContent /><Footer /></>;
}
