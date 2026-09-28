import * as React from "react";
import { Eraser, Check, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardApp } from "../atoms/CardApp";
import { TextApp } from "../atoms/TextApp";
import { ButtonApp } from "../atoms/ButtonApp";
import { InputApp } from "../atoms/InputApp";
import { FormFieldApp } from "../molecules/FormFieldApp";
import { FileUploadApp, type FileUploadItem } from "../molecules/FileUploadApp";

export type SignaturePadVariant = "draw" | "type" | "upload";

export type SignaturePadPenColor = "ink" | "blue" | "purple";

const penColorHex: Record<SignaturePadPenColor, string> = {
  ink: "#1a1a1a",
  blue: "#1e3a8a",
  purple: "#6d28d9",
};

export interface SignaturePadAppProps {
  id: string;
  variant?: SignaturePadVariant;
  penColor?: SignaturePadPenColor;
  penThickness?: 1 | 2 | 3 | 4;
  onSave?: (dataUrl: string | null) => void;
  className?: string;
}

function DrawPad({ id, penColor, penThickness, onSave }: Required<Pick<SignaturePadAppProps, "id" | "penColor" | "penThickness" | "onSave">>) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const drawingRef = React.useRef(false);
  const [hasDrawing, setHasDrawing] = React.useState(false);

  const getContext = () => canvasRef.current?.getContext("2d") ?? null;

  const getPoint = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = getContext();
    if (!ctx) return;
    drawingRef.current = true;
    const { x, y } = getPoint(event);
    ctx.beginPath();
    ctx.moveTo(x, y);
    (event.target as HTMLCanvasElement).setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const ctx = getContext();
    if (!ctx) return;
    const { x, y } = getPoint(event);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = penColorHex[penColor];
    ctx.lineWidth = penThickness * 1.5;
    ctx.lineTo(x, y);
    ctx.stroke();
    if (!hasDrawing) setHasDrawing(true);
  };

  const handlePointerUp = () => {
    drawingRef.current = false;
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = getContext();
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawing(false);
    onSave(null);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onSave(canvas.toDataURL("image/png"));
  };

  return (
    <div className="flex flex-col gap-3">
      <canvas
        id={`${id}-canvas`}
        ref={canvasRef}
        width={560}
        height={200}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="w-full max-w-full touch-none rounded-[var(--radius-md)] border border-dashed border-hairline-hard bg-surface-soft/40"
        style={{ aspectRatio: "560 / 200" }}
      />
      {!hasDrawing && (
        <TextApp id={`${id}-canvas-hint`} variant="micro" className="text-center text-ink-muted">
          Gambar tanda tangan Anda di area di atas menggunakan mouse atau sentuhan (touch).
        </TextApp>
      )}
      <div className="flex flex-wrap justify-end gap-2">
        <ButtonApp id={`${id}-clear`} variant="secondary" size="sm" leftIcon={<Eraser className="h-4 w-4" />} onClick={handleClear}>
          Clear / Reset
        </ButtonApp>
        <ButtonApp id={`${id}-save`} variant="primary" size="sm" leftIcon={<Check className="h-4 w-4" />} onClick={handleSave} disabled={!hasDrawing}>
          Save / Confirm
        </ButtonApp>
      </div>
    </div>
  );
}

function TypePad({ id, penColor, onSave }: { id: string; penColor: SignaturePadPenColor; onSave: (dataUrl: string | null) => void }) {
  const [typedName, setTypedName] = React.useState("");

  return (
    <div className="flex flex-col gap-3">
      <FormFieldApp id={`${id}-type-field`} label="Ketik Nama Lengkap">
        <InputApp id={`${id}-type-input`} value={typedName} onChange={(event) => setTypedName(event.target.value)} placeholder="cth. Budi Santoso" />
      </FormFieldApp>
      <div
        id={`${id}-type-preview`}
        className="flex min-h-[100px] items-center justify-center rounded-[var(--radius-md)] border border-dashed border-hairline-hard bg-surface-soft/40 px-4 py-6"
      >
        {typedName.trim() ? (
          <span className="max-w-full truncate text-4xl" style={{ fontFamily: "cursive", color: penColorHex[penColor] }}>
            {typedName}
          </span>
        ) : (
          <TextApp id={`${id}-type-placeholder`} variant="micro" className="text-ink-muted">
            Pratinjau tanda tangan akan muncul di sini
          </TextApp>
        )}
      </div>
      <div className="flex flex-wrap justify-end gap-2">
        <ButtonApp id={`${id}-type-clear`} variant="secondary" size="sm" leftIcon={<Eraser className="h-4 w-4" />} onClick={() => { setTypedName(""); onSave(null); }}>
          Clear / Reset
        </ButtonApp>
        <ButtonApp id={`${id}-type-save`} variant="primary" size="sm" leftIcon={<Check className="h-4 w-4" />} disabled={!typedName.trim()} onClick={() => onSave(typedName)}>
          Save / Confirm
        </ButtonApp>
      </div>
    </div>
  );
}

function UploadPad({ id, onSave }: { id: string; onSave: (dataUrl: string | null) => void }) {
  const [files, setFiles] = React.useState<FileUploadItem[]>([]);

  return (
    <div className="flex flex-col gap-3">
      <FileUploadApp
        id={`${id}-upload`}
        variant="dropzone"
        accept="image/*"
        files={files}
        onFileSelect={(selected) => {
          const mapped: FileUploadItem[] = selected.map((file, index) => ({
            id: `${id}-file-${index}-${file.name}`,
            file,
            name: file.name,
            size: file.size,
            type: file.type,
            status: "completed",
            progress: 100,
          }));
          setFiles(mapped);
          const first = selected[0];
          if (first) {
            const reader = new FileReader();
            reader.onload = () => onSave(typeof reader.result === "string" ? reader.result : null);
            reader.readAsDataURL(first);
          }
        }}
        onFileRemove={() => {
          setFiles([]);
          onSave(null);
        }}
        label="Unggah Gambar Tanda Tangan"
        description="Format PNG/JPG, latar belakang transparan direkomendasikan."
      />
    </div>
  );
}

export function SignaturePadApp({
  id,
  variant = "draw",
  penColor = "ink",
  penThickness = 2,
  onSave,
  className,
}: SignaturePadAppProps) {
  const handleSave = (dataUrl: string | null) => onSave?.(dataUrl);

  return (
    <CardApp id={id} variant="neutral" size="md" rounded="lg" className={cn("mx-auto w-full max-w-[600px] gap-4", className)}>
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vibrant-purple/15 text-vibrant-purple-dark">
          <PenLine className="h-4 w-4" />
        </div>
        <TextApp id={`${id}-title`} variant="h6" className="text-ink">
          {variant === "draw" ? "Draw Signature" : variant === "type" ? "Type Signature" : "Upload Signature"}
        </TextApp>
      </div>

      {variant === "draw" && <DrawPad id={id} penColor={penColor} penThickness={penThickness} onSave={handleSave} />}
      {variant === "type" && <TypePad id={id} penColor={penColor} onSave={handleSave} />}
      {variant === "upload" && <UploadPad id={id} onSave={handleSave} />}
    </CardApp>
  );
}
