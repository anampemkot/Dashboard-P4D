import * as React from "react";
import { cn } from "@/lib/utils";
import { TextApp } from "../atoms/TextApp";
import { BadgeApp, BadgeRounded } from "../atoms/BadgeApp";
import { Search, Command, ArrowUp, ArrowDown, CornerDownLeft, X, FileText, Settings, User, Compass, HelpCircle, Layers } from "lucide-react";

export type CommandPaletteVariant = "default" | "purple" | "dark";
export type CommandPaletteSize = "sm" | "md" | "lg";
export type CommandPaletteRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string[]; // e.g. ["⌘", "K"] or ["G", "D"]
  badge?: string;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface CommandGroup {
  id: string;
  heading?: string;
  items: CommandItem[];
}

export interface CommandPaletteAppProps {
  id: string;
  isOpen?: boolean;
  onClose?: () => void;
  placeholder?: string;
  groups?: CommandGroup[];
  variant?: CommandPaletteVariant;
  size?: CommandPaletteSize;
  rounded?: CommandPaletteRounded;
  isInline?: boolean;
  value?: string;
  onValueChange?: (query: string) => void;
  defaultQuery?: string;
  emptyMessage?: string;
  enableGlobalShortcut?: boolean;
  className?: string;
  overlayClassName?: string;
}

const roundedClasses: Record<CommandPaletteRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-3xl",
};

const modalSizeClasses: Record<CommandPaletteSize, string> = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
};

const mapToBadgeRounded = (r: CommandPaletteRounded): BadgeRounded => {
  if (r === "xl") return "lg";
  if (r === "none" || r === "sm" || r === "md" || r === "lg" || r === "full") return r;
  return "md";
};

// Default Sample Command Groups
export const DEFAULT_COMMAND_GROUPS: CommandGroup[] = [
  {
    id: "quick-actions",
    heading: "Quick Actions",
    items: [
      {
        id: "qa-new-doc",
        label: "Create New Document",
        description: "Open editor to draft a new post",
        icon: <FileText className="w-4 h-4 text-vibrant-purple-dark" />,
        shortcut: ["⌘", "N"],
        onSelect: () => console.log("New Document selected"),
      },
      {
        id: "qa-settings",
        label: "Open Account Settings",
        description: "Manage security and notifications",
        icon: <Settings className="w-4 h-4 text-blue-500" />,
        shortcut: ["⌘", ","],
        onSelect: () => console.log("Settings selected"),
      },
    ],
  },
  {
    id: "navigation",
    heading: "Navigation Pages",
    items: [
      {
        id: "nav-dashboard",
        label: "Go to Dashboard",
        description: "Main analytics & overview",
        icon: <Compass className="w-4 h-4 text-emerald-500" />,
        shortcut: ["G", "D"],
        onSelect: () => console.log("Dashboard selected"),
      },
      {
        id: "nav-profile",
        label: "View User Profile",
        description: "Personal details & subscriptions",
        icon: <User className="w-4 h-4 text-purple-500" />,
        shortcut: ["G", "P"],
        onSelect: () => console.log("Profile selected"),
      },
      {
        id: "nav-uikit",
        label: "UI Kit Components Library",
        description: "Explore all 40+ foundation elements",
        icon: <Layers className="w-4 h-4 text-amber-500" />,
        shortcut: ["G", "U"],
        badge: "New",
        onSelect: () => console.log("UI Kit selected"),
      },
    ],
  },
  {
    id: "support",
    heading: "Support & Help",
    items: [
      {
        id: "sup-docs",
        label: "Documentation & API Reference",
        description: "Read guidelines and code specs",
        icon: <HelpCircle className="w-4 h-4 text-slate-400" />,
        shortcut: ["?"],
        onSelect: () => console.log("Help selected"),
      },
    ],
  },
];

export const CommandPaletteApp = React.forwardRef<HTMLDivElement, CommandPaletteAppProps>(
  (
    {
      id,
      isOpen = false,
      onClose,
      placeholder = "Type a command or search...",
      groups = DEFAULT_COMMAND_GROUPS,
      variant = "default",
      size = "md",
      rounded = "xl",
      isInline = false,
      value,
      onValueChange,
      defaultQuery = "",
      emptyMessage = "No results found for",
      enableGlobalShortcut = true,
      className,
      overlayClassName,
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = React.useState<string>(defaultQuery);
    const [highlightedIndex, setHighlightedIndex] = React.useState<number>(0);

    const activeQuery = value !== undefined ? value : searchQuery;
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleQueryChange = (q: string) => {
      if (value === undefined) {
        setSearchQuery(q);
      }
      onValueChange?.(q);
      setHighlightedIndex(0);
    };

    // Filter groups and items according to activeQuery
    const filteredGroups = React.useMemo(() => {
      const q = activeQuery.trim().toLowerCase();
      if (!q) return groups;

      return groups
        .map((group) => {
          const matchingItems = group.items.filter(
            (item) =>
              item.label.toLowerCase().includes(q) ||
              (item.description && item.description.toLowerCase().includes(q)) ||
              (group.heading && group.heading.toLowerCase().includes(q))
          );
          return {
            ...group,
            items: matchingItems,
          };
        })
        .filter((group) => group.items.length > 0);
    }, [groups, activeQuery]);

    // Flatten all items for keyboard navigation
    const flatItems = React.useMemo(() => {
      const items: { item: CommandItem; groupHeading?: string }[] = [];
      filteredGroups.forEach((group) => {
        group.items.forEach((item) => {
          items.push({ item, groupHeading: group.heading });
        });
      });
      return items;
    }, [filteredGroups]);

    // Global Cmd+K / Ctrl+K keyboard shortcut listener
    React.useEffect(() => {
      if (!enableGlobalShortcut || isInline) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          if (isOpen) {
            onClose?.();
          } else {
            // Trigger open callback if provided
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [enableGlobalShortcut, isInline, isOpen, onClose]);

    // Focus input on open
    React.useEffect(() => {
      if (isOpen || isInline) {
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    }, [isOpen, isInline]);

    // Keyboard Arrow navigation & Enter execution
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) => (flatItems.length > 0 ? (prev + 1) % flatItems.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          flatItems.length > 0 ? (prev - 1 + flatItems.length) % flatItems.length : 0
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (flatItems.length > 0 && flatItems[highlightedIndex]) {
          const selectedItem = flatItems[highlightedIndex].item;
          if (!selectedItem.disabled) {
            selectedItem.onSelect?.();
            onClose?.();
          }
        }
      } else if (e.key === "Escape" && !isInline) {
        e.preventDefault();
        onClose?.();
      }
    };

    if (!isOpen && !isInline) {
      return null;
    }

    const modalSizeClass = modalSizeClasses[size];
    const modalRoundedClass = roundedClasses[rounded];
    const badgeRounded = mapToBadgeRounded(rounded);

    // Styling variants
    let containerVariantStyles =
      "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl";
    let highlightItemStyles = "bg-vibrant-purple/10 text-vibrant-purple-dark dark:text-vibrant-purple-light";
    let groupHeaderColor = "text-slate-400 dark:text-slate-500";

    if (variant === "purple") {
      containerVariantStyles =
        "bg-white dark:bg-slate-900 border-2 border-vibrant-purple/40 dark:border-vibrant-purple-light/40 text-slate-900 dark:text-slate-100 shadow-2xl shadow-vibrant-purple/15";
      highlightItemStyles = "bg-vibrant-purple-dark text-white";
      groupHeaderColor = "text-vibrant-purple-dark dark:text-vibrant-purple-light font-bold";
    } else if (variant === "dark") {
      containerVariantStyles =
        "bg-slate-950 border border-slate-800 text-slate-100 shadow-2xl dark";
      highlightItemStyles = "bg-slate-800 text-white";
      groupHeaderColor = "text-slate-500 font-semibold";
    }

    const content = (
      <div
        id={`${id}-modal-box`}
        className={cn(
          "w-full overflow-hidden flex flex-col transition-all text-left",
          modalSizeClass,
          modalRoundedClass,
          containerVariantStyles,
          className
        )}
      >
        {/* Header Search Bar (Step 3 Spacing: px-4 py-3) */}
        <div
          id={`${id}-header`}
          className="px-4 py-3 border-b border-hairline-soft flex items-center gap-3 shrink-0"
        >
          <Search className="w-5 h-5 text-ink-muted shrink-0" />
          <input
            ref={inputRef}
            id={`${id}-input`}
            type="text"
            value={activeQuery}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 font-sans text-sm md:text-base p-0 m-0"
          />

          {activeQuery ? (
            <button
              id={`${id}-clear-btn`}
              onClick={() => handleQueryChange("")}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-ink-muted hover:text-ink cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <BadgeApp
              id={`${id}-esc-badge`}
              variant="neutral"
              size="sm"
              rounded={badgeRounded}
              className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase text-ink-muted"
            >
              ESC
            </BadgeApp>
          )}
        </div>

        {/* Grouped Results List Container */}
        <div id={`${id}-results-container`} className="max-h-80 overflow-y-auto p-2 space-y-3">
          {flatItems.length === 0 ? (
            /* Empty State (Step 3 Spacing: p-6) */
            <div id={`${id}-empty-state`} className="p-6 text-center space-y-2">
              <TextApp id={`${id}-empty-msg`} variant="body" className="text-slate-500">
                {emptyMessage}{" "}
                <TextApp id={`${id}-empty-query`} as="span" variant="body" weight="bold" className="text-ink font-mono">
                  "{activeQuery}"
                </TextApp>
              </TextApp>
              <TextApp id={`${id}-empty-sub`} variant="caption" className="text-slate-400">
                Try searching for another keyword or command.
              </TextApp>
            </div>
          ) : (
            filteredGroups.map((group) => {
              return (
                <div key={group.id} id={`${id}-group-${group.id}`} className="space-y-1">
                  {group.heading && (
                    /* Group Heading (Step 2 Spacing: px-2 py-1) */
                    <div className="px-2 py-1">
                      <TextApp
                        id={`${id}-group-heading-${group.id}`}
                        variant="caption"
                        weight="bold"
                        className={cn("uppercase tracking-wider text-[11px]", groupHeaderColor)}
                      >
                        {group.heading}
                      </TextApp>
                    </div>
                  )}

                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const itemIndex = flatItems.findIndex((fi) => fi.item.id === item.id);
                      const isHighlighted = itemIndex === highlightedIndex;

                      return (
                        <div
                          key={item.id}
                          id={`${id}-item-${item.id}`}
                          onMouseEnter={() => setHighlightedIndex(itemIndex)}
                          onClick={() => {
                            if (!item.disabled) {
                              item.onSelect?.();
                              onClose?.();
                            }
                          }}
                          className={cn(
                            "px-3 py-2.5 rounded-lg flex items-center justify-between gap-2 transition-colors cursor-pointer select-none",
                            isHighlighted ? highlightItemStyles : "hover:bg-slate-100 dark:hover:bg-slate-800/60",
                            item.disabled && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          {/* Item Left Info (Step 1.5 Spacing: gap-1.5) */}
                          <div className="flex items-center gap-2.5 min-w-0">
                            {item.icon && (
                              <div
                                className={cn(
                                  "shrink-0 transition-colors flex items-center justify-center",
                                  isHighlighted
                                    ? variant === "purple"
                                      ? "[&_svg]:!text-white [&_svg]:!stroke-white text-white"
                                      : variant === "dark"
                                      ? "[&_svg]:!text-white [&_svg]:!stroke-white text-white"
                                      : "[&_svg]:!text-vibrant-purple-dark dark:[&_svg]:!text-vibrant-purple-light text-vibrant-purple-dark dark:text-vibrant-purple-light"
                                    : "text-slate-500 dark:text-slate-400 [&_svg]:text-current"
                                )}
                              >
                                {item.icon}
                              </div>
                            )}
                            <div className="flex flex-col gap-0.5 min-w-0 text-left">
                              <div className="flex items-center gap-2">
                                <TextApp
                                  id={`${id}-item-title-${item.id}`}
                                  variant="body"
                                  weight="medium"
                                  className={cn(
                                    "truncate leading-tight transition-colors",
                                    isHighlighted
                                      ? variant === "purple"
                                        ? "text-white dark:text-white font-semibold"
                                        : variant === "dark"
                                        ? "text-white dark:text-white font-semibold"
                                        : "text-vibrant-purple-dark dark:text-vibrant-purple-light font-semibold"
                                      : "text-slate-900 dark:text-slate-100"
                                  )}
                                >
                                  {item.label}
                                </TextApp>
                                {item.badge && (
                                  <BadgeApp
                                    id={`${id}-item-badge-${item.id}`}
                                    variant={isHighlighted && variant === "purple" ? "neutral" : "solidPurple"}
                                    size="sm"
                                    rounded={badgeRounded}
                                    className={cn(
                                      "px-1.5 py-0 text-[10px] uppercase font-bold transition-colors",
                                      isHighlighted && variant === "purple"
                                        ? "bg-white text-vibrant-purple-dark border-transparent shadow-xs"
                                        : ""
                                    )}
                                  >
                                    {item.badge}
                                  </BadgeApp>
                                )}
                              </div>
                              {item.description && (
                                <TextApp
                                  id={`${id}-item-desc-${item.id}`}
                                  variant="caption"
                                  className={cn(
                                    "truncate leading-none text-xs transition-colors",
                                    isHighlighted
                                      ? variant === "purple"
                                        ? "text-purple-100 dark:text-purple-100"
                                        : variant === "dark"
                                        ? "text-slate-300 dark:text-slate-300"
                                        : "text-vibrant-purple-dark/80 dark:text-vibrant-purple-light/80"
                                      : "text-slate-400 dark:text-slate-500"
                                  )}
                                >
                                  {item.description}
                                </TextApp>
                              )}
                            </div>
                          </div>

                          {/* Item Right Shortcut Hint (Step 1 Spacing: gap-1 & px-1.5 py-0.5) */}
                          {item.shortcut && item.shortcut.length > 0 && (
                            <div className="flex items-center gap-1 shrink-0">
                              {item.shortcut.map((scKey, idx) => (
                                <BadgeApp
                                  key={idx}
                                  id={`${id}-shortcut-${item.id}-${idx}`}
                                  variant="neutral"
                                  size="sm"
                                  rounded={badgeRounded}
                                  className={cn(
                                    "px-1.5 py-0.5 text-[10px] font-mono font-semibold min-w-[20px] text-center border transition-colors",
                                    isHighlighted
                                      ? variant === "purple"
                                        ? "bg-white/25 text-white border-white/40 dark:bg-white/25 dark:text-white dark:border-white/40 shadow-xs"
                                        : variant === "dark"
                                        ? "bg-slate-700 text-slate-100 border-slate-600"
                                        : "bg-vibrant-purple/20 text-vibrant-purple-dark border-vibrant-purple/30 dark:bg-vibrant-purple/30 dark:text-vibrant-purple-light"
                                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                                  )}
                                >
                                  {scKey}
                                </BadgeApp>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Keyboard Hints (Step 3 Spacing: px-4 py-2.5) */}
        <div
          id={`${id}-footer`}
          className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/60 border-t border-hairline-soft flex items-center justify-between text-xs text-slate-500 shrink-0 flex-wrap gap-2"
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <BadgeApp id={`${id}-ft-up`} variant="neutral" size="sm" rounded={badgeRounded} className="px-1 py-0.5">
                <ArrowUp className="w-3 h-3" />
              </BadgeApp>
              <BadgeApp id={`${id}-ft-down`} variant="neutral" size="sm" rounded={badgeRounded} className="px-1 py-0.5">
                <ArrowDown className="w-3 h-3" />
              </BadgeApp>
              <TextApp id={`${id}-ft-nav-txt`} variant="caption" className="text-slate-500 font-medium">
                Navigate
              </TextApp>
            </span>

            <span className="flex items-center gap-1">
              <BadgeApp id={`${id}-ft-enter`} variant="neutral" size="sm" rounded={badgeRounded} className="px-1 py-0.5">
                <CornerDownLeft className="w-3 h-3" />
              </BadgeApp>
              <TextApp id={`${id}-ft-sel-txt`} variant="caption" className="text-slate-500 font-medium">
                Select
              </TextApp>
            </span>
          </div>

          <div className="flex items-center gap-1">
            <BadgeApp id={`${id}-ft-esc`} variant="neutral" size="sm" rounded={badgeRounded} className="px-1.5 py-0.5 text-[10px] font-mono">
              ESC
            </BadgeApp>
            <TextApp id={`${id}-ft-close-txt`} variant="caption" className="text-slate-500 font-medium">
              Close
            </TextApp>
          </div>
        </div>
      </div>
    );

    if (isInline) {
      return (
        <div id={`${id}-inline-wrapper`} ref={ref} data-ui-id={id} className="w-full">
          {content}
        </div>
      );
    }

    return (
      <div
        id={`${id}-backdrop-overlay`}
        ref={ref}
        data-ui-id={id}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose?.();
          }
        }}
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 overflow-y-auto animate-in fade-in duration-200",
          overlayClassName
        )}
      >
        {content}
      </div>
    );
  }
);

CommandPaletteApp.displayName = "CommandPaletteApp";
