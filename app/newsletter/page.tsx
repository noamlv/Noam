import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";
import { Container, Eyebrow, Heading, Section } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";
import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import { getLatestBriefEdition } from "@/lib/brief";

export const metadata = buildMetadata({
  title: "Brief NOAM",
  description: "Una selección editorial sobre gestión pública, territorio, elecciones, datos e inteligencia artificial aplicada.",
  path: "/newsletter"
});

export default async function NewsletterPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const latest = getLatestBriefEdition();
  const errorText = error === "rate" ? "Alcanzaste el límite temporal de intentos. Prueba más tarde." : error === "unavailable" ? "La suscripción no está disponible en este momento." : error === "validation" ? "Revisa el email, los temas y el consentimiento." : null;
  return (
    <>
      <Section className="pb-14 pt-14 md:pb-20 md:pt-20"><Container><div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end"><div><Eyebrow className="text-rust">Brief NOAM</Eyebrow><Heading as="h1" size="display" className="max-w-[12ch]">Una señal útil, no otra bandeja llena.</Heading></div><p className="max-w-md text-base leading-8 text-ink/68">Una selección breve de datos, herramientas y preguntas para quienes toman decisiones públicas, territoriales y organizacionales.</p></div></Container></Section>
      <section className="border-y border-border"><Container><div className="grid gap-px bg-border md:grid-cols-3">{[
        ["01", "Qué llega", "Un dato o herramienta, la lectura que permite y sus límites."],
        ["02", "Con qué frecuencia", "Una edición cuando exista algo que valga la atención, como máximo semanal."],
        ["03", "Qué no hacemos", "No compramos listas, no vendemos emails y no activamos la suscripción sin confirmación."]
      ].map(([number, title, text]) => <article key={number} className="min-h-[245px] bg-canvas p-6 md:p-8"><span className="font-mono text-[10px] text-rust">{number}</span><h2 className="mt-10 text-xl font-medium tracking-[-0.025em] text-ink">{title}</h2><p className="mt-4 text-sm leading-6 text-ink/62">{text}</p></article>)}</div></Container></section>
      <Section className="border-b border-border bg-panel/45"><Container><NextLink href={`/brief/${latest.slug}`} className="group grid gap-7 rounded-[1.25rem] border border-border bg-[#15211d] p-7 text-white transition-all hover:-translate-y-0.5 hover:shadow-subtle md:grid-cols-[0.28fr_1fr_auto] md:items-center md:p-9"><span className="font-mono text-[10px] text-[#d9a48f]">EDICIÓN {latest.issue}</span><span><span className="block text-2xl font-medium tracking-[-0.035em]">{latest.title}</span><span className="mt-3 block text-sm leading-6 text-white/55">Lee una edición completa antes de decidir si quieres recibir la siguiente.</span></span><span className="inline-flex items-center gap-2 text-xs font-medium text-white/75">Abrir edición <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span></NextLink></Container></Section>
      <Section><Container className="max-w-site"><div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><Eyebrow>Preferencias</Eyebrow><Heading size="xl">Elige las conversaciones que importan.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Puedes seleccionar una o varias líneas. La baja estará disponible en cada envío.</p></div><div>{errorText ? <p role="alert" className="mb-4 rounded-sm border border-rust/30 bg-rust/[0.06] px-4 py-3 text-sm text-rust">{errorText}</p> : null}<NewsletterSignup /></div></div></Container></Section>
    </>
  );
}
