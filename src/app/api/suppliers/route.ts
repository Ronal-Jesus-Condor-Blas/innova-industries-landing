import { NextResponse } from "next/server";
import { Resend } from "resend";

type SupplierPayload = {
  company?: string;
  ruc?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  category?: string;
  experience?: string;
  message?: string;
  consent?: string;
};

const limits = {
  company: 120,
  ruc: 15,
  contactName: 100,
  email: 160,
  phone: 30,
  category: 40,
  experience: 800,
  message: 1200
} as const;

const categoryLabels: Record<string, string> = {
  chemical: "Productos químicos e insumos",
  industrial: "Equipos y suministros industriales",
  transport: "Transporte y logística",
  maintenance: "Mantenimiento y servicios técnicos",
  safety: "Seguridad y medio ambiente",
  professional: "Servicios profesionales",
  other: "Otros"
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json({ success: false }, { status: 415 });
    }

    const body = (await request.json()) as SupplierPayload;
    const payload = {
      company: clean(body.company, limits.company),
      ruc: clean(body.ruc, limits.ruc),
      contactName: clean(body.contactName, limits.contactName),
      email: clean(body.email, limits.email),
      phone: clean(body.phone, limits.phone),
      category: clean(body.category, limits.category),
      experience: clean(body.experience, limits.experience),
      message: clean(body.message, limits.message),
      consent: body.consent === "on"
    };

    const isIncomplete =
      !payload.company ||
      !payload.ruc ||
      !payload.contactName ||
      !payload.email ||
      !payload.phone ||
      !categoryLabels[payload.category] ||
      !payload.message ||
      !payload.consent ||
      !isValidEmail(payload.email);

    if (isIncomplete) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false }, { status: 503 });
    }

    const resend = new Resend(apiKey);
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "INNOVA Landing <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? "a.rios@innovaindustriesperu.com",
      replyTo: payload.email,
      subject: `Nueva postulación de proveedor: ${payload.company}`,
      text: [
        "Nueva postulación para la red de proveedores de INNOVA",
        "",
        `Razón social: ${payload.company}`,
        `RUC: ${payload.ruc}`,
        `Contacto: ${payload.contactName}`,
        `Correo: ${payload.email}`,
        `Teléfono: ${payload.phone}`,
        `Categoría: ${categoryLabels[payload.category]}`,
        "",
        "Experiencia relevante:",
        payload.experience || "No indicada",
        "",
        "Productos o servicios:",
        payload.message,
        "",
        "La persona confirmó la exactitud de la información y autorizó su uso para evaluar la postulación."
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
