import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardAppVariants = cva(
  "border transition-all flex flex-col relative",
  {
    variants: {
      variant: {
        default: "bg-surface text-ink border-hairline-soft shadow-xs",
        neutral: "bg-surface text-ink border-hairline-soft shadow-xs",
        brand: "bg-brand text-ink-on-brand border-transparent shadow-xs",
        primary: "bg-brand text-ink-on-brand border-transparent shadow-xs",
        secondary: "bg-surface-soft text-ink border-hairline shadow-xs",
        danger: "bg-accent text-white border-transparent shadow-xs",
        purple: "bg-vibrant-purple text-vibrant-purple-ink border-transparent shadow-vibrant-purple",
        purpleDark: "bg-vibrant-purple-dark text-white border-transparent shadow-vibrant-purple-inset",
        yellow: "bg-vibrant-yellow text-vibrant-yellow-ink border-transparent shadow-vibrant-yellow",
        blue: "bg-vibrant-blue text-vibrant-blue-ink border-transparent shadow-vibrant-blue",
        clay: "clay-card text-ink border-transparent",
        clayPurple: "clay-card clay-card-purple text-white border-transparent",
        clayYellow: "clay-card clay-card-yellow text-[#6f5100] dark:text-amber-100 border-transparent",
        clayBlue: "clay-card clay-card-blue text-[#674bb5] dark:text-blue-100 border-transparent",
      },
      size: {
        sm: "p-4 gap-3",
        md: "p-6 gap-4",
        lg: "p-8 gap-5",
        none: "p-0",
      },
      theme: {
        default: "",
        playful: "font-display border-2 border-hairline-soft shadow-vibrant-heavy",
      },
      rounded: {
        default: "rounded-card-custom",
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
        pill: "rounded-pill-custom",
        card: "rounded-card-custom",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
      rounded: "default",
      theme: "default",
    },
  }
);

export interface CardAppProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardAppVariants> {
  id: string;
}

export function CardApp({
  id,
  variant,
  size,
  rounded,
  theme,
  className,
  children,
  ...props
}: CardAppProps) {
  return (
    <div
      id={id}
      data-ui-id={id}
      className={cn(cardAppVariants({ variant, size, rounded, theme, className }))}
      {...props}
    >
      {children}
    </div>
  );
}

// Subcomponents
export interface CardAppHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export function CardAppHeader({ className, children, ...props }: CardAppHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 text-left", className)} {...props}>
      {children}
    </div>
  );
}

export interface CardAppTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  tooltip?: string;
  onInfoClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export function CardAppTitle({ className, children, tooltip, onInfoClick, ...props }: CardAppTitleProps) {
  return (
    <h3 className={cn("font-extrabold font-display text-2xl leading-tight flex items-center gap-1.5", className)} {...props}>
      <span>{children}</span>
      {tooltip && (
        <span className="relative group inline-flex items-center hover:z-[100]">
          <button
            type="button"
            onClick={onInfoClick}
            className="text-ink-muted/60 hover:text-ink hover:scale-105 active:scale-95 transition-all p-0.5 rounded-full inline-flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-vibrant-purple-dark"
            title={tooltip}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-info"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </button>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 hidden group-hover:block bg-zinc-900 text-white text-[10px] p-2.5 rounded-md shadow-lg font-sans font-medium text-center z-[100] pointer-events-none transition-all duration-150 border border-white/10">
            {tooltip}
            <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-zinc-900" />
          </span>
        </span>
      )}
    </h3>
  );
}

export interface CardAppDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export function CardAppDescription({ className, children, ...props }: CardAppDescriptionProps) {
  return (
    <p className={cn("text-xs font-medium opacity-80", className)} {...props}>
      {children}
    </p>
  );
}

export interface CardAppContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export function CardAppContent({ className, children, ...props }: CardAppContentProps) {
  return (
    <div className={cn("flex-1", className)} {...props}>
      {children}
    </div>
  );
}

export interface CardAppFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
export function CardAppFooter({ className, children, ...props }: CardAppFooterProps) {
  return (
    <div className={cn("mt-auto pt-4 flex items-center justify-between border-t border-hairline-soft", className)} {...props}>
      {children}
    </div>
  );
}

// Attach subcomponents for compound syntax
CardApp.Header = CardAppHeader;
CardApp.Title = CardAppTitle;
CardApp.Description = CardAppDescription;
CardApp.Content = CardAppContent;
CardApp.Footer = CardAppFooter;
