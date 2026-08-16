import type { DepartmentResearch } from "./department-research.ts";

export const departmentResearch15to25: DepartmentResearch[] = [
  {
    code: "15", department: "Lima", researchDate: "2026-07-31", confidence: "alta",
    evidenceBase: { scope: "departamental", sourceCount: 45, officialSources: "total", note: "Síntesis curada que diferencia Lima Metropolitana de las provincias de la Región Lima." },
    thesis: "Lima no es una sola metrópoli: conviven periferias urbanas, cuencas frágiles, ciudades intermedias, valles agroalimentarios y el nuevo corredor de Chancay. Agua, movilidad, vivienda y productividad exigen escalas de gobierno distintas.",
    problems: [
      { title: "Seguridad hídrica, tratamiento y reúso", problem: "Cuencas, redes, cisternas, agricultura e industria requieren una lectura común de oferta, pérdidas, calidad y demanda.", affected: "Periferias metropolitanas, ciudades costeras, agricultores, prestadores e industria.", governmentDecision: "Priorizar reducción de pérdidas, cobertura efectiva, tratamiento y reúso según cuenca y asequibilidad.", noamResponse: "Observatorio hídrico, mapa de continuidad y escenarios por cuenca." },
      { title: "Movilidad, vivienda y crecimiento inseguro", problem: "Largos viajes, suelo no servido y ocupación de laderas o quebradas amplifican desigualdad y riesgo.", affected: "Trabajadores, jóvenes, mujeres cuidadoras y hogares periurbanos.", governmentDecision: "Integrar accesibilidad, vivienda, transporte y riesgo antes de habilitar suelo o invertir.", noamResponse: "Atlas de acceso urbano, vivienda y exposición territorial." },
      { title: "Seguridad económica y empleo juvenil", problem: "Extorsión, informalidad y formación desconectada de vacantes reducen productividad y continuidad empresarial.", affected: "MYPE, jóvenes, transportistas, comerciantes y trabajadores de servicios.", governmentDecision: "Focalizar protección y formación dual según cadenas, vacantes y retención laboral.", noamResponse: "Observatorio protegido y mapa de demanda laboral." },
      { title: "Provincias y Chancay con impactos poco integrados", problem: "Puerto, agroalimentos y logística pueden transformar suelo, empleo y ambiente sin distribuir beneficios automáticamente.", affected: "Huaral, Barranca, Huaura, Cañete, productores, comunidades y operadores.", governmentDecision: "Seguir flujos, empleo, agua, suelo y compras locales antes y después de nuevas inversiones.", noamResponse: "Observatorio territorial de Chancay y cadenas regionales." }
    ],
    opportunities: [
      { title: "Eficiencia y reúso hídrico", rationale: "Contratos por desempeño pueden reducir pérdidas y sustituir agua dulce en usos compatibles.", actors: "Prestadores, municipios, industria, agricultura y proveedores.", validation: "Confirmar línea base, calidad, energía, lodos, comprador y protección tarifaria." },
      { title: "Talento joven vinculado a vacantes", rationale: "Formación dual para logística, frío, salud y mantenimiento puede pagarse por colocación y retención.", actors: "Empresas, institutos, gobiernos y jóvenes.", validation: "Verificar vacantes, salarios, barreras, prácticas pagadas y permanencia." },
      { title: "Chancay responsable", rationale: "Citas, patios, mantenimiento y proveedores pueden capturar valor con vigilancia territorial.", actors: "Puerto, transportistas, MYPE, municipios, comunidades y fiscalizadores.", validation: "Medir demanda, flujos, compras, suelo, agua, aire y distribución local." }
    ],
    interventions: [
      { title: "Atlas metropolitano de acceso", outcome: "Conectar vivienda, transporte, servicios y riesgo.", deliverable: "Tiempos, oportunidades, exposición y cartera por sector." },
      { title: "Observatorio hídrico de cuencas", outcome: "Decidir continuidad y crecimiento con balance común.", deliverable: "Oferta, demanda, calidad, pérdidas y escenarios." },
      { title: "Monitor territorial Chancay", outcome: "Seguir impactos y oportunidades del nuevo corredor.", deliverable: "Flujos, empleo, compras, ambiente y alertas." }
    ],
    evidenceGaps: ["Continuidad, gasto en cisterna y calidad por sector.", "Tiempos de viaje y acceso a oportunidades por hogar.", "Victimización económica, vacantes y retención laboral.", "Impactos territoriales y compras locales vinculados a Chancay."]
  },
  {
    code: "16", department: "Loreto", researchDate: "2026-07-31", confidence: "alta",
    evidenceBase: { scope: "departamental", sourceCount: 46, officialSources: "total", note: "Síntesis curada con lectura fluvial, intercultural y estacional." },
    thesis: "En Loreto, accesibilidad es una combinación de río, estación, frecuencia, tarifa y confiabilidad. Agua, salud, educación, energía y economía forestal deben diseñarse como redes móviles e interculturales.",
    problems: [
      { title: "Agua y saneamiento adaptados al territorio", problem: "Soluciones urbanas convencionales no responden igual en barrios inundables, comunidades fluviales y localidades dispersas.", affected: "Comunidades indígenas y ribereñas, primera infancia, periferias de Iquitos y operadores comunales.", governmentDecision: "Segmentar tecnología, operación y vigilancia por fuente, densidad y ciclo hidrológico.", noamResponse: "Registro de sistemas, mapa estacional y observatorio de calidad y continuidad." },
      { title: "Conectividad fluvial, digital y energética fragmentada", problem: "Un viaje cancelado, una batería agotada o una antena sin soporte interrumpe varios servicios simultáneamente.", affected: "Datem del Marañón, Putumayo, comunidades tributarias, estudiantes, pacientes y productores.", governmentDecision: "Programar rutas esenciales, energía y conectividad como una sola infraestructura de acceso.", noamResponse: "Atlas multimodal y tablero de disponibilidad de rutas y nodos." },
      { title: "Salud y educación sin capacidad efectiva", problem: "Afiliación o presencia física no aseguran personal, insumos, referencia, lengua ni continuidad pedagógica.", affected: "Niñez, gestantes, docentes, personal de salud y pueblos indígenas.", governmentDecision: "Medir servicios completados y combinar presencia local, facilitación y teleapoyo.", noamResponse: "Inventario resolutivo y seguimiento intercultural de servicio." },
      { title: "Bosque, remediación y bioeconomía", problem: "Deforestación, contaminación y baja transformación limitan una economía basada en bosque en pie y derechos.", affected: "Comunidades, pescadores, productores, empresas legales y ecosistemas.", governmentDecision: "Integrar tenencia, trazabilidad, monitoreo y reparación con reparto de valor.", noamResponse: "Observatorio de bosque y remediación, y laboratorio bioeconómico." }
    ],
    opportunities: [
      { title: "Logística fluvial programada", rationale: "Frecuencia, tarifa y puntualidad visibles pueden mejorar servicios y mercados.", actors: "Operadores, gobiernos, comunidades, salud, educación y comercio.", validation: "Medir demanda, estación, subsidio, seguridad, capacidad y cumplimiento de ruta." },
      { title: "Frío solar útil", rationale: "Vender horas o volumen de frío puede servir a pescado, alimentos y salud.", actors: "Productores, comunidades, salud, técnicos y compradores.", validation: "Confirmar carga, energía, baterías, técnico, repuestos y utilización." },
      { title: "Bosque verificable", rationale: "Trazabilidad, calidad y transformación pueden elevar valor legal sin aumentar presión.", actors: "Comunidades, concesionarios, autoridades, plantas y compradores.", validation: "Verificar derechos, origen, regeneración, comprador y reparto de beneficios." }
    ],
    interventions: [
      { title: "Atlas de accesibilidad fluvial", outcome: "Programar rutas, brigadas, stock y mantenimiento.", deliverable: "Frecuencia, tarifa, estación, capacidad y contingencias." },
      { title: "Observatorio de agua y servicios", outcome: "Distinguir infraestructura instalada de servicio efectivo.", deliverable: "Sistemas, calidad, personal, energía y alertas." },
      { title: "Monitor bosque-remediación", outcome: "Conectar alertas, derechos, respuesta y reparación.", deliverable: "Visor gobernado, casos, hitos y trazabilidad." }
    ],
    evidenceGaps: ["Frecuencia, tarifa y cancelaciones de rutas fluviales.", "Continuidad, calidad y operación por sistema de agua.", "Personal, insumos y referencia efectiva por establecimiento.", "Tenencia, origen, transformación y cierre de alertas ambientales."]
  },
  {
    code: "17", department: "Madre de Dios", researchDate: "2026-07-31", confidence: "alta",
    evidenceBase: { scope: "departamental", sourceCount: 44, officialSources: "total", note: "Síntesis curada con salvaguardas sobre seguridad, pueblos indígenas y datos sensibles." },
    thesis: "Madre de Dios necesita separar economía legal, extracción ilícita y protección territorial. Oro, mercurio, bosque, trata y crecimiento urbano forman un sistema que exige trazabilidad, salud ambiental y alternativas productivas verificables.",
    problems: [
      { title: "Gobernanza del oro, seguridad y trata", problem: "La extracción ilícita conecta violencia, explotación, lavado y ocupación territorial.", affected: "Comunidades, mujeres, menores, migrantes, trabajadores y operadores formales.", governmentDecision: "Integrar origen, permisos, cadena comercial, protección y debido proceso.", noamResponse: "Sistema protegido de trazabilidad y observatorio de riesgos territoriales." },
      { title: "Mercurio, agua y salud ambiental", problem: "Contaminación y exposición requieren biomonitoreo, atención y agua segura con gobernanza comunitaria.", affected: "Comunidades indígenas y ribereñas, niñez, gestantes y pescadores.", governmentDecision: "Conectar muestras, riesgo, ruta clínica y remediación sin exponer datos personales.", noamResponse: "Observatorio sanitario-ambiental y protocolo de seguimiento." },
      { title: "Bosque, territorios indígenas y restauración", problem: "Deforestación, invasión y amenazas superan la capacidad de cerrar alertas y proteger derechos.", affected: "Comunidades nativas, defensores, concesiones legales y biodiversidad.", governmentDecision: "Priorizar alerta-campo-acción-verificación y restaurar por resultados.", noamResponse: "Monitor de bosque gobernado y tablero de restauración." },
      { title: "Crecimiento urbano y diversificación débil", problem: "Puerto Maldonado y corredores mineros presionan agua, residuos, vivienda y empleo formal.", affected: "Hogares urbanos, jóvenes, MYPE, turismo y servicios públicos.", governmentDecision: "Vincular servicios urbanos con oficios y cadenas alternativas de demanda real.", noamResponse: "Observatorio urbano-productivo y laboratorio de diversificación." }
    ],
    opportunities: [
      { title: "Trazabilidad aurífera responsable", rationale: "Balancear origen, planta y venta puede proteger el mercado legal con auditoría.", actors: "Operadores formales, plantas, compradores, fiscalizadores y comunidades.", validation: "Confirmar legalidad, cadena de custodia, debido proceso y control contra mezcla." },
      { title: "Restauración por resultado", rationale: "Contratos por supervivencia y función del suelo evitan confundir plantación con recuperación.", actors: "Comunidades, titulares, empresas, Estado y restauradores.", validation: "Definir línea base, derecho, permanencia, beneficio local y verificación independiente." },
      { title: "Turismo científico responsable", rationale: "Biodiversidad, investigación y compras locales pueden elevar valor con baja presión.", actors: "Albergues, comunidades, investigadores, guías y operadores.", validation: "Medir capacidad, seguridad, consentimiento, gasto local y demanda recurrente." }
    ],
    interventions: [
      { title: "Observatorio oro-territorio", outcome: "Distinguir cadenas legales, riesgos y respuesta pública.", deliverable: "Trazabilidad, alertas, casos agregados y gobernanza." },
      { title: "Monitor mercurio-salud", outcome: "Convertir muestras en prevención, atención y reparación.", deliverable: "Línea base, ruta clínica, agua y seguimiento protegido." },
      { title: "Bosque alerta-cierre", outcome: "Reducir tiempo entre detección y respuesta verificable.", deliverable: "Visor, permisos, acciones y cierre de alertas." }
    ],
    evidenceGaps: ["Cadena comercial y mezcla de oro legal e ilegal.", "Exposición a mercurio y continuidad de atención protegida.", "Cierre de alertas, amenazas y estado de derechos territoriales.", "Demanda y margen de alternativas productivas y turísticas."]
  },
  {
    code: "18", department: "Moquegua", researchDate: "2026-07-31", confidence: "alta",
    evidenceBase: { scope: "departamental", sourceCount: 42, officialSources: "total", note: "Síntesis curada con énfasis en balance hídrico, canon y equidad provincial." },
    thesis: "Moquegua combina minería, puerto, pesca, agricultura y provincias altoandinas bajo un límite hídrico estricto. La prioridad es transformar canon y crecimiento en diversificación, activos confiables y equidad territorial.",
    problems: [
      { title: "Agua: balance, calidad y legitimidad", problem: "Usuarios urbanos, agrarios y mineros necesitan datos comunes sobre oferta, derecho, consumo, calidad y contingencia.", affected: "Hogares, agricultores, comunidades, empresas y ecosistemas.", governmentDecision: "Acordar balance y reglas de priorización, eficiencia y reúso con trazabilidad pública.", noamResponse: "Gemelo hídrico y tablero de acuerdos y alertas." },
      { title: "Minería y canon con diversificación limitada", problem: "Renta y compras pueden concentrarse sin crear proveedores transferibles ni activos sostenibles.", affected: "MYPE, jóvenes, municipios, comunidades y usuarios de proyectos.", governmentDecision: "Conectar compras, formación y cartera pública con capacidades duraderas.", noamResponse: "Radar de proveedores y rastreador canon-activo-servicio." },
      { title: "Ilo: puerto, pesca e industria desconectados", problem: "Flujos, frío, sanidad, ambiente y conectividad requieren demanda y operación coordinadas.", affected: "Pescadores, industria, trabajadores, transportistas y litoral.", governmentDecision: "Dimensionar infraestructura según carga, comprador, riesgo y costo total.", noamResponse: "Gemelo logístico de Ilo y pasaporte pesquero." },
      { title: "Equidad y resiliencia territorial", problem: "Provincias altas enfrentan distancia y baja escala, mientras sismos y clima amenazan activos críticos.", affected: "General Sánchez Cerro, comunidades, escuelas, salud y vías.", governmentDecision: "Priorizar continuidad y mantenimiento por criticidad y acceso.", noamResponse: "Atlas de servicios y PMO resiliente." }
    ],
    opportunities: [
      { title: "Proveedores avanzados", rationale: "Automatización, mantenimiento, laboratorio, agua y energía pueden servir a minería y otros sectores.", actors: "Empresas tractoras, MYPE, institutos y proveedores técnicos.", validation: "Analizar compras, requisitos, contratos repetidos y ventas fuera de minería." },
      { title: "Agro por metro cúbico", rationale: "Calidad, poscosecha y contrato pueden elevar margen bajo restricción hídrica.", actors: "Productores, juntas, agroindustria, logística y compradores.", validation: "Medir agua, margen, empleo, clima, comprador y efecto sobre consumo total." },
      { title: "Pesca trazable y con frío", rationale: "Sanidad, transformación y logística pueden elevar precio manteniendo el recurso.", actors: "Pescadores, plantas, puerto, sanidad y compradores.", validation: "Confirmar desembarque, cuota, cadena fría, energía, rechazo y mercado." }
    ],
    interventions: [
      { title: "Gemelo hídrico Moquegua", outcome: "Administrar escasez con evidencia compartida.", deliverable: "Balance, calidad, derechos, demanda y escenarios." },
      { title: "Rastreador canon-diversificación", outcome: "Conectar renta con activos y capacidades sostenibles.", deliverable: "Cartera, operación, compras y resultados." },
      { title: "Gemelo logístico Ilo", outcome: "Dimensionar puerto, pesca e industria con demanda real.", deliverable: "Flujos, costos, frío, activos y contingencias." }
    ],
    evidenceGaps: ["Balance, calidad y demanda hídrica conciliados.", "Compras mineras, proveedores y resultados de activos financiados con canon.", "Carga, frío, sanidad y comprador en pesca y puerto.", "Acceso y condición de activos críticos en provincias altas."]
  },
  {
    code: "19", department: "Pasco", researchDate: "2026-07-31", confidence: "alta",
    evidenceBase: { scope: "departamental", sourceCount: 44, officialSources: "total", note: "Síntesis curada que diferencia Cerro de Pasco, valles andinos y selva central." },
    thesis: "Pasco reúne una ciudad minera con pasivos históricos, provincias altoandinas y territorios amazónicos. Salud ambiental, agua, acceso y diversificación no pueden resolverse con una sola agenda departamental.",
    problems: [
      { title: "Salud ambiental y decisión urbana", problem: "Exposición, remediación y futuro urbano requieren evidencia comparable y responsabilidades claras.", affected: "Niñez, hogares de Cerro de Pasco, trabajadores y comunidades mineras.", governmentDecision: "Priorizar reducción de riesgo, seguimiento sanitario y decisiones urbanas con línea base.", noamResponse: "Observatorio salud-ambiente y tablero de remediación." },
      { title: "Agua, saneamiento y residuos", problem: "Continuidad, calidad, Patarcocha y disposición de residuos muestran fallas de cadena completa.", affected: "Hogares urbanos y rurales, JASS, prestadores y ecosistemas.", governmentDecision: "Gestionar fuente-red-tratamiento-residuo con niveles de servicio y operador.", noamResponse: "Registro operativo y observatorio de agua y activos." },
      { title: "Acceso territorial desigual", problem: "Salud, educación, vías y conectividad varían radicalmente entre Cerro, Oxapampa y territorios amazónicos.", affected: "Comunidades indígenas, productores, estudiantes y pacientes.", governmentDecision: "Programar redes según tiempo estacional, lengua y capacidad resolutiva.", noamResponse: "Atlas de accesibilidad y nodos de servicio." },
      { title: "Diversificación con trazabilidad pendiente", problem: "Minería, café, cacao, bosque y turismo necesitan legalidad, calidad y mercado sin trasladar riesgos.", affected: "MYPE, productores, comunidades, compradores y ambiente.", governmentDecision: "Priorizar cadenas con derechos, comprador y resultado ambiental verificable.", noamResponse: "Radar productivo y pasaportes de trazabilidad." }
    ],
    opportunities: [
      { title: "Remediación verificable", rationale: "Ingeniería, laboratorio y auditoría pueden pagarse por estabilidad y calidad ambiental.", actors: "Entidades, responsables, laboratorios, comunidades y fiscalizadores.", validation: "Definir línea base, responsabilidad, independencia, permanencia y resultado." },
      { title: "Café y cacao trazables", rationale: "Geolocalización consentida y control de calidad pueden conservar acceso a mercados.", actors: "Cooperativas, productores, exportadores y compradores.", validation: "Verificar derecho, origen, costo, calidad, comprador y corrección de datos." },
      { title: "Turismo territorial integrado", rationale: "Huayllay, Yanachaga, Pozuzo y café pueden aumentar estadía y compra local.", actors: "Comunidades, operadores, áreas protegidas, alojamientos y municipios.", validation: "Medir capacidad, movilidad, gasto, permanencia y aceptación local." }
    ],
    interventions: [
      { title: "Observatorio salud-ambiente", outcome: "Seguir exposición, remediación y respuesta sanitaria.", deliverable: "Línea base, muestras, cohortes agregadas e hitos." },
      { title: "Atlas de acceso Pasco", outcome: "Diferenciar redes andinas, urbanas y amazónicas.", deliverable: "Tiempos, modos, nodos y disponibilidad." },
      { title: "Radar de diversificación", outcome: "Validar cadenas legales y sostenibles.", deliverable: "Mercado, derechos, calidad, actores y pilotos." }
    ],
    evidenceGaps: ["Exposición y seguimiento sanitario representativo.", "Continuidad, calidad y tratamiento por sistema.", "Tiempos y capacidad efectiva de servicios por corredor.", "Origen, demanda y margen en cadenas de diversificación."]
  },
  {
    code: "20", department: "Piura", researchDate: "2026-07-31", confidence: "alta",
    evidenceBase: { scope: "departamental", sourceCount: 45, officialSources: "total", note: "Síntesis curada con enfoque multirriesgo, productivo y de activos." },
    thesis: "Piura enfrenta simultáneamente escasez, inundación y expansión urbana. Agua, drenaje, salud, agroexportación, Paita y Talara deben coordinarse como sistemas de continuidad y no como obras aisladas.",
    problems: [
      { title: "Agua, drenaje y expansión multirriesgo", problem: "Sequía, lluvias intensas, pérdidas y ocupación urbana exponen hogares y actividades a interrupciones recurrentes.", affected: "Piura metropolitana, Sullana, Bajo Piura, productores y servicios críticos.", governmentDecision: "Gestionar cuencas, redes, drenaje y suelo con niveles de servicio y mantenimiento.", noamResponse: "Gemelo hídrico-urbano y tablero de activos críticos." },
      { title: "Salud, nutrición y saneamiento territorial", problem: "Agua intermitente, dengue, acceso rural y nutrición se refuerzan durante emergencias.", affected: "Primera infancia, hogares periféricos, Ayabaca, Huancabamba y comunidades rurales.", governmentDecision: "Focalizar prevención, agua y acceso sanitario por riesgo y temporada.", noamResponse: "Observatorio sanitario territorial y rutas de servicio." },
      { title: "Agroexportación bajo presión hídrica", problem: "Mango, banano, uva y agricultura familiar dependen de riego, frío, sanidad y logística resiliente.", affected: "Productores, trabajadores, juntas, plantas y compradores.", governmentDecision: "Medir margen y productividad por agua, no solo volumen exportado.", noamResponse: "Tablero agrotech y estudio de cadenas y riesgos." },
      { title: "Paita, Sechura y Talara: activos y ambiente", problem: "Puerto, pesca, energía y minería no metálica requieren integridad, trazabilidad y contingencia.", affected: "Pescadores, industria, transportistas, trabajadores y comunidades costeras.", governmentDecision: "Priorizar mantenimiento e inversión por demanda, seguridad y riesgo ambiental.", noamResponse: "Gemelo logístico y PMO regional de activos." }
    ],
    opportunities: [
      { title: "Continuidad hídrica por desempeño", rationale: "Reducir pérdidas y estabilizar presión puede remunerarse con auditoría y salvaguarda social.", actors: "EPS, municipios, usuarios y proveedores.", validation: "Definir línea base, calidad, sector, costo, tarifa y ahorro persistente." },
      { title: "Agtech con margen", rationale: "Programar riego y alertas puede reducir agua, merma y costo en cadenas exportadoras.", actors: "Productores, juntas, agroexportadores, tecnología y compradores.", validation: "Medir consumo total, productividad, adopción, margen y efecto rebote." },
      { title: "Frío y logística segura", rationale: "Paita y los valles pueden compartir prefrío, consolidación y trazabilidad.", actors: "Productores, pesca, plantas, puerto, transportistas y compradores.", validation: "Confirmar volumen, utilización, energía, excursiones térmicas y acceso de MYPE." }
    ],
    interventions: [
      { title: "Gemelo hídrico Piura", outcome: "Administrar sequía e inundación con una sola lectura operativa.", deliverable: "Cuenca, redes, drenaje, activos y escenarios." },
      { title: "Observatorio sanitario estacional", outcome: "Anticipar dengue, nutrición e interrupción de servicios.", deliverable: "Riesgo, agua, acceso, alertas y respuesta." },
      { title: "PMO regional de activos", outcome: "Recuperar obras y proteger infraestructura productiva.", deliverable: "Cartera conciliada, causas, decisiones y operación." }
    ],
    evidenceGaps: ["Balance hídrico, pérdidas y drenaje por sector.", "Riesgo sanitario y capacidad efectiva por temporada.", "Consumo de agua, margen y acceso de pequeños productores.", "Estado, integridad y demanda de activos en Paita, Sechura y Talara."]
  },
  {
    code: "21", department: "Puno", researchDate: "2026-07-31", confidence: "alta",
    evidenceBase: { scope: "departamental", sourceCount: 45, officialSources: "total", note: "Síntesis curada con enfoque binacional, multilingüe y climático." },
    thesis: "Puno necesita conectar la recuperación del Titicaca con agua rural, nutrición, cadenas altoandinas, frontera y ciudades. La respuesta debe ser binacional, multilingüe y resistente al frío.",
    problems: [
      { title: "Titicaca: saneamiento y gobernanza", problem: "Fuentes, colectores, plantas, lodos y monitoreo binacional no siempre forman una cadena operativa.", affected: "Comunidades ribereñas, ciudades, pescadores, turismo y ecosistemas.", governmentDecision: "Gestionar por carga removida, continuidad y resultados comparables entre cuencas.", noamResponse: "Observatorio Titicaca y registro operativo de saneamiento." },
      { title: "Agua, nutrición y servicios bajo frío y distancia", problem: "Clima, lengua y dispersión condicionan agua, salud, educación y protección de la primera infancia.", affected: "Comunidades rurales, niñez, gestantes y personas que requieren atención en quechua o aimara.", governmentDecision: "Programar paquetes y redes por acceso, estación y pertinencia lingüística.", noamResponse: "Atlas de acceso climático y tablero intercultural." },
      { title: "Fibra, lácteos y alimentos con poco valor local", problem: "Calidad, frío, transformación y contratos limitan margen en cadenas altoandinas.", affected: "Criadores, productores, cooperativas, artesanas y jóvenes.", governmentDecision: "Invertir donde comprador, volumen, energía y gobernanza estén demostrados.", noamResponse: "Trazabilidad de fibra y lácteos y estudio de mercado." },
      { title: "Minería, frontera y logística informal", problem: "Trazabilidad débil, tiempos de paso y circuitos informales elevan riesgos ambientales y comerciales.", affected: "Comunidades, comerciantes, transportistas, operadores formales y autoridades.", governmentDecision: "Integrar legalidad, origen, tiempo, sanidad y protección sin excluir canales presenciales.", noamResponse: "Motor de logística fronteriza y radar de trazabilidad." }
    ],
    opportunities: [
      { title: "Agua rural por desempeño", rationale: "Cloro, repuestos y registro offline pueden mejorar disponibilidad con atención multilingüe.", actors: "JASS, municipios, salud, técnicos y comunidades.", validation: "Confirmar sistemas, operador, cuota, fallas, supervisión y subsidio." },
      { title: "Fibra y lácteos con calidad", rationale: "Clasificación, frío y transformación pueden elevar precio si hay contrato recurrente.", actors: "Productores, cooperativas, compradores, laboratorios y logística.", validation: "Medir calidad, volumen, energía, utilización, precio neto y reparto." },
      { title: "Logística fronteriza interoperable", rationale: "Citas, frío y documentos pueden reducir espera manteniendo controles.", actors: "CEBAF, transportistas, comercio, sanidad y operadores.", validation: "Medir tiempo base, rechazos, volumen, seguridad y gobernanza de datos." }
    ],
    interventions: [
      { title: "Observatorio Puno-Titicaca", outcome: "Conectar agua, saneamiento y restauración binacional.", deliverable: "Puntos, parámetros, activos, alertas y cadena de custodia." },
      { title: "Asistente climático multilingüe", outcome: "Acercar alertas y servicios en quechua y aimara.", deliverable: "Contenido validado, canal offline y protocolo de derivación." },
      { title: "Motor fronterizo", outcome: "Reducir variabilidad logística sin debilitar controles.", deliverable: "Tiempos, documentos, frío, incidentes y contingencia." }
    ],
    evidenceGaps: ["Carga contaminante y operación de saneamiento por cuenca.", "Acceso estacional y servicio efectivo por lengua y localidad.", "Calidad, margen y comprador en fibra, lácteos y alimentos.", "Tiempos, rechazos y trazabilidad en frontera y minería."]
  },
  {
    code: "22", department: "San Martín", researchDate: "2026-07-31", confidence: "alta",
    evidenceBase: { scope: "departamental", sourceCount: 45, officialSources: "total", note: "Síntesis curada con enfoque agroforestal, urbano-rural y de derechos." },
    thesis: "San Martín puede crecer con cacao, café, palma, turismo y ciudades intermedias sin ampliar presión sobre el bosque. Para ello debe conectar derechos, productividad, trazabilidad, agua y logística.",
    problems: [
      { title: "Bosque, derechos y uso del suelo", problem: "Alertas, títulos, concesiones y expansión productiva no siempre se concilian antes de actuar.", affected: "Comunidades awajún y kichwa, productores, titulares, defensores y bosques.", governmentDecision: "Integrar derecho-alerta-campo-cierre con acceso gobernado y corrección.", noamResponse: "Observatorio bosque-tierra-producción." },
      { title: "Cadenas agroforestales con productividad desigual", problem: "Cacao, café y palma requieren calidad, poscosecha y cumplimiento sin excluir a pequeños productores.", affected: "Productores, cooperativas, trabajadores, compradores y comunidades.", governmentDecision: "Mejorar margen por parcela y trazabilidad antes que expandir superficie.", noamResponse: "Pasaporte agroforestal y tablero de desempeño." },
      { title: "Agua, residuos, salud y aprendizaje", problem: "Ciudades y localidades rurales necesitan continuidad, operación y mantenimiento de servicios básicos.", affected: "Hogares, niñez, JASS, municipios y ciudades intermedias.", governmentDecision: "Priorizar calidad y tiempo de falla por sistema, no solo cobertura.", noamResponse: "Operación digital de agua y observatorio de servicios." },
      { title: "Corredores, turismo y obras vulnerables", problem: "Lluvias, vías y activos incompletos afectan logística rural, turismo y acceso.", affected: "Productores, transportistas, visitantes, municipios y comunidades.", governmentDecision: "Gestionar corredores y activos por continuidad y criticidad.", noamResponse: "Motor logístico resiliente y PMO de activos." }
    ],
    opportunities: [
      { title: "Pasaporte agroforestal", rationale: "Geolocalización y calidad pueden sostener mercados sin nueva deforestación.", actors: "Productores, cooperativas, compradores, autoridades y tecnología.", validation: "Confirmar consentimiento, derecho, costo, lote aceptado y productor retenido." },
      { title: "Postcosecha compartida", rationale: "Fermentación, secado y laboratorio pueden elevar precio con volumen y comprador.", actors: "Cooperativas, productores, compradores y operadores.", validation: "Medir oferta, uso, energía, gobernanza, calidad y precio neto." },
      { title: "Logística rural resiliente", rationale: "Consolidación, estado vial y trazabilidad pueden reducir merma y variabilidad.", actors: "Productores, transportistas, acopios, municipios y compradores.", validation: "Construir rutas con volumen, temporada, costo, contingencia y compromiso." }
    ],
    interventions: [
      { title: "Observatorio bosque-producción", outcome: "Conciliar derechos, alertas y actividad económica.", deliverable: "Visor gobernado, trazabilidad y cierre de alertas." },
      { title: "Pasaporte agroforestal", outcome: "Elevar calidad y acceso a mercado sin expansión.", deliverable: "Parcelas consentidas, lotes, calidad y corrección." },
      { title: "Motor logístico y PMO", outcome: "Proteger corredores y poner activos en servicio.", deliverable: "Rutas, puntos críticos, cartera y alertas." }
    ],
    evidenceGaps: ["Tenencia, superposición y cierre de alertas de bosque.", "Margen, calidad y trazabilidad por cadena y productor.", "Continuidad y mantenimiento por sistema de agua.", "Costos logísticos y estado operativo de obras y activos."]
  },
  {
    code: "23", department: "Tacna", researchDate: "2026-07-31", confidence: "alta",
    evidenceBase: { scope: "departamental", sourceCount: 45, officialSources: "total", note: "Síntesis curada con enfoque hídrico, fronterizo y de resiliencia." },
    thesis: "Tacna debe administrar escasez hídrica, frontera, minería y agroalimentación con una sola arquitectura de datos. El crecimiento solo será sostenible si protege acuíferos y continuidad de servicios críticos.",
    problems: [
      { title: "Seguridad hídrica y reúso", problem: "Cuenca, acuífero, calidad, derechos y demanda no siempre se observan en un balance común.", affected: "Hogares, La Yarada-Los Palos, agricultores, minería y provincias altas.", governmentDecision: "Administrar extracción y reúso por aptitud con límites y monitoreo verificable.", noamResponse: "Gemelo hídrico Tacna y tablero de decisiones." },
      { title: "Frontera, salud y logística", problem: "Espera, documentos, contingencias y demanda de atención cruzan sistemas y autoridades.", affected: "Viajeros, comerciantes, transportistas, pacientes y operadores fronterizos.", governmentDecision: "Gestionar nivel de servicio e interoperabilidad protegiendo identidad y controles.", noamResponse: "Centro de desempeño fronterizo." },
      { title: "Minería y canon con diversificación pendiente", problem: "Compras y renta no garantizan proveedores repetidos ni activos operativos.", affected: "MYPE, jóvenes, municipios, comunidades y usuarios.", governmentDecision: "Conectar categorías de compra, certificación y cartera pública con resultados.", noamResponse: "Radar de proveedores y PMO de activos." },
      { title: "Agroalimentación y pesca bajo límite hídrico", problem: "Olivo, orégano y pesca requieren calidad, frío, trazabilidad y mayor margen por recurso.", affected: "Productores, pescadores, plantas, trabajadores y compradores.", governmentDecision: "Priorizar valor y resiliencia, no expansión física sin balance.", noamResponse: "Pasaporte de lote y motor de frío y logística." }
    ],
    opportunities: [
      { title: "Reúso por aptitud", rationale: "Agua tratada puede sustituir extracción dulce en usos compatibles.", actors: "Prestadores, municipios, agricultura, industria y fiscalizadores.", validation: "Confirmar calidad, destino, energía, lodos, contrato y ahorro neto." },
      { title: "Olivo y orégano de valor", rationale: "Origen, calidad y poscosecha pueden elevar margen por agua.", actors: "Productores, asociaciones, laboratorios, logística y compradores.", validation: "Medir consumo, calidad, volumen, comprador y precio neto." },
      { title: "Frontera interoperable", rationale: "Datos agregados y contingencia pueden reducir espera sin debilitar control.", actors: "CEBAF, salud, transporte, comercio y operadores.", validation: "Establecer tiempo base, demanda, incidentes, privacidad y responsabilidad." }
    ],
    interventions: [
      { title: "Gemelo hídrico Tacna", outcome: "Administrar escasez con balance y reglas visibles.", deliverable: "Caudal, calidad, pozo, derecho, demanda y escenarios." },
      { title: "Centro fronterizo", outcome: "Reducir espera y mejorar contingencia.", deliverable: "Nivel de servicio, flujos, incidentes y alertas." },
      { title: "Radar de proveedores y activos", outcome: "Convertir compras y canon en capacidad diversificada.", deliverable: "Categorías, empresas, brechas, cartera y pilotos." }
    ],
    evidenceGaps: ["Balance y calidad del acuífero y cuencas.", "Tiempos, demanda y resultados sanitarios en frontera.", "Compras mineras y desempeño de activos financiados con canon.", "Margen por agua, frío y comprador en agroalimentación y pesca."]
  },
  {
    code: "24", department: "Tumbes", researchDate: "2026-07-31", confidence: "alta",
    evidenceBase: { scope: "departamental", sourceCount: 45, officialSources: "total", note: "Síntesis curada con enfoque de cuenca, bioseguridad y frontera." },
    thesis: "Tumbes debe tratar agua, drenaje, inundación y dengue como un sistema de resiliencia. Langostino, manglar, frontera y turismo solo crean valor sostenible si protegen salud y límites ecológicos.",
    problems: [
      { title: "Agua, saneamiento y drenaje", problem: "Continuidad, presión, tratamiento y defensa frente a inundación dependen de activos y operadores conectados.", affected: "Tumbes, Zarumilla, Contralmirante Villar, hogares y servicios críticos.", governmentDecision: "Gestionar por sector hidráulico y cuenca, con niveles de servicio y mantenimiento.", noamResponse: "Gemelo de agua y resiliencia y PMO de activos." },
      { title: "Inundación, dengue y continuidad", problem: "Lluvias y aniegos interrumpen salud, educación, movilidad y elevan riesgo vectorial.", affected: "Barrios expuestos, niñez, personas mayores, comercios y establecimientos.", governmentDecision: "Integrar alerta, drenaje, control vectorial y recuperación por evento.", noamResponse: "Observatorio estacional y protocolo de continuidad." },
      { title: "Langostino, pesca y manglar", problem: "Bioseguridad, calidad de agua, cadena fría y límites ecológicos condicionan producción y precio.", affected: "Granjas, pescadores, recolectores, plantas, comunidades y manglares.", governmentDecision: "Medir sanidad, esfuerzo, trazabilidad y margen sin aumentar presión ilegal.", noamResponse: "Bioseguridad Langostino y pasaporte pesquero-manglar." },
      { title: "Frontera y destino costero", problem: "Comercio, movilidad, seguridad y turismo dependen de tiempos, servicios urbanos y contingencia binacional.", affected: "Comerciantes, viajeros, transportistas, hoteles, playas y ciudades fronterizas.", governmentDecision: "Gestionar nivel de servicio, seguridad y capacidad del destino por temporada.", noamResponse: "Centro fronterizo y motor de destino resiliente." }
    ],
    opportunities: [
      { title: "Agua visible por desempeño", rationale: "Telemetría y operación pueden mejorar continuidad y tiempo de respuesta.", actors: "Prestador, Sunass, municipios, salud y proveedores.", validation: "Establecer línea base, sector, calidad, responsabilidad, costo y tarifa." },
      { title: "Langostino seguro", rationale: "Sensores, laboratorio y protocolo pueden reducir mortalidad y merma.", actors: "Granjas, plantas, Sanipes, laboratorios y tecnología.", validation: "Confirmar participación, datos, bioseguridad, retorno y confidencialidad." },
      { title: "Manglar y pesca trazables", rationale: "Lote, talla, veda, frío y comprador pueden elevar cumplimiento y precio neto.", actors: "Organizaciones, Sernanp, sanidad, compradores y restaurantes.", validation: "Verificar límite ecológico, origen, cadena fría, privacidad y demanda." }
    ],
    interventions: [
      { title: "Gemelo de resiliencia Tumbes", outcome: "Conectar agua, lluvia, drenaje y activos críticos.", deliverable: "Sectores, niveles, alertas y protocolos." },
      { title: "Bioseguridad Langostino", outcome: "Reducir riesgo productivo con evidencia compartida.", deliverable: "Calidad, mortalidad, energía, laboratorio y alertas." },
      { title: "Centro de desempeño fronterizo", outcome: "Reducir variabilidad y proteger continuidad del destino.", deliverable: "Tiempos, flujos, incidentes y capacidad estacional." }
    ],
    evidenceGaps: ["Continuidad, presión, calidad y drenaje por sector.", "Daño, dengue y recuperación por evento y localidad.", "Calidad de agua, mortalidad y trazabilidad productiva.", "Tiempos, incidentes, gasto y capacidad en frontera y turismo."]
  },
  {
    code: "25", department: "Ucayali", researchDate: "2026-07-31", confidence: "alta",
    evidenceBase: { scope: "departamental", sourceCount: 48, officialSources: "total", note: "Síntesis curada con enfoque estacional, indígena y de bosque verificable." },
    thesis: "Ucayali es ciudad amazónica, plataforma forestal, corredor agroindustrial y red fluvial indígena. Accesibilidad estacional, bosque, agua y puesta en servicio de activos ordenan casi todas las decisiones.",
    problems: [
      { title: "Bosque, territorio y trazabilidad", problem: "Alertas, derechos, permisos, guías y compras no siempre comparten un identificador ni una respuesta coordinada.", affected: "Comunidades indígenas, defensores, productores, industria legal y bosques.", governmentDecision: "Unir alerta-derecho-campo-cierre sin exponer información sensible.", noamResponse: "Bosque verificable Ucayali con permisos diferenciados." },
      { title: "Accesibilidad estacional y servicios remotos", problem: "Carretera, río y aire cambian en tiempo, tarifa, frecuencia y confiabilidad durante el año.", affected: "Purús, Yurúa, Atalaya, Tahuanía, estudiantes, pacientes y productores.", governmentDecision: "Programar vuelos, rutas, brigadas y stock según acceso real y contingencia.", noamResponse: "Atlas de accesibilidad estacional." },
      { title: "Agua, saneamiento y drenaje en Pucallpa y provincias", problem: "Conexión no equivale a continuidad, calidad, tratamiento ni protección de microcuencas.", affected: "Hogares urbanos y ribereños, prestadores, sistemas comunales y salud.", governmentDecision: "Gestionar activos, calidad, energía y drenaje por sistema y zona.", noamResponse: "Observatorio de agua y activos críticos." },
      { title: "Transición productiva y activos incompletos", problem: "Madera, cacao, palma y bioindustria necesitan origen legal, mayor transformación, logística y servicios operativos.", affected: "Productores, comunidades, MYPE, plantas, trabajadores y compradores.", governmentDecision: "Priorizar valor por unidad y poner activos en servicio antes de ampliar capacidad.", noamResponse: "PMO de puesta en servicio y laboratorio bioindustrial." }
    ],
    opportunities: [
      { title: "Manufactura de madera legal", rationale: "Secado, diseño y valorización de residuos pueden elevar valor sin aumentar extracción.", actors: "Comunidades, concesiones, plantas, diseñadores, construcción y compradores.", validation: "Verificar origen, volumen, rendimiento, mercado, energía y reparto." },
      { title: "Cacao y palma sin nueva deforestación", rationale: "Georreferenciación, calidad y asistencia pueden mantener acceso a mercados.", actors: "Productores, cooperativas, compradores, autoridades y tecnología.", validation: "Confirmar derecho, historia del predio, costo, comprador y mecanismo de corrección." },
      { title: "Rutas y frío solar", rationale: "Programación fluvial y frío mantenible pueden reducir merma y mejorar acceso.", actors: "Comunidades, transportistas, productores, salud, técnicos y compradores.", validation: "Medir ruta, estación, volumen, energía, repuestos, tarifa y utilización." }
    ],
    interventions: [
      { title: "Atlas estacional Ucayali", outcome: "Programar servicios, vuelos, rutas y stock con confiabilidad.", deliverable: "Modo, tiempo, frecuencia, tarifa, capacidad y contingencia." },
      { title: "Bosque verificable", outcome: "Conectar derechos, alertas, permisos y cadena comercial.", deliverable: "Visor gobernado, trazabilidad y métricas de cierre." },
      { title: "PMO de puesta en servicio", outcome: "Convertir obras y equipos en servicios operativos.", deliverable: "Inventario, fallas, operador, presupuesto y decisiones." }
    ],
    evidenceGaps: ["Tiempos, tarifas y cancelaciones por estación y ruta.", "Derechos, permisos, origen y cierre de alertas de bosque.", "Continuidad, cloro, energía y tratamiento por sistema de agua.", "Demanda, utilización y estado operativo de activos productivos."]
  }
];
