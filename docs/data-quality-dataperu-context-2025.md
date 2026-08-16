# Calidad de datos: contexto municipal DataPerú 2025

Fecha de revisión: 2026-07-16

## Cobertura y unión

- Perfiles RENAMU esperados: 1,891.
- Distritos en la fuente de población: 1,892.
- Entidades locales agregadas en la fuente presupuestal: 1,918.
- Perfiles con población y presupuesto: 1,891.
- Perfiles sin población: 0.
- Perfiles sin presupuesto: 0.

## Diferencias de universo

- La fuente poblacional incluye 1 distrito adicional posterior al marco RENAMU 2025: SANTA ROSA DE LORETO 22/ (160405).
- El agregado MEF contiene 27 entidades fuera del universo RENAMU; son principalmente mancomunidades y el distrito nuevo. Se excluyen de los perfiles.

## Pruebas de validez

- Ubigeos RENAMU con correspondencia exacta: 1,891.
- Poblaciones proyectadas menores o iguales a cero: 0.
- Ejecución total superior al PIM por tolerancia de 0,1 puntos: 0.
- Ejecución de inversión superior al PIM por tolerancia de 0,1 puntos: 0.

## Definiciones

- **PIM:** Presupuesto Institucional Modificado al cierre del año fiscal.
- **Devengado:** obligación de pago reconocida durante el año fiscal.
- **Ejecución:** devengado dividido entre PIM; describe avance financiero, no calidad ni impacto.
- **Inversión:** registros clasificados por el MEF como proyecto (TIPO_ACT_PROY = 2).
- **Per cápita:** monto dividido entre la población proyectada al 30 de junio de 2025.

## Riesgos y límites

- **Medio:** la población es una proyección y no el conteo final del Censo 2025.
- **Medio:** la ejecución financiera no mide calidad, pertinencia ni culminación física.
- **Bajo:** los montos se redondean al sol en el extracto público; los cálculos se realizan primero con los valores originales.
- **Bajo:** PIA/PIM aparecen en el periodo 0 y el devengado en los meses 1 a 12; la consulta agregada respeta esta estructura.
