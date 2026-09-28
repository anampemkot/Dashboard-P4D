import * as React from "react";
import { cn } from "@/lib/utils";
import { Info, TrendingUp, TrendingDown, Minus } from "lucide-react";

export type ScorecardVariant =
  | "default"
  | "purple"
  | "blue"
  | "yellow"
  | "emerald"
  | "rose"
  | "cyan"
  | "alert"
  | "clay"
  | "clayPurple"
  | "clayYellow"
  | "clayBlue"
  | "clayEmerald"
  | "playful"
  | "minimalist";

export type ScorecardLayout = "vertical" | "horizontal" | "minimalist";

export type ScorecardStatus = "normal" | "warning" | "danger" | "success";

export interface ScorecardTrend {
  value: string | number;
  label?: string;
  isPositive?: boolean;
  direction?: "up" | "down" | "neutral";
}

export interface ScorecardProgress {
  value: number;
  max?: number;
  label?: string;
  color?: string;
}

export interface ScorecardAppProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  icon?: React.ReactNode;
  trend?: ScorecardTrend;
  variant?: ScorecardVariant;
  layout?: ScorecardLayout;
  status?: ScorecardStatus;
  badge?: React.ReactNode | string;
  infoTooltip?: string;
  onInfoClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  progress?: ScorecardProgress;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

export function ScorecardApp({
  id,
  title,
  value,
  unit,
  description,
  icon,
  trend,
  variant = "default",
  layout = "vertical",
  status = "normal",
  badge,
  infoTooltip,
  onInfoClick,
  progress,
  onClick,
  className,
  ...props
}: ScorecardAppProps) {
  // Variant styles with dark mode border matching each color variant
  const isClayPurple = variant === "clayPurple";
  const isClayYellow = variant === "clayYellow";
  const isClayBlue = variant === "clayBlue";
  const isClayEmerald = variant === "clayEmerald";
  const isColoredClay = isClayPurple || isClayYellow || isClayBlue || isClayEmerald;

  const getVariantStyles = () => {
    switch (variant) {
      case "purple":
        return "bg-vibrant-purple/10 border-vibrant-purple/30 dark:border-vibrant-purple/60 text-ink shadow-xs";
      case "blue":
        return "bg-vibrant-blue/10 border-vibrant-blue/30 dark:border-vibrant-blue/60 text-ink shadow-xs";
      case "yellow":
        return "bg-vibrant-yellow/10 border-vibrant-yellow/30 dark:border-vibrant-yellow/60 text-ink shadow-xs";
      case "emerald":
        return "bg-emerald-500/10 border-emerald-500/30 dark:border-emerald-500/60 text-ink shadow-xs dark:bg-emerald-950/20";
      case "rose":
      case "alert":
        return "bg-rose-500/10 border-rose-500/30 dark:border-rose-500/60 text-ink shadow-xs dark:bg-rose-950/20";
      case "cyan":
        return "bg-cyan-500/10 border-cyan-500/30 dark:border-cyan-500/60 text-ink shadow-xs dark:bg-cyan-950/20";
      case "clay":
        return "clay-card text-ink border-vibrant-purple/20 dark:border-vibrant-purple/50 shadow-xs";
      case "clayPurple":
        return "clay-card clay-card-purple text-white border-transparent shadow-lg";
      case "clayYellow":
        return "clay-card clay-card-yellow text-[#5c4300] dark:text-amber-100 border-transparent shadow-lg";
      case "clayBlue":
        return "clay-card clay-card-blue text-[#1e3a8a] dark:text-blue-100 border-transparent shadow-lg";
      case "clayEmerald":
        return "clay-card clay-card-emerald text-white border-transparent shadow-lg";
      case "playful":
        return "bg-surface text-ink border-2 border-hairline-soft dark:border-vibrant-purple/60 shadow-vibrant-heavy font-display";
      case "default":
      default:
        return "bg-surface text-ink border-hairline-soft dark:border-hairline shadow-xs";
    }
  };

  // Title text color class
  const titleColorClass = isClayPurple || isClayEmerald
    ? "text-white font-bold"
    : isClayYellow
    ? "text-[#5c4300] dark:text-amber-200 font-bold"
    : isClayBlue
    ? "text-[#1e3a8a] dark:text-blue-100 font-bold"
    : "text-ink-secondary";

  // Value text color class
  const valueColorClass = isClayPurple || isClayEmerald
    ? "text-white"
    : isClayYellow
    ? "text-[#261a00] dark:text-amber-100"
    : isClayBlue
    ? "text-[#1e3a8a] dark:text-blue-50"
    : "text-ink";

  // Unit text color class
  const unitColorClass = isClayPurple || isClayEmerald
    ? "text-white/80"
    : isClayYellow
    ? "text-[#5c4300]/90 dark:text-amber-200/90"
    : isClayBlue
    ? "text-[#1e3a8a]/80 dark:text-blue-200"
    : "text-ink-muted";

  // Description text color class
  const descColorClass = isClayPurple || isClayEmerald
    ? "text-white/90"
    : isClayYellow
    ? "text-[#5c4300]/90 dark:text-amber-200/90"
    : isClayBlue
    ? "text-[#1e3a8a]/85 dark:text-blue-200"
    : "text-ink-secondary";

  // Icon container class
  const iconContainerClass = isClayPurple || isClayEmerald
    ? "p-3 rounded-2xl bg-white/20 backdrop-blur-md text-white shrink-0"
    : isClayYellow
    ? "p-3 rounded-2xl bg-black/10 dark:bg-amber-900/40 text-[#5c4300] dark:text-amber-200 shrink-0"
    : isClayBlue
    ? "p-3 rounded-2xl bg-white/40 dark:bg-blue-900/40 text-[#1e3a8a] dark:text-blue-100 shrink-0"
    : "p-2 rounded-xl bg-vibrant-purple/10 text-vibrant-purple-dark shrink-0";

  // Badge class
  const badgeClass = isClayPurple || isClayEmerald
    ? "px-3 py-1 text-xs font-semibold font-mono bg-white/20 text-white border border-white/20 rounded-full"
    : isClayYellow
    ? "px-3 py-1 text-xs font-semibold font-mono bg-black/10 dark:bg-amber-900/40 text-[#5c4300] dark:text-amber-200 border border-black/10 dark:border-amber-700/40 rounded-full"
    : isClayBlue
    ? "px-3 py-1 text-xs font-semibold font-mono bg-white/40 dark:bg-blue-900/40 text-[#1e3a8a] dark:text-blue-100 border border-white/30 rounded-full"
    : "px-2 py-0.5 text-[9px] font-bold font-mono uppercase bg-vibrant-purple/10 text-vibrant-purple-dark border border-vibrant-purple/20 rounded-full";

  // Determine trend icon & color
  const renderTrend = () => {
    if (!trend) return null;

    let dir = trend.direction;
    if (!dir) {
      if (typeof trend.value === "number") {
        dir = trend.value > 0 ? "up" : trend.value < 0 ? "down" : "neutral";
      } else if (typeof trend.value === "string") {
        if (trend.value.startsWith("+")) dir = "up";
        else if (trend.value.startsWith("-")) dir = "down";
        else dir = "neutral";
      }
    }

    const isPositive = trend.isPositive ?? dir === "up";

    let trendBadgeClass = "bg-vibrant-grey-bg text-ink-secondary border-hairline";
    let IconComponent = Minus;

    if (dir === "up") {
      trendBadgeClass = isPositive
        ? isClayPurple || isClayEmerald
          ? "bg-white/20 text-white border-white/30"
          : isClayYellow
          ? "bg-black/10 dark:bg-amber-900/40 text-[#5c4300] dark:text-amber-200 border-black/10 dark:border-amber-700/40"
          : isClayBlue
          ? "bg-white/40 dark:bg-blue-900/40 text-[#1e3a8a] dark:text-blue-100 border-white/30 dark:border-blue-700/40"
          : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60"
        : isClayPurple || isClayEmerald
        ? "bg-rose-500/30 text-white border-rose-400/40"
        : isClayYellow
        ? "bg-rose-500/15 text-rose-900 border-rose-400/30 dark:bg-rose-950/70 dark:text-rose-200 dark:border-rose-700/60"
        : isClayBlue
        ? "bg-rose-500/15 text-rose-900 border-rose-400/30 dark:bg-rose-950/70 dark:text-rose-200 dark:border-rose-700/60"
        : "bg-rose-50 text-rose-700 border-rose-200/90 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800/60";
      IconComponent = TrendingUp;
    } else if (dir === "down") {
      trendBadgeClass = isPositive
        ? isClayPurple || isClayEmerald
          ? "bg-white/20 text-white border-white/30"
          : isClayYellow
          ? "bg-black/10 dark:bg-amber-900/40 text-[#5c4300] dark:text-amber-200 border-black/10 dark:border-amber-700/40"
          : isClayBlue
          ? "bg-white/40 dark:bg-blue-900/40 text-[#1e3a8a] dark:text-blue-100 border-white/30 dark:border-blue-700/40"
          : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60"
        : isClayPurple || isClayEmerald
        ? "bg-rose-500/30 text-white border-rose-400/40"
        : isClayYellow
        ? "bg-rose-500/15 text-rose-900 border-rose-400/30 dark:bg-rose-950/70 dark:text-rose-200 dark:border-rose-700/60"
        : isClayBlue
        ? "bg-rose-500/15 text-rose-900 border-rose-400/30 dark:bg-rose-950/70 dark:text-rose-200 dark:border-rose-700/60"
        : "bg-rose-50 text-rose-700 border-rose-200/90 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800/60";
      IconComponent = TrendingDown;
    }

    const trendLabelClass = isClayPurple || isClayEmerald
      ? "text-white/90"
      : isClayYellow
      ? "text-[#5c4300]/90 dark:text-amber-200/90"
      : isClayBlue
      ? "text-[#1e3a8a]/90 dark:text-blue-200"
      : "text-ink-muted";

    return (
      <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
        <span
          className={cn(
            "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold font-mono border",
            trendBadgeClass
          )}
        >
          <IconComponent className="w-3.5 h-3.5 shrink-0" />
          <span>{trend.value}</span>
        </span>
        {trend.label && (
          <span className={cn("text-xs font-medium", trendLabelClass)}>
            {trend.label}
          </span>
        )}
      </div>
    );
  };

  // Minimalist / Horizontal Layout Render
  if (layout === "horizontal" || layout === "minimalist" || variant === "minimalist") {
    return (
      <div
        id={id}
        data-ui-id={id}
        onClick={onClick}
        className={cn(
          "relative p-5 rounded-card-custom border transition-all flex items-center gap-4 text-left h-full overflow-hidden",
          getVariantStyles(),
          onClick && "cursor-pointer hover:border-vibrant-purple/40 hover:shadow-md active:scale-[0.99]",
          className
        )}
        {...props}
      >
        {/* Left Icon Container */}
        {icon && (
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-xs relative z-10",
              isClayPurple || isClayEmerald
                ? "bg-white/20 text-white"
                : isClayYellow
                ? "bg-black/10 text-[#5c4300]"
                : isClayBlue
                ? "bg-white/40 dark:bg-blue-900/40 text-[#1e3a8a] dark:text-blue-100"
                : "bg-vibrant-purple/15 text-vibrant-purple-dark dark:bg-vibrant-purple/25 dark:text-vibrant-purple-light"
            )}
          >
            {icon}
          </div>
        )}

        {/* Right Content */}
        <div className="flex-1 min-w-0 relative z-10">
          <div className="flex items-center justify-between gap-1.5 w-full min-w-0 overflow-hidden">
            <span
              className={cn("text-xs font-semibold uppercase tracking-wider line-clamp-2 leading-tight min-w-0 flex-1 break-words", titleColorClass)}
              title={typeof title === "string" ? title : undefined}
            >
              {title}
            </span>
            {badge && (
              typeof badge === "string" ? (
                <span className={cn(badgeClass, "truncate max-w-[90px] sm:max-w-[130px] shrink-0 inline-block")} title={badge}>{badge}</span>
              ) : (
                badge
              )
            )}
          </div>

          <div className="flex items-baseline gap-1.5 flex-wrap mt-0.5">
            <span className={cn("text-xl sm:text-2xl font-bold font-display tracking-tight leading-snug", valueColorClass)}>
              {value}
            </span>
            {unit && (
              <span className={cn("text-xs font-mono font-medium", unitColorClass)}>
                {unit}
              </span>
            )}
          </div>

          {description && (
            <p className={cn("text-[11px] font-medium leading-tight mt-0.5 truncate", descColorClass)}>
              {description}
            </p>
          )}

          {renderTrend()}
        </div>

        {/* Decorative blur element */}
        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-vibrant-purple/5 rounded-full blur-xl pointer-events-none" />
      </div>
    );
  }

  return (
    <div
      id={id}
      data-ui-id={id}
      onClick={onClick}
      className={cn(
        "relative py-6 px-5 rounded-card-custom border transition-all flex flex-col justify-between gap-4 text-left h-full",
        getVariantStyles(),
        onClick && "cursor-pointer hover:border-vibrant-purple/40 hover:shadow-md active:scale-[0.99]",
        className
      )}
      {...props}
    >
      {/* HEADER ROW: Title, Info Icon, Icon/Badge */}
      <div className="flex items-center justify-between gap-2 w-full min-w-0">
        {/* Left Side: Title & Info Icon */}
        <div className="flex items-center gap-1.5 min-w-0 flex-1 pr-0.5">
          <span
            className={cn("text-xs font-bold font-display uppercase tracking-wider line-clamp-2 leading-tight min-w-0 flex-1 break-words", titleColorClass)}
            title={typeof title === "string" ? title : undefined}
          >
            {title}
          </span>

          {/* Info Icon with Tooltip & Click Event */}
          {(infoTooltip || onInfoClick) && (
            <div className="relative group inline-flex items-center justify-center shrink-0">
              <button
                type="button"
                id={`${id}-info-btn`}
                onClick={(e) => {
                  e.stopPropagation();
                  onInfoClick?.(e);
                }}
                className={cn(
                  "p-1 rounded-full transition-all duration-150 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer shrink-0",
                  isClayPurple || isClayEmerald
                    ? "text-white/70 hover:text-white hover:bg-white/20 focus:ring-white/50 focus:ring-offset-transparent"
                    : isClayYellow
                    ? "text-[#5c4300]/80 hover:text-[#261a00] hover:bg-[#5c4300]/15 focus:ring-[#5c4300]/50 focus:ring-offset-transparent"
                    : isClayBlue
                    ? "text-[#1e3a8a]/80 hover:text-[#1e3a8a] dark:text-blue-200 hover:bg-black/10 dark:hover:bg-white/15 focus:ring-[#1e3a8a]/50 focus:ring-offset-transparent"
                    : "text-ink-muted hover:text-vibrant-purple-dark hover:bg-vibrant-purple/10 focus:ring-vibrant-purple/40"
                )}
                title={infoTooltip || "Informasi Metrik"}
                aria-label={`Info ${title}`}
              >
                <Info className="w-3.5 h-3.5 shrink-0" />
              </button>

              {infoTooltip && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 hidden group-hover:block bg-zinc-900 text-white text-[10px] p-2.5 rounded-lg shadow-xl font-sans font-medium text-center z-50 pointer-events-none transition-all border border-white/10">
                  {infoTooltip}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-zinc-900" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right side: Badge or Icon */}
        {(badge || icon) && (
          <div className="flex items-center gap-1.5 shrink-0 ml-auto">
            {badge && (
              typeof badge === "string" ? (
                <span className={cn(badgeClass, "truncate max-w-[100px] sm:max-w-[140px] inline-flex items-center justify-center shrink-0")} title={badge}>
                  {badge}
                </span>
              ) : (
                badge
              )
            )}

            {icon && (
              <div className={cn(iconContainerClass, "shrink-0 flex items-center justify-center")}>
                {icon}
              </div>
            )}
          </div>
        )}
      </div>

      {/* VALUE & UNIT */}
      <div className="space-y-1">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className={cn("text-2xl sm:text-3xl font-black font-display tracking-tight leading-none", valueColorClass)}>
            {value}
          </span>
          {unit && (
            <span className={cn("text-xs font-bold font-mono", unitColorClass)}>
              {unit}
            </span>
          )}
        </div>

        {description && (
          <p className={cn("text-[11px] font-medium leading-snug", descColorClass)}>
            {description}
          </p>
        )}
      </div>

      {/* TREND OR PROGRESS FOOTER */}
      {(trend || progress) && (
        <div className={cn(
          "pt-3 border-t space-y-2.5",
          isClayPurple || isClayEmerald
            ? "border-white/20"
            : isClayYellow
            ? "border-black/10"
            : "border-hairline-soft/80"
        )}>
          {renderTrend()}

          {progress && (
            <div className="space-y-1.5 pt-1">
              {progress.label && (
                <div className={cn("flex items-center justify-between text-xs font-mono", titleColorClass)}>
                  <span>{progress.label}</span>
                  <span className="font-bold">{Math.round((progress.value / (progress.max || 100)) * 100)}%</span>
                </div>
              )}
              <div className={cn(
                "w-full h-2.5 rounded-full overflow-hidden border",
                isClayPurple || isClayEmerald
                  ? "bg-white/20 border-white/30"
                  : isClayYellow
                  ? "bg-black/10 border-black/10"
                  : "bg-vibrant-grey-bg border-hairline-soft"
              )}>
                <div
                  className="h-full transition-all duration-500 rounded-full"
                  style={{
                    width: `${Math.min(100, Math.max(0, (progress.value / (progress.max || 100)) * 100))}%`,
                    backgroundColor: progress.color || (isClayPurple || isClayEmerald ? "#ffffff" : isClayYellow ? "#261a00" : "#674bb5"),
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
