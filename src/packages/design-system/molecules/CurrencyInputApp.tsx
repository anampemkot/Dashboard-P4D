import * as React from "react";
import { cn } from "@/lib/utils";
import { TextApp } from "../atoms/TextApp";

export type CurrencyInputSize = "sm" | "md" | "lg";
export type CurrencyInputRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface CurrencyInputAppProps {
  id: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  currencyPrefix?: string;
  size?: CurrencyInputSize;
  rounded?: CurrencyInputRounded;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  label?: React.ReactNode;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
}

const sizeClasses: Record<CurrencyInputSize, string> = {
  sm: "px-3 py-1.5 min-h-[32px] text-xs",
  md: "px-3 py-2 min-h-[40px] text-sm",
  lg: "px-4 py-2.5 min-h-[48px] text-body",
};

const roundedClasses: Record<CurrencyInputRounded, string> = {
  none: "rounded-none",
  sm: "rounded-[4px]",
  md: "rounded-[8px]",
  lg: "rounded-[16px]",
  xl: "rounded-xl",
  full: "rounded-full",
};

// Nominal Rupiah formatting: strips non-digits, groups thousands with ".".
function formatRupiah(digitsOnly: string): string {
  if (!digitsOnly) return "";
  return digitsOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function toDigitsOnly(raw: string): string {
  return raw.replace(/[^\d]/g, "");
}

export const CurrencyInputApp = React.forwardRef<HTMLInputElement, CurrencyInputAppProps>(
  (
    {
      id,
      value,
      defaultValue,
      onChange,
      currencyPrefix = "Rp",
      size = "sm",
      rounded = "lg",
      disabled = false,
      error = false,
      errorMessage,
      helperText,
      label,
      placeholder = "0",
      className,
      containerClassName,
    },
    ref
  ) => {
    const [internalDigits, setInternalDigits] = React.useState<string>(
      defaultValue !== undefined ? String(Math.trunc(defaultValue)) : ""
    );

    const digits = value !== undefined ? String(Math.trunc(value)) : internalDigits;
    const displayValue = formatRupiah(digits);
    const hasError = Boolean(error) || Boolean(errorMessage);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextDigits = toDigitsOnly(e.target.value);
      if (value === undefined) {
        setInternalDigits(nextDigits);
      }
      onChange?.(nextDigits ? Number(nextDigits) : 0);
    };

    return (
      <div className={cn("flex w-full flex-col gap-2", containerClassName)}>
        {label && (
          <label htmlFor={id} className="flex select-none items-center gap-1.5 text-xs font-semibold text-ink">
            {typeof label === "string" ? (
              <TextApp id={`${id}-label-text`} variant="caption" weight="semibold" className="text-ink">
                {label}
              </TextApp>
            ) : (
              label
            )}
          </label>
        )}

        <div
          className={cn(
            "flex w-full items-center gap-1.5 border transition-all duration-150 outline-none",
            sizeClasses[size],
            roundedClasses[rounded],
            disabled
              ? "cursor-not-allowed bg-vibrant-grey-bg/60 text-ink-muted opacity-50"
              : hasError
              ? "border-error bg-surface focus-within:ring-2 focus-within:ring-error/40"
              : "border-hairline bg-surface focus-within:border-vibrant-purple-dark focus-within:ring-2 focus-within:ring-vibrant-purple-dark/25"
          )}
        >
          <span className="shrink-0 select-none font-semibold text-ink-muted">{currencyPrefix}</span>
          <input
            ref={ref}
            id={id}
            data-ui-id={id}
            type="text"
            inputMode="numeric"
            disabled={disabled}
            value={displayValue}
            onChange={handleChange}
            placeholder={placeholder}
            className={cn(
              "min-w-0 w-full border-0 bg-transparent p-0 m-0 font-mono text-ink outline-none placeholder:text-ink-muted/50 disabled:cursor-not-allowed",
              className
            )}
          />
        </div>

        {(errorMessage || helperText) && (
          <TextApp
            id={`${id}-message`}
            variant="caption"
            className={cn(errorMessage ? "text-error font-medium" : "text-ink-muted")}
          >
            {errorMessage || helperText}
          </TextApp>
        )}
      </div>
    );
  }
);

CurrencyInputApp.displayName = "CurrencyInputApp";
