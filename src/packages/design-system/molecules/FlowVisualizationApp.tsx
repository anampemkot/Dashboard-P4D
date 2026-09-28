import * as React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Sankey, Tooltip, Treemap } from "recharts";
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/packages/ui/chart";
import { cn } from "@/lib/utils";
import { TILE_URLS, resolveFoundationColor, type TileProvider } from "../organisms/MapsApp";

export interface TreemapDatum { name: string; size: number; fill?: string; children?: TreemapDatum[]; }
export interface TreemapChartAppProps { id: string; data: TreemapDatum[]; height?: number; className?: string; }

// Font size scales proportionally with the cell's own area instead of a
// fixed size — big cells read as headlines, small ones shrink down, and
// cells too small to hold legible text (below HIDE_MIN_DIM) drop the label
// entirely instead of clipping/overlapping neighboring cells.
const TREEMAP_HIDE_MIN_DIM = 26;
const TREEMAP_FONT_MIN = 9;
const TREEMAP_FONT_MAX = 20;

function TreemapCell({ x, y, width, height, depth, name, value, children }: Record<string, any>) {
  if (depth === 0 || width <= 0 || height <= 0) return <g />;

  // Recharts' type="flat" Treemap renders every level of the hierarchy as
  // its own overlapping rect — a parent group's cell sits directly behind
  // its children's cells. Labeling parent cells too means two labels land
  // on the same pixels ("Official Assessment" bleeding through "PBB-P2").
  // Only leaves (no children) should ever get a label.
  const isLeaf = !children || (Array.isArray(children) && children.length === 0);

  const colorIndex = Array.from(String(name)).reduce((total, char) => total + char.charCodeAt(0), 0) % 5 + 1;
  const minDim = Math.min(width, height);
  const showLabel = isLeaf && minDim >= TREEMAP_HIDE_MIN_DIM;
  const label = String(name).length > 18 ? `${String(name).slice(0, 16)}...` : String(name);

  // Proportional to the cell's smaller dimension (area-driven, not a fixed
  // step function) — scale factor tuned so a ~260px cell tops out near the
  // max size and a ~40px cell bottoms out near the min before hiding.
  const fontSize = Math.round(
    Math.min(TREEMAP_FONT_MAX, Math.max(TREEMAP_FONT_MIN, minDim * 0.11))
  );
  const valueFontSize = Math.max(TREEMAP_FONT_MIN - 1, fontSize - 2);
  const padding = Math.max(4, Math.min(10, minDim * 0.05));
  const showValueLine = depth > 1 && height >= fontSize + valueFontSize + padding * 3;

  return (
    <g>
      <title>{`${name}: ${Number(value).toLocaleString("id-ID")}`}</title>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={4}
        fill={`var(--color-chart-${colorIndex})`}
        fillOpacity={depth === 1 ? 0.28 : 0.82}
        stroke="var(--color-bg-surface)"
        strokeWidth={3}
        className="transition-[fill-opacity] duration-200"
      />
      {showLabel && (() => {
        // Clamp the label pill to the cell's actual width — the estimate
        // below is font-metric guesswork, so also cap the <text> itself
        // with textLength/lengthAdjust as a hard floor: SVG text never
        // wraps or auto-truncates on its own, so without this long labels
        // bleed past the pill (and the cell) on narrow charts.
        const pillHeight = showValueLine ? fontSize + valueFontSize + padding * 2 : fontSize + padding * 1.4;
        const pillWidth = Math.min(width - padding * 2, Math.max(fontSize * 4, label.length * fontSize * 0.62));
        const textMaxWidth = pillWidth - padding * 1.5;
        return (
          <>
            <rect
              x={x + padding / 2}
              y={y + padding / 2}
              width={pillWidth}
              height={pillHeight}
              rx={4}
              fill="var(--color-bg-surface)"
              fillOpacity={0.9}
            />
            <text
              x={x + padding}
              y={y + padding / 2 + fontSize}
              fontSize={fontSize}
              fontWeight={700}
              fill="var(--color-text-primary)"
              textLength={textMaxWidth}
              lengthAdjust="spacingAndGlyphs"
            >
              {label}
            </text>
            {showValueLine && (
              <text
                x={x + padding}
                y={y + padding / 2 + fontSize + valueFontSize + 2}
                fontSize={valueFontSize}
                fill="var(--color-text-secondary)"
                textLength={textMaxWidth}
                lengthAdjust="spacingAndGlyphs"
              >
                {Number(value).toLocaleString("id-ID")}
              </text>
            )}
          </>
        );
      })()}
    </g>
  );
}

export function TreemapChartApp({ id, data, height = 280, className }: TreemapChartAppProps) {
  const config = Object.fromEntries(data.map((item, index) => [item.name, { label: item.name, color: item.fill || `var(--color-chart-${index % 5 + 1})` }])) as ChartConfig;
  return <ChartContainer id={id} config={config} className={cn("w-full min-w-0", className)} style={{ height }}><Treemap data={data} dataKey="size" nameKey="name" type="flat" content={<TreemapCell />} aspectRatio={4 / 3}><Tooltip content={<ChartTooltipContent />} /></Treemap></ChartContainer>;
}

export interface SankeyNode { name: string; }
export interface SankeyLink { source: number; target: number; value: number; }
export interface SankeyDiagramAppProps { id: string; nodes: SankeyNode[]; links: SankeyLink[]; height?: number; className?: string; }
export function SankeyDiagramApp({ id, nodes, links, height = 300, className }: SankeyDiagramAppProps) {
  const config = Object.fromEntries(nodes.map((node, index) => [node.name, { label: node.name, color: `var(--color-chart-${index % 5 + 1})` }])) as ChartConfig;
  return <ChartContainer id={id} config={config} className={cn("w-full min-w-0", className)} style={{ height }}><Sankey data={{ nodes, links }} nodePadding={24} nodeWidth={14} linkCurvature={0.5} node={{ fill: "var(--color-chart-1)", stroke: "var(--color-bg-surface)" }} link={{ stroke: "var(--color-chart-2)", strokeOpacity: 0.35 }} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}><Tooltip content={<ChartTooltipContent />} /></Sankey></ChartContainer>;
}

// ==========================================
// CHOROPLETH MAP — real geospatial rendering (Leaflet + GeoJSON), not a
// hand-drawn SVG illustration. Each region carries actual [lng,lat]
// polygon geometry so it composes with real basemaps, zoom/pan, and can be
// driven by genuine per-kecamatan/per-wilayah boundary data going forward.
// ==========================================
export interface ChoroplethRegion {
  id: string;
  name: string;
  value: number;
  /** GeoJSON Polygon/MultiPolygon geometry in standard [lng, lat] winding. */
  geometry: GeoJSON.Geometry;
}

export interface ChoroplethMapAppProps {
  id: string;
  regions: ChoroplethRegion[];
  min?: number;
  max?: number;
  /**
   * Nama besaran yang diwarnai — "Tingkat Kepatuhan", "Realisasi". Tanpa ini
   * gradasi warna hanya menunjukkan angka besar-kecil tanpa menyebut angka apa.
   */
  valueLabel?: string;
  valueFormatter?: (value: number) => string;
  height?: number | string;
  /** Tile basemap shown under the choropleth layer. */
  tileProvider?: TileProvider;
  className?: string;
}

export function ChoroplethMapApp({
  id,
  regions,
  min = Math.min(...regions.map((region) => region.value), 0),
  max = Math.max(...regions.map((region) => region.value), 1),
  valueLabel,
  valueFormatter = String,
  height = 320,
  tileProvider = "carto-light",
  className,
}: ChoroplethMapAppProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<L.Map | null>(null);
  const layerRef = React.useRef<L.GeoJSON | null>(null);
  const [active, setActive] = React.useState<ChoroplethRegion | null>(null);

  const colorFor = React.useCallback(
    (value: number) => {
      const intensity = 20 + ((value - min) / (max - min || 1)) * 80;
      return `color-mix(in srgb, var(--color-chart-1) ${intensity}%, var(--color-bg-surface))`;
    },
    [min, max]
  );

  const geojson: GeoJSON.FeatureCollection = React.useMemo(
    () => ({
      type: "FeatureCollection",
      features: regions.map((region) => ({
        type: "Feature",
        id: region.id,
        properties: { id: region.id, name: region.name, value: region.value },
        geometry: region.geometry,
      })),
    }),
    [regions]
  );

  // Init map once
  React.useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, { zoomControl: false, scrollWheelZoom: false });
    const tileConfig = TILE_URLS[tileProvider];
    L.tileLayer(tileConfig.url, { attribution: tileConfig.attribution, maxZoom: 18 }).addTo(map);
    L.control.zoom({ position: "bottomright" }).addTo(map);
    mapRef.current = map;

    // Leaflet measures its container once at construction time and caches
    // that size — it has no idea the surrounding flex/grid layout might
    // still be settling (or later resize, e.g. a sidebar toggling). Without
    // this the tile grid stays locked to whatever (often too-narrow) size
    // existed at the instant the container first mounted.
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
      // The very first fitBounds (in the draw effect below) may have run
      // against the pre-layout size — once the container reaches its real
      // size, re-fit so the regions are actually centered/zoomed correctly.
      const bounds = layerRef.current?.getBounds();
      if (bounds?.isValid()) {
        map.fitBounds(bounds, { padding: [16, 16] });
      }
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, [tileProvider]);

  // (Re)draw the GeoJSON choropleth layer whenever regions/values change
  React.useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (layerRef.current) {
      layerRef.current.remove();
      layerRef.current = null;
    }

    const layer = L.geoJSON(geojson, {
      style: (feature) => ({
        fillColor: colorFor(feature?.properties?.value ?? 0),
        fillOpacity: 0.85,
        color: resolveFoundationColor("--color-bg-surface", "#ffffff"),
        weight: 2,
      }),
      onEachFeature: (feature, featureLayer) => {
        const region = regions.find((r) => r.id === feature.properties?.id);
        featureLayer.bindTooltip(
          `<strong>${feature.properties?.name}</strong><br/>${valueFormatter(feature.properties?.value ?? 0)}`,
          { sticky: true, className: "choropleth-tooltip" }
        );
        featureLayer.on("mouseover", () => {
          setActive(region ?? null);
          (featureLayer as L.Path).setStyle({ fillOpacity: 1, weight: 3 });
        });
        featureLayer.on("mouseout", () => {
          setActive(null);
          (featureLayer as L.Path).setStyle({ fillOpacity: 0.85, weight: 2 });
        });
      },
    }).addTo(map);

    layerRef.current = layer;

    const bounds = layer.getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [16, 16] });
    }
  }, [geojson, colorFor, regions, valueFormatter]);

  return (
    <div id={id} className={cn("relative flex w-full min-w-0 flex-col gap-2", className)}>
      <div
        ref={containerRef}
        className="w-full min-w-0 overflow-hidden rounded-lg border border-hairline-soft"
        style={{ height: typeof height === "number" ? `${height}px` : height }}
      />
      {active && (
        <div className="pointer-events-none absolute left-3 top-3 z-[500] rounded-md border border-hairline bg-surface px-2.5 py-1.5 text-xs shadow-card">
          <strong className="block text-ink">{active.name}</strong>
          <span className="text-ink-secondary">
            {valueLabel ? `${valueLabel}: ` : ""}
            {valueFormatter(active.value)}
          </span>
        </div>
      )}
      <div className="flex items-center justify-end gap-2 text-[10px] text-ink-muted">
        {valueLabel && <span className="mr-auto font-semibold text-ink-secondary">{valueLabel}</span>}
        <span>{valueFormatter(min)}</span>
        <span className="h-2 w-24 rounded-full bg-gradient-to-r from-chart-1/20 to-chart-1" />
        <span>{valueFormatter(max)}</span>
      </div>
    </div>
  );
}
