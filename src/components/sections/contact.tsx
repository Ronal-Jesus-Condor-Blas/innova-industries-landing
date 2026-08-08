"use client";

import { FormEvent, useState } from "react";
import { MapPin, Send } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/site";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const requiredFields = ["name", "company", "email", "subject", "message"] as const;

type SubmitState = {
  type: "idle" | "success" | "error";
  message: string;
};

export function Contact() {
  const { locale } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({
    type: "idle",
    message: ""
  });
  const copy = locale === "es"
    ? {
        eyebrow: "Contacto", title: "Hablemos de tu", accent: "próximo proyecto",
        intro: "Compártenos los objetivos y requerimientos de tu operación. Nuestro equipo técnico evaluará cada necesidad para ofrecer una respuesta precisa, viable y alineada con tu proyecto.",
        channels: "Nuestra ubicación", channelsText: "Encuentra nuestras instalaciones y envíanos tu consulta mediante el formulario.",
        location: "Ubicación", formTitle: "Cuéntanos qué necesitas",
        requiredNote: "Los campos marcados con * son obligatorios.", name: "Nombre *", company: "Empresa *",
        emailField: "Correo *", subject: "Asunto *", message: "Mensaje *",
        namePlaceholder: "Tu nombre", companyPlaceholder: "Nombre de la empresa", subjectPlaceholder: "¿En qué podemos ayudarte?",
        messagePlaceholder: "Describe brevemente tu requerimiento", submitting: "Enviando...", submit: "Enviar consulta",
        missing: "Complete los campos obligatorios antes de enviar la consulta",
        success: "Consulta enviada correctamente. Nuestro equipo se pondrá en contacto contigo",
        rateLimited: "Este correo ya envió el máximo de 2 consultas en 24 horas. Intenta nuevamente más tarde",
        error: "No se pudo enviar la consulta. Intenta nuevamente"
      }
    : {
        eyebrow: "Contact", title: "Let's discuss your", accent: "next project",
        intro: "Share your operation's objectives and requirements. Our technical team will assess each need to provide a precise, viable response aligned with your project.",
        channels: "Our location", channelsText: "Find our facilities and send us your inquiry through the form.",
        location: "Location", formTitle: "Tell us what you need",
        requiredNote: "Fields marked with * are required.", name: "Name *", company: "Company *",
        emailField: "Email *", subject: "Subject *", message: "Message *",
        namePlaceholder: "Your name", companyPlaceholder: "Company name", subjectPlaceholder: "How can we help?",
        messagePlaceholder: "Briefly describe your requirements", submitting: "Sending...", submit: "Send inquiry",
        missing: "Please complete the required fields before sending your inquiry",
        success: "Your inquiry was sent successfully. Our team will contact you shortly",
        rateLimited: "This email has reached the maximum of 2 inquiries in 24 hours. Please try again later",
        error: "We couldn't send your inquiry. Please try again"
      };

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
        message: copy.missing
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

      const result = (await response.json()) as {
        success?: boolean;
        code?: string;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(
          result.code === "EMAIL_RATE_LIMIT"
            ? copy.rateLimited
            : locale === "es"
              ? (result.error ?? copy.error)
              : copy.error
        );
      }

      form.reset();
      setSubmitState({
        type: "success",
        message: copy.success
      });
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : copy.error;

      setSubmitState({
        type: "error",
        message
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contacto" className="bg-background pb-20 pt-20 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.75fr] lg:gap-20">
          <div className="animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {copy.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-normal leading-[1.02] tracking-[-0.04em] text-innova-black sm:mt-5 sm:text-6xl lg:text-7xl">
              {copy.title}
              <span className="block font-semibold text-primary">{copy.accent}</span>
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-lg sm:leading-8 lg:justify-self-end">
            {copy.intro}
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 lg:mt-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-8">
          <div className="animate-fade-up">
            <CardHeader className="p-5 pb-4 sm:p-8 sm:pb-5">
              <CardTitle className="text-2xl tracking-[-0.02em] text-innova-black">
                {copy.channels}
              </CardTitle>
              <CardDescription className="text-sm leading-6">
                {copy.channelsText}
              </CardDescription>
            </CardHeader>
            <CardContent className="divide-y divide-border/60 px-5 pb-5 pt-0 sm:px-8 sm:pb-8">
              <a
                href={brand.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  locale === "es"
                    ? "LinkedIn: conoce nuestras novedades y perfil corporativo"
                    : "LinkedIn: discover our latest updates and company profile"
                }
                className="group flex items-start gap-4 py-4 sm:py-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.06] text-primary transition-colors group-hover:border-primary/30 group-hover:bg-primary/[0.1]">
                  <FaLinkedin className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="pt-0.5">
                  <span className="block text-base font-semibold text-innova-black">LinkedIn</span>
                  <span className="mt-1 block text-[0.9375rem] leading-6 text-muted-foreground transition-colors group-hover:text-innova-black">
                    {locale === "es"
                      ? "Conoce nuestras novedades y perfil corporativo"
                      : "Discover our latest updates and company profile"}
                  </span>
                </span>
              </a>
              <div className="flex items-start gap-4 py-4 sm:py-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.06] text-primary">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="pt-0.5">
                  <p className="text-base font-semibold text-innova-black">{copy.location}</p>
                  <address className="mt-1 max-w-[20rem] text-[0.9375rem] not-italic leading-6 text-muted-foreground">
                    Mza. B1 Lote. 3b Z.I. Lotización Industrial Hua (Alt. Petramas)<br />
                    San Antonio, Huarochirí<br />
                    Lima, Perú
                  </address>
                </div>
              </div>
            </CardContent>
          </div>

          <Card className="carbon-card animate-fade-up stagger-1 rounded-2xl">
            <CardHeader className="p-5 pb-3 sm:p-7 sm:pb-2">
              <CardTitle className="text-2xl tracking-[-0.02em] text-innova-black">
                {copy.formTitle}
              </CardTitle>
              <CardDescription className="leading-6">
                {copy.requiredNote}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-4 sm:p-7 sm:pt-4">
              <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
                <div
                  className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
                  aria-hidden="true"
                >
                  <Label htmlFor="contact-website">Website</Label>
                  <Input
                    id="contact-website"
                    name="website"
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">{copy.name}</Label>
                    <Input
                      id="name"
                      name="name"
                      autoComplete="name"
                      maxLength={120}
                      placeholder={copy.namePlaceholder}
                      className="surface-field h-11 rounded-xl md:text-[0.9375rem]"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company">{copy.company}</Label>
                    <Input
                      id="company"
                      name="company"
                      autoComplete="organization"
                      maxLength={160}
                      placeholder={copy.companyPlaceholder}
                      className="surface-field h-11 rounded-xl md:text-[0.9375rem]"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="email">{copy.emailField}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      maxLength={254}
                      placeholder="nombre@empresa.com"
                      className="surface-field h-11 rounded-xl md:text-[0.9375rem]"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">{copy.subject}</Label>
                  <Input
                    id="subject"
                    name="subject"
                    maxLength={160}
                    placeholder={copy.subjectPlaceholder}
                    className="surface-field h-11 rounded-xl md:text-[0.9375rem]"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">{copy.message}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    maxLength={4000}
                    placeholder={copy.messagePlaceholder}
                    className="surface-field min-h-28 resize-y rounded-xl md:text-[0.9375rem]"
                    required
                  />
                </div>

                {submitState.message ? (
                  <p
                    role="status"
                    aria-live="polite"
                    className={
                      submitState.type === "success"
                        ? "animate-fade-in rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
                        : "animate-fade-in rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                    }
                  >
                    {submitState.message}
                  </p>
                ) : null}

                <div className="flex pt-1">
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 rounded-full bg-foreground px-7 text-base text-background shadow-none hover:bg-primary hover:text-primary-foreground"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? copy.submitting : copy.submit}
                    <Send />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
