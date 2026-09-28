import * as React from "react";
import { TextAreaApp, TextApp, CardApp, BadgeApp } from "@/packages/design-system";
import { Settings, Info, Code, Check, FileText } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { cn } from "@/lib/utils";

export function TextAreaDisplayModule() {
  // Live Playground State
  const [playVariant, setPlayVariant] = React.useState<"default" | "filled" | "error" | "success">("default");
  const [playSize, setPlaySize] = React.useState<"sm" | "md" | "lg">("md");
  const [playRounded, setPlayRounded] = React.useState<
    "default" | "none" | "sm" | "md" | "lg" | "xl" | "full" | "card" | "input"
  >("md");
  const [playAutoResize, setPlayAutoResize] = React.useState<boolean>(false);
  const [playShowMaxLength, setPlayShowMaxLength] = React.useState<boolean>(true);
  const [playMaxLength, setPlayMaxLength] = React.useState<number>(250);
  const [playDisabled, setPlayDisabled] = React.useState<boolean>(false);
  const [playPlaceholder, setPlayPlaceholder] = React.useState<string>("Ketikkan deskripsi lengkap atau catatan pelaporan di sini...");
  const [copied, setCopied] = React.useState<boolean>(false);

  const allVariants = [
    { id: "default", name: "Default", desc: "Clean standard border" },
    { id: "error", name: "Error", desc: "Border merah & error state" },
    { id: "success", name: "Success", desc: "Border hijau & success state" },
    { id: "filled", name: "Filled", desc: "Contrast soft background" },
  ] as const;

  const allSizes = [
    { id: "sm", name: "Small (sm)" },
    { id: "md", name: "Medium (md)" },
    { id: "lg", name: "Large (lg)" },
  ] as const;

  const allRounded = [
    { id: "none", name: "none" },
    { id: "sm", name: "sm" },
    { id: "md", name: "md" },
    { id: "lg", name: "lg" },
    { id: "xl", name: "xl" },
  ] as const;

  const codeString = `<TextAreaApp\n  id="my-textarea"\n  label="Catatan Pelaporan"\n  variant="${playVariant}"\n  size="${playSize}"\n  rounded="${playRounded}"${playAutoResize ? "\n  autoResize" : ""}${playShowMaxLength ? `\n  maxLength={${playMaxLength}}\n  showMaxLength` : ""}\n  placeholder="${playPlaceholder}"${playDisabled ? "\n  disabled" : ""}\n/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModuleCard
      id="uikit-textarea-module"
      icon={<FileText className="w-5 h-5 text-vibrant-purple-dark" />}
      title="TextAreaApp (Text Area Component Specs)"
      description="Elemen area masukan teks multibaris. Mendukung auto-resize otomatis tinggi konten, kontrol resize handle, status validasi error/success, serta indikator hitungan karakter maksimum (Character Counter)."
    >
      {/* SECTION 1: 1 CONTAINER CARD SHOWCASE (Foundation Matrix - grid-cols-1 md:grid-cols-2 gap-4) */}
      <CardApp id="textarea-showcase-single-container" className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-hairline-soft pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-vibrant-purple-dark" />
            <TextApp id="textarea-card-showcase-title" variant="h4" weight="bold">
              TextAreaApp Foundation Matrix &amp; Variant Showcase
            </TextApp>
          </div>
          <BadgeApp id="textarea-badge-showcase" variant="solidPurple" size="sm">
            Foundation Rules
          </BadgeApp>
        </div>

        {/* 2-Column Grid with Step 4 Gap (16px / gap-4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {/* Item 1: Standard Text Area */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="ta-item1-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              1. Standard Text Area (Fixed Height)
            </TextApp>
            <TextAreaApp
              id="textarea-demo-standard"
              label="Uraian Singkat Keberatan Pajak"
              placeholder="Jelaskan alasan pengajuan keberatan atau banding pajak..."
              helperText="Jelaskan kronologi singkat dalam 2-3 kalimat"
              minRows={3}
              showClear
            />
          </div>

          {/* Item 2: Auto-resize Height */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="ta-item2-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              2. Auto-Resize Height (`autoResize={true}`)
            </TextApp>
            <TextAreaApp
              id="textarea-demo-autoresize"
              label="Catatan Lapangan Petugas (Auto-Expand)"
              placeholder="Tinggi kolom akan menyesuaikan secara otomatis saat Anda mengetik baris baru..."
              helperText="Tinggi bertambah otomatis tanpa scrollbar internal"
              autoResize
              minRows={2}
              maxRows={6}
              defaultValue={"Baris 1: Pemeriksaan fisik lokasi objek pajak.\nBaris 2: Pemotretan denah dan batas tanah."}
            />
          </div>

          {/* Item 3: Character Counter & Max Length */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="ta-item3-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              3. Character Counter &amp; Max Length (`120/300`)
            </TextApp>
            <TextAreaApp
              id="textarea-demo-counter"
              label="Alasan Rekonsiliasi Piutang"
              defaultValue="Ditemukan selisih perhitungan akibat perbedaan tanggal posting transaksi kas daerah dengan bank persepsi pada triwulan II."
              maxLength={300}
              showMaxLength
              helperText="Batas karakter maksimal yang diizinkan untuk catatan"
              showClear
            />
          </div>

          {/* Item 4: Resizable Handle Control */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="ta-item4-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              4. Resizable Handle (`resize="none"` vs `resize="vertical"`)
            </TextApp>
            <TextAreaApp
              id="textarea-demo-resize"
              label="Lampiran Keterangan Tambahan (Fixed Resize)"
              placeholder="Kotak masukan ini memiliki tinggi yang dikunci (resize-none)..."
              resize="none"
              minRows={3}
              helperText="Resize handle disembunyikan menggunakan prop `resize='none'`"
            />
          </div>

          {/* Item 5: Error State */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="ta-item5-badge" variant="caption" weight="bold" className="text-red-500 uppercase tracking-wider block">
              5. State Validation: Error State (Border Merah)
            </TextApp>
            <TextAreaApp
              id="textarea-demo-error"
              label="Alasan Pengurangan PBB"
              defaultValue="Terjadi bencana alam"
              variant="error"
              errorMessage="Alasan wajib diisi minimal 50 karakter penjelasan detail bencana"
              maxLength={200}
              showMaxLength
            />
          </div>

          {/* Item 6: Success State */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
            <TextApp id="ta-item6-badge" variant="caption" weight="bold" className="text-emerald-600 uppercase tracking-wider block">
              6. State Validation: Success State (Border Hijau)
            </TextApp>
            <TextAreaApp
              id="textarea-demo-success"
              label="Justifikasi Penetapan Pajak Restoran"
              defaultValue="Hasil verifikasi omset bulanan usaha kuliner dari data POS kasir terintegrasi sudah sesuai dengan Surat Pemberitahuan Pajak Daerah (SPTPD)."
              variant="success"
              successMessage="Justifikasi penyesuaian tarif telah diverifikasi oleh Kasie Pendaftaran"
              maxLength={500}
              showMaxLength
            />
          </div>

          {/* Item 7: Disabled State */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2 col-span-1 md:col-span-2">
            <TextApp id="ta-item7-badge" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider block">
              7. Disabled State (Read-Only / Terkunci)
            </TextApp>
            <TextAreaApp
              id="textarea-demo-disabled"
              label="Ketentuan Surat Keputusan Kepala BPKAD (Terkunci)"
              defaultValue="Sesuai Peraturan Walikota Nomor 45 Tahun 2024 tentang Tata Cara Pemungutan Pajak Daerah dan Retribusi Daerah Kota Bandung."
              disabled
              minRows={2}
              helperText="Tampilan non-aktif saat dokumen telah difinalisasi dan tidak dapat diedit"
            />
          </div>
        </div>
      </CardApp>

      {/* SECTION 2: LIVE INTERACTIVE PLAYGROUND */}
      <div className="space-y-4 bg-vibrant-grey-bg/30 p-4 md:p-6 rounded-card-custom border border-hairline-soft/80 text-left mt-6">
        <div className="flex items-center gap-2 border-b border-hairline-soft pb-2.5">
          <Settings className="w-4 h-4 text-vibrant-purple-dark" />
          <TextApp id="ta-sec2-title" variant="h4" weight="bold">
            Live Interactive TextArea Playground
          </TextApp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Interactive Knobs */}
          <div className="space-y-4">
            <div>
              <TextApp id="ta-play-ph-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
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
              <TextApp id="ta-play-var-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <TextApp id="ta-play-sz-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                  Size (`size="..."`)
                </TextApp>
                <div className="flex gap-1.5">
                  {allSizes.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setPlaySize(s.id as any)}
                      className={cn(
                        "flex-1 px-2 py-1 text-xs font-semibold rounded border transition-all cursor-pointer text-center",
                        playSize === s.id
                          ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                          : "bg-surface text-ink-secondary border-hairline-soft hover:bg-surface-soft"
                      )}
                    >
                      {s.id}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <TextApp id="ta-play-rnd-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                  Rounded (`rounded="..."`)
                </TextApp>
                <div className="flex flex-wrap gap-1">
                  {allRounded.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setPlayRounded(r.id as any)}
                      className={cn(
                        "px-2 py-1 text-xs font-semibold rounded border transition-all cursor-pointer",
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
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={playAutoResize}
                  onChange={(e) => setPlayAutoResize(e.target.checked)}
                  className="rounded text-vibrant-purple border-hairline focus:ring-vibrant-purple"
                />
                <TextApp id="ta-play-autoresize-text" variant="caption" weight="semibold" className="text-ink-secondary">
                  Aktifkan Auto-Resize Tinggi (`autoResize`)
                </TextApp>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={playShowMaxLength}
                  onChange={(e) => setPlayShowMaxLength(e.target.checked)}
                  className="rounded text-vibrant-purple border-hairline focus:ring-vibrant-purple"
                />
                <TextApp id="ta-play-showmax-text" variant="caption" weight="semibold" className="text-ink-secondary">
                  Tampilkan Character Counter (`showMaxLength`)
                </TextApp>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={playDisabled}
                  onChange={(e) => setPlayDisabled(e.target.checked)}
                  className="rounded text-vibrant-purple border-hairline focus:ring-vibrant-purple"
                />
                <TextApp id="ta-play-disabled-text" variant="caption" weight="semibold" className="text-ink-secondary">
                  Non-aktifkan Text Area (`disabled`)
                </TextApp>
              </label>
            </div>
          </div>

          {/* Result Output */}
          <div className="space-y-4 bg-surface p-4 rounded-xl border border-hairline-soft">
            <TextApp id="ta-play-output-label" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider block">
              Live Interactive Result
            </TextApp>
            <div className="p-4 bg-vibrant-grey-bg/15 rounded-lg border border-hairline-soft border-dashed min-h-[140px] flex items-center justify-center">
              <TextAreaApp
                id="interactive-textarea-output"
                label="Catatan Lapangan Wajib Pajak"
                variant={playVariant}
                size={playSize}
                rounded={playRounded}
                autoResize={playAutoResize}
                showMaxLength={playShowMaxLength}
                maxLength={playShowMaxLength ? playMaxLength : undefined}
                disabled={playDisabled}
                placeholder={playPlaceholder}
                helperText="Pratinjau langsung interaksi area masukan teks"
                showClear
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <TextApp id="ta-play-code-title" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider flex items-center gap-1">
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
          <TextApp id="textarea-info-title" variant="body" weight="bold" className="text-ink">
            Foundation Design System TextArea Standards
          </TextApp>
          <TextApp id="textarea-info-desc" variant="caption" className="text-ink-secondary block">
            Komponen <code>TextAreaApp</code> mendukung auto-resize otomatis menyesuaikan isi konten teks (menggunakan prop <code>autoResize</code>), penguncian / penyesuaian pegangan resize (prop <code>resize</code>), label pendukung terikat ID, status pesan validasi error/success, dan penghitung panjang karakter maksimum (Character Counter) secara konsisten.
          </TextApp>
        </div>
      </div>
    </ModuleCard>
  );
}
