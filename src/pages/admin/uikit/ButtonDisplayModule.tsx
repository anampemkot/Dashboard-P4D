import * as React from "react";
import { ButtonApp, TextApp, BadgeApp } from "@/packages/design-system";
import {
  Layers,
  Settings,
  Code,
  Check,
  Plus,
  ArrowRight,
  Trash2,
  Download,
  Search,
  CheckCircle2,
  AlertTriangle,
  Send,
  Loader2,
  Building2,
  Sparkles,
  RefreshCw,
  Eye,
} from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { cn } from "@/lib/utils";

export function ButtonDisplayModule() {
  // Live Playground State
  const [playVariant, setPlayVariant] = React.useState<
    | "primary"
    | "secondary"
    | "ghost"
    | "icon"
    | "danger"
    | "outline"
    | "yellow"
    | "blue"
    | "purple"
    | "purpleDark"
    | "white"
  >("primary");
  const [playSize, setPlaySize] = React.useState<"sm" | "md" | "lg" | "iconSm" | "iconMd" | "iconLg">("md");
  const [playRounded, setPlayRounded] = React.useState<"none" | "sm" | "md" | "lg" | "full">("md");
  const [playTheme, setPlayTheme] = React.useState<"default" | "playful">("default");
  const [playState, setPlayState] = React.useState<"default" | "disabled" | "loading">("default");
  const [playIconConfig, setPlayIconConfig] = React.useState<"none" | "left" | "right" | "both">("left");
  const [copied, setCopied] = React.useState<boolean>(false);

  // All Variants List
  const allVariants = [
    { id: "primary", name: "Primary", desc: "Solid Vibrant Purple (Aksi Utama)", color: "bg-vibrant-purple text-vibrant-purple-ink" },
    { id: "secondary", name: "Secondary", desc: "Surface Hairline Border (Aksi Sekunder)", color: "bg-surface text-ink border border-hairline" },
    { id: "ghost", name: "Ghost / Text", desc: "Transparent Hover Action (Tanpa Border)", color: "bg-transparent text-ink" },
    { id: "icon", name: "Icon Button", desc: "Container khusus Ikon saja", color: "bg-transparent text-ink" },
    { id: "danger", name: "Destructive", desc: "Solid Alert Red (Aksi Hapus/Bahaya)", color: "bg-accent text-white" },
    { id: "outline", name: "Outline", desc: "Transparent Border Outline", color: "bg-transparent border border-hairline text-ink" },
    { id: "yellow", name: "Yellow Accent", desc: "Vibrant Warm Yellow (Highlight/Notice)", color: "bg-vibrant-yellow text-vibrant-yellow-ink" },
    { id: "blue", name: "Blue Accent", desc: "Vibrant Soft Blue (Info/Sync)", color: "bg-vibrant-blue text-vibrant-blue-ink" },
    { id: "purple", name: "Purple Accent", desc: "Vibrant Fluid Purple", color: "bg-vibrant-purple text-vibrant-purple-ink" },
    { id: "purpleDark", name: "Purple Dark", desc: "Deep Tactile Violet", color: "bg-vibrant-purple-dark text-white" },
    { id: "white", name: "White Card Base", desc: "Surface Base Clean", color: "bg-surface text-ink border border-hairline" },
  ] as const;

  // Code string generator
  const isIconOnly = playVariant === "icon" || playSize.toString().startsWith("icon");
  const themeCode = playTheme === "playful" ? `\n  theme="playful"` : "";
  const leftIconCode = !isIconOnly && (playIconConfig === "left" || playIconConfig === "both") ? `\n  leftIcon={<Plus className="w-4 h-4" />}` : "";
  const rightIconCode = !isIconOnly && (playIconConfig === "right" || playIconConfig === "both") ? `\n  rightIcon={<ArrowRight className="w-4 h-4" />}` : "";
  const disabledCode = playState === "disabled" ? `\n  disabled` : "";
  const loadingCode = playState === "loading" ? `\n  isLoading` : "";

  const codeString = `<ButtonApp
  id="my-action-btn"
  variant="${playVariant}"
  size="${playSize}"
  rounded="${playRounded}"${themeCode}${leftIconCode}${rightIconCode}${disabledCode}${loadingCode}
>
  ${isIconOnly ? "" : "Simpan Data"}
</ButtonApp>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModuleCard
      id="uikit-button-module"
      icon={<Layers className="w-5 h-5 text-vibrant-purple-dark" />}
      title="ButtonApp (CVA Component Specs & Foundation Standard)"
      description="Spesifikasi resmi komponen ButtonApp P4D BPKAD Kota Yogyakarta. Seluruh varian tombol, tema, ukuran, state interaktif, dan corner radius disesuaikan secara presisi terhadap Foundation System."
    >
      <div className="flex flex-col gap-8">
        {/* SECTION 1: CORE & COLOR ACCENT VARIANTS SPECTRUM */}
        <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • 01. Spektrum Lengkap Varian Warna & Varian Utama (11 Variants)
            </span>
            <BadgeApp id="badge-button-foundation" variant="solidPurple" size="sm">
              Foundation Aligned
            </BadgeApp>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {allVariants.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col justify-between items-center text-center gap-2"
              >
                <span className="text-[11px] font-bold text-ink">{item.name}</span>
                <div className="py-2 flex items-center justify-center w-full">
                  <ButtonApp id={`btn-variant-${item.id}`} variant={item.id as any} size="sm" rounded="md">
                    {item.id === "icon" ? <Settings className="w-3.5 h-3.5" /> : "Aksi"}
                  </ButtonApp>
                </div>
                <span className="text-[9px] font-mono text-ink-secondary truncate w-full" title={item.desc}>
                  {item.id}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE STATES (Default, Hover, Active, Focus, Disabled, Loading) */}
        <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
            • 02. Button Interactive States (Default, Hover, Active, Focus, Disabled, & Loading)
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Default */}
            <div className="p-3.5 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-2.5 text-center">
              <span className="text-xs font-bold text-ink">1. Default</span>
              <ButtonApp id="btn-state-default" variant="primary" size="sm">
                Aksi Normal
              </ButtonApp>
              <span className="text-[10px] text-ink-secondary font-mono">100% Opacity</span>
            </div>

            {/* Hover */}
            <div className="p-3.5 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-2.5 text-center">
              <span className="text-xs font-bold text-ink">2. Hover State</span>
              <button className="px-3 py-1.5 text-xs font-semibold rounded-[8px] bg-vibrant-purple-dark text-white shadow-sm cursor-pointer transition-all">
                Hover State
              </button>
              <span className="text-[10px] text-ink-secondary font-mono">bg-vibrant-purple-dark</span>
            </div>

            {/* Active Press */}
            <div className="p-3.5 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-2.5 text-center">
              <span className="text-xs font-bold text-ink">3. Active Press</span>
              <button className="px-3 py-1.5 text-xs font-semibold rounded-[8px] bg-vibrant-purple-dark text-white scale-[0.96] shadow-inner cursor-pointer">
                Active Press
              </button>
              <span className="text-[10px] text-ink-secondary font-mono">scale-[0.98] micro</span>
            </div>

            {/* Focus Ring */}
            <div className="p-3.5 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-2.5 text-center">
              <span className="text-xs font-bold text-ink">4. Focus Ring</span>
              <button className="px-3 py-1.5 text-xs font-semibold rounded-[8px] bg-vibrant-purple text-vibrant-purple-ink ring-2 ring-vibrant-purple/60 ring-offset-1 cursor-pointer">
                Focus Ring
              </button>
              <span className="text-[10px] text-ink-secondary font-mono">ring-2 ring-purple</span>
            </div>

            {/* Disabled */}
            <div className="p-3.5 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-2.5 text-center">
              <span className="text-xs font-bold text-ink">5. Disabled</span>
              <ButtonApp id="btn-state-disabled" variant="primary" size="sm" disabled>
                Terkunci
              </ButtonApp>
              <span className="text-[10px] text-ink-secondary font-mono">opacity-50 pointer-events-none</span>
            </div>

            {/* Loading */}
            <div className="p-3.5 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-2.5 text-center">
              <span className="text-xs font-bold text-ink">6. Loading</span>
              <ButtonApp id="btn-state-loading" variant="primary" size="sm" isLoading loadingText="Memproses...">
                Simpan
              </ButtonApp>
              <span className="text-[10px] text-ink-secondary font-mono">Spinner & Disabled</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: BUTTON SIZES (Small 32px, Medium 40px, Large 48px & Icon Sizes) */}
        <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
            • 03. Standard Sizes (Small 32px, Medium 40px, Large 48px & Icon Containers)
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Small */}
            <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-3 text-center">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-ink">Small (sm)</span>
                <span className="font-mono text-[10px] text-vibrant-purple-dark font-bold">min-h-[32px] | text-xs (12px)</span>
              </div>
              <div className="flex items-center justify-center py-2 gap-2">
                <ButtonApp id="btn-size-sm" variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                  Tambah Opsi (32px)
                </ButtonApp>
                <ButtonApp id="btn-size-iconsm" variant="secondary" size="iconSm">
                  <Search className="w-3.5 h-3.5" />
                </ButtonApp>
              </div>
              <span className="text-[10px] text-ink-secondary">Tabel inline action, filter chip & form compact</span>
            </div>

            {/* Medium */}
            <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-3 text-center">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-ink">Medium (md - Default P4D)</span>
                <span className="font-mono text-[10px] text-vibrant-purple-dark font-bold">min-h-[40px] | text-sm (14px)</span>
              </div>
              <div className="flex items-center justify-center py-2 gap-2">
                <ButtonApp id="btn-size-md" variant="primary" size="md" leftIcon={<CheckCircle2 className="w-4 h-4" />}>
                  Simpan Perubahan (40px)
                </ButtonApp>
                <ButtonApp id="btn-size-iconmd" variant="secondary" size="iconMd">
                  <Settings className="w-4 h-4" />
                </ButtonApp>
              </div>
              <span className="text-[10px] text-ink-secondary">Standar default tombol aksi modul & form standar</span>
            </div>

            {/* Large */}
            <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-3 text-center">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-ink">Large (lg)</span>
                <span className="font-mono text-[10px] text-vibrant-purple-dark font-bold">min-h-[48px] | text-base (16px)</span>
              </div>
              <div className="flex items-center justify-center py-2 gap-2">
                <ButtonApp id="btn-size-lg" variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Lanjutkan Proses (48px)
                </ButtonApp>
                <ButtonApp id="btn-size-iconlg" variant="secondary" size="iconLg">
                  <Download className="w-5 h-5" />
                </ButtonApp>
              </div>
              <span className="text-[10px] text-ink-secondary">Hero CTA banner, modal submit utama & onboarding</span>
            </div>
          </div>
        </div>

        {/* SECTION 4: THEME VARIATIONS (Default vs Playful) */}
        <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
            • 04. Theme Variations (theme="default" vs theme="playful")
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Default Theme */}
            <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col gap-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-ink">Default Theme (<code className="font-mono text-[10px] text-vibrant-purple-dark">theme="default"</code>)</span>
                <BadgeApp id="badge-theme-default" variant="solidPurple" size="sm">Standard UI</BadgeApp>
              </div>
              <p className="text-[11px] text-ink-secondary">
                Tampilan bersih, profesional, dengan font sans bawaan & shadow subtle untuk antarmuka administratif BPKAD.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <ButtonApp id="btn-theme-def-pri" variant="primary" size="sm" theme="default">
                  Primary Standard
                </ButtonApp>
                <ButtonApp id="btn-theme-def-sec" variant="secondary" size="sm" theme="default">
                  Secondary
                </ButtonApp>
                <ButtonApp id="btn-theme-def-yel" variant="yellow" size="sm" theme="default">
                  Yellow Accent
                </ButtonApp>
              </div>
            </div>

            {/* Playful Theme */}
            <div className="p-4 bg-vibrant-purple/5 border border-vibrant-purple/20 rounded-xl flex flex-col gap-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                  Playful Theme (<code className="font-mono text-[10px] text-vibrant-purple-dark">theme="playful"</code>) <Sparkles className="w-3.5 h-3.5 text-vibrant-purple-dark" />
                </span>
                <BadgeApp id="badge-theme-playful" variant="accent" size="sm">Claymorphic</BadgeApp>
              </div>
              <p className="text-[11px] text-ink-secondary">
                Tampilan ekspresif dengan typography display & bayangan khusus (claymorphic inset) untuk highlight promosi/banner.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <ButtonApp id="btn-theme-play-pri" variant="primary" size="sm" theme="playful">
                  Primary Playful ✨
                </ButtonApp>
                <ButtonApp id="btn-theme-play-sec" variant="secondary" size="sm" theme="playful">
                  Secondary ✨
                </ButtonApp>
                <ButtonApp id="btn-theme-play-yel" variant="yellow" size="sm" theme="playful">
                  Yellow Playful ✨
                </ButtonApp>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: BORDER RADIUS & CORNER SHAPES (Foundation Variable Aligned) */}
        <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • 05. Alignment Border Radius & Corner Shapes (Foundation Variables)
            </span>
            <span className="font-mono text-[10px] text-vibrant-purple-dark font-bold">
              Variables: none (0px), sm (4px), md (8px), lg (16px), full (9999px)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {/* Sharp (0px) */}
            <div className="p-3.5 bg-surface-soft border border-hairline-soft rounded-none flex flex-col items-center justify-between gap-2.5 text-center">
              <span className="text-xs font-bold text-ink">Sharp (0px)</span>
              <ButtonApp id="btn-radius-none" variant="primary" size="sm" rounded="none">
                rounded="none"
              </ButtonApp>
              <span className="text-[10px] text-ink-secondary font-mono">0px Corner Radius</span>
            </div>

            {/* Small (4px) */}
            <div className="p-3.5 bg-surface-soft border border-hairline-soft rounded-[4px] flex flex-col items-center justify-between gap-2.5 text-center">
              <span className="text-xs font-bold text-ink">Small (4px)</span>
              <ButtonApp id="btn-radius-sm" variant="primary" size="sm" rounded="sm">
                rounded="sm"
              </ButtonApp>
              <span className="text-[10px] text-ink-secondary font-mono">4px Corner Radius</span>
            </div>

            {/* Medium (8px) */}
            <div className="p-3.5 bg-surface-soft border border-hairline-soft rounded-[8px] flex flex-col items-center justify-between gap-2.5 text-center">
              <span className="text-xs font-bold text-ink">Medium (8px)</span>
              <ButtonApp id="btn-radius-md" variant="primary" size="sm" rounded="md">
                rounded="md"
              </ButtonApp>
              <span className="text-[10px] text-ink-secondary font-mono">8px Corner (Default)</span>
            </div>

            {/* Large (16px) */}
            <div className="p-3.5 bg-surface-soft border border-hairline-soft rounded-[16px] flex flex-col items-center justify-between gap-2.5 text-center">
              <span className="text-xs font-bold text-ink">Large (16px)</span>
              <ButtonApp id="btn-radius-lg" variant="primary" size="sm" rounded="lg">
                rounded="lg"
              </ButtonApp>
              <span className="text-[10px] text-ink-secondary font-mono">16px Corner Radius</span>
            </div>

            {/* Pill (Full) */}
            <div className="p-3.5 bg-surface-soft border border-hairline-soft rounded-full flex flex-col items-center justify-between gap-2.5 text-center">
              <span className="text-xs font-bold text-ink">Pill / Full</span>
              <ButtonApp id="btn-radius-full" variant="primary" size="sm" rounded="full">
                rounded="full"
              </ButtonApp>
              <span className="text-[10px] text-ink-secondary font-mono">9999px Pill Radius</span>
            </div>
          </div>
        </div>

        {/* SECTION 6: LIVE INTERACTIVE BUILDER PLAYGROUND */}
        <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-hairline-soft pb-2.5">
            <Settings className="w-4 h-4 text-vibrant-purple-dark" />
            <span className="text-xs font-bold text-ink uppercase tracking-wider">
              • 06. Live Interactive Builder Playground (Konfigurasi Lengkap ButtonApp)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Control Knobs */}
            <div className="flex flex-col gap-4 text-left">
              {/* Variant Selector */}
              <div>
                <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                  1. Select Variant (<code className="text-vibrant-purple-dark">variant="..."</code>)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      "primary",
                      "secondary",
                      "ghost",
                      "icon",
                      "danger",
                      "outline",
                      "yellow",
                      "blue",
                      "purple",
                      "purpleDark",
                      "white",
                    ] as const
                  ).map((v) => (
                    <button
                      key={v}
                      onClick={() => setPlayVariant(v)}
                      className={cn(
                        "px-2 py-1 text-[11px] font-semibold rounded-[6px] border transition-all cursor-pointer",
                        playVariant === v
                          ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark shadow-xs"
                          : "bg-surface-soft text-ink-secondary border-hairline-soft hover:bg-surface hover:text-ink"
                      )}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size & Corner Radius */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                    2. Select Size (<code className="text-vibrant-purple-dark">size="..."</code>)
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {(["sm", "md", "lg", "iconSm", "iconMd", "iconLg"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setPlaySize(s)}
                        className={cn(
                          "px-2 py-1 text-[10px] font-semibold rounded-[6px] border transition-all cursor-pointer",
                          playSize === s
                            ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                            : "bg-surface-soft text-ink-secondary border-hairline-soft hover:bg-surface"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                    3. Corner Radius (<code className="text-vibrant-purple-dark">rounded="..."</code>)
                  </span>
                  <div className="flex gap-1">
                    {(["none", "sm", "md", "lg", "full"] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setPlayRounded(r)}
                        className={cn(
                          "flex-1 px-1.5 py-1 text-[10px] font-semibold rounded-[6px] border transition-all cursor-pointer",
                          playRounded === r
                            ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                            : "bg-surface-soft text-ink-secondary border-hairline-soft hover:bg-surface"
                        )}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Theme, State & Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                    4. Theme Mode
                  </span>
                  <div className="flex gap-1">
                    {(["default", "playful"] as const).map((tm) => (
                      <button
                        key={tm}
                        onClick={() => setPlayTheme(tm)}
                        className={cn(
                          "flex-1 px-1.5 py-1 text-[10px] font-semibold rounded-[6px] border transition-all cursor-pointer capitalize",
                          playTheme === tm
                            ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                            : "bg-surface-soft text-ink-secondary border-hairline-soft hover:bg-surface"
                        )}
                      >
                        {tm}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                    5. Interactive State
                  </span>
                  <div className="flex gap-1">
                    {(["default", "disabled", "loading"] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setPlayState(st)}
                        className={cn(
                          "flex-1 px-1 py-1 text-[10px] font-semibold rounded-[6px] border transition-all cursor-pointer capitalize",
                          playState === st
                            ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                            : "bg-surface-soft text-ink-secondary border-hairline-soft hover:bg-surface"
                        )}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                    6. Icon Placement
                  </span>
                  <div className="flex gap-1">
                    {(["none", "left", "right", "both"] as const).map((ic) => (
                      <button
                        key={ic}
                        onClick={() => setPlayIconConfig(ic)}
                        className={cn(
                          "flex-1 px-1 py-1 text-[10px] font-semibold rounded-[6px] border transition-all cursor-pointer capitalize",
                          playIconConfig === ic
                            ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                            : "bg-surface-soft text-ink-secondary border-hairline-soft hover:bg-surface"
                        )}
                      >
                        {ic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Output & Code Snippet */}
            <div className="flex flex-col justify-between gap-4 bg-surface-soft p-4 rounded-xl border border-hairline-soft">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                  Live Preview Output
                </span>
                <div className="min-h-[120px] bg-surface rounded-lg p-4 border border-hairline border-dashed flex items-center justify-center">
                  <ButtonApp
                    id="playground-button-output"
                    variant={playVariant}
                    size={playSize}
                    rounded={playRounded}
                    theme={playTheme}
                    disabled={playState === "disabled"}
                    isLoading={playState === "loading"}
                    loadingText="Memproses..."
                    leftIcon={
                      !isIconOnly && (playIconConfig === "left" || playIconConfig === "both") ? (
                        <Plus className={playSize === "sm" || playSize === "iconSm" ? "w-3.5 h-3.5" : playSize === "lg" || playSize === "iconLg" ? "w-5 h-5" : "w-4 h-4"} />
                      ) : undefined
                    }
                    rightIcon={
                      !isIconOnly && (playIconConfig === "right" || playIconConfig === "both") ? (
                        <ArrowRight className={playSize === "sm" || playSize === "iconSm" ? "w-3.5 h-3.5" : playSize === "lg" || playSize === "iconLg" ? "w-5 h-5" : "w-4 h-4"} />
                      ) : undefined
                    }
                  >
                    {isIconOnly ? (
                      <Settings className={playSize === "sm" || playSize === "iconSm" ? "w-3.5 h-3.5" : playSize === "lg" || playSize === "iconLg" ? "w-5 h-5" : "w-4 h-4"} />
                    ) : (
                      "Simpan Data"
                    )}
                  </ButtonApp>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider flex items-center gap-1">
                    <Code className="w-3.5 h-3.5" /> Generated JSX Code
                  </span>
                  <button
                    onClick={copyCode}
                    className="px-2 py-0.5 text-[10px] font-bold bg-vibrant-purple/15 text-vibrant-purple-dark hover:bg-vibrant-purple/25 rounded transition-all cursor-pointer inline-flex items-center gap-1"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" /> Copied!
                      </>
                    ) : (
                      "Copy JSX"
                    )}
                  </button>
                </div>
                <pre className="text-[10px] font-mono bg-surface p-3 rounded-md border border-hairline text-ink leading-relaxed overflow-x-auto">
                  {codeString}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 7: SPECIFICATION MATRIX TABLE */}
        <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
            • 07. Tabel Spesifikasi Komponen ButtonApp & Standard P4D BPKAD
          </span>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-hairline bg-surface-soft text-ink">
                  <th className="py-2.5 px-3 font-bold">Varian Button</th>
                  <th className="py-2.5 px-3 font-bold font-mono">Tailwind / CVA Class</th>
                  <th className="py-2.5 px-3 font-bold">Standard Size (Min-Height)</th>
                  <th className="py-2.5 px-3 font-bold">Corner Radius (Default)</th>
                  <th className="py-2.5 px-3 font-bold">Aturan Penggunaan Komponen BPKAD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline-soft font-mono text-[11px] text-ink-secondary">
                <tr>
                  <td className="py-2.5 px-3 font-sans font-bold text-ink">Primary</td>
                  <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">variant="primary"</td>
                  <td className="py-2.5 px-3 text-ink font-bold">40px (md) / 32px (sm)</td>
                  <td className="py-2.5 px-3 font-sans">rounded="md" (8px)</td>
                  <td className="py-2.5 px-3 font-sans">Aksi utama tunggal pada halaman/form (Submit, Simpan, Konfirmasi Utama)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-bold text-ink">Secondary</td>
                  <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">variant="secondary"</td>
                  <td className="py-2.5 px-3 text-ink font-bold">40px (md) / 32px (sm)</td>
                  <td className="py-2.5 px-3 font-sans">rounded="md" (8px)</td>
                  <td className="py-2.5 px-3 font-sans">Aksi pendamping (Batal, Reset, Filter Data, Export Laporan)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-bold text-ink">Ghost / Text</td>
                  <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">variant="ghost"</td>
                  <td className="py-2.5 px-3 text-ink font-bold">40px (md) / 32px (sm)</td>
                  <td className="py-2.5 px-3 font-sans">rounded="md" (8px)</td>
                  <td className="py-2.5 px-3 font-sans">Aksi sekunder ringan tanpa gangguan visual (Detail link, Buka Lebih Banyak)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-bold text-ink">Icon Button</td>
                  <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">variant="icon" / size="iconMd"</td>
                  <td className="py-2.5 px-3 text-ink font-bold">40px x 40px / 32px x 32px</td>
                  <td className="py-2.5 px-3 font-sans">rounded="md" / rounded="full"</td>
                  <td className="py-2.5 px-3 font-sans">Tombol kontrol khusus ikon (Pengaturan, Tutup Modal, Search Trigger, Notification)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-bold text-ink">Destructive / Danger</td>
                  <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">variant="danger"</td>
                  <td className="py-2.5 px-3 text-ink font-bold">40px (md) / 32px (sm)</td>
                  <td className="py-2.5 px-3 font-sans">rounded="md" (8px)</td>
                  <td className="py-2.5 px-3 font-sans">Aksi berisiko tinggi / tidak dapat dikembalikan (Hapus Data, Batalkan Transaksi)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-bold text-ink">Outline</td>
                  <td className="py-2.5 px-3 text-vibrant-purple-dark font-bold">variant="outline"</td>
                  <td className="py-2.5 px-3 text-ink font-bold">40px (md) / 32px (sm)</td>
                  <td className="py-2.5 px-3 font-sans">rounded="md" (8px)</td>
                  <td className="py-2.5 px-3 font-sans">Tombol dengan garis luar tanpa latar belakang solid</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ModuleCard>
  );
}

