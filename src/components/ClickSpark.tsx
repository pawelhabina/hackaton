import { ReactNode, useEffect, useRef } from "react";

type ClickSparkProps = {
  children: ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-out" | "ease-in-out";
  extraScale?: number;
};

type Spark = {
  x: number;
  y: number;
  angle: number;
  createdAt: number;
  travel: number;
  length: number;
};

const easingMap = {
  linear: (progress: number) => progress,
  "ease-out": (progress: number) => 1 - Math.pow(1 - progress, 3),
  "ease-in-out": (progress: number) =>
    progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2,
} as const;

export function ClickSpark({
  children,
  sparkColor = "#dff9ff",
  sparkSize = 14,
  sparkRadius = 42,
  sparkCount = 10,
  duration = 520,
  easing = "ease-out",
  extraScale = 1.08,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const frameRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mediaQuery.matches;

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
    };

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawSparks = (timestamp: number) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const nextSparks: Spark[] = [];
      const ease = easingMap[easing];

      for (const spark of sparksRef.current) {
        const progress = Math.min((timestamp - spark.createdAt) / duration, 1);

        if (progress >= 1) {
          continue;
        }

        const distance = spark.travel * ease(progress);
        const startDistance = Math.max(distance - spark.length * 0.55, 0);
        const startX = spark.x + Math.cos(spark.angle) * startDistance;
        const startY = spark.y + Math.sin(spark.angle) * startDistance;
        const endX = spark.x + Math.cos(spark.angle) * (distance + spark.length);
        const endY = spark.y + Math.sin(spark.angle) * (distance + spark.length);

        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.strokeStyle = sparkColor;
        context.lineWidth = Math.max(sparkSize * (1 - progress) * 0.18, 1.1);
        context.lineCap = "round";
        context.globalAlpha = 1 - progress;
        context.shadowBlur = 18;
        context.shadowColor = sparkColor;
        context.stroke();

        nextSparks.push(spark);
      }

      context.globalAlpha = 1;
      context.shadowBlur = 0;
      sparksRef.current = nextSparks;

      if (nextSparks.length > 0) {
        frameRef.current = window.requestAnimationFrame(drawSparks);
      } else {
        frameRef.current = null;
      }
    };

    const spawnSparks = (event: MouseEvent) => {
      if (reducedMotionRef.current) {
        return;
      }

      const now = performance.now();

      for (let index = 0; index < sparkCount; index += 1) {
        const angle =
          (Math.PI * 2 * index) / sparkCount +
          (Math.random() - 0.5) * (Math.PI / sparkCount);

        sparksRef.current.push({
          x: event.clientX,
          y: event.clientY,
          angle,
          createdAt: now,
          travel: sparkRadius * extraScale * (0.8 + Math.random() * 0.55),
          length: sparkSize * (0.8 + Math.random() * 0.85),
        });
      }

      if (!frameRef.current) {
        frameRef.current = window.requestAnimationFrame(drawSparks);
      }
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("click", spawnSparks);
    mediaQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("click", spawnSparks);
      mediaQuery.removeEventListener("change", handleReducedMotionChange);

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [duration, easing, extraScale, sparkColor, sparkCount, sparkRadius, sparkSize]);

  return (
    <>
      {children}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90]"
      />
    </>
  );
}
