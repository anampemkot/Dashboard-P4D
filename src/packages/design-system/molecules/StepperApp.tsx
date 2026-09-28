import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Check, AlertCircle } from "lucide-react";
import { TextApp } from "../atoms/TextApp";

export type StepStatus = "completed" | "active" | "upcoming" | "error";
export type StepperOrientation = "horizontal" | "vertical";
export type StepperType = "numbered" | "icon" | "dots";
export type StepperVariant = "default" | "vibrant" | "outline";
export type StepperSize = "sm" | "md" | "lg";
export type StepperRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface StepItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status?: StepStatus;
  disabled?: boolean;
}

const stepperIndicatorVariants = cva(
  "relative z-10 flex items-center justify-center font-bold transition-all duration-200 shrink-0 select-none shadow-2xs",
  {
    variants: {
      size: {
        sm: "w-6 h-6 text-xs",
        md: "w-8 h-8 text-sm",
        lg: "w-10 h-10 text-base",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      size: "md",
      rounded: "full",
    },
  }
);

export interface StepperAppProps extends VariantProps<typeof stepperIndicatorVariants> {
  id: string;
  steps: StepItem[];
  currentStep?: number;
  orientation?: StepperOrientation;
  type?: StepperType;
  variant?: StepperVariant;
  size?: StepperSize;
  rounded?: StepperRounded;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export function StepperApp({
  id,
  steps,
  currentStep = 0,
  orientation = "horizontal",
  type = "numbered",
  variant = "default",
  size = "md",
  rounded = "full",
  onStepClick,
  className,
}: StepperAppProps) {
  const isVertical = orientation === "vertical";
  const iconSizeClass = size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4";

  // Helper for step indicator button
  const renderIndicator = (step: StepItem, idx: number, status: StepStatus) => {
    const isCompleted = status === "completed";
    const isActive = status === "active";
    const isError = status === "error";

    let indicatorBg = "";
    if (isCompleted) {
      indicatorBg = variant === "vibrant"
        ? "bg-vibrant-purple-dark text-white shadow-xs"
        : "bg-emerald-600 text-white shadow-xs";
    } else if (isActive) {
      indicatorBg = variant === "vibrant"
        ? "bg-vibrant-purple text-vibrant-purple-ink ring-4 ring-vibrant-purple/20 font-bold"
        : "bg-vibrant-purple-dark text-white ring-4 ring-vibrant-purple-dark/20 font-bold";
    } else if (isError) {
      indicatorBg = "bg-accent text-white ring-4 ring-accent/20";
    } else {
      indicatorBg = variant === "outline"
        ? "bg-surface border-2 border-hairline text-ink-muted"
        : "bg-surface-soft border border-hairline-soft text-ink-muted";
    }

    const isClickable = !!onStepClick && !step.disabled;

    return (
      <button
        type="button"
        disabled={!isClickable}
        onClick={() => isClickable && onStepClick?.(idx)}
        className={cn(
          stepperIndicatorVariants({ size, rounded }),
          indicatorBg,
          isClickable ? "cursor-pointer hover:scale-105" : "cursor-default"
        )}
        aria-label={`Step ${idx + 1}: ${step.title}`}
      >
        {type === "dots" ? (
          <span className="w-2 h-2 rounded-full bg-current" />
        ) : isCompleted ? (
          <Check className={iconSizeClass} />
        ) : isError ? (
          <AlertCircle className={iconSizeClass} />
        ) : type === "icon" && step.icon ? (
          step.icon
        ) : (
          <span>{idx + 1}</span>
        )}
      </button>
    );
  };

  // VERTICAL LAYOUT (Unbroken Vertical Connector Line)
  if (isVertical) {
    return (
      <div
        id={id}
        data-ui-id={id}
        className={cn("w-full max-w-md mx-auto flex flex-col select-none font-sans", className)}
      >
        {steps.map((step, idx) => {
          let status: StepStatus = step.status || "upcoming";
          if (!step.status) {
            if (idx < currentStep) status = "completed";
            else if (idx === currentStep) status = "active";
            else status = "upcoming";
          }

          const isActive = status === "active";
          const isCompleted = status === "completed";
          const isLast = idx === steps.length - 1;
          const isClickable = !!onStepClick && !step.disabled;

          return (
            <div key={step.id || idx} className="flex items-start gap-4 w-full group">
              {/* Left Column: Circle & Continuous Vertical Line */}
              <div className="flex flex-col items-center shrink-0">
                {renderIndicator(step, idx, status)}

                {/* Continuous Unbroken Connector Line */}
                {!isLast && (
                  <div
                    className={cn(
                      "w-0.5 flex-1 my-1 min-h-[36px] transition-colors duration-300 rounded-full",
                      idx < currentStep ? "bg-vibrant-purple-dark" : "bg-slate-200 dark:bg-slate-700"
                    )}
                  />
                )}
              </div>

              {/* Right Column: Title & Description */}
              <div
                onClick={() => isClickable && onStepClick?.(idx)}
                className={cn("flex-1 min-w-0 pb-6 pt-0.5 space-y-0.5", isClickable ? "cursor-pointer" : "")}
              >
                <TextApp
                  id={`stepper-vtitle-${id}-${idx}`}
                  variant="body2"
                  weight={isActive || isCompleted ? "bold" : "medium"}
                  className={cn(
                    "truncate leading-tight",
                    isActive
                      ? "text-vibrant-purple-dark dark:text-purple-300"
                      : isCompleted
                      ? "text-ink font-semibold"
                      : "text-ink-muted"
                  )}
                >
                  {step.title}
                </TextApp>
                {step.description && (
                  <TextApp
                    id={`stepper-vdesc-${id}-${idx}`}
                    variant="caption"
                    className={cn(
                      "line-clamp-2 leading-relaxed text-[11px]",
                      isActive ? "text-ink-secondary" : "text-ink-muted"
                    )}
                  >
                    {step.description}
                  </TextApp>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // HORIZONTAL LAYOUT (Two-Row Architecture: Top Circles+Lines Row & Bottom Labels Row)
  return (
    <div id={id} data-ui-id={id} className={cn("w-full min-w-0 flex flex-col select-none font-sans space-y-2.5", className)}>
      {/* Top Row: Circles & Connecting Lines — horizontally scrollable so
          many steps degrade to a swipeable row on narrow screens instead of
          squashing the (fixed-size, shrink-0) step circles unreadably. */}
      <div className="w-full min-w-0 flex items-center justify-between relative px-2 overflow-x-auto no-scrollbar">
        {steps.map((step, idx) => {
          let status: StepStatus = step.status || "upcoming";
          if (!step.status) {
            if (idx < currentStep) status = "completed";
            else if (idx === currentStep) status = "active";
            else status = "upcoming";
          }

          const isLast = idx === steps.length - 1;

          return (
            <React.Fragment key={`top-${step.id || idx}`}>
              {/* Circle Indicator */}
              {renderIndicator(step, idx, status)}

              {/* Connector Line between Circle i and Circle i+1 */}
              {!isLast && (
                <div className="flex-1 mx-2 h-0.5 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
                  <div
                    className={cn(
                      "h-full w-full transition-all duration-300 rounded-full",
                      idx < currentStep ? "bg-vibrant-purple-dark" : "bg-transparent"
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Bottom Row: Titles & Descriptions */}
      <div className="w-full min-w-0 flex items-start justify-between">
        {steps.map((step, idx) => {
          let status: StepStatus = step.status || "upcoming";
          if (!step.status) {
            if (idx < currentStep) status = "completed";
            else if (idx === currentStep) status = "active";
            else status = "upcoming";
          }

          const isActive = status === "active";
          const isCompleted = status === "completed";
          const isClickable = !!onStepClick && !step.disabled;

          return (
            <div
              key={`label-${step.id || idx}`}
              onClick={() => isClickable && onStepClick?.(idx)}
              className={cn(
                "flex-1 min-w-0 px-1 flex flex-col items-center text-center space-y-0.5",
                isClickable ? "cursor-pointer" : ""
              )}
            >
              <TextApp
                id={`stepper-htitle-${id}-${idx}`}
                variant="body2"
                weight={isActive || isCompleted ? "bold" : "medium"}
                className={cn(
                  "line-clamp-2 leading-tight text-center w-full",
                  isActive
                    ? "text-vibrant-purple-dark dark:text-purple-300 font-bold"
                    : isCompleted
                    ? "text-ink font-semibold"
                    : "text-ink-muted"
                )}
              >
                {step.title}
              </TextApp>
              {step.description && (
                <TextApp
                  id={`stepper-hdesc-${id}-${idx}`}
                  variant="caption"
                  className={cn(
                    "line-clamp-2 leading-relaxed text-[11px] text-center w-full",
                    isActive ? "text-ink-secondary" : "text-ink-muted"
                  )}
                >
                  {step.description}
                </TextApp>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
