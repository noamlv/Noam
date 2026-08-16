import { Bot, Database, FileCheck2, RefreshCw, Scale, SearchCheck } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Transparencia editorial y de datos",
  description: "Cómo NOAM selecciona fuentes, transforma datos, valida resultados, usa IA y corrige sus publicaciones.",
  path: "/transparency"
});

const evidenceLevels = [
  { code: "01", title: "Fuente observada", text: "Dato, norma, documento o declaración identificable. Mostramos procedencia, periodo y cobertura cuando son relevantes." },
  { code: "02", title: "Indicador derivado", text: "Cálculo producido a partir de una fuente. Debe incluir definición, denominador, tratamiento de faltantes y transformación." },
  { code: "03", title: "Modelo o estimación", text: "Resultado que depende de supuestos, reglas o entrenamiento. Se presenta con alcance, validación y error conocido." },
  { code: "04", title: "Demostración ilustrativa", text: "Interfaz o escenario diseñado para explicar una capacidad. Se identifica como demo y no se confunde con evidencia real." },
  { code: "05", title: "Escena editorial", text: "Imagen creada para representar un tipo de trabajo o contexto. No documenta un cliente, un encargo ni un resultado real y se identifica como representación." }
];

const protocol = [
  ["Pregunta", "Definimos la decisión o fenómeno que la publicación busca aclarar."],
  ["Fuente", "Registramos origen, versión, fecha, licencia o restricción de uso."],
  ["Transformación", "Conservamos scripts, reglas, unidades y correspondencias territoriales."],
  ["Control", "Reconciliamos totales, cobertura, rangos, duplicados y valores faltantes."],
  ["Lectura", "Separamos observación, inferencia, recomendación y opinión editorial."],
  ["Límites", "Declaramos lo que el resultado no permite afirmar y cuándo deja de estar vigente."],
  ["Actualización", "Asignamos fecha, responsable y ruta de corrección o sustitución." ]
];

export default function TransparencyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Transparencia", path: "/transparency" }])} />
      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container><div className="grid gap-14 lg:grid-cols-[0.9fr_1fr] lg:items-end lg:gap-20"><div><Eyebrow className="text-[#d9a48f]">Estándar NOAM</Eyebrow><Heading as="h1" size="display" className="max-w-[12ch] text-white">La confianza también se diseña.</Heading></div><div><p className="max-w-xl text-base leading-8 text-white/68">Publicamos para que otra persona pueda entender de dónde sale un resultado, cómo se construyó, qué límites tiene y cómo solicitar una corrección.</p><div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-sm bg-white/12">{[["Fuente", "visible"], ["Método", "trazable"], ["Límite", "explícito"]].map(([label, value]) => <div key={label} className="bg-[#15211d] p-4"><p className="text-[9px] uppercase tracking-[0.14em] text-white/36">{label}</p><p className="mt-3 text-lg font-medium text-white">{value}</p></div>)}</div></div></div></Container>
      </section>

      <Section><Container><div className="grid gap-10 lg:grid-cols-[0.36fr_1fr] lg:gap-20"><div><Database className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Niveles de evidencia</Eyebrow><Heading size="xl">No todo número afirma lo mismo.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">El diseño visual no debe borrar la diferencia entre un dato observado, una transformación, una estimación y una demostración.</p></div><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">{evidenceLevels.map((level) => <article key={level.code} className="min-h-[240px] bg-panel p-6"><span className="font-mono text-[10px] text-rust">{level.code}</span><h2 className="mt-10 text-xl font-medium tracking-[-0.03em] text-ink">{level.title}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{level.text}</p></article>)}</div></div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container><div className="grid gap-10 lg:grid-cols-[0.36fr_1fr] lg:gap-20"><div><SearchCheck className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Protocolo de publicación</Eyebrow><Heading size="xl">Siete controles antes de publicar.</Heading></div><div className="divide-y divide-border border-y border-border">{protocol.map(([title, text], index) => <article key={title} className="grid gap-4 py-6 sm:grid-cols-[44px_0.3fr_1fr]"><span className="font-mono text-[10px] text-rust">{String(index + 1).padStart(2, "0")}</span><h2 className="text-lg font-medium text-ink">{title}</h2><p className="text-sm leading-6 text-ink/65">{text}</p></article>)}</div></div></Container></Section>

      <Section><Container><div className="grid gap-4 lg:grid-cols-3">{[
        { icon: Bot, eyebrow: "IA", title: "Asistencia, no autoría automática", text: "Podemos usar IA para explorar, clasificar, programar, editar o producir escenas editoriales. Las fuentes, cifras, decisiones metodológicas y afirmaciones materiales requieren revisión humana. No inventamos clientes, resultados, testimonios ni citas." },
        { icon: Scale, eyebrow: "Independencia", title: "Interés y patrocinio visibles", text: "Identificamos encargos, colaboraciones o patrocinios cuando afectan la lectura. Un servicio privado no convierte su resultado en posición institucional de una fuente pública ni en respaldo electoral." },
        { icon: RefreshCw, eyebrow: "Correcciones", title: "Cambiar con trazabilidad", text: `Corregimos errores materiales, registramos fecha o versión cuando corresponde y preservamos URLs estables. Las observaciones pueden enviarse a ${siteConfig.email}.` }
      ].map(({ icon: Icon, eyebrow, title, text }) => <article key={title} className="rounded-md border border-border bg-panel p-7"><Icon className="h-5 w-5 text-rust" aria-hidden /><p className="mt-10 text-[9px] font-semibold uppercase tracking-[0.15em] text-muted">{eyebrow}</p><h2 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-ink">{title}</h2><p className="mt-4 text-sm leading-7 text-ink/64">{text}</p></article>)}</div></Container></Section>

      <Section className="border-y border-border bg-[#ded9cc]"><Container><div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><FileCheck2 className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Compromiso público</Eyebrow><Heading size="xl">Una conclusión debe poder ser examinada.</Heading></div><div><p className="max-w-2xl text-base leading-8 text-ink/68">NOAM prioriza utilidad sin sacrificar trazabilidad. Cuando una fuente no permite publicar datos, cuando una muestra no sustenta representatividad o cuando un modelo no prueba causalidad, lo indicamos de forma visible.</p><a href={`mailto:${siteConfig.email}?subject=Corrección%20editorial%20NOAM`} className="mt-7 inline-flex min-h-11 items-center rounded-full bg-ink px-6 text-sm font-medium text-white transition-colors hover:bg-rust">Solicitar una corrección</a></div></div></Container></Section>
    </>
  );
}
