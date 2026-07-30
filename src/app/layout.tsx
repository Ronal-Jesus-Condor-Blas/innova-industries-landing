import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
    : new URL("https://www.innovaindustriesperu.com");

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
    url: "/",
    siteName: "Innova America",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
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
    images: ["/opengraph-image.png"]
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
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
