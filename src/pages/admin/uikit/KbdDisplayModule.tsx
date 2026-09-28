import * as React from "react";
import { KbdApp } from "@/packages/design-system";
import { Keyboard } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid, ShowcaseGroup } from "./shared/ShowcaseCard";

export function KbdDisplayModule() {
  return (
    <ModuleCard
      id="uikit-kbd-module"
      icon={<Keyboard className="h-5 w-5 text-vibrant-purple-dark" />}
      title="KbdApp"
      description="Representasi visual tombol keyboard fisik untuk pintasan (shortcut) — single key dan combination — dengan efek 3D border & bottom shadow, P4D BPKAD Kota Yogyakarta."
    >
      <ShowcaseGrid cols={2}>
        <ShowcaseCard
          id="kbd-showcase-single"
          title="Single Key"
          description="Satu tombol keyboard tunggal, umum untuk shortcut sederhana (mis. Esc)"
          code={`<KbdApp id="k" keys={["Esc"]} />\n<KbdApp id="k" keys={["Enter"]} />\n<KbdApp id="k" keys={["Tab"]} />`}
        >
          <KbdApp id="kbd-single-esc" keys={["Esc"]} />
          <KbdApp id="kbd-single-enter" keys={["Enter"]} />
          <KbdApp id="kbd-single-tab" keys={["Tab"]} />
          <KbdApp id="kbd-single-k" keys={["K"]} />
          <KbdApp id="kbd-single-space" keys={["Space"]} />
        </ShowcaseCard>

        <ShowcaseCard
          id="kbd-showcase-combination"
          title="Combination (Cmd+C)"
          description="Kombinasi beberapa tombol dipisah separator untuk shortcut kompleks"
          code={`<KbdApp id="k" keys={["Cmd", "C"]} />\n<KbdApp id="k" keys={["Cmd", "Shift", "P"]} />\n<KbdApp id="k" keys={["Ctrl", "K"]} separator="/" />`}
        >
          <KbdApp id="kbd-combo-copy" keys={["Cmd", "C"]} />
          <KbdApp id="kbd-combo-paste" keys={["Cmd", "V"]} />
          <KbdApp id="kbd-combo-save" keys={["Ctrl", "S"]} />
          <KbdApp id="kbd-combo-palette" keys={["Cmd", "Shift", "P"]} />
          <KbdApp id="kbd-combo-search" keys={["Ctrl", "K"]} separator="/" />
        </ShowcaseCard>

      </ShowcaseGrid>

      {/*
        "Single Key" & "Combination" tetap 1 kartu masing-masing (KEEP) --
        `keys` bukan union prop berhingga (bebas array string apa pun), jadi
        tidak ada axis untuk dienumerasi. Beberapa contoh sekaligus di sini
        mengajarkan relasi/pola pemakaian, bukan memvariasikan satu prop --
        sama seperti kriteria KEEP untuk palette/token grid.
      */}
      <ShowcaseGroup id="kbd-group-size" title="Ukuran" description="sm · md (default) · lg" cols={3}>
        <ShowcaseCard
          id="kbd-showcase-size-sm"
          title="Ukuran sm"
          description="Kbd paling ringkas"
          code={`<KbdApp id="k" keys={["Cmd", "K"]} size="sm" />`}
        >
          <KbdApp id="kbd-showcase-size-sm-demo" keys={["Cmd", "K"]} size="sm" />
        </ShowcaseCard>

        <ShowcaseCard
          id="kbd-showcase-size-md"
          title="Ukuran md"
          description="Ukuran standar katalog"
          code={`<KbdApp id="k" keys={["Cmd", "K"]} size="md" />`}
        >
          <KbdApp id="kbd-showcase-size-md-demo" keys={["Cmd", "K"]} size="md" />
        </ShowcaseCard>

        <ShowcaseCard
          id="kbd-showcase-size-lg"
          title="Ukuran lg"
          description="Kbd paling menonjol"
          code={`<KbdApp id="k" keys={["Cmd", "K"]} size="lg" />`}
        >
          <KbdApp id="kbd-showcase-size-lg-demo" keys={["Cmd", "K"]} size="lg" />
        </ShowcaseCard>
      </ShowcaseGroup>

      <ShowcaseGrid cols={2}>

        <ShowcaseCard
          id="kbd-showcase-context"
          title="Contoh Pemakaian dalam Konteks"
          description="Dipasangkan dengan teks deskriptif, mirip CommandPaletteApp / daftar shortcut"
          align="start"
          code={`<div className="flex items-center justify-between">\n  <span>Buka Command Palette</span>\n  <KbdApp id="k" keys={["Cmd", "K"]} size="sm" />\n</div>`}
        >
          <div className="w-full flex flex-col gap-2">
            <div className="flex items-center justify-between border-b border-hairline-soft py-2 text-sm">
              <span className="text-ink-secondary">Buka Command Palette</span>
              <KbdApp id="kbd-ctx-palette" keys={["Cmd", "K"]} size="sm" />
            </div>
            <div className="flex items-center justify-between border-b border-hairline-soft py-2 text-sm">
              <span className="text-ink-secondary">Simpan Perubahan</span>
              <KbdApp id="kbd-ctx-save" keys={["Ctrl", "S"]} size="sm" />
            </div>
            <div className="flex items-center justify-between py-2 text-sm">
              <span className="text-ink-secondary">Tutup Dialog</span>
              <KbdApp id="kbd-ctx-close" keys={["Esc"]} size="sm" />
            </div>
          </div>
        </ShowcaseCard>
      </ShowcaseGrid>
    </ModuleCard>
  );
}
