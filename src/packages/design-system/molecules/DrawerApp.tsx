import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ButtonApp } from "../atoms/ButtonApp";
import { motion, AnimatePresence } from "motion/react";

export type DrawerPosition = "right" | "left" | "bottom";
export type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface DrawerAppProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  position?: DrawerPosition;
  size?: DrawerSize;
  rounded?: "none" | "xl" | "2xl" | "3xl" | "card";
  headerExtra?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  closeOnOverlayClick?: boolean;
}

export function DrawerApp({
  id,
  isOpen,
  onClose,
  title,
  description,
  icon,
  position = "right",
  size = "md",
  rounded = "3xl",
  headerExtra,
  footer,
  children,
  className,
  overlayClassName,
  closeOnOverlayClick = true,
}: DrawerAppProps) {
  // Lock body scroll and handle Escape key
  React.useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Position classes
  const getPositionClasses = () => {
    switch (position) {
      case "left":
        return "left-0 top-0 bottom-0 h-full";
      case "bottom":
        return "bottom-0 left-0 right-0 max-h-[90vh]";
      case "right":
      default:
        return "right-0 top-0 bottom-0 h-full";
    }
  };

  // Motion variants based on position
  const getMotionVariants = () => {
    switch (position) {
      case "left":
        return {
          initial: { x: "-100%" },
          animate: { x: 0 },
          exit: { x: "-100%" },
        };
      case "bottom":
        return {
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "100%" },
        };
      case "right":
      default:
        return {
          initial: { x: "100%" },
          animate: { x: 0 },
          exit: { x: "100%" },
        };
    }
  };

  // Size classes
  const getSizeClasses = () => {
    if (position === "bottom") return "w-full";

    switch (size) {
      case "sm":
        return "w-full max-w-sm";
      case "lg":
        return "w-full max-w-xl";
      case "xl":
        return "w-full max-w-3xl";
      case "full":
        return "w-full";
      case "md":
      default:
        return "w-full max-w-md";
    }
  };

  // Rounded corner styling for drawer panel
  const getRoundedClasses = () => {
    if (rounded === "none") return "rounded-none";

    let radiusStr = "rounded-3xl";
    if (rounded === "xl") radiusStr = "rounded-xl";
    if (rounded === "2xl") radiusStr = "rounded-2xl";
    if (rounded === "card") radiusStr = "rounded-card-custom";

    if (position === "right") {
      return `rounded-l-${rounded === "3xl" ? "3xl" : rounded === "2xl" ? "2xl" : "xl"}`;
    }
    if (position === "left") {
      return `rounded-r-${rounded === "3xl" ? "3xl" : rounded === "2xl" ? "2xl" : "xl"}`;
    }
    if (position === "bottom") {
      return `rounded-t-${rounded === "3xl" ? "3xl" : rounded === "2xl" ? "2xl" : "xl"}`;
    }
    return radiusStr;
  };

  const variants = getMotionVariants();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div id={id} data-ui-id={id} className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={cn(
              "fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-xs",
              overlayClassName
            )}
            onClick={closeOnOverlayClick ? onClose : undefined}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className={cn(
              "fixed z-50 bg-surface text-ink border-l border-hairline-soft dark:border-vibrant-purple/40 shadow-2xl flex flex-col justify-between overflow-hidden",
              getPositionClasses(),
              getSizeClasses(),
              getRoundedClasses(),
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || description || icon) && (
              <div className="flex items-start justify-between px-6 py-5 border-b border-hairline-soft/80 shrink-0 bg-surface/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  {icon && (
                    <div className="p-2.5 rounded-xl bg-vibrant-purple/10 text-vibrant-purple-dark shrink-0">
                      {icon}
                    </div>
                  )}
                  <div className="space-y-0.5">
                    {title && (
                      <h3 className="text-base sm:text-lg font-bold font-display text-ink tracking-tight">
                        {title}
                      </h3>
                    )}
                    {description && (
                      <p className="text-xs text-ink-secondary leading-relaxed">
                        {description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {headerExtra}
                  <ButtonApp
                    id={`${id}-close-btn`}
                    variant="ghost"
                    size="sm"
                    rounded="full"
                    onClick={onClose}
                    aria-label="Tutup Panel"
                    className="p-1.5 h-8 w-8 text-ink-muted hover:text-ink hover:bg-vibrant-purple/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </ButtonApp>
                </div>
              </div>
            )}

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-6 py-4 border-t border-hairline-soft/80 shrink-0 bg-vibrant-grey-bg/30">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
