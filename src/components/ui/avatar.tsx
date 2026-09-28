import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarUIProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
}

export function AvatarUI({ src, alt, fallback, className, ...props }: AvatarUIProps) {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setHasError(false);
  }, [src]);

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden select-none items-center justify-center font-medium text-ink-secondary",
        className
      )}
      {...props}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          onError={() => setHasError(true)}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center uppercase">
          {fallback || alt?.slice(0, 2) || "?"}
        </span>
      )}
    </div>
  );
}
