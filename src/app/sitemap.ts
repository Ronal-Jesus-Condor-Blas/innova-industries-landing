import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/seo";

const lastModified = new Date("2026-08-08T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${siteUrl}/comunicados`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${siteUrl}/contacto`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7
    },
    {
      url: `${siteUrl}/politica-de-privacidad`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2
    },
    {
      url: `${siteUrl}/terminos-de-uso`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2
    },
    {
      url: `${siteUrl}/politica-de-cookies`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2
    }
  ];
}
