"use client";

import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { communicationCategories, communications } from "@/content/communications";
import { cn } from "@/lib/utils";

const categories = ["Todas", ...communicationCategories] as const;

export function NewsQuality() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");

  const filteredPosts = useMemo(() => {
    const posts =
      selectedCategory === "Todas"
        ? [...communications]
        : communications.filter((post) => post.category === selectedCategory);

    return posts.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [selectedCategory]);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
          <Card className="animate-fade-up rounded-lg border-gray-200/80 shadow-sm lg:sticky lg:top-28">
            <CardHeader className="border-b border-gray-100 pb-4">
              <CardTitle className="text-lg text-innova-black">Categorías institucionales</CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="flex flex-wrap gap-2 lg:grid">
                {categories.map((category) => {
                  const isActive = category === selectedCategory;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "inline-flex items-center rounded-md border px-3 py-2 text-left text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 active:scale-[0.99]",
                        isActive
                          ? "border-primary/25 bg-primary/10 text-primary shadow-sm"
                          : "border-gray-200 bg-white text-innova-black hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                      )}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <Card
                  key={post.id}
                  id={post.id}
                  className={cn(
                    "interactive-card animate-fade-up rounded-lg border-gray-200/80 shadow-sm",
                    index === 1 && "stagger-1",
                    index >= 2 && "stagger-2"
                  )}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/10 bg-primary/5 text-primary transition group-hover:bg-primary/10">
                        <post.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <Badge className="rounded bg-primary px-2 py-0.5 text-xs shadow-none hover:bg-primary/90">
                            {post.category}
                          </Badge>
                          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                            <CalendarDays className="h-4 w-4" />
                            {post.date}
                          </span>
                        </div>
                        <CardTitle className="mt-3 text-lg font-semibold leading-snug text-innova-black">
                          {post.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2 sm:pl-[4.5rem]">
                    <p className="leading-relaxed text-muted-foreground">{post.summary}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="rounded-lg border-gray-200 shadow-sm">
                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                  No hay comunicados disponibles en esta categoría por el momento.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
