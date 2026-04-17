import { useEffect, useRef, useState } from "react";

type CountUpNumberProps = {
  value: number;
  startWhen: boolean;
  from?: number;
  duration?: number;
  className?: string;
};

export function CountUpNumber({
  value,
  startWhen,
  from = 0,
  duration = 1800,
  className,
}: CountUpNumberProps) {
  const [displayValue, setDisplayValue] = useState(from);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!startWhen || hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setDisplayValue(value);
      return;
    }

    const startTime = performance.now();
    let frameId = 0;

    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setDisplayValue(Math.round(from + (value - from) * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [duration, from, startWhen, value]);

  return <span className={className}>{displayValue}</span>;
}
