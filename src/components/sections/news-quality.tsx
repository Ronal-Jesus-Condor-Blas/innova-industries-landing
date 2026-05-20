import { communications } from "@/content/communications";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function NewsQuality() {
  return (
    <section id="comunicados-calidad" className="bg-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Comunicados y calidad</p>
            <h2 className="mt-4 text-3xl font-semibold text-innova-black sm:text-4xl">
              Un espacio institucional para informacion corporativa y tecnica.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            La data inicial vive en TypeScript para facilitar su migracion futura
            a un CMS, manteniendo orden y control editorial.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {communications.map((item) => (
            <Card key={item.title} className="rounded-lg shadow-sm">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="rounded-md">{item.type}</Badge>
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{item.date}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{item.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
