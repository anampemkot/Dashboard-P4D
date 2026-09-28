import * as React from "react";
import { cn } from "@/lib/utils";
import { focusRingRingColorClass } from "../tokens/focusRing";

export type FocusRingVariant = "default" | "custom";
export type FocusRingColor =
  | "purple"
  | "blue"
  | "yellow"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "ink";
export type FocusRingOffset = 0 | 2 | 4;
export type FocusRingWidth = 1 | 2 | 3;

// The 4 semantic colors (success/warning/error/info) delegate to the shared
// project-wide token map so this atom always matches InputApp/SelectApp/etc.
// exactly. purple/blue/yellow/ink are extra decorative-only options unique to
// this atom, not tied to a component "variant" state.
const colorRingClasses: Record<FocusRingColor, string> = {
  purple: focusRingRingColorClass.default,
  blue: "ring-vibrant-blue-ink",
  yellow: "ring-vibrant-yellow-ink",
  success: focusRingRingColorClass.success,
  warning: focusRingRingColorClass.warning,
  error: focusRingRingColorClass.error,
  info: focusRingRingColorClass.info,
  ink: "ring-ink",
};

const offsetClasses: Record<FocusRingOffset, string> = {
  0: "ring-offset-0",
  2: "ring-offset-2",
  4: "ring-offset-4",
};

const widthClasses: Record<FocusRingWidth, string> = {
  1: "ring-[1px]",
  2: "ring-[2px]",
  3: "ring-[3px]",
};

export interface FocusRingAppProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  id: string;
  variant?: FocusRingVariant;
  color?: FocusRingColor;
  offset?: FocusRingOffset;
  width?: FocusRingWidth;
}

export function FocusRingApp({
  id,
  variant = "default",
  color = "purple",
  offset = 2,
  width = 2,
  className,
  children,
  type = "button",
  onFocus,
  onBlur,
  onMouseDown,
  ...props
}: FocusRingAppProps) {
  const isCustom = variant === "custom";
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <button
      id={id}
      data-ui-id={id}
      type={type}
      // Clicking a <button> doesn't always move focus to it (e.g. Safari/Firefox on
      // macOS by default), so force it here to keep the ring demo reliable on click.
      onMouseDown={(event) => {
        event.currentTarget.focus();
        onMouseDown?.(event);
      }}
      onFocus={(event) => {
        setIsFocused(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setIsFocused(false);
        onBlur?.(event);
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-hairline bg-surface px-4 py-2 text-sm font-semibold text-ink shadow-2xs outline-none ring-offset-surface transition-shadow",
        // Default mirrors the app-wide focus ring color (ButtonApp/InputApp use
        // vibrant-purple-dark), so this atom looks consistent with the rest of the kit.
        isFocused && colorRingClasses[isCustom ? color : "purple"],
        isFocused && (isCustom ? offsetClasses[offset] : offsetClasses[2]),
        isFocused && (isCustom ? widthClasses[width] : widthClasses[2]),
        className
      )}
      {...props}
    >
      {children ?? "Klik atau Tab ke sini"}
    </button>
  );
}
