import * as React from "react";
import {
  PaginationApp,
  PaginationType,
  PaginationVariant,
  PaginationSize,
  PaginationRounded,
  ButtonApp,
} from "@/packages/design-system";
import { ListOrdered, Code, Check } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid } from "./shared/ShowcaseCard";
import { PlaygroundChip } from "./shared/PlaygroundChip";

export function PaginationDisplayModule() {
  const [currentPage, setCurrentPage] = React.useState(5);
  const [pageSize, setPageSize] = React.useState(10);
  const [type, setType] = React.useState<PaginationType>("standard");
  const [variant, setVariant] = React.useState<PaginationVariant>("default");
  const [size, setSize] = React.useState<PaginationSize>("md");
  const [rounded, setRounded] = React.useState<PaginationRounded>("lg");
  const [copied, setCopied] = React.useState(false);

  const [presetPage1, setPresetPage1] = React.useState(3);
  const [presetPage2, setPresetPage2] = React.useState(1);

  const totalPages = Math.ceil(150 / pageSize);

  const codeSnippet = `<PaginationApp
  id="my-table-pagination"
  type="${type}"
  currentPage={${currentPage}}
  totalPages={${totalPages}}
  totalItems={150}
  pageSize={${pageSize}}
  variant="${variant}"
  size="${size}"
  rounded="${rounded}"
  onPageChange={(page) => setCurrentPage(page)}
  onPageSizeChange={(size) => setPageSize(size)}
/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModuleCard
      id="uikit-pagination-module"
      icon={<ListOrdered className="w-5 h-5 text-vibrant-purple-dark" />}
      title="PaginationApp (Table & Search Paging)"
      description="Kontrol perpindahan halaman tabel data dan hasil pencarian dengan tipe Standard Numbered (Ellipsis ...), Simple Prev/Next, & Load More, serta pemilih Rows Per Page."
    >
      <ShowcaseGrid cols={2}>
        <ShowcaseCard
          id="pagination-showcase-standard"
          title="Standard Numbered + Ellipsis"
          description='type="standard" — Rows Per Page & Item Summary'
          code={`<PaginationApp id="pagi" type="standard" currentPage={${presetPage1}} totalPages={20} totalItems={200} pageSize={10} showRowsPerPage showItemSummary onPageChange={setPage} />`}
        >
          <PaginationApp
            id="demo-pagi-standard"
            type="standard"
            currentPage={presetPage1}
            totalPages={20}
            totalItems={200}
            pageSize={10}
            variant="default"
            size="md"
            rounded="lg"
            showRowsPerPage={true}
            showItemSummary={true}
            onPageChange={(p) => setPresetPage1(p)}
          />
        </ShowcaseCard>

        <ShowcaseCard
          id="pagination-showcase-simple"
          title="Simple Prev/Next"
          description='type="simple" — navigasi ringkas outline & rounded full'
          code={`<PaginationApp id="pagi" type="simple" currentPage={${presetPage2}} totalPages={8} totalItems={80} pageSize={10} variant="outline" size="sm" rounded="full" onPageChange={setPage} />`}
        >
          <PaginationApp
            id="demo-pagi-simple"
            type="simple"
            currentPage={presetPage2}
            totalPages={8}
            totalItems={80}
            pageSize={10}
            variant="outline"
            size="sm"
            rounded="full"
            onPageChange={(p) => setPresetPage2(p)}
          />
        </ShowcaseCard>

        <ShowcaseCard
          id="pagination-showcase-loadmore"
          title="Load More Infinite"
          description='type="loadMore" — gaya infinite scroll'
          code={`<PaginationApp id="pagi" type="loadMore" currentPage={2} totalPages={5} totalItems={50} pageSize={10} loadMoreText="Muat 10 Data Lagi" />`}
        >
          <PaginationApp
            id="demo-pagi-loadmore"
            type="loadMore"
            currentPage={2}
            totalPages={5}
            totalItems={50}
            pageSize={10}
            size="md"
            rounded="lg"
            loadMoreText="Muat 10 Data Lagi"
          />
        </ShowcaseCard>

        <ShowcaseCard
          id="pagination-showcase-playground"
          title="Live Interactive Playground"
          description="Konfigurasi lengkap PaginationApp dengan kode JSX yang dihasilkan"
          align="start"
          className="md:col-span-2"
        >
          <div className="grid w-full grid-cols-1 gap-6 text-left lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div>
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink">Type</span>
                <div className="flex flex-wrap gap-1.5">
                  {(["standard", "simple", "loadMore"] as const).map((t) => (
                    <PlaygroundChip key={t} id={`pagi-play-type-${t}`} active={type === t} onClick={() => setType(t)}>
                      {t}
                    </PlaygroundChip>
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink">Variant</span>
                <div className="flex flex-wrap gap-1.5">
                  {(["default", "outline", "vibrant", "ghost"] as const).map((v) => (
                    <PlaygroundChip key={v} id={`pagi-play-variant-${v}`} active={variant === v} onClick={() => setVariant(v)}>
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
                      <PlaygroundChip key={s} id={`pagi-play-size-${s}`} active={size === s} onClick={() => setSize(s)} className="flex-1">
                        {s}
                      </PlaygroundChip>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink">Rounded</span>
                  <div className="flex flex-wrap gap-1">
                    {(["none", "sm", "md", "lg", "xl", "full"] as const).map((r) => (
                      <PlaygroundChip key={r} id={`pagi-play-rounded-${r}`} active={rounded === r} onClick={() => setRounded(r)} className="flex-1">
                        {r}
                      </PlaygroundChip>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4 rounded-xl border border-hairline-soft bg-surface-soft p-4">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Live Preview Output</span>
                <div className="flex min-h-[120px] items-center justify-center rounded-lg border border-dashed border-hairline bg-surface p-4">
                  <PaginationApp
                    id="interactive-pagination-demo"
                    type={type}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={150}
                    pageSize={pageSize}
                    variant={variant}
                    size={size}
                    rounded={rounded}
                    onPageChange={(p) => setCurrentPage(p)}
                    onPageSizeChange={(s) => setPageSize(s)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                    <Code className="h-3.5 w-3.5" /> Generated JSX Code
                  </span>
                  <ButtonApp
                    id="pagi-play-copy-jsx"
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
