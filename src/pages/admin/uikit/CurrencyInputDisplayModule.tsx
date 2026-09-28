import * as React from "react";
import { CurrencyInputApp, ButtonApp } from "@/packages/design-system";
import { Wallet, Code, Check } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid, ShowcaseGroup } from "./shared/ShowcaseCard";
import { PlaygroundChip } from "./shared/PlaygroundChip";

export function CurrencyInputDisplayModule() {
  const [playValue, setPlayValue] = React.useState<number>(2500000);
  const [playSize, setPlaySize] = React.useState<"sm" | "md" | "lg">("sm");
  const [playRounded, setPlayRounded] = React.useState<"none" | "sm" | "md" | "lg" | "xl" | "full">("lg");
  const [playError, setPlayError] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);

  const codeString = `<CurrencyInputApp
  id="my-currency-input"
  size="${playSize}"
  rounded="${playRounded}"
  value={${playValue}}
  onChange={(value) => console.log(value)}${playError ? '\n  error\n  errorMessage="Nominal tidak valid"' : ""}
/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModuleCard
      id="uikit-currency-input-module"
      icon={<Wallet className="w-5 h-5 text-vibrant-purple-dark" />}
      title="CurrencyInputApp"
      description="Input khusus nominal pajak dengan format otomatis Rp — pemisah ribuan real-time, prefix mata uang, dan state error untuk validasi."
    >
      <ShowcaseGrid cols={2}>
        <ShowcaseCard
          id="currency-showcase-basic"
          title="Format Otomatis Rupiah"
          description="Pemisah ribuan real-time saat mengetik, prefix 'Rp' tetap"
          code={`<CurrencyInputApp id="nominal" label="Nominal Pajak" defaultValue={1500000} />`}
        >
          <CurrencyInputApp id="currency-basic" label="Nominal Pajak" defaultValue={1500000} containerClassName="max-w-xs" />
        </ShowcaseCard>

        <ShowcaseCard
          id="currency-showcase-error"
          title="State error"
          description="errorMessage untuk validasi"
          code={`<CurrencyInputApp id="c" error errorMessage="Nominal minimum Rp 100.000" />`}
        >
          <CurrencyInputApp id="currency-showcase-error-demo" label="Denda Keterlambatan" defaultValue={50000} error errorMessage="Nominal minimum Rp 100.000" containerClassName="max-w-xs" />
        </ShowcaseCard>

        <ShowcaseCard
          id="currency-showcase-disabled"
          title="State disabled"
          description="Field terkunci"
          code={`<CurrencyInputApp id="c" disabled defaultValue={500000} />`}
        >
          <CurrencyInputApp id="currency-showcase-disabled-demo" label="Total Tagihan" defaultValue={7500000} disabled containerClassName="max-w-xs" />
        </ShowcaseCard>
      </ShowcaseGrid>

      <ShowcaseGroup id="currency-group-rounded" title="Corner Radius" description="none · sm · md · lg (default) · xl · full" cols={3}>
        <ShowcaseCard id="currency-showcase-rounded-none" title="Rounded none" description='rounded="none"' code={`<CurrencyInputApp id="c" rounded="none" />`}>
          <CurrencyInputApp id="currency-showcase-rounded-none-demo" rounded="none" defaultValue={250000} containerClassName="max-w-[160px]" />
        </ShowcaseCard>

        <ShowcaseCard id="currency-showcase-rounded-sm" title="Rounded sm" description='rounded="sm"' code={`<CurrencyInputApp id="c" rounded="sm" />`}>
          <CurrencyInputApp id="currency-showcase-rounded-sm-demo" rounded="sm" defaultValue={250000} containerClassName="max-w-[160px]" />
        </ShowcaseCard>

        <ShowcaseCard id="currency-showcase-rounded-md" title="Rounded md" description='rounded="md"' code={`<CurrencyInputApp id="c" rounded="md" />`}>
          <CurrencyInputApp id="currency-showcase-rounded-md-demo" rounded="md" defaultValue={250000} containerClassName="max-w-[160px]" />
        </ShowcaseCard>

        <ShowcaseCard id="currency-showcase-rounded-lg" title="Rounded lg" description='rounded="lg" — default katalog' code={`<CurrencyInputApp id="c" rounded="lg" />`}>
          <CurrencyInputApp id="currency-showcase-rounded-lg-demo" rounded="lg" defaultValue={250000} containerClassName="max-w-[160px]" />
        </ShowcaseCard>

        <ShowcaseCard id="currency-showcase-rounded-xl" title="Rounded xl" description='rounded="xl"' code={`<CurrencyInputApp id="c" rounded="xl" />`}>
          <CurrencyInputApp id="currency-showcase-rounded-xl-demo" rounded="xl" defaultValue={250000} containerClassName="max-w-[160px]" />
        </ShowcaseCard>

        <ShowcaseCard id="currency-showcase-rounded-full" title="Rounded full" description='rounded="full"' code={`<CurrencyInputApp id="c" rounded="full" />`}>
          <CurrencyInputApp id="currency-showcase-rounded-full-demo" rounded="full" defaultValue={250000} containerClassName="max-w-[160px]" />
        </ShowcaseCard>
      </ShowcaseGroup>

      <ShowcaseGrid cols={2}>

        <ShowcaseCard
          id="currency-showcase-playground"
          title="Live Interactive Playground"
          description="Konfigurasi lengkap CurrencyInputApp dengan kode JSX yang dihasilkan"
          align="start"
          className="md:col-span-2"
        >
          <div className="grid w-full grid-cols-1 gap-6 text-left lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div>
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink">Size</span>
                <div className="flex gap-1.5">
                  {(["sm", "md", "lg"] as const).map((s) => (
                    <PlaygroundChip key={s} id={`currency-play-size-${s}`} active={playSize === s} onClick={() => setPlaySize(s)} className="flex-1">
                      {s}
                    </PlaygroundChip>
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink">Corner Radius</span>
                <div className="flex flex-wrap gap-1.5">
                  {(["none", "sm", "md", "lg", "xl", "full"] as const).map((r) => (
                    <PlaygroundChip key={r} id={`currency-play-rounded-${r}`} active={playRounded === r} onClick={() => setPlayRounded(r)}>
                      {r}
                    </PlaygroundChip>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-hairline-soft pt-3">
                <span className="text-[10px] font-bold uppercase tracking-wide text-ink">State Error</span>
                <PlaygroundChip id="currency-play-error-toggle" active={playError} onClick={() => setPlayError((v) => !v)}>
                  {playError ? "Aktif" : "Nonaktif"}
                </PlaygroundChip>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4 rounded-xl border border-hairline-soft bg-surface-soft p-4">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Live Preview Output</span>
                <div className="flex min-h-[120px] items-center justify-center rounded-lg border border-dashed border-hairline bg-surface p-4">
                  <CurrencyInputApp
                    id="currency-playground-output"
                    size={playSize}
                    rounded={playRounded}
                    value={playValue}
                    onChange={setPlayValue}
                    error={playError}
                    errorMessage={playError ? "Nominal tidak valid" : undefined}
                    containerClassName="max-w-xs"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                    <Code className="h-3.5 w-3.5" /> Generated JSX Code
                  </span>
                  <ButtonApp
                    id="currency-play-copy-jsx"
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
                  {codeString}
                </pre>
              </div>
            </div>
          </div>
        </ShowcaseCard>
      </ShowcaseGrid>
    </ModuleCard>
  );
}
