import * as React from "react";
import { cn } from "@/lib/utils";
import { TextApp } from "../atoms/TextApp";
import { ButtonApp } from "../atoms/ButtonApp";
import { BadgeApp } from "../atoms/BadgeApp";
import { Plus, Minus, AlertCircle, Wallet, TrendingUp } from "lucide-react";

export type TradingInputVariant = "default" | "stock" | "crypto";
export type TradingInputSize = "sm" | "md" | "lg";
export type TradingInputRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface TradingInputAppProps {
  id: string;
  variant?: TradingInputVariant;
  unit?: "Lot" | "Shares" | "USDT" | "BTC" | string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  availableBalance?: number;
  pricePerUnit?: number;
  currencySymbol?: string;
  disabled?: boolean;
  error?: boolean | string;
  size?: TradingInputSize;
  rounded?: TradingInputRounded;
  onChange?: (value: number) => void;
  onQuickSelect?: (percentage: number) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  quickPercentages?: number[];
  showQuickSelect?: boolean;
  showEstimatedTotal?: boolean;
  showAvailableBalance?: boolean;
  className?: string;
  containerClassName?: string;
}

const roundedClasses: Record<TradingInputRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const inputSizeClasses: Record<TradingInputSize, string> = {
  sm: "h-9 text-xs px-2",
  md: "h-11 text-sm px-3",
  lg: "h-13 text-base px-4",
};

const buttonSizeClasses: Record<TradingInputSize, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

const mapToButtonRounded = (r: TradingInputRounded) => {
  if (r === "xl") return "lg";
  return r;
};

export const TradingInputApp = React.forwardRef<HTMLDivElement, TradingInputAppProps>(
  (
    {
      id,
      variant = "stock",
      unit,
      value,
      defaultValue,
      min,
      max,
      step,
      availableBalance,
      pricePerUnit,
      currencySymbol = "Rp",
      disabled = false,
      error = false,
      size = "md",
      rounded = "md",
      onChange,
      onQuickSelect,
      label,
      description,
      quickPercentages = [25, 50, 75, 100],
      showQuickSelect = true,
      showEstimatedTotal = true,
      showAvailableBalance = true,
      className,
      containerClassName,
    },
    ref
  ) => {
    // Default values based on variant
    const defaultUnit = unit || (variant === "crypto" ? "USDT" : "Lot");
    const defaultMin = min !== undefined ? min : (variant === "crypto" ? 0.0001 : 1);
    const defaultStep = step !== undefined ? step : (variant === "crypto" ? 0.01 : 1);

    const [internalValue, setInternalValue] = React.useState<number>(
      defaultValue !== undefined ? defaultValue : defaultMin
    );

    const currentValue = value !== undefined ? value : internalValue;

    // Helper to round value cleanly according to step / variant
    const formatValueByVariant = (val: number): number => {
      if (variant === "stock") {
        return Math.floor(val);
      }
      // For crypto/custom, keep up to 4 decimals
      return Math.round(val * 10000) / 10000;
    };

    const handleValueChange = (newVal: number) => {
      if (disabled) return;
      const sanitized = Math.max(0, formatValueByVariant(newVal));
      if (value === undefined) {
        setInternalValue(sanitized);
      }
      onChange?.(sanitized);
    };

    const handleIncrement = () => {
      if (disabled) return;
      const nextVal = currentValue + defaultStep;
      if (max !== undefined && nextVal > max) {
        handleValueChange(max);
      } else {
        handleValueChange(nextVal);
      }
    };

    const handleDecrement = () => {
      if (disabled) return;
      const nextVal = Math.max(defaultMin, currentValue - defaultStep);
      handleValueChange(nextVal);
    };

    const handleQuickSelectClick = (pct: number) => {
      if (disabled) return;
      onQuickSelect?.(pct);

      let targetUnits = 0;
      if (max !== undefined) {
        targetUnits = (max * pct) / 100;
      } else if (availableBalance !== undefined && pricePerUnit && pricePerUnit > 0) {
        const totalBudget = (availableBalance * pct) / 100;
        targetUnits = totalBudget / pricePerUnit;
      } else {
        // Fallback default scale
        targetUnits = (100 * pct) / 100;
      }

      const formatted = formatValueByVariant(targetUnits);
      handleValueChange(formatted);
    };

    // Calculate Estimated Total Cost
    const estimatedTotal = pricePerUnit !== undefined && pricePerUnit > 0 ? currentValue * pricePerUnit : null;

    // Check insufficient balance or max exceeded error
    const isInsufficientBalance =
      availableBalance !== undefined && estimatedTotal !== null && estimatedTotal > availableBalance;
    const isMaxExceeded = max !== undefined && currentValue > max;

    const hasError = Boolean(error) || isInsufficientBalance || isMaxExceeded;
    const errorMessage =
      typeof error === "string"
        ? error
        : isInsufficientBalance
        ? `Saldo ${currencySymbol} tidak mencukupi untuk transaksi ini.`
        : isMaxExceeded
        ? `Batas maksimum pemesanan adalah ${max} ${defaultUnit}.`
        : null;

    const roundedClass = roundedClasses[rounded];
    const inputSizeClass = inputSizeClasses[size];
    const btnSize = buttonSizeClasses[size];

    // Format money helper
    const formatCurrency = (amount: number) => {
      return `${currencySymbol} ${amount.toLocaleString("id-ID")}`;
    };

    return (
      <div
        id={`${id}-container`}
        ref={ref}
        data-ui-id={id}
        className={cn("flex flex-col gap-2 w-full text-left select-none", containerClassName)}
      >
        {/* Label & Available Balance Header (Step 2 Spacing: gap-2) */}
        {(label || description || (showAvailableBalance && availableBalance !== undefined)) && (
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex flex-col gap-0.5 text-left">
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

            {showAvailableBalance && availableBalance !== undefined && (
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                <Wallet className="w-3.5 h-3.5 text-vibrant-purple-dark" />
                <TextApp id={`${id}-avail-balance`} variant="caption" weight="medium" className="text-ink-secondary text-xs">
                  Saldo: <strong className="text-ink font-mono">{formatCurrency(availableBalance)}</strong>
                </TextApp>
              </div>
            )}
          </div>
        )}

        {/* Input Control Container with Stepper & Unit Badge */}
        <div
          id={`${id}-control-group`}
          className={cn(
            "flex items-center w-full bg-white dark:bg-slate-900 border transition-all p-1 gap-1",
            roundedClass,
            disabled
              ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-60 cursor-not-allowed"
              : hasError
              ? "border-red-500 ring-1 ring-red-500"
              : "border-slate-300 dark:border-slate-600",
            className
          )}
        >
          {/* Decrement Stepper Button */}
          <ButtonApp
            id={`${id}-decrement-btn`}
            type="button"
            variant="secondary"
            size={btnSize}
            rounded={mapToButtonRounded(rounded)}
            disabled={disabled || currentValue <= (min !== undefined ? min : 0)}
            onClick={handleDecrement}
            className="shrink-0 w-9 h-9 p-0 flex items-center justify-center font-bold focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 ring-0 focus:outline-none focus-visible:outline-none active:border-vibrant-purple-dark focus:border-slate-400"
            aria-label="Kurangi Jumlah"
          >
            <Minus className="w-4 h-4" />
          </ButtonApp>

          {/* Numeric Input */}
          <input
            id={`${id}-input`}
            type="number"
            min={min}
            max={max}
            step={defaultStep}
            value={currentValue === 0 ? "0" : currentValue || ""}
            disabled={disabled}
            onChange={(e) => {
              const parsed = parseFloat(e.target.value);
              handleValueChange(isNaN(parsed) ? 0 : parsed);
            }}
            className={cn(
              "w-full bg-transparent text-center font-mono font-bold text-slate-900 dark:text-slate-100 border-none outline-none focus:outline-none focus:ring-0 p-0 m-0",
              inputSizeClass
            )}
            placeholder="0"
          />

          {/* Unit Badge */}
          <BadgeApp
            id={`${id}-unit-badge`}
            variant="solidPurple"
            size="sm"
            className="shrink-0 whitespace-nowrap px-2.5 py-1 font-mono uppercase font-bold"
          >
            {defaultUnit}
          </BadgeApp>

          {/* Increment Stepper Button */}
          <ButtonApp
            id={`${id}-increment-btn`}
            type="button"
            variant="secondary"
            size={btnSize}
            rounded={mapToButtonRounded(rounded)}
            disabled={disabled || (max !== undefined && currentValue >= max)}
            onClick={handleIncrement}
            className="shrink-0 w-9 h-9 p-0 flex items-center justify-center font-bold focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 ring-0 focus:outline-none focus-visible:outline-none active:border-vibrant-purple-dark focus:border-slate-400"
            aria-label="Tambah Jumlah"
          >
            <Plus className="w-4 h-4" />
          </ButtonApp>
        </div>

        {/* Quick Select Percentage Pills (Step 3 Spacing: gap-3 above this container, Step 1 spacing gap-1 between pills) */}
        {showQuickSelect && quickPercentages && quickPercentages.length > 0 && (
          <div id={`${id}-quick-select-group`} className="flex items-center gap-1 mt-1">
            {quickPercentages.map((pct) => (
              <ButtonApp
                key={pct}
                id={`${id}-quick-btn-${pct}`}
                type="button"
                variant="outline"
                size="sm"
                rounded={mapToButtonRounded(rounded)}
                disabled={disabled}
                onClick={() => handleQuickSelectClick(pct)}
                className="flex-1 py-1 text-xs font-semibold focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 ring-0 focus:outline-none focus-visible:outline-none hover:border-vibrant-purple-dark hover:text-vibrant-purple-dark hover:bg-vibrant-purple/10 active:border-vibrant-purple-dark focus:border-vibrant-purple-dark active:scale-95 transition-all"
              >
                {pct === 100 ? "MAX" : `${pct}%`}
              </ButtonApp>
            ))}
          </div>
        )}

        {/* Footer: Estimated Transaction Value & Error Messages (Step 2 Spacing: gap-2) */}
        <div className="flex flex-col gap-1.5 mt-0.5">
          {showEstimatedTotal && pricePerUnit !== undefined && pricePerUnit > 0 && (
            <div className="flex items-center justify-between text-xs bg-surface-soft/60 px-2.5 py-1.5 rounded-md border border-hairline-soft">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-vibrant-purple-dark" />
                <TextApp id={`${id}-est-label`} variant="caption" className="text-ink-secondary">
                  Estimasi Total Nilai:
                </TextApp>
              </div>
              <TextApp id={`${id}-est-val`} variant="caption" weight="bold" className="text-vibrant-purple-dark font-mono text-sm">
                {formatCurrency(estimatedTotal || 0)}
              </TextApp>
            </div>
          )}

          {/* Validation Error Message */}
          {hasError && errorMessage && (
            <div id={`${id}-error-container`} className="flex items-center gap-1.5 text-red-500 mt-0.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <TextApp id={`${id}-error-text`} variant="caption" weight="medium" className="text-red-500 text-xs">
                {errorMessage}
              </TextApp>
            </div>
          )}
        </div>
      </div>
    );
  }
);

TradingInputApp.displayName = "TradingInputApp";
