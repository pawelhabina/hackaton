import { AnimatePresence, motion } from "motion/react";

type IntroOverlayProps = {
  isVisible: boolean;
};

export function IntroOverlay({ isVisible }: IntroOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
          className="intro-overlay"
        >
          <div className="intro-overlay__background" />
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 24, filter: "blur(24px)" }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="intro-overlay__content"
          >
            <div className="intro-overlay__halo intro-overlay__halo--outer" />
            <div className="intro-overlay__halo intro-overlay__halo--inner" />
            <div className="intro-overlay__ring intro-overlay__ring--outer" />
            <div className="intro-overlay__ring intro-overlay__ring--middle" />
            <div className="intro-overlay__ring intro-overlay__ring--inner" />
            <div className="intro-overlay__scanline" />

            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, -1.5, 0, 1.5, 0] }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="intro-overlay__logo-shell"
            >
              <img
                src="/logo_100gdynia.svg"
                alt="Logo 100 lat Gdyni"
                className="intro-overlay__logo"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="intro-overlay__caption"
            >
              100 lat Gdyni
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
