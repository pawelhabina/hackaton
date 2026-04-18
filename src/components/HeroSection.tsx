import { ArrowDownRight, Compass, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { CountUpNumber } from "./CountUpNumber";
import { SilkBackground } from "./SilkBackground";

const heroStats = [
  { value: 6, label: "lokalizacji" },
  { value: 3, label: "stany czasu" },
  { value: 1, label: "wizja miasta" },
] as const;

type HeroSectionProps = {
  onExploreMap: () => void;
  onExploreLocations: () => void;
  startCountUp: boolean;
};

export function HeroSection({
  onExploreMap,
  onExploreLocations,
  startCountUp,
}: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pb-18 pt-8 md:px-10 lg:px-12 xl:px-14">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <div className="absolute left-[8%] top-[18%] h-48 w-48 rounded-full bg-sky-300/18 blur-[80px]" />
        <div className="absolute right-[10%] top-[24%] h-56 w-56 rounded-full bg-cyan-300/15 blur-[90px]" />
        <div className="absolute bottom-[8%] left-[22%] h-64 w-64 rounded-full bg-blue-500/15 blur-[110px]" />
        <div className="hero-map absolute inset-x-8 top-24 h-[68vh] rounded-[2.5rem] border border-white/10 bg-white/[0.035] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_40px_100px_rgba(2,8,28,0.55)] backdrop-blur-xl md:inset-x-12 xl:inset-x-16">
          <SilkBackground
            rotation={0}
            speed={2.5}
            scale={0.8}
            color="#7ddfff"
            noiseIntensity={1.05}
            blur={24}
          />
          <div className="hero-map__silk-veil" />
        </div>
      </motion.div>

      <div className="section-shell relative z-10 grid items-end gap-12 xl:gap-16 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(18px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-[42rem] flex-col items-start lg:translate-x-10 lg:justify-self-end xl:translate-x-14 xl:max-w-[44rem]"
        >
          <div className="glass-panel inline-flex items-center gap-3 px-4 py-2 text-xs uppercase tracking-[0.34em] text-slate-200">
            <Sparkles className="h-4 w-4 text-cyan-200" />
            Gdynia / Innowacyjne miasto
          </div>

          <h1 className="mt-8 max-w-4xl text-[clamp(4.2rem,12vw,9rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-white">
            Gdynia
            <span className="block bg-gradient-to-r from-white via-cyan-100 to-sky-300 bg-clip-text text-transparent">
              <CountUpNumber
                value={2126}
                from={1926}
                startWhen={startCountUp}
                duration={3800}
              />
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
          className="space-y-5 lg:w-full lg:max-w-[38rem] lg:justify-self-end xl:max-w-[41rem]"
        >
          <div className="glass-panel-strong p-7 xl:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.2 }}
                  className="text-xs uppercase tracking-[0.28em] text-slate-400"
                >
                  Tryb prezentacji
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.28 }}
                  className="mt-3 text-[clamp(2rem,3vw,2.8rem)] font-semibold tracking-[-0.04em] text-white"
                >
                  Atlas miejsc i przyszłości
                </motion.p>
              </div>
              <motion.div
                animate={{ y: [0, -4, 0], rotate: [0, -4, 0, 4, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-2xl border border-white/10 bg-white/6 p-3"
              >
                <Compass className="h-6 w-6 text-cyan-200" />
              </motion.div>
            </div>
            <div className="mt-7 grid grid-cols-3 gap-4 text-base text-slate-300">
              {heroStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.34 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -6, scale: 1.015 }}
                  className="rounded-2xl border border-white/8 bg-white/[0.04] p-5"
                >
                  <div className="text-3xl font-semibold text-white">
                    <CountUpNumber
                      value={stat.value}
                      startWhen={startCountUp}
                      duration={1400 + index * 180}
                    />
                  </div>
                  {stat.label}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.48 }}
            className="glass-panel p-6 text-base leading-8 text-slate-300"
          >
            Interfejs został zaprojektowany jak futurystyczne archiwum miejskie:
            z warstwowym szkłem, subtelnym glow, miękkim ruchem i mapą, która
            działa jak holograficzna plansza Gdyni.
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
