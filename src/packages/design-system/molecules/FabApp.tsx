import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

// --- FAB CVA VARIANTS ---
const fabVariants = cva(
  "inline-flex items-center justify-center font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed select-none cursor-pointer border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  {
    variants: {
      variant: {
        primary:
          "bg-vibrant-purple text-vibrant-purple-ink hover:bg-vibrant-purple-dark hover:text-white focus:ring-vibrant-purple-dark/80 focus-visible:ring-vibrant-purple-dark/80",
        secondary:
          "bg-surface text-ink border border-hairline hover:bg-surface-soft hover:border-hairline-soft focus:ring-vibrant-purple-dark/60 focus-visible:ring-vibrant-purple-dark/60",
        danger:
          "bg-accent text-white hover:bg-accent/90 focus:ring-accent/80 focus-visible:ring-accent/80",
        destructive:
          "bg-accent text-white hover:bg-accent/90 focus:ring-accent/80 focus-visible:ring-accent/80",
        yellow:
          "bg-vibrant-yellow text-vibrant-yellow-ink hover:opacity-95 focus:ring-vibrant-yellow-ink/70 focus-visible:ring-vibrant-yellow-ink/70",
        blue:
          "bg-vibrant-blue text-vibrant-blue-ink hover:opacity-95 focus:ring-vibrant-blue-ink/70 focus-visible:ring-vibrant-blue-ink/70",
        purpleDark:
          "bg-vibrant-purple-dark text-white hover:opacity-95 focus:ring-vibrant-purple-dark/80 focus-visible:ring-vibrant-purple-dark/80",
      },
      size: {
        sm: "min-h-[40px] px-3 py-2 text-xs text-[13px] gap-1.5",
        md: "min-h-[48px] px-4 py-2.5 text-sm gap-2",
        lg: "min-h-[56px] px-5 py-3 text-base gap-2.5",
      },
      elevation: {
        normal: "shadow-lg hover:shadow-xl",
        high: "shadow-xl hover:shadow-2xl",
        vibrant:
          "shadow-[0_8px_25px_-5px_rgba(107,33,168,0.4)] hover:shadow-[0_12px_30px_-4px_rgba(107,33,168,0.55)]",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-[4px]",
        md: "rounded-[8px]",
        lg: "rounded-[16px]",
        full: "rounded-full",
      },
      position: {
        none: "",
        "bottom-right": "fixed bottom-6 right-6 z-[999]",
        "bottom-left": "fixed bottom-6 left-6 z-[999]",
        "bottom-center": "fixed bottom-6 left-1/2 -translate-x-1/2 z-[999]",
        "top-right": "fixed top-20 right-6 z-[999]",
        "top-left": "fixed top-20 left-6 z-[999]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      elevation: "vibrant",
      rounded: "full",
      position: "none",
    },
  }
);

export interface FabAppProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fabVariants> {
  id: string;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  isLoading?: boolean;
}

export const FabApp = React.forwardRef<HTMLButtonElement, FabAppProps>(
  (
    {
      id,
      className,
      variant = "primary",
      size = "md",
      elevation = "vibrant",
      rounded = "full",
      position = "none",
      icon,
      label,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isIconOnly = !label && !children;

    // Size-based width adjustments for icon-only circle
    const iconOnlySizeClasses = isIconOnly
      ? size === "sm"
        ? "w-10 h-10 p-0"
        : size === "lg"
        ? "w-14 h-14 p-0"
        : "w-12 h-12 p-0"
      : "";

    return (
      <button
        id={id}
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          fabVariants({ variant, size, elevation, rounded, position }),
          iconOnlySizeClasses,
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          icon
        )}
        {(label || children) && (
          <span className="font-semibold tracking-wide">{label || children}</span>
        )}
      </button>
    );
  }
);

FabApp.displayName = "FabApp";

// --- SPEED DIAL EXPANDABLE COMPONENT ---
export interface SpeedDialAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | "danger" | "yellow" | "blue" | "purpleDark";
  badge?: string;
  disabled?: boolean;
}

export interface SpeedDialAppProps {
  id: string;
  actions: SpeedDialAction[];
  direction?: "top" | "bottom" | "left" | "right";
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnActionClick?: boolean;
  showBackdrop?: boolean;
  mainIcon?: React.ReactNode;
  activeIcon?: React.ReactNode;
  label?: React.ReactNode;
  variant?: FabAppProps["variant"];
  size?: FabAppProps["size"];
  elevation?: FabAppProps["elevation"];
  rounded?: FabAppProps["rounded"];
  position?: FabAppProps["position"];
  className?: string;
}

export function SpeedDialApp({
  id,
  actions,
  direction = "top",
  isOpen: controlledIsOpen,
  defaultOpen = false,
  onOpenChange,
  closeOnActionClick = true,
  showBackdrop = false,
  mainIcon = <Plus className="w-6 h-6" />,
  activeIcon,
  label,
  variant = "primary",
  size = "md",
  elevation = "vibrant",
  rounded = "full",
  position = "none",
  className,
}: SpeedDialAppProps) {
  const [internalOpen, setInternalOpen] = React.useState<boolean>(defaultOpen);
  const isControlled = controlledIsOpen !== undefined;
  const open = isControlled ? controlledIsOpen : internalOpen;

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const nextState = !open;
    if (!isControlled) {
      setInternalOpen(nextState);
    }
    onOpenChange?.(nextState);
  };

  const handleClose = () => {
    if (!isControlled) {
      setInternalOpen(false);
    }
    onOpenChange?.(false);
  };

  // Close on Escape key press or Outside Click
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Position containers for expandable options stack
  const stackDirectionClasses: Record<string, string> = {
    top: "flex-col-reverse bottom-full mb-3 right-0 items-end",
    bottom: "flex-col top-full mt-3 right-0 items-end",
    left: "flex-row-reverse right-full mr-3 top-1/2 -translate-y-1/2 items-center",
    right: "flex-row left-full ml-3 top-1/2 -translate-y-1/2 items-center",
  };

  return (
    <div
      className={cn(
        "relative inline-block transition-all",
        open && "z-[999]",
        position !== "none" &&
          fabVariants({ position })
            .split(" ")
            .filter((c) => c.startsWith("fixed") || c.startsWith("bottom") || c.startsWith("right") || c.startsWith("left") || c.startsWith("top") || c.startsWith("z-"))
            .join(" "),
        className
      )}
    >
      {/* Backdrop overlay */}
      {showBackdrop && open && (
        <div
          className="fixed inset-0 bg-ink/30 backdrop-blur-2xs z-[990] transition-opacity animate-in fade-in duration-200"
          onClick={handleClose}
        />
      )}

      {/* Main Container */}
      <div className="relative z-[1000] flex items-center justify-center">
        {/* Expanded Speed Dial Action Items */}
        {open && (
          <div
            className={cn(
              "absolute flex gap-2.5 z-[1000] transition-all duration-200 animate-in fade-in slide-in-from-bottom-2",
              stackDirectionClasses[direction]
            )}
          >
            {actions.map((action, index) => {
              const actionVariant = action.variant || "secondary";

              return (
                <div
                  key={action.id}
                  className={cn(
                    "flex items-center gap-2 group transition-all duration-150 relative",
                    direction === "left" ? "flex-row-reverse" : "flex-row"
                  )}
                  style={{
                    animationDelay: `${index * 40}ms`,
                  }}
                >
                  {/* Tooltip / Label Card */}
                  {action.label && (
                    <span
                      className={cn(
                        "font-semibold rounded-lg bg-surface text-ink border border-hairline shadow-md whitespace-nowrap transition-all z-[1020]",
                        direction === "left" || direction === "right"
                          ? "absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 text-[11px] opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 pointer-events-none shadow-lg font-medium"
                          : "px-2.5 py-1 text-xs opacity-95 group-hover:opacity-100 group-hover:scale-105"
                      )}
                    >
                      {action.label}
                      {action.badge && (
                        <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-mono rounded bg-vibrant-purple/15 text-vibrant-purple-dark">
                          {action.badge}
                        </span>
                      )}
                    </span>
                  )}

                  {/* Action FAB Button */}
                  <button
                    type="button"
                    id={`speed-dial-action-${action.id}`}
                    disabled={action.disabled}
                    onClick={(e) => {
                      action.onClick(e);
                      if (closeOnActionClick) {
                        handleClose();
                      }
                    }}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-ink bg-surface border border-hairline shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-vibrant-purple-dark/60 flex-shrink-0",
                      actionVariant === "primary" && "bg-vibrant-purple text-vibrant-purple-ink border-transparent",
                      actionVariant === "danger" && "bg-accent text-white border-transparent",
                      actionVariant === "yellow" && "bg-vibrant-yellow text-vibrant-yellow-ink border-transparent",
                      actionVariant === "blue" && "bg-vibrant-blue text-vibrant-blue-ink border-transparent",
                      actionVariant === "purpleDark" && "bg-vibrant-purple-dark text-white border-transparent"
                    )}
                    title={action.label}
                  >
                    {action.icon}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Main Trigger FAB */}
        <FabApp
          id={id}
          variant={variant}
          size={size}
          elevation={elevation}
          rounded={rounded}
          position="none"
          label={label}
          onClick={handleToggle}
          aria-expanded={open}
          icon={
            activeIcon ? (
              open ? activeIcon : mainIcon
            ) : (
              <span className={cn("transition-transform duration-300 inline-block", open && "rotate-45")}>
                {mainIcon}
              </span>
            )
          }
        />
      </div>
    </div>
  );
}
