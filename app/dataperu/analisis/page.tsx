import NextLink from "next/link";
import { AnalysisCards } from "@/components/dataperu/analysis-cards";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, Eyebrow, Heading, Section } from "@/components/ui";
import { analysisLibrary } from "@/lib/analysis-library";
import { analysisPresentation } from "@/lib/analysis-presentation";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "DataPerú: análisis por tema", description: "Lee análisis de residuos, planeamiento territorial, discapacidad y deporte. Consulta gráficos, fuentes y periodos sin salir de cada página.", path: "/dataperu/analisis" });

export default function DataPeruAnalysisPage() {
  const entries = analysisLibrary.filter((entry) => analysisPresentation[entry.slug].area === "dataperu");
  return <>
    <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "DataPerú", path: "/dataperu" }, { name: "Análisis por tema", path: "/dataperu/analisis" }])} />
    <Section><Container><NextLink href="/dataperu" className="text-xs text-rust">← DataPerú</NextLink><Eyebrow className="mt-10">Datos y problemas del Perú</Eyebrow><Heading as="h1" size="display" className="max-w-[15ch]">Análisis por tema</Heading><p className="mt-7 max-w-2xl text-lg leading-8 text-muted">Elige un tema para recorrer sus hallazgos, gráficos y tablas. Cada análisis incluye el periodo de los datos, sus fuentes y una descarga de los valores agrupados.</p></Container></Section>
    <Section className="border-y border-border bg-panel/40"><Container><AnalysisCards entries={entries} /></Container></Section>
    <Section><Container><div className="grid gap-8 border-t border-border pt-8 md:grid-cols-2"><div><Heading size="lg">¿Buscas datos de un lugar?</Heading><p className="mt-4 text-sm leading-7 text-muted">También puedes consultar los perfiles municipales y los problemas identificados en cada departamento.</p><div className="mt-5 flex flex-wrap gap-5 text-sm font-medium text-rust"><NextLink href="/dataperu/municipios">Buscar municipio →</NextLink><NextLink href="/dataperu/departamentos">Elegir departamento →</NextLink></div></div><div><Heading size="lg">Elecciones y opinión pública</Heading><p className="mt-4 text-sm leading-7 text-muted">Los planes de gobierno, las encuestas y el archivo del conteo electoral están en su propia sección.</p><NextLink href="/electoral" className="mt-5 inline-block text-sm font-medium text-rust">Ir a Electoral →</NextLink></div></div></Container></Section>
  </>;
}
