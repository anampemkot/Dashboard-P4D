import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * SPACING SCALE (8px Base Grid with 4px Sub-steps)
 * 0  = 0px
 * 0.5= 2px
 * 1  = 4px  (0.25rem)
 * 1.5= 6px  (--space-xs)
 * 2  = 8px  (0.5rem)
 * 3  = 12px (0.75rem)
 * 4  = 16px (1rem, --space-sm)
 * 5  = 20px (1.25rem)
 * 6  = 24px (1.5rem, --space-md)
 * 8  = 32px (2rem)
 * 10 = 40px (2.5rem, --space-lg)
 * 12 = 48px (3rem)
 * 16 = 64px (4rem)
 * 20 = 80px (5rem, --space-xl)
 */
export const SPACING_SCALE = [
  { step: "0", px: "0px", rem: "0rem", use: "No gap / flush alignment" },
  { step: "1", px: "4px", rem: "0.25rem", use: "Tight micro padding, badge items" },
  { step: "1.5", px: "6px", rem: "0.375rem", use: "--space-xs token, icon-text gap" },
  { step: "2", px: "8px", rem: "0.5rem", use: "Form field gap, small button padding" },
  { step: "3", px: "12px", rem: "0.75rem", use: "Sub-card gap, compact list spacing" },
  { step: "4", px: "16px", rem: "1rem", use: "--space-sm token, standard card padding & grid gap" },
  { step: "5", px: "20px", rem: "1.25rem", use: "Medium component padding" },
  { step: "6", px: "24px", rem: "1.5rem", use: "--space-md token, section outer padding" },
  { step: "8", px: "32px", rem: "2rem", use: "Header to section gap, modal spacing" },
  { step: "10", px: "40px", rem: "2.5rem", use: "--space-lg token, major page container padding" },
  { step: "12", px: "48px", rem: "3rem", use: "Large section separator" },
  { step: "16", px: "64px", rem: "4rem", use: "Hero section gap" },
  { step: "20", px: "80px", rem: "5rem", use: "--space-xl token, desktop page footer margin" },
] as const;

/**
 * BREAKPOINT SYSTEM SPECIFICATION
 */
export const BREAKPOINTS = [
  { name: "Mobile (xs)", minWidth: "< 640px", cols: 4, margin: "16px", gap: "12px/16px", device: "Smartphone Portrait/Landscape" },
  { name: "Tablet Small (sm)", minWidth: "≥ 640px", cols: 6, margin: "24px", gap: "16px", device: "Large Phone / Mini Tablet" },
  { name: "Tablet Standard (md)", minWidth: "≥ 768px", cols: 8, margin: "24px", gap: "16px/24px", device: "iPad / Tablet Portrait" },
  { name: "Desktop Standard (lg)", minWidth: "≥ 1024px", cols: 12, margin: "32px", gap: "24px", device: "Laptop / Desktop" },
  { name: "Desktop Wide (xl)", minWidth: "≥ 1280px", cols: 12, margin: "40px", gap: "24px/32px", device: "1080p Monitor / Wide Screen" },
  { name: "Desktop Ultra (2xl)", minWidth: "≥ 1536px", cols: 12, margin: "48px", gap: "32px", device: "4K / Ultra-wide Display" },
] as const;

const gridAppVariants = cva("grid w-full items-stretch", {
  variants: {
    variant: {
      default: "grid-cols-4 sm:grid-cols-8 lg:grid-cols-12", // Best-practice: 4-col mobile, 8-col tablet, 12-col desktop
      full12: "grid-cols-12",
      bento: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      cards: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      metrics: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      split: "grid-cols-1 lg:grid-cols-12",
      autoFit: "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
    },
    gap: {
      none: "gap-0",
      xs: "gap-1.5 sm:gap-2",      // 6px - 8px
      sm: "gap-3 sm:gap-4",        // 12px - 16px
      md: "gap-4 sm:gap-6",        // 16px - 24px (Standard)
      lg: "gap-6 sm:gap-8 lg:gap-10", // 24px - 40px
      xl: "gap-8 lg:gap-12",       // 32px - 48px
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
  },
  defaultVariants: {
    variant: "default",
    gap: "md",
    align: "stretch",
  },
});

export interface GridAppProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridAppVariants> {
  id: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  colsSm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  colsMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  colsLg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  colsXl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  as?: React.ElementType;
}

export function GridApp({
  id,
  className,
  variant,
  gap,
  align,
  cols,
  colsSm,
  colsMd,
  colsLg,
  colsXl,
  as: Component = "div",
  children,
  ...props
}: GridAppProps) {
  // Dynamic column overrides if passed as direct props
  const colClasses = React.useMemo(() => {
    const classes: string[] = [];
    if (cols) classes.push(`grid-cols-${cols}`);
    if (colsSm) classes.push(`sm:grid-cols-${colsSm}`);
    if (colsMd) classes.push(`md:grid-cols-${colsMd}`);
    if (colsLg) classes.push(`lg:grid-cols-${colsLg}`);
    if (colsXl) classes.push(`xl:grid-cols-${colsXl}`);
    return classes.join(" ");
  }, [cols, colsSm, colsMd, colsLg, colsXl]);

  return (
    <Component
      id={id}
      className={cn(gridAppVariants({ variant, gap, align }), colClasses, className)}
      {...props}
    >
      {children}
    </Component>
  );
}

/* =========================================================================
   GRID COLUMN CHILD COMPONENT (ColApp)
   ========================================================================= */

export interface ColAppProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
  spanSm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
  spanMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
  spanLg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
  spanXl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
  offset?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  offsetMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  offsetLg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  as?: React.ElementType;
}

export function ColApp({
  id,
  className,
  span,
  spanSm,
  spanMd,
  spanLg,
  spanXl,
  offset,
  offsetMd,
  offsetLg,
  as: Component = "div",
  children,
  ...props
}: ColAppProps) {
  const spanClasses = React.useMemo(() => {
    const classes: string[] = [];

    // Base Mobile Span
    if (span === "full") classes.push("col-span-full");
    else if (span) classes.push(`col-span-${span}`);

    // Breakpoint Spans
    if (spanSm === "full") classes.push("sm:col-span-full");
    else if (spanSm) classes.push(`sm:col-span-${spanSm}`);

    if (spanMd === "full") classes.push("md:col-span-full");
    else if (spanMd) classes.push(`md:col-span-${spanMd}`);

    if (spanLg === "full") classes.push("lg:col-span-full");
    else if (spanLg) classes.push(`lg:col-span-${spanLg}`);

    if (spanXl === "full") classes.push("xl:col-span-full");
    else if (spanXl) classes.push(`xl:col-span-${spanXl}`);

    // Offsets
    if (offset) classes.push(`col-start-${offset + 1}`);
    if (offsetMd) classes.push(`md:col-start-${offsetMd + 1}`);
    if (offsetLg) classes.push(`lg:col-start-${offsetLg + 1}`);

    return classes.join(" ");
  }, [span, spanSm, spanMd, spanLg, spanXl, offset, offsetMd, offsetLg]);

  return (
    <Component id={id} className={cn(spanClasses, className)} {...props}>
      {children}
    </Component>
  );
}

/* =========================================================================
   CONTAINER COMPONENT (ContainerApp)
   ========================================================================= */

export interface ContainerAppProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  fluid?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  as?: React.ElementType;
}

export function ContainerApp({
  id,
  className,
  fluid = false,
  size = "xl",
  as: Component = "div",
  children,
  ...props
}: ContainerAppProps) {
  const sizeClasses = {
    sm: "max-w-3xl",     // 768px
    md: "max-w-5xl",     // 1024px
    lg: "max-w-6xl",     // 1152px
    xl: "max-w-7xl",     // 1280px (BPKAD Standard Max Width)
    full: "max-w-full",
  };

  return (
    <Component
      id={id}
      className={cn(
        "w-full mx-auto px-4 sm:px-6 lg:px-8 transition-all",
        fluid ? "max-w-full" : sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
