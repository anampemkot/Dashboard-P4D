import * as React from "react";
import { SignaturePadApp, TextApp, ButtonApp } from "@/packages/design-system";
import { PenLine } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid } from "./shared/ShowcaseCard";

export function SignaturePadDisplayModule() {
  const [variant, setVariant] = React.useState<"draw" | "type" | "upload">("draw");
  const [lastSaved, setLastSaved] = React.useState<string | null>(null);

  return (
    <ModuleCard
      id="demo-signature-pad"
      icon={<PenLine className="h-5 w-5 text-vibrant-purple-dark" />}
      title="Signature Pad (SignaturePadApp)"
      description="Tanda tangan digital dengan tiga mode: Draw (gambar tangan/mouse), Type (nama diketik gaya cursive), dan Upload (unggah gambar tanda tangan) — berbagi container canvas/preview dan tombol aksi Clear/Reset & Save/Confirm yang konsisten."
    >
      <ShowcaseGrid cols={1}>
        <ShowcaseCard
          id="signature-pad-showcase-modes"
          title="Draw, Type, & Upload Signature"
          description="Ketiga mode signature pad dengan tombol aksi konsisten"
          align="start"
          code={`<SignaturePadApp id="sigpad" variant="draw" penColor="purple" penThickness={2} onSave={(dataUrl) => {}} />`}
        >
          <div className="w-full space-y-4">
            <div className="flex flex-wrap gap-2">
              <ButtonApp id="sigpad-tab-draw" variant={variant === "draw" ? "primary" : "secondary"} size="sm" onClick={() => setVariant("draw")}>Draw</ButtonApp>
              <ButtonApp id="sigpad-tab-type" variant={variant === "type" ? "primary" : "secondary"} size="sm" onClick={() => setVariant("type")}>Type</ButtonApp>
              <ButtonApp id="sigpad-tab-upload" variant={variant === "upload" ? "primary" : "secondary"} size="sm" onClick={() => setVariant("upload")}>Upload</ButtonApp>
            </div>

            <div className="rounded-2xl border border-hairline-soft bg-surface-soft/40 p-4 sm:p-6">
              <SignaturePadApp id={`sigpad-preview-${variant}`} variant={variant} penColor="purple" penThickness={2} onSave={(dataUrl) => setLastSaved(dataUrl)} />
            </div>

            <TextApp id="sigpad-save-status" variant="micro" className="text-center text-ink-muted">
              {lastSaved ? "Tanda tangan tersimpan (demo, tidak dikirim ke server)." : "Belum ada tanda tangan tersimpan."}
            </TextApp>
          </div>
        </ShowcaseCard>
      </ShowcaseGrid>
    </ModuleCard>
  );
}
