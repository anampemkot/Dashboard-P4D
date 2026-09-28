import * as React from "react";
import { ScorecardApp } from "@/packages/design-system";
import { ModuleCard } from "./ModuleCard";
import {
  TrendingUp,
  DollarSign,
  Users,
  Building2,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Code,
  Check,
  Sparkles,
} from "lucide-react";

export function ScorecardDisplayModule() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [lastInfoClicked, setLastInfoClicked] = React.useState<string | null>(null);

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleInfoClick = (metricName: string) => {
    setLastInfoClicked(metricName);
  };

  const codeExample = `// Penggunaan ScorecardApp dengan onInfoClick Event
<ScorecardApp
  id="sc-target-pendapatan"
  title="Target Pendapatan"
  value="Rp 450,0 M"
  unit="Tahun 2026"
  description="Ketetapan APBD Pajak Daerah Kota Yogyakarta"
  variant="purple"
  badge="BR-01"
  icon={<DollarSign className="w-5 h-5 text-vibrant-purple-dark" />}
  infoTooltip="Ketetapan APBD murni berdasarkan Perda Pendapatan Daerah Tahun 2026."
  onInfoClick={(e) => console.log("Info clicked for Target Pendapatan!")}
  trend={{
    value: "+12.5%",
    label: "vs YoY 2025",
    isPositive: true,
  }}
  progress={{
    value: 78.5,
    max: 100,
    label: "Capaian Murni",
  }}
/>`;

  return (
    <ModuleCard
      id="uikit-scorecard-module"
      icon={<TrendingUp className="w-5 h-5 text-vibrant-purple-dark" />}
      title="Scorecard / Stat Card (PRD Executive & Operasional)"
      description="Komponen kartu KPI metrik ringkas yang siap dipakai di seluruh 14 dashboard PRD BPKAD. Dilengkapi icon info + callback event onInfoClick, varian warna design system, indikator trend, dan progress bar."
    >
      {/* Alert toast info click demo */}
      {lastInfoClicked && (
        <div className="mb-4 p-3 bg-vibrant-purple/10 border border-vibrant-purple/30 text-vibrant-purple-dark rounded-xl text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-vibrant-purple-dark shrink-0" />
            <span>Event Triggered: Info icon clicked for <strong>"{lastInfoClicked}"</strong></span>
          </div>
          <button
            onClick={() => setLastInfoClicked(null)}
            className="text-[10px] underline font-bold cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Code snippet trigger */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold font-display uppercase tracking-wider text-ink">
          Contoh Kartu Scorecard (Grid Showcase)
        </span>
        <button
          onClick={() => copyToClipboard("sc-code", codeExample)}
          className="px-2.5 py-1 text-[10px] font-bold bg-vibrant-purple/10 text-vibrant-purple-dark hover:bg-vibrant-purple/20 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5"
        >
          {copiedId === "sc-code" ? (
            <>
              <Check className="w-3.5 h-3.5 text-success" /> Copied!
            </>
          ) : (
            <>
              <Code className="w-3.5 h-3.5" /> Salin Contoh Kode
            </>
          )}
        </button>
      </div>

      {/* SCORECARDS GRID SHOWCASE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-left">
        {/* 1. Target Pendapatan (Purple Variant) */}
        <ScorecardApp
          id="sc-target"
          title="Target Pendapatan"
          value="Rp 450,0 M"
          unit="TA 2026"
          description="Target penetapan APBD Murni 2026"
          variant="purple"
          badge="BR-01"
          icon={<DollarSign className="w-5 h-5" />}
          infoTooltip="Informasi detail perhitungan target Pendapatan Asli Daerah."
          onInfoClick={() => handleInfoClick("Target Pendapatan")}
          trend={{
            value: "+12.5%",
            label: "vs 2025",
            isPositive: true,
          }}
          progress={{
            value: 78.5,
            max: 100,
            label: "Realisasi Murni",
          }}
        />

        {/* 2. Wajib Pajak Aktif (Blue Variant) */}
        <ScorecardApp
          id="sc-wp-aktif"
          title="Jumlah Wajib Pajak"
          value="24.850"
          unit="WP Aktif"
          description="Terdaftar resmi di database BPKAD"
          variant="blue"
          badge="BR-04"
          icon={<Users className="w-5 h-5" />}
          infoTooltip="Klik untuk melihat sebaran per kecamatan."
          onInfoClick={() => handleInfoClick("Jumlah Wajib Pajak")}
          trend={{
            value: "+1.240",
            label: "WP Baru bln ini",
            isPositive: true,
          }}
        />

        {/* 3. SLA Pelayanan (Emerald Variant / Success) */}
        <ScorecardApp
          id="sc-sla"
          title="SLA Pelayanan"
          value="98,4%"
          unit="Selesai Tepat Waktu"
          description="Rata-rata durasi: 12 menit / pemohon"
          variant="emerald"
          status="success"
          badge="BR-02"
          icon={<Clock className="w-5 h-5 text-emerald-600" />}
          infoTooltip="SLA diukur dari pemanggilan loket hingga pencetakan SKPD."
          onInfoClick={() => handleInfoClick("SLA Pelayanan")}
          trend={{
            value: "+2.1%",
            label: "Efisiensi meningkat",
            isPositive: true,
          }}
        />

        {/* 4. Early Warning Alert (Alert / Rose Variant) */}
        <ScorecardApp
          id="sc-alert"
          title="Permohonan Menumpuk"
          value="142"
          unit="Berkas"
          description="Melebihi ambang batas toleransi 100 berkas"
          variant="alert"
          status="danger"
          badge="BR-12 Alert"
          icon={<AlertTriangle className="w-5 h-5 text-rose-600 animate-pulse" />}
          infoTooltip="Klik info untuk membuka daftar berkas permohonan yang perlu verifikasi segera."
          onInfoClick={() => handleInfoClick("Permohonan Menumpuk")}
          trend={{
            value: "+38 berkas",
            label: "vs kemarin",
            isPositive: false,
          }}
        />

        {/* 5. Objek Pajak Baru (Yellow / Playful Variant) */}
        <ScorecardApp
          id="sc-op-baru"
          title="Survei Pendataan OP"
          value="850"
          unit="Lokasi"
          description="Hasil pendataan survei lapangan"
          variant="yellow"
          badge="BR-03"
          icon={<Building2 className="w-5 h-5" />}
          infoTooltip="Pendataan tim lapangan BPKAD Kota Yogyakarta."
          onInfoClick={() => handleInfoClick("Survei Pendataan OP")}
          trend={{
            value: "+15.0%",
            label: "vs target bulanan",
            isPositive: true,
          }}
        />

        {/* 6. Data Quality Index (Clay Variant) */}
        <ScorecardApp
          id="sc-data-quality"
          title="Data Quality Index"
          value="94,8"
          unit="/ 100"
          description="Tingkat keabsahan basis data NIK & NOP"
          variant="clay"
          badge="BR-06"
          icon={<CheckCircle2 className="w-5 h-5 text-vibrant-purple-dark" />}
          infoTooltip="Dihitung otomatis dari validasi Dukcapil & Agraria."
          onInfoClick={() => handleInfoClick("Data Quality Index")}
          progress={{
            value: 94.8,
            max: 100,
            label: "Akurasi NIK & NOP",
          }}
        />
      </div>
    </ModuleCard>
  );
}
