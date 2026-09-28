import * as React from "react";
import { cn } from "@/lib/utils";
import { TabsApp, type TabItem } from "../organisms/TabsApp";
import { DatePickerApp, type DateRangeValue } from "./DatePickerApp";

export interface ChartToolbarYearOption {
  value: string;
  label: string;
  /** Matched against the series rendered for this year — reuse the same color passed to ChartApp's `series[].color`. */
  color: string;
}

export interface ChartToolbarLegendItem {
  label: string;
  value: string;
  color: string;
}

export interface ChartToolbarAppProps {
  id: string;
  /** Summary row above the controls — e.g. TARGET/REALISASI/CAPAIAN with their current values. */
  legend?: ChartToolbarLegendItem[];
  /** Multi-select year toggle chips — omit for charts that aren't year-comparison. */
  years?: ChartToolbarYearOption[];
  selectedYears?: string[];
  onYearsChange?: (years: string[]) => void;
  /** Period tabs that swap the chart's visualization/aggregation (e.g. Performance/Quarter/YoY/QoQ/MoM) — the card stays one CardApp, only the chart underneath changes per selection. */
  periods?: TabItem[];
  selectedPeriod?: string;
  onPeriodChange?: (id: string) => void;
  dateRange?: DateRangeValue;
  onDateRangeChange?: (range: DateRangeValue) => void;
  className?: string;
}

/**
 * Presentational toolbar for a "chart card" that supports more than one way
 * of slicing the same data — year comparison chips, a period switcher
 * (Performance/Quarter/YoY/QoQ/MoM-style), and a date range — all inside a
 * single CardApp instead of one card per view. This component only emits
 * selection changes; picking which ChartApp series/data to render for a
 * given period is the consuming page's business logic, not a design-system
 * concern (aggregation rules differ per metric).
 */
export function ChartToolbarApp({
  id,
  legend,
  years,
  selectedYears = [],
  onYearsChange,
  periods,
  selectedPeriod,
  onPeriodChange,
  dateRange,
  onDateRangeChange,
  className,
}: ChartToolbarAppProps) {
  const toggleYear = (value: string) => {
    if (!onYearsChange) return;
    const next = selectedYears.includes(value)
      ? selectedYears.filter((y) => y !== value)
      : [...selectedYears, value];
    onYearsChange(next);
  };

  return (
    <div id={id} data-ui-id={id} className={cn("flex flex-col gap-3 min-w-0", className)}>
      {legend && legend.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
          {legend.map((item, index) => (
            <div key={`${id}-legend-${index}`} className="flex items-center gap-1.5">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="font-semibold uppercase tracking-wide text-ink-muted">{item.label}</span>
              <span className="font-bold font-mono text-ink">{item.value}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 min-w-0">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          {years && years.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {years.map((year) => {
                const active = selectedYears.includes(year.value);
                return (
                  <button
                    key={year.value}
                    type="button"
                    id={`${id}-year-${year.value}`}
                    onClick={() => toggleYear(year.value)}
                    aria-pressed={active}
                    className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors"
                    style={{
                      borderColor: active ? year.color : "var(--color-hairline)",
                      backgroundColor: active ? `color-mix(in srgb, ${year.color} 14%, transparent)` : "transparent",
                      color: active ? year.color : "var(--color-ink-muted)",
                    }}
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: year.color }} />
                    {year.label}
                  </button>
                );
              })}
            </div>
          )}

          {periods && periods.length > 0 && (
            <TabsApp
              id={`${id}-periods`}
              variant="pills"
              rounded="full"
              size="sm"
              items={periods}
              value={selectedPeriod}
              onValueChange={onPeriodChange}
              className="w-auto"
              listClassName="w-auto"
            />
          )}
        </div>

        {onDateRangeChange && (
          <DatePickerApp
            id={`${id}-date-range`}
            mode="range"
            size="sm"
            rangeValue={dateRange}
            onRangeChange={onDateRangeChange}
            format="DD MMMM YYYY"
            className="w-auto min-w-[220px]"
          />
        )}
      </div>
    </div>
  );
}
