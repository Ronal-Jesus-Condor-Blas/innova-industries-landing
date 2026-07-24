import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const allowedTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]);

const allowedExtensions = new Set(["pdf", "doc", "docx"]);
const maxFileSize = 3 * 1024 * 1024;

const areaLabels: Record<string, string> = {
  operations: "Operaciones",
  technical: "Área Técnica",
  commercial: "Comercial",
  logistics: "Logística y Almacén",
  administration: "Administración y Finanzas",
  safety: "Seguridad y Medio Ambiente",
  other: "Otras Áreas"
};

const experienceLabels: Record<string, string> = {
  student: "Estudiante o practicante",
  junior: "Hasta 2 años",
  mid: "De 3 a 5 años",
  senior: "Más de 5 años"
};

function clean(value: FormDataEntryValue | null, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ success: false }, { status: 415 });
    }

    const formData = await request.formData();
    const payload = {
      name: clean(formData.get("name"), 120),
      email: clean(formData.get("email"), 160),
      phone: clean(formData.get("phone"), 30),
      location: clean(formData.get("location"), 100),
      area: clean(formData.get("area"), 40),
      experience: clean(formData.get("experience"), 40),
      linkedin: clean(formData.get("linkedin"), 240),
      profile: clean(formData.get("profile"), 1200),
      consent: formData.get("consent") === "on"
    };
    const cv = formData.get("cv");
    const cvExtension =
      cv instanceof File ? cv.name.split(".").pop()?.toLowerCase() ?? "" : "";
    const validFileType =
      cv instanceof File &&
      allowedExtensions.has(cvExtension) &&
      (allowedTypes.has(cv.type) || cv.type === "");

    const invalid =
      !payload.name ||
      !payload.email ||
      !payload.phone ||
      !payload.location ||
      !areaLabels[payload.area] ||
      !experienceLabels[payload.experience] ||
      !payload.profile ||
      !payload.consent ||
      !isValidEmail(payload.email) ||
      !(cv instanceof File) ||
      !cv.size ||
      cv.size > maxFileSize ||
      !validFileType;

    if (invalid || !(cv instanceof File)) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false }, { status: 503 });
    }

    const resend = new Resend(apiKey);
    const cvContent = Buffer.from(await cv.arrayBuffer());
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "INNOVA Landing <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? "a.rios@innovaindustriesperu.com",
      replyTo: payload.email,
      subject: `Nueva postulación laboral: ${payload.name}`,
      attachments: [
        {
          filename: cv.name.replace(/[^\w.\- ]/g, "_"),
          content: cvContent
        }
      ],
      text: [
        "Nueva postulación laboral desde la web de INNOVA",
        "",
        `Nombre: ${payload.name}`,
        `Correo: ${payload.email}`,
        `Teléfono: ${payload.phone}`,
        `Ciudad: ${payload.location}`,
        `Área de interés: ${areaLabels[payload.area]}`,
        `Experiencia: ${experienceLabels[payload.experience]}`,
        `LinkedIn / portafolio: ${payload.linkedin || "No indicado"}`,
        "",
        "Perfil profesional:",
        payload.profile,
        "",
        `CV adjunto: ${cv.name}`,
        "",
        "La persona autorizó el uso de su información para procesos de selección."
      ].join("\n")
    });

    if (response.error) {
      return NextResponse.json({ success: false }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
