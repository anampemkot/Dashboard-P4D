import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X, Check } from "lucide-react";

export type ChipType = "input" | "choice" | "action";
export type ChipVariant =
  | "vibrant"
  | "brand"
  | "neutral"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline";
export type ChipSize = "sm" | "md" | "lg";
export type ChipRounded =
  | "pill"
  | "full"
  | "none"
  | "sharp"
  | "sm"
  | "small"
  | "md"
  | "medium"
  | "lg"
  | "large";

const chipAppVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all select-none border gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-vibrant-purple/40 cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        vibrant: "bg-vibrant-purple/15 text-vibrant-purple-dark border-vibrant-purple/30 hover:bg-vibrant-purple/25 active:bg-vibrant-purple/35",
        brand: "bg-brand-purple/15 text-brand-purple border-brand-purple/30 hover:bg-brand-purple/25 active:bg-brand-purple/35",
        neutral: "bg-surface-soft text-ink border-hairline hover:bg-surface-soft/80 hover:border-hairline-hard active:bg-surface-soft/60",
        success: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25 active:bg-emerald-500/35",
        warning: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/25 active:bg-amber-500/35",
        error: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30 hover:bg-rose-500/25 active:bg-rose-500/35",
        info: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30 hover:bg-sky-500/25 active:bg-sky-500/35",
        outline: "bg-transparent text-ink border-hairline hover:bg-surface-soft hover:border-hairline-hard active:bg-surface-soft/80",
      },
      size: {
        sm: "h-6 px-2 text-[11px] leading-none",
        md: "h-8 px-3 text-xs leading-none",
        lg: "h-10 px-4 text-sm leading-none",
      },
      rounded: {
        // Foundation Corner Shapes
        pill: "rounded-full",        // Pill / Fully Rounded (9999px)
        full: "rounded-full",        // Fully Rounded (9999px)
        none: "rounded-none",        // Sharp (0px)
        sharp: "rounded-none",       // Sharp (0px)
        sm: "rounded-[4px]",         // Small (4px)
        small: "rounded-[4px]",      // Small (4px)
        md: "rounded-[8px]",         // Medium (8px)
        medium: "rounded-[8px]",     // Medium (8px)
        lg: "rounded-[16px]",        // Large (16px)
        large: "rounded-[16px]",      // Large (16px)
      },
      selected: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Selected overrides for vibrant
      {
        variant: "vibrant",
        selected: true,
        className: "bg-vibrant-purple-dark text-white border-transparent font-semibold shadow-xs hover:bg-vibrant-purple-dark/90",
      },
      // Selected overrides for brand
      {
        variant: "brand",
        selected: true,
        className: "bg-brand-purple text-white border-transparent font-semibold shadow-xs hover:bg-brand-purple/90",
      },
      // Selected overrides for neutral
      {
        variant: "neutral",
        selected: true,
        className: "bg-ink text-surface border-transparent font-semibold shadow-xs hover:bg-ink/90",
      },
      // Selected overrides for success
      {
        variant: "success",
        selected: true,
        className: "bg-emerald-600 text-white border-transparent font-semibold shadow-xs hover:bg-emerald-700",
      },
      // Selected overrides for warning
      {
        variant: "warning",
        selected: true,
        className: "bg-amber-500 text-white border-transparent font-semibold shadow-xs hover:bg-amber-600",
      },
      // Selected overrides for error
      {
        variant: "error",
        selected: true,
        className: "bg-rose-600 text-white border-transparent font-semibold shadow-xs hover:bg-rose-700",
      },
      // Selected overrides for info
      {
        variant: "info",
        selected: true,
        className: "bg-sky-600 text-white border-transparent font-semibold shadow-xs hover:bg-sky-700",
      },
      // Selected overrides for outline
      {
        variant: "outline",
        selected: true,
        className: "bg-vibrant-purple/10 text-vibrant-purple-dark border-vibrant-purple font-semibold",
      },
    ],
    defaultVariants: {
      variant: "neutral",
      size: "md",
      rounded: "pill",
      selected: false,
    },
  }
);

export interface ChipsAppProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipAppVariants> {
  id: string;
  chipType?: ChipType; // "input" | "choice" | "action"
  selected?: boolean;
  avatar?: React.ReactNode;
  icon?: React.ReactNode; // Leading icon
  trailingIcon?: React.ReactNode;
  onRemove?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  removable?: boolean;
  disabled?: boolean;
  rounded?: ChipRounded;
  showCheckOnSelect?: boolean;
}

export function ChipsApp({
  id,
  chipType = "action",
  variant = "neutral",
  size = "md",
  rounded = "pill",
  selected = false,
  avatar,
  icon,
  trailingIcon,
  onRemove,
  removable = false,
  disabled = false,
  showCheckOnSelect = true,
  className,
  children,
  onClick,
  ...props
}: ChipsAppProps) {
  const isInputChip = chipType === "input";
  const isChoiceChip = chipType === "choice";
  const isRemovable = removable || !!onRemove || isInputChip;

  const handleRemoveClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    if (!disabled && onRemove) {
      onRemove(e);
    }
  };

  // Icon sizing based on chip size
  const getIconWrapperSize = () => {
    switch (size) {
      case "sm":
        return "w-3 h-3 text-[10px]";
      case "lg":
        return "w-4 h-4 text-xs";
      default:
        return "w-3.5 h-3.5 text-xs";
    }
  };

  const getAvatarSizeClass = () => {
    switch (size) {
      case "sm":
        return "w-4 h-4 text-[9px] -ml-1";
      case "lg":
        return "w-6 h-6 text-xs -ml-1.5";
      default:
        return "w-5 h-5 text-[10px] -ml-1";
    }
  };

  return (
    <button
      id={id}
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        chipAppVariants({ variant, size, rounded, selected }),
        isChoiceChip && "hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      {...props}
    >
      {/* Choice Chip Selected Checkmark */}
      {isChoiceChip && selected && showCheckOnSelect && !avatar && (
        <span className={cn("inline-flex items-center justify-center shrink-0", getIconWrapperSize())}>
          <Check className="w-full h-full stroke-[2.5]" />
        </span>
      )}

      {/* Avatar (Leading) */}
      {avatar && (
        <span className={cn("inline-flex items-center justify-center rounded-full overflow-hidden shrink-0", getAvatarSizeClass())}>
          {avatar}
        </span>
      )}

      {/* Leading Icon (if no avatar or when selected check is off) */}
      {icon && (!selected || !isChoiceChip || !showCheckOnSelect || avatar) && (
        <span className={cn("inline-flex items-center justify-center shrink-0", getIconWrapperSize())}>
          {icon}
        </span>
      )}

      {/* Label Content */}
      <span className="truncate max-w-full">{children}</span>

      {/* Custom Trailing Icon or Remove Button */}
      {trailingIcon && !isRemovable && (
        <span className={cn("inline-flex items-center justify-center shrink-0 opacity-70", getIconWrapperSize())}>
          {trailingIcon}
        </span>
      )}

      {/* Remove Button 'X' */}
      {isRemovable && (
        <span
          role="button"
          tabIndex={0}
          aria-label="Remove chip"
          onClick={handleRemoveClick}
          className={cn(
            "inline-flex items-center justify-center rounded-full p-0.5 transition-colors shrink-0",
            selected
              ? "hover:bg-white/30 text-white"
              : "hover:bg-black/10 dark:hover:bg-white/20 text-ink-muted hover:text-ink",
            size === "sm" ? "w-3.5 h-3.5 -mr-0.5" : size === "lg" ? "w-5 h-5 -mr-1" : "w-4 h-4 -mr-1"
          )}
        >
          <X className="w-full h-full" />
        </span>
      )}
    </button>
  );
}
