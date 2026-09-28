import * as React from "react";
import {
  SearchBarApp,
  CardApp,
  TextApp,
  BadgeApp,
  ButtonApp,
  SelectApp,
  InputApp,
  CheckboxApp,
  SearchBarVariant,
  SearchBarSize,
  SearchBarRounded,
  SearchBarBgColor,
} from "@/packages/design-system";
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Code,
  Check,
  Filter,
  Layers,
  Palette,
  Maximize2,
  AlertTriangle,
  FileText,
  Building2,
  Calendar,
  X,
  ArrowRight,
} from "lucide-react";

export function SearchBarDisplayModule() {
  // Playground state
  const [playQuery, setPlayQuery] = React.useState("Wajib Pajak PBB 2026");
  const [playVariant, setPlayVariant] = React.useState<SearchBarVariant>("standard");
  const [playSize, setPlaySize] = React.useState<SearchBarSize>("md");
  const [playRounded, setPlayRounded] = React.useState<SearchBarRounded>("pill");
  const [playBgColor, setPlayBgColor] = React.useState<SearchBarBgColor>("surface");
  const [playPlaceholder, setPlayPlaceholder] = React.useState("Cari NOP, nama WP, atau alamat...");
  const [playShowClear, setPlayShowClear] = React.useState(true);
  const [playShowFilter, setPlayShowFilter] = React.useState(false);
  const [playFilterActive, setPlayFilterActive] = React.useState(false);
  const [playFilterCount, setPlayFilterCount] = React.useState(2);
  const [playDisabled, setPlayDisabled] = React.useState(false);
  const [playErrorState, setPlayErrorState] = React.useState(false);
  const [playErrorMsg, setPlayErrorMsg] = React.useState("NOP tidak ditemukan dalam sistem BPKAD.");
  const [playShortcut, setPlayShortcut] = React.useState("Ctrl+K");
  const [playExpanded, setPlayExpanded] = React.useState(false);

  const [copied, setCopied] = React.useState(false);

  // Demo state for standalone showcases
  const [stdQuery, setStdQuery] = React.useState("02.34.567.890");
  const [filterQuery, setFilterQuery] = React.useState("Kecamatan Gondomanan");
  const [activeFiltersCount, setActiveFiltersCount] = React.useState(3);
  const [expQuery, setExpQuery] = React.useState("");
  const [expState, setExpState] = React.useState(false);

  // Generate code snippet string
  const variantStr = playVariant !== "standard" ? `\n  variant="${playVariant}"` : "";
  const sizeStr = playSize !== "md" ? `\n  size="${playSize}"` : "";
  const roundedStr = playRounded !== "pill" ? `\n  rounded="${playRounded}"` : "";
  const bgStr = playBgColor !== "surface" ? `\n  bgColor="${playBgColor}"` : "";
  const placeholderStr = playPlaceholder !== "Cari data..." ? `\n  placeholder="${playPlaceholder}"` : "";
  const clearStr = !playShowClear ? `\n  showClear={false}` : "";
  const filterStr = playShowFilter ? `\n  showFilter` : "";
  const filterActStr = playFilterActive
    ? `\n  filterActive={${playFilterCount}}`
    : "";
  const disabledStr = playDisabled ? `\n  disabled` : "";
  const errorStr = playErrorState
    ? `\n  error="${playErrorMsg}"`
    : "";
  const shortcutStr = playShortcut.trim() ? `\n  shortcutKey="${playShortcut}"` : "";

  const codeSnippet = `<SearchBarApp
  id="tax-search-input"
  value={searchQuery}
  onSearchChange={(val) => setSearchQuery(val)}
  onSearch={(query) => console.log('Executing search for:', query)}${variantStr}${sizeStr}${roundedStr}${bgStr}${placeholderStr}${clearStr}${filterStr}${filterActStr}${shortcutStr}${errorStr}${disabledStr}
/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6" id="uikit-searchbar-module">
      {/* Header Overview */}
      <CardApp id="searchbar-overview" variant="neutral" size="md" rounded="card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BadgeApp id="sb-badge-forms" variant="solidPurple" size="sm">
                03 &amp; 06 - Inputs &amp; Tables
              </BadgeApp>
              <BadgeApp id="sb-badge-atom" variant="vibrantPurple" size="sm">
                SearchBarApp Molecule
              </BadgeApp>
            </div>
            <TextApp id="sb-title" variant="h3" weight="bold">
              Search Bar (`SearchBarApp`)
            </TextApp>
            <TextApp id="sb-sub" variant="body" color="secondary">
              Bilah pencarian cepat responsif dengan dukungan **Standard**, **With Filter**, dan **Expandable** variant.
              Dilengkapi ikon pencarian utama, tombol pembersih otomatis (Clear 'X'), indikator jumlah filter aktif,
              dukungan status (Default, Focused, Disabled, Error), variasi background &amp; border, serta preset corner radius.
            </TextApp>
          </div>
        </div>
      </CardApp>

      {/* MAIN UNIFIED CARD CONTAINER */}
      <CardApp id="searchbar-main-unified-card" variant="neutral" size="lg" rounded="card">
        <div className="space-y-8">
          
          {/* Sub-Section 1: Variants (Standard, With Filter, Expandable) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="sb-sub-1-h" variant="h4" weight="bold">
                  1. Core Variants (Standard, With Filter, Expandable)
                </TextApp>
              </div>
              <BadgeApp id="sb-b-sub-1" variant="solidPurple" size="sm">3 Variants</BadgeApp>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Variant A: Standard */}
              <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-ink block mb-1">Variant A: Standard Search Bar</span>
                  <p className="text-xs text-ink-muted">Input pencarian dasar dengan ikon pencari, tombol hapus 'X', &amp; shortcut badge.</p>
                </div>
                <div className="pt-2">
                  <SearchBarApp
                    id="sb-demo-std"
                    variant="standard"
                    value={stdQuery}
                    onSearchChange={setStdQuery}
                    placeholder="Cari NOP / Wajib Pajak..."
                    shortcutKey="Ctrl+K"
                  />
                </div>
              </div>

              {/* Variant B: With Filter */}
              <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-ink block mb-1">Variant B: With Filter Button</span>
                  <p className="text-xs text-ink-muted">Memiliki tombol penyaring di ujung kanan dengan badge indikator filter aktif.</p>
                </div>
                <div className="pt-2">
                  <SearchBarApp
                    id="sb-demo-filter"
                    variant="withFilter"
                    value={filterQuery}
                    onSearchChange={setFilterQuery}
                    placeholder="Cari wilayah objek..."
                    filterActive={activeFiltersCount}
                    filterLabel="Filter"
                    onFilterClick={() => setActiveFiltersCount((prev) => (prev > 0 ? 0 : 3))}
                  />
                </div>
              </div>

              {/* Variant C: Expandable */}
              <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-ink block mb-1">Variant C: Expandable Search</span>
                  <p className="text-xs text-ink-muted">Saklar ikon melayang ringkas yang mengembang menjadi bilah pencarian saat diklik.</p>
                </div>
                <div className="pt-2 flex items-center justify-end">
                  <SearchBarApp
                    id="sb-demo-exp"
                    variant="expandable"
                    expanded={expState}
                    onExpandedChange={setExpState}
                    value={expQuery}
                    onSearchChange={setExpQuery}
                    placeholder="Cari cepat..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Section 2: Component States (Default, Focused, Disabled, Error) */}
          <div className="space-y-4 pt-4 border-t border-hairline-soft">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="sb-sub-2-h" variant="h4" weight="bold">
                  2. Component States (Default, Focused, Disabled, Error)
                </TextApp>
              </div>
              <BadgeApp id="sb-b-sub-2" variant="vibrantPurple" size="sm">4 States</BadgeApp>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Default State */}
              <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
                <span className="text-xs font-bold text-ink block">State 1: Default Idle</span>
                <SearchBarApp
                  id="sb-st-default"
                  placeholder="Ketik kueri pencarian..."
                  helperText="Gunakan kata kunci NOP, nama wajib pajak, atau kelurahan."
                />
              </div>

              {/* Focused State Showcase */}
              <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
                <span className="text-xs font-bold text-ink block">State 2: Focused Input</span>
                <SearchBarApp
                  id="sb-st-focused"
                  defaultValue="34.71.010.002.015"
                  autoFocus
                  helperText="Aksen ring berwarna ungu vibrant aktif saat kursor di dalam area."
                />
              </div>

              {/* Disabled State */}
              <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
                <span className="text-xs font-bold text-ink block">State 3: Disabled</span>
                <SearchBarApp
                  id="sb-st-disabled"
                  disabled
                  defaultValue="Pencarian Terkunci"
                  helperText="Pencarian dinonaktifkan sementara oleh sistem administrasi."
                />
              </div>

              {/* Error State */}
              <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
                <span className="text-xs font-bold text-ink block">State 4: Error Validation</span>
                <SearchBarApp
                  id="sb-st-error"
                  defaultValue="99.99.999"
                  error="Format NOP tidak valid (harus 18 digit angka standar BPKAD)."
                />
              </div>
            </div>
          </div>

          {/* Sub-Section 3: Background & Border Variations */}
          <div className="space-y-4 pt-4 border-t border-hairline-soft">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="sb-sub-3-h" variant="h4" weight="bold">
                  3. Border &amp; Background Styles
                </TextApp>
              </div>
              <BadgeApp id="sb-b-sub-3" variant="solidPurple" size="sm">4 Surface Styles</BadgeApp>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Style: Surface */}
              <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
                <BadgeApp id="b-bg-surf" variant="neutral" size="sm">surface (Default)</BadgeApp>
                <SearchBarApp id="sb-bg-surf" bgColor="surface" placeholder="Latar putih hairline..." />
              </div>

              {/* Style: Filled */}
              <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
                <BadgeApp id="b-bg-fill" variant="vibrantPurple" size="sm">filled</BadgeApp>
                <SearchBarApp id="sb-bg-fill" bgColor="filled" placeholder="Latar abu abu halus..." />
              </div>

              {/* Style: Transparent */}
              <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
                <BadgeApp id="b-bg-trans" variant="solidPurple" size="sm">transparent</BadgeApp>
                <SearchBarApp id="sb-bg-trans" bgColor="transparent" placeholder="Latar transparan..." />
              </div>

              {/* Style: Elevated */}
              <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
                <BadgeApp id="b-bg-elev" variant="brand" size="sm">elevated</BadgeApp>
                <SearchBarApp id="sb-bg-elev" bgColor="elevated" placeholder="Latar dengan bayangan..." />
              </div>
            </div>
          </div>

          {/* Sub-Section 4: Sizes & Corner Radius Presets */}
          <div className="space-y-4 pt-4 border-t border-hairline-soft">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <Maximize2 className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="sb-sub-4-h" variant="h4" weight="bold">
                  4. Sizes &amp; Corner Radius Customization
                </TextApp>
              </div>
              <BadgeApp id="sb-b-sub-4" variant="vibrantPurple" size="sm">sm, md, lg &amp; Radius</BadgeApp>
            </div>

            <div className="p-6 bg-surface rounded-xl border border-hairline-soft space-y-6">
              {/* Sizes Row */}
              <div className="space-y-3">
                <TextApp id="sb-sz-title" variant="caption" weight="bold" className="uppercase text-ink-muted">
                  Size Variations (sm, md, lg)
                </TextApp>

                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="w-16 text-xs font-bold text-ink shrink-0">Small (sm)</span>
                    <SearchBarApp id="sb-sz-sm" size="sm" placeholder="Search Bar ukuran kecil (34px)..." />
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-16 text-xs font-bold text-ink shrink-0">Medium (md)</span>
                    <SearchBarApp id="sb-sz-md" size="md" placeholder="Search Bar ukuran standar (42px)..." />
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-16 text-xs font-bold text-ink shrink-0">Large (lg)</span>
                    <SearchBarApp id="sb-sz-lg" size="lg" placeholder="Search Bar ukuran besar (50px)..." />
                  </div>
                </div>
              </div>

              {/* Radius Row */}
              <div className="pt-4 border-t border-hairline-soft space-y-3">
                <TextApp id="sb-rad-title" variant="caption" weight="bold" className="uppercase text-ink-muted">
                  Corner Radius Options
                </TextApp>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <span className="text-xs font-medium text-ink block mb-1">rounded="sm"</span>
                    <SearchBarApp id="sb-rad-sm" rounded="sm" placeholder="Sudut kecil..." />
                  </div>

                  <div>
                    <span className="text-xs font-medium text-ink block mb-1">rounded="md"</span>
                    <SearchBarApp id="sb-rad-md" rounded="md" placeholder="Sudut sedang..." />
                  </div>

                  <div>
                    <span className="text-xs font-medium text-ink block mb-1">rounded="lg"</span>
                    <SearchBarApp id="sb-rad-lg" rounded="lg" placeholder="Sudut besar..." />
                  </div>

                  <div>
                    <span className="text-xs font-medium text-ink block mb-1">rounded="full" (Pill)</span>
                    <SearchBarApp id="sb-rad-full" rounded="full" placeholder="Sudut melengkung penuh..." />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Section 5: Interactive Sandbox & Code Generator */}
          <div className="space-y-4 pt-4 border-t border-hairline-soft">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="sb-sub-5-h" variant="h4" weight="bold">
                  5. Interactive Search Bar Playground
                </TextApp>
              </div>
              <BadgeApp id="sb-b-sub-5" variant="solidPurple" size="sm">Live Sandbox</BadgeApp>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls Form */}
              <div className="lg:col-span-5 space-y-4">
                {/* Search Query Text */}
                <div>
                  <label className="text-xs font-semibold text-ink mb-1 block">Input Value (`value`)</label>
                  <InputApp
                    id="sb-play-val"
                    value={playQuery}
                    onChange={(e) => setPlayQuery(e.target.value)}
                    placeholder="Nilai kueri pencarian..."
                  />
                </div>

                {/* Placeholder */}
                <div>
                  <label className="text-xs font-semibold text-ink mb-1 block">Placeholder Text</label>
                  <InputApp
                    id="sb-play-ph"
                    value={playPlaceholder}
                    onChange={(e) => setPlayPlaceholder(e.target.value)}
                    placeholder="Placeholder pencarian..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Variant */}
                  <div>
                    <label className="text-xs font-semibold text-ink mb-1 block">Variant</label>
                    <SelectApp
                      id="sb-play-var"
                      value={playVariant}
                      onChange={(e) => setPlayVariant(e.target.value as SearchBarVariant)}
                      options={[
                        { value: "standard", label: "Standard" },
                        { value: "withFilter", label: "With Filter" },
                        { value: "expandable", label: "Expandable" },
                      ]}
                    />
                  </div>

                  {/* Size */}
                  <div>
                    <label className="text-xs font-semibold text-ink mb-1 block">Size Metric</label>
                    <SelectApp
                      id="sb-play-size"
                      value={playSize}
                      onChange={(e) => setPlaySize(e.target.value as SearchBarSize)}
                      options={[
                        { value: "sm", label: "Small (sm)" },
                        { value: "md", label: "Medium (md)" },
                        { value: "lg", label: "Large (lg)" },
                      ]}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Rounded */}
                  <div>
                    <label className="text-xs font-semibold text-ink mb-1 block">Corner Radius</label>
                    <SelectApp
                      id="sb-play-rad"
                      value={playRounded}
                      onChange={(e) => setPlayRounded(e.target.value as SearchBarRounded)}
                      options={[
                        { value: "pill", label: "Pill / Full" },
                        { value: "lg", label: "Large (lg)" },
                        { value: "md", label: "Medium (md)" },
                        { value: "sm", label: "Small (sm)" },
                        { value: "none", label: "None (Square)" },
                      ]}
                    />
                  </div>

                  {/* Bg Color */}
                  <div>
                    <label className="text-xs font-semibold text-ink mb-1 block">Background Style</label>
                    <SelectApp
                      id="sb-play-bg"
                      value={playBgColor}
                      onChange={(e) => setPlayBgColor(e.target.value as SearchBarBgColor)}
                      options={[
                        { value: "surface", label: "Surface (Putih)" },
                        { value: "filled", label: "Filled (Soft)" },
                        { value: "transparent", label: "Transparent" },
                        { value: "elevated", label: "Elevated (Shadow)" },
                      ]}
                    />
                  </div>
                </div>

                {/* Shortcut Key */}
                <div>
                  <label className="text-xs font-semibold text-ink mb-1 block">Shortcut Key Label</label>
                  <InputApp
                    id="sb-play-sc"
                    value={playShortcut}
                    onChange={(e) => setPlayShortcut(e.target.value)}
                    placeholder="cth: Ctrl+K, ⌘K, Alt+S"
                  />
                </div>

                {/* Toggle Controls */}
                <div className="p-3 bg-surface-soft/60 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-ink font-medium">Clear 'X' Button</span>
                    <CheckboxApp
                      id="sb-play-chk-clear"
                      checked={playShowClear}
                      onChange={(e) => setPlayShowClear(e.target.checked)}
                      label="Show Clear"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-ink font-medium">Filter Action Button</span>
                    <CheckboxApp
                      id="sb-play-chk-filter"
                      checked={playShowFilter}
                      onChange={(e) => setPlayShowFilter(e.target.checked)}
                      label="Show Filter"
                    />
                  </div>

                  {(playShowFilter || playVariant === "withFilter") && (
                    <div className="flex items-center justify-between pl-3 pt-1 border-l-2 border-vibrant-purple">
                      <span className="text-xs text-ink font-medium">Active Filter Badge</span>
                      <CheckboxApp
                        id="sb-play-chk-fact"
                        checked={playFilterActive}
                        onChange={(e) => setPlayFilterActive(e.target.checked)}
                        label={`Active (${playFilterCount})`}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 border-t border-hairline-soft">
                    <span className="text-xs text-ink font-medium">Error Validation State</span>
                    <CheckboxApp
                      id="sb-play-chk-err"
                      checked={playErrorState}
                      onChange={(e) => setPlayErrorState(e.target.checked)}
                      label="Error State"
                    />
                  </div>

                  {playErrorState && (
                    <InputApp
                      id="sb-play-errmsg"
                      value={playErrorMsg}
                      onChange={(e) => setPlayErrorMsg(e.target.value)}
                      placeholder="Pesan error..."
                      className="text-xs mt-1"
                    />
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-ink font-medium">Disabled State</span>
                    <CheckboxApp
                      id="sb-play-chk-dis"
                      checked={playDisabled}
                      onChange={(e) => setPlayDisabled(e.target.checked)}
                      label="Disabled"
                    />
                  </div>
                </div>
              </div>

              {/* Live Preview Box & Generated Code */}
              <div className="lg:col-span-7 flex flex-col justify-between bg-surface-soft/60 p-6 rounded-2xl border border-hairline-soft">
                <div className="space-y-6">
                  <TextApp id="sb-prev-h" variant="caption" weight="bold" className="uppercase tracking-wider text-ink-muted">
                    Hasil Live Preview
                  </TextApp>

                  <div className="flex flex-col items-center justify-center p-8 bg-surface rounded-xl border border-hairline-soft min-h-[160px] w-full gap-4">
                    <SearchBarApp
                      id="playground-interactive-searchbar"
                      value={playQuery}
                      onSearchChange={setPlayQuery}
                      variant={playVariant}
                      size={playSize}
                      rounded={playRounded}
                      bgColor={playBgColor}
                      placeholder={playPlaceholder}
                      showClear={playShowClear}
                      showFilter={playShowFilter}
                      filterActive={playFilterActive ? playFilterCount : false}
                      filterLabel={playShowFilter || playVariant === "withFilter" ? "Filter" : undefined}
                      onFilterClick={() => setPlayFilterActive(!playFilterActive)}
                      shortcutKey={playShortcut || undefined}
                      disabled={playDisabled}
                      error={playErrorState ? playErrorMsg : undefined}
                      expanded={playExpanded}
                      onExpandedChange={setPlayExpanded}
                    />

                    {/* Query Result Status Box */}
                    <div className="p-3 bg-surface-soft rounded-lg text-xs font-mono text-ink-secondary w-full flex items-center justify-between">
                      <span>Query Text: <strong className="text-vibrant-purple-dark">{playQuery || "(Kosong)"}</strong></span>
                      <button
                        type="button"
                        onClick={() => setPlayQuery("")}
                        className="text-[10px] text-ink-muted hover:text-rose-500 underline cursor-pointer"
                      >
                        Reset Text
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-vibrant-purple-dark" />
                        <TextApp id="sb-code-h" variant="caption" weight="bold" className="uppercase">
                          Generated Code
                        </TextApp>
                      </div>
                      <ButtonApp
                        id="sb-copy-code"
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
