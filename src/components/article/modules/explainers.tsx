"use client";

import type { ComponentType } from "react";
import { Jamara, Kalash } from "@/components/art/primitives";

export type ExplainerVisual = ComponentType<{ step: number; total: number; reduced: boolean }>;

/** Jamara over ten days: shoots rise from the bed around the kalash. */
function JamaraGrowth({ step, total, reduced }: { step: number; total: number; reduced: boolean }) {
  const growth = [0.02, 0.18, 0.48, 0.82, 1][Math.min(step, 4)] ?? step / (total - 1);
  const days = ["1", "2–4", "5–7", "8–9", "10"][Math.min(step, 4)];
  const transition = reduced ? "none" : "transform 1.6s cubic-bezier(0.2, 0.7, 0.2, 1)";
  const colour = step >= 2 ? 1 : 0.6;
  return (
    <svg viewBox="0 0 800 600" className="h-full w-full" role="img" aria-label={`Jamara on day ${days}`}>
      <defs>
        <linearGradient id="jx-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b2a1f" />
          <stop offset="1" stopColor="#5a4130" />
        </linearGradient>
        <radialGradient id="jx-lamp" cx="0.82" cy="0.3" r="0.5">
          <stop offset="0" stopColor="#ffd77a" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffd77a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={800} height={600} fill="url(#jx-wall)" />
      <rect width={800} height={600} fill="url(#jx-lamp)" />
      {/* a dim window: the worship room is kept away from direct sun */}
      <rect x={600} y={70} width={120} height={150} rx={4} fill="#1f1610" stroke="#6b4e36" strokeWidth={6} />
      <path d="M660 70 V220 M600 145 H720" stroke="#6b4e36" strokeWidth={4} />
      {/* bed of earth */}
      <path d="M90 470 C 140 430 660 430 710 470 L 690 520 C 560 548 240 548 110 520 Z" fill="#7a5232" />
      <path d="M110 470 C 220 446 580 446 690 470" stroke="#a87c4f" strokeWidth={3} fill="none" opacity={0.6} />
      {/* seeds on day 1 */}
      <g opacity={step === 0 ? 1 : 0} style={{ transition: reduced ? "none" : "opacity 0.8s" }}>
        {Array.from({ length: 60 }).map((_, k) => (
          <ellipse key={k} cx={140 + ((k * 97) % 520)} cy={466 + ((k * 13) % 30)} rx={4} ry={2.2} fill="#e8d7a0" transform={`rotate(${(k * 37) % 180} ${140 + ((k * 97) % 520)} ${466 + ((k * 13) % 30)})`} />
        ))}
      </g>
      {/* shoots: scale from the base */}
      <g style={{ transform: `scaleY(${growth})`, transformOrigin: "400px 470px", transition, opacity: colour }}>
        <Jamara x={120} y={470} w={560} h={330} count={260} seed={21} />
      </g>
      <Kalash x={400} y={510} s={1.15} />
      {/* day counter */}
      <g fontFamily="var(--font-fraunces), Georgia, serif">
        <text x={60} y={110} fill="#f6efd6" fontSize={22} letterSpacing="3" opacity={0.75}>
          DAY
        </text>
        <text x={56} y={180} fill="#f6efd6" fontSize={72}>
          {days}
        </text>
      </g>
      {step === 4 ? (
        <text x={60} y={220} fill="#f2d38a" fontSize={20} fontFamily="var(--font-mukta), sans-serif">
          Cut and given with tika
        </text>
      ) : null}
    </svg>
  );
}

export const explainerVisuals: Record<string, ExplainerVisual> = {
  jamara: JamaraGrowth,
};
