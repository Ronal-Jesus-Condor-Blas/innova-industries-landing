import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.innovaindustriesperu.com"),
  title: "INNOVA INDUSTRIES AMERICA SAC | Soluciones industriales",
  description:
    "Soluciones químicas e industriales, productos especializados y soporte técnico para minería, construcción y el sector automotriz.",
  openGraph: {
    title: "INNOVA INDUSTRIES AMERICA SAC",
    description:
      "Ingeniería, productos especializados y soporte técnico para minería, construcción y el sector automotriz.",
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
