import * as React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  RadialBarChart,
  RadialBar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from "@/packages/ui/chart";
import { cn } from "@/lib/utils";

// ==========================================
// DESIGN SYSTEM COLOR PALETTE FOR CHARTS
// ==========================================
export const CHART_PALETTES = {
  purple: {
    primary: "#8b5cf6",
    secondary: "#a78bfa",
    tertiary: "#c084fc",
    accent: "#f59e0b",
  },
  blue: {
    primary: "#3b82f6",
    secondary: "#60a5fa",
    tertiary: "#93c5fd",
    accent: "#10b981",
  },
  yellow: {
    primary: "#f59e0b",
    secondary: "#fbbf24",
    tertiary: "#fde047",
    accent: "#8b5cf6",
  },
  vibrant: {
    p1: "#8b5cf6", // Purple
    p2: "#3b82f6", // Blue
    p3: "#f59e0b", // Yellow / Amber
    p4: "#10b981", // Emerald
    p5: "#f43f5e", // Rose
    p6: "#06b6d4", // Cyan
  },
} as const;

export type ChartVariant = "purple" | "blue" | "yellow" | "vibrant";
export type ChartType = "area" | "bar" | "line" | "pie" | "radar" | "radial";

export interface SeriesConfig {
  key: string;
  label: string;
  color?: string;
  type?: "monotone" | "linear" | "step";
  fillOpacity?: number;
  strokeDasharray?: string;
  barSize?: number;
}

export interface ChartAppProps {
  id?: string;
  type: ChartType;
  variant?: ChartVariant;
  data: Array<Record<string, any>>;
  config?: ChartConfig;
  series?: SeriesConfig[];
  xKey?: string;
  yKey?: string;
  height?: number | string;
  className?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  valueFormatter?: (val: any) => string;
  innerRadius?: number;
  outerRadius?: number;
  barSize?: number;
}

export function ChartApp({
  id,
  type,
  variant = "vibrant",
  data,
  config: customConfig,
  series = [],
  xKey = "name",
  height = 220,
  className,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  valueFormatter,
  innerRadius = 50,
  outerRadius = 75,
  barSize,
}: ChartAppProps) {
  // Generate default color set based on variant
  const colors = React.useMemo(() => {
    if (variant === "purple") {
      return [
        CHART_PALETTES.purple.primary,
        CHART_PALETTES.purple.secondary,
        CHART_PALETTES.purple.accent,
        CHART_PALETTES.purple.tertiary,
      ];
    }
    if (variant === "blue") {
      return [
        CHART_PALETTES.blue.primary,
        CHART_PALETTES.blue.secondary,
        CHART_PALETTES.blue.accent,
        CHART_PALETTES.blue.tertiary,
      ];
    }
    if (variant === "yellow") {
      return [
        CHART_PALETTES.yellow.primary,
        CHART_PALETTES.yellow.secondary,
        CHART_PALETTES.yellow.accent,
        CHART_PALETTES.yellow.tertiary,
      ];
    }
    return Object.values(CHART_PALETTES.vibrant);
  }, [variant]);

  // Build ChartConfig if not passed explicitly
  const chartConfig = React.useMemo(() => {
    if (customConfig) return customConfig;
    const generated: ChartConfig = {};
    series.forEach((s, idx) => {
      generated[s.key] = {
        label: s.label,
        color: s.color || colors[idx % colors.length],
      };
    });
    return generated;
  }, [customConfig, series, colors]);

  const containerStyle = typeof height === "number" ? { height: `${height}px` } : { height };

  const renderChartContent = () => {
    switch (type) {
      case "area":
        return (
          <AreaChart data={data} margin={{ left: -15, right: 5, top: 10, bottom: 0 }}>
            <defs>
              {series.map((s, idx) => {
                const color = s.color || colors[idx % colors.length];
                return (
                  <linearGradient key={`grad-${s.key}`} id={`grad-${id || "chart"}-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={s.fillOpacity ?? 0.3} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.0} />
                  </linearGradient>
                );
              })}
            </defs>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-hairline-soft" />}
            <XAxis dataKey={xKey} tickLine={false} axisLine={false} className="text-[10px] font-mono fill-ink-secondary" />
            <YAxis tickLine={false} axisLine={false} className="text-[10px] font-mono fill-ink-secondary" tickFormatter={valueFormatter} />
            {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
            {showLegend && <ChartLegend content={<ChartLegendContent />} />}
            {series.map((s, idx) => {
              const color = s.color || colors[idx % colors.length];
              return (
                <Area
                  key={s.key}
                  type={s.type || "monotone"}
                  dataKey={s.key}
                  stroke={color}
                  strokeWidth={2}
                  fill={`url(#grad-${id || "chart"}-${s.key})`}
                />
              );
            })}
          </AreaChart>
        );

      case "bar": {
        const resolvedBarSize = barSize ?? (series.length <= 1 ? 32 : 12);
        return (
          <BarChart data={data} margin={{ left: -15, right: 5, top: 10, bottom: 0 }} barCategoryGap="20%">
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-hairline-soft" />}
            <XAxis dataKey={xKey} tickLine={false} axisLine={false} className="text-[10px] font-mono fill-ink-secondary" />
            <YAxis tickLine={false} axisLine={false} className="text-[10px] font-mono fill-ink-secondary" tickFormatter={valueFormatter} />
            {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
            {showLegend && <ChartLegend content={<ChartLegendContent />} />}
            {series.map((s, idx) => {
              const color = s.color || colors[idx % colors.length];
              const hasCustomFills = series.length === 1 && data.some((d) => d.fill || d.color);
              return (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  fill={color}
                  radius={[4, 4, 0, 0]}
                  barSize={s.barSize ?? resolvedBarSize}
                  maxBarSize={48}
                >
                  {hasCustomFills &&
                    data.map((entry, cellIdx) => (
                      <Cell
                        key={`cell-${cellIdx}`}
                        fill={entry.fill || entry.color || color}
                      />
                    ))}
                </Bar>
              );
            })}
          </BarChart>
        );
      }

      case "line":
        return (
          <LineChart data={data} margin={{ left: -15, right: 5, top: 10, bottom: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-hairline-soft" />}
            <XAxis dataKey={xKey} tickLine={false} axisLine={false} className="text-[10px] font-mono fill-ink-secondary" />
            <YAxis tickLine={false} axisLine={false} className="text-[10px] font-mono fill-ink-secondary" tickFormatter={valueFormatter} />
            {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
            {showLegend && <ChartLegend content={<ChartLegendContent />} />}
            {series.map((s, idx) => {
              const color = s.color || colors[idx % colors.length];
              return (
                <Line
                  key={s.key}
                  type={s.type || "monotone"}
                  dataKey={s.key}
                  stroke={color}
                  strokeWidth={2}
                  strokeDasharray={s.strokeDasharray}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
              );
            })}
          </LineChart>
        );

      case "pie":
        return (
          <PieChart>
            {showTooltip && <ChartTooltip content={<ChartTooltipContent hideLabel />} />}
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={3}
            >
              {data.map((entry, idx) => {
                const color = entry.fill || colors[idx % colors.length];
                return <Cell key={`cell-${idx}`} fill={color} />;
              })}
            </Pie>
            {showLegend && <ChartLegend content={<ChartLegendContent className="flex-wrap" />} />}
          </PieChart>
        );

      case "radar":
        return (
          <RadarChart data={data} margin={{ top: 15, bottom: 15, left: 15, right: 15 }}>
            <PolarGrid stroke="currentColor" className="text-hairline-soft/80" />
            <PolarAngleAxis
              dataKey={xKey}
              tick={{ fill: "currentColor", fontSize: 10 }}
              className="text-ink-secondary font-mono"
            />
            {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
            {series.map((s, idx) => {
              const color = s.color || colors[idx % colors.length];
              return (
                <Radar
                  key={s.key}
                  name={s.label}
                  dataKey={s.key}
                  stroke={color}
                  strokeWidth={2}
                  fill={color}
                  fillOpacity={s.fillOpacity ?? 0.35}
                  dot={{ r: 3, fill: color }}
                  activeDot={{ r: 5, fill: color }}
                />
              );
            })}
            {showLegend && <ChartLegend content={<ChartLegendContent className="pt-2" />} />}
          </RadarChart>
        );

      case "radial":
        return (
          <RadialBarChart innerRadius="30%" outerRadius="100%" barSize={10} data={data}>
            <RadialBar
              background={{ fill: "rgba(0,0,0,0.04)" }}
              dataKey="value"
              cornerRadius={6}
            />
            {showTooltip && <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />}
            {showLegend && <ChartLegend content={<ChartLegendContent className="flex-col items-start gap-1 text-[10px] pl-4" />} />}
          </RadialBarChart>
        );

      default:
        return null;
    }
  };

  return (
    <ChartContainer
      id={id}
      config={chartConfig}
      className={cn("w-full", className)}
      style={containerStyle}
    >
      {renderChartContent()}
    </ChartContainer>
  );
}
