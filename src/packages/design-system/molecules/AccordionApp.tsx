import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { TextApp } from "../atoms/TextApp";

export type AccordionType = "single" | "multiple";
export type AccordionIconStyle = "chevron" | "plusMinus";
export type AccordionVariant = "default" | "bordered" | "separated" | "vibrant";

const accordionItemVariants = cva(
  "transition-all duration-200 overflow-hidden font-sans",
  {
    variants: {
      variant: {
        default: "border-b border-hairline last:border-b-0",
        bordered: "border border-hairline rounded-xl mb-2 last:mb-0 bg-surface",
        separated: "border border-hairline rounded-xl mb-3 last:mb-0 bg-surface shadow-2xs",
        vibrant: "border border-vibrant-purple/20 rounded-xl mb-2 last:mb-0 bg-vibrant-purple/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AccordionItemData {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionAppProps {
  id: string;
  items: AccordionItemData[];
  type?: AccordionType;
  iconStyle?: AccordionIconStyle;
  variant?: AccordionVariant;
  defaultExpandedIds?: string[];
  className?: string;
}

export function AccordionApp({
  id,
  items,
  type = "single",
  iconStyle = "chevron",
  variant = "default",
  defaultExpandedIds = [],
  className,
}: AccordionAppProps) {
  const [expandedIds, setExpandedIds] = React.useState<string[]>(
    defaultExpandedIds.length > 0 ? defaultExpandedIds : items.length > 0 ? [items[0].id] : []
  );
  const reducedMotion = useReducedMotion();
  const transition = reducedMotion
    ? { duration: 0.01 }
    : { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const };

  const toggleItem = (itemId: string, disabled?: boolean) => {
    if (disabled) return;

    if (type === "single") {
      setExpandedIds((prev) => (prev.includes(itemId) ? [] : [itemId]));
    } else {
      setExpandedIds((prev) =>
        prev.includes(itemId) ? prev.filter((i) => i !== itemId) : [...prev, itemId]
      );
    }
  };

  return (
    <div id={id} data-ui-id={id} className={cn("w-full space-y-1 font-sans", className)}>
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id);

        return (
          <div
            key={item.id}
            id={`accordion-item-${item.id}`}
            data-expanded={isExpanded}
            className={cn(accordionItemVariants({ variant }))}
          >
            {/* Header / Trigger */}
            <button
              type="button"
              disabled={item.disabled}
              onClick={() => toggleItem(item.id, item.disabled)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3.5 text-left transition-all duration-200 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-vibrant-purple",
                isExpanded ? "bg-action-hover/60" : "hover:bg-action-hover/40",
                item.disabled && "opacity-40 cursor-not-allowed"
              )}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {item.icon && <span className="text-vibrant-purple-dark shrink-0">{item.icon}</span>}
                <div className="min-w-0 flex-1">
                  <TextApp id={`acc-title-${item.id}`} variant="body" weight="semibold" className="text-ink text-sm">
                    {item.title}
                  </TextApp>
                  {item.subtitle && (
                    <TextApp id={`acc-sub-${item.id}`} variant="caption" className="text-ink-muted text-xs block mt-0.5">
                      {item.subtitle}
                    </TextApp>
                  )}
                </div>
              </div>

              {/* Expand / Collapse Icon */}
              <div className="shrink-0 ml-3 text-ink-muted transition-transform duration-200">
                {iconStyle === "plusMinus" ? (
                  isExpanded ? (
                    <Minus className="w-4 h-4 text-vibrant-purple-dark" />
                  ) : (
                    <Plus className="w-4 h-4 text-ink-muted" />
                  )
                ) : (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      isExpanded ? "rotate-180 text-vibrant-purple-dark" : "text-ink-muted"
                    )}
                  />
                )}
              </div>
            </button>

            {/* Content Area */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={transition}
                  style={{ overflow: "hidden" }}
                >
                  <div className="px-4 pb-4 pt-1 text-sm text-ink-secondary border-t border-hairline/40 bg-surface/50">
                    {typeof item.content === "string" ? (
                      <TextApp id={`acc-content-${item.id}`} variant="body" className="text-xs text-ink-secondary leading-relaxed">
                        {item.content}
                      </TextApp>
                    ) : (
                      item.content
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
