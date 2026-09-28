import * as React from "react";
import {
  CommandPaletteApp,
  DEFAULT_COMMAND_GROUPS,
  TextApp,
  CardApp,
  BadgeApp,
  ButtonApp,
  CommandGroup,
} from "@/packages/design-system";
import { Command, Settings, Info, Code, Check, Search, Sparkles, Terminal } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { cn } from "@/lib/utils";

export function CommandPaletteDisplayModule() {
  // Modal toggle state
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  // Playground States
  const [playVariant, setPlayVariant] = React.useState<"default" | "purple" | "dark">("default");
  const [playSize, setPlaySize] = React.useState<"sm" | "md" | "lg">("md");
  const [playRounded, setPlayRounded] = React.useState<"none" | "sm" | "md" | "lg" | "xl" | "full">("xl");
  const [playQuery, setPlayQuery] = React.useState<string>("");
  const [copied, setCopied] = React.useState<boolean>(false);

  // Sample data with custom items
  const customGroups: CommandGroup[] = [
    ...DEFAULT_COMMAND_GROUPS,
    {
      id: "ai-tools",
      heading: "AI Studio Commands",
      items: [
        {
          id: "ai-gen",
          label: "Generate UI Component",
          description: "Prompt Gemini AI to craft layout",
          icon: <Sparkles className="w-4 h-4 text-purple-600" />,
          shortcut: ["⌘", "G"],
          badge: "AI",
          onSelect: () => alert("Triggered AI Generator!"),
        },
        {
          id: "ai-cli",
          label: "Run Terminal Command",
          description: "Execute package installation",
          icon: <Terminal className="w-4 h-4 text-emerald-600" />,
          shortcut: ["⌘", "T"],
          onSelect: () => alert("Triggered Terminal Command!"),
        },
      ],
    },
  ];

  const codeString = `<CommandPaletteApp\n  id="app-global-search"\n  isOpen={isOpen}\n  onClose={() => setIsOpen(false)}\n  variant="${playVariant}"\n  size="${playSize}"\n  rounded="${playRounded}"\n  placeholder="Type a command or search..."\n  groups={customGroups}\n/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModuleCard
      id="uikit-commandpalette-module"
      icon={<Command className="w-5 h-5 text-vibrant-purple-dark" />}
      title="CommandPaletteApp (Cmd+K Global Search & Actions)"
      description="Organism pencarian global dan eksekusi shortcut keyboard instant dengan modal overlay scrim, navigasi panah keyboard, visual KBD badges, dan pengelompokan hasil terstruktur."
    >
      {/* SECTION 1: 1 CONTAINER CARD SHOWCASE (Single CardApp Container) */}
      <CardApp id="command-showcase-single-container" className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-hairline-soft pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Command className="w-4 h-4 text-vibrant-purple-dark" />
            <TextApp id="command-card-showcase-title" variant="h4" weight="bold">
              Command Palette Matrix &amp; Inline Preview Showcase
            </TextApp>
          </div>

          <div className="flex items-center gap-2">
            <ButtonApp
              id="trigger-modal-cmd-k"
              variant="primary"
              size="sm"
              rounded="lg"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 shadow-sm font-semibold"
            >
              <Command className="w-4 h-4" />
              <span>Buka Modal (⌘K)</span>
              <BadgeApp id="trigger-kbd-badge" variant="neutral" size="sm" rounded="sm" className="bg-white/20 text-white border border-white/30 text-[10px] px-1 py-0">
                ⌘K
              </BadgeApp>
            </ButtonApp>

            <BadgeApp id="command-badge-showcase" variant="solidPurple" size="sm">
              1 Showcase Container
            </BadgeApp>
          </div>
        </div>

        {/* Matrix Preview Layout (Step 4 Spacing: gap-4) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left items-start">
          {/* Item 1: Default Variant (Inline Mode) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <TextApp id="command-item1-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider">
                1. Default Variant (Inline Grouped Preview)
              </TextApp>
              <BadgeApp id="command-item1-tag" variant="neutral" size="sm" rounded="pill">
                variant="default"
              </BadgeApp>
            </div>

            <div className="p-3 bg-slate-100/70 dark:bg-slate-900/40 rounded-2xl border border-hairline-soft">
              <CommandPaletteApp
                id="cmd-inline-default"
                isInline={true}
                variant="default"
                size="md"
                rounded="xl"
                placeholder="Type 'dashboard' or 'settings'..."
                groups={DEFAULT_COMMAND_GROUPS}
              />
            </div>
          </div>

          {/* Item 2: Purple Luxury Variant (Inline Mode) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <TextApp id="command-item2-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider">
                2. Purple Brand Variant (Inline Preview)
              </TextApp>
              <BadgeApp id="command-item2-tag" variant="solidPurple" size="sm" rounded="pill">
                variant="purple"
              </BadgeApp>
            </div>

            <div className="p-3 bg-vibrant-purple/5 rounded-2xl border border-vibrant-purple/20">
              <CommandPaletteApp
                id="cmd-inline-purple"
                isInline={true}
                variant="purple"
                size="md"
                rounded="xl"
                placeholder="Search quick actions or AI tools..."
                groups={customGroups}
              />
            </div>
          </div>
        </div>

        {/* Real Interactive Modal Instance */}
        <CommandPaletteApp
          id="cmd-modal-instance"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          variant={playVariant}
          size={playSize}
          rounded={playRounded}
          placeholder="Global Command Palette (Press ESC to exit)..."
          groups={customGroups}
        />
      </CardApp>

      {/* SECTION 2: LIVE INTERACTIVE PLAYGROUND */}
      <div className="space-y-4 bg-vibrant-grey-bg/30 p-4 md:p-6 rounded-card-custom border border-hairline-soft/80 text-left mt-6">
        <div className="flex items-center gap-2 border-b border-hairline-soft pb-2.5">
          <Settings className="w-4 h-4 text-vibrant-purple-dark" />
          <TextApp id="command-sec2-title" variant="h4" weight="bold">
            Live Interactive Command Palette Playground
          </TextApp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Controls */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <TextApp id="command-play-var-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                  Variant (`variant`)
                </TextApp>
                <div className="flex gap-1">
                  {(["default", "purple", "dark"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setPlayVariant(v)}
                      className={cn(
                        "flex-1 px-2 py-1.5 text-xs font-semibold rounded border transition-all cursor-pointer capitalize",
                        playVariant === v
                          ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                          : "bg-surface text-ink-secondary border-hairline-soft"
                      )}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <TextApp id="command-play-sz-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
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
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <TextApp id="command-play-rnd-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                  Rounded (`rounded`)
                </TextApp>
                <select
                  value={playRounded}
                  onChange={(e) => setPlayRounded(e.target.value as any)}
                  className="w-full text-xs font-semibold bg-surface border border-hairline-soft rounded px-2 py-1.5 text-ink"
                >
                  <option value="none">none</option>
                  <option value="sm">sm</option>
                  <option value="md">md</option>
                  <option value="lg">lg</option>
                  <option value="xl">xl</option>
                  <option value="full">full</option>
                </select>
              </div>

              <div>
                <TextApp id="command-play-trigger-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                  Modal Trigger
                </TextApp>
                <ButtonApp
                  id="play-open-btn"
                  variant="primary"
                  size="sm"
                  rounded="md"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full text-xs font-semibold"
                >
                  Buka Modal Overlay
                </ButtonApp>
              </div>
            </div>

            <div>
              <TextApp id="command-play-search-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                Simulasi Query Pencarian (`value`)
              </TextApp>
              <input
                type="text"
                value={playQuery}
                onChange={(e) => setPlayQuery(e.target.value)}
                placeholder="Ketik kata kunci untuk menguji Empty State atau Filter..."
                className="w-full text-xs font-semibold bg-surface border border-hairline-soft rounded px-2.5 py-1.5 text-ink"
              />
            </div>
          </div>

          {/* Interactive Live Output */}
          <div className="space-y-4 bg-surface p-4 rounded-xl border border-hairline-soft">
            <TextApp id="command-play-output-label" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider block">
              Live Interactive Result Preview
            </TextApp>

            <div className="p-3 bg-vibrant-grey-bg/20 rounded-xl border border-hairline-soft">
              <CommandPaletteApp
                id="interactive-command-palette"
                isInline={true}
                variant={playVariant}
                size={playSize}
                rounded={playRounded}
                value={playQuery}
                onValueChange={setPlayQuery}
                placeholder="Ketik perintah atau navigasi halaman..."
                groups={customGroups}
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <TextApp id="command-play-code-title" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider flex items-center gap-1">
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
          <TextApp id="command-info-title" variant="body" weight="bold" className="text-ink">
            Foundation Design System CommandPalette Matrix &amp; Rules
          </TextApp>
          <TextApp id="command-info-desc" variant="caption" className="text-ink-secondary block">
            Komponen <code>CommandPaletteApp</code> mengadopsi Spacing Scale Step 1 (4px) untuk KBD badges inner padding, Step 1.5 (6px) untuk gap antar ikon dan teks item, Step 2 (8px) untuk list item inner padding &amp; header group, Step 3 (12px) untuk Search Header &amp; Footer info, serta Step 4 (16px) untuk Spacing antar varian showcase.
          </TextApp>
        </div>
      </div>
    </ModuleCard>
  );
}
