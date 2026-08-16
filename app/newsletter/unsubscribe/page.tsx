import type { Metadata } from "next";
import { Button, Container, Section } from "@/components/ui";
import { newsletterTokenSchema } from "@/lib/newsletter-validation";
import { unsubscribeNewsletterAction } from "../actions";

export const metadata: Metadata = { title: "Cancelar Brief NOAM", robots: { index: false, follow: false } };

export default async function UnsubscribeNewsletterPage({ searchParams }: { searchParams: Promise<{ token?: string; status?: string }> }) {
  const { token, status } = await searchParams;
  if (status === "done") return <Section className="pt-20"><Container className="max-w-site-sm text-center"><h1 className="text-5xl font-medium tracking-[-0.04em] text-ink">Suscripción cancelada.</h1><p className="mt-5 text-sm leading-7 text-ink/68">No enviaremos nuevas ediciones a esta dirección.</p><Button href="/" className="mt-8">Volver al inicio</Button></Container></Section>;
  const valid = newsletterTokenSchema.safeParse(token).success;
  if (!valid || status === "invalid") return <Section className="pt-20"><Container className="max-w-site-sm text-center"><h1 className="text-4xl font-medium tracking-[-0.04em] text-ink">El enlace no es válido o la baja ya fue procesada.</h1><Button href="/contact" className="mt-8">Contactar a NOAM</Button></Container></Section>;
  return <Section className="pt-20"><Container className="max-w-site-sm text-center"><h1 className="text-5xl font-medium tracking-[-0.04em] text-ink">¿Cancelar la suscripción?</h1><p className="mt-5 text-sm leading-7 text-ink/68">La dirección quedará inactiva inmediatamente.</p><form action={unsubscribeNewsletterAction} className="mt-8"><input type="hidden" name="token" value={token} /><Button type="submit" variant="secondary">Confirmar baja</Button></form></Container></Section>;
}
