import { AnimatePresence, motion } from "motion/react";
import { Clock3, ScanSearch, Sparkles } from "lucide-react";
import { timeStates } from "../data/locations";
import { LocationData, TimeKey } from "../lib/types";
import { TimeStateSwitcher } from "./TimeStateSwitcher";

type LocationDetailPanelProps = {
  location: LocationData;
  activeTime: TimeKey;
  onTimeChange: (time: TimeKey) => void;
};

export function LocationDetailPanel({
  location,
  activeTime,
  onTimeChange,
}: LocationDetailPanelProps) {
  const articleParagraphs = location.article.split("\n\n");
  const activeState = timeStates.find((state) => state.key === activeTime);

  return (
    <div className="glass-panel-strong sticky top-8 overflow-hidden p-5 md:p-6 lg:top-24">
      <div className="absolute inset-x-10 top-0 h-24 rounded-full bg-cyan-300/8 blur-3xl" />

      <AnimatePresence mode="wait">
        <motion.article
          key={location.id}
          initial={{ opacity: 0, y: 18, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(12px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <div className="flex flex-wrap items-center gap-2">
            <div className="glass-chip">
              <Sparkles className="h-4 w-4 text-cyan-100" />
              {location.district}
            </div>
            <div className="glass-chip">
              <ScanSearch className="h-4 w-4 text-cyan-100" />
              aktywna warstwa: {activeTime}
            </div>
          </div>

          <h3 className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-white md:text-4xl">
            {location.name}
          </h3>
          <p className="mt-4 text-base leading-8 text-slate-300">
            {location.lead}
          </p>

          <div className="mt-8">
            <TimeStateSwitcher activeTime={activeTime} onChange={onTimeChange} />
          </div>

          <div className="mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-[#091222]">
            <div className="relative aspect-[4/3]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${location.id}-${activeTime}`}
                  src={location.images[activeTime]}
                  alt={`${location.name} — widok ${activeTime}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.97, filter: "blur(12px)" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,20,0.05)_0%,rgba(4,10,20,0.12)_45%,rgba(4,10,20,0.76)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(164,243,255,0.18),transparent_35%)]" />
              <div className="absolute left-4 top-4 rounded-full border border-white/12 bg-slate-950/55 px-3 py-1.5 text-[11px] uppercase tracking-[0.32em] text-white/85 backdrop-blur-xl">
                {activeState?.subtitle}
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-cyan-100/80">
                    Oś czasu
                  </div>
                  <div className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-white">
                    {activeTime}
                  </div>
                </div>
                <div className="rounded-full border border-white/12 bg-slate-950/45 px-4 py-2 text-xs uppercase tracking-[0.26em] text-slate-200 backdrop-blur-xl">
                  materiał foto
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {location.tags.map((tag) => (
              <div key={tag} className="glass-chip">
                #{tag}
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {location.facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4"
              >
                <div className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
                  {fact.label}
                </div>
                <div className="mt-3 text-sm leading-6 text-slate-200">
                  {fact.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
            <Clock3 className="h-4 w-4 text-cyan-100" />
            Artykuł poniżej opisuje miejsce w perspektywie przeszłości,
            teraźniejszości i spekulatywnej przyszłości.
          </div>

          <div className="mt-8 space-y-5 text-sm leading-8 text-slate-300 md:text-[15px]">
            {articleParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
