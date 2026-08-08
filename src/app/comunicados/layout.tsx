import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Comunicados institucionales",
  description:
    "Políticas de calidad, noticias y comunicados oficiales de Innova Industries America SAC.",
  path: "/comunicados"
});

export default function ComunicadosLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
