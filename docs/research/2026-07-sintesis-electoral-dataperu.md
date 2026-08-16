# Sintesis editorial: Electoral y DataPeru

Fecha de revision: 2026-07-29

## Decision de producto

Los informes no justifican abrir decenas de productos aislados. Refuerzan una arquitectura unica:

1. **DataPeru** funciona como infraestructura territorial compartida: ubigeo, poblacion, presupuesto, inversion, proyectos, capacidades, mapas y fuentes.
2. **Electoral** usa esa infraestructura para cuatro preguntas del ciclo subnacional: quienes compiten, que ocurre en cada territorio, que proponen y como se prepara la siguiente gestion.
3. **Los servicios** amplian la capa publica con diagnosticos, estudios, observatorios, encuestas, alertas y sistemas adaptados a una institucion.

## Lo que ya existe

- Perfiles para 1,891 municipalidades.
- Atlas departamental, visor territorial, radar municipal y observatorio de inversiones.
- Planometro y Barometro como demostraciones electorales.
- Brief territorial ERM 2026 y herramientas para transferencia y primeros 100 dias.

## Prioridad Electoral

### Publico y verificable

- Orientacion por territorio y tipo de usuario.
- Acceso a fuentes oficiales del proceso.
- Comparacion de planes con trazabilidad documental.
- Contexto territorial y capacidad de gestion mediante DataPeru.

### Desarrollo condicionado a fuente y operacion

- Radar de candidaturas y expedientes.
- Alertas de cambios de estado juridico.
- Seguimiento de financiamiento electoral.
- Sala de datos para medios y equipos tecnicos.

Estas lineas requieren ingesta versionada, identificadores estables, revision juridica y monitoreo operativo. No deben presentarse como productos disponibles hasta contar con un pipeline probado.

## Prioridad DataPeru

La ampliacion debe hacerse por decisiones, no por acumular indicadores:

1. Gestion e inversion publica.
2. Servicios y capacidades municipales.
3. Seguridad y riesgos territoriales.
4. Empleo y desarrollo economico.
5. Salud, educacion y acceso a servicios.

Cada nuevo modulo necesita fuente oficial, cobertura territorial, periodo, metodo de actualizacion, control de calidad y una extension comercial clara.

## Criterios editoriales

- No publicar las referencias `turn...` incluidas en los informes: son marcadores internos sin valor documental fuera de la investigacion original.
- Verificar cifras electorales dinamicas contra JNE, ONPE o Reniec antes de cada publicacion.
- No describir una consulta web como API si la institucion no documenta una API publica.
- No usar ejecucion financiera como sinonimo de calidad, impacto o avance fisico.
- Evitar rankings compuestos sin una justificacion metodologica auditable.
- Diferenciar datos oficiales, datos en proceso e inferencias de NOAM.

## Siguiente bloque de construccion

1. Consolidar la navegacion y narrativa comercial de Electoral y DataPeru.
2. Publicar dos notas metodologicas que expliquen la arquitectura de ambas verticales.
3. Diseñar el modelo de datos electoral antes de automatizar candidaturas o expedientes.
4. Priorizar una nueva capa sectorial de DataPeru solo despues de auditar disponibilidad y cobertura.
