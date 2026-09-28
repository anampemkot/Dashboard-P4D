import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { TextApp } from "../atoms/TextApp";

export type ContextMenuVariant = "default" | "dark" | "glassmorphism";
export type ContextMenuSize = "sm" | "md" | "lg";
export type ContextMenuRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  children?: ContextMenuItem[];
  onClick?: () => void;
}

export interface ContextMenuItemGroup {
  id?: string;
  heading?: string;
  items: ContextMenuItem[];
}

const contextMenuContainerVariants = cva(
  "select-none font-sans z-50 transition-all duration-150 animate-in fade-in zoom-in-95",
  {
    variants: {
      variant: {
        default: "bg-surface border border-hairline text-ink shadow-2xl",
        dark: "bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl",
        glassmorphism: "bg-surface/85 backdrop-blur-md border border-hairline/60 text-ink shadow-2xl",
      },
      size: {
        sm: "w-48 p-1 space-y-1",
        md: "w-56 p-1.5 space-y-1.5",
        lg: "w-64 p-2 space-y-2",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "xl",
    },
  }
);

export interface ContextMenuAppProps extends VariantProps<typeof contextMenuContainerVariants> {
  id: string;
  items: ContextMenuItemGroup[];
  x?: number;
  y?: number;
  isOpen?: boolean;
  onClose?: () => void;
  variant?: ContextMenuVariant;
  size?: ContextMenuSize;
  rounded?: ContextMenuRounded;
  embedded?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function ContextMenuApp({
  id,
  items,
  x = 0,
  y = 0,
  isOpen = false,
  onClose,
  variant = "default",
  size = "md",
  rounded = "xl",
  embedded = false,
  children,
  className,
}: ContextMenuAppProps) {
  const [coords, setCoords] = React.useState({ x, y });
  const [visible, setVisible] = React.useState(isOpen);
  const [activeSubId, setActiveSubId] = React.useState<string | null>(null);

  React.useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  React.useEffect(() => {
    setCoords({ x, y });
  }, [x, y]);

  // Handle right-click on wrapper
  const handleContextMenu = (e: React.MouseEvent) => {
    if (embedded) return;
    e.preventDefault();
    setCoords({ x: e.clientX, y: e.clientY });
    setVisible(true);
  };

  // Close context menu when clicking outside
  React.useEffect(() => {
    if (!visible || embedded) return;

    const handleClickOutside = () => {
      setVisible(false);
      if (onClose) onClose();
    };

    window.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleClickOutside);
    };
  }, [visible, embedded, onClose]);

  const itemPaddingClass = size === "sm" ? "px-2 py-1 text-xs" : size === "lg" ? "px-3 py-2 text-sm" : "px-2.5 py-1.5 text-xs";
  const iconSizeClass = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  const menuContent = (
    <div
      id={id}
      data-ui-id={id}
      style={!embedded ? { top: `${coords.y}px`, left: `${coords.x}px` } : undefined}
      className={cn(
        contextMenuContainerVariants({ variant, size, rounded }),
        embedded ? "relative" : "fixed shadow-2xl",
        className
      )}
    >
      {items.map((grp, gIdx) => (
        <div key={grp.id || gIdx} className="space-y-0.5">
          {grp.heading && (
            <TextApp
              id={`cmenu-grp-heading-${id}-${gIdx}`}
              variant="caption"
              weight="bold"
              className="text-[10px] uppercase text-ink-muted px-2 py-1 tracking-wider"
            >
              {grp.heading}
            </TextApp>
          )}

          {grp.items.map((item) => {
            const hasSub = item.children && item.children.length > 0;
            const isSubOpen = activeSubId === item.id;

            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => hasSub && setActiveSubId(item.id)}
                onMouseLeave={() => hasSub && setActiveSubId(null)}
              >
                <button
                  type="button"
                  disabled={item.disabled}
                  onClick={() => {
                    if (item.disabled) return;
                    if (item.onClick) item.onClick();
                    if (!hasSub && !embedded) setVisible(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 rounded-lg transition-colors cursor-pointer outline-none text-left",
                    itemPaddingClass,
                    item.disabled ? "opacity-40 cursor-not-allowed" : "",
                    item.danger
                      ? "text-accent hover:bg-accent/10"
                      : variant === "dark"
                      ? "hover:bg-slate-800 text-slate-200"
                      : "hover:bg-action-hover text-ink"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {item.icon && <span className={cn("shrink-0", iconSizeClass)}>{item.icon}</span>}
                    <TextApp
                      id={`cmenu-item-label-${id}-${item.id}`}
                      variant="body2"
                      weight="medium"
                      className={cn("truncate", item.danger ? "text-accent" : "")}
                    >
                      {item.label}
                    </TextApp>
                  </div>

                  {/* Right side: Shortcut or Submenu arrow */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {item.shortcut && (
                      <TextApp
                        id={`cmenu-item-shortcut-${id}-${item.id}`}
                        variant="code"
                        className="text-[10px] py-0 px-1 font-mono text-ink-muted bg-surface-soft border border-hairline-soft rounded"
                      >
                        {item.shortcut}
                      </TextApp>
                    )}
                    {hasSub && <ChevronRight className="w-3.5 h-3.5 text-ink-muted" />}
                  </div>
                </button>

                {/* Submenu Dropdown Box */}
                {hasSub && isSubOpen && (
                  <div
                    className={cn(
                      "absolute top-0 left-full ml-1 z-50 select-none animate-in fade-in zoom-in-95",
                      contextMenuContainerVariants({ variant, size, rounded })
                    )}
                  >
                    {item.children!.map((subItem) => (
                      <button
                        key={subItem.id}
                        type="button"
                        disabled={subItem.disabled}
                        onClick={() => {
                          if (subItem.disabled) return;
                          if (subItem.onClick) subItem.onClick();
                          if (!embedded) setVisible(false);
                        }}
                        className={cn(
                          "w-full flex items-center justify-between gap-3 rounded-lg transition-colors cursor-pointer outline-none text-left",
                          itemPaddingClass,
                          subItem.disabled ? "opacity-40 cursor-not-allowed" : "",
                          subItem.danger
                            ? "text-accent hover:bg-accent/10"
                            : variant === "dark"
                            ? "hover:bg-slate-800 text-slate-200"
                            : "hover:bg-action-hover text-ink"
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {subItem.icon && <span className={cn("shrink-0", iconSizeClass)}>{subItem.icon}</span>}
                          <TextApp
                            id={`cmenu-sub-label-${id}-${subItem.id}`}
                            variant="body2"
                            weight="medium"
                            className={cn("truncate", subItem.danger ? "text-accent" : "")}
                          >
                            {subItem.label}
                          </TextApp>
                        </div>
                        {subItem.shortcut && (
                          <TextApp
                            id={`cmenu-sub-shortcut-${id}-${subItem.id}`}
                            variant="code"
                            className="text-[10px] py-0 px-1 font-mono text-ink-muted bg-surface-soft border border-hairline-soft rounded"
                          >
                            {subItem.shortcut}
                          </TextApp>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {gIdx < items.length - 1 && <div className="h-px bg-hairline-soft my-1" />}
        </div>
      ))}
    </div>
  );

  if (embedded) {
    return menuContent;
  }

  return (
    <div onContextMenu={handleContextMenu} className="relative inline-block w-full">
      {children}
      {visible && menuContent}
    </div>
  );
}
