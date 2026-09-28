import * as React from "react";
import { cn } from "@/lib/utils";

export type ScreenReaderTextTag = "span" | "div" | "p";

export interface ScreenReaderTextAppProps {
  id: string;
  as?: ScreenReaderTextTag;
  children: React.ReactNode;
  ariaLabel?: string;
  focusable?: boolean;
  className?: string;
}

export function ScreenReaderTextApp({
  id,
  as = "span",
  children,
  ariaLabel,
  focusable = false,
  className,
}: ScreenReaderTextAppProps) {
  const Tag = as as React.ElementType;

  return (
    <Tag
      id={id}
      data-ui-id={id}
      aria-label={ariaLabel}
      tabIndex={focusable ? 0 : undefined}
      className={cn(
        focusable
          ? "sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded-[var(--radius-sm)] focus:border focus:border-hairline focus:bg-surface focus:px-3 focus:py-1.5 focus:text-xs focus:font-semibold focus:text-ink focus:shadow-vibrant-soft focus:outline-none focus-visible:focus:ring-[2px] focus-visible:focus:ring-vibrant-purple-dark"
          : "sr-only",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export const VisuallyHiddenApp = ScreenReaderTextApp;
