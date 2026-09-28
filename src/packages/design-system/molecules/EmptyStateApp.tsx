import * as React from "react";
import { Database, SearchX, ServerOff, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonApp } from "../atoms/ButtonApp";
import { TextApp } from "../atoms/TextApp";

export type EmptyStateVariant = "noData" | "noSearch" | "error" | "error404" | "noInternet";
export type EmptyStateSize = "sm" | "md" | "lg";

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

export interface EmptyStateAppProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  size?: EmptyStateSize;
}

const defaults: Record<EmptyStateVariant, { title: string; description: string; icon: React.ReactNode }> = {
  noData: { title: "Belum ada data", description: "Data akan muncul di sini setelah informasi pertama ditambahkan.", icon: <Database /> },
  noSearch: { title: "Hasil tidak ditemukan", description: "Coba ubah kata kunci atau bersihkan filter pencarian.", icon: <SearchX /> },
  error: { title: "Halaman tidak tersedia", description: "Terjadi kendala saat memuat halaman ini. Silakan coba kembali.", icon: <ServerOff /> },
  error404: { title: "404 · Halaman tidak ditemukan", description: "Alamat yang Anda buka tidak tersedia atau sudah dipindahkan.", icon: <ServerOff /> },
  noInternet: { title: "Tidak ada koneksi internet", description: "Periksa koneksi jaringan Anda lalu muat ulang halaman.", icon: <WifiOff /> },
};

const sizes: Record<EmptyStateSize, { wrapper: string; icon: string }> = {
  sm: { wrapper: "min-h-48 p-4", icon: "h-12 w-12 [&_svg]:h-6 [&_svg]:w-6" },
  md: { wrapper: "min-h-64 p-6", icon: "h-16 w-16 [&_svg]:h-8 [&_svg]:w-8" },
  lg: { wrapper: "min-h-80 p-8", icon: "h-20 w-20 [&_svg]:h-10 [&_svg]:w-10" },
};

export function EmptyStateApp({ id, variant = "noData", title, description, icon, action, secondaryAction, size = "md", className, ...props }: EmptyStateAppProps) {
  const preset = defaults[variant];
  return (
    <div id={id} data-ui-id={id} className={cn("flex flex-col items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-hairline bg-surface-soft text-center", sizes[size].wrapper, className)} {...props}>
      <div className={cn("mb-4 flex items-center justify-center rounded-full bg-vibrant-purple/10 text-vibrant-purple-dark", sizes[size].icon)}>{icon || preset.icon}</div>
      <TextApp id={`${id}-title`} variant="h4" weight="bold" className="text-ink">{title || preset.title}</TextApp>
      <TextApp id={`${id}-description`} variant="caption" className="mt-1.5 max-w-md text-ink-secondary">{description || preset.description}</TextApp>
      {(action || secondaryAction) && <div className="mt-5 flex flex-wrap justify-center gap-2">
        {secondaryAction && <ButtonApp id={`${id}-secondary-action`} variant="secondary" size="sm" leftIcon={secondaryAction.icon} onClick={secondaryAction.onClick}>{secondaryAction.label}</ButtonApp>}
        {action && <ButtonApp id={`${id}-primary-action`} variant="primary" size="sm" leftIcon={action.icon} onClick={action.onClick}>{action.label}</ButtonApp>}
      </div>}
    </div>
  );
}
