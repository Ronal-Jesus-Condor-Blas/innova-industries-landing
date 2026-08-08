import type { Metadata } from "next";

import { CookiePolicyContent } from "@/components/legal-pages";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Política de cookies",
  description: "Información sobre almacenamiento local y medición técnica en el sitio web de Innova América.",
  path: "/politica-de-cookies"
});

export default function CookiePolicyPage() {
  return <><Header /><CookiePolicyContent /><Footer /></>;
}
