import * as React from "react";
import {
  ToggleApp,
  CardApp,
  TextApp,
  BadgeApp,
  ButtonApp,
  SelectApp,
  InputApp,
  CheckboxApp,
  ToggleSize,
  ToggleActiveColor,
  ToggleInactiveColor,
  ToggleLabelPosition,
} from "@/packages/design-system";
import {
  ToggleLeft,
  Sparkles,
  Code,
  Check,
  X,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Bell,
  BellOff,
  Shield,
  ShieldAlert,
  Zap,
  Sliders,
  Palette,
  Maximize2,
  Lock,
} from "lucide-react";

export function ToggleDisplayModule() {
  // Playground state
  const [playChecked, setPlayChecked] = React.useState(true);
  const [playSize, setPlaySize] = React.useState<ToggleSize>("md");
  const [playActiveColor, setPlayActiveColor] = React.useState<ToggleActiveColor>("vibrantPurple");
  const [playInactiveColor, setPlayInactiveColor] = React.useState<ToggleInactiveColor>("neutral");
  const [playThumbColor, setPlayThumbColor] = React.useState<"white" | "neutral" | "dark">("white");
  const [playHasIcon, setPlayHasIcon] = React.useState(true);
  const [playHasText, setPlayHasText] = React.useState(false);
  const [playTextOn, setPlayTextOn] = React.useState("ON");
  const [playTextOff, setPlayTextOff] = React.useState("OFF");
  const [playLabel, setPlayLabel] = React.useState("Notifikasi Real-time PBB");
  const [playSublabel, setPlaySublabel] = React.useState("Kirim pemberitahuan otomatis saat penetapan SPPT terbit.");
  const [playLabelPos, setPlayLabelPos] = React.useState<ToggleLabelPosition>("right");
  const [playDisabled, setPlayDisabled] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  // Individual demo states for interactive sections
  const [themeDark, setThemeDark] = React.useState(true);
  const [soundOn, setSoundOn] = React.useState(true);
  const [notifyOn, setNotifyOn] = React.useState(true);
  const [textToggle, setTextToggle] = React.useState(true);

  // Generate code snippet string
  const iconStr = playHasIcon
    ? `\n  iconOn={<Check className="w-3.5 h-3.5 text-emerald-600" />}\n  iconOff={<X className="w-3.5 h-3.5 text-rose-500" />}`
    : "";
  const textStr = playHasText
    ? `\n  textOn="${playTextOn}"\n  textOff="${playTextOff}"`
    : "";
  const labelStr = playLabel.trim() ? `\n  label="${playLabel}"` : "";
  const sublabelStr = playSublabel.trim() ? `\n  sublabel="${playSublabel}"` : "";
  const labelPosStr = playLabelPos !== "right" ? `\n  labelPosition="${playLabelPos}"` : "";
  const disabledStr = playDisabled ? `\n  disabled` : "";
  const sizeStr = playSize !== "md" ? `\n  size="${playSize}"` : "";
  const activeColorStr = playActiveColor !== "vibrantPurple" ? `\n  activeColor="${playActiveColor}"` : "";
  const inactiveColorStr = playInactiveColor !== "neutral" ? `\n  inactiveColor="${playInactiveColor}"` : "";
  const thumbColorStr = playThumbColor !== "white" ? `\n  thumbColor="${playThumbColor}"` : "";

  const codeSnippet = `<ToggleApp
  id="my-toggle"
  checked={${playChecked}}
  onCheckedChange={(checked) => console.log(checked)}${sizeStr}${activeColorStr}${inactiveColorStr}${thumbColorStr}${iconStr}${textStr}${labelStr}${sublabelStr}${labelPosStr}${disabledStr}
/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6" id="uikit-toggle-module">
      {/* Header Overview */}
      <CardApp id="toggle-overview" variant="neutral" size="md" rounded="card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BadgeApp id="tg-badge-form" variant="solidPurple" size="sm">
                03 - Forms &amp; Inputs
              </BadgeApp>
              <BadgeApp id="tg-badge-atom" variant="vibrantPurple" size="sm">
                Toggle / Switch Atom
              </BadgeApp>
            </div>
            <TextApp id="tg-title" variant="h3" weight="bold">
              Toggle &amp; Switch (`ToggleApp` / `SwitchApp`)
            </TextApp>
            <TextApp id="tg-sub" variant="body" color="secondary">
              Tombol saklar saklar ON/OFF interaktif untuk mengubah opsi konfigurasi dan preferensi sistem secara instan.
              Mendukung **Default**, **With Icon**, **With Text**, **State (Active, Inactive, Disabled)**, **Active &amp; Inactive Colors**,
              **Sizes (sm, md, lg)**, **Thumb Customization**, dan **Label Position (Left/Right)**.
            </TextApp>
          </div>
        </div>
      </CardApp>

      {/* SINGLE UNIFIED CARD SHOWCASE CONTAINER */}
      <CardApp id="toggle-main-unified-card" variant="neutral" size="lg" rounded="card">
        <div className="space-y-8">
          
          {/* Sub-Section 1: Variants (Default, With Icon, With Text) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <ToggleLeft className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="tg-sub-1-h" variant="h4" weight="bold">
                  1. Core Variants (Default, With Icon, With Text)
                </TextApp>
              </div>
              <BadgeApp id="b-sub-1" variant="solidPurple" size="sm">3 Variants</BadgeApp>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Variant A: Default Basic */}
              <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-ink block mb-1">Variant A: Default Switch</span>
                  <p className="text-xs text-ink-muted">Saklar minimalis tanpa ikon atau teks di dalam track.</p>
                </div>
                <div className="pt-2 flex items-center justify-between bg-surface-soft/60 p-3 rounded-lg">
                  <span className="text-xs font-medium text-ink">Fitur Otomatisasi</span>
                  <ToggleApp
                    id="tg-demo-default"
                    checked={notifyOn}
                    onCheckedChange={setNotifyOn}
                    activeColor="vibrantPurple"
                  />
                </div>
              </div>

              {/* Variant B: With Icon */}
              <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-ink block mb-1">Variant B: With Icon</span>
                  <p className="text-xs text-ink-muted">Ikon indikator di dalam thumb untuk pengalaman visual intuitif.</p>
                </div>
                <div className="pt-2 flex items-center justify-between bg-surface-soft/60 p-3 rounded-lg">
                  <span className="text-xs font-medium text-ink">Mode Gelap / Terang</span>
                  <ToggleApp
                    id="tg-demo-icon"
                    checked={themeDark}
                    onCheckedChange={setThemeDark}
                    activeColor="dark"
                    iconOn={<Moon className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />}
                    iconOff={<Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                  />
                </div>
              </div>

              {/* Variant C: With Text */}
              <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-ink block mb-1">Variant C: With Track Text</span>
                  <p className="text-xs text-ink-muted">Teks label singkat (ON/OFF, YA/TDK) di dalam lintasan saklar.</p>
                </div>
                <div className="pt-2 flex items-center justify-between bg-surface-soft/60 p-3 rounded-lg">
                  <span className="text-xs font-medium text-ink">Status Verifikasi</span>
                  <ToggleApp
                    id="tg-demo-text"
                    checked={textToggle}
                    onCheckedChange={setTextToggle}
                    size="lg"
                    activeColor="success"
                    textOn="YA"
                    textOff="TDK"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Section 2: Size Scale (Small, Medium, Large) */}
          <div className="space-y-4 pt-4 border-t border-hairline-soft">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <Maximize2 className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="tg-sub-2-h" variant="h4" weight="bold">
                  2. Component Sizes (Small, Medium, Large)
                </TextApp>
              </div>
              <BadgeApp id="b-sub-2" variant="vibrantPurple" size="sm">3 Sizes</BadgeApp>
            </div>

            <div className="p-6 bg-surface rounded-xl border border-hairline-soft space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Size SM */}
                <div className="p-4 bg-surface-soft/60 rounded-xl space-y-3 flex flex-col items-center text-center">
                  <BadgeApp id="b-sz-sm" variant="neutral" size="sm">Small (sm - 36x20px)</BadgeApp>
                  <p className="text-xs text-ink-muted">Cocok untuk tabel data padat &amp; baris item kompak.</p>
                  <div className="pt-2">
                    <ToggleApp
                      id="tg-sz-sm"
                      size="sm"
                      defaultChecked
                      activeColor="vibrantPurple"
                      label="Opsi Kompak"
                    />
                  </div>
                </div>

                {/* Size MD */}
                <div className="p-4 bg-surface-soft/60 rounded-xl space-y-3 flex flex-col items-center text-center">
                  <BadgeApp id="b-sz-md" variant="vibrantPurple" size="sm">Medium (md - Default)</BadgeApp>
                  <p className="text-xs text-ink-muted">Ukuran standar proporsional untuk formulir umum.</p>
                  <div className="pt-2">
                    <ToggleApp
                      id="tg-sz-md"
                      size="md"
                      defaultChecked
                      activeColor="vibrantPurple"
                      label="Opsi Standar"
                    />
                  </div>
                </div>

                {/* Size LG */}
                <div className="p-4 bg-surface-soft/60 rounded-xl space-y-3 flex flex-col items-center text-center">
                  <BadgeApp id="b-sz-lg" variant="solidPurple" size="sm">Large (lg - 60x32px)</BadgeApp>
                  <p className="text-xs text-ink-muted">Ukuran menonjol dengan dukungan teks ON/OFF &amp; touch target luas.</p>
                  <div className="pt-2">
                    <ToggleApp
                      id="tg-sz-lg"
                      size="lg"
                      defaultChecked
                      activeColor="vibrantPurple"
                      label="Opsi Menonjol"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Section 3: Active & Inactive Color Schemes */}
          <div className="space-y-4 pt-4 border-t border-hairline-soft">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="tg-sub-3-h" variant="h4" weight="bold">
                  3. Active &amp; Inactive Color Palettes
                </TextApp>
              </div>
              <BadgeApp id="b-sub-3" variant="solidPurple" size="sm">8 Active &amp; 3 Inactive</BadgeApp>
            </div>

            <div className="p-6 bg-surface rounded-xl border border-hairline-soft space-y-6">
              {/* Active Colors */}
              <div>
                <TextApp id="act-col-title" variant="caption" weight="bold" className="uppercase tracking-wider text-ink-muted block mb-3">
                  Active Track Colors (ON State)
                </TextApp>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 bg-surface-soft/60 rounded-lg flex items-center justify-between">
                    <span className="text-xs font-medium text-ink">vibrantPurple</span>
                    <ToggleApp id="tg-col-vp" activeColor="vibrantPurple" defaultChecked size="sm" />
                  </div>

                  <div className="p-3 bg-surface-soft/60 rounded-lg flex items-center justify-between">
                    <span className="text-xs font-medium text-ink">brand</span>
                    <ToggleApp id="tg-col-brand" activeColor="brand" defaultChecked size="sm" />
                  </div>

                  <div className="p-3 bg-surface-soft/60 rounded-lg flex items-center justify-between">
                    <span className="text-xs font-medium text-ink">success</span>
                    <ToggleApp id="tg-col-success" activeColor="success" defaultChecked size="sm" />
                  </div>

                  <div className="p-3 bg-surface-soft/60 rounded-lg flex items-center justify-between">
                    <span className="text-xs font-medium text-ink">danger</span>
                    <ToggleApp id="tg-col-danger" activeColor="danger" defaultChecked size="sm" />
                  </div>

                  <div className="p-3 bg-surface-soft/60 rounded-lg flex items-center justify-between">
                    <span className="text-xs font-medium text-ink">warning</span>
                    <ToggleApp id="tg-col-warning" activeColor="warning" defaultChecked size="sm" />
                  </div>

                  <div className="p-3 bg-surface-soft/60 rounded-lg flex items-center justify-between">
                    <span className="text-xs font-medium text-ink">info</span>
                    <ToggleApp id="tg-col-info" activeColor="info" defaultChecked size="sm" />
                  </div>

                  <div className="p-3 bg-surface-soft/60 rounded-lg flex items-center justify-between">
                    <span className="text-xs font-medium text-ink">sky</span>
                    <ToggleApp id="tg-col-sky" activeColor="sky" defaultChecked size="sm" />
                  </div>

                  <div className="p-3 bg-surface-soft/60 rounded-lg flex items-center justify-between">
                    <span className="text-xs font-medium text-ink">dark</span>
                    <ToggleApp id="tg-col-dark" activeColor="dark" defaultChecked size="sm" />
                  </div>
                </div>
              </div>

              {/* Inactive Colors */}
              <div className="pt-2 border-t border-hairline-soft">
                <TextApp id="inact-col-title" variant="caption" weight="bold" className="uppercase tracking-wider text-ink-muted block mb-3">
                  Inactive Track Colors (OFF State)
                </TextApp>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3 bg-surface-soft/60 rounded-lg flex items-center justify-between">
                    <span className="text-xs font-medium text-ink">neutral (Default)</span>
                    <ToggleApp id="tg-inact-neutral" inactiveColor="neutral" checked={false} size="sm" />
                  </div>

                  <div className="p-3 bg-surface-soft/60 rounded-lg flex items-center justify-between">
                    <span className="text-xs font-medium text-ink">slate</span>
                    <ToggleApp id="tg-inact-slate" inactiveColor="slate" checked={false} size="sm" />
                  </div>

                  <div className="p-3 bg-surface-soft/60 rounded-lg flex items-center justify-between">
                    <span className="text-xs font-medium text-ink">muted</span>
                    <ToggleApp id="tg-inact-muted" inactiveColor="muted" checked={false} size="sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Section 4: Labeling, Positioning & Disabled States */}
          <div className="space-y-4 pt-4 border-t border-hairline-soft">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="tg-sub-4-h" variant="h4" weight="bold">
                  4. Label Positioning, Sublabels &amp; Disabled States
                </TextApp>
              </div>
              <BadgeApp id="b-sub-4" variant="vibrantPurple" size="sm">Alignment &amp; State</BadgeApp>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Label Right vs Left */}
              <div className="p-5 bg-surface rounded-xl border border-hairline-soft space-y-4">
                <span className="text-xs font-bold text-ink block">Label Position (Right vs Left)</span>
                
                <div className="p-3 bg-surface-soft/60 rounded-lg">
                  <ToggleApp
                    id="tg-lbl-right"
                    labelPosition="right"
                    defaultChecked
                    label="Label di Kanan (Default)"
                    sublabel="Posisi standar untuk formulir bertingkat."
                  />
                </div>

                <div className="p-3 bg-surface-soft/60 rounded-lg">
                  <ToggleApp
                    id="tg-lbl-left"
                    labelPosition="left"
                    defaultChecked
                    containerClassName="w-full justify-between"
                    label="Label di Kiri (Justified)"
                    sublabel="Memberikan ruang rata kanan untuk saklar."
                  />
                </div>
              </div>

              {/* Disabled States */}
              <div className="p-5 bg-surface rounded-xl border border-hairline-soft space-y-4">
                <span className="text-xs font-bold text-ink block">Disabled States (Active &amp; Inactive)</span>
                
                <div className="p-3 bg-surface-soft/60 rounded-lg">
                  <ToggleApp
                    id="tg-dis-on"
                    disabled
                    defaultChecked
                    label="Fitur Terkunci (Disabled ON)"
                    sublabel="Opsi ini diaktifkan secara permanen oleh admin."
                    iconOn={<Lock className="w-3 h-3 text-zinc-500" />}
                  />
                </div>

                <div className="p-3 bg-surface-soft/60 rounded-lg">
                  <ToggleApp
                    id="tg-dis-off"
                    disabled
                    checked={false}
                    label="Akses Nonaktif (Disabled OFF)"
                    sublabel="Anda memerlukan izin tambahan untuk mengaktifkan ini."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Section 5: Interactive Sandbox & Code Generator */}
          <div className="space-y-4 pt-4 border-t border-hairline-soft">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="tg-sub-5-h" variant="h4" weight="bold">
                  5. Interactive Switch Playground
                </TextApp>
              </div>
              <BadgeApp id="b-sub-5" variant="solidPurple" size="sm">Live Sandbox</BadgeApp>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls Form */}
              <div className="lg:col-span-5 space-y-4">
                {/* Controlled Checked Toggle */}
                <div className="p-3 bg-surface-soft/60 rounded-lg flex items-center justify-between">
                  <span className="text-xs font-semibold text-ink">Checked State</span>
                  <CheckboxApp
                    id="tg-play-chk"
                    checked={playChecked}
                    onChange={(e) => setPlayChecked(e.target.checked)}
                    label={playChecked ? "Active (ON)" : "Inactive (OFF)"}
                  />
                </div>

                {/* Label Text */}
                <div>
                  <label className="text-xs font-semibold text-ink mb-1 block">Label Text</label>
                  <InputApp
                    id="tg-play-lbl"
                    value={playLabel}
                    onChange={(e) => setPlayLabel(e.target.value)}
                    placeholder="Teks label saklar..."
                  />
                </div>

                {/* Sublabel Text */}
                <div>
                  <label className="text-xs font-semibold text-ink mb-1 block">Sublabel / Description</label>
                  <InputApp
                    id="tg-play-sublbl"
                    value={playSublabel}
                    onChange={(e) => setPlaySublabel(e.target.value)}
                    placeholder="Penjelasan subteks..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Size */}
                  <div>
                    <label className="text-xs font-semibold text-ink mb-1 block">Component Size</label>
                    <SelectApp
                      id="tg-play-size"
                      value={playSize}
                      onChange={(e) => setPlaySize(e.target.value as ToggleSize)}
                      options={[
                        { value: "sm", label: "Small (sm)" },
                        { value: "md", label: "Medium (md)" },
                        { value: "lg", label: "Large (lg)" },
                      ]}
                    />
                  </div>

                  {/* Label Position */}
                  <div>
                    <label className="text-xs font-semibold text-ink mb-1 block">Label Position</label>
                    <SelectApp
                      id="tg-play-pos"
                      value={playLabelPos}
                      onChange={(e) => setPlayLabelPos(e.target.value as ToggleLabelPosition)}
                      options={[
                        { value: "right", label: "Right (Kanan)" },
                        { value: "left", label: "Left (Kiri)" },
                      ]}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Active Color */}
                  <div>
                    <label className="text-xs font-semibold text-ink mb-1 block">Active Color (ON)</label>
                    <SelectApp
                      id="tg-play-actcol"
                      value={playActiveColor}
                      onChange={(e) => setPlayActiveColor(e.target.value as ToggleActiveColor)}
                      options={[
                        { value: "vibrantPurple", label: "Vibrant Purple" },
                        { value: "brand", label: "Brand Purple" },
                        { value: "success", label: "Success Green" },
                        { value: "danger", label: "Danger Red" },
                        { value: "warning", label: "Warning Amber" },
                        { value: "info", label: "Info Sky" },
                        { value: "sky", label: "Sky Blue" },
                        { value: "dark", label: "Dark Zinc" },
                      ]}
                    />
                  </div>

                  {/* Inactive Color */}
                  <div>
                    <label className="text-xs font-semibold text-ink mb-1 block">Inactive Color (OFF)</label>
                    <SelectApp
                      id="tg-play-inactcol"
                      value={playInactiveColor}
                      onChange={(e) => setPlayInactiveColor(e.target.value as ToggleInactiveColor)}
                      options={[
                        { value: "neutral", label: "Neutral Gray" },
                        { value: "slate", label: "Slate Gray" },
                        { value: "muted", label: "Muted Gray" },
                      ]}
                    />
                  </div>
                </div>

                {/* Thumb Color */}
                <div>
                  <label className="text-xs font-semibold text-ink mb-1 block">Thumb Color</label>
                  <SelectApp
                    id="tg-play-thumbcol"
                    value={playThumbColor}
                    onChange={(e) => setPlayThumbColor(e.target.value as "white" | "neutral" | "dark")}
                    options={[
                      { value: "white", label: "White (Bersih)" },
                      { value: "neutral", label: "Neutral Gray" },
                      { value: "dark", label: "Dark Contrast" },
                    ]}
                  />
                </div>

                {/* Toggles for Icons, Text, and Disabled */}
                <div className="p-3 bg-surface-soft/60 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-ink font-medium">Render Thumb Icons</span>
                    <CheckboxApp
                      id="tg-play-hasicon"
                      checked={playHasIcon}
                      onChange={(e) => setPlayHasIcon(e.target.checked)}
                      label="With Icon"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-ink font-medium">Render Track Text</span>
                    <CheckboxApp
                      id="tg-play-hastext"
                      checked={playHasText}
                      onChange={(e) => setPlayHasText(e.target.checked)}
                      label="With Text"
                    />
                  </div>

                  {playHasText && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <InputApp
                        id="tg-play-txton"
                        value={playTextOn}
                        onChange={(e) => setPlayTextOn(e.target.value)}
                        placeholder="Text ON"
                        className="text-xs"
                      />
                      <InputApp
                        id="tg-play-txtoff"
                        value={playTextOff}
                        onChange={(e) => setPlayTextOff(e.target.value)}
                        placeholder="Text OFF"
                        className="text-xs"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 border-t border-hairline-soft">
                    <span className="text-xs text-ink font-medium">Disabled State</span>
                    <CheckboxApp
                      id="tg-play-dis"
                      checked={playDisabled}
                      onChange={(e) => setPlayDisabled(e.target.checked)}
                      label="Disabled"
                    />
                  </div>
                </div>
              </div>

              {/* Preview Box & Generated Code */}
              <div className="lg:col-span-7 flex flex-col justify-between bg-surface-soft/60 p-6 rounded-2xl border border-hairline-soft">
                <div className="space-y-6">
                  <TextApp id="prev-tg-h" variant="caption" weight="bold" className="uppercase tracking-wider text-ink-muted">
                    Hasil Live Preview
                  </TextApp>

                  <div className="flex items-center justify-center p-12 bg-surface rounded-xl border border-hairline-soft min-h-[160px] w-full">
                    <ToggleApp
                      id="playground-interactive-toggle"
                      checked={playChecked}
                      onCheckedChange={setPlayChecked}
                      size={playSize}
                      activeColor={playActiveColor}
                      inactiveColor={playInactiveColor}
                      thumbColor={playThumbColor}
                      iconOn={playHasIcon ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : undefined}
                      iconOff={playHasIcon ? <X className="w-3.5 h-3.5 text-rose-500" /> : undefined}
                      textOn={playHasText ? playTextOn : undefined}
                      textOff={playHasText ? playTextOff : undefined}
                      label={playLabel || undefined}
                      sublabel={playSublabel || undefined}
                      labelPosition={playLabelPos}
                      disabled={playDisabled}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-vibrant-purple-dark" />
                        <TextApp id="code-tg-h" variant="caption" weight="bold" className="uppercase">
                          Generated Code
                        </TextApp>
                      </div>
                      <ButtonApp
                        id="copy-tg-code"
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
