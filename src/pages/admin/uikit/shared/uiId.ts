/**
 * Kontrak ID publik untuk UI Kit: `ui:<NN>/<component>/<variant>`.
 *
 * Ini adalah lapis TURUNAN di atas DOM id ShowcaseCard yang sudah ada
 * (`<component>-showcase-<variant>`, 293 instance, sudah 100% unik) — bukan
 * pengganti/rename. DOM id tetap jadi anchor hash & primary key internal;
 * `ui:` id adalah handle publik yang aman disalin ke AI karena mengandung
 * konteks section + component tanpa perlu lookup lain.
 *
 * Dipakai BERSAMA oleh runtime (ShowcaseCard, saat merender chip ID) dan
 * script build (`scripts/generate-uikit-manifest.ts`, saat menyusun
 * manifest) — satu fungsi murni, satu sumber kebenaran derivasi.
 *
 * Lihat rencana lengkap: bagian "Fase A — Kontrak ID" pada
 * .claude/plans/catatan-global-panduan-ui-lively-gadget.md (jika masih ada)
 * atau AGENTS.md § Copy-by-ID.
 */

/**
 * Peta prefix ad-hoc → nama komponen kanonik, untuk 32 outlier yang TIDAK
 * mengikuti pola `<component>-showcase-<variant>` (mis. id lama seperti
 * `advviz-heatmap`, `auth-flow-login`). Card id BARU wajib mengikuti pola
 * standar — lihat `validateNewCardId` — supaya tabel ini tidak membengkak
 * tanpa batas seiring pertumbuhan katalog.
 */
export const COMPONENT_ALIASES: Record<string, string> = {
  advviz: "advanced-visualization",
  commandpalette: "command-palette",
  scrollbar: "custom-scrollbar",
  "auth-flow": "auth-flow",
  a11y: "a11y",
};

export interface UiIdParts {
  number: string;
  component: string;
  variant: string;
}

/**
 * Ubah judul kartu (Bahasa Indonesia, boleh diedit kapan pun) jadi slug
 * kebab-case sederhana — dipakai generator untuk membuat ALIAS otomatis
 * (bukan id kanonik) supaya bentuk seperti
 * `ui:06/datatable/toolbar-search-filter-actions` (dari judul
 * "Toolbar Tabel: Search + Filter + Actions") tetap resolve ke kartu yang
 * kanoniknya `ui:06/datatable/advance-filter`.
 */
export function slugifyTitle(title: string): string {
  return title
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Pecah DOM id ShowcaseCard jadi { component, variant }, sebelum digabung
 * dengan nomor kategori. Tidak butuh section — itu didapat dari registry di
 * pemanggil (lihat `deriveUiId`).
 */
export function splitCardId(cardId: string, anchorId?: string): { component: string; variant: string } {
  const marker = "-showcase-";
  const markerIndex = cardId.indexOf(marker);
  if (markerIndex !== -1) {
    const prefix = cardId.slice(0, markerIndex);
    const variant = cardId.slice(markerIndex + marker.length);
    return { component: COMPONENT_ALIASES[prefix] ?? prefix, variant: variant || "default" };
  }

  // Tanpa "-showcase-": cocokkan prefix terpanjang di tabel alias (mis.
  // "advviz-marquee-vertical-reverse" -> prefix "advviz").
  const aliasKeys = Object.keys(COMPONENT_ALIASES).sort((a, b) => b.length - a.length);
  for (const key of aliasKeys) {
    if (cardId === key || cardId.startsWith(`${key}-`)) {
      const rest = cardId.slice(key.length).replace(/^-/, "");
      return { component: COMPONENT_ALIASES[key], variant: rest || "default" };
    }
  }

  // Fallback terakhir: pakai anchorId (selalu "demo-<kebab>") tanpa awalan.
  if (anchorId) {
    return { component: anchorId.replace(/^demo-/, ""), variant: cardId };
  }

  return { component: cardId, variant: "default" };
}

/** Susun id kanonik lengkap dari bagian-bagiannya. */
export function buildUiId(parts: UiIdParts): string {
  return `ui:${parts.number}/${parts.component}/${parts.variant}`;
}

/**
 * Turunkan id kanonik dari DOM id ShowcaseCard + konteks section.
 * `categoryNumber` datang dari `UI_KIT_CATEGORIES[n].number` (sudah "01".."11").
 */
export function deriveUiId(cardId: string, categoryNumber: string, anchorId?: string): string {
  const { component, variant } = splitCardId(cardId, anchorId);
  return buildUiId({ number: categoryNumber, component, variant });
}

const UI_ID_PATTERN = /^ui:(\d{2})\/([a-z0-9-]+)\/([a-z0-9-/]+)$/;

/** Parse `ui:NN/component/variant` kembali jadi bagian-bagiannya, atau null kalau tidak valid. */
export function parseUiId(uiId: string): UiIdParts | null {
  const match = UI_ID_PATTERN.exec(uiId.trim());
  if (!match) return null;
  const [, number, component, variant] = match;
  return { number, component, variant };
}

/** Pola yang WAJIB dipatuhi card id baru — outlier lama di-grandfather via COMPONENT_ALIASES. */
export const NEW_CARD_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*-showcase-[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * True kalau `cardId` mengikuti pola standar ATAU dikenal sebagai outlier
 * grandfathered (prefix-nya ada di COMPONENT_ALIASES). Dipakai checker
 * generator untuk menegakkan §A6 Kasus 2 tanpa mematikan 32 kartu lama.
 */
export function isKnownOrConformingCardId(cardId: string): boolean {
  if (NEW_CARD_ID_PATTERN.test(cardId)) return true;
  const aliasKeys = Object.keys(COMPONENT_ALIASES);
  return aliasKeys.some((key) => cardId === key || cardId.startsWith(`${key}-`));
}
