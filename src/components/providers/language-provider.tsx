"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "es" | "en";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("innova-locale");
    if (savedLocale === "es" || savedLocale === "en") {
      queueMicrotask(() => setLocaleState(savedLocale));
      document.documentElement.lang = savedLocale;
    }
  }, []);

  function setLocale(localeValue: Locale) {
    setLocaleState(localeValue);
    window.localStorage.setItem("innova-locale", localeValue);
    document.documentElement.lang = localeValue;
  }

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale(locale === "es" ? "en" : "es")
    }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
