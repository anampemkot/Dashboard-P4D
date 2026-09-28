import * as React from "react";
import { InputApp, TextApp, CardApp, BadgeApp } from "@/packages/design-system";
import { Settings, Info, Code, Check, Search, Lock, User, Hash, FileText } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { cn } from "@/lib/utils";

export function InputDisplayModule() {
  // Live Playground State
  const [playVariant, setPlayVariant] = React.useState<"default" | "filled" | "error" | "success">("default");
  const [playSize, setPlaySize] = React.useState<"sm" | "md" | "lg">("md");
  const [playTheme, setPlayTheme] = React.useState<"default" | "playful">("default");
  const [playRounded, setPlayRounded] = React.useState<
    "default" | "none" | "sm" | "md" | "lg" | "xl" | "full" | "pill" | "card" | "input"
  >("md");
  const [playDisabled, setPlayDisabled] = React.useState<boolean>(false);
  const [playPlaceholder, setPlayPlaceholder] = React.useState<string>("Masukkan nama lengkap wajib pajak...");
  const [copied, setCopied] = React.useState<boolean>(false);

  const allVariants = [
    { id: "default", name: "Default", desc: "Clean standard border" },
    { id: "error", name: "Error", desc: "Border merah & error state" },
    { id: "success", name: "Success", desc: "Border hijau & success state" },
    { id: "filled", name: "Filled", desc: "Contrast soft background" },
  ] as const;

  const allSizes = [
    { id: "sm", name: "Small (sm)", spec: "Min-height 34px" },
    { id: "md", name: "Medium (md)", spec: "Min-height 42px (Default)" },
    { id: "lg", name: "Large (lg)", spec: "Min-height 50px" },
  ] as const;

  const allRounded = [
    { id: "none", name: "none" },
    { id: "sm", name: "sm" },
    { id: "md", name: "md" },
    { id: "lg", name: "lg" },
    { id: "xl", name: "xl" },
    { id: "full", name: "full" },
  ] as const;

  const codeString = `<InputApp\n  id="my-input"\n  variant="${playVariant}"\n  size="${playSize}"\n  rounded="${playRounded}"\n  placeholder="${playPlaceholder}"${playDisabled ? "\n  disabled" : ""}\n/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModuleCard
      id="uikit-input-module"
      icon={<Settings className="w-5 h-5 text-vibrant-purple-dark" />}
      title="InputApp (Text Input Component Specs)"
      description="Elemen masukan teks utama formulir. Bagian ini membedah seluruh variasi varian, ikon, stepper number, password toggle, max-length counter, dan status validasi interaktif."
    >
      {/* SECTION 1: 1 CONTAINER CARD SHOWCASE (Foundation Matrix - grid-cols-1 md:grid-cols-2 gap-4) */}
      <CardApp id="input-showcase-single-container" className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-hairline-soft pb-3">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-vibrant-purple-dark" />
            <TextApp id="input-card-showcase-title" variant="h4" weight="bold">
              InputApp Foundation Matrix &amp; Variant Showcase
            </TextApp>
          </div>
          <BadgeApp id="input-badge-showcase" variant="solidPurple" size="sm">
            Foundation Rules
          </BadgeApp>
        </div>

        {/* 2-Column Grid with Step 4 Gap (16px / gap-4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {/* Item 1: Standard Text Input */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="input-item1-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              1. Standard Text Input
            </TextApp>
            <InputApp
              id="input-demo-standard"
              label="Nama Lengkap Wajib Pajak"
              placeholder="Masukkan nama lengkap sesuai KTP..."
              helperText="Harus sesuai dengan KTP / NPWP wajib pajak"
              leadingIcon={<User className="w-4 h-4" />}
              showClear
            />
          </div>

          {/* Item 2: Password Input with Toggle */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="input-item2-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              2. Password Input (Toggle Show/Hide)
            </TextApp>
            <InputApp
              id="input-demo-password"
              type="password"
              label="Kata Sandi Akun BPKAD"
              placeholder="Masukkan kata sandi..."
              helperText="Minimal 8 karakter campuran huruf dan angka"
              leadingIcon={<Lock className="w-4 h-4" />}
              showPasswordToggle
            />
          </div>

          {/* Item 3: Number Input with Stepper */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="input-item3-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              3. Number Input (Stepper Buttons)
            </TextApp>
            <InputApp
              id="input-demo-number"
              type="number"
              label="Jumlah Setoran Pajak (Rp)"
              defaultValue="500000"
              step={50000}
              leadingIcon={<Hash className="w-4 h-4" />}
              showStepper
              helperText="Gunakan ikon stepper di sebelah kanan untuk menyesuaikan nominal"
            />
          </div>

          {/* Item 4: Leading & Trailing Icon Input */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="input-item4-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              4. Dual Icons (Leading &amp; Trailing Icon)
            </TextApp>
            <InputApp
              id="input-demo-icons"
              label="Pencarian Nomor Objek Pajak (NOP)"
              placeholder="Contoh: 32.73.010..."
              leadingIcon={<Search className="w-4 h-4" />}
              trailingIcon={<Check className="w-4 h-4 text-vibrant-purple-dark" />}
              showClear
              helperText="Ikon di kedua sisi memudahkan navigasi pencarian cepat"
            />
          </div>

          {/* Item 5: Disabled State */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="input-item5-badge" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider block">
              5. Disabled State (Greyed Out)
            </TextApp>
            <InputApp
              id="input-demo-disabled"
              label="Nomor Pokok Wajib Pajak (Terkunci)"
              defaultValue="NPWP: 01.234.567.8-901.000"
              disabled
              leadingIcon={<Lock className="w-4 h-4" />}
              helperText="Input terkunci dan tidak dapat disunting oleh pengguna"
            />
          </div>

          {/* Item 6: Error State */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="input-item6-badge" variant="caption" weight="bold" className="text-red-500 uppercase tracking-wider block">
              6. State Validation: Error (Border Merah)
            </TextApp>
            <InputApp
              id="input-demo-error"
              label="Email Resmi Dinas / Perusahaan"
              defaultValue="budi.santoso@"
              variant="error"
              errorMessage="Format alamat email tidak valid (harus menggunakan domain .com / .go.id)"
            />
          </div>

          {/* Item 7: Success State */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="input-item7-badge" variant="caption" weight="bold" className="text-emerald-600 uppercase tracking-wider block">
              7. State Validation: Success (Border Hijau)
            </TextApp>
            <InputApp
              id="input-demo-success"
              label="Nomor Induk Kependudukan (NIK)"
              defaultValue="3273012903940001"
              variant="success"
              successMessage="NIK terverifikasi valid dengan database Dukcapil daerah"
            />
          </div>

          {/* Item 8: Max Length Indicator */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="input-item8-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              8. Feature: Max Length Counter (45/50)
            </TextApp>
            <InputApp
              id="input-demo-maxlength"
              label="Catatan Pelaporan Tambahan"
              defaultValue="Laporan pajak bumi dan bangunan tahunan 2026"
              maxLength={50}
              showMaxLength
              leadingIcon={<FileText className="w-4 h-4" />}
              helperText="Batas maksimum karakter yang diizinkan sistem"
            />
          </div>
        </div>
      </CardApp>

      {/* SECTION 2: LIVE INTERACTIVE PLAYGROUND */}
      <div className="space-y-4 bg-vibrant-grey-bg/30 p-4 md:p-6 rounded-card-custom border border-hairline-soft/80 text-left mt-6">
        <div className="flex items-center gap-2 border-b border-hairline-soft pb-2.5">
          <Settings className="w-4 h-4 text-vibrant-purple-dark" />
          <TextApp id="input-sec2-title" variant="h4" weight="bold">
            Live Interactive Input Playground
          </TextApp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Interactive Knobs */}
          <div className="space-y-4">
            <div>
              <TextApp id="play-ph-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                Custom Placeholder
              </TextApp>
              <input
                type="text"
                value={playPlaceholder}
                onChange={(e) => setPlayPlaceholder(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded border border-hairline-soft bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-vibrant-purple"
              />
            </div>

            <div>
              <TextApp id="play-var-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                Variant (`variant="..."`)
              </TextApp>
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

            <div>
              <TextApp id="play-sz-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                Size (`size="..."`)
              </TextApp>
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
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <TextApp id="play-rnd-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                Rounded (`rounded="..."`)
              </TextApp>
              <div className="flex flex-wrap gap-1.5">
                {allRounded.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setPlayRounded(r.id as any)}
                    className={cn(
                      "px-2.5 py-1 text-xs font-semibold rounded border transition-all cursor-pointer",
                      playRounded === r.id
                        ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                        : "bg-surface text-ink-secondary border-hairline-soft hover:bg-surface-soft"
                    )}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={playDisabled}
                  onChange={(e) => setPlayDisabled(e.target.checked)}
                  className="rounded text-vibrant-purple border-hairline focus:ring-vibrant-purple"
                />
                <TextApp id="play-disabled-text" variant="caption" weight="semibold" className="text-ink-secondary">
                  Non-aktifkan Input (`disabled`)
                </TextApp>
              </label>
            </div>
          </div>

          {/* Result Output */}
          <div className="space-y-4 bg-surface p-4 rounded-xl border border-hairline-soft">
            <TextApp id="play-output-label" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider block">
              Live Interactive Result
            </TextApp>
            <div className="p-4 bg-vibrant-grey-bg/15 rounded-lg border border-hairline-soft border-dashed min-h-[100px] flex items-center justify-center">
              <InputApp
                id="interactive-input-output"
                label="Nama Wajib Pajak"
                variant={playVariant}
                size={playSize}
                rounded={playRounded}
                disabled={playDisabled}
                placeholder={playPlaceholder}
                helperText="Pratinjau langsung interaksi input"
                showClear
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <TextApp id="play-code-title" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider flex items-center gap-1">
                  <Code className="w-3.5 h-3.5" /> JSX Snippet
                </TextApp>
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
              <pre className="text-[10px] font-mono bg-vibrant-grey-bg/60 p-2.5 rounded border border-hairline-soft text-ink-muted overflow-x-auto">
                {codeString}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: INFORMATIONAL UTILITIES */}
      <div className="flex items-start gap-3 bg-block-cream/40 border border-block-cream/80 p-4 rounded-card-custom text-left mt-4">
        <Info className="w-5 h-5 text-vibrant-purple-dark flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed space-y-1">
          <TextApp id="input-info-title" variant="body" weight="bold" className="text-ink">
            Foundation Design System Input Standards
          </TextApp>
          <TextApp id="input-info-desc" variant="caption" className="text-ink-secondary block">
            Komponen <code>InputApp</code> mendukung secara native label pendukung <code>&lt;label htmlFor="..."&gt;</code>, status validasi error (border merah &amp; pesan error), status success (border hijau &amp; pesan sukses), ikon leading/trailing, password toggle eye icon, number stepper, dan indikator panjang karakter maksimal (max length counter).
          </TextApp>
        </div>
      </div>
    </ModuleCard>
  );
}
