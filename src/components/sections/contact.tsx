import Link from "next/link";
import { Mail, MapPinned, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { brand, whatsappHref } from "@/lib/site";

export function Contact() {
  return (
    <section id="contacto" className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Contacto</p>
          <h2 className="mt-4 text-3xl font-semibold text-innova-black sm:text-4xl">
            Conversemos sobre los requerimientos de su operacion.
          </h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            El formulario queda preparado para conectarse posteriormente a
            Formspree, Resend, Netlify Forms o una API propia.
          </p>

          <div className="mt-8 grid gap-4">
            <Link href={`mailto:${brand.email}`} className="flex items-center gap-3 text-sm font-medium text-innova-black">
              <Mail className="h-5 w-5 text-primary" />
              {brand.email}
            </Link>
            <Link href={whatsappHref} className="flex items-center gap-3 text-sm font-medium text-innova-black">
              <Phone className="h-5 w-5 text-primary" />
              WhatsApp comercial
            </Link>
            <div className="flex items-center gap-3 text-sm font-medium text-innova-black">
              <MapPinned className="h-5 w-5 text-primary" />
              Espacio reservado para direccion y mapa
            </div>
          </div>
        </div>

        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle>Solicitar informacion</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" name="name" placeholder="Nombre completo" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input id="company" name="company" placeholder="Nombre de empresa" />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo</Label>
                  <Input id="email" name="email" type="email" placeholder="correo@empresa.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefono</Label>
                  <Input id="phone" name="phone" placeholder="+51" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input id="subject" name="subject" placeholder="Consulta tecnica o comercial" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" name="message" placeholder="Cuente brevemente que necesita evaluar." className="min-h-32" />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="button" className="h-11">Enviar consulta</Button>
                <Button type="button" asChild variant="outline" className="h-11">
                  <Link href={whatsappHref}>
                    <MessageCircle /> WhatsApp
                  </Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
