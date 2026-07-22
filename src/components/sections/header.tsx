"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { BrandLogo } from "@/components/brand-logo";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const { locale, toggleLocale } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const isHome = pathname === "/";
  const isDark = isMounted && resolvedTheme === "dark";

  const copy = locale === "es"
    ? {
        home: "Inicio",
        communications: "Comunicados",
        contact: "Contacto",
        contactCta: "Contactar",
        menu: "Abrir menú",
        homeAria: "Ir al inicio",
        navigation: "Navegación principal de Innova América",
        theme: isDark ? "Activar modo claro" : "Activar modo oscuro",
        themeSetting: isDark ? "Modo claro" : "Modo oscuro",
        language: "Cambiar a inglés",
        languageSetting: "Idioma"
      }
    : {
        home: "Home",
        communications: "Newsroom",
        contact: "Contact",
        contactCta: "Contact us",
        menu: "Open menu",
        homeAria: "Go to homepage",
        navigation: "Innova America main navigation",
        theme: isDark ? "Switch to light mode" : "Switch to dark mode",
        themeSetting: isDark ? "Light mode" : "Dark mode",
        language: "Switch to Spanish",
        languageSetting: "Language"
      };

  const localizedNavItems = navItems.map((item) => ({
    ...item,
    label:
      item.href === "/"
        ? copy.home
        : item.href === "/comunicados"
          ? copy.communications
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

  function handleMobileNavigation() {
    setIsMenuOpen(false);
  }

  const controls = (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={toggleLocale}
        className="h-10 w-10 rounded-full border-border/70 bg-background/80 text-xs font-semibold shadow-none hover:bg-muted"
        aria-label={copy.language}
        title={copy.language}
      >
        {locale.toUpperCase()}
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="h-10 w-10 rounded-full border-border/70 bg-background/80 shadow-none hover:bg-muted"
        aria-label={copy.theme}
        title={copy.theme}
      >
        {isMounted && isDark ? <Sun /> : <Moon />}
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
          "mx-auto grid h-[68px] max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-[1.65rem] border px-3 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 sm:h-[72px] sm:gap-4 sm:px-5 lg:grid-cols-[1fr_auto_1fr] lg:px-6",
          isHome && !isScrolled
            ? "border-transparent bg-transparent shadow-none"
            : "border-border/60 bg-background/90 shadow-[0_16px_44px_rgba(29,29,27,0.10)] backdrop-blur-xl dark:shadow-[0_16px_44px_rgba(0,0,0,0.28)]"
        )}
      >
        <Link
          href="/"
          className="flex min-w-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-4"
          aria-label={copy.homeAria}
        >
          <BrandLogo className="h-8 w-[112px] min-[375px]:h-9 min-[375px]:w-[136px] sm:h-[46px] sm:w-[184px]" />
        </Link>

        <NavigationMenu className="hidden justify-self-center lg:flex">
          <NavigationMenuList className="grid w-[450px] grid-cols-3 gap-1 rounded-full border border-border/60 bg-muted/65 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
            {localizedNavItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <NavigationMenuItem key={item.href} className="min-w-0">
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex w-full items-center justify-center whitespace-nowrap rounded-full px-2 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25",
                        isActive
                          ? "bg-background text-foreground shadow-[0_5px_16px_rgba(29,29,27,0.09)]"
                          : "text-muted-foreground hover:bg-background/70 hover:text-foreground"
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
          <Button
            asChild
            className="ml-1 rounded-full bg-foreground px-5 text-background shadow-[0_8px_20px_rgba(29,29,27,0.16)] hover:bg-primary hover:text-primary-foreground"
          >
            <Link href="/contacto">{copy.contactCta}</Link>
          </Button>
        </div>

        <div className="flex items-center justify-end gap-1 min-[375px]:gap-2 lg:hidden">
          <Button
            asChild
            className="h-9 rounded-full bg-foreground px-3 text-xs text-background shadow-[0_8px_20px_rgba(29,29,27,0.14)] hover:bg-primary hover:text-primary-foreground min-[375px]:h-10 min-[375px]:px-4 min-[375px]:text-sm sm:px-5"
          >
            <Link href="/contacto">{copy.contactCta}</Link>
          </Button>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-foreground shadow-none hover:bg-muted min-[375px]:h-10 min-[375px]:w-10"
                aria-label={copy.menu}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-none overflow-y-auto border-0 bg-background p-0 [&>button]:right-6 [&>button]:top-7 [&>button]:border-0 [&>button]:bg-transparent [&>button]:text-foreground [&>button]:shadow-none [&>button]:hover:bg-transparent [&>button]:hover:text-foreground [&>button]:focus:ring-0 [&>button]:focus-visible:ring-0 [&>button_svg]:size-6 sm:w-[min(92vw,420px)] sm:max-w-[420px] sm:border-l sm:border-border"
            >
              <SheetHeader className="sr-only">
                <SheetTitle className="sr-only">INNOVA AMERICA</SheetTitle>
                <SheetDescription className="sr-only">{copy.navigation}</SheetDescription>
              </SheetHeader>

              <nav className="flex min-h-dvh flex-col px-7 pb-10 pt-28 sm:px-8">
                <div className="grid gap-1">
                  {localizedNavItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleMobileNavigation}
                        className={cn(
                          "rounded-lg py-3 text-2xl font-semibold tracking-[-0.025em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                <Separator className="my-8" />

                <div className="divide-y divide-border">
                  <div className="flex min-h-20 items-center justify-between gap-5 py-5">
                    <p className="text-lg font-semibold text-muted-foreground">{copy.themeSetting}</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setTheme(isDark ? "light" : "dark")}
                      className="h-10 w-10 shrink-0 rounded-full border-border bg-transparent text-muted-foreground shadow-none hover:bg-muted hover:text-foreground"
                      aria-label={copy.theme}
                      title={copy.theme}
                    >
                      {isMounted && isDark ? <Sun /> : <Moon />}
                    </Button>
                  </div>

                  <div className="flex min-h-20 items-center justify-between gap-5 py-5">
                    <p className="text-lg font-semibold text-muted-foreground">{copy.languageSetting}</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={toggleLocale}
                      className="h-10 w-10 shrink-0 rounded-full border-border bg-transparent text-xs font-medium text-muted-foreground shadow-none hover:bg-muted hover:text-foreground"
                      aria-label={copy.language}
                      title={copy.language}
                    >
                      {locale.toUpperCase()}
                    </Button>
                  </div>
                </div>

              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
