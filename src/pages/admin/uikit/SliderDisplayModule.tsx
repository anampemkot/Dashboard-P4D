import * as React from "react";
import { SliderApp, TextApp, CardApp, BadgeApp } from "@/packages/design-system";
import { Sliders, Settings, Info, Code, Check } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { cn } from "@/lib/utils";

export function SliderDisplayModule() {
  // Showcase state
  const [singleValue, setSingleValue] = React.useState<number>(45);
  const [dualValue, setDualValue] = React.useState<[number, number]>([20, 75]);
  const [ticksValue, setTicksValue] = React.useState<number>(60);
  const [volumeValue, setVolumeValue] = React.useState<number>(80);

  // Playground state
  const [playIsRange, setPlayIsRange] = React.useState<boolean>(false);
  const [playValueSingle, setPlayValueSingle] = React.useState<number>(50);
  const [playValueDual, setPlayValueDual] = React.useState<[number, number]>([30, 80]);
  const [playVariant, setPlayVariant] = React.useState<"default" | "brand" | "vibrant" | "success" | "warning" | "error">("default");
  const [playSize, setPlaySize] = React.useState<"sm" | "md" | "lg">("md");
  const [playRounded, setPlayRounded] = React.useState<"none" | "sm" | "md" | "lg" | "xl" | "full">("full");
  const [playShowTooltip, setPlayShowTooltip] = React.useState<boolean | "always" | "hover">("always");
  const [playShowMarks, setPlayShowMarks] = React.useState<boolean>(true);
  const [playShowMinMax, setPlayShowMinMax] = React.useState<boolean>(true);
  const [playDisabled, setPlayDisabled] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);

  const activeValue = playIsRange ? playValueDual : playValueSingle;
  const valuePropStr = playIsRange ? `[${playValueDual[0]}, ${playValueDual[1]}]` : `${playValueSingle}`;

  const codeString = `<SliderApp\n  id="demo-slider"\n  label="${playIsRange ? "Rentang Anggaran Retribusi" : "Kapasitas Server SKPD"}"\n  value={${valuePropStr}}\n  min={0}\n  max={100}\n  variant="${playVariant}"\n  size="${playSize}"\n  rounded="${playRounded}"\n  showTooltip={${typeof playShowTooltip === "string" ? `"${playShowTooltip}"` : playShowTooltip}}\n  showMarks={${playShowMarks}}\n  showMinMax={${playShowMinMax}}${playDisabled ? "\n  disabled" : ""}\n/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModuleCard
      id="uikit-slider-module"
      icon={<Sliders className="w-5 h-5 text-vibrant-purple-dark" />}
      title="SliderApp (Single & Dual Range Slider)"
      description="Komponen pengatur nilai numerik diskrit/kontinu dengan track pengisi aktif, thumb drag handle, floating value tooltip, step marks indicator, serta min/max label. Memenuhi standar spacing 4px/8px Foundation Design System."
    >
      {/* SECTION 1: 1 CONTAINER CARD SHOWCASE (Single CardApp Container containing all variants) */}
      <CardApp id="slider-showcase-single-container" className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-hairline-soft pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-vibrant-purple-dark" />
            <TextApp id="sld-card-showcase-title" variant="h4" weight="bold">
              SliderApp Matrix &amp; Variant Showcase
            </TextApp>
          </div>
          <BadgeApp id="sld-badge-showcase" variant="solidPurple" size="sm">
            1 Showcase Container
          </BadgeApp>
        </div>

        {/* 2-Column Grid with Step 4 Gap (16px / gap-4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {/* Item 1: Standard Single Value Slider */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <TextApp id="sld-item1-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              1. Single Value Slider (Default Variant)
            </TextApp>
            <SliderApp
              id="sld-demo-single"
              label="Batas Maksimal Penggunaan Memori (RAM)"
              description="Geser untuk menentukan kuota alokasi memori server"
              value={singleValue}
              onChange={(v) => setSingleValue(v as number)}
              min={0}
              max={100}
              showMinMax
              showTooltip="always"
              formatValue={(v) => `${v}%`}
            />
          </div>

          {/* Item 2: Dual Range Slider (Min-Max 2 Handles) */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <TextApp id="sld-item2-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block">
              2. Dual Range Slider (2 Thumb Handles: Min - Max)
            </TextApp>
            <SliderApp
              id="sld-demo-dual"
              label="Rentang Nilai Penetapan Tax Rate (% Pajak)"
              description="Pilih batas bawah dan batas atas toleransi penyesuaian tarif"
              value={dualValue}
              onChange={(v) => setDualValue(v as [number, number])}
              min={0}
              max={100}
              variant="vibrant"
              showMinMax
              showTooltip="always"
              formatValue={(v) => `${v}%`}
            />
          </div>

          {/* Item 3: Step Marks & Discrete Ticks */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <TextApp id="sld-item3-badge" variant="caption" weight="bold" className="text-emerald-600 uppercase tracking-wider block">
              3. Discrete Step Marks &amp; Success Variant
            </TextApp>
            <SliderApp
              id="sld-demo-ticks"
              label="Interval Pelaporan Otomatis Retribusi"
              description="Penanda diskrit per interval 20 unit"
              value={ticksValue}
              onChange={(v) => setTicksValue(v as number)}
              min={0}
              max={100}
              step={20}
              variant="success"
              showMarks
              showMinMax
              showTooltip="hover"
              formatValue={(v) => `${v} Menit`}
            />
          </div>

          {/* Item 4: Warning & Custom Size (lg) + Rounded md */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <TextApp id="sld-item4-badge" variant="caption" weight="bold" className="text-amber-500 uppercase tracking-wider block">
              4. Warning Variant &amp; Custom Size (size="lg", rounded="md")
            </TextApp>
            <SliderApp
              id="sld-demo-volume"
              label="Ambang Batas Peringatan Notifikasi"
              description="Ketebalan track besar (lg) dengan sudut rounded-md"
              value={volumeValue}
              onChange={(v) => setVolumeValue(v as number)}
              min={0}
              max={100}
              variant="warning"
              size="lg"
              rounded="md"
              showMinMax
              showTooltip="always"
              formatValue={(v) => `${v} dB`}
            />
          </div>

          {/* Item 5: Disabled Single Slider */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <TextApp id="sld-item5-badge" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider block">
              5. Disabled Single Slider State
            </TextApp>
            <SliderApp
              id="sld-demo-disabled-single"
              label="Kapasitas Penyimpanan Terkunci (Disabled)"
              description="Fitur hanya dapat diubah oleh Administrator Utama"
              value={30}
              disabled
              showMinMax
              showTooltip="always"
            />
          </div>

          {/* Item 6: Disabled Dual Range Slider */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <TextApp id="sld-item6-badge" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider block">
              6. Disabled Dual Range Slider State
            </TextApp>
            <SliderApp
              id="sld-demo-disabled-dual"
              label="Rentang Anggaran Terkunci (Disabled Dual)"
              description="Batas anggaran statis yang sudah disahkan APBD"
              value={[15, 65]}
              disabled
              showMinMax
              showTooltip="always"
            />
          </div>
        </div>
      </CardApp>

      {/* SECTION 2: LIVE INTERACTIVE PLAYGROUND */}
      <div className="space-y-4 bg-vibrant-grey-bg/30 p-4 md:p-6 rounded-card-custom border border-hairline-soft/80 text-left mt-6">
        <div className="flex items-center gap-2 border-b border-hairline-soft pb-2.5">
          <Settings className="w-4 h-4 text-vibrant-purple-dark" />
          <TextApp id="sld-sec2-title" variant="h4" weight="bold">
            Live Interactive Slider Playground
          </TextApp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Interactive Controls */}
          <div className="space-y-4">
            <div>
              <TextApp id="sld-play-mode-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                Mode Slider (`value` format)
              </TextApp>
              <div className="flex gap-2">
                <button
                  onClick={() => setPlayIsRange(false)}
                  className={cn(
                    "flex-1 px-2.5 py-1.5 text-xs font-semibold rounded border transition-all cursor-pointer",
                    !playIsRange
                      ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark shadow-xs"
                      : "bg-surface text-ink-secondary border-hairline-soft hover:bg-surface-soft"
                  )}
                >
                  Single Handle
                </button>
                <button
                  onClick={() => setPlayIsRange(true)}
                  className={cn(
                    "flex-1 px-2.5 py-1.5 text-xs font-semibold rounded border transition-all cursor-pointer",
                    playIsRange
                      ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark shadow-xs"
                      : "bg-surface text-ink-secondary border-hairline-soft hover:bg-surface-soft"
                  )}
                >
                  Dual Range Handle
                </button>
              </div>
            </div>

            <div>
              <TextApp id="sld-play-var-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                Variant (`variant="..."`)
              </TextApp>
              <div className="flex flex-wrap gap-1.5">
                {(["default", "brand", "vibrant", "success", "warning", "error"] as const).map((v) => (
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

            <div className="grid grid-cols-2 gap-2">
              <div>
                <TextApp id="sld-play-sz-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
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
                <TextApp id="sld-play-rnd-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
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

            <div className="pt-2 flex flex-col gap-2">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={playShowMarks}
                  onChange={(e) => setPlayShowMarks(e.target.checked)}
                  className="rounded text-vibrant-purple border-hairline focus:ring-vibrant-purple"
                />
                <TextApp id="sld-play-marks-text" variant="caption" weight="semibold" className="text-ink-secondary">
                  Tampilkan Tick Marks (`showMarks`)
                </TextApp>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={playShowMinMax}
                  onChange={(e) => setPlayShowMinMax(e.target.checked)}
                  className="rounded text-vibrant-purple border-hairline focus:ring-vibrant-purple"
                />
                <TextApp id="sld-play-minmax-text" variant="caption" weight="semibold" className="text-ink-secondary">
                  Tampilkan Min/Max Label (`showMinMax`)
                </TextApp>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={playDisabled}
                  onChange={(e) => setPlayDisabled(e.target.checked)}
                  className="rounded text-vibrant-purple border-hairline focus:ring-vibrant-purple"
                />
                <TextApp id="sld-play-dis-text" variant="caption" weight="semibold" className="text-ink-secondary">
                  Non-aktifkan Slider (`disabled`)
                </TextApp>
              </label>
            </div>
          </div>

          {/* Result Output */}
          <div className="space-y-4 bg-surface p-4 rounded-xl border border-hairline-soft">
            <TextApp id="sld-play-output-label" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider block">
              Live Interactive Result
            </TextApp>
            <div className="p-6 bg-vibrant-grey-bg/15 rounded-lg border border-hairline-soft border-dashed min-h-[140px] flex items-center justify-center">
              {playIsRange ? (
                <SliderApp
                  id="interactive-slider-dual"
                  label="Interaktif Range Slider (Dual)"
                  description="Seret thumb kiri atau kanan untuk melihat perubahan"
                  value={playValueDual}
                  onChange={(v) => setPlayValueDual(v as [number, number])}
                  min={0}
                  max={100}
                  variant={playVariant}
                  size={playSize}
                  rounded={playRounded}
                  showTooltip={playShowTooltip}
                  showMarks={playShowMarks}
                  showMinMax={playShowMinMax}
                  disabled={playDisabled}
                />
              ) : (
                <SliderApp
                  id="interactive-slider-single"
                  label="Interaktif Single Slider"
                  description="Seret pegangan untuk melihat tooltip bergerak"
                  value={playValueSingle}
                  onChange={(v) => setPlayValueSingle(v as number)}
                  min={0}
                  max={100}
                  variant={playVariant}
                  size={playSize}
                  rounded={playRounded}
                  showTooltip={playShowTooltip}
                  showMarks={playShowMarks}
                  showMinMax={playShowMinMax}
                  disabled={playDisabled}
                />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <TextApp id="sld-play-code-title" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider flex items-center gap-1">
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
          <TextApp id="sld-info-title" variant="body" weight="bold" className="text-ink">
            Foundation Design System Slider &amp; Spacing Matrix
          </TextApp>
          <TextApp id="sld-info-desc" variant="caption" className="text-ink-secondary block">
            Komponen <code>SliderApp</code> mematuhi spesifikasi eksplisit Foundation Design System: Spacing Step 1 (4px / <code>py-1 px-2</code>) untuk padding internal Tooltip, Step 1.5 (6px / <code>gap-1.5</code>) antara Track dengan Min/Max text label, Step 2 (8px / <code>gap-2</code>) antara Slider container dan Top Label, serta Step 4 (16px / <code>gap-4</code>) antar item showcase di dalam 1 Container Card.
          </TextApp>
        </div>
      </div>
    </ModuleCard>
  );
}
