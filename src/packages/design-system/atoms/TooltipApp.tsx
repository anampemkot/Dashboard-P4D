import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type TooltipPosition =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "right";

export type TooltipTheme = "dark" | "light" | "vibrant" | "brand" | "info" | "success" | "warning" | "error";

export type TooltipMaxWidth = "xs" | "sm" | "md" | "lg" | "xl" | "none" | string | number;

const tooltipVariants = cva(
  "absolute z-50 pointer-events-auto transition-all duration-150 ease-out shadow-lg rounded-lg px-3 py-2 text-xs leading-normal font-sans",
  {
    variants: {
      theme: {
        dark: "bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-zinc-950/20",
        light: "bg-surface text-ink border border-hairline-hard shadow-xl",
        vibrant: "bg-vibrant-purple-dark text-white border border-vibrant-purple/30 shadow-vibrant-purple/20",
        brand: "bg-brand-purple text-white border border-brand-purple/30 shadow-brand-purple/20",
        info: "bg-sky-950 text-sky-100 border border-sky-800 shadow-sky-950/20",
        success: "bg-emerald-950 text-emerald-100 border border-emerald-800 shadow-emerald-950/20",
        warning: "bg-amber-950 text-amber-100 border border-amber-800 shadow-amber-950/20",
        error: "bg-rose-950 text-rose-100 border border-rose-800 shadow-rose-950/20",
      },
    },
    defaultVariants: {
      theme: "dark",
    },
  }
);

// Map position to wrapper alignment classes
const positionClasses: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2 origin-bottom",
  "top-start": "bottom-full left-0 mb-2 origin-bottom-left",
  "top-end": "bottom-full right-0 mb-2 origin-bottom-right",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2 origin-top",
  "bottom-start": "top-full left-0 mt-2 origin-top-left",
  "bottom-end": "top-full right-0 mt-2 origin-top-right",
  left: "right-full top-1/2 -translate-y-1/2 mr-2 origin-right",
  right: "left-full top-1/2 -translate-y-1/2 ml-2 origin-left",
};

// Arrow positioning classes
const arrowPositionClasses: Record<TooltipPosition, string> = {
  top: "bottom-[-5px] left-1/2 -translate-x-1/2 border-t-zinc-900 border-x-transparent border-b-transparent border-t-[5px] border-x-[5px]",
  "top-start": "bottom-[-5px] left-3 border-t-zinc-900 border-x-transparent border-b-transparent border-t-[5px] border-x-[5px]",
  "top-end": "bottom-[-5px] right-3 border-t-zinc-900 border-x-transparent border-b-transparent border-t-[5px] border-x-[5px]",
  bottom: "top-[-5px] left-1/2 -translate-x-1/2 border-b-zinc-900 border-x-transparent border-t-transparent border-b-[5px] border-x-[5px]",
  "bottom-start": "top-[-5px] left-3 border-b-zinc-900 border-x-transparent border-t-transparent border-b-[5px] border-x-[5px]",
  "bottom-end": "top-[-5px] right-3 border-b-zinc-900 border-x-transparent border-t-transparent border-b-[5px] border-x-[5px]",
  left: "right-[-5px] top-1/2 -translate-y-1/2 border-l-zinc-900 border-y-transparent border-r-transparent border-l-[5px] border-y-[5px]",
  right: "left-[-5px] top-1/2 -translate-y-1/2 border-r-zinc-900 border-y-transparent border-l-transparent border-r-[5px] border-y-[5px]",
};

// Arrow border/fill colors according to theme
const arrowThemeClasses: Record<TooltipTheme, Record<TooltipPosition, string>> = {
  dark: {
    top: "border-t-zinc-900",
    "top-start": "border-t-zinc-900",
    "top-end": "border-t-zinc-900",
    bottom: "border-b-zinc-900",
    "bottom-start": "border-b-zinc-900",
    "bottom-end": "border-b-zinc-900",
    left: "border-l-zinc-900",
    right: "border-r-zinc-900",
  },
  light: {
    top: "border-t-surface",
    "top-start": "border-t-surface",
    "top-end": "border-t-surface",
    bottom: "border-b-surface",
    "bottom-start": "border-b-surface",
    "bottom-end": "border-b-surface",
    left: "border-l-surface",
    right: "border-r-surface",
  },
  vibrant: {
    top: "border-t-vibrant-purple-dark",
    "top-start": "border-t-vibrant-purple-dark",
    "top-end": "border-t-vibrant-purple-dark",
    bottom: "border-b-vibrant-purple-dark",
    "bottom-start": "border-b-vibrant-purple-dark",
    "bottom-end": "border-b-vibrant-purple-dark",
    left: "border-l-vibrant-purple-dark",
    right: "border-r-vibrant-purple-dark",
  },
  brand: {
    top: "border-t-brand-purple",
    "top-start": "border-t-brand-purple",
    "top-end": "border-t-brand-purple",
    bottom: "border-b-brand-purple",
    "bottom-start": "border-b-brand-purple",
    "bottom-end": "border-b-brand-purple",
    left: "border-l-brand-purple",
    right: "border-r-brand-purple",
  },
  info: {
    top: "border-t-sky-950",
    "top-start": "border-t-sky-950",
    "top-end": "border-t-sky-950",
    bottom: "border-b-sky-950",
    "bottom-start": "border-b-sky-950",
    "bottom-end": "border-b-sky-950",
    left: "border-l-sky-950",
    right: "border-r-sky-950",
  },
  success: {
    top: "border-t-emerald-950",
    "top-start": "border-t-emerald-950",
    "top-end": "border-t-emerald-950",
    bottom: "border-b-emerald-950",
    "bottom-start": "border-b-emerald-950",
    "bottom-end": "border-b-emerald-950",
    left: "border-l-emerald-950",
    right: "border-r-emerald-950",
  },
  warning: {
    top: "border-t-amber-950",
    "top-start": "border-t-amber-950",
    "top-end": "border-t-amber-950",
    bottom: "border-b-amber-950",
    "bottom-start": "border-b-amber-950",
    "bottom-end": "border-b-amber-950",
    left: "border-l-amber-950",
    right: "border-r-amber-950",
  },
  error: {
    top: "border-t-rose-950",
    "top-start": "border-t-rose-950",
    "top-end": "border-t-rose-950",
    bottom: "border-b-rose-950",
    "bottom-start": "border-b-rose-950",
    "bottom-end": "border-b-rose-950",
    left: "border-l-rose-950",
    right: "border-r-rose-950",
  },
};

const maxWidthClasses: Record<string, string> = {
  xs: "max-w-[160px]",
  sm: "max-w-[220px]",
  md: "max-w-[280px]",
  lg: "max-w-[360px]",
  xl: "max-w-[440px]",
  none: "max-w-none",
};

export interface TooltipAppProps extends VariantProps<typeof tooltipVariants> {
  id: string;
  content: React.ReactNode;
  title?: React.ReactNode;
  link?: {
    label: string;
    href?: string;
    onClick?: () => void;
  } | React.ReactNode;
  position?: TooltipPosition;
  theme?: TooltipTheme;
  showArrow?: boolean;
  delayMs?: number;
  trigger?: "hover" | "click" | "both";
  maxWidth?: TooltipMaxWidth;
  forceOpen?: boolean;
  children: React.ReactNode;
  className?: string;
  tooltipClassName?: string;
}

export function TooltipApp({
  id,
  content,
  title,
  link,
  position = "top",
  theme = "dark",
  showArrow = true,
  delayMs = 150,
  trigger = "hover",
  maxWidth = "sm",
  forceOpen,
  children,
  className,
  tooltipClassName,
}: TooltipAppProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const activeOpen = forceOpen !== undefined ? forceOpen : isOpen;

  const handleMouseEnter = () => {
    if (trigger === "click") return;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (delayMs > 0) {
      timerRef.current = setTimeout(() => {
        setIsOpen(true);
      }, delayMs);
    } else {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "click") return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsOpen(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (trigger === "hover") return;
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    if (trigger !== "click") {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const getMaxWidthClass = () => {
    if (typeof maxWidth === "string" && maxWidthClasses[maxWidth]) {
      return maxWidthClasses[maxWidth];
    }
    return "";
  };

  const customStyle: React.CSSProperties =
    typeof maxWidth === "number"
      ? { maxWidth: `${maxWidth}px` }
      : typeof maxWidth === "string" && !maxWidthClasses[maxWidth]
      ? { maxWidth }
      : {};

  const renderLink = () => {
    if (!link) return null;
    if (React.isValidElement(link)) {
      return <div className="mt-2 pt-1 border-t border-white/15 dark:border-white/10 text-xs">{link}</div>;
    }
    const linkObj = link as { label: string; href?: string; onClick?: () => void };
    return (
      <div className="mt-2 pt-1 border-t border-white/15 dark:border-white/10 flex items-center justify-between gap-2">
        {linkObj.href ? (
          <a
            href={linkObj.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold text-vibrant-purple-light hover:underline inline-flex items-center gap-1"
          >
            {linkObj.label} &rarr;
          </a>
        ) : (
          <button
            type="button"
            onClick={linkObj.onClick}
            className="text-[11px] font-semibold text-vibrant-purple-light hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            {linkObj.label} &rarr;
          </button>
        )}
      </div>
    );
  };

  return (
    <div
      id={`tooltip-wrapper-${id}`}
      className={cn("relative inline-flex items-center", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {/* Trigger Child */}
      {children}

      {/* Tooltip Content Box */}
      {activeOpen && (
        <div
          id={id}
          role="tooltip"
          style={customStyle}
          className={cn(
            tooltipVariants({ theme }),
            positionClasses[position],
            getMaxWidthClass(),
            "animate-in fade-in-0 zoom-in-95 duration-150",
            tooltipClassName
          )}
        >
          {/* Arrow */}
          {showArrow && (
            <span
              className={cn(
                "absolute w-0 h-0 border-style-solid pointer-events-none",
                arrowPositionClasses[position],
                arrowThemeClasses[theme][position]
              )}
            />
          )}

          {/* Title */}
          {title && (
            <div className="font-bold text-xs mb-1 tracking-tight flex items-center gap-1.5 border-b border-white/10 dark:border-white/10 pb-1">
              {title}
            </div>
          )}

          {/* Body Content */}
          <div className="text-xs break-words whitespace-normal text-balance leading-relaxed">
            {content}
          </div>

          {/* Link / Action */}
          {renderLink()}
        </div>
      )}
    </div>
  );
}
