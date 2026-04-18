import { motion } from "motion/react";
import { timeStates } from "../data/locations";
import { TimeKey } from "../lib/types";

type TimeStateSwitcherProps = {
  activeTime: TimeKey;
  onChange: (time: TimeKey) => void;
};

export function TimeStateSwitcher({
  activeTime,
  onChange,
}: TimeStateSwitcherProps) {
  return (
    <div className="glass-panel relative grid w-full grid-cols-3 gap-2 p-2">
      {timeStates.map((state) => {
        const active = state.key === activeTime;

        return (
          <button
            key={state.key}
            type="button"
            onClick={() => onChange(state.key)}
            className="relative min-h-[5.25rem] rounded-[1.3rem] px-3 py-3 text-center"
          >
            {active ? (
              <motion.span
                layoutId="active-time-indicator"
                className="absolute inset-0 rounded-[1.3rem] border border-white/14 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_25px_rgba(103,232,249,0.15)]"
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
              />
            ) : null}
            <span className="relative flex h-full flex-col items-center justify-center">
              <span
                className={`block text-lg font-semibold tracking-[-0.04em] ${
                  active ? "text-white" : "text-slate-300"
                }`}
              >
                {state.label}
              </span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-slate-400">
                {state.subtitle}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
