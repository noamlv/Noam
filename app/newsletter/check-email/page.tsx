import type { Metadata } from "next";
import { Button, Container, Section } from "@/components/ui";

export const metadata: Metadata = { title: "Revisa tu email | NOAM", robots: { index: false, follow: false } };

export default function CheckEmailPage() {
  return <Section className="pt-20"><Container className="max-w-site-sm text-center"><p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">Confirmación requerida</p><h1 className="text-4xl font-medium tracking-[-0.04em] text-ink md:text-5xl">Revisa tu bandeja de entrada.</h1><p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-ink/68">Si la dirección requiere confirmación y el envío está disponible, recibirás un enlace. La suscripción sólo se activa después de confirmarla explícitamente.</p><div className="mt-8 flex justify-center gap-3"><Button href="/evidence">Explorar evidencia</Button><Button href="/" variant="secondary">Volver al inicio</Button></div></Container></Section>;
}
