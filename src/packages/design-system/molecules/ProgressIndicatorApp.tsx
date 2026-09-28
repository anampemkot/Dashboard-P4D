import * as React from "react";
import { cn } from "@/lib/utils";
import { TextApp } from "../atoms/TextApp";

export type ProgressIndicatorType = "linear" | "circular";
export type ProgressIndicatorMode = "determinate" | "indeterminate";
export type ProgressIndicatorColor = "purple" | "blue" | "yellow" | "success" | "error";
export type ProgressTrackColor = "soft" | "purple" | "blue" | "yellow";
export type ProgressIndicatorSize = "sm" | "md" | "lg";

export interface ProgressIndicatorAppProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  type?: ProgressIndicatorType;
  mode?: ProgressIndicatorMode;
  value?: number;
  max?: number;
  label?: React.ReactNode;
  showValue?: boolean;
  color?: ProgressIndicatorColor;
  trackColor?: ProgressTrackColor;
  size?: ProgressIndicatorSize;
}

const colors: Record<ProgressIndicatorColor, string> = {
  purple: "bg-vibrant-purple-dark text-vibrant-purple-dark",
  blue: "bg-vibrant-blue-ink text-vibrant-blue-ink",
  yellow: "bg-vibrant-yellow text-vibrant-yellow",
  success: "bg-success text-success",
  error: "bg-error text-error",
};

const linearSizes: Record<ProgressIndicatorSize, string> = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };
const circularSizes: Record<ProgressIndicatorSize, number> = { sm: 32, md: 48, lg: 64 };
const trackColors: Record<ProgressTrackColor, { className: string; value: string }> = {
  soft: { className: "bg-hairline-soft", value: "var(--color-border-hairline-soft)" },
  purple: { className: "bg-vibrant-purple/20", value: "color-mix(in srgb, var(--color-vibrant-purple) 20%, transparent)" },
  blue: { className: "bg-vibrant-blue/30", value: "color-mix(in srgb, var(--color-vibrant-blue) 30%, transparent)" },
  yellow: { className: "bg-vibrant-yellow/20", value: "color-mix(in srgb, var(--color-vibrant-yellow) 20%, transparent)" },
};

export function ProgressIndicatorApp({
  id,
  type = "linear",
  mode = "determinate",
  value = 0,
  max = 100,
  label,
  showValue = false,
  color = "purple",
  trackColor = "soft",
  size = "md",
  className,
  ...props
}: ProgressIndicatorAppProps) {
  const percentage = Math.min(100, Math.max(0, max > 0 ? (value / max) * 100 : 0));
  const valueLabel = `${Math.round(percentage)}%`;

  if (type === "circular") {
    const dimension = circularSizes[size];
    const strokeWidth = size === "sm" ? 3 : size === "lg" ? 6 : 4;
    const radius = (dimension - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    return (
      <div id={id} data-ui-id={id} className={cn("inline-flex flex-col items-center gap-2", className)} {...props}>
        <div
          className="relative inline-flex items-center justify-center"
          role="progressbar"
          aria-valuemin={mode === "determinate" ? 0 : undefined}
          aria-valuemax={mode === "determinate" ? max : undefined}
          aria-valuenow={mode === "determinate" ? value : undefined}
          aria-label={typeof label === "string" ? label : "Loading progress"}
        >
          <svg width={dimension} height={dimension} viewBox={`0 0 ${dimension} ${dimension}`} className={cn(mode === "indeterminate" && "animate-spin motion-reduce:animate-none")}>
            <circle cx={dimension / 2} cy={dimension / 2} r={radius} fill="none" stroke={trackColors[trackColor].value} strokeWidth={strokeWidth} />
            <circle
              cx={dimension / 2}
              cy={dimension / 2}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={mode === "indeterminate" ? `${circumference * 0.28} ${circumference}` : circumference}
              strokeDashoffset={mode === "indeterminate" ? 0 : circumference * (1 - percentage / 100)}
              transform={`rotate(-90 ${dimension / 2} ${dimension / 2})`}
              className={cn(colors[color].split(" ")[1], "transition-[stroke-dashoffset] duration-300")}
            />
          </svg>
          {showValue && mode === "determinate" && <span className="absolute text-[10px] font-bold font-mono text-ink">{valueLabel}</span>}
        </div>
        {label && <TextApp id={`${id}-label`} variant="caption" className="text-center text-ink-secondary">{label}</TextApp>}
      </div>
    );
  }

  return (
    <div id={id} data-ui-id={id} className={cn("w-full space-y-2", className)} {...props}>
      {(label || showValue) && (
        <div className="flex min-w-0 items-center justify-between gap-3">
          {label && <TextApp id={`${id}-label`} variant="caption" className="min-w-0 truncate text-ink-secondary">{label}</TextApp>}
          {showValue && mode === "determinate" && <span className="shrink-0 text-xs font-bold font-mono text-ink">{valueLabel}</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuemin={mode === "determinate" ? 0 : undefined}
        aria-valuemax={mode === "determinate" ? max : undefined}
        aria-valuenow={mode === "determinate" ? value : undefined}
        aria-label={typeof label === "string" ? label : "Loading progress"}
        className={cn("relative w-full overflow-hidden rounded-full", trackColors[trackColor].className, linearSizes[size])}
      >
        <span
          className={cn(
            "absolute inset-y-0 left-0 rounded-full transition-[width] duration-300",
            colors[color].split(" ")[0],
            mode === "indeterminate" && "w-1/3 animate-[progress-indeterminate_1.4s_ease-in-out_infinite] motion-reduce:animate-pulse"
          )}
          style={mode === "determinate" ? { width: `${percentage}%` } : undefined}
        />
      </div>
    </div>
  );
}
