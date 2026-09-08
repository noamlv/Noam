import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { SolutionCard } from "@/components/content/solution-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { privateIndustries, serviceLines } from "@/lib/brand-content";
import { getSolutionsForMarket } from "@/lib/solutions";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Soluciones para empresas",
  description: "Inteligencia territorial, estudios, evaluación, sistemas de decisión e IA para empresas y organizaciones.",
  path: "/sectors/companies"
});

export default function CompaniesPage() {
  const privateSolutions = getSolutionsForMarket("private");

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Sectores", path: "/sectors" }, { name: "Empresas", path: "/sectors/companies" }])} />
      <Section className="pb-16 pt-14 md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:gap-16">
            <div>
              <Eyebrow className="text-rust">Empresas y organizaciones</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[14ch]">Inteligencia para invertir, operar y crecer en el territorio.</Heading>
              <p className="mt-7 max-w-2xl text-base leading-8 text-ink/68">
                Combinamos datos públicos, investigación y conocimiento institucional para decisiones donde el mercado, el Estado y el territorio se encuentran.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/estudios-mercado-inteligencia-territorial" className="rounded-full">Explorar estudios de mercado</Button>
                <Button href="/contact?interest=empresas" variant="ghost">Conversar sobre un proyecto</Button>
              </div>
            </div>
            <div className="relative min-h-[380px] overflow-hidden rounded-[1.25rem] border border-border shadow-visual">
              <Image src="/images/noam-private-sector.jpg" alt="Equipo técnico observando infraestructura y actividad productiva en un valle peruano" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 46vw" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="max-w-md text-sm font-medium leading-6">La oportunidad se evalúa en el territorio, no solo en una hoja de cálculo.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Soluciones prioritarias</Eyebrow>
              <Heading size="xl">El contexto público también es información de negocio.</Heading>
              <p className="mt-5 text-sm leading-7 text-ink/65">Puntos de partida para comparar territorios, escuchar mercados y anticipar cambios relevantes.</p>
              <Button href="/solutions" variant="ghost" className="mt-6 gap-2">Ver todas las soluciones <ArrowRight className="h-4 w-4" /></Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {privateSolutions.map((solution) => <SolutionCard key={solution.slug} solution={solution} />)}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Prácticas iniciales</Eyebrow>
              <Heading size="xl">Industrias donde el territorio cambia la decisión.</Heading>
              <p className="mt-5 text-sm leading-7 text-ink/65">No ofrecemos una receta genérica. Construimos cada práctica a partir de decisiones, fuentes, regulación y evidencia sectorial.</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {privateIndustries.map((industry, index) => (
                <NextLink key={industry.slug} href={`/sectors/companies/${industry.slug}`} className="group flex min-h-[280px] flex-col bg-canvas p-6 transition-colors hover:bg-panel">
                  <span className="font-mono text-[10px] text-rust">0{index + 1}</span>
                  <h2 className="mt-7 text-xl font-medium tracking-[-0.03em] text-ink">{industry.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/62">{industry.description}</p>
                  <ul className="mt-auto space-y-2 border-t border-border pt-5">
                    {industry.decisions.map((decision) => <li key={decision} className="flex items-center gap-2 text-xs text-ink/68"><Check className="h-3.5 w-3.5 text-rust" />{decision}</li>)}
                  </ul>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-rust">Explorar práctica <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                </NextLink>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Decisiones frecuentes</Eyebrow><Heading size="xl">Una pregunta empresarial, múltiples capas de contexto.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Integramos mercado, Estado, infraestructura, población y entorno social sin ocultar supuestos ni vacíos de información.</p></div>
            <div className="divide-y divide-border border-y border-border">
              {["¿En qué territorio conviene invertir o expandirse?", "¿Qué actores, riesgos y cambios debemos monitorear?", "¿Cómo medir percepción, experiencia o impacto?", "¿Qué información necesita el directorio para decidir?", "¿Qué proceso puede mejorar con automatización o IA?"].map((question, index) => (
                <div key={question} className="grid grid-cols-[38px_1fr] gap-4 py-6"><span className="font-mono text-[10px] text-rust">0{index + 1}</span><p className="text-lg font-medium leading-snug tracking-[-0.02em] text-ink">{question}</p></div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#15211d] text-white">
        <Container>
          <Eyebrow className="text-white/55">Capacidades</Eyebrow>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {serviceLines.map((service) => (
              <NextLink key={service.slug} href={`/services/${service.slug}`} className="group border-t border-white/20 pt-5">
                <h2 className="text-xl font-medium tracking-[-0.03em] text-white">{service.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/55">{service.promise}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs text-white/70">Ver servicio <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </NextLink>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
