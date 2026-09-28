import * as React from "react";
import {
  ButtonApp,
  TextApp,
  BadgeApp,
  CardApp,
  InputApp,
  SelectApp,
  useToastApp,
  ToastVariant,
  ToastPosition,
} from "@/packages/design-system";
import {
  BellRing,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  Sparkles,
  Code,
  Check,
  Trash2,
  Layers,
  Zap,
} from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { cn } from "@/lib/utils";

export function ToastDisplayModule() {
  const { toast, dismiss, clear, position, setPosition, toasts } = useToastApp();

  // Playground state
  const [title, setTitle] = React.useState("Perubahan Tersimpan");
  const [description, setDescription] = React.useState(
    "Data konfigurasi sistem berhasil diperbarui ke server."
  );
  const [variant, setVariant] = React.useState<ToastVariant>("success");
  const [badgeText, setBadgeText] = React.useState("Sistem");
  const [duration, setDuration] = React.useState(4000);
  const [includeAction, setIncludeAction] = React.useState(true);
  const [actionLabel, setActionLabel] = React.useState("Urungkan");
  const [copied, setCopied] = React.useState(false);

  const triggerCustomToast = () => {
    toast({
      title,
      description: description || undefined,
      variant,
      badge: badgeText || undefined,
      duration,
      action: includeAction
        ? {
            label: actionLabel,
            onClick: () => {
              toast.info("Aksi diurungkan!");
            },
          }
        : undefined,
    });
  };

  const codeSnippet = `// Wrap root app with ProviderApp
import { ProviderApp, useToastApp } from "@/packages/design-system";

export default function App() {
  return (
    <ProviderApp defaultToastPosition="top-right">
      <YourMainApp />
    </ProviderApp>
  );
}

// Inside any component:
function MyComponent() {
  const { toast } = useToastApp();

  const handleSave = () => {
    toast.${variant === "default" ? "" : variant}(${JSON.stringify(title)}, {
      description: ${JSON.stringify(description)},
      badge: ${badgeText ? JSON.stringify(badgeText) : "undefined"},
      duration: ${duration},
      ${
        includeAction
          ? `action: { label: ${JSON.stringify(actionLabel)}, onClick: () => console.log('Action triggered') }`
          : ""
      }
    });
  };

  return <ButtonApp id="save-btn" onClick={handleSave}>Simpan</ButtonApp>;
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <CardApp id="toast-overview" variant="neutral" size="md" rounded="card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BadgeApp id="toast-badge" variant="vibrantPurple" size="sm">
                Provider-Driven
              </BadgeApp>
              <BadgeApp id="toast-badge-atom" variant="neutral" size="sm">
                Built with DS Atoms
              </BadgeApp>
            </div>
            <TextApp id="toast-title" variant="h3" weight="bold">
              ToastApp & ProviderApp
            </TextApp>
            <TextApp id="toast-sub" variant="body" color="secondary">
              Sistem notifikasi toast global berbasis React Context Provider (`ProviderApp` & `useToastApp`),
              dirancang menggunakan komponen Atom `CardApp`, `TextApp`, `BadgeApp`, dan `ButtonApp`.
            </TextApp>
          </div>

          <div className="flex items-center gap-2">
            <ButtonApp
              id="clear-toasts-btn"
              variant="secondary"
              size="sm"
              onClick={clear}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
              Bersihkan Toast ({toasts.length})
            </ButtonApp>
          </div>
        </div>
      </CardApp>

      {/* Preset Triggers Section */}
      <ModuleCard
        id="toast-presets-module"
        icon={<Zap className="w-5 h-5 text-vibrant-purple-dark" />}
        title="4 Core Toast Helpers & Event Props"
        description="Penggunaan 4 varian utama toast (success, error, warning, info) serta pengiriman event callback via props (onClick, onDismiss, action.onClick)."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* 1. Success Toast */}
          <ButtonApp
            id="toast-btn-success"
            variant="secondary"
            onClick={() =>
              toast.success("Data Berhasil Disimpan", {
                description: "Perubahan profil pengguna telah disimpan.",
                badge: "Sukses",
                onClick: () => toast.info("Toast body diklik!"),
                onDismiss: () => console.log("Success toast dismissed"),
              })
            }
            className="justify-start gap-2.5 h-auto py-3 px-4 border-emerald-500/20 hover:bg-emerald-500/5"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div className="text-left">
              <div className="text-xs font-bold text-ink">Success Toast</div>
              <div className="text-[11px] text-ink-muted">toast.success(...)</div>
            </div>
          </ButtonApp>

          {/* 2. Error Toast */}
          <ButtonApp
            id="toast-btn-error"
            variant="secondary"
            onClick={() =>
              toast.error("Gagal Terhubung ke Server", {
                description: "Koneksi terputus. Silakan periksa jaringan internet Anda.",
                badge: "Error 500",
                action: {
                  label: "Coba Lagi",
                  onClick: (e) => toast.info("Menghubungkan ulang ke server...", { badge: "Retry Event" }),
                },
                onDismiss: () => console.log("Error toast closed"),
              })
            }
            className="justify-start gap-2.5 h-auto py-3 px-4 border-red-500/20 hover:bg-red-500/5"
          >
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <div className="text-left">
              <div className="text-xs font-bold text-ink">Error Toast</div>
              <div className="text-[11px] text-ink-muted">toast.error(...)</div>
            </div>
          </ButtonApp>

          {/* 3. Warning Toast */}
          <ButtonApp
            id="toast-btn-warning"
            variant="secondary"
            onClick={() =>
              toast.warning("Sesi Akan Berakhir", {
                description: "Sesi login Anda akan habis dalam 5 menit.",
                badge: "Peringatan",
                action: {
                  label: "Perpanjang",
                  onClick: () => toast.success("Sesi telah diperpanjang!"),
                },
              })
            }
            className="justify-start gap-2.5 h-auto py-3 px-4 border-amber-500/20 hover:bg-amber-500/5"
          >
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <div className="text-left">
              <div className="text-xs font-bold text-ink">Warning Toast</div>
              <div className="text-[11px] text-ink-muted">toast.warning(...)</div>
            </div>
          </ButtonApp>

          {/* 4. Info Toast */}
          <ButtonApp
            id="toast-btn-info"
            variant="secondary"
            onClick={() =>
              toast.info("Pembaruan Sistem Tersedia", {
                description: "Versi v2.4.0 siap dipasang.",
                badge: "Info",
                onClick: () => toast.vibrant("Info Toast Diklik!", { description: "Event onClick dipanggil." }),
              })
            }
            className="justify-start gap-2.5 h-auto py-3 px-4 border-sky-500/20 hover:bg-sky-500/5"
          >
            <Info className="w-5 h-5 text-sky-500 shrink-0" />
            <div className="text-left">
              <div className="text-xs font-bold text-ink">Info Toast</div>
              <div className="text-[11px] text-ink-muted">toast.info(...)</div>
            </div>
          </ButtonApp>
        </div>
      </ModuleCard>

      {/* Interactive Playground */}
      <ModuleCard
        id="toast-playground-module"
        icon={<BellRing className="w-5 h-5 text-vibrant-purple-dark" />}
        title="Interactive Toast Playground & Position Control"
        description="Kustomisasi opsi notifikasi toast dan atur posisi penayangan pada layar."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form Controls */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Posisi Stacking</label>
                <SelectApp
                  id="toast-pos-select"
                  value={position}
                  onChange={(e) => setPosition(e.target.value as ToastPosition)}
                  options={[
                    { value: "top-right", label: "Top Right (Kanan Atas)" },
                    { value: "top-left", label: "Top Left (Kiri Atas)" },
                    { value: "top-center", label: "Top Center (Tengah Atas)" },
                    { value: "bottom-right", label: "Bottom Right (Kanan Bawah)" },
                    { value: "bottom-left", label: "Bottom Left (Kiri Bawah)" },
                    { value: "bottom-center", label: "Bottom Center (Tengah Bawah)" },
                  ]}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Varian Warna / Tema</label>
                <SelectApp
                  id="toast-variant-select"
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as ToastVariant)}
                  options={[
                    { value: "success", label: "Success (Hijau)" },
                    { value: "error", label: "Error (Merah)" },
                    { value: "warning", label: "Warning (Kuning/Amber)" },
                    { value: "info", label: "Info (Biru)" },
                    { value: "vibrant", label: "Vibrant / Playful (Ungu Sparkles)" },
                    { value: "brand", label: "Brand (Ungu/Brand)" },
                    { value: "default", label: "Default (Neutral Slate)" },
                  ]}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-ink mb-1 block">Judul Toast (Title)</label>
              <InputApp
                id="toast-input-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul notifikasi..."
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-ink mb-1 block">Deskripsi / Detail</label>
              <InputApp
                id="toast-input-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Masukkan pesan ringkas..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Teks Badge (Opsional)</label>
                <InputApp
                  id="toast-input-badge"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  placeholder="Contoh: Sistem, Info, Baru"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink mb-1 block">Durasi Auto-Dismiss (ms)</label>
                <SelectApp
                  id="toast-duration-select"
                  value={duration.toString()}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  options={[
                    { value: "2000", label: "2000 ms (2 Detik)" },
                    { value: "4000", label: "4000 ms (4 Detik - Standard)" },
                    { value: "7000", label: "7000 ms (7 Detik)" },
                    { value: "0", label: "0 ms (Tidak Auto-Dismiss / Permanen)" },
                  ]}
                />
              </div>
            </div>

            {/* Action Toggle */}
            <div className="pt-2 flex items-center justify-between border-t border-hairline-soft">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="toast-action-check"
                  checked={includeAction}
                  onChange={(e) => setIncludeAction(e.target.checked)}
                  className="w-4 h-4 rounded text-vibrant-purple focus:ring-vibrant-purple cursor-pointer"
                />
                <label htmlFor="toast-action-check" className="text-xs font-medium text-ink cursor-pointer">
                  Sertakan Tombol Aksi (Action Button)
                </label>
              </div>

              {includeAction && (
                <div className="w-48">
                  <InputApp
                    id="toast-action-label"
                    value={actionLabel}
                    onChange={(e) => setActionLabel(e.target.value)}
                    placeholder="Label Tombol"
                  />
                </div>
              )}
            </div>

            {/* Trigger Button */}
            <div className="pt-2">
              <ButtonApp
                id="toast-trigger-custom"
                variant="purple"
                size="md"
                onClick={triggerCustomToast}
                className="w-full gap-2 py-3"
              >
                <BellRing className="w-4 h-4" />
                Tampilkan Custom Toast
              </ButtonApp>
            </div>
          </div>

          {/* Code Generator & Active Toast Status */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-surface-soft/60 p-4 rounded-xl border border-hairline-soft">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-vibrant-purple-dark" />
                  <TextApp id="code-header" variant="caption" weight="bold" className="uppercase tracking-wider">
                    Generated Usage Code
                  </TextApp>
                </div>
                <ButtonApp
                  id="copy-code-btn"
                  variant="ghost"
                  size="sm"
                  onClick={copyCode}
                  className="h-7 text-xs px-2 gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : null}
                  {copied ? "Tersalin" : "Salin Kode"}
                </ButtonApp>
              </div>

              <pre className="p-3 bg-zinc-950 text-zinc-100 rounded-lg text-[11px] font-mono leading-relaxed overflow-x-auto max-h-[300px]">
                <code>{codeSnippet}</code>
              </pre>
            </div>

            <div className="mt-4 pt-3 border-t border-hairline-soft flex items-center justify-between text-xs text-ink-secondary">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-vibrant-purple" />
                <span>Toast Aktif di Layar: <strong className="text-ink">{toasts.length}</strong></span>
              </div>
              <span>Posisi: <strong className="text-ink">{position}</strong></span>
            </div>
          </div>
        </div>
      </ModuleCard>
    </div>
  );
}
