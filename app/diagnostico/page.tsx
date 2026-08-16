import { ArrowDown, FileCheck2, LockKeyhole, Scale } from "lucide-react";
import { ScopeBuilder } from "@/components/commercial/scope-builder";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata, ogImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const path = "/diagnostico";

export const metadata = buildMetadata({
  title: "Diseñador de alcance para estudios y sistemas",
  description: "Convierte una necesidad institucional en un brief inicial de diagnóstico, evaluación, observatorio, IA o transición, sin enviar datos.",
  path,
  image: ogImagePath("products", "scope-builder")
});

export default function ScopeBuilderPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Diseñador de alcance", path }])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "Diseñador de alcance NOAM", description: "Herramienta para estructurar un brief inicial de estudio, evaluación, sistema de decisión, IA o transición.", url: `${siteConfig.url}${path}`, applicationCategory: "BusinessApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "PEN" }, provider: { "@type": "Organization", name: siteConfig.legalName, url: siteConfig.url } }} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1fr] lg:items-end lg:gap-20">
            <div><Eyebrow className="text-[#d9a48f]">Herramienta abierta · No almacena datos</Eyebrow><Heading as="h1" size="display" className="max-w-[12ch] text-white">Convierte una necesidad en un punto de partida.</Heading><p className="mt-7 max-w-xl text-base leading-8 text-white/65">Selecciona organización, decisión, evidencia y horizonte. Obtendrás una recomendación de alcance para discutir internamente o preparar una conversación con NOAM.</p><a href="#construir" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-medium text-white/75 transition-colors hover:border-white/45 hover:text-white">Diseñar el alcance <ArrowDown className="h-4 w-4" aria-hidden /></a></div>
            <div className="relative min-h-[420px] overflow-hidden rounded-[1.25rem] border border-white/14 bg-[#1a2b25] p-6 md:p-8"><div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:48px_48px]" /><div className="relative flex items-center justify-between border-b border-white/14 pb-5"><span className="text-[9px] uppercase tracking-[0.16em] text-[#d9a48f]">Arquitectura de decisión</span><span className="font-mono text-[9px] text-white/35">SCOPE · 01</span></div><div className="relative mt-8 grid grid-cols-2 gap-3">{[["01", "Organización"], ["02", "Necesidad"], ["03", "Evidencia"], ["04", "Horizonte"]].map(([number, label], index) => <div key={number} className={`min-h-[105px] rounded-sm border p-4 ${index === 1 ? "border-[#d9a48f]/55 bg-[#d9a48f]/10" : "border-white/14 bg-white/[0.025]"}`}><span className="font-mono text-[9px] text-[#d9a48f]">{number}</span><p className="mt-7 text-sm font-medium text-white/76">{label}</p></div>)}</div><div className="relative mt-4 rounded-sm border border-[#d9a48f]/45 bg-[#d9a48f]/[0.08] p-5"><div className="flex items-center justify-between"><span className="text-[9px] uppercase tracking-[0.14em] text-[#d9a48f]">Resultado</span><FileCheck2 className="h-4 w-4 text-[#d9a48f]" aria-hidden /></div><p className="mt-4 text-xl font-medium tracking-[-0.025em] text-white">Un brief que puede discutirse.</p><p className="mt-2 text-xs leading-5 text-white/55">Decisión · Fases · Entregables · Condición crítica</p></div></div>
          </div>
        </Container>
      </section>

      <Section id="construir">
        <Container>
          <div className="mb-12 grid gap-8 md:grid-cols-[0.46fr_1fr] md:items-end"><div><Eyebrow>Cuatro decisiones</Eyebrow><Heading size="xl">Diseña un alcance inicial.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65">La recomendación cambia con cada selección. No estima honorarios porque territorio, fuentes, trabajo de campo, seguridad y profundidad deben revisarse antes.</p></div>
          <ScopeBuilder />
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#ded9cc]"><Container><div className="grid gap-px overflow-hidden rounded-md border border-ink/14 bg-ink/14 md:grid-cols-3">{[
        [LockKeyhole, "Privado por diseño", "Las selecciones permanecen en tu navegador. Descargar el brief tampoco envía información a NOAM."],
        [Scale, "Orientación, no cotización", "El resultado propone una lógica de trabajo. No fija precio, duración contractual ni resultados garantizados."],
        [FileCheck2, "Listo para conversar", "El archivo Markdown puede editarse, circular internamente y servir como agenda para una primera reunión."]
      ].map(([Icon, title, text]) => { const Component = Icon as typeof LockKeyhole; return <article key={String(title)} className="min-h-[255px] bg-[#ded9cc] p-6"><Component className="h-5 w-5 text-rust" aria-hidden /><h2 className="mt-12 text-xl font-medium tracking-[-0.025em] text-ink">{String(title)}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{String(text)}</p></article>; })}</div></Container></Section>
    </>
  );
}
