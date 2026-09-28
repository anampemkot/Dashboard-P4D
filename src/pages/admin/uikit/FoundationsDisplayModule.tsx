import * as React from "react";
import { TextApp, BadgeApp, ButtonApp, GridApp, ColApp, ContainerApp, SPACING_SCALE, BREAKPOINTS } from "@/packages/design-system";
import {
  Palette,
  Type,
  Grid,
  Layers,
  Square,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  ShieldAlert,
  RefreshCw,
  Sun,
  Moon,
  Loader2,
  Bell,
  Check,
  Eye,
  Building2,
  FileText,
  Search,
  Filter,
  Download,
  Plus,
  Trash2,
  Settings,
  ChevronRight,
  ArrowUpRight,
  Sliders,
  Play,
} from "lucide-react";

export function FoundationsDisplayModule() {
  const [activeTab, setActiveTab] = React.useState<
    "color" | "typography" | "spacing" | "elevation" | "radius" | "iconography" | "motion"
  >("color");

  const [colorModeFilter, setColorModeFilter] = React.useState<"all" | "light" | "dark">("all");
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [motionSpeed, setMotionSpeed] = React.useState<"fast" | "standard" | "slow">("standard");

  const triggerMotionTest = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Sub-Navigation Tabs for 7 Pillars */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-hairline-soft scrollbar-none">
        {[
          { id: "color", label: "01. Color System", icon: <Palette className="w-3.5 h-3.5" /> },
          { id: "typography", label: "02. Typography", icon: <Type className="w-3.5 h-3.5" /> },
          { id: "spacing", label: "03. Spacing & Grid", icon: <Grid className="w-3.5 h-3.5" /> },
          { id: "elevation", label: "04. Elevation & Shadows", icon: <Layers className="w-3.5 h-3.5" /> },
          { id: "radius", label: "05. Border Radius", icon: <Square className="w-3.5 h-3.5" /> },
          { id: "iconography", label: "06. Iconography", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { id: "motion", label: "07. Motion & Animation", icon: <Zap className="w-3.5 h-3.5" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-vibrant-purple-dark text-white shadow-2xs font-bold"
                : "bg-surface-soft text-ink-secondary hover:text-ink hover:bg-surface border border-hairline-soft"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* 01. COLOR SYSTEM */}
      {activeTab === "color" && (
        <div className="flex flex-col gap-8">
          {/* Header & Mode Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <TextApp id="found-color-title" variant="h3" className="font-bold text-ink">
                01. Color System & Design Tokens (Theme.css Complete Matrix)
              </TextApp>
              <TextApp id="found-color-desc" variant="body" className="text-xs text-ink-secondary">
                Seluruh token warna resmi P4D BPKAD Kota Yogyakarta dalam mode Terang (Light) dan Gelap (Dark), mencakup Surface, Ink, Vibrant Accent, Semantic Feedback, & Block Cards.
              </TextApp>
            </div>

            <div className="flex items-center gap-1 bg-surface-soft p-1 rounded-xl border border-hairline-soft shrink-0">
              <button
                type="button"
                onClick={() => setColorModeFilter("all")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  colorModeFilter === "all" ? "bg-surface text-ink shadow-2xs font-bold" : "text-ink-secondary hover:text-ink"
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> Semua Token
              </button>
              <button
                type="button"
                onClick={() => setColorModeFilter("light")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  colorModeFilter === "light" ? "bg-amber-500 text-white shadow-2xs font-bold" : "text-ink-secondary hover:text-ink"
                }`}
              >
                <Sun className="w-3.5 h-3.5" /> Light Mode
              </button>
              <button
                type="button"
                onClick={() => setColorModeFilter("dark")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  colorModeFilter === "dark" ? "bg-slate-900 text-white shadow-2xs font-bold" : "text-ink-secondary hover:text-ink"
                }`}
              >
                <Moon className="w-3.5 h-3.5" /> Dark Mode
              </button>
            </div>
          </div>

          {/* SECTION A: Core Brand, Surface & Canvas Tokens */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
                • A. Core Surface, Canvas & Ink Tokens
              </span>
              <BadgeApp id="badge-surface-count" variant="solidPurple" size="sm">6 Tokens</BadgeApp>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SurfaceTokenCard
                name="Surface Canvas (--color-bg-surface)"
                classUse="bg-surface text-ink border border-hairline"
                lightValue="#FFFFFF (hsl 0 0% 100%)"
                darkValue="#0D0D0D (hsl 0 0% 5%)"
                desc="Latar belakang dasar halaman utama & kartu utama."
                modeFilter={colorModeFilter}
              />
              <SurfaceTokenCard
                name="Surface Soft (--color-bg-surface-soft)"
                classUse="bg-surface-soft text-ink border border-hairline-soft"
                lightValue="#F5F5F5 (hsl 0 0% 96%)"
                darkValue="#161616 (hsl 0 0% 8.6%)"
                desc="Latar belakang sekunder untuk kontainer input & sub-card."
                modeFilter={colorModeFilter}
              />
              <SurfaceTokenCard
                name="Brand Primary (--color-bg-brand)"
                classUse="bg-brand text-white"
                lightValue="#000000 (Black)"
                darkValue="#FFFFFF (White)"
                desc="Warna tombol utama & aksen brand kontras tinggi."
                modeFilter={colorModeFilter}
              />
              <SurfaceTokenCard
                name="Text Primary / Ink (--color-text-primary)"
                classUse="bg-surface text-ink border border-hairline font-bold"
                lightValue="#000000 (100% Ink)"
                darkValue="#FFFFFF (100% White)"
                desc="Warna judul H1-H6, teks tombol utama, & label aktif."
                modeFilter={colorModeFilter}
              />
              <SurfaceTokenCard
                name="Text Secondary (--color-text-secondary)"
                classUse="bg-surface text-ink-secondary border border-hairline"
                lightValue="color-mix(65% ink)"
                darkValue="color-mix(65% white)"
                desc="Teks deskripsi, label formulir, & instruksi."
                modeFilter={colorModeFilter}
              />
              <SurfaceTokenCard
                name="Text Muted (--color-text-muted)"
                classUse="bg-surface text-ink-muted border border-hairline"
                lightValue="color-mix(40% ink)"
                darkValue="color-mix(40% white)"
                desc="Timestamp, placeholder input, & teks catatan kaki."
                modeFilter={colorModeFilter}
              />
            </div>
          </div>

          {/* SECTION B: Vibrant Interactive Palette */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                • B. Vibrant Interactive Palette & Ink Pairings
              </span>
              <BadgeApp id="badge-vibrant-count" variant="accent" size="sm">5 Color Families</BadgeApp>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              {/* Purple */}
              <div className="p-3.5 bg-surface border border-hairline rounded-2xl flex flex-col gap-3 shadow-2xs">
                <div className="w-full h-14 rounded-xl bg-vibrant-purple text-vibrant-purple-ink font-bold text-xs flex flex-col items-center justify-center border border-black/10">
                  <span>Vibrant Purple</span>
                  <span className="text-[10px] font-mono opacity-90">--color-vibrant-purple</span>
                </div>
                <div className="flex flex-col gap-1 text-[11px]">
                  <span className="font-bold text-ink">Ink Pair:</span>
                  <span className="font-mono text-[10px] text-ink-secondary">Light: #3C1A78 | Dark: #EDE9FE</span>
                  <span className="font-mono text-[10px] text-ink-muted">HEX: #A78BFA</span>
                </div>
              </div>

              {/* Purple Dark */}
              <div className="p-3.5 bg-surface border border-hairline rounded-2xl flex flex-col gap-3 shadow-2xs">
                <div className="w-full h-14 rounded-xl bg-vibrant-purple-dark text-white font-bold text-xs flex flex-col items-center justify-center border border-black/10">
                  <span>Purple Dark</span>
                  <span className="text-[10px] font-mono opacity-90">--color-vibrant-purple-dark</span>
                </div>
                <div className="flex flex-col gap-1 text-[11px]">
                  <span className="font-bold text-ink">Ink Pair:</span>
                  <span className="font-mono text-[10px] text-ink-secondary">Light: #FFFFFF | Dark: #FFFFFF</span>
                  <span className="font-mono text-[10px] text-ink-muted">HEX: #8B5CF6</span>
                </div>
              </div>

              {/* Yellow */}
              <div className="p-3.5 bg-surface border border-hairline rounded-2xl flex flex-col gap-3 shadow-2xs">
                <div className="w-full h-14 rounded-xl bg-vibrant-yellow text-vibrant-yellow-ink font-bold text-xs flex flex-col items-center justify-center border border-black/10">
                  <span>Vibrant Yellow</span>
                  <span className="text-[10px] font-mono opacity-90">--color-vibrant-yellow</span>
                </div>
                <div className="flex flex-col gap-1 text-[11px]">
                  <span className="font-bold text-ink">Ink Pair:</span>
                  <span className="font-mono text-[10px] text-ink-secondary">Light: #5C4300 | Dark: #FEF08A</span>
                  <span className="font-mono text-[10px] text-ink-muted">HEX: #FBBF24</span>
                </div>
              </div>

              {/* Blue */}
              <div className="p-3.5 bg-surface border border-hairline rounded-2xl flex flex-col gap-3 shadow-2xs">
                <div className="w-full h-14 rounded-xl bg-vibrant-blue text-vibrant-blue-ink font-bold text-xs flex flex-col items-center justify-center border border-black/10">
                  <span>Vibrant Blue</span>
                  <span className="text-[10px] font-mono opacity-90">--color-vibrant-blue</span>
                </div>
                <div className="flex flex-col gap-1 text-[11px]">
                  <span className="font-bold text-ink">Ink Pair:</span>
                  <span className="font-mono text-[10px] text-ink-secondary">Light: #1E3A8A | Dark: #DBEAFE</span>
                  <span className="font-mono text-[10px] text-ink-muted">HEX: #BFDBFE</span>
                </div>
              </div>

              {/* Grey BG/Outer */}
              <div className="p-3.5 bg-surface border border-hairline rounded-2xl flex flex-col gap-3 shadow-2xs">
                <div className="w-full h-14 rounded-xl bg-vibrant-grey-bg text-ink font-bold text-xs flex flex-col items-center justify-center border border-hairline">
                  <span>Vibrant Grey</span>
                  <span className="text-[10px] font-mono text-ink-secondary">--color-vibrant-grey-bg</span>
                </div>
                <div className="flex flex-col gap-1 text-[11px]">
                  <span className="font-bold text-ink">Ink Pair:</span>
                  <span className="font-mono text-[10px] text-ink-secondary">Light: #F5F5F5 | Dark: #161616</span>
                  <span className="font-mono text-[10px] text-ink-muted">Outer: #E5E5E5 / #202020</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION C: Semantic Feedback Colors */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • C. Semantic Feedback Tokens (--color-text-*)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col gap-3">
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Success Token</span>
                  <span className="font-mono text-[10px]">#1EA64A</span>
                </div>
                <div className="w-full h-10 rounded-xl bg-emerald-500 text-white font-mono text-xs flex items-center justify-center font-bold shadow-xs">
                  --color-text-success
                </div>
                <span className="text-xs text-ink-secondary">
                  Digunakan untuk status lunas PBB-P2, verifikasi berhasil, & indikator pemasukan positif.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col gap-3">
                <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 font-bold text-xs">
                  <span className="flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Warning Token</span>
                  <span className="font-mono text-[10px]">#B45309</span>
                </div>
                <div className="w-full h-10 rounded-xl bg-amber-500 text-white font-mono text-xs flex items-center justify-center font-bold shadow-xs">
                  --color-text-warning
                </div>
                <span className="text-xs text-ink-secondary">
                  Digunakan untuk pemberitahuan jatuh tempo pajak, verifikasi tertunda, & konfirmasi data.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex flex-col gap-3">
                <div className="flex items-center justify-between text-rose-600 dark:text-rose-400 font-bold text-xs">
                  <span className="flex items-center gap-1.5"><XCircle className="w-4 h-4" /> Error / Danger</span>
                  <span className="font-mono text-[10px]">#D32F2F</span>
                </div>
                <div className="w-full h-10 rounded-xl bg-rose-500 text-white font-mono text-xs flex items-center justify-center font-bold shadow-xs">
                  --color-text-error
                </div>
                <span className="text-xs text-ink-secondary">
                  Digunakan untuk tunggakan pajak, kegagalan validasi, & pembatalan transaksi BPKAD.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex flex-col gap-3">
                <div className="flex items-center justify-between text-sky-600 dark:text-sky-400 font-bold text-xs">
                  <span className="flex items-center gap-1.5"><Info className="w-4 h-4" /> Info Token</span>
                  <span className="font-mono text-[10px]">#0284C7</span>
                </div>
                <div className="w-full h-10 rounded-xl bg-sky-500 text-white font-mono text-xs flex items-center justify-center font-bold shadow-xs">
                  --color-text-info
                </div>
                <span className="text-xs text-ink-secondary">
                  Digunakan untuk petunjuk regulasi Perda, panduan NOP, & info umum sistem.
                </span>
              </div>
            </div>
          </div>

          {/* SECTION D: Block Accent Cards (7 Distinct Colors) */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                • D. Block Accent Tokens (KPI & Category Dashboard Cards)
              </span>
              <BadgeApp id="badge-block-count" variant="solidPurple" size="sm">7 Variants (Light vs Dark Adaptive)</BadgeApp>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              <BlockColorCard
                name="Block Lime"
                bgClass="bg-block-lime text-black border-block-lime-border"
                lightBg="#d9f99d"
                lightBorder="#bef264"
                darkBg="#1a2e05"
                darkBorder="#2e4a0a"
                varName="--color-block-lime"
                modeFilter={colorModeFilter}
              />
              <BlockColorCard
                name="Block Lilac"
                bgClass="bg-block-lilac text-black dark:text-white border-block-lilac-border"
                lightBg="#e9d5ff"
                lightBorder="#d8b4fe"
                darkBg="#2e1065"
                darkBorder="#4c1d95"
                varName="--color-block-lilac"
                modeFilter={colorModeFilter}
              />
              <BlockColorCard
                name="Block Cream"
                bgClass="bg-block-cream text-black dark:text-white border-block-cream-border"
                lightBg="#fef08a"
                lightBorder="#fde047"
                darkBg="#422006"
                darkBorder="#713f12"
                varName="--color-block-cream"
                modeFilter={colorModeFilter}
              />
              <BlockColorCard
                name="Block Pink"
                bgClass="bg-block-pink text-black dark:text-white border-block-pink-border"
                lightBg="#fbcfe8"
                lightBorder="#f472b6"
                darkBg="#500724"
                darkBorder="#831843"
                varName="--color-block-pink"
                modeFilter={colorModeFilter}
              />
              <BlockColorCard
                name="Block Mint"
                bgClass="bg-block-mint text-black dark:text-white border-block-mint-border"
                lightBg="#a7f3d0"
                lightBorder="#6ee7b7"
                darkBg="#022c22"
                darkBorder="#064e3b"
                varName="--color-block-mint"
                modeFilter={colorModeFilter}
              />
              <BlockColorCard
                name="Block Coral"
                bgClass="bg-block-coral text-black dark:text-white border-block-coral-border"
                lightBg="#fecdd3"
                lightBorder="#fda4af"
                darkBg="#4c0519"
                darkBorder="#881337"
                varName="--color-block-coral"
                modeFilter={colorModeFilter}
              />
              <BlockColorCard
                name="Block Navy"
                bgClass="bg-block-navy text-white border-block-navy-border"
                lightBg="#1e293b"
                lightBorder="#334155"
                darkBg="#0f172a"
                darkBorder="#1e293b"
                varName="--color-block-navy"
                modeFilter={colorModeFilter}
              />
            </div>
          </div>

          {/* SECTION E: Detailed Token Comparison Matrix */}
          <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • E. Tabel Matriks Lengkap Variabel CSS theme.css (Light vs Dark)
            </span>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-hairline bg-surface-soft text-ink">
                    <th className="py-2.5 px-3 font-bold">Kategori Token</th>
                    <th className="py-2.5 px-3 font-bold font-mono">Nama Variabel CSS</th>
                    <th className="py-2.5 px-3 font-bold text-amber-600 dark:text-amber-400">
                      <span className="flex items-center gap-1"><Sun className="w-3.5 h-3.5" /> Light Mode Value</span>
                    </th>
                    <th className="py-2.5 px-3 font-bold text-purple-400">
                      <span className="flex items-center gap-1"><Moon className="w-3.5 h-3.5" /> Dark Mode Override</span>
                    </th>
                    <th className="py-2.5 px-3 font-bold">Class Tailwind</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline-soft font-mono text-[11px] text-ink-secondary">
                  <tr>
                    <td className="py-2 px-3 font-sans font-semibold text-ink">Canvas / Background</td>
                    <td className="py-2 px-3 text-vibrant-purple-dark font-bold">--color-bg-surface</td>
                    <td className="py-2 px-3">#FFFFFF (hsl 0 0% 100%)</td>
                    <td className="py-2 px-3">#0D0D0D (hsl 0 0% 5%)</td>
                    <td className="py-2 px-3 font-sans text-xs"><code className="bg-surface-soft px-1 rounded border border-hairline">bg-surface</code></td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-semibold text-ink">Surface Soft</td>
                    <td className="py-2 px-3 text-vibrant-purple-dark font-bold">--color-bg-surface-soft</td>
                    <td className="py-2 px-3">#F5F5F5 (hsl 0 0% 96%)</td>
                    <td className="py-2 px-3">#161616 (hsl 0 0% 8.6%)</td>
                    <td className="py-2 px-3 font-sans text-xs"><code className="bg-surface-soft px-1 rounded border border-hairline">bg-surface-soft</code></td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-semibold text-ink">Brand Primary</td>
                    <td className="py-2 px-3 text-vibrant-purple-dark font-bold">--color-bg-brand</td>
                    <td className="py-2 px-3">#000000 (Black)</td>
                    <td className="py-2 px-3">#FFFFFF (White)</td>
                    <td className="py-2 px-3 font-sans text-xs"><code className="bg-surface-soft px-1 rounded border border-hairline">bg-brand</code></td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-semibold text-ink">Text Primary</td>
                    <td className="py-2 px-3 text-vibrant-purple-dark font-bold">--color-text-primary</td>
                    <td className="py-2 px-3">#000000 (var(--palette-ink))</td>
                    <td className="py-2 px-3">#FFFFFF (var(--palette-ink))</td>
                    <td className="py-2 px-3 font-sans text-xs"><code className="bg-surface-soft px-1 rounded border border-hairline">text-ink</code></td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-semibold text-ink">Text Secondary</td>
                    <td className="py-2 px-3 text-vibrant-purple-dark font-bold">--color-text-secondary</td>
                    <td className="py-2 px-3">color-mix(65% ink)</td>
                    <td className="py-2 px-3">color-mix(65% white)</td>
                    <td className="py-2 px-3 font-sans text-xs"><code className="bg-surface-soft px-1 rounded border border-hairline">text-ink-secondary</code></td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-semibold text-ink">Border Hairline</td>
                    <td className="py-2 px-3 text-vibrant-purple-dark font-bold">--color-border-hairline</td>
                    <td className="py-2 px-3">#E6E6E6 (hsl 0 0% 90%)</td>
                    <td className="py-2 px-3">color-mix(14% white)</td>
                    <td className="py-2 px-3 font-sans text-xs"><code className="bg-surface-soft px-1 rounded border border-hairline">border-hairline</code></td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-semibold text-ink">Border Hairline Soft</td>
                    <td className="py-2 px-3 text-vibrant-purple-dark font-bold">--color-border-hairline-soft</td>
                    <td className="py-2 px-3">#F0F0F0 (hsl 0 0% 94%)</td>
                    <td className="py-2 px-3">color-mix(8% white)</td>
                    <td className="py-2 px-3 font-sans text-xs"><code className="bg-surface-soft px-1 rounded border border-hairline">border-hairline-soft</code></td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-semibold text-ink">Vibrant Purple Ink</td>
                    <td className="py-2 px-3 text-vibrant-purple-dark font-bold">--color-vibrant-purple-ink</td>
                    <td className="py-2 px-3">#3C1A78 (Purple Dark Ink)</td>
                    <td className="py-2 px-3">#EDE9FE (Purple Light Ink)</td>
                    <td className="py-2 px-3 font-sans text-xs"><code className="bg-surface-soft px-1 rounded border border-hairline">text-vibrant-purple-ink</code></td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-semibold text-ink">Vibrant Yellow Ink</td>
                    <td className="py-2 px-3 text-vibrant-purple-dark font-bold">--color-vibrant-yellow-ink</td>
                    <td className="py-2 px-3">#5C4300 (Brownish Ink)</td>
                    <td className="py-2 px-3">#FEF08A (Yellow Light Ink)</td>
                    <td className="py-2 px-3 font-sans text-xs"><code className="bg-surface-soft px-1 rounded border border-hairline">text-vibrant-yellow-ink</code></td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-semibold text-ink">Block Lime</td>
                    <td className="py-2 px-3 text-vibrant-purple-dark font-bold">--color-block-lime</td>
                    <td className="py-2 px-3">#D9F99D / Border #BEF264</td>
                    <td className="py-2 px-3">#1A2E05 / Border #2E4A0A</td>
                    <td className="py-2 px-3 font-sans text-xs"><code className="bg-surface-soft px-1 rounded border border-hairline">bg-block-lime</code></td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-semibold text-ink">Block Lilac</td>
                    <td className="py-2 px-3 text-vibrant-purple-dark font-bold">--color-block-lilac</td>
                    <td className="py-2 px-3">#E9D5FF / Border #D8B4FE</td>
                    <td className="py-2 px-3">#2E1065 / Border #4C1D95</td>
                    <td className="py-2 px-3 font-sans text-xs"><code className="bg-surface-soft px-1 rounded border border-hairline">bg-block-lilac</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 02. TYPOGRAPHY */}
      {activeTab === "typography" && (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <TextApp id="found-typo-title" variant="h3" className="font-bold text-ink">
              02. Typography Tokens & Hierarchy Matrix (Complete Specimen)
            </TextApp>
            <TextApp id="found-typo-desc" variant="body" className="text-xs text-ink-secondary">
              Matriks lengkap tipografi P4D BPKAD Kota Yogyakarta: Font Family (Primary Sans, Display, Monospace), Headings H1-H6, Body (Lead, Body 1, Body 2), Caption & Micro, Code Inline/Block, Font Weights, Line Heights, & Letter Spacing.
            </TextApp>
          </div>

          {/* SECTION A: Font Family Specs */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
              • A. Font Family Definitions (theme.css)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-surface border border-hairline flex flex-col gap-2.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-vibrant-purple-dark uppercase tracking-wider font-mono">
                    Primary / Interface Font
                  </span>
                  <BadgeApp id="badge-font-sans" variant="solidPurple" size="sm">--font-sans</BadgeApp>
                </div>
                <p className="text-base font-sans font-semibold text-ink">
                  "Sohne Var", "SF Pro Display", "Inter", system-ui
                </p>
                <div className="p-2.5 bg-surface-soft rounded-xl border border-hairline-soft font-sans text-xs text-ink leading-relaxed">
                  The quick brown fox jumps over the lazy dog. (1234567890)
                </div>
                <span className="text-[11px] text-ink-secondary leading-normal">
                  Font antarmuka default untuk tombol, form input, data tabel, & body text. Memiliki legibilitas optimal di layar retina.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-surface border border-hairline flex flex-col gap-2.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-vibrant-purple-dark uppercase tracking-wider font-mono">
                    Display / Headline Font
                  </span>
                  <BadgeApp id="badge-font-display" variant="solidPurple" size="sm">--font-display</BadgeApp>
                </div>
                <p className="text-base font-display font-bold text-ink">
                  "Poppins", var(--font-sans)
                </p>
                <div className="p-2.5 bg-surface-soft rounded-xl border border-hairline-soft font-display text-xs text-ink font-bold leading-relaxed">
                  PENGELOLAAN KEUNAGAN & ASET DAERAH BPKAD KOTA YOGYAKARTA
                </div>
                <span className="text-[11px] text-ink-secondary leading-normal">
                  Font khusus untuk judul utama H1-H2, banner hero, & headline laporan eksekutif BPKAD.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-surface border border-hairline flex flex-col gap-2.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-vibrant-purple-dark uppercase tracking-wider font-mono">
                    Monospace / Code Font
                  </span>
                  <BadgeApp id="badge-font-mono" variant="solidPurple" size="sm">--font-mono</BadgeApp>
                </div>
                <p className="text-base font-mono font-bold text-ink">
                  "JetBrains Mono", monospace
                </p>
                <div className="p-2.5 bg-surface-soft rounded-xl border border-hairline-soft font-mono text-xs text-ink font-semibold leading-relaxed">
                  NOP: 34.71.010.005.012-0089.0 | Rp 1.450.000.000,-
                </div>
                <span className="text-[11px] text-ink-secondary leading-normal">
                  Digunakan untuk Nomor Objek Pajak (NOP), kalkulasi Rupiah, ID transaksi, kode variabel, & blok JSON.
                </span>
              </div>
            </div>
          </div>

          {/* SECTION B: Headings Spectrum (H1 through H6) */}
          <div className="p-5 rounded-2xl bg-surface border border-hairline flex flex-col gap-4 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • B. Headings Spectrum (H1 - H6 Live Specimen)
            </span>

            <div className="flex flex-col divide-y divide-hairline-soft text-left">
              {/* H1 */}
              <div className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <TextApp id="typo-h1-matrix" variant="h1" className="text-ink">
                    H1 Display Title (48px)
                  </TextApp>
                  <p className="text-xs text-ink-secondary mt-1">
                    Sistem Informasi Pajak & Retribusi Daerah BPKAD Kota Yogyakarta
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">Size: 48px / 3rem</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">LH: 55.2px (1.15)</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">LS: -0.96px (-0.02em)</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline font-bold text-ink">Weight: 700</span>
                  <BadgeApp id="badge-h1-spec" variant="solidPurple" size="sm">--text-h1</BadgeApp>
                </div>
              </div>

              {/* H2 */}
              <div className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <TextApp id="typo-h2-matrix" variant="h2" className="text-ink">
                    H2 Section Title (32px)
                  </TextApp>
                  <p className="text-xs text-ink-secondary mt-1">
                    Ringkasan Penerimaan Pajak Bumi & Bangunan (PBB-P2) TA 2026
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">Size: 32px / 2rem</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">LH: 38.4px (1.20)</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">LS: -0.64px (-0.02em)</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline font-bold text-ink">Weight: 700</span>
                  <BadgeApp id="badge-h2-spec" variant="solidPurple" size="sm">--text-h2</BadgeApp>
                </div>
              </div>

              {/* H3 */}
              <div className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <TextApp id="typo-h3-matrix" variant="h3" className="text-ink">
                    H3 Sub-section Header (24px)
                  </TextApp>
                  <p className="text-xs text-ink-secondary mt-1">
                    Daftar Wajib Pajak Badan & Ketetapan Kurang Bayar Pajak Restoran
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">Size: 24px / 1.5rem</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">LH: 31.2px (1.30)</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">LS: -0.24px (-0.01em)</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline font-bold text-ink">Weight: 700</span>
                  <BadgeApp id="badge-h3-spec" variant="solidPurple" size="sm">--text-h3</BadgeApp>
                </div>
              </div>

              {/* H4 */}
              <div className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <TextApp id="typo-h4-matrix" variant="h4" className="text-ink">
                    H4 Modal Title & Card Header (20px)
                  </TextApp>
                  <p className="text-xs text-ink-secondary mt-1">
                    Detail Verifikasi Kelengkapan Berkas Sertifikasi Aset Daerah
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">Size: 20px / 1.25rem</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">LH: 28.0px (1.40)</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">LS: 0px (0em)</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline font-semibold text-ink">Weight: 600</span>
                  <BadgeApp id="badge-h4-spec" variant="solidPurple" size="sm">--text-h4</BadgeApp>
                </div>
              </div>

              {/* H5 */}
              <div className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <TextApp id="typo-h5-matrix" variant="h5" className="text-ink">
                    H5 Widget & Group Header (16px)
                  </TextApp>
                  <p className="text-xs text-ink-secondary mt-1">
                    Riwayat Transaksi Pembayaran Pajak Penerangan Jalan (PPJ)
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">Size: 16px / 1rem</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">LH: 24.0px (1.50)</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">LS: 0px (0em)</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline font-semibold text-ink">Weight: 600</span>
                  <BadgeApp id="badge-h5-spec" variant="accent" size="sm">--text-h5</BadgeApp>
                </div>
              </div>

              {/* H6 */}
              <div className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <TextApp id="typo-h6-matrix" variant="h6" className="text-vibrant-purple-dark dark:text-purple-300">
                    H6 Eyebrow Category Label (14px UPPERCASE)
                  </TextApp>
                  <p className="text-xs text-ink-secondary mt-1">
                    INFORMASI REGULASI PERATURAN DAERAH KOTA YOGYAKARTA
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">Size: 14px / 0.875rem</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">LH: 20.0px (1.43)</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">LS: +0.28px (+0.02em)</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline font-semibold text-ink">Weight: 600</span>
                  <BadgeApp id="badge-h6-spec" variant="accent" size="sm">--text-h6</BadgeApp>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION C: Body Text Variants (Lead, Body 1, Body 2) */}
          <div className="p-5 rounded-2xl bg-surface border border-hairline flex flex-col gap-4 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • C. Body Text Variants (Lead, Body 1 Standard, Body 2 Small)
            </span>

            <div className="flex flex-col divide-y divide-hairline-soft text-left">
              {/* Lead Body */}
              <div className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <span className="text-xs font-bold text-ink-muted uppercase tracking-wider block mb-1 font-mono">
                    Lead Paragraph / Intro Body (16px)
                  </span>
                  <TextApp id="typo-lead-matrix" variant="lead" className="text-ink">
                    Badan Pengelola Keuangan dan Aset Daerah (BPKAD) Kota Yogyakarta bertugas menyelenggarakan fungsi penunjang urusan pemerintahan bidang keuangan dan pengelolaan barang milik daerah secara akuntabel.
                  </TextApp>
                </div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] shrink-0">
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">Size: 16px</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">LH: 26px (1.625)</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">LS: -0.1px</span>
                  <BadgeApp id="badge-lead-spec" variant="solidPurple" size="sm">text-lead</BadgeApp>
                </div>
              </div>

              {/* Body 1 / Standard */}
              <div className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <span className="text-xs font-bold text-ink-muted uppercase tracking-wider block mb-1 font-mono">
                    Body 1 Standard (--text-body / 14px)
                  </span>
                  <TextApp id="typo-body1-matrix" variant="body1" className="text-ink">
                    Setiap Wajib Pajak berhak mendapatkan pelayanan penerbitan Surat Pemberitahuan Pajak Terhutang (SPPT) PBB-P2 secara mandiri melalui e-SPPT P4D Yogyakarta dengan melampirkan NOP valid dan NIK pemilik.
                  </TextApp>
                </div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] shrink-0">
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">Size: 14px</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">LH: 24px (1.71)</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">LS: -0.1px</span>
                  <BadgeApp id="badge-body1-spec" variant="solidPurple" size="sm">--text-body</BadgeApp>
                </div>
              </div>

              {/* Body 2 / Small */}
              <div className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <span className="text-xs font-bold text-ink-muted uppercase tracking-wider block mb-1 font-mono">
                    Body 2 Small / Dense Body (13px)
                  </span>
                  <TextApp id="typo-body2-matrix" variant="body2" className="text-ink-secondary">
                    Format compact untuk deskripsi kolom tabel, catatan verifikasi berkas, instruksi tooltip, dan metadata daftar transaksi dengan densitas informasi tinggi.
                  </TextApp>
                </div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] shrink-0">
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">Size: 13px</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">LH: 20px (1.53)</span>
                  <span className="px-2 py-1 rounded bg-surface-soft border border-hairline text-ink-muted">LS: 0px</span>
                  <BadgeApp id="badge-body2-spec" variant="accent" size="sm">text-body2</BadgeApp>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION D: Caption, Micro Copy & Code Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Caption & Micro Copy */}
            <div className="p-5 rounded-2xl bg-surface border border-hairline flex flex-col gap-4 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                • D. Caption & Micro Copy (12px & 10px)
              </span>

              <div className="flex flex-col gap-4">
                <div className="p-3.5 bg-surface-soft rounded-xl border border-hairline-soft flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-ink">Caption Standard (12px)</span>
                    <span className="font-mono text-[10px] text-ink-muted">LH: 16px | LS: 0px</span>
                  </div>
                  <TextApp id="spec-caption-text" variant="caption" className="text-ink-secondary">
                    * Catatan: Beban denda keterlambatan 2% per bulan dihitung secara otomatis sejak tanggal jatuh tempo.
                  </TextApp>
                </div>

                <div className="p-3.5 bg-surface-soft rounded-xl border border-hairline-soft flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-ink">Micro Copy / Legal Footnote (10px)</span>
                    <span className="font-mono text-[10px] text-ink-muted">LH: 14px | LS: +0.2px</span>
                  </div>
                  <TextApp id="spec-micro-text" variant="micro" className="text-ink-muted">
                    HAK CIPTA © 2026 BPKAD KOTA YOGYAKARTA. SELURUH SISTEM DILINDUNGI OLEH UNDANG-UNDANG KETENTUAN HUKUM REPUBLIK INDONESIA.
                  </TextApp>
                </div>
              </div>
            </div>

            {/* Code & Monospace */}
            <div className="p-5 rounded-2xl bg-surface border border-hairline flex flex-col gap-4 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                • E. Code & Monospace Text Format
              </span>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-ink">Inline Code Token:</span>
                  <TextApp id="spec-code-inline" variant="code">
                    npm run build:p4d
                  </TextApp>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-ink">Monospace NOP Data:</span>
                  <TextApp id="spec-mono-nop" variant="mono" className="font-bold text-vibrant-purple-dark dark:text-purple-300">
                    34.71.040.011.002-0192.0
                  </TextApp>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 text-slate-100 font-mono text-[11px] border border-slate-800 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1 mb-1">
                    <span>Code Block Snippet (--font-mono)</span>
                    <span>JSON / Config</span>
                  </div>
                  <code>{`{`}</code>
                  <code>{`  "nop": "34.71.040.011.002-0192.0",`}</code>
                  <code>{`  "pokok_pajak": 2500000,`}</code>
                  <code>{`  "status": "LUNAS_BPKAD"`}</code>
                  <code>{`}`}</code>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION F: Font Weights Grid Matrix */}
          <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • F. Matriks Variasi Font Weight (300 - 800)
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-3 bg-surface-soft rounded-xl border border-hairline-soft flex flex-col gap-1 text-center">
                <span className="font-sans text-sm font-light text-ink">Light (300)</span>
                <span className="font-mono text-[10px] text-ink-muted">font-light</span>
              </div>
              <div className="p-3 bg-surface-soft rounded-xl border border-hairline-soft flex flex-col gap-1 text-center">
                <span className="font-sans text-sm font-normal text-ink">Regular (400)</span>
                <span className="font-mono text-[10px] text-ink-muted">font-normal</span>
              </div>
              <div className="p-3 bg-surface-soft rounded-xl border border-hairline-soft flex flex-col gap-1 text-center">
                <span className="font-sans text-sm font-medium text-ink">Medium (500)</span>
                <span className="font-mono text-[10px] text-ink-muted">font-medium</span>
              </div>
              <div className="p-3 bg-surface-soft rounded-xl border border-hairline-soft flex flex-col gap-1 text-center">
                <span className="font-sans text-sm font-semibold text-ink">Semibold (600)</span>
                <span className="font-mono text-[10px] text-ink-muted">font-semibold</span>
              </div>
              <div className="p-3 bg-surface-soft rounded-xl border border-hairline-soft flex flex-col gap-1 text-center">
                <span className="font-sans text-sm font-bold text-ink">Bold (700)</span>
                <span className="font-mono text-[10px] text-ink-muted">font-bold</span>
              </div>
              <div className="p-3 bg-surface-soft rounded-xl border border-hairline-soft flex flex-col gap-1 text-center">
                <span className="font-sans text-sm font-extrabold text-ink">Extrabold (800)</span>
                <span className="font-mono text-[10px] text-ink-muted">font-extrabold</span>
              </div>
            </div>
          </div>

          {/* SECTION G: Comprehensive Typography Specification Matrix Table */}
          <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • G. Tabel Matriks Spesifikasi Tipografi Lengkap (H1 - H6, Body, Caption, Code)
            </span>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-hairline bg-surface-soft text-ink">
                    <th className="py-2.5 px-3 font-bold">Element / Level</th>
                    <th className="py-2.5 px-3 font-bold font-mono">Token / Class</th>
                    <th className="py-2.5 px-3 font-bold">Font Family</th>
                    <th className="py-2.5 px-3 font-bold">Font Size (px / rem)</th>
                    <th className="py-2.5 px-3 font-bold">Line Height</th>
                    <th className="py-2.5 px-3 font-bold">Letter Spacing</th>
                    <th className="py-2.5 px-3 font-bold">Weight Default</th>
                    <th className="py-2.5 px-3 font-bold">Rekomendasi Penggunaan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline-soft font-mono text-[11px] text-ink-secondary">
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">H1 Display</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">--text-h1 / variant="h1"</td>
                    <td className="py-2.5 px-3 font-sans">Display / Sans</td>
                    <td className="py-2.5 px-3 text-ink font-bold">48px (3rem)</td>
                    <td className="py-2.5 px-3">55.2px (1.15)</td>
                    <td className="py-2.5 px-3">-0.96px (-0.02em)</td>
                    <td className="py-2.5 px-3 font-sans">Bold (700)</td>
                    <td className="py-2.5 px-3 font-sans">Hero Title, Dashboard Main Header</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">H2 Section</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">--text-h2 / variant="h2"</td>
                    <td className="py-2.5 px-3 font-sans">Display / Sans</td>
                    <td className="py-2.5 px-3 text-ink font-bold">32px (2rem)</td>
                    <td className="py-2.5 px-3">38.4px (1.20)</td>
                    <td className="py-2.5 px-3">-0.64px (-0.02em)</td>
                    <td className="py-2.5 px-3 font-sans">Bold (700)</td>
                    <td className="py-2.5 px-3 font-sans">Judul Modul Utama & Tab Panel</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">H3 Sub-section</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">--text-h3 / variant="h3"</td>
                    <td className="py-2.5 px-3 font-sans">Sans Default</td>
                    <td className="py-2.5 px-3 text-ink font-bold">24px (1.5rem)</td>
                    <td className="py-2.5 px-3">31.2px (1.30)</td>
                    <td className="py-2.5 px-3">-0.24px (-0.01em)</td>
                    <td className="py-2.5 px-3 font-sans">Bold (700)</td>
                    <td className="py-2.5 px-3 font-sans">Header Card, Widget Title, Form Section</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">H4 Modal Title</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">--text-h4 / variant="h4"</td>
                    <td className="py-2.5 px-3 font-sans">Sans Default</td>
                    <td className="py-2.5 px-3 text-ink font-bold">20px (1.25rem)</td>
                    <td className="py-2.5 px-3">28.0px (1.40)</td>
                    <td className="py-2.5 px-3">0px (0em)</td>
                    <td className="py-2.5 px-3 font-sans">Semibold (600)</td>
                    <td className="py-2.5 px-3 font-sans">Dialog Header, Drawer Title, Table Header</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">H5 Widget Title</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">variant="h5"</td>
                    <td className="py-2.5 px-3 font-sans">Sans Default</td>
                    <td className="py-2.5 px-3 text-ink font-bold">16px (1rem)</td>
                    <td className="py-2.5 px-3">24.0px (1.50)</td>
                    <td className="py-2.5 px-3">0px (0em)</td>
                    <td className="py-2.5 px-3 font-sans">Semibold (600)</td>
                    <td className="py-2.5 px-3 font-sans">Sub-card Header, Group Box Title</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">H6 Eyebrow</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">variant="h6"</td>
                    <td className="py-2.5 px-3 font-sans">Sans Default</td>
                    <td className="py-2.5 px-3 text-ink font-bold">14px (0.875rem)</td>
                    <td className="py-2.5 px-3">20.0px (1.43)</td>
                    <td className="py-2.5 px-3">+0.28px (+0.02em)</td>
                    <td className="py-2.5 px-3 font-sans">Semibold (600)</td>
                    <td className="py-2.5 px-3 font-sans">Category Tag, Uppercase Subtitle Label</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Body Lead</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">variant="lead"</td>
                    <td className="py-2.5 px-3 font-sans">Sans Default</td>
                    <td className="py-2.5 px-3 text-ink font-bold">16px (1rem)</td>
                    <td className="py-2.5 px-3">26px (1.625)</td>
                    <td className="py-2.5 px-3">-0.1px</td>
                    <td className="py-2.5 px-3 font-sans">Regular / Medium</td>
                    <td className="py-2.5 px-3 font-sans">Paragraf Pembuka, Ringkasan Laporan</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Body 1 Standard</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">--text-body / variant="body1"</td>
                    <td className="py-2.5 px-3 font-sans">Sans Default</td>
                    <td className="py-2.5 px-3 text-ink font-bold">14px (0.875rem)</td>
                    <td className="py-2.5 px-3">24px (1.71)</td>
                    <td className="py-2.5 px-3">-0.1px</td>
                    <td className="py-2.5 px-3 font-sans">Regular (400)</td>
                    <td className="py-2.5 px-3 font-sans">Teks Utama Narasi, Form Label, Table Cells</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Body 2 Small</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">variant="body2"</td>
                    <td className="py-2.5 px-3 font-sans">Sans Default</td>
                    <td className="py-2.5 px-3 text-ink font-bold">13px (0.8125rem)</td>
                    <td className="py-2.5 px-3">20px (1.53)</td>
                    <td className="py-2.5 px-3">0px</td>
                    <td className="py-2.5 px-3 font-sans">Regular / Medium</td>
                    <td className="py-2.5 px-3 font-sans">Compact Table Rows, Sub-items, Tooltip Content</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Caption Standard</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">variant="caption"</td>
                    <td className="py-2.5 px-3 font-sans">Sans / Mono</td>
                    <td className="py-2.5 px-3 text-ink font-bold">12px (0.75rem)</td>
                    <td className="py-2.5 px-3">16px (1.33)</td>
                    <td className="py-2.5 px-3">0px</td>
                    <td className="py-2.5 px-3 font-sans">Medium (500)</td>
                    <td className="py-2.5 px-3 font-sans">Badge Label, Form Help Text, Timestamp</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Micro Legal</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">variant="micro"</td>
                    <td className="py-2.5 px-3 font-sans">Sans Default</td>
                    <td className="py-2.5 px-3 text-ink font-bold">10px (0.625rem)</td>
                    <td className="py-2.5 px-3">14px (1.40)</td>
                    <td className="py-2.5 px-3">+0.2px</td>
                    <td className="py-2.5 px-3 font-sans">Medium (500)</td>
                    <td className="py-2.5 px-3 font-sans">Footnote Hukum, Catatan Kaki, Legal Disclaimer</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Code Inline</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">variant="code"</td>
                    <td className="py-2.5 px-3 font-sans font-mono">Monospace</td>
                    <td className="py-2.5 px-3 text-ink font-bold">12px / 0.75rem</td>
                    <td className="py-2.5 px-3">18px</td>
                    <td className="py-2.5 px-3">-0.2px</td>
                    <td className="py-2.5 px-3 font-sans font-mono">Medium (500)</td>
                    <td className="py-2.5 px-3 font-sans">Perintah Terminal, Parameter Variabel Code</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Code Block / NOP</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">variant="mono" / pre code</td>
                    <td className="py-2.5 px-3 font-sans font-mono">Monospace</td>
                    <td className="py-2.5 px-3 text-ink font-bold">12px / 0.75rem</td>
                    <td className="py-2.5 px-3">20px</td>
                    <td className="py-2.5 px-3">-0.2px</td>
                    <td className="py-2.5 px-3 font-sans font-mono">Regular / Bold</td>
                    <td className="py-2.5 px-3 font-sans">NOP Pajak, ID Transaksi, Nominal Rupiah, JSON</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 03. SPACING & GRID */}
      {activeTab === "spacing" && (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <TextApp id="found-spacing-title" variant="h3" className="font-bold text-ink">
              03. Spacing Scale, Grid System Foundation & Breakpoints Matrix
            </TextApp>
            <TextApp id="found-spacing-desc" variant="body" className="text-xs text-ink-secondary">
              Komponen fondasi <code className="font-mono text-vibrant-purple-dark font-bold">GridApp</code>, <code className="font-mono text-vibrant-purple-dark font-bold">ColApp</code>, & <code className="font-mono text-vibrant-purple-dark font-bold">ContainerApp</code>. Mengadopsi sistem kelipatan 8px (dengan sub-langkah 4px), 12-kolom desktop / 4-kolom mobile, & standar breakpoint Tailwind.
            </TextApp>
          </div>

          {/* SECTION A: Foundation Component Specs (<GridApp />, <ColApp />, <ContainerApp />) */}
          <div className="p-5 rounded-2xl bg-surface border border-hairline flex flex-col gap-4 shadow-2xs">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-hairline-soft pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
                • A. Foundation Layout Components (@/packages/design-system)
              </span>
              <div className="flex gap-2">
                <BadgeApp id="badge-gridapp" variant="solidPurple" size="sm">GridApp</BadgeApp>
                <BadgeApp id="badge-colapp" variant="solidPurple" size="sm">ColApp</BadgeApp>
                <BadgeApp id="badge-containerapp" variant="accent" size="sm">ContainerApp</BadgeApp>
              </div>
            </div>

            {/* Live Interactive Specimen of GridApp & ColApp */}
            <div className="p-4 bg-surface-soft rounded-xl border border-hairline-soft flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-ink">Live Specimen: &lt;GridApp variant="default" gap="md"&gt; + &lt;ColApp /&gt;</span>
                <span className="font-mono text-[10px] text-ink-muted">Responsive Breakdown: Mobile (4 Col) → Tablet (8 Col) → Desktop (12 Col)</span>
              </div>

              {/* GridApp 12 Column Visual Demo */}
              <GridApp id="foundation-demo-grid" variant="default" gap="sm">
                <ColApp id="col-demo-1" span={4} spanSm={4} spanLg={8} className="p-3 bg-vibrant-purple/15 border border-vibrant-purple/40 rounded-xl font-bold text-xs text-vibrant-purple-dark dark:text-purple-300 flex flex-col justify-between gap-1">
                  <span>ColApp (Main Content)</span>
                  <span className="font-mono text-[10px] font-normal">span=4, spanLg=8 (8 Col)</span>
                </ColApp>
                <ColApp id="col-demo-2" span={4} spanSm={4} spanLg={4} className="p-3 bg-block-lime/30 border border-block-lime-border rounded-xl font-bold text-xs text-ink flex flex-col justify-between gap-1">
                  <span>ColApp (Sidebar Panel)</span>
                  <span className="font-mono text-[10px] font-normal">span=4, spanLg=4 (4 Col)</span>
                </ColApp>
              </GridApp>

              {/* GridApp Bento Layout Variant */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-ink-muted uppercase block mb-2 font-mono">
                  Bento Layout Preset: &lt;GridApp variant="bento" gap="md"&gt;
                </span>
                <GridApp id="foundation-bento-grid" variant="bento" gap="sm">
                  <ColApp id="bento-col-1" span={1} spanSm={2} spanLg={2} className="p-3 bg-surface border border-hairline rounded-xl text-xs font-semibold text-ink shadow-2xs">
                    Hero Metric Card (Span 2)
                  </ColApp>
                  <ColApp id="bento-col-2" span={1} className="p-3 bg-surface border border-hairline rounded-xl text-xs font-semibold text-ink shadow-2xs">
                    Metric Card (Span 1)
                  </ColApp>
                  <ColApp id="bento-col-3" span={1} className="p-3 bg-surface border border-hairline rounded-xl text-xs font-semibold text-ink shadow-2xs">
                    Metric Card (Span 1)
                  </ColApp>
                </GridApp>
              </div>
            </div>
          </div>

          {/* SECTION B: Spacing Scale Matrix (4px / 8px System) */}
          <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • B. Spacing Scale Matrix (Sistem Kelipatan 4px / 8px Base Grid)
            </span>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-hairline bg-surface-soft text-ink">
                    <th className="py-2.5 px-3 font-bold font-mono">Step</th>
                    <th className="py-2.5 px-3 font-bold font-mono">Pixel (px)</th>
                    <th className="py-2.5 px-3 font-bold font-mono">REM Value</th>
                    <th className="py-2.5 px-3 font-bold">Visual Indicator</th>
                    <th className="py-2.5 px-3 font-bold">Standard Use-Case & Design Token</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline-soft font-mono text-[11px] text-ink-secondary">
                  {SPACING_SCALE.map((item, idx) => (
                    <tr key={idx} className="hover:bg-surface-soft/50 transition-colors">
                      <td className="py-2 px-3 font-bold text-ink">Step {item.step}</td>
                      <td className="py-2 px-3 text-vibrant-purple-dark font-bold">{item.px}</td>
                      <td className="py-2 px-3">{item.rem}</td>
                      <td className="py-2 px-3">
                        <div
                          className="h-3 bg-vibrant-purple rounded border border-vibrant-purple-dark"
                          style={{ width: item.px === "0px" ? "2px" : `min(${item.px}, 120px)` }}
                        />
                      </td>
                      <td className="py-2 px-3 font-sans text-xs text-ink">{item.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION C: Responsive Column Grid Specification */}
          <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-hairline-soft pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                • C. Column Grids Layout Specification (12-Col Desktop / 8-Col Tablet / 4-Col Mobile)
              </span>
              <span className="text-xs font-mono text-vibrant-purple-dark font-bold bg-vibrant-purple/15 px-2.5 py-1 rounded-lg border border-vibrant-purple/30">
                GridApp default: grid-cols-4 sm:grid-cols-8 lg:grid-cols-12
              </span>
            </div>

            {/* Visual 12-Column Bar */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-ink-muted uppercase font-mono">Visual 12 Columns Breakdown:</span>
              <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-9 rounded-lg bg-vibrant-purple/15 border border-vibrant-purple/40 flex items-center justify-center font-mono text-[11px] font-bold text-vibrant-purple-dark dark:text-purple-300"
                  >
                    C{i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Standard Dashboard Layout Patterns */}
            <div className="flex flex-col gap-2 pt-2">
              <span className="text-[11px] font-bold text-ink-muted uppercase font-mono">Standard Dashboard Column Patterns:</span>
              <GridApp id="pattern-grid-demo" variant="default" gap="sm">
                {/* 2-Column Split: 8 + 4 */}
                <ColApp id="pat-1" span={4} spanSm={8} spanLg={8} className="p-3 bg-surface border border-hairline rounded-xl text-xs flex flex-col gap-1 shadow-2xs">
                  <span className="font-bold text-ink">Main Content Area (8 Columns)</span>
                  <span className="font-mono text-[10px] text-ink-muted">lg:col-span-8 | Charts & Data Tables</span>
                </ColApp>
                <ColApp id="pat-2" span={4} spanSm={8} spanLg={4} className="p-3 bg-surface border border-hairline rounded-xl text-xs flex flex-col gap-1 shadow-2xs">
                  <span className="font-bold text-ink">Right Activity Feed (4 Columns)</span>
                  <span className="font-mono text-[10px] text-ink-muted">lg:col-span-4 | Recent Logs & Filters</span>
                </ColApp>

                {/* 3-Column Equal Split: 4 + 4 + 4 */}
                <ColApp id="pat-3" span={4} spanSm={4} spanLg={4} className="p-3 bg-surface-soft border border-hairline-soft rounded-xl text-xs flex flex-col gap-1">
                  <span className="font-semibold text-ink">Section A (4 Cols)</span>
                  <span className="font-mono text-[10px] text-ink-muted">lg:col-span-4</span>
                </ColApp>
                <ColApp id="pat-4" span={4} spanSm={4} spanLg={4} className="p-3 bg-surface-soft border border-hairline-soft rounded-xl text-xs flex flex-col gap-1">
                  <span className="font-semibold text-ink">Section B (4 Cols)</span>
                  <span className="font-mono text-[10px] text-ink-muted">lg:col-span-4</span>
                </ColApp>
                <ColApp id="pat-5" span={4} spanSm={8} spanLg={4} className="p-3 bg-surface-soft border border-hairline-soft rounded-xl text-xs flex flex-col gap-1">
                  <span className="font-semibold text-ink">Section C (4 Cols)</span>
                  <span className="font-mono text-[10px] text-ink-muted">lg:col-span-4</span>
                </ColApp>
              </GridApp>
            </div>
          </div>

          {/* SECTION D: Breakpoint System Specification Table */}
          <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • D. Tabel Specification Breakpoints & Margin Standards
            </span>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-hairline bg-surface-soft text-ink">
                    <th className="py-2.5 px-3 font-bold">Breakpoint Name</th>
                    <th className="py-2.5 px-3 font-bold font-mono">Tailwind Prefix</th>
                    <th className="py-2.5 px-3 font-bold font-mono">Min Width</th>
                    <th className="py-2.5 px-3 font-bold">Columns Count</th>
                    <th className="py-2.5 px-3 font-bold">Container Margin</th>
                    <th className="py-2.5 px-3 font-bold">Gutter / Gap Range</th>
                    <th className="py-2.5 px-3 font-bold">Target Device Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline-soft font-mono text-[11px] text-ink-secondary">
                  {BREAKPOINTS.map((bp, i) => (
                    <tr key={i} className="hover:bg-surface-soft/50 transition-colors">
                      <td className="py-2.5 px-3 font-sans font-bold text-ink">{bp.name}</td>
                      <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">{bp.name.includes("Mobile") ? "default" : bp.name.split(" ")[1].replace("(", "").replace(")", "")}:</td>
                      <td className="py-2.5 px-3 text-ink font-bold">{bp.minWidth}</td>
                      <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">{bp.cols} Columns</td>
                      <td className="py-2.5 px-3">{bp.margin}</td>
                      <td className="py-2.5 px-3">{bp.gap}</td>
                      <td className="py-2.5 px-3 font-sans text-xs text-ink">{bp.device}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 04. ELEVATION & SHADOWS */}
      {activeTab === "elevation" && (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <TextApp id="found-elevation-title" variant="h3" className="font-bold text-ink">
              04. Elevation, Depth & Shadow Matrix (Complete Specimen)
            </TextApp>
            <TextApp id="found-elevation-desc" variant="body" className="text-xs text-ink-secondary">
              Matriks 3 Tingkat Elevasi P4D BPKAD Kota Yogyakarta: <code className="font-mono text-vibrant-purple-dark font-bold">Level 1</code> (Card biasa), <code className="font-mono text-vibrant-purple-dark font-bold">Level 2</code> (Dropdown, Popover), <code className="font-mono text-vibrant-purple-dark font-bold">Level 3</code> (Modal, FAB, Tooltip), serta formulasi <code className="font-mono text-vibrant-purple-dark font-bold">Shadow Color & Opacity</code> untuk mode terang dan gelap.
            </TextApp>
          </div>

          {/* SECTION A: 3 Level Elevation Hierarchy Specimens */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Level 1: Card Biasa */}
            <div className="p-6 bg-surface border border-hairline rounded-2xl shadow-sm flex flex-col justify-between gap-4 shadow-2xs relative">
              <div className="flex items-center justify-between">
                <BadgeApp id="shadow-lvl1-badge-mat" variant="solidPurple" size="sm">Level 1 (Card Biasa)</BadgeApp>
                <span className="text-[10px] font-mono text-ink-muted">--shadow-sm</span>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-sm text-ink">Standard Card Elevation</h4>
                <p className="text-xs text-ink-secondary leading-normal">
                  Digunakan untuk komponen dasar di permukaan kanvas: Card biasa, Scorecard KPI, Widget statistik, & item list datar.
                </p>
                {/* Mini Live Preview */}
                <div className="p-3 bg-surface rounded-xl border border-hairline shadow-xs flex items-center justify-between text-xs">
                  <span className="font-semibold text-ink">Contoh Card Level 1</span>
                  <span className="font-mono text-[10px] text-vibrant-purple-dark font-bold">shadow-xs / sm</span>
                </div>
              </div>
              <div className="p-3 bg-surface-soft rounded-xl border border-hairline-soft text-[10px] font-mono text-ink-muted text-center flex flex-col gap-0.5">
                <span className="font-bold text-ink">Shadow Color & Opacity (Light):</span>
                <span>0px 2px 4px 0px rgba(0, 0, 0, 0.05)</span>
                <span>0px 15px 35px 0px rgba(23, 23, 23, 0.08)</span>
              </div>
            </div>

            {/* Level 2: Dropdown & Popover */}
            <div className="p-6 bg-surface border border-hairline rounded-2xl shadow-md flex flex-col justify-between gap-4 relative">
              <div className="flex items-center justify-between">
                <BadgeApp id="shadow-lvl2-badge-mat" variant="accent" size="sm">Level 2 (Dropdown & Popover)</BadgeApp>
                <span className="text-[10px] font-mono text-ink-muted">--shadow-md / lg</span>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-sm text-ink">Floating Overlay Elevation</h4>
                <p className="text-xs text-ink-secondary leading-normal">
                  Digunakan untuk elemen mengapung sementara di atas card: Dropdown Menu, Select Option, Datepicker Popover, & Context Menu.
                </p>
                {/* Mini Live Preview */}
                <div className="p-3 bg-surface rounded-xl border border-hairline shadow-md flex items-center justify-between text-xs">
                  <span className="font-semibold text-ink font-mono text-[11px]">Dropdown Menu Popover</span>
                  <span className="px-2 py-0.5 rounded bg-vibrant-purple/15 text-vibrant-purple-dark text-[10px] font-bold">shadow-md</span>
                </div>
              </div>
              <div className="p-3 bg-surface-soft rounded-xl border border-hairline-soft text-[10px] font-mono text-ink-muted text-center flex flex-col gap-0.5">
                <span className="font-bold text-ink">Shadow Color & Opacity (Light):</span>
                <span>0px 4px 12px -2px rgba(0, 0, 0, 0.12)</span>
                <span>0px 20px 40px -20px rgba(0, 0, 0, 0.10)</span>
              </div>
            </div>

            {/* Level 3: Modal, FAB & Tooltip */}
            <div className="p-6 bg-surface border border-hairline rounded-2xl shadow-xl flex flex-col justify-between gap-4 relative">
              <div className="flex items-center justify-between">
                <BadgeApp id="shadow-lvl3-badge-mat" variant="solidPurple" size="sm">Level 3 (Modal, FAB, Tooltip)</BadgeApp>
                <span className="text-[10px] font-mono text-ink-muted">--shadow-xl / 2xl</span>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-sm text-ink">Top-Layer Overlay Elevation</h4>
                <p className="text-xs text-ink-secondary leading-normal">
                  Digunakan untuk hirarki teratas aplikasi: Modal Dialog, Drawer Panel, Floating Action Button (FAB), & Tooltip mengapung.
                </p>
                {/* Mini Live Preview */}
                <div className="p-3 bg-vibrant-purple text-vibrant-purple-ink rounded-xl border border-vibrant-purple-dark shadow-xl flex items-center justify-between text-xs">
                  <span className="font-bold">Modal & FAB Button</span>
                  <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] font-bold">shadow-xl</span>
                </div>
              </div>
              <div className="p-3 bg-surface-soft rounded-xl border border-hairline-soft text-[10px] font-mono text-ink-muted text-center flex flex-col gap-0.5">
                <span className="font-bold text-ink">Shadow Color & Opacity (Light):</span>
                <span>0px 20px 25px -5px rgba(0, 0, 0, 0.18)</span>
                <span>0px 25px 50px -12px rgba(0, 0, 0, 0.25)</span>
              </div>
            </div>
          </div>

          {/* SECTION B: Shadow Color & Opacity Breakdown (Light vs Dark Mode) */}
          <div className="p-5 rounded-2xl bg-surface border border-hairline flex flex-col gap-4 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • B. Spesifikasi Formulasi Shadow Color, Opacity & Dark Mode Adaptation
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Light Mode Spec */}
              <div className="p-4 rounded-xl bg-surface-soft border border-hairline-soft flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                    ☀️ Mode Terang (Light Mode Shadow Specs)
                  </span>
                  <BadgeApp id="badge-shadow-light" variant="solidPurple" size="sm">Black Tinted Alpha</BadgeApp>
                </div>
                <ul className="text-xs text-ink-secondary space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-vibrant-purple-dark font-bold">•</span>
                    <span><strong>Base Shadow Color:</strong> Neutral Pure Black <code className="font-mono text-ink font-bold">rgba(0, 0, 0, opacity)</code> atau Warm Neutral Ink <code className="font-mono text-ink font-bold">rgba(23, 23, 23, opacity)</code>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-vibrant-purple-dark font-bold">•</span>
                    <span><strong>Level 1 Opacity:</strong> 4% - 8% (<code className="font-mono">rgba(0,0,0,0.05)</code>) — lembut, natural, tidak mengotori kanvas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-vibrant-purple-dark font-bold">•</span>
                    <span><strong>Level 2 Opacity:</strong> 10% - 15% (<code className="font-mono">rgba(0,0,0,0.12)</code>) — kontras menengah untuk dropdown.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-vibrant-purple-dark font-bold">•</span>
                    <span><strong>Level 3 Opacity:</strong> 18% - 25% (<code className="font-mono">rgba(0,0,0,0.22)</code>) — tebal dengan jarak sebar tinggi untuk modal dialog.</span>
                  </li>
                </ul>
              </div>

              {/* Dark Mode Spec */}
              <div className="p-4 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                    🌙 Mode Gelap (Dark Mode Glow & Border Hairline)
                  </span>
                  <BadgeApp id="badge-shadow-dark" variant="accent" size="sm">Border Contrast + Glow</BadgeApp>
                </div>
                <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-purple-400 font-bold">•</span>
                    <span><strong>High Opacity Drop Shadow:</strong> Hitam pekat <code className="font-mono text-slate-100 font-bold">rgba(0, 0, 0, 0.60 - 0.85)</code> dengan radius blur lebih tinggi.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-purple-400 font-bold">•</span>
                    <span><strong>Border Hairline Contrast:</strong> Penambahan batas tipis <code className="font-mono text-slate-100 font-bold">border-hairline</code> (White 12-16% opacity) agar elevasi terlihat di latar hitam.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-purple-400 font-bold">•</span>
                    <span><strong>Ambient Accent Glow:</strong> Efek pendaran warna aksen ungu (<code className="font-mono text-purple-300">rgba(139, 92, 246, 0.15)</code>) untuk tombol FAB & modal aktif.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* SECTION C: Full Tailwind Shadow Scale Matrix */}
          <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • C. Matriks Skala Elevasi Tailwind (Interactive Live Specimen)
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { name: "shadow-2xs", desc: "Flat / Subtle", lvl: "Level 0" },
                { name: "shadow-xs", desc: "Input / Badge", lvl: "Level 1" },
                { name: "shadow-sm", desc: "Card biasa", lvl: "Level 1" },
                { name: "shadow-md", desc: "Dropdown", lvl: "Level 2" },
                { name: "shadow-lg", desc: "Popover", lvl: "Level 2" },
                { name: "shadow-xl", desc: "Modal Dialog", lvl: "Level 3" },
                { name: "shadow-2xl", desc: "FAB & Drawer", lvl: "Level 3" },
                { name: "shadow-inner", desc: "Tooltip Inset", lvl: "Level 3" },
              ].map((sh, idx) => (
                <div key={idx} className={`p-3 bg-surface border border-hairline rounded-xl ${sh.name} flex flex-col items-center justify-center gap-1.5 text-center h-28 transition-transform hover:-translate-y-0.5`}>
                  <span className="font-mono text-xs font-bold text-ink">{sh.name}</span>
                  <span className="text-[10px] font-semibold text-vibrant-purple-dark">{sh.lvl}</span>
                  <span className="text-[10px] text-ink-muted">{sh.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION D: Elevation Specification Table */}
          <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • D. Tabel Matriks Detail Spesifikasi Elevasi & Penggunaan Komponen
            </span>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-hairline bg-surface-soft text-ink">
                    <th className="py-2.5 px-3 font-bold">Elevasi Level</th>
                    <th className="py-2.5 px-3 font-bold font-mono">Token Class</th>
                    <th className="py-2.5 px-3 font-bold">Shadow Color & Opacity (Light)</th>
                    <th className="py-2.5 px-3 font-bold">Dark Mode Adaptation</th>
                    <th className="py-2.5 px-3 font-bold">Komponen Terkait (Best Practice)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline-soft font-mono text-[11px] text-ink-secondary">
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Level 0 (Flat)</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">shadow-none / 2xs</td>
                    <td className="py-2.5 px-3">none / rgba(0,0,0,0.03)</td>
                    <td className="py-2.5 px-3 font-sans">Tanpa bayangan, garis pembatas tipis</td>
                    <td className="py-2.5 px-3 font-sans">Background kanvas utama, sel data tabel, sub-container</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Level 1 (Card biasa)</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">--shadow-sm / shadow-sm</td>
                    <td className="py-2.5 px-3">0 2px 4px rgba(0,0,0,0.05) & 0 15px 35px rgba(23,23,23,0.08)</td>
                    <td className="py-2.5 px-3 font-sans">Border Hairline Soft + Subtle Dark Shadow (40%)</td>
                    <td className="py-2.5 px-3 font-sans">CardApp biasa, Scorecard KPI, Widget statistik, Form Box</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Level 2 (Dropdown, Popover)</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">--shadow-card / shadow-md / lg</td>
                    <td className="py-2.5 px-3">0 4px 12px -2px rgba(0,0,0,0.12) & 0 20px 40px -20px rgba(0,0,0,0.10)</td>
                    <td className="py-2.5 px-3 font-sans">Border Hairline + Deep Black Shadow (60%)</td>
                    <td className="py-2.5 px-3 font-sans">Dropdown Menu, Select Option List, Datepicker Popover, Context Menu</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Level 3 (Modal, FAB, Tooltip)</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">shadow-xl / shadow-2xl / tactile</td>
                    <td className="py-2.5 px-3">0 20px 25px -5px rgba(0,0,0,0.18) & 0 25px 50px -12px rgba(0,0,0,0.25)</td>
                    <td className="py-2.5 px-3 font-sans">Border Hairline + Ambient Purple Glow (15%) + Black Shadow (80%)</td>
                    <td className="py-2.5 px-3 font-sans">Dialog Modal, Floating Action Button (FAB), Drawer Panel, Tooltip</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 05. BORDER RADIUS */}
      {activeTab === "radius" && (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <TextApp id="found-radius-title" variant="h3" className="font-bold text-ink">
              05. Border Radius & Corner Shapes Matrix
            </TextApp>
            <TextApp id="found-radius-desc" variant="body" className="text-xs text-ink-secondary">
              Standar kelengkungan sudut (Corner Shapes) P4D BPKAD Kota Yogyakarta: <code className="font-mono text-vibrant-purple-dark font-bold">Sharp (0px)</code>, <code className="font-mono text-vibrant-purple-dark font-bold">Small (4px)</code>, <code className="font-mono text-vibrant-purple-dark font-bold">Medium (8px)</code>, <code className="font-mono text-vibrant-purple-dark font-bold">Large (16px)</code>, & <code className="font-mono text-vibrant-purple-dark font-bold">Pill / Fully Rounded</code>, serta aturan matematika kalkulasi bersarang.
            </TextApp>
          </div>

          {/* SECTION A: Corner Shapes Token Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {/* Sharp (0px) */}
            <div className="p-4 bg-surface border border-hairline rounded-none flex flex-col items-center justify-between gap-2 h-36 text-center shadow-2xs">
              <div className="w-10 h-10 bg-vibrant-purple/15 border border-vibrant-purple/40 rounded-none flex items-center justify-center font-mono text-xs font-bold text-vibrant-purple-dark">
                0px
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-xs text-ink">Sharp (0px)</span>
                <span className="text-[10px] font-mono text-vibrant-purple-dark font-bold">rounded-none</span>
                <span className="text-[10px] text-ink-secondary">Tabel header, sel data & divider</span>
              </div>
            </div>

            {/* Small (4px) */}
            <div className="p-4 bg-surface border border-hairline rounded-[4px] flex flex-col items-center justify-between gap-2 h-36 text-center shadow-2xs">
              <div className="w-10 h-10 bg-vibrant-purple/15 border border-vibrant-purple/40 rounded-[4px] flex items-center justify-center font-mono text-xs font-bold text-vibrant-purple-dark">
                4px
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-xs text-ink">Small (4px)</span>
                <span className="text-[10px] font-mono text-vibrant-purple-dark font-bold">rounded-[4px] / rounded-sm</span>
                <span className="text-[10px] text-ink-secondary font-semibold">Input & button kecil, checkbox</span>
              </div>
            </div>

            {/* Medium (8px) */}
            <div className="p-4 bg-surface border border-hairline rounded-[8px] flex flex-col items-center justify-between gap-2 h-36 text-center shadow-2xs">
              <div className="w-10 h-10 bg-vibrant-purple/15 border border-vibrant-purple/40 rounded-[8px] flex items-center justify-center font-mono text-xs font-bold text-vibrant-purple-dark">
                8px
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-xs text-ink">Medium (8px)</span>
                <span className="text-[10px] font-mono text-vibrant-purple-dark font-bold">rounded-[8px] / rounded-md</span>
                <span className="text-[10px] text-ink-secondary font-semibold">Card biasa, scorecard & widget</span>
              </div>
            </div>

            {/* Large (16px) */}
            <div className="p-4 bg-surface border border-hairline rounded-[16px] flex flex-col items-center justify-between gap-2 h-36 text-center shadow-2xs">
              <div className="w-10 h-10 bg-vibrant-purple/15 border border-vibrant-purple/40 rounded-[16px] flex items-center justify-center font-mono text-xs font-bold text-vibrant-purple-dark">
                16px
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-xs text-ink">Large (16px)</span>
                <span className="text-[10px] font-mono text-vibrant-purple-dark font-bold">rounded-[16px] / rounded-2xl</span>
                <span className="text-[10px] text-ink-secondary font-semibold">Modal dialog & container besar</span>
              </div>
            </div>

            {/* Pill / Fully Rounded */}
            <div className="p-4 bg-surface border border-hairline rounded-full flex flex-col items-center justify-between gap-2 h-36 text-center shadow-2xs">
              <div className="w-10 h-10 bg-vibrant-purple/15 border border-vibrant-purple/40 rounded-full flex items-center justify-center font-mono text-[10px] font-bold text-vibrant-purple-dark">
                9999px
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-xs text-ink">Pill / Fully Rounded</span>
                <span className="text-[10px] font-mono text-vibrant-purple-dark font-bold">rounded-full</span>
                <span className="text-[10px] text-ink-secondary font-semibold">Badge, Tag, Avatar & FAB</span>
              </div>
            </div>
          </div>

          {/* SECTION B: Live Interactive Component Specimens & Corner Radius Usage */}
          <div className="p-5 bg-surface border border-hairline rounded-[16px] flex flex-col gap-4 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • B. Live Interactive Component Specimens (Penerapan Corner Shapes)
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Small: Input & Button Kecil */}
              <div className="p-4 bg-surface-soft border border-hairline-soft rounded-[8px] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">Small (4px) Component Usage</span>
                  <BadgeApp id="badge-radius-sm" variant="solidPurple" size="sm">4px Corner</BadgeApp>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <button id="btn-demo-sm" className="px-3 py-1.5 bg-vibrant-purple text-vibrant-purple-ink rounded-[4px] text-xs font-bold shadow-xs">
                      Tombol Kecil (4px)
                    </button>
                    <input
                      id="input-demo-sm"
                      type="text"
                      readOnly
                      value="Input Filter (4px)"
                      className="px-2.5 py-1.5 bg-surface border border-hairline rounded-[4px] text-xs text-ink font-sans w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Medium: Card Biasa */}
              <div className="p-4 bg-surface border border-hairline rounded-[8px] shadow-xs flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">Medium (8px) Card Usage</span>
                  <BadgeApp id="badge-radius-md" variant="accent" size="sm">8px Corner</BadgeApp>
                </div>
                <p className="text-xs text-ink-secondary leading-normal">
                  Digunakan untuk kelengkungan standar <code>CardApp</code> & <code>ScorecardApp</code> agar tampilan rapi & efisien.
                </p>
              </div>

              {/* Large: Modal Dialog */}
              <div className="p-4 bg-surface border border-vibrant-purple/40 rounded-[16px] shadow-md flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">Large (16px) Modal Container</span>
                  <BadgeApp id="badge-radius-lg" variant="solidPurple" size="sm">16px Corner</BadgeApp>
                </div>
                <p className="text-xs text-ink-secondary leading-normal">
                  Digunakan untuk batas kontainer utama dialog modal & drawer panel mengapung.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION C: Nested Border Radius Formula */}
          <div className="p-5 bg-surface border border-hairline rounded-[16px] flex flex-col gap-4 shadow-md">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-vibrant-purple-dark font-mono">
                • C. Formula Matematika Nested Corner Radius Rule
              </span>
              <span className="px-3 py-1 rounded-full bg-vibrant-purple/20 text-vibrant-purple-dark font-mono text-xs font-bold border border-vibrant-purple/40">
                Inner Radius = Outer Radius - Padding
              </span>
            </div>

            <div className="p-4 bg-surface-soft border border-hairline-soft rounded-[12px] flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-bold text-ink flex-wrap gap-2">
                <span>Contoh Kalkulasi Sub-Container Bersarang (Inner Child):</span>
                <span className="font-mono text-vibrant-purple-dark">Modal (16px) - Padding (8px) = Inner Element (8px)</span>
              </div>
              <p className="text-xs text-ink-secondary leading-normal">
                Prinsip ini menjaga konsistensi optik sudut bersarang dan mencegah kelengkungan elemen dalam tampak "menembus" atau canggung terhadap bingkai luarnya.
              </p>
            </div>
          </div>

          {/* SECTION D: Corner Shapes Specification Matrix Table */}
          <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • D. Tabel Spesifikasi Corner Shapes & Aturan Penggunaan Komponen
            </span>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-hairline bg-surface-soft text-ink">
                    <th className="py-2.5 px-3 font-bold">Corner Shape Name</th>
                    <th className="py-2.5 px-3 font-bold font-mono">Tailwind Utility Class</th>
                    <th className="py-2.5 px-3 font-bold">Ukuran Pixel (px)</th>
                    <th className="py-2.5 px-3 font-bold">Karakteristik Visual</th>
                    <th className="py-2.5 px-3 font-bold">Standar Penggunaan Komponen (Best Practice)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline-soft font-mono text-[11px] text-ink-secondary">
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Sharp</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">rounded-none</td>
                    <td className="py-2.5 px-3 text-ink font-bold">0px</td>
                    <td className="py-2.5 px-3 font-sans">Sudut Tajam Sempurna (90°)</td>
                    <td className="py-2.5 px-3 font-sans">Header sel tabel data, divider pembatas modul, & panel tepi penuh</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Small</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">rounded-[4px] / rounded-sm</td>
                    <td className="py-2.5 px-3 text-ink font-bold">4px</td>
                    <td className="py-2.5 px-3 font-sans">Kelengkungan Mikro Lembut</td>
                    <td className="py-2.5 px-3 font-sans">Input field kecil, button compact, checkbox, radio & tooltip small</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Medium</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">rounded-[8px] / rounded-md</td>
                    <td className="py-2.5 px-3 text-ink font-bold">8px</td>
                    <td className="py-2.5 px-3 font-sans">Kelengkungan Modul Standar</td>
                    <td className="py-2.5 px-3 font-sans">Card biasa, Scorecard KPI, Widget statistik & dropdown item container</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Large</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">rounded-[16px] / rounded-2xl</td>
                    <td className="py-2.5 px-3 text-ink font-bold">16px</td>
                    <td className="py-2.5 px-3 font-sans">Kelengkungan Panel Luar</td>
                    <td className="py-2.5 px-3 font-sans">Modal Dialog, Drawer Panel, Floating Container & Hero Banner Card</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Pill / Fully Rounded</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">rounded-full</td>
                    <td className="py-2.5 px-3 text-ink font-bold">9999px</td>
                    <td className="py-2.5 px-3 font-sans">Kapsul Bulat Sempurna</td>
                    <td className="py-2.5 px-3 font-sans">BadgeApp, AvatarApp, Tag Status, & Floating Action Button (FAB)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 06. ICONOGRAPHY */}
      {activeTab === "iconography" && (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <TextApp id="found-icon-title" variant="h3" className="font-bold text-ink">
              06. Iconography System & Catalog Matrix (Lucide Icons)
            </TextApp>
            <TextApp id="found-icon-desc" variant="body" className="text-xs text-ink-secondary">
              Fondasi Ikonografi P4D BPKAD Kota Yogyakarta: <code className="font-mono text-vibrant-purple-dark font-bold">Line vs Solid vs System Icons</code>, <code className="font-mono text-vibrant-purple-dark font-bold">Ukuran Standar (16px, 20px, 24px, 32px)</code>, <code className="font-mono text-vibrant-purple-dark font-bold">Stroke Width (1.5px - 2.5px)</code>, & <code className="font-mono text-vibrant-purple-dark font-bold">Corner Style (Rounded vs Sharp)</code>.
            </TextApp>
          </div>

          {/* SECTION A: Icon Styles (Line, Solid, System Icons) */}
          <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • A. Klasifikasi Gaya Ikon (Line, Solid, & System Icons)
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Line Icons */}
              <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">Line Icons (Outline)</span>
                  <BadgeApp id="badge-line-icons" variant="solidPurple" size="sm">Standard Outline</BadgeApp>
                </div>
                <p className="text-[11px] text-ink-secondary leading-normal">
                  Gaya garis vektor clean tanpa isian warna. Digunakan sebagai standar tombol, menu navigasi, & opsi form.
                </p>
                <div className="flex items-center justify-around p-3 bg-surface rounded-lg border border-hairline">
                  <Building2 className="w-6 h-6 text-vibrant-purple-dark" />
                  <FileText className="w-6 h-6 text-vibrant-purple-dark" />
                  <Bell className="w-6 h-6 text-vibrant-purple-dark" />
                  <Settings className="w-6 h-6 text-vibrant-purple-dark" />
                </div>
              </div>

              {/* Solid Icons */}
              <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">Solid Icons (Filled)</span>
                  <BadgeApp id="badge-solid-icons" variant="accent" size="sm">Filled Accent</BadgeApp>
                </div>
                <p className="text-[11px] text-ink-secondary leading-normal">
                  Gaya bertekstur penuh (filled). Digunakan untuk status aktif, indikator terpilih, badge notifikasi, & apresiasi.
                </p>
                <div className="flex items-center justify-around p-3 bg-surface rounded-lg border border-hairline">
                  <Bell className="w-6 h-6 text-vibrant-purple-dark fill-current" />
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-500/20" />
                  <Sparkles className="w-6 h-6 text-amber-500 fill-amber-400" />
                  <Info className="w-6 h-6 text-vibrant-purple-dark fill-vibrant-purple/30" />
                </div>
              </div>

              {/* System Icons */}
              <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">System Icons (Functional)</span>
                  <BadgeApp id="badge-system-icons" variant="solidPurple" size="sm">UI Controls</BadgeApp>
                </div>
                <p className="text-[11px] text-ink-secondary leading-normal">
                  Ikon aksi fungsional inti sistem: pencarian, penyaringan data, navigasi panah, pengunduhan & penambahan.
                </p>
                <div className="flex items-center justify-around p-3 bg-surface rounded-lg border border-hairline">
                  <Search className="w-6 h-6 text-ink" />
                  <Filter className="w-6 h-6 text-ink" />
                  <Download className="w-6 h-6 text-ink" />
                  <ChevronRight className="w-6 h-6 text-ink" />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION B: Standard Sizes (16px, 20px, 24px, 32px) */}
          <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • B. Ukuran Standar Ikon (16px, 20px, 24px, 32px)
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* 16px */}
              <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-3 text-center">
                <div className="w-12 h-12 bg-surface rounded-lg border border-hairline flex items-center justify-center">
                  <Bell className="w-4 h-4 text-vibrant-purple-dark" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-xs text-ink">16px (w-4 h-4)</span>
                  <span className="font-mono text-[10px] text-vibrant-purple-dark font-bold">Small / Inline</span>
                  <span className="text-[10px] text-ink-secondary">BadgeApp, sub-label & table inline action</span>
                </div>
              </div>

              {/* 20px */}
              <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-3 text-center">
                <div className="w-12 h-12 bg-surface rounded-lg border border-hairline flex items-center justify-center">
                  <Bell className="w-5 h-5 text-vibrant-purple-dark" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-xs text-ink">20px (w-5 h-5)</span>
                  <span className="font-mono text-[10px] text-vibrant-purple-dark font-bold">Medium / Default</span>
                  <span className="text-[10px] text-ink-secondary">ButtonApp standar, input prefix & nav menu</span>
                </div>
              </div>

              {/* 24px */}
              <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-3 text-center">
                <div className="w-12 h-12 bg-surface rounded-lg border border-hairline flex items-center justify-center">
                  <Bell className="w-6 h-6 text-vibrant-purple-dark" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-xs text-ink">24px (w-6 h-6)</span>
                  <span className="font-mono text-[10px] text-vibrant-purple-dark font-bold">Large / Header</span>
                  <span className="text-[10px] text-ink-secondary">Scorecard KPI, card header & section title</span>
                </div>
              </div>

              {/* 32px */}
              <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-3 text-center">
                <div className="w-12 h-12 bg-surface rounded-lg border border-hairline flex items-center justify-center">
                  <Bell className="w-8 h-8 text-vibrant-purple-dark" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-xs text-ink">32px (w-8 h-8)</span>
                  <span className="font-mono text-[10px] text-vibrant-purple-dark font-bold">Extra Large / Featured</span>
                  <span className="text-[10px] text-ink-secondary">Modal dialog header & empty state hero</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION C: Stroke Width & Corner Styles (Rounded vs Sharp) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stroke Width */}
            <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                • C. Stroke Width Standards (Ketebalan Garis)
              </span>

              <div className="grid grid-cols-3 gap-3 p-3 bg-surface-soft rounded-xl border border-hairline-soft text-center">
                <div className="flex flex-col items-center gap-2 p-3 bg-surface rounded-lg border border-hairline">
                  <ShieldAlert className="w-7 h-7 text-ink" strokeWidth={1.25} />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-ink">1.25px / 1.5px</span>
                    <span className="text-[10px] font-mono text-ink-muted">Thin / Elegant</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 p-3 bg-vibrant-purple/15 border border-vibrant-purple/40 rounded-lg">
                  <ShieldAlert className="w-7 h-7 text-vibrant-purple-dark" strokeWidth={1.75} />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-vibrant-purple-dark">1.75px / 2.0px</span>
                    <span className="text-[10px] font-mono text-vibrant-purple-dark font-bold">P4D Standard</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 p-3 bg-surface rounded-lg border border-hairline">
                  <ShieldAlert className="w-7 h-7 text-ink" strokeWidth={2.5} />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-ink">2.5px / 3.0px</span>
                    <span className="text-[10px] font-mono text-ink-muted">Bold Accent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner Style (Rounded vs Sharp) */}
            <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                • D. Corner Style (Rounded vs Sharp Line Cap & Join)
              </span>

              <div className="grid grid-cols-2 gap-3 p-3 bg-surface-soft rounded-xl border border-hairline-soft">
                {/* Rounded Style */}
                <div className="flex flex-col items-center gap-2 p-3 bg-vibrant-purple/15 border border-vibrant-purple/40 rounded-lg text-center">
                  <Building2
                    className="w-8 h-8 text-vibrant-purple-dark"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-vibrant-purple-dark">Rounded Style</span>
                    <span className="text-[10px] font-mono text-vibrant-purple-dark font-bold">round / round</span>
                    <span className="text-[10px] text-ink-secondary">Standar P4D (Sudut Lembut)</span>
                  </div>
                </div>

                {/* Sharp Style */}
                <div className="flex flex-col items-center gap-2 p-3 bg-surface border border-hairline rounded-lg text-center">
                  <Building2
                    className="w-8 h-8 text-ink"
                    strokeWidth={2}
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-ink">Sharp Style</span>
                    <span className="text-[10px] font-mono text-ink-muted">square / miter</span>
                    <span className="text-[10px] text-ink-secondary">Presisi Arsitektural</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION E: Iconography Specification Matrix Table */}
          <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • E. Tabel Spesifikasi Ikonografi System & Standar Penggunaan
            </span>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-hairline bg-surface-soft text-ink">
                    <th className="py-2.5 px-3 font-bold">Standard Size</th>
                    <th className="py-2.5 px-3 font-bold font-mono">Tailwind Utility</th>
                    <th className="py-2.5 px-3 font-bold">Stroke Width</th>
                    <th className="py-2.5 px-3 font-bold">Corner Finish</th>
                    <th className="py-2.5 px-3 font-bold">Gaya Ikon Utama</th>
                    <th className="py-2.5 px-3 font-bold">Rekomendasi Terkait Komponen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline-soft font-mono text-[11px] text-ink-secondary">
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">16px (Small)</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">w-4 h-4</td>
                    <td className="py-2.5 px-3">1.75px / 2.0px</td>
                    <td className="py-2.5 px-3 font-sans">Rounded (Linecap round)</td>
                    <td className="py-2.5 px-3 font-sans">Line / Solid Mini</td>
                    <td className="py-2.5 px-3 font-sans">BadgeApp, sub-label inline, & tabel inline action button</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">20px (Medium)</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">w-5 h-5</td>
                    <td className="py-2.5 px-3">1.75px / 2.0px</td>
                    <td className="py-2.5 px-3 font-sans">Rounded (Default P4D)</td>
                    <td className="py-2.5 px-3 font-sans">Line & System Icons</td>
                    <td className="py-2.5 px-3 font-sans">ButtonApp standar, Form Input Prefix, Dropdown trigger, & Sidebar Nav</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">24px (Large)</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">w-6 h-6</td>
                    <td className="py-2.5 px-3">1.75px / 2.0px</td>
                    <td className="py-2.5 px-3 font-sans">Rounded / Sharp Selectable</td>
                    <td className="py-2.5 px-3 font-sans">Line & Solid Icons</td>
                    <td className="py-2.5 px-3 font-sans">Scorecard KPI Header, Card Title Prefix, & Main Navigation Header</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">32px (Extra Large)</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">w-8 h-8</td>
                    <td className="py-2.5 px-3">1.5px / 2.0px</td>
                    <td className="py-2.5 px-3 font-sans">Rounded (Soft Curves)</td>
                    <td className="py-2.5 px-3 font-sans">Solid & Line Featured</td>
                    <td className="py-2.5 px-3 font-sans">Modal Dialog Header Icon, Featured Hero Widget, & Empty State Ilustrasi</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 07. MOTION & ANIMATION */}
      {activeTab === "motion" && (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <TextApp id="found-motion-title" variant="h3" className="font-bold text-ink">
              07. Motion, Keyframes & Animation Guidelines
            </TextApp>
            <TextApp id="found-motion-desc" variant="body" className="text-xs text-ink-secondary">
              Prinsip pergerakan P4D BPKAD Kota Yogyakarta: <code className="font-mono text-vibrant-purple-dark font-bold">Durations (Fast: 100ms, Normal: 200ms, Slow: 300ms)</code>, <code className="font-mono text-vibrant-purple-dark font-bold">Easing Curves (Ease-in, Ease-out, Linear)</code>, & <code className="font-mono text-vibrant-purple-dark font-bold">Loading Animations (Spinner speed, Skeleton shimmer)</code>.
            </TextApp>
          </div>

          {/* SECTION A: Durations (Fast 100ms, Normal 200ms, Slow 300ms) */}
          <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                • A. Durasi Transisi Standar (Fast: 100ms, Normal: 200ms, Slow: 300ms)
              </span>
              <ButtonApp
                id="btn-trigger-motion-sandbox"
                variant="secondary"
                size="sm"
                onClick={triggerMotionTest}
                className="gap-1.5 text-xs cursor-pointer"
              >
                <Play className={`w-3.5 h-3.5 ${isAnimating ? "text-vibrant-purple-dark animate-pulse" : ""}`} />
                Jalankan Simulasi Durasi
              </ButtonApp>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Fast: 100ms */}
              <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">Fast (100ms)</span>
                  <BadgeApp id="badge-motion-fast" variant="solidPurple" size="sm">duration-100</BadgeApp>
                </div>
                <p className="text-[11px] text-ink-secondary leading-normal">
                  Respon instan untuk umpan balik mikro seperti hover tombol, press active state, & toggle switch.
                </p>
                <div className="w-full bg-surface h-8 rounded-lg p-1 relative overflow-hidden border border-hairline">
                  <div
                    className={`h-full bg-emerald-500 rounded flex items-center justify-between px-2 text-[10px] font-bold text-white transition-all duration-100 ${
                      isAnimating ? "translate-x-[60%] bg-emerald-600" : "translate-x-0"
                    }`}
                  >
                    <span>Fast</span>
                    <span>100ms</span>
                  </div>
                </div>
              </div>

              {/* Normal: 200ms */}
              <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">Normal (200ms)</span>
                  <BadgeApp id="badge-motion-normal" variant="accent" size="sm">duration-200</BadgeApp>
                </div>
                <p className="text-[11px] text-ink-secondary leading-normal">
                  Standar default P4D untuk transisi UI umum: dropdown menu, toast notification, & tab switching.
                </p>
                <div className="w-full bg-surface h-8 rounded-lg p-1 relative overflow-hidden border border-hairline">
                  <div
                    className={`h-full bg-vibrant-purple-dark rounded flex items-center justify-between px-2 text-[10px] font-bold text-white transition-all duration-200 ${
                      isAnimating ? "translate-x-[60%] bg-vibrant-purple" : "translate-x-0"
                    }`}
                  >
                    <span>Normal</span>
                    <span>200ms</span>
                  </div>
                </div>
              </div>

              {/* Slow: 300ms */}
              <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">Slow (300ms)</span>
                  <BadgeApp id="badge-motion-slow" variant="solidPurple" size="sm">duration-300</BadgeApp>
                </div>
                <p className="text-[11px] text-ink-secondary leading-normal">
                  Gerakan luwes untuk pergeseran besar: drawer sidepanel, dialog entrance modal, & accordion expand.
                </p>
                <div className="w-full bg-surface h-8 rounded-lg p-1 relative overflow-hidden border border-hairline">
                  <div
                    className={`h-full bg-amber-500 rounded flex items-center justify-between px-2 text-[10px] font-bold text-white transition-all duration-300 ${
                      isAnimating ? "translate-x-[60%] bg-amber-600" : "translate-x-0"
                    }`}
                  >
                    <span>Slow</span>
                    <span>300ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION B: Easing Curves (Ease-in, Ease-out, Linear) */}
          <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • B. Easing Curves (Ease-in, Ease-out, Linear)
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Ease-in */}
              <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">Ease-in (Percepatan)</span>
                  <span className="font-mono text-[10px] text-vibrant-purple-dark font-bold">ease-in</span>
                </div>
                <p className="text-[11px] text-ink-secondary leading-normal">
                  Dimulai perlahan lalu makin cepat. Cocok untuk animasi <strong>exit / penutupan elemen</strong> yang keluar dari layar.
                </p>
                <div className="w-full bg-surface h-9 rounded-lg p-1 relative overflow-hidden border border-hairline">
                  <div
                    className={`h-full bg-purple-600 rounded flex items-center justify-center text-[10px] font-bold text-white transition-all duration-300 ease-in ${
                      isAnimating ? "translate-x-[70%]" : "translate-x-0"
                    }`}
                  >
                    cubic-bezier(0.4, 0, 1, 1)
                  </div>
                </div>
              </div>

              {/* Ease-out */}
              <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">Ease-out (Perlambatan)</span>
                  <span className="font-mono text-[10px] text-vibrant-purple-dark font-bold">ease-out (Default)</span>
                </div>
                <p className="text-[11px] text-ink-secondary leading-normal">
                  Dimulai cepat lalu melambat di akhir. Cocok untuk animasi <strong>entrance / kemunculan elemen</strong> ke layar.
                </p>
                <div className="w-full bg-surface h-9 rounded-lg p-1 relative overflow-hidden border border-hairline">
                  <div
                    className={`h-full bg-vibrant-purple-dark rounded flex items-center justify-center text-[10px] font-bold text-white transition-all duration-300 ease-out ${
                      isAnimating ? "translate-x-[70%]" : "translate-x-0"
                    }`}
                  >
                    cubic-bezier(0, 0, 0.2, 1)
                  </div>
                </div>
              </div>

              {/* Linear */}
              <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">Linear (Kecepatan Konstan)</span>
                  <span className="font-mono text-[10px] text-vibrant-purple-dark font-bold">linear</span>
                </div>
                <p className="text-[11px] text-ink-secondary leading-normal">
                  Kecepatan konstan tanpa kurva akselerasi. Digunakan untuk <strong>spinner putaran & progress bar kontinu</strong>.
                </p>
                <div className="w-full bg-surface h-9 rounded-lg p-1 relative overflow-hidden border border-hairline">
                  <div
                    className={`h-full bg-sky-600 rounded flex items-center justify-center text-[10px] font-bold text-white transition-all duration-300 linear ${
                      isAnimating ? "translate-x-[70%]" : "translate-x-0"
                    }`}
                  >
                    cubic-bezier(0, 0, 1, 1)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION C: Loading Animations (Spinner Speed & Skeleton Shimmer) */}
          <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • C. Loading Animations (Spinner Speed & Skeleton Shimmer)
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Spinner Speed Specs */}
              <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">1. Spinner Rotation Speed</span>
                  <BadgeApp id="badge-spinner-spec" variant="solidPurple" size="sm">Linear Motion</BadgeApp>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Standard Spinner (1.0s) */}
                  <div className="p-3 bg-surface border border-hairline rounded-lg flex flex-col items-center justify-center gap-2 text-center">
                    <Loader2 className="w-6 h-6 text-vibrant-purple-dark animate-spin" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-ink">Standard Spinner</span>
                      <span className="font-mono text-[10px] text-vibrant-purple-dark font-bold">1.0s / cycle</span>
                      <span className="text-[10px] text-ink-secondary">Loading async data & API fetch</span>
                    </div>
                  </div>

                  {/* Fast Spinner (0.6s) */}
                  <div className="p-3 bg-surface border border-hairline rounded-lg flex flex-col items-center justify-center gap-2 text-center">
                    <Loader2 className="w-6 h-6 text-amber-500 animate-spin" style={{ animationDuration: '0.6s' }} />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-ink">Fast Spinner</span>
                      <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold">0.6s / cycle</span>
                      <span className="text-[10px] text-ink-secondary">Action submit & instant validation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skeleton Shimmer Specs */}
              <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">2. Skeleton Shimmer & Pulse State</span>
                  <BadgeApp id="badge-skeleton-spec" variant="accent" size="sm">1.5s Ease-in-out</BadgeApp>
                </div>

                <div className="p-3 bg-surface border border-hairline rounded-lg flex flex-col gap-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-vibrant-purple/20 rounded-full animate-pulse shrink-0" />
                    <div className="flex flex-col gap-1.5 w-full">
                      <div className="h-3 bg-vibrant-purple/25 rounded animate-pulse w-3/4" />
                      <div className="h-2.5 bg-vibrant-purple/15 rounded animate-pulse w-1/2" />
                    </div>
                  </div>
                  <div className="h-8 bg-vibrant-purple/10 rounded-md animate-pulse w-full flex items-center justify-center text-[10px] font-mono text-ink-muted">
                    Loading Table Row Shimmer Placeholder
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION D: Motion Specification Matrix Table */}
          <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • D. Tabel Spesifikasi Motion & Keyframe Guidelines
            </span>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-hairline bg-surface-soft text-ink">
                    <th className="py-2.5 px-3 font-bold">Kategori Motion</th>
                    <th className="py-2.5 px-3 font-bold font-mono">Tailwind Utility Class</th>
                    <th className="py-2.5 px-3 font-bold">Durasi (ms / s)</th>
                    <th className="py-2.5 px-3 font-bold">Easing Curve</th>
                    <th className="py-2.5 px-3 font-bold">Skenario Penggunaan Respon UI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline-soft font-mono text-[11px] text-ink-secondary">
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Micro Fast Interaction</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">transition-all duration-100</td>
                    <td className="py-2.5 px-3 text-ink font-bold">100ms</td>
                    <td className="py-2.5 px-3 font-sans">ease-out</td>
                    <td className="py-2.5 px-3 font-sans">Hover tombol, press active state, toggle switch, & checkbox selection</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Normal UI Transition</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">transition-all duration-200</td>
                    <td className="py-2.5 px-3 text-ink font-bold">200ms</td>
                    <td className="py-2.5 px-3 font-sans">ease-out (Default P4D)</td>
                    <td className="py-2.5 px-3 font-sans">Dropdown menu display, toast alert entrance, tab content switch, & tooltip</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Slow Surface Movement</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">transition-all duration-300</td>
                    <td className="py-2.5 px-3 text-ink font-bold">300ms</td>
                    <td className="py-2.5 px-3 font-sans">ease-out / cubic-bezier(0.16, 1, 0.3, 1)</td>
                    <td className="py-2.5 px-3 font-sans">Drawer sidepanel slide-in, modal container expansion, & accordion toggle</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Loading Spinner (Standard)</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">animate-spin</td>
                    <td className="py-2.5 px-3 text-ink font-bold">1.0s (Infinite)</td>
                    <td className="py-2.5 px-3 font-sans">linear</td>
                    <td className="py-2.5 px-3 font-sans">Fetching async data, data table query, & sync indikator</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-ink">Skeleton Pulse Shimmer</td>
                    <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">animate-pulse</td>
                    <td className="py-2.5 px-3 text-ink font-bold">1.5s (Infinite)</td>
                    <td className="py-2.5 px-3 font-sans">ease-in-out</td>
                    <td className="py-2.5 px-3 font-sans">Placeholder loading state untuk data table, scorecard, & card widget</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SurfaceTokenCard({
  name,
  classUse,
  lightValue,
  darkValue,
  desc,
  modeFilter,
}: {
  name: string;
  classUse: string;
  lightValue: string;
  darkValue: string;
  desc: string;
  modeFilter: "all" | "light" | "dark";
}) {
  return (
    <div className="p-4 bg-surface border border-hairline rounded-2xl flex flex-col justify-between gap-3 shadow-2xs">
      <div className={`w-full h-14 rounded-xl ${classUse} flex items-center justify-center font-mono text-xs font-bold text-center p-2`}>
        {name.split(" ")[0]} Token
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-bold text-ink block truncate" title={name}>
          {name}
        </span>
        <p className="text-[11px] text-ink-secondary leading-normal">{desc}</p>
      </div>

      <div className="flex flex-col gap-1 pt-2 border-t border-hairline-soft font-mono text-[10px]">
        {(modeFilter === "all" || modeFilter === "light") && (
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
            <span className="flex items-center gap-1"><Sun className="w-3 h-3" /> Light:</span>
            <span className="font-bold">{lightValue}</span>
          </div>
        )}
        {(modeFilter === "all" || modeFilter === "dark") && (
          <div className="flex items-center justify-between text-purple-500 dark:text-purple-300">
            <span className="flex items-center gap-1"><Moon className="w-3 h-3" /> Dark:</span>
            <span className="font-bold">{darkValue}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function BlockColorCard({
  name,
  bgClass,
  lightBg,
  lightBorder,
  darkBg,
  darkBorder,
  varName,
  modeFilter,
}: {
  name: string;
  bgClass: string;
  lightBg: string;
  lightBorder: string;
  darkBg: string;
  darkBorder: string;
  varName: string;
  modeFilter: "all" | "light" | "dark";
}) {
  return (
    <div className="p-3 bg-surface border border-hairline rounded-2xl flex flex-col gap-2.5 shadow-2xs">
      <div className={`w-full h-14 rounded-xl ${bgClass} font-bold text-xs flex flex-col items-center justify-center border text-center p-1`}>
        <span>{name}</span>
        <span className="text-[9px] font-mono opacity-80">{varName}</span>
      </div>

      <div className="flex flex-col gap-1 font-mono text-[9px] text-ink-secondary pt-1">
        {(modeFilter === "all" || modeFilter === "light") && (
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
            <span className="flex items-center gap-0.5"><Sun className="w-2.5 h-2.5" /> L:</span>
            <span>{lightBg}</span>
          </div>
        )}
        {(modeFilter === "all" || modeFilter === "dark") && (
          <div className="flex items-center justify-between text-purple-500 dark:text-purple-300">
            <span className="flex items-center gap-0.5"><Moon className="w-2.5 h-2.5" /> D:</span>
            <span>{darkBg}</span>
          </div>
        )}
      </div>
    </div>
  );
}
