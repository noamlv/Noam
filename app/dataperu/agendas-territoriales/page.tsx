import { ArrowRight, CircleAlert, Database, MapPinned, Search } from "lucide-react";
import { TerritorialAgendaExplorer } from "@/components/dataperu/territorial-agenda-explorer";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { departmentResearch } from "@/lib/department-research";
import { breadcrumbJsonLd, buildMetadata, datasetJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const path = "/dataperu/agendas-territoriales";
const problemCount = departmentResearch.reduce((total, item) => total + item.problems.length, 0);
const opportunityCount = departmentResearch.reduce((total, item) => total + item.opportunities.length, 0);
const latestReview = departmentResearch.reduce((latest, item) => item.researchDate > latest ? item.researchDate : latest, "2026-01-01");

export const metadata = buildMetadata({
  title: "Problemas y oportunidades por departamento del Perú",
  description: "Explora agendas territoriales de los 25 departamentos del Perú por problema público, población afectada, decisión, oportunidad y respuesta analítica posible.",
  path
});

export default function TerritorialAgendasPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "DataPerú", path: "/dataperu" },
        { name: "Agendas territoriales", path }
      ])} />
      <JsonLd data={datasetJsonLd({
        name: "Agendas territoriales de los departamentos del Perú",
        description: "Síntesis editorial de problemas, poblaciones afectadas, decisiones públicas, oportunidades e intervenciones posibles para los 25 departamentos.",
        url: `${siteConfig.url}${path}`,
        datePublished: latestReview
      })} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.88fr_0.54fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow className="text-[#d9a48f]">DataPerú · Agendas territoriales</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[13ch] text-white">El mismo problema no se resuelve igual en todo el Perú.</Heading>
            </div>
            <div>
              <p className="text-base leading-8 text-white/66">Busca un tema, una población o una actividad y descubre cómo cambia entre departamentos. Cada señal conecta contexto, decisión y una respuesta analítica posible.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="#explorador" variant="secondary" className="rounded-full border-white bg-white text-ink">Explorar agendas</Button>
                <Button href="/dataperu/departamentos" variant="ghost" className="gap-2 !text-white/68 hover:!text-white">Ver atlas <ArrowRight className="h-4 w-4" aria-hidden /></Button>
              </div>
            </div>
          </div>

          <div className="mt-14 grid overflow-hidden rounded-md border border-white/16 bg-white/10 sm:grid-cols-3">
            {[
              [departmentResearch.length, "departamentos", "Cobertura nacional"],
              [problemCount, "problemas para investigar", "Cuatro por territorio"],
              [opportunityCount, "oportunidades por validar", "Tres por territorio"]
            ].map(([value, label, note]) => (
              <div key={String(label)} className="border-b border-white/12 p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                <p className="text-4xl font-medium tracking-[-0.05em] text-white">{value}</p>
                <p className="mt-2 text-sm font-medium text-white/78">{label}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/36">{note}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section className="border-b border-border bg-panel/45">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
            {[
              [Search, "Buscar una señal", "Usa palabras como agua, empleo, minería, seguridad, turismo o conectividad."],
              [MapPinned, "Cambiar de territorio", "Filtra por departamento y abre su agenda completa, datos municipales y cartera visible."],
              [CircleAlert, "Conservar la incertidumbre", "Las agendas son hipótesis editoriales en validación; no sustituyen diagnóstico ni evidencia local."]
            ].map(([Icon, title, text]) => {
              const Component = Icon as typeof Search;
              return <article key={String(title)} className="min-h-[230px] bg-panel p-6"><Component className="h-5 w-5 text-rust" aria-hidden /><h2 className="mt-10 text-xl font-medium tracking-[-0.025em] text-ink">{String(title)}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{String(text)}</p></article>;
            })}
          </div>
        </Container>
      </Section>

      <Section id="explorador">
        <Container>
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.48fr_1fr] lg:items-end lg:gap-20">
            <div><Database className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Explorador</Eyebrow><Heading size="xl">Empieza por la pregunta que importa.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 lg:justify-self-end">Los textos sintetizan investigación departamental y macroregional revisada en 2026. No publican puntuaciones ni convierten una hipótesis en hecho; cada perfil muestra confianza, procedencia y datos pendientes.</p>
          </div>
          <TerritorialAgendaExplorer research={departmentResearch} />
        </Container>
      </Section>

      <Section className="bg-[#356775] text-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><Eyebrow className="text-white/56">De la señal al encargo</Eyebrow><Heading size="xl" className="mt-4 max-w-[16ch] text-white">Convierte una pregunta territorial en evidencia para decidir.</Heading></div>
            <div className="flex flex-wrap gap-3"><Button href="/diagnostico?from=/dataperu/agendas-territoriales" variant="secondary" className="rounded-full border-white bg-white text-ink">Diseñar un alcance</Button><Button href="/contact?interest=dataperu&from=/dataperu/agendas-territoriales" variant="ghost" className="!text-white/72 hover:!text-white">Plantear un análisis</Button></div>
          </div>
        </Container>
      </Section>
    </>
  );
}
