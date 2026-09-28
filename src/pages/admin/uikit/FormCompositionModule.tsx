import * as React from "react";
import { ButtonApp, BadgeApp, InputApp, TextApp, FormFieldApp } from "@/packages/design-system";
import { Type, Info, Settings, Code, Check } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { cn } from "@/lib/utils";

export function FormCompositionModule() {
  // Live Playground State
  const [playVariant, setPlayVariant] = React.useState<"default" | "inline">("default");
  const [playSize, setPlaySize] = React.useState<"sm" | "md" | "lg">("md");
  const [playLabel, setPlayLabel] = React.useState<string>("Nomor Pokok Wajib Pajak Daerah (NPWPD)");
  const [playError, setPlayError] = React.useState<string>("Format NPWPD salah! Harus diawali dengan 'P4D-'");
  const [playInputValue, setPlayInputValue] = React.useState<string>("P4D-12345");
  const [copied, setCopied] = React.useState<boolean>(false);

  // Lists of options
  const allVariants = [
    { id: "default", name: "Default (Vertical)", desc: "Label stacked above input, suitable for typical structured forms" },
    { id: "inline", name: "Inline (Horizontal)", desc: "Label and input on the same row, saves space" },
  ] as const;

  const allSizes = [
    { id: "sm", name: "Small (sm)", desc: "Smaller label typography, tight padding" },
    { id: "md", name: "Medium (md)", desc: "Standard form label scaling and layout" },
    { id: "lg", name: "Large (lg)", desc: "Prominent labels with comfortable padding" },
  ] as const;

  const errProp = playError ? ` error="${playError}"` : "";
  const variantProp = playVariant === "default" ? "" : ` variant="inline"`;
  const codeString = `<FormFieldApp\n  id="form-field-demo"\n  label="${playLabel}"\n  size="${playSize}"${variantProp}${errProp}\n>\n  <InputApp\n    id="input-demo"\n    value="${playInputValue}"\n    placeholder="Type value..."\n  />\n</FormFieldApp>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModuleCard
      id="uikit-form-module"
      icon={<Type className="w-5 h-5 text-vibrant-purple-dark" />}
      title="FormFieldApp (CVA Component Specs)"
      description="Elemen pembungkus kontrol formulir yang mengintegrasikan label teks, pesan error, dan status penempatan masukan data secara kohesif."
    >
      {/* SECTION 1: LIVE INTERACTIVE BUILDER */}
      <div className="space-y-4 bg-vibrant-grey-bg/30 p-4 md:p-6 rounded-card-custom border border-hairline-soft/80">
        <div className="flex items-center gap-2 border-b border-hairline-soft pb-2.5">
          <Settings className="w-4 h-4 text-vibrant-purple-dark" />
          <span className="text-xs font-bold font-display text-ink uppercase tracking-wider">
            1. Live FormField Playground (Konfigurasi Dinamis)
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 text-left">
          {/* Controls Column */}
          <div className="space-y-4">
            {/* Input Label Config */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                  Custom Label Text
                </span>
                <input
                  type="text"
                  value={playLabel}
                  onChange={(e) => setPlayLabel(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded border border-hairline-soft bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-vibrant-purple"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                  Custom Error Message
                </span>
                <input
                  type="text"
                  value={playError}
                  onChange={(e) => setPlayError(e.target.value)}
                  placeholder="Clear to hide error..."
                  className="w-full px-3 py-1.5 text-xs rounded border border-hairline-soft bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-vibrant-purple"
                />
              </div>
            </div>

            {/* Input Value Config */}
            <div>
              <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                Input Value Simulator
              </span>
              <input
                type="text"
                value={playInputValue}
                onChange={(e) => setPlayInputValue(e.target.value)}
                className="w-full max-w-md px-3 py-1.5 text-xs rounded border border-hairline-soft bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-vibrant-purple"
              />
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

            {/* Size Knob */}
            <div>
              <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                Size <code className="text-vibrant-purple-dark text-[9px] lowercase font-mono">size="..."</code>
              </span>
              <div className="flex gap-1.5 max-w-md">
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
          </div>

          {/* Result Column */}
          <div className="flex flex-col justify-between gap-4 bg-surface p-4 rounded-box-custom border border-hairline-soft shadow-inner">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block">Live Output</span>
              <div className="min-h-[100px] flex items-center justify-center bg-vibrant-grey-bg/15 rounded-sm p-4 border border-hairline-soft border-dashed">
                <div className="w-full max-w-lg">
                  <FormFieldApp
                    id="playground-interactive-formfield"
                    label={playLabel}
                    variant={playVariant}
                    size={playSize}
                    error={playError || undefined}
                  >
                    <InputApp
                      id="playground-interactive-formfield-input"
                      value={playInputValue}
                      onChange={(e) => setPlayInputValue(e.target.value)}
                      variant={playError ? "error" : "default"}
                    />
                  </FormFieldApp>
                </div>
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

      {/* SECTION 2: COMPARATIVE LAYOUT EXAMPLES */}
      <div className="space-y-3 pt-4 border-t border-hairline-soft/80 text-left">
        <div className="border-b border-hairline-soft pb-1.5 flex justify-between items-center">
          <TextApp id="form-sec-comparison-title" variant="mono" className="text-[11px] font-bold text-vibrant-purple-dark uppercase">
            2. Contoh Komposisi Layout Form Riil
          </TextApp>
          <span className="text-[9px] font-mono text-ink-muted">Standard vs Inline Row</span>
        </div>
        <p className="text-xs text-ink-secondary leading-relaxed">
          Berikut adalah simulasi layout entri data yang umum diimplementasikan pada form input real-time admin.
        </p>

        <div className="grid grid-cols-1 gap-6">
          {/* Default Vertical Stack Layout */}
          <div className="bg-surface border border-hairline-soft p-4 rounded-card-custom space-y-4">
            <span className="text-xs font-extrabold text-ink uppercase tracking-wider block border-b pb-1.5 border-hairline-soft">
              📂 Form Vertikal Tradisional
            </span>
            <div className="space-y-3 max-w-xl">
              <FormFieldApp id="form-ex-username" label="Nama Lengkap Pengguna" size="sm">
                <InputApp id="input-ex-username" size="sm" placeholder="e.g. Sugi Wijaya" />
              </FormFieldApp>

              <FormFieldApp id="form-ex-email" label="Alamat Surat Elektronik" size="sm" error="Format e-mail harus menggunakan domain terverifikasi">
                <InputApp id="input-ex-email" size="sm" variant="error" placeholder="e.g. sugi@bpkad.go.id" />
              </FormFieldApp>
            </div>
          </div>

          {/* Inline Row Space-saver Layout */}
          <div className="bg-vibrant-purple/5 border border-vibrant-purple/10 p-4 rounded-card-custom space-y-4">
            <span className="text-xs font-extrabold text-vibrant-purple-dark uppercase tracking-wider block border-b pb-1.5 border-vibrant-purple/10">
              ✨ Form Baris Hemat Ruang (Inline Layout)
            </span>
            <div className="space-y-3">
              <div className="bg-surface p-3 rounded-card-custom border border-hairline-soft">
                <FormFieldApp id="form-ex-inline-1" label="Otoritas Sinkronisasi Otomatis" variant="inline" size="sm">
                  <BadgeApp id="badge-ex-inline-1" variant="success" size="sm">
                    AKTIF SECARA REAL-TIME
                  </BadgeApp>
                </FormFieldApp>
              </div>

              <div className="bg-surface p-3 rounded-card-custom border border-hairline-soft">
                <FormFieldApp id="form-ex-inline-2" label="Status Akreditasi Server" variant="inline" size="sm">
                  <BadgeApp id="badge-ex-inline-2" variant="brand" size="sm">
                    TERTUNDA (PENDING)
                  </BadgeApp>
                </FormFieldApp>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: INFORMATIONAL UTILITIES */}
      <div className="flex items-start gap-3 bg-block-cream/40 border border-block-cream/80 p-4 rounded-card-custom text-left">
        <Info className="w-5 h-5 text-vibrant-purple-dark flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed text-xs space-y-1">
          <span className="font-bold text-ink block text-sm">Compound Form Handling &amp; Validation States</span>
          <span className="text-ink-secondary block">
            Penggunaan komponen <code>FormFieldApp</code> secara otomatis mewarisi properti ukuran lencana teks pada labelnya. Memanfaatkan integrasi denda error yang beraksen merah tajam (<code>text-accent</code>) langsung meningkatkan kegunaan operasional saat data salah diinputkan.
          </span>
        </div>
      </div>
    </ModuleCard>
  );
}
