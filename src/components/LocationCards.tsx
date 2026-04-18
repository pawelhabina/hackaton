import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { LocationData } from "../lib/types";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type LocationCardsProps = {
  locations: LocationData[];
  activeLocationId: string | null;
  onOpenLocation: (locationId: string) => void;
};

export function LocationCards({
  locations,
  activeLocationId,
  onOpenLocation,
}: LocationCardsProps) {
  return (
    <section className="section-shell px-4 py-24 md:px-8 lg:px-10">
      <Reveal>
        <SectionHeading
          eyebrow="Wybrane miejsca"
          title={`${locations.length} punktów wejścia do Gdyni rozpiętej pomiędzy trzema epokami`}
          body="Każda karta prowadzi z powrotem do mapy i aktywuje wybrane miejsce. Układ jest celowo bardziej wystawowy niż katalogowy."
        />
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {locations.map((location, index) => {
          const isActive = activeLocationId === location.id;

          return (
            <Reveal key={location.id} delay={index * 0.06}>
              <motion.button
                type="button"
                onClick={() => onOpenLocation(location.id)}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className={`group relative overflow-hidden rounded-[2rem] border text-left ${
                  isActive
                    ? "border-cyan-200/25 bg-white/[0.08]"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <div className="absolute inset-0">
                  <img
                    src={location.images["2126"]}
                    alt=""
                    className="h-full w-full object-cover opacity-55 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,20,0.08)_0%,rgba(4,10,20,0.2)_35%,rgba(4,10,20,0.92)_100%)]" />
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(164,243,255,0.18),transparent_30%)] opacity-70" />

                <div className="relative flex min-h-[420px] flex-col justify-between p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="glass-chip">{location.district}</div>
                    <div className="glass-chip">
                      aktywuj na mapie
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.24em] text-slate-300">
                      <span className="glass-chip">1926</span>
                      <span className="glass-chip">2026</span>
                      <span className="glass-chip">2126</span>
                    </div>
                    <h3 className="text-3xl font-semibold tracking-[-0.05em] text-white">
                      {location.name}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-slate-200">
                      {location.shortDescription}
                    </p>
                  </div>
                </div>
              </motion.button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
