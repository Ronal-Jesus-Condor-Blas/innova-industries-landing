import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AppProviders } from "@/components/providers/app-providers";
import { CookieBanner } from "@/components/cookie-banner";
import "./globals.css";

const siteUrl = new URL("https://www.innovaindustriesperu.com");
const socialImageUrl = new URL("/opengraph-image.png", siteUrl).toString();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "INNOVA INDUSTRIES AMERICA SAC | Soluciones industriales",
  description:
    "Soluciones químicas e industriales, productos especializados y soporte técnico para minería, construcción e industria.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "INNOVA INDUSTRIES AMERICA SAC",
    description:
      "Ingeniería, productos especializados y soporte técnico para minería, construcción e industria.",
    url: siteUrl.toString(),
    siteName: "Innova America",
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
    title: "INNOVA INDUSTRIES AMERICA SAC",
    description:
      "Ingeniería, productos especializados y soporte técnico para minería, construcción e industria.",
    images: [socialImageUrl]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" }
  },
  formatDetection: { telephone: false }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
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
        </AppProviders>
      </body>
    </html>
  );
}
