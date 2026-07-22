"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

import { getWhatsappHref } from "@/lib/site";
import { useLanguage } from "@/components/providers/language-provider";

export function FloatingWhatsApp() {
  const { locale } = useLanguage();
  return (
    <Link
      href={getWhatsappHref(locale)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={locale === "es" ? "Contactar por WhatsApp" : "Contact us on WhatsApp"}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition hover:-translate-y-0.5 hover:bg-[#1fbd59]"
    >
      <FaWhatsapp className="h-7 w-7" aria-hidden="true" />
    </Link>
  );
}
