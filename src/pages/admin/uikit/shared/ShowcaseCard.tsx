import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Code2, Copy, Hash } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonApp, TextApp } from "@/packages/design-system";
import { useUiKitSection } from "./UiKitSectionContext";
import { deriveUiId } from "./uiId";

export interface ShowcaseCardProps {
  /** Wajib — jadi anchor id per card komponen (navigasi via hash). */
  id: string;
  /** Caption di bawah area preview. */
  title: string;
  description?: string;
  /** Jika diisi: tombol copy + toggle "Lihat kode" muncul di footer. */
  code?: string;
  /** Posisi konten di area preview. */
  align?: "center" | "start";
  /** Tinggi minimum area preview (default cukup untuk komponen kecil). */
  previewClassName?: string;
  className?: string;
  children: React.ReactNode;
}

// Kartu showcase bergaya ReUI/shadcn: preview ber-border dengan konten di
// tengah, caption + aksi copy/"Lihat kode" di footer, dan blok kode collapsible.
// Satu-satunya gaya kode standar untuk seluruh katalog UI Kit (menggantikan
// duplikasi copy-code inline di tiap display module).
export function ShowcaseCard({
  id,
  title,
  description,
  code,
  align = "center",
  previewClassName,
  className,
  children,
}: ShowcaseCardProps) {
  const [codeCopied, setCodeCopied] = React.useState(false);
  const [idCopied, setIdCopied] = React.useState(false);
  const [codeOpen, setCodeOpen] = React.useState(false);
  const reducedMotion = useReducedMotion();
  const section = useUiKitSection();
  // null di luar UiKitSectionPage (belum ada pemakaian begitu hari ini) —
  // gagal diam-diam (chip disembunyikan) daripada memancarkan id yang salah.
  const uiId = section ? deriveUiId(id, section.number) : null;

  const copyCode = () => {
    if (!code) return;
    navigator.clipboard?.writeText(code);
    setCodeCopied(true);
    window.setTimeout(() => setCodeCopied(false), 2000);
  };

  const copyUiId = () => {
    if (!uiId) return;
    navigator.clipboard?.writeText(uiId);
    setIdCopied(true);
    window.setTimeout(() => setIdCopied(false), 2000);
  };

  return (
    <div
      id={id}
      data-ui-id={id}
      data-ui-kit-id={uiId ?? undefined}
      className={cn(
        "flex scroll-mt-24 flex-col overflow-hidden rounded-[16px] border border-hairline bg-surface shadow-2xs",
        className
      )}
    >
      {/* Preview area */}
      <div
        className={cn(
          "flex min-h-[140px] flex-1 bg-surface-soft/40 p-6",
          align === "center" ? "items-center justify-center" : "items-start justify-start",
          previewClassName
        )}
      >
        <div className={cn("w-full", align === "center" && "flex flex-wrap items-center justify-center gap-3")}>{children}</div>
      </div>

      {/* Footer: caption + chip ID + aksi — SELALU render, tidak lagi bergantung
          pada prop `code` (dulu 40 kartu tanpa `code` kehilangan footer sama
          sekali, termasuk kehilangan afordan Copy ID). */}
      {/* Dua baris, bukan satu: judul/deskripsi di atas, lalu chip ID + aksi.
          Sejak katalog memakai kartu atomik (satu UI per kartu) grid-nya rapat
          (cols 3-4), dan layout satu-baris lama menyisakan terlalu sedikit
          ruang untuk chip — id-nya terpotong jadi "ui:09/a…", padahal
          keterbacaan id itu justru inti dari katalog ini. Chip sekarang dapat
          barisnya sendiri dan hanya berbagi dengan tombol aksi. */}
      <div className="flex flex-col gap-2 border-t border-hairline-soft px-4 py-2.5">
        <div className="min-w-0">
          <TextApp id={`${id}-title`} variant="caption" weight="semibold" className="block line-clamp-2 text-ink">
            {title}
          </TextApp>
          {description && (
            <TextApp id={`${id}-desc`} variant="micro" className="block truncate text-ink-muted">
              {description}
            </TextApp>
          )}
        </div>
        {/* flex-wrap + min-w pada chip: di kartu lebar, chip dan tombol aksi
            berbagi satu baris; di kartu sempit (grid cols 3-4) chip tidak muat
            bersama tombol lalu turun ke barisnya sendiri dan memakai lebar
            penuh. Tanpa ini chip tersisa ~64px dari 246px yang dibutuhkan dan
            id-nya terpotong jadi tak terbaca. */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {uiId ? (
            <button
              type="button"
              id={`${id}-uiid-chip`}
              onClick={copyUiId}
              title={`Salin ID UI Kit — ${uiId}`}
              className="min-w-[11rem] flex-1 cursor-pointer break-all rounded-[4px] bg-vibrant-purple/10 px-1.5 py-0.5 text-left font-mono text-[10px] leading-snug text-vibrant-purple-dark transition-colors hover:bg-vibrant-purple/20"
            >
              {uiId}
            </button>
          ) : (
            <span className="min-w-[11rem] flex-1" />
          )}
          <div className="flex shrink-0 items-center gap-1">
          {uiId && (
            <ButtonApp
              id={`${id}-copy-uiid`}
              variant="icon"
              size="iconSm"
              rounded="md"
              onClick={copyUiId}
              aria-label="Salin ID UI Kit"
              title="Salin ID UI Kit"
            >
              {idCopied ? <Check className="h-3.5 w-3.5 text-success" /> : <Hash className="h-3.5 w-3.5" />}
            </ButtonApp>
          )}
          {code && (
            <>
              <ButtonApp
                id={`${id}-copy`}
                variant="icon"
                size="iconSm"
                rounded="md"
                onClick={copyCode}
                aria-label="Salin kode"
                title="Salin kode"
              >
                {codeCopied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
              </ButtonApp>
              <ButtonApp
                id={`${id}-view-code`}
                variant={codeOpen ? "secondary" : "ghost"}
                size="sm"
                rounded="md"
                leftIcon={<Code2 className="h-3.5 w-3.5" />}
                onClick={() => setCodeOpen((open) => !open)}
              >
                Lihat kode
              </ButtonApp>
            </>
          )}
          </div>
        </div>
      </div>

      {/* Collapsible code block — single standardized dark style */}
      <AnimatePresence initial={false}>
        {code && codeOpen && (
          <motion.div
            key="code"
            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-hairline-soft"
          >
            <pre className="max-h-[320px] overflow-auto bg-zinc-950 p-4 text-[11px] leading-relaxed text-zinc-100">
              <code>{code}</code>
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export interface ShowcaseGridProps {
  /** Jumlah kolom maksimum pada layar lebar (1-5); responsif turun otomatis. */
  cols?: 1 | 2 | 3 | 4 | 5;
  className?: string;
  children: React.ReactNode;
}

const colClasses: Record<NonNullable<ShowcaseGridProps["cols"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5",
};

export function ShowcaseGrid({ cols = 2, className, children }: ShowcaseGridProps) {
  return <div className={cn("grid gap-4", colClasses[cols], className)}>{children}</div>;
}

export interface ShowcaseGroupProps {
  /**
   * Anchor id grup. WAJIB berpola `<component>-group-<axis>`.
   *
   * Infiks `-group-` (BUKAN `-showcase-`) adalah kontraknya: id grup tidak
   * boleh pernah lolos NEW_CARD_ID_PATTERN, supaya (a) tidak bertabrakan
   * dengan anchor kartu, (b) tidak bertabrakan dengan id turunan yang
   * dipancarkan ShowcaseCard (`${cardId}-title`, `${cardId}-desc`), dan
   * (c) tidak pernah tampak seperti id yang bisa di-resolve lewat manifest
   * padahal generator tidak pernah melihatnya.
   */
  id: string;
  /** Nama sumbu prop yang dienumerasi grup ini, mis. "Variant" / "Ukuran". */
  title: string;
  /** Opsional — di sinilah daftar nilai "a · b · c" hidup, bukan di kartu. */
  description?: string;
  /** Diteruskan ke ShowcaseGrid. Default 4 — kartu atomik itu kecil. */
  cols?: ShowcaseGridProps["cols"];
  className?: string;
  gridClassName?: string;
  children: React.ReactNode;
}

/**
 * Pengelompokan visual untuk kartu-kartu atomik di dalam satu ModuleCard —
 * satu grup = satu sumbu prop (variant / size / rounded / ...).
 *
 * SENGAJA tidak merender ShowcaseCard apa pun: generator manifest hanya
 * mencocokkan `tagName === "ShowcaseCard"` (scripts/generate-uikit-manifest.ts),
 * jadi komponen ini tidak menambah satu pun entry manifest.
 *
 * Hierarki heading halaman: h2 (judul seksi) → h3 (ModuleCard) → h4 (grup ini).
 * Elemennya h4 demi semantik, tapi varian visualnya h6 (small caps) supaya
 * jadi eyebrow yang tenang dan tidak menyaingi judul modul di atasnya.
 */
export function ShowcaseGroup({
  id,
  title,
  description,
  cols = 4,
  className,
  gridClassName,
  children,
}: ShowcaseGroupProps) {
  return (
    <section id={id} data-ui-group-id={id} className={cn("flex scroll-mt-24 flex-col gap-3", className)}>
      <div className="flex flex-col gap-0.5 border-b border-hairline-soft pb-2">
        <TextApp id={`${id}-title`} as="h4" variant="h6" className="text-ink-secondary">
          {title}
        </TextApp>
        {description && (
          <TextApp id={`${id}-desc`} variant="micro" className="block text-ink-muted">
            {description}
          </TextApp>
        )}
      </div>
      <ShowcaseGrid cols={cols} className={gridClassName}>
        {children}
      </ShowcaseGrid>
    </section>
  );
}
