import * as React from "react";
import {
  SeparatorApp,
  CardApp,
  TextApp,
  BadgeApp,
  ButtonApp,
  SelectApp,
  InputApp,
  SeparatorOrientation,
  SeparatorStyle,
  SeparatorThickness,
  SeparatorVariant,
  SeparatorLabelAlign,
} from "@/packages/design-system";
import {
  Minus,
  Sparkles,
  Code,
  Check,
  Split,
  Layers,
  Palette,
  Maximize2,
  FileText,
  User,
  CreditCard,
  Building,
  Activity,
  Tag,
} from "lucide-react";
import { ModuleCard } from "./ModuleCard";

export function SeparatorDisplayModule() {
  // Playground state
  const [playOrientation, setPlayOrientation] = React.useState<SeparatorOrientation>("horizontal");
  const [playStyle, setPlayStyle] = React.useState<SeparatorStyle>("solid");
  const [playThickness, setPlayThickness] = React.useState<SeparatorThickness>("1px");
  const [playVariant, setPlayVariant] = React.useState<SeparatorVariant>("vibrant");
  const [playLabel, setPlayLabel] = React.useState("ATAU (OR)");
  const [playLabelAlign, setPlayLabelAlign] = React.useState<SeparatorLabelAlign>("center");
  const [copied, setCopied] = React.useState(false);

  const labelPropStr = playLabel.trim() ? `\n  label="${playLabel}"` : "";
  const alignPropStr = playLabel.trim() && playLabelAlign !== "center" ? `\n  labelAlign="${playLabelAlign}"` : "";

  const codeSnippet = `<SeparatorApp
  id="my-separator"
  orientation="${playOrientation}"
  styleType="${playStyle}"
  thickness="${playThickness}"
  variant="${playVariant}"${labelPropStr}${alignPropStr}
/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8" id="uikit-separator-module">
      {/* Overview Card */}
      <CardApp id="separator-overview" variant="neutral" size="md" rounded="card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BadgeApp id="sep-badge-core" variant="solidPurple" size="sm">
                02 - Core UI
              </BadgeApp>
              <BadgeApp id="sep-badge-atom" variant="vibrantPurple" size="sm">
                Separator Atom
              </BadgeApp>
            </div>
            <TextApp id="sep-title" variant="h3" weight="bold">
              Divider / Separator (`SeparatorApp`)
            </TextApp>
            <TextApp id="sep-sub" variant="body" color="secondary">
              Garis pemisah visual untuk membedakan blok konten. Mendukung orientasi (**Horizontal, Vertical**), 
              **Label Teks** (e.g. &quot;OR&quot;, &quot;Detail Pajak&quot;), alignment label (**Start, Center, End**), 
              **Ketebalan Line** (1px, 2px, 4px), **Pola Garis** (Solid, Dashed, Dotted), dan varian warna semantik.
            </TextApp>
          </div>
        </div>
      </CardApp>

      {/* 1. Horizontal vs Vertical Dividers */}
      <ModuleCard
        id="separator-orientations-module"
        icon={<Split className="w-5 h-5 text-vibrant-purple-dark" />}
        title="1. Orientasi Line (Horizontal &amp; Vertical)"
        description="Pemisah horizontal untuk membagi baris paragraf / form, serta pemisah vertikal untuk memisahkan statistik / navigasi header."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Horizontal Layout Demo */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink">Horizontal Divider (Default)</span>
              <BadgeApp id="b-ori-horiz" variant="solidPurple" size="sm">Horizontal</BadgeApp>
            </div>
            <p className="text-xs text-ink-muted">
              Membagi baris form atau section dalam kartu secara horizontal.
            </p>
            <div className="p-3 bg-surface-soft/60 rounded-lg space-y-2 text-xs text-ink">
              <div className="flex justify-between items-center">
                <span>Pokok Pajak PBB-P2</span>
                <span className="font-semibold">Rp 12.500.000</span>
              </div>
              <SeparatorApp id="demo-sep-horiz-1" variant="subtle" />
              <div className="flex justify-between items-center">
                <span>Denda Keterlambatan</span>
                <span className="font-semibold text-rose-600">Rp 250.000</span>
              </div>
              <SeparatorApp id="demo-sep-horiz-2" variant="vibrant" thickness="2px" />
              <div className="flex justify-between items-center font-bold text-vibrant-purple-dark pt-1">
                <span>Total Tagihan Akhir</span>
                <span>Rp 12.750.000</span>
              </div>
            </div>
          </div>

          {/* Vertical Layout Demo */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink">Vertical Divider</span>
              <BadgeApp id="b-ori-vert" variant="neutral" size="sm">Vertical</BadgeApp>
            </div>
            <p className="text-xs text-ink-muted">
              Membagi kolom informasi atau metrik secara vertikal dalam satu baris flex.
            </p>
            <div className="p-4 bg-surface-soft/60 rounded-lg flex items-center justify-around text-center">
              <div>
                <p className="text-[10px] text-ink-muted uppercase tracking-wider font-semibold">Total WP</p>
                <p className="text-base font-bold text-ink">1,420</p>
              </div>
              <SeparatorApp id="demo-sep-vert-1" orientation="vertical" variant="subtle" className="h-10" />
              <div>
                <p className="text-[10px] text-ink-muted uppercase tracking-wider font-semibold">Sudah Bayar</p>
                <p className="text-base font-bold text-emerald-600">1,180</p>
              </div>
              <SeparatorApp id="demo-sep-vert-2" orientation="vertical" variant="vibrant" thickness="2px" className="h-10" />
              <div>
                <p className="text-[10px] text-ink-muted uppercase tracking-wider font-semibold">Tunggakan</p>
                <p className="text-base font-bold text-rose-600">240</p>
              </div>
            </div>
          </div>
        </div>
      </ModuleCard>

      {/* 2. Text Labels & Alignment (Center, Start, End) */}
      <ModuleCard
        id="separator-text-labels-module"
        icon={<FileText className="w-5 h-5 text-vibrant-purple-dark" />}
        title="2. Dividers with Text Labels &amp; Alignment"
        description="Pemisah dilengkapi teks indikator (e.g., 'OR', 'INFORMASI KEUANGAN') dengan posisi teks di tengah (Center), kiri (Start), atau kanan (End)."
      >
        <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-6">
          {/* Center Label */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-ink flex items-center gap-2">
              Label Alignment: Center (Default)
              <BadgeApp id="b-align-center" variant="solidPurple" size="sm">Center</BadgeApp>
            </span>
            <SeparatorApp id="demo-sep-label-center" label="ATAU LOGIN DENGAN NIK" variant="subtle" />
          </div>

          {/* Start / Left Label */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-ink flex items-center gap-2">
              Label Alignment: Start (Kiri)
              <BadgeApp id="b-align-start" variant="vibrantPurple" size="sm">Start</BadgeApp>
            </span>
            <SeparatorApp id="demo-sep-label-start" label="INFORMASI WAJIB PAJAK" labelAlign="start" variant="vibrant" thickness="2px" />
          </div>

          {/* End / Right Label */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-ink flex items-center gap-2">
              Label Alignment: End (Kanan)
              <BadgeApp id="b-align-end" variant="neutral" size="sm">End</BadgeApp>
            </span>
            <SeparatorApp id="demo-sep-label-end" label="DETAIL TRANSAKSI TERAKHIR" labelAlign="end" variant="soft" />
          </div>

          {/* Badge Label Custom Node */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-ink flex items-center gap-2">
              Custom Node Label (Badge / Icon Inside Separator)
              <BadgeApp id="b-custom-label" variant="solidAmber" size="sm">Badge Label</BadgeApp>
            </span>
            <SeparatorApp
              id="demo-sep-label-badge"
              label={
                <BadgeApp id="inner-sep-badge" variant="solidPurple" size="sm" icon={<Sparkles className="w-3 h-3" />}>
                  REKAPITULASI BPKAD 2026
                </BadgeApp>
              }
              variant="vibrant"
              thickness="2px"
            />
          </div>
        </div>
      </ModuleCard>

      {/* 3. Style Patterns (Solid, Dashed, Dotted) */}
      <ModuleCard
        id="separator-styles-module"
        icon={<Layers className="w-5 h-5 text-vibrant-purple-dark" />}
        title="3. Style Pola Garis (Solid, Dashed, Dotted)"
        description="Variasi pola garis pemisah untuk konteks desain yang berbeda (misalnya receipt / bukti potong pajak menggunakan Dashed/Dotted)."
      >
        <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-6">
          {/* Solid */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold text-ink">
              <span>Solid Line (Default)</span>
              <span className="font-mono text-ink-muted">styleType=&quot;solid&quot;</span>
            </div>
            <SeparatorApp id="demo-style-solid" styleType="solid" variant="subtle" />
          </div>

          {/* Dashed */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold text-ink">
              <span>Dashed Line (Garis Putus-Putus)</span>
              <span className="font-mono text-ink-muted">styleType=&quot;dashed&quot;</span>
            </div>
            <SeparatorApp id="demo-style-dashed" styleType="dashed" variant="vibrant" thickness="2px" label="BUKTI POTONG PAJAK" />
          </div>

          {/* Dotted */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold text-ink">
              <span>Dotted Line (Garis Titik-Titik)</span>
              <span className="font-mono text-ink-muted">styleType=&quot;dotted&quot;</span>
            </div>
            <SeparatorApp id="demo-style-dotted" styleType="dotted" variant="brand" thickness="2px" />
          </div>
        </div>
      </ModuleCard>

      {/* 4. Ketebalan Line (Thickness) */}
      <ModuleCard
        id="separator-thickness-module"
        icon={<Maximize2 className="w-5 h-5 text-vibrant-purple-dark" />}
        title="4. Skala Ketebalan Line (1px, 2px, 4px)"
        description="Ukuran ketebalan garis dari halus (1px), sedang (2px), hingga aksen tebal (4px)."
      >
        <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-6">
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold text-ink">
              <span>Halus (1px)</span>
              <span className="font-mono text-ink-muted">thickness=&quot;1px&quot;</span>
            </div>
            <SeparatorApp id="demo-thick-1" thickness="1px" variant="subtle" />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold text-ink">
              <span>Sedang (2px)</span>
              <span className="font-mono text-ink-muted">thickness=&quot;2px&quot;</span>
            </div>
            <SeparatorApp id="demo-thick-2" thickness="2px" variant="vibrant" />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold text-ink">
              <span>Tebal / Heavy Accent (4px)</span>
              <span className="font-mono text-ink-muted">thickness=&quot;4px&quot;</span>
            </div>
            <SeparatorApp id="demo-thick-4" thickness="4px" variant="brand" />
          </div>
        </div>
      </ModuleCard>

      {/* 5. Color Variants (Subtle, Soft, Hard, Vibrant, Semantics) */}
      <ModuleCard
        id="separator-colors-module"
        icon={<Palette className="w-5 h-5 text-vibrant-purple-dark" />}
        title="5. Color Variants &amp; Semantic Colors"
        description="Warna garis pemisah dari netral hairline hingga warna semantik (Success, Warning, Error, Info)."
      >
        <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-ink block">Neutrals &amp; Brand</span>
              <div className="space-y-2">
                <SeparatorApp id="c-subtle" variant="subtle" label="Subtle Hairline" />
                <SeparatorApp id="c-soft" variant="soft" label="Soft Neutral" />
                <SeparatorApp id="c-hard" variant="hard" label="Hard Neutral" />
                <SeparatorApp id="c-vibrant" variant="vibrant" thickness="2px" label="Vibrant Purple" />
                <SeparatorApp id="c-brand" variant="brand" thickness="2px" label="Brand Purple" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-ink block">Semantics (Success, Warning, Error, Info)</span>
              <div className="space-y-2">
                <SeparatorApp id="c-succ" variant="success" thickness="2px" label="Success Green" />
                <SeparatorApp id="c-warn" variant="warning" thickness="2px" label="Warning Amber" />
                <SeparatorApp id="c-err" variant="error" thickness="2px" label="Error Red" />
                <SeparatorApp id="c-info" variant="info" thickness="2px" label="Info Sky" />
              </div>
            </div>
          </div>
        </div>
      </ModuleCard>

      {/* 6. Interactive Separator Playground */}
      <ModuleCard
        id="separator-playground-module"
        icon={<Sparkles className="w-5 h-5 text-vibrant-purple-dark" />}
        title="6. Interactive Separator Playground"
        description="Uji coba konfigurasi orientasi, pola garis, ketebalan, warna, label teks, dan posisi label secara real-time."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            {/* Label Input */}
            <div>
              <label className="text-xs font-semibold text-ink mb-1 block">Teks Label (Opsional)</label>
              <InputApp
                id="sep-play-label"
                value={playLabel}
                onChange={(e) => setPlayLabel(e.target.value)}
                placeholder="Kosongkan jika tanpa label..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Orientation */}
              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Orientasi</label>
                <SelectApp
                  id="sep-play-orientation"
                  value={playOrientation}
                  onChange={(e) => setPlayOrientation(e.target.value as SeparatorOrientation)}
                  options={[
                    { value: "horizontal", label: "Horizontal (Baris)" },
                    { value: "vertical", label: "Vertical (Kolom)" },
                  ]}
                />
              </div>

              {/* Label Align */}
              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Posisi Label (Alignment)</label>
                <SelectApp
                  id="sep-play-align"
                  value={playLabelAlign}
                  onChange={(e) => setPlayLabelAlign(e.target.value as SeparatorLabelAlign)}
                  options={[
                    { value: "center", label: "Center (Tengah)" },
                    { value: "start", label: "Start (Kiri / Atas)" },
                    { value: "end", label: "End (Kanan / Bawah)" },
                  ]}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {/* Style */}
              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Pola Garis</label>
                <SelectApp
                  id="sep-play-style"
                  value={playStyle}
                  onChange={(e) => setPlayStyle(e.target.value as SeparatorStyle)}
                  options={[
                    { value: "solid", label: "Solid" },
                    { value: "dashed", label: "Dashed" },
                    { value: "dotted", label: "Dotted" },
                  ]}
                />
              </div>

              {/* Thickness */}
              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Ketebalan</label>
                <SelectApp
                  id="sep-play-thick"
                  value={playThickness}
                  onChange={(e) => setPlayThickness(e.target.value as SeparatorThickness)}
                  options={[
                    { value: "1px", label: "1px (Halus)" },
                    { value: "2px", label: "2px (Sedang)" },
                    { value: "4px", label: "4px (Tebal)" },
                  ]}
                />
              </div>

              {/* Variant */}
              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Warna Line</label>
                <SelectApp
                  id="sep-play-variant"
                  value={playVariant}
                  onChange={(e) => setPlayVariant(e.target.value as SeparatorVariant)}
                  options={[
                    { value: "vibrant", label: "Vibrant Purple" },
                    { value: "brand", label: "Brand Purple" },
                    { value: "subtle", label: "Subtle Hairline" },
                    { value: "soft", label: "Soft Neutral" },
                    { value: "hard", label: "Hard Neutral" },
                    { value: "success", label: "Success Green" },
                    { value: "warning", label: "Warning Amber" },
                    { value: "error", label: "Error Red" },
                    { value: "info", label: "Info Sky" },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Live Preview Result */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-surface-soft/60 p-6 rounded-2xl border border-hairline-soft">
            <div className="space-y-6">
              <TextApp id="prev-sep-h" variant="caption" weight="bold" className="uppercase tracking-wider text-ink-muted">
                Hasil Live Preview
              </TextApp>

              <div className="flex items-center justify-center p-8 bg-surface rounded-xl border border-hairline-soft min-h-[120px] w-full">
                {playOrientation === "horizontal" ? (
                  <div className="w-full max-w-lg">
                    <TextApp id="prev-text-top" variant="body" color="secondary" className="text-xs mb-2 text-center">
                      Elemen Konten Atas
                    </TextApp>
                    <SeparatorApp
                      id="playground-interactive-separator"
                      orientation={playOrientation}
                      styleType={playStyle}
                      thickness={playThickness}
                      variant={playVariant}
                      label={playLabel || undefined}
                      labelAlign={playLabelAlign}
                    />
                    <TextApp id="prev-text-bottom" variant="body" color="secondary" className="text-xs mt-2 text-center">
                      Elemen Konten Bawah
                    </TextApp>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-4 h-32">
                    <TextApp id="prev-text-left" variant="body" color="secondary" className="text-xs">
                      Konten Kiri
                    </TextApp>
                    <SeparatorApp
                      id="playground-interactive-separator-v"
                      orientation={playOrientation}
                      styleType={playStyle}
                      thickness={playThickness}
                      variant={playVariant}
                      label={playLabel || undefined}
                      labelAlign={playLabelAlign}
                      className="h-28"
                    />
                    <TextApp id="prev-text-right" variant="body" color="secondary" className="text-xs">
                      Konten Kanan
                    </TextApp>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-vibrant-purple-dark" />
                    <TextApp id="code-sep-h" variant="caption" weight="bold" className="uppercase">
                      Generated Code
                    </TextApp>
                  </div>
                  <ButtonApp
                    id="copy-sep-code"
                    variant="ghost"
                    size="sm"
                    onClick={copyCode}
                    className="h-7 text-xs px-2 gap-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : null}
                    {copied ? "Tersalin" : "Salin Kode"}
                  </ButtonApp>
                </div>

                <pre className="p-3 bg-zinc-950 text-zinc-100 rounded-lg text-[11px] font-mono leading-relaxed overflow-x-auto max-h-[220px]">
                  <code>{codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </ModuleCard>
    </div>
  );
}
