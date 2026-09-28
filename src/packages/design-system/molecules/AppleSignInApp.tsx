import * as React from "react";
import { cn } from "@/lib/utils";
import { TextApp } from "../atoms/TextApp";

export type AppleButtonStyle = "black" | "white" | "white-outline";
export type AppleButtonSize = "sm" | "md" | "lg";

function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" className={cn("h-4 w-4 shrink-0 fill-current", className)} aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

const styleClasses: Record<AppleButtonStyle, string> = {
  black: "bg-black text-white border border-transparent hover:opacity-90",
  white: "bg-white text-black border border-transparent hover:bg-surface-soft",
  "white-outline": "bg-transparent text-ink border border-hairline-hard hover:bg-surface-soft",
};

const sizeClasses: Record<AppleButtonSize, string> = {
  sm: "h-9 px-3 text-xs gap-2",
  md: "h-10 px-4 text-sm gap-2.5",
  lg: "h-12 px-5 text-base gap-3",
};

export interface AppleSignInAppProps {
  id: string;
  buttonStyle?: AppleButtonStyle;
  size?: AppleButtonSize;
  label?: string;
  clientId?: string;
  onSignIn?: () => void;
  className?: string;
}

export function AppleSignInApp({
  id,
  buttonStyle = "black",
  size = "md",
  label = "Sign in with Apple",
  clientId = "id.contoh.app.signin",
  onSignIn,
  className,
}: AppleSignInAppProps) {
  return (
    <div id={id} data-ui-id={id} className={cn("flex flex-col gap-1.5", className)}>
      <button
        id={`${id}-button`}
        type="button"
        onClick={onSignIn}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium shadow-2xs transition-all active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-vibrant-purple-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          styleClasses[buttonStyle],
          sizeClasses[size]
        )}
      >
        <AppleGlyph />
        {label}
      </button>
      <TextApp id={`${id}-client-hint`} variant="micro" className="font-mono text-ink-muted">
        clientId: {clientId}
      </TextApp>
    </div>
  );
}
