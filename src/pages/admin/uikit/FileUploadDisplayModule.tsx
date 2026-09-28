import * as React from "react";
import {
  FileUploadApp,
  FileUploadItem,
  TextApp,
  CardApp,
  BadgeApp,
} from "@/packages/design-system";
import { UploadCloud, Settings, Info, Code, Check } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { cn } from "@/lib/utils";

export function FileUploadDisplayModule() {
  // Mock files for progress and status showcase
  const [mockFileList, setMockFileList] = React.useState<FileUploadItem[]>([
    {
      id: "demo-f1",
      name: "Dokumen_Perencanaan_APBD_2026.pdf",
      size: 4850000,
      type: "application/pdf",
      progress: 100,
      status: "completed",
    },
    {
      id: "demo-f2",
      name: "Laporan_Retribusi_Pasar_Q2.xlsx",
      size: 1250000,
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      progress: 65,
      status: "uploading",
    },
    {
      id: "demo-f3",
      name: "Lampiran_Foto_Survei_Lapangan.png",
      size: 15400000,
      type: "image/png",
      progress: 30,
      status: "error",
      errorMessage: "File melebihi batas 10MB",
    },
  ]);

  const [avatarDemo, setAvatarDemo] = React.useState<string>(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
  );

  // Playground State
  const [playVariant, setPlayVariant] = React.useState<"dropzone" | "default" | "avatar">("dropzone");
  const [playSize, setPlaySize] = React.useState<"sm" | "md" | "lg">("md");
  const [playRounded, setPlayRounded] = React.useState<"none" | "sm" | "md" | "lg" | "xl" | "full">("lg");
  const [playDisabled, setPlayDisabled] = React.useState<boolean>(false);
  const [playMultiple, setPlayMultiple] = React.useState<boolean>(true);
  const [playAccept, setPlayAccept] = React.useState<string>("image/*,.pdf");
  const [copied, setCopied] = React.useState<boolean>(false);

  const codeString = `<FileUploadApp\n  id="demo-file-uploader"\n  label="Unggah Berkas Lampiran"\n  description="Pilih berkas dari perangkat Anda atau seret file ke dalam area"\n  variant="${playVariant}"\n  size="${playSize}"\n  rounded="${playRounded}"\n  accept="${playAccept}"\n  multiple={${playMultiple}}${playDisabled ? "\n  disabled" : ""}\n  onFileSelect={(files) => console.log(files)}\n/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRemoveMock = (idToRemove: string) => {
    setMockFileList((prev) => prev.filter((f) => f.id !== idToRemove));
  };

  return (
    <ModuleCard
      id="uikit-fileupload-module"
      icon={<UploadCloud className="w-5 h-5 text-vibrant-purple-dark" />}
      title="FileUploadApp (File Upload & Dropzone)"
      description="Komponen pengunggah berkas multi-varian (Standard Dropzone, Compact Bar, dan Circular Avatar Upload) dengan dukungan drag-and-drop, indikator progress bar, serta status unggah berkas."
    >
      {/* SECTION 1: 1 CONTAINER CARD SHOWCASE (Single CardApp Container containing all variants) */}
      <CardApp id="fileupload-showcase-single-container" className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-hairline-soft pb-3">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-vibrant-purple-dark" />
            <TextApp id="file-card-showcase-title" variant="h4" weight="bold">
              FileUploadApp Matrix &amp; Variant Showcase
            </TextApp>
          </div>
          <BadgeApp id="file-badge-showcase" variant="solidPurple" size="sm">
            1 Showcase Container
          </BadgeApp>
        </div>

        {/* 2-Column Grid with Step 4 Gap (16px / gap-4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {/* Item 1: Standard Drag & Drop Area (Dropzone) */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <TextApp id="file-item1-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              1. Standard Dropzone Area (variant="dropzone")
            </TextApp>
            <FileUploadApp
              id="file-demo-dropzone"
              variant="dropzone"
              label="Berkas Dokumen Pendukung"
              description="Unggah dokumen persyaratan retribusi daerah"
              helperText="Format PDF, DOCX, PNG atau JPG hingga 10MB"
              multiple
            />
          </div>

          {/* Item 2: Compact Click to Upload Bar (variant="default") */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <TextApp id="file-item2-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              2. Compact Click-to-Upload Bar (variant="default")
            </TextApp>
            <FileUploadApp
              id="file-demo-default"
              variant="default"
              label="Lampiran Nota Penerimaan"
              description="Pilih file kuitansi atau bukti pembayaran"
              helperText="Format JPG atau PNG max 5MB"
            />
          </div>

          {/* Item 3: Upload Progress & File List Indicator */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <TextApp id="file-item3-badge" variant="caption" weight="bold" className="text-emerald-600 uppercase tracking-wider block">
              3. Progress Bar &amp; Status Items (Uploading, Success, Failed)
            </TextApp>
            <FileUploadApp
              id="file-demo-progress"
              variant="dropzone"
              size="sm"
              label="Daftar Berkas Terunggah"
              description="Status visual pengunggahan berkas secara real-time"
              files={mockFileList}
              onFileRemove={handleRemoveMock}
            />
          </div>

          {/* Item 4: Circular Avatar / Profile Picture Upload (variant="avatar") */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <TextApp id="file-item4-badge" variant="caption" weight="bold" className="text-amber-500 uppercase tracking-wider block">
              4. Avatar Upload (variant="avatar")
            </TextApp>
            <FileUploadApp
              id="file-demo-avatar"
              variant="avatar"
              rounded="full"
              label="Foto Profil Pengguna / Petugas"
              description="Seret gambar profil baru atau klik tombol untuk memilih"
              helperText="Rasio 1:1 format JPG/PNG max 2MB"
              avatarUrl={avatarDemo}
            />
          </div>

          {/* Item 5: Disabled Dropzone State */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 md:col-span-2">
            <TextApp id="file-item5-badge" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider block">
              5. Disabled File Upload State (disabled)
            </TextApp>
            <FileUploadApp
              id="file-demo-disabled"
              variant="dropzone"
              label="Area Pengunggahan Terkunci (Disabled)"
              description="Pengunggahan berkas ditutup sementara oleh sistem"
              disabled
            />
          </div>
        </div>
      </CardApp>

      {/* SECTION 2: LIVE INTERACTIVE PLAYGROUND */}
      <div className="space-y-4 bg-vibrant-grey-bg/30 p-4 md:p-6 rounded-card-custom border border-hairline-soft/80 text-left mt-6">
        <div className="flex items-center gap-2 border-b border-hairline-soft pb-2.5">
          <Settings className="w-4 h-4 text-vibrant-purple-dark" />
          <TextApp id="file-sec2-title" variant="h4" weight="bold">
            Live Interactive FileUpload Playground
          </TextApp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <TextApp id="file-play-var-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                Variant (`variant="..."`)
              </TextApp>
              <div className="flex gap-2">
                {(["dropzone", "default", "avatar"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setPlayVariant(v)}
                    className={cn(
                      "flex-1 px-2.5 py-1.5 text-xs font-semibold rounded border transition-all cursor-pointer capitalize",
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

            <div className="grid grid-cols-2 gap-2">
              <div>
                <TextApp id="file-play-sz-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                  Size (`size`)
                </TextApp>
                <div className="flex gap-1">
                  {(["sm", "md", "lg"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setPlaySize(s)}
                      className={cn(
                        "flex-1 px-2 py-1 text-xs font-semibold rounded border transition-all cursor-pointer uppercase",
                        playSize === s
                          ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                          : "bg-surface text-ink-secondary border-hairline-soft"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <TextApp id="file-play-rnd-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                  Rounded (`rounded`)
                </TextApp>
                <select
                  value={playRounded}
                  onChange={(e) => setPlayRounded(e.target.value as any)}
                  className="w-full text-xs font-semibold bg-surface border border-hairline-soft rounded px-2 py-1 text-ink"
                >
                  <option value="none">none</option>
                  <option value="sm">sm</option>
                  <option value="md">md</option>
                  <option value="lg">lg</option>
                  <option value="xl">xl</option>
                  <option value="full">full</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={playMultiple}
                  onChange={(e) => setPlayMultiple(e.target.checked)}
                  className="rounded text-vibrant-purple border-hairline focus:ring-vibrant-purple"
                />
                <TextApp id="file-play-multi-text" variant="caption" weight="semibold" className="text-ink-secondary">
                  Multi-file Select (`multiple`)
                </TextApp>
              </label>

              <br />

              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={playDisabled}
                  onChange={(e) => setPlayDisabled(e.target.checked)}
                  className="rounded text-vibrant-purple border-hairline focus:ring-vibrant-purple"
                />
                <TextApp id="file-play-dis-text" variant="caption" weight="semibold" className="text-ink-secondary">
                  Non-aktifkan Control (`disabled`)
                </TextApp>
              </label>
            </div>
          </div>

          {/* Result Output */}
          <div className="space-y-4 bg-surface p-4 rounded-xl border border-hairline-soft">
            <TextApp id="file-play-output-label" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider block">
              Live Interactive Result
            </TextApp>
            <div className="p-4 bg-vibrant-grey-bg/15 rounded-lg border border-hairline-soft border-dashed min-h-[160px] flex items-center justify-center">
              <FileUploadApp
                id="interactive-file-uploader"
                label="Uploader Interaktif"
                description="Coba drag-and-drop berkas langsung ke area ini"
                variant={playVariant}
                size={playSize}
                rounded={playRounded}
                disabled={playDisabled}
                multiple={playMultiple}
                accept={playAccept}
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <TextApp id="file-play-code-title" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider flex items-center gap-1">
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
          <TextApp id="file-info-title" variant="body" weight="bold" className="text-ink">
            Foundation Design System FileUpload Matrix &amp; Rules
          </TextApp>
          <TextApp id="file-info-desc" variant="caption" className="text-ink-secondary block">
            Komponen <code>FileUploadApp</code> mematuhi spesifikasi Spacing Step 1.5 (6px / <code>gap-1.5</code>) antara Upload Icon dengan Text Instruksi, Step 2 (8px / <code>p-2</code>) untuk padding internal File List Item, Step 4 (16px / <code>p-4</code>) untuk padding Dropzone area standar, dan Step 6 (24px / <code>p-6</code>) untuk Large Dropzone area. Seluruh label teks dikonstruksi menggunakan <code>TextApp</code>.
          </TextApp>
        </div>
      </div>
    </ModuleCard>
  );
}
