import * as React from "react";
import { Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { AvatarApp } from "../atoms/AvatarApp";

export type ChatMessageVariant = "sent" | "received" | "system";
export type ChatReadReceipt = "sent" | "delivered" | "read";
export interface ChatMessageAppProps extends React.HTMLAttributes<HTMLDivElement> { id: string; variant?: ChatMessageVariant; message: React.ReactNode; timestamp?: string; senderName?: string; avatarSrc?: string; receipt?: ChatReadReceipt; showTail?: boolean; }

export function ChatMessageApp({ id, variant = "received", message, timestamp, senderName, avatarSrc, receipt, showTail = true, className, ...props }: ChatMessageAppProps) {
  if (variant === "system") return <div id={id} data-ui-id={id} className={cn("flex justify-center py-2", className)} {...props}><span className="rounded-full border border-hairline bg-surface-soft px-3 py-1 text-[11px] font-medium text-ink-muted">{message}</span></div>;
  const sent = variant === "sent";
  return <div id={id} data-ui-id={id} className={cn("flex items-end gap-2", sent ? "justify-end" : "justify-start", className)} {...props}>
    {!sent && <AvatarApp id={`${id}-avatar`} src={avatarSrc} name={senderName || "User"} size="sm" variant="default" />}
    <div className={cn("relative max-w-[78%] rounded-[var(--radius-lg)] px-3 py-2 shadow-vibrant-soft", sent ? "bg-vibrant-purple-dark text-white" : "border border-hairline bg-surface text-ink", showTail && sent && "after:absolute after:-right-1 after:bottom-1 after:h-3 after:w-3 after:rotate-45 after:bg-vibrant-purple-dark", showTail && !sent && "before:absolute before:-left-1 before:bottom-1 before:h-3 before:w-3 before:rotate-45 before:border-b before:border-l before:border-hairline before:bg-surface") }>
      {senderName && !sent && <div className="mb-0.5 text-[10px] font-bold text-vibrant-purple-dark">{senderName}</div>}
      <div className="relative z-10 text-sm leading-relaxed">{message}</div>
      {(timestamp || receipt) && <div className={cn("relative z-10 mt-1 flex items-center justify-end gap-1 text-[9px]", sent ? "text-white/75" : "text-ink-muted")}><span>{timestamp}</span>{receipt && (receipt === "sent" ? <Check className="h-3 w-3" /> : <CheckCheck className={cn("h-3 w-3", receipt === "read" && "text-vibrant-blue")} />)}</div>}
    </div>
  </div>;
}
