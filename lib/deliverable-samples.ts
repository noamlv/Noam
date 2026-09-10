import type { SolutionSlug } from "@/lib/solutions";

export type DeliverableSample = {
  slug: string;
  number: string;
  market: "Gobiernos" | "Empresas" | "Gobiernos y empresas";
  eyebrow: string;
  title: string;
  shortTitle: string;
  promise: string;
  description: string;
  accent: string;
  image: string;
  imageAlt: string;
  duration: string;
  decision: string;
  solutionSlug: SolutionSlug;
  questions: string[];
  modules: Array<{ title: string; purpose: string; output: string }>;
  preview: {
    title: string;
    columns: [string, string, string];
    rows: Array<[string, string, string]>;
  };
  timeline: Array<{ period: string; title: string; description: string }>;
  clientInputs: string[];
  qualityControls: string[];
  deliverables: string[];
  related: Array<{ type: string; label: string; href: string }>;
};

export const deliverableSamples: DeliverableSample[] = [
  {
    slug: "diagnostico-agenda-territorial",
    number: "01",
    market: "Gobiernos",
    eyebrow: "Muestra · Estudios y diagnóstico",
    title: "Diagnóstico territorial y agenda priorizada",
    shortTitle: "Diagnóstico territorial",
    promise: "Del problema disperso a una agenda que la autoridad y el equipo pueden conducir.",
    description: "Esta muestra enseña cómo combinar fuentes públicas, instrumentos, entrevistas y conocimiento territorial sin confundir una línea de base con una explicación completa.",
    accent: "#b95337",
    image: "/images/noam-public-sector.jpg",
    imageAlt: "Equipo técnico municipal trabajando sobre mapas y documentos",
    duration: "4 a 8 semanas",
    decision: "Qué problemas deben priorizarse, con qué criterios y qué acciones pueden comenzar dentro de la capacidad institucional disponible.",
    solutionSlug: "diagnostico-agenda-territorial",
    questions: ["¿Dónde se concentra el problema y a quién afecta?", "¿Qué causas están sustentadas y cuáles siguen siendo hipótesis?", "¿Qué competencias, recursos y actores condicionan la respuesta?", "¿Qué acciones combinan urgencia, impacto y viabilidad?"],
    modules: [
      { title: "Línea de base", purpose: "Ordenar magnitud, distribución y evolución con fuentes trazables.", output: "Perfil territorial y nota de calidad" },
      { title: "Explicación", purpose: "Contrastar causas, actores, procesos y restricciones institucionales.", output: "Mapa de problemas e hipótesis" },
      { title: "Priorización", purpose: "Aplicar criterios explícitos y revisar sensibilidad de la decisión.", output: "Matriz multicriterio" },
      { title: "Activación", purpose: "Asignar responsables, hitos, evidencia y primeras acciones.", output: "Agenda y brief ejecutivo" }
    ],
    preview: { title: "Matriz de prioridades · Estructura demostrativa", columns: ["Pregunta", "Evidencia mínima", "Decisión"], rows: [["Brecha territorial", "Indicadores + cobertura", "Focalizar"], ["Causa operativa", "Proceso + entrevistas", "Corregir"], ["Cartera disponible", "Madurez + costo", "Secuenciar"], ["Capacidad institucional", "Roles + recursos", "Asignar"]] },
    timeline: [
      { period: "Semana 1", title: "Alineamiento", description: "Decisión, territorio, usuarios, fuentes y criterios de éxito." },
      { period: "Semanas 2–3", title: "Integración", description: "Fuentes, instrumentos, entrevistas y contraste de calidad." },
      { period: "Semanas 4–5", title: "Diagnóstico", description: "Patrones, causas, restricciones, actores y escenarios." },
      { period: "Semanas 6–8", title: "Agenda", description: "Priorización, validación, responsables y transferencia." }
    ],
    clientInputs: ["Instrumentos de gestión y cartera vigente", "Acceso a responsables y equipos técnicos", "Restricciones políticas, presupuestales y temporales", "Criterios internos de prioridad y decisión"],
    qualityControls: ["Fuentes, periodos y cobertura visibles", "Separación entre dato, inferencia e hipótesis", "Criterios de priorización reproducibles", "Validación ejecutiva y técnica documentada"],
    deliverables: ["Informe técnico navegable", "Matriz editable de prioridades", "Brief de conducción para autoridad", "Sesión de trabajo y transferencia"],
    related: [{ type: "Guía", label: "Elegir un diagnóstico territorial", href: "/diagnostico-territorial" }, { type: "Producto", label: "Perfiles municipales DataPerú", href: "/dataperu/municipios" }, { type: "TDR", label: "TDR para diagnóstico territorial", href: "/toolkits/tdr-diagnostico-territorial-institucional" }, { type: "Solución", label: "Diagnóstico y agenda territorial", href: "/solutions/diagnostico-agenda-territorial" }]
  },
  {
    slug: "observatorio-gestion-inversiones",
    number: "02",
    market: "Gobiernos",
    eyebrow: "Muestra · Sistema de decisión",
    title: "Observatorio de gestión e inversiones",
    shortTitle: "Observatorio de gestión",
    promise: "Un sistema que conecta indicadores, alertas, responsables y reuniones de decisión.",
    description: "La muestra evita presentar un dashboard como solución completa. Expone la arquitectura de decisiones, datos, producto y operación necesaria para sostenerlo.",
    accent: "#2f5c52",
    image: "/images/noam-public-sector.jpg",
    imageAlt: "Equipo regional revisando información de gestión e inversiones",
    duration: "6 a 12 semanas",
    decision: "Qué requiere atención ejecutiva, quién debe actuar y qué evidencia confirmará que una alerta fue atendida.",
    solutionSlug: "observatorio-gestion-inversiones",
    questions: ["¿Qué reunión o decisión utilizará cada indicador?", "¿Quién produce, valida y corrige cada dato?", "¿Qué umbral activa una alerta y qué acción sigue?", "¿Cómo se conserva la trazabilidad de cambios y compromisos?"],
    modules: [
      { title: "Decisiones", purpose: "Mapear preguntas, usuarios, reuniones y acciones esperadas.", output: "Arquitectura de uso" },
      { title: "Datos", purpose: "Definir métricas, fuentes, responsables y reglas de calidad.", output: "Catálogo de indicadores" },
      { title: "Producto", purpose: "Diseñar vistas ejecutivas, operativas y territoriales.", output: "Dashboard o visor" },
      { title: "Operación", purpose: "Instalar actualización, alertas, soporte y gobierno del sistema.", output: "Protocolo operativo" }
    ],
    preview: { title: "Registro de alertas · Estructura demostrativa", columns: ["Señal", "Regla", "Acción"], rows: [["Hito crítico", "Fecha vencida", "Escalar responsable"], ["Ejecución", "Desviación sostenida", "Revisar cuello de botella"], ["Calidad de dato", "Fuente incompleta", "Suspender indicador"], ["Compromiso", "Sin evidencia", "Solicitar validación"]] },
    timeline: [
      { period: "Semanas 1–2", title: "Decisiones", description: "Usuarios, preguntas, reuniones y responsabilidades." },
      { period: "Semanas 3–4", title: "Datos", description: "Auditoría, definiciones, fuentes, llaves y calidad mínima." },
      { period: "Semanas 5–8", title: "Prototipo", description: "Vistas, filtros, alertas y pruebas con usuarios." },
      { period: "Semanas 9–12", title: "Operación", description: "Despliegue, documentación, rutinas y transferencia." }
    ],
    clientInputs: ["Reportes y tableros existentes", "Acceso a responsables de fuentes", "Calendario de reuniones y decisiones", "Infraestructura y restricciones de seguridad"],
    qualityControls: ["Definición y denominador por indicador", "Linaje entre fuente, transformación y vista", "Alertas probadas con escenarios", "Roles de actualización y corrección"],
    deliverables: ["Mapa de decisiones y usuarios", "Diccionario de indicadores", "Producto digital funcional", "Manual de operación y gobernanza"],
    related: [{ type: "Guía", label: "Analizar inversión pública y proyectos", href: "/analisis-inversion-publica-proyectos" }, { type: "Demo", label: "Observatorio de inversiones DataPerú", href: "/dataperu/inversiones" }, { type: "TDR", label: "TDR para análisis de inversión pública", href: "/toolkits/tdr-analisis-inversion-publica" }, { type: "Solución", label: "Observatorio de gestión", href: "/solutions/observatorio-gestion-inversiones" }]
  },
  {
    slug: "encuesta-escucha-territorial",
    number: "03",
    market: "Gobiernos y empresas",
    eyebrow: "Muestra · Estudio de opinión",
    title: "Encuesta y escucha territorial",
    shortTitle: "Encuesta y escucha",
    promise: "Preguntas, muestra y análisis diseñados desde la decisión, no desde el gráfico final.",
    description: "Esta muestra recorre el diseño de un estudio de experiencia, percepción o prioridades y hace visibles población, incertidumbre, segmentación y límites de inferencia.",
    accent: "#8a623d",
    image: "/images/noam-private-sector.jpg",
    imageAlt: "Trabajo analítico sobre experiencia y percepción en territorios",
    duration: "4 a 10 semanas",
    decision: "Qué experiencia o percepción requiere intervención, en qué segmentos y con qué evidencia adicional debe validarse.",
    solutionSlug: "encuestas-escucha-ciudadana",
    questions: ["¿Qué decisión cambiaría con una respuesta diferente?", "¿Cuál es la población y cómo será representada?", "¿Qué conceptos requieren una medición válida y comprensible?", "¿Qué diferencias son sustantivas y cuáles pueden ser ruido muestral?"],
    modules: [
      { title: "Diseño", purpose: "Traducir decisión e hipótesis en población, variables e instrumento.", output: "Ficha metodológica" },
      { title: "Campo", purpose: "Controlar cobertura, selección, supervisión y no respuesta.", output: "Base y reporte de campo" },
      { title: "Análisis", purpose: "Estimar patrones, diferencias, segmentos e incertidumbre.", output: "Tabulados y modelos" },
      { title: "Implicancias", purpose: "Conectar resultados con decisiones y nueva evidencia.", output: "Informe y brief" }
    ],
    preview: { title: "Plan de análisis · Estructura demostrativa", columns: ["Hipótesis", "Medición", "Uso"], rows: [["Experiencia desigual", "Índice + segmentos", "Focalizar mejora"], ["Barrera de acceso", "Pregunta + conducta", "Rediseñar canal"], ["Confianza", "Escala + contexto", "Priorizar comunicación"], ["Cambio temporal", "Serie comparable", "Evaluar intervención"]] },
    timeline: [
      { period: "Semana 1", title: "Preguntas", description: "Decisión, población, hipótesis y plan de análisis." },
      { period: "Semanas 2–3", title: "Instrumento", description: "Cuestionario, piloto, muestra y protocolos." },
      { period: "Semanas 3–6", title: "Campo", description: "Levantamiento, supervisión y control de calidad." },
      { period: "Semanas 6–10", title: "Análisis", description: "Ponderación, segmentos, incertidumbre e implicancias." }
    ],
    clientInputs: ["Decisiones e hipótesis prioritarias", "Definición de población y cobertura", "Bases auxiliares o marco muestral", "Restricciones éticas, territoriales y operativas"],
    qualityControls: ["Ficha técnica y cuestionario publicados", "Trazabilidad de cambios del instrumento", "Supervisión y reglas de exclusión", "Incertidumbre y limitaciones visibles"],
    deliverables: ["Diseño metodológico e instrumento", "Base anonimizada y diccionario", "Informe analítico y visualizaciones", "Brief ejecutivo y sesión de implicancias"],
    related: [{ type: "Guía", label: "Elegir una encuesta o estudio", href: "/encuestas-estudios-opinion" }, { type: "Caso", label: "Barómetro electoral 2026", href: "/electoral/barometro-enero-2026" }, { type: "TDR", label: "TDR para encuestas", href: "/toolkits/tdr-encuesta-estudio-territorial" }, { type: "Solución", label: "Encuestas y escucha territorial", href: "/solutions/encuestas-escucha-ciudadana" }]
  },
  {
    slug: "piloto-ia-documental",
    number: "04",
    market: "Gobiernos",
    eyebrow: "Muestra · IA responsable",
    title: "Piloto de IA para documentos y conocimiento",
    shortTitle: "Piloto de IA documental",
    promise: "Una prueba acotada con línea de base, control humano, errores visibles y criterio de detención.",
    description: "La muestra parte de un proceso documental concreto. Separa demostración de producción y exige evidencia antes de recomendar una escala mayor.",
    accent: "#475c63",
    image: "/images/noam-public-sector.jpg",
    imageAlt: "Equipo público revisando documentos y una herramienta de inteligencia artificial",
    duration: "4 a 8 semanas",
    decision: "Si el caso de uso produce utilidad suficiente bajo controles aceptables para detener, ajustar o escalar el piloto.",
    solutionSlug: "ia-procesos-publicos",
    questions: ["¿Qué cuello de botella medible busca resolver?", "¿Qué documentos pueden utilizarse y bajo qué permisos?", "¿Qué errores son tolerables y cuáles obligan a detener?", "¿Quién revisa, corrige y responde por el resultado?"],
    modules: [
      { title: "Caso de uso", purpose: "Definir tarea, volumen, usuario, línea de base y alternativa simple.", output: "Ficha de decisión" },
      { title: "Riesgos", purpose: "Clasificar datos, exposición, errores y supervisión necesaria.", output: "Matriz de controles" },
      { title: "Piloto", purpose: "Construir recuperación, respuesta y evaluación sobre un corpus acotado.", output: "Prototipo funcional" },
      { title: "Evidencia", purpose: "Medir calidad, tiempo, utilidad y condiciones de escalamiento.", output: "Informe de evaluación" }
    ],
    preview: { title: "Registro de evaluación · Estructura demostrativa", columns: ["Prueba", "Criterio", "Decisión"], rows: [["Recuperación", "Fuente pertinente", "Aceptar / revisar"], ["Respuesta", "Sustento verificable", "Aceptar / rechazar"], ["Dato restringido", "No exposición", "Detener"], ["Tiempo de tarea", "Mejora vs. línea base", "Escalar / ajustar"]] },
    timeline: [
      { period: "Semana 1", title: "Preparación", description: "Proceso, línea de base, corpus, permisos y riesgos." },
      { period: "Semanas 2–3", title: "Diseño", description: "Arquitectura, controles, casos de prueba y métricas." },
      { period: "Semanas 4–6", title: "Piloto", description: "Construcción, pruebas, revisión humana y correcciones." },
      { period: "Semanas 7–8", title: "Decisión", description: "Evaluación, documentación y recomendación de escala." }
    ],
    clientInputs: ["Proceso y línea de base actual", "Corpus autorizado y clasificación de datos", "Usuarios expertos para evaluación", "Políticas de seguridad y responsables"],
    qualityControls: ["Casos de prueba antes del desarrollo", "Citas y trazabilidad por respuesta", "Pruebas de exposición y rechazo", "Criterios explícitos para detener o escalar"],
    deliverables: ["Ficha del caso de uso", "Matriz de riesgos y controles", "Piloto evaluable", "Informe y plan de adopción"],
    related: [{ type: "Guía", label: "Elegir y probar IA o automatización", href: "/ia-automatizacion-gobiernos-empresas" }, { type: "Laboratorio", label: "Evaluar un caso de uso de IA", href: "/products/ai-governance-lab" }, { type: "Toolkit", label: "Playbook de gobernanza de IA", href: "/toolkits/ai-governance-playbook" }, { type: "Solución", label: "IA para procesos públicos", href: "/solutions/ia-procesos-publicos" }]
  },
  {
    slug: "inteligencia-territorial-inversion",
    number: "05",
    market: "Empresas",
    eyebrow: "Muestra · Inversión y expansión",
    title: "Screening territorial para una decisión de inversión",
    shortTitle: "Screening territorial",
    promise: "Comparar oportunidades sin esconder supuestos, vacíos ni sensibilidad de la recomendación.",
    description: "La muestra organiza demanda, infraestructura, Estado, entorno y riesgo para reducir alternativas y definir qué debe validarse antes de comprometer capital.",
    accent: "#a17a24",
    image: "/images/noam-private-sector.jpg",
    imageAlt: "Profesionales evaluando infraestructura y territorio para una inversión",
    duration: "4 a 10 semanas",
    decision: "Qué territorios pasan a diligencia profunda y qué supuestos deben verificarse antes de una recomendación final.",
    solutionSlug: "inteligencia-territorial-inversion",
    questions: ["¿Qué criterios hacen viable la inversión?", "¿Qué unidad geográfica representa la decisión real?", "¿Qué fuentes permiten comparar y cuáles requieren campo?", "¿Cuánto cambia el resultado cuando cambian los supuestos?"],
    modules: [
      { title: "Criterios", purpose: "Acordar variables, exclusiones, ponderaciones y umbrales.", output: "Marco de decisión" },
      { title: "Territorios", purpose: "Integrar mercado, infraestructura, instituciones y entorno.", output: "Base y perfiles" },
      { title: "Escenarios", purpose: "Comparar alternativas y probar sensibilidad a supuestos.", output: "Modelo multicriterio" },
      { title: "Diligencias", purpose: "Priorizar información primaria y validaciones pendientes.", output: "Brief para comité" }
    ],
    preview: { title: "Matriz de screening · Estructura demostrativa", columns: ["Dimensión", "Evidencia", "Tratamiento"], rows: [["Demanda", "Mercado + población", "Escenarios"], ["Accesibilidad", "Redes + tiempos", "Área de influencia"], ["Entorno", "Actores + regulación", "Riesgo"], ["Incertidumbre", "Vacíos + supuestos", "Diligencia"]] },
    timeline: [
      { period: "Semana 1", title: "Marco", description: "Decisión, criterios, geografía y restricciones." },
      { period: "Semanas 2–4", title: "Datos", description: "Integración, calidad y construcción de perfiles." },
      { period: "Semanas 5–7", title: "Escenarios", description: "Comparación, sensibilidad y revisión con negocio." },
      { period: "Semanas 8–10", title: "Validación", description: "Diligencias, recomendación y próximos pasos." }
    ],
    clientInputs: ["Objetivo y restricciones de inversión", "Variables comerciales disponibles", "Supuestos de operación y costos", "Criterios de comité y tolerancia al riesgo"],
    qualityControls: ["Variables y ponderaciones documentadas", "Comparabilidad geográfica revisada", "Sensibilidad a supuestos críticos", "Vacíos de información convertidos en diligencias"],
    deliverables: ["Base territorial integrada", "Perfiles y comparador", "Modelo de escenarios", "Recomendación y plan de validación"],
    related: [{ type: "Guía", label: "Elegir un estudio de mercado", href: "/estudios-mercado-inteligencia-territorial" }, { type: "Datos", label: "Explorar DataPerú", href: "/dataperu" }, { type: "TDR", label: "TDR para inteligencia territorial", href: "/toolkits/tdr-estudio-mercado-inteligencia-territorial" }, { type: "Solución", label: "Inteligencia territorial para inversión", href: "/solutions/inteligencia-territorial-inversion" }]
  },
  {
    slug: "monitoreo-entorno-impacto",
    number: "06",
    market: "Empresas",
    eyebrow: "Muestra · Entorno e impacto",
    title: "Sistema de monitoreo de entorno e impacto",
    shortTitle: "Monitoreo de entorno",
    promise: "Señales verificables conectadas con responsables, protocolos y decisiones de dirección.",
    description: "La muestra organiza fuentes públicas e internas, actores, compromisos y eventos sin convertir todo cambio de contexto en una alerta crítica.",
    accent: "#62724d",
    image: "/images/noam-private-sector.jpg",
    imageAlt: "Equipo empresarial revisando contexto territorial, compromisos e impacto",
    duration: "6 a 12 semanas",
    decision: "Qué señales requieren observación, validación o escalamiento y quién debe responder dentro de la organización.",
    solutionSlug: "monitoreo-entorno-impacto",
    questions: ["¿Qué cambios externos pueden afectar una decisión u operación?", "¿Qué fuente y evidencia confirman cada señal?", "¿Qué umbral justifica escalar y a quién?", "¿Cómo se vinculan compromisos, actores, territorios y resultados?"],
    modules: [
      { title: "Taxonomía", purpose: "Definir temas, actores, eventos, riesgos y compromisos.", output: "Modelo de información" },
      { title: "Detección", purpose: "Integrar fuentes, frecuencia, relevancia y reglas de alerta.", output: "Motor de señales" },
      { title: "Contexto", purpose: "Relacionar evidencia, territorio, historial y responsables.", output: "Fichas y dashboard" },
      { title: "Respuesta", purpose: "Instalar protocolos, reuniones y trazabilidad de decisiones.", output: "Rutina ejecutiva" }
    ],
    preview: { title: "Bitácora de señales · Estructura demostrativa", columns: ["Evento", "Validación", "Respuesta"], rows: [["Cambio normativo", "Fuente oficial", "Evaluar exposición"], ["Compromiso vencido", "Evidencia interna", "Escalar responsable"], ["Señal territorial", "Dos fuentes", "Monitorear"], ["Indicador de impacto", "Serie comparable", "Revisar intervención"]] },
    timeline: [
      { period: "Semanas 1–2", title: "Exposición", description: "Decisiones, temas, actores, territorios y riesgos." },
      { period: "Semanas 3–4", title: "Fuentes", description: "Taxonomía, captura, validación y reglas de relevancia." },
      { period: "Semanas 5–8", title: "Producto", description: "Fichas, visualizaciones, alertas y pruebas." },
      { period: "Semanas 9–12", title: "Operación", description: "Protocolos, responsables, reuniones y transferencia." }
    ],
    clientInputs: ["Mapa inicial de riesgos y actores", "Compromisos e indicadores vigentes", "Fuentes internas y proveedores actuales", "Protocolos de escalamiento y responsables"],
    qualityControls: ["Fuente y fecha por señal", "Separación entre evento, interpretación y riesgo", "Reglas de relevancia probadas", "Trazabilidad de respuesta y cierre"],
    deliverables: ["Taxonomía y mapa de información", "Dashboard y fichas territoriales", "Alertas y bitácora", "Protocolo ejecutivo y gobernanza"],
    related: [{ type: "Insight", label: "Diseñar sistemas que sirvan para decidir", href: "/insights/ocho-preguntas-observatorio-gestion" }, { type: "Servicio", label: "Observatorios y sistemas de decisión", href: "/services/observatorios-sistemas-decision" }, { type: "Solución", label: "Monitoreo de entorno e impacto", href: "/solutions/monitoreo-entorno-impacto" }]
  },
  {
    slug: "linea-base-evaluacion-programa",
    number: "07",
    market: "Gobiernos y empresas",
    eyebrow: "Muestra · Medición y aprendizaje",
    title: "Línea de base y evaluación de un programa",
    shortTitle: "Línea de base y evaluación",
    promise: "Una medición diseñada para decidir, no una colección de indicadores sin uso.",
    description: "La muestra conecta teoría de cambio, preguntas, indicadores, comparación e implementación. El diseño final depende del programa, la madurez de sus datos y la decisión que deberá sustentar.",
    accent: "#7c523f",
    image: "/images/noam-field-research.jpg",
    imageAlt: "Equipo de evaluación revisando evidencia de un programa y su implementación territorial",
    duration: "6 a 14 semanas",
    decision: "Qué evidencia permitirá sostener, corregir, rediseñar o escalar el programa sin atribuirle efectos que el diseño no puede demostrar.",
    solutionSlug: "linea-base-evaluacion-programas",
    questions: [
      "¿Qué decisión concreta debe sustentar la evaluación?",
      "¿Qué resultados deberían observarse y en qué horizonte?",
      "¿Qué comparación es viable con los datos y la implementación disponibles?",
      "¿Qué diferencias territoriales o poblacionales deben explicarse?"
    ],
    modules: [
      { title: "Teoría de cambio", purpose: "Conectar problema, intervención, mecanismos, resultados y supuestos.", output: "Mapa causal y preguntas" },
      { title: "Línea de base", purpose: "Definir población, indicadores, fuentes, instrumentos y punto de partida.", output: "Matriz y ficha técnica" },
      { title: "Evaluación", purpose: "Seleccionar comparación, análisis y límites de inferencia proporcionales.", output: "Diseño evaluativo" },
      { title: "Aprendizaje", purpose: "Interpretar resultados junto con implementación, contexto y decisiones.", output: "Informe y agenda de mejora" }
    ],
    preview: {
      title: "Matriz de evaluabilidad · Estructura demostrativa",
      columns: ["Pregunta", "Evidencia", "Decisión"],
      rows: [
        ["Cobertura", "Registro + población", "Corregir acceso"],
        ["Implementación", "Proceso + hitos", "Ajustar operación"],
        ["Resultado", "Indicador + comparación", "Sostener / revisar"],
        ["Heterogeneidad", "Segmentos + contexto", "Focalizar"]
      ]
    },
    timeline: [
      { period: "Semanas 1–2", title: "Evaluabilidad", description: "Decisiones, teoría de cambio, preguntas, datos y comparación posible." },
      { period: "Semanas 3–5", title: "Diseño", description: "Indicadores, instrumentos, muestra, protocolos y plan de análisis." },
      { period: "Semanas 6–10", title: "Medición", description: "Integración o levantamiento, calidad, análisis e implementación." },
      { period: "Semanas 11–14", title: "Aprendizaje", description: "Interpretación, contraste, decisiones y transferencia al equipo." }
    ],
    clientInputs: [
      "Diseño, reglas y documentos operativos del programa",
      "Acceso a responsables, registros y población pertinente",
      "Decisiones próximas de continuidad, rediseño o escala",
      "Restricciones éticas, territoriales, presupuestales y de calendario"
    ],
    qualityControls: [
      "Indicadores vinculados con preguntas y decisiones",
      "Población, cobertura, periodos y faltantes documentados",
      "Supuestos y límites de atribución explícitos",
      "Separación entre resultados, implementación y contexto"
    ],
    deliverables: [
      "Teoría de cambio y matriz de evaluación",
      "Línea de base y fichas de indicadores",
      "Base analítica, código y nota metodológica",
      "Informe, brief ejecutivo y agenda de aprendizaje"
    ],
    related: [
      { type: "Insight", label: "Cómo diseñar una línea de base", href: "/insights/como-disenar-linea-base-programa-publico" },
      { type: "Insight", label: "Cuándo evaluar impacto", href: "/insights/cuando-evaluacion-impacto-es-viable" },
      { type: "Solución", label: "Línea de base y evaluación de programas", href: "/solutions/linea-base-evaluacion-programas" }
    ]
  },
  {
    slug: "transferencia-gestion-100-dias",
    number: "08",
    market: "Gobiernos",
    eyebrow: "Muestra · Inicio de gestión",
    title: "Diagnóstico de transferencia y agenda de 100 días",
    shortTitle: "Transferencia y 100 días",
    promise: "De expedientes dispersos a decisiones críticas, responsables e hitos verificables.",
    description: "La muestra enseña cómo complementar el proceso formal de transferencia con una capa ejecutiva para proteger continuidad, ordenar riesgos y conducir las primeras decisiones de una nueva gestión.",
    accent: "#a65038",
    image: "/images/noam-decision-room.jpg",
    imageAlt: "Equipo de una nueva gestión revisando prioridades, riesgos y evidencia institucional",
    duration: "3 a 8 semanas",
    decision: "Qué debe atender la nueva autoridad en 72 horas, 30, 60 y 100 días, quién responde y qué evidencia permitirá verificar el avance.",
    solutionSlug: "transferencia-gestion-100-dias",
    questions: [
      "¿Qué servicios, contratos y decisiones no pueden perder continuidad?",
      "¿Qué asuntos requieren verificación antes de aceptar una conclusión?",
      "¿Qué compromisos son viables dentro de las competencias y recursos disponibles?",
      "¿Qué información debe revisar periódicamente la autoridad y su equipo?"
    ],
    modules: [
      { title: "Continuidad", purpose: "Identificar servicios, contratos, sistemas y funciones críticas.", output: "Mapa de continuidad" },
      { title: "Riesgos", purpose: "Separar hechos, pendientes, controversias, plazos y decisiones urgentes.", output: "Registro ejecutivo" },
      { title: "Prioridades", purpose: "Comparar compromisos y proyectos con criterios explícitos de valor y viabilidad.", output: "Agenda 30–60–100" },
      { title: "Conducción", purpose: "Asignar responsables, alertas, evidencias y una cadencia de revisión.", output: "Tablero inicial" }
    ],
    preview: {
      title: "Registro de transición · Estructura demostrativa",
      columns: ["Asunto", "Evidencia mínima", "Primera decisión"],
      rows: [
        ["Servicio crítico", "Operación + responsable", "Proteger continuidad"],
        ["Contrato o plazo", "Expediente + vencimiento", "Escalar revisión"],
        ["Proyecto prioritario", "Hito + restricción", "Destrabar / secuenciar"],
        ["Compromiso", "Competencia + recursos", "Priorizar / reformular"]
      ]
    },
    timeline: [
      { period: "Semana 1", title: "Preparación", description: "Equipo, decisiones críticas, accesos, fuentes y reglas de trabajo." },
      { period: "Semanas 2–3", title: "Lectura", description: "Documentos, riesgos, continuidad, cartera y preguntas pendientes." },
      { period: "Semanas 4–5", title: "Priorización", description: "Criterios, escenarios, responsables y agenda 30–60–100." },
      { period: "Semanas 6–8", title: "Instalación", description: "Tablero, reuniones, alertas, documentación y transferencia al equipo." }
    ],
    clientInputs: [
      "Informes, actas y repositorios del proceso formal de transferencia",
      "Cartera de inversiones, contratos, servicios y compromisos vigentes",
      "Acceso a responsables técnicos, administrativos y de alta dirección",
      "Restricciones legales, presupuestales, políticas y de calendario"
    ],
    qualityControls: [
      "Fuente, fecha de corte y responsable por cada asunto",
      "Separación entre hecho verificado, declaración y asunto pendiente",
      "Criterios reproducibles para prioridad y escalamiento",
      "Complementariedad explícita con las obligaciones formales de transferencia"
    ],
    deliverables: [
      "Diagnóstico ejecutivo de transferencia",
      "Registro de riesgos y asuntos críticos",
      "Matriz y agenda operativa de 100 días",
      "Tablero inicial y protocolo de reuniones"
    ],
    related: [
      { type: "Especial", label: "ERM 2026: territorio, transición y gestión", href: "/electoral/erm-2026" },
      { type: "Toolkit", label: "Protocolo mínimo de transferencia", href: "/toolkits/protocolo-transferencia-gestion" },
      { type: "Solución", label: "Transferencia de gestión y primeros 100 días", href: "/solutions/transferencia-gestion-100-dias" }
    ]
  },
  {
    slug: "diagnostico-desempeno-servicio-publico",
    number: "09",
    market: "Gobiernos",
    eyebrow: "Muestra · Gestión sectorial",
    title: "Diagnóstico de acceso y desempeño de un servicio público",
    shortTitle: "Diagnóstico de servicio público",
    promise: "De la cobertura declarada a una lectura de acceso, operación, calidad y resultado que permita actuar.",
    description: "Esta muestra presenta una arquitectura adaptable a educación, salud, agua, saneamiento y programas sociales. Separa registros administrativos, experiencia de usuarios, condiciones operativas y resultados antes de recomendar una intervención.",
    accent: "#6f6a3d",
    image: "/images/noam-public-sector.jpg",
    imageAlt: "Equipo público contrastando registros, territorio y condiciones de un servicio",
    duration: "5 a 9 semanas",
    decision: "Qué brecha del servicio debe corregirse primero, en qué población y territorio, mediante qué intervención y con qué evidencia se verificará el cambio.",
    solutionSlug: "diagnostico-agenda-territorial",
    questions: [
      "¿Quién necesita el servicio, quién accede y quién queda fuera?",
      "¿Qué capacidad y proceso explican la diferencia entre cobertura y prestación efectiva?",
      "¿Cómo varían oportunidad, continuidad, calidad y experiencia entre territorios y grupos?",
      "¿Qué intervención es viable y qué indicador permitirá revisar su resultado?"
    ],
    modules: [
      { title: "Población y acceso", purpose: "Definir necesidad, denominadores, cobertura efectiva, barreras y demanda no atendida.", output: "Mapa de acceso y exclusión" },
      { title: "Operación", purpose: "Contrastar capacidad registrada, recursos, procesos, continuidad e incidencias.", output: "Diagnóstico operativo" },
      { title: "Calidad y resultado", purpose: "Integrar estándares, experiencia, equidad y resultados sin confundir actividad con mejora.", output: "Matriz de desempeño" },
      { title: "Decisión", purpose: "Priorizar intervenciones, responsables, indicadores, riesgos y validaciones necesarias.", output: "Agenda sectorial" }
    ],
    preview: {
      title: "Cadena del servicio · Estructura demostrativa",
      columns: ["Capa", "Evidencia mínima", "Decisión"],
      rows: [
        ["Necesidad", "Población + territorio", "Dimensionar"],
        ["Acceso", "Cobertura + barreras", "Focalizar"],
        ["Operación", "Capacidad + proceso", "Corregir"],
        ["Resultado", "Calidad + cambio", "Sostener / rediseñar"]
      ]
    },
    timeline: [
      { period: "Semana 1", title: "Decisión", description: "Población, servicio, territorio, competencias, pregunta y criterios de uso." },
      { period: "Semanas 2–3", title: "Evidencia", description: "Registros, fuentes públicas, instrumentos, calidad, denominadores y brechas." },
      { period: "Semanas 4–6", title: "Diagnóstico", description: "Acceso, operación, experiencia, desigualdades, causas y restricciones." },
      { period: "Semanas 7–9", title: "Agenda", description: "Priorización, validación, indicadores, responsables y transferencia." }
    ],
    clientInputs: [
      "Definición del servicio, población y decisión que debe mejorar",
      "Registros, reportes, instrumentos de gestión y cartera vigente",
      "Acceso a responsables, prestadores y usuarios con protocolos adecuados",
      "Competencias, estándares, restricciones y calendario institucional"
    ],
    qualityControls: [
      "Población, atención, prestación y resultado diferenciados",
      "Fuentes, periodos, denominadores y cobertura documentados",
      "Datos personales minimizados y productos públicos protegidos",
      "Hallazgos, hipótesis, límites y criterios de prioridad trazables"
    ],
    deliverables: [
      "Informe navegable de acceso y desempeño",
      "Base analítica, diccionario y nota de calidad",
      "Mapa o tablero de brechas y prioridades",
      "Agenda de intervención, indicadores y transferencia"
    ],
    related: [
      { type: "Directorio", label: "Servicios por tema de gestión", href: "/services" },
      { type: "Agua", label: "Análisis de agua y saneamiento", href: "/analisis-datos-agua-saneamiento" },
      { type: "Movilidad", label: "Análisis de movilidad y transporte", href: "/analisis-datos-movilidad-transporte" },
      { type: "Salud", label: "Análisis de salud territorial", href: "/analisis-datos-salud-territorial" },
      { type: "Educación", label: "Análisis de educación territorial", href: "/analisis-datos-educacion-territorial" },
      { type: "Social", label: "Análisis de políticas y programas sociales", href: "/analisis-datos-politicas-sociales" },
      { type: "TDR", label: "TDR general para estudios y análisis", href: "/toolkits/tdr-estudio-analisis-datos" }
    ]
  }
];

export function getDeliverableSample(slug: string) {
  return deliverableSamples.find((sample) => sample.slug === slug);
}

export function getDeliverableSampleBySolution(solutionSlug: SolutionSlug) {
  return deliverableSamples.find((sample) => sample.solutionSlug === solutionSlug);
}
