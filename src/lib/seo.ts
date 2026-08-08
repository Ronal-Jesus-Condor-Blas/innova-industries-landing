import type { Metadata } from "next";

import { brand } from "@/lib/site";

export const siteUrl = "https://www.innovaindustriesperu.com";

const defaultDescription =
  "Innova Industries America desarrolla, fabrica y suministra soluciones industriales para minería, construcción, manufactura y automoción en Perú.";

export function createPageMetadata({
  title,
  description = defaultDescription,
  path
}: {
  title: string;
  description?: string;
  path: string;
}): Metadata {
  const canonical = new URL(path, siteUrl).toString();

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: brand.name,
      locale: "es_PE",
      type: "website",
      images: [
        {
          url: `${siteUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: `${brand.name} — Soluciones industriales`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/opengraph-image.png`]
    }
  };
}

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: brand.name,
  legalName: brand.name,
  taxID: brand.ruc,
  alternateName: [
    brand.shortName,
    "Innova Industries",
    "Innova America Industries"
  ],
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
  image: `${siteUrl}/opengraph-image.png`,
  description: defaultDescription,
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Mza. B1 Lote 3B, Z.I. Lotización Industrial Hua (Alt. Petramas)",
    addressLocality: "San Antonio",
    addressRegion: "Lima",
    addressCountry: "PE"
  },
  areaServed: "PE",
  sameAs: [brand.linkedin]
};
