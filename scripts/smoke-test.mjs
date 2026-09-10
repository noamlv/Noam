import assert from "node:assert/strict";

const baseUrl = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000";

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(baseUrl, { redirect: "manual" });
      if (response.ok) return;
    } catch {
      // The production server can need a few seconds after the process starts.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`El servidor no respondió en ${baseUrl}`);
}

async function get(path, options) {
  return fetch(new URL(path, baseUrl), { redirect: "manual", ...options });
}

async function expectHtml(path, text, options) {
  const response = await get(path, options);
  assert.equal(response.status, 200, `${path} debe responder 200`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html/, `${path} debe ser HTML`);
  const body = await response.text();
  assert.ok(body.includes(text), `${path} debe contener ${text}`);
  assert.equal((body.match(/<h1\b/g) ?? []).length, 1, `${path} debe contener un único h1`);
  return { response, body };
}

await waitForServer();

const publicPages = [
  ["/", "Análisis de datos para decisiones públicas y territoriales"],
  ["/solutions", "Una decisión concreta"],
  ["/solutions/diagnostico-agenda-territorial", "Una lectura compartida del territorio"],
  ["/solutions/observatorio-gestion-inversiones", "Indicadores, proyectos y alertas reunidos"],
  ["/solutions/ia-procesos-publicos", "Un proceso concreto, un piloto controlado"],
  ["/solutions/linea-base-evaluacion-programas", "Medir el punto de partida"],
  ["/solutions/transferencia-gestion-100-dias", "Convertir información, riesgos y compromisos"],
  ["/sectors", "Decisiones distintas"],
  ["/services", "capacidad que funciona"],
  ["/como-trabajamos", "Un encargo claro"],
  ["/cases", "Trabajo que se puede examinar"],
  ["/evidence", "Biblioteca NOAM"],
  ["/electoral", "Elecciones"],
  ["/electoral/erm-2026", "De la elección a una gestión que pueda comenzar"],
  ["/electoral/barometro-enero-2026", "Barómetro Electoral"],
  ["/electoral/planometro-2026", "Leer miles de propuestas sin perder la fuente"],
  ["/electoral/planometro-2026/organizaciones", "Treinta y seis planes. Una lectura comparable."],
  ["/electoral/planometro-2026/organizaciones/ahora-nacion", "Ahora Nación"],
  ["/electoral/planometro-2026/ejes", "Once puertas para leer la agenda."],
  ["/electoral/planometro-2026/ejes/institucionalidad", "Institucionalidad"],
  ["/electoral/erm-2026/territorios/150122", "Brief territorial de preparación de gestión"],
  ["/dataperu", "DataPerú"],
  ["/dataperu/departamentos", "El país cambia cuando cambia la escala"],
  ["/dataperu/panorama-municipal-2025", "El Perú municipal no cabe en un promedio."],
  ["/dataperu/departamentos/08", "Una lectura inicial de recursos"],
  ["/dataperu/radar", "La gestión municipal, vista en contexto"],
  ["/dataperu/inversiones", "La cartera se entiende proyecto por proyecto"],
  ["/dataperu/mapa", "Las decisiones también tienen geografía"],
  ["/products/ai-governance-lab", "Antes de construir IA, decide si vale la pena"],
  ["/resources", "Bienes públicos digitales"],
  ["/newsletter", "Una señal útil, no otra bandeja llena."],
  ["/newsletter/check-email", "Si la dirección requiere confirmación"],
  ["/newsletter/confirm?status=invalid", "El enlace no es válido o ya fue utilizado."],
  ["/newsletter/unsubscribe?status=invalid", "El enlace no es válido o la baja ya fue procesada."],
  ["/dataperu/municipios", "Perfiles municipales"],
  ["/dataperu/municipios/150101", "Lima"],
  ["/contact", "Comencemos por la decisión"],
  ["/diagnostico", "Convierte una necesidad en un punto de partida."],
  ["/contratar-analisis-datos", "El análisis correcto empieza por la decisión"],
  ["/diagnostico-territorial", "Un territorio no se diagnostica con una tabla"],
  ["/encuestas-estudios-opinion", "Una encuesta útil no empieza con preguntas"],
  ["/observatorios-dashboards-visores", "Un dashboard muestra datos"],
  ["/ia-automatizacion-gobiernos-empresas", "La IA no es el servicio"],
  ["/estudios-mercado-inteligencia-territorial", "Un estudio útil no describe todo"],
  ["/analisis-datos-seguridad-ciudadana", "La seguridad no se gestiona con un solo mapa"],
  ["/analisis-datos-residuos-limpieza-publica", "La cobertura declarada no muestra cómo funciona cada ruta"],
  ["/analisis-datos-gestion-riesgo-desastres", "Un mapa de peligros no decide qué proteger primero"],
  ["/analisis-datos-desarrollo-economico-local", "Una feria o una licencia emitida no demuestran desarrollo económico"],
  ["/analisis-datos-gestion-ambiental", "Tener una política y un plan no demuestra mejora ambiental"],
  ["/analisis-datos-agua-saneamiento", "Una conexión registrada no demuestra agua segura ni servicio continuo"],
  ["/analisis-datos-movilidad-transporte", "Contar vehículos no explica cómo se mueve una ciudad"],
  ["/analisis-datos-politicas-sociales", "Estar en un padrón no demuestra que una necesidad fue atendida"],
  ["/analisis-datos-salud-territorial", "Registrar atenciones no demuestra que la población recibió cuidado oportuno"],
  ["/analisis-datos-educacion-territorial", "Una matrícula registrada no demuestra que un estudiante aprende ni permanece"],
  ["/analisis-inversion-publica-proyectos", "La ejecución presupuestal no demuestra avance físico ni un servicio operativo"],
  ["/analisis-contrataciones-publicas-proveedores", "Comprar mejor exige mirar más que el procedimiento"],
  ["/linea-base-evaluacion-impacto", "Línea de base, resultados o impacto"],
  ["/insights/panorama-municipal-peru-2025", "El Perú municipal no cabe en un promedio"],
  ["/toolkits/tdr-estudio-analisis-datos", "Cómo elaborar TDR para un estudio o servicio de análisis de datos"],
  ["/toolkits/tdr-encuesta-estudio-territorial", "Cómo elaborar TDR para una encuesta o estudio territorial"],
  ["/toolkits/tdr-observatorio-dashboard-visor", "Cómo elaborar TDR para un observatorio, dashboard o visor"],
  ["/toolkits/tdr-linea-base-evaluacion-programa", "Cómo elaborar TDR para una línea de base o evaluación de programas"],
  ["/toolkits/tdr-diagnostico-territorial-institucional", "Cómo elaborar TDR para un diagnóstico territorial e institucional"],
  ["/toolkits/tdr-estudio-mercado-inteligencia-territorial", "Cómo elaborar TDR para un estudio de mercado e inteligencia territorial"],
  ["/toolkits/tdr-analisis-seguridad-ciudadana", "Cómo elaborar TDR para un diagnóstico u observatorio de seguridad ciudadana"],
  ["/toolkits/tdr-analisis-residuos-limpieza-publica", "Cómo elaborar TDR para analizar residuos sólidos y limpieza pública"],
  ["/toolkits/tdr-analisis-gestion-riesgo-desastres", "Cómo elaborar TDR para analizar y gestionar el riesgo de desastres"],
  ["/toolkits/tdr-analisis-desarrollo-economico-local", "Cómo elaborar TDR para analizar el desarrollo económico local"],
  ["/toolkits/tdr-analisis-gestion-ambiental", "Cómo elaborar TDR para analizar la gestión ambiental"],
  ["/toolkits/tdr-analisis-agua-saneamiento", "Cómo elaborar TDR para analizar agua y saneamiento"],
  ["/toolkits/tdr-analisis-movilidad-transporte", "Cómo elaborar TDR para analizar movilidad y transporte"],
  ["/toolkits/tdr-analisis-politicas-sociales", "Cómo elaborar TDR para analizar políticas y programas sociales"],
  ["/toolkits/tdr-analisis-salud-territorial", "Cómo elaborar TDR para analizar salud territorial"],
  ["/toolkits/tdr-analisis-educacion-territorial", "Cómo elaborar TDR para analizar educación territorial"],
  ["/toolkits/tdr-analisis-inversion-publica", "Cómo elaborar TDR para analizar inversión pública y proyectos"],
  ["/toolkits/tdr-analisis-contrataciones-publicas", "Cómo elaborar TDR para analizar contrataciones públicas y proveedores"],
  ["/muestras", "Mira la forma del trabajo antes de contratarlo."],
  ["/muestras/diagnostico-agenda-territorial", "Diagnóstico territorial y agenda priorizada"],
  ["/muestras/piloto-ia-documental", "Piloto de IA para documentos y conocimiento"],
  ["/muestras/linea-base-evaluacion-programa", "Línea de base y evaluación de un programa"],
  ["/muestras/transferencia-gestion-100-dias", "Diagnóstico de transferencia y agenda de 100 días"],
  ["/muestras/diagnostico-desempeno-servicio-publico", "Diagnóstico de acceso y desempeño de un servicio público"],
  ["/about", "Inteligencia para instituciones que mueven el territorio"],
  ["/cv", "Noam López Villanes"],
  ["/privacy", "Datos personales"],
  ["/terms", "Información abierta. Responsabilidades claras."],
  ["/transparency", "La confianza también se diseña."],
  ["/en", "Evidence for decisions that shape territories."],
  ["/buscar", "Encuentra una respuesta, una herramienta o un punto de partida."],
  ["/admin/login", "Cada operador utiliza una identidad propia."]
];

for (const [path, text] of publicPages) await expectHtml(path, text);

const servicesDirectory = await expectHtml("/services", "Encuentra el punto de partida");
assert.ok(servicesDirectory.body.includes("Por tipo de encargo"), "Servicios debe permitir buscar por tipo de encargo");
assert.ok(servicesDirectory.body.includes("Por tema de gestión"), "Servicios debe permitir buscar por tema de gestión");
assert.ok(servicesDirectory.body.includes('data-analytics-target="services:sector:gestion-ambiental"'), "El directorio debe medir la selección sectorial");

const publicSectorDirectory = await expectHtml("/sectors/public-sector", "Rutas para una necesidad pública");
assert.ok(publicSectorDirectory.body.includes('data-analytics-target="public-sector:agenda:desarrollo-economico"'), "Sector público debe enlazar la agenda económica");
assert.ok(publicSectorDirectory.body.includes("Gestión ambiental"), "Sector público debe incluir la agenda ambiental");
assert.ok(publicSectorDirectory.body.includes("Agua y saneamiento"), "Sector público debe incluir agua y saneamiento");
assert.ok(publicSectorDirectory.body.includes("Movilidad y transporte"), "Sector público debe incluir movilidad y transporte");
assert.ok(publicSectorDirectory.body.includes("Políticas y programas sociales"), "Sector público debe incluir políticas sociales");
assert.ok(publicSectorDirectory.body.includes("Salud territorial"), "Sector público debe incluir salud territorial");
assert.ok(publicSectorDirectory.body.includes("Inversión pública y proyectos"), "Sector público debe incluir inversión pública y proyectos");

const englishPage = await expectHtml("/en", "English overview");
assert.ok(englishPage.body.includes('lang="en"'), "La portada internacional debe declarar su idioma");
assert.ok(englishPage.body.includes('hrefLang="en"'), "La portada internacional debe publicar su alternante EN");
assert.ok(englishPage.body.includes("https://noam.pe/en"), "La portada internacional debe usar canonical absoluto");
assert.ok(!englishPage.body.includes("queued for V2"), "La portada internacional no puede ser un placeholder");

const searchPage = await expectHtml("/buscar?q=municipalidades", "Perfiles municipales de DataPerú");
assert.ok(searchPage.body.includes('name="robots" content="noindex, follow"') || searchPage.body.includes('name="robots" content="noindex"'), "Los resultados de búsqueda no deben indexarse");
await expectHtml("/buscar?q=servicios+analisis+datos+gobierno", "Servicios de análisis de datos para gobiernos y empresas");
await expectHtml("/buscar?q=automatizacion&type=solution&topic=ia", "IA para procesos públicos");
await expectHtml("/buscar?q=linea+base+evaluacion", "Línea de base y evaluación de programas");
await expectHtml("/buscar?q=evaluacion+de+impacto", "Línea de base y evaluación de programas");
await expectHtml("/buscar?q=diagnostico+territorial+municipal", "Diagnóstico territorial para gobiernos y empresas");
await expectHtml("/buscar?q=encuesta+satisfaccion+ciudadana", "Encuestas y estudios de opinión para gobiernos y empresas");
await expectHtml("/buscar?q=dashboard+visor+geografico", "Observatorios, dashboards y visores para gobiernos y empresas");
await expectHtml("/buscar?q=chatbot+automatizacion+gobierno", "IA y automatización para gobiernos y empresas");
await expectHtml("/buscar?q=estudio+mercado+localizacion", "Estudios de mercado e inteligencia territorial en Perú");
await expectHtml("/buscar?q=mapa+del+delito+CODISEC", "Análisis de datos para seguridad ciudadana municipal y regional");
await expectHtml("/buscar?q=optimizar+rutas+recoleccion+SIGERSOL", "Análisis de datos para residuos sólidos y limpieza pública");
await expectHtml("/buscar?q=PPRRD+COEL+SIGRID", "Análisis de datos para la gestión del riesgo de desastres");
await expectHtml("/buscar?q=MYPE+empleo+local+cadenas+de+valor", "Análisis de datos para desarrollo económico local");
await expectHtml("/buscar?q=PLANEFA+monitoreo+fiscalizacion+ambiental", "Análisis de datos para la gestión ambiental");
await expectHtml("/buscar?q=DATASS+continuidad+agua+JASS", "Análisis de datos para agua y saneamiento");
await expectHtml("/buscar?q=PMUS+aforo+seguridad+vial", "Análisis de datos para movilidad y transporte");
await expectHtml("/buscar?q=SISFOH+brecha+cobertura+programa+social", "Análisis de datos para políticas y programas sociales");
await expectHtml("/buscar?q=REUNIS+IPRESS+sala+situacion", "Análisis de datos para salud territorial");
await expectHtml("/buscar?q=ENLA+ESCALE+trayectoria+aprendizaje", "Análisis de datos para educación territorial");
await expectHtml("/buscar?q=Invierte.pe+avance+fisico+cartera+proyectos", "Análisis de inversión pública, presupuesto y proyectos");
await expectHtml("/buscar?q=contratar+analisis+datos", "Contratar estudios y servicios de análisis de datos");
await expectHtml("/buscar?q=transferencia+gestion+100+dias", "Transferencia de gestión y primeros 100 días");
await expectHtml("/buscar?q=consulta-sin-coincidencia-xyz", "No encontramos una coincidencia precisa.");
await expectHtml("/resources?type=dataset&product=planometro-electoral", "Planómetro 2026: organizaciones");
await expectHtml("/buscar?q=limites+departamentales&type=evidence", "Límites departamentales referenciales");
await expectHtml("/buscar?q=boletin", "Brief NOAM");

const visualHome = await expectHtml("/", "Amazonía | Conectividad y servicios", {
  headers: { cookie: "noam_hero_index=0" }
});
assert.ok(visualHome.body.includes("/images/editorial/hero-amazonia-conectividad.jpg"));
assert.ok(visualHome.body.includes("navigator:toggle"), "El Orientador debe medir aperturas cuando la analítica esté disponible");
assert.ok(visualHome.body.includes('"@type":"WebSite"'), "La portada debe identificar el sitio en datos estructurados");

const fieldSolution = await expectHtml("/solutions/diagnostico-agenda-territorial", "Escena editorial representativa");
assert.ok(fieldSolution.body.includes("/images/noam-field-research.jpg"));

const aiService = await expectHtml("/services/ia-transformacion-gestion", "Escena editorial representativa");
assert.ok(aiService.body.includes("/images/noam-ai-oversight.jpg"));

const contactPage = await expectHtml("/contact", "Comencemos por la decisión");
const hasPersistentForm = contactPage.body.includes("Añadir detalles del proyecto");
const hasSafeFallback = contactPage.body.includes("Contacto directo y trazable.");
assert.ok(hasPersistentForm || hasSafeFallback, "Contacto debe ofrecer formulario persistente o canales directos seguros");
if (hasPersistentForm) {
  const localEconomyContact = await expectHtml("/contact?interest=desarrollo-economico-local&from=/analisis-datos-desarrollo-economico-local", "Desarrollo económico local, empleo y MYPE");
  assert.ok(localEconomyContact.body.includes('value="desarrollo-economico-local" selected'), "Contacto debe conservar el interés económico seleccionado");
  const waterContact = await expectHtml("/contact?interest=agua-saneamiento&from=/analisis-datos-agua-saneamiento", "Agua, saneamiento y prestación de servicios");
  assert.ok(waterContact.body.includes('value="agua-saneamiento" selected'), "Contacto debe conservar el interés de agua y saneamiento");
  const mobilityContact = await expectHtml("/contact?interest=movilidad-transporte&from=/analisis-datos-movilidad-transporte", "Movilidad, transporte y seguridad vial");
  assert.ok(mobilityContact.body.includes('value="movilidad-transporte" selected'), "Contacto debe conservar el interés de movilidad");
  const socialPolicyContact = await expectHtml("/contact?interest=politicas-sociales&from=/analisis-datos-politicas-sociales", "Políticas, programas y servicios sociales");
  assert.ok(socialPolicyContact.body.includes('value="politicas-sociales" selected'), "Contacto debe conservar el interés de políticas sociales");
  const healthContact = await expectHtml("/contact?interest=salud-territorial&from=/analisis-datos-salud-territorial", "Salud pública, servicios y análisis territorial");
  assert.ok(healthContact.body.includes('value="salud-territorial" selected'), "Contacto debe conservar el interés de salud");
  const educationContact = await expectHtml("/contact?interest=educacion-territorial&from=/analisis-datos-educacion-territorial", "Educación, aprendizaje y trayectorias");
  assert.ok(educationContact.body.includes('value="educacion-territorial" selected'), "Contacto debe conservar el interés de educación");
  const investmentContact = await expectHtml("/contact?interest=inversion-publica-proyectos&from=/analisis-inversion-publica-proyectos", "Inversión pública, presupuesto y proyectos");
  assert.ok(investmentContact.body.includes('value="inversion-publica-proyectos" selected'), "Contacto debe conservar el interés de inversión pública");
  const procurementContact = await expectHtml("/contact?interest=contrataciones-publicas&from=/analisis-contrataciones-publicas-proveedores", "Contrataciones públicas y análisis de proveedores");
  assert.ok(procurementContact.body.includes('value="contrataciones-publicas" selected'), "Contacto debe conservar el interés de contrataciones públicas");
  assert.ok(contactPage.body.includes("Campos obligatorios"), "Contacto debe distinguir campos esenciales");
  assert.ok(contactPage.body.includes("Opcional · ayuda a preparar mejor la primera conversación"), "Contacto debe explicar los detalles opcionales");
} else {
  assert.ok(contactPage.body.includes("Abrir WhatsApp"), "El modo sin persistencia debe ofrecer WhatsApp");
  assert.ok(contactPage.body.includes("Escribir por email"), "El modo sin persistencia debe ofrecer email");
}

const home = await get("/");
const csp = home.headers.get("content-security-policy") ?? "";
assert.ok(csp.includes("default-src 'self'"), "Debe existir CSP");
assert.ok(csp.includes("frame-ancestors 'none'"), "CSP debe impedir framing");
assert.ok(!csp.includes("unsafe-eval"), "Producción no debe habilitar unsafe-eval");
assert.equal(home.headers.get("x-content-type-options"), "nosniff");
assert.equal(home.headers.get("x-frame-options"), "DENY");
assert.equal(home.headers.get("referrer-policy"), "strict-origin-when-cross-origin");

const aboutPage = await expectHtml("/about", "Dirección pública seleccionada");
assert.ok(aboutPage.body.includes("Noam López Villanes"), "Sobre NOAM debe identificar al fundador");
assert.ok(aboutPage.body.includes("linkedin.com/in/noamlv"), "Sobre NOAM debe publicar el perfil profesional");
assert.ok(aboutPage.body.includes('"@type":"Person"'), "Sobre NOAM debe publicar schema Person");

const cvPage = await expectHtml("/cv", "Versión pública resumida");
assert.ok(cvPage.body.includes("/docs/noam-cv-public.pdf"), "El perfil debe enlazar el CV público");
assert.ok(!cvPage.body.includes("/docs/noam-cv.pdf"), "El perfil no debe enlazar el expediente histórico");

const publicCvPdf = await get("/docs/noam-cv-public.pdf", { method: "HEAD" });
assert.equal(publicCvPdf.status, 200, "El CV público debe ser descargable");
assert.match(publicCvPdf.headers.get("content-type") ?? "", /^application\/pdf/);
assert.match(publicCvPdf.headers.get("x-robots-tag") ?? "", /noindex/);

const historicalCvPdf = await get("/docs/noam-cv.pdf", { method: "HEAD" });
assert.equal(historicalCvPdf.status, 200, "El expediente histórico existente debe conservarse");
assert.equal(historicalCvPdf.headers.get("x-robots-tag"), "noindex, nofollow, noarchive");

const admin = await get("/admin");
assert.ok([307, 308].includes(admin.status), "Admin debe permanecer cerrado sin sesión");
assert.equal(new URL(admin.headers.get("location"), baseUrl).pathname, "/admin/login");

const adminLogin = await expectHtml("/admin/login", "Cada operador utiliza una identidad propia.");
assert.ok(!adminLogin.body.includes("NOAM_ADMIN_TOKEN"), "El login principal no debe instruir compartir el secreto heredado");
const adminSecurity = await get("/admin/security");
assert.ok([307, 308].includes(adminSecurity.status), "Seguridad administrativa debe requerir sesión");
const adminCampaigns = await get("/admin/audience/campaigns");
assert.ok([307, 308].includes(adminCampaigns.status), "Campañas editoriales deben requerir sesión operativa");

const leads = await get("/api/leads");
assert.equal(leads.status, 401, "La lectura de leads debe requerir autenticación");

const invalidEvent = await get("/api/events", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ eventName: "invalid", path: "/" })
});
assert.equal(invalidEvent.status, 400, "Eventos inválidos deben rechazarse");
assert.match(invalidEvent.headers.get("cache-control") ?? "", /no-store/);

if (process.env.SMOKE_EXPECT_DB_UNAVAILABLE === "true") {
  const unavailableLead = await get("/api/leads", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "Prueba de disponibilidad",
      email: "qa@example.com",
      organizationType: "company",
      interest: "diagnostico-agenda-territorial",
      message: "Verificación automatizada sin persistir información real.",
      source: "smoke",
      originPath: "/contact",
      consent: true
    })
  });
  assert.equal(unavailableLead.status, 503, "Producción sin Postgres debe fallar de forma explícita");
  assert.match(unavailableLead.headers.get("cache-control") ?? "", /no-store/);
}

const og = await get("/og/municipios/150101");
assert.equal(og.status, 200);
assert.equal(og.headers.get("content-type"), "image/png");
const ogBytes = Buffer.from(await og.arrayBuffer());
assert.deepEqual([...ogBytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], "OG debe ser PNG");
assert.equal(ogBytes.readUInt32BE(16), 1200, "OG debe medir 1200 px");
assert.equal(ogBytes.readUInt32BE(20), 630, "OG debe medir 630 px");

const ermOg = await get("/og/electoral/erm-2026");
assert.equal(ermOg.status, 200, "ERM 2026 debe tener una imagen OG dinámica");
assert.equal(ermOg.headers.get("content-type"), "image/png");

const radarOg = await get("/og/dataperu/radar");
assert.equal(radarOg.status, 200, "Radar DataPerú debe tener una imagen OG dinámica");
assert.equal(radarOg.headers.get("content-type"), "image/png");

const investmentsOg = await get("/og/dataperu/inversiones");
assert.equal(investmentsOg.status, 200, "Observatorio de inversiones debe tener una imagen OG dinámica");
assert.equal(investmentsOg.headers.get("content-type"), "image/png");

const mapOg = await get("/og/dataperu/mapa");
assert.equal(mapOg.status, 200, "Mapa DataPerú debe tener una imagen OG dinámica");
assert.equal(mapOg.headers.get("content-type"), "image/png");

const departmentOg = await get("/og/dataperu/departamentos");
assert.equal(departmentOg.status, 200, "Atlas departamental debe tener una imagen OG dinámica");
assert.equal(departmentOg.headers.get("content-type"), "image/png");

const panoramaOg = await get("/og/dataperu/panorama-municipal-2025");
assert.equal(panoramaOg.status, 200, "El panorama municipal debe tener una imagen OG dinámica");
assert.equal(panoramaOg.headers.get("content-type"), "image/png");

const cuscoOg = await get("/og/departamentos/08");
assert.equal(cuscoOg.status, 200, "Perfil departamental debe tener una imagen OG dinámica");
assert.equal(cuscoOg.headers.get("content-type"), "image/png");

const aiLabOg = await get("/og/products/ai-governance-lab");
assert.equal(aiLabOg.status, 200, "Laboratorio de IA debe tener una imagen OG dinámica");
assert.equal(aiLabOg.headers.get("content-type"), "image/png");

const scopeBuilderOg = await get("/og/products/scope-builder");
assert.equal(scopeBuilderOg.status, 200, "El Diseñador de alcance debe tener una imagen OG dinámica");
assert.equal(scopeBuilderOg.headers.get("content-type"), "image/png");

const sampleOg = await get("/og/muestras/diagnostico-agenda-territorial");
assert.equal(sampleOg.status, 200, "Las muestras deben tener una imagen OG dinámica");
assert.equal(sampleOg.headers.get("content-type"), "image/png");

const planometroOg = await get("/og/electoral/planometro-2026");
assert.equal(planometroOg.status, 200, "Planómetro debe tener una imagen OG dinámica");
assert.equal(planometroOg.headers.get("content-type"), "image/png");

const planometroOrganizationOg = await get("/og/planometro-organizaciones/ahora-nacion");
assert.equal(planometroOrganizationOg.status, 200, "Los perfiles de organizaciones deben tener una imagen OG dinámica");
assert.equal(planometroOrganizationOg.headers.get("content-type"), "image/png");

const planometroAxisOg = await get("/og/planometro-ejes/institucionalidad");
assert.equal(planometroAxisOg.status, 200, "Los ejes de Planómetro deben tener una imagen OG dinámica");
assert.equal(planometroAxisOg.headers.get("content-type"), "image/png");

const barometroOg = await get("/og/electoral/barometro-enero-2026");
assert.equal(barometroOg.status, 200, "Barómetro debe tener una imagen OG dinámica");
assert.equal(barometroOg.headers.get("content-type"), "image/png");

const legacyPlanometro = await get("/demos/planometro");
assert.ok([307, 308].includes(legacyPlanometro.status), "La ruta histórica de Planómetro debe redirigir");
assert.equal(new URL(legacyPlanometro.headers.get("location"), baseUrl).pathname, "/electoral/planometro-2026");

const legacyBarometro = await get("/demos/barometro-electoral");
assert.ok([307, 308].includes(legacyBarometro.status), "La ruta histórica de Barómetro debe redirigir");
assert.equal(new URL(legacyBarometro.headers.get("location"), baseUrl).pathname, "/electoral/barometro-enero-2026");

const csv = await get("/dataperu/municipios/150101/data.csv");
assert.equal(csv.status, 200);
assert.match(csv.headers.get("content-type") ?? "", /^text\/csv/);
assert.match(csv.headers.get("content-disposition") ?? "", /attachment/);
assert.equal(csv.headers.get("x-robots-tag"), "noindex");
const csvBody = await csv.text();
assert.ok(csvBody.includes("fuente_url"));
assert.ok(csvBody.includes("Presupuesto institucional modificado"));

const investmentsApi = await get("/api/dataperu/investments?department=08");
assert.equal(investmentsApi.status, 200, "La API de inversiones debe responder para Cusco");
assert.match(investmentsApi.headers.get("cache-control") ?? "", /public/);
const investmentsPayload = await investmentsApi.json();
assert.equal(investmentsPayload.department.code, "08");
assert.ok(investmentsPayload.projects.length > 0, "Cusco debe publicar proyectos visibles");
assert.ok(investmentsPayload.projects.every((project) => project.departmentCode === "08"), "La API no debe mezclar departamentos");

const invalidInvestmentsApi = await get("/api/dataperu/investments?department=xx");
assert.equal(invalidInvestmentsApi.status, 400, "La API debe rechazar códigos departamentales inválidos");

const boundaries = await get("/downloads/peru-departments-reference-2025.geojson");
assert.equal(boundaries.status, 200, "El GeoJSON departamental debe ser descargable");
assert.match(boundaries.headers.get("content-type") ?? "", /json/);
const boundariesPayload = await boundaries.json();
assert.equal(boundariesPayload.features.length, 25, "El GeoJSON debe publicar 25 geometrías");

const panoramaCsv = await get("/dataperu/panorama-municipal-2025/data.csv");
assert.equal(panoramaCsv.status, 200, "Los agregados del panorama deben ser descargables");
assert.match(panoramaCsv.headers.get("content-type") ?? "", /^text\/csv/);
assert.equal(panoramaCsv.headers.get("x-robots-tag"), "noindex");
const panoramaCsvBody = await panoramaCsv.text();
assert.ok(panoramaCsvBody.includes("updated_transparency_percent"));
assert.equal(panoramaCsvBody.trim().split("\n").length, 26, "El CSV debe publicar encabezado y 25 departamentos");

const planometroPartiesCsv = await get("/downloads/planometro-2026-partidos.csv");
assert.equal(planometroPartiesCsv.status, 200, "El agregado de organizaciones debe ser descargable");
assert.match(planometroPartiesCsv.headers.get("content-type") ?? "", /^text\/csv/);
assert.equal((await planometroPartiesCsv.text()).trim().split("\n").length, 37);

const planometroAxesCsv = await get("/downloads/planometro-2026-ejes.csv");
assert.equal(planometroAxesCsv.status, 200, "El agregado temático debe ser descargable");
assert.match(planometroAxesCsv.headers.get("content-type") ?? "", /^text\/csv/);
assert.equal((await planometroAxesCsv.text()).trim().split("\n").length, 12);

const tdrTemplateCsv = await get("/downloads/plantilla-tdr-estudio-analisis-datos.csv");
assert.equal(tdrTemplateCsv.status, 200, "La matriz para TDR debe ser descargable");
assert.match(tdrTemplateCsv.headers.get("content-type") ?? "", /^text\/csv/);
const tdrTemplateBody = await tdrTemplateCsv.text();
assert.ok(tdrTemplateBody.includes("criterio_de_aceptacion"), "La matriz TDR debe incluir criterios de aceptación");
assert.equal(tdrTemplateBody.trim().split("\n").length, 17, "La matriz TDR debe incluir encabezado y dieciséis bloques");

const surveyTdrCsv = await get("/downloads/plantilla-tdr-encuesta-estudio-territorial.csv");
assert.equal(surveyTdrCsv.status, 200, "La plantilla TDR de encuestas debe ser descargable");
assert.match(surveyTdrCsv.headers.get("content-type") ?? "", /^text\/csv/);
const surveyTdrBody = await surveyTdrCsv.text();
assert.ok(surveyTdrBody.startsWith("bloque,pregunta_guia"), "La plantilla TDR de encuestas debe conservar su encabezado");
assert.equal(surveyTdrBody.trim().split("\n").length, 19, "La plantilla TDR de encuestas debe incluir encabezado y dieciocho bloques");

const observatoryTdrCsv = await get("/downloads/plantilla-tdr-observatorio-dashboard-visor.csv");
assert.equal(observatoryTdrCsv.status, 200, "La plantilla TDR de observatorios debe ser descargable");
assert.match(observatoryTdrCsv.headers.get("content-type") ?? "", /^text\/csv/);
const observatoryTdrBody = await observatoryTdrCsv.text();
assert.ok(observatoryTdrBody.startsWith("bloque,pregunta_guia"), "La plantilla TDR de observatorios debe conservar su encabezado");
assert.equal(observatoryTdrBody.trim().split("\n").length, 19, "La plantilla TDR de observatorios debe incluir encabezado y dieciocho bloques");

const marketTdrCsv = await get("/downloads/plantilla-tdr-estudio-mercado-inteligencia-territorial.csv");
assert.equal(marketTdrCsv.status, 200, "La plantilla TDR de estudios de mercado debe ser descargable");
assert.match(marketTdrCsv.headers.get("content-type") ?? "", /^text\/csv/);
const marketTdrBody = await marketTdrCsv.text();
assert.ok(marketTdrBody.startsWith("bloque,pregunta_guia"), "La plantilla TDR de mercado debe conservar su encabezado");
assert.equal(marketTdrBody.trim().split("\n").length, 19, "La plantilla TDR de mercado debe incluir encabezado y dieciocho bloques");

const securityTdrCsv = await get("/downloads/plantilla-tdr-analisis-seguridad-ciudadana.csv");
assert.equal(securityTdrCsv.status, 200, "La plantilla TDR de seguridad ciudadana debe ser descargable");
assert.match(securityTdrCsv.headers.get("content-type") ?? "", /^text\/csv/);
const securityTdrBody = await securityTdrCsv.text();
assert.ok(securityTdrBody.includes("Privacidad y ética"), "La plantilla de seguridad debe exigir protección de datos");
assert.equal(securityTdrBody.trim().split("\n").length, 21, "La plantilla de seguridad debe incluir encabezado y veinte bloques");

const wasteTdrCsv = await get("/downloads/plantilla-tdr-analisis-residuos-limpieza-publica.csv");
assert.equal(wasteTdrCsv.status, 200, "La plantilla TDR de residuos debe ser descargable");
assert.match(wasteTdrCsv.headers.get("content-type") ?? "", /^text\/csv/);
const wasteTdrBody = await wasteTdrCsv.text();
assert.ok(wasteTdrBody.includes("Rutas y turnos"), "La plantilla de residuos debe exigir una línea base operativa");
assert.equal(wasteTdrBody.trim().split("\n").length, 21, "La plantilla de residuos debe incluir encabezado y veinte bloques");

const riskTdrCsv = await get("/downloads/plantilla-tdr-analisis-gestion-riesgo-desastres.csv");
assert.equal(riskTdrCsv.status, 200, "La plantilla TDR de gestión del riesgo debe ser descargable");
assert.match(riskTdrCsv.headers.get("content-type") ?? "", /^text\/csv/);
const riskTdrBody = await riskTdrCsv.text();
assert.ok(riskTdrBody.includes("Peligro"), "La plantilla de riesgo debe distinguir el peligro");
assert.ok(riskTdrBody.includes("Vulnerabilidad"), "La plantilla de riesgo debe distinguir la vulnerabilidad");
assert.equal(riskTdrBody.trim().split("\n").length, 21, "La plantilla de riesgo debe incluir encabezado y veinte bloques");

const localEconomyTdrCsv = await get("/downloads/plantilla-tdr-analisis-desarrollo-economico-local.csv");
assert.equal(localEconomyTdrCsv.status, 200, "La plantilla TDR de desarrollo económico debe ser descargable");
assert.match(localEconomyTdrCsv.headers.get("content-type") ?? "", /^text\/csv/);
const localEconomyTdrBody = await localEconomyTdrCsv.text();
assert.ok(localEconomyTdrBody.includes("Demanda y mercados"), "La plantilla económica debe exigir validación de demanda");
assert.ok(localEconomyTdrBody.includes("Licencias y formalización"), "La plantilla económica debe distinguir trámite y resultado");
assert.equal(localEconomyTdrBody.trim().split("\n").length, 21, "La plantilla económica debe incluir encabezado y veinte bloques");

const environmentalTdrCsv = await get("/downloads/plantilla-tdr-analisis-gestion-ambiental.csv");
assert.equal(environmentalTdrCsv.status, 200, "La plantilla TDR ambiental debe ser descargable");
assert.match(environmentalTdrCsv.headers.get("content-type") ?? "", /^text\/csv/);
const environmentalTdrBody = await environmentalTdrCsv.text();
assert.ok(environmentalTdrBody.includes("Calidad y custodia"), "La plantilla ambiental debe exigir control de calidad");
assert.ok(environmentalTdrBody.includes("Fiscalización"), "La plantilla ambiental debe cubrir fiscalización");
assert.equal(environmentalTdrBody.trim().split("\n").length, 21, "La plantilla ambiental debe incluir encabezado y veinte bloques");

const waterTdrCsv = await get("/downloads/plantilla-tdr-analisis-agua-saneamiento.csv");
assert.equal(waterTdrCsv.status, 200, "La plantilla TDR de agua y saneamiento debe ser descargable");
assert.match(waterTdrCsv.headers.get("content-type") ?? "", /^text\/csv/);
const waterTdrBody = await waterTdrCsv.text();
assert.ok(waterTdrBody.includes("Continuidad y presión"), "La plantilla de agua debe separar continuidad y cobertura");
assert.ok(waterTdrBody.includes("Gestión rural"), "La plantilla de agua debe cubrir prestadores rurales");
assert.equal(waterTdrBody.trim().split("\n").length, 21, "La plantilla de agua debe incluir encabezado y veinte bloques");

const mobilityTdrCsv = await get("/downloads/plantilla-tdr-analisis-movilidad-transporte.csv");
assert.equal(mobilityTdrCsv.status, 200, "La plantilla TDR de movilidad debe ser descargable");
assert.match(mobilityTdrCsv.headers.get("content-type") ?? "", /^text\/csv/);
const mobilityTdrBody = await mobilityTdrCsv.text();
assert.ok(mobilityTdrBody.includes("Movilidad activa"), "La plantilla de movilidad debe incluir caminar y pedalear");
assert.ok(mobilityTdrBody.includes("Accesibilidad y cuidados"), "La plantilla de movilidad debe cubrir acceso y equidad");
assert.equal(mobilityTdrBody.trim().split("\n").length, 21, "La plantilla de movilidad debe incluir encabezado y veinte bloques");

const socialPolicyTdrCsv = await get("/downloads/plantilla-tdr-analisis-politicas-sociales.csv");
assert.equal(socialPolicyTdrCsv.status, 200, "La plantilla TDR de políticas sociales debe ser descargable");
assert.match(socialPolicyTdrCsv.headers.get("content-type") ?? "", /^text\/csv/);
const socialPolicyTdrBody = await socialPolicyTdrCsv.text();
assert.ok(socialPolicyTdrBody.includes("Datos personales"), "La plantilla social debe proteger datos personales");
assert.ok(socialPolicyTdrBody.includes("Demanda no atendida"), "La plantilla social debe hacer visible la exclusión");
assert.equal(socialPolicyTdrBody.trim().split("\n").length, 21, "La plantilla social debe incluir encabezado y veinte bloques");

const healthTdrCsv = await get("/downloads/plantilla-tdr-analisis-salud-territorial.csv");
assert.equal(healthTdrCsv.status, 200, "La plantilla TDR de salud debe ser descargable");
assert.match(healthTdrCsv.headers.get("content-type") ?? "", /^text\/csv/);
const healthTdrBody = await healthTdrCsv.text();
assert.ok(healthTdrBody.includes("Datos y privacidad"), "La plantilla de salud debe proteger información clínica");
assert.ok(healthTdrBody.includes("Continuidad"), "La plantilla de salud debe seguir la continuidad asistencial");
assert.equal(healthTdrBody.trim().split("\n").length, 21, "La plantilla de salud debe incluir encabezado y veinte bloques");

const educationTdrCsv = await get("/downloads/plantilla-tdr-analisis-educacion-territorial.csv");
assert.equal(educationTdrCsv.status, 200, "La plantilla TDR de educación debe ser descargable");
assert.match(educationTdrCsv.headers.get("content-type") ?? "", /^text\/csv/);
const educationTdrBody = await educationTdrCsv.text();
assert.ok(educationTdrBody.includes("Aprendizajes"), "La plantilla educativa debe distinguir resultados de aprendizaje");
assert.ok(educationTdrBody.includes("Datos y privacidad"), "La plantilla educativa debe proteger información de estudiantes");
assert.equal(educationTdrBody.trim().split("\n").length, 21, "La plantilla educativa debe incluir encabezado y veinte bloques");

const investmentTdrCsv = await get("/downloads/plantilla-tdr-analisis-inversion-publica.csv");
assert.equal(investmentTdrCsv.status, 200, "La plantilla TDR de inversión pública debe ser descargable");
assert.match(investmentTdrCsv.headers.get("content-type") ?? "", /^text\/csv/);
const investmentTdrBody = await investmentTdrCsv.text();
assert.ok(investmentTdrBody.includes("Avance físico"), "La plantilla de inversión debe separar el avance físico");
assert.ok(investmentTdrBody.includes("Operación y mantenimiento"), "La plantilla de inversión debe cubrir la sostenibilidad operativa");
assert.equal(investmentTdrBody.trim().split("\n").length, 21, "La plantilla de inversión debe incluir encabezado y veinte bloques");

const procurementTdrCsv = await get("/downloads/plantilla-tdr-analisis-contrataciones-publicas.csv");
assert.equal(procurementTdrCsv.status, 200, "La plantilla TDR de contrataciones públicas debe ser descargable");
assert.match(procurementTdrCsv.headers.get("content-type") ?? "", /^text\/csv/);
const procurementTdrBody = await procurementTdrCsv.text();
assert.ok(procurementTdrBody.includes("Mercado proveedor"), "La plantilla de contrataciones debe analizar el mercado proveedor");
assert.ok(procurementTdrBody.includes("Ninguna alerta produce acusaciones automáticas"), "La plantilla de contrataciones debe limitar la lectura de señales");
assert.equal(procurementTdrBody.trim().split("\n").length, 21, "La plantilla de contrataciones debe incluir encabezado y veinte bloques");

const evaluationTdrCsv = await get("/downloads/plantilla-tdr-linea-base-evaluacion-programa.csv");
assert.equal(evaluationTdrCsv.status, 200, "La plantilla TDR de evaluación debe ser descargable");
assert.match(evaluationTdrCsv.headers.get("content-type") ?? "", /^text\/csv/);
const evaluationTdrBody = await evaluationTdrCsv.text();
assert.ok(evaluationTdrBody.includes("Teoría de cambio"), "La plantilla TDR de evaluación debe incluir la teoría de cambio");
assert.equal(evaluationTdrBody.trim().split("\n").length, 22, "La plantilla TDR de evaluación debe incluir encabezado y veintiún bloques");

const diagnosisTdrCsv = await get("/downloads/plantilla-tdr-diagnostico-territorial-institucional.csv");
assert.equal(diagnosisTdrCsv.status, 200, "La plantilla TDR de diagnóstico territorial debe ser descargable");
assert.match(diagnosisTdrCsv.headers.get("content-type") ?? "", /^text\/csv/);
const diagnosisTdrBody = await diagnosisTdrCsv.text();
assert.ok(diagnosisTdrBody.includes("Datos geográficos"), "La plantilla TDR territorial debe incluir datos geográficos");
assert.equal(diagnosisTdrBody.trim().split("\n").length, 21, "La plantilla TDR territorial debe incluir encabezado y veinte bloques");

const sitemap = await get("/sitemap.xml");
const sitemapBody = await sitemap.text();
assert.equal(sitemap.status, 200);
assert.ok((sitemapBody.match(/<loc>/g) ?? []).length >= 1900, "Sitemap debe incluir los perfiles municipales");
const sitemapLocations = [...sitemapBody.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.equal(new Set(sitemapLocations).size, sitemapLocations.length, "Sitemap no debe contener URLs duplicadas");
const sitemapDates = [...sitemapBody.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].map((match) => Date.parse(match[1]));
assert.ok(sitemapDates.every((date) => Number.isFinite(date) && date <= Date.now()), "Sitemap solo debe publicar fechas válidas y no futuras");
assert.ok(sitemapBody.includes("https://noam.pe/como-trabajamos"));
assert.ok(sitemapBody.includes("https://noam.pe/electoral/erm-2026"));
assert.ok(sitemapBody.includes("https://noam.pe/electoral/barometro-enero-2026"));
assert.ok(!sitemapBody.includes("https://noam.pe/demos/barometro-electoral"));
assert.ok(sitemapBody.includes("https://noam.pe/electoral/planometro-2026"));
assert.ok(sitemapBody.includes("https://noam.pe/electoral/planometro-2026/organizaciones/ahora-nacion"));
assert.ok(sitemapBody.includes("https://noam.pe/electoral/planometro-2026/ejes/institucionalidad"));
assert.ok(!sitemapBody.includes("https://noam.pe/demos/planometro"));
assert.ok(sitemapBody.includes("https://noam.pe/dataperu/radar"));
assert.ok(sitemapBody.includes("https://noam.pe/dataperu/departamentos"));
assert.ok(sitemapBody.includes("https://noam.pe/dataperu/panorama-municipal-2025"));
assert.ok(sitemapBody.includes("https://noam.pe/dataperu/departamentos/08"));
assert.ok(sitemapBody.includes("https://noam.pe/dataperu/inversiones"));
assert.ok(sitemapBody.includes("https://noam.pe/dataperu/mapa"));
assert.ok(sitemapBody.includes("https://noam.pe/products/ai-governance-lab"));
assert.ok(sitemapBody.includes("https://noam.pe/diagnostico"));
assert.ok(sitemapBody.includes("https://noam.pe/contratar-analisis-datos"));
assert.ok(sitemapBody.includes("https://noam.pe/diagnostico-territorial"));
assert.ok(sitemapBody.includes("https://noam.pe/encuestas-estudios-opinion"));
assert.ok(sitemapBody.includes("https://noam.pe/observatorios-dashboards-visores"));
assert.ok(sitemapBody.includes("https://noam.pe/ia-automatizacion-gobiernos-empresas"));
assert.ok(sitemapBody.includes("https://noam.pe/estudios-mercado-inteligencia-territorial"));
assert.ok(sitemapBody.includes("https://noam.pe/analisis-datos-seguridad-ciudadana"));
assert.ok(sitemapBody.includes("https://noam.pe/analisis-datos-residuos-limpieza-publica"));
assert.ok(sitemapBody.includes("https://noam.pe/analisis-datos-gestion-riesgo-desastres"));
assert.ok(sitemapBody.includes("https://noam.pe/analisis-datos-desarrollo-economico-local"));
assert.ok(sitemapBody.includes("https://noam.pe/analisis-datos-gestion-ambiental"));
assert.ok(sitemapBody.includes("https://noam.pe/analisis-datos-agua-saneamiento"));
assert.ok(sitemapBody.includes("https://noam.pe/analisis-datos-movilidad-transporte"));
assert.ok(sitemapBody.includes("https://noam.pe/analisis-datos-politicas-sociales"));
assert.ok(sitemapBody.includes("https://noam.pe/analisis-datos-salud-territorial"));
assert.ok(sitemapBody.includes("https://noam.pe/analisis-datos-educacion-territorial"));
assert.ok(sitemapBody.includes("https://noam.pe/analisis-inversion-publica-proyectos"));
assert.ok(sitemapBody.includes("https://noam.pe/analisis-contrataciones-publicas-proveedores"));
assert.ok(sitemapBody.includes("https://noam.pe/linea-base-evaluacion-impacto"));
assert.ok(sitemapBody.includes("https://noam.pe/muestras"));
assert.ok(sitemapBody.includes("https://noam.pe/muestras/diagnostico-agenda-territorial"));
assert.ok(sitemapBody.includes("https://noam.pe/muestras/monitoreo-entorno-impacto"));
assert.ok(sitemapBody.includes("https://noam.pe/solutions/linea-base-evaluacion-programas"));
assert.ok(sitemapBody.includes("https://noam.pe/toolkits/tdr-estudio-analisis-datos"));
assert.ok(sitemapBody.includes("https://noam.pe/toolkits/tdr-encuesta-estudio-territorial"));
assert.ok(sitemapBody.includes("https://noam.pe/toolkits/tdr-observatorio-dashboard-visor"));
assert.ok(sitemapBody.includes("https://noam.pe/toolkits/tdr-linea-base-evaluacion-programa"));
assert.ok(sitemapBody.includes("https://noam.pe/toolkits/tdr-diagnostico-territorial-institucional"));
assert.ok(sitemapBody.includes("https://noam.pe/toolkits/tdr-estudio-mercado-inteligencia-territorial"));
assert.ok(sitemapBody.includes("https://noam.pe/toolkits/tdr-analisis-seguridad-ciudadana"));
assert.ok(sitemapBody.includes("https://noam.pe/toolkits/tdr-analisis-residuos-limpieza-publica"));
assert.ok(sitemapBody.includes("https://noam.pe/toolkits/tdr-analisis-gestion-riesgo-desastres"));
assert.ok(sitemapBody.includes("https://noam.pe/toolkits/tdr-analisis-desarrollo-economico-local"));
assert.ok(sitemapBody.includes("https://noam.pe/toolkits/tdr-analisis-gestion-ambiental"));
assert.ok(sitemapBody.includes("https://noam.pe/toolkits/tdr-analisis-agua-saneamiento"));
assert.ok(sitemapBody.includes("https://noam.pe/toolkits/tdr-analisis-movilidad-transporte"));
assert.ok(sitemapBody.includes("https://noam.pe/toolkits/tdr-analisis-politicas-sociales"));
assert.ok(sitemapBody.includes("https://noam.pe/toolkits/tdr-analisis-salud-territorial"));
assert.ok(sitemapBody.includes("https://noam.pe/toolkits/tdr-analisis-educacion-territorial"));
assert.ok(sitemapBody.includes("https://noam.pe/toolkits/tdr-analisis-inversion-publica"));
assert.ok(sitemapBody.includes("https://noam.pe/toolkits/tdr-analisis-contrataciones-publicas"));
assert.ok(sitemapBody.includes("https://noam.pe/muestras/linea-base-evaluacion-programa"));
assert.ok(sitemapBody.includes("https://noam.pe/solutions/transferencia-gestion-100-dias"));
assert.ok(sitemapBody.includes("https://noam.pe/muestras/transferencia-gestion-100-dias"));
assert.ok(sitemapBody.includes("https://noam.pe/muestras/diagnostico-desempeno-servicio-publico"));
assert.ok(sitemapBody.includes("https://noam.pe/privacy"));
assert.ok(sitemapBody.includes("https://noam.pe/terms"));
assert.ok(sitemapBody.includes("https://noam.pe/transparency"));
assert.ok(sitemapBody.includes("https://noam.pe/newsletter"));
assert.ok(sitemapBody.includes("https://noam.pe/brief"));
assert.ok(sitemapBody.includes("https://noam.pe/brief/municipios-distintos-decisiones-distintas"));
assert.ok(sitemapBody.includes("https://noam.pe/en"));

const robots = await get("/robots.txt");
const robotsBody = await robots.text();
assert.equal(robots.status, 200);
assert.ok(robotsBody.includes("Disallow: /admin"));
assert.ok(!robotsBody.includes("Disallow: /admin/"), "Robots debe cubrir /admin con y sin barra final");
assert.ok(robotsBody.includes("Disallow: /api"));
assert.ok(robotsBody.includes("Disallow: /portal"));

const rss = await get("/insights/rss.xml");
const rssBody = await rss.text();
assert.equal(rss.status, 200);
assert.match(rss.headers.get("content-type") ?? "", /^application\/rss\+xml/);
assert.ok((rssBody.match(/<item>/g) ?? []).length >= 10, "RSS debe publicar la biblioteca de estudios");

const briefArchive = await expectHtml("/brief", "Una señal útil para decidir");
assert.ok(briefArchive.body.includes("municipios-distintos-decisiones-distintas"), "El archivo debe enlazar la edición piloto");
const briefEdition = await expectHtml("/brief/municipios-distintos-decisiones-distintas", "Municipios distintos exigen decisiones distintas");
assert.ok(briefEdition.body.includes("Límite de lectura"), "La edición debe publicar límites explícitos");
assert.ok(briefEdition.body.includes("https://noam.pe/og/brief/municipios-distintos-decisiones-distintas"), "La edición debe usar OG dinámico");

const briefOg = await get("/og/brief/municipios-distintos-decisiones-distintas");
assert.equal(briefOg.status, 200, "El Brief debe tener una imagen OG dinámica");
assert.equal(briefOg.headers.get("content-type"), "image/png");

const briefRss = await get("/brief/rss.xml");
const briefRssBody = await briefRss.text();
assert.equal(briefRss.status, 200);
assert.match(briefRss.headers.get("content-type") ?? "", /^application\/rss\+xml/);
assert.equal((briefRssBody.match(/<item>/g) ?? []).length, 1, "El RSS no debe inventar ediciones históricas");

const manifest = await get("/manifest.webmanifest");
assert.equal(manifest.status, 200);
const manifestBody = await manifest.json();
assert.equal(manifestBody.short_name, "NOAM");
assert.equal(manifestBody.start_url, "/");

const article = await expectHtml("/insights/mapa-riesgos-territoriales-inversion", "Un mapa de riesgos territoriales no es una lista de amenazas");
assert.ok(article.body.includes("https://noam.pe/og/insights/mapa-riesgos-territoriales-inversion"), "Artículo debe usar OG dinámico");

const aiLab = await expectHtml("/products/ai-governance-lab", "Antes de construir IA, decide si vale la pena");
assert.ok(aiLab.body.includes("https://noam.pe/og/products/ai-governance-lab"), "Laboratorio de IA debe usar OG dinámico");

if (hasPersistentForm) {
  await expectHtml("/contact?interest=ia-procesos-publicos&case=document-search&from=/products/ai-governance-lab", "Búsqueda y respuesta sobre documentos internos");
  await expectHtml("/contact?interest=ia-procesos-publicos&org=company&challenge=transform&evidence=documents&horizon=extended&from=/diagnostico", "Generamos un brief inicial con el Diseñador de alcance NOAM");
} else {
  await expectHtml("/contact?interest=ia-procesos-publicos&case=document-search&from=/products/ai-governance-lab", "Contacto directo y trazable.");
  await expectHtml("/contact?interest=ia-procesos-publicos&org=company&challenge=transform&evidence=documents&horizon=extended&from=/diagnostico", "Contacto directo y trazable.");
}

const missing = await get("/esta-ruta-no-existe");
assert.equal(missing.status, 404);

console.log(`Smoke OK: ${publicPages.length + 46} controles en ${baseUrl}`);
