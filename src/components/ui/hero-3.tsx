import * as React from "react";
import { cn } from "@/lib/utils";
import { ButtonApp, CardApp, BadgeApp, ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/packages/design-system";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Building2,
  Users,
  Activity,
  CheckCircle2,
  ChevronRight,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

const heroChartData = [
  { month: "Jan", target: 45, realisasi: 42 },
  { month: "Feb", target: 50, realisasi: 48 },
  { month: "Mar", target: 55, realisasi: 59 },
  { month: "Apr", target: 60, realisasi: 56 },
  { month: "Mei", target: 65, realisasi: 68 },
  { month: "Jun", target: 70, realisasi: 74 },
  { month: "Jul", target: 75, realisasi: 82 },
];

const heroChartConfig = {
  target: {
    label: "Target APBD",
    color: "#f59e0b",
  },
  realisasi: {
    label: "Realisasi Kas",
    color: "#7c3aed",
  },
} satisfies ChartConfig;

export function HeroSection() {
  const [activeTab, setActiveTab] = React.useState<"ringkasan" | "realtime" | "sektor">("ringkasan");

  return (
    <section className="relative mx-auto w-full max-w-6xl overflow-hidden pt-8 pb-16 px-4 select-none">
      {/* Background Playful Shades & Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 size-full overflow-hidden pointer-events-none"
      >
        <div
          className={cn(
            "absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-60 blur-[90px]",
            "bg-gradient-to-tr from-vibrant-purple/30 via-vibrant-mint/20 to-vibrant-pink/30"
          )}
        />
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-vibrant-yellow/30 blur-2xl animate-pulse" />
        <div className="absolute top-40 right-10 w-32 h-32 rounded-full bg-vibrant-cream/40 blur-2xl" />
      </div>

      {/* Hero Text Content */}
      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center mx-auto gap-6">


        {/* Playful Main Headline */}
        <h1
          className={cn(
            "text-balance font-bold text-3xl sm:text-5xl md:text-6xl text-foreground leading-[1.15] font-display tracking-tight",
            "animate-element animate-delay-200"
          )}
        >
          Kolektibilitas & Analisis Pajak Daerah{" "}
          <span className="bg-gradient-to-r from-vibrant-purple-dark via-purple-600 to-pink-500 bg-clip-text text-transparent underline decoration-vibrant-mint/60 decoration-wavy decoration-2">
            Kota Yogyakarta
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={cn(
            "text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed",
            "animate-element animate-delay-300"
          )}
        >
          Portal evaluasi eksekutif terpadu untuk memonitor realisasi penerimaan 12 sektor pajak daerah secara real-time, transparan, and akuntabel.
        </p>

        {/* Action Buttons using ButtonApp with purpleDark variant */}
        <div className="animate-element animate-delay-400 flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link to="/login">
            <ButtonApp
              id="hero-btn-masuk-portal"
              variant="purpleDark"
              theme="default"
              size="lg"
              rounded="pill"
              className="gap-2 font-display cursor-pointer"
            >
              Masuk Portal P4D
              <ArrowRight className="w-4 h-4" />
            </ButtonApp>
          </Link>
          <a href="#stakeholders">
            <ButtonApp
              id="hero-btn-stakeholders"
              variant="secondary"
              theme="default"
              size="lg"
              rounded="pill"
              className="gap-2 font-display cursor-pointer"
            >
              <Users className="w-4 h-4" />
              Pilih Peran Stakeholder (7 Role)
            </ButtonApp>
          </a>
        </div>
      </div>

      {/* Hero Dashboard Preview Card Container */}
      <div className="relative mt-12 sm:mt-16 z-10">
        {/* Glow backdrop ring */}
        <div
          className={cn(
            "absolute -inset-x-12 inset-y-0 -translate-y-1/4 scale-110 rounded-full pointer-events-none",
            "bg-[radial-gradient(ellipse_at_center,theme(--color-vibrant-purple/0.25),transparent,transparent)]",
            "blur-[60px]"
          )}
        />

        <CardApp
          id="hero-dashboard-preview-card"
          variant="neutral"
          theme="playful"
          rounded="card"
          className={cn(
            "relative mx-auto max-w-5xl bg-surface/95 p-3 sm:p-5 shadow-2xl backdrop-blur-xl border-hairline ring-1 ring-black/5 dark:ring-white/10",
            "animate-slide-right animate-delay-500"
          )}
        >
          {/* Dashboard Window Header Bar */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline-soft px-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-400/90 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400/90 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/90 inline-block" />
              </div>
              <span className="ml-3 text-xs font-mono text-muted-foreground font-semibold flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-emerald-500" />
                p4d.jogjakota.go.id/dashboard/preview
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-surface-soft p-1 rounded-xl border border-hairline text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setActiveTab("ringkasan")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg transition-all cursor-pointer",
                    activeTab === "ringkasan"
                      ? "bg-surface text-vibrant-purple-dark font-semibold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Ringkasan APBD
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("realtime")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg transition-all cursor-pointer",
                    activeTab === "realtime"
                      ? "bg-surface text-vibrant-purple-dark font-semibold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Tapping Box Live
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("sektor")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg transition-all cursor-pointer",
                    activeTab === "sektor"
                      ? "bg-surface text-vibrant-purple-dark font-semibold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  12 Sektor
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard Preview Content */}
          <div className="space-y-4 text-left">
            {/* Top KPI Cards row inside preview using CardApp design system */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <CardApp
                id="kpi-card-pad"
                variant="neutral"
                theme="playful"
                size="sm"
                rounded="card"
              >
                <div className="flex items-center justify-between text-xs text-muted-foreground font-medium mb-1">
                  <span>Total Realisasi PAD</span>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-lg md:text-xl font-bold font-display text-foreground">
                  Rp 428,5 M
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <span>+12.4% YoY</span>
                  <span className="text-muted-foreground font-normal">(Target 85.2%)</span>
                </div>
              </CardApp>

              <CardApp
                id="kpi-card-pbb"
                variant="neutral"
                theme="playful"
                size="sm"
                rounded="card"
              >
                <div className="flex items-center justify-between text-xs text-muted-foreground font-medium mb-1">
                  <span>PBB-P2 & BPHTB</span>
                  <Building2 className="w-4 h-4 text-teal-600" />
                </div>
                <div className="text-lg md:text-xl font-bold font-display text-foreground">
                  Rp 184,2 M
                </div>
                <div className="text-[11px] text-teal-700 font-semibold mt-1 flex items-center gap-1">
                  <span>94.1% Tercapai</span>
                </div>
              </CardApp>

              <CardApp
                id="kpi-card-wp"
                variant="neutral"
                theme="playful"
                size="sm"
                rounded="card"
              >
                <div className="flex items-center justify-between text-xs text-muted-foreground font-medium mb-1">
                  <span>Wajib Pajak Aktif</span>
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-lg md:text-xl font-bold font-display text-foreground">
                  14.820 WP
                </div>
                <div className="text-[11px] text-purple-700 font-semibold mt-1 flex items-center gap-1">
                  <span>+342 WP Bulan Ini</span>
                </div>
              </CardApp>

              <CardApp
                id="kpi-card-device"
                variant="neutral"
                theme="playful"
                size="sm"
                rounded="card"
              >
                <div className="flex items-center justify-between text-xs text-muted-foreground font-medium mb-1">
                  <span>Perangkat Tapping</span>
                  <Activity className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-lg md:text-xl font-bold font-display text-foreground">
                  1.240 Device
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>98.6% Online</span>
                </div>
              </CardApp>
            </div>

            {/* Middle Section inside preview: Chart Mockup + Live Feed */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Main Chart Component using Design System ChartContainer */}
              <CardApp
                id="hero-chart-card"
                variant="neutral"
                theme="playful"
                size="sm"
                rounded="card"
                className="md:col-span-2 bg-surface border-hairline p-4 flex flex-col justify-between min-h-[220px]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-semibold font-display text-foreground flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-vibrant-purple-dark" />
                      Tren Bulanan Realisasi Pajak Daerah (Miliar Rp)
                    </h3>
                    <p className="text-xs text-muted-foreground">Komparasi Target APBD vs Realisasi Kas Daerah 2026</p>
                  </div>
                  <BadgeApp
                    id="hero-chart-date-badge"
                    variant="vibrantBlue"
                    theme="playful"
                    size="sm"
                    rounded="pill"
                  >
                    Jan - Jul 2026
                  </BadgeApp>
                </div>

                {/* Design System Chart Component */}
                <div className="py-2">
                  <ChartContainer id="hero-chart-container" config={heroChartConfig} className="h-[155px] w-full">
                    <BarChart data={heroChartData} margin={{ left: -15, right: 10, top: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-hairline-soft" />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-[10px] font-mono fill-muted-foreground" />
                      <YAxis tickLine={false} axisLine={false} className="text-[10px] font-mono fill-muted-foreground" tickFormatter={(val) => `Rp${val}M`} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="realisasi" name="Realisasi Kas" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="target" name="Target APBD" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-hairline-soft text-muted-foreground">
                  <div className="flex items-center gap-4 text-[11px]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#7c3aed] inline-block" /> Realisasi Kas
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] inline-block" /> Target APBD
                    </span>
                  </div>
                  <Link to="/admin" className="text-vibrant-purple-dark font-semibold hover:underline flex items-center gap-1 text-xs">
                    Detail Dashboard <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </CardApp>

              {/* Right Side Feed in Preview using CardApp */}
              <CardApp
                id="hero-feed-card"
                variant="neutral"
                theme="playful"
                size="sm"
                rounded="card"
                className="bg-vibrant-blue/15 border-vibrant-blue/30 p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold font-display uppercase tracking-wider text-foreground flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Aktivitas Tapping Box
                    </h4>
                    <span className="text-[10px] text-muted-foreground">Real-time</span>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { hotel: "Hotel Tentrem Yogyakarta", nominal: "Rp 12.450.000", type: "Pajak Hotel", time: "2 mnt lalu" },
                      { hotel: "Restoran House of Raminten", nominal: "Rp 3.820.000", type: "Pajak Restoran", time: "5 mnt lalu" },
                      { hotel: "Malioboro Mall Parking", nominal: "Rp 1.150.000", type: "Pajak Parkir", time: "8 mnt lalu" },
                      { hotel: "Gembira Loka Zoo", nominal: "Rp 8.900.000", type: "Pajak Hiburan", time: "12 mnt lalu" },
                    ].map((item, i) => (
                      <div key={i} className="bg-surface p-2.5 rounded-xl border border-hairline-soft text-xs flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-foreground text-xs">{item.hotel}</div>
                          <div className="text-[10px] text-muted-foreground">{item.type} • {item.time}</div>
                        </div>
                        <div className="font-mono font-bold text-emerald-600 text-xs">
                          {item.nominal}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-hairline-soft flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Status Tapping Box: <strong className="text-emerald-600">Normal</strong></span>
                  <Link to="/login" className="text-vibrant-purple-dark font-semibold hover:underline">
                    Masuk Portal
                  </Link>
                </div>
              </CardApp>
            </div>
          </div>
        </CardApp>
      </div>
    </section>
  );
}

