import { departmentResearch04to14 } from "./department-research-04-14.ts";
import { departmentResearch15to25 } from "./department-research-15-25.ts";

export type DepartmentResearchConfidence = "baja" | "media" | "alta";

export type DepartmentEvidenceBase = {
  scope: "departamental" | "macroregional";
  sourceCount?: number;
  officialSources?: "total" | "parcial";
  note: string;
};

export type DepartmentProblem = {
  title: string;
  problem: string;
  affected: string;
  governmentDecision: string;
  noamResponse: string;
};

export type DepartmentOpportunity = {
  title: string;
  rationale: string;
  actors: string;
  validation: string;
};

export type DepartmentIntervention = {
  title: string;
  outcome: string;
  deliverable: string;
};

export type DepartmentResearch = {
  code: string;
  department: string;
  researchDate: string;
  confidence: DepartmentResearchConfidence;
  evidenceBase?: DepartmentEvidenceBase;
  thesis: string;
  problems: DepartmentProblem[];
  opportunities: DepartmentOpportunity[];
  interventions: DepartmentIntervention[];
  evidenceGaps: string[];
};

export const departmentResearch: DepartmentResearch[] = [
  {
    code: "01",
    department: "Amazonas",
    researchDate: "2026-07-30",
    confidence: "media",
    evidenceBase: { scope: "departamental", sourceCount: 2, officialSources: "total", note: "Investigación departamental inicial con cobertura de fuentes todavía limitada." },
    thesis: "La dispersión territorial hace que conectividad, servicios básicos y acceso a mercados deban planificarse como un mismo problema. La prioridad no es sumar proyectos aislados, sino decidir qué corredores y poblaciones deben conectarse primero.",
    problems: [
      {
        title: "Conectividad que condiciona servicios y mercados",
        problem: "La combinación de selva, montaña y centros poblados dispersos eleva el costo de llegar a servicios públicos, mantener infraestructura y mover producción local.",
        affected: "Comunidades rurales e indígenas, agricultores familiares, estudiantes, pacientes y pequeños comercios alejados de los principales ejes urbanos.",
        governmentDecision: "Priorizar corredores con criterios simultáneos de población atendida, acceso a salud y educación, riesgo y actividad productiva.",
        noamResponse: "Diagnóstico geoespacial de accesibilidad, cartera priorizada y tablero de hitos para vías, conectividad digital y servicios asociados."
      },
      {
        title: "Brechas de agua, saneamiento y salud preventiva",
        problem: "La cobertura nominal de una obra no garantiza continuidad, calidad ni mantenimiento, especialmente en localidades pequeñas y dispersas.",
        affected: "Hogares rurales, niñas y niños, mujeres cuidadoras y comunidades con barreras lingüísticas o grandes tiempos de desplazamiento.",
        governmentDecision: "Identificar dónde coinciden brechas de servicio, riesgos sanitarios y baja capacidad operativa antes de definir nuevas inversiones.",
        noamResponse: "Mapa de brechas, encuesta focalizada, ficha de sostenibilidad por sistema y observatorio de cobertura, calidad y mantenimiento."
      },
      {
        title: "Cadenas agroforestales con poco valor capturado localmente",
        problem: "Café, cacao y otros productos enfrentan fricciones de calidad, poscosecha, asociatividad, logística y acceso a compradores.",
        affected: "Productores pequeños, cooperativas, mujeres emprendedoras, transportistas y negocios de transformación local.",
        governmentDecision: "Concentrar asistencia e infraestructura productiva en cuellos de botella demostrables y cadenas con compradores identificables.",
        noamResponse: "Estudio de cadena de valor, segmentación de productores, análisis de demanda y diseño de pilotos de poscosecha o articulación comercial."
      },
      {
        title: "Capacidad municipal desigual para convertir recursos en resultados",
        problem: "Municipalidades con equipos pequeños deben formular, contratar, ejecutar y mantener proyectos en contextos operativos muy distintos.",
        affected: "Ciudadanía usuaria de servicios y equipos municipales con alta carga operativa o rotación de personal.",
        governmentDecision: "Diferenciar apoyo técnico según tipo de municipio, cartera, riesgo contractual y capacidad de operación posterior.",
        noamResponse: "Sala de seguimiento regional, semáforo de proyectos, protocolo de alertas y acompañamiento a equipos locales."
      }
    ],
    opportunities: [
      {
        title: "Servicios para café y cacao de mayor valor",
        rationale: "La oportunidad puede estar en resolver calidad, trazabilidad, poscosecha, empaque y conexión comercial antes que en ampliar producción.",
        actors: "Cooperativas, compradores especializados, operadores logísticos, proveedores de equipamiento y servicios de calidad.",
        validation: "Medir volúmenes, estacionalidad, estándares exigidos, compradores activos y disposición real de pago."
      },
      {
        title: "Turismo gestionado como circuito",
        rationale: "Patrimonio, naturaleza y cultura pueden generar más valor cuando transporte, estadía, guiado, seguridad y gestión de visitantes funcionan de manera integrada.",
        actors: "Operadores, alojamientos, guías, comunidades, restaurantes, gobiernos locales y gestores de atractivos.",
        validation: "Estimar flujos, gasto, permanencia, capacidad de carga, estacionalidad y brechas concretas de servicio."
      },
      {
        title: "Soluciones descentralizadas de agua, energía y mantenimiento",
        rationale: "La dispersión puede abrir demanda para tecnologías modulares y servicios operativos adaptados a pequeña escala.",
        actors: "Municipalidades, organizaciones comunales, empresas de ingeniería, operadores locales y cooperación.",
        validation: "Confirmar costos de ciclo de vida, reglas de contratación, capacidad de mantenimiento y escala mínima viable."
      }
    ],
    interventions: [
      { title: "Agenda territorial de conectividad", outcome: "Saber qué conexiones producen mayor acceso social y productivo.", deliverable: "Modelo de accesibilidad, mapa de prioridades y cartera por fases." },
      { title: "Observatorio rural e intercultural", outcome: "Seguir servicios y poblaciones sin ocultar la heterogeneidad provincial.", deliverable: "Dashboard, fichas territoriales, alertas y boletín ejecutivo." },
      { title: "Laboratorio de cadenas de valor", outcome: "Pasar de una oportunidad genérica a un piloto con demanda verificable.", deliverable: "Estudio de mercado, mapa de actores y diseño de prueba comercial." }
    ],
    evidenceGaps: [
      "Cobertura, continuidad y calidad de agua y saneamiento por localidad.",
      "Tiempos reales de viaje hacia salud, educación, mercados y servicios públicos.",
      "Volúmenes, calidad, costos logísticos y compradores activos en cadenas agroforestales.",
      "Capacidad operativa y estado de mantenimiento de infraestructura municipal."
    ]
  },
  {
    code: "02",
    department: "Áncash",
    researchDate: "2026-07-30",
    confidence: "media",
    evidenceBase: { scope: "departamental", sourceCount: 4, officialSources: "parcial", note: "Investigación departamental inicial; requiere ampliar fuentes oficiales y actualizar varias líneas base." },
    thesis: "Áncash reúne al menos tres sistemas territoriales distintos: costa industrial y pesquera, Callejón de Huaylas y provincias altoandinas. Gobernar con el promedio departamental oculta diferencias en agua, riesgo, logística, inversión y oportunidades productivas.",
    problems: [
      {
        title: "Seguridad hídrica y riesgo climático",
        problem: "Disponibilidad de agua, retroceso glaciar, lluvias intensas y movimientos en masa afectan de manera distinta a ciudades, agricultura, turismo e infraestructura.",
        affected: "Comunidades altoandinas, productores, operadores turísticos, juntas de agua, ciudades del Callejón de Huaylas y usuarios aguas abajo.",
        governmentDecision: "Priorizar cuencas, infraestructura y sistemas de alerta según exposición, población, demanda y criticidad del servicio.",
        noamResponse: "Visor de riesgo hídrico, integración de fuentes ambientales y cartera de medidas con responsables e indicadores."
      },
      {
        title: "Inversión pública sin lectura integrada de cartera",
        problem: "La disponibilidad de recursos no asegura que proyectos complementarios se ejecuten en secuencia, resuelvan cuellos de botella o puedan operar después de la obra.",
        affected: "Gobiernos locales, población usuaria, proveedores, productores y territorios que dependen de inversiones viales, hídricas o sociales.",
        governmentDecision: "Ordenar la cartera por problema, madurez, riesgo, dependencia entre proyectos y resultado esperado, no solo por monto.",
        noamResponse: "Observatorio de inversiones, alertas contractuales, sala de seguimiento y brief periódico para autoridades."
      },
      {
        title: "Presiones ambientales que afectan licencia y competitividad",
        problem: "Minería, actividad pesquera, ciudades y pasivos ambientales exigen información comparable sobre agua, emisiones, residuos, compromisos y percepción local.",
        affected: "Comunidades, pescadores, empresas, autoridades ambientales y actividades dependientes de la calidad del territorio.",
        governmentDecision: "Definir qué riesgos requieren vigilancia permanente, qué compromisos deben transparentarse y dónde intervenir primero.",
        noamResponse: "Sistema de seguimiento socioambiental, tablero de compromisos y protocolo de evidencia para diálogo territorial."
      },
      {
        title: "Brechas logísticas y de servicios entre costa y sierra",
        problem: "Las oportunidades de la costa, el turismo de montaña y la producción altoandina enfrentan restricciones distintas de transporte, conectividad y servicios empresariales.",
        affected: "Agricultores, empresas pequeñas, operadores turísticos, proveedores y población de provincias rurales.",
        governmentDecision: "Diferenciar políticas y proyectos por corredor económico en lugar de aplicar una oferta departamental uniforme.",
        noamResponse: "Diagnóstico de corredores, análisis de tiempos y costos, mapa de demanda y cartera de servicios habilitantes."
      }
    ],
    opportunities: [
      {
        title: "Proveedores locales para cadenas mineras e infraestructura",
        rationale: "Existe una hipótesis de demanda para mantenimiento, seguridad, logística, alimentación, monitoreo y servicios ambientales con estándares exigentes.",
        actors: "Empresas tractoras, contratistas, MYPE locales, centros de formación y gobiernos que promueven desarrollo productivo.",
        validation: "Analizar compras reales, categorías, barreras de homologación, concentración de proveedores y contratos accesibles."
      },
      {
        title: "Economía circular pesquera y agroindustrial",
        rationale: "Residuos y subproductos pueden convertirse en insumos o nuevos productos si existen volumen, tecnología, permisos y compradores.",
        actors: "Industria pesquera, agroexportadores, startups ambientales, universidades, gestores de residuos y compradores industriales.",
        validation: "Cuantificar flujos materiales, costos de disposición, regulación sanitaria y demanda por productos derivados."
      },
      {
        title: "Turismo de montaña más seguro y distribuido",
        rationale: "La oportunidad no depende solo de atraer visitantes, sino de organizar seguridad, información, movilidad, servicios y distribución territorial del gasto.",
        actors: "Operadores, guías, alojamientos, comunidades, aseguradoras, transportistas y gestores de áreas naturales.",
        validation: "Medir demanda por temporada, incidentes, permanencia, gasto, capacidad instalada y cuellos de botella por circuito."
      }
    ],
    interventions: [
      { title: "Observatorio de inversión y canon", outcome: "Conectar recursos, proyectos, riesgos y resultados territoriales.", deliverable: "Tablero de cartera, alertas, fichas de proyectos y brief de decisión." },
      { title: "Sistema de riesgo hídrico", outcome: "Anticipar impactos sobre población, producción e infraestructura crítica.", deliverable: "Visor georreferenciado, reglas de alerta y protocolo de actualización." },
      { title: "Mapa de oportunidades y proveedores", outcome: "Identificar demanda empresarial verificable y capacidades locales aprovechables.", deliverable: "Analítica de compras, segmentación empresarial y agenda de desarrollo de proveedores." }
    ],
    evidenceGaps: [
      "Brechas actuales de agua y saneamiento comparables por provincia y distrito.",
      "Exposición de población, infraestructura y actividad económica a riesgos hídricos.",
      "Compras y requisitos reales de cadenas mineras, pesqueras y agroindustriales.",
      "Estado, dependencias y riesgos contractuales de la cartera prioritaria de inversión."
    ]
  },
  {
    code: "03",
    department: "Apurímac",
    researchDate: "2026-07-31",
    confidence: "media",
    evidenceBase: { scope: "departamental", sourceCount: 8, officialSources: "parcial", note: "Investigación departamental inicial curada para excluir inconsistencias y cifras no suficientemente verificadas." },
    thesis: "El crecimiento asociado a la minería convive con brechas rurales de servicios, nutrición, conectividad y empleo. La pregunta central es cómo convertir recursos y actividad económica en capacidades duraderas para provincias y comunidades distintas.",
    problems: [
      {
        title: "Brechas sociales que se superponen en hogares rurales",
        problem: "Nutrición, agua, saneamiento, acceso a salud, educación y conectividad no operan como problemas separados cuando afectan al mismo hogar.",
        affected: "Niñas y niños, hogares rurales, población quechuahablante, mujeres cuidadoras y comunidades alejadas de Abancay y Andahuaylas.",
        governmentDecision: "Focalizar intervenciones integradas según acumulación de brechas y capacidad real de acceso, no solo por cobertura sectorial.",
        noamResponse: "Mapa de vulnerabilidad multidimensional, encuesta intercultural y tablero de seguimiento de hogares, servicios y resultados."
      },
      {
        title: "Recursos e inversiones con resultados territoriales desiguales",
        problem: "La ejecución financiera por sí sola no muestra si una cartera reduce brechas, complementa otras inversiones o deja capacidad de operación.",
        affected: "Municipalidades, comunidades, usuarios de servicios y territorios con proyectos paralizados o de baja sostenibilidad.",
        governmentDecision: "Reordenar proyectos por contribución a resultados, madurez, riesgo, población atendida y costos posteriores de operación.",
        noamResponse: "Sala de inversión territorial, semáforo de proyectos y evaluación rápida de pertinencia y sostenibilidad."
      },
      {
        title: "Pocos encadenamientos entre minería y economía local",
        problem: "La actividad extractiva puede crecer sin ampliar suficientemente proveedores, empleo especializado, innovación o mercados para empresas locales.",
        affected: "MYPE, jóvenes, proveedores potenciales, productores y comunidades de áreas de influencia económica.",
        governmentDecision: "Identificar categorías de compra accesibles, brechas empresariales y servicios de formación vinculados a demanda comprobable.",
        noamResponse: "Analítica de compras, censo de proveedores, diagnóstico de capacidades y programa medible de desarrollo empresarial."
      },
      {
        title: "Agua, clima y conectividad limitan la producción rural",
        problem: "Sequías, heladas, riego insuficiente y costos logísticos reducen productividad y elevan el riesgo de invertir en transformación local.",
        affected: "Agricultores familiares, ganaderos, cooperativas, transportistas y pequeños negocios rurales.",
        governmentDecision: "Priorizar infraestructura y asistencia según cadenas, disponibilidad hídrica, acceso a mercado y riesgo climático.",
        noamResponse: "Diagnóstico productivo georreferenciado, escenarios hídricos y diseño de pilotos de riego, poscosecha o articulación comercial."
      }
    ],
    opportunities: [
      {
        title: "Desarrollo verificable de proveedores locales",
        rationale: "La oportunidad está en conectar compras reales con empresas que puedan cerrar brechas de calidad, seguridad, escala y gestión.",
        actors: "Empresas mineras y contratistas, MYPE, cámaras, institutos técnicos, gobiernos y programas de desarrollo productivo.",
        validation: "Revisar órdenes y contratos, categorías tercerizadas, requisitos, rotación de proveedores y demanda futura."
      },
      {
        title: "Riego, poscosecha y transformación agropecuaria",
        rationale: "La transformación de papa, granos, lácteos o fibra solo es viable donde agua, volumen, calidad, logística y mercado coinciden.",
        actors: "Productores, cooperativas, proveedores de riego y frío, compradores, programas agrarios y financistas.",
        validation: "Estimar oferta estacional, merma, costos, comprador objetivo, punto de equilibrio y gobernanza de la organización."
      },
      {
        title: "Servicios técnicos para infraestructura y conectividad",
        rationale: "Mantenimiento vial, agua, energía distribuida y conectividad pueden abrir mercados locales si se estructuran contratos sostenibles.",
        actors: "Municipalidades, empresas de ingeniería, técnicos locales, operadores comunitarios y proveedores digitales.",
        validation: "Confirmar cartera, modalidad de compra, capacidad de pago, mantenimiento y demanda agregada entre distritos."
      }
    ],
    interventions: [
      { title: "Observatorio de brechas sociales", outcome: "Focalizar población y servicios con una lectura territorial e intercultural.", deliverable: "Mapa multidimensional, perfiles provinciales y tablero de resultados." },
      { title: "Sala de inversión territorial", outcome: "Gestionar proyectos por resultados y riesgos, no solo por gasto acumulado.", deliverable: "Cartera priorizada, alertas, responsables e informe ejecutivo periódico." },
      { title: "Programa de encadenamientos", outcome: "Convertir demanda empresarial en oportunidades alcanzables para proveedores locales.", deliverable: "Mapa de compras, censo empresarial, brechas y pilotos de desarrollo." }
    ],
    evidenceGaps: [
      "Indicadores sociales recientes y comparables a escala provincial y distrital.",
      "Cobertura efectiva, continuidad y calidad de agua, salud y educación intercultural.",
      "Demanda empresarial y contratación real disponible para proveedores locales.",
      "Oferta productiva, disponibilidad hídrica y costos logísticos por cadena y corredor."
    ]
  },
  ...departmentResearch04to14,
  ...departmentResearch15to25
];

export function getDepartmentResearch(code: string) {
  return departmentResearch.find((item) => item.code === code);
}
