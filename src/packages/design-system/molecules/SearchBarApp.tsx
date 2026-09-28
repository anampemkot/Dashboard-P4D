import * as React from "react";
import { Search, X, SlidersHorizontal, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type SearchBarVariant = "standard" | "withFilter" | "expandable";
export type SearchBarSize = "sm" | "md" | "lg";
export type SearchBarRounded = "sm" | "md" | "lg" | "full" | "none" | "card" | "input" | "pill";
export type SearchBarBgColor = "surface" | "filled" | "transparent" | "elevated";

export interface SearchBarAppProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  /** Unique element ID for accessibility */
  id: string;
  /** Search Bar layout variant */
  variant?: SearchBarVariant;
  /** Controlled input value */
  value?: string;
  /** Uncontrolled default input value */
  defaultValue?: string;
  /** Handler callback when text value changes */
  onSearchChange?: (value: string) => void;
  /** Standard HTML input onChange event callback */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Handler fired when user submits search (presses Enter or clicks search icon) */
  onSearch?: (value: string) => void;
  /** Handler fired when clear 'X' button is clicked */
  onClear?: () => void;
  /** Size metric preset */
  size?: SearchBarSize;
  /** Corner radius metric preset */
  rounded?: SearchBarRounded;
  /** Background container fill style */
  bgColor?: SearchBarBgColor;
  /** Placeholder text */
  placeholder?: string;
  /** Custom leading icon element */
  leadingIcon?: React.ReactNode;
  /** Show/hide clear 'X' button when input contains text (default: true) */
  showClear?: boolean;
  /** Custom trailing icon or node */
  trailingIcon?: React.ReactNode;
  /** Show filter action button on trailing side */
  showFilter?: boolean;
  /** Active filter state or numeric count to show active badge indicator */
  filterActive?: boolean | number;
  /** Callback fired when filter action button is clicked */
  onFilterClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Optional label on filter button (e.g. "Filter", "Penyaring") */
  filterLabel?: React.ReactNode;
  /** Loading spinner indicator state */
  loading?: boolean;
  /** Disabled input state */
  disabled?: boolean;
  /** Error flag or error message text string */
  error?: boolean | string;
  /** Helper description text displayed under input */
  helperText?: React.ReactNode;
  /** Controlled expanded state for expandable variant */
  expanded?: boolean;
  /** Default expanded state for uncontrolled expandable variant */
  defaultExpanded?: boolean;
  /** Callback fired when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;
  /** Shortcut key string (e.g. "Ctrl+K" or "⌘K") */
  shortcutKey?: string;
  /** Custom container wrapper CSS classes */
  containerClassName?: string;
  /** Custom input element CSS classes */
  inputClassName?: string;
}

const roundedClasses: Record<SearchBarRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
  pill: "rounded-full",
  card: "rounded-card-custom",
  input: "rounded-input-custom",
};

const bgClasses: Record<SearchBarBgColor, string> = {
  surface: "bg-surface border-hairline shadow-xs hover:border-hairline-hard",
  filled: "bg-surface-soft border-transparent hover:bg-surface focus-within:bg-surface",
  transparent: "bg-transparent border-hairline hover:border-hairline-hard",
  elevated: "bg-surface border-hairline-soft shadow-md hover:shadow-lg",
};

const sizeHeightClasses: Record<SearchBarSize, { container: string; input: string; icon: string; text: string; padding: string }> = {
  sm: {
    container: "h-8.5 min-h-[34px]",
    input: "text-xs py-1.5",
    icon: "w-3.5 h-3.5",
    text: "text-xs",
    padding: "px-2.5 gap-2",
  },
  md: {
    container: "h-10.5 min-h-[42px]",
    input: "text-sm py-2",
    icon: "w-4 h-4",
    text: "text-sm",
    padding: "px-3.5 gap-2.5",
  },
  lg: {
    container: "h-12.5 min-h-[50px]",
    input: "text-base py-3",
    icon: "w-5 h-5",
    text: "text-base",
    padding: "px-4 gap-3",
  },
};

export const SearchBarApp = React.forwardRef<HTMLInputElement, SearchBarAppProps>(
  (
    {
      id,
      variant = "standard",
      value: controlledValue,
      defaultValue = "",
      onSearchChange,
      onChange,
      onSearch,
      onClear,
      size = "md",
      rounded = "pill",
      bgColor = "surface",
      placeholder = "Cari data...",
      leadingIcon,
      showClear = true,
      trailingIcon,
      showFilter: propsShowFilter,
      filterActive = false,
      onFilterClick,
      filterLabel,
      loading = false,
      disabled = false,
      error,
      helperText,
      expanded: controlledExpanded,
      defaultExpanded = false,
      onExpandedChange,
      shortcutKey,
      containerClassName,
      inputClassName,
      className,
      autoFocus,
      onKeyDown,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    // Uncontrolled state for query text
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(defaultValue);
    const isControlledValue = controlledValue !== undefined;
    const searchValue = isControlledValue ? controlledValue : uncontrolledValue;

    // Uncontrolled state for expandable variant
    const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState<boolean>(defaultExpanded);
    const isControlledExpanded = controlledExpanded !== undefined;
    const isExpanded = isControlledExpanded ? controlledExpanded : uncontrolledExpanded;

    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    const internalInputRef = React.useRef<HTMLInputElement | null>(null);

    // Merge refs
    React.useImperativeHandle(ref, () => internalInputRef.current as HTMLInputElement);

    const handleExpandToggle = (nextState: boolean) => {
      if (disabled) return;
      if (!isControlledExpanded) {
        setUncontrolledExpanded(nextState);
      }
      onExpandedChange?.(nextState);
      if (nextState) {
        setTimeout(() => internalInputRef.current?.focus(), 50);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (!isControlledValue) {
        setUncontrolledValue(val);
      }
      onSearchChange?.(val);
      onChange?.(e);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (!isControlledValue) {
        setUncontrolledValue("");
      }
      onSearchChange?.("");
      onClear?.();
      internalInputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch?.(searchValue);
      }
      if (e.key === "Escape" && variant === "expandable" && !searchValue) {
        handleExpandToggle(false);
      }
      onKeyDown?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    // Determine if filter button should be rendered
    const isFilterVisible = variant === "withFilter" || propsShowFilter || Boolean(filterLabel) || Boolean(onFilterClick);

    // Determine error state
    const hasError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : null;

    const sizeMetrics = sizeHeightClasses[size];

    // If expandable variant and NOT expanded, render compact expandable button trigger
    if (variant === "expandable" && !isExpanded) {
      return (
        <div className={cn("inline-flex items-center gap-2", containerClassName)}>
          <button
            type="button"
            id={`${id}-expand-trigger`}
            data-ui-id={`${id}-expand-trigger`}
            disabled={disabled}
            onClick={() => handleExpandToggle(true)}
            title="Buka Pencarian"
            aria-label="Buka Pencarian"
            className={cn(
              "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none",
              sizeMetrics.container,
              size === "sm" && "w-8.5 px-2",
              size === "md" && "w-10.5 px-2.5",
              size === "lg" && "w-12.5 px-3",
              roundedClasses[rounded],
              bgClasses[bgColor],
              "hover:border-vibrant-purple focus:outline-none focus:ring-2 focus:ring-vibrant-purple/40",
              disabled && "opacity-50 cursor-not-allowed pointer-events-none",
              className
            )}
          >
            {leadingIcon || <Search className={cn(sizeMetrics.icon, "text-ink-muted group-hover:text-vibrant-purple")} />}
          </button>
        </div>
      );
    }

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
        {/* Main Search Bar Input Container */}
        <div
          className={cn(
            "relative flex items-center w-full transition-all duration-200 border",
            sizeMetrics.container,
            sizeMetrics.padding,
            roundedClasses[rounded],
            bgClasses[bgColor],
            // Focused state
            isFocused && !hasError && "border-vibrant-purple ring-2 ring-vibrant-purple/20 shadow-sm",
            // Error state
            hasError && "border-rose-500 ring-2 ring-rose-500/20 dark:border-rose-400",
            // Disabled state
            disabled && "opacity-50 cursor-not-allowed bg-surface-soft/60",
            // Expandable transition effect
            variant === "expandable" && "animate-in fade-in zoom-in-95 duration-200",
            className
          )}
        >
          {/* Leading Icon / Search Icon */}
          <div
            onClick={() => onSearch?.(searchValue)}
            className={cn(
              "flex items-center justify-center text-ink-muted shrink-0 transition-colors",
              onSearch && !disabled && "cursor-pointer hover:text-vibrant-purple"
            )}
          >
            {loading ? (
              <Loader2 className={cn(sizeMetrics.icon, "animate-spin text-vibrant-purple")} />
            ) : leadingIcon ? (
              leadingIcon
            ) : (
              <Search className={sizeMetrics.icon} />
            )}
          </div>

          {/* Native Input Element */}
          <input
            ref={internalInputRef}
            id={id}
            data-ui-id={id}
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            placeholder={placeholder}
            autoFocus={autoFocus || (variant === "expandable" && isExpanded)}
            className={cn(
              "w-full bg-transparent text-ink placeholder:text-ink-muted/60 border-none outline-none focus:outline-none focus:ring-0",
              sizeMetrics.input,
              inputClassName
            )}
            {...props}
          />

          {/* Trailing Controls (Shortcut, Clear X, Custom Trailing Icon, Filter Button) */}
          <div className="flex items-center gap-1.5 shrink-0 select-none">
            {/* Keyboard Shortcut Badge (if provided & input empty) */}
            {shortcutKey && !searchValue && (
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium text-ink-muted bg-surface-soft border border-hairline rounded shadow-2xs">
                {shortcutKey}
              </kbd>
            )}

            {/* Clear 'X' Button */}
            {showClear && searchValue && !disabled && (
              <button
                type="button"
                id={`${id}-clear-btn`}
                data-ui-id={`${id}-clear-btn`}
                onClick={handleClear}
                title="Hapus pencarian"
                aria-label="Hapus pencarian"
                className="p-1 rounded-full text-ink-muted hover:text-ink hover:bg-surface-soft transition-colors cursor-pointer"
              >
                <X className={sizeMetrics.icon} />
              </button>
            )}

            {/* Custom Trailing Icon */}
            {trailingIcon && <div className="flex items-center">{trailingIcon}</div>}

            {/* Expandable Collapse Close Button (if expandable and empty) */}
            {variant === "expandable" && !searchValue && (
              <button
                type="button"
                id={`${id}-collapse-btn`}
                data-ui-id={`${id}-collapse-btn`}
                onClick={() => handleExpandToggle(false)}
                title="Tutup pencarian"
                aria-label="Tutup pencarian"
                className="p-1 rounded-full text-ink-muted hover:text-ink hover:bg-surface-soft transition-colors cursor-pointer"
              >
                <X className={sizeMetrics.icon} />
              </button>
            )}

            {/* Filter Action Button */}
            {isFilterVisible && (
              <button
                type="button"
                id={`${id}-filter-btn`}
                data-ui-id={`${id}-filter-btn`}
                onClick={onFilterClick}
                disabled={disabled}
                className={cn(
                  "relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer border select-none",
                  filterActive
                    ? "bg-vibrant-purple/10 border-vibrant-purple text-vibrant-purple-dark hover:bg-vibrant-purple/20"
                    : "bg-surface-soft/80 border-hairline-soft text-ink hover:bg-surface hover:border-hairline",
                  size === "sm" && "text-xs px-2 py-0.5",
                  size === "md" && "text-xs px-2.5 py-1",
                  size === "lg" && "text-sm px-3 py-1.5"
                )}
              >
                <SlidersHorizontal className={sizeMetrics.icon} />
                {filterLabel && <span>{filterLabel}</span>}

                {/* Active Filter Indicator Badge Dot or Counter */}
                {Boolean(filterActive) && (
                  <span
                    className={cn(
                      "inline-flex items-center justify-center font-bold text-white bg-vibrant-purple rounded-full",
                      typeof filterActive === "number"
                        ? "w-4 h-4 text-[10px]"
                        : "w-2 h-2"
                    )}
                  >
                    {typeof filterActive === "number" ? filterActive : ""}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Error or Helper Text */}
        {(errorMessage || helperText) && (
          <div className="px-1 text-xs leading-tight">
            {errorMessage ? (
              <span className="text-rose-500 font-medium dark:text-rose-400 flex items-center gap-1">
                {errorMessage}
              </span>
            ) : helperText ? (
              <span className="text-ink-muted">{helperText}</span>
            ) : null}
          </div>
        )}
      </div>
    );
  }
);

SearchBarApp.displayName = "SearchBarApp";
