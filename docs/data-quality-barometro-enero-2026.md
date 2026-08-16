# Calidad y publicación: Barómetro Electoral, enero 2026

Fecha de auditoría: 2026-07-17

## Alcance

La web NOAM presenta la arquitectura analítica y enlaza la experiencia pública existente. No incorpora la base individual, no distribuye archivos SPSS/Stata y no copia las láminas del informe gráfico.

## Fuente auditada

- Estudio de opinión pública de IMASEN, enero de 2026.
- Trabajo de campo: 27 al 31 de enero de 2026.
- 1.300 entrevistas efectivas.
- 184 variables en la base analizada.
- Cobertura urbana y rural mediante cinco macrozonas.
- Captación online con cuotas territoriales, de sexo y edad.
- Ponderador usado por el análisis: `factor1`.
- Suma del ponderador: aproximadamente 1.300.

Los valores se reconciliaron entre `00_meta.csv`, la memoria del proyecto, el resumen ejecutivo, los CSV de resultados y la ficha técnica del informe.

## Límites de interpretación

- El estudio es una fotografía de enero de 2026 y no describe cambios posteriores.
- La captación fue online y por cuotas; la ponderación no convierte el estudio en un censo.
- Los modelos multivariados identifican patrones y asociaciones dentro del estudio.
- Elastic Net y XGBoost no constituyen pronósticos electorales garantizados.
- Las estimaciones IPW/AIPW son exploratorias y no prueban causalidad definitiva.
- Los segmentos dependen de variables, recodificaciones y decisiones de modelado documentadas.

## Privacidad y derechos

- La versión pública no expone registros individuales ni identificadores de entrevistados.
- El informe gráfico marca su reproducción como restringida sin autorización expresa de la empresa.
- NOAM no debe copiar sus páginas, gráficos o elementos visuales al repositorio sin confirmación documental de derechos.
- Antes de publicar nuevos agregados derivados debe confirmarse el alcance de la autorización de uso y atribución.

## Próximo control

Si se autoriza una experiencia nativa con resultados, generar un snapshot agregado reproducible desde los CSV, registrar hashes SHA-256 y validar que ninguna salida permita reconstruir respuestas individuales.
