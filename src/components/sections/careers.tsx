"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Factory,
  FileText,
  GraduationCap,
  Send,
  ShieldCheck,
  UploadCloud,
  UsersRound
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

const areas = [
  ["operations", "Operaciones", "Operations"],
  ["technical", "Área Técnica", "Technical"],
  ["commercial", "Comercial", "Commercial"],
  ["logistics", "Logística y Almacén", "Logistics and Warehouse"],
  ["administration", "Administración y Finanzas", "Administration and Finance"],
  ["safety", "Seguridad y Medio Ambiente", "Safety and Environment"],
  ["other", "Otras Áreas", "Other Areas"]
] as const;

const experienceLevels = [
  ["student", "Estudiante o practicante", "Student or intern"],
  ["junior", "Hasta 2 años", "Up to 2 years"],
  ["mid", "De 3 a 5 años", "3 to 5 years"],
  ["senior", "Más de 5 años", "More than 5 years"]
] as const;

type SubmitState = {
  type: "idle" | "success" | "error";
  message: string;
};

export function Careers() {
  const { locale } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>({
    type: "idle",
    message: ""
  });

  const copy = locale === "es"
    ? {
        eyebrow: "Talento Innova",
        title: "Construye tu futuro",
        accent: "con nosotros",
        intro:
          "Buscamos personas íntegras, comprometidas y orientadas a resultados, dispuestas a aportar su experiencia y crecer junto a una organización industrial en evolución.",
        primaryCta: "Enviar mi postulación",
        secondaryCta: "Conocer el proceso",
        cardLabel: "Forma parte del equipo",
        cardTitle: "Tu talento puede impulsar nuestra próxima etapa",
        cardDescription:
          "Un entorno industrial donde el aprendizaje, la seguridad y el impacto real forman parte del trabajo diario.",
        benefits: [
          ["Crecimiento profesional", "Aprendizaje continuo junto a especialistas."],
          ["Proyectos con impacto", "Retos reales para minería, construcción e industria."],
          ["Trabajo responsable", "Seguridad, colaboración y criterio técnico."]
        ],
        processEyebrow: "Proceso de selección",
        processTitle: "Una postulación clara y confidencial",
        steps: [
          ["01", "Postulación", "Comparte tu perfil profesional y el área en la que deseas desarrollarte."],
          ["02", "Evaluación", "Nuestro equipo revisará tu experiencia según las necesidades de la organización."],
          ["03", "Contacto", "Si tu perfil se alinea con una oportunidad, nos comunicaremos contigo."]
        ],
        formEyebrow: "Postulación espontánea",
        formTitle: "Cuéntanos sobre tu experiencia",
        formDescription:
          "Completa la información esencial y adjunta tu CV. Conservaremos tu perfil para procesos de selección compatibles.",
        requirementsTitle: "Antes de enviar",
        requirements: [
          "CV actualizado en formato PDF, DOC o DOCX",
          "Información profesional clara y verificable",
          "Disponibilidad para ser contactado por nuestro equipo",
          "Archivo de hasta 3 MB"
        ],
        name: "Nombres y apellidos",
        namePlaceholder: "Tu nombre completo",
        email: "Correo electrónico",
        phone: "Teléfono",
        location: "Ciudad de residencia",
        locationPlaceholder: "Ciudad, país",
        area: "Área de interés",
        areaPlaceholder: "Selecciona un área",
        experience: "Experiencia profesional",
        experiencePlaceholder: "Selecciona tu nivel de experiencia",
        linkedin: "LinkedIn o portafolio",
        profile: "Perfil profesional",
        profilePlaceholder:
          "Resume tu experiencia, principales fortalezas y el tipo de oportunidad que buscas",
        cv: "Currículum vitae",
        cvHelp: "PDF, DOC o DOCX · máximo 3 MB",
        contactSection: "Datos de contacto",
        profileSection: "Perfil profesional",
        documentsSection: "CV y autorización",
        selectFile: "Seleccionar CV",
        noFile: "Ningún archivo seleccionado",
        consentStart: "He leído la",
        consentLink: "Política de privacidad",
        consentEnd: "y autorizo el uso de mis datos para procesos de selección de Innova América.",
        submit: "Enviar postulación",
        submitting: "Enviando...",
        incomplete: "Completa los campos requeridos, adjunta tu CV y acepta la autorización",
        success:
          "Recibimos tu postulación. Nuestro equipo la considerará en procesos compatibles con tu perfil",
        error: "No pudimos enviar tu postulación. Revisa el archivo e inténtalo nuevamente"
      }
    : {
        eyebrow: "Innova Talent",
        title: "Build your future",
        accent: "with us",
        intro:
          "We seek principled, committed and results-oriented people who are ready to contribute their experience and grow with an evolving industrial organization.",
        primaryCta: "Submit my application",
        secondaryCta: "View the process",
        cardLabel: "Join our team",
        cardTitle: "Your talent can drive our next stage",
        cardDescription:
          "An industrial environment where learning, safety and meaningful impact are part of the daily work.",
        benefits: [
          ["Professional growth", "Continuous learning alongside specialists."],
          ["Meaningful projects", "Real challenges for mining, construction and industry."],
          ["Responsible work", "Safety, collaboration and sound technical judgment."]
        ],
        processEyebrow: "Selection process",
        processTitle: "A clear and confidential application",
        steps: [
          ["01", "Application", "Share your professional profile and the area where you want to grow."],
          ["02", "Assessment", "Our team will review your experience according to organizational needs."],
          ["03", "Contact", "If your profile matches an opportunity, we will contact you."]
        ],
        formEyebrow: "Open application",
        formTitle: "Tell us about your experience",
        formDescription:
          "Complete the essential information and attach your résumé. We will retain your profile for suitable selection processes.",
        requirementsTitle: "Before submitting",
        requirements: [
          "Updated résumé in PDF, DOC or DOCX format",
          "Clear and verifiable professional information",
          "Availability to be contacted by our team",
          "File size up to 3 MB"
        ],
        name: "Full name",
        namePlaceholder: "Your full name",
        email: "Email",
        phone: "Phone",
        location: "City of residence",
        locationPlaceholder: "City, country",
        area: "Area of interest",
        areaPlaceholder: "Select an area",
        experience: "Professional experience",
        experiencePlaceholder: "Select your experience level",
        linkedin: "LinkedIn or portfolio",
        profile: "Professional profile",
        profilePlaceholder:
          "Summarize your experience, main strengths and the type of opportunity you are seeking",
        cv: "Résumé",
        cvHelp: "PDF, DOC or DOCX · maximum 3 MB",
        contactSection: "Contact details",
        profileSection: "Professional profile",
        documentsSection: "Résumé and authorization",
        selectFile: "Select résumé",
        noFile: "No file selected",
        consentStart: "I have read the",
        consentLink: "Privacy policy",
        consentEnd: "and authorize Innova America to use my data for recruitment processes.",
        submit: "Submit application",
        submitting: "Submitting...",
        incomplete: "Complete the required fields, attach your résumé and accept the authorization",
        success:
          "We received your application. Our team will consider it for processes compatible with your profile",
        error: "We could not submit your application. Check the file and try again"
      };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState({ type: "idle", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const required = ["name", "email", "phone", "location", "area", "experience", "profile"];
    const missing = required.some((field) => !String(formData.get(field) ?? "").trim());
    const cv = formData.get("cv");
    const consent = formData.get("consent") === "on";

    if (missing || !(cv instanceof File) || !cv.size || !consent) {
      setSubmitState({ type: "error", message: copy.incomplete });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Request failed");

      form.reset();
      setSelectedFileName("");
      setSubmitState({ type: "success", message: copy.success });
    } catch {
      setSubmitState({ type: "error", message: copy.error });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="bg-background pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-8">
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
                <a href="#proceso">{copy.secondaryCta}</a>
              </Button>
            </div>
          </div>

          <Card className="carbon-card surface-featured animate-fade-up stagger-1 rounded-2xl lg:w-full lg:max-w-[31rem] lg:justify-self-end">
            <CardHeader className="p-6 pb-3 sm:p-7 sm:pb-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/15 bg-primary/[0.06] text-primary">
                  <UsersRound className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                  {copy.cardLabel}
                </p>
              </div>
              <CardTitle className="pt-3 text-2xl leading-tight tracking-[-0.025em] text-innova-black sm:text-[1.7rem]">
                {copy.cardTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 sm:px-7 sm:pb-7">
              <p className="text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                {copy.cardDescription}
              </p>
              <div className="mt-4 grid border-t border-border/60 pt-3">
                {copy.benefits.map(([title, description], index) => {
                  const Icon = index === 0 ? GraduationCap : index === 1 ? Factory : ShieldCheck;

                  return (
                    <div key={title} className="flex gap-3 rounded-xl px-1 py-2">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/[0.07] text-primary">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-innova-black">{title}</p>
                        <p className="mt-0.5 text-sm leading-5 text-muted-foreground">{description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="proceso" className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {copy.processEyebrow}
              </p>
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
                  {index === 0 ? <FileText className="mt-5 h-5 w-5 text-primary" aria-hidden="true" /> : null}
                  {index === 1 ? <BriefcaseBusiness className="mt-5 h-5 w-5 text-primary" aria-hidden="true" /> : null}
                  {index === 2 ? <UsersRound className="mt-5 h-5 w-5 text-primary" aria-hidden="true" /> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="postulacion" className="bg-background pb-24 pt-14 sm:pb-28 sm:pt-16 lg:pb-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-8">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {copy.formEyebrow}
            </p>
            <h2 className="mt-5 text-4xl font-normal tracking-[-0.04em] text-innova-black sm:text-5xl">
              {copy.formTitle}
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
              {copy.formDescription}
            </p>

            <div className="mt-9" aria-labelledby="career-requirements-title">
              <h3 id="career-requirements-title" className="text-base font-semibold text-innova-black">
                {copy.requirementsTitle}
              </h3>
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

          <Card className="carbon-card rounded-2xl">
            <CardContent className="p-5 sm:p-8">
              <form onSubmit={handleSubmit} className="grid gap-6" encType="multipart/form-data" noValidate>
                <div
                  className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
                  aria-hidden="true"
                >
                  <Label htmlFor="career-website">Website</Label>
                  <Input
                    id="career-website"
                    name="website"
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>
                <fieldset className="grid gap-5">
                  <legend className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                    01 · {copy.contactSection}
                  </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="career-name">{copy.name} *</Label>
                    <Input id="career-name" name="name" autoComplete="name" maxLength={120} placeholder={copy.namePlaceholder} className="h-12 rounded-xl bg-background/60 shadow-none" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="career-email">{copy.email} *</Label>
                    <Input id="career-email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="nombre@correo.com" className="h-12 rounded-xl bg-background/60 shadow-none" required />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="career-phone">{copy.phone} *</Label>
                    <Input id="career-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="+51 999 999 999" className="h-12 rounded-xl bg-background/60 shadow-none" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="career-location">{copy.location} *</Label>
                    <Input id="career-location" name="location" autoComplete="address-level2" maxLength={100} placeholder={copy.locationPlaceholder} className="h-12 rounded-xl bg-background/60 shadow-none" required />
                  </div>
                </div>
                </fieldset>

                <Separator />

                <fieldset className="grid gap-5">
                  <legend className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                    02 · {copy.profileSection}
                  </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="career-area">{copy.area} *</Label>
                    <Select name="area" required>
                      <SelectTrigger id="career-area" className="h-12 w-full rounded-xl bg-background/60 shadow-none">
                        <SelectValue placeholder={copy.areaPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {areas.map(([value, esLabel, enLabel]) => (
                          <SelectItem key={value} value={value}>
                            {locale === "es" ? esLabel : enLabel}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="career-experience">{copy.experience} *</Label>
                    <Select name="experience" required>
                      <SelectTrigger id="career-experience" className="h-12 w-full rounded-xl bg-background/60 shadow-none">
                        <SelectValue placeholder={copy.experiencePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map(([value, esLabel, enLabel]) => (
                          <SelectItem key={value} value={value}>
                            {locale === "es" ? esLabel : enLabel}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="career-linkedin">{copy.linkedin}</Label>
                  <Input id="career-linkedin" name="linkedin" type="url" maxLength={240} placeholder="https://linkedin.com/in/..." className="h-12 rounded-xl bg-background/60 shadow-none" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="career-profile">{copy.profile} *</Label>
                  <Textarea id="career-profile" name="profile" maxLength={1200} placeholder={copy.profilePlaceholder} className="min-h-32 resize-y rounded-xl bg-background/60 shadow-none" required />
                </div>
                </fieldset>

                <Separator />

                <fieldset className="grid gap-5">
                  <legend className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                    03 · {copy.documentsSection}
                  </legend>
                <div className="grid gap-2">
                  <Label htmlFor="career-cv">{copy.cv} *</Label>
                    <label
                      htmlFor="career-cv"
                      className="group relative flex min-h-24 cursor-pointer items-center gap-4 overflow-hidden rounded-xl border border-dashed border-border bg-background/45 px-4 py-4 transition-colors hover:border-primary/50 hover:bg-primary/[0.025] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/[0.08] text-primary">
                      <UploadCloud className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-innova-black">
                        {selectedFileName || copy.selectFile}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {selectedFileName ? copy.cvHelp : `${copy.noFile} · ${copy.cvHelp}`}
                      </span>
                    </span>
                    <Input
                      id="career-cv"
                      name="cv"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      onChange={(event) => setSelectedFileName(event.target.files?.[0]?.name ?? "")}
                      required
                    />
                  </label>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/35 p-4">
                  <Checkbox id="career-consent" name="consent" className="mt-0.5" required />
                  <Label htmlFor="career-consent" className="cursor-pointer font-normal leading-6 text-muted-foreground">
                    {copy.consentStart}{" "}
                    <Link
                      href="/politica-de-privacidad"
                      className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
                    >
                      {copy.consentLink}
                    </Link>{" "}
                    {copy.consentEnd} *
                  </Label>
                </div>
                </fieldset>

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
