import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff, ChevronUp, ChevronDown, Check, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextApp } from "./TextApp";

export type InputVariant = "default" | "error" | "success" | "filled";
export type InputSize = "sm" | "md" | "lg";
export type InputRounded = "none" | "sm" | "md" | "lg" | "xl" | "full" | "pill" | "card" | "input" | "default";
export type InputTheme = "default" | "playful";

const inputWrapperVariants = cva(
  "w-full flex items-center transition-all duration-150 border outline-none focus-within:outline-none focus-within:ring-1 gap-1.5",
  {
    variants: {
      variant: {
        default: "bg-surface border-hairline focus-within:border-vibrant-purple-dark focus-within:ring-vibrant-purple-dark",
        filled: "bg-surface-soft border-transparent focus-within:bg-surface focus-within:border-vibrant-purple-dark focus-within:ring-vibrant-purple-dark",
        error: "bg-surface border-red-500 focus-within:border-red-500 focus-within:ring-red-500 dark:border-red-400",
        success: "bg-surface border-emerald-500 focus-within:border-emerald-500 focus-within:ring-emerald-500 dark:border-emerald-400",
      },
      size: {
        sm: "px-3 py-1.5 min-h-[34px] text-xs",
        md: "px-3 py-2 min-h-[42px] text-sm",
        lg: "px-4 py-2.5 min-h-[50px] text-body",
      },
      theme: {
        default: "",
        playful: "bg-surface border-hairline shadow-[inset_0_0_0_1px_rgba(0,0,0,.04)] focus-within:border-vibrant-purple-dark focus-within:ring-vibrant-purple-dark font-display",
      },
      rounded: {
        default: "rounded-md",
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
        pill: "rounded-full",
        card: "rounded-card-custom",
        input: "rounded-input-custom",
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
      theme: "default",
      disabled: false,
    },
  }
);

export interface InputAppProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    Omit<VariantProps<typeof inputWrapperVariants>, "disabled" | "variant"> {
  id: string;
  variant?: InputVariant;
  label?: React.ReactNode;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  showClear?: boolean;
  onClear?: () => void;
  showPasswordToggle?: boolean;
  showStepper?: boolean;
  showMaxLength?: boolean;
  containerClassName?: string;
}

export const InputApp = React.forwardRef<HTMLInputElement, InputAppProps>(
  (
    {
      id,
      type = "text",
      variant = "default",
      size = "md",
      rounded = "md",
      theme = "default",
      label,
      helperText,
      errorMessage,
      successMessage,
      leadingIcon,
      trailingIcon,
      showClear = false,
      onClear,
      showPasswordToggle,
      showStepper,
      showMaxLength = false,
      maxLength,
      disabled = false,
      className,
      containerClassName,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    React.useImperativeHandle(ref, () => inputRef.current!);

    const [showPassword, setShowPassword] = React.useState(false);
    const [inputValue, setInputValue] = React.useState<string>(
      value !== undefined ? String(value) : defaultValue !== undefined ? String(defaultValue) : ""
    );

    React.useEffect(() => {
      if (value !== undefined) {
        setInputValue(String(value));
      }
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInputValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      if (value === undefined) {
        setInputValue("");
      }
      onClear?.();
      if (inputRef.current) {
        inputRef.current.value = "";
        const event = new Event("change", { bubbles: true });
        inputRef.current.dispatchEvent(event);
      }
    };

    const handleStep = (direction: "up" | "down", e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled || !inputRef.current) return;
      const step = Number(props.step) || 1;
      const currentVal = Number(inputRef.current.value) || 0;
      const newVal = direction === "up" ? currentVal + step : currentVal - step;
      inputRef.current.value = String(newVal);
      if (value === undefined) {
        setInputValue(String(newVal));
      }
      const event = new Event("change", { bubbles: true });
      inputRef.current.dispatchEvent(event);
    };

    // Determine state variant
    const computedVariant: InputVariant = errorMessage
      ? "error"
      : successMessage
      ? "success"
      : variant;

    // Password toggle handling
    const isPasswordType = type === "password" || showPasswordToggle;
    const currentInputType = isPasswordType ? (showPassword ? "text" : "password") : type;

    // Number stepper handling
    const isNumberType = type === "number" || showStepper;

    const currentLength = inputValue.length;

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

        {/* Input Wrapper Container */}
        <div
          className={cn(
            inputWrapperVariants({
              variant: computedVariant,
              size,
              rounded,
              theme,
              disabled,
            })
          )}
        >
          {/* Leading Icon */}
          {leadingIcon && (
            <div className="flex items-center justify-center text-ink-muted flex-shrink-0 gap-1.5">
              {leadingIcon}
            </div>
          )}

          {/* Native Input Element */}
          <input
            ref={inputRef}
            id={id}
            data-ui-id={id}
            type={currentInputType}
            disabled={disabled}
            maxLength={maxLength}
            value={value !== undefined ? value : inputValue}
            onChange={handleInputChange}
            className={cn(
              "w-full bg-transparent border-0 outline-none focus:outline-none text-ink placeholder:text-ink-muted/50 font-sans p-0 m-0 min-w-0 disabled:cursor-not-allowed",
              size === "sm" && "text-xs",
              size === "md" && "text-sm",
              size === "lg" && "text-body",
              className
            )}
            {...props}
          />

          {/* Trailing Icons / Clear / Password Toggle / Stepper / Success-Error Icons */}
          <div className="flex items-center gap-1.5 flex-shrink-0 text-ink-muted">
            {/* Clear Button */}
            {showClear && !disabled && inputValue.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="p-0.5 rounded-full hover:bg-vibrant-grey-bg/80 text-ink-muted hover:text-ink transition-colors cursor-pointer"
                title="Hapus teks"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Password Toggle Eye Icon */}
            {isPasswordType && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={disabled}
                className="p-0.5 rounded hover:bg-vibrant-grey-bg/80 text-ink-muted hover:text-ink transition-colors cursor-pointer disabled:opacity-50"
                title={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            )}

            {/* Number Stepper Controls */}
            {isNumberType && (
              <div className="flex flex-col justify-center -mr-1">
                <button
                  type="button"
                  onClick={(e) => handleStep("up", e)}
                  disabled={disabled}
                  className="p-0.5 hover:text-vibrant-purple-dark text-ink-muted transition-colors cursor-pointer leading-none disabled:opacity-50"
                >
                  <ChevronUp className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={(e) => handleStep("down", e)}
                  disabled={disabled}
                  className="p-0.5 hover:text-vibrant-purple-dark text-ink-muted transition-colors cursor-pointer leading-none disabled:opacity-50"
                >
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Custom Trailing Icon or Default State Icon */}
            {trailingIcon ? (
              trailingIcon
            ) : computedVariant === "error" ? (
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            ) : computedVariant === "success" ? (
              <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            ) : null}
          </div>
        </div>

        {/* Bottom Helper / Error / Success Message & Max Length Counter */}
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

            {/* Max Length Counter (e.g., 45/50) */}
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

InputApp.displayName = "InputApp";

