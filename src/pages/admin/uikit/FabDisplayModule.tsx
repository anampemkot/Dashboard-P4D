import * as React from "react";
import {
  Plus,
  Edit,
  Send,
  Sparkles,
  Download,
  FileSpreadsheet,
  QrCode,
  Layers,
  Copy,
  Check,
  RotateCw,
  Eye,
  Settings,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { FabApp, SpeedDialApp, SpeedDialAction, BadgeApp, ButtonApp } from "@/packages/design-system";
import { cn } from "@/lib/utils";

export function FabDisplayModule() {
  // Playground State
  const [playVariant, setPlayVariant] = React.useState<
    "primary" | "secondary" | "danger" | "yellow" | "blue" | "purpleDark"
  >("primary");
  const [playSize, setPlaySize] = React.useState<"sm" | "md" | "lg">("md");
  const [playElevation, setPlayElevation] = React.useState<"normal" | "high" | "vibrant">("vibrant");
  const [playRounded, setPlayRounded] = React.useState<"none" | "sm" | "md" | "lg" | "full">("full");
  const [isExtended, setIsExtended] = React.useState<boolean>(false);
  const [isSpeedDialMode, setIsSpeedDialMode] = React.useState<boolean>(false);
  const [speedDirection, setSpeedDirection] = React.useState<"top" | "left" | "right" | "bottom">("top");
  const [showBackdrop, setShowBackdrop] = React.useState<boolean>(false);
  const [lastActionText, setLastActionText] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState<boolean>(false);

  // Demo Speed Dial Actions
  const sampleActions: SpeedDialAction[] = [
    {
      id: "action-add",
      icon: <Plus className="w-4 h-4" />,
      label: "Buat Objek Pajak Baru",
      variant: "primary",
      onClick: () => setLastActionText("Memilih: Buat Objek Pajak Baru"),
    },
    {
      id: "action-export",
      icon: <FileSpreadsheet className="w-4 h-4" />,
      label: "Export Rekap Excel",
      variant: "blue",
      badge: "XLSX",
      onClick: () => setLastActionText("Memilih: Export Rekap Excel"),
    },
    {
      id: "action-qr",
      icon: <QrCode className="w-4 h-4" />,
      label: "Pindai Kode QR SKRD",
      variant: "yellow",
      onClick: () => setLastActionText("Memilih: Pindai Kode QR SKRD"),
    },
    {
      id: "action-delete",
      icon: <ShieldAlert className="w-4 h-4" />,
      label: "Tandai Anomali / Alert",
      variant: "danger",
      onClick: () => setLastActionText("Memilih: Tandai Anomali / Alert"),
    },
  ];

  // Code Generator
  const codeString = isSpeedDialMode
    ? `<SpeedDialApp
  id="uikit-speed-dial"
  variant="${playVariant}"
  size="${playSize}"
  elevation="${playElevation}"
  direction="${speedDirection}"
  showBackdrop={${showBackdrop}}
  actions={[
    { id: "add", icon: <Plus />, label: "Buat Laporan", onClick: () => {} },
    { id: "export", icon: <FileSpreadsheet />, label: "Export XLSX", variant: "blue" },
    { id: "qr", icon: <QrCode />, label: "Pindai QR", variant: "yellow" }
  ]}
/>`
    : `<FabApp
  id="uikit-fab-single"
  variant="${playVariant}"
  size="${playSize}"
  elevation="${playElevation}"
  rounded="${playRounded}"
  icon={<Plus className="w-5 h-5" />}
${isExtended ? '  label="Buat Laporan Baru"\n' : ""}  onClick={() => console.log("FAB Clicked")}
/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModuleCard
      id="uikit-fab-module"
      icon={<Layers className="w-5 h-5 text-vibrant-purple-dark" />}
      title="Floating Action Button (FAB) & Speed Dial"
      description="Spesifikasi resmi komponen FAB Single Action dan Speed Dial (Expandable Action Stack) BPKAD Kota Yogyakarta. Mendukung elevation shadow sangat menonjol, posisi melayang, hover state presisi, dan opsi ekspansi multi-aksi."
    >
      <div className="flex flex-col gap-8 text-left">
        {/* SECTION 1: SINGLE ACTION FAB SPECTRUM */}
        <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • 01. Single Action FAB Variants & Elevation Shadows
            </span>
            <BadgeApp id="badge-fab-elevation" variant="solidPurple" size="sm">
              Shadow & Elevation Aligned
            </BadgeApp>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {/* Primary */}
            <div className="p-3.5 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-3 text-center">
              <span className="text-[11px] font-bold text-ink">Primary Ambient</span>
              <div className="py-2">
                <FabApp id="fab-demo-primary" variant="primary" size="md" icon={<Plus className="w-5 h-5" />} />
              </div>
              <span className="text-[9px] font-mono text-ink-secondary">Vibrant Purple Glow</span>
            </div>

            {/* Secondary Surface */}
            <div className="p-3.5 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-3 text-center">
              <span className="text-[11px] font-bold text-ink">Secondary Surface</span>
              <div className="py-2">
                <FabApp id="fab-demo-sec" variant="secondary" size="md" icon={<Edit className="w-5 h-5" />} />
              </div>
              <span className="text-[9px] font-mono text-ink-secondary">Hairline Surface</span>
            </div>

            {/* Danger / Destructive */}
            <div className="p-3.5 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-3 text-center">
              <span className="text-[11px] font-bold text-ink">Destructive</span>
              <div className="py-2">
                <FabApp id="fab-demo-danger" variant="danger" size="md" icon={<ShieldAlert className="w-5 h-5" />} />
              </div>
              <span className="text-[9px] font-mono text-ink-secondary">Solid Alert Red</span>
            </div>

            {/* Yellow Accent */}
            <div className="p-3.5 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-3 text-center">
              <span className="text-[11px] font-bold text-ink">Yellow Warm</span>
              <div className="py-2">
                <FabApp id="fab-demo-yellow" variant="yellow" size="md" icon={<Sparkles className="w-5 h-5" />} />
              </div>
              <span className="text-[9px] font-mono text-ink-secondary">Vibrant Yellow</span>
            </div>

            {/* Blue Accent */}
            <div className="p-3.5 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-3 text-center">
              <span className="text-[11px] font-bold text-ink">Soft Blue</span>
              <div className="py-2">
                <FabApp id="fab-demo-blue" variant="blue" size="md" icon={<Send className="w-5 h-5" />} />
              </div>
              <span className="text-[9px] font-mono text-ink-secondary">Sync Blue</span>
            </div>

            {/* Purple Dark */}
            <div className="p-3.5 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-3 text-center">
              <span className="text-[11px] font-bold text-ink">Deep Purple</span>
              <div className="py-2">
                <FabApp id="fab-demo-dark" variant="purpleDark" size="md" icon={<Download className="w-5 h-5" />} />
              </div>
              <span className="text-[9px] font-mono text-ink-secondary">Tactile Violet</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: EXTENDED FAB & SIZES MATRIX */}
        <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
            • 02. Extended FAB (Icon + Text Label) & Standard Sizes (40px, 48px, 56px)
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Small (40px) */}
            <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-3 text-center">
              <div>
                <span className="text-xs font-bold text-ink block">Small FAB (sm)</span>
                <span className="font-mono text-[10px] text-vibrant-purple-dark font-bold">40px x 40px | Icon 18px</span>
              </div>
              <div className="flex items-center gap-3 py-2">
                <FabApp id="fab-size-sm-circle" variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} />
                <FabApp id="fab-size-sm-ext" variant="secondary" size="sm" icon={<Plus className="w-4 h-4" />} label="Tambah" />
              </div>
              <span className="text-[10px] text-ink-secondary">Komptibel untuk widget panel melayang kecil</span>
            </div>

            {/* Medium (48px - Standard) */}
            <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-3 text-center">
              <div>
                <span className="text-xs font-bold text-ink block">Medium FAB (md - Default)</span>
                <span className="font-mono text-[10px] text-vibrant-purple-dark font-bold">48px x 48px | Icon 20px</span>
              </div>
              <div className="flex items-center gap-3 py-2">
                <FabApp id="fab-size-md-circle" variant="primary" size="md" icon={<Plus className="w-5 h-5" />} />
                <FabApp id="fab-size-md-ext" variant="primary" size="md" icon={<Plus className="w-5 h-5" />} label="Buat Rekam Pajak" />
              </div>
              <span className="text-[10px] text-ink-secondary">Ukuran standar posisi bottom-right aplikasi admin</span>
            </div>

            {/* Large (56px) */}
            <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col items-center justify-between gap-3 text-center">
              <div>
                <span className="text-xs font-bold text-ink block">Large FAB (lg - High Prominence)</span>
                <span className="font-mono text-[10px] text-vibrant-purple-dark font-bold">56px x 56px | Icon 24px</span>
              </div>
              <div className="flex items-center gap-3 py-2">
                <FabApp id="fab-size-lg-circle" variant="yellow" size="lg" icon={<Sparkles className="w-6 h-6" />} />
                <FabApp id="fab-size-lg-ext" variant="purpleDark" size="lg" icon={<Send className="w-6 h-6" />} label="Kirim Permohonan" />
              </div>
              <span className="text-[10px] text-ink-secondary">Tombol aksi utama pada landing page / portal publik</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: SPEED DIAL (EXPANDABLE ACTION STACK) DEMO */}
        <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              • 03. Speed Dial Expandable FAB (Multi-Action Direction Matrix)
            </span>
            <BadgeApp id="badge-speed-dial" variant="accent" size="sm">
              Expandable Stack
            </BadgeApp>
          </div>

          <p className="text-xs text-ink-secondary leading-relaxed">
            Speed Dial mengubah FAB tunggal menjadi tumpukan pilihan aksi bertingkat saat diklik. Rotasi ikon otomatis (45 derajat) bertransisi secara mulus dari tanda tambah ke tombol penutup (X).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {/* Speed Dial Top */}
            <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col justify-between items-center text-center gap-8 min-h-[200px] relative overflow-visible z-10 hover:z-30 focus-within:z-30">
              <span className="text-xs font-bold text-ink">Expand Top (Default)</span>
              <div className="flex items-center justify-center relative py-6 w-full z-20">
                <SpeedDialApp
                  id="speed-dial-top"
                  direction="top"
                  variant="primary"
                  size="md"
                  actions={sampleActions}
                />
              </div>
              <span className="text-[10px] text-ink-secondary font-mono">direction="top"</span>
            </div>

            {/* Speed Dial Left */}
            <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col justify-between items-center text-center gap-8 min-h-[200px] relative overflow-visible z-10 hover:z-30 focus-within:z-30">
              <span className="text-xs font-bold text-ink">Expand Left</span>
              <div className="flex items-center justify-center relative py-6 w-full z-20">
                <SpeedDialApp
                  id="speed-dial-left"
                  direction="left"
                  variant="purpleDark"
                  size="md"
                  actions={sampleActions.slice(0, 3)}
                />
              </div>
              <span className="text-[10px] text-ink-secondary font-mono">direction="left"</span>
            </div>

            {/* Speed Dial Right */}
            <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col justify-between items-center text-center gap-8 min-h-[200px] relative overflow-visible z-10 hover:z-30 focus-within:z-30">
              <span className="text-xs font-bold text-ink">Expand Right</span>
              <div className="flex items-center justify-center relative py-6 w-full z-20">
                <SpeedDialApp
                  id="speed-dial-right"
                  direction="right"
                  variant="yellow"
                  size="md"
                  actions={sampleActions.slice(0, 3)}
                />
              </div>
              <span className="text-[10px] text-ink-secondary font-mono">direction="right"</span>
            </div>

            {/* Speed Dial Bottom */}
            <div className="p-4 bg-surface-soft border border-hairline-soft rounded-xl flex flex-col justify-between items-center text-center gap-8 min-h-[200px] relative overflow-visible z-10 hover:z-30 focus-within:z-30">
              <span className="text-xs font-bold text-ink">Expand Bottom</span>
              <div className="flex items-center justify-center relative py-6 w-full z-20">
                <SpeedDialApp
                  id="speed-dial-bottom"
                  direction="bottom"
                  variant="blue"
                  size="md"
                  actions={sampleActions.slice(0, 3)}
                />
              </div>
              <span className="text-[10px] text-ink-secondary font-mono">direction="bottom"</span>
            </div>
          </div>

          {lastActionText && (
            <div className="p-2.5 bg-vibrant-purple/10 border border-vibrant-purple/20 rounded-xl flex items-center justify-between text-xs text-vibrant-purple-dark font-medium animate-in fade-in">
              <span>{lastActionText}</span>
              <button
                onClick={() => setLastActionText(null)}
                className="text-[10px] underline font-mono text-ink-secondary cursor-pointer"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        {/* SECTION 4: INTERACTIVE PLAYGROUND BUILDER */}
        <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-hairline-soft pb-2.5">
            <Settings className="w-4 h-4 text-vibrant-purple-dark" />
            <span className="text-xs font-bold text-ink uppercase tracking-wider">
              • 04. Live Interactive Builder Playground (FAB & Speed Dial)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Controls */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Mode Toggle */}
              <div className="p-3 bg-surface-soft border border-hairline-soft rounded-xl flex items-center justify-between">
                <span className="text-xs font-bold text-ink">Tipe Komponen</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setIsSpeedDialMode(false)}
                    className={cn(
                      "px-3 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer",
                      !isSpeedDialMode
                        ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                        : "bg-surface text-ink-secondary border-hairline"
                    )}
                  >
                    Single FAB
                  </button>
                  <button
                    onClick={() => setIsSpeedDialMode(true)}
                    className={cn(
                      "px-3 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer",
                      isSpeedDialMode
                        ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                        : "bg-surface text-ink-secondary border-hairline"
                    )}
                  >
                    Speed Dial Stack
                  </button>
                </div>
              </div>

              {/* Variant Selector */}
              <div>
                <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                  1. Pilih Variant Colors (<code className="text-vibrant-purple-dark">variant="..."</code>)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(["primary", "secondary", "danger", "yellow", "blue", "purpleDark"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setPlayVariant(v)}
                      className={cn(
                        "px-2.5 py-1 text-[11px] font-semibold rounded-[6px] border transition-all cursor-pointer capitalize",
                        playVariant === v
                          ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark shadow-xs"
                          : "bg-surface-soft text-ink-secondary border-hairline-soft hover:bg-surface"
                      )}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size & Elevation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                    2. Select Size (<code className="text-vibrant-purple-dark">size="..."</code>)
                  </span>
                  <div className="flex gap-1">
                    {(["sm", "md", "lg"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setPlaySize(s)}
                        className={cn(
                          "flex-1 px-2 py-1 text-[10px] font-semibold rounded-[6px] border transition-all cursor-pointer uppercase",
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
                    3. Elevation Shadow
                  </span>
                  <div className="flex gap-1">
                    {(["normal", "high", "vibrant"] as const).map((el) => (
                      <button
                        key={el}
                        onClick={() => setPlayElevation(el)}
                        className={cn(
                          "flex-1 px-1.5 py-1 text-[10px] font-semibold rounded-[6px] border transition-all cursor-pointer capitalize",
                          playElevation === el
                            ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                            : "bg-surface-soft text-ink-secondary border-hairline-soft hover:bg-surface"
                        )}
                      >
                        {el}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Options */}
              {!isSpeedDialMode ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                      4. Extended Label Text
                    </span>
                    <button
                      onClick={() => setIsExtended(!isExtended)}
                      className={cn(
                        "w-full px-2.5 py-1 text-[11px] font-semibold rounded-[6px] border transition-all cursor-pointer text-left flex items-center justify-between",
                        isExtended
                          ? "bg-vibrant-purple/10 border-vibrant-purple/30 text-vibrant-purple-dark"
                          : "bg-surface-soft text-ink-secondary border-hairline-soft"
                      )}
                    >
                      <span>{isExtended ? "Mode Extended (Label + Icon)" : "Mode Icon Only (Circle)"}</span>
                      <span className="font-mono text-[9px]">{isExtended ? "ON" : "OFF"}</span>
                    </button>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                      5. Corner Radius
                    </span>
                    <div className="flex gap-1">
                      {(["none", "sm", "md", "lg", "full"] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => setPlayRounded(r)}
                          className={cn(
                            "flex-1 px-1 py-1 text-[10px] font-semibold rounded-[6px] border transition-all cursor-pointer capitalize",
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
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                      4. Direction Stack
                    </span>
                    <div className="flex gap-1">
                      {(["top", "left", "right", "bottom"] as const).map((d) => (
                        <button
                          key={d}
                          onClick={() => setSpeedDirection(d)}
                          className={cn(
                            "flex-1 px-1 py-1 text-[10px] font-semibold rounded-[6px] border transition-all cursor-pointer capitalize",
                            speedDirection === d
                              ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                              : "bg-surface-soft text-ink-secondary border-hairline-soft hover:bg-surface"
                          )}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                      5. Overlay Backdrop
                    </span>
                    <button
                      onClick={() => setShowBackdrop(!showBackdrop)}
                      className={cn(
                        "w-full px-2.5 py-1 text-[11px] font-semibold rounded-[6px] border transition-all cursor-pointer text-left flex items-center justify-between",
                        showBackdrop
                          ? "bg-vibrant-purple/10 border-vibrant-purple/30 text-vibrant-purple-dark"
                          : "bg-surface-soft text-ink-secondary border-hairline-soft"
                      )}
                    >
                      <span>{showBackdrop ? "Backdrop Aktif (Dim Bg)" : "Tanpa Backdrop"}</span>
                      <span className="font-mono text-[9px]">{showBackdrop ? "ON" : "OFF"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Preview Canvas */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 bg-surface-soft border border-hairline-soft rounded-xl relative min-h-[260px] overflow-visible z-10">
              <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-vibrant-purple-dark" />
                Live Component Preview
              </span>

              <div className="flex items-center justify-center my-auto py-8">
                {isSpeedDialMode ? (
                  <SpeedDialApp
                    id="uikit-playground-speeddial"
                    variant={playVariant}
                    size={playSize}
                    elevation={playElevation}
                    direction={speedDirection}
                    showBackdrop={showBackdrop}
                    actions={sampleActions}
                  />
                ) : (
                  <FabApp
                    id="uikit-playground-fab"
                    variant={playVariant}
                    size={playSize}
                    elevation={playElevation}
                    rounded={playRounded}
                    icon={<Plus className="w-5 h-5" />}
                    label={isExtended ? "Buat Laporan Baru" : undefined}
                  />
                )}
              </div>

              <div className="text-[10px] text-ink-muted text-center font-mono">
                Click trigger FAB to test interactive states
              </div>
            </div>
          </div>

          {/* Generated Code Preview */}
          <div className="mt-2 bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-[11px] font-semibold text-slate-400">JSX Component Usage</span>
              <ButtonApp
                id="btn-copy-fab-code"
                variant="ghost"
                size="sm"
                onClick={copyCode}
                className="text-slate-300 hover:text-white hover:bg-slate-800 h-7 text-[11px] px-2"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                {copied ? "Tersalin!" : "Salin Kode"}
              </ButtonApp>
            </div>
            <pre className="overflow-x-auto text-[11px] leading-relaxed text-purple-300">
              <code>{codeString}</code>
            </pre>
          </div>
        </div>

        {/* SECTION 5: API SPECIFICATIONS TABLE */}
        <div className="p-5 bg-surface border border-hairline rounded-2xl flex flex-col gap-4 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
            • 05. Standar API & Specs Properti (FabApp & SpeedDialApp)
          </span>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-hairline text-ink-muted bg-surface-soft">
                  <th className="py-2.5 px-3 font-semibold">Prop</th>
                  <th className="py-2.5 px-3 font-semibold">Tipe Data</th>
                  <th className="py-2.5 px-3 font-semibold">Default</th>
                  <th className="py-2.5 px-3 font-semibold">Keterangan Fungsi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline-soft text-ink-secondary">
                <tr>
                  <td className="py-2.5 px-3 font-mono font-bold text-ink">variant</td>
                  <td className="py-2.5 px-3 text-vibrant-purple-dark font-mono text-[11px]">"primary" | "secondary" | "danger" | "yellow" | "blue" | "purpleDark"</td>
                  <td className="py-2.5 px-3 font-mono">"primary"</td>
                  <td className="py-2.5 px-3">Warna aksen latar & ring focus yang disesuaikan secara dinamis.</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-bold text-ink">size</td>
                  <td className="py-2.5 px-3 text-vibrant-purple-dark font-mono text-[11px]">"sm" | "md" | "lg"</td>
                  <td className="py-2.5 px-3 font-mono">"md"</td>
                  <td className="py-2.5 px-3">Dimensi FAB circle (sm: 40px, md: 48px, lg: 56px).</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-bold text-ink">elevation</td>
                  <td className="py-2.5 px-3 text-vibrant-purple-dark font-mono text-[11px]">"normal" | "high" | "vibrant"</td>
                  <td className="py-2.5 px-3 font-mono">"vibrant"</td>
                  <td className="py-2.5 px-3">Tingkat kedalaman bayangan melayang (shadow-lg, shadow-xl, ambient glow).</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-bold text-ink">label</td>
                  <td className="py-2.5 px-3 text-vibrant-purple-dark font-mono text-[11px]">ReactNode / string</td>
                  <td className="py-2.5 px-3 font-mono">undefined</td>
                  <td className="py-2.5 px-3">Teks label opsional untuk mengubah FAB menjadi Extended FAB.</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-bold text-ink">direction (SpeedDial)</td>
                  <td className="py-2.5 px-3 text-vibrant-purple-dark font-mono text-[11px]">"top" | "bottom" | "left" | "right"</td>
                  <td className="py-2.5 px-3 font-mono">"top"</td>
                  <td className="py-2.5 px-3">Arah pembukaan tumpukan daftar opsi aksi Speed Dial.</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-bold text-ink">actions (SpeedDial)</td>
                  <td className="py-2.5 px-3 text-vibrant-purple-dark font-mono text-[11px]">SpeedDialAction[]</td>
                  <td className="py-2.5 px-3 font-mono">[]</td>
                  <td className="py-2.5 px-3">Daftar item aksi dengan ikon, label, handler click, dan badge opsional.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ModuleCard>
  );
}
