import * as React from "react";
import {
  BadgeApp,
  CardApp,
  TextApp,
  ButtonApp,
  SelectApp,
  InputApp,
  BadgeVariant,
  BadgeSize,
  BadgeRounded,
} from "@/packages/design-system";
import {
  Sparkles,
  Info,
  Code,
  Check,
  Bell,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  Star,
  Activity,
  Layers,
  Circle,
  Square,
  Maximize2,
  Tag,
  Radio,
} from "lucide-react";
import { ModuleCard } from "./ModuleCard";

export function BadgeDisplayModule() {
  // Playground state
  const [playText, setPlayText] = React.useState("Active Order");
  const [playVariant, setPlayVariant] = React.useState<BadgeVariant>("solidPurple");
  const [playSize, setPlaySize] = React.useState<BadgeSize>("md");
  const [playRounded, setPlayRounded] = React.useState<BadgeRounded>("pill");
  const [playTheme, setPlayTheme] = React.useState<"default" | "playful">("default");
  const [playWithBorder, setPlayWithBorder] = React.useState(false);
  const [playDot, setPlayDot] = React.useState(true);
  const [playDotPulse, setPlayDotPulse] = React.useState(true);
  const [playIconOption, setPlayIconOption] = React.useState<"none" | "check" | "warning" | "bell" | "star">("none");
  const [copied, setCopied] = React.useState(false);

  // Render selected icon for playground
  const getPlaygroundIcon = () => {
    switch (playIconOption) {
      case "check":
        return <Check className="w-3.5 h-3.5" />;
      case "warning":
        return <AlertTriangle className="w-3.5 h-3.5" />;
      case "bell":
        return <Bell className="w-3.5 h-3.5" />;
      case "star":
        return <Star className="w-3.5 h-3.5" />;
      default:
        return undefined;
    }
  };

  const roundedPropStr = playRounded !== "default" ? `\n  rounded="${playRounded}"` : "";
  const borderPropStr = playWithBorder ? `\n  withBorder` : "";
  const themePropStr = playTheme === "playful" ? `\n  theme="playful"` : "";
  const dotPropStr = playDot ? `\n  dot` : "";
  const pulsePropStr = playDot && playDotPulse ? `\n  dotPulse` : "";
  const iconPropStr = playIconOption !== "none" ? `\n  icon={<Icon />}` : "";

  const codeSnippet = `<BadgeApp
  id="my-badge"
  variant="${playVariant}"
  size="${playSize}"${roundedPropStr}${borderPropStr}${themePropStr}${dotPropStr}${pulsePropStr}${iconPropStr}
>
  ${playText}
</BadgeApp>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8" id="uikit-badge-module">
      {/* Overview Card */}
      <CardApp id="badge-overview" variant="neutral" size="md" rounded="card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BadgeApp id="badge-overview-core" variant="solidPurple" size="sm">
                02 - Core UI
              </BadgeApp>
              <BadgeApp id="badge-overview-atom" variant="vibrantPurple" size="sm">
                Atom Component
              </BadgeApp>
            </div>
            <TextApp id="badge-title" variant="h3" weight="bold">
              Badge (`BadgeApp`)
            </TextApp>
            <TextApp id="badge-sub" variant="body" color="secondary">
              Elemen lencana visual untuk **Status**, **Notification Counter**, **Solid &amp; Outline**, 
              dukungan **Label (Teks/Angka)**, warna semantik (**Success, Warning, Error, Info**), 
              opsi **Icon**, ukuran (**Small, Medium**), dan **Foundation Rounded** (Pill, Card, Circle, Square).
            </TextApp>
          </div>
        </div>
      </CardApp>

      {/* 1. Status & Notification Badges */}
      <ModuleCard
        id="badge-status-notification-module"
        icon={<Activity className="w-5 h-5 text-vibrant-purple-dark" />}
        title="1. Status & Notification Badges"
        description="Lencana status dengan titik indikator (Online/Offline/Warning) dan lencana notifikasi berupa penghitung angka (e.g. 99+, 12)."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status Badges */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-emerald-500" />
                Status Badges (Live Dot &amp; Pulse)
              </span>
              <BadgeApp id="badge-tag-status" variant="neutral" size="sm">Status</BadgeApp>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <BadgeApp id="b-stat-online" variant="success" dot dotPulse size="sm">
                Online
              </BadgeApp>
              <BadgeApp id="b-stat-busy" variant="error" dot dotPulse size="sm">
                Busy / Do Not Disturb
              </BadgeApp>
              <BadgeApp id="b-stat-warning" variant="warning" dot size="sm">
                Maintenance
              </BadgeApp>
              <BadgeApp id="b-stat-offline" variant="neutral" dot size="sm">
                Offline
              </BadgeApp>
              <BadgeApp id="b-stat-solid-on" variant="solidSuccess" dot dotPulse size="sm">
                Active System
              </BadgeApp>
            </div>
            <p className="text-xs text-ink-muted">
              Menggunakan prop `dot` dan `dotPulse` untuk status real-time layanan atau ketersediaan staf.
            </p>
          </div>

          {/* Notification Counter Badges */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-vibrant-purple-dark" />
                Notification Badges (Text / Number Labels)
              </span>
              <BadgeApp id="badge-tag-notif" variant="solidPurple" size="sm">Notification</BadgeApp>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <BadgeApp id="b-notif-1" variant="solidRose" size="sm" rounded="circle">
                99+
              </BadgeApp>
              <BadgeApp id="b-notif-2" variant="solidPurple" size="sm" rounded="pill">
                12 Baru
              </BadgeApp>
              <BadgeApp id="b-notif-3" variant="vibrantBlue" size="sm" rounded="pill" icon={<Bell className="w-3 h-3" />}>
                5 Notifikasi
              </BadgeApp>
              <BadgeApp id="b-notif-4" variant="solidAmber" size="sm" rounded="card">
                Peringatan (3)
              </BadgeApp>
            </div>
            <p className="text-xs text-ink-muted">
              Ideal untuk indikator angka pesan belum dibaca, pembaruan aplikasi, atau antrean tugas.
            </p>
          </div>
        </div>
      </ModuleCard>

      {/* 2. Solid vs Outline Badges (Semantic Colors: Success, Warning, Error, Info) */}
      <ModuleCard
        id="badge-solid-outline-module"
        icon={<Layers className="w-5 h-5 text-vibrant-purple-dark" />}
        title="2. Solid vs Outline Badges & Semantics"
        description="Perbandingan gaya Solid (latar belakang pekat) dan Outline (garis tepi transparan) untuk rumpun warna semantik utama."
      >
        <div className="space-y-6">
          {/* Solid Variants */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <span className="text-xs font-bold text-ink block uppercase tracking-wider text-ink-muted">
              Solid Variants (High Contrast Background)
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              <BadgeApp id="b-solid-succ" variant="solidSuccess">
                Success
              </BadgeApp>
              <BadgeApp id="b-solid-warn" variant="solidWarning">
                Warning
              </BadgeApp>
              <BadgeApp id="b-solid-err" variant="solidError">
                Error
              </BadgeApp>
              <BadgeApp id="b-solid-info" variant="solidInfo">
                Info
              </BadgeApp>
              <BadgeApp id="b-solid-brand" variant="solidPurple">
                Brand Purple
              </BadgeApp>
            </div>
          </div>

          {/* Outline Variants */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <span className="text-xs font-bold text-ink block uppercase tracking-wider text-ink-muted">
              Outline Variants (Border Line & Transparent Fill)
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              <BadgeApp id="b-out-succ" variant="outlineSuccess">
                Success Outline
              </BadgeApp>
              <BadgeApp id="b-out-warn" variant="outlineWarning">
                Warning Outline
              </BadgeApp>
              <BadgeApp id="b-out-err" variant="outlineError">
                Error Outline
              </BadgeApp>
              <BadgeApp id="b-out-info" variant="outlineInfo">
                Info Outline
              </BadgeApp>
              <BadgeApp id="b-out-brand" variant="outlineBrand">
                Brand Outline
              </BadgeApp>
              <BadgeApp id="b-out-neu" variant="outlineNeutral">
                Neutral Outline
              </BadgeApp>
            </div>
          </div>

          {/* Soft Tint Variants */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <span className="text-xs font-bold text-ink block uppercase tracking-wider text-ink-muted">
              Soft Tint Variants (Subtle Background)
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              <BadgeApp id="b-soft-succ" variant="success">
                Success Soft
              </BadgeApp>
              <BadgeApp id="b-soft-warn" variant="warning">
                Warning Soft
              </BadgeApp>
              <BadgeApp id="b-soft-err" variant="error">
                Error Soft
              </BadgeApp>
              <BadgeApp id="b-soft-info" variant="info">
                Info Soft
              </BadgeApp>
              <BadgeApp id="b-soft-brand" variant="brand">
                Brand Soft
              </BadgeApp>
              <BadgeApp id="b-soft-neu" variant="neutral">
                Neutral Soft
              </BadgeApp>
            </div>
          </div>
        </div>
      </ModuleCard>

      {/* 3. Icon Support (Optional Icons) */}
      <ModuleCard
        id="badge-icon-module"
        icon={<Tag className="w-5 h-5 text-vibrant-purple-dark" />}
        title="3. Icon Support (Optional Icons)"
        description="Dukungan ikon opsional di posisi kiri (`iconPosition='left'`) atau kanan (`iconPosition='right'`)."
      >
        <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <BadgeApp
              id="b-icon-check"
              variant="solidSuccess"
              icon={<CheckCircle2 className="w-3.5 h-3.5" />}
            >
              Terverifikasi
            </BadgeApp>

            <BadgeApp
              id="b-icon-warn"
              variant="warning"
              icon={<AlertTriangle className="w-3.5 h-3.5" />}
            >
              Perhatian
            </BadgeApp>

            <BadgeApp
              id="b-icon-err"
              variant="error"
              icon={<XCircle className="w-3.5 h-3.5" />}
            >
              Ditolak
            </BadgeApp>

            <BadgeApp
              id="b-icon-info"
              variant="info"
              icon={<Info className="w-3.5 h-3.5" />}
            >
              Informasi Tambahan
            </BadgeApp>

            <BadgeApp
              id="b-icon-shield"
              variant="solidPurple"
              icon={<ShieldCheck className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              Secure Lock
            </BadgeApp>

            <BadgeApp
              id="b-icon-star"
              variant="vibrantYellow"
              icon={<Star className="w-3.5 h-3.5 fill-current" />}
            >
              Featured Product
            </BadgeApp>
          </div>
        </div>
      </ModuleCard>

      {/* 4. Sizes (Small, Medium, Large) */}
      <ModuleCard
        id="badge-sizes-module"
        icon={<Maximize2 className="w-5 h-5 text-vibrant-purple-dark" />}
        title="4. Ukuran Badge (Small, Medium, Large)"
        description="Skala proporsional ukuran lencana dari Small (`sm`), Medium (`md`), hingga Large (`lg`)."
      >
        <div className="p-5 bg-surface rounded-xl border border-hairline-soft space-y-4">
          <div className="flex flex-wrap items-center justify-around gap-6">
            {/* Small */}
            <div className="flex flex-col items-center gap-2">
              <BadgeApp id="b-sz-sm" size="sm" variant="solidPurple" icon={<Sparkles className="w-3 h-3" />}>
                Small (sm)
              </BadgeApp>
              <div className="text-[11px] text-ink-muted font-mono">size=&quot;sm&quot; (text 10px)</div>
            </div>

            {/* Medium */}
            <div className="flex flex-col items-center gap-2">
              <BadgeApp id="b-sz-md" size="md" variant="solidPurple" icon={<Sparkles className="w-3.5 h-3.5" />}>
                Medium (md)
              </BadgeApp>
              <div className="text-[11px] text-ink-muted font-mono">size=&quot;md&quot; (text 12px)</div>
            </div>

            {/* Large */}
            <div className="flex flex-col items-center gap-2">
              <BadgeApp id="b-sz-lg" size="lg" variant="solidPurple" icon={<Sparkles className="w-4 h-4" />}>
                Large (lg)
              </BadgeApp>
              <div className="text-[11px] text-ink-muted font-mono">size=&quot;lg&quot; (text 14px)</div>
            </div>
          </div>
        </div>
      </ModuleCard>

      {/* 5. Border Radius (Foundation Rounded Alignment) */}
      <ModuleCard
        id="badge-radius-module"
        icon={<Circle className="w-5 h-5 text-vibrant-purple-dark" />}
        title="5. Foundation Rounded Corner Alignment"
        description="Pilihan sudut melengkung berorientasi token Foundation Rounded: Pill (`rounded-pill-custom`), Card (`rounded-card-custom`), Circle (`rounded-full`), dan Square (`rounded-none`)."
      >
        <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {/* Pill */}
            <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2">
              <BadgeApp id="b-rad-pill" rounded="pill" variant="solidPurple">
                Pill Badge
              </BadgeApp>
              <span className="text-xs font-bold text-ink">Pill (Default Foundation)</span>
              <span className="text-[10px] text-ink-muted font-mono">rounded=&quot;pill&quot; (14px)</span>
            </div>

            {/* Card */}
            <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2">
              <BadgeApp id="b-rad-card" rounded="card" variant="solidPurple">
                Card Radius
              </BadgeApp>
              <span className="text-xs font-bold text-ink">Card Rounded</span>
              <span className="text-[10px] text-ink-muted font-mono">rounded=&quot;card&quot; (28px)</span>
            </div>

            {/* Circle */}
            <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2">
              <BadgeApp id="b-rad-circle" rounded="circle" variant="solidPurple">
                Full Circle
              </BadgeApp>
              <span className="text-xs font-bold text-ink flex items-center gap-1 justify-center">
                <Circle className="w-3 h-3 text-vibrant-purple" /> Circle / Full
              </span>
              <span className="text-[10px] text-ink-muted font-mono">rounded=&quot;circle&quot;</span>
            </div>

            {/* Square */}
            <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2">
              <BadgeApp id="b-rad-square" rounded="square" variant="solidPurple">
                Square Badge
              </BadgeApp>
              <span className="text-xs font-bold text-ink flex items-center gap-1 justify-center">
                <Square className="w-3 h-3 text-vibrant-purple" /> Square / None
              </span>
              <span className="text-[10px] text-ink-muted font-mono">rounded=&quot;square&quot;</span>
            </div>
          </div>
        </div>
      </ModuleCard>

      {/* 6. Interactive Live Playground */}
      <ModuleCard
        id="badge-playground-module"
        icon={<Sparkles className="w-5 h-5 text-vibrant-purple-dark" />}
        title="6. Interactive Badge Playground"
        description="Konfigurasi interaktif real-time untuk Label (Teks/Angka), Warna (Success, Warning, Error, Info), Solid/Outline, Ikon, Status Dot, Ukuran, dan Foundation Rounded."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            {/* Custom Label */}
            <div>
              <label className="text-xs font-semibold text-ink mb-1 block">Label Badge (Text / Number)</label>
              <InputApp
                id="bg-input-text"
                value={playText}
                onChange={(e) => setPlayText(e.target.value)}
                placeholder="Label teks atau angka..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Variant selection */}
              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Warna &amp; Style (Variant)</label>
                <SelectApp
                  id="bg-select-variant"
                  value={playVariant}
                  onChange={(e) => setPlayVariant(e.target.value as BadgeVariant)}
                  options={[
                    { value: "solidSuccess", label: "Solid Success (Green)" },
                    { value: "solidWarning", label: "Solid Warning (Amber)" },
                    { value: "solidError", label: "Solid Error (Red)" },
                    { value: "solidInfo", label: "Solid Info (Sky)" },
                    { value: "solidPurple", label: "Solid Purple (Brand)" },
                    { value: "outlineSuccess", label: "Outline Success" },
                    { value: "outlineWarning", label: "Outline Warning" },
                    { value: "outlineError", label: "Outline Error" },
                    { value: "outlineInfo", label: "Outline Info" },
                    { value: "outlineBrand", label: "Outline Brand" },
                    { value: "success", label: "Soft Success" },
                    { value: "warning", label: "Soft Warning" },
                    { value: "error", label: "Soft Error" },
                    { value: "info", label: "Soft Info" },
                    { value: "neutral", label: "Soft Neutral" },
                  ]}
                />
              </div>

              {/* Size selection */}
              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Ukuran (Size)</label>
                <SelectApp
                  id="bg-select-size"
                  value={playSize}
                  onChange={(e) => setPlaySize(e.target.value as BadgeSize)}
                  options={[
                    { value: "sm", label: "Small (sm)" },
                    { value: "md", label: "Medium (md)" },
                    { value: "lg", label: "Large (lg)" },
                  ]}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Rounded selection */}
              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Foundation Rounded</label>
                <SelectApp
                  id="bg-select-rounded"
                  value={playRounded}
                  onChange={(e) => setPlayRounded(e.target.value as BadgeRounded)}
                  options={[
                    { value: "pill", label: "Pill (Foundation Token)" },
                    { value: "card", label: "Card (Foundation Token)" },
                    { value: "circle", label: "Circle / Full" },
                    { value: "square", label: "Square / None" },
                    { value: "sm", label: "Small (sm)" },
                    { value: "md", label: "Medium (md)" },
                  ]}
                />
              </div>

              {/* Icon option */}
              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Pilihan Icon</label>
                <SelectApp
                  id="bg-select-icon"
                  value={playIconOption}
                  onChange={(e) => setPlayIconOption(e.target.value as any)}
                  options={[
                    { value: "none", label: "Tanpa Icon" },
                    { value: "check", label: "Checkmark Icon" },
                    { value: "warning", label: "Warning Icon" },
                    { value: "bell", label: "Bell Icon" },
                    { value: "star", label: "Star Icon" },
                  ]}
                />
              </div>
            </div>

            {/* Modifiers Checkboxes */}
            <div className="pt-2 border-t border-hairline-soft space-y-2">
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={playDot}
                    onChange={(e) => setPlayDot(e.target.checked)}
                    className="w-4 h-4 rounded text-vibrant-purple cursor-pointer"
                  />
                  <span className="text-xs font-medium text-ink">Status Dot</span>
                </label>

                {playDot && (
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={playDotPulse}
                      onChange={(e) => setPlayDotPulse(e.target.checked)}
                      className="w-4 h-4 rounded text-vibrant-purple cursor-pointer"
                    />
                    <span className="text-xs font-medium text-ink">Dot Pulse</span>
                  </label>
                )}

                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={playWithBorder}
                    onChange={(e) => setPlayWithBorder(e.target.checked)}
                    className="w-4 h-4 rounded text-vibrant-purple cursor-pointer"
                  />
                  <span className="text-xs font-medium text-ink">Border Extra</span>
                </label>
              </div>
            </div>
          </div>

          {/* Result Column */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-surface-soft/60 p-6 rounded-2xl border border-hairline-soft">
            <div className="space-y-6">
              <TextApp id="prev-bg-h" variant="caption" weight="bold" className="uppercase tracking-wider text-ink-muted">
                Hasil Live Preview
              </TextApp>

              <div className="flex items-center justify-center p-8 bg-surface rounded-xl border border-hairline-soft min-h-[100px]">
                <BadgeApp
                  id="playground-interactive-badge"
                  variant={playVariant}
                  size={playSize}
                  rounded={playRounded}
                  theme={playTheme}
                  withBorder={playWithBorder}
                  dot={playDot}
                  dotPulse={playDotPulse}
                  icon={getPlaygroundIcon()}
                >
                  {playText || "Empty"}
                </BadgeApp>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-vibrant-purple-dark" />
                    <TextApp id="code-bg-h" variant="caption" weight="bold" className="uppercase">
                      Generated Code
                    </TextApp>
                  </div>
                  <ButtonApp
                    id="copy-bg-code"
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
