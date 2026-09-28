import * as React from "react";
import { Lightbulb, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { DialogApp } from "./DialogApp";
import { BadgeApp } from "../atoms/BadgeApp";
import { TextApp } from "../atoms/TextApp";

/**
 * Unified insight-dialog content shape — modeled directly on the NPL Gross
 * brief (Ringkasan / Kondisi Saat Ini / Insight / Rekomendasi Taktis &
 * Strategis / Smart Glosarium / Catatan Data). Deliberately typed rather
 * than free-form markdown so every insight dialog in the app renders with
 * the same section order and can be validated/generated consistently.
 */
export interface InsightContent {
  title: string;
  value?: string;
  status?: "kritis" | "waspada" | "sehat";
  /** e.g. ["Indikator", "NPL Gross", "Jan – Agustus 2026"] */
  meta?: string[];
  summary?: string;
  /** Kondisi Saat Ini — bullet list. */
  current?: string[];
  /** Insight — bullet list. */
  insights?: string[];
  /** Rekomendasi Taktis (0–30 hari). */
  tacticalRecs?: string[];
  /** Rekomendasi Strategis (3–6 bulan). */
  strategicRecs?: string[];
  glossary?: { term: string; expansion?: string; definition: string }[];
  /** Catatan Data — bullet list. */
  dataNotes?: string[];
}

const statusBadgeVariant: Record<NonNullable<InsightContent["status"]>, "error" | "warning" | "success"> = {
  kritis: "error",
  waspada: "warning",
  sehat: "success",
};

function BulletList({ id, items }: { id: string; items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, index) => (
        <li key={`${id}-${index}`} className="flex gap-2 text-xs leading-relaxed text-ink-secondary">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-vibrant-purple-dark" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="space-y-2">
      <TextApp id={`${id}-title`} variant="caption" weight="bold" className="uppercase tracking-wider text-ink-muted">
        {title}
      </TextApp>
      {children}
    </div>
  );
}

/** Renders the full body of an insight dialog from an `InsightContent` object. */
export function InsightDialogBody({ id, content }: { id: string; content: InsightContent }) {
  return (
    <div className="space-y-5 text-left">
      {(content.value || content.meta?.length) && (
        <div className="flex flex-wrap items-center gap-2 border-b border-hairline-soft pb-4">
          {content.value && (
            <TextApp id={`${id}-value`} variant="h3" weight="bold" className="text-ink">
              {content.value}
            </TextApp>
          )}
          {content.status && (
            <BadgeApp id={`${id}-status`} variant={statusBadgeVariant[content.status]} size="sm">
              {content.status}
            </BadgeApp>
          )}
          {content.meta?.map((m, i) => (
            <span key={`${id}-meta-${i}`} className="text-[11px] text-ink-muted">
              {i > 0 && "· "}
              {m}
            </span>
          ))}
        </div>
      )}

      {content.summary && (
        <Section id={`${id}-summary`} title="Ringkasan">
          <TextApp id={`${id}-summary-text`} variant="body" className="text-xs leading-relaxed text-ink-secondary">
            {content.summary}
          </TextApp>
        </Section>
      )}

      {content.current && content.current.length > 0 && (
        <Section id={`${id}-current`} title="Kondisi Saat Ini">
          <BulletList id={`${id}-current`} items={content.current} />
        </Section>
      )}

      {content.insights && content.insights.length > 0 && (
        <Section id={`${id}-insights`} title="Insight">
          <BulletList id={`${id}-insights`} items={content.insights} />
        </Section>
      )}

      {content.tacticalRecs && content.tacticalRecs.length > 0 && (
        <Section id={`${id}-tactical`} title="Rekomendasi Taktis (0–30 hari)">
          <BulletList id={`${id}-tactical`} items={content.tacticalRecs} />
        </Section>
      )}

      {content.strategicRecs && content.strategicRecs.length > 0 && (
        <Section id={`${id}-strategic`} title="Rekomendasi Strategis (3–6 bulan)">
          <BulletList id={`${id}-strategic`} items={content.strategicRecs} />
        </Section>
      )}

      {content.glossary && content.glossary.length > 0 && (
        <Section id={`${id}-glossary`} title="Smart Glosarium">
          <div className="grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
            {content.glossary.map((g, i) => (
              <div key={`${id}-glossary-${i}`} className="flex gap-1.5 text-xs leading-relaxed">
                <BookOpen className="mt-0.5 h-3 w-3 shrink-0 text-vibrant-purple-dark" />
                <span className="text-ink-secondary">
                  <strong className="text-ink">{g.term}</strong>
                  {g.expansion && <span className="text-ink-muted"> — {g.expansion}</span>} — {g.definition}
                </span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {content.dataNotes && content.dataNotes.length > 0 && (
        <Section id={`${id}-data-notes`} title="Catatan Data">
          <BulletList id={`${id}-data-notes`} items={content.dataNotes} />
        </Section>
      )}
    </div>
  );
}

export interface InsightAppProps {
  id: string;
  content: InsightContent;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Hides the built-in bulb trigger — use when a parent renders its own trigger and only needs the dialog (controlled via `open`/`onOpenChange`). */
  hideTrigger?: boolean;
  triggerClassName?: string;
}

/**
 * Single primitive for the "insight" pattern used across CardApp and
 * ScorecardApp: a lightbulb trigger that opens a rich, structured dialog
 * (see `InsightContent`) — distinct from the lighter formula/period/source
 * PopoverApp tooltip (`ScorecardInfoContent`), which stays a quick-glance
 * affordance. This is the trigger for the deep-dive analysis dialog.
 */
export function InsightApp({ id, content, open, onOpenChange, hideTrigger, triggerClassName }: InsightAppProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = open ?? internalOpen;
  const setOpen = (next: boolean) => {
    if (open === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <>
      {!hideTrigger && (
        <button
          type="button"
          id={`${id}-trigger`}
          data-ui-id={`${id}-trigger`}
          onClick={(event) => {
            event.stopPropagation();
            setOpen(true);
          }}
          aria-label={`Lihat insight ${content.title}`}
          title="Lihat insight"
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-full p-1 text-ink-muted transition-colors hover:bg-vibrant-purple/10 hover:text-vibrant-purple-dark",
            triggerClassName
          )}
        >
          <Lightbulb className="h-3.5 w-3.5" />
        </button>
      )}
      <DialogApp
        id={`${id}-dialog`}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        title={content.title}
        size="lg"
        icon={<Lightbulb className="h-5 w-5 text-vibrant-purple-dark" />}
      >
        <InsightDialogBody id={`${id}-dialog-body`} content={content} />
      </DialogApp>
    </>
  );
}
