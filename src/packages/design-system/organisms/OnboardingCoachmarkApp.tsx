import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { ButtonApp } from "../atoms/ButtonApp";
import { TextApp } from "../atoms/TextApp";

export interface CoachmarkStep { id: string; target: string; title: string; description: string; placement?: "top" | "bottom"; }
export interface OnboardingCoachmarkAppProps { id: string; isOpen: boolean; steps: CoachmarkStep[]; currentStep?: number; onStepChange?: (step: number) => void; onComplete: () => void; onSkip?: () => void; }

export function OnboardingCoachmarkApp({ id, isOpen, steps, currentStep, onStepChange, onComplete, onSkip }: OnboardingCoachmarkAppProps) {
  const [internalStep, setInternalStep] = React.useState(0);
  const [rect, setRect] = React.useState<DOMRect | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const activeStep = currentStep ?? internalStep;
  const step = steps[activeStep];
  const setStep = (next: number) => { if (currentStep === undefined) setInternalStep(next); onStepChange?.(next); };

  React.useEffect(() => setMounted(true), []);
  React.useLayoutEffect(() => {
    if (!isOpen || !step) return;
    const update = () => { const target = document.querySelector(step.target); if (target) { target.scrollIntoView({ block: "center", behavior: "smooth" }); setTimeout(() => setRect(target.getBoundingClientRect()), 250); } };
    update(); window.addEventListener("resize", update); return () => window.removeEventListener("resize", update);
  }, [isOpen, step]);

  if (!mounted || !isOpen || !step || !rect) return null;
  const padding = 8;
  const spotlight = { top: Math.max(0, rect.top - padding), left: Math.max(0, rect.left - padding), width: rect.width + padding * 2, height: rect.height + padding * 2 };
  const cardTop = step.placement === "top" ? Math.max(12, spotlight.top - 220) : Math.min(window.innerHeight - 210, spotlight.top + spotlight.height + 12);
  const cardLeft = Math.max(12, Math.min(spotlight.left, window.innerWidth - 348));

  return createPortal(<div id={id} data-ui-id={id} className="fixed inset-0 z-[90]">
    <div className="fixed left-0 right-0 top-0 bg-overlay-scrim" style={{ height: spotlight.top }} />
    <div className="fixed left-0 bg-overlay-scrim" style={{ top: spotlight.top, width: spotlight.left, height: spotlight.height }} />
    <div className="fixed right-0 bg-overlay-scrim" style={{ top: spotlight.top, left: spotlight.left + spotlight.width, height: spotlight.height }} />
    <div className="fixed bottom-0 left-0 right-0 bg-overlay-scrim" style={{ top: spotlight.top + spotlight.height }} />
    <div className="pointer-events-none fixed rounded-[var(--radius-lg)] border-2 border-vibrant-purple shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-vibrant-purple)_22%,transparent)]" style={spotlight} />
    <div role="dialog" aria-modal="true" style={{ top: cardTop, left: cardLeft }} className="fixed w-[336px] max-w-[calc(100vw-24px)] rounded-[var(--radius-lg)] border border-hairline bg-surface p-4 shadow-card">
      <div className="flex items-center justify-between gap-2"><span className="text-[10px] font-bold uppercase tracking-wider text-vibrant-purple-dark">Langkah {activeStep + 1} dari {steps.length}</span>{onSkip && <button type="button" onClick={onSkip} className="text-xs font-semibold text-ink-muted hover:text-ink">Lewati</button>}</div>
      <TextApp id={`${id}-title`} variant="h4" weight="bold" className="mt-2 text-ink">{step.title}</TextApp>
      <TextApp id={`${id}-description`} variant="caption" className="mt-1 text-ink-secondary">{step.description}</TextApp>
      <div className="mt-4 flex items-center justify-between gap-2">
        <ButtonApp id={`${id}-previous`} variant="secondary" size="sm" disabled={activeStep === 0} onClick={() => setStep(activeStep - 1)}>Sebelumnya</ButtonApp>
        <div className="flex gap-1">{steps.map((item, index) => <span key={item.id} className={cn("h-1.5 rounded-full transition-all", index === activeStep ? "w-5 bg-vibrant-purple-dark" : "w-1.5 bg-hairline-hard")} />)}</div>
        <ButtonApp id={`${id}-next`} variant="primary" size="sm" onClick={() => activeStep === steps.length - 1 ? onComplete() : setStep(activeStep + 1)}>{activeStep === steps.length - 1 ? "Selesai" : "Berikutnya"}</ButtonApp>
      </div>
    </div>
  </div>, document.body);
}
