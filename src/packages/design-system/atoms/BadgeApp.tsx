import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "brand"
  | "accent"
  | "success"
  | "warning"
  | "info"
  | "error"
  | "neutral"
  | "lime"
  | "lilac"
  | "cream"
  | "pink"
  | "danger"
  | "mint"
  | "coral"
  | "navy"
  | "yellow"
  | "amber"
  | "purple"
  | "purpleDark"
  | "blue"
  | "vibrantYellow"
  | "vibrantPurple"
  | "vibrantPurpleDark"
  | "vibrantBlue"
  | "button"
  | "solid"
  | "solidPurple"
  | "solidSuccess"
  | "solidWarning"
  | "solidError"
  | "solidInfo"
  | "solidEmerald"
  | "solidAmber"
  | "solidRose"
  | "outline"
  | "outlineBrand"
  | "outlineSuccess"
  | "outlineWarning"
  | "outlineError"
  | "outlineInfo"
  | "outlineNeutral";

export type BadgeSize = "sm" | "md" | "lg";
export type BadgeRounded =
  | "default"
  | "pill"
  | "card"
  | "box"
  | "circle"
  | "full"
  | "square"
  | "none"
  | "sm"
  | "md"
  | "lg";

const badgeAppVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap truncate max-w-full font-semibold tracking-wide transition-colors select-none border",
  {
    variants: {
      variant: {
        brand: "bg-brand text-ink-on-brand border-transparent",
        accent: "bg-accent/12 text-accent border-accent/20",
        success: "bg-emerald-100/90 text-emerald-800 border-emerald-300/60 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60",
        warning: "bg-amber-100/90 text-amber-800 border-amber-300/60 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60",
        info: "bg-sky-100/90 text-sky-800 border-sky-300/60 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800/60",
        error: "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/60",
        neutral: "bg-surface-soft text-ink-secondary border-hairline",
        lime: "bg-block-lime text-ink border-transparent",
        lilac: "bg-block-lilac text-ink border-transparent",
        cream: "bg-block-cream text-ink border-transparent",
        pink: "bg-block-pink text-ink border-transparent",
        danger: "bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-300",
        mint: "bg-block-mint text-ink border-transparent",
        coral: "bg-block-coral text-ink border-transparent",
        navy: "bg-block-navy text-white border-transparent",
        // Pure Colors
        yellow: "bg-vibrant-yellow text-vibrant-yellow-ink border-transparent",
        amber: "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/80 dark:text-amber-200 dark:border-amber-800",
        purple: "bg-vibrant-purple text-white border-transparent font-bold shadow-2xs",
        purpleDark: "bg-vibrant-purple-dark text-white border-transparent font-bold shadow-2xs",
        blue: "bg-vibrant-blue text-vibrant-blue-ink border-transparent",
        // Brand prefixed names
        vibrantYellow: "bg-vibrant-yellow text-vibrant-yellow-ink border-transparent",
        vibrantPurple: "bg-vibrant-purple text-white border-transparent font-bold shadow-2xs",
        vibrantPurpleDark: "bg-vibrant-purple-dark text-white border-transparent font-bold shadow-2xs",
        vibrantBlue: "bg-vibrant-blue text-vibrant-blue-ink border-transparent",
        // Solid Variants
        button: "bg-vibrant-purple-dark text-white border-transparent font-bold shadow-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer font-display",
        solid: "bg-vibrant-purple-dark text-white border-transparent font-bold shadow-2xs",
        solidPurple: "bg-vibrant-purple-dark text-white border-transparent font-bold shadow-2xs",
        solidSuccess: "bg-emerald-600 text-white border-transparent font-bold shadow-2xs",
        solidWarning: "bg-amber-500 text-white border-transparent font-bold shadow-2xs",
        solidError: "bg-rose-600 text-white border-transparent font-bold shadow-2xs",
        solidInfo: "bg-sky-600 text-white border-transparent font-bold shadow-2xs",
        solidEmerald: "bg-emerald-600 text-white border-transparent font-bold shadow-2xs",
        solidAmber: "bg-amber-500 text-white border-transparent font-bold shadow-2xs",
        solidRose: "bg-rose-600 text-white border-transparent font-bold shadow-2xs",
        // Outline Variants
        outline: "bg-transparent text-ink border-hairline hover:bg-surface-soft",
        outlineBrand: "bg-transparent text-vibrant-purple-dark border-vibrant-purple-dark/60 font-medium",
        outlineSuccess: "bg-transparent text-emerald-700 dark:text-emerald-400 border-emerald-500/60 font-medium",
        outlineWarning: "bg-transparent text-amber-700 dark:text-amber-400 border-amber-500/60 font-medium",
        outlineError: "bg-transparent text-rose-700 dark:text-rose-400 border-rose-500/60 font-medium",
        outlineInfo: "bg-transparent text-sky-700 dark:text-sky-400 border-sky-500/60 font-medium",
        outlineNeutral: "bg-transparent text-ink-secondary border-hairline font-medium",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px] leading-tight gap-1 min-h-[18px]",
        md: "px-2.5 py-0.5 text-xs leading-none gap-1.5 min-h-[22px]",
        lg: "px-3.5 py-1 text-sm leading-normal gap-2 min-h-[28px]",
      },
      theme: {
        default: "",
        playful: "font-display",
      },
      rounded: {
        default: "rounded-pill-custom", // Foundation rounded pill acuan default
        pill: "rounded-pill-custom",     // Foundation pill token (--radius-pill-custom: 14px)
        card: "rounded-card-custom",     // Foundation card token (--radius-card-custom: 28px)
        box: "rounded-box-custom",       // Foundation box token (--radius-box-custom: 22px)
        circle: "rounded-full",          // Lingkaran / Pill penuh
        full: "rounded-full",
        square: "rounded-none",          // Kotak presisi
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "solidPurple",
      size: "md",
      rounded: "default",
      theme: "default",
    },
  }
);

const badgeBorderMap: Record<string, string> = {
  brand: "border-brand/30",
  accent: "border-accent/40",
  success: "border-emerald-300 dark:border-emerald-800",
  warning: "border-amber-300 dark:border-amber-800",
  info: "border-sky-300 dark:border-sky-800",
  error: "border-red-300 dark:border-red-800",
  neutral: "border-hairline",
  lime: "border-block-lime-border",
  lilac: "border-block-lilac-border",
  cream: "border-block-cream-border",
  pink: "border-block-pink-border",
  danger: "border-red-200 dark:border-red-900/50",
  mint: "border-block-mint-border",
  coral: "border-block-coral-border",
  navy: "border-block-navy-border",
};

export interface BadgeAppProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeAppVariants> {
  id: string;
  withBorder?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  dot?: boolean;
  dotColor?: string;
  dotPulse?: boolean;
}

export function BadgeApp({
  id,
  variant = "solidPurple",
  size,
  rounded,
  theme,
  className,
  children,
  withBorder,
  icon,
  iconPosition = "left",
  dot,
  dotColor,
  dotPulse,
  ...props
}: BadgeAppProps) {
  const resolvedVariant = variant || "solidPurple";
  const borderClass = withBorder ? (badgeBorderMap[resolvedVariant] || "border-hairline") : "";

  // Auto dot color based on variant if not explicitly provided
  const getDotBgClass = () => {
    if (dotColor) return dotColor;
    if (resolvedVariant.includes("success") || resolvedVariant === "mint") return "bg-emerald-500";
    if (resolvedVariant.includes("warning") || resolvedVariant === "yellow") return "bg-amber-500";
    if (resolvedVariant.includes("error") || resolvedVariant.includes("danger") || resolvedVariant === "accent") return "bg-rose-500";
    if (resolvedVariant.includes("info") || resolvedVariant.includes("blue")) return "bg-sky-500";
    if (resolvedVariant.includes("solid") || resolvedVariant.includes("purple")) return "bg-white";
    return "bg-vibrant-purple-dark";
  };

  return (
    <span
      id={id}
      data-ui-id={id}
      className={cn(badgeAppVariants({ variant: resolvedVariant, size, rounded, theme, className }), borderClass)}
      {...props}
    >
      {/* Dot Indicator for Status Badge */}
      {dot && (
        <span className="relative flex h-2 w-2 flex-shrink-0 items-center justify-center">
          {dotPulse && (
            <span
              className={cn(
                "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                getDotBgClass()
              )}
            />
          )}
          <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", getDotBgClass())} />
        </span>
      )}

      {/* Left Icon */}
      {icon && iconPosition === "left" && (
        <span className="inline-flex flex-shrink-0 items-center justify-center">{icon}</span>
      )}

      {/* Children content (Text or Number) */}
      {children}

      {/* Right Icon */}
      {icon && iconPosition === "right" && (
        <span className="inline-flex flex-shrink-0 items-center justify-center">{icon}</span>
      )}
    </span>
  );
}
