"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
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
import { getWhatsappHref } from "@/lib/site";

const requiredFields = ["name", "company", "email", "subject", "message"] as const;

const emailHref =
  "https://mail.google.com/mail/?view=cm&fs=1&to=a.rios@innovaindustriesperu.com&su=Consulta%20desde%20la%20landing%20page%20de%20INNOVA&body=Hola%20equipo%20de%20INNOVA%2C%0A%0AMe%20comunico%20desde%20la%20landing%20page%20para%20realizar%20una%20consulta.%0A%0ANombre%3A%0AEmpresa%3A%0ATel%C3%A9fono%3A%0AMensaje%3A";

type SubmitState = {
  type: "idle" | "success" | "error";
  message: string;
};

export function Contact() {
  const { locale } = useLanguage();
  const whatsappHref = getWhatsappHref(locale);
  const localizedEmailHref = locale === "es"
    ? emailHref
    : "https://mail.google.com/mail/?view=cm&fs=1&to=a.rios@innovaindustriesperu.com&su=Inquiry%20from%20the%20INNOVA%20website&body=Hello%20INNOVA%20team%2C%0A%0AI%20would%20like%20to%20make%20an%20inquiry.%0A%0AName%3A%0ACompany%3A%0APhone%3A%0AMessage%3A";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({
    type: "idle",
    message: ""
  });
  const copy = locale === "es"
    ? {
        eyebrow: "Contacto", title: "Hablemos de tu", accent: "próximo proyecto",
        intro: "Compártenos los objetivos y requerimientos de tu operación. Nuestro equipo técnico evaluará cada necesidad para ofrecer una respuesta precisa, viable y alineada con tu proyecto.",
        channels: "Canales directos", channelsText: "Conecta con nuestro equipo a través del canal que mejor se adapte a tu consulta.",
        email: "Correo", emailAria: "Enviar correo a INNOVA", whatsapp: "WhatsApp comercial",
        conversation: "Iniciar una conversación", location: "Ubicación", formTitle: "Cuéntanos qué necesitas",
        requiredNote: "Los campos marcados con * son obligatorios.", name: "Nombre *", company: "Empresa *",
        emailField: "Correo *", phone: "Teléfono", subject: "Asunto *", message: "Mensaje *",
        namePlaceholder: "Tu nombre", companyPlaceholder: "Nombre de la empresa", subjectPlaceholder: "¿En qué podemos ayudarte?",
        messagePlaceholder: "Describe brevemente tu requerimiento", submitting: "Enviando...", submit: "Enviar consulta",
        missing: "Complete los campos obligatorios antes de enviar la consulta",
        success: "Consulta enviada correctamente. Nuestro equipo se pondrá en contacto contigo",
        error: "No se pudo enviar la consulta. Intenta nuevamente o escríbenos por WhatsApp"
      }
    : {
        eyebrow: "Contact", title: "Let's discuss your", accent: "next project",
        intro: "Share your operation's objectives and requirements. Our technical team will assess each need to provide a precise, viable response aligned with your project.",
        channels: "Direct channels", channelsText: "Connect with our team through the channel that best suits your inquiry.",
        email: "Email", emailAria: "Email INNOVA", whatsapp: "Business WhatsApp",
        conversation: "Start a conversation", location: "Location", formTitle: "Tell us what you need",
        requiredNote: "Fields marked with * are required.", name: "Name *", company: "Company *",
        emailField: "Email *", phone: "Phone", subject: "Subject *", message: "Message *",
        namePlaceholder: "Your name", companyPlaceholder: "Company name", subjectPlaceholder: "How can we help?",
        messagePlaceholder: "Briefly describe your requirements", submitting: "Sending...", submit: "Send inquiry",
        missing: "Please complete the required fields before sending your inquiry",
        success: "Your inquiry was sent successfully. Our team will contact you shortly",
        error: "We couldn't send your inquiry. Please try again or contact us on WhatsApp"
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

      const result = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !result.success) {
        throw new Error(locale === "es" ? (result.error ?? copy.error) : copy.error);
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

        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 lg:mt-16 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-8">
          <div className="animate-fade-up">
            <CardHeader className="p-5 pb-4 sm:p-8 sm:pb-5">
              <CardTitle className="text-2xl tracking-[-0.02em] text-innova-black">
                {copy.channels}
              </CardTitle>
              <CardDescription className="text-sm leading-6">
                {copy.channelsText}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5 pt-0 sm:px-8 sm:pb-8">
              <a
                href={localizedEmailHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 py-4 outline-none transition-colors focus-visible:text-primary sm:py-5"
                title={copy.emailAria}
                aria-label={copy.emailAria}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.06] text-primary">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0 pt-0.5">
                  <span className="block text-sm font-semibold text-innova-black">{copy.email}</span>
                  <span className="mt-1 block break-all text-sm text-muted-foreground transition-colors group-hover:text-primary">
                    a.rios@innovaindustriesperu.com
                  </span>
                </span>
              </a>
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 py-4 outline-none transition-colors focus-visible:text-primary sm:py-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.06] text-primary">
                  <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="pt-0.5">
                  <span className="block text-sm font-semibold text-innova-black">
                    {copy.whatsapp}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground transition-colors group-hover:text-primary">
                    {copy.conversation}
                  </span>
                </span>
              </Link>
              <div className="flex items-start gap-4 py-4 sm:py-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.06] text-primary">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="pt-0.5">
                  <p className="text-sm font-semibold text-innova-black">{copy.location}</p>
                  <address className="mt-1 text-sm not-italic leading-6 text-muted-foreground">
                    Mza. B1 Lote. 3b Z.I. Lotización Industrial Hua (Alt. Petramas)<br />
                    San Antonio, Huarochirí<br />
                    Lima, Perú
                  </address>
                </div>
              </div>
            </CardContent>
          </div>

          <Card className="surface-elevated surface-featured animate-fade-up stagger-1 rounded-2xl">
            <CardHeader className="p-5 pb-3 sm:p-8 sm:pb-3">
              <CardTitle className="text-2xl tracking-[-0.02em] text-innova-black">
                {copy.formTitle}
              </CardTitle>
              <CardDescription className="leading-6">
                {copy.requiredNote}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-4 sm:p-8 sm:pt-5">
              <form className="grid gap-4 sm:gap-5" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <div className="grid gap-2">
                    <Label htmlFor="name">{copy.name}</Label>
                    <Input
                      id="name"
                      name="name"
                      autoComplete="name"
                      placeholder={copy.namePlaceholder}
                      className="surface-field h-11 rounded-xl sm:h-12"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company">{copy.company}</Label>
                    <Input
                      id="company"
                      name="company"
                      autoComplete="organization"
                      placeholder={copy.companyPlaceholder}
                      className="surface-field h-11 rounded-xl sm:h-12"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <div className="grid gap-2">
                    <Label htmlFor="email">{copy.emailField}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="nombre@empresa.com"
                      className="surface-field h-11 rounded-xl sm:h-12"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">{copy.phone}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+51 999 999 999"
                      className="surface-field h-11 rounded-xl sm:h-12"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">{copy.subject}</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder={copy.subjectPlaceholder}
                    className="surface-field h-11 rounded-xl sm:h-12"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">{copy.message}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={copy.messagePlaceholder}
                    className="surface-field min-h-28 resize-y rounded-xl sm:min-h-36"
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

                <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 rounded-full bg-foreground px-7 text-base text-background shadow-none hover:bg-primary hover:text-primary-foreground"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? copy.submitting : copy.submit}
                    <Send />
                  </Button>
                  <Button
                    type="button"
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 rounded-full border-border bg-background px-7 text-base text-innova-black shadow-none hover:border-primary/20 hover:bg-muted"
                  >
                    <Link href={whatsappHref} target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                      WhatsApp
                    </Link>
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
