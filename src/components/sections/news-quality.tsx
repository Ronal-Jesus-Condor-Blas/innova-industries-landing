"use client";

import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";

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
  const [selectedCategory, setSelectedCategory] = useState<CommunicationCategory>(
    communicationCategories[0]
  );

  const filteredPosts = useMemo(
    () => communications.filter((post) => post.category === selectedCategory),
    [selectedCategory]
  );

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

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.45fr]">
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Categorías institucionales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 lg:mx-0 lg:grid lg:overflow-visible lg:px-0 lg:pb-0">
                {communicationCategories.map((category) => {
                  const isActive = category === selectedCategory;

                  return (
                    <Button
                      key={category}
                      type="button"
                      variant={isActive ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "h-auto shrink-0 justify-start whitespace-nowrap rounded-md px-4 py-3 text-left text-sm",
                        !isActive && "border-gray-200 bg-white text-innova-black hover:border-primary/40 hover:bg-primary/5"
                      )}
                    >
                      {category}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Card key={post.id} className="rounded-lg shadow-sm">
                  <CardHeader>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <post.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <Badge className="rounded-md">{post.category}</Badge>
                          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {post.date}
                          </span>
                        </div>
                        <CardTitle className="mt-3 text-xl text-innova-black">
                          {post.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-7 text-muted-foreground">{post.summary}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="rounded-lg shadow-sm">
                <CardContent className="py-10 text-sm text-muted-foreground">
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
