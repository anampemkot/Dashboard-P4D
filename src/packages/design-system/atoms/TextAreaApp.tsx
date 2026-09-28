import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextApp } from "./TextApp";

export type TextAreaVariant = "default" | "error" | "success" | "filled";
export type TextAreaSize = "sm" | "md" | "lg";
export type TextAreaRounded = "none" | "sm" | "md" | "lg" | "xl" | "full" | "card" | "input" | "default";
export type TextAreaResize = "none" | "vertical" | "horizontal" | "both";

const textAreaWrapperVariants = cva(
  "w-full transition-all duration-150 border outline-none focus-within:outline-none focus-within:ring-1 flex flex-col relative",
  {
    variants: {
      variant: {
        default: "bg-surface border-hairline focus-within:border-vibrant-purple-dark focus-within:ring-vibrant-purple-dark",
        filled: "bg-surface-soft border-transparent focus-within:bg-surface focus-within:border-vibrant-purple-dark focus-within:ring-vibrant-purple-dark",
        error: "bg-surface border-red-500 focus-within:border-red-500 focus-within:ring-red-500 dark:border-red-400",
        success: "bg-surface border-emerald-500 focus-within:border-emerald-500 focus-within:ring-emerald-500 dark:border-emerald-400",
      },
      size: {
        sm: "p-2.5 text-xs min-h-[70px]",
        md: "p-3 text-sm min-h-[90px]",
        lg: "p-3.5 text-body min-h-[120px]",
      },
      rounded: {
        default: "rounded-md",
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-2xl",
        card: "rounded-card-custom",
        input: "rounded-md",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed bg-vibrant-grey-bg/60 text-ink-muted focus-within:ring-0",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "md",
      disabled: false,
    },
  }
);

export interface TextAreaAppProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    Omit<VariantProps<typeof textAreaWrapperVariants>, "disabled" | "variant"> {
  id: string;
  variant?: TextAreaVariant;
  label?: React.ReactNode;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
  resize?: TextAreaResize;
  showMaxLength?: boolean;
  showClear?: boolean;
  onClear?: () => void;
  containerClassName?: string;
}

export const TextAreaApp = React.forwardRef<HTMLTextAreaElement, TextAreaAppProps>(
  (
    {
      id,
      variant = "default",
      size = "md",
      rounded = "md",
      label,
      helperText,
      errorMessage,
      successMessage,
      autoResize = false,
      minRows = 3,
      maxRows,
      resize = "vertical",
      showMaxLength = false,
      maxLength,
      showClear = false,
      onClear,
      disabled = false,
      className,
      containerClassName,
      value,
      defaultValue,
      onChange,
      rows,
      ...props
    },
    ref
  ) => {
    const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
    React.useImperativeHandle(ref, () => textAreaRef.current!);

    const [textValue, setTextValue] = React.useState<string>(
      value !== undefined ? String(value) : defaultValue !== undefined ? String(defaultValue) : ""
    );

    React.useEffect(() => {
      if (value !== undefined) {
        setTextValue(String(value));
      }
    }, [value]);

    // Handle auto-resize height
    const adjustHeight = React.useCallback(() => {
      const el = textAreaRef.current;
      if (!el || !autoResize) return;

      el.style.height = "auto";
      const scrollHeight = el.scrollHeight;

      if (maxRows) {
        const lineHeight = parseFloat(window.getComputedStyle(el).lineHeight) || 20;
        const maxHeight = maxRows * lineHeight;
        el.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
        el.style.overflowY = scrollHeight > maxHeight ? "auto" : "hidden";
      } else {
        el.style.height = `${scrollHeight}px`;
        el.style.overflowY = "hidden";
      }
    }, [autoResize, maxRows]);

    React.useEffect(() => {
      adjustHeight();
    }, [textValue, adjustHeight]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (value === undefined) {
        setTextValue(e.target.value);
      }
      onChange?.(e);
      if (autoResize) {
        adjustHeight();
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      if (value === undefined) {
        setTextValue("");
      }
      onClear?.();
      if (textAreaRef.current) {
        textAreaRef.current.value = "";
        const event = new Event("change", { bubbles: true });
        textAreaRef.current.dispatchEvent(event);
      }
    };

    // Determine state variant
    const computedVariant: TextAreaVariant = errorMessage
      ? "error"
      : successMessage
      ? "success"
      : variant;

    // Determine resize style
    const resizeClass = autoResize
      ? "resize-none"
      : resize === "none"
      ? "resize-none"
      : resize === "vertical"
      ? "resize-y"
      : resize === "horizontal"
      ? "resize-x"
      : "resize";

    const currentLength = textValue.length;

    return (
      <div className={cn("flex flex-col gap-2 w-full", containerClassName)}>
        {/* Support Label */}
        {label && (
          <label htmlFor={id} className="text-xs font-semibold text-ink flex items-center gap-1.5 select-none">
            {typeof label === "string" ? (
              <TextApp id={`${id}-label-text`} variant="caption" weight="semibold" className="text-ink">
                {label}
              </TextApp>
            ) : (
              label
            )}
          </label>
        )}

        {/* Text Area Container */}
        <div
          className={cn(
            textAreaWrapperVariants({
              variant: computedVariant,
              size,
              rounded,
              disabled,
            })
          )}
        >
          {/* Main Native Textarea */}
          <textarea
            ref={textAreaRef}
            id={id}
            data-ui-id={id}
            rows={rows ?? minRows}
            disabled={disabled}
            maxLength={maxLength}
            value={value !== undefined ? value : textValue}
            onChange={handleTextChange}
            className={cn(
              "w-full bg-transparent border-0 outline-none focus:outline-none text-ink placeholder:text-ink-muted/50 font-sans p-0 m-0 min-w-0 disabled:cursor-not-allowed",
              resizeClass,
              size === "sm" && "text-xs",
              size === "md" && "text-sm",
              size === "lg" && "text-body",
              className
            )}
            {...props}
          />

          {/* Floating Clear Button */}
          {showClear && !disabled && textValue.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-2.5 right-2.5 p-1 rounded-full bg-surface/80 hover:bg-vibrant-grey-bg text-ink-muted hover:text-ink transition-colors cursor-pointer border border-hairline-soft"
              title="Hapus teks"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Bottom Helper / Error / Success Message & Character Counter */}
        {(errorMessage || successMessage || helperText || (showMaxLength && maxLength)) && (
          <div className="flex items-center justify-between gap-2 px-0.5">
            {/* Message Area */}
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              {errorMessage ? (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                  <TextApp id={`${id}-error-text`} variant="caption" className="text-red-500 font-medium truncate">
                    {errorMessage}
                  </TextApp>
                </>
              ) : successMessage ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <TextApp id={`${id}-success-text`} variant="caption" className="text-emerald-600 font-medium truncate">
                    {successMessage}
                  </TextApp>
                </>
              ) : helperText ? (
                <TextApp id={`${id}-helper-text`} variant="caption" className="text-ink-muted truncate">
                  {helperText}
                </TextApp>
              ) : <div />}
            </div>

            {/* Character Counter (e.g., 120/500) */}
            {showMaxLength && maxLength && (
              <TextApp
                id={`${id}-maxlength-counter`}
                variant="caption"
                className={cn(
                  "font-mono text-ink-muted text-[11px] flex-shrink-0 whitespace-nowrap",
                  currentLength >= maxLength && "text-red-500 font-bold"
                )}
              >
                {currentLength}/{maxLength}
              </TextApp>
            )}
          </div>
        )}
      </div>
    );
  }
);

TextAreaApp.displayName = "TextAreaApp";
