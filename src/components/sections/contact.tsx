"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Mail, MapPinned, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { whatsappHref } from "@/lib/site";

const requiredFields = ["name", "company", "email", "subject", "message"] as const;

type SubmitState = {
  type: "idle" | "success" | "error";
  message: string;
};

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({
    type: "idle",
    message: ""
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, String(value).trim()])
    );

    const hasMissingFields = requiredFields.some((field) => !payload[field]);

    if (hasMissingFields) {
      setSubmitState({
        type: "error",
        message: "Complete los campos obligatorios antes de enviar la consulta."
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitState({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "No se pudo enviar la consulta.");
      }

      form.reset();
      setSubmitState({
        type: "success",
        message: "Correo enviado exitosamente. Nuestro equipo se pondrá en contacto con usted."
      });
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "No se pudo enviar la consulta. Intente nuevamente o escríbanos directamente por WhatsApp.";

      setSubmitState({
        type: "error",
        message
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contacto" className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="animate-fade-up">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Contacto</p>
          <h2 className="mt-4 text-3xl font-semibold text-innova-black sm:text-4xl">
            Conversemos sobre los requerimientos de su operación.
          </h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            Comparta sus datos y nuestro equipo revisará su consulta técnica o
            institucional para brindarle una respuesta oportuna.
          </p>

          <div className="mt-8 grid gap-3">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=a.rios@innovaindustriesperu.com&su=Consulta%20desde%20la%20landing%20page%20de%20INNOVA&body=Hola%20equipo%20de%20INNOVA%2C%0A%0AMe%20comunico%20desde%20la%20landing%20page%20para%20realizar%20una%20consulta.%0A%0ANombre%3A%0AEmpresa%3A%0ATel%C3%A9fono%3A%0AMensaje%3A"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg border border-gray-200/80 bg-white px-4 py-3 text-sm font-medium text-innova-black shadow-sm transition hover:border-primary/25 hover:bg-primary/5 hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
              title="Enviar correo a INNOVA"
              aria-label="Enviar correo a INNOVA"
            >
              <Mail className="h-5 w-5 text-primary" />
              <span>
                Correo:{" "}
                <span className="underline underline-offset-2 decoration-primary/60 group-hover:decoration-2">
                  a.rios@innovaindustriesperu.com
                </span>
              </span>
            </a>
            <Link
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border border-gray-200/80 bg-white px-4 py-3 text-sm font-medium text-innova-black shadow-sm transition hover:border-[#25D366]/35 hover:bg-[#25D366]/10"
            >
              <FaWhatsapp className="h-5 w-5 shrink-0 text-[#25D366]" aria-hidden="true" />
              WhatsApp comercial
            </Link>
            <div className="flex items-start gap-3 rounded-lg border border-gray-200/80 bg-white px-4 py-3 text-sm font-medium text-innova-black shadow-sm">
              <MapPinned className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <address className="not-italic">
                Mza. B1 Lote. 3b Z.I. Lotizacion Industrial Hua (Alt. Petramas)<br />
                San Antonio, Huarochiri<br />
                Lima, Perú
              </address>
            </div>
          </div>
        </div>

        <Card className="animate-fade-up stagger-1 rounded-lg border-gray-200/80 shadow-[0_18px_45px_rgba(29,29,27,0.08)]">
          <CardHeader className="border-b border-gray-100 bg-muted/25">
            <CardTitle>Solicitar información</CardTitle>
          </CardHeader>
          <CardContent className="p-5 sm:p-6">
            <form className="grid gap-5" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" name="name" autoComplete="name" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input id="company" name="company" autoComplete="organization" required />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo</Label>
                  <Input id="email" name="email" type="email" autoComplete="email" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" name="phone" type="tel" autoComplete="tel" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input id="subject" name="subject" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" name="message" className="min-h-32" required />
              </div>

              {submitState.message ? (
                <p
                  className={
                    submitState.type === "success"
                      ? "animate-fade-in rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
                      : "animate-fade-in rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                  }
                >
                  {submitState.message}
                </p>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="submit" className="h-11 rounded-full px-5" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar consulta"}
                  <Send />
                </Button>
                <Button
                  type="button"
                  asChild
                  variant="outline"
                  className="h-11 rounded-full border-[#25D366]/40 bg-white text-innova-black hover:bg-[#25D366]/10 hover:text-innova-black"
                >
                  <Link
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <FaWhatsapp className="h-5 w-5 shrink-0 text-[#25D366]" aria-hidden="true" />
                    Escribir por WhatsApp
                  </Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
