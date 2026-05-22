import { Award, ClipboardCheck, FileText, Leaf, RefreshCcw } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const blocks = [
  {
    title: "Política de calidad",
    description:
      "Lineamientos internos para sostener procesos controlados, trazabilidad documental y atención consistente a los compromisos asumidos.",
    icon: ClipboardCheck
  },
  {
    title: "Mejora continua",
    description:
      "Revisión permanente de prácticas operativas, indicadores y aprendizajes para fortalecer la gestión institucional.",
    icon: RefreshCcw
  },
  {
    title: "Seguridad, salud y medio ambiente",
    description:
      "Cultura preventiva orientada al cuidado de las personas, la operación responsable y el cumplimiento de buenas prácticas ambientales.",
    icon: Leaf
  },
  {
    title: "Gestión documental",
    description:
      "Organización de políticas, registros, comunicados y evidencias que respaldan el control interno y la comunicación corporativa.",
    icon: FileText
  },
  {
    title: "Certificaciones y cumplimiento",
    description:
      "Seguimiento de requisitos normativos, certificaciones aplicables y estándares que contribuyen a una gestión confiable.",
    icon: Award
  }
] as const;

export function QualityPolicies() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blocks.map((block, index) => (
            <Card
              key={block.title}
              className={cn(
                "interactive-card animate-fade-up rounded-lg border-gray-200/80 bg-white shadow-sm",
                index === 1 && "stagger-1",
                index >= 2 && "stagger-2"
              )}
            >
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-primary/10 bg-primary/10 text-primary transition-colors">
                  <block.icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-innova-black">{block.title}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{block.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
