import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export type PopoverPosition = "top" | "bottom" | "left" | "right";
export interface PopoverActionItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: (item: PopoverActionItem, event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  destructive?: boolean;
  shortcut?: string;
}

const PopoverCloseContext = React.createContext<(() => void) | null>(null);
export interface PopoverAppProps {
  id: string;
  trigger: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  children: React.ReactNode;
  position?: PopoverPosition;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showArrow?: boolean;
  width?: number;
  className?: string;
}

export function PopoverApp({ id, trigger, children, position = "bottom", open, defaultOpen = false, onOpenChange, showArrow = true, width = 288, className }: PopoverAppProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const [mounted, setMounted] = React.useState(false);
  const [coordinates, setCoordinates] = React.useState({ top: 0, left: 0 });
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const isOpen = open ?? internalOpen;

  React.useEffect(() => setMounted(true), []);
  const setOpen = (next: boolean) => { if (open === undefined) setInternalOpen(next); onOpenChange?.(next); };

  // Recomputed continuously on scroll/resize (not just once on open) so the
  // panel tracks its trigger — previously this just closed the popover on
  // any scroll/resize, which felt broken when the trigger sat inside a
  // scrollable container (e.g. a DrawerApp body) rather than the page.
  React.useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const update = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const gap = 10;
      let top = rect.bottom + gap;
      let left = rect.left + rect.width / 2 - width / 2;
      if (position === "top") top = rect.top - gap;
      if (position === "left") { top = rect.top + rect.height / 2; left = rect.left - gap; }
      if (position === "right") { top = rect.top + rect.height / 2; left = rect.right + gap; }
      setCoordinates({ top, left: Math.max(12, Math.min(left, window.innerWidth - width - 12)) });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => { window.removeEventListener("resize", update); window.removeEventListener("scroll", update, true); };
  }, [isOpen, position, width]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (contentRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => { document.removeEventListener("pointerdown", handlePointerDown); document.removeEventListener("keydown", handleKeyDown); };
  }, [isOpen]);

  const triggerElement = React.cloneElement(trigger, {
    ref: (node: HTMLElement | null) => { triggerRef.current = node; const originalRef = (trigger as any).ref; if (typeof originalRef === "function") originalRef(node); else if (originalRef) originalRef.current = node; },
    onClick: (event: React.MouseEvent<HTMLElement>) => { trigger.props.onClick?.(event); setOpen(!isOpen); },
    "aria-expanded": isOpen,
    "aria-controls": `${id}-content`,
  } as any);

  const transform = position === "top" ? "translate(-0%, -100%)" : position === "left" ? "translate(-100%, -50%)" : position === "right" ? "translate(0, -50%)" : undefined;
  const arrowClasses = position === "top" ? "-bottom-1.5 left-1/2 -translate-x-1/2 border-b border-r" : position === "bottom" ? "-top-1.5 left-1/2 -translate-x-1/2 border-l border-t" : position === "left" ? "-right-1.5 top-1/2 -translate-y-1/2 border-r border-t" : "-left-1.5 top-1/2 -translate-y-1/2 border-b border-l";

  return <>{triggerElement}{mounted && isOpen && createPortal(
    <div ref={contentRef} id={`${id}-content`} role="dialog" style={{ top: coordinates.top, left: coordinates.left, width, transform }} className={cn("fixed z-[60] rounded-[var(--radius-lg)] border border-hairline bg-surface p-3 text-ink shadow-card", className)}>
      {showArrow && <span className={cn("absolute h-3 w-3 rotate-45 border-hairline bg-surface", arrowClasses)} />}
      <PopoverCloseContext.Provider value={() => setOpen(false)}>
        <div className="relative z-10">{children}</div>
      </PopoverCloseContext.Provider>
    </div>
  , document.body)}</>;
}

export interface PopoverActionMenuAppProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  items: PopoverActionItem[];
  label?: string;
}

export function PopoverActionMenuApp({ id, items, label = "Menu Aksi", className, ...props }: PopoverActionMenuAppProps) {
  return (
    <div id={id} data-ui-id={id} role="menu" aria-label={label} className={cn("space-y-1", className)} {...props}>
      <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-muted">{label}</div>
      {items.map((item) => <PopoverActionItemApp key={item.id} item={item} />)}
    </div>
  );
}

export function PopoverActionItemApp({ item }: { item: PopoverActionItem }) {
  const closePopover = React.useContext(PopoverCloseContext);
  return (
    <button
      id={`popover-action-${item.id}`}
      type="button"
      role="menuitem"
      disabled={item.disabled}
      onClick={(event) => {
        item.onClick(item, event);
        closePopover?.();
      }}
      className={cn(
        "flex w-full min-w-0 items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-2 text-left text-xs font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        item.destructive ? "text-error hover:bg-error/10" : "text-ink hover:bg-action-hover"
      )}
    >
      {item.icon && <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center [&_svg]:h-4 [&_svg]:w-4">{item.icon}</span>}
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      {item.shortcut && <span className="shrink-0 text-[10px] font-mono text-ink-muted">{item.shortcut}</span>}
    </button>
  );
}
