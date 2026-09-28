import * as React from "react";
import {
  DropdownApp,
  DropdownOption,
  DropdownSize,
  DropdownVariant,
  CardApp,
  BadgeApp,
  TextApp,
  ButtonApp,
} from "@/packages/design-system";
import {
  ListFilter,
  Check,
  Copy,
  Building2,
  UserCheck,
  ShieldCheck,
  CreditCard,
  Layers,
  Sparkles,
  Sliders,
  Tag,
  Search,
} from "lucide-react";

const SAMPLE_TAX_TYPES: DropdownOption[] = [
  { label: "PBB-P2 (Pajak Bumi & Bangunan Perdesaan dan Perkotaan)", value: "pbb", badge: "Utama", icon: Building2, description: "Objek Pajak Tanah & Bangunan" },
  { label: "PBJT Makanan dan/atau Minuman (Restoran)", value: "pbjt_resto", badge: "Resto", icon: CreditCard, description: "Usaha Kuliner & Restoran" },
  { label: "PBJT Tenaga Listrik (PPJ)", value: "pbjt_listrik", icon: CreditCard, description: "Penggunaan Listrik Daerah" },
  { label: "PBJT Jasa Perhotelan", value: "pbjt_hotel", icon: CreditCard, description: "Hotel & Penginapan" },
  { label: "PBJT Jasa Parkir", value: "pbjt_parkir", icon: CreditCard, description: "Penyelenggara Lokasi Parkir" },
  { label: "PBJT Jasa Kesenian dan Hiburan", value: "pbjt_hiburan", icon: CreditCard, description: "Bioskop, Rekreasi, & Konser" },
  { label: "Pajak Reklame", value: "reklame", badge: "Tinggi", icon: Tag, description: "Baliho, Spanduk, & Videotron" },
  { label: "PAT (Pajak Air Tanah)", value: "pat", icon: Layers, description: "Pengambilan Air Tanah" },
];

const SAMPLE_DISTRICTS: DropdownOption[] = [
  { label: "Kecamatan Bandung Wetan", value: "bdg_wetan", badge: "Pusat" },
  { label: "Kecamatan Sumur Bandung", value: "smr_bdg" },
  { label: "Kecamatan Coblong", value: "coblong", badge: "Ramai" },
  { label: "Kecamatan Lengkong", value: "lengkong" },
  { label: "Kecamatan Cicendo", value: "cicendo" },
  { label: "Kecamatan Sukajadi", value: "sukajadi" },
  { label: "Kecamatan Regol", value: "regol" },
  { label: "Kecamatan Cibeunying Kaler", value: "cib_kaler" },
];

const SAMPLE_ROLES: DropdownOption[] = [
  { label: "Administrator Utama (BPKAD)", value: "admin", icon: ShieldCheck, description: "Akses Penuh Semua Fitur Sistem" },
  { label: "Petugas Verifikasi Pajak", value: "verifier", icon: UserCheck, description: "Pemeriksa Berkas SPT & SKPD" },
  { label: "Petugas Lapangan / Pendataan", value: "collector", icon: Building2, description: "Pendata Potensi Baru & Geotagging" },
  { label: "Auditor Internal BPKAD", value: "auditor", icon: Layers, description: "Akses Laporan & Log Transaksi" },
];

export function DropdownDisplayModule() {
  // Playground state
  const [playIsMulti, setPlayIsMulti] = React.useState(false);
  const [playSearchable, setPlaySearchable] = React.useState(true);
  const [playShowClear, setPlayShowClear] = React.useState(true);
  const [playDisabled, setPlayDisabled] = React.useState(false);
  const [playSize, setPlaySize] = React.useState<DropdownSize>("md");
  const [playVariant, setPlayVariant] = React.useState<DropdownVariant>("default");
  const [playLabel, setPlayLabel] = React.useState("Pilih Jenis Pajak Daerah");
  const [playValue, setPlayValue] = React.useState<string | string[]>("pbb");

  // Controlled values for showcase sections
  const [singleVal, setSingleVal] = React.useState<string>("pbb");
  const [multiVal, setMultiVal] = React.useState<string[]>(["pbb", "pbjt_resto", "reklame"]);
  const [iconVal, setIconVal] = React.useState<string>("admin");
  const [searchVal, setSearchVal] = React.useState<string>("bdg_wetan");

  const [copied, setCopied] = React.useState(false);

  const codeSnippet = `<DropdownApp
  id="dropdown-demo"
  label="${playLabel}"
  placeholder="Pilih opsi..."
  options={SAMPLE_OPTIONS}
  value={${JSON.stringify(playValue)}}
  onChange={(val) => setValue(val)}
  isMulti={${playIsMulti}}
  searchable={${playSearchable}}
  showClear={${playShowClear}}
  disabled={${playDisabled}}
  size="${playSize}"
  variant="${playVariant}"
/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6" id="uikit-dropdown-module">
      {/* Header Overview Card */}
      <CardApp id="dropdown-overview" variant="neutral" size="md" rounded="card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BadgeApp id="dd-badge-forms" variant="solidPurple" size="sm">
                03 - Forms &amp; Inputs
              </BadgeApp>
              <BadgeApp id="dd-badge-atom" variant="vibrantPurple" size="sm">
                DropdownApp Molecule
              </BadgeApp>
            </div>
            <TextApp id="dd-title" variant="h3" weight="bold">
              Dropdown &amp; Select (`DropdownApp`)
            </TextApp>
            <TextApp id="dd-sub" variant="body" color="secondary">
              Komponen pemilih item tunggal (*Single Select*) dan multi (*Multi Select*) yang fleksibel dengan pencarian terintegrasi,
              tag `BadgeApp` interaktif, dukungan icon &amp; deskripsi opsional, indikator status, serta navigasi keyboard lengkap.
            </TextApp>
          </div>
        </div>
      </CardApp>

      {/* MAIN UNIFIED CARD SHOWCASE CONTAINER */}
      <CardApp id="dropdown-main-unified-card" variant="neutral" size="lg" rounded="card">
        <div className="space-y-8">
          
          {/* Sub-Section 1: Dropdown Modes (Single, Multi, With Icon & Description) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <ListFilter className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="dd-sub-1-h" variant="h4" weight="bold">
                  1. Core Dropdown Modes (Single, Multi-Select &amp; Rich Items)
                </TextApp>
              </div>
              <BadgeApp id="dd-b-sub-1" variant="solidPurple" size="sm">
                3 Modes
              </BadgeApp>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Mode A: Single Select */}
              <div className="relative focus-within:z-30 p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-ink block mb-1">Mode 1: Single Select</span>
                  <p className="text-xs text-ink-muted">Pemilihan 1 opsi utama dengan pencarian &amp; tombol hapus 'X'.</p>
                </div>
                <div className="pt-2">
                  <DropdownApp
                    id="dp-single-mode"
                    label="Jenis Pajak Utama"
                    placeholder="Pilih jenis pajak..."
                    options={SAMPLE_TAX_TYPES}
                    value={singleVal}
                    onChange={(val) => setSingleVal(val as string)}
                    searchable
                    showClear
                  />
                </div>
                <div className="text-[11px] text-ink-muted pt-1 border-t border-hairline-soft">
                  Terpilih: <span className="font-semibold text-vibrant-purple-dark">{singleVal || "Belum ada"}</span>
                </div>
              </div>

              {/* Mode B: Multi Select */}
              <div className="relative focus-within:z-30 p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-ink block mb-1">Mode 2: Multi Select (`isMulti`)</span>
                  <p className="text-xs text-ink-muted">Pemilihan banyak opsi dengan tag `BadgeApp` &amp; tombol hapus cepat.</p>
                </div>
                <div className="pt-2">
                  <DropdownApp
                    id="dp-multi-mode"
                    label="Kategori Pajak Terpilih"
                    placeholder="Pilih satu atau lebih..."
                    options={SAMPLE_TAX_TYPES}
                    value={multiVal}
                    onChange={(val) => setMultiVal(val as string[])}
                    isMulti
                    searchable
                    showClear
                  />
                </div>
                <div className="text-[11px] text-ink-muted pt-1 border-t border-hairline-soft">
                  Jumlah Tag: <span className="font-semibold text-vibrant-purple-dark">{multiVal.length} Opsi</span>
                </div>
              </div>

              {/* Mode C: With Icon & Description */}
              <div className="relative focus-within:z-30 p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-ink block mb-1">Mode 3: With Icon &amp; Sub-label</span>
                  <p className="text-xs text-ink-muted">Opsi kaya visual dengan icon di kiri &amp; deskripsi tambahan.</p>
                </div>
                <div className="pt-2">
                  <DropdownApp
                    id="dp-icon-mode"
                    label="Hak Akses Petugas"
                    placeholder="Pilih peranan..."
                    options={SAMPLE_ROLES}
                    value={iconVal}
                    onChange={(val) => setIconVal(val as string)}
                    showClear
                  />
                </div>
                <div className="text-[11px] text-ink-muted pt-1 border-t border-hairline-soft">
                  Role: <span className="font-semibold text-vibrant-purple-dark">{iconVal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Section 2: Searchable Filter & Creatable Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="dd-sub-2-h" variant="h4" weight="bold">
                  2. Searchable Filter, Highlighted Match &amp; Creatable Option (`isCreatable`)
                </TextApp>
              </div>
              <BadgeApp id="dd-b-sub-2" variant="solidPurple" size="sm">
                Real-time &amp; Creatable
              </BadgeApp>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Filter Kecamatan */}
              <div className="relative focus-within:z-30 p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
                <span className="text-xs font-bold text-ink block">Filter Real-time &amp; Highlighted Match</span>
                <p className="text-xs text-ink-muted">Teks yang cocok di-highlight secara otomatis saat mengetik di kolom cari.</p>
                <DropdownApp
                  id="dp-searchable-districts"
                  label="Pilih Kecamatan"
                  placeholder="Ketik untuk mencari kecamatan..."
                  options={SAMPLE_DISTRICTS}
                  value={searchVal}
                  onChange={(val) => setSearchVal(val as string)}
                  searchable
                  showClear
                  searchPlaceholder="Cari nama kecamatan..."
                />
              </div>

              {/* Tag / Chip Style (BadgeApp vs ChipsApp) */}
              <div className="relative focus-within:z-30 p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
                <span className="text-xs font-bold text-ink block">Multi-Select Tag Style (`tagType="chip"`)</span>
                <p className="text-xs text-ink-muted">Menggunakan komponen atom `ChipsApp` interaktif dengan tombol hapus `onDelete`.</p>
                <DropdownApp
                  id="dp-chip-tags-demo"
                  label="Tag Pajak (`tagType='chip'`)"
                  placeholder="Pilih tag..."
                  options={SAMPLE_TAX_TYPES}
                  defaultValue={["pbb", "pbjt_resto"]}
                  isMulti
                  tagType="chip"
                  searchable
                  showClear
                />
              </div>

              {/* Creatable Option */}
              <div className="relative focus-within:z-30 p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
                <span className="text-xs font-bold text-ink block">Opsi Baru On-the-fly (`isCreatable`)</span>
                <p className="text-xs text-ink-muted">Ketik kata kunci baru dan klik "+ Tambah" atau tekan Enter untuk membuat opsi.</p>
                <DropdownApp
                  id="dp-creatable-demo"
                  label="Tambah Kategori Pajak Baru"
                  placeholder="Ketik nama kategori baru..."
                  options={SAMPLE_TAX_TYPES}
                  isMulti
                  searchable
                  isCreatable
                  showClear
                  searchPlaceholder="Cari atau ketik opsi baru..."
                />
              </div>
            </div>
          </div>

          {/* Sub-Section 3: Sizes & Validation Variants */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="dd-sub-3-h" variant="h4" weight="bold">
                  3. Sizes &amp; Validation Variants
                </TextApp>
              </div>
              <BadgeApp id="dd-b-sub-3" variant="solidPurple" size="sm">
                Foundation Standard
              </BadgeApp>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Default State */}
              <div className="relative focus-within:z-30 p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
                <span className="text-xs font-bold text-ink block">Size Small (`sm`)</span>
                <DropdownApp
                  id="dp-sz-sm"
                  size="sm"
                  placeholder="Size SM..."
                  options={SAMPLE_DISTRICTS}
                  defaultValue="bdg_wetan"
                />
              </div>

              {/* Success State */}
              <div className="relative focus-within:z-30 p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
                <span className="text-xs font-bold text-ink block">Variant Success</span>
                <DropdownApp
                  id="dp-st-success"
                  variant="success"
                  helperText="Data pajak valid"
                  options={SAMPLE_TAX_TYPES}
                  defaultValue="pbb"
                />
              </div>

              {/* Error State */}
              <div className="relative focus-within:z-30 p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
                <span className="text-xs font-bold text-ink block">Variant Error</span>
                <DropdownApp
                  id="dp-st-error"
                  variant="error"
                  helperText="Wajib memilih jenis pajak"
                  options={SAMPLE_TAX_TYPES}
                />
              </div>

              {/* Disabled State */}
              <div className="relative focus-within:z-30 p-4 bg-surface rounded-xl border border-hairline-soft space-y-2">
                <span className="text-xs font-bold text-ink block">State Disabled</span>
                <DropdownApp
                  id="dp-st-disabled"
                  disabled
                  helperText="Formulir terkunci"
                  options={SAMPLE_TAX_TYPES}
                  defaultValue="pbb"
                />
              </div>
            </div>
          </div>

          {/* Sub-Section 4: Interactive Live Playground */}
          <div className="space-y-4 pt-4 border-t border-hairline-soft">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-vibrant-purple-dark" />
                <TextApp id="dd-sub-4-h" variant="h4" weight="bold">
                  4. Interactive Live Playground
                </TextApp>
              </div>
              <BadgeApp id="dd-b-sub-4" variant="vibrantPurple" size="sm">
                Live Tester
              </BadgeApp>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Control Panel Toggles */}
              <div className="lg:col-span-5 p-4 bg-surface-soft/80 rounded-2xl border border-hairline-soft space-y-4">
                <TextApp id="dd-pg-ctrl-head" variant="h5" weight="bold">
                  Konfigurasi Props
                </TextApp>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-ink block mb-1">Teks Label</label>
                    <input
                      type="text"
                      value={playLabel}
                      onChange={(e) => setPlayLabel(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-surface border border-hairline rounded-lg text-ink"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-ink block mb-1">Ukuran (`size`)</label>
                      <select
                        value={playSize}
                        onChange={(e) => setPlaySize(e.target.value as DropdownSize)}
                        className="w-full px-2 py-1.5 text-xs bg-surface border border-hairline rounded-lg text-ink"
                      >
                        <option value="sm">sm (32px)</option>
                        <option value="md">md (40px)</option>
                        <option value="lg">lg (48px)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-ink block mb-1">Status (`variant`)</label>
                      <select
                        value={playVariant}
                        onChange={(e) => setPlayVariant(e.target.value as DropdownVariant)}
                        className="w-full px-2 py-1.5 text-xs bg-surface border border-hairline rounded-lg text-ink"
                      >
                        <option value="default">default</option>
                        <option value="error">error</option>
                        <option value="success">success</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <label className="flex items-center gap-2 text-xs font-medium text-ink cursor-pointer">
                      <input
                        type="checkbox"
                        checked={playIsMulti}
                        onChange={(e) => {
                          setPlayIsMulti(e.target.checked);
                          setPlayValue(e.target.checked ? ["pbb"] : "pbb");
                        }}
                        className="rounded border-hairline text-vibrant-purple focus:ring-vibrant-purple"
                      />
                      Multi Select (`isMulti`)
                    </label>

                    <label className="flex items-center gap-2 text-xs font-medium text-ink cursor-pointer">
                      <input
                        type="checkbox"
                        checked={playSearchable}
                        onChange={(e) => setPlaySearchable(e.target.checked)}
                        className="rounded border-hairline text-vibrant-purple focus:ring-vibrant-purple"
                      />
                      Searchable Input
                    </label>

                    <label className="flex items-center gap-2 text-xs font-medium text-ink cursor-pointer">
                      <input
                        type="checkbox"
                        checked={playShowClear}
                        onChange={(e) => setPlayShowClear(e.target.checked)}
                        className="rounded border-hairline text-vibrant-purple focus:ring-vibrant-purple"
                      />
                      Clear Button 'X'
                    </label>

                    <label className="flex items-center gap-2 text-xs font-medium text-ink cursor-pointer">
                      <input
                        type="checkbox"
                        checked={playDisabled}
                        onChange={(e) => setPlayDisabled(e.target.checked)}
                        className="rounded border-hairline text-vibrant-purple focus:ring-vibrant-purple"
                      />
                      Disabled State
                    </label>
                  </div>
                </div>
              </div>

              {/* Preview Canvas & Generated Code */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative focus-within:z-30 p-6 bg-surface rounded-2xl border border-hairline-soft shadow-xs space-y-4 min-h-[160px] flex flex-col justify-center">
                  <span className="text-xs font-bold text-ink-muted uppercase tracking-wider block">
                    Live Component Preview
                  </span>
                  <DropdownApp
                    id="dp-playground-component"
                    label={playLabel}
                    placeholder="Pilih opsi..."
                    options={SAMPLE_TAX_TYPES}
                    value={playValue}
                    onChange={(val) => setPlayValue(val)}
                    isMulti={playIsMulti}
                    searchable={playSearchable}
                    showClear={playShowClear}
                    disabled={playDisabled}
                    size={playSize}
                    variant={playVariant}
                  />
                </div>

                {/* Code Snippet */}
                <div className="relative bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs overflow-x-auto border border-slate-800">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                    <span className="text-[11px] text-slate-400">JSX Code Snippet</span>
                    <ButtonApp
                      id="btn-copy-dd-code"
                      variant="ghost"
                      size="sm"
                      onClick={copyCode}
                      className="h-6 px-2 text-[10px] text-slate-300 hover:text-white hover:bg-slate-800"
                    >
                      {copied ? (
                        <span className="flex items-center gap-1 text-emerald-400">
                          <Check className="w-3 h-3" /> Copied!
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy className="w-3 h-3" /> Copy Code
                        </span>
                      )}
                    </ButtonApp>
                  </div>
                  <pre className="text-purple-300 leading-relaxed">{codeSnippet}</pre>
                </div>
              </div>
            </div>
          </div>

        </div>
      </CardApp>
    </div>
  );
}
