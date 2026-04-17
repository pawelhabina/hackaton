import { ArrowDownRight, Compass, Sparkles } from "lucide-react";
import { motion } from "motion/react";

type HeroSectionProps = {
  onExploreMap: () => void;
  onExploreLocations: () => void;
};

export function HeroSection({
  onExploreMap,
  onExploreLocations,
}: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 pb-18 pt-6 md:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <div className="absolute left-[8%] top-[18%] h-48 w-48 rounded-full bg-sky-300/18 blur-[80px]" />
        <div className="absolute right-[10%] top-[24%] h-56 w-56 rounded-full bg-cyan-300/15 blur-[90px]" />
        <div className="absolute bottom-[8%] left-[22%] h-64 w-64 rounded-full bg-blue-500/15 blur-[110px]" />
        <div className="hero-map absolute inset-x-6 top-24 h-[68vh] rounded-[2.5rem] border border-white/10 bg-white/[0.035] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_40px_100px_rgba(2,8,28,0.55)] backdrop-blur-xl md:inset-x-10" />
      </motion.div>

      <div className="section-shell relative z-10 grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(18px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="glass-panel inline-flex items-center gap-3 px-4 py-2 text-xs uppercase tracking-[0.34em] text-slate-200">
            <Sparkles className="h-4 w-4 text-cyan-200" />
            Projekt spekulatywny / miejskie archiwum 2126
          </div>

          <h1 className="mt-8 max-w-4xl text-[clamp(4.2rem,12vw,9rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-white">
            Gdynia
            <span className="block bg-gradient-to-r from-white via-cyan-100 to-sky-300 bg-clip-text text-transparent">
              2126
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            Filmowa podróż przez trzy warstwy czasu. Przesuń spojrzenie od
            narodzin nowoczesnej Gdyni, przez jej współczesny rytm, aż po
            luksusową i inteligentną wizję nadmorskiego miasta za kolejne sto
            lat.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={onExploreMap}
              className="glass-button group inline-flex items-center justify-center gap-3 px-6 py-4 text-sm font-medium text-white"
            >
              Otwórz mapę czasu
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
            </button>
            <button
              type="button"
              onClick={onExploreLocations}
              className="glass-button inline-flex items-center justify-center gap-3 px-6 py-4 text-sm font-medium text-slate-200"
            >
              Zobacz wybrane miejsca
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24, filter: "blur(16px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4 lg:justify-self-end"
        >
          <div className="glass-panel-strong max-w-md p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Tryb prezentacji
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                  Atlas miejsc i przyszłości
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-3">
                <Compass className="h-6 w-6 text-cyan-200" />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                <div className="text-2xl font-semibold text-white">06</div>
                lokalizacji
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                <div className="text-2xl font-semibold text-white">03</div>
                stany czasu
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                <div className="text-2xl font-semibold text-white">01</div>
                wizja miasta
              </div>
            </div>
          </div>

          <div className="glass-panel max-w-md p-5 text-sm leading-7 text-slate-300">
            Interfejs został zaprojektowany jak futurystyczne archiwum miejskie:
            z warstwowym szkłem, subtelnym glow, miękkim ruchem i mapą, która
            działa jak holograficzna plansza Gdyni.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
