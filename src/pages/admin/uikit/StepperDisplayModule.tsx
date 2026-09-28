import * as React from "react";
import {
  StepperApp,
  StepItem,
  StepperOrientation,
  StepperType,
  StepperVariant,
  StepperSize,
  StepperRounded,
  ButtonApp,
} from "@/packages/design-system";
import {
  ListTodo,
  Code,
  Check,
  UserCheck,
  FileSpreadsheet,
  Building,
  CreditCard,
  Send,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid } from "./shared/ShowcaseCard";
import { PlaygroundChip } from "./shared/PlaygroundChip";

export function StepperDisplayModule() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [orientation, setOrientation] = React.useState<StepperOrientation>("horizontal");
  const [type, setType] = React.useState<StepperType>("numbered");
  const [variant, setVariant] = React.useState<StepperVariant>("default");
  const [size, setSize] = React.useState<StepperSize>("md");
  const [rounded, setRounded] = React.useState<StepperRounded>("full");
  const [copied, setCopied] = React.useState(false);

  const sampleSteps: StepItem[] = [
    {
      id: "s-01",
      title: "Registrasi Wajib Pajak",
      description: "Pengisian NIK, NPWPD, & data usaha",
      icon: <Building className="w-4 h-4" />,
    },
    {
      id: "s-02",
      title: "Verifikasi Berkas",
      description: "Pemeriksaan kelengkapan dokumen BPKAD",
      icon: <UserCheck className="w-4 h-4" />,
    },
    {
      id: "s-03",
      title: "Penetapan Masa Pajak",
      description: "Perhitungan potensi & SKPD resmi",
      icon: <FileSpreadsheet className="w-4 h-4" />,
    },
    {
      id: "s-04",
      title: "Pembayaran & SKRD",
      description: "Penerbitan kode bayar virtual account",
      icon: <CreditCard className="w-4 h-4" />,
    },
    {
      id: "s-05",
      title: "Penerbitan Tanda Bukti",
      description: "Pengiriman bukti lunas pajak daerah",
      icon: <Send className="w-4 h-4" />,
    },
  ];

  const codeSnippet = `<StepperApp
  id="tax-registration-stepper"
  steps={steps}
  currentStep={${currentStep}}
  orientation="${orientation}"
  type="${type}"
  variant="${variant}"
  size="${size}"
  rounded="${rounded}"
  onStepClick={(idx) => setCurrentStep(idx)}
/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModuleCard
      id="uikit-stepper-module"
      icon={<ListTodo className="w-5 h-5 text-vibrant-purple-dark" />}
      title="StepperApp (Process Workflow & Wizard)"
      description="Indikator langkah pendaftaran & pemeriksaan bertahap dengan orientasi Horizontal/Vertical, tipe Numbered/Icon/Dots, state Aktif/Selesai/Pending, serta jalur konektor responsif."
    >
      <ShowcaseGrid cols={2}>
        <ShowcaseCard
          id="stepper-showcase-numbered"
          title="Horizontal Numbered"
          description='type="numbered" — variant default'
          code={`<StepperApp id="stepper" steps={steps} currentStep={1} type="numbered" variant="default" size="md" />`}
        >
          <StepperApp
            id="demo-stepper-numbered"
            steps={sampleSteps.slice(0, 4)}
            currentStep={1}
            type="numbered"
            variant="default"
            size="md"
          />
        </ShowcaseCard>

        <ShowcaseCard
          id="stepper-showcase-icon"
          title="Horizontal Icon"
          description='type="icon" — variant vibrant'
          code={`<StepperApp id="stepper" steps={steps} currentStep={2} type="icon" variant="vibrant" size="md" />`}
        >
          <StepperApp
            id="demo-stepper-icon"
            steps={sampleSteps.slice(0, 4)}
            currentStep={2}
            type="icon"
            variant="vibrant"
            size="md"
          />
        </ShowcaseCard>

        <ShowcaseCard
          id="stepper-showcase-vertical"
          title="Vertical Timeline"
          description='orientation="vertical" — layout timeline'
          align="start"
          className="md:col-span-2"
          code={`<StepperApp id="stepper" steps={steps} currentStep={1} orientation="vertical" type="numbered" size="sm" />`}
        >
          <div className="flex w-full justify-center py-2">
            <StepperApp
              id="demo-stepper-vertical"
              steps={sampleSteps.slice(0, 3)}
              currentStep={1}
              orientation="vertical"
              type="numbered"
              size="sm"
            />
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          id="stepper-showcase-playground"
          title="Live Interactive Playground"
          description="Konfigurasi lengkap StepperApp dengan kode JSX yang dihasilkan"
          align="start"
          className="md:col-span-2"
        >
          <div className="grid w-full grid-cols-1 gap-6 text-left lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <ButtonApp
                  id="prev-step-btn"
                  variant="outline"
                  size="sm"
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                >
                  Sebelumnya
                </ButtonApp>
                <ButtonApp
                  id="next-step-btn"
                  variant="vibrantPurpleDark"
                  size="sm"
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                  disabled={currentStep === sampleSteps.length - 1}
                  onClick={() => setCurrentStep((prev) => Math.min(sampleSteps.length - 1, prev + 1))}
                >
                  Berikutnya
                </ButtonApp>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink">Type</span>
                  <div className="flex flex-wrap gap-1">
                    {(["numbered", "icon", "dots"] as const).map((t) => (
                      <PlaygroundChip key={t} id={`st-play-type-${t}`} active={type === t} onClick={() => setType(t)} className="flex-1">
                        {t}
                      </PlaygroundChip>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink">Orientation</span>
                  <div className="flex flex-wrap gap-1">
                    {(["horizontal", "vertical"] as const).map((o) => (
                      <PlaygroundChip key={o} id={`st-play-orient-${o}`} active={orientation === o} onClick={() => setOrientation(o)} className="flex-1">
                        {o}
                      </PlaygroundChip>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink">Variant</span>
                  <div className="flex flex-wrap gap-1">
                    {(["default", "vibrant", "outline"] as const).map((v) => (
                      <PlaygroundChip key={v} id={`st-play-variant-${v}`} active={variant === v} onClick={() => setVariant(v)} className="flex-1">
                        {v}
                      </PlaygroundChip>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-ink">Size</span>
                  <div className="flex flex-wrap gap-1">
                    {(["sm", "md", "lg"] as const).map((s) => (
                      <PlaygroundChip key={s} id={`st-play-size-${s}`} active={size === s} onClick={() => setSize(s)} className="flex-1">
                        {s}
                      </PlaygroundChip>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4 rounded-xl border border-hairline-soft bg-surface-soft p-4">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Live Preview (Klik nomor langkah untuk navigasi)</span>
                <div className="flex min-h-[160px] items-center justify-center rounded-lg border border-dashed border-hairline bg-surface p-4">
                  <StepperApp
                    id="interactive-stepper-demo"
                    steps={sampleSteps}
                    currentStep={currentStep}
                    orientation={orientation}
                    type={type}
                    variant={variant}
                    size={size}
                    rounded={rounded}
                    onStepClick={(stepIdx) => setCurrentStep(stepIdx)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                    <Code className="h-3.5 w-3.5" /> Generated JSX Code
                  </span>
                  <ButtonApp
                    id="st-play-copy-jsx"
                    variant="ghost"
                    size="sm"
                    onClick={copyCode}
                    className="h-6 min-h-6 px-2 text-[10px]"
                    leftIcon={copied ? <Check className="w-3 h-3 text-emerald-600" /> : undefined}
                  >
                    {copied ? "Copied!" : "Copy JSX"}
                  </ButtonApp>
                </div>
                <pre className="overflow-x-auto rounded-md bg-zinc-950 p-3 text-[10px] font-mono leading-relaxed text-zinc-100">
                  {codeSnippet}
                </pre>
              </div>
            </div>
          </div>
        </ShowcaseCard>
      </ShowcaseGrid>
    </ModuleCard>
  );
}
