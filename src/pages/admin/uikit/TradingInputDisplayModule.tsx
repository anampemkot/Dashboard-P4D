import * as React from "react";
import {
  TradingInputApp,
  TextApp,
  CardApp,
  BadgeApp,
  ButtonApp,
} from "@/packages/design-system";
import { TrendingUp, Settings, Info, Code, Check, RefreshCw } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { cn } from "@/lib/utils";

export function TradingInputDisplayModule() {
  // Demo states for Showcase
  const [stockLots, setStockLots] = React.useState<number>(10);
  const [cryptoShares, setCryptoShares] = React.useState<number>(0.5);
  const [errorLots, setErrorLots] = React.useState<number>(300);

  // Playground Interactive State
  const [playVariant, setPlayVariant] = React.useState<"stock" | "crypto" | "default">("stock");
  const [playUnit, setPlayUnit] = React.useState<string>("Lot");
  const [playSize, setPlaySize] = React.useState<"sm" | "md" | "lg">("md");
  const [playRounded, setPlayRounded] = React.useState<"none" | "sm" | "md" | "lg" | "xl" | "full">("md");
  const [playDisabled, setPlayDisabled] = React.useState<boolean>(false);
  const [playValue, setPlayValue] = React.useState<number>(5);
  const [playPrice, setPlayPrice] = React.useState<number>(50000);
  const [playBalance, setPlayBalance] = React.useState<number>(10000000);
  const [copied, setCopied] = React.useState<boolean>(false);

  const codeString = `<TradingInputApp\n  id="demo-trading-input"\n  variant="${playVariant}"\n  unit="${playUnit}"\n  value={${playValue}}\n  pricePerUnit={${playPrice}}\n  availableBalance={${playBalance}}\n  size="${playSize}"\n  rounded="${playRounded}"${playDisabled ? "\n  disabled" : ""}\n  onChange={(val) => setQuantity(val)}\n/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModuleCard
      id="uikit-tradinginput-module"
      icon={<TrendingUp className="w-5 h-5 text-vibrant-purple-dark" />}
      title="TradingInputApp (Lot / Share Size Input)"
      description="Komponen masukan jumlah Lot saham, Crypto share, atau komoditas trading yang dilengkapi tombol persentase instan (25%, 50%, 75%, 100%), stepper increment/decrement, serta kalkulasi otomatis total estimasi transaksi & batas saldo."
    >
      {/* SECTION 1: 1 CONTAINER CARD SHOWCASE (Single CardApp Container) */}
      <CardApp id="trading-showcase-single-container" className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-hairline-soft pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-vibrant-purple-dark" />
            <TextApp id="trading-card-showcase-title" variant="h4" weight="bold">
              TradingInputApp Matrix &amp; Variant Showcase
            </TextApp>
          </div>
          <BadgeApp id="trading-badge-showcase" variant="solidPurple" size="sm">
            1 Showcase Container
          </BadgeApp>
        </div>

        {/* Spacing Scale Step 4 Gap (16px / gap-4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
          {/* Item 1: Stock Lot Trading Input with Quick % */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between">
            <div>
              <TextApp id="trading-item1-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block mb-2">
                1. Stock Trading Input (variant="stock")
              </TextApp>
              <TradingInputApp
                id="trading-demo-stock"
                variant="stock"
                unit="Lot"
                label="Jumlah Pembelian Saham BBCA"
                description="1 Lot = 100 Lembar Saham"
                value={stockLots}
                onChange={setStockLots}
                pricePerUnit={850000} // Rp 8.500 per lembar x 100 = 850.000 / lot
                availableBalance={25000000}
                rounded="md"
              />
            </div>
          </div>

          {/* Item 2: Crypto Share Input with Estimated Total */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between">
            <div>
              <TextApp id="trading-item2-badge" variant="caption" weight="bold" className="text-vibrant-purple-dark uppercase tracking-wider block mb-2">
                2. Crypto / Coin Share Input (variant="crypto")
              </TextApp>
              <TradingInputApp
                id="trading-demo-crypto"
                variant="crypto"
                unit="BTC"
                currencySymbol="$"
                label="Beli Bitcoin (BTC)"
                description="Masukkan pecahan desimal koin"
                value={cryptoShares}
                onChange={setCryptoShares}
                step={0.05}
                min={0.01}
                pricePerUnit={65000} // $65,000 / BTC
                availableBalance={100000}
                rounded="lg"
              />
            </div>
          </div>

          {/* Item 3: Insufficient Balance Error State */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between md:col-span-2 lg:col-span-1">
            <div>
              <TextApp id="trading-item3-badge" variant="caption" weight="bold" className="text-red-500 uppercase tracking-wider block mb-2">
                3. Insufficient Balance Error State
              </TextApp>
              <TradingInputApp
                id="trading-demo-error"
                variant="stock"
                unit="Lot"
                label="Pembelian Saham GOTO"
                description="Contoh peringatan saat estimasi melebihi saldo"
                value={errorLots}
                onChange={setErrorLots}
                pricePerUnit={100000} // Rp 100.000 / lot
                availableBalance={5000000} // Saldo hanya Rp 5 juta tapi 300 lot = Rp 30 juta
                rounded="md"
              />
            </div>
          </div>
        </div>
      </CardApp>

      {/* SECTION 2: LIVE INTERACTIVE PLAYGROUND */}
      <div className="space-y-4 bg-vibrant-grey-bg/30 p-4 md:p-6 rounded-card-custom border border-hairline-soft/80 text-left mt-6">
        <div className="flex items-center gap-2 border-b border-hairline-soft pb-2.5">
          <Settings className="w-4 h-4 text-vibrant-purple-dark" />
          <TextApp id="trading-sec2-title" variant="h4" weight="bold">
            Live Interactive TradingInput Playground
          </TextApp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Controls */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <TextApp id="trading-play-var-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                  Variant (`variant`)
                </TextApp>
                <div className="flex gap-1">
                  {(["stock", "crypto", "default"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => {
                        setPlayVariant(v);
                        if (v === "crypto") setPlayUnit("USDT");
                        else if (v === "stock") setPlayUnit("Lot");
                        else setPlayUnit("Shares");
                      }}
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
                <TextApp id="trading-play-unit-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                  Unit (`unit`)
                </TextApp>
                <input
                  type="text"
                  value={playUnit}
                  onChange={(e) => setPlayUnit(e.target.value)}
                  className="w-full text-xs font-semibold bg-surface border border-hairline-soft rounded px-2.5 py-1.5 text-ink"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <TextApp id="trading-play-sz-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
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
                <TextApp id="trading-play-rnd-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
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
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <TextApp id="trading-play-price-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                  Harga / Unit (`pricePerUnit`)
                </TextApp>
                <input
                  type="number"
                  value={playPrice}
                  onChange={(e) => setPlayPrice(Number(e.target.value))}
                  className="w-full text-xs font-semibold bg-surface border border-hairline-soft rounded px-2.5 py-1.5 text-ink font-mono"
                />
              </div>

              <div>
                <TextApp id="trading-play-bal-label" variant="caption" weight="bold" className="text-ink uppercase tracking-wider block mb-1">
                  Saldo Available (`availableBalance`)
                </TextApp>
                <input
                  type="number"
                  value={playBalance}
                  onChange={(e) => setPlayBalance(Number(e.target.value))}
                  className="w-full text-xs font-semibold bg-surface border border-hairline-soft rounded px-2.5 py-1.5 text-ink font-mono"
                />
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={playDisabled}
                  onChange={(e) => setPlayDisabled(e.target.checked)}
                  className="rounded text-vibrant-purple border-hairline focus:ring-vibrant-purple"
                />
                <TextApp id="trading-play-dis-text" variant="caption" weight="semibold" className="text-ink-secondary">
                  Non-aktifkan Controls (`disabled`)
                </TextApp>
              </label>
            </div>
          </div>

          {/* Result Output */}
          <div className="space-y-4 bg-surface p-4 rounded-xl border border-hairline-soft">
            <TextApp id="trading-play-output-label" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider block">
              Live Interactive Result
            </TextApp>

            <div className="p-4 bg-vibrant-grey-bg/15 rounded-lg border border-hairline-soft border-dashed flex flex-col items-center justify-center">
              <TradingInputApp
                id="interactive-trading-input"
                label="Input Order Pembelian Interaktif"
                description="Gunakan tombol persentase atau tombol +/- stepper"
                variant={playVariant}
                unit={playUnit}
                size={playSize}
                rounded={playRounded}
                disabled={playDisabled}
                value={playValue}
                onChange={setPlayValue}
                pricePerUnit={playPrice}
                availableBalance={playBalance}
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <TextApp id="trading-play-code-title" variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider flex items-center gap-1">
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
          <TextApp id="trading-info-title" variant="body" weight="bold" className="text-ink">
            Foundation Design System TradingInput Matrix &amp; Rules
          </TextApp>
          <TextApp id="trading-info-desc" variant="caption" className="text-ink-secondary block">
            Komponen <code>TradingInputApp</code> mematuhi Spacing Matrix Step 1 (4px / <code>gap-1</code>) untuk quick percentage buttons, Step 2 (8px / <code>gap-2</code>) untuk label, input, dan balance info/estimated value, Step 3 (12px / <code>gap-3</code>) untuk kontainer quick select, dan Step 4 (16px / <code>gap-4</code>) untuk spacing antar varian showcase.
          </TextApp>
        </div>
      </div>
    </ModuleCard>
  );
}
