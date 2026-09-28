import * as React from "react";
import { cn } from "@/lib/utils";
import { TextApp } from "../atoms/TextApp";
import { AutoLoopListApp } from "./AutoLoopListApp";

/**
 * Satu segmen bar. Satu segmen = bar progres biasa; dua segmen atau lebih =
 * bar bertumpuk (mis. Valid vs Kritis) yang totalnya membentuk 100%.
 */
export interface ProgressListSegment {
  percent: number;
  color: string;
  /** Dipakai sebagai `title` segmen supaya komposisinya terbaca saat hover. */
  label?: string;
}

export interface ProgressListItem {
  id: string;
  label: string;
  /** Baris kedua di bawah label — peran petugas, kelurahan, dsb. */
  secondaryLabel?: string;
  /** Avatar, ikon lokasi, atau apa pun yang mengawali baris. */
  leading?: React.ReactNode;
  /** Nilai yang sudah diformat: "142,5 Ha", "450 WP", "35%". */
  value: React.ReactNode;
  /**
   * Kosongkan (atau `[]`) bila baris hanya perlu label + nilai + badge tanpa
   * bar — mis. daftar tanggungan petugas yang jumlahnya sudah cukup dibaca
   * dari badge-nya sendiri.
   */
  segments?: ProgressListSegment[];
  /** Penanda status di sisi kanan — BadgeApp "OVERLOAD", kategori isu, dsb. */
  badge?: React.ReactNode;
  /** Baris aksi yang muncul saat hover. Butuh `onClick` supaya bermakna. */
  meta?: React.ReactNode;
  onClick?: () => void;
}

export interface ProgressListAppProps {
  id: string;
  items: ProgressListItem[];
  /**
   * Tinggi viewport (px). Kalau diisi dan konten melebihinya, daftar
   * auto-loop lewat `AutoLoopListApp` — pola yang sama dengan
   * `ScorecardApp.breakdown`, jadi tidak ada scrollbar yang muncul.
   */
  maxHeight?: number;
  /** Jarak antar baris lebih rapat, untuk daftar panjang. */
  dense?: boolean;
  /** Baris yang sedang disorot — dipakai saat daftar disinkronkan dengan peta. */
  activeId?: string;
  className?: string;
}

function ProgressListRow({
  item,
  dense,
  isActive,
  rowId,
}: {
  item: ProgressListItem;
  dense?: boolean;
  isActive?: boolean;
  rowId: string;
}) {
  const isInteractive = Boolean(item.onClick);
  const Wrapper = isInteractive ? "button" : "div";
  const hasBar = Boolean(item.segments && item.segments.length > 0);

  return (
    <Wrapper
      id={rowId}
      {...(isInteractive ? { type: "button" as const, onClick: item.onClick } : {})}
      className={cn(
        "group block w-full rounded-lg text-left transition-all select-none",
        dense ? "px-2 py-1.5" : "px-2 py-2.5",
        isInteractive && "hover:bg-surface-subtle active:scale-[0.99] cursor-pointer",
        isActive && "bg-vibrant-purple/15 border-l-4 border-vibrant-purple text-vibrant-purple-dark font-semibold pl-3 shadow-2xs",
      )}
    >
      {/* items-start: ikon/avatar sejajar dengan baris label pertama, bukan
          ter-center terhadap seluruh tinggi baris — kalau tidak, ikon tampak
          melayang begitu ada sublabel atau bar di bawahnya. */}
      <div className="flex items-start gap-3">
        {item.leading && <span className="flex shrink-0 items-center pt-0.5">{item.leading}</span>}

        <div className="min-w-0 flex-1">
          <div className={cn("flex items-baseline justify-between gap-2", hasBar && "mb-1.5")}>
            <div className="min-w-0">
              <TextApp id={`${rowId}-label`} variant="caption" weight="bold" className="block truncate text-ink">
                {item.label}
              </TextApp>
              {item.secondaryLabel && (
                <TextApp id={`${rowId}-secondary`} variant="caption" className="block truncate text-[11px] text-ink-secondary">
                  {item.secondaryLabel}
                </TextApp>
              )}
            </div>

            <span className="flex shrink-0 items-center gap-2">
              {item.badge}
              <TextApp id={`${rowId}-value`} variant="caption" weight="bold" className="whitespace-nowrap font-mono text-ink">
                {item.value}
              </TextApp>
            </span>
          </div>

          {/* Track kontras rendah pada surface putih maupun gelap — sama dengan
              track ScorecardApp supaya bar tetap terbaca di kedua tema. */}
          {hasBar && (
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/15">
              {item.segments!.map((segment, idx) => (
                <div
                  key={`${rowId}-seg-${idx}`}
                  title={segment.label}
                  className="h-full first:rounded-l-full last:rounded-r-full"
                  style={{
                    width: `${Math.max(0, Math.min(100, segment.percent))}%`,
                    backgroundColor: segment.color,
                  }}
                />
              ))}
            </div>
          )}

          {/* Baris aksi benar-benar tidak memakan ruang sampai di-hover.
              `opacity-0` saja menyisakan tingginya, dan itu yang membuat
              daftar tampak renggang & terputus-putus. Grid 0fr -> 1fr
              mengatupkan tingginya sekaligus tetap beranimasi halus. */}
          {item.meta && (
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <div className="pt-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {item.meta}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

/**
 * Daftar baris "entitas + bar progres + penanda status".
 *
 * Dibuat karena pola ini muncul berulang di dashboard — beban kerja petugas,
 * komposisi jenis layanan, peringkat wilayah, kesehatan data per sektor — dan
 * tiap kemunculan butuh kombinasi leading/badge/aksi yang tidak bisa dipenuhi
 * `ScorecardApp.breakdown` (terkunci di footer scorecard, tanpa slot leading)
 * maupun `ChartApp` bar horizontal (tidak bisa membawa avatar & badge).
 */
export function ProgressListApp({
  id,
  items,
  maxHeight,
  dense,
  activeId,
  className,
}: ProgressListAppProps) {
  const renderRows = (suffix = "") => (
    <div className={cn("flex flex-col", dense ? "gap-0.5" : "gap-1")}>
      {items.map((item) => (
        <ProgressListRow
          key={`${item.id}${suffix}`}
          rowId={`${id}-row-${item.id}${suffix}`}
          item={item}
          dense={dense}
          isActive={activeId === item.id}
        />
      ))}
    </div>
  );

  if (maxHeight) {
    return (
      <div id={id} className={className}>
        <AutoLoopListApp id={`${id}-loop`} maxHeight={maxHeight} pauseOnHover>
          {(suffix) => renderRows(suffix)}
        </AutoLoopListApp>
      </div>
    );
  }

  return (
    <div id={id} className={className}>
      {renderRows()}
    </div>
  );
}
