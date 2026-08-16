# NOAM MVP V1: arquitectura de marca, oferta y contenido

Fecha: 2026-07-16
Estado: arquitectura vigente

## Posicionamiento

NOAM es una consultora de inteligencia publica y territorial. Integra investigacion, datos, estrategia y producto digital para mejorar decisiones de gobiernos, empresas y organizaciones.

Propuesta principal:

> Decisiones mas claras. Territorios mejor entendidos.

## Oferta comercial

1. Estudios, diagnosticos y evaluacion.
2. Observatorios y sistemas de decision.
3. IA y transformacion de la gestion.

Estas son capacidades contratables. DataPeru y Electoral no son lineas de consultoria: son, respectivamente, una plataforma publica y una vertical de aplicacion.

## Arquitectura publica

- `/services`: tres capacidades contratables.
- `/sectors`: entrada para sector publico y empresas.
- `/sectors/public-sector`: municipalidades, regiones y gobierno nacional.
- `/sectors/companies`: inteligencia territorial e institucional para empresas.
- `/dataperu`: plataforma territorial insignia.
- `/dataperu/municipios`: buscador nacional y perfiles municipales con RENAMU 2025.
- `/dataperu/municipios/[ubigeo]/data.csv`: descarga reutilizable con métricas, periodos, fuentes y proyectos.
- `/electoral`: productos y servicios antes y despues de elecciones.
- `/evidence`: biblioteca de estudios, indicadores, guias y casos.
- `/about`: tesis de la firma, principios y fundador.
- `/como-trabajamos`: modalidades, proceso, calidad y preparación de un encargo.
- `/contact`: calificacion inicial por tipo de necesidad.

## Funcion de cada capa

- Servicios: explica que se puede contratar y que resultados produce.
- Sectores: demuestra que NOAM entiende al comprador y su contexto.
- DataPeru: ofrece utilidad publica y demuestra capacidad tecnica.
- Electoral: captura una ventana de demanda y la conecta con nuevas gestiones.
- Evidencia: permite examinar metodo, criterio y productos antes de contratar.
- Casos: documenta capacidad sin inventar clientes ni resultados.

## Criterio editorial

Cada pieza debe cumplir al menos una funcion:

1. Atraer una audiencia pertinente.
2. Ayudar a comprender una decision.
3. Demostrar metodo o capacidad.
4. Probar un resultado autorizado.
5. Convertir hacia una conversacion concreta.

No se publican estadisticas sin fuente, casos ficticios como si fueran clientes ni afirmaciones de impacto sin evidencia.

## Backlog prioritario

### Antes de produccion publica

- Incorporar fotografia profesional del fundador.
- Confirmar correo, LinkedIn y demas enlaces oficiales de la firma.
- Incorporar una segunda fuente oficial al perfil municipal, priorizando presupuesto, inversión o población.
- Revisar privacidad del CV y retirar identificadores personales del historial Git.
- Configurar dominio, Vercel, variables de entorno y base de datos de produccion.
- Ejecutar pruebas Lighthouse y navegacion asistida.

### Contenido comercial

- Crear un caso autorizado de experiencia institucional.
- Publicar un brief territorial descargable generado desde cada perfil municipal.
- Publicar datos territoriales descargables y citables desde cada perfil municipal. **Implementado en CSV.**
- Producir un brief descargable para municipalidades.
- Documentar fuentes y metodologia de Planometro.
- Validar el lenguaje de servicios con cinco compradores potenciales.

### V2

- Buscador territorial.
- Filtros y taxonomia en Evidencia.
- Captura contextual, atribución y analítica propia. **Implementado.**
- Paginas de agenda publica activadas solo con contenido real.
- Portal de cliente con autenticacion robusta.

### V3

- Pipelines automatizados de datos publicos.
- Perfiles territoriales a escala nacional.
- Observatorios configurables por cliente.
- Equipo y red de especialistas por practica.
- Version inglesa completa.
