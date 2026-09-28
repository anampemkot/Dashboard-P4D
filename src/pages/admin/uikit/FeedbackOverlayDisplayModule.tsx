import * as React from "react";
import {
  AvatarApp, BadgeApp, ButtonApp, DialogApp, EmptyStateApp, InputApp, LightboxApp, OnboardingCoachmarkApp,
  PopoverActionMenuApp, PopoverApp, ProgressIndicatorApp, PullToRefreshApp, SkeletonApp, TextApp,
} from "@/packages/design-system";
import { AlertTriangle, Archive, Bell, Copy, ExternalLink, Eye, Maximize2, MoreHorizontal, Plus, RefreshCw, UserRound, Wifi } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid, ShowcaseGroup } from "./shared/ShowcaseCard";

const gallery = [
  { src: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=85", alt: "Laporan keuangan", caption: "Laporan Keuangan Daerah" },
  { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85", alt: "Analisis pajak", caption: "Analisis Penerimaan Pajak" },
  { src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85", alt: "Rapat koordinasi", caption: "Koordinasi Target PAD" },
];

export function FeedbackOverlayDisplayModule() {
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);
  const [singleLightboxOpen, setSingleLightboxOpen] = React.useState(false);
  const [coachmarkOpen, setCoachmarkOpen] = React.useState(false);
  const [dialog, setDialog] = React.useState<"alert" | "confirmation" | "form" | "full" | null>(null);
  const [actionMessage, setActionMessage] = React.useState("Belum ada aksi dipilih");
  const [lastRefresh, setLastRefresh] = React.useState("Belum diperbarui");
  const popoverActions = [
    { id: "detail", label: "Lihat Detail", icon: <Eye />, shortcut: "Enter", onClick: () => setActionMessage("Popover: Lihat Detail dipilih") },
    { id: "duplicate", label: "Duplikasi Data", icon: <Copy />, shortcut: "⌘D", onClick: () => setActionMessage("Popover: Duplikasi Data dipilih") },
    { id: "archive", label: "Arsipkan", icon: <Archive />, destructive: true, onClick: () => setActionMessage("Popover: Arsipkan dipilih") },
  ];
  // Target coachmark sengaja menunjuk elemen di DALAM kartu-kartu showcase lain
  // (progress, popover user-profile, galeri lightbox). Saat kartu-kartu itu
  // dipecah jadi atomik, ketiga id target ini WAJIB ikut pindah — kalau hilang,
  // spotlight tur onboarding gagal diam-diam tanpa error.
  const steps = [
    { id: "progress", target: "#coachmark-progress-target", title: "Pantau progres proses", description: "Indikator ini menampilkan persentase penyelesaian proses secara real-time.", placement: "bottom" as const },
    { id: "profile", target: "#coachmark-profile-target", title: "Akses profil pengguna", description: "Gunakan menu profil untuk membuka pengaturan akun dan tindakan pengguna.", placement: "bottom" as const },
    { id: "gallery", target: "#coachmark-gallery-target", title: "Buka galeri dokumen", description: "Klik gambar untuk membuka viewer lengkap dengan navigasi dan zoom.", placement: "top" as const },
  ];

  return (
    <ModuleCard
      id="uikit-feedback-overlay-module"
      icon={<Bell className="h-5 w-5 text-vibrant-purple-dark" />}
      title="Feedback & Overlay Components"
      description="Progress, skeleton, empty state, dialog, popover, lightbox, coachmark, dan pull-to-refresh menggunakan foundation serta atom UI Kit."
    >
      <ShowcaseGroup
        id="feedback-group-progress"
        title="Progress Indicator"
        description="type linear / circular × mode determinate / indeterminate"
        cols={4}
      >
        <ShowcaseCard
          id="feedback-showcase-progress-linear-determinate"
          title="Progress linear determinate"
          description="Nilai pasti dengan label dan persentase"
          align="start"
          code={`<ProgressIndicatorApp id="p" value={64} label="Sinkronisasi" showValue color="purple" />`}
        >
          <div id="coachmark-progress-target" className="w-full">
            <ProgressIndicatorApp id="feedback-showcase-progress-linear-determinate-demo" value={64} label="Sinkronisasi data pajak" showValue color="purple" trackColor="purple" />
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          id="feedback-showcase-progress-linear-indeterminate"
          title="Progress linear indeterminate"
          description="Durasi tidak diketahui — bilah berjalan terus"
          align="start"
          code={`<ProgressIndicatorApp id="p" mode="indeterminate" label="Memuat laporan..." color="blue" size="sm" />`}
        >
          <ProgressIndicatorApp id="feedback-showcase-progress-linear-indeterminate-demo" mode="indeterminate" label="Memuat laporan..." color="blue" size="sm" />
        </ShowcaseCard>

        <ShowcaseCard
          id="feedback-showcase-progress-circular-determinate"
          title="Progress circular determinate"
          description="Cincin dengan nilai di tengah"
          code={`<ProgressIndicatorApp id="p" type="circular" value={78} label="Target PAD" showValue size="lg" color="purple" />`}
        >
          <ProgressIndicatorApp id="feedback-showcase-progress-circular-determinate-demo" type="circular" value={78} label="Target PAD" showValue size="lg" color="purple" />
        </ShowcaseCard>

        <ShowcaseCard
          id="feedback-showcase-progress-circular-indeterminate"
          title="Progress circular indeterminate"
          description="Spinner cincin untuk proses tanpa estimasi"
          code={`<ProgressIndicatorApp id="p" type="circular" mode="indeterminate" label="Loading" color="success" />`}
        >
          <ProgressIndicatorApp id="feedback-showcase-progress-circular-indeterminate-demo" type="circular" mode="indeterminate" label="Loading" color="success" />
        </ShowcaseCard>
      </ShowcaseGroup>

      <ShowcaseGroup
        id="feedback-group-skeleton"
        title="Skeleton · Variant"
        description="avatar · text · image — placeholder dengan animasi shimmer"
        cols={3}
      >
        <ShowcaseCard
          id="feedback-showcase-skeleton-variant-avatar"
          title="Skeleton variant avatar"
          description="Placeholder bulat untuk foto profil"
          code={`<SkeletonApp id="s" variant="avatar" tone="medium" opacity="soft" className="h-12 w-12" />`}
        >
          <SkeletonApp id="feedback-showcase-skeleton-variant-avatar-demo" variant="avatar" tone="medium" opacity="soft" className="h-12 w-12" />
        </ShowcaseCard>

        <ShowcaseCard
          id="feedback-showcase-skeleton-variant-text"
          title="Skeleton variant text"
          description="Baris teks — lebar diatur lewat className"
          align="start"
          code={`<SkeletonApp id="s" variant="text" animation="shimmer" rounded="sm" />`}
        >
          <div className="w-full space-y-2">
            <SkeletonApp id="feedback-showcase-skeleton-variant-text-demo" variant="text" animation="shimmer" rounded="sm" />
            <SkeletonApp id="feedback-showcase-skeleton-variant-text-demo-2" variant="text" animation="shimmer" rounded="sm" className="w-2/3" />
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          id="feedback-showcase-skeleton-variant-image"
          title="Skeleton variant image"
          description="Blok gambar dengan rasio tetap"
          align="start"
          code={`<SkeletonApp id="s" variant="image" animation="shimmer" tone="medium" rounded="lg" />`}
        >
          <SkeletonApp id="feedback-showcase-skeleton-variant-image-demo" variant="image" animation="shimmer" tone="medium" rounded="lg" />
        </ShowcaseCard>
      </ShowcaseGroup>

      <ShowcaseGroup
        id="feedback-group-empty-state"
        title="Empty State · Variant"
        description="noData · noSearch · error404 · noInternet"
        cols={4}
      >
        <ShowcaseCard
          id="feedback-showcase-empty-state-variant-no-data"
          title="Empty state variant noData"
          description="Belum ada data sama sekali — aksi utama membuat data baru"
          align="start"
          code={`<EmptyStateApp id="e" variant="noData" size="sm" action={{ label: "Buat Baru", onClick: () => {} }} />`}
        >
          <EmptyStateApp id="feedback-showcase-empty-state-variant-no-data-demo" variant="noData" size="sm" action={{ label: "Buat Baru", icon: <Plus />, onClick: () => setActionMessage("Buat data baru dipilih") }} />
        </ShowcaseCard>

        <ShowcaseCard
          id="feedback-showcase-empty-state-variant-no-search"
          title="Empty state variant noSearch"
          description="Pencarian/filter tidak menemukan hasil"
          align="start"
          code={`<EmptyStateApp id="e" variant="noSearch" size="sm" action={{ label: "Reset Filter", onClick: () => {} }} />`}
        >
          <EmptyStateApp id="feedback-showcase-empty-state-variant-no-search-demo" variant="noSearch" size="sm" action={{ label: "Reset Filter", onClick: () => setActionMessage("Filter dibersihkan") }} />
        </ShowcaseCard>

        <ShowcaseCard
          id="feedback-showcase-empty-state-variant-error404"
          title="Empty state variant error404"
          description="Halaman/route tidak ditemukan"
          align="start"
          code={`<EmptyStateApp id="e" variant="error404" size="sm" action={{ label: "Kembali", onClick: () => {} }} />`}
        >
          <EmptyStateApp id="feedback-showcase-empty-state-variant-error404-demo" variant="error404" size="sm" action={{ label: "Kembali", icon: <RefreshCw />, onClick: () => setActionMessage("Kembali ke halaman utama") }} />
        </ShowcaseCard>

        <ShowcaseCard
          id="feedback-showcase-empty-state-variant-no-internet"
          title="Empty state variant noInternet"
          description="Koneksi terputus — aksi memeriksa jaringan"
          align="start"
          code={`<EmptyStateApp id="e" variant="noInternet" size="sm" action={{ label: "Periksa Koneksi", onClick: () => {} }} />`}
        >
          <EmptyStateApp id="feedback-showcase-empty-state-variant-no-internet-demo" variant="noInternet" size="sm" action={{ label: "Periksa Koneksi", icon: <Wifi />, onClick: () => setActionMessage("Pemeriksaan koneksi dimulai") }} />
        </ShowcaseCard>
      </ShowcaseGroup>

      <ShowcaseGrid cols={1}>
        <ShowcaseCard
          id="feedback-showcase-route-fallback-preview"
          title="Public Route Fallback Preview"
          description="Menampilkan PublicNotFoundPage asli lewat iframe, tanpa mengubah implementasinya"
          align="start"
          code={`<iframe title="Public 404 route fallback preview" src="/route-404-preview" />`}
        >
          <div className="w-full space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <TextApp id="public-404-preview-caption" variant="micro" className="text-ink-muted">Route `*` fallback dirender apa adanya untuk verifikasi visual.</TextApp>
              <ButtonApp id="public-404-open-tab" variant="secondary" size="sm" leftIcon={<ExternalLink />} onClick={() => window.open("/route-404-preview", "_blank", "noopener,noreferrer")}>Buka Tab Baru</ButtonApp>
            </div>
            <div className="h-[420px] overflow-hidden rounded-[var(--radius-lg)] border border-hairline bg-surface">
              <iframe title="Public 404 route fallback preview" src="/route-404-preview" className="h-full w-full bg-canvas" />
            </div>
          </div>
        </ShowcaseCard>
      </ShowcaseGrid>

      <ShowcaseGroup
        id="feedback-group-dialog-type"
        title="Dialog · Type"
        description="alert · confirmation · form · fullScreen — masing-masing instance DialogApp sendiri"
        cols={4}
      >
        <ShowcaseCard
          id="feedback-showcase-dialog-type-alert"
          title="Dialog type alert"
          description="Pemberitahuan satu arah dengan satu tombol konfirmasi"
          code={`<DialogApp id="d" type="alert" size="sm" title="Sesi hampir berakhir" isOpen={open} onClose={...} />`}
        >
          <ButtonApp id="open-alert-dialog" variant="warning" size="sm" onClick={() => setDialog("alert")}>Alert</ButtonApp>
          <DialogApp id="alert-dialog" isOpen={dialog === "alert"} onClose={() => setDialog(null)} title="Sesi hampir berakhir" description="Simpan pekerjaan Anda sebelum sesi berakhir." type="alert" size="sm" icon={<AlertTriangle />} footer={<ButtonApp id="alert-dialog-ok" variant="warning" size="sm" onClick={() => setDialog(null)}>Mengerti</ButtonApp>}>
            <TextApp id="alert-dialog-body" variant="body2" className="text-ink-secondary">Sesi akan berakhir dalam lima menit karena tidak ada aktivitas.</TextApp>
          </DialogApp>
        </ShowcaseCard>

        <ShowcaseCard
          id="feedback-showcase-dialog-type-confirmation"
          title="Dialog type confirmation"
          description="Aksi destruktif — overlay tidak bisa diklik untuk menutup"
          code={`<DialogApp id="d" type="confirmation" size="sm" closeOnOverlayClick={false} isOpen={open} onClose={...} />`}
        >
          <ButtonApp id="open-confirmation-dialog" variant="danger" size="sm" onClick={() => setDialog("confirmation")}>Confirmation</ButtonApp>
          <DialogApp id="confirmation-dialog" isOpen={dialog === "confirmation"} onClose={() => setDialog(null)} title="Hapus data ketetapan?" description="Tindakan ini tidak dapat dibatalkan." type="confirmation" size="sm" icon={<AlertTriangle />} closeOnOverlayClick={false} footer={<><ButtonApp id="confirmation-cancel" variant="secondary" size="sm" onClick={() => setDialog(null)}>Batal</ButtonApp><ButtonApp id="confirmation-submit" variant="danger" size="sm" onClick={() => { setActionMessage("Data berhasil dihapus"); setDialog(null); }}>Hapus Data</ButtonApp></>}>
            <TextApp id="confirmation-body" variant="body2" className="text-ink-secondary">Pastikan data yang dipilih sudah benar sebelum melanjutkan penghapusan.</TextApp>
          </DialogApp>
        </ShowcaseCard>

        <ShowcaseCard
          id="feedback-showcase-dialog-type-form"
          title="Dialog type form"
          description="Isian data di dalam modal dengan aksi Batal/Simpan"
          code={`<DialogApp id="d" type="form" size="md" isOpen={open} onClose={...}>\n  <InputApp id="name" label="Nama" />\n</DialogApp>`}
        >
          <ButtonApp id="open-form-dialog" variant="primary" size="sm" onClick={() => setDialog("form")}>Form</ButtonApp>
          <DialogApp id="form-dialog" isOpen={dialog === "form"} onClose={() => setDialog(null)} title="Tambah Wajib Pajak" description="Lengkapi data utama berikut." type="form" size="md" footer={<><ButtonApp id="form-dialog-cancel" variant="secondary" size="sm" onClick={() => setDialog(null)}>Batal</ButtonApp><ButtonApp id="form-dialog-submit" variant="primary" size="sm" onClick={() => { setActionMessage("Form berhasil disimpan"); setDialog(null); }}>Simpan</ButtonApp></>}>
            <div className="grid gap-4 sm:grid-cols-2">
              <InputApp id="form-dialog-name" label="Nama Wajib Pajak" placeholder="Masukkan nama" />
              <InputApp id="form-dialog-npwpd" label="NPWPD" placeholder="Masukkan NPWPD" />
            </div>
          </DialogApp>
        </ShowcaseCard>

        <ShowcaseCard
          id="feedback-showcase-dialog-type-full-screen"
          title="Dialog type fullScreen"
          description="Workspace penuh layar untuk dokumen dan tabel kompleks"
          code={`<DialogApp id="d" type="fullScreen" isOpen={open} onClose={...} />`}
        >
          <ButtonApp id="open-full-dialog" variant="secondary" size="sm" leftIcon={<Maximize2 />} onClick={() => setDialog("full")}>Full-screen</ButtonApp>
          <DialogApp id="full-dialog" isOpen={dialog === "full"} onClose={() => setDialog(null)} title="Preview Laporan Penerimaan" description="Full-screen workspace untuk dokumen dan tabel kompleks." type="fullScreen" footer={<ButtonApp id="full-dialog-close" variant="primary" size="sm" onClick={() => setDialog(null)}>Selesai</ButtonApp>}>
            <div className="grid min-h-[60vh] place-items-center rounded-lg border border-dashed border-hairline bg-surface-soft">
              <TextApp id="full-dialog-placeholder" variant="h4" weight="bold" className="text-ink-muted">Full-screen Content Area</TextApp>
            </div>
          </DialogApp>
        </ShowcaseCard>
      </ShowcaseGroup>

      <ShowcaseGroup
        id="feedback-group-popover"
        title="Popover"
        description="Empat pemakaian: action menu · konten kaya · profil pengguna · teks sederhana"
        cols={4}
      >
        <ShowcaseCard
          id="feedback-showcase-popover-action-menu"
          title="Popover action menu"
          description='position="bottom" — daftar aksi dengan shortcut dan item destruktif'
          code={`<PopoverApp id="p" position="bottom" trigger={<ButtonApp>Menu</ButtonApp>}>\n  <PopoverActionMenuApp id="m" items={actions} />\n</PopoverApp>`}
        >
          <PopoverApp id="popover-action" position="bottom" trigger={<ButtonApp id="popover-action-trigger" variant="secondary" size="sm" rightIcon={<MoreHorizontal />}>Action Menu</ButtonApp>}>
            <PopoverActionMenuApp id="popover-action-list" label="Aksi Data" items={popoverActions} />
          </PopoverApp>
        </ShowcaseCard>

        <ShowcaseCard
          id="feedback-showcase-popover-rich-content"
          title="Popover rich content"
          description='position="top" — judul, teks, dan progress di dalam popover'
          code={`<PopoverApp id="p" position="top" trigger={<ButtonApp>Rich Content</ButtonApp>}>\n  <TextApp ... /><ProgressIndicatorApp ... />\n</PopoverApp>`}
        >
          <PopoverApp id="popover-rich" position="top" trigger={<ButtonApp id="popover-rich-trigger" variant="secondary" size="sm">Rich Content</ButtonApp>}>
            <TextApp id="popover-rich-title" variant="caption" weight="bold">Realisasi PAD</TextApp>
            <TextApp id="popover-rich-text" variant="caption" className="mt-1 text-ink-secondary">Capaian bulan ini berada 4,2% di atas target periode.</TextApp>
            <ProgressIndicatorApp id="popover-rich-progress" value={84} showValue className="mt-3" />
          </PopoverApp>
        </ShowcaseCard>

        <ShowcaseCard
          id="feedback-showcase-popover-user-profile"
          title="Popover user profile"
          description='position="right" — avatar, identitas, dan aksi buka profil'
          code={`<PopoverApp id="p" position="right" trigger={<ButtonApp>User Profile</ButtonApp>}>\n  <AvatarApp ... /><ButtonApp ... />\n</PopoverApp>`}
        >
          <div id="coachmark-profile-target">
            <PopoverApp id="popover-profile" position="right" trigger={<ButtonApp id="popover-profile-trigger" variant="secondary" size="sm" leftIcon={<UserRound />}>User Profile</ButtonApp>}>
              <div className="flex items-center gap-3">
                <AvatarApp id="popover-avatar" name="Admin BPKAD" size="md" variant="vibrant" />
                <div>
                  <TextApp id="popover-user-name" variant="caption" weight="bold">Admin BPKAD</TextApp>
                  <TextApp id="popover-user-role" variant="micro" className="text-ink-muted">Administrator Sistem</TextApp>
                </div>
              </div>
              <ButtonApp id="popover-profile-action" variant="ghost" size="sm" className="mt-3 w-full">Buka Profil</ButtonApp>
            </PopoverApp>
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          id="feedback-showcase-popover-simple-text"
          title="Popover simple text"
          description='position="left" — isi paling ringkas, hanya satu baris teks'
          code={`<PopoverApp id="p" position="left" trigger={<ButtonApp>Left Position</ButtonApp>}>\n  <TextApp ... />\n</PopoverApp>`}
        >
          <PopoverApp id="popover-left" position="left" trigger={<ButtonApp id="popover-left-trigger" variant="secondary" size="sm">Left Position</ButtonApp>}>
            <TextApp id="popover-left-text" variant="caption" className="text-ink-secondary">Popover di sisi kiri trigger.</TextApp>
          </PopoverApp>
        </ShowcaseCard>
      </ShowcaseGroup>

      <ShowcaseGrid cols={1}>
        <ShowcaseCard
          id="feedback-showcase-action-log"
          title="Log Aksi Overlay"
          description="Menampilkan aksi terakhir dari empty state, popover, dan dialog di atas"
          align="start"
          code={`const [actionMessage, setActionMessage] = useState("Belum ada aksi dipilih");`}
        >
          <TextApp id="empty-action-result" variant="caption" className="block text-ink-muted">{actionMessage}</TextApp>
        </ShowcaseCard>
      </ShowcaseGrid>

      <ShowcaseGroup
        id="feedback-group-lightbox"
        title="Lightbox"
        description="Galeri multi-gambar dengan thumbnail · single image tanpa thumbnail"
        cols={2}
      >
        <ShowcaseCard
          id="feedback-showcase-lightbox-gallery"
          title="Lightbox gallery"
          description="Tiga gambar dengan navigasi dan thumbnail"
          align="start"
          code={`<LightboxApp id="l" isOpen={open} onClose={...} images={gallery} initialIndex={index} />`}
        >
          <div id="coachmark-gallery-target" className="grid w-full grid-cols-3 gap-2">
            {gallery.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => { setLightboxIndex(index); setLightboxOpen(true); }}
                className="overflow-hidden rounded-lg border border-hairline bg-surface"
              >
                <img src={image.src} alt={image.alt} className="aspect-video h-full w-full object-cover transition-opacity hover:opacity-80" />
              </button>
            ))}
          </div>
          <LightboxApp id="feedback-lightbox" isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} images={gallery} initialIndex={lightboxIndex} />
        </ShowcaseCard>

        <ShowcaseCard
          id="feedback-showcase-lightbox-single"
          title="Lightbox single"
          description="Satu gambar — showThumbnails dimatikan"
          align="start"
          code={`<LightboxApp id="l" isOpen={open} onClose={...} images={[image]} showThumbnails={false} />`}
        >
          <div className="flex w-full items-center gap-2">
            <ButtonApp id="single-lightbox-trigger" variant="secondary" size="sm" onClick={() => setSingleLightboxOpen(true)}>Single Image</ButtonApp>
            <BadgeApp id="gallery-lightbox-badge" variant="solidPurple" size="sm">1 Image</BadgeApp>
          </div>
          <LightboxApp id="feedback-single-lightbox" isOpen={singleLightboxOpen} onClose={() => setSingleLightboxOpen(false)} images={[gallery[0]]} showThumbnails={false} />
        </ShowcaseCard>
      </ShowcaseGroup>

      <ShowcaseGrid cols={2}>
        <ShowcaseCard
          id="feedback-showcase-coachmark"
          title="Onboarding Coachmark"
          description="Spotlight tiga elemen di showcase ini secara berurutan"
          code={`<OnboardingCoachmarkApp id="c" isOpen={open} steps={steps} onComplete={...} onSkip={...} />`}
        >
          <div className="flex w-full items-center justify-between gap-3">
            <TextApp id="feedback-coachmark-caption" variant="caption" className="text-ink-muted">Mulai tur untuk melihat spotlight komponen.</TextApp>
            <ButtonApp id="start-coachmark" variant="primary" size="sm" onClick={() => setCoachmarkOpen(true)}>Mulai Tur</ButtonApp>
          </div>
          <OnboardingCoachmarkApp id="feedback-coachmark" isOpen={coachmarkOpen} steps={steps} onComplete={() => setCoachmarkOpen(false)} onSkip={() => setCoachmarkOpen(false)} />
        </ShowcaseCard>

        <ShowcaseCard
          id="feedback-showcase-pull-to-refresh"
          title="Pull to Refresh"
          description="Tarik panel dari posisi paling atas — mouse drag & touch gesture didukung"
          align="start"
          code={`<PullToRefreshApp id="p" onRefresh={async () => { ... }}>\n  {children}\n</PullToRefreshApp>`}
        >
          <PullToRefreshApp
            id="pull-to-refresh-demo"
            onRefresh={async () => {
              await new Promise((resolve) => window.setTimeout(resolve, 900));
              setLastRefresh(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
            }}
            contentClassName="bg-surface-soft"
          >
            <div className="divide-y divide-hairline-soft">
              <div className="flex items-center justify-between gap-3 p-4">
                <div>
                  <TextApp id="pull-item-title" variant="caption" weight="bold">Status Sinkronisasi Data Pajak</TextApp>
                  <TextApp id="pull-item-time" variant="micro" className="mt-1 text-ink-muted">Terakhir diperbarui: {lastRefresh}</TextApp>
                </div>
                <BadgeApp id="pull-item-status" variant="success" size="sm">Online</BadgeApp>
              </div>
              {["PBB-P2 · 12.480 transaksi", "BPHTB · 2.140 transaksi", "PBJT · 8.720 transaksi", "Reklame · 1.850 transaksi", "PAT · 640 transaksi"].map((item, index) => (
                <div key={item} className="flex items-center justify-between p-4 text-xs text-ink">
                  <span>{item}</span>
                  <span className="font-mono text-ink-muted">#{index + 1}</span>
                </div>
              ))}
            </div>
          </PullToRefreshApp>
        </ShowcaseCard>
      </ShowcaseGrid>
    </ModuleCard>
  );
}
