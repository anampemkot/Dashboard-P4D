import * as React from "react";
import {
  AIResponseBlockApp, AIPromptInputApp, AIChatEmptyStateApp, AIChatSuggestion, AIPromptHeroApp, BadgeApp, ButtonApp, CardApp, ChatMessageApp,
  LocationPickerApp, MapsApp, TextApp, VerificationApp,
} from "@/packages/design-system";
import { Bot, MapPinned, MessageCircle, ShieldCheck, Sparkles, WandSparkles, Paperclip, Figma, ChevronDown } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid, ShowcaseGroup } from "./shared/ShowcaseCard";

const markers = [
  { id: "bpkad", position: [-7.8014, 110.3647] as [number, number], title: "BPKAD Kota Yogyakarta", address: "Jl. Kenari, Yogyakarta", badge: "B", color: "purple" as const },
  { id: "malioboro", position: [-7.7925, 110.3658] as [number, number], title: "Kawasan Malioboro", address: "Jl. Malioboro", badge: "M", color: "blue" as const },
];

const RESPONSE_MARKDOWN = `**Ringkasan capaian PAD Juli 2026**\n- Realisasi mencapai **78,8%** dari target tahunan.\n- PBJT menjadi kontributor pertumbuhan tertinggi.\n| Jenis Pajak | Capaian | Status |\n|---|---|---|\n| PBB-P2 | 82% | Baik |\n| PBJT | 91% | Sangat Baik |`;

export function AdvancedAIDisplayModule() {
  const [generating, setGenerating] = React.useState(false);
  const [recording, setRecording] = React.useState(false);
  const [lastPrompt, setLastPrompt] = React.useState("Analisis capaian PAD bulan Juli 2026");
  const [responseState, setResponseState] = React.useState<"typing" | "completed" | "error">("completed");
  const [location, setLocation] = React.useState<[number, number] | null>([-7.8014, 110.3647]);
  const [aiAction, setAiAction] = React.useState("Belum ada action response");
  const submitPrompt = (value: string) => { setLastPrompt(value); setGenerating(true); setResponseState("typing"); window.setTimeout(() => { setGenerating(false); setResponseState("completed"); }, 1500); };
  const [emptyStateValue, setEmptyStateValue] = React.useState("");
  const [emptyStateNote, setEmptyStateNote] = React.useState("Ketuk salah satu topik atau ketik pertanyaan sendiri.");
  const [heroNote, setHeroNote] = React.useState("Belum ada prompt dikirim.");

  return (
    <ModuleCard
      id="demo-advanced-ai"
      icon={<Bot className="h-5 w-5 text-vibrant-purple-dark" />}
      title="Advanced AI & Verification"
      description="AI Prompt Hero, chat empty state, prompt/response composer, chat bubble, maps/location picker, dan verification (captcha) — seluruh pola AI & verifikasi P4D BPKAD Kota Yogyakarta."
    >
      <ShowcaseGrid cols={1}>
        <ShowcaseCard
          id="advanced-ai-showcase-prompt-hero"
          title="AI Prompt Hero"
          description="Layout hero landing page: judul besar, subjudul, dan composer prompt besar dengan toolbar pill"
          align="start"
          code={`<AIPromptHeroApp\n  id="ai-prompt-hero"\n  title="..."\n  subtitle="..."\n  onSubmit={(value) => {}}\n  toolbarActions={[...]}\n/>`}
        >
          <div className="w-full rounded-2xl border border-hairline-soft bg-surface-soft/40 px-4 py-10 sm:px-8">
            <AIPromptHeroApp
              id="ai-prompt-hero"
              title="Rancang Analisis Lebih Cerdas dengan AI"
              subtitle="Hasilkan ringkasan, proyeksi, dan draf laporan pajak daerah secara instan, lalu sesuaikan hasilnya sesuai kebutuhan."
              placeholder="Tuliskan permintaan analisis Anda..."
              onSubmit={(value) => setHeroNote(`Terkirim: "${value}"`)}
              toolbarActions={[
                { id: "builder", label: "Prompt Builder", icon: <WandSparkles className="h-4 w-4" />, onClick: () => setHeroNote("Membuka Prompt Builder") },
                { id: "model", label: "GPT-5", icon: <Sparkles className="h-4 w-4" />, trailingIcon: <ChevronDown className="h-4 w-4" />, onClick: () => setHeroNote("Membuka pilihan model") },
                { id: "attach", label: "Attach", icon: <Paperclip className="h-4 w-4" />, onClick: () => setHeroNote("Membuka lampiran berkas") },
                { id: "figma", icon: <Figma className="h-4 w-4" />, onClick: () => setHeroNote("Membuka integrasi Figma") },
              ]}
            />
          </div>
          <TextApp id="ai-prompt-hero-note" variant="micro" className="mt-3 text-center text-ink-muted">{heroNote}</TextApp>
        </ShowcaseCard>

        <ShowcaseCard
          id="advanced-ai-showcase-chat-empty-state"
          title="AI Chat Empty State"
          description="Orb bergradasi animasi, sapaan, topik prompt cepat (helper), dan composer di bagian bawah"
          align="start"
          code={`<AIChatEmptyStateApp\n  id="ai-chat-empty-state"\n  title="Tanya Super AI apa saja"\n  suggestions={[...]}\n  promptInputProps={{ value, onValueChange, onSubmit }}\n/>`}
        >
          <AIChatEmptyStateApp
            id="ai-chat-empty-state"
            title="Tanya Super AI apa saja"
            helperText={emptyStateNote}
            suggestions={[
              { id: "sugg-pbb", label: "Ringkasan PBB-P2 Bulan Ini" },
              { id: "sugg-bphtb", label: "Proyeksi BPHTB Triwulan" },
            ] as AIChatSuggestion[]}
            onSuggestionClick={(s) => { setEmptyStateValue(s.label); setEmptyStateNote(`Topik dipilih: "${s.label}"`); }}
            promptInputProps={{
              value: emptyStateValue,
              onValueChange: setEmptyStateValue,
              onSubmit: (value) => { setEmptyStateNote(`Terkirim: "${value}"`); setEmptyStateValue(""); },
              placeholder: "Message",
            }}
          />
        </ShowcaseCard>
      </ShowcaseGrid>

      <ShowcaseGroup
        id="advanced-ai-group-prompt-input"
        title="Prompt Input"
        description="standard · enableAttachments · enableVoice + isGenerating/onStop"
        cols={3}
      >
        <ShowcaseCard
          id="advanced-ai-showcase-prompt-input-standard"
          title="Prompt Input standard"
          description="Composer dasar tanpa lampiran maupun voice"
          align="start"
          code={`<AIPromptInputApp id="ai-prompt" onSubmit={submitPrompt} placeholder="Prompt standar..." />`}
        >
          <AIPromptInputApp id="advanced-ai-showcase-prompt-input-standard-demo" onSubmit={submitPrompt} placeholder="Prompt standar..." />
        </ShowcaseCard>

        <ShowcaseCard
          id="advanced-ai-showcase-prompt-input-attachments"
          title="Prompt Input attachments"
          description="enableAttachments — tombol lampirkan berkas aktif"
          align="start"
          code={`<AIPromptInputApp id="ai-prompt" onSubmit={submitPrompt} enableAttachments placeholder="Lampirkan dokumen..." />`}
        >
          <AIPromptInputApp id="advanced-ai-showcase-prompt-input-attachments-demo" onSubmit={submitPrompt} enableAttachments placeholder="Lampirkan dokumen..." />
        </ShowcaseCard>

        <ShowcaseCard
          id="advanced-ai-showcase-prompt-input-voice"
          title="Prompt Input voice"
          description="enableVoice + isGenerating/onStop — rekam suara dan hentikan generasi"
          align="start"
          code={`<AIPromptInputApp\n  id="ai-prompt"\n  onSubmit={submitPrompt}\n  enableVoice\n  isRecording={recording}\n  onVoiceToggle={setRecording}\n  isGenerating={generating}\n  onStop={() => setGenerating(false)}\n/>`}
        >
          <AIPromptInputApp
            id="advanced-ai-showcase-prompt-input-voice-demo"
            defaultValue={lastPrompt}
            onSubmit={submitPrompt}
            isGenerating={generating}
            onStop={() => { setGenerating(false); setResponseState("error"); }}
            enableVoice
            isRecording={recording}
            onVoiceToggle={setRecording}
          />
        </ShowcaseCard>
      </ShowcaseGroup>

      <ShowcaseGrid cols={1}>
        <ShowcaseCard
          id="advanced-ai-showcase-response-block"
          title="AI Response Block"
          description="Lifecycle typing/completed/error dengan safe Markdown, tabel, citations, copy, regenerate, dan feedback"
          align="start"
          code={`<AIResponseBlockApp\n  id="ai-response"\n  state={responseState}\n  content={markdown}\n  citations={[...]}\n  onCopy={...}\n  onRegenerate={...}\n  onFeedback={...}\n/>`}
        >
          <CardApp id="ai-response-card" className="w-full space-y-4 p-4 md:p-6">
            <div className="flex flex-wrap gap-2">
              <ButtonApp id="response-typing" variant="secondary" size="sm" onClick={() => setResponseState("typing")}>Typing</ButtonApp>
              <ButtonApp id="response-complete" variant="secondary" size="sm" onClick={() => setResponseState("completed")}>Completed</ButtonApp>
              <ButtonApp id="response-error" variant="secondary" size="sm" onClick={() => setResponseState("error")}>Error</ButtonApp>
            </div>
            <AIResponseBlockApp
              id="ai-response-demo"
              state={responseState}
              content={RESPONSE_MARKDOWN}
              citations={[
                { id: "apbd", title: "APBD Kota Yogyakarta 2026", url: "https://jogjakota.go.id", excerpt: "Dokumen target pendapatan daerah." },
                { id: "bpkad", title: "Realisasi BPKAD Juli", url: "https://bpkad.jogjakota.go.id" },
              ]}
              onCopy={() => { navigator.clipboard?.writeText("Ringkasan capaian PAD Juli 2026"); setAiAction("Respons disalin"); }}
              onRegenerate={() => { setAiAction("Respons diregenerasi"); submitPrompt(lastPrompt); }}
              onFeedback={(value) => setAiAction(value === "up" ? "Respons dinilai membantu" : "Respons dinilai tidak membantu")}
            />
            <TextApp id="ai-action-feedback" variant="micro" className="text-ink-muted">{aiAction}</TextApp>
          </CardApp>
        </ShowcaseCard>
      </ShowcaseGrid>

      <ShowcaseGroup
        id="advanced-ai-group-chat-variant"
        title="Chat Message · Variant"
        description="received · sent · system — tail, timestamp, avatar, dan read receipt"
        cols={3}
      >
        <ShowcaseCard
          id="advanced-ai-showcase-chat-variant-received"
          title="Chat variant received"
          description="Balon pesan masuk dengan nama pengirim dan timestamp"
          code={`<ChatMessageApp id="chat" variant="received" senderName="Petugas BPKAD" message="..." timestamp="09.30" />`}
        >
          <ChatMessageApp id="advanced-ai-showcase-chat-variant-received-demo" variant="received" senderName="Petugas BPKAD" message="Selamat pagi, ada yang dapat kami bantu?" timestamp="09.30" />
        </ShowcaseCard>

        <ShowcaseCard
          id="advanced-ai-showcase-chat-variant-sent"
          title="Chat variant sent"
          description="Balon pesan keluar dengan read receipt"
          code={`<ChatMessageApp id="chat" variant="sent" message="..." timestamp="09.31" receipt="read" />`}
        >
          <ChatMessageApp id="advanced-ai-showcase-chat-variant-sent-demo" variant="sent" message="Saya ingin memeriksa status pembayaran PBB-P2." timestamp="09.31" receipt="read" />
        </ShowcaseCard>

        <ShowcaseCard
          id="advanced-ai-showcase-chat-variant-system"
          title="Chat variant system"
          description="Notifikasi sistem di tengah percakapan, tanpa avatar"
          code={`<ChatMessageApp id="chat" variant="system" message="Percakapan diamankan oleh sistem P4D" />`}
        >
          <ChatMessageApp id="advanced-ai-showcase-chat-variant-system-demo" variant="system" message="Percakapan diamankan oleh sistem P4D" />
        </ShowcaseCard>
      </ShowcaseGroup>

      <ShowcaseGroup
        id="advanced-ai-group-verification-checkbox"
        title="Verification · Checkbox"
        description="Lifecycle idle → loading → success / error"
        cols={3}
      >
        <ShowcaseCard
          id="advanced-ai-showcase-verification-checkbox"
          title="Verification Checkbox"
          description="Klik untuk memverifikasi — validasi server-side mengembalikan sukses"
          code={`<VerificationApp id="verification" onVerify={async () => { /* validasi server-side */ return true; }} />`}
        >
          <VerificationApp id="advanced-ai-showcase-verification-checkbox-demo" onVerify={async () => { await new Promise((resolve) => setTimeout(resolve, 900)); return true; }} />
        </ShowcaseCard>

        <ShowcaseCard
          id="advanced-ai-showcase-verification-checkbox-error"
          title="Verification Checkbox error"
          description="Validasi gagal — komponen kembali ke state error"
          code={`<VerificationApp id="verification" onVerify={async () => false} />`}
        >
          <VerificationApp id="advanced-ai-showcase-verification-checkbox-error-demo" onVerify={async () => { await new Promise((resolve) => setTimeout(resolve, 900)); return false; }} />
        </ShowcaseCard>

        <ShowcaseCard
          id="advanced-ai-showcase-verification-checkbox-success"
          title="Verification Checkbox success"
          description='state="success" — sudah terverifikasi, dipinjam terbuka untuk dokumentasi'
          code={`<VerificationApp id="verification" state="success" onVerify={() => true} />`}
        >
          <VerificationApp id="advanced-ai-showcase-verification-checkbox-success-demo" state="success" onVerify={() => true} />
        </ShowcaseCard>
      </ShowcaseGroup>

      <ShowcaseGroup
        id="advanced-ai-group-verification-puzzle"
        title="Verification · Puzzle"
        description='variant="puzzle" — geser puzzle piece ke ujung kanan track'
        cols={3}
      >
        <ShowcaseCard
          id="advanced-ai-showcase-verification-puzzle"
          title="Verification Puzzle"
          description="Geser hingga ujung kanan — validasi server-side mengembalikan sukses"
          code={`<VerificationApp id="verification" variant="puzzle" onVerify={async () => { /* validasi server-side */ return true; }} />`}
        >
          <VerificationApp id="advanced-ai-showcase-verification-puzzle-demo" variant="puzzle" onVerify={async () => { await new Promise((resolve) => setTimeout(resolve, 900)); return true; }} />
        </ShowcaseCard>

        <ShowcaseCard
          id="advanced-ai-showcase-verification-puzzle-error"
          title="Verification Puzzle error"
          description="Validasi gagal — puzzle kembali ke posisi awal"
          code={`<VerificationApp id="verification" variant="puzzle" onVerify={async () => false} />`}
        >
          <VerificationApp id="advanced-ai-showcase-verification-puzzle-error-demo" variant="puzzle" onVerify={async () => { await new Promise((resolve) => setTimeout(resolve, 900)); return false; }} />
        </ShowcaseCard>

        <ShowcaseCard
          id="advanced-ai-showcase-verification-puzzle-success"
          title="Verification Puzzle success"
          description='state="success" — sudah terverifikasi, dipinjam terbuka untuk dokumentasi'
          code={`<VerificationApp id="verification" variant="puzzle" state="success" onVerify={() => true} />`}
        >
          <VerificationApp id="advanced-ai-showcase-verification-puzzle-success-demo" variant="puzzle" state="success" onVerify={() => true} />
        </ShowcaseCard>
      </ShowcaseGroup>

      <ShowcaseGroup
        id="advanced-ai-group-maps"
        title="Maps & Location"
        description="Static map · interactive map dengan markers & zoom · location picker dengan pin drop"
        cols={2}
      >
        <ShowcaseCard
          id="advanced-ai-showcase-map-static"
          title="Map static"
          description='mode="static" — peta non-interaktif untuk menampilkan satu koordinat'
          align="start"
          code={`<LocationPickerApp id="static-location" mode="static" value={location} height={280} />`}
        >
          <LocationPickerApp id="advanced-ai-showcase-map-static-demo" mode="static" value={location} height={280} />
        </ShowcaseCard>

        <ShowcaseCard
          id="advanced-ai-showcase-map-interactive"
          title="Map interactive"
          description="MapsApp dengan markers dan kontrol zoom"
          align="start"
          code={`<MapsApp id="maps" center={[-7.8014, 110.3647]} markers={markers} height={280} />`}
        >
          <MapsApp id="advanced-ai-showcase-map-interactive-demo" center={[-7.8014, 110.3647]} markers={markers} height={280} showSearch={false} showCategoryFilter={false} showDetailCard={false} />
        </ShowcaseCard>

        <ShowcaseCard
          id="advanced-ai-showcase-location-picker"
          title="Location Picker"
          description="Pin drop interaktif — koordinat terpilih dikembalikan lewat onValueChange"
          align="start"
          className="md:col-span-2"
          code={`<LocationPickerApp id="location-picker" value={location} onValueChange={setLocation} markers={markers} height={340} />`}
        >
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between gap-2">
              <TextApp id="location-picker-title" variant="caption" weight="bold">Koordinat terpilih</TextApp>
              <BadgeApp id="location-coordinate" variant="solidPurple" size="sm">{location ? location.map((item) => item.toFixed(4)).join(", ") : "No Pin"}</BadgeApp>
            </div>
            <LocationPickerApp id="advanced-ai-showcase-location-picker-demo" value={location} onValueChange={setLocation} markers={markers} height={340} />
          </div>
        </ShowcaseCard>
      </ShowcaseGroup>
    </ModuleCard>
  );
}
