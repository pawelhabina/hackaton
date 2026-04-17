import { useEffect } from "react";

export function usePointerGlow() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const update = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--pointer-x", `${event.clientX}px`);
        root.style.setProperty("--pointer-y", `${event.clientY}px`);
      });
    };

    window.addEventListener("pointermove", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", update);
    };
  }, []);
}
