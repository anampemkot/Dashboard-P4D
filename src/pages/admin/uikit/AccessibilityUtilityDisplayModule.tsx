import * as React from "react";
import {
  FocusRingApp,
  SkipLinkApp,
  ScreenReaderTextApp,
  TextApp,
  BadgeApp,
  ButtonApp,
} from "@/packages/design-system";
import { Eclipse } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid, ShowcaseGroup } from "./shared/ShowcaseCard";

export function AccessibilityUtilityDisplayModule() {
  const [srPanelOpen, setSrPanelOpen] = React.useState(false);
  const [skipLinkFocused, setSkipLinkFocused] = React.useState(false);

  return (
    <ModuleCard
      id="uikit-accessibility-utility-module"
      icon={<Eclipse className="h-5 w-5 text-vibrant-purple-dark" />}
      title="Accessibility Utilities"
      description="Utilitas aksesibilitas dasar: cincin fokus keyboard (FocusRingApp), tautan lompat ke konten utama (SkipLinkApp), dan teks yang hanya terbaca oleh pembaca layar (ScreenReaderTextApp)."
    >
      <ShowcaseGrid cols={2}>
        {/*
          "Focus Ring" mencampur 3 kombinasi variant+color+offset+width dalam
          satu kartu grid. Dipecah per kombinasi.
        */}
        <ShowcaseGroup id="a11y-group-focus-ring" title="Focus Ring" description="default · custom (color/offset/width dapat diatur) — klik atau Tab ke tombol untuk melihat ring" cols={3}>
          <ShowcaseCard
            id="a11y-showcase-focus-ring-default"
            title="Focus Ring default"
            description="Token --color-focus, offset 2px, width 2px"
            code={`<FocusRingApp id="fr" variant="default">Tombol</FocusRingApp>`}
          >
            <div className="flex flex-col items-center gap-3 rounded-xl border border-hairline-soft bg-surface p-4">
              <BadgeApp id="a11y-showcase-focus-ring-default-badge" variant="solidPurple" size="sm">Default</BadgeApp>
              <FocusRingApp id="a11y-showcase-focus-ring-default-demo" variant="default">Default Focus Ring</FocusRingApp>
            </div>
          </ShowcaseCard>

          <ShowcaseCard
            id="a11y-showcase-focus-ring-custom-success"
            title="Focus Ring custom success"
            description='color="success" offset={4} width={3}'
            code={`<FocusRingApp id="fr" variant="custom" color="success" offset={4} width={3}>Tombol</FocusRingApp>`}
          >
            <div className="flex flex-col items-center gap-3 rounded-xl border border-hairline-soft bg-surface p-4">
              <BadgeApp id="a11y-showcase-focus-ring-custom-success-badge" variant="vibrantPurple" size="sm">Custom · Success</BadgeApp>
              <FocusRingApp id="a11y-showcase-focus-ring-custom-success-demo" variant="custom" color="success" offset={4} width={3}>Custom Ring</FocusRingApp>
            </div>
          </ShowcaseCard>

          <ShowcaseCard
            id="a11y-showcase-focus-ring-custom-warning"
            title="Focus Ring custom warning"
            description='color="warning" offset={0} width={2}'
            code={`<FocusRingApp id="fr" variant="custom" color="warning" offset={0} width={2}>Tombol</FocusRingApp>`}
          >
            <div className="flex flex-col items-center gap-3 rounded-xl border border-hairline-soft bg-surface p-4">
              <BadgeApp id="a11y-showcase-focus-ring-custom-warning-badge" variant="yellow" size="sm">Custom · Warning</BadgeApp>
              <FocusRingApp id="a11y-showcase-focus-ring-custom-warning-demo" variant="custom" color="warning" offset={0} width={2}>Custom Ring</FocusRingApp>
            </div>
          </ShowcaseCard>
        </ShowcaseGroup>

        {/*
          "Skip Link" mencampur variant="hidden" (interactive Tab demo) dan
          variant="visible-on-focus" (static preview) dalam satu kartu.
          Dipecah jadi dua; target lompatan #a11y-skip-target dipertahankan
          hanya pada kartu "hidden" karena hanya demo itu yang benar-benar
          memindahkan fokus.
        */}
        <ShowcaseGroup id="a11y-group-skip-link" title="Skip Link" description="Tautan pintas 'Lewati ke Konten Utama' — hidden (default, coba Tab) · visible-on-focus (pratinjau statis)" cols={2}>
          <ShowcaseCard
            id="a11y-showcase-skip-link-hidden"
            title="Skip Link hidden"
            description="Tersembunyi visual, muncul saat fokus keyboard (Tab) — coba langsung"
            align="start"
            code={`<SkipLinkApp id="sl" targetId="main-content" variant="hidden" label="Lewati ke Konten Utama" position="top-left" />`}
          >
            <div className="w-full space-y-3">
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <BadgeApp id="a11y-showcase-skip-link-hidden-badge" variant="solidPurple" size="sm">Hidden (default) · Coba Langsung</BadgeApp>
                <BadgeApp id="a11y-showcase-skip-link-hidden-focus-badge" variant={skipLinkFocused ? "success" : "neutral"} size="sm">
                  {skipLinkFocused ? "Sedang Difokus — Tautan Muncul" : "Belum Difokus — Tautan Tersembunyi"}
                </BadgeApp>
              </div>
              <TextApp id="a11y-showcase-skip-link-hidden-steps" variant="micro" className="text-ink-muted">
                Langkah coba: klik tombol &quot;① Klik di sini dulu&quot; di bawah, lalu tekan tombol Tab satu kali di keyboard. Tautan skip link akan langsung muncul karena mendapat fokus.
              </TextApp>
              <div className="relative flex h-24 items-center gap-3 overflow-hidden rounded-lg border border-dashed border-hairline-hard bg-surface-soft/40 px-4">
                <ButtonApp id="a11y-showcase-skip-link-hidden-trigger" variant="secondary" size="sm">① Klik di sini dulu</ButtonApp>
                <TextApp id="a11y-showcase-skip-link-hidden-arrow" variant="micro" className="text-ink-muted">→ lalu tekan Tab</TextApp>
                <SkipLinkApp
                  id="a11y-showcase-skip-link-hidden-demo"
                  targetId="a11y-skip-target"
                  variant="hidden"
                  label="② Lewati ke Konten Utama"
                  position="top-left"
                  onFocus={() => setSkipLinkFocused(true)}
                  onBlur={() => setSkipLinkFocused(false)}
                />
              </div>
              <div id="a11y-skip-target" className="rounded-xl border border-dashed border-hairline-hard bg-surface-soft/50 p-3 text-center">
                <TextApp id="a11y-showcase-skip-link-hidden-target-label" variant="micro" className="text-ink-muted">#a11y-skip-target · Target lompatan skip link</TextApp>
              </div>
            </div>
          </ShowcaseCard>

          <ShowcaseCard
            id="a11y-showcase-skip-link-visible-on-focus"
            title="Skip Link visible-on-focus"
            description="Pratinjau statis tampilan setelah mendapat fokus, tanpa perlu menekan Tab"
            align="start"
            code={`<SkipLinkApp id="sl" targetId="main-content" variant="visible-on-focus" label="Lewati ke Konten Utama" position="top-left" />`}
          >
            <div className="relative flex h-16 w-full items-center overflow-hidden rounded-lg border border-dashed border-hairline-hard bg-surface-soft/40 px-4">
              <SkipLinkApp id="a11y-showcase-skip-link-visible-on-focus-demo" targetId="a11y-skip-target" variant="visible-on-focus" label="Lewati ke Konten Utama" position="top-left" />
            </div>
          </ShowcaseCard>
        </ShowcaseGroup>

        <ShowcaseCard
          id="a11y-showcase-screen-reader-text"
          title="Screen Reader Text"
          description="Teks yang secara visual tersembunyi namun tetap terbaca oleh pembaca layar"
          className="md:col-span-2"
          code={`<ButtonApp id="btn" size="iconMd" aria-labelledby="btn-label">\n  <Bookmark />\n  <ScreenReaderTextApp id="btn-label" ariaLabel="Simpan ke bookmark">Simpan ke bookmark</ScreenReaderTextApp>\n</ButtonApp>`}
        >
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-xl border border-hairline-soft bg-surface p-4">
              <TextApp id="srt-example-label" variant="caption" weight="semibold" className="text-ink-secondary">Tombol Icon-only + Label Tersembunyi</TextApp>
              <div className="flex items-center gap-3">
                <ButtonApp id="srt-bookmark-btn" variant="secondary" size="iconMd" rounded="full" aria-labelledby="srt-bookmark-label">
                  <ScreenReaderTextApp id="srt-bookmark-label" ariaLabel="Simpan ke bookmark">Simpan ke bookmark</ScreenReaderTextApp>
                </ButtonApp>
                <ButtonApp id="srt-notif-btn" variant="secondary" size="iconMd" rounded="full" aria-labelledby="srt-notif-label">
                  <ScreenReaderTextApp id="srt-notif-label" ariaLabel="Lihat notifikasi">Lihat notifikasi</ScreenReaderTextApp>
                </ButtonApp>
                <TextApp id="srt-example-hint" variant="micro" className="text-ink-muted">Dua tombol di atas hanya menampilkan ikon namun tetap punya label untuk pembaca layar.</TextApp>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-xl border border-hairline-soft bg-surface p-4">
              <div className="flex items-center justify-between">
                <TextApp id="srt-reveal-label" variant="caption" weight="semibold" className="text-ink-secondary">Ungkap Teks Tersembunyi (demo)</TextApp>
                <ButtonApp id="srt-reveal-toggle" variant="ghost" size="sm" onClick={() => setSrPanelOpen((v) => !v)}>
                  {srPanelOpen ? "Sembunyikan" : "Tampilkan"}
                </ButtonApp>
              </div>
              {srPanelOpen ? (
                <div className="rounded-lg border border-hairline-soft bg-surface-soft/60 p-3 text-xs text-ink">
                  &quot;Simpan ke bookmark&quot; &middot; &quot;Lihat notifikasi&quot;
                </div>
              ) : (
                <TextApp id="srt-reveal-hidden-note" variant="micro" className="text-ink-muted">Secara default teks ini sr-only (disembunyikan secara visual namun tetap ada di DOM).</TextApp>
              )}
            </div>
          </div>
        </ShowcaseCard>
      </ShowcaseGrid>
    </ModuleCard>
  );
}
