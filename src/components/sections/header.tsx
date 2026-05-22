"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, FileText, Home, Mail, Menu, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";

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
import { Separator } from "@/components/ui/separator";
import { brand, navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

const mobileIcons = {
  "/": Home,
  "/comunicados": FileText,
  "/calidad": ShieldCheck,
  "/contacto": Mail
} as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  function handleMobileNavigation() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100/90 bg-white/95 backdrop-blur-xl transition-colors supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto grid h-[72px] max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 sm:h-20 sm:px-6 lg:h-[88px] lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Ir al inicio">
          <Image
            src="/assets/logo-innova-transparent.png"
            alt="Logo Innova America"
            width={1187}
            height={438}
            priority
            className="h-11 w-auto max-w-[190px] object-contain sm:h-12 sm:max-w-[220px] lg:h-14"
          />
        </Link>

        <NavigationMenu className="hidden justify-self-center lg:flex">
          <NavigationMenuList className="gap-1 rounded-full border border-gray-100 bg-white/80 p-1 shadow-sm">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary text-white shadow-sm"
                          : "text-innova-black hover:bg-primary/10 hover:text-primary"
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

        <div className="hidden items-center justify-end gap-3 lg:flex">
          <Button asChild className="rounded-full px-5">
            <Link href="/contacto">
              Contactar
              <ArrowRight />
            </Link>
          </Button>
        </div>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-gray-200 bg-white shadow-sm hover:border-primary/30 hover:bg-primary/5 lg:hidden"
              aria-label="Abrir menú"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(90vw,360px)] overflow-y-auto border-l border-gray-100 bg-white p-0">
            <SheetHeader className="border-b border-gray-100 px-5 pb-5 pt-6 text-left">
              <div className="flex items-center gap-3 pr-10">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-white shadow-sm">
                  <Image
                    src="/assets/logo-innova-transparent.png"
                    alt="Logo Innova America"
                    width={1187}
                    height={438}
                    className="h-7 w-auto object-contain"
                  />
                </span>
                <div className="min-w-0">
                  <SheetTitle className="text-sm font-semibold uppercase tracking-[0.14em] text-innova-black">
                    INNOVA AMERICA
                  </SheetTitle>
                </div>
              </div>
            </SheetHeader>
            <nav className="grid gap-2 px-5 py-5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = mobileIcons[item.href as keyof typeof mobileIcons];

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleMobileNavigation}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg border px-3.5 py-3 text-sm font-medium transition-all duration-200 active:scale-[0.99]",
                      isActive
                        ? "border-primary/20 bg-primary/10 text-primary"
                        : "border-transparent bg-white text-innova-black hover:border-primary/20 hover:bg-primary/5 hover:text-primary"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-colors",
                        isActive
                          ? "border-primary/20 bg-white text-primary"
                          : "border-gray-100 bg-muted/50 text-innova-gray group-hover:border-primary/20 group-hover:text-primary"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    {item.label}
                  </Link>
                );
              })}
              <Separator className="my-3" />
              <Button asChild className="h-11 rounded-full">
                <Link href="/contacto" onClick={handleMobileNavigation}>
                  Contactar
                  <ArrowRight />
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
