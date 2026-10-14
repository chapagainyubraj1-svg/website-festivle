"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Restrained parallax for layered SVG scenes. Layers are <g data-depth="0..1">.
 * Disabled for reduced motion, coarse pointers with low memory, or small screens.
 */
export function Parallax({ children, className, strength = 90 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.getAttribute("data-motion") === "reduced";
    const lowPower = (navigator as Navigator & { deviceMemory?: number }).deviceMemory !== undefined && (navigator as Navigator & { deviceMemory?: number }).deviceMemory! <= 2;
    if (reduce || lowPower || window.innerWidth < 640) return;
    const layers = Array.from(el.querySelectorAll<SVGGElement>("[data-depth]"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const p = Math.max(0, Math.min(1, -rect.top / rect.height));
      for (const l of layers) {
        const depth = parseFloat(l.dataset.depth ?? "0");
        l.style.transform = `translate3d(0, ${(p * strength * (1 - depth)).toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
