import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  AdvanceFilterApp,
  AvatarApp,
  BadgeApp,
  ButtonApp,
  CardApp,
  CheckboxApp,
  ColApp,
  ContainerApp,
  DataTableApp,
  DataTableColumnHeader,
  DialogApp,
  GridApp,
  InputApp,
  SearchBarApp,
  TabsApp,
  TextApp,
} from "@/packages/design-system";
import type { FilterFieldConfig } from "@/packages/design-system";
import {
  Archive,
  ArrowLeft,
  Building2,
  Download,
  Eye,
  Grid3X3,
  List,
  MapPin,
  Plus,
  Trash2,
} from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ShowcaseCard, ShowcaseGrid } from "./shared/ShowcaseCard";

export type DataManagementView = "list" | "grid" | "detail";

interface TaxObjectItem {
  id: string;
  nop: string;
  name: string;
  owner: string;
  category: "PBB-P2" | "BPHTB" | "PBJT" | "Reklame";
  district: string;
  address: string;
  value: number;
  status: "Aktif" | "Verifikasi" | "Tidak Aktif";
  updatedAt: string;
}

const DATA: TaxObjectItem[] = [
  {
    id: "OP-001",
    nop: "34.71.010.001.001-0001.0",
    name: "Hotel Malioboro Indah",
    owner: "PT Malioboro Sejahtera",
    category: "PBJT",
    district: "Gedongtengen",
    address: "Jl. Malioboro No. 45",
    value: 2850000000,
    status: "Aktif",
    updatedAt: "31 Jul 2026",
  },
  {
    id: "OP-002",
    nop: "34.71.020.002.002-0002.0",
    name: "Tanah Komersial Kotabaru",
    owner: "Budi Santoso",
    category: "PBB-P2",
    district: "Gondokusuman",
    address: "Jl. Suroto No. 12",
    value: 1725000000,
    status: "Aktif",
    updatedAt: "30 Jul 2026",
  },
  {
    id: "OP-003",
    nop: "34.71.030.003.003-0003.0",
    name: "Restoran Taman Sari",
    owner: "CV Rasa Jogja",
    category: "PBJT",
    district: "Kraton",
    address: "Jl. Taman No. 8",
    value: 840000000,
    status: "Verifikasi",
    updatedAt: "30 Jul 2026",
  },
  {
    id: "OP-004",
    nop: "34.71.040.004.004-0004.0",
    name: "Papan Reklame Sudirman",
    owner: "PT Media Kota",
    category: "Reklame",
    district: "Jetis",
    address: "Jl. Jend. Sudirman No. 21",
    value: 425000000,
    status: "Aktif",
    updatedAt: "29 Jul 2026",
  },
  {
    id: "OP-005",
    nop: "34.71.050.005.005-0005.0",
    name: "Gedung Perkantoran Giwangan",
    owner: "PT Karya Mandiri",
    category: "BPHTB",
    district: "Umbulharjo",
    address: "Jl. Imogiri Timur No. 77",
    value: 3150000000,
    status: "Verifikasi",
    updatedAt: "29 Jul 2026",
  },
  {
    id: "OP-006",
    nop: "34.71.060.006.006-0006.0",
    name: "Rumah Tinggal Wirobrajan",
    owner: "Siti Aminah",
    category: "PBB-P2",
    district: "Wirobrajan",
    address: "Jl. Kapten Tendean No. 14",
    value: 975000000,
    status: "Aktif",
    updatedAt: "28 Jul 2026",
  },
  {
    id: "OP-007",
    nop: "34.71.070.007.007-0007.0",
    name: "Kafe Prawirotaman",
    owner: "CV Muda Berkarya",
    category: "PBJT",
    district: "Mergangsan",
    address: "Jl. Prawirotaman No. 32",
    value: 690000000,
    status: "Aktif",
    updatedAt: "28 Jul 2026",
  },
  {
    id: "OP-008",
    nop: "34.71.080.008.008-0008.0",
    name: "Lahan Parkir Ngabean",
    owner: "Koperasi Ngabean",
    category: "PBB-P2",
    district: "Ngampilan",
    address: "Jl. KH Ahmad Dahlan",
    value: 1280000000,
    status: "Tidak Aktif",
    updatedAt: "27 Jul 2026",
  },
  {
    id: "OP-009",
    nop: "34.71.090.009.009-0009.0",
    name: "Mall Kawasan Urip Sumoharjo",
    owner: "PT Niaga Utama",
    category: "BPHTB",
    district: "Gondokusuman",
    address: "Jl. Urip Sumoharjo No. 99",
    value: 8250000000,
    status: "Aktif",
    updatedAt: "27 Jul 2026",
  },
  {
    id: "OP-010",
    nop: "34.71.100.010.010-0010.0",
    name: "Billboard Kusumanegara",
    owner: "PT Visual Nusantara",
    category: "Reklame",
    district: "Umbulharjo",
    address: "Jl. Kusumanegara No. 5",
    value: 380000000,
    status: "Verifikasi",
    updatedAt: "26 Jul 2026",
  },
  {
    id: "OP-011",
    nop: "34.71.110.011.011-0011.0",
    name: "Penginapan Sosrowijayan",
    owner: "Slamet Riyadi",
    category: "PBJT",
    district: "Gedongtengen",
    address: "Jl. Sosrowijayan No. 18",
    value: 1120000000,
    status: "Aktif",
    updatedAt: "26 Jul 2026",
  },
  {
    id: "OP-012",
    nop: "34.71.120.012.012-0012.0",
    name: "Ruko Pasar Kembang",
    owner: "PT Sentra Usaha",
    category: "PBB-P2",
    district: "Gedongtengen",
    address: "Jl. Pasar Kembang No. 20",
    value: 1450000000,
    status: "Aktif",
    updatedAt: "25 Jul 2026",
  },
];

const filters: FilterFieldConfig[] = [
  {
    id: "category",
    label: "Jenis Pajak",
    type: "select",
    options: ["PBB-P2", "BPHTB", "PBJT", "Reklame"].map((value) => ({
      label: value,
      value,
    })),
  },
  {
    id: "status",
    label: "Status",
    type: "select",
    options: ["Aktif", "Verifikasi", "Tidak Aktif"].map((value) => ({
      label: value,
      value,
    })),
  },
  {
    id: "district",
    label: "Kecamatan",
    type: "text",
    placeholder: "Cari kecamatan",
  },
  {
    id: "value",
    label: "Rentang Nilai Objek",
    type: "number-range",
    colSpan: 1,
  },
];

const formatCurrency = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;

const columns: ColumnDef<TaxObjectItem>[] = [
  {
    accessorKey: "nop",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NOP" />
    ),
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-[11px] font-mono text-ink-secondary">
        {row.original.nop}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Objek Pajak" />
    ),
    cell: ({ row }) => (
      <div>
        <div className="text-xs font-semibold text-ink">
          {row.original.name}
        </div>
        <div className="text-[10px] text-ink-muted">{row.original.owner}</div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jenis" />
    ),
    cell: ({ row }) => (
      <BadgeApp
        id={`dm-category-${row.original.id}`}
        variant="solidPurple"
        size="sm"
      >
        {row.original.category}
      </BadgeApp>
    ),
  },
  {
    accessorKey: "district",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kecamatan" />
    ),
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <div className="flex justify-end">
        <DataTableColumnHeader column={column} title="Nilai Objek" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-right text-xs font-semibold font-mono">
        {formatCurrency(row.original.value)}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <BadgeApp
        id={`dm-status-${row.original.id}`}
        variant={
          row.original.status === "Aktif"
            ? "success"
            : row.original.status === "Verifikasi"
              ? "yellow"
              : "neutral"
        }
        size="sm"
      >
        {row.original.status}
      </BadgeApp>
    ),
  },
];

function ViewToolbar({
  view,
  onViewChange,
  onAdd,
  onExport,
}: {
  view: DataManagementView;
  onViewChange: (view: DataManagementView) => void;
  onAdd: () => void;
  onExport: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        {view === "detail" ? (
          <ButtonApp
            id="dm-back-list"
            variant="secondary"
            size="sm"
            leftIcon={<ArrowLeft />}
            onClick={() => onViewChange("list")}
            className="h-[30px] min-h-[30px] px-2.5 text-[11px] [&_svg]:h-3 [&_svg]:w-3"
          >
            Kembali ke List
          </ButtonApp>
        ) : (
          <TabsApp
            id="dm-view-tabs"
            value={view}
            onValueChange={(value) => onViewChange(value as DataManagementView)}
            variant="vibrant"
            size="sm"
            rounded="md"
            className="w-auto min-w-0"
            listClassName="w-fit p-1"
            triggerClassName="h-[30px] min-h-[30px] gap-1.5 px-2 text-[11px] [&_svg]:h-3 [&_svg]:w-3"
            items={[
              { id: "list", label: "List", icon: <List /> },
              { id: "grid", label: "Grid", icon: <Grid3X3 /> },
            ]}
          />
        )}
      </div>
      <div className="flex items-center gap-1.5 self-start sm:self-auto">
        <ButtonApp
          id="dm-export"
          variant="secondary"
          size="sm"
          leftIcon={<Download />}
          onClick={onExport}
          className="h-[30px] min-h-[30px] px-2.5 text-[11px] [&_svg]:h-3 [&_svg]:w-3"
        >
          Export
        </ButtonApp>
        <ButtonApp
          id="dm-add"
          variant="primary"
          size="sm"
          leftIcon={<Plus />}
          onClick={onAdd}
          className="h-[30px] min-h-[30px] px-2.5 text-[11px] [&_svg]:h-3 [&_svg]:w-3"
        >
          Add New
        </ButtonApp>
      </div>
    </div>
  );
}

export function DataManagementDisplayModule({
  initialView = "list",
}: {
  initialView?: DataManagementView;
}) {
  const [view, setView] = React.useState<DataManagementView>(initialView);
  const [filterValues, setFilterValues] = React.useState<Record<string, any>>(
    {},
  );
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [activeId, setActiveId] = React.useState(DATA[0].id);
  const [addOpen, setAddOpen] = React.useState(false);
  const [message, setMessage] = React.useState(
    "Pilih view untuk mengeksplorasi data.",
  );
  const activeItem = DATA.find((item) => item.id === activeId) || DATA[0];
  const filtered = DATA.filter((item) => {
    const search = query.toLowerCase();
    if (
      search &&
      !`${item.name} ${item.owner} ${item.nop} ${item.district}`
        .toLowerCase()
        .includes(search)
    )
      return false;
    if (filterValues.category && item.category !== filterValues.category)
      return false;
    if (filterValues.status && item.status !== filterValues.status)
      return false;
    if (
      filterValues.district &&
      !item.district
        .toLowerCase()
        .includes(String(filterValues.district).toLowerCase())
    )
      return false;
    if (filterValues.value?.min && item.value < Number(filterValues.value.min))
      return false;
    if (filterValues.value?.max && item.value > Number(filterValues.value.max))
      return false;
    return true;
  });

  const filterControl = (
    <AdvanceFilterApp
      id="dm-advance-filter"
      fields={filters}
      values={filterValues}
      onChange={setFilterValues}
      onReset={() => setFilterValues({})}
      displayMode="drawer"
      title="Filter Data Objek Pajak"
      description="Saring data berdasarkan jenis pajak, status, kecamatan, dan nilai objek."
      triggerLabel="Filter Lanjutan"
      triggerVariant="secondary"
      triggerSize="sm"
      triggerRounded="md"
      triggerClassName="h-[30px] min-h-[30px] px-2.5 text-[11px] [&_svg]:h-3 [&_svg]:w-3"
      showActivePills={false}
    />
  );

  return (
    <ModuleCard
      id="uikit-data-management"
      icon={<Building2 className="h-5 w-5 text-vibrant-purple-dark" />}
      title="Data Management View"
      description="List, Grid, dan Detail View untuk pengelolaan objek pajak dengan search, filter, sorting, pagination, selection, bulk actions, add, dan export."
    >
      <ShowcaseGrid cols={1}>
        <ShowcaseCard
          id="data-management-showcase-views"
          title="List, Grid & Detail View"
          description="Search, filter lanjutan, sorting, pagination, selection, bulk actions, tambah data, dan export"
          align="start"
          code={`<DataTableApp id="dm-list" data={data} columns={columns} enableSearch enablePagination enableRowSelection />\n<GridApp id="dm-grid" variant="bento">{data.map((item) => <CardApp key={item.id}>...</CardApp>)}</GridApp>\n<DialogApp id="dm-add" isOpen={open} type="form">...</DialogApp>`}
        >
      <ContainerApp
        id="dm-container"
        fluid
        className="w-full space-y-4 px-0 sm:px-0 lg:px-0"
      >
        <ViewToolbar
          view={view}
          onViewChange={setView}
          onAdd={() => setAddOpen(true)}
          onExport={() => setMessage(`${filtered.length} data siap diekspor`)}
        />
        <TextApp id="dm-message" variant="micro" className="text-ink-muted">
          {message}
        </TextApp>

        {view === "list" && (
          <DataTableApp
            id="dm-list-table"
            title="Daftar Objek Pajak"
            description="Data objek dan wajib pajak terdaftar pada sistem P4D"
            data={filtered}
            columns={columns}
            enableSearch
            enablePagination
            enableRowSelection
            pageSize={5}
            striped
            toolbarLayout="singleRow"
            getRowId={(row) => row.id}
            onRowClick={(row) => {
              setActiveId(row.id);
              setView("detail");
            }}
            onExportSelected={(rows) =>
              setMessage(`${rows.length} data dipilih untuk ekspor`)
            }
            onDeleteSelected={(rows, clear) => {
              setMessage(`${rows.length} data masuk antrean penghapusan`);
              clear();
            }}
            rightHeaderAction={filterControl}
          />
        )}

        {view === "grid" && (
          <div className="space-y-4">
            <div className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-1">
              <SearchBarApp
                id="dm-grid-search"
                value={query}
                onSearchChange={setQuery}
                onClear={() => setQuery("")}
                placeholder="Cari objek pajak..."
                size="sm"
                className="w-64 shrink-0"
              />
              {filterControl}
            </div>
            {selected.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius-lg)] border border-vibrant-purple/30 bg-vibrant-purple/10 p-2.5">
                <span className="text-xs font-semibold text-ink">
                  {selected.length} card dipilih
                </span>
                <div className="flex gap-1.5">
                  <ButtonApp
                    id="dm-grid-archive"
                    variant="secondary"
                    size="sm"
                    leftIcon={<Archive />}
                    onClick={() =>
                      setMessage(`${selected.length} data diarsipkan`)
                    }
                    className="h-[30px] min-h-[30px] px-2.5 text-[11px]"
                  >
                    Arsipkan
                  </ButtonApp>
                  <ButtonApp
                    id="dm-grid-delete"
                    variant="error"
                    size="sm"
                    leftIcon={<Trash2 />}
                    onClick={() => {
                      setMessage(`${selected.length} data dihapus`);
                      setSelected([]);
                    }}
                    className="h-[30px] min-h-[30px] px-2.5 text-[11px]"
                  >
                    Hapus
                  </ButtonApp>
                </div>
              </div>
            )}
            <GridApp id="dm-card-grid" variant="bento" gap="sm">
              {filtered.map((item) => (
                <CardApp
                  key={item.id}
                  id={`dm-card-${item.id}`}
                  className="relative gap-3 p-4"
                >
                  <div className="absolute right-3 top-3">
                    <CheckboxApp
                      id={`dm-check-${item.id}`}
                      checked={selected.includes(item.id)}
                      onChange={(event) =>
                        setSelected((current) =>
                          event.target.checked
                            ? [...current, item.id]
                            : current.filter((id) => id !== item.id),
                        )
                      }
                      aria-label={`Pilih ${item.name}`}
                    />
                  </div>
                  <div className="flex items-center gap-3 pr-8">
                    <AvatarApp
                      id={`dm-avatar-${item.id}`}
                      name={item.name}
                      size="md"
                      variant="vibrant"
                    />
                    <div className="min-w-0">
                      <TextApp
                        id={`dm-name-${item.id}`}
                        variant="body2"
                        weight="bold"
                        className="truncate"
                      >
                        {item.name}
                      </TextApp>
                      <TextApp
                        id={`dm-nop-${item.id}`}
                        variant="micro"
                        className="truncate font-mono text-ink-muted"
                      >
                        {item.nop}
                      </TextApp>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <BadgeApp
                      id={`dm-card-category-${item.id}`}
                      variant="solidPurple"
                      size="sm"
                    >
                      {item.category}
                    </BadgeApp>
                    <BadgeApp
                      id={`dm-card-status-${item.id}`}
                      variant={
                        item.status === "Aktif"
                          ? "success"
                          : item.status === "Verifikasi"
                            ? "yellow"
                            : "neutral"
                      }
                      size="sm"
                    >
                      {item.status}
                    </BadgeApp>
                  </div>
                  <div className="space-y-1 border-t border-hairline-soft pt-3">
                    <div className="flex items-center gap-1.5 text-xs text-ink-secondary">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.district}
                    </div>
                    <div className="text-sm font-bold font-mono text-ink">
                      {formatCurrency(item.value)}
                    </div>
                  </div>
                  <ButtonApp
                    id={`dm-detail-${item.id}`}
                    variant="secondary"
                    size="sm"
                    leftIcon={<Eye />}
                    onClick={() => {
                      setActiveId(item.id);
                      setView("detail");
                    }}
                    className="h-[30px] min-h-[30px] px-2.5 text-[11px]"
                  >
                    Lihat Detail
                  </ButtonApp>
                </CardApp>
              ))}
            </GridApp>
          </div>
        )}

        {view === "detail" && (
          <GridApp
            id="dm-detail-grid"
            variant="full12"
            gap="md"
            cols={1}
            colsLg={12}
          >
            <ColApp id="dm-detail-list" span="full" spanLg={4}>
              <CardApp id="dm-detail-navigation" className="gap-2 p-3">
                <SearchBarApp
                  id="dm-detail-search"
                  value={query}
                  onSearchChange={setQuery}
                  onClear={() => setQuery("")}
                  placeholder="Cari data..."
                  size="sm"
                />
                {filtered.slice(0, 8).map((item) => (
                  <ButtonApp
                    key={item.id}
                    id={`dm-detail-nav-${item.id}`}
                    variant="ghost"
                    onClick={() => setActiveId(item.id)}
                    className={`h-auto min-h-0 flex-col items-start justify-start rounded-[var(--radius-md)] p-3 text-left font-normal ${activeId === item.id ? "bg-vibrant-purple/15 text-vibrant-purple-dark" : ""}`}
                  >
                    <span className="block w-full truncate text-xs font-semibold">
                      {item.name}
                    </span>
                    <span className="block w-full truncate text-[10px] font-mono text-ink-muted">
                      {item.nop}
                    </span>
                  </ButtonApp>
                ))}
              </CardApp>
            </ColApp>
            <ColApp id="dm-detail-content" span="full" spanLg={8}>
              <CardApp id="dm-object-detail" rounded="lg" className="gap-5 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <BadgeApp
                      id="dm-detail-category"
                      variant="solidPurple"
                      size="sm"
                    >
                      {activeItem.category}
                    </BadgeApp>
                    <TextApp
                      id="dm-detail-title"
                      variant="h2"
                      weight="bold"
                      className="mt-2"
                    >
                      {activeItem.name}
                    </TextApp>
                    <TextApp
                      id="dm-detail-owner"
                      variant="caption"
                      className="mt-1 text-ink-secondary"
                    >
                      {activeItem.owner}
                    </TextApp>
                  </div>
                  <BadgeApp
                    id="dm-detail-status"
                    variant={
                      activeItem.status === "Aktif"
                        ? "success"
                        : activeItem.status === "Verifikasi"
                          ? "yellow"
                          : "neutral"
                    }
                  >
                    {activeItem.status}
                  </BadgeApp>
                </div>
                <GridApp
                  id="dm-detail-fields"
                  variant="cards"
                  gap="sm"
                  cols={1}
                  colsSm={2}
                >
                  <CardApp
                    id="dm-field-nop"
                    variant="secondary"
                    size="sm"
                    rounded="md"
                    className="min-h-24 justify-start gap-2 p-4"
                  >
                    <TextApp
                      id="dm-field-nop-label"
                      variant="micro"
                      weight="semibold"
                      className="leading-none text-ink-muted"
                    >
                      Nomor Objek Pajak
                    </TextApp>
                    <span className="break-all text-xs font-semibold font-mono leading-relaxed text-ink">
                      {activeItem.nop}
                    </span>
                  </CardApp>
                  <CardApp
                    id="dm-field-value"
                    variant="secondary"
                    size="sm"
                    rounded="md"
                    className="min-h-24 justify-start gap-2 p-4"
                  >
                    <TextApp
                      id="dm-field-value-label"
                      variant="micro"
                      weight="semibold"
                      className="leading-none text-ink-muted"
                    >
                      Nilai Objek
                    </TextApp>
                    <span className="text-sm font-bold font-mono leading-relaxed text-ink">
                      {formatCurrency(activeItem.value)}
                    </span>
                  </CardApp>
                  <CardApp
                    id="dm-field-address"
                    variant="secondary"
                    size="sm"
                    rounded="md"
                    className="min-h-24 justify-start gap-2 p-4 sm:col-span-2"
                  >
                    <TextApp
                      id="dm-field-address-label"
                      variant="micro"
                      weight="semibold"
                      className="leading-none text-ink-muted"
                    >
                      Alamat
                    </TextApp>
                    <span className="text-xs font-semibold leading-relaxed text-ink">
                      {activeItem.address}, {activeItem.district}
                    </span>
                  </CardApp>
                </GridApp>
                <div className="flex flex-wrap justify-end gap-1.5">
                  <ButtonApp
                    id="dm-detail-archive"
                    variant="secondary"
                    size="sm"
                    leftIcon={<Archive />}
                    className="h-[30px] min-h-[30px] px-2.5 text-[11px]"
                  >
                    Arsipkan
                  </ButtonApp>
                  <ButtonApp
                    id="dm-detail-edit"
                    variant="primary"
                    size="sm"
                    className="h-[30px] min-h-[30px] px-2.5 text-[11px]"
                  >
                    Edit Data
                  </ButtonApp>
                </div>
              </CardApp>
            </ColApp>
          </GridApp>
        )}

        <DialogApp
          id="dm-add-dialog"
          isOpen={addOpen}
          onClose={() => setAddOpen(false)}
          title="Tambah Objek Pajak"
          description="Lengkapi informasi dasar objek pajak baru."
          type="form"
          size="md"
          footer={
            <>
              <ButtonApp
                id="dm-add-cancel"
                variant="secondary"
                size="sm"
                onClick={() => setAddOpen(false)}
                className="h-[30px] min-h-[30px] px-2.5 text-[11px]"
              >
                Batal
              </ButtonApp>
              <ButtonApp
                id="dm-add-save"
                variant="primary"
                size="sm"
                onClick={() => {
                  setMessage("Data baru berhasil disimpan");
                  setAddOpen(false);
                }}
                className="h-[30px] min-h-[30px] px-2.5 text-[11px]"
              >
                Simpan Data
              </ButtonApp>
            </>
          }
        >
          <GridApp
            id="dm-add-form-grid"
            variant="cards"
            gap="sm"
            cols={1}
            colsSm={2}
          >
            <InputApp
              id="dm-add-name"
              label="Nama Objek"
              placeholder="Masukkan nama objek"
            />
            <InputApp id="dm-add-nop" label="NOP" placeholder="Masukkan NOP" />
            <ColApp id="dm-add-owner-col" span="full" spanSm={2}>
              <InputApp
                id="dm-add-owner"
                label="Nama Pemilik"
                placeholder="Masukkan nama pemilik"
              />
            </ColApp>
          </GridApp>
        </DialogApp>
      </ContainerApp>
        </ShowcaseCard>
      </ShowcaseGrid>
    </ModuleCard>
  );
}
