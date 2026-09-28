import * as React from "react";
import {
  AvatarApp,
  AvatarGroupApp,
  CardApp,
  TextApp,
  BadgeApp,
  ButtonApp,
  SelectApp,
  InputApp,
  AvatarSize,
  AvatarStatus,
  AvatarShape,
} from "@/packages/design-system";
import {
  User,
  Users,
  Sparkles,
  Code,
  Check,
  Bot,
  Shield,
  Layers,
  Image as ImageIcon,
  Type,
  UserCheck,
  Maximize2,
  Circle,
  Square,
  Activity,
} from "lucide-react";
import { ModuleCard } from "./ModuleCard";

export function AvatarDisplayModule() {
  const [avatarMode, setAvatarMode] = React.useState<"image" | "initials" | "icon">("image");
  const [name, setName] = React.useState("Ahmad Fauzi");
  const [imageUrl, setImageUrl] = React.useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
  );
  const [size, setSize] = React.useState<AvatarSize>("lg");
  const [shape, setShape] = React.useState<AvatarShape>("circle");
  const [status, setStatus] = React.useState<AvatarStatus>("online");
  const [showStatus, setShowStatus] = React.useState(true);
  const [variant, setVariant] = React.useState<any>("vibrant");
  const [copied, setCopied] = React.useState(false);

  const sampleUsers = [
    {
      id: "u1",
      name: "Siti Rahma",
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
      status: "online" as AvatarStatus,
      variant: "vibrant" as const,
    },
    {
      id: "u2",
      name: "Budi Santoso",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
      status: "busy" as AvatarStatus,
      variant: "brand" as const,
    },
    {
      id: "u3",
      name: "Dian Permata",
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
      status: "away" as AvatarStatus,
      variant: "success" as const,
    },
    {
      id: "u4",
      name: "Eko Wijaya",
      status: "offline" as AvatarStatus,
      variant: "warning" as const,
    },
    {
      id: "u5",
      name: "Farah Nabila",
      variant: "danger" as const,
    },
  ];

  const currentSrc = avatarMode === "image" ? imageUrl : undefined;
  const currentName = avatarMode === "initials" || avatarMode === "image" ? name : undefined;
  const currentIcon = avatarMode === "icon" ? <Bot className="w-1/2 h-1/2 text-vibrant-purple-dark" /> : undefined;

  const codeSnippet = `import { AvatarApp, AvatarGroupApp } from "@/packages/design-system";

// Single Avatar / Profile Component
<AvatarApp
  name="${currentName || ""}"
  ${currentSrc ? `src="${currentSrc}"\n  ` : ""}${currentIcon ? `icon={<Bot />}\n  ` : ""}size="${size}" // Small (sm), Medium (md), Large (lg), XL (xl)
  shape="${shape}" // Circle, Square (Rounded Square)
  status="${status}" // Online, Offline, Busy
  showStatus={${showStatus}}
/>

// Group Avatar Stack
<AvatarGroupApp
  size="${size}"
  max={3}
  items={[
    { id: "1", name: "Siti Rahma", src: "https://..." },
    { id: "2", name: "Budi Santoso", status: "busy" },
    { id: "3", name: "Dian Permata", status: "online" }
  ]}
/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8" id="uikit-avatar-module">
      {/* Overview Card */}
      <CardApp id="avatar-overview" variant="neutral" size="md" rounded="card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BadgeApp id="avatar-badge-core" variant="solidPurple" size="sm">
                02 - Core UI
              </BadgeApp>
              <BadgeApp id="avatar-badge-atom" variant="vibrantPurple" size="sm">
                Atom & Molecule
              </BadgeApp>
            </div>
            <TextApp id="avatar-title" variant="h3" weight="bold">
              Avatar / Profile (`AvatarApp` & `AvatarGroupApp`)
            </TextApp>
            <TextApp id="avatar-sub" variant="body" color="secondary">
              Komponen profil pengguna yang mendukung opsi **Image**, **Initials**, dan **Placeholder/Icon**, 
              skala ukuran (**Small, Medium, Large, XL**), bentuk (**Circle, Rounded Square**), serta **Status Badge** (**Online, Offline, Busy**).
            </TextApp>
          </div>
        </div>
      </CardApp>

      {/* Showcase 1: Avatar Content Types (Image, Initials, Placeholder/Icon) */}
      <ModuleCard
        id="avatar-content-types-module"
        icon={<UserCheck className="w-5 h-5 text-vibrant-purple-dark" />}
        title="1. Avatar Content Types (Image, Initials, Placeholder/Icon)"
        description="Penggunaan tiga tipe konten visual profil: Foto asli (Image), Inisial nama otomatis (Initials), dan Ikon fallback (Placeholder/Icon)."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Image Mode */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-xs font-bold text-ink mb-1">
              <ImageIcon className="w-4 h-4 text-vibrant-purple-dark" />
              Image (Foto Profil)
            </div>
            <AvatarApp
              id="av-type-image"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
              alt="Ahmad Fauzi"
              size="lg"
              status="online"
              showStatus
            />
            <p className="text-xs text-ink-muted">
              Menggunakan URL foto `src`. Memiliki fallback otomatis ke inisial/ikon jika terjadi gagal muat.
            </p>
          </div>

          {/* Initials Mode */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-xs font-bold text-ink mb-1">
              <Type className="w-4 h-4 text-brand-purple" />
              Initials (Inisial Nama)
            </div>
            <AvatarApp
              id="av-type-initials"
              name="Ahmad Fauzi"
              variant="vibrant"
              size="lg"
              status="busy"
              showStatus
            />
            <p className="text-xs text-ink-muted">
              Generasi inisial dua huruf otomatis dari nama pengguna (`AF` dari &quot;Ahmad Fauzi&quot;).
            </p>
          </div>

          {/* Placeholder/Icon Mode */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3 flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-xs font-bold text-ink mb-1">
              <User className="w-4 h-4 text-emerald-600" />
              Placeholder / Icon
            </div>
            <div className="flex items-center gap-3">
              <AvatarApp id="av-type-icon-user" size="lg" status="offline" showStatus />
              <AvatarApp
                id="av-type-icon-bot"
                icon={<Bot className="w-5 h-5 text-vibrant-purple-dark" />}
                variant="vibrant"
                size="lg"
              />
              <AvatarApp
                id="av-type-icon-shield"
                icon={<Shield className="w-5 h-5 text-emerald-600" />}
                variant="success"
                size="lg"
              />
            </div>
            <p className="text-xs text-ink-muted">
              Ikon pengguna standar (User placeholder) atau ikon kustom (`icon` prop) untuk bot & admin.
            </p>
          </div>
        </div>
      </ModuleCard>

      {/* Showcase 2: Avatar Sizes (Small, Medium, Large, XL) */}
      <ModuleCard
        id="avatar-sizes-module"
        icon={<Maximize2 className="w-5 h-5 text-vibrant-purple-dark" />}
        title="2. Ukuran Avatar (Small, Medium, Large, XL)"
        description="Skala proporsional ukuran profil pengguna dari Small (32px), Medium (40px), Large (48px), hingga XL (64px)."
      >
        <div className="p-5 bg-surface rounded-xl border border-hairline-soft space-y-6">
          <div className="flex flex-wrap items-end justify-around gap-6 py-4 px-2">
            {/* Small */}
            <div className="flex flex-col items-center gap-2">
              <AvatarApp
                id="av-size-sm"
                size="sm"
                name="Ahmad Fauzi"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
                status="online"
                showStatus
              />
              <div className="text-center">
                <BadgeApp id="badge-size-sm" variant="solidPurple" size="sm">
                  Small (sm)
                </BadgeApp>
                <div className="text-[11px] text-ink-muted mt-1 font-mono">32 x 32 px</div>
              </div>
            </div>

            {/* Medium */}
            <div className="flex flex-col items-center gap-2">
              <AvatarApp
                id="av-size-md"
                size="md"
                name="Ahmad Fauzi"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
                status="online"
                showStatus
              />
              <div className="text-center">
                <BadgeApp id="badge-size-md" variant="neutral" size="sm">
                  Medium (md)
                </BadgeApp>
                <div className="text-[11px] text-ink-muted mt-1 font-mono">40 x 40 px</div>
              </div>
            </div>

            {/* Large */}
            <div className="flex flex-col items-center gap-2">
              <AvatarApp
                id="av-size-lg"
                size="lg"
                name="Ahmad Fauzi"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
                status="busy"
                showStatus
              />
              <div className="text-center">
                <BadgeApp id="badge-size-lg" variant="solidPurple" size="sm">
                  Large (lg)
                </BadgeApp>
                <div className="text-[11px] text-ink-muted mt-1 font-mono">48 x 48 px</div>
              </div>
            </div>

            {/* XL */}
            <div className="flex flex-col items-center gap-2">
              <AvatarApp
                id="av-size-xl"
                size="xl"
                name="Ahmad Fauzi"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
                status="offline"
                showStatus
              />
              <div className="text-center">
                <BadgeApp id="badge-size-xl" variant="neutral" size="sm">
                  XL (xl)
                </BadgeApp>
                <div className="text-[11px] text-ink-muted mt-1 font-mono">64 x 64 px</div>
              </div>
            </div>
          </div>
        </div>
      </ModuleCard>

      {/* Showcase 3: Shapes & Status Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shape (Circle vs Rounded Square) */}
        <ModuleCard
          id="avatar-shapes-module"
          icon={<Circle className="w-5 h-5 text-vibrant-purple-dark" />}
          title="3. Shape (Circle & Rounded Square)"
          description="Bentuk lingkaran sempurna (`circle`) atau persegi sudut melengkung (`square`)."
        >
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2 text-center">
                <AvatarApp
                  id="av-shape-circle"
                  shape="circle"
                  name="Ahmad Fauzi"
                  size="xl"
                  variant="vibrant"
                  status="online"
                  showStatus
                />
                <span className="text-xs font-bold text-ink flex items-center gap-1">
                  <Circle className="w-3.5 h-3.5 text-vibrant-purple" />
                  Circle (Lingkaran)
                </span>
                <span className="text-[10px] text-ink-muted font-mono">shape=&quot;circle&quot;</span>
              </div>

              <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2 text-center">
                <AvatarApp
                  id="av-shape-square"
                  shape="square"
                  name="Ahmad Fauzi"
                  size="xl"
                  variant="brand"
                  status="online"
                  showStatus
                />
                <span className="text-xs font-bold text-ink flex items-center gap-1">
                  <Square className="w-3.5 h-3.5 text-brand-purple" />
                  Rounded Square
                </span>
                <span className="text-[10px] text-ink-muted font-mono">shape=&quot;square&quot;</span>
              </div>
            </div>
          </div>
        </ModuleCard>

        {/* Status Badge (Online, Offline, Busy) */}
        <ModuleCard
          id="avatar-status-module"
          icon={<Activity className="w-5 h-5 text-vibrant-purple-dark" />}
          title="4. Status Badge (Online, Offline, Busy)"
          description="Indikator titik status ketersediaan pengguna di sudut kanan bawah avatar."
        >
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              {/* Online */}
              <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2">
                <AvatarApp
                  id="av-status-online"
                  name="Siti Rahma"
                  size="lg"
                  status="online"
                  showStatus
                />
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Online
                </span>
                <span className="text-[10px] text-ink-muted font-mono">status=&quot;online&quot;</span>
              </div>

              {/* Offline */}
              <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2">
                <AvatarApp
                  id="av-status-offline"
                  name="Eko Wijaya"
                  size="lg"
                  status="offline"
                  showStatus
                />
                <span className="text-xs font-semibold text-slate-500">
                  Offline
                </span>
                <span className="text-[10px] text-ink-muted font-mono">status=&quot;offline&quot;</span>
              </div>

              {/* Busy */}
              <div className="p-3 bg-surface-soft/60 rounded-lg flex flex-col items-center gap-2">
                <AvatarApp
                  id="av-status-busy"
                  name="Budi Santoso"
                  size="lg"
                  status="busy"
                  showStatus
                />
                <span className="text-xs font-semibold text-red-500">
                  Busy
                </span>
                <span className="text-[10px] text-ink-muted font-mono">status=&quot;busy&quot;</span>
              </div>
            </div>
          </div>
        </ModuleCard>
      </div>

      {/* Showcase 5: AvatarGroupApp (Team Stack) */}
      <ModuleCard
        id="avatar-group-module"
        icon={<Users className="w-5 h-5 text-vibrant-purple-dark" />}
        title="5. AvatarGroupApp (Tumpukan Tim / Group Stack)"
        description="Menampilkan tumpukan foto atau inisial tim dengan batas maksimum `max` dan badge jumlah tersembunyi `+N`."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Group 1: Max 3 */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <div className="flex items-center justify-between">
              <TextApp id="ag-1-t" variant="h4" weight="bold">Tim BPKAD Yogyakarta</TextApp>
              <BadgeApp id="ag-1-b" variant="solidPurple" size="sm">max = 3</BadgeApp>
            </div>
            <AvatarGroupApp id="ag-1" max={3} size="lg" items={sampleUsers} />
            <p className="text-xs text-ink-muted">
              Menampilkan 3 anggota pertama dan menyembunyikan sisa tim dengan badge `+2`.
            </p>
          </div>

          {/* Group 2: Max 4 Small */}
          <div className="p-4 bg-surface rounded-xl border border-hairline-soft space-y-3">
            <div className="flex items-center justify-between">
              <TextApp id="ag-2-t" variant="h4" weight="bold">Anggota Diskusi Komentar</TextApp>
              <BadgeApp id="ag-2-b" variant="neutral" size="sm">size = sm</BadgeApp>
            </div>
            <AvatarGroupApp id="ag-2" max={4} size="sm" items={sampleUsers} />
            <p className="text-xs text-ink-muted">
              Tampilan kelompok ukuran Small (`sm`) ideal untuk baris tabel atau balasan komentar.
            </p>
          </div>
        </div>
      </ModuleCard>

      {/* Showcase 6: Interactive Avatar Playground */}
      <ModuleCard
        id="avatar-playground-module"
        icon={<Sparkles className="w-5 h-5 text-vibrant-purple-dark" />}
        title="6. Interactive Avatar / Profile Playground"
        description="Uji kustomisasi tipe konten (Image, Initials, Placeholder/Icon), Ukuran (Small, Medium, Large, XL), Bentuk (Circle, Square), dan Status Badge secara real-time."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            {/* Mode Content Selector */}
            <div>
              <label className="text-xs font-semibold text-ink mb-1 block">Tipe Konten Avatar</label>
              <div className="grid grid-cols-3 gap-2">
                <ButtonApp
                  id="mode-btn-img"
                  variant={avatarMode === "image" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setAvatarMode("image")}
                  className="text-xs"
                >
                  Image
                </ButtonApp>
                <ButtonApp
                  id="mode-btn-init"
                  variant={avatarMode === "initials" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setAvatarMode("initials")}
                  className="text-xs"
                >
                  Initials
                </ButtonApp>
                <ButtonApp
                  id="mode-btn-icon"
                  variant={avatarMode === "icon" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setAvatarMode("icon")}
                  className="text-xs"
                >
                  Icon
                </ButtonApp>
              </div>
            </div>

            {avatarMode === "image" && (
              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">URL Foto (Src)</label>
                <InputApp
                  id="av-input-src"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="URL Foto..."
                />
              </div>
            )}

            {(avatarMode === "initials" || avatarMode === "image") && (
              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Nama Pengguna (Name)</label>
                <InputApp
                  id="av-input-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama pengguna..."
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Ukuran (Size)</label>
                <SelectApp
                  id="av-select-size"
                  value={size}
                  onChange={(e) => setSize(e.target.value as AvatarSize)}
                  options={[
                    { value: "sm", label: "Small (sm - 32px)" },
                    { value: "md", label: "Medium (md - 40px)" },
                    { value: "lg", label: "Large (lg - 48px)" },
                    { value: "xl", label: "XL (xl - 64px)" },
                  ]}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Bentuk (Shape)</label>
                <SelectApp
                  id="av-select-shape"
                  value={shape}
                  onChange={(e) => setShape(e.target.value as AvatarShape)}
                  options={[
                    { value: "circle", label: "Circle (Lingkaran)" },
                    { value: "square", label: "Square (Rounded)" },
                  ]}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Status Badge</label>
                <SelectApp
                  id="av-select-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as AvatarStatus)}
                  options={[
                    { value: "online", label: "Online (Hijau)" },
                    { value: "offline", label: "Offline (Abu-abu)" },
                    { value: "busy", label: "Busy (Merah)" },
                  ]}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Varian Warna</label>
                <SelectApp
                  id="av-select-variant"
                  value={variant}
                  onChange={(e) => setVariant(e.target.value)}
                  options={[
                    { value: "vibrant", label: "Vibrant Purple" },
                    { value: "brand", label: "Brand Purple" },
                    { value: "default", label: "Default Neutral" },
                    { value: "success", label: "Success Green" },
                    { value: "warning", label: "Warning Amber" },
                    { value: "danger", label: "Danger Red" },
                    { value: "info", label: "Info Blue" },
                  ]}
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-hairline-soft">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="av-status-check"
                  checked={showStatus}
                  onChange={(e) => setShowStatus(e.target.checked)}
                  className="w-4 h-4 rounded text-vibrant-purple cursor-pointer"
                />
                <label htmlFor="av-status-check" className="text-xs font-medium text-ink cursor-pointer">
                  Tampilkan Status Badge
                </label>
              </div>
            </div>
          </div>

          {/* Preview Result & Generated Code */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-surface-soft/60 p-6 rounded-2xl border border-hairline-soft">
            <div className="space-y-6">
              <TextApp id="prev-h" variant="caption" weight="bold" className="uppercase tracking-wider text-ink-muted">
                Hasil Live Preview
              </TextApp>

              <div className="flex items-center gap-6 p-6 bg-surface rounded-xl border border-hairline-soft">
                <AvatarApp
                  id="av-live-demo"
                  name={currentName}
                  src={currentSrc}
                  icon={currentIcon}
                  size={size}
                  shape={shape}
                  variant={variant}
                  status={status}
                  showStatus={showStatus}
                />

                <div className="space-y-1">
                  <div className="text-sm font-bold text-ink">
                    {avatarMode === "icon" ? "Ikon Fallback Bot" : name || "Tanpa Nama"}
                  </div>
                  <div className="text-xs text-ink-muted">
                    Mode: <strong className="text-vibrant-purple-dark capitalize">{avatarMode}</strong> | Ukuran: <strong className="uppercase">{size}</strong>
                  </div>
                  <div className="text-[11px] text-ink-secondary">
                    Status: <span className="capitalize font-semibold text-ink">{showStatus ? status : "Disembunyikan"}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-vibrant-purple-dark" />
                    <TextApp id="code-av-h" variant="caption" weight="bold" className="uppercase">
                      Generated Code
                    </TextApp>
                  </div>
                  <ButtonApp
                    id="copy-av-code"
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
