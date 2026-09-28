import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { Role } from "@/constants/roles";
import { cn } from "@/lib/utils";
import { CardApp, BadgeApp, ButtonApp } from "@/packages/design-system";
import {
  ArrowUpRight,
  UserCheck,
  Sparkles,
  KeyRound
} from "lucide-react";

export interface Stakeholder {
  id: Role;
  name: string;
  roleTitle: string;
  department: string;
  avatarSrc: string;
  badges: string[];
  description: string;
  colorClass: string;
  badgeVariant: string;
}

export const STAKEHOLDERS: Stakeholder[] = [
  {
    id: "kepala-bpkad",
    name: "Drs. Kadarisman, M.Si.",
    roleTitle: "Kepala BPKAD Kota Yogyakarta",
    department: "Otoritas Pengambil Keputusan Utama",
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    badges: ["Otorisasi Eksekutif", "Evaluasi APBD"],
    description: "Mengarahkan kebijakan strategis penerimaan PAD dan pengesahan target kolektibilitas pajak daerah.",
    colorClass: "bg-surface border-hairline hover:bg-surface-soft hover:border-vibrant-purple-dark/40",
    badgeVariant: "bg-vibrant-purple-dark text-white",
  },
  {
    id: "sekretaris",
    name: "Sri Rahayu, S.E., M.Acc.",
    roleTitle: "Sekretaris BPKAD",
    department: "Sekretariat & Administrasi Keuangan",
    avatarSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    badges: ["Koordinasi Keuangan", "Sistem Laporan"],
    description: "Memantau keterpaduan administrasi keuangan, alokasi anggaran, dan koordinasi operasional sekretariat.",
    colorClass: "bg-surface border-hairline hover:bg-surface-soft hover:border-vibrant-purple-dark/40",
    badgeVariant: "bg-teal-700 text-white",
  },
  {
    id: "kepala-bidang",
    name: "Heru Handoko, S.IP.",
    roleTitle: "Kepala Bidang Pajak Daerah",
    department: "Bidang Pengawasan & Pengendalian",
    avatarSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    badges: ["Pengawasan Sektor", "Target Realisasi"],
    description: "Supervisi langsung pencapaian target 12 sektor pajak daerah serta kepatuhan wajib pajak hotel & restoran.",
    colorClass: "bg-surface border-hairline hover:bg-surface-soft hover:border-vibrant-purple-dark/40",
    badgeVariant: "bg-amber-600 text-white",
  },
  {
    id: "kasubbid-pelayanan",
    name: "Budi Santoso, S.STP.",
    roleTitle: "Kasubbid Pelayanan Pajak",
    department: "Subbid Pelayanan & Tapping Device",
    avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    badges: ["Tapping Box Live", "Layanan WP"],
    description: "Mengelola ketersediaan perangkat Tapping Box di wajib pajak hotel, restoran, hiburan, dan parkir.",
    colorClass: "bg-surface border-hairline hover:bg-surface-soft hover:border-vibrant-purple-dark/40",
    badgeVariant: "bg-pink-600 text-white",
  },
  {
    id: "kasubbid-pendataan",
    name: "Siti Aminah, S.Kom.",
    roleTitle: "Kasubbid Pendataan & Potensi",
    department: "Subbid Pendataan & Pemetaan Objek",
    avatarSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    badges: ["Pemetaan Reklame", "Pendataan WP"],
    description: "Pemetaan geolokasi titik reklame, pendataan wajib pajak baru, dan verifikasi objek pajak daerah.",
    colorClass: "bg-surface border-hairline hover:bg-surface-soft hover:border-vibrant-purple-dark/40",
    badgeVariant: "bg-purple-700 text-white",
  },
  {
    id: "kasubbid-penetapan",
    name: "Roni Wijaya, S.H.",
    roleTitle: "Kasubbid Penetapan & Penagihan",
    department: "Subbid Penetapan SKPD & Denda",
    avatarSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
    badges: ["Penetapan SKPD", "Manajemen Denda"],
    description: "Penerbitan Surat Ketetapan Pajak Daerah, verifikasi denda keterlambatan, dan penagihan piutang pajak.",
    colorClass: "bg-surface border-hairline hover:bg-surface-soft hover:border-vibrant-purple-dark/40",
    badgeVariant: "bg-orange-700 text-white",
  },
  {
    id: "operator",
    name: "Agus Setiawan",
    roleTitle: "Operator Sistem & Monitoring",
    department: "Subbid Pemeliharaan & Data Entry",
    avatarSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    badges: ["Data Entry Live", "Log Tapping Box"],
    description: "Pemantauan berkala log transaksi tapping box, perbaikan status koneksi device, dan entri data kas.",
    colorClass: "bg-surface border-hairline hover:bg-surface-soft hover:border-vibrant-purple-dark/40",
    badgeVariant: "bg-sky-700 text-white",
  },
];

export function StakeholderSection() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleRoleSelect = (stakeholder: Stakeholder) => {
    login(stakeholder.id, stakeholder.name);
    navigate("/admin");
  };

  // We duplicate the array to create a seamless infinite marquee effect
  const marqueeItems = [...STAKEHOLDERS, ...STAKEHOLDERS];

  return (
    <section id="stakeholders" className="py-20 bg-surface-soft border-y border-hairline relative overflow-hidden select-none">
      {/* Background Playful Accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-vibrant-purple/10 blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 rounded-full bg-vibrant-mint/20 blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="w-full max-w-6xl mx-auto px-6 mb-10 text-center">
        <BadgeApp
          id="stakeholder-header-badge"
          variant="vibrantYellow"
          theme="playful"
          size="md"
          rounded="pill"
          className="uppercase tracking-wider mb-3 gap-1.5 px-3 py-1 text-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Multi-Role Executive Access
        </BadgeApp>
        <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-foreground mb-3">
          7 Stakeholder Utama Portal P4D
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
          Klik pada kartu pejabat/stakeholder di bawah ini untuk mensimulasikan login dan menjelajahi hak akses khusus sesuai peran masing-masing.
        </p>
      </div>

      {/* Velocity Scroll / Infinite Marquee Container */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left and Right Fade Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-surface-soft to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-surface-soft to-transparent z-10 pointer-events-none" />

        {/* Marquee Row */}
        <div className="flex w-max animate-marquee space-x-6 hover:[animation-play-state:paused]">
          {marqueeItems.map((s, index) => (
            <CardApp
              key={`${s.id}-${index}`}
              id={`stakeholder-card-${s.id}-${index}`}
              variant="neutral"
              theme="playful"
              rounded="card"
              onClick={() => handleRoleSelect(s)}
              className={cn(
                "w-[310px] sm:w-[340px] flex-shrink-0 p-5 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-2 relative group text-left",
                s.colorClass
              )}
            >
              {/* Card Header */}
              <div className="flex items-start gap-3.5 mb-4">
                <img
                  src={s.avatarSrc}
                  alt={s.name}
                  className="w-13 h-13 rounded-2xl object-cover border-2 border-surface shadow-xs flex-shrink-0"
                />
                <div className="overflow-hidden">
                  <h3 className="font-bold text-base font-display text-foreground group-hover:text-vibrant-purple-dark transition-colors truncate">
                    {s.name}
                  </h3>
                  <p className="text-xs font-semibold text-vibrant-purple-dark truncate">{s.roleTitle}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{s.department}</p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {s.badges.map((b, i) => (
                  <BadgeApp
                    id={`stakeholder-badge-${s.id}-${i}`}
                    key={i}
                    variant={i % 2 === 0 ? "vibrantYellow" : "vibrantBlue"}
                    size="sm"
                    className="text-[10px] font-semibold font-display"
                  >
                    {b}
                  </BadgeApp>
                ))}
              </div>

              {/* Description */}
              <p className="text-xs text-foreground/80 leading-relaxed mb-4 min-h-[36px]">
                {s.description}
              </p>

              {/* Bottom Action Footer */}
              <div className="pt-3 border-t border-hairline/60 flex items-center justify-between text-xs font-medium mt-auto">
                <span className="text-muted-foreground flex items-center gap-1 group-hover:text-foreground">
                  <KeyRound className="w-3.5 h-3.5 text-vibrant-purple-dark" />
                  Simulasi Login
                </span>
                <ButtonApp
                  id={`stakeholder-btn-${s.id}-${index}`}
                  variant="purpleDark"
                  theme="default"
                  size="sm"
                  rounded="pill"
                  className="text-[11px] font-semibold gap-1 px-3 py-1 min-h-[28px]"
                >
                  Masuk <ArrowUpRight className="w-3.5 h-3.5" />
                </ButtonApp>
              </div>
            </CardApp>
          ))}
        </div>
      </div>


    </section>
  );
}
