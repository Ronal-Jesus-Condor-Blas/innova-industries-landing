"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const CONSENT_KEY = "innova-cookie-consent-v1";

export function CookieBanner() {
  const { locale } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setIsVisible(window.localStorage.getItem(CONSENT_KEY) === null);
    });
  }, []);

  if (!isVisible) return null;

  const copy = locale === "es"
    ? {
        title: "Tu privacidad importa",
        description: "Usamos almacenamiento local necesario y medición anónima sin cookies publicitarias para mejorar el sitio.",
        policy: "Política de cookies",
        accept: "Entendido"
      }
    : {
        title: "Your privacy matters",
        description: "We use necessary local storage and anonymous measurement without advertising cookies to improve the website.",
        policy: "Cookie policy",
        accept: "Got it"
      };

  function acceptCookies() {
    window.localStorage.setItem(CONSENT_KEY, "necessary");
    setIsVisible(false);
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-[70] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[29rem]">
      <Card className="surface-featured border-border/80 bg-background/95 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.08] text-primary">
            <Cookie className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-innova-black sm:text-base">{copy.title}</h2>
            <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
              {copy.description}{" "}
              <Link href="/politica-de-cookies" className="font-medium text-primary underline-offset-4 hover:underline">
                {copy.policy}
              </Link>
            </p>
            <Button
              type="button"
              size="sm"
              onClick={acceptCookies}
              className="mt-3 rounded-full bg-[var(--consent-action)] px-5 font-semibold text-white hover:bg-[var(--consent-action-hover)]"
            >
              {copy.accept}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
