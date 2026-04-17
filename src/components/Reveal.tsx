import { ReactNode } from "react";
import { motion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36, filter: "blur(18px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
