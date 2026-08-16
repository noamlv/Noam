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

async function expectHtml(path, text) {
  const response = await get(path);
  assert.equal(response.status, 200, `${path} debe responder 200`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html/, `${path} debe ser HTML`);
  const body = await response.text();
  assert.ok(body.includes(text), `${path} debe contener ${text}`);
  return { response, body };
}

await waitForServer();

const publicPages = [
  ["/", "Decisiones más claras"],
  ["/solutions", "Una decisión concreta"],
  ["/solutions/diagnostico-agenda-territorial", "Una lectura compartida del territorio"],
  ["/solutions/observatorio-gestion-inversiones", "Indicadores, proyectos y alertas reunidos"],
  ["/solutions/ia-procesos-publicos", "Un proceso concreto, un piloto controlado"],
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
  ["/insights/panorama-municipal-peru-2025", "El Perú municipal no cabe en un promedio"],
  ["/muestras", "Mira la forma del trabajo antes de contratarlo."],
  ["/muestras/diagnostico-agenda-territorial", "Diagnóstico territorial y agenda priorizada"],
  ["/muestras/piloto-ia-documental", "Piloto de IA para documentos y conocimiento"],
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

const englishPage = await expectHtml("/en", "English overview");
assert.ok(englishPage.body.includes('lang="en"'), "La portada internacional debe declarar su idioma");
assert.ok(englishPage.body.includes('hrefLang="en"'), "La portada internacional debe publicar su alternante EN");
assert.ok(englishPage.body.includes("https://noam.pe/en"), "La portada internacional debe usar canonical absoluto");
assert.ok(!englishPage.body.includes("queued for V2"), "La portada internacional no puede ser un placeholder");

const searchPage = await expectHtml("/buscar?q=municipalidades", "Perfiles municipales de DataPerú");
assert.ok(searchPage.body.includes('name="robots" content="noindex, follow"') || searchPage.body.includes('name="robots" content="noindex"'), "Los resultados de búsqueda no deben indexarse");
await expectHtml("/buscar?q=automatizacion&type=solution&topic=ia", "IA para procesos públicos");
await expectHtml("/buscar?q=consulta-sin-coincidencia-xyz", "No encontramos una coincidencia precisa.");
await expectHtml("/resources?type=dataset&product=planometro-electoral", "Planómetro 2026: organizaciones");
await expectHtml("/buscar?q=limites+departamentales&type=evidence", "Límites departamentales referenciales");
await expectHtml("/buscar?q=boletin", "Brief NOAM");

const visualHome = await expectHtml("/", "Imagen editorial");
assert.ok(visualHome.body.includes("/images/noam-public-sector.jpg"));
assert.ok(visualHome.body.includes("/images/noam-private-sector.jpg"));

const fieldSolution = await expectHtml("/solutions/diagnostico-agenda-territorial", "Escena editorial representativa");
assert.ok(fieldSolution.body.includes("/images/noam-field-research.jpg"));

const aiService = await expectHtml("/services/ia-transformacion-gestion", "Escena editorial representativa");
assert.ok(aiService.body.includes("/images/noam-ai-oversight.jpg"));

const contactPage = await expectHtml("/contact", "Añadir detalles del proyecto");
assert.ok(contactPage.body.includes("Campos obligatorios"), "Contacto debe distinguir campos esenciales");
assert.ok(contactPage.body.includes("Opcional · ayuda a preparar mejor la primera conversación"), "Contacto debe explicar los detalles opcionales");

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

const sitemap = await get("/sitemap.xml");
const sitemapBody = await sitemap.text();
assert.equal(sitemap.status, 200);
assert.ok((sitemapBody.match(/<loc>/g) ?? []).length >= 1900, "Sitemap debe incluir los perfiles municipales");
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
assert.ok(sitemapBody.includes("https://noam.pe/muestras"));
assert.ok(sitemapBody.includes("https://noam.pe/muestras/diagnostico-agenda-territorial"));
assert.ok(sitemapBody.includes("https://noam.pe/muestras/monitoreo-entorno-impacto"));
assert.ok(sitemapBody.includes("https://noam.pe/privacy"));
assert.ok(sitemapBody.includes("https://noam.pe/terms"));
assert.ok(sitemapBody.includes("https://noam.pe/transparency"));
assert.ok(sitemapBody.includes("https://noam.pe/newsletter"));
assert.ok(sitemapBody.includes("https://noam.pe/brief"));
assert.ok(sitemapBody.includes("https://noam.pe/brief/municipios-distintos-decisiones-distintas"));
assert.ok(sitemapBody.includes("https://noam.pe/en"));

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

await expectHtml("/contact?interest=ia-procesos-publicos&case=document-search&from=/products/ai-governance-lab", "Búsqueda y respuesta sobre documentos internos");
await expectHtml("/contact?interest=ia-procesos-publicos&org=company&challenge=transform&evidence=documents&horizon=extended&from=/diagnostico", "Generamos un brief inicial con el Diseñador de alcance NOAM");

const missing = await get("/esta-ruta-no-existe");
assert.equal(missing.status, 404);

console.log(`Smoke OK: ${publicPages.length + 38} controles en ${baseUrl}`);
