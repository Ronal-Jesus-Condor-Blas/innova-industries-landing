"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { BrandLogo } from "@/components/brand-logo";
import {
  type Locale,
  useLanguage
} from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

type LanguageSelectProps = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  ariaLabel: string;
  compact?: boolean;
  darkSurface?: boolean;
};

function LanguageSelect({
  locale,
  setLocale,
  ariaLabel,
  compact = false,
  darkSurface = false
}: LanguageSelectProps) {
  return (
    <Select value={locale} onValueChange={(value) => setLocale(value as Locale)}>
      <SelectTrigger
        aria-label={ariaLabel}
        title={ariaLabel}
        className={cn(
          "rounded-full border-border/70 bg-background/80 font-semibold shadow-none hover:bg-muted focus:ring-2 focus:ring-primary/25",
          darkSurface &&
            "border-white/15 bg-white/5 text-white hover:bg-white/10 focus:ring-white/25",
          compact
            ? "h-10 w-[58px] gap-1 px-3 text-xs [&>svg]:h-3.5 [&>svg]:w-3.5"
            : "h-10 w-[64px] gap-1.5 px-3 text-xs xl:h-9 xl:w-14 xl:gap-1 xl:px-2.5 xl:text-[0.7rem] [&>svg]:h-3.5 [&>svg]:w-3.5 xl:[&>svg]:h-3 xl:[&>svg]:w-3"
        )}
      >
        <SelectValue>{locale.toUpperCase()}</SelectValue>
      </SelectTrigger>
      <SelectContent
        align="end"
        className={cn(
          "min-w-[9.5rem] rounded-xl border-border/70 bg-popover p-1 shadow-xl",
          darkSurface && "border-white/10 bg-[#111111] text-white"
        )}
      >
        <SelectItem
          value="es"
          className={cn(
            "rounded-lg py-2.5 font-medium",
            darkSurface && "focus:bg-white/10 focus:text-white"
          )}
        >
          Español
        </SelectItem>
        <SelectItem
          value="en"
          className={cn(
            "rounded-lg py-2.5 font-medium",
            darkSurface && "focus:bg-white/10 focus:text-white"
          )}
        >
          English
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const isHome = pathname === "/";
  const isDark = isMounted && resolvedTheme === "dark";

  const copy = locale === "es"
    ? {
        home: "Inicio",
        communications: "Comunicados",
        careers: "Talento",
        contact: "Contacto",
        menu: "Abrir menú",
        homeAria: "Ir al inicio",
        navigation: "Navegación principal de Innova América",
        theme: isDark ? "Activar modo claro" : "Activar modo oscuro",
        themeSetting: isDark ? "Modo claro" : "Modo oscuro",
        languageSetting: "Idioma"
      }
    : {
        home: "Home",
        communications: "Newsroom",
        careers: "Careers",
        contact: "Contact",
        menu: "Open menu",
        homeAria: "Go to homepage",
        navigation: "Innova America main navigation",
        theme: isDark ? "Switch to light mode" : "Switch to dark mode",
        themeSetting: isDark ? "Light mode" : "Dark mode",
        languageSetting: "Language"
      };

  const localizedNavItems = navItems.map((item) => ({
    ...item,
    label:
      item.href === "/"
        ? copy.home
        : item.href === "/comunicados"
          ? copy.communications
          : item.href === "/trabaja-con-nosotros"
            ? copy.careers
            : copy.contact
  }));

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 32);

    queueMicrotask(() => {
      setIsMounted(true);
      updateHeader();
    });
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const closeDesktopMenu = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeDesktopMenu);
    return () => window.removeEventListener("resize", closeDesktopMenu);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  function handleMobileNavigation() {
    setIsMenuOpen(false);
  }

  function handleMenuOpenChange(open: boolean) {
    setIsMenuOpen(open);
  }

  const controls = (
    <>
      <LanguageSelect
        locale={locale}
        setLocale={setLocale}
        ariaLabel={copy.languageSetting}
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={cn(
          "h-10 w-10 rounded-full shadow-none transition-colors xl:h-9 xl:w-9 [&_svg]:size-4 [&_svg]:stroke-[2.35] xl:[&_svg]:size-3.5",
          isDark
            ? "border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            : "border-black/[0.06] bg-[#f2f3f3] text-[#3f4447] hover:bg-[#e9ebeb] hover:text-[#24282a]"
        )}
        aria-label={copy.theme}
        title={copy.theme}
      >
        {isMounted && isDark ? <Sun /> : <Moon className="fill-current" />}
      </Button>
    </>
  );

  return (
    <header
      className={cn(
        "z-50 bg-transparent px-3 py-3 sm:px-5",
        isHome ? "fixed inset-x-0 top-0" : "sticky top-0"
      )}
    >
      <div
        className={cn(
          "mx-auto grid h-[68px] max-w-[68rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-[1.65rem] border px-3 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 sm:h-[72px] sm:gap-4 sm:px-5 lg:grid-cols-[1fr_auto_1fr] lg:px-6 xl:h-14 xl:max-w-[64rem] xl:px-5",
          isHome && !isScrolled
            ? "border-transparent bg-transparent shadow-none"
            : "border-border/60 bg-background/90 shadow-[0_16px_44px_rgba(29,29,27,0.10)] backdrop-blur-xl dark:shadow-[0_16px_44px_rgba(0,0,0,0.28)] xl:border-border/45 xl:bg-background/75 xl:shadow-[0_12px_34px_rgba(29,29,27,0.07)] xl:backdrop-blur-2xl dark:xl:border-white/10 dark:xl:bg-black/75 dark:xl:shadow-[0_12px_34px_rgba(0,0,0,0.20)]"
        )}
      >
        <Link
          href="/"
          className="flex min-w-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-4"
          aria-label={copy.homeAria}
        >
          <BrandLogo className="h-8 w-[112px] min-[375px]:h-9 min-[375px]:w-[126px] sm:h-[46px] sm:w-[184px] xl:h-9 xl:w-36" />
        </Link>

        <NavigationMenu className="hidden justify-self-center lg:flex">
          <NavigationMenuList className="flex gap-1 rounded-full border border-border/60 bg-muted/65 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] xl:p-0.5">
            {localizedNavItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-center whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-[color,background-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 xl:px-[1.125rem] xl:py-1.5 xl:text-xs",
                        isActive
                          ? "bg-background text-foreground shadow-[0_5px_16px_rgba(29,29,27,0.09)]"
                          : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center justify-end gap-2 lg:flex">
          {controls}
        </div>

        <div className="flex items-center justify-end gap-1.5 min-[390px]:gap-2 lg:hidden">
          <LanguageSelect
            locale={locale}
            setLocale={setLocale}
            ariaLabel={copy.languageSetting}
            compact
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => handleMenuOpenChange(true)}
            className="h-11 w-11 rounded-full text-foreground shadow-none hover:bg-muted [&_svg]:!size-7"
            aria-label={copy.menu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <Menu strokeWidth={2.5} />
          </Button>

          {isMounted &&
            createPortal(
              <div
                id="mobile-navigation"
                role="dialog"
                aria-modal="true"
                className={cn(
                  "fixed inset-0 z-[1000] overflow-y-auto overscroll-contain bg-black/80 text-white backdrop-blur-xl transition-all duration-300 lg:hidden",
                  isMenuOpen
                    ? "visible pointer-events-auto opacity-100"
                    : "invisible pointer-events-none opacity-0"
                )}
                aria-hidden={!isMenuOpen}
              >
                <button
                  type="button"
                  onClick={() => handleMenuOpenChange(false)}
                  className="absolute right-7 top-7 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  aria-label={locale === "es" ? "Cerrar menú" : "Close menu"}
                >
                  <X className="h-7 w-7" />
                </button>

                <div
                  className={cn(
                    "relative z-20 min-h-dvh transition-transform duration-300",
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                  )}
                >
                  <nav className="flex min-h-dvh flex-col px-8 pb-10 pt-28">
                    <div className="flex flex-col gap-6">
                      {localizedNavItems.map((item, index) => {
                        const isActive = pathname === item.href;

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={handleMobileNavigation}
                            className={cn(
                              "rounded-lg text-2xl font-semibold tracking-[-0.025em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                              isMenuOpen
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-8 opacity-0",
                              isActive
                                ? "text-white"
                                : "text-white/60 hover:text-white"
                            )}
                            style={{ transitionDelay: `${index * 75}ms` }}
                            aria-current={isActive ? "page" : undefined}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>

                    <Separator className="my-8 bg-white/10" />

                    <div className="divide-y divide-white/10">
                      <div
                        className={cn(
                          "flex min-h-20 items-center justify-between gap-5 py-5 transition-all duration-300",
                          isMenuOpen
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-8 opacity-0"
                        )}
                        style={{ transitionDelay: `${localizedNavItems.length * 75}ms` }}
                      >
                        <p className="text-lg font-semibold text-white/60">
                          {copy.themeSetting}
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => setTheme(isDark ? "light" : "dark")}
                          className="h-10 w-10 shrink-0 rounded-full border-white/15 bg-white/5 text-white/60 shadow-none hover:bg-white/10 hover:text-white"
                          aria-label={copy.theme}
                          title={copy.theme}
                        >
                          {isMounted && isDark ? (
                            <Sun />
                          ) : (
                            <Moon className="fill-current" />
                          )}
                        </Button>
                      </div>

                      <div
                        className={cn(
                          "flex min-h-20 items-center justify-between gap-5 py-5 transition-all duration-300",
                          isMenuOpen
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-8 opacity-0"
                        )}
                        style={{
                          transitionDelay: `${(localizedNavItems.length + 1) * 75}ms`,
                        }}
                      >
                        <p className="text-lg font-semibold text-white/60">
                          {copy.languageSetting}
                        </p>
                        <LanguageSelect
                          locale={locale}
                          setLocale={setLocale}
                          ariaLabel={copy.languageSetting}
                          darkSurface
                        />
                      </div>
                    </div>
                  </nav>
                </div>
              </div>,
              document.body
            )}
        </div>
      </div>
    </header>
  );
}
