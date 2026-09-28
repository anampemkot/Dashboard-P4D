import React, { createContext, useContext, useState, useCallback, useRef } from "react";

export type ToastVariant = "default" | "success" | "error" | "warning" | "info" | "brand" | "vibrant";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

export interface ToastAction {
  label: string;
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | "danger" | "ghost" | "purple" | "yellow" | "blue";
}

export interface ToastOptions {
  id?: string;
  title: string;
  description?: React.ReactNode;
  variant?: ToastVariant;
  badge?: string;
  duration?: number; // ms, default 4000
  action?: ToastAction;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onDismiss?: () => void;
  onClose?: () => void;
}

export interface ToastItem extends Required<Pick<ToastOptions, "title">> {
  id: string;
  description?: React.ReactNode;
  variant: ToastVariant;
  badge?: string;
  duration: number;
  action?: ToastAction;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onDismiss?: () => void;
  onClose?: () => void;
  createdAt: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  position: ToastPosition;
  setPosition: (pos: ToastPosition) => void;
  toast: {
    (options: ToastOptions | string): string;
    success: (title: string, options?: Omit<ToastOptions, "title" | "variant">) => string;
    error: (title: string, options?: Omit<ToastOptions, "title" | "variant">) => string;
    warning: (title: string, options?: Omit<ToastOptions, "title" | "variant">) => string;
    info: (title: string, options?: Omit<ToastOptions, "title" | "variant">) => string;
    vibrant: (title: string, options?: Omit<ToastOptions, "title" | "variant">) => string;
  };
  dismiss: (id?: string) => void;
  clear: () => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export interface ToastProviderProps {
  children: React.ReactNode;
  defaultPosition?: ToastPosition;
  maxToasts?: number;
}

export function ToastProvider({
  children,
  defaultPosition = "top-right",
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [position, setPosition] = useState<ToastPosition>(defaultPosition);
  const toastIdCounter = useRef(1);

  const dismiss = useCallback((id?: string) => {
    if (!id) {
      setToasts([]);
      return;
    }
    setToasts((prev) => {
      const target = prev.find((t) => t.id === id);
      if (target?.onDismiss) {
        try {
          target.onDismiss();
        } catch (e) {
          console.error("Error in onDismiss toast handler", e);
        }
      }
      if (target?.onClose) {
        try {
          target.onClose();
        } catch (e) {
          console.error("Error in onClose toast handler", e);
        }
      }
      return prev.filter((t) => t.id !== id);
    });
  }, []);

  const clear = useCallback(() => {
    setToasts([]);
  }, []);

  const addToast = useCallback(
    (options: ToastOptions | string): string => {
      const isString = typeof options === "string";
      const id = isString
        ? `toast-${Date.now()}-${toastIdCounter.current++}`
        : options.id || `toast-${Date.now()}-${toastIdCounter.current++}`;

      const title = isString ? options : options.title;
      const variant = isString ? "default" : options.variant || "default";
      const duration = isString ? 4000 : options.duration ?? 4000;

      const newToast: ToastItem = {
        id,
        title,
        description: isString ? undefined : options.description,
        variant,
        badge: isString ? undefined : options.badge,
        duration,
        action: isString ? undefined : options.action,
        icon: isString ? undefined : options.icon,
        onClick: isString ? undefined : options.onClick,
        onDismiss: isString ? undefined : options.onDismiss,
        onClose: isString ? undefined : options.onClose,
        createdAt: Date.now(),
      };

      setToasts((prev) => {
        // If same ID exists, replace it
        const exists = prev.some((t) => t.id === id);
        if (exists) {
          return prev.map((t) => (t.id === id ? newToast : t));
        }
        // Limit max toasts
        const updated = [...prev, newToast];
        if (updated.length > maxToasts) {
          return updated.slice(updated.length - maxToasts);
        }
        return updated;
      });

      return id;
    },
    [maxToasts]
  );

  const toastCallable = useCallback(
    (options: ToastOptions | string) => addToast(options),
    [addToast]
  ) as ToastContextValue["toast"];

  toastCallable.success = (title, opts) => addToast({ ...opts, title, variant: "success" });
  toastCallable.error = (title, opts) => addToast({ ...opts, title, variant: "error" });
  toastCallable.warning = (title, opts) => addToast({ ...opts, title, variant: "warning" });
  toastCallable.info = (title, opts) => addToast({ ...opts, title, variant: "info" });
  toastCallable.vibrant = (title, opts) => addToast({ ...opts, title, variant: "vibrant" });

  return (
    <ToastContext.Provider
      value={{
        toasts,
        position,
        setPosition,
        toast: toastCallable,
        dismiss,
        clear,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToastApp(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastApp must be used within a ProviderApp or ToastProvider");
  }
  return context;
}
