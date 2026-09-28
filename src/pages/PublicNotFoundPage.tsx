import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { JogjaLogo } from "@/components/ui/JogjaLogo";
import { ChevronRight, Home, ArrowLeft, Building2 } from "lucide-react";
import { ButtonApp } from "@/packages/design-system";

export default function PublicNotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-canvas text-foreground relative flex flex-col font-sans select-none">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-hairline-soft/80 bg-surface/90 backdrop-blur-md">
        <nav className="w-full max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <JogjaLogo size="md" className="group-hover:scale-105 transition-transform" />
            <div className="text-left">
              <span className="font-bold text-sm tracking-tight text-foreground font-display block leading-none">
                BPKAD KOTA YOGYAKARTA
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">Pajak & Pendapatan Daerah</span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/login">
              <ButtonApp
                id="header-404-btn-login"
                variant="purpleDark"
                theme="default"
                size="sm"
                rounded="pill"
                className="flex items-center gap-1.5 font-display shadow-md"
              >
                <span>Masuk Portal</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </ButtonApp>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content Area - Clean Minimal 404 with 2 CTA */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 py-12 text-center">
        <div className="w-full max-w-md space-y-5">
          {/* Big 404 */}
          <h1 className="text-8xl sm:text-9xl font-black font-display tracking-tight text-vibrant-purple-dark dark:text-purple-300 leading-none">
            404
          </h1>

          {/* Title & Subtitle */}
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-foreground">
              Halaman Tidak Ditemukan
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Maaf, halaman publik yang Anda cari tidak tersedia atau rute URL telah diubah.
            </p>
          </div>

          {/* Exactly 2 CTA Buttons */}
          <div className="flex items-center justify-center gap-3 pt-3">
            <ButtonApp
              id="public-404-btn-home"
              variant="purpleDark"
              theme="default"
              size="md"
              rounded="pill"
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 font-display shadow-md"
            >
              <Home className="w-4 h-4" />
              <span>Ke Halaman Utama</span>
            </ButtonApp>

            <ButtonApp
              id="public-404-btn-back"
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
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-hairline-soft/80 text-center text-xs text-muted-foreground">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-vibrant-purple-dark" />
            <span className="font-medium">BPKAD Kota Yogyakarta — P4D Portal</span>
          </div>
          <div>
            © 2026 Pemerintah Kota Yogyakarta. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
