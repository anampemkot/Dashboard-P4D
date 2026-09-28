import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  DataTableApp,
  DataTableColumnHeader,
  AdvanceFilterApp,
  FilterFieldConfig,
  BadgeApp,
  ButtonApp,
  CardApp,
  AlertApp,
  AlertIconApp,
  AlertTitleApp,
  AlertDescriptionApp,
} from "@/packages/design-system";
import { ModuleCard } from "./ModuleCard";
import {
  TableProperties,
  Plus,
  Trash2,
  Download,
  Building2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  FileSpreadsheet,
} from "lucide-react";

// Mock Data Type
export interface BpkadAssetItem {
  id: string;
  kodeBarang: string;
  namaBarang: string;
  kategori: string;
  skpd: string;
  tahunPerolehan: number;
  nilaiAset: number;
  kondisi: "Baik" | "Rusak Ringan" | "Rusak Berat";
  status: "Aktif" | "Proses Penghapusan" | "Dipinjamkan";
}

// Mock Dataset
const INITIAL_ASSETS: BpkadAssetItem[] = [
  { id: "AST-001", kodeBarang: "1.3.1.01.01", namaBarang: "Tanah Kantor Gedung Utama BPKAD", kategori: "Tanah", skpd: "BPKAD", tahunPerolehan: 2018, nilaiAset: 12500000000, kondisi: "Baik", status: "Aktif" },
  { id: "AST-002", kodeBarang: "1.3.2.02.01", namaBarang: "Server Mainframe Data Center", kategori: "Peralatan & Mesin", skpd: "Dinas Kominfo", tahunPerolehan: 2022, nilaiAset: 850000000, kondisi: "Baik", status: "Aktif" },
  { id: "AST-003", kodeBarang: "1.3.2.04.02", namaBarang: "Mobil Dinas Jabatan SUV 2.5L", kategori: "Kendaraan", skpd: "Secretariat Daerah", tahunPerolehan: 2020, nilaiAset: 480000000, kondisi: "Baik", status: "Aktif" },
  { id: "AST-004", kodeBarang: "1.3.3.01.01", namaBarang: "Gedung Balai Kota Yogyakarta Block A", kategori: "Gedung & Bangunan", skpd: "BPKAD", tahunPerolehan: 2015, nilaiAset: 34000000000, kondisi: "Baik", status: "Aktif" },
  { id: "AST-005", kodeBarang: "1.3.2.02.05", namaBarang: "Laptop Workstation i9 64GB (10 Unit)", kategori: "Peralatan & Mesin", skpd: "BPKAD", tahunPerolehan: 2023, nilaiAset: 350000000, kondisi: "Baik", status: "Aktif" },
  { id: "AST-006", kodeBarang: "1.3.2.03.01", namaBarang: "Kendaraan Operasional Bus Mini", kategori: "Kendaraan", skpd: "Dinas Perhubungan", tahunPerolehan: 2017, nilaiAset: 320000000, kondisi: "Rusak Ringan", status: "Dipinjamkan" },
  { id: "AST-007", kodeBarang: "1.3.5.01.03", namaBarang: "Sistem Informasi Manajemen Aset Daerah (SIMDA)", kategori: "Aset Tak Berwujud", skpd: "BPKAD", tahunPerolehan: 2021, nilaiAset: 600000000, kondisi: "Baik", status: "Aktif" },
  { id: "AST-008", kodeBarang: "1.3.2.02.12", namaBarang: "Genset Industri 500 KVA Data Center", kategori: "Peralatan & Mesin", skpd: "Dinas Kominfo", tahunPerolehan: 2016, nilaiAset: 420000000, kondisi: "Rusak Berat", status: "Proses Penghapusan" },
  { id: "AST-009", kodeBarang: "1.3.4.01.01", namaBarang: "Jaringan Irigasi Primer Malioboro", kategori: "Jalan, Irigasi & Jaringan", skpd: "Dinas PUPR", tahunPerolehan: 2019, nilaiAset: 8900000000, kondisi: "Baik", status: "Aktif" },
  { id: "AST-010", kodeBarang: "1.3.2.02.08", namaBarang: "Printer Laser Heavy Duty Office (5 Unit)", kategori: "Peralatan & Mesin", skpd: "Dinas Pendidikan", tahunPerolehan: 2019, nilaiAset: 75000000, kondisi: "Rusak Ringan", status: "Proses Penghapusan" },
  { id: "AST-011", kodeBarang: "1.3.2.04.05", namaBarang: "Motor Operasional Lapangan (15 Unit)", kategori: "Kendaraan", skpd: "Satpol PP", tahunPerolehan: 2022, nilaiAset: 375000000, kondisi: "Baik", status: "Aktif" },
  { id: "AST-012", kodeBarang: "1.3.3.02.01", namaBarang: "Gedung Puskesmas Danurejan II", kategori: "Gedung & Bangunan", skpd: "Dinas Kesehatan", tahunPerolehan: 2014, nilaiAset: 6800000000, kondisi: "Baik", status: "Aktif" },
  { id: "AST-013", kodeBarang: "1.3.2.02.20", namaBarang: "Proyektor Laser High Lumens", kategori: "Peralatan & Mesin", skpd: "Dinas Pariwisata", tahunPerolehan: 2021, nilaiAset: 95000000, kondisi: "Baik", status: "Dipinjamkan" },
  { id: "AST-014", kodeBarang: "1.3.1.02.01", namaBarang: "Tanah Fasilitas Umum Kotabaru", kategori: "Tanah", skpd: "BPKAD", tahunPerolehan: 2012, nilaiAset: 18500000000, kondisi: "Baik", status: "Aktif" },
  { id: "AST-015", kodeBarang: "1.3.2.02.33", namaBarang: "AC Precision 10 PK Server Room", kategori: "Peralatan & Mesin", skpd: "Dinas Kominfo", tahunPerolehan: 2020, nilaiAset: 180000000, kondisi: "Rusak Ringan", status: "Aktif" },
];

export function DataTableDisplayModule() {
  const [assetData, setAssetData] = React.useState<BpkadAssetItem[]>(INITIAL_ASSETS);
  const [filterValues, setFilterValues] = React.useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [actionAlert, setActionAlert] = React.useState<string | null>(null);

  // Filter configuration fields for AdvanceFilterApp integration
  const filterFields: FilterFieldConfig[] = [
    {
      id: "kategori",
      label: "Kategori Aset",
      type: "select",
      options: [
        { label: "Tanah", value: "Tanah" },
        { label: "Peralatan & Mesin", value: "Peralatan & Mesin" },
        { label: "Kendaraan", value: "Kendaraan" },
        { label: "Gedung & Bangunan", value: "Gedung & Bangunan" },
        { label: "Jalan, Irigasi & Jaringan", value: "Jalan, Irigasi & Jaringan" },
        { label: "Aset Tak Berwujud", value: "Aset Tak Berwujud" },
      ],
    },
    {
      id: "skpd",
      label: "SKPD Pengelola",
      type: "select",
      options: [
        { label: "BPKAD", value: "BPKAD" },
        { label: "Dinas Kominfo", value: "Dinas Kominfo" },
        { label: "Secretariat Daerah", value: "Secretariat Daerah" },
        { label: "Dinas Perhubungan", value: "Dinas Perhubungan" },
        { label: "Dinas PUPR", value: "Dinas PUPR" },
        { label: "Dinas Kesehatan", value: "Dinas Kesehatan" },
      ],
    },
    {
      id: "kondisi",
      label: "Kondisi Aset",
      type: "select",
      options: [
        { label: "Baik", value: "Baik" },
        { label: "Rusak Ringan", value: "Rusak Ringan" },
        { label: "Rusak Berat", value: "Rusak Berat" },
      ],
    },
    {
      id: "status",
      label: "Status Aset",
      type: "select",
      options: [
        { label: "Aktif", value: "Aktif" },
        { label: "Proses Penghapusan", value: "Proses Penghapusan" },
        { label: "Dipinjamkan", value: "Dipinjamkan" },
      ],
    },
  ];

  // Apply filters on dataset
  const filteredData = React.useMemo(() => {
    return assetData.filter((item) => {
      if (filterValues.kategori && item.kategori !== filterValues.kategori) return false;
      if (filterValues.skpd && item.skpd !== filterValues.skpd) return false;
      if (filterValues.kondisi && item.kondisi !== filterValues.kondisi) return false;
      if (filterValues.status && item.status !== filterValues.status) return false;
      return true;
    });
  }, [assetData, filterValues]);

  // Format currency Helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // TanStack Table Column Definitions
  const columns: ColumnDef<BpkadAssetItem>[] = [
    {
      accessorKey: "kodeBarang",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Kode Barang" />,
      cell: ({ row }) => (
        <span className="font-mono text-xs font-bold text-vibrant-purple-dark bg-vibrant-purple/10 dark:bg-vibrant-purple/20 px-2 py-1 rounded-md">
          {row.getValue("kodeBarang")}
        </span>
      ),
    },
    {
      accessorKey: "namaBarang",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Barang / Aset" />,
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-ink font-display text-sm leading-tight">
            {row.getValue("namaBarang")}
          </span>
          <span className="text-[11px] text-ink-muted">
            ID: {row.original.id} • Thn Perolehan: {row.original.tahunPerolehan}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "kategori",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Kategori" />,
      cell: ({ row }) => (
        <BadgeApp id={`badge-kategori-${row.id}`} variant="neutral" size="sm">
          {row.getValue("kategori")}
        </BadgeApp>
      ),
    },
    {
      accessorKey: "skpd",
      header: ({ column }) => <DataTableColumnHeader column={column} title="SKPD Pengelola" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-xs text-ink-secondary">
          <Building2 className="w-3.5 h-3.5 text-ink-muted shrink-0" />
          <span>{row.getValue("skpd")}</span>
        </div>
      ),
    },
    {
      accessorKey: "nilaiAset",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nilai Perolehan" />,
      cell: ({ row }) => (
        <span className="font-mono font-bold text-ink text-xs">
          {formatCurrency(row.getValue("nilaiAset"))}
        </span>
      ),
    },
    {
      accessorKey: "kondisi",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Kondisi" />,
      cell: ({ row }) => {
        const val = row.getValue("kondisi") as string;
        if (val === "Baik") {
          return (
            <BadgeApp id={`badge-kondisi-${row.id}`} variant="success" size="sm" className="gap-1">
              <CheckCircle2 className="w-3 h-3" /> Baik
            </BadgeApp>
          );
        }
        if (val === "Rusak Ringan") {
          return (
            <BadgeApp id={`badge-kondisi-${row.id}`} variant="yellow" size="sm" className="gap-1">
              <Clock className="w-3 h-3" /> Rusak Ringan
            </BadgeApp>
          );
        }
        return (
          <BadgeApp id={`badge-kondisi-${row.id}`} variant="danger" size="sm" className="gap-1">
            <AlertTriangle className="w-3 h-3" /> Rusak Berat
          </BadgeApp>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const val = row.getValue("status") as string;
        if (val === "Aktif") {
          return <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">● Aktif</span>;
        }
        if (val === "Dipinjamkan") {
          return <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">● Dipinjamkan</span>;
        }
        return <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">● Penghapusan</span>;
      },
    },
  ];

  // Bulk Handlers
  const handleDeleteSelected = (selectedRows: BpkadAssetItem[], clearSelection: () => void) => {
    const idsToDelete = new Set(selectedRows.map((item) => item.id));
    setAssetData((prev) => prev.filter((item) => !idsToDelete.has(item.id)));
    clearSelection();
    setActionAlert(`Berhasil menghapus ${selectedRows.length} aset secara massal.`);
    setTimeout(() => setActionAlert(null), 4000);
  };

  const handleExportSelected = (selectedRows: BpkadAssetItem[]) => {
    setActionAlert(`Mengekspor ${selectedRows.length} data aset terpilih ke format CSV/Excel.`);
    setTimeout(() => setActionAlert(null), 4000);
  };

  const handleResetData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setAssetData(INITIAL_ASSETS);
      setFilterValues({});
      setIsLoading(false);
      setActionAlert("Data aset berhasil direset ke keadaan semula.");
      setTimeout(() => setActionAlert(null), 3000);
    }, 400);
  };

  return (
    <ModuleCard
      id="uikit-datatable-module"
      icon={<TableProperties className="w-5 h-5 text-vibrant-purple-dark" />}
      title="DataTableApp (Tabel Data Terintegrasi TanStack Table)"
      description="Tabel data performan dengan sorting kolom, pencarian global, pemilihan baris massal (bulk action), filter terpadu, dan kontrol paginasi."
    >
      <div className="space-y-6">
        {/* Action Notification Alert */}
        {actionAlert && (
          <AlertApp id="datatable-action-alert" variant="success" className="items-center">
            <AlertIconApp id="datatable-alert-icon">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            </AlertIconApp>
            <div className="flex-1 text-left">
              <AlertTitleApp id="datatable-alert-title">Aksi Berhasil</AlertTitleApp>
              <AlertDescriptionApp id="datatable-alert-desc" className="mt-0.5">{actionAlert}</AlertDescriptionApp>
            </div>
          </AlertApp>
        )}

        {/* COMBINED FILTER & TOOLBAR DEMO */}
        <div className="p-4 bg-surface-soft/40 border border-hairline-soft rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <AdvanceFilterApp
              id="datatable-advance-filter"
              fields={filterFields}
              values={filterValues}
              onChange={setFilterValues}
              displayMode="drawer"
              title="Filter Lanjutan Aset BPKAD"
              description="Pilih kriteria kategori, SKPD, atau kondisi untuk menyaring data"
              triggerLabel="Filter Lanjutan"
            />

            <ButtonApp
              id="datatable-reset-all"
              variant="ghost"
              size="sm"
              onClick={handleResetData}
              className="text-xs text-ink-muted hover:text-ink inline-flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Data
            </ButtonApp>
          </div>

          <div className="flex items-center gap-2">
            <ButtonApp
              id="datatable-export-all"
              variant="secondary"
              size="sm"
              onClick={() => handleExportSelected(filteredData)}
              className="inline-flex items-center gap-1.5 text-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" /> Ekspor Semua ({filteredData.length})
            </ButtonApp>
          </div>
        </div>

        {/* THE MAIN DATATABLE APP ORGANISM */}
        <DataTableApp
          id="bpkad-asset-datatable"
          title="Daftar Aset & Barang Daerah"
          description="Aset Terdaftar pada Badan Pengelolaan Keuangan dan Aset Daerah Kota Yogyakarta"
          data={filteredData}
          columns={columns}
          pageSize={5}
          enablePagination={true}
          enableSearch={true}
          enableRowSelection={true}
          isLoading={isLoading}
          onDeleteSelected={handleDeleteSelected}
          onExportSelected={handleExportSelected}
        />
      </div>
    </ModuleCard>
  );
}
