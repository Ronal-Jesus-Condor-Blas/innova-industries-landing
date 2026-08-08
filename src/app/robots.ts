import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/seo";

const nonSearchCrawlers = [
  "Amazonbot",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "GPTBot",
  "Meta-ExternalAgent",
  "PerplexityBot"
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: nonSearchCrawlers,
        disallow: "/"
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"]
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
