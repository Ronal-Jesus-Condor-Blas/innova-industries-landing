import { Resend } from "resend";

import {
  assertContentLength,
  assertContentType,
  assertSameOrigin,
  cleanSingleLine,
  cleanText,
  consumeRateLimit,
  isSafeHttpUrl,
  isValidEmail,
  jsonNoStore,
  securityErrorResponse
} from "@/lib/server/request-security";

export const runtime = "nodejs";

const allowedTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]);
const allowedExtensions = new Set(["pdf", "doc", "docx"]);
const maxFileSize = 3 * 1024 * 1024;
const maxRequestSize = 4 * 1024 * 1024;

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

function getText(formData: FormData, name: string, maxLength: number) {
  return cleanText(formData.get(name), maxLength);
}

function getSingleLine(formData: FormData, name: string, maxLength: number) {
  return cleanSingleLine(formData.get(name), maxLength);
}

function hasValidSignature(bytes: Buffer, extension: string) {
  if (extension === "pdf") {
    return bytes.subarray(0, 5).toString("ascii") === "%PDF-";
  }

  if (extension === "doc") {
    const oleHeader = Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
    return bytes.subarray(0, oleHeader.length).equals(oleHeader);
  }

  if (extension === "docx") {
    return (
      bytes[0] === 0x50 &&
      bytes[1] === 0x4b &&
      [0x03, 0x05, 0x07].includes(bytes[2]) &&
      [0x04, 0x06, 0x08].includes(bytes[3])
    );
  }

  return false;
}

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    assertContentType(request, "multipart/form-data");
    assertContentLength(request, maxRequestSize);
    consumeRateLimit(request, "careers", {
      limit: 3,
      windowMs: 60 * 60 * 1000
    });

    const formData = await request.formData();
    const honeypot = getText(formData, "website", 200);

    if (honeypot) {
      return jsonNoStore({ success: true });
    }

    const payload = {
      name: getSingleLine(formData, "name", 120),
      email: getSingleLine(formData, "email", 254),
      phone: getSingleLine(formData, "phone", 40),
      location: getSingleLine(formData, "location", 120),
      area: getSingleLine(formData, "area", 40),
      experience: getSingleLine(formData, "experience", 40),
      linkedin: getSingleLine(formData, "linkedin", 240),
      profile: getText(formData, "profile", 1200),
      consent: formData.get("consent") === "on"
    };

    const cv = formData.get("cv");
    if (!(cv instanceof File)) {
      return jsonNoStore({ success: false }, { status: 400 });
    }

    const extension = cv.name.split(".").pop()?.toLowerCase() ?? "";
    const validFileMetadata =
      allowedExtensions.has(extension) &&
      (allowedTypes.has(cv.type) || cv.type === "") &&
      cv.size > 0 &&
      cv.size <= maxFileSize;

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
      !isSafeHttpUrl(payload.linkedin) ||
      !validFileMetadata;

    if (invalid) {
      return jsonNoStore(
        { success: false, error: "Revisa los datos y el archivo adjunto." },
        { status: 400 }
      );
    }

    const cvContent = Buffer.from(await cv.arrayBuffer());
    if (cvContent.byteLength > maxFileSize || !hasValidSignature(cvContent, extension)) {
      return jsonNoStore(
        { success: false, error: "El archivo adjunto no es válido." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return jsonNoStore(
        {
          success: false,
          error: "El servicio de postulaciones no está disponible temporalmente."
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const response = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ??
        "INNOVA Landing <onboarding@resend.dev>",
      to:
        process.env.INNOVA_CONTACT_TO_EMAIL ??
        "a.rios@innovaindustriesperu.com",
      replyTo: payload.email,
      subject: `Nueva postulación laboral: ${payload.name}`,
      attachments: [
        {
          filename: `candidate-cv.${extension}`,
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
        `CV adjunto: candidate-cv.${extension}`,
        "",
        "La persona autorizó el uso de su información para procesos de selección."
      ].join("\n")
    });

    if (response.error) {
      return jsonNoStore(
        {
          success: false,
          error: "No se pudo enviar la postulación. Inténtalo nuevamente."
        },
        { status: 502 }
      );
    }

    return jsonNoStore({ success: true });
  } catch (error) {
    return securityErrorResponse(error);
  }
}
