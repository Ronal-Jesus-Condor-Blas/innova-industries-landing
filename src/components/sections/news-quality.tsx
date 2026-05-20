"use client";

import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import Link from "next/link";

import {
  communicationCategories,
  communications,
  type CommunicationCategory
} from "@/content/communications";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function NewsQuality() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");

  const filteredPosts = useMemo(() => {
    let posts = [];
    if (selectedCategory === "Todas") {
      posts = [...communications];
    } else {
      posts = communications.filter((post) => post.category === selectedCategory);
    }
    return posts
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      .slice(0, 3);
  }, [selectedCategory]);

  const categories = ["Todas", ...communicationCategories];

  return (
    <section id="comunicados-calidad" className="bg-muted/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-white text-primary">
            Comunicados y Calidad
          </Badge>
          <h2 className="mt-4 text-3xl font-semibold text-innova-black sm:text-4xl">
            Canal institucional de comunicados, calidad y documentación
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Espacio oficial para difundir políticas, certificaciones,
            lineamientos internos, comunicados corporativos y actualizaciones
            relevantes de INNOVA INDUSTRIES AMERICA SAC.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:items-start lg:grid-cols-[320px_1fr]">
          <Card className="rounded-lg shadow-sm border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Categorías institucionales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isActive = category === selectedCategory;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
                        isActive
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-gray-200 bg-white text-innova-black hover:border-primary/40 hover:bg-primary/5"
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
              <>
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="rounded-lg shadow-sm border-gray-200">
                    <CardHeader className="pb-2">
                      <div className="flex gap-4 items-start">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/5 text-primary border border-primary/10">
                          <post.icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <Badge className="bg-primary hover:bg-primary/90 rounded text-xs px-2 py-0.5">{post.category}</Badge>
                            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                              <CalendarDays className="h-4 w-4" />
                              {post.date}
                            </span>
                          </div>
                          <CardTitle className="mt-3 text-lg font-semibold text-innova-black leading-snug">
                            {post.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2 sm:pl-[4.5rem]">
                      <p className="text-muted-foreground leading-relaxed">
                        {post.summary}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              <Card className="rounded-lg shadow-sm border-gray-200">
                <CardContent className="py-10 text-sm text-muted-foreground text-center">
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
