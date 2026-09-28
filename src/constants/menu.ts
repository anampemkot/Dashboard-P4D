export interface MenuItem {
  id: string;
  label: string;
  path: string;
  subtitle?: string; // Additional contextual subtitle for rich presentation
  children?: MenuItem[];
}

export const MENU: MenuItem[] = [
  {
    id: "menu-1",
    label: "Pajak Hotel & Resto",
    path: "/admin/menu-1",
    subtitle: "Pajak Hotel & Penginapan",
    children: [
      { id: "menu-1-1", label: "Monitoring Hotel", path: "/admin/menu-1/sub-1", subtitle: "Monitoring Real-time Hotel" },
      { id: "menu-1-2", label: "Rekapitulasi Omzet", path: "/admin/menu-1/sub-2", subtitle: "Rekapitulasi Omzet Bulanan" },
    ],
  },
  {
    id: "menu-2",
    label: "Pelayanan Publik",
    path: "/admin/menu-2",
    subtitle: "BR-02 Pelayanan & SLA Publik",
  },
  {
    id: "menu-3",
    label: "Pendataan Objek Pajak",
    path: "/admin/menu-3",
    subtitle: "BR-03 Pendataan Objek Pajak",
  },
  {
    id: "menu-4",
    label: "Pendaftaran WP & OP",
    path: "/admin/menu-4",
    subtitle: "BR-04 Pendaftaran WP & OP",
  },
  {
    id: "menu-5",
    label: "Penetapan SKPD",
    path: "/admin/menu-5",
    subtitle: "BR-05 Penetapan SKPD & Ketetapan",
  },
  {
    id: "menu-6",
    label: "Basis Data Pajak",
    path: "/admin/menu-6",
    subtitle: "BR-06 Master Data & Quality Index",
  },
  {
    id: "menu-7",
    label: "GIS Spasial & Pemetaan",
    path: "/admin/menu-7",
    subtitle: "BR-07 GIS Spasial & Pemetaan Potensi",
  },
  {
    id: "menu-8",
    label: "Potensi Pajak",
    path: "/admin/menu-8",
    subtitle: "BR-08 Potensi Pajak & Hasil Uji Petik",
  },
  {
    id: "menu-9",
    label: "Monitoring Permohonan",
    path: "/admin/menu-9",
    subtitle: "BR-09 Monitoring Permohonan Pelayanan",
    children: [
      { id: "menu-9-1", label: "Permohonan Layanan", path: "/admin/menu-9/sub-1", subtitle: "Layanan Pengurangan, Keberatan, Pembetulan, Mutasi, Pembatalan, Penghapusan" },
    ],
  },
  {
    id: "menu-10",
    label: "SLA Pelayanan",
    path: "/admin/menu-10",
    subtitle: "BR-10 Monitoring SLA & Kepatuhan Pelayanan",
  },
  {
    id: "menu-11",
    label: "Kepatuhan Administrasi",
    path: "/admin/menu-11",
    subtitle: "BR-11 Audit & Monitoring Kepatuhan Administrasi",
  },
  {
    id: "menu-12",
    label: "Early Warning",
    path: "/admin/menu-12",
    subtitle: "BR-12 Early Warning & Deteksi Anomali",
  },
  {
    id: "menu-13",
    label: "Pemeriksaan PBJT",
    path: "/admin/menu-13",
    subtitle: "BR-13 Pemeriksaan PBJT & SKPKB",
  },
  {
    id: "menu-14",
    label: "Penilaian Individu PBB-P2",
    path: "/admin/menu-14",
    subtitle: "BR-14 Penilaian Individu PBB-P2",
  },
  {
    id: "menu-ui-kit",
    label: "UI Kit System",
    path: "/admin/ui-kit",
    subtitle: "Katalog Varian & Palet Warna",
  },
];
