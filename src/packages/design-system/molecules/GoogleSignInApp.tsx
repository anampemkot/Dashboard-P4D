import * as React from "react";
import { cn } from "@/lib/utils";
import { ButtonApp } from "../atoms/ButtonApp";
import { CardApp } from "../atoms/CardApp";
import { TextApp } from "../atoms/TextApp";
import { AvatarApp } from "../atoms/AvatarApp";

export type GoogleSignInVariant = "standard" | "one-tap";
export type GoogleButtonStyle = "light" | "dark" | "outline";
export type GoogleButtonShape = "pill" | "rect";
export type GoogleButtonSize = "sm" | "md" | "lg";

function GoogleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("h-4 w-4 shrink-0", className)} aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.084 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}

const shapeClasses: Record<GoogleButtonShape, string> = {
  pill: "rounded-full",
  rect: "rounded-[var(--radius-sm)]",
};

const styleClasses: Record<GoogleButtonStyle, string> = {
  light: "bg-white text-[#1f1f1f] border border-hairline-hard hover:bg-surface-soft",
  dark: "bg-[#131314] text-white border border-transparent hover:opacity-90",
  outline: "bg-transparent text-ink border border-hairline hover:bg-surface-soft",
};

const sizeClasses: Record<GoogleButtonSize, string> = {
  sm: "h-9 px-3 text-xs gap-2",
  md: "h-10 px-4 text-sm gap-2.5",
  lg: "h-12 px-5 text-base gap-3",
};

export interface GoogleSignInAppProps {
  id: string;
  variant?: GoogleSignInVariant;
  buttonStyle?: GoogleButtonStyle;
  shape?: GoogleButtonShape;
  size?: GoogleButtonSize;
  label?: string;
  clientId?: string;
  scopes?: string[];
  accountName?: string;
  accountEmail?: string;
  onSignIn?: () => void;
  onUseAnotherAccount?: () => void;
  className?: string;
}

export function GoogleSignInApp({
  id,
  variant = "standard",
  buttonStyle = "light",
  shape = "pill",
  size = "md",
  label = "Sign in with Google",
  clientId = "demo-client-id.apps.googleusercontent.com",
  scopes = ["openid", "email", "profile"],
  accountName = "Nama Pengguna",
  accountEmail = "pengguna@contoh.id",
  onSignIn,
  onUseAnotherAccount,
  className,
}: GoogleSignInAppProps) {
  if (variant === "one-tap") {
    return (
      <CardApp id={id} variant="neutral" size="sm" rounded="lg" className={cn("w-full max-w-[340px] gap-3 shadow-vibrant-soft", className)}>
        <div className="flex items-center gap-2">
          <GoogleGlyph className="h-4 w-4" />
          <TextApp id={`${id}-title`} variant="caption" weight="semibold" className="text-ink-secondary">
            Sign in with Google
          </TextApp>
        </div>
        <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-hairline-soft bg-surface-soft/50 p-3">
          <AvatarApp id={`${id}-account-avatar`} name={accountName} size="md" variant="vibrant" />
          <div className="min-w-0">
            <TextApp id={`${id}-account-name`} variant="body2" weight="semibold" className="truncate text-ink">
              {accountName}
            </TextApp>
            <TextApp id={`${id}-account-email`} variant="micro" className="truncate text-ink-muted">
              {accountEmail}
            </TextApp>
          </div>
        </div>
        <ButtonApp id={`${id}-continue`} variant="primary" size="md" rounded="md" className="w-full" onClick={onSignIn}>
          Continue as {accountName.split(" ")[0]}
        </ButtonApp>
        <ButtonApp id={`${id}-other-account`} variant="ghost" size="sm" rounded="md" className="w-full" onClick={onUseAnotherAccount}>
          Use another account
        </ButtonApp>
        <TextApp id={`${id}-scopes-hint`} variant="micro" className="text-center text-ink-muted">
          Scope: {scopes.join(", ")}
        </TextApp>
      </CardApp>
    );
  }

  return (
    <div id={id} data-ui-id={id} className={cn("flex flex-col gap-1.5", className)}>
      <button
        id={`${id}-button`}
        type="button"
        onClick={onSignIn}
        className={cn(
          "inline-flex items-center justify-center font-medium shadow-2xs transition-all active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-vibrant-purple-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          shapeClasses[shape],
          styleClasses[buttonStyle],
          sizeClasses[size]
        )}
      >
        <GoogleGlyph />
        {label}
      </button>
      <TextApp id={`${id}-client-hint`} variant="micro" className="font-mono text-ink-muted">
        clientId: {clientId} · scope: {scopes.join(", ")}
      </TextApp>
    </div>
  );
}
