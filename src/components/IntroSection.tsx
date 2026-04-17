import { motion } from "motion/react";
import { introCards } from "../data/siteContent";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function IntroSection() {
  return (
    <section className="section-shell px-4 py-24 md:px-8 lg:px-10">
      <Reveal>
        <SectionHeading
          eyebrow="Założenie projektu"
          title="Miasto oglądane jak luksusowe archiwum przyszłości"
          body="„Gdynia 2126” nie jest portalem informacyjnym, tylko narracyjnym doświadczeniem. Każde miejsce odsłania trzy stany czasu: ślad historii, współczesny rytm miasta i spekulatywną wizję nadmorskiej przyszłości."
        />
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {introCards.map((card, index) => (
          <Reveal key={card.title} delay={index * 0.08}>
            <motion.div
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="glass-panel group relative overflow-hidden p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-80" />
              <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-cyan-300/14 blur-3xl transition-transform duration-500 group-hover:scale-125" />
              <div className="relative">
                <div className="text-xs uppercase tracking-[0.3em] text-cyan-100/80">
                  0{index + 1}
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-white">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {card.body}
                </p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
