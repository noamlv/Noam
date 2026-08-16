import { ArrowRight, Search } from "lucide-react";
import NextLink from "next/link";
import { Badge, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";
import { searchSite, getSearchIndex } from "@/lib/search";
import type { SearchKind } from "@/lib/search-core";

export const metadata = {
  ...buildMetadata({
    title: "Buscar en NOAM",
    description: "Encuentra estudios, indicadores, guías, soluciones, productos de datos y prácticas sectoriales de NOAM.",
    path: "/buscar"
  }),
  robots: { index: false, follow: true }
};

const kindOptions: Array<{ value: SearchKind | "all"; label: string }> = [
  { value: "all", label: "Todo" },
  { value: "evidence", label: "Evidencia" },
  { value: "solution", label: "Soluciones" },
  { value: "product", label: "Productos" },
  { value: "sector", label: "Sectores" }
];
const topicOptions = [
  { value: "all", label: "Todos los temas" },
  { value: "gobierno", label: "Gobierno" },
  { value: "inversion", label: "Inversión" },
  { value: "ia", label: "IA" }
] as const;
const suggestedSearches = ["municipalidades", "inversión pública", "encuestas", "elecciones 2026", "dashboard", "inteligencia artificial"];

interface SearchPageProps {
  searchParams: Promise<{ q?: string; type?: string; topic?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const kind = kindOptions.some((option) => option.value === params.type) ? (params.type as SearchKind | "all") : "all";
  const topic = topicOptions.some((option) => option.value === params.topic) ? (params.topic as "gobierno" | "inversion" | "ia" | "all") : "all";
  const [results, index] = await Promise.all([searchSite({ query, kind, topic, limit: 60 }), getSearchIndex()]);
  const hasFilters = Boolean(query || kind !== "all" || topic !== "all");

  return (
    <>
      <Section className="border-b border-border pb-14 pt-14 md:pb-20 md:pt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div><Eyebrow className="text-rust">Índice NOAM</Eyebrow><Heading as="h1" size="display" className="max-w-[13ch]">Encuentra una respuesta, una herramienta o un punto de partida.</Heading></div>
            <p className="text-sm leading-7 text-ink/68 md:text-base">Busca en {index.length} estudios, soluciones, productos y prácticas. Los resultados se ordenan por relevancia, no por popularidad.</p>
          </div>

          <form action="/buscar" method="get" role="search" className="mt-12 grid gap-3 rounded-[1.25rem] border border-ink/15 bg-panel p-4 shadow-subtle md:grid-cols-[1fr_190px_190px_auto] md:items-end md:p-5">
            <label className="grid gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              Buscar
              <span className="flex min-h-12 items-center gap-3 rounded-sm border border-border bg-canvas px-4 normal-case tracking-normal text-ink focus-within:border-ink">
                <Search className="h-4 w-4 text-muted" aria-hidden />
                <input name="q" defaultValue={query} placeholder="Ej. inversión municipal" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70" autoComplete="off" />
              </span>
            </label>
            <label className="grid gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Tipo<select name="type" defaultValue={kind} className="min-h-12 rounded-sm border border-border bg-canvas px-3 text-sm font-normal normal-case tracking-normal text-ink">{kindOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
            <label className="grid gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Tema<select name="topic" defaultValue={topic} className="min-h-12 rounded-sm border border-border bg-canvas px-3 text-sm font-normal normal-case tracking-normal text-ink">{topicOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
            <Button type="submit" className="min-h-12 rounded-full px-7">Buscar</Button>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs text-muted">Búsquedas sugeridas</span>
            {suggestedSearches.map((suggestion) => <NextLink key={suggestion} href={`/buscar?q=${encodeURIComponent(suggestion)}`} className="rounded-full border border-border bg-panel px-3 py-1.5 text-xs text-ink/70 transition-colors hover:border-border-strong hover:text-ink">{suggestion}</NextLink>)}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.3fr_1fr] lg:gap-16">
            <div><Eyebrow>Resultados</Eyebrow><Heading size="lg">{hasFilters ? `${results.length} coincidencias` : "Explora el índice"}</Heading><p className="mt-4 text-sm leading-6 text-ink/62">Refina por tipo o tema. La consulta no se almacena en nuestra analítica.</p>{hasFilters ? <Button href="/buscar" variant="ghost" className="mt-6 justify-start">Limpiar filtros</Button> : null}</div>
            <div className="divide-y divide-border border-y border-border">
              {results.length ? results.map((result) => (
                <NextLink key={result.id} href={result.href} className="group grid gap-4 py-7 transition-colors hover:bg-panel/45 sm:grid-cols-[140px_1fr_auto] sm:px-4">
                  <div className="flex flex-wrap content-start gap-2"><Badge>{result.label}</Badge>{result.topic ? <Badge>{result.topic === "inversion" ? "Inversión" : result.topic === "ia" ? "IA" : "Gobierno"}</Badge> : null}</div>
                  <div><h2 className="text-xl font-medium tracking-[-0.025em] text-ink">{result.title}</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-ink/62">{result.description}</p></div>
                  <ArrowRight className="hidden h-4 w-4 text-muted transition-transform group-hover:translate-x-1 sm:block" aria-hidden />
                </NextLink>
              )) : (
                <div className="py-14 text-center"><p className="text-lg font-medium text-ink">No encontramos una coincidencia precisa.</p><p className="mt-3 text-sm text-muted">Prueba con un territorio, problema, producto o tipo de decisión.</p><Button href="/contact" variant="secondary" className="mt-7">Cuéntanos qué necesitas</Button></div>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
