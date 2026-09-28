import * as React from "react";
import { CardApp, TextApp, BadgeApp } from "@/packages/design-system";
import { Layout, Settings, Code, Check, Layers, Sparkles } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { cn } from "@/lib/utils";

export function CardDisplayModule() {
  // Live Playground State
  const [playVariant, setPlayVariant] = React.useState<
    | "default"
    | "neutral"
    | "brand"
    | "primary"
    | "secondary"
    | "danger"
    | "purple"
    | "purpleDark"
    | "yellow"
    | "blue"
    | "clay"
    | "clayPurple"
    | "clayYellow"
    | "clayBlue"
  >("clayPurple");
  const [playSize, setPlaySize] = React.useState<"sm" | "md" | "lg">("md");
  const [playRounded, setPlayRounded] = React.useState<"default" | "none" | "sm" | "md" | "lg" | "full" | "pill" | "card">("default");
  const [playTheme, setPlayTheme] = React.useState<"default" | "playful">("default");
  const [playInteractive, setPlayInteractive] = React.useState<boolean>(true);
  const [playTitle, setPlayTitle] = React.useState<string>("Card Layout Title");
  const [playDesc, setPlayDesc] = React.useState<string>("Deskripsi singkat tata letak kontainer");
  const [copied, setCopied] = React.useState<boolean>(false);

  // Grouped Variant list
  const clayVariants = [
    { id: "clay", name: "Clay Base", desc: "Clean white surface with soft tactile shadow" },
    { id: "clayPurple", name: "Clay Purple", desc: "Purple container with tactile depth" },
    { id: "clayYellow", name: "Clay Yellow", desc: "Warm yellow container with tactile depth" },
    { id: "clayBlue", name: "Clay Blue", desc: "Accent blue container with tactile depth" },
  ] as const;

  const colorVariants = [
    { id: "purple", name: "Purple", desc: "Soft purple background" },
    { id: "purpleDark", name: "Purple Dark", desc: "Deep tactile purple" },
    { id: "yellow", name: "Yellow", desc: "Warm yellow background" },
    { id: "blue", name: "Blue", desc: "Cool balance blue" },
  ] as const;

  const standardVariants = [
    { id: "default", name: "Default", desc: "Standard surface outline" },
    { id: "neutral", name: "Neutral", desc: "Muted grey surface" },
    { id: "brand", name: "Brand", desc: "Solid brand container" },
    { id: "primary", name: "Primary", desc: "Primary accent surface" },
    { id: "secondary", name: "Secondary", desc: "Subtle secondary tint" },
    { id: "danger", name: "Danger", desc: "Red alert highlight" },
  ] as const;

  const allSizes = [
    { id: "sm", name: "Small (sm)", spec: "p-4 gap-3" },
    { id: "md", name: "Medium (md)", spec: "p-6 gap-4" },
    { id: "lg", name: "Large (lg)", spec: "p-8 gap-6" },
  ] as const;

  const allRounded = [
    { id: "default", name: "Default", spec: "rounded-card-custom" },
    { id: "none", name: "none", spec: "rounded-none" },
    { id: "sm", name: "sm", spec: "rounded-sm" },
    { id: "md", name: "md", spec: "rounded-md" },
    { id: "lg", name: "lg", spec: "rounded-lg" },
    { id: "pill", name: "pill", spec: "rounded-pill-custom" },
    { id: "full", name: "full", spec: "rounded-full" },
  ] as const;

  // Code string generator
  const roundedProp = playRounded === "default" ? "" : ` rounded="${playRounded}"`;
  const themeProp = playTheme === "default" ? "" : ` theme="${playTheme}"`;
  const interactiveClass = playInteractive ? " hover:-translate-y-1 transition-transform" : "";
  const codeString = `<CardApp\n  id="layout-card"\n  variant="${playVariant}"\n  size="${playSize}"${roundedProp}${themeProp}${interactiveClass ? `\n  className="${interactiveClass.trim()}"` : ""}\n>\n  <CardApp.Header>\n    <CardApp.Title>${playTitle}</CardApp.Title>\n    <CardApp.Description>${playDesc}</CardApp.Description>\n  </CardApp.Header>\n  <CardApp.Content>\n    {/* Layout Only Area */}\n    <div className="w-full h-20 rounded-lg border border-dashed border-current/20 flex items-center justify-center">\n      <span className="text-xs opacity-70">Main Content Area</span>\n    </div>\n  </CardApp.Content>\n  <CardApp.Footer>\n    <span>Footer Slot L</span>\n    <span>Status Slot R</span>\n  </CardApp.Footer>\n</CardApp>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModuleCard
      id="uikit-card-module"
      icon={<Layout className="w-5 h-5 text-vibrant-purple-dark" />}
      title="CardApp (Structural Container Component)"
      description="Elemen kartu (container) terstruktur dengan opsi varian Claymorphism, Vibrant, dan Standar. Menampilkan struktur murni (Header, Title, Description, Content, Footer) secara layout-only."
    >
      {/* SECTION 1: LIVE INTERACTIVE BUILDER */}
      <div className="space-y-4 bg-vibrant-grey-bg/30 p-4 md:p-6 rounded-card-custom border border-hairline-soft/80">
        <div className="flex items-center gap-2 border-b border-hairline-soft pb-2.5">
          <Settings className="w-4 h-4 text-vibrant-purple-dark" />
          <span className="text-xs font-bold font-display text-ink uppercase tracking-wider">
            1. Live Card Playground (Konfigurasi Tata Letak Dinamis)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-4">
            {/* Variant Picker */}
            <div>
              <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                Variant <code className="text-vibrant-purple-dark text-[9px] lowercase font-mono">variant="..."</code>
              </span>
              
              <div className="space-y-2">
                <span className="text-[9px] font-semibold text-ink-muted uppercase tracking-wider block">Claymorphism</span>
                <div className="flex flex-wrap gap-1.5">
                  {clayVariants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setPlayVariant(v.id as any)}
                      className={cn(
                        "px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer",
                        playVariant === v.id
                          ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark shadow-sm"
                          : "bg-surface text-ink-secondary border-hairline-soft hover:bg-surface-soft hover:text-ink"
                      )}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>

                <span className="text-[9px] font-semibold text-ink-muted uppercase tracking-wider block pt-1">Color Containers</span>
                <div className="flex flex-wrap gap-1.5">
                  {colorVariants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setPlayVariant(v.id as any)}
                      className={cn(
                        "px-2 py-0.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer",
                        playVariant === v.id
                          ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark shadow-sm"
                          : "bg-surface text-ink-secondary border-hairline-soft hover:bg-surface-soft hover:text-ink"
                      )}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>

                <span className="text-[9px] font-semibold text-ink-muted uppercase tracking-wider block pt-1">Standard</span>
                <div className="flex flex-wrap gap-1.5">
                  {standardVariants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setPlayVariant(v.id as any)}
                      className={cn(
                        "px-2 py-0.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer",
                        playVariant === v.id
                          ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark shadow-sm"
                          : "bg-surface text-ink-secondary border-hairline-soft hover:bg-surface-soft hover:text-ink"
                      )}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Size & Options Knobs */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                  Size <code className="text-vibrant-purple-dark text-[9px] lowercase font-mono">size="..."</code>
                </span>
                <div className="flex gap-1.5">
                  {allSizes.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setPlaySize(s.id as any)}
                      className={cn(
                        "px-2.5 py-1 text-xs font-semibold rounded border transition-all cursor-pointer flex-1",
                        playSize === s.id
                          ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                          : "bg-surface text-ink-secondary border-hairline-soft hover:bg-surface-soft"
                      )}
                    >
                      {s.id.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-ink block mb-1.5 uppercase tracking-wide">
                  Rounded <code className="text-vibrant-purple-dark text-[9px] lowercase font-mono">rounded="..."</code>
                </span>
                <div className="flex gap-1">
                  {allRounded.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setPlayRounded(r.id as any)}
                      className={cn(
                        "px-1.5 py-1 text-[10px] font-semibold rounded border transition-all cursor-pointer flex-1 text-center",
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

            {/* Title & Desc Text Controls */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-ink block mb-1 uppercase tracking-wide">Title Text</label>
                <input
                  type="text"
                  value={playTitle}
                  onChange={(e) => setPlayTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-surface border border-hairline rounded-md text-ink focus:outline-none focus:border-vibrant-purple-dark"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-ink block mb-1 uppercase tracking-wide">Description Text</label>
                <input
                  type="text"
                  value={playDesc}
                  onChange={(e) => setPlayDesc(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-surface border border-hairline rounded-md text-ink focus:outline-none focus:border-vibrant-purple-dark"
                />
              </div>
            </div>

            {/* Interactive Toggle */}
            <div className="flex items-center justify-between bg-surface p-2.5 rounded-lg border border-hairline-soft">
              <span className="text-xs font-medium text-ink">Hover Lift Animation (<code className="text-[10px] font-mono text-vibrant-purple-dark">interactive</code>)</span>
              <button
                onClick={() => setPlayInteractive(!playInteractive)}
                className={cn(
                  "w-9 h-5 rounded-full transition-colors relative cursor-pointer",
                  playInteractive ? "bg-vibrant-purple-dark" : "bg-gray-300 dark:bg-gray-700"
                )}
              >
                <span
                  className={cn(
                    "w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-transform",
                    playInteractive ? "right-0.75" : "left-0.75"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Preview Column */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <span className="text-[10px] font-bold text-ink block uppercase tracking-wide">
              Live Preview (Layout Only)
            </span>

            <div className="min-h-[220px] bg-vibrant-grey-outer/40 p-6 rounded-2xl border border-hairline-soft flex items-center justify-center relative overflow-hidden">
              <div className="w-full max-w-sm">
                <CardApp
                  id="preview-card-app"
                  variant={playVariant}
                  size={playSize}
                  rounded={playRounded}
                  theme={playTheme}
                  className={playInteractive ? "hover:-translate-y-1 transition-transform" : ""}
                >
                  <CardApp.Header>
                    <CardApp.Title>{playTitle}</CardApp.Title>
                    <CardApp.Description>{playDesc}</CardApp.Description>
                  </CardApp.Header>
                  
                  <CardApp.Content>
                    <div className="w-full py-4 px-3 rounded-lg border border-dashed border-current/25 flex flex-col gap-2 items-center justify-center bg-current/5">
                      <Layers className="w-4 h-4 opacity-60" />
                      <span className="text-[11px] font-medium tracking-wide opacity-80">Layout Content Region</span>
                    </div>
                  </CardApp.Content>

                  <CardApp.Footer className="border-t border-current/15 pt-3 flex items-center justify-between text-xs opacity-90">
                    <span>Footer Slot L</span>
                    <span className="font-mono text-[10px] font-bold uppercase">Status Slot R</span>
                  </CardApp.Footer>
                </CardApp>
              </div>
            </div>

            {/* Generated JSX Snippet */}
            <div className="relative bg-vibrant-grey-outer p-3 rounded-lg border border-hairline-soft font-mono text-[11px] text-ink overflow-x-auto">
              <div className="flex justify-between items-center mb-1 text-[9px] text-ink-muted uppercase font-sans">
                <span className="flex items-center gap-1 font-bold"><Code className="w-3 h-3 text-vibrant-purple-dark" /> Code Snippet</span>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1 text-[10px] font-semibold text-vibrant-purple-dark hover:underline cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : null}
                  {copied ? "Copied!" : "Copy Code"}
                </button>
              </div>
              <pre className="whitespace-pre-wrap">{codeString}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: ALL VARIANTS CATALOG (LAYOUT ONLY) */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-2 border-b border-hairline-soft pb-2.5">
          <Sparkles className="w-4 h-4 text-vibrant-purple-dark" />
          <span className="text-xs font-bold font-display text-ink uppercase tracking-wider">
            2. Katalog Lengkap Varian CardApp (Layout Only)
          </span>
        </div>

        {/* Group A: Claymorphism Cards */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold text-ink-muted uppercase tracking-wider font-mono">
            A. Claymorphism Variants
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {clayVariants.map((item) => (
              <CardApp key={item.id} id={`card-cat-${item.id}`} variant={item.id as any} size="sm">
                <CardApp.Header>
                  <CardApp.Title className="text-sm font-bold">{item.name}</CardApp.Title>
                  <CardApp.Description className="text-[11px] opacity-80">{item.desc}</CardApp.Description>
                </CardApp.Header>
                <CardApp.Content>
                  <div className="w-full py-3 px-2 rounded-md border border-dashed border-current/25 bg-current/5 flex items-center justify-center text-[10px]">
                    Content Placeholder
                  </div>
                </CardApp.Content>
                <CardApp.Footer className="border-t border-current/15 pt-2 text-[10px] flex justify-between opacity-80">
                  <span>Layout Footer</span>
                  <span className="font-mono">Ready</span>
                </CardApp.Footer>
              </CardApp>
            ))}
          </div>
        </div>

        {/* Group B: Color Containers */}
        <div className="space-y-3 pt-2">
          <h5 className="text-xs font-bold text-ink-muted uppercase tracking-wider font-mono">
            B. Color Containers
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {colorVariants.map((item) => (
              <CardApp key={item.id} id={`card-cat-${item.id}`} variant={item.id as any} size="sm">
                <CardApp.Header>
                  <CardApp.Title className="text-sm font-bold">{item.name}</CardApp.Title>
                  <CardApp.Description className="text-[11px] opacity-80">{item.desc}</CardApp.Description>
                </CardApp.Header>
                <CardApp.Content>
                  <div className="w-full py-3 px-2 rounded-md border border-dashed border-current/25 bg-current/5 flex items-center justify-center text-[10px]">
                    Content Placeholder
                  </div>
                </CardApp.Content>
                <CardApp.Footer className="border-t border-current/15 pt-2 text-[10px] flex justify-between opacity-80">
                  <span>Layout Footer</span>
                  <span className="font-mono">Ready</span>
                </CardApp.Footer>
              </CardApp>
            ))}
          </div>
        </div>

        {/* Group C: Standard & Solid Variants */}
        <div className="space-y-3 pt-2">
          <h5 className="text-xs font-bold text-ink-muted uppercase tracking-wider font-mono">
            C. Standard & Solid Variants
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {standardVariants.map((item) => (
              <CardApp key={item.id} id={`card-cat-${item.id}`} variant={item.id as any} size="sm">
                <CardApp.Header>
                  <CardApp.Title className="text-sm font-bold">{item.name}</CardApp.Title>
                  <CardApp.Description className="text-[11px] opacity-80">{item.desc}</CardApp.Description>
                </CardApp.Header>
                <CardApp.Content>
                  <div className="w-full py-3 px-2 rounded-md border border-dashed border-current/25 bg-current/5 flex items-center justify-center text-[10px]">
                    Content Placeholder
                  </div>
                </CardApp.Content>
                <CardApp.Footer className="border-t border-current/15 pt-2 text-[10px] flex justify-between opacity-80">
                  <span>Layout Footer</span>
                  <span className="font-mono">Ready</span>
                </CardApp.Footer>
              </CardApp>
            ))}
          </div>
        </div>
      </div>
    </ModuleCard>
  );
}
