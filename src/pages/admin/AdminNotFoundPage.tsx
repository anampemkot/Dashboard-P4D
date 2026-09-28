import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { ButtonApp } from "@/packages/design-system";

export default function AdminNotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      id="admin-404-root"
      className="min-h-[calc(100vh-120px)] flex flex-col justify-center items-center py-10 px-4 select-none text-center"
    >
      <div className="w-full max-w-md space-y-5">
        {/* Big 404 */}
        <h1 className="text-8xl sm:text-9xl font-black font-display tracking-tight text-vibrant-purple-dark dark:text-purple-300 leading-none">
          404
        </h1>

        {/* Title & Subtitle */}
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-ink">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-xs text-ink-secondary leading-relaxed">
            Maaf, modul atau halaman admin yang Anda tuju tidak tersedia atau telah dipindahkan.
          </p>
        </div>

        {/* Exactly 2 CTA Buttons */}
        <div className="flex items-center justify-center gap-3 pt-3">
          <ButtonApp
            id="btn-404-back-dashboard"
            variant="purpleDark"
            theme="default"
            size="md"
            rounded="pill"
            onClick={() => navigate("/admin")}
            className="inline-flex items-center gap-2 font-display shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Ke Dashboard Utama</span>
          </ButtonApp>

          <ButtonApp
            id="btn-404-go-back"
            variant="secondary"
            theme="default"
            size="md"
            rounded="pill"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 font-display"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </ButtonApp>
        </div>
      </div>
    </div>
  );
}
