# Prompts de imagen editorial para NOAM

Guia para generar en Nano Banana / Gemini un banco visual coherente para `noam.pe`. Las imagenes son escenas editoriales: representan territorios, problemas y formas de trabajo, pero no documentan clientes, proyectos ni resultados reales.

## 1. Direccion de arte comun

Todas las imagenes deben compartir este lenguaje:

- Fotografia documental editorial contemporanea, sobria y creible.
- Peru actual, reconocible por geografia, arquitectura, actividades y diversidad humana, sin folclorizar.
- Personas con dignidad y agencia: trabajando, decidiendo, produciendo, cuidando o resolviendo.
- Luz natural, contraste moderado, colores contenidos y textura fotografica fina.
- Paleta compatible con NOAM: verdes profundos, piedra, tierra, concreto, vegetacion y pequenos acentos oxido o terracota cuando aparezcan naturalmente.
- Composiciones con capas, escala territorial y una tension publica o productiva legible.
- Sensacion de investigacion, capacidad institucional y futuro posible; nunca propaganda.
- Realismo fotografico alto, sin acabado 3D, ilustracion ni estetica publicitaria.

### Bloque maestro para anteponer a cada prompt

```text
Fotografia documental editorial premium para una firma peruana de inteligencia publica, datos y estrategia. Realismo fotografico alto, observacion humana sobria, luz natural, color contenido, contraste moderado, textura fina de camara profesional, composicion precisa y contemporanea. Peru actual y verosimil, sin postal turistica, sin exotizacion, sin dramatizacion de la pobreza y sin estetica de banco de imagenes. Las personas aparecen con dignidad, concentracion y agencia. No incluir texto, logotipos, marcas, banderas partidarias ni interfaces digitales flotantes.
```

### Restricciones negativas para cerrar cada prompt

```text
Evitar: imagen generica de stock, poses mirando a camara, sonrisas publicitarias, pobreza espectacularizada, ruinas como decorado, saturacion excesiva, HDR agresivo, neones, hologramas, robots, circuitos de IA, mapas falsos, texto ilegible, logos, propaganda politica, multitudes clonadas, anatomia incorrecta, manos deformes, edificios imposibles, desenfoque artificial excesivo y cielo dramatico irreal.
```

## 2. Especificaciones tecnicas

### Hero principal

- Generar en horizontal `16:9`.
- Resolucion ideal: `2560 x 1440 px`; minimo aceptable: `1920 x 1080 px`.
- Mantener el sujeto y la informacion esencial dentro del 60% central.
- Dejar aire util arriba y a los lados para los recortes responsivos.
- Debe soportar recorte panoramico `2.25:1` en escritorio y `1.35:1` en movil.
- No colocar rostros importantes en el 20% exterior izquierdo o derecho.
- Evitar detalles pequenos indispensables: desapareceran en movil.

### Imagen de pagina o seccion

- Generar en `3:2`, idealmente `1800 x 1200 px`.
- Un punto focal claro y espacio negativo suficiente.
- Debe admitir recorte aproximado `4:3` o `1:1` sin perder el tema.

### Card o recurso editorial

- Generar en `16:9`, idealmente `1600 x 900 px`.
- Leer bien a tamano pequeno; una escena, una idea, pocos sujetos.

### Open Graph y redes

- Componer en `1200 x 630 px` o `1.91:1`.
- Dejar el tercio izquierdo o derecho relativamente limpio para una eventual capa tipografica producida por la web.
- Nunca pedir al generador que escriba titulares o cifras.

## 3. Coleccion para el hero de inicio

Generar primero estas cinco imagenes. Las tres primeras forman la rotacion inicial recomendada.

### H01. Amazonia: ciudad, rio y conectividad

Archivo: `hero-amazonia-conectividad.jpg`

```text
[BLOQUE MAESTRO]

Toma aerea oblicua, amplia y cinematografica de una ciudad amazonica peruana contemporanea junto a un gran rio al amanecer nublado. Se perciben barrios consolidados, embarcaderos, pequenas embarcaciones de transporte, vias urbanas, vegetacion densa y la relacion entre ciudad, agua y territorio. La imagen debe sugerir simultaneamente conectividad, provision de servicios, riesgo climatico y actividad economica, sin mostrar desastre ni miseria. Escala humana visible pero no protagonista. Composicion horizontal con el rio trazando una diagonal suave y el nucleo urbano dentro de la zona central segura. Atmosfera humeda, verdes profundos, grises calidos y tierra rojiza, detalle realista, sin parecer una ciudad especifica ni una postal turistica. Reservar bordes laterales y franja superior para recortes responsivos. Formato 16:9, 2560 x 1440.

[RESTRICCIONES NEGATIVAS]
```

### H02. Sierra: ciudad intermedia y sistema territorial

Archivo: `hero-sierra-ciudad-territorio.jpg`

```text
[BLOQUE MAESTRO]

Vista aerea oblicua de una ciudad intermedia de los Andes peruanos integrada con laderas, parcelas agricolas, una carretera regional y pequenas infraestructuras publicas. No es una postal colonial: es una ciudad viva y contemporanea donde conviven vivienda, comercio, movilidad, agricultura y expansion urbana. Luz fria de primera manana atravesando nubes altas, tonos piedra, ichu, tierra y verde apagado. La escena debe comunicar el reto de coordinar servicios, inversion y crecimiento en una geografia exigente. Centro urbano y corredor vial dentro del 60% central; montanas y cielo funcionan como contexto recortable. Personas y vehiculos a escala realista, sin congestion teatral. Formato 16:9, 2560 x 1440.

[RESTRICCIONES NEGATIVAS]
```

### H03. Costa: metropolis, infraestructura y desigualdad espacial

Archivo: `hero-costa-ciudad-infraestructura.jpg`

```text
[BLOQUE MAESTRO]

Toma aerea alta y oblicua de una gran ciudad costera peruana bajo luz suave de cielo cubierto. Una infraestructura metropolitana clara -corredor vial, transporte publico, canal o parque lineal- conecta areas residenciales, comercio y espacios productivos. La composicion permite leer contrastes de densidad, acceso y calidad urbana sin convertirlos en espectaculo. Arquitectura y relieve verosimiles de la costa peruana, paleta mineral de concreto, arena y verde contenido. Sensacion de sistema urbano que necesita mejores decisiones, no de caos. Punto focal central y bordes visualmente tranquilos para recorte panoramico y movil. Sin identificar una obra, municipio o cliente real. Formato 16:9, 2560 x 1440.

[RESTRICCIONES NEGATIVAS]
```

### H04. Corredor productivo nacional

Archivo: `hero-corredor-productivo.jpg`

```text
[BLOQUE MAESTRO]

Fotografia aerea oblicua de un corredor productivo peruano donde una carretera secundaria conecta campos cultivados, un pequeno centro urbano, almacenes discretos y transporte de mercancias. Trabajadores y vehiculos aparecen a escala natural. La escena muestra que economia, infraestructura, territorio y servicios publicos forman un mismo sistema. Geografia de transicion entre valle andino y costa, luz natural de media manana, paleta sobria, composicion limpia con la via guiando la mirada por el centro. Debe sentirse estrategica y concreta, no corporativa ni futurista. Formato 16:9, 2560 x 1440.

[RESTRICCIONES NEGATIVAS]
```

### H05. Decision con evidencia

Archivo: `hero-equipo-decision-territorial.jpg`

```text
[BLOQUE MAESTRO]

Escena documental de un equipo peruano diverso de cuatro personas -personal tecnico publico, especialista territorial y representante productivo- trabajando alrededor de una mesa grande con mapas impresos, fichas de indicadores y notas manuscritas. Nadie posa ni mira a camara. El espacio es institucional contemporaneo y austero, con luz natural lateral y una ventana que deja entrever una ciudad regional. Gestos concentrados, intercambio real, documentos plausibles sin texto legible. Composicion horizontal amplia, equipo concentrado en el centro y extremos con aire para recorte. Comunicar deliberacion, metodo y capacidad, no una reunion generica de oficina. Formato 16:9, 2560 x 1440.

[RESTRICCIONES NEGATIVAS]
```

## 4. Paginas territoriales y DataPeru

### D01. DataPeru: el territorio como sistema

Archivo: `dataperu-territorio-sistema.jpg`

```text
[BLOQUE MAESTRO]

Vista editorial elevada de un territorio peruano donde pueden leerse en una sola composicion una ciudad intermedia, areas agricolas, una cuenca, carreteras y equipamientos publicos. No agregar graficos ni capas digitales: la propia fotografia debe revelar conexiones y diferencias espaciales. Luz natural, detalle topografico, color contenido, punto focal central y escala humana plausible. La imagen sugiere que los datos ayudan a entender relaciones entre poblacion, servicios, inversion y actividad economica. Formato 3:2, 1800 x 1200.

[RESTRICCIONES NEGATIVAS]
```

### D02. Amazonia productiva y sostenible

Archivo: `dataperu-amazonia-economia-local.jpg`

```text
[BLOQUE MAESTRO]

Escena documental junto a un rio amazonico peruano: pequenos productores y transportistas organizan productos agricolas locales en un embarcadero funcional, con una comunidad urbana al fondo y bosque vivo alrededor. Mostrar cadena de valor, logistica y trabajo real, no turismo ni supervivencia dramatizada. Vestimenta cotidiana, herramientas plausibles, luz humeda suave, colores naturales y composicion con profundidad. Personas de perfil o concentradas en la actividad, sin mirar a camara. Formato 3:2, 1800 x 1200.

[RESTRICCIONES NEGATIVAS]
```

### D03. Sierra: agua, agricultura y gestion

Archivo: `dataperu-sierra-agua-produccion.jpg`

```text
[BLOQUE MAESTRO]

Fotografia documental amplia de un valle altoandino peruano donde productores revisan un sistema de riego tecnificado sencillo junto a parcelas activas y una infraestructura hidrica local. La escena debe permitir leer trabajo, agua, produccion y coordinacion territorial sin posar ni idealizar. Montanas como contexto, luz fria y clara, textura de suelo y cultivos, paleta sobria. El grupo ocupa la zona central y el paisaje explica la escala del problema. Formato 3:2, 1800 x 1200.

[RESTRICCIONES NEGATIVAS]
```

### D04. Ciudad pequena y servicios cotidianos

Archivo: `dataperu-municipio-servicios.jpg`

```text
[BLOQUE MAESTRO]

Escena urbana documental en una ciudad pequena peruana durante una manana normal. Una cuadrilla municipal trabaja en mantenimiento de espacio publico y drenaje mientras comerciantes, transporte local y peatones continúan sus actividades. Mostrar la gestion publica como trabajo concreto y cercano, sin uniformes con logos ni autoridad posando. Arquitectura regional verosimil, orden visual, luz natural y un problema de servicio perceptible pero no catastrofico. Formato 3:2, 1800 x 1200.

[RESTRICCIONES NEGATIVAS]
```

### D05. Plantilla por departamento

Sustituir los campos entre llaves con hallazgos respaldados por el Deep Research del departamento.

```text
[BLOQUE MAESTRO]

Fotografia documental editorial situada en el departamento de {{DEPARTAMENTO}}, Peru. Escena principal: {{ACTIVIDAD_O_SERVICIO}}. Contexto territorial visible: {{GEOGRAFIA_Y_TIPO_DE_ASENTAMIENTO}}. Problema publico o productivo que debe percibirse de forma sutil y respetuosa: {{PROBLEMA}}. Oportunidad o capacidad local que equilibra la escena: {{OPORTUNIDAD}}. Participan {{PERSONAS_Y_ROLES}} realizando una accion concreta, sin posar ni mirar a camara. Incluir solo elementos geograficos, arquitectonicos, productivos y climaticos plausibles para el departamento. Composicion con sujeto central, profundidad territorial y espacio negativo. No representar una obra, institucion o comunidad identificable si no existe fotografia documental autorizada. Formato 3:2, 1800 x 1200.

[RESTRICCIONES NEGATIVAS]
```

## 5. Problemas publicos y servicios

### P01. Agua y saneamiento

Archivo: `servicio-agua-saneamiento.jpg`

```text
[BLOQUE MAESTRO]

Equipo tecnico peruano inspeccionando una infraestructura pequena de agua potable en el borde de una ciudad regional. Una ingeniera revisa una valvula, un operador local consulta una ficha y una representante vecinal observa el sistema. Accion concreta, seguridad y herramientas plausibles, sin casco innecesario ni poses. El entorno muestra viviendas y geografia local a distancia, haciendo visible la relacion entre infraestructura y poblacion. Luz natural sobria, color contenido, composicion 3:2.

[RESTRICCIONES NEGATIVAS]
```

### P02. Salud y acceso territorial

Archivo: `servicio-salud-territorial.jpg`

```text
[BLOQUE MAESTRO]

Escena documental respetuosa en un establecimiento de salud primario peruano. Personal de salud y una gestora territorial revisan una ruta de atencion y un mapa impreso mientras la actividad cotidiana continua al fondo, sin mostrar pacientes identificables ni situaciones clinicas. Espacio realista, modesto y cuidado, luz natural, expresiones concentradas. Comunicar acceso, organizacion y capacidad de respuesta, no emergencia ni sufrimiento. Formato 3:2.

[RESTRICCIONES NEGATIVAS]
```

### P03. Educacion y conectividad

Archivo: `servicio-educacion-conectividad.jpg`

```text
[BLOQUE MAESTRO]

Docente, directora y tecnico local trabajando en una escuela publica peruana para organizar conectividad y materiales de aprendizaje. Equipos reales y modestos, cables y router plausibles, cuadernos y pizarra sin texto legible. Estudiantes aparecen solamente al fondo y no son identificables. Luz de ventana, arquitectura regional, concentracion y colaboracion. Mostrar una brecha que esta siendo abordada, no una escena asistencialista. Formato 3:2.

[RESTRICCIONES NEGATIVAS]
```

### P04. Movilidad y espacio publico

Archivo: `servicio-movilidad-urbana.jpg`

```text
[BLOQUE MAESTRO]

Vista elevada a nivel de edificio de una interseccion en una ciudad regional peruana. Transporte publico, peatones, comercio y ciclistas comparten el espacio; una pequena brigada tecnica observa flujos desde una esquina sin posar. La escena permite comprender accesibilidad, seguridad vial y actividad economica a la vez. Movimiento natural, luz suave, geometria urbana clara y paleta contenida. Formato 3:2.

[RESTRICCIONES NEGATIVAS]
```

### P05. Residuos y economia circular

Archivo: `servicio-residuos-economia-circular.jpg`

```text
[BLOQUE MAESTRO]

Trabajadores formalizados clasificando materiales valorizables en una instalacion municipal peruana ordenada y operativa. Una supervisora revisa volumenes en una planilla, sin texto legible. Equipamiento y proteccion personal plausibles, luz industrial natural, composicion limpia y digna. Mostrar servicio publico, empleo y cadena de valor, sin montanas exageradas de basura ni contaminacion espectacular. Formato 3:2.

[RESTRICCIONES NEGATIVAS]
```

## 6. Sectores economicos y empresas

### E01. Agroindustria y cadena de valor

Archivo: `sector-agroindustria-cadena-valor.jpg`

```text
[BLOQUE MAESTRO]

Escena documental en un centro de acopio peruano de escala mediana. Productores, una responsable de calidad y un operador logistico verifican productos agricolas y organizan despacho. El paisaje productivo se observa al fondo. Sin marcas, uniformes corporativos ni poses. La imagen comunica productividad, trazabilidad y articulacion local, con luz natural y tonos tierra. Formato 3:2.

[RESTRICCIONES NEGATIVAS]
```

### E02. Manufactura regional

Archivo: `sector-manufactura-regional.jpg`

```text
[BLOQUE MAESTRO]

Interior realista de una planta manufacturera peruana mediana, limpia pero no futurista. Operarios y una ingeniera revisan un proceso y una hoja de control, sin texto legible. Maquinaria plausible, proteccion adecuada, luz lateral y composicion con capas. Comunicar mejora de procesos, empleo y decisiones basadas en evidencia, no publicidad corporativa. Formato 3:2.

[RESTRICCIONES NEGATIVAS]
```

### E03. Turismo con gestion territorial

Archivo: `sector-turismo-gestion-local.jpg`

```text
[BLOQUE MAESTRO]

Equipo local formado por una emprendedora, un gestor municipal y un guia revisando en terreno la gestion de visitantes y servicios de un destino natural peruano secundario. El paisaje es importante pero no monumental ni reconocible como icono turistico. Mostrar senaletica sin texto, sendero mantenido, pequenos negocios y conservacion como un sistema. Luz natural, actividad real, sin turistas posando. Formato 3:2.

[RESTRICCIONES NEGATIVAS]
```

### E04. Pesca y ciudad costera

Archivo: `sector-pesca-logistica-costera.jpg`

```text
[BLOQUE MAESTRO]

Muelle pesquero artesanal peruano en actividad temprana, con trabajadores organizando descarga, frio y transporte hacia la ciudad cercana. Mostrar cadena productiva y condiciones de trabajo reales, sin dramatizacion ni paisaje de postal. Luz costera difusa, colores desaturados, composicion ordenada con mar, infraestructura y actividad economica en una misma lectura. Formato 3:2.

[RESTRICCIONES NEGATIVAS]
```

## 7. Electoral, democracia y ciudadania

Las imagenes electorales deben ser estrictamente neutrales: nunca usar colores partidarios dominantes, rostros de candidatos, simbolos reconocibles ni escenas que parezcan respaldo politico.

### EL01. Ciudadania informandose

Archivo: `electoral-ciudadania-informacion.jpg`

```text
[BLOQUE MAESTRO]

Escena documental neutral en una plaza o mercado de una ciudad regional peruana. Personas adultas de distintas edades consultan informacion electoral publica en un panel y en sus telefonos, sin texto legible ni simbolos partidarios. La vida cotidiana continua alrededor. Gestos de atencion y conversacion, no mitin ni celebracion. Luz natural, color sobrio y composicion con profundidad. Formato 3:2.

[RESTRICCIONES NEGATIVAS]
```

### EL02. Analisis electoral territorial

Archivo: `electoral-analisis-territorial.jpg`

```text
[BLOQUE MAESTRO]

Pequeno equipo plural de analistas peruanos revisando mapas impresos, documentos de planes de gobierno y tablas en una sala de trabajo sobria. No mostrar partidos, candidatos, logos ni resultados inventados. Nadie mira a camara; las manos senalan territorios y contrastan documentos. Luz natural lateral, tonos neutros y composicion horizontal precisa. Comunicar metodo, comparacion y responsabilidad democratica, no campana politica. Formato 3:2.

[RESTRICCIONES NEGATIVAS]
```

### EL03. Gestion posterior a la eleccion

Archivo: `electoral-transicion-gestion.jpg`

```text
[BLOQUE MAESTRO]

Escena editorial de un equipo tecnico municipal diverso organizando prioridades de inicio de gestion con mapas, calendario, fichas de servicios y una pizarra sin texto legible. Espacio institucional peruano realista, expresiones concentradas y tareas distribuidas. No incluir autoridades identificables, bandas, escudos, propaganda ni celebracion electoral. La imagen debe unir democracia, transicion y capacidad de gobierno. Formato 3:2.

[RESTRICCIONES NEGATIVAS]
```

## 8. IA y transformacion de la gestion

### IA01. Revision humana de un sistema

Archivo: `ia-supervision-humana.jpg`

```text
[BLOQUE MAESTRO]

Equipo pequeno en una institucion peruana revisando el resultado de un sistema de clasificacion documental. En una pantalla realista se perciben columnas y documentos sin texto legible; al lado hay expedientes fisicos y una matriz de validacion impresa. Una persona verifica, otra documenta una excepcion y otra discute el criterio. Luz natural, tecnologia cotidiana, cero futurismo. Comunicar supervision humana, trazabilidad y mejora de procesos. Formato 3:2.

[RESTRICCIONES NEGATIVAS]
```

### IA02. Automatizacion de un proceso concreto

Archivo: `ia-proceso-publico.jpg`

```text
[BLOQUE MAESTRO]

Escena documental de personal administrativo peruano transformando un proceso basado en formularios y expedientes. Se ven documentos ordenados, escaner, computadora y una secuencia de trabajo representada con tarjetas fisicas sin texto legible. La atencion esta en las personas definiendo reglas y excepciones, no en la pantalla. Oficina publica contemporanea y sobria, luz lateral, composicion limpia. Formato 3:2.

[RESTRICCIONES NEGATIVAS]
```

## 9. Casos, evidencia y publicaciones

- En casos reales de CONCYTEC, IPD o GORE Cusco, priorizar fotografias propias autorizadas, capturas de entregables y visualizaciones verificables.
- No usar una escena generada como si documentara un encargo real.
- Si no existe material autorizado, usar una imagen conceptual del problema y mantener visible la etiqueta `Imagen editorial`.
- Para Insights, usar escenas territoriales o de trabajo vinculadas a la pregunta del articulo, no una imagen decorativa generica.
- Para indicadores y datasets, preferir graficos, mapas y visualizaciones producidos con datos reales antes que fotografia generada.
- Para toolkits, preferir una composicion editorial de herramientas fisicas, documentos o una demostracion real del recurso.

### R01. Evidencia y documentos

Archivo: `evidencia-metodo-documentos.jpg`

```text
[BLOQUE MAESTRO]

Mesa de trabajo editorial vista desde arriba con mapas impresos del Peru sin rotulos legibles, cuadernos, fichas de fuentes, lapices y una computadora parcialmente visible. Dos pares de manos comparan documentos y anotan una decision. Materiales sobrios, orden de trabajo real, luz natural y paleta de papel, tinta, verde profundo y pequeno acento terracota. No simular datos, sellos oficiales ni marcas. Formato 3:2.

[RESTRICCIONES NEGATIVAS]
```

## 10. Seleccion y control de calidad

Antes de aprobar una imagen, comprobar:

1. La escena comunica una pregunta, tension o capacidad concreta.
2. Peru se percibe sin depender de un estereotipo o monumento.
3. Las personas tienen agencia y no funcionan como decoracion.
4. La geografia, arquitectura, equipos y actividades son plausibles.
5. No hay texto falso, logos, propaganda ni datos inventados.
6. Rostros, manos, vehiculos, cables y edificios resisten una revision al 100%.
7. El centro contiene lo esencial para los recortes de escritorio y movil.
8. La imagen mantiene detalle en sombras y no tiene saturacion o HDR excesivos.
9. No puede confundirse con prueba de un cliente, obra o resultado real.
10. Se puede describir con un `alt` concreto en una sola frase.

## 11. Flujo para incorporar imagenes

1. Generar entre tres y cuatro variantes por prompt.
2. Elegir una por su composicion y credibilidad, no solo por impacto.
3. Colocar los originales aprobados en `public/images/editorial/inbox/`.
4. Mantener el nombre de archivo sugerido en esta guia.
5. Entregar tambien el prompt final usado si fue modificado.
6. NOAM revisara recortes, peso, metadatos, texto alternativo y ubicacion antes de publicar.
7. Los archivos publicados se optimizaran a JPEG o WebP; no subir PNG fotografico salvo necesidad tecnica.

## 12. Rotacion recomendada del hero

Primera coleccion:

1. `hero-amazonia-conectividad.jpg`
2. `hero-sierra-ciudad-territorio.jpg`
3. `hero-costa-ciudad-infraestructura.jpg`

Comportamiento recomendado:

- Una sola imagen por carga, seleccionada de forma estable durante la visita.
- Sin cambio automatico mientras la persona lee.
- Misma leyenda editorial y misma altura para evitar saltos de layout.
- Primera imagen precargada; las demas no se descargan hasta una visita posterior.
- Respetar `prefers-reduced-motion` si posteriormente se incorpora una transicion.
- Mantener `noam-territory-hero.jpg` como respaldo hasta aprobar toda la coleccion.
