import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

const requiredFields: Array<keyof ContactPayload> = [
  "name",
  "company",
  "email",
  "subject",
  "message"
];

function sanitize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const payload = {
      name: sanitize(body.name),
      company: sanitize(body.company),
      email: sanitize(body.email),
      phone: sanitize(body.phone),
      subject: sanitize(body.subject),
      message: sanitize(body.message)
    };

    const hasMissingFields = requiredFields.some((field) => !payload[field]);

    if (hasMissingFields || !isValidEmail(payload.email)) {
      return NextResponse.json(
        { success: false, error: "Datos incompletos o correo inválido." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL ?? "a.rios@innovaindustriesperu.com";

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Servicio de correo no configurado." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const text = [
      "Nueva consulta desde landing page INNOVA",
      "",
      `Nombre: ${payload.name}`,
      `Empresa: ${payload.company}`,
      `Correo: ${payload.email}`,
      `Teléfono: ${payload.phone || "No indicado"}`,
      `Asunto: ${payload.subject}`,
      "",
      "Mensaje:",
      payload.message
    ].join("\n");

    await resend.emails.send({
      from: "INNOVA Landing <onboarding@resend.dev>",
      to: toEmail,
      replyTo: payload.email,
      subject: "Nueva consulta desde landing page INNOVA",
      text
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "No se pudo enviar la consulta." },
      { status: 500 }
    );
  }
}
