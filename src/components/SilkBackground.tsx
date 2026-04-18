import { useEffect, useRef } from "react";

type SilkBackgroundProps = {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
  blur?: number;
  className?: string;
};

function hexToRgb(color: string) {
  const normalized = color.replace("#", "");

  if (normalized.length !== 3 && normalized.length !== 6) {
    return { r: 122, g: 223, b: 255 };
  }

  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;

  const value = Number.parseInt(full, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

export function SilkBackground({
  speed = 5,
  scale = 0.8,
  color = "#8ae7ff",
  noiseIntensity = 1.1,
  rotation = 0.8,
  blur = 20,
  className,
}: SilkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const parent = canvas.parentElement;

    if (!parent) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rgb = hexToRgb(color);
    const resizeObserver = new ResizeObserver(() => resizeCanvas());

    const resizeCanvas = () => {
      const bounds = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.max(1, Math.floor(bounds.width * dpr));
      canvas.height = Math.max(1, Math.floor(bounds.height * dpr));
      canvas.style.width = `${bounds.width}px`;
      canvas.style.height = `${bounds.height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = (timeMs: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const time = timeMs * 0.001 * speed * 0.42;

      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(width / 2, height / 2);
      context.rotate(rotation);
      context.translate(-width / 2, -height / 2);

      const ribbons = 9;
      const lineWidth = Math.max(22, height * 0.105 * scale);
      const amplitude = height * 0.09 * scale * noiseIntensity;
      const step = 18;

      for (let index = 0; index < ribbons; index += 1) {
        const progress = index / Math.max(ribbons - 1, 1);
        const baseY = height * (0.08 + progress * 0.9);
        const alpha = 0.085 + progress * 0.045;
        const glowAlpha = 0.03 + progress * 0.018;

        context.beginPath();

        for (let x = -width * 0.3; x <= width * 1.3; x += step) {
          const offsetA = Math.sin(x * 0.008 + time + index * 0.75) * amplitude;
          const offsetB =
            Math.cos(x * 0.015 - time * 1.35 + index * 1.5) * amplitude * 0.38;
          const offsetC =
            Math.sin(x * 0.028 + time * 0.72 + index * 2.2) *
            amplitude *
            0.18 *
            noiseIntensity;
          const y = baseY + offsetA + offsetB + offsetC;

          if (x === -width * 0.3) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }

        context.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
        context.lineWidth = lineWidth * (1 - progress * 0.3);
        context.lineCap = "round";
        context.lineJoin = "round";
        context.shadowBlur = blur * 1.6;
        context.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowAlpha})`;
        context.stroke();
      }

      context.restore();
      context.shadowBlur = 0;

      if (!prefersReducedMotion) {
        frameRef.current = window.requestAnimationFrame(drawFrame);
      }
    };

    resizeCanvas();
    resizeObserver.observe(parent);
    drawFrame(0);

    return () => {
      resizeObserver.disconnect();

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [blur, color, noiseIntensity, rotation, scale, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
      style={{
        filter: `blur(${Math.max(blur * 0.38, 6)}px) saturate(1.15)`,
        opacity: 0.9,
        transform: "scale(1.06)",
      }}
    />
  );
}
