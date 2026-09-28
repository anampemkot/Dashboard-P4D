import * as React from "react";
import { cn } from "@/lib/utils";

export type ToggleSize = "sm" | "md" | "lg";
export type ToggleActiveColor =
  | "vibrantPurple"
  | "brand"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "sky"
  | "dark";
export type ToggleInactiveColor = "neutral" | "slate" | "muted";
export type ToggleLabelPosition = "left" | "right";

export interface ToggleAppProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  /** Unique ID for element and accessibility */
  id: string;
  /** Controlled checked state */
  checked?: boolean;
  /** Uncontrolled default checked state */
  defaultChecked?: boolean;
  /** Callback fired when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Legacy or native HTML onChange handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Component size preset */
  size?: ToggleSize;
  /** Active track color when checked */
  activeColor?: ToggleActiveColor;
  /** Inactive track color when unchecked */
  inactiveColor?: ToggleInactiveColor;
  /** Custom thumb color class or preset */
  thumbColor?: "white" | "neutral" | "dark" | string;
  /** Icon displayed inside thumb or track when checked (ON) */
  iconOn?: React.ReactNode;
  /** Icon displayed inside thumb or track when unchecked (OFF) */
  iconOff?: React.ReactNode;
  /** Short text label inside track when checked (ON) e.g., "ON", "1" */
  textOn?: string;
  /** Short text label inside track when unchecked (OFF) e.g., "OFF", "0" */
  textOff?: string;
  /** Label text beside switch */
  label?: React.ReactNode;
  /** Sub-label / helper description text below label */
  sublabel?: React.ReactNode;
  /** Position of label relative to switch button */
  labelPosition?: ToggleLabelPosition;
  /** Additional custom class for track button */
  className?: string;
  /** Additional class for container wrapping label and switch */
  containerClassName?: string;
}

const activeColorClasses: Record<ToggleActiveColor, string> = {
  vibrantPurple: "bg-vibrant-purple hover:bg-vibrant-purple-dark text-white",
  brand: "bg-vibrant-purple-dark hover:bg-purple-900 text-white",
  success: "bg-emerald-500 hover:bg-emerald-600 text-white",
  danger: "bg-rose-500 hover:bg-rose-600 text-white",
  warning: "bg-amber-500 hover:bg-amber-600 text-white",
  info: "bg-sky-500 hover:bg-sky-600 text-white",
  sky: "bg-sky-500 hover:bg-sky-600 text-white",
  dark: "bg-zinc-800 hover:bg-zinc-900 text-white",
};

const inactiveColorClasses: Record<ToggleInactiveColor, string> = {
  neutral: "bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 text-zinc-500",
  slate: "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-500",
  muted: "bg-zinc-300/80 dark:bg-zinc-800 hover:bg-zinc-300 text-zinc-400",
};

export const ToggleApp = React.forwardRef<HTMLInputElement, ToggleAppProps>(
  (
    {
      id,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      onChange,
      disabled = false,
      size = "md",
      activeColor = "vibrantPurple",
      inactiveColor = "neutral",
      thumbColor = "white",
      iconOn,
      iconOff,
      textOn,
      textOff,
      label,
      sublabel,
      labelPosition = "right",
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    // Internal state for uncontrolled usage
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);

    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : uncontrolledChecked;

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const newChecked = e.target.checked;

      if (!isControlled) {
        setUncontrolledChecked(newChecked);
      }

      onCheckedChange?.(newChecked);
      onChange?.(e);
    };

    // Dimension metrics per size preset
    const trackSizeClass = {
      sm: "w-9 h-5 px-0.5",
      md: "w-12 h-6.5 px-0.5",
      lg: "w-15 h-8 px-1",
    }[size];

    const thumbSizeClass = {
      sm: "w-4 h-4",
      md: "w-5.5 h-5.5",
      lg: "w-6 h-6",
    }[size];

    const translateClass = {
      sm: isChecked ? "translate-x-4" : "translate-x-0",
      md: isChecked ? "translate-x-5.5" : "translate-x-0",
      lg: isChecked ? "translate-x-7" : "translate-x-0",
    }[size];

    const textSizeClass = {
      sm: "text-[9px] font-bold tracking-tighter",
      md: "text-[10px] font-bold tracking-tight",
      lg: "text-[11px] font-bold tracking-tight",
    }[size];

    const thumbColorClass =
      thumbColor === "white"
        ? "bg-white text-zinc-800 shadow-sm"
        : thumbColor === "neutral"
        ? "bg-zinc-100 text-zinc-700 shadow-sm"
        : thumbColor === "dark"
        ? "bg-zinc-900 text-white shadow-sm"
        : thumbColor;

    // Render track text overlay if textOn or textOff provided
    const renderTrackText = () => {
      if (!textOn && !textOff) return null;

      return (
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-between px-1.5 select-none pointer-events-none transition-opacity duration-200",
            textSizeClass
          )}
        >
          <span
            className={cn(
              "transition-opacity duration-200 pl-0.5",
              isChecked ? "opacity-100 font-bold" : "opacity-0"
            )}
          >
            {textOn}
          </span>
          <span
            className={cn(
              "transition-opacity duration-200 pr-0.5 ml-auto",
              !isChecked ? "opacity-100 font-bold" : "opacity-0"
            )}
          >
            {textOff}
          </span>
        </span>
      );
    };

    const toggleButtonNode = (
      <label
        htmlFor={id}
        className={cn(
          "relative inline-flex items-center cursor-pointer select-none transition-colors duration-200 rounded-full focus-within:ring-2 focus-within:ring-vibrant-purple/40 focus-within:ring-offset-1",
          trackSizeClass,
          isChecked ? activeColorClasses[activeColor] : inactiveColorClasses[inactiveColor],
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
      >
        {/* Hidden Native Input */}
        <input
          ref={ref}
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={handleToggle}
          disabled={disabled}
          className="sr-only"
          {...props}
        />

        {/* Track Text Overlay */}
        {renderTrackText()}

        {/* Moving Thumb */}
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full transition-transform duration-200 ease-out z-10 transform-gpu",
            thumbSizeClass,
            translateClass,
            thumbColorClass
          )}
        >
          {isChecked ? iconOn : iconOff}
        </span>
      </label>
    );

    if (!label && !sublabel) {
      return toggleButtonNode;
    }

    return (
      <div
        className={cn(
          "inline-flex items-center gap-3",
          labelPosition === "left" && "flex-row-reverse justify-end",
          disabled && "opacity-60 cursor-not-allowed",
          containerClassName
        )}
      >
        {toggleButtonNode}

        <div className="flex flex-col select-none">
          {label && (
            <label
              htmlFor={id}
              className={cn(
                "font-medium text-ink cursor-pointer leading-tight",
                size === "sm" && "text-xs",
                size === "md" && "text-sm",
                size === "lg" && "text-base",
                disabled && "cursor-not-allowed text-ink-muted"
              )}
            >
              {label}
            </label>
          )}
          {sublabel && (
            <span
              className={cn(
                "text-ink-muted leading-tight mt-0.5",
                size === "sm" && "text-[10px]",
                size === "md" && "text-xs",
                size === "lg" && "text-sm"
              )}
            >
              {sublabel}
            </span>
          )}
        </div>
      </div>
    );
  }
);

ToggleApp.displayName = "ToggleApp";

export const SwitchApp = ToggleApp;
