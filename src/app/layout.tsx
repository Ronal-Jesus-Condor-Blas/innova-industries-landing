import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AppProviders } from "@/components/providers/app-providers";
import { CookieBanner } from "@/components/cookie-banner";
import { organizationStructuredData, siteUrl } from "@/lib/seo";
import "./globals.css";

const metadataBase = new URL(siteUrl);
const socialImageUrl = new URL("/opengraph-image.png", metadataBase).toString();

export const metadata: Metadata = {
  metadataBase,
  applicationName: "INNOVA INDUSTRIES AMERICA SAC",
  title: {
    default: "INNOVA INDUSTRIES AMERICA SAC | Soluciones industriales en Perú",
    template: "%s | Innova Industries"
  },
  description:
    "Soluciones químicas e industriales, productos especializados y soporte técnico para minería, construcción e industria.",
  keywords: [
    "Innova Industries America",
    "Innova Industries",
    "soluciones industriales Perú",
    "soluciones para minería",
    "química industrial",
    "sistemas poliméricos"
  ],
  creator: "INNOVA INDUSTRIES AMERICA SAC",
  publisher: "INNOVA INDUSTRIES AMERICA SAC",
  category: "Industria",
  openGraph: {
    title: "INNOVA INDUSTRIES AMERICA",
    description:
      "Ingeniería, productos especializados y soporte técnico para minería, construcción e industria.",
    url: siteUrl,
    siteName: "INNOVA INDUSTRIES AMERICA SAC",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        alt: "INNOVA INDUSTRIES AMERICA SAC — Soluciones industriales"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "INNOVA INDUSTRIES AMERICA",
    description:
      "Ingeniería, productos especializados y soporte técnico para minería, construcción e industria.",
    images: [socialImageUrl]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" }
  },
  formatDetection: { telephone: false },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData).replace(
              /</g,
              "\\u003c"
            )
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                window.localStorage.setItem("innova-theme-v2", "dark");
                document.documentElement.classList.remove("light");
                document.documentElement.classList.add("dark");
                document.documentElement.style.colorScheme = "dark";
              } catch {}
            `
          }}
        />
      </head>
      <body className={`${GeistSans.className} antialiased`}>
        <AppProviders>
          {children}
          <CookieBanner />
          <Analytics />
          <SpeedInsights sampleRate={0.5} />
        </AppProviders>
      </body>
    </html>
  );
}
