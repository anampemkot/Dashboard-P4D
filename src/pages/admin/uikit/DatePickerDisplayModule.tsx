import * as React from "react";
import {
  DatePickerApp,
  CardApp,
  TextApp,
  BadgeApp,
  ButtonApp,
  SelectApp,
  InputApp,
  CheckboxApp,
  DatePickerMode,
  DatePickerSize,
  DatePickerFormat,
  DateRangeValue,
} from "@/packages/design-system";
import {
  Calendar,
  Sparkles,
  Code,
  Check,
  AlertTriangle,
  Clock,
  Layers,
  Sliders,
  Filter,
  FileText,
  CheckCircle2,
} from "lucide-react";

export function DatePickerDisplayModule() {
  // Playground state
  const [playMode, setPlayMode] = React.useState<DatePickerMode>("single");
  const [playSingleDate, setPlaySingleDate] = React.useState<Date | null>(new Date());
  const [playRangeDate, setPlayRangeDate] = React.useState<DateRangeValue>({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
  });
  const [playFormat, setPlayFormat] = React.useState<DatePickerFormat>("DD/MM/YYYY");
  const [playSize, setPlaySize] = React.useState<DatePickerSize>("md");
  const [playShowPresets, setPlayShowPresets] = React.useState(true);
  const [playShowActions, setPlayShowActions] = React.useState(true);
  const [playDisabled, setPlayDisabled] = React.useState(false);
  const [playErrorState, setPlayErrorState] = React.useState(false);
  const [playErrorMsg, setPlayErrorMsg] = React.useState("Tanggal jatuh tempo tidak boleh sebelum periode berjalan.");

  const [copied, setCopied] = React.useState(false);

  // Demo standalone states
  const [singleDemo, setSingleDemo] = React.useState<Date | null>(new Date("2026-08-17"));
  const [rangeDemo, setRangeDemo] = React.useState<DateRangeValue>({
    startDate: new Date("2026-08-01"),
    endDate: new Date("2026-08-31"),
  });
  const [monthYearDemo, setMonthYearDemo] = React.useState<Date | null>(new Date("2026-08-01"));

  // Generate code snippet string
  const modeStr = playMode !== "single" ? `\n  mode="${playMode}"` : "";
  const formatStr = playFormat !== "DD/MM/YYYY" ? `\n  format="${playFormat}"` : "";
  const sizeStr = playSize !== "md" ? `\n  size="${playSize}"` : "";
  const presetsStr = !playShowPresets ? `\n  showPresets={false}` : "";
  const actionsStr = !playShowActions ? `\n  showActions={false}` : "";
  const disabledStr = playDisabled ? `\n  disabled` : "";
  const errorStr = playErrorState ? `\n  error="${playErrorMsg}"` : "";

  const valueBindingStr =
    playMode === "range"
      ? `\n  rangeValue={dateRange}\n  onRangeChange={(range) => setDateRange(range)}`
      : `\n  value={selectedDate}\n  onChange={(date) => setSelectedDate(date)}`;

  const codeSnippet = `<DatePickerApp
  id="tax-period-picker"${modeStr}${formatStr}${sizeStr}${valueBindingStr}${presetsStr}${actionsStr}${errorStr}${disabledStr}
/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6" id="uikit-datepicker-module">
      {/* Header Overview */}
      <CardApp id="datepicker-overview" variant="neutral" size="md" rounded="card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BadgeApp id="dp-badge-forms" variant="solidPurple" size="sm">
                03 - Forms &amp; Inputs
              </BadgeApp>
              <BadgeApp id="dp-badge-atom" variant="vibrantPurple" size="sm">
                DatePickerApp Molecule
              </BadgeApp>
            </div>
            <TextApp id="dp-title" variant="h3" weight="bold">
              Date &amp; Range Picker (`DatePickerApp`)
            </TextApp>
            <TextApp id="dp-sub" variant="body" color="secondary">
              Pemilih tanggal dan periode masa pajak responsif dengan dukungan **Single Date**, **Date Range**, dan **Month/Year**.
              Dilengkapi kalender interaktif dengan navigasi bulan/tahun, penanda tanggal hari ini, min/max boundary, tombol aksi
              (Terapkan &amp; Batal), preset rentang cepat, serta status validasi (Error/Disabled).
            </TextApp>
          </div>
        </div>
      </CardApp>

      {/* MAIN UNIFIED CARD CONTAINER */}
      <CardApp id="datepicker-main-unified-card" variant="neutral" size="lg" rounded="card">
        <div className="space-y-8">
          
          {/* Sub-Section 1: Selection Modes (Single, Date Range, Month/Year) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="dp-sub-1-h" variant="h4" weight="bold">
                  1. Selection Modes (Single Date, Date Range, Month/Year)
                </TextApp>
              </div>
              <BadgeApp id="dp-b-sub-1" variant="solidPurple" size="sm">3 Modes</BadgeApp>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Mode A: Single Date */}
              <div className="relative focus-within:z-30 p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-ink block mb-1">Mode 1: Single Date</span>
                  <p className="text-xs text-ink-muted">Pemilih tanggal tunggal untuk penetapan SPT, SKPD, atau batas pembayaran.</p>
                </div>
                <div className="pt-2">
                  <DatePickerApp
                    id="dp-demo-single"
                    mode="single"
                    value={singleDemo}
                    onChange={setSingleDemo}
                    placeholder="Pilih tanggal penetapan..."
                  />
                </div>
              </div>

              {/* Mode B: Date Range */}
              <div className="relative focus-within:z-30 p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-ink block mb-1">Mode 2: Date Range (Start &amp; End)</span>
                  <p className="text-xs text-ink-muted">Pemilih rentang periode laporan keuangan dengan preset tombol cepat.</p>
                </div>
                <div className="pt-2">
                  <DatePickerApp
                    id="dp-demo-range"
                    mode="range"
                    rangeValue={rangeDemo}
                    onRangeChange={setRangeDemo}
                    placeholder="Pilih periode laporan..."
                  />
                </div>
              </div>

              {/* Mode C: Month / Year */}
              <div className="relative focus-within:z-30 p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-ink block mb-1">Mode 3: Month &amp; Year Picker</span>
                  <p className="text-xs text-ink-muted">Pemilih khusus masa pajak bulanan (misal: "Agustus 2026").</p>
                </div>
                <div className="pt-2">
                  <DatePickerApp
                    id="dp-demo-my"
                    mode="monthYear"
                    value={monthYearDemo}
                    onChange={setMonthYearDemo}
                    placeholder="Pilih masa pajak bulanan..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Section 2: Component States (Default, Active, Disabled, Error) */}
          <div className="space-y-4 pt-4 border-t border-hairline-soft">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="dp-sub-2-h" variant="h4" weight="bold">
                  2. Component States &amp; Validation
                </TextApp>
              </div>
              <BadgeApp id="dp-b-sub-2" variant="vibrantPurple" size="sm">4 States</BadgeApp>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Default State */}
              <div className="relative focus-within:z-30 p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
                <span className="text-xs font-bold text-ink block">State 1: Default Empty</span>
                <DatePickerApp
                  id="dp-st-default"
                  placeholder="Ketik atau klik untuk memilih tanggal..."
                  helperText="Format tanggal otomatis disesuaikan dengan aturan BPKAD."
                />
              </div>

              {/* Selected Value State */}
              <div className="relative focus-within:z-30 p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
                <span className="text-xs font-bold text-ink block">State 2: Selected Value &amp; Format Custom</span>
                <DatePickerApp
                  id="dp-st-filled"
                  defaultValue={new Date("2026-08-17")}
                  format="DD MMMM YYYY"
                  helperText="Format tanggal Indonesia: DD MMMM YYYY"
                />
              </div>

              {/* Disabled State */}
              <div className="relative focus-within:z-30 p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
                <span className="text-xs font-bold text-ink block">State 3: Disabled</span>
                <DatePickerApp
                  id="dp-st-disabled"
                  disabled
                  defaultValue={new Date()}
                  helperText="Tanggal dikunci untuk transaksi yang telah dibukukan."
                />
              </div>

              {/* Error State */}
              <div className="relative focus-within:z-30 p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
                <span className="text-xs font-bold text-ink block">State 4: Error Validation</span>
                <DatePickerApp
                  id="dp-st-error"
                  defaultValue={new Date("2025-01-01")}
                  error="Tanggal yang dipilih berada di luar tahun anggaran aktif 2026."
                />
              </div>
            </div>
          </div>

          {/* Sub-Section 3: Formatting Options & Sizes */}
          <div className="space-y-4 pt-4 border-t border-hairline-soft">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="dp-sub-3-h" variant="h4" weight="bold">
                  3. Display Formats &amp; Input Sizes
                </TextApp>
              </div>
              <BadgeApp id="dp-b-sub-3" variant="solidPurple" size="sm">Formats &amp; Sizes</BadgeApp>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-surface rounded-xl border border-hairline-soft">
              {/* Formats Showcase */}
              <div className="space-y-3">
                <TextApp id="dp-fmt-h" variant="caption" weight="bold" className="uppercase text-ink-muted">
                  Supported Date Formats
                </TextApp>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-medium text-ink block mb-1">Standard: DD/MM/YYYY</span>
                    <DatePickerApp id="dp-fmt-1" format="DD/MM/YYYY" defaultValue={new Date("2026-08-17")} />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-ink block mb-1">ISO Format: YYYY-MM-DD</span>
                    <DatePickerApp id="dp-fmt-2" format="YYYY-MM-DD" defaultValue={new Date("2026-08-17")} />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-ink block mb-1">Long Format: DD MMMM YYYY</span>
                    <DatePickerApp id="dp-fmt-3" format="DD MMMM YYYY" defaultValue={new Date("2026-08-17")} />
                  </div>
                </div>
              </div>

              {/* Sizes Showcase */}
              <div className="space-y-3">
                <TextApp id="dp-sz-h" variant="caption" weight="bold" className="uppercase text-ink-muted">
                  Input Sizes (sm, md, lg)
                </TextApp>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-medium text-ink block mb-1">Small (sm - 34px)</span>
                    <DatePickerApp id="dp-sz-sm" size="sm" defaultValue={new Date()} />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-ink block mb-1">Medium (md - 40px)</span>
                    <DatePickerApp id="dp-sz-md" size="md" defaultValue={new Date()} />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-ink block mb-1">Large (lg - 48px)</span>
                    <DatePickerApp id="dp-sz-lg" size="lg" defaultValue={new Date()} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Section 4: Interactive Playground & Code Generator */}
          <div className="space-y-4 pt-4 border-t border-hairline-soft">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="dp-sub-4-h" variant="h4" weight="bold">
                  4. Interactive Date Picker Playground
                </TextApp>
              </div>
              <BadgeApp id="dp-b-sub-4" variant="solidPurple" size="sm">Live Sandbox</BadgeApp>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls Form */}
              <div className="lg:col-span-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {/* Mode */}
                  <div>
                    <label className="text-xs font-semibold text-ink mb-1 block">Selection Mode</label>
                    <SelectApp
                      id="dp-play-mode"
                      value={playMode}
                      onChange={(e) => setPlayMode(e.target.value as DatePickerMode)}
                      options={[
                        { value: "single", label: "Single Date" },
                        { value: "range", label: "Date Range" },
                        { value: "monthYear", label: "Month / Year" },
                      ]}
                    />
                  </div>

                  {/* Format */}
                  <div>
                    <label className="text-xs font-semibold text-ink mb-1 block">Display Format</label>
                    <SelectApp
                      id="dp-play-fmt"
                      value={playFormat}
                      onChange={(e) => setPlayFormat(e.target.value as DatePickerFormat)}
                      options={[
                        { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
                        { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
                        { value: "DD MMMM YYYY", label: "DD MMMM YYYY" },
                        { value: "MM/YYYY", label: "MM/YYYY" },
                      ]}
                    />
                  </div>
                </div>

                {/* Size */}
                <div>
                  <label className="text-xs font-semibold text-ink mb-1 block">Input Size Metric</label>
                  <SelectApp
                    id="dp-play-size"
                    value={playSize}
                    onChange={(e) => setPlaySize(e.target.value as DatePickerSize)}
                    options={[
                      { value: "sm", label: "Small (sm)" },
                      { value: "md", label: "Medium (md)" },
                      { value: "lg", label: "Large (lg)" },
                    ]}
                  />
                </div>

                {/* Toggles */}
                <div className="p-3 bg-surface-soft/60 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-ink font-medium">Quick Presets Sidebar</span>
                    <CheckboxApp
                      id="dp-chk-preset"
                      checked={playShowPresets}
                      onChange={(e) => setPlayShowPresets(e.target.checked)}
                      label="Show Presets"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-ink font-medium">Action Buttons (Apply/Cancel)</span>
                    <CheckboxApp
                      id="dp-chk-act"
                      checked={playShowActions}
                      onChange={(e) => setPlayShowActions(e.target.checked)}
                      label="Show Actions"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-hairline-soft">
                    <span className="text-xs text-ink font-medium">Error Validation State</span>
                    <CheckboxApp
                      id="dp-chk-err"
                      checked={playErrorState}
                      onChange={(e) => setPlayErrorState(e.target.checked)}
                      label="Error State"
                    />
                  </div>

                  {playErrorState && (
                    <InputApp
                      id="dp-play-errmsg"
                      value={playErrorMsg}
                      onChange={(e) => setPlayErrorMsg(e.target.value)}
                      placeholder="Pesan error..."
                      className="text-xs mt-1"
                    />
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-ink font-medium">Disabled State</span>
                    <CheckboxApp
                      id="dp-chk-dis"
                      checked={playDisabled}
                      onChange={(e) => setPlayDisabled(e.target.checked)}
                      label="Disabled"
                    />
                  </div>
                </div>
              </div>

              {/* Live Preview & Generated Code */}
              <div className="lg:col-span-7 flex flex-col justify-between bg-surface-soft/60 p-6 rounded-2xl border border-hairline-soft">
                <div className="space-y-6">
                  <TextApp id="dp-prev-h" variant="caption" weight="bold" className="uppercase tracking-wider text-ink-muted">
                    Hasil Live Preview
                  </TextApp>

                  <div className="flex flex-col items-center justify-center p-8 bg-surface rounded-xl border border-hairline-soft min-h-[160px] w-full gap-4">
                    <DatePickerApp
                      id="playground-interactive-datepicker"
                      mode={playMode}
                      value={playSingleDate}
                      onChange={setPlaySingleDate}
                      rangeValue={playRangeDate}
                      onRangeChange={setPlayRangeDate}
                      format={playFormat}
                      size={playSize}
                      showPresets={playShowPresets}
                      showActions={playShowActions}
                      disabled={playDisabled}
                      error={playErrorState ? playErrorMsg : undefined}
                      label="Masa / Tanggal Laporan Tax Dashboard"
                    />

                    {/* Query Result Status Box */}
                    <div className="p-3 bg-surface-soft rounded-lg text-xs font-mono text-ink-secondary w-full flex items-center justify-between">
                      <span>
                        Selected Value:{" "}
                        <strong className="text-vibrant-purple-dark">
                          {playMode === "range"
                            ? `${playRangeDate.startDate ? playRangeDate.startDate.toLocaleDateString("id-ID") : "-"} s/d ${playRangeDate.endDate ? playRangeDate.endDate.toLocaleDateString("id-ID") : "-"}`
                            : playSingleDate
                            ? playSingleDate.toLocaleDateString("id-ID")
                            : "Belum dipilih"}
                        </strong>
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-vibrant-purple-dark" />
                        <TextApp id="dp-code-h" variant="caption" weight="bold" className="uppercase">
                          Generated Code
                        </TextApp>
                      </div>
                      <ButtonApp
                        id="dp-copy-code"
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
