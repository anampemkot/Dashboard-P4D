import * as React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardApp } from "../atoms/CardApp";
import { TextApp } from "../atoms/TextApp";
import { AIOrbApp, type AIOrbSize } from "../atoms/AIOrbApp";
import { AIPromptInputApp, type AIPromptInputAppProps } from "../molecules/AIPromptInputApp";

export interface AIChatSuggestion {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface AIChatEmptyStateAppProps {
  id: string;
  title?: string;
  helperText?: string;
  orbSize?: AIOrbSize;
  suggestions?: AIChatSuggestion[];
  onSuggestionClick?: (suggestion: AIChatSuggestion) => void;
  /** Forwarded to the AIPromptInputApp rendered at the bottom of the card. */
  promptInputProps: Omit<AIPromptInputAppProps, "id">;
  className?: string;
}

const defaultSuggestions: AIChatSuggestion[] = [
  { id: "sugg-1", label: "Ringkas Perda Pajak Daerah Terbaru" },
  { id: "sugg-2", label: "Proyeksi Penerimaan PBB-P2 Triwulan Ini" },
  { id: "sugg-3", label: "Draf Balasan Keberatan Wajib Pajak" },
];

// A welcoming "start a conversation" state for AI chat surfaces: an animated
// orb, a greeting, a few tappable topic suggestions, and the prompt input
// pinned at the bottom — composed entirely from existing atoms/molecules
// (CardApp, TextApp, AIOrbApp, AIPromptInputApp).
export function AIChatEmptyStateApp({
  id,
  title = "Tanyakan apa saja ke AI",
  helperText,
  orbSize = "lg",
  suggestions = defaultSuggestions,
  onSuggestionClick,
  promptInputProps,
  className,
}: AIChatEmptyStateAppProps) {
  return (
    <CardApp id={id} variant="neutral" size="lg" rounded="lg" className={cn("mx-auto flex w-full max-w-[420px] flex-col items-center gap-5 text-center", className)}>
      <AIOrbApp id={`${id}-orb`} size={orbSize} />

      <TextApp id={`${id}-title`} variant="h4" weight="bold" className="text-ink">
        {title}
      </TextApp>

      {suggestions.length > 0 && (
        <div id={`${id}-suggestions`} className="flex w-full flex-wrap items-center justify-center gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              type="button"
              onClick={() => onSuggestionClick?.(suggestion)}
              className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3.5 py-2 text-xs font-medium text-ink-secondary shadow-2xs transition-colors hover:border-vibrant-purple/50 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-surface focus-visible:ring-vibrant-purple-dark/60"
            >
              {suggestion.icon ?? <Sparkles className="h-3.5 w-3.5 text-vibrant-purple-dark" />}
              <span className="text-left">{suggestion.label}</span>
            </button>
          ))}
        </div>
      )}

      <div className="w-full">
        <AIPromptInputApp id={`${id}-prompt`} {...promptInputProps} />
      </div>

      {helperText && (
        <TextApp id={`${id}-helper`} variant="micro" className="text-ink-muted">
          {helperText}
        </TextApp>
      )}
    </CardApp>
  );
}
