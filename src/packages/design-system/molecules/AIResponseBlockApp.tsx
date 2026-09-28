import * as React from "react";
import { Copy, RefreshCw, ThumbsDown, ThumbsUp, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { AvatarApp } from "../atoms/AvatarApp";
import { ButtonApp } from "../atoms/ButtonApp";
import { TextApp } from "../atoms/TextApp";

export type AIResponseState = "typing" | "completed" | "error";
export interface AICitation { id: string; title: string; url?: string; excerpt?: string; }
export interface AIResponseBlockAppProps extends React.HTMLAttributes<HTMLDivElement> { id: string; state?: AIResponseState; content?: string; errorMessage?: string; citations?: AICitation[]; onCopy?: () => void; onRegenerate?: () => void; onFeedback?: (value: "up" | "down") => void; }

function InlineMarkdown({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return <>{parts.map((part, index) => part.startsWith("**") && part.endsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : <React.Fragment key={index}>{part}</React.Fragment>)}</>;
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.trim().split("\n");
  const nodes: React.ReactNode[] = [];
  let list: string[] = [];
  const flushList = () => { if (list.length) { nodes.push(<ul key={`list-${nodes.length}`} className="list-disc space-y-1 pl-5">{list.map((item, index) => <li key={index}><InlineMarkdown text={item} /></li>)}</ul>); list = []; } };
  let index = 0;
  while (index < lines.length) {
    const line = lines[index].trim();
    if (line.startsWith("- ")) { list.push(line.slice(2)); index += 1; continue; }
    flushList();
    if (line.includes("|") && index + 1 < lines.length && /^\|?\s*:?-+/.test(lines[index + 1].trim())) { const rows = [line.split("|").filter(Boolean).map((cell) => cell.trim())]; index += 2; while (index < lines.length && lines[index].includes("|")) { rows.push(lines[index].split("|").filter(Boolean).map((cell) => cell.trim())); index += 1; } nodes.push(<div key={`table-${index}`} className="overflow-x-auto"><table className="w-full border-collapse text-xs"><thead><tr>{rows[0].map((cell) => <th key={cell} className="border border-hairline bg-surface-soft px-2 py-1.5 text-left"><InlineMarkdown text={cell} /></th>)}</tr></thead><tbody>{rows.slice(1).map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex} className="border border-hairline px-2 py-1.5"><InlineMarkdown text={cell} /></td>)}</tr>)}</tbody></table></div>); continue; }
    if (line) nodes.push(<p key={`p-${index}`}><InlineMarkdown text={line} /></p>);
    index += 1;
  }
  flushList();
  return <div className="space-y-2 text-sm leading-relaxed text-ink-secondary">{nodes}</div>;
}

export function AIResponseBlockApp({ id, state = "completed", content = "", errorMessage = "AI tidak dapat menghasilkan respons.", citations = [], onCopy, onRegenerate, onFeedback, className, ...props }: AIResponseBlockAppProps) {
  return <article id={id} data-ui-id={id} aria-live="polite" className={cn("rounded-[var(--radius-lg)] bg-surface-soft/60 p-4", state === "error" && "bg-error/5", className)} {...props}>
    <div className="flex items-start gap-3">
      <AvatarApp id={`${id}-avatar`} name="AI" size="sm" variant="vibrant" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2"><TextApp id={`${id}-title`} variant="caption" weight="bold">Asisten AI</TextApp>{state === "typing" && <span className="inline-flex gap-1" aria-label="AI sedang mengetik">{[0, 1, 2].map((item) => <span key={item} className="h-1.5 w-1.5 animate-pulse rounded-full bg-vibrant-purple-dark motion-reduce:animate-none" style={{ animationDelay: `${item * 150}ms` }} />)}</span>}</div>
        <div className="mt-2">{state === "error" ? <div className="flex gap-2 rounded-[var(--radius-md)] bg-error/10 p-3 text-sm text-error"><TriangleAlert className="h-4 w-4 shrink-0" />{errorMessage}</div> : <MarkdownContent content={content} />}</div>
        {citations.length > 0 && <div className="mt-4 border-t border-hairline-soft pt-3"><TextApp id={`${id}-sources-title`} variant="micro" weight="bold" className="uppercase tracking-wider text-ink-muted">Sumber</TextApp><div className="mt-2 flex flex-wrap gap-2">{citations.map((citation, index) => <a key={citation.id} href={citation.url} target="_blank" rel="noreferrer" title={citation.excerpt} className="rounded-[var(--radius-md)] border border-hairline bg-surface-soft px-2 py-1 text-[11px] font-medium text-vibrant-purple-dark hover:border-vibrant-purple/40">[{index + 1}] {citation.title}</a>)}</div></div>}
        <div className="mt-3 flex flex-wrap items-center gap-0.5 pt-1"><ButtonApp id={`${id}-copy`} variant="ghost" size="sm" leftIcon={<Copy />} onClick={onCopy} className="h-7 min-h-7 px-2 text-[11px] [&_svg]:h-3.5 [&_svg]:w-3.5">Salin</ButtonApp><ButtonApp id={`${id}-regenerate`} variant="ghost" size="sm" leftIcon={<RefreshCw />} onClick={onRegenerate} className="h-7 min-h-7 px-2 text-[11px] [&_svg]:h-3.5 [&_svg]:w-3.5">Regenerasi</ButtonApp><ButtonApp id={`${id}-up`} variant="icon" size="iconSm" onClick={() => onFeedback?.("up")} aria-label="Respons membantu" className="h-7 min-h-7 w-7 min-w-7 border-0 [&_svg]:h-3.5 [&_svg]:w-3.5"><ThumbsUp /></ButtonApp><ButtonApp id={`${id}-down`} variant="icon" size="iconSm" onClick={() => onFeedback?.("down")} aria-label="Respons tidak membantu" className="h-7 min-h-7 w-7 min-w-7 border-0 [&_svg]:h-3.5 [&_svg]:w-3.5"><ThumbsDown /></ButtonApp></div>
      </div>
    </div>
  </article>;
}
