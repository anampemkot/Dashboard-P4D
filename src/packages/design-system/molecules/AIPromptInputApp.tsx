import * as React from "react";
import { Mic, Paperclip, Send, Square, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonApp } from "../atoms/ButtonApp";
import { TextAreaApp } from "../atoms/TextAreaApp";

export interface AIPromptAttachment { id: string; name: string; size?: number; file?: File; }
export interface AIPromptInputAppProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  id: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSubmit: (value: string, attachments: AIPromptAttachment[]) => void;
  isGenerating?: boolean;
  onStop?: () => void;
  attachments?: AIPromptAttachment[];
  onAttachmentsChange?: (attachments: AIPromptAttachment[]) => void;
  enableAttachments?: boolean;
  enableVoice?: boolean;
  isRecording?: boolean;
  onVoiceToggle?: (recording: boolean) => void;
  placeholder?: string;
  maxRows?: number;
}

export function AIPromptInputApp({ id, value, defaultValue = "", onValueChange, onSubmit, isGenerating = false, onStop, attachments, onAttachmentsChange, enableAttachments = false, enableVoice = false, isRecording = false, onVoiceToggle, placeholder = "Tanyakan sesuatu kepada AI...", maxRows = 6, className, ...props }: AIPromptInputAppProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [internalAttachments, setInternalAttachments] = React.useState<AIPromptAttachment[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const currentValue = value ?? internalValue;
  const currentAttachments = attachments ?? internalAttachments;
  const setPrompt = (next: string) => { if (value === undefined) setInternalValue(next); onValueChange?.(next); };
  const setAttachments = (next: AIPromptAttachment[]) => { if (attachments === undefined) setInternalAttachments(next); onAttachmentsChange?.(next); };
  const submit = () => { const trimmed = currentValue.trim(); if (!trimmed || isGenerating) return; onSubmit(trimmed, currentAttachments); setPrompt(""); };

  return <div id={id} data-ui-id={id} className={cn("rounded-[var(--radius-lg)] border border-hairline bg-surface p-1.5 transition-colors focus-within:border-vibrant-purple-dark focus-within:ring-1 focus-within:ring-vibrant-purple/20", className)} {...props}>
    {currentAttachments.length > 0 && <div className="flex flex-wrap gap-1 px-1.5 pt-1">{currentAttachments.map((attachment) => <span key={attachment.id} className="inline-flex max-w-full items-center gap-1 rounded-[var(--radius-sm)] bg-vibrant-purple/10 px-1.5 py-1 text-[10px] font-medium text-vibrant-purple-dark"><Paperclip className="h-2.5 w-2.5 shrink-0" /><span className="truncate">{attachment.name}</span><button type="button" onClick={() => setAttachments(currentAttachments.filter((item) => item.id !== attachment.id))} className="rounded-sm p-0.5 hover:bg-vibrant-purple/15" aria-label={`Hapus ${attachment.name}`}><X className="h-2.5 w-2.5" /></button></span>)}</div>}
    <TextAreaApp id={`${id}-textarea`} variant="minimal" value={currentValue} onChange={(event) => setPrompt(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); submit(); } }} placeholder={placeholder} autoResize minRows={1} maxRows={maxRows} resize="none" rounded="none" size="sm" className="min-h-9 px-1 py-0.5" containerClassName="gap-0" />
    <div className="flex items-center justify-between gap-2 px-0.5 pb-0.5">
      <div className="flex items-center gap-1">
        {enableAttachments && <><input ref={fileInputRef} type="file" multiple className="hidden" onChange={(event) => { const next = Array.from(event.target.files || []).map((file) => ({ id: `${file.name}-${file.lastModified}`, name: file.name, size: file.size, file })); setAttachments([...currentAttachments, ...next]); event.target.value = ""; }} /><ButtonApp id={`${id}-attachment`} variant="icon" size="iconSm" onClick={() => fileInputRef.current?.click()} aria-label="Tambah lampiran" className="h-7 min-h-7 w-7 min-w-7 border-0 text-ink-muted hover:bg-action-hover hover:text-ink [&_svg]:h-3.5 [&_svg]:w-3.5"><Paperclip /></ButtonApp></>}
        {enableVoice && <ButtonApp id={`${id}-voice`} variant={isRecording ? "error" : "icon"} size="iconSm" onClick={() => onVoiceToggle?.(!isRecording)} aria-label={isRecording ? "Hentikan input suara" : "Mulai input suara"} className={cn("h-7 min-h-7 w-7 min-w-7 border-0 [&_svg]:h-3.5 [&_svg]:w-3.5", !isRecording && "text-ink-muted hover:bg-action-hover hover:text-ink", isRecording && "animate-pulse motion-reduce:animate-none")}><Mic /></ButtonApp>}
        {isRecording && <span className="text-[10px] font-semibold text-error">Merekam...</span>}
      </div>
      {isGenerating ? <ButtonApp id={`${id}-stop`} variant="error" size="iconSm" onClick={onStop} aria-label="Hentikan generasi" className="h-7 min-h-7 w-7 min-w-7 [&_svg]:h-3 [&_svg]:w-3"><Square /></ButtonApp> : <ButtonApp id={`${id}-send`} variant="primary" size="iconSm" onClick={submit} disabled={!currentValue.trim()} aria-label="Kirim prompt" className="h-7 min-h-7 w-7 min-w-7 [&_svg]:h-3.5 [&_svg]:w-3.5"><Send /></ButtonApp>}
    </div>
  </div>;
}
