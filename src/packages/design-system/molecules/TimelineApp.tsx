import * as React from "react";
import { cn } from "@/lib/utils";
import { TextApp } from "../atoms/TextApp";

export type TimelineOrientation = "vertical" | "horizontal";
export type TimelineAlignment = "left" | "right" | "alternating";
export type TimelineConnector = "solid" | "dashed";
export type TimelineIndicator = "dot" | "icon";
export type TimelineSize = "sm" | "md" | "lg";
export type TimelineStatus = "default" | "active" | "completed" | "success" | "warning" | "error" | "info";

export interface TimelineItem {
  id: string;
  timestamp?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  metadata?: React.ReactNode;
  icon?: React.ReactNode;
  status?: TimelineStatus;
  disabled?: boolean;
}

export interface TimelineAppProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  items: TimelineItem[];
  orientation?: TimelineOrientation;
  alignment?: TimelineAlignment;
  connector?: TimelineConnector;
  indicator?: TimelineIndicator;
  size?: TimelineSize;
  onItemClick?: (item: TimelineItem, index: number) => void;
}

const indicatorSizes: Record<TimelineSize, string> = {
  sm: "h-5 w-5",
  md: "h-7 w-7",
  lg: "h-9 w-9",
};

const dotSizes: Record<TimelineSize, string> = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-2.5 w-2.5",
};

const iconSizes: Record<TimelineSize, string> = {
  sm: "[&_svg]:h-3 [&_svg]:w-3",
  md: "[&_svg]:h-3.5 [&_svg]:w-3.5",
  lg: "[&_svg]:h-4.5 [&_svg]:w-4.5",
};

const horizontalRailPosition: Record<TimelineSize, string> = {
  sm: "left-24 right-24 top-2.5",
  md: "left-24 right-24 top-3.5",
  lg: "left-28 right-28 top-4.5",
};

const alternatingRailPosition: Record<TimelineSize, string> = {
  sm: "left-2.5 top-2.5 bottom-[34px] md:left-1/2",
  md: "left-3.5 top-3.5 bottom-[38px] md:left-1/2",
  lg: "left-4.5 top-4.5 bottom-[42px] md:left-1/2",
};

const statusClasses: Record<TimelineStatus, string> = {
  default: "border-hairline-hard bg-surface text-ink-secondary",
  active: "border-vibrant-purple-dark bg-vibrant-purple-dark text-white ring-4 ring-vibrant-purple/20",
  completed: "border-success bg-success text-white",
  success: "border-success bg-success text-white",
  warning: "border-warning bg-vibrant-yellow text-vibrant-yellow-ink",
  error: "border-error bg-error text-white",
  info: "border-info bg-info text-white",
};

const connectorStatusClasses: Record<TimelineStatus, string> = {
  default: "border-hairline-hard bg-hairline-hard",
  active: "border-vibrant-purple-dark bg-vibrant-purple-dark",
  completed: "border-success bg-success",
  success: "border-success bg-success",
  warning: "border-warning bg-warning",
  error: "border-error bg-error",
  info: "border-info bg-info",
};

export function TimelineApp({
  id,
  items,
  orientation = "vertical",
  alignment = "left",
  connector = "solid",
  indicator = "dot",
  size = "md",
  onItemClick,
  className,
  ...props
}: TimelineAppProps) {
  const renderIndicator = (item: TimelineItem) => {
    const status = item.status ?? "default";
    return (
      <span
        className={cn(
          "relative z-10 inline-flex shrink-0 items-center justify-center rounded-full border transition-colors",
          indicatorSizes[size],
          statusClasses[status],
          indicator === "icon" && iconSizes[size],
          item.disabled && "opacity-50"
        )}
        aria-hidden="true"
      >
        {indicator === "icon" && item.icon ? item.icon : <span className={cn("rounded-full bg-current", dotSizes[size])} />}
      </span>
    );
  };

  const renderContent = (item: TimelineItem, index: number, placement: "left" | "right" | "center") => {
    const clickable = Boolean(onItemClick) && !item.disabled;
    return (
      <div
        className={cn(
          "min-w-0 space-y-1 rounded-lg border border-hairline-soft bg-surface p-3 shadow-vibrant-soft transition-colors",
          clickable && "cursor-pointer hover:border-vibrant-purple/40 hover:bg-surface-soft",
          item.disabled && "opacity-50",
          placement === "left" && "text-right",
          placement === "right" && "text-left",
          placement === "center" && "text-center"
        )}
        onClick={() => clickable && onItemClick?.(item, index)}
        onKeyDown={(event) => {
          if (clickable && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            onItemClick?.(item, index);
          }
        }}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        aria-disabled={item.disabled || undefined}
      >
        {item.timestamp && (
          <TextApp id={`${id}-${item.id}-time`} variant="micro" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider">
            {item.timestamp}
          </TextApp>
        )}
        <TextApp id={`${id}-${item.id}-title`} variant="body2" weight="bold" className="text-ink leading-tight break-words">
          {item.title}
        </TextApp>
        {item.description && (
          <TextApp id={`${id}-${item.id}-description`} variant="caption" className="text-ink-secondary leading-relaxed break-words">
            {item.description}
          </TextApp>
        )}
        {item.metadata && (
          <div className="pt-1 text-[11px] text-ink-muted">{item.metadata}</div>
        )}
      </div>
    );
  };

  if (orientation === "horizontal") {
    return (
      <div id={id} data-ui-id={id} className={cn("w-full overflow-x-auto pb-2", className)} {...props}>
        <div className="relative flex min-w-max items-start px-2">
          <span
            aria-hidden="true"
            className={cn(
              "absolute z-0",
              horizontalRailPosition[size],
              connector === "dashed"
                ? "border-t border-dashed border-hairline-hard"
                : "h-px bg-hairline-hard"
            )}
          />
          {items.map((item, index) => {
            return (
              <div key={item.id} className={cn("relative flex w-48 shrink-0 flex-col items-center", size === "lg" && "w-56")}>
                  <div className="flex w-full items-center justify-center">
                    {renderIndicator(item)}
                  </div>
                  <div className="mt-3 w-full px-2">{renderContent(item, index, "center")}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (alignment === "alternating") {
    return (
      <div id={id} data-ui-id={id} className={cn("relative w-full", className)} {...props}>
        <span
          aria-hidden="true"
          className={cn(
            "absolute z-0 -translate-x-1/2",
            alternatingRailPosition[size],
            connector === "dashed"
              ? "border-l border-dashed border-hairline-hard"
              : "w-px bg-hairline-hard"
          )}
        />
        {items.map((item, index) => {
          const placeLeft = index % 2 === 0;
          return (
            <div key={item.id} className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-x-4">
              <div className={cn("hidden pb-6 md:block", !placeLeft && "md:col-start-3")}>
                {placeLeft && renderContent(item, index, "left")}
              </div>
              <div className="col-start-1 row-start-1 flex flex-col items-center md:col-start-2">
                {renderIndicator(item)}
              </div>
              <div className="col-start-2 row-start-1 pb-6 md:col-start-3">
                <div className={cn(placeLeft && "md:hidden")}>
                  {renderContent(item, index, "right")}
                </div>
                {!placeLeft && renderContent(item, index, "right")}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const lineOnRight = alignment === "right";
  return (
    <div id={id} data-ui-id={id} className={cn("w-full", className)} {...props}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const status = item.status ?? "default";
        const indicatorColumn = (
          <div className="flex flex-col items-center">
            {renderIndicator(item)}
            {!isLast && (
              <span
                className={cn(
                  "min-h-10 flex-1",
                  connector === "dashed"
                    ? cn("border-l border-dashed", connectorStatusClasses[status].split(" ")[0])
                    : cn("w-px", connectorStatusClasses[status])
                )}
              />
            )}
          </div>
        );
        return (
          <div key={item.id} className="flex items-stretch gap-3">
            {lineOnRight ? (
              <>
                <div className="min-w-0 flex-1 pb-6">{renderContent(item, index, "left")}</div>
                {indicatorColumn}
              </>
            ) : (
              <>
                {indicatorColumn}
                <div className="min-w-0 flex-1 pb-6">{renderContent(item, index, "right")}</div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
