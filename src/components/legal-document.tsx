import Link from "next/link";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";

type LegalSection = {
  title: string;
  content: ReactNode;
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  introduction: string;
  updatedAt: string;
  sections: LegalSection[];
};

export function LegalDocument({
  eyebrow,
  title,
  introduction,
  updatedAt,
  sections
}: LegalDocumentProps) {
  return (
    <main className="min-h-screen bg-background pb-20 pt-12 sm:pb-24 sm:pt-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-normal tracking-[-0.04em] text-innova-black sm:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
          {introduction}
        </p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Última actualización: {updatedAt}
        </p>

        <Card className="carbon-card mt-10 divide-y divide-border/60 rounded-2xl px-6 sm:px-10">
          {sections.map((section) => (
            <section key={section.title} className="py-7 first:pt-8 last:pb-8 sm:py-9">
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-innova-black">
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-[0.9375rem] leading-7 text-muted-foreground sm:text-base">
                {section.content}
              </div>
            </section>
          ))}
        </Card>

        <p className="mt-8 text-sm leading-6 text-muted-foreground">
          ¿Necesitas comunicarte con nosotros?{" "}
          <Link
            href="/contacto"
            className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
          >
            Ir a contacto
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
