"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  ClipboardCheck,
  FileCheck2,
  Send,
  ShieldCheck
} from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type SubmitState = {
  type: "idle" | "success" | "error";
  message: string;
};

const categories = [
  ["chemical", "Productos químicos e insumos", "Chemicals and supplies"],
  ["industrial", "Equipos y suministros industriales", "Industrial equipment and supplies"],
  ["transport", "Transporte y logística", "Transport and logistics"],
  ["maintenance", "Mantenimiento y servicios técnicos", "Maintenance and technical services"],
  ["safety", "Seguridad y medio ambiente", "Safety and environment"],
  ["professional", "Servicios profesionales", "Professional services"],
  ["other", "Otros", "Other"]
] as const;

export function Suppliers() {
  const { locale } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({ type: "idle", message: "" });

  const copy = locale === "es"
    ? {
        eyebrow: "Red de proveedores",
        title: "Crezcamos con",
        accent: "relaciones confiables",
        intro: "Buscamos empresas responsables que compartan nuestro compromiso con la calidad, la seguridad y el cumplimiento",
        primaryCta: "Postular como proveedor",
        secondaryCta: "Ver requisitos",
        routeLabel: "Quiero ser proveedor",
        routeTitle: "Una postulación clara, sin trámites innecesarios",
        routeDescription: "Registra la información esencial de tu empresa. Nuestro equipo revisará el perfil y se comunicará contigo si existe una oportunidad compatible",
        requirementsTitle: "Antes de postular",
        requirements: [
          "RUC activo y datos empresariales vigentes",
          "Capacidad para atender requerimientos industriales",
          "Compromiso con seguridad, ética y cumplimiento",
          "Información comercial verificable"
        ],
        processEyebrow: "Cómo funciona",
        processTitle: "Un proceso simple y transparente",
        steps: [
          ["01", "Registro", "Completa los datos esenciales de tu empresa"],
          ["02", "Revisión", "Validamos el perfil y la categoría de suministro"],
          ["03", "Contacto", "Te escribiremos si existe una oportunidad compatible"]
        ],
        formEyebrow: "Postulación",
        formTitle: "Registra tu empresa",
        formDescription: "Los campos marcados son necesarios para evaluar tu solicitud",
        company: "Razón social",
        companyPlaceholder: "Nombre legal de la empresa",
        ruc: "RUC",
        rucPlaceholder: "11 dígitos",
        contactName: "Persona de contacto",
        contactPlaceholder: "Nombre y apellido",
        email: "Correo corporativo",
        phone: "Teléfono",
        category: "Categoría de suministro",
        categoryPlaceholder: "Selecciona una categoría",
        experience: "Experiencia relevante",
        experiencePlaceholder: "Cuéntanos brevemente qué experiencia tiene la empresa en minería, construcción o manufactura",
        message: "Productos o servicios",
        messagePlaceholder: "Describe qué puede ofrecer tu empresa a Innova América",
        consent: "Confirmo que la información es correcta y autorizo su uso para evaluar esta postulación",
        submit: "Enviar postulación",
        submitting: "Enviando...",
        success: "Recibimos tu postulación. Nuestro equipo la revisará y se pondrá en contacto si existe una oportunidad compatible",
        error: "No pudimos enviar la postulación. Inténtalo nuevamente",
        incomplete: "Completa los campos requeridos y acepta la autorización"
      }
    : {
        eyebrow: "Supplier network",
        title: "Let’s grow through",
        accent: "trusted relationships",
        intro: "We seek responsible companies that share our commitment to quality, safety and compliance",
        primaryCta: "Apply as a supplier",
        secondaryCta: "View requirements",
        routeLabel: "I want to become a supplier",
        routeTitle: "A clear application, without unnecessary paperwork",
        routeDescription: "Register your company’s essential information. Our team will review the profile and contact you if there is a suitable opportunity",
        requirementsTitle: "Before applying",
        requirements: [
          "Active tax registration and current company information",
          "Capacity to support industrial requirements",
          "Commitment to safety, ethics and compliance",
          "Verifiable business information"
        ],
        processEyebrow: "How it works",
        processTitle: "A simple and transparent process",
        steps: [
          ["01", "Registration", "Complete your company’s essential information"],
          ["02", "Review", "We validate the profile and supply category"],
          ["03", "Contact", "We will reach out if there is a suitable opportunity"]
        ],
        formEyebrow: "Application",
        formTitle: "Register your company",
        formDescription: "Marked fields are required to evaluate your application",
        company: "Legal company name",
        companyPlaceholder: "Company’s legal name",
        ruc: "Tax ID",
        rucPlaceholder: "Tax identification number",
        contactName: "Contact person",
        contactPlaceholder: "First and last name",
        email: "Corporate email",
        phone: "Phone",
        category: "Supply category",
        categoryPlaceholder: "Select a category",
        experience: "Relevant experience",
        experiencePlaceholder: "Briefly describe the company’s experience in mining, construction or manufacturing",
        message: "Products or services",
        messagePlaceholder: "Describe what your company can offer Innova America",
        consent: "I confirm that the information is correct and authorize its use to evaluate this application",
        submit: "Submit application",
        submitting: "Submitting...",
        success: "We received your application. Our team will review it and contact you if there is a suitable opportunity",
        error: "We could not submit the application. Please try again",
        incomplete: "Complete the required fields and accept the authorization"
      };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState({ type: "idle", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const consent = formData.get("consent") === "on";
    const required = ["company", "ruc", "contactName", "email", "phone", "category", "message"];
    const missing = required.some((field) => !String(formData.get(field) ?? "").trim());

    if (missing || !consent) {
      setSubmitState({ type: "error", message: copy.incomplete });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
      });

      if (!response.ok) throw new Error("Request failed");

      form.reset();
      setSubmitState({ type: "success", message: copy.success });
    } catch {
      setSubmitState({ type: "error", message: copy.error });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="bg-background pb-20 pt-20 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28">
        <div className="mx-auto grid max-w-7xl items-end gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-8">
          <div className="animate-fade-up max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {copy.eyebrow}
            </p>
            <h1 className="mt-6 text-[2.7rem] font-normal leading-[0.98] tracking-[-0.05em] text-innova-black min-[390px]:text-5xl sm:text-6xl lg:text-[5rem]">
              {copy.title}
              <span className="block font-semibold text-primary">{copy.accent}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {copy.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-full bg-foreground px-6 text-background hover:bg-primary hover:text-primary-foreground">
                <a href="#postulacion">
                  {copy.primaryCta}
                  <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-full bg-background px-6 shadow-none">
                <a href="#requisitos">{copy.secondaryCta}</a>
              </Button>
            </div>
          </div>

          <Card className="animate-fade-up stagger-1 rounded-2xl border-border/60 bg-card shadow-none">
            <CardHeader className="p-6 pb-4 sm:p-8 sm:pb-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.06] text-primary">
                <Building2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">{copy.routeLabel}</p>
              <CardTitle className="pt-2 text-2xl leading-tight tracking-[-0.025em] text-innova-black sm:text-3xl">
                {copy.routeTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
              <p className="text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                {copy.routeDescription}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="requisitos" className="bg-background py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{copy.processEyebrow}</p>
              <h2 className="mt-5 max-w-lg text-4xl font-normal leading-[1.02] tracking-[-0.045em] text-innova-black sm:text-5xl">
                {copy.processTitle}
              </h2>
            </div>

            <div className="grid border-y border-border/60 md:grid-cols-3">
              {copy.steps.map(([number, title, description], index) => (
                <div key={number} className="px-1 py-7 md:px-6 md:py-8 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-border/60 md:[&:not(:last-child)]:border-b-0 md:[&:not(:last-child)]:border-r">
                  <span className="font-mono text-xs tracking-[0.16em] text-primary">[{number}]</span>
                  <h3 className="mt-5 text-lg font-semibold text-innova-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                  {index === 0 ? <ClipboardCheck className="mt-5 h-5 w-5 text-primary" aria-hidden="true" /> : null}
                  {index === 1 ? <FileCheck2 className="mt-5 h-5 w-5 text-primary" aria-hidden="true" /> : null}
                  {index === 2 ? <ShieldCheck className="mt-5 h-5 w-5 text-primary" aria-hidden="true" /> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="postulacion" className="bg-background pb-24 pt-16 sm:pb-28 sm:pt-20 lg:pb-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-8">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{copy.formEyebrow}</p>
            <h2 className="mt-5 text-4xl font-normal tracking-[-0.04em] text-innova-black sm:text-5xl">{copy.formTitle}</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">{copy.formDescription}</p>

            <div className="mt-9" aria-labelledby="supplier-requirements-title">
              <h3 id="supplier-requirements-title" className="text-base font-semibold text-innova-black">{copy.requirementsTitle}</h3>
              <ul className="mt-5 grid gap-4">
                {copy.requirements.map((requirement) => (
                  <li key={requirement} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/[0.09] text-primary">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Card className="rounded-2xl border-border/60 bg-card shadow-[0_20px_55px_rgba(29,29,27,0.07)] dark:shadow-none">
            <CardContent className="p-5 sm:p-8">
              <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="supplier-company">{copy.company} *</Label>
                    <Input id="supplier-company" name="company" autoComplete="organization" maxLength={120} placeholder={copy.companyPlaceholder} className="h-12 rounded-xl bg-muted/25 shadow-none" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="supplier-ruc">{copy.ruc} *</Label>
                    <Input id="supplier-ruc" name="ruc" inputMode="numeric" maxLength={15} placeholder={copy.rucPlaceholder} className="h-12 rounded-xl bg-muted/25 shadow-none" required />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="supplier-contact">{copy.contactName} *</Label>
                    <Input id="supplier-contact" name="contactName" autoComplete="name" maxLength={100} placeholder={copy.contactPlaceholder} className="h-12 rounded-xl bg-muted/25 shadow-none" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="supplier-email">{copy.email} *</Label>
                    <Input id="supplier-email" name="email" type="email" autoComplete="email" maxLength={160} placeholder="nombre@empresa.com" className="h-12 rounded-xl bg-muted/25 shadow-none" required />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="supplier-phone">{copy.phone} *</Label>
                    <Input id="supplier-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="+51 999 999 999" className="h-12 rounded-xl bg-muted/25 shadow-none" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="supplier-category">{copy.category} *</Label>
                    <Select name="category" required>
                      <SelectTrigger id="supplier-category" className="h-12 w-full rounded-xl bg-muted/25 shadow-none">
                        <SelectValue placeholder={copy.categoryPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(([value, esLabel, enLabel]) => (
                          <SelectItem key={value} value={value}>{locale === "es" ? esLabel : enLabel}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="supplier-experience">{copy.experience}</Label>
                  <Textarea id="supplier-experience" name="experience" maxLength={800} placeholder={copy.experiencePlaceholder} className="min-h-28 resize-y rounded-xl bg-muted/25 shadow-none" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="supplier-message">{copy.message} *</Label>
                  <Textarea id="supplier-message" name="message" maxLength={1200} placeholder={copy.messagePlaceholder} className="min-h-32 resize-y rounded-xl bg-muted/25 shadow-none" required />
                </div>

                <Separator className="my-1" />

                <div className="flex items-start gap-3">
                  <Checkbox id="supplier-consent" name="consent" className="mt-0.5" required />
                  <Label htmlFor="supplier-consent" className="font-normal leading-6 text-muted-foreground">
                    {copy.consent} *
                  </Label>
                </div>

                {submitState.message ? (
                  <p role="status" aria-live="polite" className={submitState.type === "success"
                    ? "rounded-xl border border-emerald-500/20 bg-emerald-500/[0.08] px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300"
                    : "rounded-xl border border-destructive/20 bg-destructive/[0.07] px-4 py-3 text-sm text-destructive"
                  }>
                    {submitState.message}
                  </p>
                ) : null}

                <Button type="submit" size="lg" disabled={isSubmitting} className="mt-1 h-12 w-full rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground sm:w-fit sm:px-7">
                  {isSubmitting ? copy.submitting : copy.submit}
                  <Send />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
