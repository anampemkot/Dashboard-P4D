import * as React from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "@/components/ui/hero-3";
import { StakeholderSection } from "@/components/ui/stakeholder-scroll";
import { JogjaLogo } from "@/components/ui/JogjaLogo";
import { ChevronRight, Building2, ExternalLink } from "lucide-react";
import { ButtonApp } from "@/packages/design-system";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas text-foreground relative overflow-x-hidden flex flex-col font-sans">
      {/* Sticky Top Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-hairline-soft/80 bg-surface/90 backdrop-blur-md select-none">
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
                id="header-btn-masuk-portal"
                variant="purpleDark"
                theme="default"
                size="sm"
                rounded="pill"
                className="flex items-center gap-1.5 font-display shadow-md"
              >
                Masuk Portal
                <ChevronRight className="w-3.5 h-3.5" />
              </ButtonApp>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content: Strictly 2 Main Display Sections + 1 Footer = 3 Sections Total */}
      <main className="flex-1">
        {/* SECTION 1: HERO SECTION WITH DASHBOARD PREVIEW */}
        <HeroSection />

        {/* SECTION 2: STAKEHOLDER SECTION (7 CARDS VELOCITY SCROLL) */}
        <StakeholderSection />
      </main>

      {/* SECTION 3: ELEGANT SOFT-BG FOOTER CARD USING CSS VARIABLES */}
      <footer id="landing-footer" className="w-full max-w-7xl sm:px-6 mt-10 mr-auto mb-12 ml-auto px-4 select-none">
        <div className="relative overflow-hidden shadow-card bg-surface-soft border border-hairline rounded-[36px] p-6 sm:p-8">
          {/* Subtle soft gradient ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-80 h-40 bg-vibrant-blue/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-1/4 w-80 h-40 bg-vibrant-purple/10 blur-3xl rounded-full" />
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10 text-left">
              {/* Brand / Intro Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <JogjaLogo size="lg" />
                  <div>
                    <span className="font-bold text-base tracking-tight text-foreground font-display block leading-none">
                      P4D KOTA YOGYAKARTA
                    </span>
                    <span className="text-[11px] text-vibrant-purple-dark font-mono font-medium">BPKAD Kota Yogyakarta</span>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-muted-foreground font-medium">
                  Portal resmi pengawasan pendapatan dan pajak daerah Kota Yogyakarta.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link to="/login">
                    <ButtonApp
                      id="footer-btn-masuk"
                      variant="purpleDark"
                      theme="default"
                      size="sm"
                      rounded="pill"
                      className="inline-flex items-center gap-2 shadow-md"
                    >
                      <span>Masuk Portal</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </ButtonApp>
                  </Link>
                </div>

                <div className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-vibrant-purple-dark" />
                  <span>support@bpkad.jogjakota.go.id</span>
                </div>
              </div>

              {/* Column: Peran Stakeholder */}
              <div>
                <h4 className="text-xs tracking-wider text-vibrant-purple-dark uppercase font-display font-bold">
                  Peran Stakeholder
                </h4>
                <ul className="mt-4 space-y-3.5 text-xs text-muted-foreground font-medium">
                  <li>
                    <Link to="/login" className="hover:text-foreground transition-colors flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-vibrant-purple-dark" />
                      Pj Wali Kota Yogyakarta
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="hover:text-foreground transition-colors flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-vibrant-purple-dark" />
                      Sekretaris Daerah
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="hover:text-foreground transition-colors flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-vibrant-purple-dark" />
                      Kepala BPKAD
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="hover:text-foreground transition-colors flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-vibrant-purple-dark" />
                      Kabid P2D & Kasubbid
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="hover:text-foreground transition-colors flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-vibrant-purple-dark" />
                      Staf Teknis & Operator Tapping
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column: Layanan & Fitur */}
              <div>
                <h4 className="text-xs tracking-wider text-vibrant-purple-dark uppercase font-display font-bold">
                  Sektor & Fitur
                </h4>
                <ul className="mt-4 space-y-3.5 text-xs text-muted-foreground font-medium">
                  <li>
                    <a href="#stakeholders" className="hover:text-foreground transition-colors flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-vibrant-purple-dark" />
                      12 Sektor Pajak Daerah
                    </a>
                  </li>
                  <li>
                    <Link to="/admin" className="hover:text-foreground transition-colors flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-vibrant-purple-dark" />
                      Monitoring Tapping Box
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin" className="hover:text-foreground transition-colors flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-vibrant-purple-dark" />
                      Laporan APBD & Realisasi
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin" className="hover:text-foreground transition-colors flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-vibrant-purple-dark" />
                      Sistem SKPD & Piutang
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column: Lokasi Kantor */}
              <div>
                <h4 className="text-xs tracking-wider text-vibrant-purple-dark uppercase font-display font-bold">
                  Kantor BPKAD
                </h4>
                <div className="mt-4 space-y-3 text-xs text-muted-foreground font-medium">
                  <p className="leading-relaxed">
                    Balai Kota Yogyakarta, Jl. Kenari No. 56, Umbulharjo.
                  </p>
                  <a
                    href="https://bpkad.jogjakota.go.id"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-vibrant-purple-dark hover:underline pt-1 transition-colors"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    bpkad.jogjakota.go.id
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-8 pt-6 border-t border-hairline flex flex-col md:flex-row md:items-center gap-3 md:justify-between text-[11px] text-muted-foreground">
              <nav className="flex flex-wrap gap-x-3 gap-y-1.5 font-medium">
                <a href="#" className="hover:text-foreground transition-colors">Kebijakan Privasi</a>
                <span className="text-hairline">|</span>
                <a href="#" className="hover:text-foreground transition-colors">Ketentuan Layanan</a>
                <span className="text-hairline">|</span>
                <a href="#" className="hover:text-foreground transition-colors">Aksesibilitas Portal</a>
                <span className="text-hairline">|</span>
                <a href="#" className="hover:text-foreground transition-colors">Bantuan Technical Support</a>
              </nav>
              <div>
                © 2026 Badan Pengelolaan Keuangan dan Aset Daerah Kota Yogyakarta. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
