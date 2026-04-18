import { AnimatePresence, motion } from "motion/react";
import { Compass, Orbit, Radar, Waves, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { timeStates } from "../data/locations";
import { ImageLightboxModal } from "./ImageLightboxModal";
import { LocationData, TimeKey } from "../lib/types";
import { LocationDetailsModal } from "./LocationDetailsModal";
import { TimeStateSwitcher } from "./TimeStateSwitcher";

type GdyniaMapProps = {
  locations: LocationData[];
  activeLocationId: string | null;
  activeTime: TimeKey;
  onSelectLocation: (locationId: string) => void;
  onTimeChange: (time: TimeKey) => void;
  onClearSelection: () => void;
};

export function GdyniaMap({
  locations,
  activeLocationId,
  activeTime,
  onSelectLocation,
  onTimeChange,
  onClearSelection,
}: GdyniaMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const activeCircleRef = useRef<L.Circle | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt: string;
    label: string;
  } | null>(null);

  const activeLocation =
    locations.find((location) => location.id === activeLocationId) ?? null;
  const activeState = timeStates.find((state) => state.key === activeTime);

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
        iconSize: [64, 64],
        iconAnchor: [32, 24],
      });

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

    if (!map) {
      return;
    }

    Object.entries(markersRef.current).forEach(([locationId, markerRef]) => {
      const isActive = locationId === activeLocationId;
      markerRef.getElement()?.querySelector(".map-marker")?.classList.toggle("is-active", isActive);
    });

    activeCircleRef.current?.remove();
    activeCircleRef.current = null;

    if (!activeLocation) {
      setIsDetailsOpen(false);
      setLightboxImage(null);
      return;
    }

    activeCircleRef.current = L.circle([activeLocation.coordinates.lat, activeLocation.coordinates.lng], {
      radius: 160,
      color: "rgba(186,230,253,0.82)",
      weight: 1,
      fillColor: "#7dd3fc",
      fillOpacity: 0.12,
      className: "leaflet-active-ring",
    }).addTo(map);

    map.flyTo(
      {
        lat: activeLocation.coordinates.lat,
        lng: activeLocation.coordinates.lng,
      },
      13.1,
      {
        duration: 1.2,
        easeLinearity: 0.25,
      },
    );
  }, [activeLocation, activeLocationId]);

  return (
    <div className="glass-panel-strong map-stage relative min-h-[780px] overflow-hidden p-4 md:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(164,243,255,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(80,120,255,0.16),transparent_34%)]" />
      <div className="absolute inset-0 rounded-[2rem] border border-white/10" />
      <div className="map-scanline absolute inset-y-8 left-0 z-[1] w-20 bg-gradient-to-r from-transparent via-cyan-100/10 to-transparent" />

      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 px-2 pb-6 pt-2">
        <div>
          <div className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white md:text-3xl">
            Interaktywna mapa Gdyni
          </div>
        </div>
        <div className="hidden flex-wrap gap-2 md:flex">
          <div className="glass-chip">
            <Orbit className="h-4 w-4 text-cyan-100" />
            {locations.length} punktów
          </div>
          <div className="glass-chip">
            <Radar className="h-4 w-4 text-cyan-100" />
            Informacje o miejscach
          </div>
        </div>
      </div>

      <div className="relative h-[680px] overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#061020]">
        <div ref={containerRef} className="absolute inset-0 z-0" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_10%,rgba(164,243,255,0.18),transparent_24%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.16),transparent_24%),linear-gradient(180deg,rgba(4,10,20,0.12),rgba(4,10,20,0.58))]" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(rgba(140,180,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(140,180,255,0.08)_1px,transparent_1px)] bg-[size:58px_58px] opacity-35" />

        <div className="pointer-events-none absolute bottom-4 left-4 z-20 flex flex-wrap gap-2">
          <div className="glass-chip">
            <Waves className="h-4 w-4 text-cyan-100" />
            Realny układ miasta
          </div>
          <div className="glass-chip">Kliknij pinezkę albo użyj zoomu</div>
        </div>

        <AnimatePresence mode="wait">
          {activeLocation ? (
            <motion.aside
              key={activeLocation.id}
              initial={{ opacity: 0, x: 22, y: 18, filter: "blur(16px)" }}
              animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 18, y: 10, filter: "blur(12px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-3 bottom-3 z-[40] overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(9,18,34,0.96),rgba(6,12,24,0.94))] shadow-[0_26px_80px_rgba(2,8,24,0.5)] backdrop-blur-2xl md:inset-x-auto md:left-auto md:right-4 md:top-4 md:w-[25rem] lg:right-6 lg:top-6 lg:w-[27rem]"
            >
              <div className={`absolute inset-x-10 top-0 h-24 rounded-full bg-gradient-to-r ${activeLocation.accent} opacity-30 blur-3xl`} />

              <div className="relative z-10 max-h-[min(70vh,34rem)] overflow-y-auto p-4 md:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    <div className="glass-chip">{activeLocation.district}</div>
                    <div className="glass-chip">
                      <Compass className="h-4 w-4 text-cyan-100" />
                      {activeTime}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onClearSelection}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-slate-200 transition hover:border-cyan-200/20 hover:text-white"
                    aria-label="Zamknij panel miejsca"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-5 flex items-start justify-between gap-3">
                  <h3 className="text-3xl font-semibold tracking-[-0.05em] text-white">
                    {activeLocation.name}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsDetailsOpen(true)}
                    className="inline-flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-slate-100 transition hover:border-cyan-200/20 hover:bg-white/[0.06] hover:text-white"
                  >
                    Info
                  </button>
                </div>

                <div className="mt-5">
                  <TimeStateSwitcher activeTime={activeTime} onChange={onTimeChange} />
                </div>

                <div className="mt-5 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#091222]">
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxImage({
                        src: activeLocation.images[activeTime],
                        alt: `${activeLocation.name} — widok ${activeTime}`,
                        label: activeTime,
                      })
                    }
                    className="group block w-full text-left"
                  >
                    <div className="relative aspect-[16/10]">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={`${activeLocation.id}-${activeTime}`}
                          src={activeLocation.images[activeTime]}
                          alt={`${activeLocation.name} — widok ${activeTime}`}
                          className="absolute inset-0 h-full w-full object-cover"
                          initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, scale: 0.98, filter: "blur(12px)" }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,20,0.06)_0%,rgba(4,10,20,0.18)_45%,rgba(4,10,20,0.8)_100%)]" />
                      <div className="absolute left-3 top-3 rounded-full border border-white/12 bg-slate-950/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-white/90 backdrop-blur-xl">
                        {activeState?.subtitle}
                      </div>
                      <div className="absolute bottom-3 left-3 rounded-full border border-white/12 bg-slate-950/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-white/90 backdrop-blur-xl">
                        Kliknij, aby powiększyć
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </motion.aside>
          ) : (
            <motion.div
              key="map-empty-state"
              initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 12, filter: "blur(10px)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-4 bottom-4 z-[40] md:bottom-18 md:left-6 md:w-[26rem]"
            >
              <div className="glass-panel map-selection-hint p-5 md:p-6">
                <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Panel miejsca
                </div>
                <div className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                  Kliknij pinezkę na mapie
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Po wyborze punktu zostaną wyświetlone informacje
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <LocationDetailsModal
        location={isDetailsOpen ? activeLocation : null}
        onClose={() => setIsDetailsOpen(false)}
      />
      <ImageLightboxModal
        imageSrc={lightboxImage?.src ?? null}
        imageAlt={lightboxImage?.alt ?? ""}
        label={lightboxImage?.label}
        onClose={() => setLightboxImage(null)}
      />
    </div>
  );
}
