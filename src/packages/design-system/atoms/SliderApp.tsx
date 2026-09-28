import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { TextApp } from "./TextApp";

export type SliderVariant = "default" | "brand" | "vibrant" | "success" | "warning" | "error";
export type SliderSize = "sm" | "md" | "lg";
export type SliderRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface SliderAppProps {
  id: string;
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  onChange?: (value: number | [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  variant?: SliderVariant;
  size?: SliderSize;
  rounded?: SliderRounded;
  showTooltip?: boolean | "always" | "hover";
  showMarks?: boolean;
  marks?: number[] | { value: number; label?: string }[];
  showMinMax?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  helperText?: React.ReactNode;
  disabled?: boolean;
  formatValue?: (val: number) => string;
  className?: string;
  containerClassName?: string;
}

const trackSizeVariants = cva("relative w-full overflow-hidden select-none", {
  variants: {
    size: {
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-3.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const thumbSizeVariants = cva(
  "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 shadow-md cursor-grab active:cursor-grabbing border-2 z-10 focus:outline-none flex items-center justify-center transition-shadow",
  {
    variants: {
      size: {
        sm: "w-3.5 h-3.5",
        md: "w-4.5 h-4.5",
        lg: "w-5.5 h-5.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const roundedClasses: Record<SliderRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const activeFillVariants: Record<SliderVariant, string> = {
  default: "bg-vibrant-purple-dark",
  brand: "bg-vibrant-purple-dark",
  vibrant: "bg-vibrant-purple-dark",
  success: "bg-emerald-600",
  warning: "bg-amber-500",
  error: "bg-red-500",
};

const thumbBorderVariants: Record<SliderVariant, string> = {
  default: "border-vibrant-purple-dark bg-white dark:bg-slate-900 focus-visible:ring-2 focus-visible:ring-vibrant-purple-dark/40",
  brand: "border-vibrant-purple-dark bg-white dark:bg-slate-900 focus-visible:ring-2 focus-visible:ring-vibrant-purple-dark/40",
  vibrant: "border-vibrant-purple-dark bg-white dark:bg-slate-900 focus-visible:ring-2 focus-visible:ring-vibrant-purple-dark/40",
  success: "border-emerald-600 bg-white dark:bg-slate-900 focus-visible:ring-2 focus-visible:ring-emerald-500/40",
  warning: "border-amber-500 bg-white dark:bg-slate-900 focus-visible:ring-2 focus-visible:ring-amber-500/40",
  error: "border-red-500 bg-white dark:bg-slate-900 focus-visible:ring-2 focus-visible:ring-red-500/40",
};

export const SliderApp = React.forwardRef<HTMLDivElement, SliderAppProps>(
  (
    {
      id,
      value,
      defaultValue,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      variant = "default",
      size = "md",
      rounded = "full",
      showTooltip = false,
      showMarks = false,
      marks,
      showMinMax = false,
      label,
      description,
      helperText,
      disabled = false,
      formatValue = (v) => `${v}`,
      className,
      containerClassName,
    },
    ref
  ) => {
    const isRange = Array.isArray(value) || Array.isArray(defaultValue);

    const [internalValue, setInternalValue] = React.useState<number | [number, number]>(() => {
      if (value !== undefined) return value;
      if (defaultValue !== undefined) return defaultValue;
      return isRange ? [min, max] : min;
    });

    const [activeThumb, setActiveThumb] = React.useState<0 | 1 | null>(null);
    const [hoveredThumb, setHoveredThumb] = React.useState<0 | 1 | null>(null);
    const trackRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    const normalizeVal = React.useCallback(
      (val: number) => {
        const clamped = Math.min(Math.max(val, min), max);
        const stepped = Math.round((clamped - min) / step) * step + min;
        return Number(stepped.toFixed(4));
      },
      [min, max, step]
    );

    const currentVal = value !== undefined ? value : internalValue;

    // Convert values to percentage positions (0 to 100)
    const getPercentage = React.useCallback(
      (val: number) => {
        if (max === min) return 0;
        return Math.min(Math.max(((val - min) / (max - min)) * 100, 0), 100);
      },
      [min, max]
    );

    let pMin = 0;
    let pMax = 100;

    if (Array.isArray(currentVal)) {
      pMin = getPercentage(currentVal[0]);
      pMax = getPercentage(currentVal[1]);
    } else {
      pMin = 0;
      pMax = getPercentage(currentVal);
    }

    const updateValueFromPointer = React.useCallback(
      (clientX: number, targetThumb?: 0 | 1) => {
        if (disabled || !trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        if (rect.width === 0) return;

        const clickRatio = (clientX - rect.left) / rect.width;
        const rawVal = min + clickRatio * (max - min);
        const newSteppedVal = normalizeVal(rawVal);

        if (Array.isArray(currentVal)) {
          let chosenThumb: 0 | 1 = targetThumb !== undefined ? targetThumb : 0;

          if (targetThumb === undefined) {
            const dist0 = Math.abs(newSteppedVal - currentVal[0]);
            const dist1 = Math.abs(newSteppedVal - currentVal[1]);
            chosenThumb = dist0 <= dist1 ? 0 : 1;
          }

          let nextRange: [number, number] = [...currentVal];
          if (chosenThumb === 0) {
            nextRange[0] = Math.min(newSteppedVal, currentVal[1]);
          } else {
            nextRange[1] = Math.max(newSteppedVal, currentVal[0]);
          }

          if (value === undefined) {
            setInternalValue(nextRange);
          }
          onChange?.(nextRange);
        } else {
          if (value === undefined) {
            setInternalValue(newSteppedVal);
          }
          onChange?.(newSteppedVal);
        }
      },
      [disabled, min, max, normalizeVal, currentVal, value, onChange]
    );

    // Window event listeners while holding & dragging
    React.useEffect(() => {
      if (activeThumb === null || disabled) return;

      const handleGlobalPointerMove = (e: PointerEvent) => {
        // If mouse button is not held down (e.g. mouseup happened outside or was lost), clear active thumb
        if (e.buttons === 0) {
          setActiveThumb(null);
          return;
        }
        updateValueFromPointer(e.clientX, activeThumb);
      };

      const handleGlobalPointerUp = () => {
        setActiveThumb(null);
      };

      window.addEventListener("pointermove", handleGlobalPointerMove);
      window.addEventListener("pointerup", handleGlobalPointerUp);
      window.addEventListener("pointercancel", handleGlobalPointerUp);

      return () => {
        window.removeEventListener("pointermove", handleGlobalPointerMove);
        window.removeEventListener("pointerup", handleGlobalPointerUp);
        window.removeEventListener("pointercancel", handleGlobalPointerUp);
      };
    }, [activeThumb, disabled, updateValueFromPointer]);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, forceThumb?: 0 | 1) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();

      let targetThumb: 0 | 1 = forceThumb !== undefined ? forceThumb : 0;
      if (Array.isArray(currentVal) && forceThumb === undefined) {
        if (trackRef.current) {
          const rect = trackRef.current.getBoundingClientRect();
          const clickRatio = (e.clientX - rect.left) / rect.width;
          const rawVal = min + clickRatio * (max - min);
          const dist0 = Math.abs(rawVal - currentVal[0]);
          const dist1 = Math.abs(rawVal - currentVal[1]);
          targetThumb = dist0 <= dist1 ? 0 : 1;
        }
      }

      setActiveThumb(targetThumb);
      updateValueFromPointer(e.clientX, targetThumb);
    };

    // Calculate tick marks
    const computedMarks: { value: number; label?: string }[] = React.useMemo(() => {
      if (!showMarks && !marks) return [];
      if (marks && Array.isArray(marks)) {
        return marks.map((m) => (typeof m === "number" ? { value: m } : m));
      }
      const markList: { value: number; label?: string }[] = [];
      if (step > 1 && (max - min) / step <= 25) {
        for (let v = min; v <= max + 0.0001; v += step) {
          markList.push({ value: Number(v.toFixed(4)) });
        }
      } else {
        const markCount = 5;
        const stepVal = (max - min) / (markCount - 1);
        for (let i = 0; i < markCount; i++) {
          const v = min + i * stepVal;
          markList.push({ value: Number(v.toFixed(4)) });
        }
      }
      return markList;
    }, [showMarks, marks, min, max, step]);

    const roundedClass = roundedClasses[rounded];
    const roundedFullClass = roundedClasses.full;

    const isTooltipVisible = (thumbIndex: 0 | 1) => {
      if (disabled) return false;
      if (showTooltip === true || showTooltip === "always") return true;
      if (showTooltip === "hover") {
        return activeThumb === thumbIndex || hoveredThumb === thumbIndex;
      }
      return false;
    };

    return (
      <div
        id={`${id}-container`}
        data-ui-id={id}
        className={cn("flex flex-col gap-2 w-full text-left select-none", containerClassName)}
      >
        {/* Step 2 Spacing (8px / gap-2): Top Label & Helper */}
        {(label || description) && (
          <div className="flex flex-col text-left gap-0.5">
            {label && (
              typeof label === "string" ? (
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
              )
            )}
            {description && (
              typeof description === "string" ? (
                <TextApp id={`${id}-desc`} variant="caption" className="text-ink-muted leading-tight">
                  {description}
                </TextApp>
              ) : (
                description
              )
            )}
          </div>
        )}

        {/* Main Slider Track Area */}
        <div className="relative py-2 w-full flex items-center">
          <div
            ref={trackRef}
            id={id}
            tabIndex={disabled ? -1 : 0}
            onPointerDown={(e) => handlePointerDown(e)}
            className={cn(
              "relative w-full cursor-pointer touch-none bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600",
              trackSizeVariants({ size }),
              roundedClass,
              disabled && "opacity-50 cursor-not-allowed pointer-events-none bg-slate-200 dark:bg-slate-800",
              className
            )}
          >
            {/* Active Filled Track */}
            <div
              className={cn(
                "absolute top-0 bottom-0",
                activeFillVariants[variant],
                roundedClass
              )}
              style={{
                left: isRange ? `${pMin}%` : "0%",
                width: isRange ? `${pMax - pMin}%` : `${pMax}%`,
              }}
            />

            {/* Discrete Step Marks / Ticks */}
            {computedMarks.map((m, idx) => {
              const mPos = getPercentage(m.value);
              const isFilled = isRange ? m.value >= (currentVal as [number, number])[0] && m.value <= (currentVal as [number, number])[1] : m.value <= (currentVal as number);

              return (
                <span
                  key={idx}
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1 h-1 rounded-full z-0 pointer-events-none",
                    isFilled ? "bg-white/90 dark:bg-slate-900/90" : "bg-slate-400 dark:bg-slate-500"
                  )}
                  style={{ left: `${mPos}%` }}
                />
              );
            })}
          </div>

          {/* Thumbs Render */}
          {isRange ? (
            <>
              {/* Thumb 0 (Min Handle) */}
              <div
                className="absolute top-1/2"
                style={{ left: `${pMin}%` }}
                onMouseEnter={() => setHoveredThumb(0)}
                aria-label="Min slider handle"
                onMouseLeave={() => setHoveredThumb(null)}
              >
                {/* Floating Value Tooltip (Step 1 Spacing: py-1 px-2) */}
                {isTooltipVisible(0) && (
                  <div
                    id={`${id}-tooltip-0`}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 py-1 px-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded shadow-md pointer-events-none z-20"
                  >
                    <TextApp id={`${id}-tooltip-text-0`} variant="caption" weight="bold" className="text-white dark:text-slate-900 whitespace-nowrap leading-none text-[11px]">
                      {formatValue((currentVal as [number, number])[0])}
                    </TextApp>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-white" />
                  </div>
                )}
                <div
                  id={`${id}-thumb-0`}
                  onPointerDown={(e) => handlePointerDown(e, 0)}
                  className={cn(
                    thumbSizeVariants({ size }),
                    thumbBorderVariants[variant],
                    roundedFullClass,
                    activeThumb === 0 && "scale-125 shadow-lg",
                    disabled && "opacity-50 cursor-not-allowed pointer-events-none"
                  )}
                />
              </div>

              {/* Thumb 1 (Max Handle) */}
              <div
                className="absolute top-1/2"
                style={{ left: `${pMax}%` }}
                aria-label="Max slider handle"
                onMouseEnter={() => setHoveredThumb(1)}
                onMouseLeave={() => setHoveredThumb(null)}
              >
                {/* Floating Value Tooltip (Step 1 Spacing: py-1 px-2) */}
                {isTooltipVisible(1) && (
                  <div
                    id={`${id}-tooltip-1`}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 py-1 px-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded shadow-md pointer-events-none z-20"
                  >
                    <TextApp id={`${id}-tooltip-text-1`} variant="caption" weight="bold" className="text-white dark:text-slate-900 whitespace-nowrap leading-none text-[11px]">
                      {formatValue((currentVal as [number, number])[1])}
                    </TextApp>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-white" />
                  </div>
                )}
                <div
                  id={`${id}-thumb-1`}
                  onPointerDown={(e) => handlePointerDown(e, 1)}
                  className={cn(
                    thumbSizeVariants({ size }),
                    thumbBorderVariants[variant],
                    roundedFullClass,
                    activeThumb === 1 && "scale-125 shadow-lg",
                    disabled && "opacity-50 cursor-not-allowed pointer-events-none"
                  )}
                />
              </div>
            </>
          ) : (
            /* Single Thumb Handle */
            <div
              className="absolute top-1/2"
              aria-label="Single slider handle"
              style={{ left: `${pMax}%` }}
              onMouseEnter={() => setHoveredThumb(0)}
              onMouseLeave={() => setHoveredThumb(null)}
            >
              {/* Floating Value Tooltip (Step 1 Spacing: py-1 px-2) */}
              {isTooltipVisible(0) && (
                <div
                  id={`${id}-tooltip`}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 py-1 px-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded shadow-md pointer-events-none z-20"
                >
                  <TextApp id={`${id}-tooltip-text`} variant="caption" weight="bold" className="text-white dark:text-slate-900 whitespace-nowrap leading-none text-[11px]">
                    {formatValue(currentVal as number)}
                  </TextApp>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-white" />
                </div>
              )}
              <div
                id={`${id}-thumb`}
                onPointerDown={(e) => handlePointerDown(e, 0)}
                className={cn(
                  thumbSizeVariants({ size }),
                  thumbBorderVariants[variant],
                  roundedFullClass,
                  activeThumb === 0 && "scale-125 shadow-lg",
                  disabled && "opacity-50 cursor-not-allowed pointer-events-none"
                )}
              />
            </div>
          )}
        </div>

        {/* Step 1.5 Spacing (6px / gap-1.5): Min & Max / Helper Labels Below */}
        {(showMinMax || helperText) && (
          <div className="flex items-center justify-between gap-1.5 text-ink-muted">
            {showMinMax ? (
              <TextApp id={`${id}-min`} variant="caption" className="text-slate-500 font-medium">
                {formatValue(min)}
              </TextApp>
            ) : (
              <span />
            )}

            {helperText && (
              <TextApp id={`${id}-helper`} variant="caption" className="text-ink-muted">
                {helperText}
              </TextApp>
            )}

            {showMinMax && (
              <TextApp id={`${id}-max`} variant="caption" className="text-slate-500 font-medium">
                {formatValue(max)}
              </TextApp>
            )}
          </div>
        )}
      </div>
    );
  }
);

SliderApp.displayName = "SliderApp";
