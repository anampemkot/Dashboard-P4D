import * as React from "react";
import { KeyRound, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardApp } from "../atoms/CardApp";
import { TextApp } from "../atoms/TextApp";
import { ButtonApp } from "../atoms/ButtonApp";
import { SeparatorApp } from "../atoms/SeparatorApp";
import { BadgeApp } from "../atoms/BadgeApp";
import { AlertApp, AlertIconApp, AlertDescriptionApp } from "../molecules/AlertApp";

export type PasswordResetEmailVariant = "standard" | "otp";

export interface PasswordResetEmailAppProps {
  id: string;
  variant?: PasswordResetEmailVariant;
  brandName?: string;
  recipientName?: string;
  instructions?: string;
  resetUrl?: string;
  resetLabel?: string;
  otpCode?: string;
  expiryMinutes?: number;
  className?: string;
}

export function PasswordResetEmailApp({
  id,
  variant = "standard",
  brandName = "P4D BPKAD Yogyakarta",
  recipientName = "Wajib Pajak",
  instructions,
  resetUrl = "https://p4d.jogjakota.go.id/reset-password?token=demo",
  resetLabel = "Atur Ulang Password",
  otpCode = "482913",
  expiryMinutes = 10,
  className,
}: PasswordResetEmailAppProps) {
  const resolvedInstructions =
    instructions ??
    (variant === "standard"
      ? "Kami menerima permintaan untuk mengatur ulang password akun Anda. Klik tombol di bawah untuk melanjutkan."
      : "Gunakan kode verifikasi berikut untuk mengatur ulang password akun Anda.");

  return (
    <CardApp
      id={id}
      variant="neutral"
      size="none"
      rounded="lg"
      className={cn("mx-auto w-full max-w-[600px] overflow-hidden p-0", className)}
    >
      <div id={`${id}-header`} className="flex items-center gap-3 border-b border-hairline-soft bg-surface-soft/60 px-6 py-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-vibrant-purple/15 text-vibrant-purple-dark">
          <KeyRound className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <TextApp id={`${id}-brand-name`} variant="h6" className="truncate text-ink">
            {brandName}
          </TextApp>
          <BadgeApp id={`${id}-variant-badge`} variant="accent" size="sm" className="mt-1">
            {variant === "standard" ? "Password Reset" : "OTP Verification"}
          </BadgeApp>
        </div>
      </div>

      <div id={`${id}-body`} className="flex flex-col gap-4 px-6 py-6">
        <TextApp id={`${id}-greeting`} variant="body2" className="text-ink-secondary">
          Halo, {recipientName}
        </TextApp>
        <TextApp id={`${id}-title`} variant="h3" weight="bold" className="text-ink">
          Permintaan Reset Password
        </TextApp>
        <TextApp id={`${id}-instructions`} variant="body" className="leading-relaxed text-ink-secondary">
          {resolvedInstructions}
        </TextApp>

        {variant === "standard" ? (
          <div className="flex flex-col gap-2">
            <div className="flex justify-center py-2">
              <ButtonApp id={`${id}-reset-cta`} variant="primary" size="lg" rounded="md" onClick={() => window.open(resetUrl, "_self")}>
                {resetLabel}
              </ButtonApp>
            </div>
            <TextApp id={`${id}-fallback-url`} variant="micro" className="break-all text-center font-mono text-ink-muted">
              {resetUrl}
            </TextApp>
          </div>
        ) : (
          <div id={`${id}-otp-block`} className="flex flex-col items-center gap-3 rounded-[var(--radius-md)] border border-hairline-soft bg-surface-soft/50 py-6">
            <TextApp id={`${id}-otp-label`} variant="caption" className="text-ink-muted">
              Kode Verifikasi Anda
            </TextApp>
            <div className="flex gap-2">
              {otpCode.split("").map((digit, index) => (
                <span
                  key={index}
                  className="flex h-12 w-10 items-center justify-center rounded-[var(--radius-sm)] border border-hairline-hard bg-surface font-mono text-xl font-bold text-ink"
                >
                  {digit}
                </span>
              ))}
            </div>
          </div>
        )}

        <AlertApp id={`${id}-expiry-alert`} variant="warning" size="sm" rounded="md">
          <AlertIconApp id={`${id}-expiry-alert-icon`}>
            <ShieldAlert className="h-4 w-4" />
          </AlertIconApp>
          <AlertDescriptionApp id={`${id}-expiry-alert-desc`} className="mt-0">
            {variant === "standard"
              ? `Tautan ini akan kedaluwarsa dalam ${expiryMinutes} menit. Abaikan email ini jika Anda tidak meminta perubahan password.`
              : `Kode ini akan kedaluwarsa dalam ${expiryMinutes} menit. Jangan bagikan kode ini kepada siapa pun.`}
          </AlertDescriptionApp>
        </AlertApp>
      </div>

      <SeparatorApp id={`${id}-footer-separator`} orientation="horizontal" variant="soft" />

      <div id={`${id}-footer`} className="flex flex-col gap-1 px-6 py-5 text-center">
        <TextApp id={`${id}-footer-contact`} variant="micro" className="text-ink-muted">
          BPKAD Kota Yogyakarta · Jl. Kenari No. 56, Yogyakarta
        </TextApp>
        <TextApp id={`${id}-footer-security`} variant="micro" className="text-ink-muted">
          Demi keamanan, jangan teruskan email ini kepada pihak lain.
        </TextApp>
      </div>
    </CardApp>
  );
}
