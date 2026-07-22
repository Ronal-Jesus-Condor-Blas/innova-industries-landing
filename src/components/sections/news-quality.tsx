"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { communicationCategories, communications, type CommunicationCategory } from "@/content/communications";
import { cn } from "@/lib/utils";

const categoryImages: Record<CommunicationCategory, string> = {
  "Política de calidad": "/assets/hero/operacion-industrial.avif",
  "Comunicados oficiales": "/assets/hero/operacion-industrial.avif",
  Certificaciones: "/assets/hero/tuberias-polimeros.jpg",
  "Seguridad, salud y medio ambiente": "/assets/hero/mineria-industrial.jpg",
  "Noticias institucionales": "/assets/hero/operacion-industrial.avif"
};

const storyImages = [
  "/assets/hero/tuberias-polimeros.jpg",
  "/assets/hero/operacion-industrial.avif",
  "/assets/hero/mineria-industrial.jpg",
  "/assets/hero/tuberias-polimeros.jpg"
] as const;

const categoryEnglish: Record<CommunicationCategory, string> = {
  "Política de calidad": "Quality policy",
  "Comunicados oficiales": "Official announcements",
  Certificaciones: "Certifications",
  "Seguridad, salud y medio ambiente": "Safety, health and environment",
  "Noticias institucionales": "Company news"
};

export function NewsQuality() {
  const { locale } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAll, setShowAll] = useState(false);
  const copy = locale === "es"
    ? { all: "Todas", featured: "Comunicado destacado", view: "Ver comunicado", empty: "No hay comunicados disponibles en esta categoría por el momento", less: "Ver menos", more: "Ver más comunicados" }
    : { all: "All", featured: "Featured announcement", view: "View announcement", empty: "There are no announcements available in this category", less: "Show less", more: "View more announcements" };

  const filteredPosts = useMemo(() => {
    const posts = selectedCategory === "all" ? [...communications] : communications.filter((post) => post.category === selectedCategory);
    return posts.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [selectedCategory]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);
  const visiblePosts = showAll ? remainingPosts : remainingPosts.slice(0, 6);
  const categoryLabel = (category: CommunicationCategory) => locale === "es" ? category : categoryEnglish[category];
  const formatDate = (date: string) => new Intl.DateTimeFormat(locale === "es" ? "es-PE" : "en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));

  function selectCategory(category: string) {
    setSelectedCategory(category);
    setShowAll(false);
  }

  return (
    <section className="bg-background pb-24 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {featuredPost ? (
          <Card className="animate-fade-up grid overflow-hidden rounded-[1.75rem] border-border/60 bg-card shadow-[0_22px_60px_rgba(0,0,0,0.12)] md:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-52 overflow-hidden md:min-h-[430px]">
              <Image src={categoryImages[featuredPost.category]} alt="" fill priority sizes="(min-width: 768px) 52vw, 100vw" className="object-cover grayscale-[0.2] transition-transform duration-700 hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            <div className="flex flex-col justify-center p-5 sm:p-10 lg:p-14">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="outline" className="rounded-full border-primary/20 bg-primary/5 px-3 py-1 text-primary shadow-none">{categoryLabel(featuredPost.category)}</Badge>
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"><CalendarDays className="h-4 w-4" />{formatDate(featuredPost.date)}</span>
              </div>
              <CardTitle className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.025em] text-innova-black sm:mt-6 sm:text-4xl">{locale === "es" ? featuredPost.title : featuredPost.titleEn}</CardTitle>
              <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground md:mt-5 md:line-clamp-none md:text-base md:leading-7">{locale === "es" ? featuredPost.summary : featuredPost.summaryEn}</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-innova-black md:mt-8">{copy.featured}<ArrowRight className="h-4 w-4 text-primary" /></div>
            </div>
          </Card>
        ) : null}

        <div className="mt-14 border-y border-border/60 py-4 sm:mt-16">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {["all", ...communicationCategories].map((category) => {
              const isActive = category === selectedCategory;
              const label = category === "all" ? copy.all : categoryLabel(category as CommunicationCategory);
              return <Button key={category} type="button" variant={isActive ? "default" : "ghost"} onClick={() => selectCategory(category)} className={cn("shrink-0 rounded-full px-4", isActive ? "bg-foreground text-background hover:bg-foreground/90" : "text-muted-foreground hover:bg-muted hover:text-foreground")} aria-pressed={isActive}>{label}</Button>;
            })}
          </div>
        </div>

        {visiblePosts.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post, index) => (
              <Card key={post.id} id={post.id} className={cn("group flex h-full flex-col overflow-hidden rounded-2xl border-border/60 bg-card shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_18px_42px_rgba(0,0,0,0.14)]", !showAll && index >= 2 && "hidden md:flex", index === 1 && "stagger-1", index >= 2 && "stagger-2")}>
                <div className="relative aspect-[16/9] overflow-hidden bg-muted"><Image src={storyImages[index % storyImages.length]} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover grayscale-[0.25] transition-transform duration-500 group-hover:scale-[1.035]" /></div>
                <CardHeader className="space-y-0 px-5 pb-3 pt-5 sm:px-6 sm:pt-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2"><span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{categoryLabel(post.category)}</span><span className="text-xs text-muted-foreground">{formatDate(post.date)}</span></div>
                  <CardTitle className="mt-4 text-xl font-semibold leading-snug tracking-[-0.015em] text-innova-black">{locale === "es" ? post.title : post.titleEn}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 px-5 pb-4 pt-0 sm:px-6"><p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{locale === "es" ? post.summary : post.summaryEn}</p></CardContent>
                <CardFooter className="px-5 pb-5 pt-0 sm:px-6 sm:pb-6"><span className="inline-flex items-center gap-2 text-sm font-semibold text-innova-black transition-colors group-hover:text-primary">{copy.view}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></CardFooter>
              </Card>
            ))}
          </div>
        ) : <Card className="mt-10 rounded-2xl border-border/60 shadow-none"><CardContent className="py-14 text-center text-sm text-muted-foreground">{copy.empty}</CardContent></Card>}

        {remainingPosts.length > 2 ? <div className="mt-9 flex justify-center md:hidden"><Button type="button" variant="outline" size="lg" onClick={() => setShowAll((current) => !current)} className="h-11 rounded-full border-border bg-background px-6 text-foreground shadow-none hover:bg-muted">{showAll ? copy.less : `${copy.more} (${remainingPosts.length - 2})`}</Button></div> : null}
        {remainingPosts.length > 6 ? <div className="mt-12 hidden justify-center md:flex"><Button type="button" variant="outline" size="lg" onClick={() => setShowAll((current) => !current)} className="h-12 rounded-full border-border bg-background px-7 text-foreground shadow-none hover:bg-muted">{showAll ? copy.less : `${copy.more} (${remainingPosts.length - 6})`}</Button></div> : null}
      </div>
    </section>
  );
}
