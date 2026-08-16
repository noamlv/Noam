import { ImageResponse } from "next/og";
import { getContentBySlug } from "@/lib/content";
import { editorialPillars } from "@/lib/editorial";
import { getMunicipality, titleCase } from "@/lib/dataperu";
import { getDepartmentProfile } from "@/lib/dataperu-departments";
import { formatPlanometroNumber, getPlanometroAxis, getPlanometroAxisParties, getPlanometroParty } from "@/lib/planometro";
import { serviceLines } from "@/lib/brand-content";
import { getSolution } from "@/lib/solutions";
import { getSectorPractice } from "@/lib/sector-practices";
import { getDeliverableSample } from "@/lib/deliverable-samples";
import { getBriefEdition } from "@/lib/brief";
import { CONTENT_TYPES, TOPICS, type ContentType, type Topic } from "@/types/content";

export const runtime = "nodejs";

type CardData = {
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  code: string;
};

const contentLabels: Record<ContentType, string> = {
  insights: "Estudio",
  indicators: "Indicador",
  toolkits: "Método y guía",
  services: "Servicio",
  cases: "Caso"
};

const topicColors: Record<Topic, string> = {
  gobierno: "#d38a72",
  inversion: "#e1bd68",
  ia: "#afc6cd"
};

async function resolveCard(category: string, slug: string): Promise<CardData | null> {
  if (CONTENT_TYPES.includes(category as ContentType)) {
    const content = await getContentBySlug(category as ContentType, slug).catch(() => null);
    if (!content) return null;
    return { eyebrow: `${contentLabels[content.item.type]} · ${content.item.topic === "inversion" ? "Inversión" : content.item.topic === "gobierno" ? "Gobierno" : "IA"}`, title: content.item.title, description: content.item.description, accent: topicColors[content.item.topic], code: content.item.type.slice(0, 3).toUpperCase() };
  }

  if (category === "solutions") {
    const solution = getSolution(slug);
    return solution ? { eyebrow: `Solución · ${solution.market}`, title: solution.title, description: solution.promise, accent: solution.accent, code: `S${solution.number}` } : null;
  }

  if (category === "muestras") {
    const sample = getDeliverableSample(slug);
    return sample ? { eyebrow: sample.eyebrow, title: sample.title, description: sample.promise, accent: sample.accent, code: `M${sample.number}` } : null;
  }

  if (category === "brief") {
    const edition = getBriefEdition(slug);
    return edition ? { eyebrow: `Brief NOAM · Edición ${edition.issue}`, title: edition.title, description: edition.description, accent: "#d9a48f", code: `B${edition.issue}` } : null;
  }

  if (category === "topics" && TOPICS.includes(slug as Topic)) {
    const pillar = editorialPillars[slug as Topic];
    return { eyebrow: pillar.eyebrow, title: pillar.title, description: pillar.description, accent: pillar.accent, code: "IDEAS" };
  }

  if (category === "municipios") {
    const municipality = getMunicipality(slug);
    if (!municipality) return null;
    const district = titleCase(municipality.district);
    return { eyebrow: `DataPerú · Municipalidad ${municipality.municipalityType.toLocaleLowerCase("es-PE")}`, title: district, description: `${titleCase(municipality.province)}, ${titleCase(municipality.department)} · Perfil de población, presupuesto, inversión y capacidades.`, accent: "#d38a72", code: municipality.ubigeo };
  }

  if (category === "departamentos") {
    const department = getDepartmentProfile(slug);
    if (!department) return null;
    const name = titleCase(department.name);
    return { eyebrow: `DataPerú · Departamento ${department.code}`, title: `${name} en contexto.`, description: `${department.municipalities} municipalidades · población, presupuesto, inversión y capacidades declaradas.`, accent: "#d9a48f", code: department.code };
  }

  if (category === "services") {
    const service = serviceLines.find((item) => item.slug === slug);
    return service ? { eyebrow: `Servicio ${service.number}`, title: service.title, description: service.promise, accent: "#d38a72", code: service.number } : null;
  }

  if (category === "practices") {
    const practice = getSectorPractice("public", slug) ?? getSectorPractice("private", slug);
    return practice ? { eyebrow: practice.eyebrow, title: practice.title, description: practice.promise, accent: practice.accent, code: practice.market === "public" ? "GOB" : "EMP" } : null;
  }

  if (category === "electoral" && slug === "erm-2026") {
    return {
      eyebrow: "ERM 2026 · Territorio · Transición",
      title: "De la elección a una gestión que pueda comenzar.",
      description: "Datos, prioridades y sistemas de seguimiento para gobiernos regionales y locales.",
      accent: "#d9a48f",
      code: "ERM26"
    };
  }

  if (category === "electoral" && slug === "planometro-2026") {
    return {
      eyebrow: "Planómetro · Planes de gobierno 2026",
      title: "Leer miles de propuestas sin perder la fuente.",
      description: "36 planes · 4.084 enunciados detectados · 2.742 propuestas bajo criterio operativo.",
      accent: "#d9a48f",
      code: "PLAN26"
    };
  }

  if (category === "electoral" && slug === "barometro-enero-2026") {
    return {
      eyebrow: "Opinión pública · Enero 2026",
      title: "Una encuesta no es una colección de gráficos.",
      description: "1.300 entrevistas ponderadas · cinco macrozonas · método y límites visibles.",
      accent: "#d9a48f",
      code: "BAR26"
    };
  }

  if (category === "planometro-organizaciones") {
    const party = getPlanometroParty(slug);
    if (!party) return null;
    return {
      eyebrow: "Planómetro 2026 · Perfil programático",
      title: party.name,
      description: `${formatPlanometroNumber(party.operationalProposals)} propuestas bajo criterio · ${party.topAxes.map((axis) => axis.label).join(" · ")}`,
      accent: "#d9a48f",
      code: "PLAN26"
    };
  }

  if (category === "planometro-ejes") {
    const axis = getPlanometroAxis(slug);
    if (!axis) return null;
    return {
      eyebrow: "Planómetro 2026 · Eje temático",
      title: axis.label,
      description: `${formatPlanometroNumber(axis.proposals)} propuestas clasificadas · ${getPlanometroAxisParties(axis.key).length} organizaciones con casos`,
      accent: "#d9a48f",
      code: "EJE26"
    };
  }

  if (category === "dataperu" && slug === "radar") {
    return {
      eyebrow: "DataPerú · Radar municipal",
      title: "La gestión municipal, vista en contexto.",
      description: "Recursos, ejecución y capacidades declaradas de 1,891 gobiernos locales.",
      accent: "#d9a48f",
      code: "RADAR"
    };
  }

  if (category === "dataperu" && slug === "departamentos") {
    return {
      eyebrow: "DataPerú · Escala regional",
      title: "El país cambia cuando cambia la escala.",
      description: "Presupuesto, inversión y capacidades municipales agregadas en 25 departamentos.",
      accent: "#d9a48f",
      code: "ATLAS"
    };
  }

  if (category === "dataperu" && slug === "panorama-municipal-2025") {
    return {
      eyebrow: "DataPerú · Estudio insignia 2025",
      title: "El Perú municipal no cabe en un promedio.",
      description: "Recursos, inversión y capacidades declaradas en 1,891 municipalidades y 25 departamentos.",
      accent: "#d9a48f",
      code: "PAN25"
    };
  }

  if (category === "dataperu" && slug === "inversiones") {
    return {
      eyebrow: "DataPerú · Inversión municipal",
      title: "La cartera se entiende proyecto por proyecto.",
      description: "9,429 proyectos visibles por territorio, función, PIM y ejecución financiera.",
      accent: "#d9a48f",
      code: "INV25"
    };
  }

  if (category === "dataperu" && slug === "mapa") {
    return {
      eyebrow: "DataPerú · Visor territorial",
      title: "Las decisiones también tienen geografía.",
      description: "Ejecución, recursos, transparencia e inversión municipal sobre 25 departamentos.",
      accent: "#d9a48f",
      code: "MAP25"
    };
  }

  if (category === "products" && slug === "ai-governance-lab") {
    return {
      eyebrow: "NOAM · IA responsable",
      title: "Antes de construir IA, decide si vale la pena.",
      description: "Evalúa oportunidad, exposición y controles antes de iniciar un piloto institucional.",
      accent: "#d9a48f",
      code: "AI LAB"
    };
  }

  if (category === "products" && slug === "scope-builder") {
    return {
      eyebrow: "NOAM · Herramienta abierta",
      title: "Convierte una necesidad en un punto de partida.",
      description: "Diseña un brief inicial de diagnóstico, evaluación, sistema de decisión, IA o transición.",
      accent: "#d9a48f",
      code: "SCOPE"
    };
  }

  return null;
}

export async function GET(_request: Request, context: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await context.params;
  const card = await resolveCard(category, slug);
  if (!card) return new Response("Not found", { status: 404 });
  const titleSize = card.title.length > 80 ? 52 : card.title.length > 55 ? 58 : 68;

  const response = new ImageResponse(
    <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", overflow: "hidden", background: "#15211d", color: "#f7f4ec", fontFamily: "sans-serif" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: "linear-gradient(rgba(255,255,255,.22) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.22) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
      <div style={{ position: "absolute", width: 520, height: 520, borderRadius: 999, border: `76px solid ${card.accent}`, opacity: 0.18, right: -150, top: -210 }} />
      <div style={{ position: "absolute", width: 210, height: 210, borderRadius: 999, border: `2px solid ${card.accent}`, opacity: 0.42, right: 125, bottom: 90 }} />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", width: "100%", padding: "64px 72px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 18, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}><span style={{ fontWeight: 700 }}>NOAM</span><span style={{ width: 1, height: 22, background: "rgba(255,255,255,.28)" }} /><span style={{ color: "rgba(255,255,255,.58)", fontSize: 14 }}>Gobierno · Datos · IA</span></div>
          <span style={{ color: card.accent, fontFamily: "monospace", fontSize: 15 }}>{card.code}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", maxWidth: 940 }}>
          <div style={{ color: card.accent, fontSize: 15, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>{card.eyebrow}</div>
          <div style={{ display: "flex", marginTop: 22, maxHeight: 230, overflow: "hidden", fontSize: titleSize, lineHeight: 1.02, letterSpacing: "-0.052em", fontWeight: 600 }}>{card.title}</div>
          <div style={{ display: "flex", marginTop: 24, maxWidth: 850, maxHeight: 62, overflow: "hidden", color: "rgba(255,255,255,.68)", fontSize: 23, lineHeight: 1.35 }}>{card.description}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 40, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,.18)", color: "rgba(255,255,255,.45)", fontSize: 14, letterSpacing: "0.08em" }}><span>Evidencia para decidir</span><span>noam.pe</span></div>
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
  response.headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
  return response;
}
