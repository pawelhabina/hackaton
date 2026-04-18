import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

type ImageLightboxModalProps = {
  imageSrc: string | null;
  imageAlt: string;
  label?: string;
  onClose: () => void;
};

export function ImageLightboxModal({
  imageSrc,
  imageAlt,
  label,
  onClose,
}: ImageLightboxModalProps) {
  return (
    <AnimatePresence>
      {imageSrc ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[96] flex items-center justify-center bg-slate-950/78 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.985, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 12, scale: 0.99, filter: "blur(10px)" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel-strong relative w-full max-w-6xl overflow-hidden p-3 md:p-4"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/55 text-slate-200 transition hover:border-cyan-200/20 hover:text-white"
              aria-label="Zamknij podgląd zdjęcia"
            >
              <X className="h-4 w-4" />
            </button>

            {label ? (
              <div className="absolute left-4 top-4 z-20 rounded-full border border-white/12 bg-slate-950/55 px-3 py-1.5 text-[11px] uppercase tracking-[0.28em] text-white/85 backdrop-blur-xl">
                {label}
              </div>
            ) : null}

            <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#091222]">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="max-h-[82vh] w-full object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
