import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.innovaindustriesperu.com"),
  title: "INNOVA INDUSTRIES AMERICA SAC | Soluciones industriales",
  description:
    "Landing corporativa de INNOVA INDUSTRIES AMERICA SAC: soluciones quimicas industriales, aditivos, fibras, soporte tecnico, calidad y comunicados institucionales.",
  openGraph: {
    title: "INNOVA INDUSTRIES AMERICA SAC",
    description:
      "Soluciones industriales para mineria, construccion y manufactura con enfoque en calidad, soporte tecnico y mejora continua.",
    url: "https://www.innovaindustriesperu.com",
    siteName: "Innova America",
    locale: "es_PE",
    type: "website"
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
      <body className={`${GeistSans.className} antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
