import { motion } from "motion/react";
import { futurePillars } from "../data/siteContent";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function FutureVisionSection() {
  return (
    <section className="section-shell px-4 py-24 md:px-8 lg:px-10">
      <div className="glass-panel-strong overflow-hidden px-6 py-10 md:px-8 md:py-12">
        <Reveal>
          <SectionHeading
            eyebrow="Gdynia 2126"
            title="Wizja miasta spokojnego, precyzyjnego i zakotwiczonego w morzu"
            body="Przyszłość nie jest tu pokazana jako hałaśliwy cyberpunk, tylko jako nowy modernizm nad Bałtykiem: bardziej miękki, inteligentny, zielony i świadomy klimatu."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          {futurePillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <Reveal key={pillar.title} delay={index * 0.06}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                  className="group relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${pillar.accent} opacity-20 transition-opacity duration-300 group-hover:opacity-35`}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),transparent_20%,transparent_100%)] opacity-55" />
                  <div className="relative flex h-full flex-col">
                    <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                      <Icon className="h-5 w-5 text-cyan-100" />
                    </div>
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-slate-300">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
