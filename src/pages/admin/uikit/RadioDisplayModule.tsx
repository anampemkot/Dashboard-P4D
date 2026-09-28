import * as React from "react";
import { RadioApp, RadioGroupApp, TextApp, CardApp, BadgeApp } from "@/packages/design-system";
import { CircleDot, Settings, Info, Code, Check } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { cn } from "@/lib/utils";

export function RadioDisplayModule() {
  // Demo states for single radios
  const [uncheckedState, setUncheckedState] = React.useState(false);
  const [checkedState, setCheckedState] = React.useState(true);
  const [errorState, setErrorState] = React.useState(false);

  // Group states
  const [verticalGroupValue, setVerticalGroupValue] = React.useState<string>("bank_transfer");
  const [horizontalGroupValue, setHorizontalGroupValue] = React.useState<string>("bulanan");

  // Playground state
  const [playVariant, setPlayVariant] = React.useState<"default" | "brand" | "vibrant" | "success" | "error">("default");
  const [playSize, setPlaySize] = React.useState<"sm" | "md" | "lg">("md");
  const [playDisabled, setPlayDisabled] = React.useState<boolean>(false);
  const [playChecked, setPlayChecked] = React.useState<boolean>(true);
  const [copied, setCopied] = React.useState<boolean>(false);

  const codeString = `<RadioApp\n  id="demo-radio"\n  label="Pilih Opsi Pembayaran"\n  description="Keterangan deskripsi metode pembayaran"\n  variant="${playVariant}"\n  size="${playSize}"${playDisabled ? "\n  disabled" : ""}\n  checked={${playChecked}}\n/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModuleCard
      id="uikit-radio-module"
      icon={<CircleDot className="w-5 h-5 text-vibrant-purple-dark" />}
      title="RadioApp & RadioGroupApp (Komponen Pilihan Single-Select)"
      description="Elemen pilihan tunggal (radio button) berbentuk lingkaran (rounded-full) dengan inner dot indicator. Mendukung status unchecked, checked, disabled, error validation, serta kelompok (group) bertata letak vertikal & horizontal."
    >
      {/* SECTION 1: 1 CONTAINER CARD SHOWCASE (Foundation Matrix - Single CardApp Container) */}
      <CardApp id="radio-showcase-single-container" className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-hairline-soft pb-3">
          <div className="flex items-center gap-2">
            <CircleDot className="w-4 h-4 text-vibrant-purple-dark" />
            <TextApp id="rad-card-showcase-title" variant="h4" weight="bold">
              RadioApp Foundation Matrix &amp; Variant Showcase
            </TextApp>
          </div>
          <BadgeApp id="rad-badge-showcase" variant="solidPurple" size="sm">
            Foundation Rules
          </BadgeApp>
        </div>

        {/* 2-Column Grid with Step 4 Gap (16px / gap-4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {/* Item 1: Unchecked Single Radio */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="rad-item1-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              1. Single Radio (Unchecked)
            </TextApp>
            <RadioApp
              id="rad-demo-unchecked"
              name="demo-single"
              label="Metode Pemulihan Akun via SMS"
              description="Kirim kode verifikasi OTP ke nomor seluler terdaftar"
              checked={uncheckedState}
              onCheckedChange={(c) => setUncheckedState(c)}
            />
          </div>

          {/* Item 2: Checked Single Radio */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="rad-item2-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              2. Single Radio (Checked &amp; Brand Active Color)
            </TextApp>
            <RadioApp
              id="rad-demo-checked"
              name="demo-single-checked"
              variant="vibrant"
              label="Metode Pemulihan Akun via Email SKPD"
              description="Kirim tautan konfirmasi reset kata sandi ke email resmi"
              checked={checkedState}
              onCheckedChange={(c) => setCheckedState(c)}
            />
          </div>

          {/* Item 3: Disabled States */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <TextApp id="rad-item3-badge" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider block">
              3. Disabled States (Unchecked &amp; Checked Terkunci)
            </TextApp>
            <div className="flex flex-col gap-2">
              <RadioApp
                id="rad-demo-disabled-off"
                name="demo-disabled-1"
                label="Opsi Pengiriman Instant Kurir (Terkunci)"
                description="Layanan pengiriman tidak tersedia untuk wilayah terpilih"
                disabled
                checked={false}
              />
              <RadioApp
                id="rad-demo-disabled-on"
                name="demo-disabled-2"
                label="Pengiriman Standar Pos Indonesia (Default Aktif)"
                description="Metode standar bawaan aplikasi yang tidak dapat diubah"
                disabled
                checked={true}
              />
            </div>
          </div>

          {/* Item 4: State Validation Error */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="rad-item4-badge" variant="caption" weight="bold" className="text-red-500 uppercase tracking-wider block">
              4. Validation State: Error (Red Border &amp; Error Message)
            </TextApp>
            <RadioApp
              id="rad-demo-error"
              name="demo-error"
              label="Metode Pembayaran Kas Daerah"
              errorMessage={!errorState ? "Metode pembayaran ini memerlukan otorisasi bendahara penerimaan" : undefined}
              checked={errorState}
              onCheckedChange={(c) => setErrorState(c)}
            />
          </div>

          {/* Item 5: Success Variant */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="rad-item5-badge" variant="caption" weight="bold" className="text-emerald-600 uppercase tracking-wider block">
              5. Success Variant (Emerald Green Circular Box)
            </TextApp>
            <RadioApp
              id="rad-demo-success"
              name="demo-success"
              variant="success"
              label="Status Dokumen Persetujuan Terverifikasi"
              description="Menandakan pilihan opsi telah disetujui sistem"
              checked={true}
            />
          </div>

          {/* Item 6: Radio Sizes */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <TextApp id="rad-item6-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              6. Size Variants (Small, Medium, Large)
            </TextApp>
            <div className="flex flex-col gap-2">
              <RadioApp id="rad-size-sm" name="demo-sizes" size="sm" label="Radio Ukuran Kecil (size='sm')" checked={false} />
              <RadioApp id="rad-size-md" name="demo-sizes" size="md" label="Radio Ukuran Sedang (size='md')" checked={true} />
              <RadioApp id="rad-size-lg" name="demo-sizes" size="lg" label="Radio Ukuran Besar (size='lg')" checked={false} />
            </div>
          </div>

          {/* Item 7: RadioGroupApp Vertical Layout */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="rad-item7-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              7. RadioGroupApp (Vertical Layout / Column)
            </TextApp>
            <RadioGroupApp
              id="rad-group-vert"
              name="kanal_pembayaran"
              label="Kanal Pembayaran Pajak Daerah"
              direction="vertical"
              value={verticalGroupValue}
              onChange={setVerticalGroupValue}
              options={[
                { value: "bank_transfer", label: "Transfer Bank Daerah (Virtual Account)", description: "Bebas biaya admin untuk bank mitra daerah" },
                { value: "qris", label: "QRIS Sttandar Nasional", description: "Pindai kode QR dari aplikasi e-wallet apa saja" },
                { value: "gerai", label: "Gerai Minimarket / Loket POS", description: "Pembayaran tunai di kasir jaringan terdekat", disabled: true },
              ]}
              helperText="Pilih salah satu metode pembayaran yang Anda inginkan"
            />
          </div>

          {/* Item 8: RadioGroupApp Horizontal Layout */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="rad-item8-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              8. RadioGroupApp (Horizontal Layout / Row)
            </TextApp>
            <RadioGroupApp
              id="rad-group-horiz"
              name="periode_laporan"
              label="Periode Pelaporan Retribusi"
              direction="horizontal"
              value={horizontalGroupValue}
              onChange={setHorizontalGroupValue}
              options={[
                { value: "bulanan", label: "Bulanan" },
                { value: "triwulan", label: "Triwulan" },
                { value: "semester", label: "Semester" },
                { value: "tahunan", label: "Tahunan" },
              ]}
              helperText="Pilihan siklus laporan dalam susunan baris horizontal (gap-3)"
            />
          </div>
        </div>
      </CardApp>

      {/* SECTION 2: LIVE INTERACTIVE PLAYGROUND */}
      <div className="space-y-4 bg-vibrant-grey-bg/30 p-4 md:p-6 rounded-card-custom border border-hairline-soft/80 text-left mt-6">
        <div className="flex items-center gap-2 border-b border-hairline-soft pb-2.5">
          <Settings className="w-4 h-4 text-vibrant-purple-dark" />
          <TextApp id="rad-sec2-title" variant="h4" weight="bold">
            Live Interactive Radio Playground
          </TextApp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Interactive Controls */}
          <div className="space-y-4">
            <div>
              <TextApp id="rad-play-var-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                Variant (`variant="..."`)
              </TextApp>
              <div className="flex flex-wrap gap-1.5">
                {(["default", "brand", "vibrant", "success", "error"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setPlayVariant(v)}
                    className={cn(
                      "px-2.5 py-1 text-xs font-semibold rounded border transition-all cursor-pointer capitalize",
                      playVariant === v
                        ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark shadow-xs"
                        : "bg-surface text-ink-secondary border-hairline-soft hover:bg-surface-soft"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <TextApp id="rad-play-sz-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                Size (`size="..."`)
              </TextApp>
              <div className="flex gap-1.5">
                {(["sm", "md", "lg"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setPlaySize(s)}
                    className={cn(
                      "flex-1 px-2.5 py-1 text-xs font-semibold rounded border transition-all cursor-pointer text-center uppercase",
                      playSize === s
                        ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                        : "bg-surface text-ink-secondary border-hairline-soft hover:bg-surface-soft"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={playChecked}
                  onChange={(e) => setPlayChecked(e.target.checked)}
                  className="rounded text-vibrant-purple border-hairline focus:ring-vibrant-purple"
                />
                <TextApp id="rad-play-checked-text" variant="caption" weight="semibold" className="text-ink-secondary">
                  Status Checked (`checked={playChecked ? "true" : "false"}`)
                </TextApp>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={playDisabled}
                  onChange={(e) => setPlayDisabled(e.target.checked)}
                  className="rounded text-vibrant-purple border-hairline focus:ring-vibrant-purple"
                />
                <TextApp id="rad-play-disabled-text" variant="caption" weight="semibold" className="text-ink-secondary">
                  Non-aktifkan Radio (`disabled`)
                </TextApp>
              </label>
            </div>
          </div>

          {/* Result Output */}
          <div className="space-y-4 bg-surface p-4 rounded-xl border border-hairline-soft">
            <TextApp id="rad-play-output-label" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider block">
              Live Interactive Result
            </TextApp>
            <div className="p-4 bg-vibrant-grey-bg/15 rounded-lg border border-hairline-soft border-dashed min-h-[100px] flex items-center justify-center">
              <RadioApp
                id="interactive-radio-output"
                name="interactive-radio-group"
                label="Opsi Pilihan Utama Sistem"
                description="Status interaktif langsung dari panel kontrol"
                variant={playVariant}
                size={playSize}
                disabled={playDisabled}
                checked={playChecked}
                onCheckedChange={(c) => setPlayChecked(c)}
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <TextApp id="rad-play-code-title" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider flex items-center gap-1">
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
          <TextApp id="rad-info-title" variant="body" weight="bold" className="text-ink">
            Foundation Design System Radio Standards
          </TextApp>
          <TextApp id="rad-info-desc" variant="caption" className="text-ink-secondary block">
            Komponen <code>RadioApp</code> dan <code>RadioGroupApp</code> memiliki bentuk melingkar sempurna <code>rounded-full</code> dengan indikator titik tengah putih saat tercentang. Mematuhi matriks spacing Foundation grid 4px/8px: gap antara tombol radio dengan label teks 8px (<code>gap-2</code>), gap antar item dalam group 12px (<code>gap-3</code>), dan spacing antar kartu varian 16px (<code>gap-4</code>).
          </TextApp>
        </div>
      </div>
    </ModuleCard>
  );
}
