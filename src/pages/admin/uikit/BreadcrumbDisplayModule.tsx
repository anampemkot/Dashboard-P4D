import * as React from "react";
import {
  BreadcrumbApp,
  BreadcrumbItem,
  BreadcrumbVariant,
  BreadcrumbSize,
  BreadcrumbRounded,
  CardApp,
  TextApp,
  BadgeApp,
} from "@/packages/design-system";
import {
  Home,
  ChevronRight,
  Slash,
  Minus,
  Layers,
  Code,
  Check,
  Sliders,
  Folder,
  FileText,
  Building2,
  Database,
  ShieldCheck,
  Settings,
} from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { cn } from "@/lib/utils";

export function BreadcrumbDisplayModule() {
  const [variant, setVariant] = React.useState<BreadcrumbVariant>("default");
  const [size, setSize] = React.useState<BreadcrumbSize>("md");
  const [rounded, setRounded] = React.useState<BreadcrumbRounded>("md");
  const [maxItems, setMaxItems] = React.useState<number | undefined>(3);
  const [separatorType, setSeparatorType] = React.useState<"chevron" | "slash" | "dash">("chevron");
  const [copied, setCopied] = React.useState(false);

  // Sample items for standard breadcrumbs
  const standardItems: BreadcrumbItem[] = [
    { label: "Beranda", href: "#", icon: <Home className="w-4 h-4" /> },
    { label: "Manajemen Pajak", href: "#" },
    { label: "PBB-P2", href: "#" },
    { label: "Detail Penetapan Massal", isCurrentPage: true },
  ];

  // Sample items for long path (collapsed demo)
  const longPathItems: BreadcrumbItem[] = [
    { label: "Dashboard", href: "#", icon: <Home className="w-4 h-4" /> },
    { label: "BPKAD Jogja", href: "#", icon: <Building2 className="w-4 h-4" /> },
    { label: "Modul Keuangan", href: "#", icon: <Database className="w-4 h-4" /> },
    { label: "Sub-Modul Anggaran", href: "#", icon: <Folder className="w-4 h-4" /> },
    { label: "Verifikasi Audit", href: "#", icon: <ShieldCheck className="w-4 h-4" /> },
    { label: "Laporan Realisasi Q3 2026.pdf", isCurrentPage: true, icon: <FileText className="w-4 h-4" /> },
  ];

  const separatorElement = React.useMemo(() => {
    if (separatorType === "slash") return "/";
    if (separatorType === "dash") return "-";
    return undefined; // default ChevronRight
  }, [separatorType]);

  const codeSnippet = `<BreadcrumbApp
  id="interactive-breadcrumb-demo"
  variant="${variant}"
  size="${size}"
  rounded="${rounded}"
  ${maxItems ? `maxItems={${maxItems}}` : ""}
  ${separatorType !== "chevron" ? `separator="${separatorElement}"` : ""}
  items={sampleBreadcrumbItems}
/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModuleCard
      id="uikit-breadcrumb-module"
      icon={<Layers className="w-5 h-5 text-vibrant-purple-dark" />}
      title="BreadcrumbApp (Breadcrumb Navigation)"
      description="Molecule navigasi jejak halaman hierarki admin BPKAD dengan dukungan varian Standard, Collapsed Ellipsis (...), Separator Kustom, serta Ikon & Pills."
    >
      {/* SECTION 1: 1 CONTAINER CARD SHOWCASE (Single CardApp Container) */}
      <CardApp id="breadcrumb-showcase-single-container" className="p-4 md:p-6 space-y-6 text-left">
        <div className="flex items-center justify-between border-b border-hairline-soft pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-vibrant-purple-dark" />
            <TextApp id="breadcrumb-card-showcase-title" variant="h4" weight="bold">
              BreadcrumbApp Variants &amp; Matrix Showcase
            </TextApp>
          </div>

          <BadgeApp id="breadcrumb-badge-showcase" variant="solidPurple" size="sm">
            1 Showcase Container
          </BadgeApp>
        </div>

        <div className="space-y-8">
          {/* Sub-section 1: Standard Breadcrumb with Chevron */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <TextApp
                id="breadcrumb-variant-1-title"
                variant="caption"
                weight="bold"
                className="text-vibrant-purple-dark uppercase tracking-wider"
              >
                1. Standard Breadcrumb with Chevron (`variant="default"`)
              </TextApp>
              <BadgeApp id="breadcrumb-variant-1-tag" variant="neutral" size="sm" rounded="pill">
                default
              </BadgeApp>
            </div>

            <div className="p-3 bg-surface rounded-xl border border-hairline-soft">
              <BreadcrumbApp id="demo-standard-breadcrumb" items={standardItems} variant="default" size="md" />
            </div>
          </div>

          {/* Sub-section 2: Slash Separator Breadcrumb */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <TextApp
                id="breadcrumb-variant-2-title"
                variant="caption"
                weight="bold"
                className="text-vibrant-purple-dark uppercase tracking-wider"
              >
                2. Slash Separator Breadcrumb (`separator="/"`)
              </TextApp>
              <BadgeApp id="breadcrumb-variant-2-tag" variant="neutral" size="sm" rounded="pill">
                slash separator
              </BadgeApp>
            </div>

            <div className="p-3 bg-surface rounded-xl border border-hairline-soft">
              <BreadcrumbApp
                id="demo-slash-breadcrumb"
                items={standardItems}
                separator="/"
                variant="default"
                size="md"
              />
            </div>
          </div>

          {/* Sub-section 3: Collapsed Breadcrumb with Ellipsis (...) Dropdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <TextApp
                id="breadcrumb-variant-3-title"
                variant="caption"
                weight="bold"
                className="text-vibrant-purple-dark uppercase tracking-wider"
              >
                3. Collapsed Breadcrumb with Ellipsis (`maxItems={3}`)
              </TextApp>
              <BadgeApp id="breadcrumb-variant-3-tag" variant="solidPurple" size="sm" rounded="pill">
                collapsed ellipsis
              </BadgeApp>
            </div>

            <div className="p-3 bg-surface rounded-xl border border-hairline-soft">
              <BreadcrumbApp
                id="demo-collapsed-breadcrumb"
                items={longPathItems}
                maxItems={3}
                variant="default"
                size="md"
              />
            </div>
          </div>

          {/* Sub-section 4: Pills Breadcrumb Variant */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <TextApp
                id="breadcrumb-variant-4-title"
                variant="caption"
                weight="bold"
                className="text-vibrant-purple-dark uppercase tracking-wider"
              >
                4. Pills Container Breadcrumb (`variant="pills"`, `rounded="full"`)
              </TextApp>
              <BadgeApp id="breadcrumb-variant-4-tag" variant="neutral" size="sm" rounded="pill">
                pills
              </BadgeApp>
            </div>

            <div className="p-3 bg-surface-soft/80 rounded-xl border border-hairline-soft">
              <BreadcrumbApp
                id="demo-pills-breadcrumb"
                items={standardItems}
                variant="pills"
                rounded="full"
                size="md"
              />
            </div>
          </div>
        </div>
      </CardApp>

      {/* SECTION 2: LIVE INTERACTIVE PLAYGROUND */}
      <div className="space-y-4 bg-vibrant-grey-bg/30 p-4 md:p-6 rounded-card-custom border border-hairline-soft/80 text-left mt-6">
        <div className="flex items-center gap-2 border-b border-hairline-soft pb-2.5">
          <Sliders className="w-4 h-4 text-vibrant-purple-dark" />
          <TextApp id="breadcrumb-sec2-title" variant="h4" weight="bold">
            Live Interactive BreadcrumbApp Playground
          </TextApp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Controls */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <TextApp
                  id="breadcrumb-play-var-label"
                  variant="caption"
                  weight="bold"
                  className="text-ink uppercase tracking-wider block mb-1"
                >
                  Variant (`variant`)
                </TextApp>
                <select
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as any)}
                  className="w-full text-xs font-semibold bg-surface border border-hairline-soft rounded px-2 py-1.5 text-ink"
                >
                  <option value="default">default</option>
                  <option value="muted">muted</option>
                  <option value="pills">pills</option>
                </select>
              </div>

              <div>
                <TextApp
                  id="breadcrumb-play-sz-label"
                  variant="caption"
                  weight="bold"
                  className="text-ink uppercase tracking-wider block mb-1"
                >
                  Size (`size`)
                </TextApp>
                <div className="flex gap-1">
                  {(["sm", "md", "lg"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={cn(
                        "flex-1 px-2 py-1 text-xs font-semibold rounded border transition-all cursor-pointer uppercase",
                        size === s
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
                <TextApp
                  id="breadcrumb-play-rnd-label"
                  variant="caption"
                  weight="bold"
                  className="text-ink uppercase tracking-wider block mb-1"
                >
                  Rounded (`rounded`)
                </TextApp>
                <select
                  value={rounded}
                  onChange={(e) => setRounded(e.target.value as any)}
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
                <TextApp
                  id="breadcrumb-play-max-label"
                  variant="caption"
                  weight="bold"
                  className="text-ink uppercase tracking-wider block mb-1"
                >
                  Max Items (`maxItems`)
                </TextApp>
                <select
                  value={maxItems === undefined ? "none" : String(maxItems)}
                  onChange={(e) => setMaxItems(e.target.value === "none" ? undefined : Number(e.target.value))}
                  className="w-full text-xs font-semibold bg-surface border border-hairline-soft rounded px-2 py-1.5 text-ink"
                >
                  <option value="none">Unconstrained (All)</option>
                  <option value="3">3 items (Collapsed)</option>
                  <option value="4">4 items</option>
                  <option value="5">5 items</option>
                </select>
              </div>
            </div>

            <div>
              <TextApp
                id="breadcrumb-play-sep-label"
                variant="caption"
                weight="bold"
                className="text-ink uppercase tracking-wider block mb-1"
              >
                Separator (`separator`)
              </TextApp>
              <div className="flex gap-1">
                <button
                  onClick={() => setSeparatorType("chevron")}
                  className={cn(
                    "flex-1 px-2 py-1 text-xs font-semibold rounded border transition-all cursor-pointer inline-flex items-center justify-center gap-1",
                    separatorType === "chevron"
                      ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                      : "bg-surface text-ink-secondary border-hairline-soft"
                  )}
                >
                  <ChevronRight className="w-3.5 h-3.5" /> Chevron (&gt;)
                </button>
                <button
                  onClick={() => setSeparatorType("slash")}
                  className={cn(
                    "flex-1 px-2 py-1 text-xs font-semibold rounded border transition-all cursor-pointer inline-flex items-center justify-center gap-1",
                    separatorType === "slash"
                      ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                      : "bg-surface text-ink-secondary border-hairline-soft"
                  )}
                >
                  <Slash className="w-3.5 h-3.5" /> Slash (/)
                </button>
                <button
                  onClick={() => setSeparatorType("dash")}
                  className={cn(
                    "flex-1 px-2 py-1 text-xs font-semibold rounded border transition-all cursor-pointer inline-flex items-center justify-center gap-1",
                    separatorType === "dash"
                      ? "bg-vibrant-purple-dark text-white border-vibrant-purple-dark"
                      : "bg-surface text-ink-secondary border-hairline-soft"
                  )}
                >
                  <Minus className="w-3.5 h-3.5" /> Dash (-)
                </button>
              </div>
            </div>
          </div>

          {/* Live Preview & Code */}
          <div className="space-y-4 bg-surface p-4 rounded-xl border border-hairline-soft">
            <TextApp
              id="breadcrumb-play-preview-title"
              variant="caption"
              weight="bold"
              className="text-ink-muted uppercase tracking-wider block"
            >
              Live Interactive Result Preview
            </TextApp>

            <div className="p-3 bg-vibrant-grey-bg/20 rounded-xl border border-hairline-soft min-h-[100px] flex items-center">
              <BreadcrumbApp
                id="interactive-breadcrumb-demo"
                variant={variant}
                size={size}
                rounded={rounded}
                maxItems={maxItems}
                separator={separatorElement}
                items={longPathItems}
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <TextApp
                  id="breadcrumb-play-code-title"
                  variant="caption"
                  weight="bold"
                  className="text-ink-muted uppercase tracking-wider flex items-center gap-1"
                >
                  <Code className="w-3.5 h-3.5" /> JSX Snippet
                </TextApp>
                <button
                  onClick={copyCode}
                  className="px-2 py-0.5 text-[9px] font-bold bg-vibrant-purple/10 text-vibrant-purple-dark hover:bg-vibrant-purple/20 rounded transition-all cursor-pointer inline-flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" /> Copied!
                    </>
                  ) : (
                    "Copy JSX"
                  )}
                </button>
              </div>
              <pre className="text-[10px] font-mono bg-vibrant-grey-bg/60 p-2.5 rounded border border-hairline-soft text-ink-muted overflow-x-auto">
                {codeSnippet}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </ModuleCard>
  );
}
