import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textAppVariants = cva("text-ink transition-colors", {
  variants: {
    variant: {
      h1: "text-3xl md:text-4xl lg:text-[48px] tracking-tighter leading-[1.15] font-bold",
      h2: "text-2xl md:text-3xl tracking-tight leading-[1.2] font-bold",
      h3: "text-xl md:text-2xl tracking-tight leading-[1.3] font-bold",
      h4: "text-lg md:text-xl leading-[1.4] font-semibold",
      h5: "text-base leading-[1.5] font-semibold",
      h6: "text-sm leading-[1.43] font-semibold uppercase tracking-wider",
      lead: "text-base md:text-lg leading-relaxed text-ink-secondary",
      body1: "text-sm md:text-body leading-relaxed",
      body2: "text-xs md:text-sm leading-normal",
      body: "text-sm md:text-body leading-relaxed",
      caption: "text-xs text-ink-muted leading-relaxed",
      micro: "text-[10px] text-ink-muted leading-tight font-medium",
      mono: "font-mono text-xs text-ink-secondary tracking-tight",
      code: "font-mono text-xs bg-surface-soft px-1.5 py-0.5 rounded border border-hairline-soft text-vibrant-purple-dark dark:text-purple-300 font-medium",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
    color: {
      default: "text-ink",
      secondary: "text-ink-secondary",
      muted: "text-ink-muted",
      brand: "text-brand",
      accent: "text-accent",
      success: "text-success",
      white: "text-white",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "default",
  },
});

export interface TextAppProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textAppVariants> {
  id: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "code" | "pre";
}

export function TextApp({
  id,
  variant = "body",
  weight,
  color,
  as,
  className,
  children,
  ...props
}: TextAppProps) {
  let defaultAs: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "code" | "pre" = "p";

  switch (variant) {
    case "h1":
      defaultAs = "h1";
      break;
    case "h2":
      defaultAs = "h2";
      break;
    case "h3":
      defaultAs = "h3";
      break;
    case "h4":
      defaultAs = "h4";
      break;
    case "h5":
      defaultAs = "h5";
      break;
    case "h6":
      defaultAs = "h6";
      break;
    case "code":
      defaultAs = "code";
      break;
    case "caption":
    case "micro":
    case "mono":
      defaultAs = "span";
      break;
    case "lead":
    case "body1":
    case "body2":
    case "body":
    default:
      defaultAs = "p";
      break;
  }

  const Tag = as || defaultAs;

  // Derive default weight based on heading level if not explicitly provided
  let resolvedWeight: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | null | undefined = weight;
  if (!resolvedWeight) {
    if (variant === "h1" || variant === "h2" || variant === "h3") {
      resolvedWeight = "bold";
    } else if (variant === "h4" || variant === "h5" || variant === "h6") {
      resolvedWeight = "semibold";
    } else {
      resolvedWeight = "normal";
    }
  }

  return (
    <Tag
      id={id}
      data-ui-id={id}
      className={cn(textAppVariants({ variant, weight: resolvedWeight, color, className }))}
      {...props}
    >
      {children}
    </Tag>
  );
}
