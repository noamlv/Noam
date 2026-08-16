import type { DepartmentResearch } from "./department-research.ts";

export const departmentResearch04to14: DepartmentResearch[] = [
  {
    code: "04", department: "Arequipa", researchDate: "2026-07-31", confidence: "baja",
    evidenceBase: { scope: "macroregional", note: "Perfil preliminar construido con la síntesis macroregional; requiere investigación departamental equivalente al resto de perfiles." },
    thesis: "Arequipa combina una gran metrópoli, valles agrícolas, costa pesquera, provincias altoandinas y corredores mineros. Agua, expansión urbana, riesgo sísmico y distribución territorial de la inversión deben decidirse como un solo sistema.",
    problems: [
      { title: "Escasez y competencia por el agua", problem: "Ciudades, agricultura, minería y ecosistemas dependen de fuentes limitadas y de infraestructura cuya continuidad y calidad no siempre se observan juntas.", affected: "Hogares periurbanos, agricultores, juntas de usuarios, provincias altas y actividades productivas.", governmentDecision: "Construir un balance hídrico por cuenca y priorizar eficiencia, mantenimiento, tratamiento y reúso según riesgo y demanda.", noamResponse: "Tablero hídrico, mapa de usuarios y activos, escenarios de asignación y protocolo de alertas." },
      { title: "Crecimiento urbano y vivienda expuesta", problem: "La expansión metropolitana presiona movilidad, suelo, drenaje y servicios en un territorio sísmico y con quebradas activables.", affected: "Familias en periferias, usuarios de transporte, comercios y equipamientos críticos.", governmentDecision: "Cruzar crecimiento, accesibilidad, riesgo y capacidad de servicio antes de habilitar suelo o priorizar obras.", noamResponse: "Visor urbano de riesgo, diagnóstico de accesibilidad y cartera de intervenciones por sector." },
      { title: "Obras y activos que no completan el servicio", problem: "Una obra paralizada, incompleta o sin operación financiada no resuelve la necesidad que justificó la inversión.", affected: "Usuarios de salud, educación, agua, transporte y equipos públicos responsables de operar activos.", governmentDecision: "Clasificar la cartera por causa, criticidad, costo de cierre y capacidad de puesta en servicio.", noamResponse: "PMO de activos críticos, semáforo contractual y plan de reactivación, reformulación o cierre." },
      { title: "Minería y agro con pocos beneficios distribuidos", problem: "El crecimiento sectorial puede coexistir con proveedores débiles, empleo desigual y brechas en provincias rurales.", affected: "MYPE, jóvenes, productores, comunidades y ciudades fuera del eje metropolitano.", governmentDecision: "Vincular compras, formación y desarrollo productivo con demanda verificable y resultados territoriales.", noamResponse: "Analítica de compras, mapa de proveedores y diseño de pilotos de encadenamiento." }
    ],
    opportunities: [
      { title: "Eficiencia y reúso hídrico", rationale: "Medición, control de pérdidas y tratamiento pueden reducir presión si también se controla el consumo total.", actors: "Prestadores, juntas, agroindustria, minería, municipios y proveedores tecnológicos.", validation: "Confirmar balance, calidad, permisos, ahorro neto, costos operativos y comprador del agua tratada." },
      { title: "Proveedores para minería e infraestructura", rationale: "Mantenimiento, seguridad, agua, automatización y monitoreo pueden abrir contratos repetidos para empresas calificadas.", actors: "Empresas tractoras, contratistas, MYPE, institutos y gremios.", validation: "Revisar categorías de compra, requisitos, concentración y órdenes piloto accesibles." },
      { title: "Agroindustria y logística de mayor valor", rationale: "Frío, trazabilidad, transformación y consolidación pueden capturar más margen en valles y costa.", actors: "Productores, agroexportadores, pescadores, operadores logísticos y compradores.", validation: "Medir volumen, estacionalidad, merma, agua, energía, comprador y punto de equilibrio." }
    ],
    interventions: [
      { title: "Gemelo hídrico regional", outcome: "Decidir con una lectura común de oferta, demanda, calidad y riesgo.", deliverable: "Balance por cuenca, tablero de activos y escenarios de asignación." },
      { title: "PMO de activos críticos", outcome: "Convertir inversión acumulada en servicios efectivamente operativos.", deliverable: "Cartera conciliada, alertas y plan de puesta en servicio." },
      { title: "Radar de demanda productiva", outcome: "Conectar compras reales con capacidades empresariales locales.", deliverable: "Mapa de categorías, proveedores, brechas y pilotos." }
    ],
    evidenceGaps: ["Balance hídrico operativo y demanda por cuenca.", "Estado y costo de cierre de obras y activos críticos.", "Exposición de hogares e infraestructura a riesgo sísmico y quebradas.", "Compras reales y barreras de entrada en minería, agroindustria y logística."]
  },
  {
    code: "05", department: "Ayacucho", researchDate: "2026-07-31", confidence: "baja",
    evidenceBase: { scope: "macroregional", note: "Perfil preliminar construido con evidencia macroregional sobre el sur andino y el VRAEM; requiere una investigación departamental propia." },
    thesis: "Ayacucho necesita conectar servicios rurales, nutrición, protección, economía agraria y acceso territorial. El promedio regional oculta diferencias entre Huamanga, provincias altoandinas y zonas vinculadas al VRAEM.",
    problems: [
      { title: "Brechas infantiles y maternas superpuestas", problem: "Nutrición, agua, salud preventiva y protección frente a violencia se acumulan en hogares con barreras de distancia y lengua.", affected: "Niñas, niños, adolescentes, gestantes, mujeres rurales y hogares quechuahablantes.", governmentDecision: "Focalizar paquetes integrados por territorio y cohorte, con referencia efectiva y seguimiento de resultados.", noamResponse: "Mapa multidimensional, encuesta intercultural y tablero protegido de continuidad de atención." },
      { title: "Acceso rural a salud, educación y conectividad", problem: "La existencia de un establecimiento no garantiza personal, insumos, transporte, internet útil ni atención bilingüe.", affected: "Comunidades dispersas, docentes, pacientes, jóvenes y personas mayores.", governmentDecision: "Programar redes móviles y nodos resolutivos según tiempos reales de viaje y estacionalidad.", noamResponse: "Atlas de accesibilidad, inventario operativo y diseño de rutas de servicio." },
      { title: "Economía rural con baja captura de valor", problem: "Agricultura, ganadería, artesanía y turismo enfrentan fricciones de escala, calidad, logística y conexión comercial.", affected: "Productores familiares, asociaciones, mujeres emprendedoras, artesanos y jóvenes.", governmentDecision: "Priorizar cadenas con oferta comprobable, comprador y restricciones solucionables.", noamResponse: "Estudio de cadena, segmentación, análisis de mercado y diseño de pilotos." },
      { title: "Cartera pública con mantenimiento y cierre pendientes", problem: "Recursos dispersos entre obras y programas pueden perder impacto sin secuencia, operación ni seguimiento territorial.", affected: "Municipalidades pequeñas, usuarios de servicios y comunidades con proyectos incompletos.", governmentDecision: "Ordenar inversiones por problema, madurez, riesgo, complementariedad y costo de operación.", noamResponse: "Sala regional de inversiones, alertas y asistencia compartida para municipios." }
    ],
    opportunities: [
      { title: "Servicios rurales bilingües", rationale: "Teleapoyo asistido, logística de salud y contenidos offline pueden reducir viajes si fortalecen presencia local.", actors: "Redes de salud, educación, municipios, operadores y facilitadores comunitarios.", validation: "Medir demanda, personal, conectividad, aceptación cultural, referencia y costo por servicio completado." },
      { title: "Alimentos andinos y artesanía con mercado", rationale: "Calidad, diseño, trazabilidad y venta coordinada pueden elevar ingreso sin homogeneizar conocimientos locales.", actors: "Asociaciones, cooperativas, artesanos, compradores, turismo y programas productivos.", validation: "Confirmar volumen, estándar, propiedad intelectual, comprador, margen y gobernanza." },
      { title: "Mantenimiento territorial compartido", rationale: "Agrupar agua, caminos, escuelas y energía puede dar escala a técnicos y municipios pequeños.", actors: "Municipalidades, comunidades, técnicos locales y proveedores regionales.", validation: "Inventariar activos, frecuencia de falla, modalidad contractual, supervisión y presupuesto recurrente." }
    ],
    interventions: [
      { title: "Observatorio de primera infancia", outcome: "Conectar nutrición, agua, atención y protección por territorio.", deliverable: "Mapa de brechas, cohortes agregadas y alertas de continuidad." },
      { title: "Atlas de acceso rural", outcome: "Programar servicios según tiempo y confiabilidad de viaje.", deliverable: "Modelo estacional, nodos y rutas prioritarias." },
      { title: "PMO municipal compartida", outcome: "Ayudar a municipios pequeños a cerrar proyectos y operar activos.", deliverable: "Cartera, semáforo, asistencia y brief ejecutivo." }
    ],
    evidenceGaps: ["Indicadores recientes por provincia, ruralidad y lengua.", "Tiempos estacionales hacia servicios resolutivos.", "Estado operativo y sostenibilidad de obras locales.", "Demanda, costos y compradores por cadena productiva."]
  },
  {
    code: "06", department: "Cajamarca", researchDate: "2026-07-31", confidence: "alta",
    evidenceBase: { scope: "departamental", sourceCount: 38, officialSources: "total", note: "Síntesis curada de investigación departamental con registro auditable de afirmaciones." },
    thesis: "La alta ruralidad convierte agua, nutrición, conectividad, productividad y mantenimiento en un mismo desafío territorial. Cajamarca debe transformar recursos mineros y exportadores en servicios confiables e ingresos rurales duraderos.",
    problems: [
      { title: "Agua y saneamiento que no completan el servicio", problem: "La red no asegura conexión interior, continuidad, cloración, tratamiento ni mantenimiento de sistemas pequeños.", affected: "Caseríos, periferias, JASS, mujeres cuidadoras y primera infancia.", governmentDecision: "Priorizar sistemas por riesgo sanitario y financiar operación, repuestos y asistencia, no solo infraestructura.", noamResponse: "Inventario operativo, tablero de continuidad y modelo de soporte a JASS." },
      { title: "Nutrición y educación con desigualdad territorial", problem: "Anemia, desnutrición, alfabetización y transición educativa se relacionan con acceso, ingresos y servicios del hogar.", affected: "Niñez rural, mujeres adultas, jóvenes y población dispersa.", governmentDecision: "Integrar intervenciones por cohorte y territorio con indicadores de permanencia y recuperación.", noamResponse: "Mapa de brechas, seguimiento de cohortes agregadas y evaluación de servicios." },
      { title: "Cadenas rurales con productividad y logística débiles", problem: "Leche, café, cacao y agricultura familiar pierden valor por calidad, frío, poscosecha, vías y negociación.", affected: "Productores, cooperativas, transportistas y MYPE de Jaén, San Ignacio y cuencas ganaderas.", governmentDecision: "Concentrar inversión productiva donde coincidan oferta, comprador, logística y capacidad organizativa.", noamResponse: "Diagnóstico de cadenas, costos logísticos y pilotos de calidad, frío o trazabilidad." },
      { title: "Minería e inversión con beneficios poco conectados", problem: "Transferencias y actividad extractiva no garantizan activos operativos, proveedores locales o reducción de brechas.", affected: "Comunidades de influencia, municipios, MYPE y usuarios de proyectos públicos.", governmentDecision: "Seguir el recorrido recurso-proyecto-servicio y abrir categorías de compra verificables.", noamResponse: "Observatorio de inversión, tablero de compromisos y radar de proveedores." }
    ],
    opportunities: [
      { title: "Café y cacao trazables", rationale: "Poscosecha, calidad y debida diligencia pueden conservar mercados exigentes y mejorar precio neto.", actors: "Cooperativas, exportadores, laboratorios, logística y productores.", validation: "Confirmar lotes, calidad, costos, comprador, gobernanza de datos y distribución del margen." },
      { title: "Leche con calidad y cadena de frío", rationale: "Acopio compartido y pago por calidad pueden reducir merma y fortalecer cuencas ganaderas.", actors: "Productores, plantas, transportistas, proveedores de frío y compradores.", validation: "Medir volumen, energía, rutas, utilización, inocuidad, precio y contrato ancla." },
      { title: "Agua rural y mantenimiento como servicio", rationale: "Cloración, repuestos y soporte técnico pueden agruparse para sistemas pequeños.", actors: "Municipios, JASS, salud, técnicos locales y proveedores.", validation: "Inventariar sistemas, fallas, capacidad de pago, modalidad contractual y supervisión." }
    ],
    interventions: [
      { title: "Observatorio rural de servicios", outcome: "Saber qué sistemas funcionan y qué hogares siguen aislados.", deliverable: "Mapa, fichas operativas, alertas y brief provincial." },
      { title: "Rastreador recurso-proyecto-servicio", outcome: "Vincular presupuesto y canon con activos efectivamente operativos.", deliverable: "Cartera conciliada, hitos, riesgos y costos de operación." },
      { title: "Laboratorio de cadenas rurales", outcome: "Validar oportunidades antes de financiar infraestructura productiva.", deliverable: "Estudio de mercado, costos, actores y piloto comercial." }
    ],
    evidenceGaps: ["Continuidad, cloro y sostenibilidad por sistema de agua.", "Ingreso rural, productividad y transición educativa por provincia.", "Costos, calidad y compradores en leche, café y cacao.", "Estado operativo de activos y compras mineras accesibles a proveedores locales."]
  },
  {
    code: "07", department: "Callao", researchDate: "2026-07-31", confidence: "alta",
    evidenceBase: { scope: "departamental", sourceCount: 48, officialSources: "total", note: "Síntesis curada para la Provincia Constitucional del Callao con evidencia oficial y registro cuantitativo." },
    thesis: "Puerto y aeropuerto convierten al Callao en infraestructura nacional, pero empleo, seguridad, vivienda y ambiente se viven localmente. La decisión clave es distribuir valor y reducir externalidades con gobernanza metropolitana interoperable.",
    problems: [
      { title: "Seguridad y economías ilegales", problem: "Violencia, extorsión y riesgos sobre carga afectan hogares, comercios, transportistas y competitividad.", affected: "Barrios chalacos, MYPE, trabajadores, transportistas, víctimas y operadores logísticos.", governmentDecision: "Integrar prevención focalizada, investigación, protección y análisis territorial sin depender solo de operativos o cámaras.", noamResponse: "Tablero protegido de incidentes, análisis de puntos críticos y evaluación de intervenciones." },
      { title: "Congestión y externalidades logísticas", problem: "Carga, aeropuerto y tránsito local compiten por vías, generan espera, ruido, emisiones y accidentes.", affected: "Residentes de corredores, conductores, empresas, viajeros y usuarios del transporte urbano.", governmentDecision: "Gestionar citas, patios, rutas y horarios con métricas de tiempo, seguridad y emisión.", noamResponse: "Gemelo logístico, observatorio de nivel de servicio y simulación de flujos." },
      { title: "Vivienda y servicios con bolsones de riesgo", problem: "El promedio urbano alto oculta sectores con agua incompleta, tenencia insegura, materiales ligeros y exposición sísmica o de tsunami.", affected: "Ventanilla, Mi Perú, periferias, personas mayores y hogares con movilidad reducida.", governmentDecision: "Cruzar tenencia, estructura, servicios y evacuación para diferenciar refuerzo, mejora o reasentamiento.", noamResponse: "Atlas de vivienda y continuidad, rutas de evacuación y cartera focalizada." },
      { title: "Externalidades ambientales poco conciliadas", problem: "Ruido, aire, litoral, residuos y aguas requieren datos continuos y atribución responsable entre múltiples autoridades.", affected: "Pescadores, barrios portuarios y aeroportuarios, bañistas, industria y ecosistemas costeros.", governmentDecision: "Acordar indicadores, responsabilidades, cadena de custodia y protocolos de respuesta.", noamResponse: "Observatorio ambiental interoperable y tablero de compromisos." }
    ],
    opportunities: [
      { title: "Comunidad portuaria digital", rationale: "Citas, documentos y tiempos compartidos pueden reducir viajes vacíos y colas.", actors: "APN, terminales, aduanas, depósitos, transportistas y dueños de carga.", validation: "Medir espera base, interoperabilidad, reglas de competencia, ciberseguridad y retorno por actor." },
      { title: "Cadena de frío multimodal", rationale: "Pesca, alimentos y productos farmacéuticos requieren continuidad térmica entre puerto, aeropuerto y ciudad.", actors: "Operadores logísticos, productores, laboratorios, almacenes y compradores.", validation: "Confirmar volumen contratado, energía, excursiones térmicas, utilización y responsabilidad." },
      { title: "Formación dual para logística e industria", rationale: "Prácticas pagadas y módulos diseñados con empleadores pueden conectar jóvenes con demanda real.", actors: "Empresas, institutos, gobiernos, jóvenes de Ventanilla, Mi Perú y Callao.", validation: "Verificar vacantes, salarios, barreras, retención y aportes empresariales." }
    ],
    interventions: [
      { title: "Gemelo logístico Callao", outcome: "Reducir variabilidad y externalidades en corredores críticos.", deliverable: "Modelo de flujos, tablero de espera y escenarios operativos." },
      { title: "Observatorio de seguridad económica", outcome: "Orientar prevención y control con evidencia protegida.", deliverable: "Mapa agregado, taxonomía, alertas y evaluación." },
      { title: "Atlas de continuidad urbana", outcome: "Priorizar vivienda, servicios y evacuación por riesgo real.", deliverable: "Visor, perfiles barriales y cartera de medidas." }
    ],
    evidenceGaps: ["Tiempos, colas y emisiones por corredor y franja horaria.", "Victimización, extorsión y respuesta con desagregación segura.", "Continuidad de agua, condición estructural y evacuación por sector.", "Monitoreo ambiental conciliado entre puerto, aeropuerto, litoral e industria."]
  },
  {
    code: "08", department: "Cusco", researchDate: "2026-07-31", confidence: "alta",
    evidenceBase: { scope: "departamental", sourceCount: 39, officialSources: "total", note: "Síntesis curada de investigación departamental oficial con lectura por espacios funcionales." },
    thesis: "Cusco es metrópoli patrimonial, Valle Sagrado, provincias altoandinas, Amazonía y corredores extractivos. Turismo, agua, canon y producción deben gobernarse sin ocultar diferencias culturales ni territoriales.",
    problems: [
      { title: "Agua, saneamiento y nutrición sin continuidad", problem: "Cobertura nominal no garantiza agua diaria, cloración, tratamiento ni resultados nutricionales.", affected: "Hogares rurales, JASS, primera infancia, periferias y comunidades amazónicas.", governmentDecision: "Priorizar por riesgo sanitario, operación y acceso, integrando agua, salud y nutrición.", noamResponse: "Monitor de equidad territorial y fichas operativas de sistemas." },
      { title: "Turismo concentrado y patrimonio bajo presión", problem: "Flujos y gasto se concentran mientras suelo, residuos, movilidad y conservación soportan costos crecientes.", affected: "Residentes, comunidades, trabajadores, operadores y patrimonio del Centro Histórico y Valle Sagrado.", governmentDecision: "Gestionar capacidad, permanencia, compra local y distribución del visitante por circuito.", noamResponse: "Observatorio de distribución del valor y presión patrimonial." },
      { title: "Rentas extractivas que no siempre crean activos confiables", problem: "Canon, minería y gas pueden financiar obras sin asegurar secuencia, mantenimiento o servicio final.", affected: "Municipios, comunidades, proveedores y usuarios de infraestructura.", governmentDecision: "Rastrear cada recurso hasta el activo operativo, su resultado y costo de sostenimiento.", noamResponse: "Rastreador canon-proyecto-servicio y sala de inversiones." },
      { title: "Producción rural expuesta a clima y logística", problem: "Café, cacao, agricultura andina y ganadería pierden valor por agua, calidad, frío, caminos y trazabilidad.", affected: "Productores, cooperativas, comunidades y negocios de La Convención y provincias altas.", governmentDecision: "Priorizar cadenas y corredores con demanda comprobada y adaptación climática.", noamResponse: "Atlas agro-bioeconómico, costos logísticos y pilotos de poscosecha." }
    ],
    opportunities: [
      { title: "Destinos turísticos distribuidos", rationale: "Circuitos con gobernanza, saneamiento y compras locales pueden ampliar permanencia sin saturar nodos centrales.", actors: "Comunidades, operadores, municipios, cultura, alojamientos y transportistas.", validation: "Medir capacidad, gasto, permanencia, aceptación comunitaria y presión sobre servicios." },
      { title: "Trazabilidad de café y cacao", rationale: "Geolocalización, calidad y cadena de custodia pueden sostener acceso a mercados exigentes.", actors: "Cooperativas, productores, exportadores, laboratorios y compradores.", validation: "Confirmar volumen, origen, gobernanza de datos, costo y prima efectiva." },
      { title: "Proveedores minero-energéticos", rationale: "Mantenimiento, agua, seguridad y monitoreo ofrecen demanda B2B potencial.", actors: "Empresas, contratistas, MYPE, institutos y comunidades.", validation: "Analizar compras, homologación, financiamiento y contratos piloto." }
    ],
    interventions: [
      { title: "Monitor de equidad territorial", outcome: "Priorizar sin confundir promedios departamentales con acceso real.", deliverable: "Tablero provincial, mapas y fichas de brechas." },
      { title: "Observatorio del valor turístico", outcome: "Gestionar gasto, presión y beneficio local por circuito.", deliverable: "Flujos, encuesta de gasto, capacidad y compras locales." },
      { title: "Rastreador canon-servicio", outcome: "Mostrar si la renta se convierte en un activo sostenible.", deliverable: "Cadena recurso-proyecto-operación con alertas." }
    ],
    evidenceGaps: ["Continuidad y calidad de agua por sistema y localidad.", "Gasto, empleo, compras y capacidad de carga por circuito turístico.", "Costos de operación y resultados de proyectos financiados con canon.", "Oferta, costos logísticos y trazabilidad por cadena rural."]
  },
  {
    code: "09", department: "Huancavelica", researchDate: "2026-07-31", confidence: "alta",
    evidenceBase: { scope: "departamental", sourceCount: 47, officialSources: "total", note: "Síntesis curada con evidencia oficial y énfasis rural, intercultural y operativo." },
    thesis: "La dispersión, altura y mayoría quechuahablante elevan el costo de cada servicio. Huancavelica necesita redes rurales que funcionen, mantenimiento compartido y productividad adaptada al clima, no soluciones uniformes.",
    problems: [
      { title: "Agua, saneamiento y nutrición infantil", problem: "La conexión no asegura continuidad, cloración ni cadena sanitaria completa, y las brechas se acumulan en la primera infancia.", affected: "Niñas y niños, hogares rurales, JASS y mujeres cuidadoras.", governmentDecision: "Inventariar sistemas y focalizar paquetes de agua, salud y nutrición por riesgo.", noamResponse: "Registro operativo, mapa sanitario y seguimiento agregado de cohortes." },
      { title: "Servicios rurales sin accesibilidad ni pertinencia suficientes", problem: "Salud, educación e internet pierden efectividad cuando faltan transporte, energía, personal o atención quechua.", affected: "Comunidades dispersas, estudiantes, pacientes y personas mayores.", governmentDecision: "Diseñar nodos y rutas móviles según tiempos estacionales y capacidad resolutiva.", noamResponse: "Atlas de acceso, inventario operativo y programación de redes móviles." },
      { title: "Producción vulnerable al clima y la escala", problem: "Agricultura, ganadería, trucha y fibra enfrentan heladas, agua limitada, frío, poscosecha y mercados fragmentados.", affected: "Productores familiares, asociaciones, mujeres rurales y jóvenes.", governmentDecision: "Vincular riego y activos productivos con balance hídrico, comprador y operación.", noamResponse: "Diagnóstico productivo, escenarios climáticos y pilotos de calidad o frío." },
      { title: "Municipios pequeños con activos difíciles de mantener", problem: "Equipos reducidos deben operar agua, caminos, escuelas, salud y conectividad en grandes distancias.", affected: "Municipalidades, comunidades y usuarios de infraestructura local.", governmentDecision: "Agrupar mantenimiento, asistencia y compras con estándares comunes y control regional.", noamResponse: "PMO compartida, inventario de activos y contratos por nivel de servicio." }
    ],
    opportunities: [
      { title: "Agua rural como servicio", rationale: "Monitoreo, cloración, repuestos y soporte pueden mejorar disponibilidad de sistemas comunales.", actors: "JASS, municipios, salud, técnicos locales y proveedores.", validation: "Verificar inventario, fallas, operador, cuota, contrato y supervisión." },
      { title: "Frío y poscosecha compartidos", rationale: "Palta, trucha y lácteos pueden reducir merma si existe volumen, sanidad y ruta comercial.", actors: "Productores, cooperativas, compradores, logística y proveedores de frío.", validation: "Medir oferta, estacionalidad, utilización, energía, rechazo y precio neto." },
      { title: "Fibra y textiles con identidad", rationale: "Clasificación, diseño y venta pueden pagar calidad y conocimiento local.", actors: "Criadores, artesanas, diseñadores, compradores y turismo.", validation: "Confirmar calidad, propiedad cultural, demanda, margen y reparto de valor." }
    ],
    interventions: [
      { title: "Atlas de servicios rurales", outcome: "Programar salud, educación y conectividad por acceso real.", deliverable: "Tiempos, nodos, rutas y capacidad operativa." },
      { title: "PMO de mantenimiento compartido", outcome: "Sostener activos de municipios pequeños.", deliverable: "Inventario, niveles de servicio, alertas y contratos agrupados." },
      { title: "Laboratorio productivo climático", outcome: "Validar cadenas adaptadas antes de invertir.", deliverable: "Balance, mercado, riesgos y piloto por corredor." }
    ],
    evidenceGaps: ["Cloro, continuidad y fallas por sistema rural.", "Tiempo estacional y capacidad efectiva de salud y educación.", "Oferta, margen y comprador en cadenas priorizadas.", "Estado y costo de mantenimiento de activos municipales."]
  },
  {
    code: "10", department: "Huánuco", researchDate: "2026-07-31", confidence: "alta",
    evidenceBase: { scope: "departamental", sourceCount: 49, officialSources: "total", note: "Síntesis curada con evidencia oficial, registro cuantitativo y comparación funcional." },
    thesis: "Huánuco conecta Andes y Amazonía con enormes diferencias de acceso. Agua, servicios rurales, bosque, agricultura y logística requieren una lectura por corredores, no una política departamental uniforme.",
    problems: [
      { title: "Agua, salud y nutrición en hogares dispersos", problem: "Continuidad, calidad, atención y nutrición se deterioran cuando sistemas y redes operan de forma aislada.", affected: "Primera infancia, hogares rurales, JASS y comunidades amazónicas.", governmentDecision: "Focalizar territorios donde coinciden riesgo sanitario, baja accesibilidad y débil operación.", noamResponse: "Mapa multidimensional y observatorio de agua y primera infancia." },
      { title: "Red rural de servicios incompleta", problem: "Fibra, establecimientos y escuelas no garantizan energía, equipos, personal, contenido ni referencia.", affected: "Estudiantes, pacientes, docentes, personal de salud y localidades alejadas.", governmentDecision: "Definir nodos resolutivos y niveles de servicio por corredor y estación.", noamResponse: "Atlas de accesibilidad y tablero de disponibilidad operativa." },
      { title: "Agricultura y bosque con presiones contrapuestas", problem: "Cacao, café, papa y agroforestería necesitan productividad y trazabilidad sin expandir deforestación.", affected: "Productores, cooperativas, comunidades, compradores y bosques.", governmentDecision: "Vincular asistencia, derechos, mercado y monitoreo territorial por cadena.", noamResponse: "Pasaporte productivo, análisis de costos y seguimiento de bosque." },
      { title: "Logística y obras vulnerables a clima y gestión", problem: "Vías, puentes y proyectos pierden continuidad por lluvias, mantenimiento débil y carteras fragmentadas.", affected: "Productores, transportistas, municipios y usuarios de servicios.", governmentDecision: "Priorizar puntos críticos y activos según impacto sobre acceso y economía.", noamResponse: "Motor de logística resiliente y PMO territorial." }
    ],
    opportunities: [
      { title: "Cacao con calidad y trazabilidad", rationale: "Fermentación, secado y debida diligencia pueden elevar calidad y conservar compradores.", actors: "Productores, cooperativas, exportadores, laboratorios y logística.", validation: "Confirmar volumen, calidad, contrato, costo y gobernanza territorial." },
      { title: "Última milla digital útil", rationale: "Soporte, energía y acuerdos de servicio pueden convertir fibra en salud, educación, trámites y comercio.", actors: "Operadores, gobiernos, escuelas, salud, técnicos y comunidades.", validation: "Medir disponibilidad, uso, soporte, capacidad local y resultado del servicio." },
      { title: "Logística rural programada", rationale: "Consolidar carga y reducir retornos vacíos puede mejorar margen de varias cadenas.", actors: "Productores, transportistas, centros de acopio, compradores y municipios.", validation: "Construir matriz origen-destino con volumen, frecuencia, costo y compromiso." }
    ],
    interventions: [
      { title: "Atlas de accesibilidad andino-amazónica", outcome: "Programar servicios y logística por corredor real.", deliverable: "Tiempos, modos, estacionalidad y nodos críticos." },
      { title: "Pasaporte agroforestal", outcome: "Unir calidad, mercado, derechos y bosque en pie.", deliverable: "Lotes, trazabilidad, alertas y protocolo de datos." },
      { title: "PMO territorial de activos", outcome: "Recuperar continuidad de vías, agua y servicios.", deliverable: "Cartera, puntos críticos, responsables y alertas." }
    ],
    evidenceGaps: ["Continuidad y calidad por sistema de agua.", "Disponibilidad efectiva de servicios y conectividad por localidad.", "Costos, trazabilidad y margen por cadena productiva.", "Condición, criticidad y mantenimiento de vías y activos."]
  },
  {
    code: "11", department: "Ica", researchDate: "2026-07-31", confidence: "alta",
    evidenceBase: { scope: "departamental", sourceCount: 42, officialSources: "total", note: "Síntesis curada con evidencia oficial y énfasis en seguridad hídrica y continuidad territorial." },
    thesis: "El dinamismo agroexportador, industrial y turístico de Ica depende de un sistema hídrico tensionado y de ciudades expuestas a sismos e inundaciones. Crecer requiere medir consumo total, continuidad y distribución del valor.",
    problems: [
      { title: "Seguridad hídrica y saneamiento", problem: "Acuíferos, redes, agricultura e industria compiten por agua mientras faltan datos conciliados de extracción, pérdidas, calidad y reúso.", affected: "Hogares, productores, agroindustria, juntas, EPS y ecosistemas.", governmentDecision: "Administrar balance y productividad hídrica con límites, calidad y protección de usuarios.", noamResponse: "Observatorio hídrico, balance por zona y alertas de continuidad." },
      { title: "Vivienda y continuidad frente a desastres", problem: "Expansión urbana, sismos, quebradas y servicios críticos frágiles elevan el riesgo de interrupción.", affected: "Periferias de Ica y Chincha, Nasca, Palpa, Marcona y usuarios de equipamientos.", governmentDecision: "Priorizar refuerzo, rutas y redundancia según exposición y criticidad.", noamResponse: "Atlas de vivienda y continuidad con cartera de mitigación." },
      { title: "Agroindustria con brechas laborales y de valor", problem: "Exportar más no asegura trabajo decente, inclusión de pequeños productores ni menor presión hídrica.", affected: "Trabajadores, mujeres, pequeños productores, empresas y ciudades receptoras.", governmentDecision: "Medir productividad por agua, empleo, merma y margen distribuido.", noamResponse: "Tablero de desempeño productivo y estudio de proveedores y trabajo." },
      { title: "Logística e industria sin lectura integrada", problem: "Pisco, Marcona, litoral y corredores productivos requieren coordinar flujos, ambiente, frío y mantenimiento.", affected: "Pesca, minería, industria, transportistas, puertos y comunidades costeras.", governmentDecision: "Dimensionar inversiones con demanda y riesgos reales por corredor.", noamResponse: "Gemelo logístico y observatorio de activos y externalidades." }
    ],
    opportunities: [
      { title: "Productividad hídrica verificable", rationale: "Auditoría, sensores y operación pueden reducir consumo unitario si también disminuye extracción total.", actors: "Agroindustria, juntas, EPS, minería y proveedores.", validation: "Establecer línea base, balance, efecto rebote, costo y ahorro persistente." },
      { title: "Circularidad agro-pesquera", rationale: "Subproductos pueden convertirse en insumos si hay calidad, permisos y comprador real.", actors: "Agroindustria, pesca, gestores, startups y compradores industriales.", validation: "Caracterizar volumen, estacionalidad, inocuidad, logística y precio." },
      { title: "Logística multimodal y frío", rationale: "Consolidación y control térmico pueden reducir rechazo entre fundo, planta, puerto y mercado.", actors: "Productores, plantas, transportistas, puertos y compradores.", validation: "Confirmar volumen, tiempos, energía, contingencia y contratos ancla." }
    ],
    interventions: [
      { title: "Observatorio hídrico Ica", outcome: "Tomar decisiones con balance, continuidad y calidad comunes.", deliverable: "Tablero, zonas, activos, usuarios y escenarios." },
      { title: "Atlas de continuidad sísmica", outcome: "Reducir interrupción de vivienda y servicios críticos.", deliverable: "Visor de exposición, criticidad y medidas." },
      { title: "Gemelo logístico productivo", outcome: "Dimensionar frío, rutas y activos con demanda verificable.", deliverable: "Modelo de flujos, costos y contingencias." }
    ],
    evidenceGaps: ["Extracción, recarga, pérdidas y calidad por zona hídrica.", "Condición estructural y continuidad de activos críticos.", "Empleo, margen y acceso de pequeños productores por cadena.", "Flujos, frío y externalidades por corredor productivo."]
  },
  {
    code: "12", department: "Junín", researchDate: "2026-07-31", confidence: "media",
    evidenceBase: { scope: "departamental", sourceCount: 40, officialSources: "total", note: "Síntesis curada con evidencia oficial; algunas relaciones causales requieren validación territorial adicional." },
    thesis: "Junín articula Huancayo, el Mantaro, corredores minero-industriales y la selva central. Salud ambiental, conectividad y valor agroindustrial deben gestionarse entre sistemas territoriales muy distintos.",
    problems: [
      { title: "Salud ambiental y remediación en La Oroya-Mantaro", problem: "Pasivos, emisiones y agua requieren líneas base comparables, cadena de custodia y seguimiento de salud y remediación.", affected: "Niñez, hogares, trabajadores, agricultores, ciudades y ecosistemas del corredor.", governmentDecision: "Priorizar reducción de exposición y cumplimiento verificable, no solo actividad de remediación.", noamResponse: "Observatorio ambiental-sanitario y tablero de hitos de remediación." },
      { title: "Servicios y conectividad fuera de Huancayo", problem: "Distancia, vías, clima y capacidad operativa limitan acceso efectivo en provincias andinas y amazónicas.", affected: "Comunidades rurales e indígenas, pacientes, estudiantes y productores.", governmentDecision: "Diseñar redes multimodales de servicios según tiempo y confiabilidad.", noamResponse: "Atlas de accesibilidad y programación de nodos y rutas." },
      { title: "Agroindustria andino-amazónica con valor incompleto", problem: "Café, cacao, frutas y productos del Mantaro pierden margen por calidad, poscosecha, frío y logística.", affected: "Productores, cooperativas, transportistas y MYPE.", governmentDecision: "Financiar activos solo donde comprador, volumen y operación estén demostrados.", noamResponse: "Estudio de cadena, costos y pilotos multiusuario." },
      { title: "Diversificación industrial y activos públicos", problem: "Minería, industria y gobiernos requieren proveedores, mantenimiento y capacidad de ejecución más conectados.", affected: "MYPE, trabajadores, municipios y usuarios de servicios.", governmentDecision: "Vincular compras y cartera pública con capacidades y resultados medibles.", noamResponse: "Radar de proveedores y PMO de activos." }
    ],
    opportunities: [
      { title: "Remediación verificable", rationale: "Laboratorio, monitoreo y auditoría pueden atender pasivos si se paga por reducción de riesgo.", actors: "Entidades, empresas responsables, laboratorios, comunidades y fiscalizadores.", validation: "Definir línea base, acreditación, independencia, responsabilidad y resultado contractual." },
      { title: "Poscosecha compartida", rationale: "Secado, fermentación, clasificación y frío pueden elevar calidad de café, cacao y frutas.", actors: "Cooperativas, productores, compradores, logística y proveedores.", validation: "Confirmar volumen, temporada, uso, comprador y margen neto." },
      { title: "Proveedores industriales diversificados", rationale: "Mantenimiento, automatización, agua y seguridad pueden servir a minería y otros sectores.", actors: "Empresas tractoras, MYPE, institutos y gremios.", validation: "Partir de categorías de compra, requisitos y órdenes piloto." }
    ],
    interventions: [
      { title: "Observatorio Mantaro", outcome: "Conectar ambiente, salud, agua y remediación.", deliverable: "Línea base, tablero de muestras, alertas e hitos." },
      { title: "Atlas multimodal de acceso", outcome: "Programar servicios fuera del eje metropolitano.", deliverable: "Tiempos, modos, nodos y rutas críticas." },
      { title: "Radar productivo e industrial", outcome: "Alinear demanda con proveedores y activos compartidos.", deliverable: "Compras, capacidades, brechas y pilotos." }
    ],
    evidenceGaps: ["Exposición ambiental y seguimiento sanitario comparable.", "Tiempo y disponibilidad efectiva de servicios fuera de Huancayo.", "Volumen, calidad, costos y comprador por cadena.", "Compras industriales y estado operativo de activos públicos."]
  },
  {
    code: "13", department: "La Libertad", researchDate: "2026-07-31", confidence: "media",
    evidenceBase: { scope: "departamental", sourceCount: 42, officialSources: "total", note: "Síntesis curada con evidencia oficial y lectura diferenciada entre costa, Pataz y sierra." },
    thesis: "La Libertad combina agroexportación y servicios costeros con minería, sierra rural y una crisis de seguridad económica. Agua, legalidad, movilidad y mantenimiento deben resolverse por corredores.",
    problems: [
      { title: "Extorsión y violencia sobre la economía", problem: "Crimen organizado afecta transporte, comercio, construcción, minería y vida cotidiana, elevando costos y cerrando negocios.", affected: "Familias, MYPE, trabajadores, transportistas, escuelas y empresas.", governmentDecision: "Integrar prevención, investigación patrimonial, protección y análisis de redes con evaluación independiente.", noamResponse: "Observatorio protegido de seguridad económica y mapa de intervención." },
      { title: "Agua y agroindustria con distribución desigual", problem: "Grandes sistemas productivos conviven con continuidad urbana y rural incompleta y competencia por el recurso.", affected: "Hogares, productores pequeños, agroindustria, juntas y valles.", governmentDecision: "Medir balance, pérdidas, calidad y distribución de beneficios por territorio.", noamResponse: "Tablero hídrico-productivo y evaluación de cadenas." },
      { title: "Pataz: minería, legalidad y desarrollo territorial", problem: "Minería ilegal, violencia y trazabilidad débil impiden distinguir actividad formal, riesgo y beneficios locales.", affected: "Comunidades, trabajadores, empresas, autoridades y ambiente.", governmentDecision: "Integrar origen, permisos, seguridad, compras y remediación con debido proceso.", noamResponse: "Sistema de trazabilidad territorial y tablero de compromisos." },
      { title: "Brechas metropolitanas y rurales de acceso", problem: "Trujillo enfrenta movilidad, drenaje y expansión; la sierra, caminos, agua y mantenimiento disperso.", affected: "Periferias urbanas, provincias andinas, productores y usuarios de servicios.", governmentDecision: "Separar carteras por sistema territorial y priorizar continuidad y mantenimiento.", noamResponse: "Atlas de acceso y PMO diferenciada por corredor." }
    ],
    opportunities: [
      { title: "Agrotransformación de mayor valor", rationale: "Congelado, ingredientes y subproductos pueden diversificar una oferta aún concentrada en fresco.", actors: "Agroexportadores, productores, plantas, logística y compradores.", validation: "Confirmar comprador, volumen, energía, agua, inocuidad y margen." },
      { title: "Proveedores mineros responsables", rationale: "Mantenimiento, ventilación, agua y seguridad pueden crear capacidades locales con origen legal verificable.", actors: "Operaciones formales, contratistas, MYPE, institutos y fiscalizadores.", validation: "Verificar legalidad, categorías, beneficiario, requisitos y contratos piloto." },
      { title: "Mantenimiento rural agrupado", rationale: "Agua, caminos, escuelas y conectividad pueden contratarse por nivel de servicio entre municipios.", actors: "Municipios, comunidades, técnicos y proveedores regionales.", validation: "Inventariar activos, estándares, modalidad, supervisión y pago recurrente." }
    ],
    interventions: [
      { title: "Observatorio de seguridad económica", outcome: "Proteger actividad y focalizar respuesta con evidencia.", deliverable: "Taxonomía, mapa agregado, alertas y evaluación." },
      { title: "Tablero hídrico-agroindustrial", outcome: "Conectar agua, producción y distribución de valor.", deliverable: "Balance, desempeño, usuarios y escenarios." },
      { title: "PMO de corredores territoriales", outcome: "Gestionar distinto la metrópoli, Pataz y la sierra.", deliverable: "Carteras, riesgos, activos y responsables." }
    ],
    evidenceGaps: ["Victimización y extorsión con desagregación segura.", "Balance y continuidad hídrica por valle y localidad.", "Origen, compras y condiciones laborales en minería.", "Estado y costo de mantenimiento de activos rurales y metropolitanos."]
  },
  {
    code: "14", department: "Lambayeque", researchDate: "2026-07-31", confidence: "media",
    evidenceBase: { scope: "departamental", sourceCount: 40, officialSources: "total", note: "Síntesis curada con evidencia oficial y énfasis en continuidad urbana, agua y cadenas regionales." },
    thesis: "Lambayeque necesita gobernar Chiclayo, Olmos, valles rurales y patrimonio como sistemas conectados. Drenaje, saneamiento, comercio y agroindustria comparten problemas de operación, informalidad y distribución de valor.",
    problems: [
      { title: "Chiclayo: drenaje, saneamiento y residuos", problem: "Aniegos, redes, residuos y obras se agravan cuando mantenimiento y coordinación metropolitana fallan.", affected: "Hogares, comercios, transportistas, mercados y servicios críticos.", governmentDecision: "Gestionar por subcuenca y nivel de servicio, con activos, mantenimiento y responsables comunes.", noamResponse: "Gemelo de continuidad urbana y PMO metropolitana." },
      { title: "Agua y agroindustria en Olmos y valles", problem: "Expansión productiva y demanda urbana requieren balance, eficiencia y distribución transparente del recurso.", affected: "Productores, agroindustria, trabajadores, juntas y localidades rurales.", governmentDecision: "Medir agua, productividad, empleo y beneficio territorial antes de ampliar activos.", noamResponse: "Tablero hídrico-productivo y evaluación de impacto distributivo." },
      { title: "Comercio e informalidad bajo presión", problem: "Mercados y pequeños negocios enfrentan inseguridad, infraestructura deficiente, residuos y baja digitalización.", affected: "Comerciantes, trabajadores, consumidores, recicladores y MYPE.", governmentDecision: "Modernizar por fases sin desplazar, integrando seguridad, sanidad, logística y pagos.", noamResponse: "Diagnóstico de mercados y sistema de desempeño comercial." },
      { title: "Ruralidad y patrimonio con acceso desigual", problem: "Ferreñafe, Lambayeque rural y circuitos culturales necesitan transporte, servicios, mantenimiento y beneficio local.", affected: "Comunidades, productores, artesanos, visitantes y gestores de patrimonio.", governmentDecision: "Priorizar corredores según acceso, capacidad, conservación y gasto local.", noamResponse: "Atlas territorial y observatorio de circuitos culturales y rurales." }
    ],
    opportunities: [
      { title: "Drenaje resiliente por desempeño", rationale: "Ingeniería, sensores, limpieza y bombeo pueden reducir interrupción si existe salida y mantenimiento.", actors: "Municipios, prestadores, comercios, ingeniería y operadores.", validation: "Medir línea base, subcuenca, tiempo de drenaje, costo y responsabilidad." },
      { title: "Agroindustria de mayor valor", rationale: "Frío, transformación e ingredientes pueden reducir merma y diversificar mercados.", actors: "Productores, agroindustria, logística, laboratorios y compradores.", validation: "Confirmar volumen, agua, energía, inocuidad, comprador y acceso de pequeños productores." },
      { title: "Turismo cultural y gastronómico", rationale: "Circuitos accesibles pueden ampliar permanencia y compra local respetando conservación.", actors: "Museos, comunidades, operadores, restaurantes, artesanos y municipios.", validation: "Medir capacidad, gasto, permanencia, conservación y gobernanza del circuito." }
    ],
    interventions: [
      { title: "Gemelo urbano Chiclayo", outcome: "Coordinar drenaje, saneamiento, residuos y obras.", deliverable: "Mapa de activos, subcuencas, alertas y PMO." },
      { title: "Observatorio hídrico-productivo", outcome: "Decidir expansión con balance y distribución de valor.", deliverable: "Agua, producción, empleo y escenarios." },
      { title: "Atlas de circuitos territoriales", outcome: "Conectar ruralidad, patrimonio y mercados.", deliverable: "Acceso, oferta, capacidad y cartera por corredor." }
    ],
    evidenceGaps: ["Condición y mantenimiento de drenaje y saneamiento metropolitano.", "Balance hídrico y distribución de beneficios en Olmos y valles.", "Desempeño, seguridad y empleo en mercados y MYPE.", "Gasto, capacidad y acceso por circuito cultural y rural."]
  }
];
