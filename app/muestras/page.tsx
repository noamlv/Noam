import { ArrowRight, FileCheck2, Scale, SearchCheck } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { DeliverablePreview } from "@/components/commercial/deliverable-preview";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { deliverableSamples } from "@/lib/deliverable-samples";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Muestras de entregables",
  description: "Ocho muestras demostrativas para examinar cómo NOAM estructura diagnósticos, evaluaciones, observatorios, IA e inteligencia territorial.",
  path: "/muestras",
  image: "/og/muestras/diagnostico-agenda-territorial"
});

const standards = [
  { icon: SearchCheck, title: "Forma examinable", text: "Pregunta, método, módulos y producto aparecen antes de hablar de una propuesta." },
  { icon: Scale, title: "Límites visibles", text: "La profundidad final depende de territorio, fuentes, acceso, campo y condiciones del encargo." },
  { icon: FileCheck2, title: "Sin casos inventados", text: "Son arquitecturas demostrativas. No representan clientes, contratos ni resultados reales." }
];

export default function SamplesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Muestras", path: "/muestras" }])} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.48fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow className="reveal text-[#d9a48f]">Biblioteca comercial</Eyebrow>
              <Heading as="h1" size="display" className="reveal reveal-delay-1 max-w-[13ch] text-white">Mira la forma del trabajo antes de contratarlo.</Heading>
            </div>
            <div className="reveal reveal-delay-2">
              <p className="text-base leading-8 text-white/68">Ocho muestras enseñan cómo una pregunta se convierte en evidencia, un artefacto de decisión y una capacidad transferible.</p>
              <p className="mt-5 border-l border-[#d9a48f]/50 pl-4 text-xs leading-6 text-white/48">Muestras demostrativas. No corresponden a clientes ni encargos reales.</p>
            </div>
          </div>

          <div className="relative mt-16 overflow-hidden rounded-lg border border-white/12 md:min-h-[440px]">
            <Image src="/images/noam-public-sector.jpg" alt="Equipo técnico público trabajando con evidencia territorial" fill priority sizes="(max-width: 768px) 100vw, 1180px" className="object-cover object-center opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#15211d] via-[#15211d]/68 to-transparent" />
            <div className="relative flex min-h-[390px] max-w-xl flex-col justify-end p-7 md:min-h-[440px] md:p-12">
              <span className="font-mono text-[10px] text-[#d9a48f]">MUESTRA · NO PROMESA VACÍA</span>
              <p className="mt-5 text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-white md:text-5xl">El entregable comienza por la decisión que debe mejorar.</p>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.5fr_1fr] md:items-end">
            <div><Eyebrow>Ocho puntos de partida</Eyebrow><Heading size="xl">Del diagnóstico a la operación.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Cada ficha expone preguntas, módulos, cronograma, insumos, controles y entregables. El alcance contractual se diseña después de entender el contexto.</p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {deliverableSamples.map((sample, index) => (
              <NextLink key={sample.slug} href={`/muestras/${sample.slug}`} className={`group overflow-hidden rounded-md border border-border bg-panel transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-subtle ${index === deliverableSamples.length - 1 && deliverableSamples.length % 2 === 1 ? "lg:col-span-2 lg:grid lg:grid-cols-2" : ""}`}>
                <DeliverablePreview sample={sample} compact className="rounded-none border-0 shadow-none" />
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between gap-4"><span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-rust">{sample.market}</span><span className="font-mono text-[10px] text-muted">{sample.duration}</span></div>
                  <h2 className="mt-8 max-w-xl text-2xl font-medium leading-tight tracking-[-0.035em] text-ink md:text-3xl">{sample.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-ink/62">{sample.promise}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-xs font-medium text-rust">Examinar muestra <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span>
                </div>
              </NextLink>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#ded9cc]">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-md border border-ink/14 bg-ink/14 md:grid-cols-3">
            {standards.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="min-h-[275px] bg-[#ded9cc] p-6 md:p-8">
                <div className="flex items-center justify-between"><Icon className="h-5 w-5 text-rust" aria-hidden /><span className="font-mono text-[10px] text-ink/35">0{index + 1}</span></div>
                <h2 className="mt-16 text-xl font-medium tracking-[-0.025em] text-ink">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink/62">{text}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-rust px-6 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div><Eyebrow className="text-white/55">Tu contexto</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Ahora convierte una necesidad real en un alcance discutible.</h2></div>
              <Button href="/diagnostico?from=/muestras" analyticsEvent="cta_click" analyticsTarget="samples:scope-builder" variant="secondary" className="rounded-full border-white bg-white px-6 text-ink">Diseñar un alcance</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
