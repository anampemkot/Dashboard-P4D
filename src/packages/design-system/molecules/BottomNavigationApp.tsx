import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { TextApp } from "../atoms/TextApp";
import { BadgeApp } from "../atoms/BadgeApp";

export type BottomNavVariant = "default" | "glassmorphism" | "floating" | "dark";
export type BottomNavIndicatorStyle = "dot" | "line" | "background" | "glow";
export type BottomNavSize = "sm" | "md" | "lg";
export type BottomNavRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface BottomNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  badge?: string | number;
  badgeVariant?: "solidPurple" | "neutral" | "danger" | "success" | "warning";
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const bottomNavContainerVariants = cva(
  // min-w-0 keeps this shrinkable when nested in a flex container (e.g. a
  // centered showcase preview) — otherwise flex's default min-width:auto lets
  // the row grow to its items' intrinsic content width instead of truncating.
  "w-full min-w-0 flex items-center justify-around select-none transition-all duration-300 z-30 font-sans",
  {
    variants: {
      variant: {
        default: "bg-surface border-t border-hairline text-ink shadow-lg",
        glassmorphism: "bg-surface/80 backdrop-blur-md border border-hairline/60 text-ink shadow-2xl",
        floating: "bg-surface/95 backdrop-blur-md border border-hairline text-ink shadow-2xl my-2 mx-4",
        dark: "bg-slate-900 border-t border-slate-800 text-slate-100 shadow-2xl",
      },
      size: {
        sm: "h-14",
        md: "h-16",
        lg: "h-20",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-2xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "full",
    },
  }
);

const pillRoundedMap: Record<BottomNavRounded, string> = {
  none: "rounded-none",
  sm: "rounded-xs",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export interface BottomNavigationAppProps extends VariantProps<typeof bottomNavContainerVariants> {
  id: string;
  items: BottomNavItem[];
  activeId?: string;
  onChange?: (id: string) => void;
  variant?: BottomNavVariant;
  indicatorStyle?: BottomNavIndicatorStyle;
  size?: BottomNavSize;
  rounded?: BottomNavRounded;
  fixed?: boolean;
  className?: string;
}

export function BottomNavigationApp({
  id,
  items,
  activeId,
  onChange,
  variant = "default",
  indicatorStyle = "dot",
  size = "md",
  rounded = "full",
  fixed = false,
  className,
}: BottomNavigationAppProps) {
  const [internalActiveId, setInternalActiveId] = React.useState<string>(
    activeId || (items.find((i) => i.active)?.id || items[0]?.id || "")
  );

  React.useEffect(() => {
    if (activeId !== undefined) {
      setInternalActiveId(activeId);
    }
  }, [activeId]);

  const handleSelect = (item: BottomNavItem) => {
    if (item.disabled) return;
    setInternalActiveId(item.id);
    if (item.onClick) item.onClick();
    if (onChange) onChange(item.id);
  };

  const itemPaddingClass = size === "sm" ? "py-1.5 px-2" : size === "lg" ? "py-2.5 px-4" : "py-2 px-3";
  const itemTextSizeClass = size === "sm" ? "text-[10px]" : "text-xs";
  const activePillRoundedClass = pillRoundedMap[rounded] || pillRoundedMap.full;

  return (
    <nav
      id={id}
      data-ui-id={id}
      className={cn(
        bottomNavContainerVariants({ variant, size, rounded: variant === "floating" ? rounded : "none" }),
        fixed ? "fixed bottom-0 left-0 right-0 max-w-md mx-auto" : "relative",
        className
      )}
    >
      {items.map((item) => {
        const isActive = item.id === internalActiveId;

        return (
          <button
            key={item.id}
            type="button"
            disabled={item.disabled}
            onClick={() => handleSelect(item)}
            className={cn(
              "flex-1 min-w-0 flex flex-col items-center justify-center relative transition-all duration-200 cursor-pointer outline-none",
              itemPaddingClass,
              item.disabled ? "opacity-40 cursor-not-allowed" : "hover:text-vibrant-purple-dark",
              isActive
                ? variant === "dark" ? "text-purple-400 font-bold" : "text-vibrant-purple-dark font-bold"
                : variant === "dark" ? "text-slate-400" : "text-ink-muted"
            )}
          >
            {/* Top Indicator Line */}
            {indicatorStyle === "line" && isActive && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-vibrant-purple-dark shadow-xs" />
            )}

            {/* Background Pill Indicator (Matching parent corner curvature) */}
            {indicatorStyle === "background" && isActive && (
              <span className={cn(
                "absolute inset-x-1.5 inset-y-1 -z-0 transition-all duration-200",
                activePillRoundedClass,
                variant === "dark" ? "bg-purple-900/50 border border-purple-800/50" : "bg-vibrant-purple/15"
              )} />
            )}

            {/* Icon Container with Badge */}
            <div className="relative flex items-center justify-center z-10 mb-0.5">
              {isActive && item.activeIcon ? item.activeIcon : item.icon}

              {/* Notification Badge */}
              {item.badge !== undefined && (
                <div className="absolute -top-1.5 -right-2.5 z-20">
                  <BadgeApp
                    id={`bnav-badge-${id}-${item.id}`}
                    variant={item.badgeVariant || "solidPurple"}
                    size="sm"
                    className="whitespace-nowrap truncate max-w-full inline-block px-1 min-w-[16px] h-4 text-[9px] leading-none"
                  >
                    {item.badge}
                  </BadgeApp>
                </div>
              )}
            </div>

            {/* Label */}
            <TextApp
              id={`bnav-label-${id}-${item.id}`}
              variant="caption"
              weight={isActive ? "bold" : "medium"}
              className={cn(
                "truncate leading-tight z-10 transition-colors",
                itemTextSizeClass,
                isActive
                  ? variant === "dark" ? "text-purple-300 font-bold" : "text-vibrant-purple-dark font-bold"
                  : variant === "dark" ? "text-slate-400" : "text-ink-muted"
              )}
            >
              {item.label}
            </TextApp>

            {/* Bottom Dot Indicator */}
            {indicatorStyle === "dot" && isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-vibrant-purple-dark mt-0.5 animate-in zoom-in-50 duration-200" />
            )}

            {/* Glow Indicator */}
            {indicatorStyle === "glow" && isActive && (
              <span className="w-6 h-1 rounded-full bg-vibrant-purple shadow-[0_0_12px_#7c3aed] mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
