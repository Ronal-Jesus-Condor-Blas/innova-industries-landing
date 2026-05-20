import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { whatsappHref } from "@/lib/site";

export function FloatingWhatsApp() {
  return (
    <Link
      href={whatsappHref}
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90"
    >
      <MessageCircle className="h-6 w-6" />
    </Link>
  );
}
