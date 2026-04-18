import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { LocationData } from "../lib/types";

type LocationDetailsModalProps = {
  location: LocationData | null;
  onClose: () => void;
};

export function LocationDetailsModal({
  location,
  onClose,
}: LocationDetailsModalProps) {
  return (
    <AnimatePresence>
      {location ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98, filter: "blur(18px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 18, scale: 0.985, filter: "blur(12px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel-strong relative max-h-[85vh] w-full max-w-3xl overflow-hidden"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/55 text-slate-200 transition hover:border-cyan-200/20 hover:text-white"
              aria-label="Zamknij szczegóły miejsca"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative z-10 overflow-auto p-6 pr-16 md:p-8 md:pr-18">
              <div className="space-y-5 text-sm leading-8 text-slate-300 md:text-[15px]">
                {location.article.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
