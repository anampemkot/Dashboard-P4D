import * as React from "react";
import {
  TooltipApp,
  CardApp,
  TextApp,
  BadgeApp,
  ButtonApp,
  SelectApp,
  InputApp,
  CheckboxApp,
  TooltipPosition,
  TooltipTheme,
  TooltipMaxWidth,
} from "@/packages/design-system";
import {
  HelpCircle,
  Sparkles,
  Code,
  Check,
  Info,
  ExternalLink,
  Compass,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  FileText,
  Clock,
  Palette,
  MousePointer,
} from "lucide-react";

export function TooltipDisplayModule() {
  // Playground state
  const [playTitle, setPlayTitle] = React.useState("Petunjuk Pajak PBB-P2");
  const [playContent, setPlayContent] = React.useState("Pembayaran pajak tepat waktu menghindari denda 2% per bulan.");
  const [playHasLink, setPlayHasLink] = React.useState(true);
  const [playLinkLabel, setPlayLinkLabel] = React.useState("Lihat Regulasi Lengkap");
  const [playPosition, setPlayPosition] = React.useState<TooltipPosition>("top");
  const [playTheme, setPlayTheme] = React.useState<TooltipTheme>("dark");
  const [playShowArrow, setPlayShowArrow] = React.useState(true);
  const [playDelayMs, setPlayDelayMs] = React.useState(150);
  const [playTrigger, setPlayTrigger] = React.useState<"hover" | "click">("hover");
  const [playMaxWidth, setPlayMaxWidth] = React.useState<TooltipMaxWidth>("sm");
  const [copied, setCopied] = React.useState(false);

  const titlePropStr = playTitle.trim() ? `\n  title="${playTitle}"` : "";
  const linkPropStr = playHasLink && playLinkLabel.trim()
    ? `\n  link={{ label: "${playLinkLabel}", href: "https://pajak.go.id" }}`
    : "";
  const arrowPropStr = !playShowArrow ? `\n  showArrow={false}` : "";
  const delayPropStr = playDelayMs !== 150 ? `\n  delayMs={${playDelayMs}}` : "";
  const triggerPropStr = playTrigger !== "hover" ? `\n  trigger="${playTrigger}"` : "";
  const maxWidthPropStr = playMaxWidth !== "sm" ? `\n  maxWidth="${playMaxWidth}"` : "";

  const codeSnippet = `<TooltipApp
  id="my-tooltip"
  content="${playContent}"${titlePropStr}${linkPropStr}
  position="${playPosition}"
  theme="${playTheme}"${arrowPropStr}${delayPropStr}${triggerPropStr}${maxWidthPropStr}
>
  <ButtonApp id="trigger-btn" variant="vibrantPurple">
    Hover Me
  </ButtonApp>
</TooltipApp>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6" id="uikit-tooltip-module">
      {/* Header Overview */}
      <CardApp id="tooltip-overview" variant="neutral" size="md" rounded="card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BadgeApp id="tt-badge-core" variant="solidPurple" size="sm">
                02 - Core UI
              </BadgeApp>
              <BadgeApp id="tt-badge-atom" variant="vibrantPurple" size="sm">
                Tooltip Atom
              </BadgeApp>
            </div>
            <TextApp id="tt-title" variant="h3" weight="bold">
              Tooltip (`TooltipApp`)
            </TextApp>
            <TextApp id="tt-sub" variant="body" color="secondary">
              Pop-up info kontekstual ringkas saat user menyorot (hover) atau mengklik elemen. Mendukung 
              **Text Only**, **With Title**, **With Action Link**, 8 pilihan **Positioning**, **Theme Colors**, 
              **Arrow Indicator**, **Hover Delay**, **Triggers**, dan **Max Width / Text Wrap**.
            </TextApp>
          </div>
        </div>
      </CardApp>

      {/* SINGLE UNIFIED CARD SHOWCASE CONTAINER */}
      <CardApp id="tooltip-main-unified-card" variant="neutral" size="lg" rounded="card">
        <div className="space-y-8">
          
          {/* Sub-Section 1: Content Variations (Text only, With Title, With Link) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="tt-sub-1-h" variant="h4" weight="bold">
                  1. Content Variations (Text Only, With Title, With Link)
                </TextApp>
              </div>
              <BadgeApp id="b-sub-1" variant="solidPurple" size="sm">3 Types</BadgeApp>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Type 1: Text Only */}
              <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-ink block mb-1">Type A: Text Only</span>
                  <p className="text-xs text-ink-muted">Tooltip ringkas 1 paragraf tanpa judul atau aksi tambahan.</p>
                </div>
                <div className="pt-2 flex justify-center">
                  <TooltipApp
                    id="tt-demo-text-only"
                    content="NOP (Nomor Objek Pajak) terdiri dari 18 digit angka unik."
                    position="top"
                    theme="dark"
                  >
                    <ButtonApp id="btn-tt-text" variant="outline" size="sm" className="gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-ink-muted" />
                      <span>Hover NOP Info</span>
                    </ButtonApp>
                  </TooltipApp>
                </div>
              </div>

              {/* Type 2: With Title */}
              <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-ink block mb-1">Type B: With Title</span>
                  <p className="text-xs text-ink-muted">Tooltip dengan Header Title tebal untuk hierarki informasi lebih jelas.</p>
                </div>
                <div className="pt-2 flex justify-center">
                  <TooltipApp
                    id="tt-demo-with-title"
                    title="Masa Jatuh Tempo"
                    content="Jatuh tempo penetapan SPPT PBB-P2 adalah 31 Agustus 2026."
                    position="top"
                    theme="dark"
                  >
                    <ButtonApp id="btn-tt-title" variant="vibrantPurple" size="sm" className="gap-1.5">
                      <Info className="w-3.5 h-3.5" />
                      <span>Hover Jatuh Tempo</span>
                    </ButtonApp>
                  </TooltipApp>
                </div>
              </div>

              {/* Type 3: With Link */}
              <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-ink block mb-1">Type C: With Action Link</span>
                  <p className="text-xs text-ink-muted">Tooltip interaktif dengan link/tombol navigasi ke halaman eksternal.</p>
                </div>
                <div className="pt-2 flex justify-center">
                  <TooltipApp
                    id="tt-demo-with-link"
                    title="Bebas Denda Pajak"
                    content="Program pemutihan denda berlaku hingga akhir bulan ini."
                    link={{ label: "Pelajari Syarat & Ketentuan", href: "#" }}
                    position="top"
                    theme="dark"
                  >
                    <ButtonApp id="btn-tt-link" variant="primary" size="sm" className="gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Hover Syarat Pemutihan</span>
                    </ButtonApp>
                  </TooltipApp>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Section 2: Positioning (Top, Bottom, Left, Right, Alignments) */}
          <div className="space-y-4 pt-4 border-t border-hairline-soft">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="tt-sub-2-h" variant="h4" weight="bold">
                  2. Positioning &amp; Edge Alignments (Top, Bottom, Left, Right)
                </TextApp>
              </div>
              <BadgeApp id="b-sub-2" variant="vibrantPurple" size="sm">8 Positions</BadgeApp>
            </div>

            <div className="p-6 bg-surface rounded-xl border border-hairline-soft space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {/* Top */}
                <div className="p-4 bg-surface-soft/60 rounded-lg flex flex-col items-center justify-center gap-2">
                  <TooltipApp id="tt-pos-top" position="top" content="Tooltip berada tepat di Atas (Top)" forceOpen>
                    <ButtonApp id="btn-p-top" variant="outline" size="sm" className="gap-1.5">
                      <ArrowUp className="w-3.5 h-3.5" />
                      <span>Top</span>
                    </ButtonApp>
                  </TooltipApp>
                  <span className="text-[10px] text-ink-muted font-mono mt-8">position=&quot;top&quot;</span>
                </div>

                {/* Bottom */}
                <div className="p-4 bg-surface-soft/60 rounded-lg flex flex-col items-center justify-center gap-2">
                  <span className="text-[10px] text-ink-muted font-mono mb-8">position=&quot;bottom&quot;</span>
                  <TooltipApp id="tt-pos-bottom" position="bottom" content="Tooltip berada tepat di Bawah (Bottom)" forceOpen>
                    <ButtonApp id="btn-p-bottom" variant="outline" size="sm" className="gap-1.5">
                      <ArrowDown className="w-3.5 h-3.5" />
                      <span>Bottom</span>
                    </ButtonApp>
                  </TooltipApp>
                </div>

                {/* Left */}
                <div className="p-4 bg-surface-soft/60 rounded-lg flex flex-col items-center justify-center gap-2">
                  <TooltipApp id="tt-pos-left" position="left" content="Tooltip berada di Kiri (Left)" forceOpen>
                    <ButtonApp id="btn-p-left" variant="outline" size="sm" className="gap-1.5">
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Left</span>
                    </ButtonApp>
                  </TooltipApp>
                  <span className="text-[10px] text-ink-muted font-mono mt-8">position=&quot;left&quot;</span>
                </div>

                {/* Right */}
                <div className="p-4 bg-surface-soft/60 rounded-lg flex flex-col items-center justify-center gap-2">
                  <TooltipApp id="tt-pos-right" position="right" content="Tooltip berada di Kanan (Right)" forceOpen>
                    <ButtonApp id="btn-p-right" variant="outline" size="sm" className="gap-1.5">
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>Right</span>
                    </ButtonApp>
                  </TooltipApp>
                  <span className="text-[10px] text-ink-muted font-mono mt-8">position=&quot;right&quot;</span>
                </div>
              </div>

              {/* Edge Alignments */}
              <div className="pt-2">
                <TextApp id="edge-align-title" variant="caption" weight="bold" className="uppercase tracking-wider text-ink-muted block mb-3">
                  Edge Alignments (Start &amp; End)
                </TextApp>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <TooltipApp id="tt-top-start" position="top-start" content="Aligned Top-Start (Kiri Atas)">
                    <ButtonApp id="btn-ts" variant="outline" size="sm" className="w-full text-xs">top-start</ButtonApp>
                  </TooltipApp>

                  <TooltipApp id="tt-top-end" position="top-end" content="Aligned Top-End (Kanan Atas)">
                    <ButtonApp id="btn-te" variant="outline" size="sm" className="w-full text-xs">top-end</ButtonApp>
                  </TooltipApp>

                  <TooltipApp id="tt-bottom-start" position="bottom-start" content="Aligned Bottom-Start (Kiri Bawah)">
                    <ButtonApp id="btn-bs" variant="outline" size="sm" className="w-full text-xs">bottom-start</ButtonApp>
                  </TooltipApp>

                  <TooltipApp id="tt-bottom-end" position="bottom-end" content="Aligned Bottom-End (Kanan Bawah)">
                    <ButtonApp id="btn-be" variant="outline" size="sm" className="w-full text-xs">bottom-end</ButtonApp>
                  </TooltipApp>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Section 3: Background Color Themes */}
          <div className="space-y-4 pt-4 border-t border-hairline-soft">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="tt-sub-3-h" variant="h4" weight="bold">
                  3. Background Color Themes (Dark, Light, Vibrant &amp; Semantics)
                </TextApp>
              </div>
              <BadgeApp id="b-sub-3" variant="solidPurple" size="sm">8 Themes</BadgeApp>
            </div>

            <div className="p-6 bg-surface rounded-xl border border-hairline-soft">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {/* Dark */}
                <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2">
                  <TooltipApp id="tt-th-dark" theme="dark" title="Dark Theme" content="Kombinasi klasik gelap kontras tinggi." position="top">
                    <BadgeApp id="b-th-dark" variant="neutral" size="md">Dark (Default)</BadgeApp>
                  </TooltipApp>
                  <span className="text-[10px] text-ink-muted font-mono">theme=&quot;dark&quot;</span>
                </div>

                {/* Light */}
                <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2">
                  <TooltipApp id="tt-th-light" theme="light" title="Light Theme" content="Kartu terang dengan border hairline." position="top">
                    <BadgeApp id="b-th-light" variant="neutral" size="md">Light Theme</BadgeApp>
                  </TooltipApp>
                  <span className="text-[10px] text-ink-muted font-mono">theme=&quot;light&quot;</span>
                </div>

                {/* Vibrant */}
                <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2">
                  <TooltipApp id="tt-th-vibrant" theme="vibrant" title="Vibrant Theme" content="Aksen warna ungu vibrant menonjol." position="top">
                    <BadgeApp id="b-th-vibrant" variant="vibrantPurple" size="md">Vibrant Purple</BadgeApp>
                  </TooltipApp>
                  <span className="text-[10px] text-ink-muted font-mono">theme=&quot;vibrant&quot;</span>
                </div>

                {/* Brand */}
                <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2">
                  <TooltipApp id="tt-th-brand" theme="brand" title="Brand Theme" content="Aksen warna ungu identitas brand." position="top">
                    <BadgeApp id="b-th-brand" variant="solidPurple" size="md">Brand Purple</BadgeApp>
                  </TooltipApp>
                  <span className="text-[10px] text-ink-muted font-mono">theme=&quot;brand&quot;</span>
                </div>

                {/* Info */}
                <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2">
                  <TooltipApp id="tt-th-info" theme="info" title="Info State" content="Status petunjuk informasi umum." position="top">
                    <BadgeApp id="b-th-info" variant="solidInfo" size="md">Info Sky</BadgeApp>
                  </TooltipApp>
                  <span className="text-[10px] text-ink-muted font-mono">theme=&quot;info&quot;</span>
                </div>

                {/* Success */}
                <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2">
                  <TooltipApp id="tt-th-success" theme="success" title="Success State" content="Petunjuk status sukses / terverifikasi." position="top">
                    <BadgeApp id="b-th-success" variant="solidSuccess" size="md">Success Green</BadgeApp>
                  </TooltipApp>
                  <span className="text-[10px] text-ink-muted font-mono">theme=&quot;success&quot;</span>
                </div>

                {/* Warning */}
                <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2">
                  <TooltipApp id="tt-th-warning" theme="warning" title="Warning State" content="Peringatan penting tenggat waktu." position="top">
                    <BadgeApp id="b-th-warning" variant="solidWarning" size="md">Warning Amber</BadgeApp>
                  </TooltipApp>
                  <span className="text-[10px] text-ink-muted font-mono">theme=&quot;warning&quot;</span>
                </div>

                {/* Error */}
                <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2">
                  <TooltipApp id="tt-th-error" theme="error" title="Error State" content="Indikasi kesalahan atau tunggakan." position="top">
                    <BadgeApp id="b-th-error" variant="solidError" size="md">Error Red</BadgeApp>
                  </TooltipApp>
                  <span className="text-[10px] text-ink-muted font-mono">theme=&quot;error&quot;</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Section 4: Triggers, Delay & Arrow Indicator */}
          <div className="space-y-4 pt-4 border-t border-hairline-soft">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="tt-sub-4-h" variant="h4" weight="bold">
                  4. Hover Delay, Triggers &amp; Arrow Indicator
                </TextApp>
              </div>
              <BadgeApp id="b-sub-4" variant="solidPurple" size="sm">Behavior</BadgeApp>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Instant vs Delay */}
              <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
                <span className="text-xs font-bold text-ink block">Hover Delay (0ms vs 500ms)</span>
                <div className="flex items-center gap-2 pt-1">
                  <TooltipApp id="tt-delay-0" delayMs={0} content="Tampil seketika tanpa delay (0ms)">
                    <ButtonApp id="btn-del-0" variant="outline" size="sm">0ms (Instant)</ButtonApp>
                  </TooltipApp>
                  <TooltipApp id="tt-delay-500" delayMs={500} content="Tampil setelah tunda 500ms">
                    <ButtonApp id="btn-del-500" variant="outline" size="sm">500ms Delay</ButtonApp>
                  </TooltipApp>
                </div>
              </div>

              {/* Trigger Click vs Hover */}
              <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
                <span className="text-xs font-bold text-ink block">Trigger Event (Hover vs Click)</span>
                <div className="flex items-center gap-2 pt-1">
                  <TooltipApp id="tt-trig-hover" trigger="hover" content="Tampil saat mouse hover">
                    <ButtonApp id="btn-trig-h" variant="vibrantPurple" size="sm">Hover Trigger</ButtonApp>
                  </TooltipApp>
                  <TooltipApp id="tt-trig-click" trigger="click" title="Klik Aktif" content="Klik kembali untuk menutup tooltip ini.">
                    <ButtonApp id="btn-trig-c" variant="primary" size="sm">Click Trigger</ButtonApp>
                  </TooltipApp>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
                <span className="text-xs font-bold text-ink block">Arrow Indicator (Show vs Hide)</span>
                <div className="flex items-center gap-2 pt-1">
                  <TooltipApp id="tt-arrow-yes" showArrow={true} content="Dengan segitiga panah indicator">
                    <ButtonApp id="btn-arr-yes" variant="outline" size="sm">With Arrow</ButtonApp>
                  </TooltipApp>
                  <TooltipApp id="tt-arrow-no" showArrow={false} content="Tanpa panah indicator (Clean Floating Box)">
                    <ButtonApp id="btn-arr-no" variant="outline" size="sm">No Arrow</ButtonApp>
                  </TooltipApp>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Section 5: Max Width & Text Wrapping */}
          <div className="space-y-4 pt-4 border-t border-hairline-soft">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <Maximize2 className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="tt-sub-5-h" variant="h4" weight="bold">
                  5. Max Width &amp; Text Wrapping Controls
                </TextApp>
              </div>
              <BadgeApp id="b-sub-5" variant="vibrantPurple" size="sm">Text Wrap</BadgeApp>
            </div>

            <div className="p-6 bg-surface rounded-xl border border-hairline-soft space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Small Max-Width (160px) */}
                <div className="p-3 bg-surface-soft/60 rounded-lg space-y-2 text-center">
                  <span className="text-xs font-bold text-ink block">Small Width (160px)</span>
                  <TooltipApp
                    id="tt-mw-xs"
                    maxWidth="xs"
                    title="Lebar Sempit"
                    content="Teks panjang otomatis dibungkus menjadi beberapa baris rapat."
                    position="top"
                  >
                    <ButtonApp id="btn-mw-xs" variant="outline" size="sm">Hover Max Width XS</ButtonApp>
                  </TooltipApp>
                </div>

                {/* Medium Max-Width (280px) */}
                <div className="p-3 bg-surface-soft/60 rounded-lg space-y-2 text-center">
                  <span className="text-xs font-bold text-ink block">Medium Width (280px - Default)</span>
                  <TooltipApp
                    id="tt-mw-md"
                    maxWidth="md"
                    title="Lebar Standar"
                    content="Cocok untuk mayoritas deskripsi bantuan form pajak dan penjelasan istilah teknis."
                    position="top"
                  >
                    <ButtonApp id="btn-mw-md" variant="outline" size="sm">Hover Max Width MD</ButtonApp>
                  </TooltipApp>
                </div>

                {/* Large Max-Width (360px) */}
                <div className="p-3 bg-surface-soft/60 rounded-lg space-y-2 text-center">
                  <span className="text-xs font-bold text-ink block">Large Width (360px)</span>
                  <TooltipApp
                    id="tt-mw-lg"
                    maxWidth="lg"
                    title="Lebar Luas / Kompleks"
                    content="Menampung rincian kalkulasi rumus pbb-p2, tarif efektif 0.5%, serta informasi pengurang NOPTKP tanpa terlalu banyak pemotongan baris."
                    position="top"
                  >
                    <ButtonApp id="btn-mw-lg" variant="outline" size="sm">Hover Max Width LG</ButtonApp>
                  </TooltipApp>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Section 6: Interactive Tooltip Playground */}
          <div className="space-y-4 pt-4 border-t border-hairline-soft">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="tt-sub-6-h" variant="h4" weight="bold">
                  6. Interactive Tooltip Playground
                </TextApp>
              </div>
              <BadgeApp id="b-sub-6" variant="solidPurple" size="sm">Live Sandbox</BadgeApp>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls Form */}
              <div className="lg:col-span-5 space-y-4">
                {/* Title */}
                <div>
                  <label className="text-xs font-semibold text-ink mb-1 block">Title / Header Tooltip</label>
                  <InputApp
                    id="tt-play-title"
                    value={playTitle}
                    onChange={(e) => setPlayTitle(e.target.value)}
                    placeholder="Judul Tooltip..."
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="text-xs font-semibold text-ink mb-1 block">Content Body Text</label>
                  <InputApp
                    id="tt-play-content"
                    value={playContent}
                    onChange={(e) => setPlayContent(e.target.value)}
                    placeholder="Isi Teks Tooltip..."
                  />
                </div>

                {/* Link Toggle & Label */}
                <div className="p-3 bg-surface-soft/60 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckboxApp
                      id="tt-play-haslink"
                      checked={playHasLink}
                      onChange={(e) => setPlayHasLink(e.target.checked)}
                      label="Sertakan Action Link / Tombol"
                    />
                  </div>
                  {playHasLink && (
                    <InputApp
                      id="tt-play-linklabel"
                      value={playLinkLabel}
                      onChange={(e) => setPlayLinkLabel(e.target.value)}
                      placeholder="Label Teks Link..."
                      className="text-xs mt-1"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Position */}
                  <div>
                    <label className="text-xs font-semibold text-ink mb-1 block">Position</label>
                    <SelectApp
                      id="tt-play-pos"
                      value={playPosition}
                      onChange={(e) => setPlayPosition(e.target.value as TooltipPosition)}
                      options={[
                        { value: "top", label: "Top (Atas Tengah)" },
                        { value: "top-start", label: "Top-Start (Atas Kiri)" },
                        { value: "top-end", label: "Top-End (Atas Kanan)" },
                        { value: "bottom", label: "Bottom (Bawah Tengah)" },
                        { value: "bottom-start", label: "Bottom-Start (Bawah Kiri)" },
                        { value: "bottom-end", label: "Bottom-End (Bawah Kanan)" },
                        { value: "left", label: "Left (Sisi Kiri)" },
                        { value: "right", label: "Right (Sisi Kanan)" },
                      ]}
                    />
                  </div>

                  {/* Theme */}
                  <div>
                    <label className="text-xs font-semibold text-ink mb-1 block">Theme Color</label>
                    <SelectApp
                      id="tt-play-theme"
                      value={playTheme}
                      onChange={(e) => setPlayTheme(e.target.value as TooltipTheme)}
                      options={[
                        { value: "dark", label: "Dark (Slate)" },
                        { value: "light", label: "Light Surface" },
                        { value: "vibrant", label: "Vibrant Purple" },
                        { value: "brand", label: "Brand Purple" },
                        { value: "info", label: "Info Sky" },
                        { value: "success", label: "Success Green" },
                        { value: "warning", label: "Warning Amber" },
                        { value: "error", label: "Error Red" },
                      ]}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {/* Delay */}
                  <div>
                    <label className="text-xs font-semibold text-ink mb-1 block">Delay (ms)</label>
                    <SelectApp
                      id="tt-play-delay"
                      value={String(playDelayMs)}
                      onChange={(e) => setPlayDelayMs(Number(e.target.value))}
                      options={[
                        { value: "0", label: "0ms (Instant)" },
                        { value: "150", label: "150ms" },
                        { value: "300", label: "300ms" },
                        { value: "500", label: "500ms" },
                      ]}
                    />
                  </div>

                  {/* Trigger */}
                  <div>
                    <label className="text-xs font-semibold text-ink mb-1 block">Trigger</label>
                    <SelectApp
                      id="tt-play-trig"
                      value={playTrigger}
                      onChange={(e) => setPlayTrigger(e.target.value as "hover" | "click")}
                      options={[
                        { value: "hover", label: "Hover" },
                        { value: "click", label: "Click" },
                      ]}
                    />
                  </div>

                  {/* Max Width */}
                  <div>
                    <label className="text-xs font-semibold text-ink mb-1 block">Max Width</label>
                    <SelectApp
                      id="tt-play-mw"
                      value={String(playMaxWidth)}
                      onChange={(e) => setPlayMaxWidth(e.target.value as TooltipMaxWidth)}
                      options={[
                        { value: "xs", label: "XS (160px)" },
                        { value: "sm", label: "SM (220px)" },
                        { value: "md", label: "MD (280px)" },
                        { value: "lg", label: "LG (360px)" },
                      ]}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <CheckboxApp
                    id="tt-play-arrow"
                    checked={playShowArrow}
                    onChange={(e) => setPlayShowArrow(e.target.checked)}
                    label="Tampilkan Panah Indicator (Arrow)"
                  />
                </div>
              </div>

              {/* Preview Box & Generated Code */}
              <div className="lg:col-span-7 flex flex-col justify-between bg-surface-soft/60 p-6 rounded-2xl border border-hairline-soft">
                <div className="space-y-6">
                  <TextApp id="prev-tt-h" variant="caption" weight="bold" className="uppercase tracking-wider text-ink-muted">
                    Hasil Live Preview
                  </TextApp>

                  <div className="flex items-center justify-center p-12 bg-surface rounded-xl border border-hairline-soft min-h-[160px] w-full">
                    <TooltipApp
                      id="playground-interactive-tt"
                      title={playTitle || undefined}
                      content={playContent}
                      link={
                        playHasLink && playLinkLabel.trim()
                          ? { label: playLinkLabel, href: "https://pajak.go.id" }
                          : undefined
                      }
                      position={playPosition}
                      theme={playTheme}
                      showArrow={playShowArrow}
                      delayMs={playDelayMs}
                      trigger={playTrigger}
                      maxWidth={playMaxWidth}
                    >
                      <ButtonApp id="btn-play-trigger" variant="vibrantPurple" size="md" className="gap-1.5">
                        <MousePointer className="w-4 h-4" />
                        <span>{playTrigger === "click" ? "Klik Me!" : "Hover Me!"}</span>
                      </ButtonApp>
                    </TooltipApp>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-vibrant-purple-dark" />
                        <TextApp id="code-tt-h" variant="caption" weight="bold" className="uppercase">
                          Generated Code
                        </TextApp>
                      </div>
                      <ButtonApp
                        id="copy-tt-code"
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
          </div>

        </div>
      </CardApp>
    </div>
  );
}
