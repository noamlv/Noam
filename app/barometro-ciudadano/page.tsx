import { ArrowRight } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const path = "/barometro-ciudadano";
export const metadata = buildMetadata({
  title: "Barómetro ciudadano: encuestas y opinión pública",
  description: "Consulta los análisis de encuestas publicados por NOAM, sus resultados, fechas y metodología. Primer análisis disponible: IMASEN, enero de 2026.",
  path
});

export default function CitizenBarometerPage() {
  return <>
    <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Barómetro ciudadano", path }])} />
    <Section><Container>
      <Eyebrow>Encuestas y opinión pública</Eyebrow>
      <Heading as="h1" size="display" className="max-w-[16ch]">Barómetro ciudadano</Heading>
      <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">Un espacio para conocer lo que dicen las encuestas sobre el país y entender sus resultados.</p>
    </Container></Section>
    <Section className="border-y border-border bg-panel/40"><Container>
      <Eyebrow>Análisis disponible</Eyebrow>
      <article className="mt-8 grid gap-8 md:grid-cols-2 md:gap-16">
        <div>
          <p className="text-sm text-muted">Enero de 2026 · Encuesta de IMASEN</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight">Opinión ciudadana y contexto electoral</h2>
          <p className="mt-5 text-base leading-7 text-muted">Análisis de una encuesta online por cuotas con 1.300 entrevistas. Puedes consultar los resultados, las diferencias entre grupos y la ficha metodológica.</p>
          <Button href="/electoral/barometro-enero-2026" className="mt-7 gap-2">Leer el análisis <ArrowRight className="h-4 w-4" aria-hidden /></Button>
        </div>
        <div className="border-l border-border pl-6 text-sm leading-7 text-muted">
          <h3 className="font-medium text-ink">Antes de interpretar los resultados</h3>
          <p className="mt-4">El trabajo de campo se realizó del 27 al 31 de enero de 2026. Los resultados corresponden a ese estudio y no describen la opinión actual ni anticipan resultados electorales.</p>
          <p className="mt-4">La encuesta es de IMASEN; el análisis publicado es de Noam López. Se presentan resultados agrupados, sin datos individuales de las personas entrevistadas.</p>
          <NextLink href="/electoral/barometro-enero-2026" className="mt-5 inline-block font-medium text-rust hover:text-ink">Consultar la metodología</NextLink>
        </div>
      </article>
    </Container></Section>
    <Section><Container>
      <Heading size="xl">¿Necesitas conocer la opinión de vecinos, usuarios o clientes?</Heading>
      <p className="mt-5 max-w-2xl text-base leading-7 text-muted">Podemos ayudarte a preparar una encuesta o analizar los datos que ya tienes.</p>
      <div className="mt-7 flex flex-wrap gap-4"><Button href="/encuestas-estudios-opinion" variant="secondary">Ver el servicio de encuestas</Button><Button href="/contact?interest=encuestas-escucha-ciudadana" variant="ghost">Consultar con NOAM</Button></div>
    </Container></Section>
  </>;
}
