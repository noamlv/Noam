from __future__ import annotations

import json
import math
import urllib.request
import zipfile
from datetime import date
from pathlib import Path

import geopandas as gpd
from shapely.geometry import MultiPolygon, Polygon


ROOT = Path(__file__).resolve().parents[1]
RAW_DIRECTORY = ROOT / "data" / "raw" / "geography"
RAW_ZIP = RAW_DIRECTORY / "departments-2025.zip"
PROCESSED_MAP = ROOT / "data" / "processed" / "peru-departments-map.json"
PUBLIC_GEOJSON = ROOT / "public" / "downloads" / "peru-departments-reference-2025.geojson"
QUALITY_REPORT = ROOT / "docs" / "data-quality-department-boundaries.md"
SOURCE_URL = "https://www.datosabiertos.gob.pe/sites/default/files/DEPARTAMENTOS_LIMITES.zip"
SOURCE_PAGE = "https://www.datosabiertos.gob.pe/dataset/limites-departamentales/resource/2aa1a2a6-55e6-4090-9152-dc223fdf9930"
VIEWBOX_WIDTH = 620
VIEWBOX_HEIGHT = 760
PADDING = 20
SIMPLIFY_TOLERANCE = 0.012


def download_source() -> None:
    RAW_DIRECTORY.mkdir(parents=True, exist_ok=True)
    if RAW_ZIP.exists() and RAW_ZIP.stat().st_size > 1_000_000:
        return
    request = urllib.request.Request(
        SOURCE_URL,
        headers={
            "User-Agent": "Mozilla/5.0 NOAM-DataPipeline/1.0",
            "Referer": SOURCE_PAGE,
        },
    )
    with urllib.request.urlopen(request, timeout=120) as response:
        RAW_ZIP.write_bytes(response.read())


def project_coordinate(lon: float, lat: float, bounds: tuple[float, float, float, float]) -> tuple[float, float]:
    min_x, min_y, max_x, max_y = bounds
    scale = min(
        (VIEWBOX_WIDTH - 2 * PADDING) / (max_x - min_x),
        (VIEWBOX_HEIGHT - 2 * PADDING) / (max_y - min_y),
    )
    map_width = (max_x - min_x) * scale
    map_height = (max_y - min_y) * scale
    offset_x = (VIEWBOX_WIDTH - map_width) / 2
    offset_y = (VIEWBOX_HEIGHT - map_height) / 2
    return offset_x + (lon - min_x) * scale, offset_y + (max_y - lat) * scale


def polygon_path(polygon: Polygon, bounds: tuple[float, float, float, float]) -> str:
    rings = [polygon.exterior, *polygon.interiors]
    segments: list[str] = []
    for ring in rings:
        points = [project_coordinate(lon, lat, bounds) for lon, lat in ring.coords]
        if len(points) < 3:
            continue
        commands = [f"M{points[0][0]:.1f},{points[0][1]:.1f}"]
        commands.extend(f"L{x:.1f},{y:.1f}" for x, y in points[1:])
        commands.append("Z")
        segments.append("".join(commands))
    return "".join(segments)


def geometry_path(geometry: Polygon | MultiPolygon, bounds: tuple[float, float, float, float]) -> str:
    polygons = [geometry] if isinstance(geometry, Polygon) else list(geometry.geoms)
    return "".join(polygon_path(polygon, bounds) for polygon in polygons)


def main() -> None:
    download_source()
    with zipfile.ZipFile(RAW_ZIP) as archive:
        shapefile_name = next(name for name in archive.namelist() if name.lower().endswith(".shp"))
    frame = gpd.read_file(f"zip://{RAW_ZIP}!{shapefile_name}").to_crs("EPSG:4326")
    frame = frame[["CODDEP", "DEPARTAMEN", "CAPITAL", "FUENTE", "geometry"]].rename(
        columns={"CODDEP": "code", "DEPARTAMEN": "name", "CAPITAL": "capital", "FUENTE": "source"}
    )
    frame["code"] = frame["code"].astype(str).str.zfill(2)
    frame["geometry"] = frame.geometry.apply(lambda geometry: geometry.simplify(SIMPLIFY_TOLERANCE, preserve_topology=True))
    frame = frame.sort_values("code").reset_index(drop=True)

    expected_codes = {f"{code:02d}" for code in range(1, 26)}
    actual_codes = set(frame["code"])
    invalid_geometries = int((~frame.geometry.is_valid).sum())
    empty_geometries = int(frame.geometry.is_empty.sum())
    if len(frame) != 25 or actual_codes != expected_codes or invalid_geometries or empty_geometries:
        raise ValueError(
            f"Boundary validation failed: rows={len(frame)}, codes={len(actual_codes)}, "
            f"invalid={invalid_geometries}, empty={empty_geometries}."
        )

    bounds = tuple(float(value) for value in frame.total_bounds)
    map_departments = [
        {
            "code": row.code,
            "name": row.name,
            "capital": row.capital,
            "path": geometry_path(row.geometry, bounds),
        }
        for row in frame.itertuples()
    ]
    map_payload = {
        "source": {
            "publisher": "Plataforma Nacional de Datos Abiertos / INEI",
            "resourcePage": SOURCE_PAGE,
            "downloadUrl": SOURCE_URL,
            "resourceUpdated": "2025-06-24",
            "geometryType": "Límites departamentales referenciales",
            "crs": "EPSG:4326",
        },
        "viewBox": f"0 0 {VIEWBOX_WIDTH} {VIEWBOX_HEIGHT}",
        "bounds": [round(value, 6) for value in bounds],
        "simplifyToleranceDegrees": SIMPLIFY_TOLERANCE,
        "departments": map_departments,
    }
    PROCESSED_MAP.parent.mkdir(parents=True, exist_ok=True)
    PROCESSED_MAP.write_text(json.dumps(map_payload, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")

    geojson = json.loads(frame.to_json(drop_id=True, to_wgs84=True))
    geojson["metadata"] = map_payload["source"]
    PUBLIC_GEOJSON.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC_GEOJSON.write_text(json.dumps(geojson, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")

    source_points = sum(
        sum(len(ring.coords) for ring in ([polygon.exterior, *polygon.interiors]))
        for geometry in frame.geometry
        for polygon in ([geometry] if isinstance(geometry, Polygon) else geometry.geoms)
    )
    geojson_size_kb = math.ceil(PUBLIC_GEOJSON.stat().st_size / 1024)
    QUALITY_REPORT.write_text(
        f"""# Calidad de datos: límites departamentales referenciales

Fecha de revisión: {date.today().isoformat()}

## Fuente

- Publicador: Plataforma Nacional de Datos Abiertos; geometrías atribuidas a INEI.
- Recurso: [Límites Departamentales]({SOURCE_PAGE}).
- Fecha indicada por el portal para el archivo: 24 de junio de 2025.
- Sistema de referencia: EPSG:4326.

## Controles

- Departamentos: {len(frame)}.
- Códigos únicos 01–25: sí.
- Geometrías inválidas: {invalid_geometries}.
- Geometrías vacías: {empty_geometries}.
- Vértices después de simplificación: {source_points:,}.
- GeoJSON web: {geojson_size_kb:,} KB.

## Transformación

La geometría se simplifica con una tolerancia de {SIMPLIFY_TOLERANCE} grados y preservación topológica. También se proyecta a rutas SVG para la vista web. El GeoJSON simplificado permanece disponible como descarga y conserva código, nombre, capital y fuente.

## Límites

- Los límites son referenciales y no sustituyen cartografía oficial para demarcación, catastro o controversias territoriales.
- La simplificación es adecuada para visualización nacional, no para análisis de precisión local.
- La fecha del recurso corresponde al archivo publicado; no implica que todos los tramos limítrofes hayan sido actualizados en esa fecha.
""",
        encoding="utf-8",
    )
    print(f"Generated {len(frame)} department boundaries and a {geojson_size_kb} KB GeoJSON.")


if __name__ == "__main__":
    main()
