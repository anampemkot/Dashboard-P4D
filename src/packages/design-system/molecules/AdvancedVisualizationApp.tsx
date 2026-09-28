import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextApp } from "../atoms/TextApp";
import { AutoLoopListApp } from "./AutoLoopListApp";

const VIS_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

export interface HeatmapCell { x: string; y: string; value: number; date?: string; }
export interface HeatmapAppProps {
  id: string;
  data: HeatmapCell[];
  variant?: "matrix" | "calendar";
  min?: number;
  max?: number;
  valueFormatter?: (value: number) => string;
  className?: string;
  maxHeight?: number;
  autoLoop?: boolean;
}

function getHeatmapIntensityStyle(value: number, min: number, max: number) {
  if (value <= 0) {
    return {
      bg: "bg-surface-soft/60 border border-hairline-soft/40",
      text: "text-ink-muted/70 font-normal",
    };
  }
  const ratio = (value - min) / (max - min || 1);
  if (ratio >= 0.75) {
    return {
      bg: "bg-rose-600 dark:bg-rose-600 shadow-xs border border-rose-700",
      text: "text-white font-bold",
    };
  }
  if (ratio >= 0.35) {
    return {
      bg: "bg-rose-100/90 dark:bg-rose-950/60 border border-rose-200/80 dark:border-rose-900/60",
      text: "text-rose-700 dark:text-rose-300 font-bold",
    };
  }
  return {
    bg: "bg-rose-50/80 dark:bg-rose-950/30 border border-rose-100/70 dark:border-rose-900/40",
    text: "text-rose-600 dark:text-rose-400 font-medium",
  };
}

export function HeatmapApp({
  id,
  data,
  variant = "matrix",
  min = Math.min(...data.map((item) => item.value), 0),
  max = Math.max(...data.map((item) => item.value), 1),
  valueFormatter = String,
  className,
  maxHeight,
  autoLoop = true,
}: HeatmapAppProps) {
  const xs = [...new Set(data.map((item) => item.x))];
  const ys = [...new Set(data.map((item) => item.y))];

  if (!data.length) return <VisualizationEmpty id={id} />;

  if (variant === "matrix") {
    const gridColsStyle = { gridTemplateColumns: `140px repeat(${xs.length}, minmax(100px, 1fr))` };

    const renderRows = (suffix: string) => (
      <div className="flex flex-col gap-2.5">
        {ys.map((y) => (
          <div key={`row-${y}${suffix}`} className="grid items-center gap-3 py-0.5" style={gridColsStyle}>
            <TextApp
              id={`${id}-sektor-${y.replace(/[\s\-\/\.]+/g, "-")}${suffix}`}
              variant="body"
              weight="bold"
              className="text-xs text-ink-primary truncate font-display"
            >
              {y}
            </TextApp>
            {xs.map((x) => {
              const cell = data.find((item) => item.x === x && item.y === y);
              const val = cell ? cell.value : 0;
              const style = getHeatmapIntensityStyle(val, min, max);
              return (
                <div
                  key={`${x}-${y}${suffix}`}
                  title={cell ? `${y} - ${x}: ${valueFormatter(val)}` : "Tidak ada data"}
                  className={cn(
                    "flex items-center justify-center py-2 px-3 rounded-lg text-xs transition-all min-h-[36px] select-none",
                    style.bg,
                    style.text
                  )}
                >
                  {valueFormatter(val)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );

    return (
      <div id={id} data-ui-id={id} className={cn("w-full flex flex-col gap-2 min-w-0", className)}>
        {/* Table Header */}
        <div className="grid items-center gap-3 pb-2 border-b border-hairline-soft shrink-0" style={gridColsStyle}>
          <TextApp id={`${id}-th-sektor`} variant="caption" weight="bold" className="text-xs text-ink-muted">
            Sektor
          </TextApp>
          {xs.map((x) => (
            <TextApp id={`${id}-th-${x.replace(/[\s\-\/\.]+/g, "-")}`} key={x} variant="caption" weight="bold" className="text-xs text-center text-ink-muted truncate">
              {x}
            </TextApp>
          ))}
        </div>

        {/* Scrollable / Vertical Marquee Rows */}
        {maxHeight || autoLoop ? (
          <AutoLoopListApp id={`${id}-loop`} maxHeight={maxHeight || 185} pauseOnHover className="w-full">
            {(suffix) => renderRows(suffix)}
          </AutoLoopListApp>
        ) : (
          renderRows("")
        )}

        {/* Intensity Legend */}
        <div className="mt-2 flex items-center justify-end gap-2 text-xs text-ink-muted shrink-0 font-medium">
          <span>Intensitas:</span>
          <div className="flex items-center gap-1">
            <span className="h-3 w-4 rounded-xs bg-surface-soft border border-hairline-soft" title="Rendah / 0" />
            <span className="h-3 w-4 rounded-xs bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/40" title="Ringan" />
            <span className="h-3 w-4 rounded-xs bg-rose-100 dark:bg-rose-900/60 border border-rose-200 dark:border-rose-800/60" title="Sedang" />
            <span className="h-3 w-4 rounded-xs bg-rose-600 border border-rose-700" title="Tinggi / Anomali Puncak" />
          </div>
        </div>
      </div>
    );
  }

  // Variant calendar fallback
  const intensity = (value: number) => 0.12 + ((value - min) / (max - min || 1)) * 0.88;
  return (
    <div id={id} className={cn("w-full overflow-x-auto", className)}>
      <div className="grid min-w-max gap-1 grid-flow-col grid-rows-7">
        {data.map((cell) => (
          <HeatCell key={cell.date || `${cell.x}-${cell.y}`} cell={cell} opacity={intensity(cell.value)} formatter={valueFormatter} />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-end gap-2 text-[10px] text-ink-muted">
        <span>Rendah</span>
        <span className="h-2 w-20 rounded-full bg-gradient-to-r from-chart-1/10 to-chart-1" />
        <span>Tinggi</span>
      </div>
    </div>
  );
}

function HeatCell({ cell, opacity, formatter }: { cell?: HeatmapCell; opacity: number; formatter: (value: number) => string }) {
  return <div title={cell ? `${cell.date || `${cell.y} ${cell.x}`}: ${formatter(cell.value)}` : "Tidak ada data"} className="group relative h-10 min-w-10 rounded-sm border border-hairline-soft" style={{ backgroundColor: `color-mix(in srgb, var(--color-chart-1) ${Math.round(opacity * 100)}%, transparent)` }}>{cell && <span className="absolute inset-0 hidden items-center justify-center text-[9px] font-bold text-ink group-hover:flex">{cell.value}</span>}</div>;
}

export interface GaugeChartAppProps { id: string; value: number; min?: number; max?: number; target?: number; label?: string; variant?: "speedometer" | "arc"; valueFormatter?: (value: number) => string; className?: string; }
export function GaugeChartApp({ id, value, min = 0, max = 100, target, label, variant = "arc", valueFormatter = String, className }: GaugeChartAppProps) {
  const ratio = Math.min(1, Math.max(0, (value - min) / (max - min || 1)));
  const angle = -90 + ratio * 180;
  return <div id={id} className={cn("relative mx-auto w-full max-w-sm text-center", className)}>
    <svg viewBox="0 0 220 125" className="w-full" role="img" aria-label={`${label || "Gauge"}: ${valueFormatter(value)}`}>
      <path d="M 25 105 A 85 85 0 0 1 195 105" fill="none" stroke="var(--color-border-hairline-soft)" strokeWidth="18" strokeLinecap="round" />
      <path d="M 25 105 A 85 85 0 0 1 195 105" fill="none" stroke="var(--color-chart-1)" strokeWidth="18" strokeLinecap="round" pathLength="100" strokeDasharray={`${ratio * 100} 100`} />
      {target !== undefined && <line x1="110" y1="105" x2="110" y2="18" stroke="var(--color-text-warning)" strokeWidth="3" transform={`rotate(${-90 + ((target - min) / (max - min || 1)) * 180} 110 105)`} />}
      {variant === "speedometer" && <line x1="110" y1="105" x2="110" y2="36" stroke="var(--color-text-primary)" strokeWidth="4" strokeLinecap="round" transform={`rotate(${angle} 110 105)`} />}
      {variant === "speedometer" && <circle cx="110" cy="105" r="7" fill="var(--color-text-primary)" />}
      <text x="25" y="122" fontSize="10" fill="var(--color-text-muted)">{min}</text><text x="195" y="122" textAnchor="end" fontSize="10" fill="var(--color-text-muted)">{max}</text>
    </svg>
    <TextApp id={`${id}-value`} variant="h3" weight="bold" className="-mt-8 text-ink">{valueFormatter(value)}</TextApp>
    {label && <TextApp id={`${id}-label`} variant="caption" className="text-ink-muted">{label}</TextApp>}
  </div>;
}

export interface FunnelStage { label: string; value: number; color?: string; }
export interface FunnelChartAppProps {
  id: string;
  data: FunnelStage[];
  /**
   * `stacked` — bar yang menyempit, dipakai saat bentuk penyusutannya yang
   * jadi pesan utama.
   * `steps` — kartu bertahap dihubungkan panah, dipakai saat angka tiap tahap
   * itu sendiri yang dilaporkan dan penyempitannya nomor dua.
   */
  variant?: "stacked" | "steps";
  valueFormatter?: (value: number) => string;
  className?: string;
}
/** Porsi terhadap tahap sebelumnya. Tahap pertama tidak punya asal konversi. */
function funnelConversion(data: FunnelStage[], index: number) {
  if (!index) return null;
  const previous = data[index - 1].value;
  return previous ? Math.round((data[index].value / previous) * 100) : null;
}
export function FunnelChartApp({ id, data, variant = "stacked", valueFormatter = String, className }: FunnelChartAppProps) {
  if (variant === "steps") {
    return <div id={id} className={cn("flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center", className)}>{data.map((stage, index) => {
      const color = stage.color || VIS_COLORS[index % VIS_COLORS.length];
      const conversion = funnelConversion(data, index);
      // Tahap terakhir adalah angka yang sedang dilaporkan — semua tahap
      // sebelumnya hanya menjelaskan bagaimana sampai ke sana, jadi hanya
      // tahap terakhir yang diberi aksen.
      const isOutcome = index === data.length - 1;
      return <React.Fragment key={stage.label}>
        {index > 0 && <ChevronRight className="hidden h-6 w-6 shrink-0 text-ink-muted/40 sm:block" aria-hidden />}
        <div className={cn("flex-1 rounded-xl border px-4 py-4 text-center", !isOutcome && "border-hairline-soft bg-surface")} style={isOutcome ? { backgroundColor: `color-mix(in srgb, ${color} 16%, var(--color-bg-surface))`, borderColor: `color-mix(in srgb, ${color} 55%, transparent)` } : undefined}>
          <TextApp id={`${id}-${index}-label`} variant="caption" weight="bold" className="block truncate text-[10px] uppercase tracking-wider" style={{ color: isOutcome ? color : "var(--color-text-secondary)" }}>{stage.label}</TextApp>
          <TextApp id={`${id}-${index}-value`} variant="h3" weight="bold" className="mt-1.5 block font-mono" style={{ color: isOutcome ? color : "var(--color-text-primary)" }}>{valueFormatter(stage.value)}</TextApp>
          {conversion !== null && <TextApp id={`${id}-${index}-conv`} variant="caption" className="mt-0.5 block text-ink-secondary">{conversion}% konversi</TextApp>}
        </div>
      </React.Fragment>;
    })}</div>;
  }
  const max = Math.max(...data.map((item) => item.value), 1);
  return <div id={id} className={cn("space-y-2", className)}>{data.map((stage, index) => { const color = stage.color || VIS_COLORS[index % VIS_COLORS.length]; return <div key={stage.label} className="mx-auto text-center" style={{ width: `${35 + (stage.value / max) * 65}%` }} title={`${stage.label}: ${valueFormatter(stage.value)}`}><div className="rounded-md border px-3 py-2 text-xs font-semibold text-ink" style={{ backgroundColor: `color-mix(in srgb, ${color} 22%, var(--color-bg-surface))`, borderColor: color }}><span className="block truncate">{stage.label}</span><span className="font-mono">{valueFormatter(stage.value)} · {funnelConversion(data, index) ?? 100}%</span></div></div>; })}</div>;
}

export interface WaterfallItem { label: string; value: number; type?: "start" | "increase" | "decrease" | "total"; }
export interface WaterfallChartAppProps { id: string; data: WaterfallItem[]; valueFormatter?: (value: number) => string; className?: string; }
export function WaterfallChartApp({ id, data, valueFormatter = String, className }: WaterfallChartAppProps) {
  let running = 0;
  const computed = data.map((item) => { const start = item.type === "start" || item.type === "total" ? 0 : running; running = item.type === "total" ? item.value : running + item.value; return { ...item, start, end: item.type === "start" ? item.value : running }; });
  const values = computed.flatMap((item) => [item.start, item.end]); const min = Math.min(0, ...values); const max = Math.max(...values, 1); const range = max - min;
  return <div id={id} className={cn("flex h-64 items-end gap-2 border-b border-hairline", className)}>{computed.map((item) => { const lower = Math.min(item.start, item.end); const height = Math.abs(item.end - item.start) / range * 190; const bottom = (lower - min) / range * 190; const color = item.type === "decrease" || item.value < 0 ? "bg-error" : item.type === "increase" ? "bg-success" : "bg-vibrant-purple-dark"; return <div key={item.label} className="flex min-w-0 flex-1 flex-col items-center"><div className="relative h-52 w-full"><div title={`${item.label}: ${valueFormatter(item.value)}`} className={cn("absolute inset-x-1 rounded-sm", color)} style={{ height: Math.max(height, 3), bottom }} /></div><span className="mt-1 w-full truncate text-center text-[10px] text-ink-muted">{item.label}</span></div>; })}</div>;
}

export interface BulletDatum { label: string; value: number; target: number; max: number; ranges?: [number, number, number]; }
export interface BulletChartAppProps { id: string; data: BulletDatum[]; variant?: "standard" | "qualitative"; valueFormatter?: (value: number) => string; className?: string; }
export function BulletChartApp({ id, data, variant = "qualitative", valueFormatter = String, className }: BulletChartAppProps) {
  return <div id={id} className={cn("space-y-5", className)}>{data.map((item) => { const ranges = item.ranges || [item.max * .5, item.max * .75, item.max]; return <div key={item.label} className="grid grid-cols-[96px_minmax(0,1fr)] items-center gap-3"><span className="truncate text-xs font-semibold text-ink">{item.label}</span><div className="relative h-8"><div className="absolute inset-0 flex overflow-hidden rounded-sm">{variant === "qualitative" ? ranges.map((range, index) => <span key={range} className={cn("h-full", index === 0 ? "bg-hairline-hard" : index === 1 ? "bg-vibrant-purple/20" : "bg-vibrant-purple/10")} style={{ width: `${(range - (ranges[index - 1] || 0)) / item.max * 100}%` }} />) : <span className="h-full w-full bg-hairline-soft" />}</div><span className="absolute left-0 top-2 h-4 rounded-r-sm bg-vibrant-purple-dark" style={{ width: `${item.value / item.max * 100}%` }} title={`Nilai: ${valueFormatter(item.value)}`} /><span className="absolute inset-y-0 w-0.5 bg-error" style={{ left: `${item.target / item.max * 100}%` }} title={`Target: ${valueFormatter(item.target)}`} /></div></div>; })}</div>;
}

export interface SparklineAppProps { id: string; data: number[]; type?: "line" | "bar" | "winLoss"; width?: number; height?: number; className?: string; }
export function SparklineApp({ id, data, type = "line", width = 140, height = 44, className }: SparklineAppProps) {
  const max = Math.max(...data, 1); const min = Math.min(...data, 0); const range = max - min || 1;
  if (type === "line") { const points = data.map((value, index) => `${index / Math.max(1, data.length - 1) * width},${height - ((value - min) / range) * (height - 4) - 2}`).join(" "); return <svg id={id} viewBox={`0 0 ${width} ${height}`} className={cn("overflow-visible", className)} aria-label="Line sparkline"><polyline points={points} fill="none" stroke="var(--color-chart-1)" strokeWidth="2" vectorEffect="non-scaling-stroke" /></svg>; }
  const barWidth = width / Math.max(1, data.length) - 2; const zero = height - ((0 - min) / range) * height;
  return <svg id={id} viewBox={`0 0 ${width} ${height}`} className={className} aria-label={`${type} sparkline`}>{data.map((value, index) => { const y = height - ((Math.max(value, 0) - min) / range) * height; const barHeight = type === "winLoss" ? height / 2 - 2 : Math.abs(value) / range * height; return <rect key={index} x={index * (barWidth + 2)} y={type === "winLoss" ? value >= 0 ? 1 : height / 2 + 1 : Math.min(y, zero)} width={barWidth} height={Math.max(2, barHeight)} rx="1" fill={value >= 0 ? "var(--color-chart-1)" : "var(--color-chart-5)"} />; })}</svg>;
}

export interface BoxPlotDatum { label: string; min: number; q1: number; median: number; q3: number; max: number; outliers?: number[]; }
export interface BoxPlotAppProps { id: string; data: BoxPlotDatum[]; className?: string; }
export function BoxPlotApp({ id, data, className }: BoxPlotAppProps) {
  const min = Math.min(...data.flatMap((item) => [item.min, ...(item.outliers || [])])); const max = Math.max(...data.flatMap((item) => [item.max, ...(item.outliers || [])])); const scale = (value: number) => 30 + ((value - min) / (max - min || 1)) * 320;
  return <svg id={id} viewBox={`0 0 380 ${data.length * 64 + 30}`} className={cn("w-full", className)} role="img" aria-label="Box plot">{data.map((item, index) => { const y = 25 + index * 64; return <g key={item.label}><text x="4" y={y + 5} fontSize="10" fill="var(--color-text-muted)">{item.label}</text><line x1={scale(item.min)} y1={y} x2={scale(item.max)} y2={y} stroke="var(--color-text-secondary)" /><line x1={scale(item.min)} y1={y - 7} x2={scale(item.min)} y2={y + 7} stroke="var(--color-text-secondary)" /><line x1={scale(item.max)} y1={y - 7} x2={scale(item.max)} y2={y + 7} stroke="var(--color-text-secondary)" /><rect x={scale(item.q1)} y={y - 14} width={scale(item.q3) - scale(item.q1)} height="28" rx="3" fill="var(--color-chart-1)" fillOpacity=".35" stroke="var(--color-chart-1)" /><line x1={scale(item.median)} y1={y - 14} x2={scale(item.median)} y2={y + 14} stroke="var(--color-text-primary)" strokeWidth="2" />{item.outliers?.map((value) => <circle key={value} cx={scale(value)} cy={y} r="3" fill="var(--color-text-error)" />)}</g>; })}</svg>;
}

function VisualizationEmpty({ id }: { id: string }) { return <div id={id} className="flex min-h-40 items-center justify-center rounded-lg border border-hairline-soft bg-surface"><TextApp id={`${id}-empty`} variant="caption" className="text-ink-muted">Tidak ada data untuk ditampilkan</TextApp></div>; }
