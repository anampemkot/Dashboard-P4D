/**
 * `FoundationsDisplayModule.tsx` (141 KB) tidak punya satu pun `ShowcaseCard`
 * — ia adalah dokumentasi TOKEN (warna, tipografi, spacing, dst.), bukan UI
 * yang bisa disalin sebagai JSX. AI yang butuh "pakai warna brand" perlu
 * ditunjukkan token CSS-nya, bukan diberi cuplikan markup.
 *
 * Daripada memaksa 2285 baris itu dipecah jadi ShowcaseCard (nol manfaat,
 * risiko regresi besar), tabel manual 7 baris ini di-merge langsung oleh
 * `scripts/generate-uikit-manifest.ts` ke manifest sebagai entry
 * `ui:01/foundations/<tab>`. Baris ini bukan `<ShowcaseCard>` — makanya
 * tidak lewat AST scan seperti kartu lain, dan sengaja tanpa `code`; agent
 * diarahkan ke `tokensRef` sebagai gantinya.
 *
 * Tab id di sini SAMA dengan `activeTab` di FoundationsDisplayModule.tsx —
 * kalau tab itu di-rename di sana, sinkronkan juga di sini.
 */

export interface FoundationsIdEntry {
  /** Segmen variant di ui:01/foundations/<variant> — sama dengan id tab FoundationsDisplayModule. */
  variant: string;
  title: string;
  description: string;
  /** File token yang jadi rujukan (bukan potongan JSX yang bisa disalin). */
  tokensRef: string[];
}

export const FOUNDATIONS_IDS: FoundationsIdEntry[] = [
  {
    variant: "color",
    title: "Color System",
    description: "Primary & secondary, semantic (success/warning/error/info), grayscale/neutral, token light vs dark mode.",
    tokensRef: ["src/packages/css/theme.css"],
  },
  {
    variant: "typography",
    title: "Typography",
    description: "Font family (sans/display/mono), skala ukuran H1-H6 & body, weight, line-height, letter-spacing.",
    tokensRef: ["src/packages/css/theme.css"],
  },
  {
    variant: "spacing",
    title: "Spacing & Grid",
    description: "Skala spacing kelipatan 4px/8px, grid 12-kolom desktop / 4-kolom mobile, breakpoints.",
    tokensRef: ["src/packages/css/theme.css", "src/packages/design-system/atoms/GridApp.tsx"],
  },
  {
    variant: "elevation",
    title: "Elevation & Shadows",
    description: "Level 1 (card), level 2 (dropdown/popover), level 3 (modal/FAB/tooltip), warna & opacity shadow.",
    tokensRef: ["src/packages/css/theme.css"],
  },
  {
    variant: "radius",
    title: "Border Radius",
    description: "Skala Foundation: none=0, sm=4px (input/button kecil), md=8px (card), lg=16px (modal), pill/full.",
    tokensRef: ["src/packages/css/theme.css"],
  },
  {
    variant: "iconography",
    title: "Iconography",
    description: "Ukuran standar 16/20/24/32px, stroke width 1.5/1.75/2px, gaya sudut rounded vs sharp.",
    tokensRef: ["src/packages/design-system/tokens"],
  },
  {
    variant: "motion",
    title: "Motion & Animation",
    description: "Durasi fast(100ms)/normal(200ms)/slow(300ms), easing curve, kecepatan spinner & shimmer skeleton.",
    tokensRef: ["src/packages/css/theme.css", "src/packages/design-system/tokens/focusRing.ts"],
  },
];
