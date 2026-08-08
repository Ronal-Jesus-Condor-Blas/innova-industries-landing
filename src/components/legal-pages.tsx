"use client";

import Link from "next/link";

import { LegalDocument } from "@/components/legal-document";
import { useLanguage } from "@/components/providers/language-provider";
import { brand } from "@/lib/site";

const linkClass = "font-medium text-foreground underline underline-offset-4 hover:text-primary";

const shared = {
  es: {
    updatedLabel: "Última actualización",
    updatedAt: "8 de agosto de 2026",
    contactPrompt: "¿Necesitas comunicarte con nosotros?",
    contactLabel: "Ir a contacto"
  },
  en: {
    updatedLabel: "Last updated",
    updatedAt: "August 8, 2026",
    contactPrompt: "Would you like to contact us?",
    contactLabel: "Go to contact"
  }
} as const;

export function PrivacyPolicyContent() {
  const { locale } = useLanguage();
  const common = shared[locale];

  const copy = locale === "es"
    ? {
        eyebrow: "Privacidad",
        title: "Política de privacidad",
        introduction: "Explicamos de forma clara qué datos recibimos, para qué los utilizamos y cómo puedes ejercer tus derechos.",
        sections: [
          {
            title: "1. Responsable del tratamiento",
            content: <p>{brand.name}, identificada con RUC N.º {brand.ruc}, es responsable del tratamiento de los datos personales recabados en este sitio. Nuestro domicilio es Mza. B1 Lote 3B, Z.I. Lotización Industrial Huachipa Este Primera Etapa (Alt. Petramas), San Antonio, Huarochirí, Lima, Perú.</p>
          },
          {
            title: "2. Datos que recopilamos",
            content: <><p>En el formulario de contacto solicitamos nombre, empresa, correo electrónico, asunto y mensaje. En postulaciones laborales podemos solicitar, además, teléfono, ciudad, área de interés, experiencia, perfil profesional, enlace de LinkedIn o portafolio y currículum vitae.</p><p>También procesamos información técnica indispensable para la seguridad y operación del sitio, como dirección IP, encabezados de solicitud y preferencias locales. Para medir el desempeño recibimos estadísticas agregadas de navegación y Core Web Vitals mediante Vercel Analytics y Speed Insights, sin cookies de terceros.</p></>
          },
          {
            title: "3. Finalidades y autorización",
            content: <><p>Utilizamos los datos de contacto para responder consultas, evaluar requerimientos y mantener las comunicaciones relacionadas. Los datos de postulación se utilizan exclusivamente para evaluar perfiles y contactar candidatos en procesos compatibles.</p><p>El envío de cada formulario requiere autorización expresa. Las métricas técnicas se emplean para mejorar estabilidad, rendimiento y experiencia de navegación. No utilizamos estos datos para publicidad ni tomamos decisiones automatizadas con efectos legales.</p></>
          },
          {
            title: "4. Destinatarios y conservación",
            content: <><p>El acceso se limita al personal autorizado de Innova y a proveedores indispensables para alojamiento, seguridad, entrega de correos y medición agregada, incluidos Vercel y Resend. Algunos proveedores pueden procesar información fuera del Perú bajo las salvaguardas aplicables.</p><p>Las consultas se conservan hasta 24 meses desde la última comunicación. Las postulaciones espontáneas se conservan hasta 12 meses desde su recepción, salvo que se inicie una relación laboral o exista una obligación legal que requiera un plazo distinto. Luego se eliminan o anonimizan de forma segura.</p></>
          },
          {
            title: "5. Tus datos y tus derechos",
            content: <><p>Conforme a la Ley N.º 29733 y su reglamento, puedes solicitar acceso, rectificación, cancelación u oposición (derechos ARCO), así como revocar tu consentimiento cuando corresponda.</p><p>Presenta tu solicitud mediante nuestro <Link href="/contacto" className={linkClass}>canal de contacto</Link> e indica “Derechos ARCO” en el asunto, junto con el derecho que deseas ejercer y la información necesaria para verificar tu identidad. Si tu solicitud no es atendida adecuadamente, puedes acudir a la Autoridad Nacional de Protección de Datos Personales.</p></>
          },
          {
            title: "6. Seguridad, cookies y cambios",
            content: <><p>Aplicamos medidas técnicas y organizativas razonables para prevenir el acceso, alteración, pérdida o divulgación no autorizada. Ningún sistema es absolutamente infalible, por lo que revisamos estas medidas periódicamente.</p><p>El almacenamiento local y las herramientas de medición se detallan en la <Link href="/politica-de-cookies" className={linkClass}>Política de cookies</Link>. Podemos actualizar esta política cuando cambien nuestras prácticas o la normativa; la fecha publicada identifica la versión vigente.</p></>
          }
        ]
      }
    : {
        eyebrow: "Privacy",
        title: "Privacy policy",
        introduction: "We clearly explain what data we receive, why we use it, and how you can exercise your rights.",
        sections: [
          {
            title: "1. Data controller",
            content: <p>{brand.name}, Peruvian tax ID (RUC) No. {brand.ruc}, is responsible for personal data collected through this website. Our address is Mza. B1 Lot 3B, Huachipa Este First Stage Industrial Development (near Petramas), San Antonio, Huarochirí, Lima, Peru.</p>
          },
          {
            title: "2. Data we collect",
            content: <><p>Our contact form requests your name, company, email, subject, and message. Job applications may also include your phone number, city, area of interest, experience, professional profile, LinkedIn or portfolio link, and résumé.</p><p>We also process technical information needed for website security and operation, including IP address, request headers, and local preferences. Aggregated navigation and Core Web Vitals statistics are measured through Vercel Analytics and Speed Insights without third-party cookies.</p></>
          },
          {
            title: "3. Purposes and authorization",
            content: <><p>Contact details are used to answer inquiries, assess requirements, and manage related communications. Application data is used only to evaluate profiles and contact candidates for compatible opportunities.</p><p>Each form requires express authorization. Technical metrics help improve website stability, performance, and navigation. We do not use this data for advertising or make automated decisions with legal effects.</p></>
          },
          {
            title: "4. Recipients and retention",
            content: <><p>Access is limited to authorized Innova personnel and providers required for hosting, security, email delivery, and aggregated measurement, including Vercel and Resend. Some providers may process information outside Peru under applicable safeguards.</p><p>Inquiries are retained for up to 24 months after the last communication. Open applications are retained for up to 12 months after receipt, unless an employment relationship begins or a legal obligation requires a different period. Data is then securely deleted or anonymized.</p></>
          },
          {
            title: "5. Your data and rights",
            content: <><p>Under Peruvian Law No. 29733 and its regulations, you may request access, rectification, cancellation, or objection (ARCO rights), and withdraw consent where applicable.</p><p>Submit your request through our <Link href="/contacto" className={linkClass}>contact channel</Link>, write “ARCO Rights” in the subject, and identify the right you wish to exercise together with information required to verify your identity. You may contact Peru’s National Authority for Personal Data Protection if your request is not handled appropriately.</p></>
          },
          {
            title: "6. Security, cookies, and changes",
            content: <><p>We apply reasonable technical and organizational measures to prevent unauthorized access, alteration, loss, or disclosure. No system is completely infallible, so these measures are reviewed periodically.</p><p>Local storage and measurement tools are described in our <Link href="/politica-de-cookies" className={linkClass}>Cookie policy</Link>. We may update this policy when our practices or applicable rules change; the published date identifies the current version.</p></>
          }
        ]
      };

  return <LegalDocument {...common} {...copy} />;
}

export function TermsOfUseContent() {
  const { locale } = useLanguage();
  const common = shared[locale];
  const copy = locale === "es"
    ? {
        eyebrow: "Legal",
        title: "Términos de uso",
        introduction: "Condiciones esenciales para utilizar este sitio y sus canales de contacto de manera segura y responsable.",
        sections: [
          { title: "1. Alcance y aceptación", content: <p>Estos términos regulan el acceso y uso de {brand.domain}, administrado por {brand.name}, RUC N.º {brand.ruc}. Al navegar aceptas estas condiciones; si no estás de acuerdo, debes abstenerte de utilizar el sitio.</p> },
          { title: "2. Finalidad del sitio", content: <p>El sitio ofrece información corporativa y canales para consultas, contacto comercial y postulaciones laborales. Su contenido es informativo y no constituye por sí mismo una oferta, garantía, asesoría técnica ni relación contractual.</p> },
          { title: "3. Uso permitido", content: <p>Debes proporcionar información veraz y utilizar el sitio de forma lícita. No está permitido interferir con su funcionamiento, acceder sin autorización, introducir código malicioso, suplantar identidades ni utilizar los formularios para contenido fraudulento, ofensivo o ajeno a su finalidad.</p> },
          { title: "4. Propiedad intelectual", content: <p>Los textos, diseños, logotipos, imágenes, marcas y demás contenidos propios están protegidos por la normativa aplicable. No se autoriza su reproducción, modificación, distribución o explotación comercial sin consentimiento previo y escrito, salvo los usos permitidos por ley.</p> },
          { title: "5. Disponibilidad y enlaces externos", content: <><p>Procuramos mantener información correcta y el sitio disponible, pero podemos actualizar, suspender o retirar contenidos y funcionalidades sin previo aviso. No garantizamos acceso continuo ni ausencia absoluta de errores.</p><p>Los enlaces a terceros se facilitan como referencia y se rigen por sus propias condiciones y políticas.</p></> },
          { title: "6. Responsabilidad", content: <p>En la medida permitida por la ley, Innova no será responsable por daños derivados del uso indebido, interrupciones fuera de su control o decisiones tomadas únicamente con base en información general publicada aquí. Nada limita derechos que legalmente no puedan excluirse.</p> },
          { title: "7. Legislación y modificaciones", content: <p>Estos términos se interpretan conforme a las leyes de la República del Perú. Podemos modificarlos para reflejar cambios legales, técnicos o del servicio; la versión vigente será la publicada con su fecha de actualización.</p> }
        ]
      }
    : {
        eyebrow: "Legal",
        title: "Terms of use",
        introduction: "Essential conditions for using this website and its contact channels safely and responsibly.",
        sections: [
          { title: "1. Scope and acceptance", content: <p>These terms govern access to and use of {brand.domain}, operated by {brand.name}, Peruvian tax ID (RUC) No. {brand.ruc}. By browsing, you accept these terms. If you disagree, you should not use the website.</p> },
          { title: "2. Website purpose", content: <p>The website provides corporate information and channels for inquiries, business contact, and job applications. Its content is informational and does not by itself constitute an offer, warranty, technical advice, or contractual relationship.</p> },
          { title: "3. Permitted use", content: <p>You must provide truthful information and use the website lawfully. You may not interfere with its operation, gain unauthorized access, introduce malicious code, impersonate others, or use forms for fraudulent, offensive, or unrelated content.</p> },
          { title: "4. Intellectual property", content: <p>Our texts, designs, logos, images, trademarks, and other content are protected by applicable law. Reproduction, modification, distribution, or commercial exploitation is not authorized without prior written consent, except where permitted by law.</p> },
          { title: "5. Availability and external links", content: <><p>We seek to keep information accurate and the website available, but may update, suspend, or remove content and features without notice. We do not guarantee uninterrupted access or complete absence of errors.</p><p>Third-party links are provided for reference and are governed by their own terms and policies.</p></> },
          { title: "6. Liability", content: <p>To the extent permitted by law, Innova is not liable for damage arising from misuse, interruptions beyond our control, or decisions based solely on general information published here. Nothing limits rights that cannot legally be excluded.</p> },
          { title: "7. Governing law and changes", content: <p>These terms are interpreted under the laws of the Republic of Peru. We may modify them to reflect legal, technical, or service changes; the version published with its update date is the current version.</p> }
        ]
      };
  return <LegalDocument {...common} {...copy} />;
}

export function CookiePolicyContent() {
  const { locale } = useLanguage();
  const common = shared[locale];
  const copy = locale === "es"
    ? {
        eyebrow: "Privacidad",
        title: "Política de cookies",
        introduction: "Esta política explica qué información guarda el sitio en tu dispositivo y qué mediciones técnicas utilizamos.",
        sections: [
          { title: "1. Tecnologías utilizadas", content: <p>Usamos almacenamiento local estrictamente necesario para recordar el idioma, el tema visual y la confirmación de este aviso. No utilizamos cookies publicitarias ni herramientas de seguimiento entre distintos sitios.</p> },
          { title: "2. Medición sin cookies", content: <p>Vercel Analytics y Speed Insights recopilan métricas agregadas de navegación, dispositivo y rendimiento para ayudarnos a mejorar el sitio. Estas herramientas no utilizan cookies de terceros ni crean perfiles publicitarios.</p> },
          { title: "3. Finalidad", content: <p>Las preferencias locales mantienen una experiencia consistente entre visitas. Las métricas agregadas permiten detectar problemas de velocidad, estabilidad y compatibilidad.</p> },
          { title: "4. Cómo administrar tus preferencias", content: <p>Puedes eliminar los datos locales desde la configuración de privacidad de tu navegador. Al hacerlo, el sitio volverá a solicitar tus preferencias en la próxima visita.</p> },
          { title: "5. Contacto", content: <p>Para consultas relacionadas con esta política, utiliza el formulario disponible en la sección de contacto e indica “Privacidad” en el asunto.</p> }
        ]
      }
    : {
        eyebrow: "Privacy",
        title: "Cookie policy",
        introduction: "This policy explains what information the website stores on your device and which technical measurements we use.",
        sections: [
          { title: "1. Technologies used", content: <p>We use strictly necessary local storage to remember your language, visual theme, and acknowledgment of this notice. We do not use advertising cookies or cross-site tracking tools.</p> },
          { title: "2. Cookie-free measurement", content: <p>Vercel Analytics and Speed Insights collect aggregated navigation, device, and performance metrics to help improve the website. These tools do not use third-party cookies or create advertising profiles.</p> },
          { title: "3. Purpose", content: <p>Local preferences maintain a consistent experience between visits. Aggregated metrics help identify speed, stability, and compatibility issues.</p> },
          { title: "4. Managing your preferences", content: <p>You can remove local data through your browser’s privacy settings. The website will request your preferences again on your next visit.</p> },
          { title: "5. Contact", content: <p>For questions about this policy, use the contact form and write “Privacy” in the subject.</p> }
        ]
      };
  return <LegalDocument {...common} {...copy} />;
}
