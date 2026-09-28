import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { TextApp } from "../atoms/TextApp";
import { ButtonApp } from "../atoms/ButtonApp";
import { BadgeApp } from "../atoms/BadgeApp";
import {
  UploadCloud,
  File,
  FileText,
  Image as ImageIcon,
  FileArchive,
  FileAudio,
  FileVideo,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Camera,
  Trash2,
} from "lucide-react";

export type FileUploadVariant = "default" | "dropzone" | "avatar";
export type FileUploadSize = "sm" | "md" | "lg";
export type FileUploadRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type FileItemStatus = "uploading" | "completed" | "error";

export interface FileUploadItem {
  id: string;
  file?: File;
  name: string;
  size: number; // in bytes
  type?: string;
  progress?: number; // 0 to 100
  status?: FileItemStatus;
  errorMessage?: string;
  url?: string;
}

export interface FileUploadAppProps {
  id: string;
  variant?: FileUploadVariant;
  accept?: string;
  maxSize?: number; // in bytes or MB (e.g., 10 * 1024 * 1024 for 10MB)
  multiple?: boolean;
  disabled?: boolean;
  size?: FileUploadSize;
  rounded?: FileUploadRounded;
  label?: React.ReactNode;
  description?: React.ReactNode;
  helperText?: React.ReactNode;
  files?: FileUploadItem[];
  defaultFiles?: FileUploadItem[];
  onFileSelect?: (files: File[]) => void;
  onFileRemove?: (fileId: string) => void;
  avatarUrl?: string;
  onAvatarChange?: (file: File) => void;
  maxFiles?: number;
  className?: string;
  containerClassName?: string;
}

const roundedClasses: Record<FileUploadRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const dropzonePaddingVariants: Record<FileUploadSize, string> = {
  sm: "p-3 min-h-[110px]",
  md: "p-4 min-h-[150px]", // Step 4 spacing (16px)
  lg: "p-6 min-h-[190px]", // Step 6 spacing (24px)
};

const avatarSizeVariants: Record<FileUploadSize, string> = {
  sm: "w-20 h-20",
  md: "w-28 h-28",
  lg: "w-36 h-36",
};

export const formatFileSize = (bytes: number): string => {
  if (bytes <= 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const getFileIcon = (mimeOrName: string) => {
  const lower = mimeOrName.toLowerCase();
  if (lower.includes("image") || /\.(jpg|jpeg|png|gif|svg|webp)$/.test(lower)) {
    return <ImageIcon className="w-5 h-5 text-vibrant-purple-dark shrink-0" />;
  }
  if (lower.includes("pdf") || lower.includes("doc") || /\.(pdf|doc|docx|txt)$/.test(lower)) {
    return <FileText className="w-5 h-5 text-blue-500 shrink-0" />;
  }
  if (lower.includes("zip") || lower.includes("rar") || /\.(zip|rar|7z|tar|gz)$/.test(lower)) {
    return <FileArchive className="w-5 h-5 text-amber-500 shrink-0" />;
  }
  if (lower.includes("audio") || /\.(mp3|wav|ogg)$/.test(lower)) {
    return <FileAudio className="w-5 h-5 text-emerald-500 shrink-0" />;
  }
  if (lower.includes("video") || /\.(mp4|mov|avi|mkv)$/.test(lower)) {
    return <FileVideo className="w-5 h-5 text-purple-500 shrink-0" />;
  }
  return <File className="w-5 h-5 text-slate-400 shrink-0" />;
};

export const FileUploadApp = React.forwardRef<HTMLDivElement, FileUploadAppProps>(
  (
    {
      id,
      variant = "dropzone",
      accept,
      maxSize,
      multiple = false,
      disabled = false,
      size = "md",
      rounded = "lg",
      label,
      description,
      helperText = "SVG, PNG, JPG or PDF up to 10MB",
      files,
      defaultFiles = [],
      onFileSelect,
      onFileRemove,
      avatarUrl,
      onAvatarChange,
      maxFiles,
      className,
      containerClassName,
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = React.useState<boolean>(false);
    const [internalFiles, setInternalFiles] = React.useState<FileUploadItem[]>(defaultFiles);
    const [avatarPreview, setAvatarPreview] = React.useState<string | undefined>(avatarUrl);

    React.useEffect(() => {
      if (files !== undefined) {
        setInternalFiles(files);
      }
    }, [files]);

    React.useEffect(() => {
      if (avatarUrl !== undefined) {
        setAvatarPreview(avatarUrl);
      }
    }, [avatarUrl]);

    const activeFilesList = files !== undefined ? files : internalFiles;

    const handleFilesAdded = (incomingFiles: File[]) => {
      if (disabled || incomingFiles.length === 0) return;

      // Filter by accept & maxSize if provided
      let validFiles = incomingFiles;
      if (maxSize) {
        const bytesMax = maxSize < 1000 ? maxSize * 1024 * 1024 : maxSize;
        validFiles = validFiles.filter((f) => f.size <= bytesMax);
      }

      if (!multiple && validFiles.length > 0) {
        validFiles = [validFiles[0]];
      }

      if (maxFiles && activeFilesList.length + validFiles.length > maxFiles) {
        validFiles = validFiles.slice(0, Math.max(0, maxFiles - activeFilesList.length));
      }

      if (validFiles.length === 0) return;

      onFileSelect?.(validFiles);

      if (variant === "avatar" && validFiles[0]) {
        const file = validFiles[0];
        const previewUrl = URL.createObjectURL(file);
        setAvatarPreview(previewUrl);
        onAvatarChange?.(file);
        return;
      }

      if (files === undefined) {
        const newItems: FileUploadItem[] = validFiles.map((f) => {
          const isImg = f.type.startsWith("image/");
          return {
            id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            file: f,
            name: f.name,
            size: f.size,
            type: f.type,
            progress: 100,
            status: "completed",
            url: isImg ? URL.createObjectURL(f) : undefined,
          };
        });
        setInternalFiles((prev) => (multiple ? [...prev, ...newItems] : newItems));
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFilesAdded(Array.from(e.target.files));
        // Reset input value so the same file can be re-uploaded if needed
        e.target.value = "";
      }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFilesAdded(Array.from(e.dataTransfer.files));
      }
    };

    const triggerClick = () => {
      if (disabled) return;
      inputRef.current?.click();
    };

    const removeItem = (fileId: string) => {
      if (disabled) return;
      onFileRemove?.(fileId);
      if (files === undefined) {
        setInternalFiles((prev) => prev.filter((item) => item.id !== fileId));
      }
    };

    const roundedClass = roundedClasses[rounded];

    return (
      <div
        id={`${id}-container`}
        ref={ref}
        data-ui-id={id}
        className={cn("flex flex-col gap-2 w-full text-left select-none", containerClassName)}
      >
        {/* Hidden File Input */}
        <input
          ref={inputRef}
          id={`${id}-input`}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          className="hidden"
        />

        {/* Step 2 Spacing (8px / gap-2): Top Label & Description */}
        {(label || description) && (
          <div className="flex flex-col text-left gap-0.5">
            {label &&
              (typeof label === "string" ? (
                <TextApp
                  id={`${id}-label`}
                  variant="body"
                  weight="semibold"
                  className={cn("text-ink leading-snug", disabled && "text-ink-muted")}
                >
                  {label}
                </TextApp>
              ) : (
                label
              ))}
            {description &&
              (typeof description === "string" ? (
                <TextApp id={`${id}-desc`} variant="caption" className="text-ink-muted leading-tight">
                  {description}
                </TextApp>
              ) : (
                description
              ))}
          </div>
        )}

        {/* VARIANT: AVATAR / CIRCULAR UPLOAD */}
        {variant === "avatar" ? (
          <div className="flex items-center gap-4">
            <div
              id={`${id}-avatar-zone`}
              onClick={triggerClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "relative flex items-center justify-center overflow-hidden border-2 border-dashed transition-all cursor-pointer group shrink-0 bg-surface",
                avatarSizeVariants[size],
                rounded === "full" ? "rounded-full" : roundedClass,
                isDragging
                  ? "border-vibrant-purple-dark bg-vibrant-purple/10 dark:bg-vibrant-purple-dark/20 ring-4 ring-vibrant-purple-dark/20 scale-105"
                  : "border-slate-300 dark:border-slate-600 hover:border-vibrant-purple-dark hover:bg-surface-soft",
                disabled && "opacity-50 cursor-not-allowed pointer-events-none border-slate-200 dark:border-slate-700",
                className
              )}
            >
              {avatarPreview ? (
                <img src={avatarPreview} alt="Uploaded avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center gap-1 text-slate-400 group-hover:text-vibrant-purple-dark">
                  <Camera className="w-6 h-6" />
                  <TextApp id={`${id}-avatar-text`} variant="caption" weight="medium" className="text-[10px] leading-none">
                    Upload
                  </TextApp>
                </div>
              )}

              {/* Hover overlay label */}
              <div className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-5 h-5 mb-0.5" />
                <TextApp id={`${id}-avatar-hover-text`} variant="caption" weight="semibold" className="text-[10px] text-white">
                  Change
                </TextApp>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-left">
              <ButtonApp
                id={`${id}-avatar-btn`}
                type="button"
                variant="outline"
                size="sm"
                disabled={disabled}
                onClick={triggerClick}
              >
                Choose Photo
              </ButtonApp>
              {helperText && (
                <TextApp id={`${id}-avatar-helper`} variant="caption" className="text-ink-muted text-[11px]">
                  {helperText}
                </TextApp>
              )}
            </div>
          </div>
        ) : variant === "default" ? (
          /* VARIANT: STANDARD CLICK TO UPLOAD */
          <div className="flex flex-col gap-3">
            <div
              id={`${id}-default-zone`}
              onClick={triggerClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "flex items-center justify-between p-3 border border-dashed rounded-lg bg-surface transition-all cursor-pointer",
                isDragging
                  ? "border-vibrant-purple-dark bg-vibrant-purple/10 dark:bg-vibrant-purple-dark/20"
                  : "border-slate-300 dark:border-slate-600 hover:border-vibrant-purple-dark hover:bg-surface-soft",
                disabled && "opacity-50 cursor-not-allowed pointer-events-none",
                roundedClass,
                className
              )}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-vibrant-purple/10 text-vibrant-purple-dark dark:bg-vibrant-purple-dark/20 dark:text-vibrant-purple-light">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left gap-0.5">
                  <TextApp id={`${id}-default-inst`} variant="body" weight="semibold" className="text-ink text-sm">
                    Select a file or drag here
                  </TextApp>
                  {helperText && (
                    <TextApp id={`${id}-default-helper`} variant="caption" className="text-ink-muted text-xs">
                      {helperText}
                    </TextApp>
                  )}
                </div>
              </div>

              <ButtonApp
                id={`${id}-default-btn`}
                type="button"
                variant="outline"
                size="sm"
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  triggerClick();
                }}
              >
                Browse File
              </ButtonApp>
            </div>
          </div>
        ) : (
          /* VARIANT: DROPZONE (LARGE AREA) */
          <div
            id={`${id}-dropzone`}
            onClick={triggerClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "flex flex-col items-center justify-center text-center border-2 border-dashed bg-surface transition-all cursor-pointer select-none",
              dropzonePaddingVariants[size],
              roundedClass,
              isDragging
                ? "border-vibrant-purple-dark bg-vibrant-purple/10 dark:bg-vibrant-purple-dark/20 ring-4 ring-vibrant-purple-dark/15 scale-[1.005]"
                : "border-slate-300 dark:border-slate-600 hover:border-vibrant-purple-dark hover:bg-surface-soft/80",
              disabled && "opacity-50 cursor-not-allowed pointer-events-none border-slate-200 dark:border-slate-700",
              className
            )}
          >
            {/* Step 1.5 Spacing (6px / gap-1.5): Icon to Instruction Text */}
            <div className="flex flex-col items-center justify-center gap-1.5">
              <div className="p-3 rounded-full bg-vibrant-purple/10 dark:bg-vibrant-purple-dark/20 text-vibrant-purple-dark dark:text-vibrant-purple-light mb-1">
                <UploadCloud className="w-7 h-7" />
              </div>

              <div className="flex items-center gap-1 flex-wrap justify-center">
                <TextApp id={`${id}-inst-action`} variant="body" weight="semibold" className="text-vibrant-purple-dark underline underline-offset-2">
                  Click to upload
                </TextApp>
                <TextApp id={`${id}-inst-drag`} variant="body" className="text-ink-muted">
                  or drag and drop file here
                </TextApp>
              </div>

              {helperText && (
                <TextApp id={`${id}-helper-text`} variant="caption" className="text-ink-muted text-xs mt-0.5">
                  {typeof helperText === "string" ? helperText : helperText}
                </TextApp>
              )}
            </div>
          </div>
        )}

        {/* UPLOADED FILE LIST ITEMS */}
        {activeFilesList.length > 0 && variant !== "avatar" && (
          <div className="flex flex-col gap-2 mt-2">
            <TextApp id={`${id}-files-count`} variant="caption" weight="bold" className="text-ink-muted uppercase tracking-wider text-[11px]">
              Uploaded Files ({activeFilesList.length})
            </TextApp>

            {activeFilesList.map((fileItem) => {
              const isUploading = fileItem.status === "uploading";
              const isError = fileItem.status === "error";
              const isSuccess = fileItem.status === "completed" || (!isUploading && !isError);
              const pct = fileItem.progress !== undefined ? fileItem.progress : 100;

              return (
                <div
                  key={fileItem.id}
                  id={`${id}-file-item-${fileItem.id}`}
                  className={cn(
                    "flex flex-col p-2.5 border border-hairline-soft bg-surface rounded-lg transition-all text-left",
                    roundedClass
                  )}
                >
                  {/* Step 2 Spacing (8px / gap-2): Inner Elements */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      {/* File Icon or Thumbnail Preview */}
                      {fileItem.url ? (
                        <img
                          src={fileItem.url}
                          alt={fileItem.name}
                          className="w-9 h-9 rounded object-cover border border-hairline-soft shrink-0"
                        />
                      ) : (
                        <div className="p-2 rounded bg-vibrant-grey-bg/60 shrink-0">
                          {getFileIcon(fileItem.type || fileItem.name)}
                        </div>
                      )}

                      <div className="flex flex-col min-w-0 flex-1">
                        <TextApp
                          id={`${id}-file-name-${fileItem.id}`}
                          variant="body"
                          weight="semibold"
                          className="text-ink text-xs truncate leading-snug"
                        >
                          {fileItem.name}
                        </TextApp>
                        <div className="flex items-center gap-2">
                          <TextApp
                            id={`${id}-file-size-${fileItem.id}`}
                            variant="caption"
                            className="text-ink-muted text-[11px]"
                          >
                            {formatFileSize(fileItem.size)}
                          </TextApp>

                          {fileItem.errorMessage && (
                            <TextApp
                              id={`${id}-file-err-${fileItem.id}`}
                              variant="caption"
                              className="text-red-500 font-medium text-[11px] truncate"
                            >
                              • {fileItem.errorMessage}
                            </TextApp>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Action / Status Badge */}
                    <div className="flex items-center gap-2 shrink-0">
                      {isUploading && (
                        <BadgeApp id={`${id}-badge-up-${fileItem.id}`} variant="purple" size="sm">
                          <Loader2 className="w-3 h-3 animate-spin mr-1" />
                          {pct}%
                        </BadgeApp>
                      )}

                      {isSuccess && (
                        <BadgeApp id={`${id}-badge-succ-${fileItem.id}`} variant="success" size="sm">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Uploaded
                        </BadgeApp>
                      )}

                      {isError && (
                        <BadgeApp id={`${id}-badge-err-${fileItem.id}`} variant="error" size="sm">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Failed
                        </BadgeApp>
                      )}

                      {!disabled && (
                        <button
                          type="button"
                          id={`${id}-remove-${fileItem.id}`}
                          onClick={() => removeItem(fileItem.id)}
                          className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                          aria-label="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar Indicator */}
                  {isUploading && (
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-2">
                      <div
                        className="bg-vibrant-purple-dark h-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

FileUploadApp.displayName = "FileUploadApp";
