/**
 * Palet warna chart dashboard — satu sumber kebenaran.
 *
 * Sebelumnya tiap halaman menulis hex-nya sendiri (30+ nilai berbeda:
 * #7e22ce, #2563eb, #059669, #0d9488, #157c63, #f43f5e, #6366f1, dst),
 * sehingga chart yang secara konsep sama tampil beda warna antar halaman.
 * Semua chart & progress bar di halaman bisnis sekarang mengambil warna
 * dari sini.
 *
 * Urutan mengikuti urutan seri chart UI Kit (lihat kartu "Jenis Layanan
 * Terbanyak" di Dashboard Pelayanan sebagai acuan visual).
 *
 * Catatan: sengaja hex literal, bukan `var(--color-chart-N)`. Token
 * `--chart-2` bernilai #BFDBFE (pastel muda) yang terlalu pucat untuk
 * bar/line di atas surface putih — palet di bawah ini adalah warna yang
 * benar-benar dipakai & disetujui di UI Kit.
 */
export const CHART_COLORS = {
  purple: "#8b5cf6",
  blue: "#3b82f6",
  emerald: "#10b981",
  amber: "#f59e0b",
  cyan: "#06b6d4",
} as const;

/** Urutan default untuk seri/slice tanpa makna semantik khusus. */
export const CHART_SERIES_COLORS = [
  CHART_COLORS.purple,
  CHART_COLORS.blue,
  CHART_COLORS.emerald,
  CHART_COLORS.amber,
  CHART_COLORS.cyan,
] as const;

/**
 * Warna garis/bar "Target" — sengaja netral abu-abu, bukan warna palet.
 * Target adalah garis acuan (biasanya dashed), bukan kategori data, jadi
 * tidak boleh bersaing secara visual dengan seri realisasi.
 */
export const CHART_TARGET_COLOR = "#94a3b8";

/** Varian terang chart-1, dipakai kalau satu chart butuh > 5 kategori. */
export const CHART_COLOR_PURPLE_SOFT = "#a78bfa";

/**
 * Ramp sekuensial untuk heatmap kepadatan (Rendah -> Sangat Tinggi).
 *
 * Diturunkan dari `CHART_COLORS.blue` supaya heatmap satu keluarga warna
 * dengan chart lain, bukan skala Tailwind lepas (`bg-blue-100/300/500/800`)
 * yang kebetulan mirip. Dicampur ke `transparent` (bukan putih) supaya
 * tingkat rendah tetap terbaca di light maupun dark mode — surface kartu
 * yang menembus, bukan putih yang dipaksakan.
 */
export const HEATMAP_DENSITY_SCALE: Record<number, string> = {
  1: `color-mix(in srgb, ${CHART_COLORS.blue} 18%, transparent)`,
  2: `color-mix(in srgb, ${CHART_COLORS.blue} 45%, transparent)`,
  3: `color-mix(in srgb, ${CHART_COLORS.blue} 72%, transparent)`,
  4: CHART_COLORS.blue,
};
