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
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "INNOVA Landing <onboarding@resend.dev>";

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No se ha configurado la clave de Resend. Establezca RESEND_API_KEY en el entorno."
        },
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

    const sendResponse = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: payload.email,
      subject: "Nueva consulta desde landing page INNOVA",
      text
    });

    console.log("Resend response:", sendResponse);

    if (sendResponse.error) {
      return NextResponse.json(
        {
          success: false,
          error: `Resend error: ${sendResponse.error.message}`
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      sendId: sendResponse.data?.id ?? null
    });
  } catch (error) {
    console.error("Error en /api/contact:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "No se pudo enviar la consulta."
      },
      { status: 500 }
    );
  }
}
