import * as React from "react";
import { cn } from "@/lib/utils";
import { TextApp } from "../atoms/TextApp";
import { CheckCircle2, AlertCircle } from "lucide-react";

export type OtpInputVariant = "default" | "error" | "success";
export type OtpInputSize = "sm" | "md" | "lg";
export type OtpInputRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface OtpInputAppProps {
  id: string;
  length?: 4 | 6 | number;
  masked?: boolean;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  variant?: OtpInputVariant;
  size?: OtpInputSize;
  rounded?: OtpInputRounded;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  autoFocus?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  successMessage?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

const roundedClasses: Record<OtpInputRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const sizeClasses: Record<OtpInputSize, string> = {
  sm: "w-10 h-11 text-base font-bold",
  md: "w-12 h-14 text-xl font-bold",
  lg: "w-14 h-16 text-2xl font-bold",
};

export const OtpInputApp = React.forwardRef<HTMLDivElement, OtpInputAppProps>(
  (
    {
      id,
      length = 6,
      masked = false,
      error = false,
      success = false,
      disabled = false,
      variant = "default",
      size = "md",
      rounded = "lg",
      value,
      defaultValue = "",
      onChange,
      onComplete,
      autoFocus = false,
      label,
      description,
      errorMessage,
      successMessage,
      className,
      containerClassName,
    },
    ref
  ) => {
    const activeLength = Math.max(1, length);
    const [internalValue, setInternalValue] = React.useState<string>(defaultValue);
    const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const currentValue = value !== undefined ? value : internalValue;
    const digits = Array.from({ length: activeLength }, (_, i) => currentValue[i] || "");

    // Determine effective variant
    const effectiveVariant: OtpInputVariant = error
      ? "error"
      : success
      ? "success"
      : variant;

    React.useEffect(() => {
      inputRefs.current = inputRefs.current.slice(0, activeLength);
    }, [activeLength]);

    React.useEffect(() => {
      if (autoFocus && inputRefs.current[0] && !disabled) {
        inputRefs.current[0]?.focus();
      }
    }, [autoFocus, disabled]);

    const updateOtpValue = (newDigits: string[]) => {
      const combined = newDigits.join("").slice(0, activeLength);
      if (value === undefined) {
        setInternalValue(combined);
      }
      onChange?.(combined);

      if (combined.length === activeLength) {
        onComplete?.(combined);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const val = e.target.value;
      if (disabled) return;

      // Extract the last typed character (handles empty, single key, or typing over existing digit)
      const lastChar = val.length > 0 ? val[val.length - 1] : "";
      const newDigits = [...digits];

      newDigits[index] = lastChar;
      updateOtpValue(newDigits);

      // Auto-advance to next input if character was typed
      if (lastChar && index < activeLength - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (disabled) return;

      if (e.key === "Backspace") {
        if (!digits[index] && index > 0) {
          // Move to previous cell and clear it
          const newDigits = [...digits];
          newDigits[index - 1] = "";
          updateOtpValue(newDigits);
          inputRefs.current[index - 1]?.focus();
        } else {
          // Clear current cell
          const newDigits = [...digits];
          newDigits[index] = "";
          updateOtpValue(newDigits);
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < activeLength - 1) {
        e.preventDefault();
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLElement>, targetIndex: number = 0) => {
      if (disabled) return;
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text").trim();
      if (!pastedData) return;

      // Clean non-printable characters or whitespace if needed
      const cleanData = pastedData.replace(/\s+/g, "");
      const pastedChars = cleanData.slice(0, activeLength - targetIndex).split("");

      const newDigits = [...digits];
      for (let i = 0; i < pastedChars.length && targetIndex + i < activeLength; i++) {
        newDigits[targetIndex + i] = pastedChars[i];
      }

      updateOtpValue(newDigits);

      // Focus the next empty box or the last box
      const nextFocusIndex = Math.min(targetIndex + pastedChars.length, activeLength - 1);
      inputRefs.current[nextFocusIndex]?.focus();
    };

    const roundedClass = roundedClasses[rounded];
    const sizeClass = sizeClasses[size];

    return (
      <div
        id={`${id}-container`}
        ref={ref}
        data-ui-id={id}
        className={cn("flex flex-col gap-2 w-full text-left select-none", containerClassName)}
      >
        {/* Label & Description */}
        {(label || description) && (
          <div className="flex flex-col text-left gap-0.5">
            {label &&
              (typeof label === "string" ? (
                <TextApp
                  id={`${id}-label`}
                  variant="body"
                  weight="semibold"
                  className={cn("text-ink leading-snug", disabled && "text-ink-muted")}
                >
                  {label}
                </TextApp>
              ) : (
                label
              ))}
            {description &&
              (typeof description === "string" ? (
                <TextApp id={`${id}-desc`} variant="caption" className="text-ink-muted leading-tight">
                  {description}
                </TextApp>
              ) : (
                description
              ))}
          </div>
        )}

        {/* Digit Boxes Group */}
        <div
          id={`${id}-boxes-group`}
          onPaste={(e) => handlePaste(e, 0)}
          className={cn("flex items-center gap-2 sm:gap-3 flex-wrap", className)}
        >
          {digits.map((digit, idx) => {
            const isGroupDivider = activeLength === 6 && idx === 3;
            const isFocused = focusedIndex === idx;

            // State-based styling matching InputApp focus behavior
            let boxStyles =
              "bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 shadow-sm transition-all outline-none focus:outline-none";

            if (disabled) {
              boxStyles =
                "bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed select-none";
            } else if (effectiveVariant === "error") {
              boxStyles = cn(
                "bg-red-50/50 dark:bg-red-950/20 border-2 border-red-500 text-red-600 dark:text-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500",
                isFocused ? "border-red-500 ring-1 ring-red-500" : ""
              );
            } else if (effectiveVariant === "success") {
              boxStyles = cn(
                "bg-emerald-50/50 dark:bg-emerald-950/20 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500",
                isFocused ? "border-emerald-500 ring-1 ring-emerald-500" : ""
              );
            } else {
              boxStyles = cn(
                "bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 hover:border-vibrant-purple-dark/80 focus:border-vibrant-purple-dark focus:ring-1 focus:ring-vibrant-purple-dark",
                isFocused
                  ? "border-vibrant-purple-dark ring-1 ring-vibrant-purple-dark"
                  : ""
              );
            }

            return (
              <React.Fragment key={idx}>
                {/* Subtle group separator for 6-digit layout */}
                {isGroupDivider && (
                  <span className="text-slate-400 font-bold text-lg select-none px-0.5">
                    -
                  </span>
                )}
                <input
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  id={`${id}-digit-${idx}`}
                  type={masked ? "password" : "text"}
                  inputMode="numeric"
                  value={digit}
                  disabled={disabled}
                  onChange={(e) => handleInputChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={(e) => handlePaste(e, idx)}
                  onFocus={() => setFocusedIndex(idx)}
                  onBlur={() => setFocusedIndex(null)}
                  className={cn(
                    "box-border text-center p-0 m-0 leading-none font-mono shrink-0 select-all",
                    sizeClass,
                    roundedClass,
                    boxStyles
                  )}
                  aria-label={`Digit ${idx + 1}`}
                />
              </React.Fragment>
            );
          })}
        </div>

        {/* Error or Success Messages */}
        {errorMessage && effectiveVariant === "error" && (
          <div className="flex items-center gap-1.5 text-red-500 mt-1">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {typeof errorMessage === "string" ? (
              <TextApp id={`${id}-error-text`} variant="caption" weight="medium" className="text-red-500 text-xs">
                {errorMessage}
              </TextApp>
            ) : (
              errorMessage
            )}
          </div>
        )}

        {successMessage && effectiveVariant === "success" && (
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 mt-1">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {typeof successMessage === "string" ? (
              <TextApp id={`${id}-success-text`} variant="caption" weight="medium" className="text-emerald-600 dark:text-emerald-400 text-xs">
                {successMessage}
              </TextApp>
            ) : (
              successMessage
            )}
          </div>
        )}
      </div>
    );
  }
);

OtpInputApp.displayName = "OtpInputApp";
