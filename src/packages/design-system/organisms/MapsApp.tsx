import * as React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Navigation,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Search,
  Compass,
  Filter,
  X,
  ChevronRight,
  ExternalLink,
  Phone,
  Mail,
  Globe,
  Star,
  Check,
} from "lucide-react";
import { ButtonApp } from "../atoms/ButtonApp";
import { BadgeApp } from "../atoms/BadgeApp";
import { InputApp } from "../atoms/InputApp";
import { TextApp } from "../atoms/TextApp";

export type TileProvider = "carto-light" | "carto-dark" | "openstreetmap" | "satellite" | "voyager";

export type MarkerColor =
  | "purple"
  | "emerald"
  | "amber"
  | "red"
  | "blue"
  | "indigo"
  | "slate"
  | "brand";

export interface MapMarker {
  id: string;
  position: [number, number]; // [lat, lng]
  title: string;
  description?: string;
  category?: string;
  address?: string;
  badge?: string;
  badgeVariant?: "neutral" | "vibrantPurple" | "brand" | "success" | "warning" | "danger" | "info";
  color?: MarkerColor;
  avatarUrl?: string;
  rating?: number;
  phone?: string;
  email?: string;
  website?: string;
  status?: "active" | "inactive" | "busy" | "pending";
  tags?: string[];
  data?: Record<string, any>;
  customPopupContent?: React.ReactNode;
}

export interface MapPolygon {
  id: string;
  positions: [number, number][];
  title?: string;
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
  weight?: number;
  popup?: string;
}

export interface MapPolyline {
  id: string;
  positions: [number, number][];
  title?: string;
  color?: string;
  weight?: number;
  dashArray?: string;
}

export interface MapsAppProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  center?: [number, number];
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  height?: string | number;
  markers?: MapMarker[];
  polygons?: MapPolygon[];
  polylines?: MapPolyline[];
  selectedMarkerId?: string;
  onMarkerSelect?: (marker: MapMarker | null) => void;
  onMapClick?: (coords: [number, number]) => void;
  tileProvider?: TileProvider;
  autoTileTheme?: boolean; // automatically pick carto-dark in dark mode
  showSearch?: boolean;
  showCategoryFilter?: boolean;
  showControls?: boolean;
  showDetailCard?: boolean;
  enableClickAdd?: boolean;
  addedPinLabel?: string;
  className?: string;
}

const TILE_URLS: Record<TileProvider, { url: string; attribution: string }> = {
  "carto-light": {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  "carto-dark": {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  openstreetmap: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  voyager: {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
    attribution: '&copy; CARTO',
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  },
};

const MARKER_COLOR_CLASSES: Record<MarkerColor, { bg: string; text: string; ring: string }> = {
  purple: { bg: "#8b5cf6", text: "#ffffff", ring: "rgba(139, 92, 246, 0.4)" },
  emerald: { bg: "#10b981", text: "#ffffff", ring: "rgba(16, 185, 129, 0.4)" },
  amber: { bg: "#f59e0b", text: "#ffffff", ring: "rgba(245, 158, 11, 0.4)" },
  red: { bg: "#ef4444", text: "#ffffff", ring: "rgba(239, 68, 68, 0.4)" },
  blue: { bg: "#3b82f6", text: "#ffffff", ring: "rgba(59, 130, 246, 0.4)" },
  indigo: { bg: "#6366f1", text: "#ffffff", ring: "rgba(99, 102, 241, 0.4)" },
  slate: { bg: "#64748b", text: "#ffffff", ring: "rgba(100, 116, 139, 0.4)" },
  brand: { bg: "#7c3aed", text: "#ffffff", ring: "rgba(124, 58, 237, 0.4)" },
};

export function createCustomMarkerIcon(
  color: MarkerColor = "purple",
  badge?: string,
  isSelected?: boolean,
  avatarUrl?: string
) {
  const config = MARKER_COLOR_CLASSES[color] || MARKER_COLOR_CLASSES.purple;
  const size = isSelected ? 42 : 34;

  let content = `<div style="
    width: ${size}px;
    height: ${size}px;
    background-color: ${config.bg};
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px ${config.ring};
    border: 2px solid #ffffff;
    transition: all 0.2s ease-in-out;
  ">`;

  if (avatarUrl) {
    content += `<img src="${avatarUrl}" style="
      width: ${size - 10}px;
      height: ${size - 10}px;
      border-radius: 50%;
      object-fit: cover;
      transform: rotate(45deg);
    "/>`;
  } else if (badge) {
    content += `<span style="
      color: ${config.text};
      font-size: ${isSelected ? 12 : 10}px;
      font-weight: 700;
      transform: rotate(45deg);
    ">${badge}</span>`;
  } else {
    content += `<svg xmlns="http://www.w3.org/2000/svg" width="${isSelected ? 18 : 14}" height="${isSelected ? 18 : 14}" viewBox="0 0 24 24" fill="none" stroke="${config.text}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(45deg);"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
  }

  content += `</div>`;

  return L.divIcon({
    html: content,
    className: "custom-leaflet-pin",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

export function MapsApp({
  id = "maps-app-root",
  center = [-6.2088, 106.8456], // Default Jakarta
  zoom = 12,
  minZoom = 3,
  maxZoom = 18,
  height = "480px",
  markers = [],
  polygons = [],
  polylines = [],
  selectedMarkerId,
  onMarkerSelect,
  onMapClick,
  tileProvider: customTileProvider,
  autoTileTheme = true,
  showSearch = true,
  showCategoryFilter = true,
  showControls = true,
  showDetailCard = true,
  enableClickAdd = false,
  addedPinLabel = "Pin Baru",
  className,
  ...props
}: MapsAppProps) {
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<L.Map | null>(null);
  const layerGroupRef = React.useRef<L.LayerGroup | null>(null);
  const tileLayerRef = React.useRef<L.TileLayer | null>(null);

  const [activeTile, setActiveTile] = React.useState<TileProvider>(customTileProvider || "carto-light");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [selectedMarker, setSelectedMarker] = React.useState<MapMarker | null>(null);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [clickedCoords, setClickedCoords] = React.useState<[number, number] | null>(null);

  // Auto detect dark mode tile provider
  React.useEffect(() => {
    if (!customTileProvider && autoTileTheme) {
      const isDark = document.documentElement.classList.contains("dark");
      setActiveTile(isDark ? "carto-dark" : "carto-light");
    } else if (customTileProvider) {
      setActiveTile(customTileProvider);
    }
  }, [customTileProvider, autoTileTheme]);

  // Sync external selectedMarkerId prop
  React.useEffect(() => {
    if (selectedMarkerId) {
      const found = markers.find((m) => m.id === selectedMarkerId);
      if (found) {
        setSelectedMarker(found);
      }
    }
  }, [selectedMarkerId, markers]);

  // Unique Categories from markers
  const categories = React.useMemo(() => {
    const set = new Set<string>();
    markers.forEach((m) => {
      if (m.category) set.add(m.category);
    });
    return ["all", ...Array.from(set)];
  }, [markers]);

  // Filtered markers based on search and category
  const filteredMarkers = React.useMemo(() => {
    return markers.filter((m) => {
      const matchesCategory = selectedCategory === "all" || m.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        m.title.toLowerCase().includes(q) ||
        (m.description && m.description.toLowerCase().includes(q)) ||
        (m.address && m.address.toLowerCase().includes(q)) ||
        (m.category && m.category.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [markers, selectedCategory, searchQuery]);

  // Initialize Map
  React.useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center,
        zoom,
        minZoom,
        maxZoom,
        zoomControl: false, // Custom styled zoom control
      });

      const tileConfig = TILE_URLS[activeTile];
      const tileLayer = L.tileLayer(tileConfig.url, {
        attribution: tileConfig.attribution,
        maxZoom,
      }).addTo(map);

      const layerGroup = L.layerGroup().addTo(map);

      mapRef.current = map;
      tileLayerRef.current = tileLayer;
      layerGroupRef.current = layerGroup;

      // Map Click Event
      map.on("click", (e: L.LeafletMouseEvent) => {
        const coords: [number, number] = [e.latlng.lat, e.latlng.lng];
        if (enableClickAdd) {
          setClickedCoords(coords);
        }
        if (onMapClick) {
          onMapClick(coords);
        }
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer when activeTile changes
  React.useEffect(() => {
    if (mapRef.current && tileLayerRef.current) {
      tileLayerRef.current.remove();
      const tileConfig = TILE_URLS[activeTile];
      tileLayerRef.current = L.tileLayer(tileConfig.url, {
        attribution: tileConfig.attribution,
        maxZoom,
      }).addTo(mapRef.current);
    }
  }, [activeTile, maxZoom]);

  // Render Markers, Polygons, and Polylines
  React.useEffect(() => {
    if (!mapRef.current || !layerGroupRef.current) return;

    layerGroupRef.current.clearLayers();

    // Render Polygons
    polygons.forEach((poly) => {
      const polygonLayer = L.polygon(poly.positions, {
        color: poly.color || "#8b5cf6",
        fillColor: poly.fillColor || "#8b5cf6",
        fillOpacity: poly.fillOpacity ?? 0.2,
        weight: poly.weight || 2,
      }).addTo(layerGroupRef.current!);

      if (poly.popup) {
        polygonLayer.bindPopup(poly.popup);
      }
    });

    // Render Polylines
    polylines.forEach((line) => {
      L.polyline(line.positions, {
        color: line.color || "#3b82f6",
        weight: line.weight || 3,
        dashArray: line.dashArray,
      }).addTo(layerGroupRef.current!);
    });

    // Render Markers
    filteredMarkers.forEach((m) => {
      const isSelected = selectedMarker?.id === m.id;
      const icon = createCustomMarkerIcon(m.color || "purple", m.badge, isSelected, m.avatarUrl);

      const marker = L.marker(m.position, { icon }).addTo(layerGroupRef.current!);

      marker.on("click", () => {
        setSelectedMarker(m);
        if (onMarkerSelect) onMarkerSelect(m);
        mapRef.current?.panTo(m.position);
      });
    });

    // Render Clicked Coords Pin if enabled
    if (clickedCoords) {
      const clickIcon = createCustomMarkerIcon("red", "+", true);
      const clickMarker = L.marker(clickedCoords, { icon: clickIcon }).addTo(layerGroupRef.current!);
      clickMarker.bindPopup(`<strong>${addedPinLabel}</strong><br/>Lat: ${clickedCoords[0].toFixed(5)}, Lng: ${clickedCoords[1].toFixed(5)}`).openPopup();
    }
  }, [filteredMarkers, polygons, polylines, selectedMarker, clickedCoords, enableClickAdd, addedPinLabel]);

  // Map Controls Helpers
  const handleZoomIn = () => mapRef.current?.zoomIn();
  const handleZoomOut = () => mapRef.current?.zoomOut();
  const handleResetView = () => {
    if (mapRef.current) {
      if (filteredMarkers.length > 0) {
        const bounds = L.latLngBounds(filteredMarkers.map((m) => m.position));
        mapRef.current.fitBounds(bounds, { padding: [40, 40] });
      } else {
        mapRef.current.setView(center, zoom);
      }
    }
  };

  const handleLocateMe = () => {
    if ("geolocation" in navigator && mapRef.current) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userCoords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          mapRef.current?.flyTo(userCoords, 15);
          if (enableClickAdd) setClickedCoords(userCoords);
        },
        (err) => console.warn("Geolocation error:", err.message),
        { enableHighAccuracy: true }
      );
    }
  };

  const toggleTile = () => {
    const tileOptions: TileProvider[] = ["carto-light", "carto-dark", "openstreetmap", "satellite", "voyager"];
    const currentIndex = tileOptions.indexOf(activeTile);
    const nextIndex = (currentIndex + 1) % tileOptions.length;
    setActiveTile(tileOptions[nextIndex]);
  };

  return (
    <div
      id={id}
      data-ui-id={id}
      className={cn(
        "relative rounded-2xl overflow-hidden border border-hairline-soft bg-surface shadow-xs transition-all flex flex-col md:flex-row max-w-full",
        isFullscreen && "fixed inset-0 z-50 rounded-none h-screen w-screen border-none",
        className
      )}
      style={{ height: isFullscreen ? "100vh" : height }}
      {...props}
    >
      {/* Map Canvas Container */}
      <div className="relative flex-1 h-full w-full overflow-hidden">
        <div ref={mapContainerRef} className="h-full w-full z-0" />

        {/* Overlay Search & Category Filter Bar */}
        {(showSearch || showCategoryFilter) && (
          <div className="absolute top-3 left-3 right-3 sm:right-auto sm:max-w-md z-10 space-y-2 pointer-events-auto">
            {showSearch && (
              <div className="relative flex items-center bg-surface/90 backdrop-blur-md rounded-xl border border-hairline-soft shadow-md px-3 py-1.5 gap-2">
                <Search className="w-4 h-4 text-ink-muted shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari lokasi, alamat, atau kategori..."
                  className="w-full bg-transparent text-xs text-ink placeholder:text-ink-muted focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-1 text-ink-muted hover:text-ink rounded-full"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {showCategoryFilter && categories.length > 2 && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-2.5 py-1 text-[11px] font-semibold rounded-full border transition-all whitespace-nowrap shadow-2xs backdrop-blur-md cursor-pointer",
                      selectedCategory === cat
                        ? "bg-vibrant-purple text-white border-vibrant-purple"
                        : "bg-surface/80 text-ink-secondary border-hairline-soft hover:bg-surface hover:text-ink"
                    )}
                  >
                    {cat === "all" ? "Semua Lokasi" : cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Floating Map Controls */}
        {showControls && (
          <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1.5 pointer-events-auto">
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-2 bg-surface/90 backdrop-blur-md text-ink hover:text-vibrant-purple rounded-xl border border-hairline-soft shadow-md transition-all active:scale-95"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-2 bg-surface/90 backdrop-blur-md text-ink hover:text-vibrant-purple rounded-xl border border-hairline-soft shadow-md transition-all active:scale-95"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetView}
              title="Fit Bounds"
              className="p-2 bg-surface/90 backdrop-blur-md text-ink hover:text-vibrant-purple rounded-xl border border-hairline-soft shadow-md transition-all active:scale-95"
            >
              <Compass className="w-4 h-4" />
            </button>
            <button
              onClick={handleLocateMe}
              title="Lokasi Saya"
              className="p-2 bg-surface/90 backdrop-blur-md text-ink hover:text-vibrant-purple rounded-xl border border-hairline-soft shadow-md transition-all active:scale-95"
            >
              <Navigation className="w-4 h-4" />
            </button>
            <button
              onClick={toggleTile}
              title={`Ubah Layer Map (${activeTile})`}
              className="p-2 bg-surface/90 backdrop-blur-md text-ink hover:text-vibrant-purple rounded-xl border border-hairline-soft shadow-md transition-all active:scale-95"
            >
              <Layers className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? "Keluar Fullscreen" : "Layar Penuh"}
              className="p-2 bg-surface/90 backdrop-blur-md text-ink hover:text-vibrant-purple rounded-xl border border-hairline-soft shadow-md transition-all active:scale-95"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* Side Marker Detail Card Overlay (Desktop / Mobile Drawer) */}
      {showDetailCard && selectedMarker && (
        <div className="w-full md:w-80 bg-surface border-t md:border-t-0 md:border-l border-hairline-soft p-4 flex flex-col justify-between shrink-0 max-h-72 md:max-h-full overflow-y-auto animate-in slide-in-from-bottom-2 md:slide-in-from-right-2 duration-200 z-20">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                {selectedMarker.category && (
                  <BadgeApp id={`map-badge-${selectedMarker.id}`} variant="vibrantPurple" size="sm" className="mb-1 text-[10px]">
                    {selectedMarker.category}
                  </BadgeApp>
                )}
                <h4 className="text-sm font-bold text-ink leading-snug">{selectedMarker.title}</h4>
              </div>
              <button
                onClick={() => {
                  setSelectedMarker(null);
                  if (onMarkerSelect) onMarkerSelect(null);
                }}
                className="p-1 text-ink-muted hover:text-ink rounded-lg hover:bg-surface-soft"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedMarker.address && (
              <p className="text-xs text-ink-secondary flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-vibrant-purple shrink-0 mt-0.5" />
                <span>{selectedMarker.address}</span>
              </p>
            )}

            {selectedMarker.description && (
              <p className="text-xs text-ink-muted leading-relaxed line-clamp-3">
                {selectedMarker.description}
              </p>
            )}

            {selectedMarker.rating && (
              <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{selectedMarker.rating.toFixed(1)}</span>
                <span className="text-ink-muted text-[10px] font-normal">(Rating Pengguna)</span>
              </div>
            )}

            {/* Custom Contact Info */}
            <div className="space-y-1.5 pt-2 border-t border-hairline-soft text-xs text-ink-secondary">
              {selectedMarker.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-ink-muted" />
                  <span>{selectedMarker.phone}</span>
                </div>
              )}
              {selectedMarker.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-ink-muted" />
                  <span>{selectedMarker.email}</span>
                </div>
              )}
              {selectedMarker.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-ink-muted" />
                  <a
                    href={selectedMarker.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-vibrant-purple hover:underline flex items-center gap-1"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {selectedMarker.tags && selectedMarker.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-2">
                {selectedMarker.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] bg-surface-soft text-ink-muted rounded-md border border-hairline-soft"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {selectedMarker.customPopupContent && (
              <div className="pt-2">{selectedMarker.customPopupContent}</div>
            )}
          </div>

          <div className="pt-3 border-t border-hairline-soft flex items-center gap-2">
            <ButtonApp
              id="map-detail-direction-btn"
              variant="vibrantPurple"
              size="sm"
              className="w-full text-xs gap-1.5"
              onClick={() => {
                const url = `https://www.google.com/maps/search/?api=1&query=${selectedMarker.position[0]},${selectedMarker.position[1]}`;
                window.open(url, "_blank");
              }}
            >
              <span>Petunjuk Arah</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </ButtonApp>
          </div>
        </div>
      )}
    </div>
  );
}
