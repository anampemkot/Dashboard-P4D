import * as React from "react";
import {
  AlertApp,
  AlertIconApp,
  AlertTitleApp,
  AlertDescriptionApp,
  AlertActionApp,
  ButtonApp,
  TextApp,
} from "@/packages/design-system";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  Terminal,
  Code,
  Check,
  Settings,
  X,
} from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { cn } from "@/lib/utils";

export function AlertDisplayModule() {
  // Live Playground State
  const [playVariant, setPlayVariant] = React.useState<
    "default" | "info" | "success" | "warning" | "error" | "brand"
  >("info");
  const [playSize, setPlaySize] = React.useState<"sm" | "md" | "lg">("md");
  const [playRounded, setPlayRounded] = React.useState<
    "default" | "none" | "sm" | "md" | "lg" | "full" | "pill" | "card"
  >("default");
  const [playTheme, setPlayTheme] = React.useState<"default" | "playful">("default");
  const [playTitle, setPlayTitle] = React.useState<string>("Sinkronisasi Data Pokok");
  const [playDesc, setPlayDesc] = React.useState<string>(
    "Sistem sedang menyelaraskan data anggaran daerah dengan SIPD Nasional secara real-time."
  );
  const [showAction, setShowAction] = React.useState<boolean>(true);
  const [copied, setCopied] = React.useState<boolean>(false);

  // Lists of options
  const allVariants = [
    { id: "default", name: "Default (Slate)" },
    { id: "info", name: "Info (Blue)" },
    { id: "success", name: "Success (Green)" },
    { id: "warning", name: "Warning (Yellow)" },
    { id: "error", name: "Error (Red)" },
    { id: "brand", name: "Brand (Purple)" },
  ] as const;

  const allSizes = [
    { id: "sm", name: "Small (sm)", desc: "Compact padding and smaller typography for status bars" },
    { id: "md", name: "Medium (md)", desc: "Standard contextual notification block sizing" },
    { id: "lg", name: "Large (lg)", desc: "Prominent informational announcements with generous spacing" },
  ] as const;

  const allRounded = [
    { id: "default", name: "Default (rounded-sm)" },
    { id: "none", name: "None (rounded-none)" },
    { id: "sm", name: "sm (rounded-sm)" },
    { id: "md", name: "md (rounded-md)" },
    { id: "lg", name: "lg (rounded-lg)" },
    { id: "full", name: "full (rounded-full)" },
    { id: "pill", name: "pill (rounded-pill-custom)" },
    { id: "card", name: "card (rounded-card-custom)" },
  ] as const;

  // Icon selector based on active variant
  const getVariantIcon = (variant: typeof playVariant) => {
    switch (variant) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "brand":
        return <Terminal className="w-5 h-5 text-vibrant-purple-dark" />;
      case "info":
        return <Info className="w-5 h-5 text-vibrant-blue-dark" />;
      default:
        return <Info className="w-5 h-5 text-ink-muted" />;
    }
  };

  const getVariantIconJSX = (variant: typeof playVariant) => {
    switch (variant) {
      case "success":
        return "<CheckCircle2 className=\"w-5 h-5 text-success\" />";
      case "warning":
        return "<AlertTriangle className=\"w-5 h-5 text-warning\" />";
      case "error":
        return "<AlertCircle className=\"w-5 h-5 text-red-500\" />";
      case "brand":
        return "<Terminal className=\"w-5 h-5 text-vibrant-purple-dark\" />";
      default:
        return "<Info className=\"w-5 h-5 text-vibrant-blue-dark\" />";
    }
  };

  // Build the code string
  const sizeProp = playSize === "md" ? "" : `\n  size="${playSize}"`;
  const roundedProp = playRounded === "default" ? "" : `\n  rounded="${playRounded}"`;
  const themeProp = playTheme === "default" ? "" : `\n  theme="playful"`;
  const actionJSX = showAction
    ? `\n  <AlertActionApp id="alert-action">\n    <ButtonApp id="btn-action" size="sm" variant="secondary">Tinjau</ButtonApp>\n  </AlertActionApp>`
    : "";

  const codeString = `<AlertApp\n  id="demo-alert"\n  variant="${playVariant}"${sizeProp}${roundedProp}${themeProp}\n>\n  <AlertIconApp id="alert-icon">\n    ${getVariantIconJSX(
    playVariant
  )}\n  </AlertIconApp>\n  <div>\n    <AlertTitleApp id="alert-title">${playTitle}</AlertTitleApp>\n    <AlertDescriptionApp id="alert-desc">\n      ${playDesc}\n    </AlertDescriptionApp>\n  </div>${actionJSX}\n</AlertApp>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModuleCard
      id="uikit-alert-module"
      icon={<AlertCircle className="w-5 h-5 text-vibrant-purple-dark" />}
      title="AlertApp (CVA Component Specs)"
      description="Elemen banner notifikasi kontekstual untuk menyampaikan status sistem, instruksi, atau umpan balik pengguna dengan komposisi layout fleksibel."
    >
      {/* SECTION 1: LIVE INTERACTIVE BUILDER */}
      <div className="space-y-4 bg-vibrant-grey-bg/30 p-4 md:p-6 rounded-card-custom border border-hairline-soft/80">
        <div className="flex items-center gap-2 border-b border-hairline-soft pb-2.5">
          <Settings className="w-4 h-4 text-vibrant-purple-dark" />
          <span className="text-xs font-bold font-display text-ink uppercase tracking-wider">
            1. Live Alert Playground (Konfigurasi Dinamis)
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 text-left">
          {/* Controls Column */}
          <div className="space-y-4">
            {/* Input fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                  Alert Title
                </span>
                <input
                  type="text"
                  value={playTitle}
                  onChange={(e) => setPlayTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded border border-hairline-soft bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-vibrant-purple"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                  Alert Description
                </span>
                <input
                  type="text"
                  value={playDesc}
                  onChange={(e) => setPlayDesc(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded border border-hairline-soft bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-vibrant-purple"
                />
              </div>
            </div>

            {/* Variant Knobs */}
            <div>
              <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                Variant (Color Concept) <code className="text-vibrant-purple-dark text-[9px] lowercase font-mono">variant="..."</code>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {allVariants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setPlayVariant(v.id as any)}
                    className={cn(
                      "px-2.5 py-1 text-xs font-semibold rounded border transition-all cursor-pointer",
                      playVariant === v.id
                        ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark shadow-xs"
                        : "bg-surface text-ink-secondary border-hairline-soft hover:bg-surface-soft hover:text-ink"
                    )}
                  >
                    {v.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes & Corners Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Size Select */}
              <div>
                <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                  Size <code className="text-vibrant-purple-dark text-[9px] lowercase font-mono">size="..."</code>
                </span>
                <div className="flex gap-1.5">
                  {allSizes.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setPlaySize(s.id as any)}
                      className={cn(
                        "flex-1 px-2.5 py-1 text-xs font-semibold rounded border transition-all cursor-pointer",
                        playSize === s.id
                          ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                          : "bg-surface text-ink-secondary border-hairline-soft hover:bg-surface-soft"
                      )}
                    >
                      {s.id.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme toggle */}
              <div>
                <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                  Design Theme <code className="text-vibrant-purple-dark text-[9px] lowercase font-mono">theme="..."</code>
                </span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setPlayTheme("default")}
                    className={cn(
                      "flex-1 px-2.5 py-1 text-xs font-semibold rounded border transition-all cursor-pointer",
                      playTheme === "default"
                        ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                        : "bg-surface text-ink-secondary border-hairline-soft hover:bg-surface-soft"
                    )}
                  >
                    default
                  </button>
                  <button
                    onClick={() => setPlayTheme("playful")}
                    className={cn(
                      "flex-1 px-2.5 py-1 text-xs font-semibold rounded border transition-all cursor-pointer font-display",
                      playTheme === "playful"
                        ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                        : "bg-surface text-ink-secondary border-hairline-soft hover:bg-surface-soft"
                    )}
                  >
                    playful ✨
                  </button>
                </div>
              </div>
            </div>

            {/* Corner Radius & Actions Option */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Rounded Corner Selector */}
              <div>
                <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                  Rounded Corners <code className="text-vibrant-purple-dark text-[9px] lowercase font-mono">rounded="..."</code>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {allRounded.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setPlayRounded(r.id as any)}
                      className={cn(
                        "px-2.5 py-1 text-xs font-semibold rounded border transition-all cursor-pointer",
                        playRounded === r.id
                          ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark shadow-xs"
                          : "bg-surface text-ink-secondary border-hairline-soft hover:bg-surface-soft hover:text-ink"
                      )}
                    >
                      {r.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Show Actions toggle */}
              <div>
                <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                  Action Block Simulator
                </span>
                <div className="flex items-center gap-3 bg-surface p-2 rounded border border-hairline-soft">
                  <input
                    type="checkbox"
                    id="chk-show-action"
                    checked={showAction}
                    onChange={(e) => setShowAction(e.target.checked)}
                    className="accent-vibrant-purple h-4 w-4 rounded cursor-pointer"
                  />
                  <label htmlFor="chk-show-action" className="text-xs font-medium text-ink-secondary cursor-pointer select-none">
                    Render AlertActionApp (Tombol Opsi)
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Result & Code Column */}
          <div className="flex flex-col justify-between gap-4 bg-surface p-4 rounded-box-custom border border-hairline-soft shadow-inner">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block">Live Output Preview</span>
              <div className="min-h-[110px] flex items-center justify-center bg-vibrant-grey-bg/15 rounded-sm p-4 border border-hairline-soft border-dashed">
                <AlertApp
                  id="playground-interactive-alert"
                  variant={playVariant}
                  size={playSize}
                  rounded={playRounded}
                  theme={playTheme}
                >
                  <AlertIconApp id="playground-interactive-alert-icon">
                    {getVariantIcon(playVariant)}
                  </AlertIconApp>
                  <div className="flex-1">
                    <AlertTitleApp id="playground-interactive-alert-title">{playTitle}</AlertTitleApp>
                    <AlertDescriptionApp id="playground-interactive-alert-desc">{playDesc}</AlertDescriptionApp>
                  </div>
                  {showAction && (
                    <AlertActionApp id="playground-interactive-alert-action">
                      <ButtonApp
                        id="playground-interactive-alert-action-btn"
                        variant="secondary"
                        size="sm"
                        onClick={() => alert("Action triggered!")}
                      >
                        Selesaikan
                      </ButtonApp>
                    </AlertActionApp>
                  )}
                </AlertApp>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider flex items-center gap-1">
                  <Code className="w-3.5 h-3.5" /> JSX Code Specimen
                </span>
                <button
                  onClick={copyCode}
                  className="px-2 py-0.5 text-[9px] font-bold bg-vibrant-purple/10 text-vibrant-purple-dark hover:bg-vibrant-purple/20 rounded transition-all cursor-pointer inline-flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-success" /> Copied!
                    </>
                  ) : (
                    "Copy JSX"
                  )}
                </button>
              </div>
              <pre className="text-[10px] font-mono bg-vibrant-grey-bg/60 p-2.5 rounded border border-hairline-soft text-left text-ink-muted overflow-x-auto leading-relaxed">
                {codeString}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: THEMED PRESET EXAMPLES */}
      <div className="space-y-4 pt-4 border-t border-hairline-soft/80 text-left">
        <div>
          <TextApp id="alert-sec-presets-title" variant="mono" className="text-[11px] font-bold text-vibrant-purple-dark uppercase block">
            2. Contoh Presedensi &amp; Kasus Riil
          </TextApp>
          <span className="text-xs text-ink-secondary leading-relaxed">
            Berikut adalah simulasi pemberitahuan administratif dengan skenario denda, peringatan, dan status real-time di ekosistem P4D.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Preset 1: Error Denda Pajak */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-ink-muted uppercase">Denda Pajak Terlambat (Variant: Error, Rounded: Card)</span>
            <AlertApp id="preset-alert-error" variant="error" rounded="card">
              <AlertIconApp id="preset-alert-error-icon">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </AlertIconApp>
              <div className="flex-1">
                <AlertTitleApp id="preset-alert-error-title" className="text-red-700 dark:text-red-400">
                  Denda Keterlambatan SPTD Terdeteksi
                </AlertTitleApp>
                <AlertDescriptionApp id="preset-alert-error-desc" className="text-red-600/90 dark:text-red-300/80">
                  Wajib pajak denda sebesar Rp500.000,- dibebankan secara otomatis akibat pelaporan terlambat melewati batas tanggal 20.
                </AlertDescriptionApp>
              </div>
              <AlertActionApp id="preset-alert-error-action">
                <ButtonApp id="btn-preset-pay-error" variant="danger" size="sm" rounded="sm">
                  Bayar Denda
                </ButtonApp>
              </AlertActionApp>
            </AlertApp>
          </div>

          {/* Preset 2: Status Berhasil (Success) */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-ink-muted uppercase">Verifikasi Sukses (Variant: Success, Rounded: Pill)</span>
            <AlertApp id="preset-alert-success" variant="success" rounded="pill">
              <AlertIconApp id="preset-alert-success-icon">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </AlertIconApp>
              <div className="flex-1">
                <AlertTitleApp id="preset-alert-success-title">NPWPD Berhasil Terverifikasi</AlertTitleApp>
                <AlertDescriptionApp id="preset-alert-success-desc">
                  Data kepemilikan objek pajak denda administrasi hotel &amp; resto telah disetujui oleh BPKAD Kota Yogyakarta.
                </AlertDescriptionApp>
              </div>
            </AlertApp>
          </div>

          {/* Preset 3: Warning Pembatasan Sesi */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-ink-muted uppercase">Peringatan Keamanan (Variant: Warning, Rounded: default)</span>
            <AlertApp id="preset-alert-warning" variant="warning">
              <AlertIconApp id="preset-alert-warning-icon">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </AlertIconApp>
              <div className="flex-1">
                <AlertTitleApp id="preset-alert-warning-title">Sesi Aktif Segera Berakhir</AlertTitleApp>
                <AlertDescriptionApp id="preset-alert-warning-desc">
                  Anda akan keluar dari sistem admin secara otomatis dalam waktu 2 menit karena tidak ada aktivitas operasional.
                </AlertDescriptionApp>
              </div>
              <AlertActionApp id="preset-alert-warning-action">
                <ButtonApp id="btn-preset-stay-warning" variant="secondary" size="sm">
                  Perpanjang Sesi
                </ButtonApp>
              </AlertActionApp>
            </AlertApp>
          </div>

          {/* Preset 4: Playful Brand Alert */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-ink-muted uppercase">Gaya Playful Vibrant (Variant: Brand, Theme: Playful)</span>
            <AlertApp id="preset-alert-playful" variant="brand" theme="playful" rounded="card">
              <AlertIconApp id="preset-alert-playful-icon">
                <Terminal className="w-5 h-5 text-vibrant-purple-dark" />
              </AlertIconApp>
              <div className="flex-1">
                <AlertTitleApp id="preset-alert-playful-title">Analisis Cerdas Model AI</AlertTitleApp>
                <AlertDescriptionApp id="preset-alert-playful-desc">
                  Algoritma P4D memprediksi kenaikan kepatuhan wajib pajak hotel sebesar +8.2% pada kuartal depan melalui insentif terpadu.
                </AlertDescriptionApp>
              </div>
            </AlertApp>
          </div>
        </div>
      </div>
    </ModuleCard>
  );
}
