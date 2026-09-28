import * as React from "react";
import { cva } from "class-variance-authority";
import { ChevronDown, Check, X, Search, CheckSquare, Square, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { BadgeApp } from "../atoms/BadgeApp";
import { ChipsApp } from "../atoms/ChipsApp";
import { TextApp } from "../atoms/TextApp";

export interface DropdownOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  disabled?: boolean;
  badge?: string;
  group?: string;
}

export type DropdownSize = "sm" | "md" | "lg";
export type DropdownVariant = "default" | "error" | "success";

export interface DropdownAppProps {
  id?: string;
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: any, selectedOptions?: DropdownOption | DropdownOption[]) => void;
  disabled?: boolean;
  isMulti?: boolean;
  searchable?: boolean;
  isCreatable?: boolean;
  onCreateOption?: (inputValue: string) => void;
  tagType?: "badge" | "chip";
  size?: DropdownSize;
  variant?: DropdownVariant;
  helperText?: string;
  showClear?: boolean;
  maxMenuHeight?: string;
  className?: string;
  dropdownClassName?: string;
  icon?: React.ComponentType<{ className?: string }>;
  name?: string;
  required?: boolean;
  readOnly?: boolean;
  emptyText?: string;
  searchPlaceholder?: string;
}

const dropdownTriggerVariants = cva(
  "w-full flex items-center justify-between border bg-surface transition-all select-none focus:outline-none cursor-pointer",
  {
    variants: {
      size: {
        sm: "min-h-[32px] px-2.5 py-1 text-xs rounded-lg gap-1.5",
        md: "min-h-[40px] px-3 py-1.5 text-sm rounded-xl gap-2",
        lg: "min-h-[48px] px-4 py-2 text-base rounded-xl gap-2.5",
      },
      variant: {
        default:
          "border-hairline text-ink hover:border-vibrant-purple/60 focus:border-vibrant-purple focus:ring-2 focus:ring-vibrant-purple/20",
        error: "border-error text-error focus:ring-2 focus:ring-error/20",
        success: "border-success text-success focus:ring-2 focus:ring-success/20",
      },
      disabled: {
        true: "bg-surface-soft border-hairline-soft opacity-60 cursor-not-allowed pointer-events-none text-ink-muted",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      disabled: false,
    },
  }
);

export const DropdownApp = React.forwardRef<HTMLDivElement, DropdownAppProps>(
  (
    {
      id: propId,
      label,
      placeholder = "Pilih opsi...",
      options = [],
      value: controlledValue,
      defaultValue,
      onChange,
      disabled = false,
      isMulti = false,
      searchable = false,
      isCreatable = false,
      onCreateOption,
      tagType = "badge",
      size = "md",
      variant = "default",
      helperText,
      showClear = false,
      maxMenuHeight = "max-h-60",
      className,
      dropdownClassName,
      icon: InputIcon,
      name,
      required = false,
      readOnly = false,
      emptyText = "Tidak ada hasil ditemukan",
      searchPlaceholder = "Cari opsi...",
    },
    ref
  ) => {
    const generatedId = React.useId();
    const id = propId || `dropdown-${generatedId}`;

    // Internal state for controlled/uncontrolled behavior
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState<string | string[]>(() => {
      if (defaultValue !== undefined) return defaultValue;
      return isMulti ? [] : "";
    });

    const currentValue = isControlled ? controlledValue! : internalValue;

    const [isOpen, setIsOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);

    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const popoverRef = React.useRef<HTMLDivElement | null>(null);
    const searchInputRef = React.useRef<HTMLInputElement | null>(null);

    // Auto placement states (top vs bottom, left vs right) to prevent viewport clipping
    const [placementY, setPlacementY] = React.useState<"bottom" | "top">("bottom");
    const [placementX, setPlacementX] = React.useState<"left" | "right">("left");

    // Dynamic placement check on open, window scroll, or resize
    React.useLayoutEffect(() => {
      if (!isOpen || !containerRef.current) return;

      const updatePosition = () => {
        if (!containerRef.current) return;
        const triggerRect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        const popoverHeight = popoverRef.current ? popoverRef.current.offsetHeight : 260;
        const popoverWidth = popoverRef.current ? popoverRef.current.offsetWidth : triggerRect.width;

        const spaceBelow = viewportHeight - triggerRect.bottom;
        const spaceAbove = triggerRect.top;

        if (spaceBelow < popoverHeight && spaceAbove > spaceBelow) {
          setPlacementY("top");
        } else {
          setPlacementY("bottom");
        }

        const spaceRight = viewportWidth - triggerRect.left;
        if (spaceRight < popoverWidth && triggerRect.right >= popoverWidth) {
          setPlacementX("right");
        } else {
          setPlacementX("left");
        }
      };

      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }, [isOpen]);

    // Focus search input when popover opens
    React.useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 50);
      }
      if (!isOpen) {
        setSearchQuery("");
        setFocusedIndex(-1);
      }
    }, [isOpen, searchable]);

    // Close on click outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filtered options based on search query
    const filteredOptions = React.useMemo(() => {
      if (!searchQuery.trim()) return options;
      const q = searchQuery.toLowerCase();
      return options.filter(
        (opt) =>
          opt.label.toLowerCase().includes(q) ||
          (opt.description && opt.description.toLowerCase().includes(q))
      );
    }, [options, searchQuery]);

    const exactMatchExists = React.useMemo(() => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.trim().toLowerCase();
      return options.some((opt) => opt.label.toLowerCase() === q);
    }, [options, searchQuery]);

    // Highlight text search match helper
    const renderHighlightedText = (text: string, query: string) => {
      if (!query.trim()) return text;
      const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const parts = text.split(new RegExp(`(${safeQuery})`, "gi"));
      return (
        <span>
          {parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase() ? (
              <mark key={i} className="bg-vibrant-purple/30 text-vibrant-purple-dark font-semibold rounded px-0.5">
                {part}
              </mark>
            ) : (
              part
            )
          )}
        </span>
      );
    };

    // Value helpers
    const selectedOptionsList = React.useMemo(() => {
      if (isMulti) {
        const arr = Array.isArray(currentValue) ? currentValue : [];
        return options.filter((opt) => arr.includes(opt.value));
      } else {
        const valStr = typeof currentValue === "string" ? currentValue : "";
        const match = options.find((opt) => opt.value === valStr);
        return match ? [match] : [];
      }
    }, [options, currentValue, isMulti]);

    const isOptionSelected = (optValue: string) => {
      if (isMulti) {
        return Array.isArray(currentValue) && currentValue.includes(optValue);
      }
      return currentValue === optValue;
    };

    const handleSelectOption = (option: DropdownOption, e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (option.disabled || disabled || readOnly) return;

      if (isMulti) {
        const currentArr = Array.isArray(currentValue) ? [...currentValue] : [];
        const exists = currentArr.includes(option.value);
        let updated: string[];
        if (exists) {
          updated = currentArr.filter((v) => v !== option.value);
        } else {
          updated = [...currentArr, option.value];
        }
        if (!isControlled) {
          setInternalValue(updated);
        }
        const updatedSelectedOptions = options.filter((opt) => updated.includes(opt.value));
        onChange?.(updated, updatedSelectedOptions);
      } else {
        const updated = option.value;
        if (!isControlled) {
          setInternalValue(updated);
        }
        onChange?.(updated, option);
        setIsOpen(false);
      }
    };

    const handleCreateNewOption = (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!searchQuery.trim() || disabled || readOnly) return;
      const rawText = searchQuery.trim();
      const newOptVal = rawText.toLowerCase().replace(/\s+/g, "_");
      const newOpt: DropdownOption = {
        label: rawText,
        value: newOptVal,
      };
      onCreateOption?.(rawText);
      handleSelectOption(newOpt);
      setSearchQuery("");
    };

    const handleClearAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled || readOnly) return;
      const emptyVal = isMulti ? [] : "";
      if (!isControlled) {
        setInternalValue(emptyVal);
      }
      onChange?.(emptyVal, isMulti ? [] : undefined);
    };

    const handleSelectAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isMulti || disabled || readOnly) return;
      const availableValues = filteredOptions.filter((o) => !o.disabled).map((o) => o.value);
      if (!isControlled) {
        setInternalValue(availableValues);
      }
      const selectedOpts = options.filter((opt) => availableValues.includes(opt.value));
      onChange?.(availableValues, selectedOpts);
    };

    // Keyboard navigation handlers
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled || readOnly) return;

      if (!isOpen) {
        if (e.key === "Enter" || e.key === "ArrowDown" || e.key === " ") {
          e.preventDefault();
          setIsOpen(true);
        }
        return;
      }

      const totalItemsCount = filteredOptions.length + (isCreatable && !exactMatchExists ? 1 : 0);

      switch (e.key) {
        case "Escape":
        case "Tab":
          setIsOpen(false);
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) => (prev < totalItemsCount - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : totalItemsCount - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
            handleSelectOption(filteredOptions[focusedIndex]);
          } else if (isCreatable && !exactMatchExists && focusedIndex === filteredOptions.length) {
            handleCreateNewOption();
          }
          break;
      }
    };

    const hasValue = isMulti
      ? Array.isArray(currentValue) && currentValue.length > 0
      : Boolean(currentValue);

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn("relative inline-block w-full flex-col gap-1.5", isOpen ? "z-40" : "z-10", className)}
        onKeyDown={handleKeyDown}
      >
        {/* Label */}
        {label && (
          <label htmlFor={id} className="block text-xs font-semibold text-ink mb-1 select-none">
            {label}
            {required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}

        {/* Trigger Button Input */}
        <div
          id={id}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          tabIndex={disabled ? -1 : 0}
          onClick={() => !disabled && !readOnly && setIsOpen((prev) => !prev)}
          className={cn(
            dropdownTriggerVariants({ size, variant, disabled }),
            isOpen && "ring-2 ring-vibrant-purple/20 border-vibrant-purple"
          )}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0 overflow-hidden">
            {InputIcon && <InputIcon className="w-4 h-4 text-ink-muted flex-shrink-0" />}

            {/* Display Selected Items / Placeholder */}
            {isMulti ? (
              <div className="flex flex-wrap gap-1.5 items-center py-0.5 max-w-full overflow-hidden">
                {selectedOptionsList.length > 0 ? (
                  selectedOptionsList.map((opt) => (
                    tagType === "chip" ? (
                      <ChipsApp
                        id={`chip-opt-${opt.value}`}
                        key={opt.value}
                        chipType="input"
                        variant="vibrant"
                        size="sm"
                        removable={!disabled && !readOnly}
                        onRemove={(e) => handleSelectOption(opt, e as any)}
                        className="whitespace-nowrap truncate max-w-full"
                      >
                        {opt.label}
                      </ChipsApp>
                    ) : (
                      <BadgeApp
                        id={`badge-opt-${opt.value}`}
                        key={opt.value}
                        variant="solidPurple"
                        size="sm"
                        rounded="pill"
                        className="inline-flex items-center gap-1 max-w-full truncate whitespace-nowrap"
                      >
                        <span className="truncate whitespace-nowrap max-w-[120px] inline-block">{opt.label}</span>
                        {!disabled && !readOnly && (
                          <X
                            className="w-3 h-3 cursor-pointer opacity-70 hover:opacity-100 flex-shrink-0"
                            onClick={(e) => handleSelectOption(opt, e)}
                          />
                        )}
                      </BadgeApp>
                    )
                  ))
                ) : (
                  <span className="text-ink-muted truncate select-none">{placeholder}</span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 truncate flex-1 min-w-0">
                {selectedOptionsList[0] ? (
                  <>
                    {(() => {
                      const SelectedIcon = selectedOptionsList[0].icon;
                      return SelectedIcon ? (
                        <SelectedIcon className="w-4 h-4 text-vibrant-purple-dark flex-shrink-0" />
                      ) : null;
                    })()}
                    <span className="text-ink font-medium truncate">{selectedOptionsList[0].label}</span>
                    {selectedOptionsList[0].badge && (
                      <BadgeApp
                        id={`selected-badge-${selectedOptionsList[0].value}`}
                        variant="vibrantPurple"
                        size="sm"
                        rounded="pill"
                        className="ml-auto flex-shrink-0 whitespace-nowrap truncate max-w-full"
                      >
                        {selectedOptionsList[0].badge}
                      </BadgeApp>
                    )}
                  </>
                ) : (
                  <span className="text-ink-muted truncate select-none">{placeholder}</span>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons (Clear & Chevron) */}
          <div className="flex items-center gap-1.5 flex-shrink-0 ml-1">
            {showClear && hasValue && !disabled && !readOnly && (
              <button
                type="button"
                onClick={handleClearAll}
                className="p-1 text-ink-muted hover:text-ink rounded-md transition-colors focus:outline-none"
                title="Hapus pilihan"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <ChevronDown
              className={cn(
                "w-4 h-4 text-ink-muted transition-transform duration-200",
                isOpen && "rotate-180 text-vibrant-purple"
              )}
            />
          </div>
        </div>

        {/* Hidden Form Input for standard form compatibility */}
        {name && (
          <input
            type="hidden"
            name={name}
            value={Array.isArray(currentValue) ? currentValue.join(",") : currentValue}
          />
        )}

        {/* Helper text */}
        {helperText && (
          <p
            className={cn(
              "text-xs mt-1 select-none",
              variant === "error" ? "text-error font-medium" : variant === "success" ? "text-success font-medium" : "text-ink-muted"
            )}
          >
            {helperText}
          </p>
        )}

        {/* DROPDOWN MENU PANEL */}
        {isOpen && (
          <div
            ref={popoverRef}
            tabIndex={-1}
            role="listbox"
            className={cn(
              "absolute z-50 p-2 bg-surface border border-hairline rounded-xl shadow-xl animate-in fade-in zoom-in-95 duration-200 select-none max-w-[calc(100vw-2rem)] w-full min-w-[240px]",
              placementY === "top" ? "bottom-full mb-1.5" : "top-full mt-1.5",
              placementX === "right" ? "right-0 left-auto" : "left-0 right-auto",
              dropdownClassName
            )}
          >
            {/* Search Bar Input */}
            {searchable && (
              <div className="relative mb-2 pb-2 border-b border-hairline-soft">
                <Search className="w-4 h-4 text-ink-muted absolute left-2.5 top-2.5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full pl-8 pr-7 py-1.5 text-xs sm:text-sm bg-surface-soft border border-hairline rounded-lg focus:outline-none focus:border-vibrant-purple text-ink placeholder:text-ink-muted"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-2.5 text-ink-muted hover:text-ink p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Multi-Select Select All / Clear All Header */}
            {isMulti && filteredOptions.length > 2 && (
              <div className="flex items-center justify-between px-2 py-1 mb-1 border-b border-hairline-soft text-[11px] text-ink-muted">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="hover:text-vibrant-purple font-medium flex items-center gap-1 transition-colors"
                >
                  <CheckSquare className="w-3 h-3" /> Pilih Semua
                </button>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="hover:text-error font-medium flex items-center gap-1 transition-colors"
                >
                  <Square className="w-3 h-3" /> Hapus Semua
                </button>
              </div>
            )}

            {/* Options List */}
            <div className={cn("overflow-y-auto space-y-0.5 custom-scrollbar pr-0.5", maxMenuHeight)}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, idx) => {
                  const selected = isOptionSelected(option.value);
                  const isFocused = idx === focusedIndex;
                  const OptionIcon = option.icon;

                  return (
                    <div
                      key={option.value}
                      role="option"
                      aria-selected={selected}
                      onClick={(e) => handleSelectOption(option, e)}
                      onMouseEnter={() => setFocusedIndex(idx)}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors cursor-pointer select-none",
                        selected
                          ? "bg-vibrant-purple/15 text-vibrant-purple-dark font-semibold dark:bg-purple-900/40 dark:text-purple-200"
                          : isFocused
                          ? "bg-vibrant-purple/10 text-ink"
                          : "hover:bg-vibrant-purple/10 text-ink",
                        option.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                      )}
                    >
                      <div className="flex items-start gap-2.5 min-w-0 flex-1">
                        {isMulti && (
                          <div className="mt-0.5 flex-shrink-0">
                            {selected ? (
                              <CheckSquare className="w-4 h-4 text-vibrant-purple-dark" />
                            ) : (
                              <Square className="w-4 h-4 text-ink-muted" />
                            )}
                          </div>
                        )}

                        {OptionIcon && (
                          <OptionIcon className={cn("w-4 h-4 mt-0.5 flex-shrink-0", selected ? "text-vibrant-purple-dark" : "text-ink-muted")} />
                        )}

                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="truncate leading-snug">
                            {renderHighlightedText(option.label, searchQuery)}
                          </span>
                          {option.description && (
                            <span className="text-[11px] text-ink-muted font-normal truncate mt-0.5">
                              {renderHighlightedText(option.description, searchQuery)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
                        {option.badge && (
                          <BadgeApp
                            id={`opt-badge-${option.value}`}
                            variant={selected ? "solidPurple" : "outlineNeutral"}
                            size="sm"
                            rounded="pill"
                            className="whitespace-nowrap truncate max-w-full"
                          >
                            {option.badge}
                          </BadgeApp>
                        )}
                        {!isMulti && selected && <Check className="w-4 h-4 text-vibrant-purple-dark flex-shrink-0" />}
                      </div>
                    </div>
                  );
                })
              ) : !isCreatable ? (
                <div className="px-3 py-4 text-center text-xs text-ink-muted">
                  <TextApp id="dropdown-empty-text" variant="caption" className="text-ink-muted">
                    {emptyText}
                  </TextApp>
                </div>
              ) : null}

              {/* Add New Option (Creatable) item */}
              {isCreatable && searchQuery.trim() && !exactMatchExists && (
                <div
                  role="option"
                  onClick={handleCreateNewOption}
                  onMouseEnter={() => setFocusedIndex(filteredOptions.length)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors cursor-pointer select-none border-t border-hairline-soft mt-1 text-vibrant-purple-dark font-medium hover:bg-vibrant-purple/10",
                    focusedIndex === filteredOptions.length && "bg-vibrant-purple/10"
                  )}
                >
                  <Plus className="w-4 h-4 text-vibrant-purple-dark flex-shrink-0" />
                  <span className="truncate">
                    Tambah <span className="font-bold">"{searchQuery.trim()}"</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

DropdownApp.displayName = "DropdownApp";
