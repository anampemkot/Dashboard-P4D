import * as React from "react";
import {
  ContextMenuApp,
  ContextMenuItemGroup,
  ContextMenuVariant,
  ContextMenuSize,
  ContextMenuRounded,
  ButtonApp,
  TextApp,
  BadgeApp,
} from "@/packages/design-system";
import {
  MousePointerClick,
  Copy,
  FolderOpen,
  Edit3,
  Trash2,
  Download,
  Code,
  Check,
  FileSpreadsheet,
  Printer,
} from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid } from "./shared/ShowcaseCard";
import { PlaygroundChip } from "./shared/PlaygroundChip";

export function ContextMenuDisplayModule() {
  const [variant, setVariant] = React.useState<ContextMenuVariant>("default");
  const [size, setSize] = React.useState<ContextMenuSize>("md");
  const [rounded, setRounded] = React.useState<ContextMenuRounded>("xl");
  const [copied, setCopied] = React.useState(false);
  const [lastAction, setLastAction] = React.useState<string | null>(null);

  const sampleMenuGroups: ContextMenuItemGroup[] = [
    {
      id: "grp-1",
      heading: "Aksi Utama",
      items: [
        {
          id: "m-open",
          label: "Buka Detail Wajib Pajak",
          icon: <FolderOpen className="w-4 h-4" />,
          shortcut: "Enter",
          onClick: () => setLastAction("Buka Detail Wajib Pajak"),
        },
        {
          id: "m-edit",
          label: "Ubah Data Penetapan",
          icon: <Edit3 className="w-4 h-4" />,
          shortcut: "Ctrl+E",
          onClick: () => setLastAction("Ubah Data Penetapan"),
        },
        {
          id: "m-export",
          label: "Ekspor Berkas SKPD",
          icon: <Download className="w-4 h-4" />,
          children: [
            {
              id: "m-exp-pdf",
              label: "Format PDF Resmi",
              icon: <FileSpreadsheet className="w-4 h-4" />,
              shortcut: "Ctrl+P",
              onClick: () => setLastAction("Ekspor PDF"),
            },
            {
              id: "m-exp-excel",
              label: "Format Excel Spreadsheet",
              icon: <FileSpreadsheet className="w-4 h-4" />,
              onClick: () => setLastAction("Ekspor Excel"),
            },
          ],
        },
      ],
    },
    {
      id: "grp-2",
      heading: "Operasi Sekunder",
      items: [
        {
          id: "m-copy",
          label: "Salin Kode VA Pembayaran",
          icon: <Copy className="w-4 h-4" />,
          shortcut: "Ctrl+C",
          onClick: () => setLastAction("Salin Kode VA"),
        },
        {
          id: "m-print",
          label: "Cetak Ulang Bukti Lunas",
          icon: <Printer className="w-4 h-4" />,
          onClick: () => setLastAction("Cetak Bukti Lunas"),
        },
        {
          id: "m-delete",
          label: "Batalkan Penetapan",
          icon: <Trash2 className="w-4 h-4" />,
          danger: true,
          shortcut: "Del",
          onClick: () => setLastAction("Batalkan Penetapan"),
        },
      ],
    },
  ];

  const codeSnippet = `<ContextMenuApp
  id="tax-record-context-menu"
  items={menuGroups}
  variant="${variant}"
  size="${size}"
  rounded="${rounded}"
>
  <div className="p-8 border border-dashed rounded-xl">
    Klik kanan di sini untuk membuka Context Menu
  </div>
</ContextMenuApp>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModuleCard
      id="uikit-contextmenu-module"
      icon={<MousePointerClick className="w-5 h-5 text-vibrant-purple-dark" />}
      title="ContextMenuApp (Right-Click Context Menu)"
      description="Menu konteks popover klik-kanan dengan dukungan sub-menu bertingkat (nested accordion), lencana shortcut keyboard, item berisiko (danger state), serta shadow elevasi tinggi."
    >
      <ShowcaseGrid cols={2}>
        <ShowcaseCard
          id="contextmenu-showcase-embedded"
          title="Embedded & Sub-Menu Nested"
          description="Tampilan menu tertanam (embedded) dengan sub-menu bertingkat"
          code={`<ContextMenuApp id="cmenu" items={menuGroups} variant="default" size="md" rounded="xl" embedded />`}
        >
          <div className="w-full max-w-md mx-auto py-2">
            <ContextMenuApp
              id="demo-cmenu-embedded"
              items={sampleMenuGroups}
              variant="default"
              size="md"
              rounded="xl"
              embedded={true}
            />
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          id="contextmenu-showcase-trigger"
          title="Interactive Right-Click Trigger"
          description="Klik kanan area di bawah untuk membuka menu konteks dinamis"
          code={`<ContextMenuApp id="cmenu" items={menuGroups} variant="${variant}" size="${size}" rounded="${rounded}">\n  <div>Klik kanan di sini</div>\n</ContextMenuApp>`}
        >
          <ContextMenuApp
            id="interactive-cmenu-trigger"
            items={sampleMenuGroups}
            variant={variant}
            size={size}
            rounded={rounded}
          >
            <div className="h-[160px] w-full border-2 border-dashed border-vibrant-purple/40 hover:border-vibrant-purple bg-vibrant-purple/5 hover:bg-vibrant-purple/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2 transition-all cursor-context-menu">
              <div className="p-3 rounded-full bg-vibrant-purple-dark text-white shadow-md">
                <MousePointerClick className="w-5 h-5" />
              </div>
              <TextApp id="cmenu-target-heading" variant="body" weight="bold" className="text-vibrant-purple-dark">
                Klik Kanan di Dalam Kotak Ini
              </TextApp>
              {lastAction && (
                <BadgeApp id="cmenu-last-act-badge" variant="solidPurple" size="sm">
                  Aksi: {lastAction}
                </BadgeApp>
              )}
            </div>
          </ContextMenuApp>
        </ShowcaseCard>

        <ShowcaseCard
          id="contextmenu-showcase-playground"
          title="Live Interactive Playground"
          description="Konfigurasi lengkap ContextMenuApp dengan kode JSX yang dihasilkan"
          align="start"
          className="md:col-span-2"
        >
          <div className="grid w-full grid-cols-1 gap-6 text-left lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div>
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink">Variant</span>
                <div className="flex flex-wrap gap-1.5">
                  {(["default", "dark", "glassmorphism"] as const).map((v) => (
                    <PlaygroundChip key={v} id={`cmenu-play-variant-${v}`} active={variant === v} onClick={() => setVariant(v)}>
                      {v}
                    </PlaygroundChip>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink">Size</span>
                  <div className="flex flex-wrap gap-1">
                    {(["sm", "md", "lg"] as const).map((s) => (
                      <PlaygroundChip key={s} id={`cmenu-play-size-${s}`} active={size === s} onClick={() => setSize(s)} className="flex-1">
                        {s}
                      </PlaygroundChip>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink">Rounded</span>
                  <div className="flex flex-wrap gap-1">
                    {(["none", "sm", "md", "lg", "xl", "full"] as const).map((r) => (
                      <PlaygroundChip key={r} id={`cmenu-play-rounded-${r}`} active={rounded === r} onClick={() => setRounded(r)} className="flex-1">
                        {r}
                      </PlaygroundChip>
                    ))}
                  </div>
                </div>
              </div>

              {lastAction && (
                <div className="p-3 bg-vibrant-purple/10 border border-vibrant-purple/30 rounded-xl flex items-center justify-between">
                  <TextApp id="cmenu-last-act-lbl" variant="caption" className="text-vibrant-purple-dark font-medium">
                    Aksi Terakhir:
                  </TextApp>
                  <BadgeApp id="cmenu-last-act-badge-2" variant="solidPurple" size="sm">
                    {lastAction}
                  </BadgeApp>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between gap-4 rounded-xl border border-hairline-soft bg-surface-soft p-4">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Live Preview Output</span>
                <div className="flex min-h-[120px] items-center justify-center rounded-lg border border-dashed border-hairline bg-surface p-4">
                  <ContextMenuApp
                    id="playground-cmenu-output"
                    items={sampleMenuGroups}
                    variant={variant}
                    size={size}
                    rounded={rounded}
                  >
                    <div className="px-6 py-4 border-2 border-dashed border-hairline rounded-xl text-center text-xs text-ink-secondary">
                      Klik kanan di sini
                    </div>
                  </ContextMenuApp>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                    <Code className="h-3.5 w-3.5" /> Generated JSX Code
                  </span>
                  <ButtonApp
                    id="cmenu-play-copy-jsx"
                    variant="ghost"
                    size="sm"
                    onClick={copyCode}
                    className="h-6 min-h-6 px-2 text-[10px]"
                    leftIcon={copied ? <Check className="w-3 h-3 text-emerald-600" /> : undefined}
                  >
                    {copied ? "Copied!" : "Copy JSX"}
                  </ButtonApp>
                </div>
                <pre className="overflow-x-auto rounded-md bg-zinc-950 p-3 text-[10px] font-mono leading-relaxed text-zinc-100">
                  {codeSnippet}
                </pre>
              </div>
            </div>
          </div>
        </ShowcaseCard>
      </ShowcaseGrid>
    </ModuleCard>
  );
}
