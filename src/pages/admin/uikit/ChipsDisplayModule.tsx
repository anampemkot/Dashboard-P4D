import * as React from "react";
import {
  ChipsApp,
  CardApp,
  TextApp,
  BadgeApp,
  ButtonApp,
  SelectApp,
  InputApp,
  ChipType,
  ChipVariant,
  ChipSize,
  ChipRounded,
} from "@/packages/design-system";
import {
  Tag,
  Sparkles,
  Code,
  Check,
  X,
  Filter,
  User,
  Star,
  CheckCircle2,
  Calendar,
  Layers,
  Circle,
  Square,
  Maximize2,
  Plus,
  RotateCcw,
} from "lucide-react";
import { ModuleCard } from "./ModuleCard";

export function ChipsDisplayModule() {
  // Demo 1: Input Chips (Filter tags state)
  const [inputTags, setInputTags] = React.useState<string[]>([
    "PBB-P2 2026",
    "Kecamatan Danurejan",
    "Lunas Pajak",
    "Sudah Diverifikasi",
  ]);
  const [newTagText, setNewTagText] = React.useState("");

  // Demo 2: Choice Chips (Single & Multi selection)
  const [singleChoice, setSingleChoice] = React.useState<string>("Semua Pajak");
  const [multiChoices, setMultiChoices] = React.useState<string[]>(["Hotel", "Restoran"]);

  // Playground state
  const [playLabel, setPlayLabel] = React.useState("Danurejan");
  const [playType, setPlayType] = React.useState<ChipType>("choice");
  const [playVariant, setPlayVariant] = React.useState<ChipVariant>("vibrant");
  const [playSize, setPlaySize] = React.useState<ChipSize>("md");
  const [playRounded, setPlayRounded] = React.useState<ChipRounded>("pill");
  const [playSelected, setPlaySelected] = React.useState(true);
  const [playRemovable, setPlayRemovable] = React.useState(false);
  const [playLeadingOption, setPlayLeadingOption] = React.useState<"none" | "icon" | "avatar">("icon");
  const [copied, setCopied] = React.useState(false);

  const handleAddTag = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newTagText.trim()) return;
    if (!inputTags.includes(newTagText.trim())) {
      setInputTags([...inputTags, newTagText.trim()]);
    }
    setNewTagText("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setInputTags(inputTags.filter((t) => t !== tagToRemove));
  };

  const toggleMultiChoice = (val: string) => {
    if (multiChoices.includes(val)) {
      setMultiChoices(multiChoices.filter((item) => item !== val));
    } else {
      setMultiChoices([...multiChoices, val]);
    }
  };

  const codeSnippet = `<ChipsApp
  id="my-chip"
  chipType="${playType}" // input | choice | action
  variant="${playVariant}"
  size="${playSize}"
  rounded="${playRounded}" // Foundation: pill | card | circle | square
  selected={${playSelected}}${playRemovable ? `\n  removable\n  onRemove={() => handleRemove()}` : ""}${
    playLeadingOption === "avatar"
      ? `\n  avatar={<img src="https://..." alt="Avatar" />}`
      : playLeadingOption === "icon"
      ? `\n  icon={<Tag />}`
      : ""
  }
>
  ${playLabel}
</ChipsApp>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8" id="uikit-chips-module">
      {/* Overview Card */}
      <CardApp id="chips-overview" variant="neutral" size="md" rounded="card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BadgeApp id="chips-badge-core" variant="solidPurple" size="sm">
                02 - Core UI
              </BadgeApp>
              <BadgeApp id="chips-badge-atom" variant="vibrantPurple" size="sm">
                Interactive Chip
              </BadgeApp>
            </div>
            <TextApp id="chips-title" variant="h3" weight="bold">
              Chips / Tags (`ChipsApp`)
            </TextApp>
            <TextApp id="chips-sub" variant="body" color="secondary">
              Komponen tag interaktif dengan tiga tipe utama (**Input Chip**, **Choice Chip**, **Action Chip**), 
              dukungan **Foundation Container Radius** (Pill, Card, Circle, Square), **Leading Icon/Avatar**, 
              **Trailing Icon (Remove &apos;X&apos;)**, status **Selected / Unselected**, serta varian **Background Color**.
            </TextApp>
          </div>
        </div>
      </CardApp>

      {/* 1. Chip Types Showcase (Input Chip, Choice Chip, Action Chip) */}
      <ModuleCard
        id="chips-types-module"
        icon={<Tag className="w-5 h-5 text-vibrant-purple-dark" />}
        title="1. Chip Types (Input Chip, Choice Chip, Action Chip)"
        description="Tiga ragam tipe chip menurut tujuan penggunaannya dalam antarmuka BPKAD."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Input Chip */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                  <X className="w-3.5 h-3.5 text-rose-500" />
                  Input Chip
                </span>
                <BadgeApp id="b-type-input" variant="neutral" size="sm">
                  Removable
                </BadgeApp>
              </div>
              <p className="text-xs text-ink-muted mb-3">
                Tag dinamis dari hasil pencarian atau masukan pengguna yang dapat dihapus dengan menekan tombol &apos;X&apos;.
              </p>
              <div className="flex flex-wrap gap-2">
                <ChipsApp
                  id="demo-input-1"
                  chipType="input"
                  variant="vibrant"
                  onRemove={() => alert("Tag Dihapus")}
                >
                  Yogyakarta
                </ChipsApp>
                <ChipsApp
                  id="demo-input-2"
                  chipType="input"
                  variant="neutral"
                  icon={<Calendar className="w-3.5 h-3.5" />}
                  onRemove={() => alert("Tag Dihapus")}
                >
                  Tahun 2026
                </ChipsApp>
              </div>
            </div>
          </div>

          {/* Choice Chip */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-vibrant-purple-dark" />
                  Choice Chip
                </span>
                <BadgeApp id="b-type-choice" variant="solidPurple" size="sm">
                  Selectable
                </BadgeApp>
              </div>
              <p className="text-xs text-ink-muted mb-3">
                Chip seleksi opsi tunggal atau banyak yang berubah gaya saat status `selected` aktif.
              </p>
              <div className="flex flex-wrap gap-2">
                <ChipsApp
                  id="demo-choice-1"
                  chipType="choice"
                  variant="vibrant"
                  selected
                >
                  Dipilih
                </ChipsApp>
                <ChipsApp
                  id="demo-choice-2"
                  chipType="choice"
                  variant="vibrant"
                  selected={false}
                >
                  Belum Dipilih
                </ChipsApp>
              </div>
            </div>
          </div>

          {/* Action Chip */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-emerald-600" />
                  Action Chip
                </span>
                <BadgeApp id="b-type-action" variant="neutral" size="sm">
                  Clickable
                </BadgeApp>
              </div>
              <p className="text-xs text-ink-muted mb-3">
                Tombol tindakan cepat untuk memicu perintah, seperti filter popover, tambah item, atau reset.
              </p>
              <div className="flex flex-wrap gap-2">
                <ChipsApp
                  id="demo-action-1"
                  chipType="action"
                  variant="neutral"
                  icon={<Filter className="w-3.5 h-3.5 text-vibrant-purple-dark" />}
                  onClick={() => alert("Filter Ditekan")}
                >
                  Filter Wilayah
                </ChipsApp>
                <ChipsApp
                  id="demo-action-2"
                  chipType="action"
                  variant="vibrant"
                  icon={<Plus className="w-3.5 h-3.5" />}
                  onClick={() => alert("Tambah Ditekan")}
                >
                  Tambah Kriteria
                </ChipsApp>
              </div>
            </div>
          </div>
        </div>
      </ModuleCard>

      {/* 2. Interactive Input Chips (Tag Removal & Dynamic Addition) */}
      <ModuleCard
        id="chips-interactive-input-module"
        icon={<X className="w-5 h-5 text-vibrant-purple-dark" />}
        title="2. Interactive Input Chips (Penambahan & Penghapusan Tag Dinamis)"
        description="Demo interaktif menghapus tag filter satu per satu menggunakan ikon 'X' atau menambah tag filter baru."
      >
        <div className="p-5 bg-surface rounded-xl border border-hairline-soft space-y-4">
          <form onSubmit={handleAddTag} className="flex items-center gap-2 max-w-md">
            <InputApp
              id="input-chip-new"
              placeholder="Ketik tag filter baru..."
              value={newTagText}
              onChange={(e) => setNewTagText(e.target.value)}
            />
            <ButtonApp id="btn-add-chip" variant="primary" size="md" type="submit" className="shrink-0 gap-1">
              <Plus className="w-4 h-4" /> Tambah
            </ButtonApp>
          </form>

          <div className="p-4 bg-surface-soft/60 rounded-xl border border-hairline-soft space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink">
                Daftar Filter Aktif ({inputTags.length})
              </span>
              {inputTags.length < 4 && (
                <button
                  type="button"
                  onClick={() => setInputTags(["PBB-P2 2026", "Kecamatan Danurejan", "Lunas Pajak", "Sudah Diverifikasi"])}
                  className="text-xs font-semibold text-vibrant-purple-dark hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Filter Sample
                </button>
              )}
            </div>

            {inputTags.length === 0 ? (
              <p className="text-xs text-ink-muted italic py-2">
                Tidak ada filter aktif. Ketik di atas untuk menambahkan tag baru.
              </p>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                {inputTags.map((tag, idx) => (
                  <ChipsApp
                    key={tag}
                    id={`input-chip-${idx}`}
                    chipType="input"
                    variant={idx % 2 === 0 ? "vibrant" : "neutral"}
                    size="md"
                    onRemove={() => handleRemoveTag(tag)}
                  >
                    {tag}
                  </ChipsApp>
                ))}
              </div>
            )}
          </div>
        </div>
      </ModuleCard>

      {/* 3. Choice Chips (Single & Multi Selection) */}
      <ModuleCard
        id="chips-choice-selection-module"
        icon={<CheckCircle2 className="w-5 h-5 text-vibrant-purple-dark" />}
        title="3. Choice Chips (Seleksi Tunggal &amp; Banyak)"
        description="Demo interaktif perpindahan state selected pada grup chip pilihan tunggal (Radio-like) dan banyak pilihan (Checkbox-like)."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Single Choice Group */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink">Seleksi Tunggal (Pilihan Utama)</span>
              <BadgeApp id="b-choice-single" variant="solidPurple" size="sm">Radio Mode</BadgeApp>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Semua Pajak", "PBB-P2", "PBJT Kuliner", "BPHTB", "Reklame"].map((cat) => {
                const isSel = singleChoice === cat;
                return (
                  <ChipsApp
                    key={cat}
                    id={`choice-single-${cat}`}
                    chipType="choice"
                    variant="vibrant"
                    selected={isSel}
                    onClick={() => setSingleChoice(cat)}
                  >
                    {cat}
                  </ChipsApp>
                );
              })}
            </div>
            <p className="text-[11px] text-ink-muted">
              Pilihan terpilih saat ini: <strong className="text-vibrant-purple-dark">{singleChoice}</strong>
            </p>
          </div>

          {/* Multi Choice Group */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink">Seleksi Banyak (Multi-Filter)</span>
              <BadgeApp id="b-choice-multi" variant="neutral" size="sm">Multi Mode</BadgeApp>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Hotel", "Restoran", "Hiburan", "Parkir", "Listrik"].map((type) => {
                const isSel = multiChoices.includes(type);
                return (
                  <ChipsApp
                    key={type}
                    id={`choice-multi-${type}`}
                    chipType="choice"
                    variant="neutral"
                    selected={isSel}
                    onClick={() => toggleMultiChoice(type)}
                  >
                    {type}
                  </ChipsApp>
                );
              })}
            </div>
            <p className="text-[11px] text-ink-muted">
              Filter aktif: <strong className="text-vibrant-purple-dark">{multiChoices.join(", ") || "Tidak Ada"}</strong>
            </p>
          </div>
        </div>
      </ModuleCard>

      {/* 4. Leading Elements (Avatar & Icon) */}
      <ModuleCard
        id="chips-leading-elements-module"
        icon={<User className="w-5 h-5 text-vibrant-purple-dark" />}
        title="4. Leading Elements (Avatar / Profile &amp; Icons)"
        description="Chip dengan elemen gambar profil pengguna (Avatar) atau ikon kategori di posisi awal."
      >
        <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Avatar Chips */}
            <div className="p-3 bg-surface-soft/60 rounded-xl space-y-2">
              <span className="text-xs font-bold text-ink block">Avatar / Profile Leading</span>
              <div className="flex flex-wrap items-center gap-2">
                <ChipsApp
                  id="chip-av-1"
                  variant="vibrant"
                  avatar={
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80"
                      alt="Ahmad Fauzi"
                      className="w-full h-full object-cover"
                    />
                  }
                >
                  Ahmad Fauzi
                </ChipsApp>

                <ChipsApp
                  id="chip-av-2"
                  variant="neutral"
                  avatar={
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80"
                      alt="Siti Rahma"
                      className="w-full h-full object-cover"
                    />
                  }
                  removable
                  onRemove={() => alert("Hapus Staf")}
                >
                  Siti Rahma
                </ChipsApp>
              </div>
            </div>

            {/* Icon Chips */}
            <div className="p-3 bg-surface-soft/60 rounded-xl space-y-2">
              <span className="text-xs font-bold text-ink block">Icon Leading</span>
              <div className="flex flex-wrap items-center gap-2">
                <ChipsApp id="chip-ic-1" variant="success" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
                  Status Lunas
                </ChipsApp>
                <ChipsApp id="chip-ic-2" variant="warning" icon={<Star className="w-3.5 h-3.5" />}>
                  Prioritas Utama
                </ChipsApp>
                <ChipsApp id="chip-ic-3" variant="info" icon={<Tag className="w-3.5 h-3.5" />}>
                  Kategori Wajib
                </ChipsApp>
              </div>
            </div>
          </div>
        </div>
      </ModuleCard>

      {/* 5. Foundation Rounded Corner Alignment */}
      <ModuleCard
        id="chips-foundation-rounded-module"
        icon={<Circle className="w-5 h-5 text-vibrant-purple-dark" />}
        title="5. Foundation Container Radius Alignment"
        description="Pilihan bentuk Container Radius sesuai acuan token Foundation Rounded: Pill / Fully Rounded (rounded-full), Small (rounded-[4px]), Medium (rounded-[8px]), Large (rounded-[16px]), dan Sharp / None (rounded-none)."
      >
        <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
            {/* Pill / Full */}
            <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2">
              <ChipsApp id="c-rad-pill" rounded="pill" variant="vibrant" selected>
                Pill (9999px)
              </ChipsApp>
              <span className="text-xs font-bold text-ink">Pill / Fully Rounded</span>
              <span className="text-[10px] text-ink-muted font-mono">rounded=&quot;pill&quot; / &quot;full&quot;</span>
            </div>

            {/* Small */}
            <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2">
              <ChipsApp id="c-rad-sm" rounded="sm" variant="vibrant" selected>
                Small (4px)
              </ChipsApp>
              <span className="text-xs font-bold text-ink">Small Radius</span>
              <span className="text-[10px] text-ink-muted font-mono">rounded=&quot;sm&quot; / &quot;small&quot;</span>
            </div>

            {/* Medium */}
            <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2">
              <ChipsApp id="c-rad-md" rounded="md" variant="vibrant" selected>
                Medium (8px)
              </ChipsApp>
              <span className="text-xs font-bold text-ink">Medium Radius</span>
              <span className="text-[10px] text-ink-muted font-mono">rounded=&quot;md&quot; / &quot;medium&quot;</span>
            </div>

            {/* Large */}
            <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2">
              <ChipsApp id="c-rad-lg" rounded="lg" variant="vibrant" selected>
                Large (16px)
              </ChipsApp>
              <span className="text-xs font-bold text-ink">Large Radius</span>
              <span className="text-[10px] text-ink-muted font-mono">rounded=&quot;lg&quot; / &quot;large&quot;</span>
            </div>

            {/* Sharp / None */}
            <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2">
              <ChipsApp id="c-rad-none" rounded="none" variant="vibrant" selected>
                Sharp (0px)
              </ChipsApp>
              <span className="text-xs font-bold text-ink flex items-center gap-1 justify-center">
                <Square className="w-3 h-3 text-vibrant-purple" /> Sharp Corner
              </span>
              <span className="text-[10px] text-ink-muted font-mono">rounded=&quot;none&quot; / &quot;sharp&quot;</span>
            </div>
          </div>
        </div>
      </ModuleCard>

      {/* 6. Interactive Chips Playground */}
      <ModuleCard
        id="chips-playground-module"
        icon={<Sparkles className="w-5 h-5 text-vibrant-purple-dark" />}
        title="6. Interactive Chips Playground"
        description="Uji kustomisasi tipe chip (Input, Choice, Action), warna background, ukuran (Small, Medium, Large), status selected, leading avatar/icon, dan trailing remove 'X' secara real-time."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            {/* Label */}
            <div>
              <label className="text-xs font-semibold text-ink mb-1 block">Teks Label Chip</label>
              <InputApp
                id="c-play-label"
                value={playLabel}
                onChange={(e) => setPlayLabel(e.target.value)}
                placeholder="Label chip..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Type */}
              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Tipe Chip</label>
                <SelectApp
                  id="c-play-type"
                  value={playType}
                  onChange={(e) => setPlayType(e.target.value as ChipType)}
                  options={[
                    { value: "input", label: "Input Chip (Removable)" },
                    { value: "choice", label: "Choice Chip (Selectable)" },
                    { value: "action", label: "Action Chip (Button)" },
                  ]}
                />
              </div>

              {/* Variant */}
              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Warna Background</label>
                <SelectApp
                  id="c-play-variant"
                  value={playVariant}
                  onChange={(e) => setPlayVariant(e.target.value as ChipVariant)}
                  options={[
                    { value: "vibrant", label: "Vibrant Purple" },
                    { value: "brand", label: "Brand Purple" },
                    { value: "neutral", label: "Neutral Gray" },
                    { value: "success", label: "Success Green" },
                    { value: "warning", label: "Warning Amber" },
                    { value: "error", label: "Error Red" },
                    { value: "info", label: "Info Sky" },
                    { value: "outline", label: "Outline" },
                  ]}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Size */}
              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Ukuran (Size)</label>
                <SelectApp
                  id="c-play-size"
                  value={playSize}
                  onChange={(e) => setPlaySize(e.target.value as ChipSize)}
                  options={[
                    { value: "sm", label: "Small (sm - 24px)" },
                    { value: "md", label: "Medium (md - 32px)" },
                    { value: "lg", label: "Large (lg - 40px)" },
                  ]}
                />
              </div>

              {/* Foundation Radius */}
              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Foundation Radius</label>
                <SelectApp
                  id="c-play-rounded"
                  value={playRounded}
                  onChange={(e) => setPlayRounded(e.target.value as ChipRounded)}
                  options={[
                    { value: "pill", label: "Pill / Full (9999px)" },
                    { value: "sm", label: "Small (sm - 4px)" },
                    { value: "md", label: "Medium (md - 8px)" },
                    { value: "lg", label: "Large (lg - 16px)" },
                    { value: "none", label: "Sharp / None (0px)" },
                  ]}
                />
              </div>
            </div>

            {/* Leading Element */}
            <div>
              <label className="text-xs font-semibold text-ink mb-1 block">Leading Element</label>
              <SelectApp
                id="c-play-leading"
                value={playLeadingOption}
                onChange={(e) => setPlayLeadingOption(e.target.value as any)}
                options={[
                  { value: "none", label: "Tanpa Leading Element" },
                  { value: "icon", label: "Tag / Filter Icon" },
                  { value: "avatar", label: "User Avatar Photo" },
                ]}
              />
            </div>

            {/* Checkbox Options */}
            <div className="pt-2 border-t border-hairline-soft flex items-center justify-between">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={playSelected}
                  onChange={(e) => setPlaySelected(e.target.checked)}
                  className="w-4 h-4 rounded text-vibrant-purple cursor-pointer"
                />
                <span className="text-xs font-medium text-ink">Selected State (`selected={true}`)</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={playRemovable}
                  onChange={(e) => setPlayRemovable(e.target.checked)}
                  className="w-4 h-4 rounded text-vibrant-purple cursor-pointer"
                />
                <span className="text-xs font-medium text-ink">Remove 'X' Button</span>
              </label>
            </div>
          </div>

          {/* Live Preview Result */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-surface-soft/60 p-6 rounded-2xl border border-hairline-soft">
            <div className="space-y-6">
              <TextApp id="prev-c-h" variant="caption" weight="bold" className="uppercase tracking-wider text-ink-muted">
                Hasil Live Preview
              </TextApp>

              <div className="flex items-center justify-center p-8 bg-surface rounded-xl border border-hairline-soft min-h-[100px]">
                <ChipsApp
                  id="playground-interactive-chip"
                  chipType={playType}
                  variant={playVariant}
                  size={playSize}
                  rounded={playRounded}
                  selected={playSelected}
                  removable={playRemovable}
                  onRemove={playRemovable ? () => alert("Chip dihapus!") : undefined}
                  icon={playLeadingOption === "icon" ? <Tag className="w-3.5 h-3.5" /> : undefined}
                  avatar={
                    playLeadingOption === "avatar" ? (
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80"
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    ) : undefined
                  }
                  onClick={() => setPlaySelected(!playSelected)}
                >
                  {playLabel || "Chip Label"}
                </ChipsApp>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-vibrant-purple-dark" />
                    <TextApp id="code-c-h" variant="caption" weight="bold" className="uppercase">
                      Generated Code
                    </TextApp>
                  </div>
                  <ButtonApp
                    id="copy-c-code"
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
      </ModuleCard>
    </div>
  );
}
