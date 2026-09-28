import * as React from "react";
import { cn } from "@/lib/utils";

interface JogjaLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * Official Coat of Arms / Emblem of Kota Yogyakarta (Kota Pradja Jogjakarta)
 * Features: Star, Hamemayu Hayuning Bawana banner, Gunungan, Tugu, Cotton & Paddy, Kota Pradja Jogjakarta banner
 */
export function JogjaLogo({ className, size = "md" }: JogjaLogoProps) {
  const sizeClasses = {
    sm: "h-8 w-auto object-contain",
    md: "h-10 w-auto object-contain",
    lg: "h-12 w-auto object-contain",
    xl: "h-16 w-auto object-contain",
  };

  const [hasError, setHasError] = React.useState(false);

  if (hasError) {
    return (
      <svg
        viewBox="0 0 100 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("inline-block shrink-0 drop-shadow-sm w-8 h-10", className)}
        aria-label="Lambang Kota Yogyakarta"
      >
        <path
          d="M50 2 C75 2, 95 18, 95 42 C95 80, 72 110, 50 128 C28 110, 5 80, 5 42 C5 18, 25 2, 50 2 Z"
          fill="#111111"
          stroke="#FBBF24"
          strokeWidth="3"
        />
        <polygon points="50,25 52.5,31 59,31 54,35 56,41 50,37 44,41 46,35 41,31 47.5,31" fill="#FBBF24" />
        <path d="M50 42 C68 42, 78 54, 78 72 C78 92, 62 104, 50 110 C38 104, 22 92, 22 72 C22 54, 32 42, 50 42 Z" fill="#15803D" stroke="#DC2626" strokeWidth="2" />
        <path d="M50 65 L52 92 L48 92 Z M47 92 L53 92 L54 98 L46 98 Z" fill="#FFFFFF" />
      </svg>
    );
  }

  return (
    <img
      src="/logo.png"
      alt="Logo Kota Yogyakarta"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={cn("inline-block shrink-0 object-contain drop-shadow-xs", sizeClasses[size], className)}
    />
  );
}
