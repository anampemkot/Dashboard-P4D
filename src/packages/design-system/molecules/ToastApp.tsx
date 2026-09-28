import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonApp } from "../atoms/ButtonApp";
import { BadgeApp, BadgeAppProps } from "../atoms/BadgeApp";
import { TextApp } from "../atoms/TextApp";
import { CardApp, CardAppProps } from "../atoms/CardApp";
import {
  ToastItem,
  ToastVariant,
  ToastPosition,
  useToastApp,
} from "../providers/ToastContext";

export interface ToastAppProps {
  item: ToastItem;
  onDismiss: (id: string) => void;
}

const getDefaultIcon = (variant: ToastVariant) => {
  switch (variant) {
    case "success":
      return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
    case "error":
      return <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />;
    case "warning":
      return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
    case "info":
      return <Info className="w-5 h-5 text-sky-500 shrink-0" />;
    case "vibrant":
    case "brand":
      return <Sparkles className="w-5 h-5 text-vibrant-purple-dark shrink-0" />;
    default:
      return <Info className="w-5 h-5 text-ink-muted shrink-0" />;
  }
};

const getBadgeVariant = (variant: ToastVariant): BadgeAppProps["variant"] => {
  switch (variant) {
    case "success":
      return "success";
    case "error":
      return "danger";
    case "warning":
      return "yellow";
    case "info":
      return "blue";
    case "vibrant":
      return "vibrantPurple";
    case "brand":
      return "brand";
    default:
      return "neutral";
  }
};

const getCardVariant = (variant: ToastVariant): CardAppProps["variant"] => {
  switch (variant) {
    case "vibrant":
      return "purple";
    case "brand":
      return "brand";
    default:
      return "neutral";
  }
};

export function ToastAppItem({ item, onDismiss }: ToastAppProps) {
  const { id, title, description, variant, badge, duration, action, icon, onClick, createdAt } = item;

  // Auto-dismiss handler
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onDismiss(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, createdAt, onDismiss]);

  const isVibrant = variant === "vibrant";
  const isBrand = variant === "brand";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="w-full max-w-sm pointer-events-auto"
    >
      <CardApp
        id={`toast-${id}`}
        variant={getCardVariant(variant)}
        size="sm"
        rounded="lg"
        theme={isVibrant ? "playful" : "default"}
        onClick={(e) => {
          if (onClick) {
            onClick(e);
          }
        }}
        className={cn(
          "shadow-lg border backdrop-blur-md overflow-hidden p-4",
          onClick && "cursor-pointer hover:shadow-xl transition-shadow",
          !isVibrant && !isBrand && "bg-surface/95 text-ink border-hairline-soft/80"
        )}
      >
        <div className="flex items-start gap-3">
          {/* Toast Icon */}
          <div className="pt-0.5">
            {icon ? icon : getDefaultIcon(variant)}
          </div>

          {/* Toast Main Content */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <TextApp
                id={`toast-title-${id}`}
                as="h4"
                variant="body"
                weight="bold"
                color={isBrand || isVibrant ? "white" : "default"}
                className="leading-snug text-sm truncate"
              >
                {title}
              </TextApp>

              {badge && (
                <BadgeApp
                  id={`toast-badge-${id}`}
                  variant={getBadgeVariant(variant)}
                  size="sm"
                  rounded="pill"
                >
                  {badge}
                </BadgeApp>
              )}
            </div>

            {description && (
              <div
                id={`toast-desc-${id}`}
                className={cn(
                  "text-xs leading-relaxed",
                  isBrand || isVibrant ? "opacity-90 text-white" : "text-ink-secondary"
                )}
              >
                {description}
              </div>
            )}

            {/* Action Button */}
            {action && (
              <div className="pt-2">
                <ButtonApp
                  id={`toast-action-${id}`}
                  variant={action.variant || (isBrand || isVibrant ? "white" : "primary")}
                  size="sm"
                  rounded="md"
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick(e);
                    onDismiss(id);
                  }}
                  className="px-3 py-1 text-xs min-h-[28px]"
                >
                  {action.label}
                </ButtonApp>
              </div>
            )}
          </div>

          {/* Close Button */}
          <ButtonApp
            id={`toast-close-${id}`}
            variant="ghost"
            size="sm"
            rounded="full"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss(id);
            }}
            aria-label="Tutup Notifikasi"
            className={cn(
              "p-1 h-7 w-7 min-h-[28px] min-w-[28px] shrink-0 transition-colors",
              isBrand || isVibrant
                ? "text-white/80 hover:text-white hover:bg-white/20"
                : "text-ink-muted hover:text-ink hover:bg-action-hover"
            )}
          >
            <X className="w-4 h-4" />
          </ButtonApp>
        </div>
      </CardApp>
    </motion.div>
  );
}

export function ToastContainer() {
  const { toasts, position, dismiss } = useToastApp();

  if (!toasts || toasts.length === 0) {
    return null;
  }

  const getPositionClasses = (pos: ToastPosition) => {
    switch (pos) {
      case "top-left":
        return "top-4 left-4 items-start";
      case "top-center":
        return "top-4 left-1/2 -translate-x-1/2 items-center";
      case "bottom-left":
        return "bottom-4 left-4 items-start";
      case "bottom-right":
        return "bottom-4 right-4 items-end";
      case "bottom-center":
        return "bottom-4 left-1/2 -translate-x-1/2 items-center";
      case "top-right":
      default:
        return "top-4 right-4 items-end";
    }
  };

  return (
    <div
      id="toast-container"
      data-ui-id="toast-container"
      className={cn(
        "fixed z-[100] flex flex-col gap-2.5 p-2 pointer-events-none max-w-full w-full sm:w-auto",
        getPositionClasses(position)
      )}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastAppItem key={toast.id} item={toast} onDismiss={dismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export const ToastApp = ToastAppItem;
