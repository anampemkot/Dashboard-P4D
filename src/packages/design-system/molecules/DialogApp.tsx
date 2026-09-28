import * as React from "react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const dialogContentVariants = cva(
  "card w-full overflow-hidden flex flex-col max-h-[90vh] relative border",
  {
    variants: {
      variant: {
        default: "bg-surface border-hairline",
        brand: "bg-surface border-brand/30 ring-1 ring-brand/10",
      },
      size: {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
      },
      theme: {
        default: "border-hairline shadow-2xl",
        playful: "font-display border-0 shadow-vibrant-heavy bg-surface",
      },
      rounded: {
        default: "rounded-sm",
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
      variant: "default",
      size: "md",
      rounded: "default",
      theme: "default",
    },
  }
);

export interface DialogAppProps extends VariantProps<typeof dialogContentVariants> {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function DialogApp({
  id,
  isOpen,
  onClose,
  title,
  description,
  variant = "default",
  size = "md",
  rounded,
  theme = "default",
  children,
}: DialogAppProps) {
  // Lock scroll on open & handle Escape key
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const isPlayful = theme === "playful";

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={id}
          data-ui-id={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/70 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            id={`${id}-content`}
            data-ui-id={`${id}-content`}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className={cn(dialogContentVariants({ variant, size, rounded, theme }))}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className={cn(
                "flex items-center justify-between px-6 py-5 border-b border-hairline-soft",
                variant === "brand" && "bg-brand/5 border-brand/10",
                isPlayful && "bg-vibrant-grey-bg/30 border-b border-vibrant-purple-dark/10 px-8 py-6"
              )}
            >
              <div>
                <h3
                  className={cn(
                    "text-h4 text-ink",
                    isPlayful ? "font-extrabold text-2xl tracking-tight text-vibrant-purple-dark dark:text-vibrant-purple-dark" : "font-semibold"
                  )}
                >
                  {title}
                </h3>
                {description && (
                  <p
                    className={cn(
                      "text-xs mt-1",
                      isPlayful ? "text-vibrant-purple-dark/80 font-medium" : "text-ink-muted"
                    )}
                  >
                    {description}
                  </p>
                )}
              </div>
              <button
                id={`${id}-close-btn`}
                data-ui-id={`${id}-close-btn`}
                onClick={onClose}
                className={cn(
                  "transition-all cursor-pointer inline-flex items-center justify-center",
                  isPlayful
                    ? "text-vibrant-purple-dark hover:text-vibrant-purple hover:bg-vibrant-purple/10 p-2 rounded-full border border-vibrant-purple-dark/10"
                    : "text-ink-secondary hover:text-ink hover:bg-action-hover p-1.5 rounded border border-transparent"
                )}
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div
              className={cn(
                "flex-1 overflow-y-auto text-body text-ink",
                isPlayful ? "px-8 py-6" : "px-6 py-5"
              )}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
