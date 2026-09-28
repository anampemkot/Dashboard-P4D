import * as React from "react";
import { MapsApp, MapMarker, MapPolygon, MapPolyline, BadgeApp, ButtonApp, TextApp } from "@/packages/design-system";
import { Map, MapPin, Layers, Navigation, Info } from "lucide-react";
import { ModuleCard } from "./ModuleCard";

export function MapsDisplayModule() {
  const sampleMarkers: MapMarker[] = [
    {
      id: "loc-1",
      position: [-6.2088, 106.8456],
      title: "Kantor Pusat BPKAD DKI / Yogya",
      description: "Pusat pelayanan utama pengelolaan keuangan dan aset daerah.",
      category: "Cabang Utama",
      address: "Jl. Balai Kota No.1, Pusat Kota",
      badge: "Pusat",
      badgeVariant: "brand",
      color: "brand",
      rating: 4.9,
      phone: "(0274) 555-0192",
      email: "info@bpkad.go.id",
      website: "https://bpkad.go.id",
      status: "active",
      tags: ["KantorPusat", "PelayananAset", "BPKAD"],
    },
    {
      id: "loc-2",
      position: [-6.195, 106.823],
      title: "Gudang Logistik & Depo Aset A",
      description: "Fasilitas penyimpanan sarana dan aset fisik pemerintah daerah.",
      category: "Gudang Logistik",
      address: "Jl. Industri Raya No. 45, Sektor 2",
      badge: "Gudang",
      badgeVariant: "vibrantPurple",
      color: "purple",
      rating: 4.7,
      phone: "(021) 789-4321",
      status: "active",
      tags: ["Logistik", "Inventaris"],
    },
    {
      id: "loc-3",
      position: [-6.225, 106.808],
      title: "Kantor Cabang Pelayanan Selatan",
      description: "Pelayanan retribusi daerah dan verifikasi berkas pajak daerah.",
      category: "Cabang Pelayanan",
      address: "Jl. Sudirman Selatan No. 102",
      badge: "Cabang",
      badgeVariant: "info",
      color: "blue",
      rating: 4.6,
      phone: "(021) 555-8811",
      status: "active",
      tags: ["PelayananPajak", "Selatan"],
    },
    {
      id: "loc-4",
      position: [-6.238, 106.852],
      title: "Pos Inpeksi & Monitoring Lapangan",
      description: "Pos pantau aset tanah dan bangunan milik pemerintah daerah.",
      category: "Pos Lapangan",
      address: "Kawasan Timur Blok C3",
      badge: "Pos",
      badgeVariant: "warning",
      color: "amber",
      rating: 4.2,
      phone: "(021) 333-2211",
      status: "busy",
      tags: ["Inspeksi", "Monitoring"],
    },
    {
      id: "loc-5",
      position: [-6.18, 106.865],
      title: "Pusat Diklat & Laboratorium Inovasi",
      description: "Fasilitas pengembangan SDM aparatur dan pengujian aplikasi daerah.",
      category: "Diklat",
      address: "Jl. Pendidikan Aset No. 8",
      badge: "Diklat",
      badgeVariant: "success",
      color: "emerald",
      rating: 4.8,
      phone: "(021) 444-9000",
      status: "active",
      tags: ["Diklat", "Inovasi"],
    },
  ];

  const samplePolygons: MapPolygon[] = [
    {
      id: "zone-1",
      title: "Kawasan Aset Wilayah Pusat",
      positions: [
        [-6.20, 106.83],
        [-6.20, 106.86],
        [-6.22, 106.86],
        [-6.22, 106.83],
      ],
      color: "#8b5cf6",
      fillColor: "#8b5cf6",
      fillOpacity: 0.15,
      popup: "<strong>Kawasan Zonas BPKAD Pusat</strong><br/>Status: Zona Terverifikasi",
    },
  ];

  const samplePolylines: MapPolyline[] = [
    {
      id: "route-1",
      title: "Rute Distribusi Logistik",
      positions: [
        [-6.195, 106.823],
        [-6.2088, 106.8456],
        [-6.225, 106.808],
      ],
      color: "#3b82f6",
      weight: 4,
      dashArray: "6, 8",
    },
  ];

  const [selectedMarker, setSelectedMarker] = React.useState<MapMarker | null>(sampleMarkers[0]);
  const [clickedCoords, setClickedCoords] = React.useState<[number, number] | null>(null);

  return (
    <ModuleCard
      id="maps-app-module"
      icon={<Map className="w-5 h-5 text-vibrant-purple" />}
      title="Peta Interaktif Leaflet (MapsApp)"
      description="Komponen peta digital responsif berbasis Leaflet.js dengan dukungan pin marker kustom, zona polygon, rute polyline, filter pencarian, controls interaktif, dan penyesuaian mode gelap otomatis."
    >
      <div className="space-y-6">
        {/* Main Demo Map */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BadgeApp id="maps-demo-badge" variant="vibrantPurple" size="sm">Demo Peta Interaktif</BadgeApp>
              <span className="text-xs text-ink-muted">Klik marker untuk melihat kartu detail</span>
            </div>
            {clickedCoords && (
              <span className="text-xs text-emerald-600 font-medium">
                Koordinat Dipilih: [{clickedCoords[0].toFixed(4)}, {clickedCoords[1].toFixed(4)}]
              </span>
            )}
          </div>

          <MapsApp
            id="main-leaflet-demo"
            height="520px"
            center={[-6.2088, 106.8456]}
            zoom={13}
            markers={sampleMarkers}
            polygons={samplePolygons}
            polylines={samplePolylines}
            selectedMarkerId={selectedMarker?.id}
            onMarkerSelect={(m) => setSelectedMarker(m)}
            onMapClick={(coords) => setClickedCoords(coords)}
            enableClickAdd
            addedPinLabel="Lokasi Klik Peta"
          />
        </div>

        {/* Info Box */}
        <div className="p-4 bg-surface-soft border border-hairline-soft rounded-2xl flex items-start gap-3">
          <Info className="w-5 h-5 text-vibrant-purple shrink-0 mt-0.5" />
          <div className="text-xs text-ink-secondary space-y-1">
            <p className="font-semibold text-ink">Fitur Utama Komponen MapsApp:</p>
            <ul className="list-disc list-inside space-y-0.5 text-ink-muted">
              <li><strong>Flexibility Props:</strong> Mendukung <code className="bg-surface px-1 rounded">markers</code>, <code className="bg-surface px-1 rounded">polygons</code>, <code className="bg-surface px-1 rounded">polylines</code>, <code className="bg-surface px-1 rounded">tileProvider</code>, dan <code className="bg-surface px-1 rounded">height</code>.</li>
              <li><strong>Mode Gelap Otomatis:</strong> Beralih secara otomatis dari Carto Voyager ke Carto Dark Matter menyesuaikan preferensi tema website.</li>
              <li><strong>Filter & Pencarian:</strong> Bilah pencarian lokasi & pencarian cepat berdasarkan kategori lokasi.</li>
              <li><strong>Interaksi Klik:</strong> Fungsi <code className="bg-surface px-1 rounded">onMapClick</code> dan <code className="bg-surface px-1 rounded">enableClickAdd</code> untuk pengambilan koordinat lokasi baru secara presisi.</li>
            </ul>
          </div>
        </div>
      </div>
    </ModuleCard>
  );
}
