import * as React from "react";
import { ButtonApp, TextApp, DialogApp, BadgeApp } from "@/packages/design-system";
import { AlertTriangle, Info, Settings, Code, Check, CheckCircle2 } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { cn } from "@/lib/utils";

export function DialogDisplayModule() {
  // Live Playground State
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [playVariant, setPlayVariant] = React.useState<"default" | "brand">("default");
  const [playSize, setPlaySize] = React.useState<"sm" | "md" | "lg" | "xl">("md");
  const [playTheme, setPlayTheme] = React.useState<"default" | "playful">("default");
  const [playRounded, setPlayRounded] = React.useState<
    "default" | "none" | "sm" | "md" | "lg" | "full" | "pill" | "card"
  >("default");
  const [playTitle, setPlayTitle] = React.useState<string>("Audit Objek Pajak Yogyakarta");
  const [playDesc, setPlayDesc] = React.useState<string>("Tinjauan status kepatuhan wajib pajak daerah DIY");
  const [actionConfirmed, setActionConfirmed] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);

  // Lists of options
  const allVariants = [
    { id: "default", name: "Default (Outlined)", desc: "Clean standard border with clean neutral details" },
    { id: "brand", name: "Brand (Colored Inset)", desc: "Accent brand colored top header background" },
  ] as const;

  const allSizes = [
    { id: "sm", name: "Small (sm)", maxW: "max-w-md", desc: "For single action confirmations or short alerts" },
    { id: "md", name: "Medium (md)", maxW: "max-w-lg", desc: "Standard details layout" },
    { id: "lg", name: "Large (lg)", maxW: "max-w-2xl", desc: "Rich analytical data and medium-sized forms" },
    { id: "xl", name: "Extra Large (xl)", maxW: "max-w-4xl", desc: "Complex tables or document previews" },
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

  const themeProp = playTheme === "default" ? "" : ` theme="playful"`;
  const roundedProp = playRounded === "default" ? "" : ` rounded="${playRounded}"`;
  const codeString = `<DialogApp\n  id="my-dialog"\n  isOpen={isOpen}\n  onClose={() => setIsOpen(false)}\n  title="${playTitle}"\n  description="${playDesc}"\n  variant="${playVariant}"\n  size="${playSize}"${roundedProp}${themeProp}\n>\n  <div className="space-y-4">\n    <p>Dialog body content goes here...</p>\n  </div>\n</DialogApp>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => {
    setActionConfirmed(true);
    setTimeout(() => {
      setActionConfirmed(false);
      setIsOpen(false);
    }, 1500);
  };

  return (
    <ModuleCard
      id="uikit-dialog-module"
      icon={<AlertTriangle className="w-5 h-5 text-vibrant-purple-dark" />}
      title="DialogApp (CVA Component Specs)"
      description="Elemen portal dialog overlay interaktif. Mendukung dynamic body scrolling lock, transisi memudar premium, dan variasi ukuran CVA."
    >
      {/* SECTION 1: LIVE INTERACTIVE BUILDER */}
      <div className="space-y-4 bg-vibrant-grey-bg/30 p-4 md:p-6 rounded-card-custom border border-hairline-soft/80">
        <div className="flex items-center gap-2 border-b border-hairline-soft pb-2.5">
          <Settings className="w-4 h-4 text-vibrant-purple-dark" />
          <span className="text-xs font-bold font-display text-ink uppercase tracking-wider">
            1. Live Dialog Playground (Konfigurasi Dinamis)
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 text-left">
          {/* Controls Column */}
          <div className="space-y-4">
            {/* Title & Desc Config */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                  Dialog Title
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
                  Dialog Description
                </span>
                <input
                  type="text"
                  value={playDesc}
                  onChange={(e) => setPlayDesc(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded border border-hairline-soft bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-vibrant-purple"
                />
              </div>
            </div>

            {/* Variant Knob */}
            <div>
              <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                Variant <code className="text-vibrant-purple-dark text-[9px] lowercase font-mono">variant="..."</code>
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

            {/* Size & Theme Knobs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                  Size <code className="text-vibrant-purple-dark text-[9px] lowercase font-mono">size="..."</code>
                </span>
                <div className="flex gap-1.5 flex-wrap">
                  {allSizes.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setPlaySize(s.id as any)}
                      className={cn(
                        "flex-1 px-2.5 py-1 text-xs font-semibold rounded border transition-all cursor-pointer min-w-[70px]",
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

              <div>
                <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                  Theme <code className="text-vibrant-purple-dark text-[9px] lowercase font-mono">theme="..."</code>
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
          </div>

          {/* Action trigger & preview */}
          <div className="flex flex-col justify-between gap-4 bg-surface p-4 rounded-box-custom border border-hairline-soft shadow-inner">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block">Trigger Control</span>
              <div className="min-h-[90px] flex items-center justify-center bg-vibrant-grey-bg/15 rounded-sm p-4 border border-hairline-soft border-dashed">
                <ButtonApp
                  id="trigger-playground-dialog-btn"
                  variant={playTheme === "playful" ? "purpleDark" : "primary"}
                  size="md"
                  theme={playTheme}
                  onClick={() => setIsOpen(true)}
                >
                  Buka Dialog ({playSize.toUpperCase()})
                </ButtonApp>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider flex items-center gap-1">
                  <Code className="w-3.5 h-3.5" /> JSX Code Snippet
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

      {/* SECTION 2: SIZE CLASSIFICATIONS */}
      <div className="space-y-3 pt-4 border-t border-hairline-soft/80 text-left">
        <div className="border-b border-hairline-soft pb-1.5 flex justify-between items-center">
          <TextApp id="dialog-sec-sizes-title" variant="mono" className="text-[11px] font-bold text-vibrant-purple-dark uppercase">
            2. Klasifikasi Ukuran &amp; Dimensi Max Width
          </TextApp>
          <span className="text-[9px] font-mono text-ink-muted">size="sm" | "md" | "lg" | "xl"</span>
        </div>
        <p className="text-xs text-ink-secondary leading-relaxed">
          Sistem secara otomatis menyesuaikan lebar maksimal container dialog di layar besar, memastikan keterbacaan layout konten tetap terjaga.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allSizes.map((s) => (
            <div
              key={s.id}
              className="bg-surface p-4 rounded-card-custom border border-hairline-soft shadow-xs flex flex-col justify-between gap-3 text-center"
            >
              <div className="space-y-1">
                <span className="text-xs font-bold text-ink block uppercase tracking-wider">{s.name}</span>
                <span className="text-[10px] font-mono text-vibrant-purple-dark bg-vibrant-purple/5 px-2 py-0.5 rounded inline-block">
                  {s.maxW}
                </span>
              </div>
              <div className="text-left bg-vibrant-grey-bg/40 p-2 rounded border border-hairline-soft/30 space-y-0.5">
                <span className="text-[9px] text-ink-secondary block">{s.desc}</span>
              </div>
              <ButtonApp
                id={`btn-open-size-${s.id}`}
                variant="secondary"
                size="sm"
                onClick={() => {
                  setPlaySize(s.id as any);
                  setIsOpen(true);
                }}
                className="w-full"
              >
                Tinjau Lebar
              </ButtonApp>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: INFORMATIONAL UTILITIES */}
      <div className="flex items-start gap-3 bg-block-cream/40 border border-block-cream/80 p-4 rounded-card-custom text-left">
        <Info className="w-5 h-5 text-vibrant-purple-dark flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed text-xs space-y-1">
          <span className="font-bold text-ink block text-sm">Scroll Locking &amp; Accessibility</span>
          <span className="text-ink-secondary block">
            Komponen <code>DialogApp</code> mengunci scroll <code>body</code> pada saat laci modal aktif dibuka untuk menghindari double-scroll. Portal transparan dengan filter blur memberikan efek kedalaman visual yang premium.
          </span>
        </div>
      </div>

      {/* DYNAMIC DIALOG COMPONENT VIEWPORT PORTAL */}
      <DialogApp
        id="playground-dialog-instance"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={playTitle}
        description={playDesc}
        variant={playVariant}
        size={playSize}
        rounded={playRounded}
        theme={playTheme}
      >
        <div className="space-y-5 text-left">
          {actionConfirmed ? (
            <div className="flex items-center gap-3 bg-success/10 border border-success/20 p-4 rounded-card-custom text-sm">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
              <span className="text-success font-bold font-display">Tindakan Berhasil Disetujui!</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-vibrant-purple/10 border border-vibrant-purple-dark/20 p-4 rounded-card-custom text-sm">
              <Info className="w-5 h-5 text-vibrant-purple-dark flex-shrink-0" />
              <span className="text-vibrant-purple-ink font-bold font-display">Data Siap Ditinjau Secara Real-time</span>
            </div>
          )}

          <div className="space-y-1.5">
            <span className={cn("text-[10px] font-semibold uppercase tracking-wider text-ink-muted", playTheme === "playful" && "font-display text-vibrant-purple-dark")}>
              Statistik Audit Pajak
            </span>
            <div className="grid grid-cols-2 gap-4">
              <div className={cn("p-3 border", playTheme === "playful" ? "bg-vibrant-grey-bg/50 rounded-box-custom border-vibrant-purple-dark/10" : "bg-surface-soft rounded-sm border-hairline-soft")}>
                <span className="text-[10px] text-ink-secondary block">Kepatuhan Omzet</span>
                <span className={cn("text-lg font-bold text-ink", playTheme === "playful" && "font-display text-2xl")}>94.8%</span>
              </div>
              <div className={cn("p-3 border", playTheme === "playful" ? "bg-vibrant-grey-bg/50 rounded-box-custom border-vibrant-purple-dark/10" : "bg-surface-soft rounded-sm border-hairline-soft")}>
                <span className="text-[10px] text-ink-secondary block">Skor Resiko</span>
                <span className={cn("text-lg font-bold text-accent", playTheme === "playful" && "text-vibrant-purple-dark font-display text-2xl")}>Rendah</span>
              </div>
            </div>
          </div>

          <p className={cn("text-xs text-ink-secondary leading-relaxed", playTheme === "playful" && "font-display text-sm")}>
            Ini adalah contoh konten dialog dinamis yang di-render secara modular. Komponen ini menerima props <code>children</code> bebas sehingga siap digunakan untuk formulir detail, tabel, atau pesan verifikasi audit denda.
          </p>

          <div className={cn("flex justify-end gap-3 pt-4 border-t", playTheme === "playful" ? "border-vibrant-purple-dark/10" : "border-hairline-soft")}>
            <ButtonApp
              id="playground-dialog-cancel-action"
              variant={playTheme === "playful" ? "white" : "secondary"}
              size={playTheme === "playful" ? "md" : "sm"}
              theme={playTheme}
              onClick={() => setIsOpen(false)}
            >
              Batal
            </ButtonApp>
            <ButtonApp
              id="playground-dialog-confirm-action"
              variant={playTheme === "playful" ? "purpleDark" : "primary"}
              size={playTheme === "playful" ? "md" : "sm"}
              theme={playTheme}
              onClick={handleConfirm}
            >
              Setujui Hasil Audit
            </ButtonApp>
          </div>
        </div>
      </DialogApp>
    </ModuleCard>
  );
}
