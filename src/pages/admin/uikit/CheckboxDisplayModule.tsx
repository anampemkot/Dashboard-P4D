import * as React from "react";
import { CheckboxApp, CheckboxGroupApp, TextApp, CardApp, BadgeApp } from "@/packages/design-system";
import { CheckSquare, Settings, Info, Code, Check } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { cn } from "@/lib/utils";

export function CheckboxDisplayModule() {
  // Demo states for single checkboxes
  const [uncheckedState, setUncheckedState] = React.useState(false);
  const [checkedState, setCheckedState] = React.useState(true);
  const [indeterminateState, setIndeterminateState] = React.useState(true);
  const [errorState, setErrorState] = React.useState(false);

  // Group states
  const [verticalGroupValues, setVerticalGroupValues] = React.useState<string[]>(["email", "whatsapp"]);
  const [horizontalGroupValues, setHorizontalGroupValues] = React.useState<string[]>(["pbb", "bphtb"]);

  // Playground state
  const [playVariant, setPlayVariant] = React.useState<"default" | "brand" | "vibrant" | "success" | "error">("default");
  const [playSize, setPlaySize] = React.useState<"sm" | "md" | "lg">("md");
  const [playIndeterminate, setPlayIndeterminate] = React.useState<boolean>(false);
  const [playDisabled, setPlayDisabled] = React.useState<boolean>(false);
  const [playChecked, setPlayChecked] = React.useState<boolean>(true);
  const [copied, setCopied] = React.useState<boolean>(false);

  const codeString = `<CheckboxApp\n  id="demo-checkbox"\n  label="Pilih Opsi Verifikasi"\n  description="Keterangan deskripsi tambahan"\n  variant="${playVariant}"\n  size="${playSize}"${playIndeterminate ? "\n  indeterminate" : ""}${playDisabled ? "\n  disabled" : ""}\n  checked={${playChecked}}\n/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModuleCard
      id="uikit-checkbox-module"
      icon={<CheckSquare className="w-5 h-5 text-vibrant-purple-dark" />}
      title="CheckboxApp & CheckboxGroupApp (Komponen Pilihan Multi-Opsi)"
      description="Elemen masukan centang tunggal dan kelompok (group). Mendukung status unchecked, checked, indeterminate (select-all dash), disabled, error message, serta tata letak vertikal & horizontal."
    >
      {/* SECTION 1: 1 CONTAINER CARD SHOWCASE (Foundation Matrix - Single CardApp Container) */}
      <CardApp id="checkbox-showcase-single-container" className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-hairline-soft pb-3">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-vibrant-purple-dark" />
            <TextApp id="chk-card-showcase-title" variant="h4" weight="bold">
              CheckboxApp Foundation Matrix &amp; Variant Showcase
            </TextApp>
          </div>
          <BadgeApp id="chk-badge-showcase" variant="solidPurple" size="sm">
            Foundation Rules
          </BadgeApp>
        </div>

        {/* 2-Column Grid with Step 4 Gap (16px / gap-4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {/* Item 1: Unchecked Single Checkbox */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="chk-item1-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              1. Single Checkbox (Unchecked)
            </TextApp>
            <CheckboxApp
              id="chk-demo-unchecked"
              label="Ingat Sesi Perangkat Ini"
              description="Sesi Anda akan tetap terhubung selama 30 hari ke depan"
              checked={uncheckedState}
              onCheckedChange={(c) => setUncheckedState(c)}
            />
          </div>

          {/* Item 2: Checked Single Checkbox */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="chk-item2-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              2. Single Checkbox (Checked &amp; Brand Color)
            </TextApp>
            <CheckboxApp
              id="chk-demo-checked"
              variant="vibrant"
              label="Langganan Warta Pajak &amp; Retribusi Daerah"
              description="Terima pembaruan regulasi dan tanggal jatuh tempo bulanan"
              checked={checkedState}
              onCheckedChange={(c) => setCheckedState(c)}
            />
          </div>

          {/* Item 3: Indeterminate State */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="chk-item3-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              3. Indeterminate State (Select-All Partial Dash Icon)
            </TextApp>
            <CheckboxApp
              id="chk-demo-indeterminate"
              label="Pilih Semua Aset Daerah (Status Sebagian)"
              description="Ikon garis horizontal menunjukkan sebagian item dalam daftar terpilih"
              indeterminate={indeterminateState}
              checked={false}
              onCheckedChange={() => setIndeterminateState(!indeterminateState)}
            />
          </div>

          {/* Item 4: Disabled States */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <TextApp id="chk-item4-badge" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider block">
              4. Disabled States (Unchecked &amp; Checked Terkunci)
            </TextApp>
            <div className="flex flex-col gap-2">
              <CheckboxApp
                id="chk-demo-disabled-off"
                label="Opsi Otomasi Laporan (Terkunci)"
                description="Fitur memerlukan izin level Administrator SKPD"
                disabled
                checked={false}
              />
              <CheckboxApp
                id="chk-demo-disabled-on"
                label="Protokol Keamanan SSL 256-bit (Aktif &amp; Terkunci)"
                description="Syarat wajib sistem terenkripsi dan tidak dapat dimatikan"
                disabled
                checked={true}
              />
            </div>
          </div>

          {/* Item 5: Error State */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="chk-item5-badge" variant="caption" weight="bold" className="text-red-500 uppercase tracking-wider block">
              5. State Validation: Error (Border Merah &amp; Pesan Validation)
            </TextApp>
            <CheckboxApp
              id="chk-demo-error"
              label="Saya menyetujui Pakta Integritas dan Kebijakan Privasi"
              errorMessage={!errorState ? "Anda wajib menyetujui pakta integritas sebelum mengirimkan berkas" : undefined}
              checked={errorState}
              onCheckedChange={(c) => setErrorState(c)}
            />
          </div>

          {/* Item 6: Success Variant */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="chk-item6-badge" variant="caption" weight="bold" className="text-emerald-600 uppercase tracking-wider block">
              6. Variant State: Success (Green Emerald Box)
            </TextApp>
            <CheckboxApp
              id="chk-demo-success"
              variant="success"
              label="Berkas Verifikasi Lapangan Validated"
              description="Tanda centang hijau menunjukkan verifikasi instansi sukses"
              checked={true}
            />
          </div>

          {/* Item 7: CheckboxGroup Vertical Layout */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="chk-item7-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              7. CheckboxGroupApp (Vertical Layout / Column)
            </TextApp>
            <CheckboxGroupApp
              id="chk-group-vert"
              label="Saluran Notifikasi Penagihan Pajak"
              direction="vertical"
              value={verticalGroupValues}
              onChange={setVerticalGroupValues}
              options={[
                { value: "email", label: "Surat Elektronik (Email)", description: "Pemberitahuan resmi via inbox email SKPD" },
                { value: "whatsapp", label: "WhatsApp Gateway Service", description: "Notifikasi pesan instan nomor WhatsApp" },
                { value: "sms", label: "Layanan SMS Kritis (Non-aktif)", description: "Fitur SMS saat ini sedang dipelihara", disabled: true },
              ]}
              helperText="Pilih satu atau beberapa saluran pengiriman notifikasi"
            />
          </div>

          {/* Item 8: CheckboxGroup Horizontal Layout */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="chk-item8-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              8. CheckboxGroupApp (Horizontal Layout / Row)
            </TextApp>
            <CheckboxGroupApp
              id="chk-group-horiz"
              label="Kategori Pajak Daerah Pilihan"
              direction="horizontal"
              value={horizontalGroupValues}
              onChange={setHorizontalGroupValues}
              options={[
                { value: "pbb", label: "PBB-P2" },
                { value: "bphtb", label: "BPHTB" },
                { value: "reklame", label: "Pajak Reklame" },
                { value: "air", label: "Pajak Air Tanah" },
              ]}
              helperText="Pilihan dalam susunan horizontal (flex-wrap gap-3)"
            />
          </div>
        </div>
      </CardApp>

      {/* SECTION 2: LIVE INTERACTIVE PLAYGROUND */}
      <div className="space-y-4 bg-vibrant-grey-bg/30 p-4 md:p-6 rounded-card-custom border border-hairline-soft/80 text-left mt-6">
        <div className="flex items-center gap-2 border-b border-hairline-soft pb-2.5">
          <Settings className="w-4 h-4 text-vibrant-purple-dark" />
          <TextApp id="chk-sec2-title" variant="h4" weight="bold">
            Live Interactive Checkbox Playground
          </TextApp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Interactive Controls */}
          <div className="space-y-4">
            <div>
              <TextApp id="chk-play-var-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
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
              <TextApp id="chk-play-sz-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
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
                <TextApp id="chk-play-checked-text" variant="caption" weight="semibold" className="text-ink-secondary">
                  Status Checked (`checked={playChecked ? "true" : "false"}`)
                </TextApp>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={playIndeterminate}
                  onChange={(e) => setPlayIndeterminate(e.target.checked)}
                  className="rounded text-vibrant-purple border-hairline focus:ring-vibrant-purple"
                />
                <TextApp id="chk-play-indet-text" variant="caption" weight="semibold" className="text-ink-secondary">
                  Status Indeterminate (`indeterminate`)
                </TextApp>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={playDisabled}
                  onChange={(e) => setPlayDisabled(e.target.checked)}
                  className="rounded text-vibrant-purple border-hairline focus:ring-vibrant-purple"
                />
                <TextApp id="chk-play-disabled-text" variant="caption" weight="semibold" className="text-ink-secondary">
                  Non-aktifkan Checkbox (`disabled`)
                </TextApp>
              </label>
            </div>
          </div>

          {/* Result Output */}
          <div className="space-y-4 bg-surface p-4 rounded-xl border border-hairline-soft">
            <TextApp id="chk-play-output-label" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider block">
              Live Interactive Result
            </TextApp>
            <div className="p-4 bg-vibrant-grey-bg/15 rounded-lg border border-hairline-soft border-dashed min-h-[100px] flex items-center justify-center">
              <CheckboxApp
                id="interactive-checkbox-output"
                label="Konfirmasi Persetujuan Laporan"
                description="Status interaktif langsung dari panel kontrol"
                variant={playVariant}
                size={playSize}
                indeterminate={playIndeterminate}
                disabled={playDisabled}
                checked={playChecked}
                onCheckedChange={(c) => setPlayChecked(c)}
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <TextApp id="chk-play-code-title" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider flex items-center gap-1">
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
          <TextApp id="chk-info-title" variant="body" weight="bold" className="text-ink">
            Foundation Design System Checkbox Standards
          </TextApp>
          <TextApp id="chk-info-desc" variant="caption" className="text-ink-secondary block">
            Komponen <code>CheckboxApp</code> dan <code>CheckboxGroupApp</code> menggunakan ikatan label native <code>&lt;label htmlFor="..."&gt;</code> yang membungkus komponen <code>TextApp</code>. Mengikuti matriks spacing grid 4px/8px: border radius box 4px (<code>rounded-md</code>), gap box ke label 8px (<code>gap-2</code>), gap antar item group 12px (<code>gap-3</code>), dan gap antar item varian showcase 16px (<code>gap-4</code>).
          </TextApp>
        </div>
      </div>
    </ModuleCard>
  );
}
