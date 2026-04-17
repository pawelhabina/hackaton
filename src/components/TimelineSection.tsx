import { motion } from "motion/react";
import { timelineMilestones } from "../data/siteContent";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function TimelineSection() {
  return (
    <section className="section-shell px-4 py-24 md:px-8 lg:px-10">
      <Reveal>
        <SectionHeading
          eyebrow="Timeline Gdyni"
          title="Od modernistycznego impulsu do archiwum przyszłości"
          body="To nie encyklopedia, lecz wizualna oś napięć: między narodzinami miasta, współczesną intensywnością życia i spekulacją o tym, czym może stać się nadmorska metropolia za sto lat."
          align="center"
        />
      </Reveal>

      <div className="relative mt-16">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-100/35 to-transparent md:left-1/2" />
        <div className="space-y-8">
          {timelineMilestones.map((milestone, index) => {
            const alignedRight = index % 2 === 1;

            return (
              <Reveal key={milestone.year} delay={index * 0.06}>
                <div
                  className={`grid gap-4 md:grid-cols-2 ${
                    alignedRight ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="hidden md:block" />
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="glass-panel relative overflow-hidden p-6 md:p-7"
                  >
                    <div className="absolute -left-2 top-8 h-4 w-4 rounded-full border border-cyan-100/45 bg-cyan-200/40 shadow-[0_0_25px_rgba(103,232,249,0.4)] md:left-auto md:right-[-2.1rem]" />
                    <div className="text-xs uppercase tracking-[0.32em] text-cyan-100/80">
                      {milestone.year}
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
                      {milestone.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-slate-300">
                      {milestone.body}
                    </p>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
