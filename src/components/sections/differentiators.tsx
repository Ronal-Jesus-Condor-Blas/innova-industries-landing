import { CheckCircle2 } from "lucide-react";

const items = [
  "Fabricacion local con capacidad de respuesta cercana al cliente.",
  "Soporte tecnico para seleccion, aplicacion y seguimiento de soluciones.",
  "Control de calidad orientado a consistencia, trazabilidad y cumplimiento.",
  "Mejora continua aplicada a productos, procesos y atencion comercial.",
  "Conocimiento de requerimientos en mineria, construccion e industria."
];

export function Differentiators() {
  return (
    <section className="bg-innova-black py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Diferenciales</p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Una operacion pensada para clientes que exigen seriedad tecnica.
          </h2>
          <p className="mt-5 leading-7 text-white/70">
            El valor de Innova America esta en combinar soluciones industriales
            con soporte, comunicacion clara y compromiso con la calidad.
          </p>
        </div>
        <div className="grid gap-4">
          {items.map((item) => (
            <div key={item} className="flex gap-4 rounded-lg border border-white/15 bg-white/[0.06] p-5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="leading-7 text-white/80">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
