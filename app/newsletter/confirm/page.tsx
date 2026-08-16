import type { Metadata } from "next";
import { Button, Container, Section } from "@/components/ui";
import { newsletterTokenSchema } from "@/lib/newsletter-validation";
import { confirmNewsletterAction } from "../actions";

export const metadata: Metadata = { title: "Confirmar Brief NOAM", robots: { index: false, follow: false } };

export default async function ConfirmNewsletterPage({ searchParams }: { searchParams: Promise<{ token?: string; status?: string }> }) {
  const { token, status } = await searchParams;
  if (status === "confirmed") return <Section className="pt-20"><Container className="max-w-site-sm text-center"><p className="mb-3 text-xs uppercase tracking-[0.18em] text-rust">Suscripción confirmada</p><h1 className="text-5xl font-medium tracking-[-0.04em] text-ink">Bienvenido al Brief NOAM.</h1><p className="mt-5 text-sm leading-7 text-ink/68">La dirección quedó activa. Cada envío incluirá una opción de baja.</p><Button href="/evidence" className="mt-8">Explorar evidencia</Button></Container></Section>;
  const valid = newsletterTokenSchema.safeParse(token).success;
  if (!valid || status === "invalid") return <Section className="pt-20"><Container className="max-w-site-sm text-center"><h1 className="text-4xl font-medium tracking-[-0.04em] text-ink">El enlace no es válido o ya fue utilizado.</h1><Button href="/newsletter" className="mt-8">Solicitar un nuevo enlace</Button></Container></Section>;
  return <Section className="pt-20"><Container className="max-w-site-sm text-center"><p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">Último paso</p><h1 className="text-5xl font-medium tracking-[-0.04em] text-ink">Confirma que quieres recibir el Brief NOAM.</h1><p className="mt-5 text-sm leading-7 text-ink/68">Esta acción activa la dirección y registra la fecha de confirmación.</p><form action={confirmNewsletterAction} className="mt-8"><input type="hidden" name="token" value={token} /><Button type="submit">Confirmar suscripción</Button></form></Container></Section>;
}
