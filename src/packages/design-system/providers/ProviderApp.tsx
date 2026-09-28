import React from "react";
import { ToastProvider, ToastPosition } from "./ToastContext";
import { ToastContainer } from "../molecules/ToastApp";

export interface ProviderAppProps {
  children: React.ReactNode;
  defaultToastPosition?: ToastPosition;
  maxToasts?: number;
}

/**
 * ProviderApp is the root Context Provider wrapper component for the application.
 * It provides Toast notification services (ToastProvider), renders ToastContainer,
 * and manages global state services for the design system.
 */
export function ProviderApp({
  children,
  defaultToastPosition = "top-right",
  maxToasts = 5,
}: ProviderAppProps) {
  return (
    <ToastProvider defaultPosition={defaultToastPosition} maxToasts={maxToasts}>
      {children}
      <ToastContainer />
    </ToastProvider>
  );
}
