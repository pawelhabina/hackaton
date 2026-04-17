import { useEffect, useRef } from "react";
import { Orbit, Radar, Waves } from "lucide-react";
import L from "leaflet";
import { LocationData, TimeKey } from "../lib/types";

type GdyniaMapProps = {
  locations: LocationData[];
  activeLocationId: string;
  activeTime: TimeKey;
  onSelectLocation: (locationId: string) => void;
};

export function GdyniaMap({
  locations,
  activeLocationId,
  activeTime,
  onSelectLocation,
}: GdyniaMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const activeCircleRef = useRef<L.Circle | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return;
    }

    const southWest = L.latLng(54.455, 18.457);
    const northEast = L.latLng(54.552, 18.615);
    const bounds = L.latLngBounds(southWest, northEast);

    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: false,
      maxBounds: bounds,
      maxBoundsViscosity: 0.9,
      preferCanvas: true,
    });

    map.setView([54.5178, 18.5326], 12.45);

    L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png", {
      minZoom: 0,
      maxZoom: 20,
      maxNativeZoom: 20,
      detectRetina: true,
      attribution:
        '&copy; <a href="https://stadiamaps.com/" target="_blank" rel="noreferrer">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank" rel="noreferrer">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>',
    }).addTo(map);

    L.control
      .zoom({
        position: "topright",
      })
      .addTo(map);

    L.control
      .attribution({
        position: "bottomright",
        prefix: false,
      })
      .addTo(map);

    locations.forEach((location, index) => {
      const icon = L.divIcon({
        className: "map-marker-shell",
        html: `
        <button type="button" class="map-marker" style="--marker-delay:${0.12 + index * 0.08}s">
        <span class="map-marker__pulse"></span>
        <span class="map-marker__core"></span>
        <span class="map-marker__label">${location.name}</span>
        </button>
      `,
        iconSize: [180, 96],
        iconAnchor: [90, 76],
      })

      const marker = L.marker([location.coordinates.lat, location.coordinates.lng], {
        icon,
        keyboard: false,
      }).addTo(map);

      marker.on("click", () => onSelectLocation(location.id));
      markersRef.current[location.id] = marker;
    });

    mapRef.current = map;

    return () => {
      Object.values(markersRef.current).forEach((marker) => marker.remove());
      markersRef.current = {};
      activeCircleRef.current?.remove();
      activeCircleRef.current = null;
      map.remove();
      mapRef.current = null;
    };
  }, [locations, onSelectLocation]);

  useEffect(() => {
    const map = mapRef.current;
    const activeLocation = locations.find((location) => location.id === activeLocationId);

    if (!map || !activeLocation) {
      return;
    }

    Object.entries(markersRef.current).forEach(([locationId, markerRef]) => {
      const isActive = locationId === activeLocationId;
      markerRef.getElement()?.querySelector(".map-marker")?.classList.toggle("is-active", isActive);
    });

    activeCircleRef.current?.remove();
    activeCircleRef.current = L.circle([activeLocation.coordinates.lat, activeLocation.coordinates.lng], {
      radius: 160,
      color: "rgba(186,230,253,0.82)",
      weight: 1,
      fillColor: "#7dd3fc",
      fillOpacity: 0.12,
      className: "leaflet-active-ring",
    }).addTo(map);

    map.flyTo({
      lat: activeLocation.coordinates.lat,
      lng: activeLocation.coordinates.lng,
    }, 13.1, {
      duration: 1.2,
      easeLinearity: 0.25,
    });
  }, [activeLocationId, locations]);

  return (
    <div className="glass-panel-strong relative min-h-[620px] overflow-hidden p-4 md:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(164,243,255,0.12),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(80,120,255,0.16),transparent_38%)]" />
      <div className="absolute inset-0 rounded-[2rem] border border-white/10" />
      <div className="map-scanline absolute inset-y-8 left-0 w-16 bg-gradient-to-r from-transparent via-cyan-100/10 to-transparent" />

      <div className="relative z-10 flex items-center justify-between gap-4 px-2 pb-6 pt-2">
        <div>
          <div className="text-xs uppercase tracking-[0.32em] text-slate-400">
            Interaktywna mapa Gdyni
          </div>
          <div className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
            Hologram miasta / tryb {activeTime}
          </div>
        </div>
        <div className="hidden gap-2 md:flex">
          <div className="glass-chip">
            <Orbit className="h-4 w-4 text-cyan-100" />
            6 hotspotów
          </div>
          <div className="glass-chip">
            <Radar className="h-4 w-4 text-cyan-100" />
            warstwa czasu
          </div>
        </div>
      </div>

      <div className="relative aspect-[1.05/1] overflow-hidden rounded-[2rem] border border-white/10 bg-[#061020]">
        <div ref={containerRef} className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(164,243,255,0.18),transparent_24%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.16),transparent_24%),linear-gradient(180deg,rgba(4,10,20,0.12),rgba(4,10,20,0.58))]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(140,180,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(140,180,255,0.08)_1px,transparent_1px)] bg-[size:58px_58px] opacity-35" />

        <div className="absolute left-[8%] top-[10%] rounded-full border border-cyan-100/10 bg-slate-950/55 px-3 py-1.5 text-[10px] uppercase tracking-[0.34em] text-cyan-50/75 backdrop-blur-xl">
          Port gdyński
        </div>
        <div className="absolute left-[38%] top-[24%] rounded-full border border-cyan-100/10 bg-slate-950/55 px-3 py-1.5 text-[10px] uppercase tracking-[0.34em] text-cyan-50/75 backdrop-blur-xl">
          Śródmieście
        </div>
        <div className="absolute left-[64%] top-[72%] rounded-full border border-cyan-100/10 bg-slate-950/55 px-3 py-1.5 text-[10px] uppercase tracking-[0.34em] text-cyan-50/75 backdrop-blur-xl">
          Orłowo
        </div>
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          <div className="glass-chip">
            <Waves className="h-4 w-4 text-cyan-100" />
            Realny układ miasta
          </div>
          <div className="glass-chip">Kliknij pinezkę albo użyj zoomu</div>
        </div>
      </div>
    </div>
  );
}
