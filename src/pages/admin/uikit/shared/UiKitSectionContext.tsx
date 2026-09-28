import * as React from "react";

/**
 * Konteks section aktif — dibaca `ShowcaseCard` untuk menurunkan id kanonik
 * `ui:<NN>/<component>/<variant>` (lihat `uiId.ts`) tanpa tiap DisplayModule
 * perlu tahu section-nya sendiri secara eksplisit.
 *
 * Di-provide sekali oleh `UiKitSectionPage.tsx`, yang memang satu-satunya
 * tempat yang sudah tahu `category.number` + `section.slug` untuk section
 * yang sedang dirender.
 */
export interface UiKitSectionContextValue {
  /** "01".."11" — UI_KIT_CATEGORIES[n].number */
  number: string;
  /** URL slug, mis. "data-tables-lists" */
  slug: string;
}

export const UiKitSectionContext = React.createContext<UiKitSectionContextValue | null>(null);

/** Kartu yang dirender di luar UiKitSectionPage (belum ada hari ini) sengaja mendapat `null` — bukan menebak. */
export function useUiKitSection(): UiKitSectionContextValue | null {
  return React.useContext(UiKitSectionContext);
}
