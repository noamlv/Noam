import NextLink from "next/link";
import { AnalysisCards } from "@/components/dataperu/analysis-cards";
import { Container, Eyebrow, Heading, Section } from "@/components/ui";
import { analysisLibrary } from "@/lib/analysis-library";
import { analysisPresentation } from "@/lib/analysis-presentation";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Análisis y dashboards", description: "Residuos, planeamiento territorial, discapacidad, deporte y archivo electoral: análisis abiertos con fuentes y límites visibles.", path: "/analisis" });

export default function AnalysisLibraryPage() {
  return <><Section><Container><Eyebrow>Biblioteca de análisis</Eyebrow><Heading as="h1" size="display" className="max-w-[15ch]">Explora los análisis por tema</Heading><p className="mt-7 max-w-2xl text-base leading-8 text-muted">Lee el análisis y sus gráficos en la misma página. Los temas de gestión y servicios públicos se reúnen en DataPerú; los archivos electorales tienen su propia sección.</p><nav aria-label="Tipos de análisis" className="mt-7 flex flex-wrap gap-5 text-sm font-medium text-rust"><a href="#dataperu">Datos del Perú ↓</a><a href="#electoral">Archivo electoral ↓</a></nav></Container></Section>{[{area:"dataperu", title:"Datos del Perú", href:"/dataperu/analisis", action:"Ver todos los análisis de DataPerú"},{area:"electoral", title:"Archivo electoral", href:"/electoral", action:"Ir a Electoral"}].map((group)=><Section key={group.area} id={group.area} className="border-t border-border bg-panel/40"><Container><div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><Heading size="xl">{group.title}</Heading><NextLink href={group.href} className="text-sm font-medium text-rust">{group.action} →</NextLink></div><AnalysisCards entries={analysisLibrary.filter((entry)=>analysisPresentation[entry.slug].area===group.area)}/></Container></Section>)}</>;
}
