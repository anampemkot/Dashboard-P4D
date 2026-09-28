import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextApp } from "../atoms/TextApp";

export interface BreadcrumbItem {
  id?: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isCurrentPage?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

export type BreadcrumbVariant = "default" | "muted" | "pills";
export type BreadcrumbSize = "sm" | "md" | "lg";
export type BreadcrumbRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

const roundedClasses: Record<BreadcrumbRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export interface BreadcrumbAppProps {
  id?: string;
  items: BreadcrumbItem[];
  separator?: React.ReactNode | string;
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
  size?: BreadcrumbSize;
  variant?: BreadcrumbVariant;
  rounded?: BreadcrumbRounded;
  className?: string;
  itemClassName?: string;
  separatorClassName?: string;
  ariaLabel?: string;
}

const breadcrumbLinkVariants = cva(
  "inline-flex items-center gap-1 transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vibrant-purple cursor-pointer min-w-0 max-w-xs truncate",
  {
    variants: {
      variant: {
        default:
          "text-slate-600 dark:text-slate-400 hover:text-vibrant-purple-dark dark:hover:text-vibrant-purple-light hover:underline underline-offset-4 py-0.5 px-1",
        muted:
          "text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 py-0.5 px-1",
        pills:
          "bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/80 px-2.5 py-1 font-medium shadow-2xs",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      isCurrent: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        isCurrent: true,
        className:
          "font-bold text-slate-900 dark:text-slate-100 hover:no-underline cursor-default",
      },
      {
        variant: "muted",
        isCurrent: true,
        className:
          "font-bold text-slate-900 dark:text-slate-100 cursor-default",
      },
      {
        variant: "pills",
        isCurrent: true,
        className:
          "bg-vibrant-purple-dark dark:bg-vibrant-purple-dark text-white dark:text-white font-bold shadow-xs cursor-default hover:bg-vibrant-purple-dark dark:hover:bg-vibrant-purple-dark",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      isCurrent: false,
    },
  }
);

export function BreadcrumbApp({
  id = "breadcrumb-app",
  items = [],
  separator,
  maxItems,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  size = "md",
  variant = "default",
  rounded = "md",
  className,
  itemClassName,
  separatorClassName,
  ariaLabel = "Breadcrumb",
}: BreadcrumbAppProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLLIElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (!items || items.length === 0) return null;

  // Determine if collapsing is required
  const shouldCollapse = maxItems !== undefined && items.length > maxItems;

  let visibleBefore: BreadcrumbItem[] = [];
  let collapsedItems: BreadcrumbItem[] = [];
  let visibleAfter: BreadcrumbItem[] = [];

  if (shouldCollapse) {
    const beforeCount = Math.max(1, itemsBeforeCollapse);
    const afterCount = Math.max(1, itemsAfterCollapse);

    if (beforeCount + afterCount < items.length) {
      visibleBefore = items.slice(0, beforeCount);
      collapsedItems = items.slice(beforeCount, items.length - afterCount);
      visibleAfter = items.slice(items.length - afterCount);
    } else {
      visibleBefore = items;
    }
  } else {
    visibleBefore = items;
  }

  const roundedClass = roundedClasses[rounded];

  // Render Separator
  const renderSeparator = (indexKey: string | number) => {
    return (
      <li
        key={`sep-${indexKey}`}
        aria-hidden="true"
        className={cn("flex items-center text-slate-400 dark:text-slate-500 shrink-0", separatorClassName)}
      >
        {separator ? (
          typeof separator === "string" ? (
            <TextApp
              id={`${id}-sep-text-${indexKey}`}
              variant="caption"
              className="text-slate-400 dark:text-slate-500 font-medium px-0.5 select-none"
            >
              {separator}
            </TextApp>
          ) : (
            separator
          )
        ) : (
          <ChevronRight
            className={cn(
              "shrink-0 stroke-[2]",
              size === "sm" && "w-3 h-3",
              size === "md" && "w-3.5 h-3.5",
              size === "lg" && "w-4 h-4"
            )}
          />
        )}
      </li>
    );
  };

  // Render Individual Breadcrumb Item
  const renderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    const isCurrent = item.isCurrentPage || isLast;
    const itemId = item.id || `${id}-item-${index}`;

    const linkContent = (
      <>
        {item.icon && (
          <span
            className={cn(
              "shrink-0 flex items-center justify-center transition-colors",
              isCurrent
                ? variant === "pills"
                  ? "text-white dark:text-white"
                  : "text-vibrant-purple-dark dark:text-vibrant-purple-light"
                : "text-slate-500 dark:text-slate-400 group-hover:text-current"
            )}
          >
            {item.icon}
          </span>
        )}
        <TextApp
          id={`${itemId}-label`}
          variant={size === "sm" ? "caption" : "body"}
          weight={isCurrent ? "bold" : "medium"}
          className={cn(
            "leading-none transition-colors truncate",
            size === "sm" && "text-xs",
            size === "md" && "text-sm",
            size === "lg" && "text-base",
            isCurrent
              ? variant === "pills"
                ? "text-white dark:text-white"
                : "text-slate-900 dark:text-slate-100"
              : ""
          )}
        >
          {item.label}
        </TextApp>
      </>
    );

    return (
      <li key={itemId} className="flex items-center min-w-0">
        {isCurrent ? (
          <span
            id={itemId}
            aria-current="page"
            className={cn(
              breadcrumbLinkVariants({ variant, size, isCurrent: true }),
              roundedClass,
              itemClassName
            )}
          >
            {linkContent}
          </span>
        ) : item.href ? (
          <a
            id={itemId}
            href={item.href}
            onClick={item.onClick}
            className={cn(
              "group",
              breadcrumbLinkVariants({ variant, size, isCurrent: false }),
              roundedClass,
              itemClassName
            )}
          >
            {linkContent}
          </a>
        ) : (
          <button
            id={itemId}
            type="button"
            onClick={item.onClick}
            className={cn(
              "group",
              breadcrumbLinkVariants({ variant, size, isCurrent: false }),
              roundedClass,
              itemClassName
            )}
          >
            {linkContent}
          </button>
        )}
      </li>
    );
  };

  return (
    <nav id={id} data-ui-id={id} aria-label={ariaLabel} className={cn("w-full text-left", className)}>
      <ol className="flex items-center flex-wrap gap-1.5 list-none p-0 m-0">
        {/* Render visible items before collapse */}
        {visibleBefore.map((item, idx) => {
          const isLastInTotal = !shouldCollapse && idx === visibleBefore.length - 1;
          return (
            <React.Fragment key={item.id || `before-${idx}`}>
              {renderItem(item, idx, isLastInTotal)}
              {(!isLastInTotal || shouldCollapse) && renderSeparator(`before-${idx}`)}
            </React.Fragment>
          );
        })}

        {/* Render collapsed ellipsis item */}
        {shouldCollapse && collapsedItems.length > 0 && (
          <React.Fragment key="collapsed-ellipsis-fragment">
            <li className="relative flex items-center min-w-0" ref={dropdownRef}>
              <button
                id={`${id}-ellipsis-trigger`}
                type="button"
                aria-label="Tampilkan sisa jalur navigasi"
                aria-expanded={isDropdownOpen}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className={cn(
                  "flex items-center justify-center p-1 transition-all rounded-md cursor-pointer border border-transparent",
                  variant === "pills"
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 px-2 py-1"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800",
                  roundedClass
                )}
              >
                <MoreHorizontal className="w-4 h-4" />
                <TextApp id={`${id}-ellipsis-text`} variant="caption" className="sr-only">
                  Buka sisa menu
                </TextApp>
              </button>

              {/* Collapsed Items Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  id={`${id}-ellipsis-dropdown`}
                  className="absolute left-0 top-full mt-1.5 z-50 min-w-[180px] p-1.5 bg-surface dark:bg-slate-900 rounded-xl border border-hairline shadow-lg space-y-0.5 text-left animate-in fade-in-50 zoom-in-95"
                >
                  <TextApp
                    id={`${id}-ellipsis-dropdown-header`}
                    variant="caption"
                    weight="bold"
                    className="px-2 py-1 text-[10px] text-ink-muted uppercase tracking-wider block border-b border-hairline-soft mb-1"
                  >
                    Jalur Halaman ({collapsedItems.length})
                  </TextApp>
                  {collapsedItems.map((colItem, cIdx) => (
                    <a
                      key={colItem.id || `col-${cIdx}`}
                      id={`${id}-col-item-${cIdx}`}
                      href={colItem.href || "#"}
                      onClick={(e) => {
                        if (colItem.onClick) colItem.onClick(e);
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-vibrant-purple/10 hover:text-vibrant-purple-dark dark:hover:text-vibrant-purple-light transition-colors"
                    >
                      {colItem.icon && <span className="shrink-0">{colItem.icon}</span>}
                      <TextApp id={`${id}-col-label-${cIdx}`} variant="body" className="text-xs truncate">
                        {colItem.label}
                      </TextApp>
                    </a>
                  ))}
                </div>
              )}
            </li>
            {visibleAfter.length > 0 && renderSeparator("collapsed-after")}
          </React.Fragment>
        )}

        {/* Render visible items after collapse */}
        {shouldCollapse &&
          visibleAfter.map((item, idx) => {
            const isLast = idx === visibleAfter.length - 1;
            return (
              <React.Fragment key={item.id || `after-${idx}`}>
                {renderItem(item, visibleBefore.length + collapsedItems.length + idx, isLast)}
                {!isLast && renderSeparator(`after-${idx}`)}
              </React.Fragment>
            );
          })}
      </ol>
    </nav>
  );
}
