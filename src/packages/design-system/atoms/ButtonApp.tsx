import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonAppVariants = cva(
  "inline-flex items-center justify-center font-semibold whitespace-nowrap transition-all duration-100 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed text-center select-none cursor-pointer border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  {
    variants: {
      variant: {
        // Standard Core Variants
        primary: "bg-vibrant-purple text-vibrant-purple-ink shadow-xs hover:bg-vibrant-purple-dark hover:text-white hover:shadow-sm active:scale-[0.98] focus:ring-vibrant-purple-dark/80 focus-visible:ring-vibrant-purple-dark/80",
        secondary: "bg-surface text-ink border border-hairline shadow-2xs hover:bg-surface-soft hover:border-hairline-soft active:scale-[0.98] focus:ring-vibrant-purple-dark/60 focus-visible:ring-vibrant-purple-dark/60",
        ghost: "bg-transparent text-ink hover:bg-action-hover active:scale-[0.98] focus:ring-vibrant-purple-dark/60 focus-visible:ring-vibrant-purple-dark/60",
        icon: "bg-transparent text-ink hover:bg-action-hover border-transparent active:scale-[0.98] focus:ring-vibrant-purple-dark/60 focus-visible:ring-vibrant-purple-dark/60",
        danger: "bg-accent text-white shadow-xs hover:bg-accent/90 hover:shadow-sm active:scale-[0.98] focus:ring-accent/80 focus-visible:ring-accent/80",
        destructive: "bg-accent text-white shadow-xs hover:bg-accent/90 hover:shadow-sm active:scale-[0.98] focus:ring-accent/80 focus-visible:ring-accent/80",
        outline: "bg-transparent border border-hairline text-ink hover:bg-surface-soft active:scale-[0.98] focus:ring-vibrant-purple-dark/60 focus-visible:ring-vibrant-purple-dark/60",

        // Color Accents & Themes (Backwards Compatible)
        yellow: "bg-vibrant-yellow text-vibrant-yellow-ink border-transparent shadow-vibrant-yellow hover:opacity-95 active:scale-[0.97] focus:ring-vibrant-yellow-ink/70 focus-visible:ring-vibrant-yellow-ink/70",
        blue: "bg-vibrant-blue text-vibrant-blue-ink border-transparent shadow-vibrant-blue hover:opacity-95 active:scale-[0.97] focus:ring-vibrant-blue-ink/70 focus-visible:ring-vibrant-blue-ink/70",
        purple: "bg-vibrant-purple text-vibrant-purple-ink border-transparent shadow-vibrant-purple hover:opacity-95 active:scale-[0.97] focus:ring-vibrant-purple-dark/80 focus-visible:ring-vibrant-purple-dark/80",
        purpleDark: "bg-vibrant-purple-dark text-white border-transparent shadow-vibrant-purple-inset hover:opacity-95 active:scale-[0.97] focus:ring-vibrant-purple-dark/80 focus-visible:ring-vibrant-purple-dark/80",
        white: "bg-surface text-ink border border-hairline shadow-2xs hover:bg-surface-soft active:scale-[0.97] focus:ring-vibrant-purple-dark/60 focus-visible:ring-vibrant-purple-dark/60",

        // Vibrant aliases
        vibrantYellow: "bg-vibrant-yellow text-vibrant-yellow-ink border-transparent shadow-vibrant-yellow hover:opacity-95 active:scale-[0.97] focus:ring-vibrant-yellow-ink/70 focus-visible:ring-vibrant-yellow-ink/70",
        vibrantBlue: "bg-vibrant-blue text-vibrant-blue-ink border-transparent shadow-vibrant-blue hover:opacity-95 active:scale-[0.97] focus:ring-vibrant-blue-ink/70 focus-visible:ring-vibrant-blue-ink/70",
        vibrantPurple: "bg-vibrant-purple text-vibrant-purple-ink border-transparent shadow-vibrant-purple hover:opacity-95 active:scale-[0.97] focus:ring-vibrant-purple-dark/80 focus-visible:ring-vibrant-purple-dark/80",
        vibrantPurpleDark: "bg-vibrant-purple-dark text-white border-transparent shadow-vibrant-purple-inset hover:opacity-95 active:scale-[0.97] focus:ring-vibrant-purple-dark/80 focus-visible:ring-vibrant-purple-dark/80",
        vibrantWhite: "bg-surface text-ink border border-hairline shadow-2xs hover:bg-surface-soft active:scale-[0.97] focus:ring-vibrant-purple-dark/60 focus-visible:ring-vibrant-purple-dark/60",
      },
      size: {
        sm: "px-3 py-1.5 text-xs min-h-[32px] gap-1.5",
        md: "px-4 py-2 text-sm min-h-[40px] gap-2",
        lg: "px-5 py-2.5 text-base min-h-[48px] gap-2.5",
        // Icon-only sizes
        iconSm: "w-8 h-8 p-0 text-xs min-h-[32px] min-w-[32px] gap-0",
        iconMd: "w-[40px] h-[40px] p-0 text-sm min-h-[40px] min-w-[40px] gap-0",
        iconLg: "w-12 h-12 p-0 text-base min-h-[48px] min-w-[48px] gap-0",
      },
      rounded: {
        // Foundation Corner Shapes
        none: "rounded-none",         // Sharp (0px)
        sm: "rounded-[4px]",          // Small (4px - Input/Button Kecil)
        md: "rounded-[8px]",          // Medium (8px - Button/Card Standard)
        lg: "rounded-[16px]",         // Large (16px - Modal Container)
        full: "rounded-full",         // Pill / Fully Rounded (9999px)
        pill: "rounded-full",         // Alias Pill

        // Legacy compatibility mapped to foundation
        sharp: "rounded-none",
        small: "rounded-[4px]",
        medium: "rounded-[8px]",
        large: "rounded-[16px]",
        box: "rounded-[8px]",
        card: "rounded-[8px]",
        button: "rounded-[8px]",
        item: "rounded-[4px]",
        input: "rounded-[4px]",
        device: "rounded-[16px]",
      },
      theme: {
        default: "",
        playful: "font-display shadow-vibrant-soft",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "md", // Default to 8px medium according to foundation
      theme: "default",
    },
  }
);

export interface ButtonAppProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonAppVariants> {
  id: string;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function ButtonApp({
  id,
  variant,
  size,
  rounded,
  theme,
  className,
  children,
  isLoading = false,
  loadingText,
  leftIcon,
  rightIcon,
  disabled,
  type = "button",
  ...props
}: ButtonAppProps) {
  const isIconOnly = variant === "icon" || size?.toString().startsWith("icon");
  const iconSizeClass = size === "sm" || size === "iconSm" ? "w-3.5 h-3.5" : size === "lg" || size === "iconLg" ? "w-5 h-5" : "w-4 h-4";

  return (
    <button
      id={id}
      data-ui-id={id}
      type={type}
      disabled={disabled || isLoading}
      className={cn(buttonAppVariants({ variant, size, rounded, theme, className }))}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className={cn("animate-spin shrink-0", iconSizeClass)} />
          {!isIconOnly && (loadingText || children)}
        </>
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0 items-center justify-center">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="inline-flex shrink-0 items-center justify-center">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}

