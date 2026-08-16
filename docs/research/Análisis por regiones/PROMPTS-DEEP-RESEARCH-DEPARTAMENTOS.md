# Prompts Deep Research: problemas y oportunidades por departamento del Perú

Versión: 1.0
Fecha de diseño: 2026-07-29
Destino: DataPerú / NOAM

## Objetivo

Producir 25 investigaciones departamentales comparables, trazables y útiles para:

- identificar problemas críticos y asuntos pendientes;
- estimar qué poblaciones están más afectadas o desatendidas;
- reconocer diferencias entre provincias, ciudades y áreas rurales;
- mapear capacidades institucionales, presupuesto e inversión pública;
- encontrar oportunidades responsables para empresas y emprendimientos;
- convertir evidencia en contenidos, productos de datos y servicios de NOAM.

Se consideran los 24 departamentos y la Provincia Constitucional del Callao. Lima y Callao se investigan por separado.

## Configuración de un Espacio con límite de 1,000 caracteres

El campo **Descripción** no debe contener el prompt maestro completo. Usa esta versión compacta de 990 caracteres:

```text
Actúa como un equipo senior de economía regional, políticas públicas, datos, mercados y análisis territorial del Perú. Investiga {{DEPARTAMENTO}} con fuentes oficiales recientes y enlaces directos. Identifica 10–15 problemas críticos, sus indicadores, tendencia, causas, provincias o distritos afectados, población afectada o desatendida y respuestas públicas existentes. Señala brechas pendientes, presupuesto, inversión, proyectos y datos faltantes. Analiza sectores, empleo, empresas, cadenas de valor y demanda no atendida. Propón 10–15 oportunidades responsables para empresas y emprendedores indicando cliente o pagador, mercado aproximado, territorio, requisitos, barreras y riesgos; además, 5–8 productos posibles para NOAM y DataPerú. Distingue datos, interpretación e hipótesis. No inventes cifras, no confundas ejecución financiera con impacto y no uses rankings opacos. Fecha cada dato, declara limitaciones y entrega el resultado en Markdown con tablas y bibliografía enlazada.
```

Configuración recomendada:

- **Título:** `Análisis por departamento`
- **Descripción:** pega el texto compacto anterior.
- **Archivos o conocimiento:** adjunta este documento completo.
- **Instrucciones:** `Aplica siempre el prompt maestro del archivo adjunto y el bloque regional indicado por el usuario. No publiques una cifra sin fuente, periodo y URL directa. Entrega un solo departamento por investigación.`
- **Inicio de cada búsqueda:** pega el bloque regional correspondiente, por ejemplo `08. Cusco`.

La descripción compacta orienta al Espacio. El documento adjunto conserva la estructura de salida, las fuentes, controles de calidad y focos específicos de los 25 territorios.

## Cómo usar este archivo

1. Inicia una conversación Deep Research nueva por cada departamento.
2. Adjunta este archivo completo a la conversación.
3. Copia únicamente el bloque de ejecución del departamento elegido.
4. Pide que el resultado final sea entregado en Markdown y sin referencias internas del tipo `turn...`.
5. Guarda cada resultado en `docs/research/Análisis por regiones/resultados/` con el nombre indicado.
6. No ejecutes varios departamentos en una misma investigación: necesitamos profundidad y trazabilidad independiente.

Si no puedes adjuntar este archivo, copia el **Prompt maestro** y, debajo, el bloque regional correspondiente.

---

# Prompt maestro

```text
Actúa como un equipo senior multidisciplinario integrado por especialistas en economía regional, políticas públicas, gestión subnacional, estadística, investigación social, desarrollo productivo, infraestructura, salud, educación, seguridad, ambiente, riesgos, mercados y análisis geoespacial del Perú.

Realiza un Deep Research exhaustivo sobre {{DEPARTAMENTO}}, Perú. El resultado será utilizado por DataPerú, una plataforma de inteligencia territorial, y debe servir simultáneamente a ciudadanía, funcionarios, empresas, emprendedores, investigadores y organizaciones sociales.

FECHA DE CORTE

- Usa como fecha de corte el día de ejecución y declárala explícitamente.
- Prioriza la información oficial más reciente disponible.
- En cada indicador señala el año o periodo. No mezcles periodos como si fueran simultáneos.
- Si una cifra reciente es preliminar, proyectada, estimada o autodeclarada, indícalo.

PREGUNTA CENTRAL

¿Cuáles son los principales problemas, brechas, poblaciones desatendidas y asuntos pendientes de {{DEPARTAMENTO}}, cómo varían dentro de su territorio y qué oportunidades responsables existen para mejorar servicios, crear valor, invertir y emprender?

OBJETIVOS OBLIGATORIOS

1. Construir un perfil territorial, demográfico, económico, social, institucional y ambiental del departamento.
2. Identificar entre 10 y 15 problemas críticos, sin limitarse a los más mediáticos.
3. Determinar quiénes están afectados, cuántas personas podrían estarlo, dónde se concentran y qué grupos enfrentan mayores barreras.
4. Explicar tendencias, causas documentadas, consecuencias y respuestas públicas existentes.
5. Identificar qué sigue pendiente: cobertura, calidad, infraestructura, personal, regulación, coordinación, información o ejecución.
6. Mapear sectores, industrias, cadenas de valor, empleo, capacidades productivas y demanda territorial.
7. Proponer oportunidades concretas para empresas, proveedores, inversionistas responsables, cooperativas y emprendimientos.
8. Identificar productos de datos, observatorios, estudios o servicios que NOAM podría desarrollar para el territorio.
9. Entregar datos y fuentes de forma estructurada para su futura incorporación a DataPerú.

UNIDAD TERRITORIAL

- No trates al departamento como una unidad homogénea.
- Distingue capital departamental, principales ciudades, provincias, corredores económicos, zonas rurales y ámbitos remotos.
- Usa provincia y distrito cuando la fuente lo permita.
- Explica diferencias costa/sierra/selva, urbano/rural u otras divisiones pertinentes solo cuando correspondan al territorio.
- Identifica cambios de límites, nuevos distritos o incompatibilidades de ubigeo que puedan afectar comparaciones.

POBLACIONES AFECTADAS Y DESATENDIDAS

Analiza con evidencia, cuando corresponda: población rural; pueblos indígenas u originarios; comunidades campesinas o nativas; mujeres; niñas, niños y adolescentes; jóvenes; personas mayores; personas con discapacidad; trabajadores informales; población migrante; hogares en pobreza; personas sin conectividad; agricultores familiares; pescadores artesanales y población expuesta a riesgos ambientales o climáticos.

No asumas vulnerabilidad por identidad. Demuestra cada brecha con datos y evita lenguaje estigmatizante. Si no existe desagregación suficiente, declara el vacío de información.

DIMENSIONES MÍNIMAS DE ANÁLISIS

1. Territorio, conectividad física y conectividad digital.
2. Población, migración, urbanización y estructura demográfica.
3. Pobreza, desigualdad, inclusión y protección social.
4. Salud, nutrición, aseguramiento, oferta y acceso efectivo.
5. Educación, aprendizaje, permanencia, educación superior y formación técnica.
6. Agua, saneamiento, residuos, energía y vivienda.
7. Seguridad ciudadana, violencias, economías ilegales y acceso a justicia, únicamente con fuentes sólidas.
8. Empleo, informalidad, productividad, ingresos y tejido empresarial.
9. Agricultura, pesca, minería, manufactura, comercio, turismo y servicios según relevancia regional.
10. Infraestructura, transporte, logística, mercados y corredores económicos.
11. Ambiente, agua, uso del suelo, contaminación, deforestación y biodiversidad.
12. Riesgos de desastres y cambio climático.
13. Presupuesto, inversión pública, proyectos, contrataciones y capacidad institucional.
14. Conflictividad, gobernanza y coordinación intergubernamental, sin inferir causalidad no demostrada.

FUENTES PRIORITARIAS

Prioriza fuentes primarias y oficiales: INEI; MEF y datos abiertos; BCRP; CEPLAN; ministerios y organismos sectoriales; gobierno regional y gobiernos locales; Contraloría; Defensoría del Pueblo; OSCE/SEACE y Perú Compras; ProInversión; SUNAT; PRODUCE; MIDAGRI; MINCETUR; MINEM; MTPE; MINSA/REUNIS; MINEDU/ESCALE; MTC; MVCS; MINAM; OEFA; ANA; SENAMHI; CENEPRED; INDECI; SERNANP; SERFOR; datos.gob.pe y GeoPerú.

Usa organismos multilaterales, universidades y centros de investigación para contexto o método. Usa prensa solo para hechos recientes y corrobora sus afirmaciones con una fuente adicional. No bases una conclusión estructural en una sola noticia.

ESTÁNDAR DE EVIDENCIA

- Incluye enlace directo, institución, título, fecha de publicación o actualización y periodo del dato.
- No cites páginas de resultados de buscadores.
- No inventes cifras, APIs, bases, proyectos, presupuestos ni cobertura territorial.
- Si dos fuentes difieren, presenta ambas, explica la posible razón y decide cuál usar.
- Distingue dato administrativo, censo, encuesta, proyección, percepción, registro y estimación.
- No interpretes ejecución financiera como calidad, impacto o avance físico.
- No conviertas correlaciones en causalidad.
- No construyas un ranking o índice compuesto opaco.
- Señala nivel de confianza de cada conclusión: alto, medio o bajo.
- Identifica datos faltantes, desactualizados o no comparables.

ANÁLISIS DE PROBLEMAS

Construye una matriz de 10 a 15 problemas. Para cada uno incluye:

- definición precisa;
- evidencia e indicadores de línea de base;
- periodo y cobertura territorial;
- población potencialmente afectada, cantidad y porcentaje cuando sea posible;
- provincias o distritos más expuestos;
- grupos con barreras diferenciadas;
- tendencia: mejora, estancamiento, deterioro o indeterminada;
- causas respaldadas por evidencia;
- consecuencias sociales, económicas, fiscales o ambientales;
- políticas, programas, proyectos y actores que ya intervienen;
- presupuesto o inversión relacionada cuando sea identificable;
- brecha pendiente;
- calidad de evidencia y limitaciones.

Evalúa por separado severidad, escala, desigualdad territorial, urgencia, tendencia, capacidad de respuesta y calidad de evidencia. No sumes automáticamente estas dimensiones en un puntaje único. Explica por qué cinco problemas merecen atención prioritaria.

ANÁLISIS DE MERCADO, SECTORES E INDUSTRIAS

Construye un mapa de la economía regional que incluya:

- sectores que generan producción, empleo, exportaciones o ingresos fiscales;
- estructura empresarial por tamaño y formalidad, cuando exista información;
- cadenas de valor y eslabones débiles;
- infraestructura productiva y logística;
- demanda local no atendida;
- compras públicas e inversión que puedan revelar demanda institucional;
- capacidades científicas, técnicas, universitarias y de formación;
- barreras regulatorias, territoriales, financieras, laborales y ambientales;
- ventajas comparativas reales y oportunidades de diversificación.

No llames “oportunidad” a una actividad únicamente porque ya existe. Debe haber evidencia de demanda, brecha, capacidad o cambio verificable.

MATRIZ DE OPORTUNIDADES

Propón entre 10 y 15 oportunidades concretas. Incluye oportunidades de distinta escala: micro y pequeña empresa, cooperativas, proveedores B2B, servicios profesionales, tecnología, infraestructura, economía circular, turismo, producción y soluciones para entidades públicas.

Para cada oportunidad detalla:

- problema o demanda que atiende;
- producto o servicio posible;
- usuario y beneficiario;
- quién pagaría: hogar, empresa, gobierno, cooperación u otro;
- territorio objetivo;
- sector y cadena de valor;
- evidencia de demanda y proxy de tamaño de mercado;
- competidores o alternativas existentes;
- requisitos técnicos y capacidades necesarias;
- inversión inicial cualitativa: baja, media o alta;
- plazo posible: corto, mediano o largo;
- barreras regulatorias y de contratación;
- riesgos sociales, ambientales, reputacionales y de ejecución;
- potencial de empleo, inclusión y compras locales;
- siguiente validación necesaria.

Diferencia claramente oportunidad observada, hipótesis de mercado y recomendación. No presentes el análisis como asesoría financiera ni prometas rentabilidad.

OPORTUNIDADES PARA NOAM

Propón entre 5 y 8 productos o servicios que NOAM pueda desarrollar, tales como diagnóstico territorial, observatorio, visor georreferenciado, evaluación, encuesta, tablero de gestión, sistema de alertas, estudio sectorial o inteligencia de mercado. Para cada propuesta indica cliente, decisión que mejora, fuentes, entregables, actualización, complejidad y forma de demostrar valor gratuitamente antes de una contratación.

ESTRUCTURA OBLIGATORIA DEL INFORME

Entrega entre 6,000 y 10,000 palabras, además de tablas y anexos, con esta estructura:

1. Frontmatter YAML.
2. Resumen ejecutivo.
3. Perfil y heterogeneidad territorial.
4. Tablero de indicadores clave.
5. Matriz de problemas críticos.
6. Análisis profundo de los cinco problemas prioritarios.
7. Poblaciones afectadas y desatendidas.
8. Respuestas públicas, presupuesto, inversión y asuntos pendientes.
9. Mapa de sectores, industrias y cadenas de valor.
10. Matriz de oportunidades empresariales y de emprendimiento.
11. Oportunidades de productos y servicios para NOAM.
12. Escenarios y señales a monitorear entre 2026 y 2030.
13. Agenda de información: datos faltantes y próximos datasets.
14. Bloques editoriales listos para DataPerú.
15. Metodología, limitaciones y bibliografía enlazada.

FRONTMATTER OBLIGATORIO

---
title: "Problemas y oportunidades de {{DEPARTAMENTO}}"
department: "{{DEPARTAMENTO}}"
departmentCode: "{{CODIGO}}"
dateCutoff: "AAAA-MM-DD"
researchDate: "AAAA-MM-DD"
status: "research-draft"
sourcesCount: 0
officialSourcesShare: "0%"
geographicCoverage:
  - "departamental"
  - "provincial"
confidence: "alta|media|baja"
---

BLOQUES LISTOS PARA DATAPERÚ

Al final entrega, sin lenguaje promocional:

- una síntesis departamental de 120 a 160 palabras;
- cinco cifras clave con fuente y periodo;
- ocho tarjetas de problemas de máximo 70 palabras;
- ocho tarjetas de oportunidades de máximo 70 palabras;
- cinco grupos o territorios que requieren atención, con evidencia;
- cinco preguntas todavía sin respuesta por falta de datos;
- tres posibles titulares editoriales rigurosos;
- una lista de datasets recomendados para integrar a DataPerú;
- un registro de cada afirmación cuantitativa con URL de respaldo.

CONTROL FINAL

Antes de responder, revisa que:

- todas las cifras tengan periodo y fuente;
- todas las fuentes puedan abrirse mediante una URL directa;
- no existan citas internas del tipo `turn...`;
- no se confundan departamento, región administrativa, provincia y ciudad;
- las poblaciones afectadas no estén descritas mediante estereotipos;
- las oportunidades tengan comprador o pagador plausible;
- los riesgos y asuntos pendientes sean explícitos;
- los vacíos de información no hayan sido rellenados con supuestos;
- se diferencie claramente evidencia, interpretación e hipótesis.

FOCOS TERRITORIALES INICIALES

Usa los focos del bloque regional como hipótesis de búsqueda. Valídalos, corrígelos o descártalos según la evidencia. No estás obligado a confirmar ninguna hipótesis inicial.
```

---

# Prompts de ejecución por departamento

## 01. Amazonas

Archivo sugerido: `01-amazonas-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a AMAZONAS, código departamental 01.

Profundiza las diferencias entre Chachapoyas, Bagua, Utcubamba, Condorcanqui y las demás provincias; distingue corredores conectados de comunidades rurales o amazónicas remotas. Analiza con especial cuidado pueblos indígenas y población dispersa sin tratarlos como un conjunto homogéneo.

Focos iniciales a validar: conectividad vial, fluvial y digital; acceso efectivo a salud y educación; agua y saneamiento; agricultura familiar, café y cacao; productividad y acceso a mercados; turismo cultural y de naturaleza; conservación de bosques; riesgos de movimientos en masa e inundaciones; capacidad municipal y proyectos inconclusos.

Busca oportunidades en cadenas agroforestales, transformación de alimentos, logística rural, conectividad, turismo responsable, servicios básicos descentralizados, bioeconomía y soluciones para gobiernos locales pequeños.

Comparadores sugeridos: San Martín, Cajamarca y Huánuco. Explica los límites de cada comparación.
```

## 02. Áncash

Archivo sugerido: `02-ancash-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a ÁNCASH, código departamental 02.

Separa costa, Callejón de Huaylas, zona de los Conchucos y provincias rurales. Contrasta Chimbote, Huaraz y los principales corredores económicos con distritos de menor accesibilidad.

Focos iniciales a validar: uso y resultados del canon; minería y pasivos ambientales; pesca e industria; agricultura y agroexportación; retroceso glaciar, agua y riesgos; conectividad vial; servicios urbanos; turismo; desigualdades entre provincias; cartera de inversión y capacidad de ejecución.

Busca oportunidades en proveedores mineros responsables, economía circular, tratamiento ambiental, cadena pesquera, agroindustria, gestión hídrica, turismo de montaña, logística, monitoreo de riesgos y servicios tecnológicos para municipios.

Comparadores sugeridos: La Libertad, Junín y Arequipa. Explica los límites de cada comparación.
```

## 03. Apurímac

Archivo sugerido: `03-apurimac-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a APURÍMAC, código departamental 03.

Distingue Abancay, Andahuaylas, Cotabambas y las provincias rurales; identifica cómo cambian los problemas según accesibilidad, altitud, ruralidad y relación con corredores mineros.

Focos iniciales a validar: pobreza y dispersión rural; salud y educación intercultural; conectividad; agricultura y ganadería familiar; minería, encadenamientos y conflictividad; agua; empleo juvenil; capacidad institucional; mantenimiento de infraestructura y acceso a mercados.

Busca oportunidades en servicios a cadenas agropecuarias, riego y gestión de agua, transformación de alimentos, proveedores locales, mantenimiento vial, formación técnica, conectividad digital, turismo y monitoreo socioambiental.

Comparadores sugeridos: Ayacucho, Huancavelica y Cusco. Explica los límites de cada comparación.
```

## 04. Arequipa

Archivo sugerido: `04-arequipa-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a AREQUIPA, código departamental 04.

Separa Arequipa Metropolitana, provincias costeras, valles agrícolas, zonas altoandinas y corredores mineros. Analiza presión urbana y diferencias en acceso a servicios fuera de la capital.

Focos iniciales a validar: estrés hídrico; expansión urbana y vivienda; movilidad y contaminación; minería y proveedores; agroindustria; industria y diversificación; logística y puertos; turismo; riesgos volcánicos y sísmicos; empleo formal e informal; coordinación metropolitana.

Busca oportunidades en eficiencia hídrica, tratamiento y reúso, movilidad, construcción sostenible, tecnología industrial y minera, agroexportación de mayor valor, logística, economía circular, turismo y servicios empresariales avanzados.

Comparadores sugeridos: La Libertad, Moquegua y Lima. Explica los límites de cada comparación.
```

## 05. Ayacucho

Archivo sugerido: `05-ayacucho-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a AYACUCHO, código departamental 05.

Distingue Huamanga, corredores provinciales y ámbitos rurales de difícil acceso. Examina brechas territoriales y culturales sin reducir el departamento a un único antecedente histórico.

Focos iniciales a validar: acceso rural a salud y educación; agua y saneamiento; conectividad; agricultura y ganadería; cadenas de quinua, lácteos, artesanía u otros productos que la evidencia confirme; turismo cultural; empleo juvenil; minería; infraestructura; capacidad de gobiernos locales.

Busca oportunidades en transformación agroalimentaria, servicios logísticos, riego, formación técnica, comercio digital, turismo responsable, industrias creativas, mantenimiento de infraestructura y sistemas de información municipal.

Comparadores sugeridos: Huancavelica, Apurímac y Huánuco. Explica los límites de cada comparación.
```

## 06. Cajamarca

Archivo sugerido: `06-cajamarca-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a CAJAMARCA, código departamental 06.

Distingue Cajamarca, Jaén, San Ignacio, Cutervo y las provincias rurales; analiza corredores hacia costa y Amazonía, además de la dispersión poblacional.

Focos iniciales a validar: pobreza rural; agua y saneamiento; conectividad vial; salud y educación; ganadería y lácteos; café, cacao y agricultura familiar; minería, agua y conflictividad; productividad; deforestación; inversión pública y fragmentación municipal.

Busca oportunidades en lácteos, café y cacao de mayor valor, trazabilidad, logística de frío, riego, saneamiento rural, servicios veterinarios, tecnología agrícola, turismo, restauración ambiental y proveedores para gobiernos locales.

Comparadores sugeridos: Amazonas, Piura y La Libertad. Explica los límites de cada comparación.
```

## 07. Callao

Archivo sugerido: `07-callao-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a la PROVINCIA CONSTITUCIONAL DEL CALLAO, código 07. Trátala como territorio separado de Lima y reconoce su estructura provincial y distrital particular.

Distingue zonas portuarias, aeroportuarias, industriales, residenciales y costeras. Analiza desigualdades entre distritos y exposición diferenciada a externalidades logísticas y ambientales.

Focos iniciales a validar: seguridad y violencia; contaminación del aire, suelo y mar; congestión y logística; vivienda y servicios urbanos; empleo e informalidad; pesca; expansión portuaria y aeroportuaria; riesgos costeros y sísmicos; coordinación entre niveles de gobierno.

Busca oportunidades en logística, trazabilidad, seguridad tecnológica, mantenimiento industrial, economía circular, remediación, cadena de frío, servicios marítimos, capacitación y soluciones urbanas.

Comparadores sugeridos: Lima Metropolitana y corredores portuarios de La Libertad y Arequipa. Explica por qué Callao tiene una institucionalidad no directamente comparable.
```

## 08. Cusco

Archivo sugerido: `08-cusco-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a CUSCO, código departamental 08.

Distingue Cusco metropolitano, Valle Sagrado, provincias altoandinas, La Convención y corredores vinculados a minería, gas, agricultura y turismo. Incluye población quechua y amazónica con desagregación disponible.

Focos iniciales a validar: dependencia y distribución de beneficios del turismo; servicios rurales; transporte; patrimonio y presión urbana; minería, gas y canon; agua; agricultura; conectividad; empleo juvenil; riesgos climáticos; capacidad institucional.

Busca oportunidades en diversificación turística, gestión de destinos, agroindustria, servicios culturales, logística, tecnología para patrimonio, proveedores energéticos y mineros, saneamiento, formación técnica y bioeconomía.

Comparadores sugeridos: Puno, Arequipa y Apurímac. Explica los límites de cada comparación.
```

## 09. Huancavelica

Archivo sugerido: `09-huancavelica-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a HUANCAVELICA, código departamental 09.

Distingue capital departamental, provincias rurales, corredores hacia Ica, Junín y Ayacucho, y comunidades de alta dispersión y altitud.

Focos iniciales a validar: pobreza y vulnerabilidad rural; salud materno-infantil y nutrición; aprendizaje y permanencia escolar; conectividad; agua y saneamiento; agricultura y ganadería; energía y minería; riesgos climáticos; empleo; capacidades municipales.

Busca oportunidades en servicios rurales descentralizados, cadenas de fibra y ganadería, transformación de alimentos, riego, energía distribuida, mantenimiento de infraestructura, conectividad, telemedicina, formación técnica y turismo comunitario.

Comparadores sugeridos: Ayacucho, Apurímac y Pasco. Explica los límites de cada comparación.
```

## 10. Huánuco

Archivo sugerido: `10-huanuco-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a HUÁNUCO, código departamental 10.

Distingue Huánuco, Tingo María, provincias andinas y amazónicas, corredores viales y ámbitos rurales remotos. No estigmatices territorios vinculados a economías ilegales; usa evidencia oficial y analiza alternativas productivas.

Focos iniciales a validar: conectividad; salud y educación rural; agricultura y acceso a mercados; deforestación; calidad de servicios urbanos; empleo e informalidad; seguridad; economías ilegales; riesgos; capacidad institucional y logística.

Busca oportunidades en cacao, café y otros cultivos validados, agroforestería, transformación, logística, bioeconomía, turismo, conectividad, servicios ambientales, alternativas productivas y sistemas de información territorial.

Comparadores sugeridos: San Martín, Ucayali y Pasco. Explica los límites de cada comparación.
```

## 11. Ica

Archivo sugerido: `11-ica-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a ICA, código departamental 11.

Distingue Ica, Chincha, Pisco, Nazca y Palpa, incluyendo ciudades, valles agroindustriales, litoral y ámbitos rurales. Analiza población residente y movilidad laboral.

Focos iniciales a validar: disponibilidad y gobernanza del agua; agroexportación y condiciones laborales; expansión urbana; vivienda y saneamiento; sismos y otros riesgos; pesca e industria; logística portuaria; turismo; migración; presión ambiental.

Busca oportunidades en eficiencia hídrica, reúso, tecnología agrícola, servicios laborales, vivienda y construcción resiliente, cadena de frío, logística, economía circular, pesca de valor agregado, turismo y monitoreo ambiental.

Comparadores sugeridos: Arequipa, La Libertad y Lima Provincias. Explica los límites de cada comparación.
```

## 12. Junín

Archivo sugerido: `12-junin-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a JUNÍN, código departamental 12.

Distingue Huancayo y el valle del Mantaro, La Oroya, provincias altoandinas y Selva Central. Analiza la función del corredor central y la diversidad entre ámbitos andinos y amazónicos.

Focos iniciales a validar: contaminación y pasivos; minería y metalurgia; agricultura y comercialización; transporte y logística; servicios urbanos; salud; seguridad; deforestación; conectividad; riesgos; empleo e industria.

Busca oportunidades en remediación, economía circular, proveedores industriales, logística, agroindustria, café y frutas de la Selva Central, servicios de salud, tecnología territorial, turismo y modernización de mercados.

Comparadores sugeridos: Pasco, Cusco y Áncash. Explica los límites de cada comparación.
```

## 13. La Libertad

Archivo sugerido: `13-la-libertad-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a LA LIBERTAD, código departamental 13.

Distingue Trujillo metropolitano, costa agroindustrial, sierra liberteña, corredores mineros y portuarios. Analiza fuertes desigualdades entre provincias.

Focos iniciales a validar: seguridad, extorsión y efectos económicos; crecimiento urbano; agua; agroindustria y trabajo; minería formal e ilegal; conectividad de la sierra; salud y educación; puertos y logística; riesgos de El Niño; patrimonio y turismo.

Busca oportunidades en seguridad empresarial responsable, trazabilidad, agroindustria, tecnología de riego, logística, servicios mineros, formalización productiva, infraestructura resiliente, economía circular, turismo y soluciones municipales.

Comparadores sugeridos: Piura, Lambayeque y Arequipa. Explica los límites de cada comparación.
```

## 14. Lambayeque

Archivo sugerido: `14-lambayeque-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a LAMBAYEQUE, código departamental 14.

Distingue Chiclayo metropolitano, Lambayeque, Ferreñafe, áreas rurales y corredores hacia Cajamarca, Piura y La Libertad.

Focos iniciales a validar: drenaje urbano, inundaciones y El Niño; agua y saneamiento; movilidad y residuos; agroindustria; comercio e informalidad; salud; seguridad; patrimonio y turismo; logística; ejecución y mantenimiento de infraestructura.

Busca oportunidades en infraestructura resiliente, drenaje y agua, economía circular, modernización comercial, agroindustria, cadena de frío, logística, turismo cultural y gastronómico, servicios de salud y digitalización municipal.

Comparadores sugeridos: Piura, La Libertad y Tumbes. Explica los límites de cada comparación.
```

## 15. Lima

Archivo sugerido: `15-lima-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro al DEPARTAMENTO DE LIMA, código 15. Separa obligatoriamente Lima Metropolitana de Lima Provincias y no mezcles sus indicadores. Excluye Callao salvo cuando una interacción metropolitana o logística requiera mencionarlo.

Dentro de Lima Metropolitana distingue ejes y grupos de distritos; en Lima Provincias analiza Barranca, Cajatambo, Canta, Cañete, Huaral, Huarochirí, Huaura, Oyón y Yauyos.

Focos iniciales a validar: agua; movilidad; vivienda y expansión informal; seguridad; contaminación; empleo e informalidad; desigualdad espacial; salud y educación; residuos; riesgos sísmicos, costeros y de quebradas; agricultura y logística en provincias; gobernanza metropolitana.

Busca oportunidades en movilidad, agua, vivienda, servicios urbanos, salud, educación, seguridad tecnológica con salvaguardas, logística, economía digital, economía circular, infraestructura resiliente y soluciones diferenciadas para municipios metropolitanos y provinciales.

Comparadores sugeridos: Callao, Arequipa y La Libertad, además de comparaciones internas. Explica los límites de cada comparación.
```

## 16. Loreto

Archivo sugerido: `16-loreto-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a LORETO, código departamental 16.

Distingue Iquitos, ciudades intermedias, cuencas fluviales, zonas fronterizas y comunidades indígenas o rurales remotas. Usa tiempos y costos de desplazamiento, no solo distancias lineales.

Focos iniciales a validar: conectividad fluvial, aérea y digital; acceso efectivo a salud y educación; agua y saneamiento; energía; derrames y pasivos petroleros; deforestación; nutrición; empleo; comercio fronterizo; costos logísticos; adaptación a inundaciones.

Busca oportunidades en logística fluvial, cadena de frío, salud y educación remotas, energía distribuida, agua, bioeconomía, turismo responsable, productos forestales sostenibles, monitoreo ambiental y servicios interculturales.

Comparadores sugeridos: Ucayali, Madre de Dios y Amazonas. Explica los límites de cada comparación.
```

## 17. Madre de Dios

Archivo sugerido: `17-madre-de-dios-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a MADRE DE DIOS, código departamental 17.

Distingue Puerto Maldonado, corredor Interoceánico, zonas mineras, áreas naturales protegidas, comunidades nativas y ámbitos fronterizos. Considera crecimiento poblacional y movilidad.

Focos iniciales a validar: minería ilegal e informal; mercurio y salud; deforestación; trata y seguridad; presión sobre territorios indígenas; servicios urbanos; residuos y saneamiento; conectividad; turismo; gobernanza de tierra y bosque.

Busca oportunidades en restauración, trazabilidad de oro, salud ambiental, bioeconomía, turismo responsable, productos forestales sostenibles, monitoreo satelital, economía circular, servicios logísticos y alternativas productivas legales.

Comparadores sugeridos: Ucayali, Loreto y San Martín. Explica los límites de cada comparación.
```

## 18. Moquegua

Archivo sugerido: `18-moquegua-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a MOQUEGUA, código departamental 18.

Distingue Moquegua, Ilo y General Sánchez Cerro; analiza costa, valles y zonas altoandinas, además de relaciones entre minería, agua, puerto y ciudades.

Focos iniciales a validar: dependencia minera y uso del canon; disponibilidad de agua; diversificación productiva; infraestructura y servicios; contaminación; agricultura; pesca; logística portuaria; capital humano; riesgos sísmicos y climáticos.

Busca oportunidades en proveedores mineros, tecnología hídrica, agricultura de valor, pesca, logística, energía, economía circular, monitoreo ambiental, formación técnica, servicios portuarios y diversificación industrial.

Comparadores sugeridos: Tacna, Arequipa e Ica. Explica los límites de cada comparación.
```

## 19. Pasco

Archivo sugerido: `19-pasco-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a PASCO, código departamental 19.

Distingue Cerro de Pasco y ámbitos mineros altoandinos de Oxapampa y zonas amazónicas. Evita promedios que oculten esta diversidad territorial.

Focos iniciales a validar: contaminación y pasivos mineros; salud ambiental; agua; vivienda y reasentamiento cuando corresponda; agricultura y ganadería; conectividad; conservación; turismo; empleo; servicios rurales y capacidad institucional.

Busca oportunidades en remediación, monitoreo, salud ambiental, agua, proveedores mineros responsables, agroindustria, productos forestales sostenibles, turismo de naturaleza, infraestructura y servicios digitales.

Comparadores sugeridos: Junín, Huánuco y Áncash. Explica los límites de cada comparación.
```

## 20. Piura

Archivo sugerido: `20-piura-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a PIURA, código departamental 20.

Distingue Piura, Sullana, Talara, Paita, Sechura, costa rural y provincias andinas. Analiza ciudades, valles, litoral, puertos y zonas expuestas a eventos climáticos.

Focos iniciales a validar: inundaciones, sequías y El Niño; agua y saneamiento; salud; agroexportación y agricultura familiar; hidrocarburos; pesca y acuicultura; empleo; seguridad; logística portuaria; infraestructura; recuperación y prevención.

Busca oportunidades en infraestructura resiliente, agua, drenaje, tecnología agrícola, cadena de frío, pesca y acuicultura, energía, mantenimiento industrial, logística, turismo, salud y sistemas de alerta.

Comparadores sugeridos: Lambayeque, La Libertad y Tumbes. Explica los límites de cada comparación.
```

## 21. Puno

Archivo sugerido: `21-puno-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a PUNO, código departamental 21.

Distingue Puno, Juliaca, provincias alrededor del Titicaca, zonas altoandinas, corredores mineros y frontera. Analiza población quechua y aimara con información desagregada disponible.

Focos iniciales a validar: contaminación del Titicaca; agua y saneamiento; minería informal e ilegal; agricultura y ganadería; frío y riesgos climáticos; salud y educación; comercio fronterizo; transporte; informalidad; turismo y conflictividad.

Busca oportunidades en saneamiento, restauración, cadenas de fibra y lácteos, transformación agroalimentaria, energía, logística fronteriza, formalización productiva, turismo responsable, servicios climáticos y tecnología para ciudades y municipios rurales.

Comparadores sugeridos: Cusco, Arequipa y Tacna. Explica los límites de cada comparación.
```

## 22. San Martín

Archivo sugerido: `22-san-martin-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a SAN MARTÍN, código departamental 22.

Distingue Moyobamba, Tarapoto, valles productivos, áreas rurales, zonas de conservación y corredores hacia costa y Amazonía.

Focos iniciales a validar: deforestación y cambio de uso del suelo; cacao, café, arroz y otros cultivos confirmados; productividad; titulación; conectividad; salud y educación; urbanización; residuos; agua; turismo; riesgos de inundaciones y deslizamientos.

Busca oportunidades en agroforestería, trazabilidad, transformación de cacao y café, logística, bioeconomía, restauración, turismo, tecnología agrícola, servicios ambientales, agua y soluciones urbanas para ciudades intermedias.

Comparadores sugeridos: Amazonas, Huánuco y Ucayali. Explica los límites de cada comparación.
```

## 23. Tacna

Archivo sugerido: `23-tacna-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a TACNA, código departamental 23.

Distingue Tacna urbana, zonas fronterizas, valles agrícolas y provincias altoandinas. Analiza movilidad transfronteriza sin confundir flujos temporales con población residente.

Focos iniciales a validar: disponibilidad de agua; comercio fronterizo; migración y servicios; minería; agricultura; logística; salud y turismo médico; empleo; vivienda; riesgos sísmicos; integración de provincias rurales.

Busca oportunidades en tecnología hídrica, logística y comercio exterior, servicios de salud, turismo, agricultura de valor, proveedores mineros, energía, formación técnica, servicios digitales y soluciones fronterizas interoperables.

Comparadores sugeridos: Moquegua, Arequipa y Puno. Explica los límites de cada comparación.
```

## 24. Tumbes

Archivo sugerido: `24-tumbes-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a TUMBES, código departamental 24.

Distingue Tumbes, Zarumilla, Contralmirante Villar, frontera, litoral, manglares y áreas rurales. Analiza movilidad transfronteriza y población residente por separado.

Focos iniciales a validar: inundaciones y El Niño; agua y saneamiento; salud; migración; seguridad y trata; pesca y acuicultura; turismo; residuos; ecosistemas de manglar; comercio y logística fronteriza; empleo informal.

Busca oportunidades en infraestructura resiliente, agua, acuicultura sostenible, cadena de frío, turismo, restauración de manglares, logística fronteriza, salud, economía circular, monitoreo y servicios para pequeños negocios.

Comparadores sugeridos: Piura, Lambayeque y Tacna para dinámicas fronterizas. Explica los límites de cada comparación.
```

## 25. Ucayali

Archivo sugerido: `25-ucayali-problemas-oportunidades.md`

```text
Aplica íntegramente el Prompt maestro de este archivo a UCAYALI, código departamental 25.

Distingue Pucallpa, ciudades y comunidades fluviales, corredor vial, zonas fronterizas y territorios indígenas. Usa accesibilidad real y estacional, no solo distancia.

Focos iniciales a validar: deforestación; conflictos y seguridad de la tierra; conectividad fluvial, vial y digital; salud y educación remota; agua y saneamiento; madera y agricultura; empleo; crecimiento urbano; energía; economías ilegales y riesgos climáticos.

Busca oportunidades en trazabilidad forestal, agroforestería, bioeconomía, logística fluvial, cadena de frío, salud y educación remotas, agua, monitoreo territorial, transformación sostenible, turismo y soluciones urbanas para Pucallpa.

Comparadores sugeridos: Loreto, San Martín y Madre de Dios. Explica los límites de cada comparación.
```

---

# Control de recepción de resultados

Cuando recibamos cada investigación, NOAM aplicará estas etapas:

1. Validación de enlaces y fechas.
2. Inventario de afirmaciones cuantitativas.
3. Revisión de consistencia territorial y de ubigeo.
4. Evaluación de cobertura, comparabilidad y sesgos.
5. Separación entre evidencia, interpretación e hipótesis de mercado.
6. Selección de contenido público y contenido reservado para productos o servicios.
7. Conversión a perfiles DataPerú, datasets, visualizaciones e Insights.

El informe Deep Research es un insumo, no una publicación automática. Ninguna cifra, oportunidad o conclusión se mostrará en la web sin revisión editorial y metodológica.
