import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { InstitutionalCaseCard } from "@/components/brand/institutional-case-card";
import { SolutionCard } from "@/components/content/solution-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { publicInstitutionTypes, serviceLines } from "@/lib/brand-content";
import { publicAnalysisAgenda } from "@/lib/analysis-service-catalog";
import { getSolutionsForMarket } from "@/lib/solutions";
import { getInstitutionalCases } from "@/lib/institutional-cases";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const publicSectorDescription = "Estudios, diagnósticos, evaluaciones, encuestas, observatorios e IA para municipalidades, gobiernos regionales y entidades nacionales del Perú.";

const publicSectorFaq = [
  {
    title: "¿Trabajan con municipalidades distritales pequeñas?",
    content: "Sí. Podemos comenzar con una pregunta prioritaria y un alcance acotado, usando información pública y los registros que la entidad ya tenga disponibles."
  },
  {
    title: "¿El alcance puede ser provincial, regional o nacional?",
    content: "Sí. El método, las fuentes y el equipo se ajustan a la escala territorial, la decisión institucional y el plazo del encargo."
  },
  {
    title: "¿Pueden ayudar a preparar términos de referencia?",
    content: "Sí. Podemos convertir una necesidad en objetivos, productos, metodología, criterios de calidad y un cronograma verificable antes de contratar."
  },
  {
    title: "¿Pueden integrar datos internos y confidenciales?",
    content: "Sí, después de acordar permisos, minimización de datos, controles de acceso, trazabilidad y condiciones de uso apropiadas para la institución."
  }
];

export const metadata = buildMetadata({
  title: "Consultoría de análisis de datos para el sector público",
  description: publicSectorDescription,
  path: "/sectors/public-sector"
});

export default async function PublicSectorPage() {
  const publicSolutions = getSolutionsForMarket("public");
  const institutionalCases = await getInstitutionalCases();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Sectores", path: "/sectors" }, { name: "Sector público", path: "/sectors/public-sector" }])} />
      <JsonLd data={serviceJsonLd({ name: "Consultoría de análisis de datos para el sector público", description: publicSectorDescription, url: `${siteConfig.url}/sectors/public-sector` })} />
      <JsonLd data={faqJsonLd(publicSectorFaq)} />
      <Section className="pb-16 pt-14 md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:gap-16">
            <div>
              <Eyebrow className="text-rust">Consultoría para el sector público</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[14ch]">Análisis de datos para gestionar cada territorio.</Heading>
              <p className="mt-7 max-w-2xl text-base leading-8 text-ink/68">Ayudamos a municipalidades distritales y provinciales, gobiernos regionales y entidades nacionales a comprender problemas, priorizar recursos, monitorear ejecución y evaluar resultados.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact?interest=sector-publico" className="rounded-full">Plantear una necesidad</Button>
                <Button href="/dataperu" variant="ghost" className="gap-2">Explorar DataPerú <ArrowRight className="h-4 w-4" /></Button>
              </div>
            </div>
            <div className="relative min-h-[380px] overflow-hidden rounded-[1.25rem] border border-border shadow-visual">
              <Image src="/images/noam-public-sector.jpg" alt="Equipo técnico revisando mapas territoriales en una ciudad peruana" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 46vw" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 text-white">
                <p className="max-w-sm text-sm font-medium leading-6">La evidencia se construye con datos, documentos y conocimiento del territorio.</p>
                <span className="hidden rounded-full border border-white/25 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] sm:block">Cobertura nacional</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.5fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Escalas de gobierno</Eyebrow>
              <Heading size="xl">Un punto de partida adecuado a cada institución.</Heading>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {publicInstitutionTypes.map((client, index) => (
                <NextLink key={client.slug} href={`/sectors/public-sector/${client.slug}`} className="group grid gap-4 py-7 md:grid-cols-[42px_0.55fr_1fr_auto]">
                  <span className="font-mono text-[10px] text-rust">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="text-xl font-medium tracking-[-0.03em] text-ink">{client.label}</h2>
                  <div>
                    <p className="text-sm leading-6 text-ink/65">{client.description}</p>
                    <p className="mt-3 flex items-center gap-2 text-xs font-medium text-rust"><Check className="h-3.5 w-3.5" />{client.entry}</p>
                  </div>
                  <ArrowRight className="hidden h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-rust md:block" />
                </NextLink>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Ámbitos de gestión</Eyebrow>
              <Heading size="xl">Rutas para una necesidad pública.</Heading>
              <p className="mt-5 text-sm leading-7 text-ink/65">Busca por ámbito de gestión. Cada ruta reúne método, evidencia, productos y una forma concreta de comenzar.</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {publicAnalysisAgenda.map((area, index) => (
                <NextLink key={area.slug} href={area.href} data-analytics-event="cta_click" data-analytics-target={`public-sector:agenda:${area.slug}`} className="group min-h-[210px] bg-canvas p-6 transition-colors hover:bg-panel">
                  <span className="font-mono text-[10px] text-rust">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="mt-7 text-xl font-medium tracking-[-0.03em] text-ink">{area.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/62">{area.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-rust">Explorar <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span>
                </NextLink>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Soluciones prioritarias</Eyebrow>
              <Heading size="xl">Puntos de partida para gestionar mejor.</Heading>
              <p className="mt-5 text-sm leading-7 text-ink/65">Cada solución parte de una decisión, define entregables configurables y deja capacidades que el equipo puede sostener.</p>
              <Button href="/solutions" variant="ghost" className="mt-6 gap-2">Ver todas las soluciones <ArrowRight className="h-4 w-4" /></Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {publicSolutions.map((solution) => <SolutionCard key={solution.slug} solution={solution} />)}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end">
            <div><Eyebrow>Experiencia pública</Eyebrow><Heading size="xl">Tres instituciones. Tres tipos de decisión.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/68 md:justify-self-end">Priorización de políticas, arquitectura de información y evaluación regional muestran cómo adaptamos el método al problema y a la institución.</p>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {institutionalCases.map((item, index) => <InstitutionalCaseCard key={item.slug} item={item} index={index} />)}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#ded9cc]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.44fr_1fr] lg:gap-20">
            <div><Eyebrow>Demostración abierta</Eyebrow><Heading size="xl">Datos públicos antes de pedir una reunión.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">DataPerú permite evaluar nuestra forma de integrar, documentar y presentar evidencia territorial.</p><Button href="/dataperu/municipios" variant="ghost" className="mt-7 gap-2">Explorar perfiles <ArrowRight className="h-4 w-4" /></Button></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-ink/15 bg-ink/15 sm:grid-cols-3">
              {[{ value: "1,891", label: "municipalidades" }, { value: "25", label: "departamentos" }, { value: "2", label: "capas sectoriales distritales" }].map((metric) => (
                <div key={metric.label} className="bg-[#ded9cc] p-6 md:p-8"><p className="text-4xl font-medium tracking-[-0.05em] text-ink md:text-5xl">{metric.value}</p><p className="mt-4 text-xs leading-5 text-ink/60">{metric.label}</p></div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#15211d] text-white">
        <Container>
          <Eyebrow className="text-white/55">Servicios relacionados</Eyebrow>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {serviceLines.map((service) => (
              <NextLink key={service.slug} href={`/services/${service.slug}`} className="group border-t border-white/20 pt-5">
                <span className="text-xs text-[#d9a48f]">{service.number}</span>
                <h2 className="mt-5 text-xl font-medium tracking-[-0.03em] text-white">{service.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/55">{service.promise}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs text-white/70">Ver servicio <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </NextLink>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Antes de comenzar</Eyebrow>
              <Heading size="xl">Una necesidad clara basta para la primera conversación.</Heading>
              <p className="mt-5 text-sm leading-7 text-ink/65">No es necesario llegar con una solución definida. Podemos ordenar la decisión, el territorio, la evidencia disponible y el resultado esperado.</p>
            </div>
            <Accordion items={publicSectorFaq} />
          </div>
          <div className="mt-16 flex flex-col justify-between gap-6 border-t border-border pt-8 md:flex-row md:items-center">
            <p className="max-w-2xl text-2xl font-medium leading-tight tracking-[-0.035em] text-ink md:text-3xl">Describe la decisión, el territorio y el plazo.</p>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact?interest=sector-publico" className="rounded-full">Plantear una necesidad</Button>
              <Button href="/diagnostico" variant="ghost">Preparar un brief</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
