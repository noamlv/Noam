import { ArrowRight, ExternalLink, FileCheck2, Gauge, Scale, ShieldCheck } from "lucide-react";
import NextLink from "next/link";
import { AiUseCaseLab } from "@/components/ai/ai-use-case-lab";
import { AiLabVisual } from "@/components/brand/ai-lab-visual";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, ogImagePath, serviceJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const faqItems = [
  { title: "¿El resultado certifica que un sistema es seguro o cumple la normativa?", content: "No. Es una heurística para ordenar una conversación inicial. No determina la clasificación jurídica, no certifica cumplimiento y no reemplaza evaluaciones técnicas, legales, éticas, de seguridad o protección de datos." },
  { title: "¿Los datos que ingreso se guardan?", content: "No. En esta versión los ajustes se procesan en tu navegador y no se envían ni persisten. La analítica de NOAM registra la visita y las acciones generales, pero no los valores de los controles." },
  { title: "¿Por qué oportunidad y riesgo no se combinan en un solo puntaje?", content: "Porque un caso puede ser muy valioso y, al mismo tiempo, tener consecuencias graves. Mantener las dimensiones separadas evita que un beneficio alto oculte una exposición que necesita controles o rediseño." },
  { title: "¿Qué sigue después de una evaluación inicial?", content: "Precisar el proceso, revisar obligaciones aplicables, auditar datos, definir responsables, construir un conjunto de prueba y acordar métricas y criterios de detención antes de desarrollar un piloto." },
  { title: "¿Puede utilizarse en empresas?", content: "Sí, como punto de partida. El contexto regulatorio, contractual, sectorial y de datos cambia; por ello el resultado debe adaptarse a la organización y al uso concreto." }
];

export const metadata = buildMetadata({
  title: "Laboratorio de casos de uso de IA",
  description: "Evalúa oportunidad, exposición y controles antes de iniciar un piloto de inteligencia artificial en una institución.",
  path: "/products/ai-governance-lab",
  image: ogImagePath("products", "ai-governance-lab")
});

export default function AiGovernanceLabPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Productos", path: "/products" }, { name: "Laboratorio de IA", path: "/products/ai-governance-lab" }])} />
      <JsonLd data={serviceJsonLd({ name: "Priorización y gobernanza de casos de uso de IA", description: "Diagnóstico, priorización, controles y medición para pilotos institucionales de inteligencia artificial.", url: `${siteConfig.url}/products/ai-governance-lab` })} />
      <JsonLd data={faqJsonLd(faqItems)} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "NOAM · Laboratorio de casos de uso de IA",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: "Herramienta abierta para explorar oportunidad, exposición y controles de un caso de uso de inteligencia artificial.",
        url: `${siteConfig.url}/products/ai-governance-lab`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "PEN" },
        provider: { "@type": "Organization", name: siteConfig.legalName }
      }} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1fr] lg:items-center lg:gap-20">
            <div>
              <Eyebrow className="text-[#d9a48f]">NOAM · IA responsable</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[12ch] text-white">Antes de construir IA, decide si vale la pena.</Heading>
              <p className="mt-7 max-w-xl text-base leading-8 text-white/66">Explora un caso de uso, separa oportunidad de exposición y documenta los controles mínimos que una institución debería discutir antes de un piloto.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#laboratorio" variant="secondary" className="rounded-full border-white bg-white text-ink">Evaluar un caso</Button>
                <Button href="/solutions/ia-procesos-publicos" variant="ghost" className="gap-2 !text-white/68 hover:!text-white">Conocer la solución <ArrowRight className="h-4 w-4" aria-hidden /></Button>
              </div>
            </div>
            <AiLabVisual />
          </div>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container>
          <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {[
              { icon: Gauge, number: "01", title: "Oportunidad", text: "Valor, proceso, datos y medición." },
              { icon: Scale, number: "02", title: "Exposición", text: "Consecuencia, sensibilidad y autonomía." },
              { icon: ShieldCheck, number: "03", title: "Controles", text: "Supervisión, trazabilidad y reversión." },
              { icon: FileCheck2, number: "04", title: "Decisión", text: "Pilotar, investigar, rediseñar o detener." }
            ].map((item) => {
              const Icon = item.icon;
              return <div key={item.number} className="min-w-0 py-7 sm:px-6 sm:first:pl-0 md:py-9"><div className="flex items-center justify-between"><Icon className="h-4 w-4 text-rust" aria-hidden /><span className="font-mono text-[9px] text-muted">{item.number}</span></div><p className="mt-6 text-base font-medium text-ink">{item.title}</p><p className="mt-2 text-xs leading-5 text-muted">{item.text}</p></div>;
            })}
          </div>
        </Container>
      </section>

      <Section id="laboratorio">
        <Container>
          <div className="mb-10 grid gap-8 md:grid-cols-[0.62fr_1fr] md:items-end">
            <div><Eyebrow>Herramienta abierta</Eyebrow><Heading size="xl">Evalúa la configuración, no una idea abstracta.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Un mismo caso cambia de exposición según los datos, la autonomía y los controles. Prueba los ejemplos y ajusta sus supuestos.</p>
          </div>
          <AiUseCaseLab />
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#ded9cc]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Qué produce un encargo real</Eyebrow><Heading size="xl">De una hipótesis a un piloto gobernable.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">La herramienta abre preguntas. El trabajo institucional debe convertirlas en evidencia, responsabilidades y decisiones verificables.</p></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-ink/15 bg-ink/15 sm:grid-cols-2">
              {[
                ["01", "Portafolio", "Inventario comparable de casos, propietarios, usuarios y resultados esperados."],
                ["02", "Evaluación", "Datos, exposición, obligaciones, controles y condiciones para abstenerse."],
                ["03", "Piloto", "Proceso acotado, conjunto de prueba, supervisión y métricas previas al desarrollo."],
                ["04", "Decisión", "Evidencia para escalar, corregir, limitar o detener, con trazabilidad del porqué."]
              ].map(([number, title, text]) => <article key={number} className="min-h-[230px] bg-[#ded9cc] p-6"><span className="font-mono text-[9px] text-rust">{number}</span><h2 className="mt-10 text-xl font-medium tracking-[-0.025em] text-ink">{title}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{text}</p></article>)}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#15211d] text-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><ShieldCheck className="h-5 w-5 text-[#d9a48f]" aria-hidden /><Eyebrow className="mt-6 text-[#d9a48f]">Referencias</Eyebrow><Heading size="xl" className="text-white">Un marco propio, no una norma inventada.</Heading><p className="mt-5 text-sm leading-7 text-white/58">La puntuación y las reglas de orientación pertenecen a NOAM. Se inspiran en enfoques de riesgo y supervisión, pero no sustituyen la clasificación u obligaciones aplicables en Perú.</p></div>
            <div className="divide-y divide-white/14 border-y border-white/14">
              {[
                { label: "Perú", title: "Reglamento de la Ley N.° 31814", text: "Marco nacional aprobado mediante el Decreto Supremo N.° 115-2025-PCM.", href: "https://www.gob.pe/institucion/pcm/normas-legales/7133522-115-2025-pcm" },
                { label: "NIST", title: "AI Risk Management Framework", text: "Marco voluntario para gobernar, mapear, medir y gestionar riesgos de IA.", href: "https://www.nist.gov/itl/ai-risk-management-framework" },
                { label: "UNESCO", title: "Recomendación sobre la ética de la IA", text: "Derechos humanos, transparencia, proporcionalidad y supervisión humana.", href: "https://www.unesco.org/en/articles/recommendation-ethics-artificial-intelligence" }
              ].map((source) => <a key={source.title} href={source.href} target="_blank" rel="noreferrer" className="group grid gap-3 py-5 sm:grid-cols-[80px_1fr_auto] sm:items-center"><span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#d9a48f]">{source.label}</span><span><span className="block text-sm font-medium text-white/82">{source.title}</span><span className="mt-1 block text-xs leading-5 text-white/55">{source.text}</span></span><ExternalLink className="h-4 w-4 text-white/30 transition-colors group-hover:text-[#d9a48f]" aria-hidden /></a>)}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container size="narrow">
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <Heading size="xl">Qué puede y qué no puede responder.</Heading>
          <Accordion items={faqItems} className="mt-8" />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Continuar</Eyebrow><Heading size="xl">Método, evidencia y siguientes pasos.</Heading></div>
            <div className="divide-y divide-border border-y border-border">
              {[
                ["Guía", "Gobernanza de IA para equipos directivos", "/toolkits/ai-governance-playbook"],
                ["Estudio", "Cómo medir un piloto de IA antes de escalar", "/insights/como-medir-piloto-ia-publica"],
                ["Arquitectura", "IA documental en entidades públicas", "/insights/ia-documental-entidades-publicas"],
                ["Solución", "IA para procesos públicos", "/solutions/ia-procesos-publicos"]
              ].map(([label, title, href]) => <NextLink key={href} href={href} className="group grid grid-cols-[90px_1fr_auto] items-center gap-4 py-5"><span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-rust">{label}</span><span className="text-sm font-medium text-ink">{title}</span><ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-rust" aria-hidden /></NextLink>)}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-0 pt-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-rust px-7 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><Eyebrow className="text-white/55">IA para la gestión</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Comienza por un proceso, una línea de base y una decisión que pueda medirse.</h2></div><Button href="/contact?interest=ia-procesos-publicos&from=/products/ai-governance-lab" analyticsEvent="cta_click" analyticsTarget="ai-lab:final-contact" variant="secondary" className="rounded-full border-white bg-white px-6 text-ink">Plantear el caso</Button></div>
          </div>
        </Container>
      </Section>
    </>
  );
}
