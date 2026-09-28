import * as React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardApp } from "../atoms/CardApp";
import { TextApp } from "../atoms/TextApp";
import { ButtonApp } from "../atoms/ButtonApp";
import { SeparatorApp } from "../atoms/SeparatorApp";
import { BadgeApp } from "../atoms/BadgeApp";
import { AvatarApp } from "../atoms/AvatarApp";

export type WelcomeEmailVariant = "onboarding" | "account-creation";

export interface WelcomeEmailAppProps {
  id: string;
  variant?: WelcomeEmailVariant;
  brandName?: string;
  recipientName?: string;
  title?: string;
  body?: React.ReactNode;
  highlights?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  footer?: React.ReactNode;
  className?: string;
}

const defaultTitle: Record<WelcomeEmailVariant, string> = {
  onboarding: "Selamat Datang di P4D BPKAD Kota Yogyakarta",
  "account-creation": "Akun Anda Berhasil Dibuat",
};

const defaultBody: Record<WelcomeEmailVariant, string> = {
  onboarding:
    "Terima kasih telah bergabung. Ikuti langkah-langkah berikut untuk mulai mengelola data pajak daerah Anda.",
  "account-creation":
    "Akun Anda pada sistem Pengelolaan Pajak Daerah Digital (P4D) telah aktif dan siap digunakan.",
};

const defaultHighlights: Record<WelcomeEmailVariant, string[]> = {
  onboarding: [
    "Lengkapi profil instansi & data wajib pajak",
    "Jelajahi dashboard analitik penerimaan daerah",
    "Atur preferensi notifikasi & keamanan akun",
  ],
  "account-creation": [
    "Email terverifikasi otomatis",
    "Akses penuh ke modul objek pajak",
    "Aktifkan verifikasi dua langkah untuk keamanan tambahan",
  ],
};

export function WelcomeEmailApp({
  id,
  variant = "onboarding",
  brandName = "P4D BPKAD Yogyakarta",
  recipientName = "Wajib Pajak",
  title,
  body,
  highlights,
  ctaLabel = "Masuk ke Dashboard",
  ctaHref = "#",
  footer,
  className,
}: WelcomeEmailAppProps) {
  const resolvedTitle = title ?? defaultTitle[variant];
  const resolvedBody = body ?? defaultBody[variant];
  const resolvedHighlights = highlights ?? defaultHighlights[variant];

  return (
    <CardApp
      id={id}
      variant="neutral"
      size="none"
      rounded="lg"
      className={cn("mx-auto w-full max-w-[600px] overflow-hidden p-0", className)}
    >
      <div id={`${id}-header`} className="flex items-center gap-3 border-b border-hairline-soft bg-surface-soft/60 px-6 py-5">
        <AvatarApp id={`${id}-brand-avatar`} name={brandName} variant="vibrant" shape="square" size="md" />
        <div className="min-w-0">
          <TextApp id={`${id}-brand-name`} variant="h6" className="truncate text-ink">
            {brandName}
          </TextApp>
          <BadgeApp id={`${id}-variant-badge`} variant="solidPurple" size="sm" className="mt-1">
            {variant === "onboarding" ? "Onboarding" : "Account Creation"}
          </BadgeApp>
        </div>
      </div>

      <div id={`${id}-body`} className="flex flex-col gap-4 px-6 py-6">
        <TextApp id={`${id}-greeting`} variant="body2" className="text-ink-secondary">
          Halo, {recipientName}
        </TextApp>
        <TextApp id={`${id}-title`} variant="h3" weight="bold" className="text-ink">
          {resolvedTitle}
        </TextApp>
        <TextApp id={`${id}-desc`} variant="body" className="text-ink-secondary leading-relaxed">
          {resolvedBody}
        </TextApp>

        <ul id={`${id}-highlights`} className="flex flex-col gap-2 rounded-[var(--radius-md)] border border-hairline-soft bg-surface-soft/50 p-4">
          {resolvedHighlights.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-ink">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div id={`${id}-cta-wrapper`} className="flex justify-center py-2">
          <ButtonApp
            id={`${id}-cta`}
            variant="primary"
            size="lg"
            rounded="md"
            leftIcon={<Sparkles className="h-4 w-4" />}
            onClick={() => window.open(ctaHref, "_self")}
          >
            {ctaLabel}
          </ButtonApp>
        </div>
      </div>

      <SeparatorApp id={`${id}-footer-separator`} orientation="horizontal" variant="soft" />

      <div id={`${id}-footer`} className="flex flex-col gap-1 px-6 py-5 text-center">
        {footer ?? (
          <>
            <TextApp id={`${id}-footer-contact`} variant="micro" className="text-ink-muted">
              BPKAD Kota Yogyakarta · Jl. Kenari No. 56, Yogyakarta
            </TextApp>
            <TextApp id={`${id}-footer-unsub`} variant="micro" className="text-ink-muted">
              Email ini dikirim otomatis. Berhenti berlangganan notifikasi kapan saja melalui pengaturan akun.
            </TextApp>
          </>
        )}
      </div>
    </CardApp>
  );
}
