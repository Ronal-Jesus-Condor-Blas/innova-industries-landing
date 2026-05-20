"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

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
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { brand, navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#inicio");

  useEffect(() => {
    function syncActiveHref() {
      setActiveHref(window.location.hash || "#inicio");
    }

    syncActiveHref();
    window.addEventListener("hashchange", syncActiveHref);

    return () => window.removeEventListener("hashchange", syncActiveHref);
  }, []);

  function handleMobileNavigation(href: string) {
    setActiveHref(href);
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:h-24 sm:px-6 lg:px-8">
        <Link href="#inicio" className="flex items-center gap-3" aria-label="Ir al inicio">
          <Image
            src="/assets/logo-innova-transparent.png"
            alt="Logo Innova America"
            width={1187}
            height={438}
            priority
            className="h-12 w-auto object-contain sm:h-14 lg:h-16"
          />
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-2">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className="rounded-md px-4 py-2 text-sm font-medium text-innova-black transition hover:bg-accent hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild>
            <Link href="#contacto">Contactar</Link>
          </Button>
        </div>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden" aria-label="Abrir menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(86vw,360px)]">
            <SheetHeader>
              <SheetTitle className="text-left text-base">{brand.shortName}</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 grid gap-2">
              {navItems.map((item) => {
                const isActive = activeHref === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => handleMobileNavigation(item.href)}
                    className={cn(
                      "rounded-md border px-4 py-3 text-sm font-medium transition active:scale-[0.99]",
                      isActive
                        ? "border-primary bg-primary text-white shadow-sm"
                        : "border-transparent text-innova-black hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Button asChild className="mt-4">
                <Link href="#contacto" onClick={() => handleMobileNavigation("#contacto")}>
                  Contactar
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
