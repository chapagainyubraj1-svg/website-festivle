/**
 * Procedural illustration primitives.
 *
 * All artwork in the Atlas is original, generated from deterministic (seeded)
 * geometry so server and client render identically. Nothing here depicts a
 * specific real object, person or ritual moment; scenes are interpretive.
 */
import type { ReactNode, SVGProps } from "react";

export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n: number) => Math.round(n * 10) / 10;

/** Smooth closed path through points using Catmull-Rom → cubic Bézier. */
export function smoothPath(pts: [number, number][], close = false, tension = 0.5) {
  if (pts.length < 2) return "";
  const p = close ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
  let d = `M${f(p[1][0])} ${f(p[1][1])}`;
  for (let i = 1; i < p.length - 2; i++) {
    const [x0, y0] = p[i - 1];
    const [x1, y1] = p[i];
    const [x2, y2] = p[i + 1];
    const [x3, y3] = p[i + 2];
    const t = tension / 3;
    d += ` C${f(x1 + (x2 - x0) * t)} ${f(y1 + (y2 - y0) * t)} ${f(x2 - (x3 - x1) * t)} ${f(y2 - (y3 - y1) * t)} ${f(x2)} ${f(y2)}`;
  }
  return close ? d + "Z" : d;
}

/** A hill ridge filled down to `bottom`. */
export function ridge({
  seed,
  width,
  baseY,
  amp,
  bottom,
  steps = 12,
  smooth = true,
  jag = 0,
}: {
  seed: number;
  width: number;
  baseY: number;
  amp: number;
  bottom: number;
  steps?: number;
  smooth?: boolean;
  jag?: number;
}) {
  const r = rng(seed);
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const wave = Math.sin(i * 0.9 + r() * 2) * 0.5 + (r() - 0.5);
    pts.push([x, baseY - wave * amp - (jag ? (r() - 0.5) * jag : 0)]);
  }
  pts[0][0] = -20;
  pts[pts.length - 1][0] = width + 20;
  const top = smooth ? smoothPath(pts) : "M" + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join(" L");
  return { d: `${top} L${width + 20} ${bottom} L-20 ${bottom} Z`, points: pts };
}

/**
 * A Himalayan range built by midpoint displacement: a natural silhouette, a
 * jagged snowline, and shadowed faces on the side away from the light.
 * Returns paths intended to be clipped to `d`.
 */
export function himalaya({ seed, width, baseY, height, peaks = 7, light = "left" }: { seed: number; width: number; baseY: number; height: number; peaks?: number; light?: "left" | "right" }) {
  const r = rng(seed);
  // control points: alternating peaks and saddles
  let pts: [number, number][] = [[-40, baseY - height * 0.15]];
  const span = (width + 80) / peaks;
  for (let i = 0; i < peaks; i++) {
    const x0 = -40 + i * span;
    pts.push([x0 + span * (0.3 + r() * 0.4), baseY - height * (0.5 + r() * 0.5)]);
    pts.push([x0 + span, baseY - height * (0.12 + r() * 0.28)]);
  }
  // midpoint displacement for detail
  let disp = height * 0.12;
  for (let pass = 0; pass < 4; pass++) {
    const next: [number, number][] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i];
      const [x2, y2] = pts[i + 1];
      next.push([x1, y1], [(x1 + x2) / 2 + (r() - 0.5) * disp * 0.3, (y1 + y2) / 2 + (r() - 0.5) * disp]);
    }
    next.push(pts[pts.length - 1]);
    pts = next;
    disp *= 0.55;
  }
  const silhouette = pts.map(([x, y]) => `${f(x)} ${f(y)}`).join(" L");
  const d = `M${silhouette} L${width + 40} ${baseY + 80} L-40 ${baseY + 80} Z`;
  // snowline: follow the silhouette some distance down, with jagged tongues
  const snowDepth = height * 0.42;
  const snowPts = pts.map(([x, y], i) => [x, y + snowDepth * (0.55 + 0.45 * Math.abs(Math.sin(i * 1.7 + r() * 3))) + (r() - 0.5) * 18] as [number, number]);
  const snow = `M${silhouette} L${snowPts
    .slice()
    .reverse()
    .map(([x, y]) => `${f(x)} ${f(y)}`)
    .join(" L")} Z`;
  // shadow facets: from each major summit, follow the silhouette down the shaded
  // slope to the next saddle, then return diagonally through the mountain body.
  const shadows: string[] = [];
  const isMax = (i: number) => pts[i][1] < pts[i - 1][1] && pts[i][1] < pts[i + 1][1];
  for (let i = 1; i < pts.length - 1; i++) {
    if (!isMax(i) || baseY - pts[i][1] < height * 0.4) continue;
    const dir = light === "left" ? 1 : -1;
    const path: [number, number][] = [pts[i]];
    let j = i + dir;
    while (j > 0 && j < pts.length - 1 && !(pts[j][1] > pts[j - 1][1] && pts[j][1] > pts[j + 1][1] && baseY - pts[j][1] < height * 0.5)) {
      path.push(pts[j]);
      j += dir;
      if (Math.abs(pts[j][0] - pts[i][0]) > span * 0.9) break;
    }
    path.push(pts[j]);
    const [sx, sy] = pts[i];
    const end = path[path.length - 1];
    const inner: [number, number][] = [
      [end[0] - dir * span * 0.3, baseY + 60],
      [sx + dir * (Math.abs(end[0] - sx) * 0.18), baseY + 60],
      [sx + dir * 10, sy + (baseY - sy) * 0.5 + (r() - 0.5) * 20],
      [sx + dir * 3, sy + (baseY - sy) * 0.18],
    ];
    shadows.push("M" + [...path, ...inner].map(([x, y]) => `${f(x)} ${f(y)}`).join(" L") + " Z");
  }
  return { d, snow, shadows, points: pts };
}

/** Contour lines following a ridge (terraces). */
export function terraces(points: [number, number][], count: number, gap: number, seed = 1) {
  const r = rng(seed);
  const out: string[] = [];
  for (let k = 1; k <= count; k++) {
    const off = k * gap + r() * gap * 0.3;
    out.push(smoothPath(points.map(([x, y], i) => [x, y + off + Math.sin(i * 1.3 + k) * gap * 0.15])));
  }
  return out;
}

export function GrainFilter({ id, opacity = 0.18, frequency = 0.85 }: { id: string; opacity?: number; frequency?: number }) {
  return (
    <filter id={id} x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse">
      <feTurbulence type="fractalNoise" baseFrequency={frequency} numOctaves={2} stitchTiles="stitch" result="n" />
      <feColorMatrix type="matrix" values={`0 0 0 0 0.35  0 0 0 0 0.27  0 0 0 0 0.18  0 0 0 ${opacity} 0`} />
      <feComposite in2="SourceGraphic" operator="in" />
    </filter>
  );
}

/** Full-canvas paper grain overlay. Place last inside an <svg>. */
export function Grain({ id, w, h, opacity = 0.16 }: { id: string; w: number; h: number; opacity?: number }) {
  return (
    <g aria-hidden="true" style={{ mixBlendMode: "multiply" }}>
      <defs>
        <GrainFilter id={id} opacity={opacity} />
      </defs>
      <rect width={w} height={h} filter={`url(#${id})`} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Objects                                                             */
/* ------------------------------------------------------------------ */

export function Kite({
  x,
  y,
  size = 40,
  rot = 0,
  fill = "#c0391f",
  fill2 = "#f1d9a0",
  tail = "#c0391f",
  string = true,
  stringTo,
  className,
  style,
}: {
  x: number;
  y: number;
  size?: number;
  rot?: number;
  fill?: string;
  fill2?: string;
  tail?: string;
  string?: boolean;
  stringTo?: [number, number];
  className?: string;
  style?: React.CSSProperties;
}) {
  const s = size;
  return (
    <g>
      {string && stringTo ? (
        <path
          d={`M${x} ${y + s * 0.55} Q${(x + stringTo[0]) / 2 + 40} ${(y + stringTo[1]) / 2 + 60} ${stringTo[0]} ${stringTo[1]}`}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={0.8}
        />
      ) : null}
      <g transform={`translate(${x} ${y}) rotate(${rot})`}>
       <g className={className} style={style}>
        <path d={`M0 ${-s * 0.6} L${s * 0.5} 0 L0 ${s * 0.6} L${-s * 0.5} 0 Z`} fill={fill} />
        <path d={`M0 ${-s * 0.6} L${s * 0.5} 0 L0 0 Z`} fill={fill2} opacity={0.85} />
        <path d={`M0 0 L${-s * 0.5} 0 L0 ${s * 0.6} Z`} fill="#000" opacity={0.12} />
        <path d={`M0 ${-s * 0.6} V${s * 0.6} M${-s * 0.5} 0 H${s * 0.5}`} stroke="rgba(0,0,0,0.25)" strokeWidth={0.8} />
        <path
          d={`M0 ${s * 0.6} q${-s * 0.15} ${s * 0.3} 0 ${s * 0.6} q${s * 0.15} ${s * 0.3} 0 ${s * 0.6}`}
          fill="none"
          stroke={tail}
          strokeWidth={1.4}
        />
        <path d={`M-3 ${s * 0.95} l6 -4 M-3 ${s * 1.3} l6 -4`} stroke={tail} strokeWidth={2} />
       </g>
      </g>
    </g>
  );
}

/** Linge ping: four bamboos lashed at the top, rope seat. */
export function Swing({ x, y, h = 220, stroke = "#3a2a1a", rope = "#6b4b2b", swingAngle = 0, figure = true, className }: { x: number; y: number; h?: number; stroke?: string; rope?: string; swingAngle?: number; figure?: boolean; className?: string }) {
  const spread = h * 0.42;
  const topY = y - h;
  return (
    <g>
      {/* back poles */}
      <path d={`M${x - spread * 0.6} ${y} L${x} ${topY} L${x + spread * 0.55} ${y + 4}`} stroke={stroke} strokeWidth={3} fill="none" opacity={0.65} strokeLinecap="round" />
      {/* front poles */}
      <path d={`M${x - spread} ${y + 8} L${x} ${topY} L${x + spread} ${y + 10}`} stroke={stroke} strokeWidth={4.5} fill="none" strokeLinecap="round" />
      {/* lashing */}
      <path d={`M${x - 7} ${topY + 6} l14 -3 M${x - 7} ${topY + 11} l14 -3`} stroke={rope} strokeWidth={2} />
      <path d={`M${x} ${topY} l-5 -16 M${x} ${topY} l6 -15 M${x} ${topY} l1 -18`} stroke={stroke} strokeWidth={2.4} strokeLinecap="round" />
      <g transform={`rotate(${swingAngle} ${x} ${topY + 8})`}>
      <g className={className} style={{ transformOrigin: `${x}px ${topY + 8}px`, transformBox: "view-box" }}>
        <path d={`M${x - 6} ${topY + 8} L${x - 14} ${y - h * 0.22} M${x + 6} ${topY + 8} L${x + 14} ${y - h * 0.22}`} stroke={rope} strokeWidth={1.6} />
        <rect x={x - 20} y={y - h * 0.22} width={40} height={5} rx={2} fill={stroke} />
        {figure ? (
          <g fill={stroke}>
            <circle cx={x} cy={y - h * 0.22 - 30} r={7} />
            <path d={`M${x - 9} ${y - h * 0.22 - 22} Q${x} ${y - h * 0.22 - 26} ${x + 9} ${y - h * 0.22 - 22} L${x + 11} ${y - h * 0.22} L${x - 11} ${y - h * 0.22} Z`} />
            <path d={`M${x - 8} ${y - h * 0.22 + 4} L${x - 14} ${y - h * 0.22 + 26} M${x + 8} ${y - h * 0.22 + 4} L${x + 16} ${y - h * 0.22 + 24}`} stroke={stroke} strokeWidth={4} strokeLinecap="round" />
          </g>
        ) : null}
      </g>
      </g>
    </g>
  );
}

/** A dense mat of jamara: thin, upright, pale-gold blades with slightly curling tips. */
export function Jamara({ x, y, w, h, count = 60, seed = 3, color = "#efe08c", color2 = "#d9bf55", className }: { x: number; y: number; w: number; h: number; count?: number; seed?: number; color?: string; color2?: string; className?: string }) {
  const r = rng(seed);
  const blades: ReactNode[] = [];
  const mid = x + w / 2;
  for (let i = 0; i < count; i++) {
    const bx = x + r() * w;
    const edge = Math.abs(bx - mid) / (w / 2); // 0 centre → 1 edge
    const bh = h * (0.7 + r() * 0.3) * (1 - edge * 0.35);
    const lean = (bx - mid) * 0.12 + (r() - 0.5) * 14;
    const curl = (r() - 0.5) * 26;
    const tipX = bx + lean + curl;
    const tipY = y - bh;
    const wdt = 0.9 + r() * 1.5;
    const pick = r();
    const fill = pick > 0.6 ? color : pick > 0.25 ? color2 : "#f7efc4";
    blades.push(
      <path
        key={i}
        d={`M${f(bx - wdt)} ${y} C${f(bx - wdt * 0.6 + lean * 0.2)} ${f(y - bh * 0.5)} ${f(bx + lean * 0.8)} ${f(y - bh * 0.85)} ${f(tipX)} ${f(tipY)} C${f(bx + lean * 0.8 + wdt * 0.4)} ${f(y - bh * 0.84)} ${f(bx + wdt * 0.6 + lean * 0.2)} ${f(y - bh * 0.5)} ${f(bx + wdt)} ${y} Z`}
        fill={fill}
        opacity={0.82 + r() * 0.18}
      />,
    );
  }
  return <g className={className}>{blades}</g>;
}

/**
 * A metal kalash. Deliberately plain: sources describe the consecrated pot but
 * household decoration varies, so we do not invent specific adornments.
 */
export function Kalash({ x, y, s = 1, metal = "#c9963a", shade = "#8a5e1e", thread = "#c0391f" }: { x: number; y: number; s?: number; metal?: string; shade?: string; leaf?: string; thread?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={46} ry={8} fill="#000" opacity={0.18} />
      {/* lip and neck */}
      <path d="M-26 -104 H26 L22 -96 H-22 Z" fill={metal} />
      <ellipse cx={0} cy={-104} rx={26} ry={6} fill={shade} />
      <ellipse cx={0} cy={-104} rx={19} ry={3.6} fill="#5a3a12" />
      <path d="M-18 -96 C -20 -86 -44 -76 -44 -44 C -44 -14 -26 0 0 0 C 26 0 44 -14 44 -44 C 44 -76 20 -86 18 -96 Z" fill={metal} />
      <path d="M8 -90 C 30 -78 40 -62 38 -42 C 36 -16 22 -4 4 -1 C 26 -10 34 -26 32 -46 C 30 -66 22 -78 8 -90 Z" fill={shade} opacity={0.5} />
      <path d="M-30 -62 C -34 -50 -32 -36 -26 -28" stroke="#fff3cf" strokeWidth={3} opacity={0.55} fill="none" strokeLinecap="round" />
      <path d="M-42 -48 Q 0 -38 42 -48" stroke={thread} strokeWidth={2.6} fill="none" />
      <path d="M-43 -42 Q 0 -32 43 -42" stroke={thread} strokeWidth={1.2} fill="none" opacity={0.8} />
      <circle cx={0} cy={-62} r={5} fill={thread} />
    </g>
  );
}

/** Tiered pagoda roofline (Newar style), simplified. */
export function Pagoda({ x, y, w = 160, tiers = 3, fill = "#3a1a14", roof = "#6b2a1c", gold = "#d6a74a", plinth = 2 }: { x: number; y: number; w?: number; tiers?: number; fill?: string; roof?: string; gold?: string; plinth?: number }) {
  const parts: ReactNode[] = [];
  let cy = y;
  // plinths
  for (let i = 0; i < plinth; i++) {
    const pw = w * (1.25 - i * 0.12);
    parts.push(<rect key={`p${i}`} x={x - pw / 2} y={cy - 12} width={pw} height={12} fill={fill} opacity={0.9 - i * 0.05} />);
    cy -= 12;
  }
  for (let t = 0; t < tiers; t++) {
    const tw = w * (1 - t * 0.22);
    const bodyH = w * (t === 0 ? 0.42 : 0.2);
    parts.push(<rect key={`b${t}`} x={x - tw * 0.36} y={cy - bodyH} width={tw * 0.72} height={bodyH} fill={fill} />);
    cy -= bodyH;
    const rw = tw * 0.95;
    const rh = w * 0.16;
    parts.push(
      <path
        key={`r${t}`}
        d={`M${x - rw / 2 - 10} ${cy + 4} Q${x - rw / 2 + rw * 0.12} ${cy - 2} ${x - rw * 0.2} ${cy - rh} L${x + rw * 0.2} ${cy - rh} Q${x + rw / 2 - rw * 0.12} ${cy - 2} ${x + rw / 2 + 10} ${cy + 4} Z`}
        fill={roof}
      />,
    );
    parts.push(<path key={`e${t}`} d={`M${x - rw / 2 - 10} ${cy + 4} H${x + rw / 2 + 10}`} stroke={gold} strokeWidth={1.5} opacity={0.7} />);
    cy -= rh;
  }
  // finial (gajur)
  parts.push(
    <g key="g" fill={gold}>
      <rect x={x - 2.5} y={cy - 26} width={5} height={26} />
      <circle cx={x} cy={cy - 30} r={6} />
      <path d={`M${x} ${cy - 50} L${x + 5} ${cy - 34} H${x - 5} Z`} />
    </g>,
  );
  return <g>{parts}</g>;
}

/** Clay oil lamp with a flame and glow. */
export function Diyo({ x, y, s = 1, clay = "#a4552e", flame = "#ffcf5a", glowId, className, delay = 0 }: { x: number; y: number; s?: number; clay?: string; flame?: string; glowId?: string; className?: string; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {glowId ? <circle cx={0} cy={-16} r={34} fill={`url(#${glowId})`} className="anim-glow" style={{ animationDelay: `${delay}s` }} /> : null}
      <path d="M-22 -4 Q -20 8 0 8 Q 20 8 22 -4 Q 12 -1 0 -1 Q -12 -1 -22 -4 Z" fill={clay} />
      <path d="M-22 -4 Q 0 -10 22 -4 Q 12 -1 0 -1 Q -12 -1 -22 -4 Z" fill="#000" opacity={0.25} />
      <path d="M14 -6 Q 22 -9 25 -12" stroke={clay} strokeWidth={3} strokeLinecap="round" fill="none" />
      <g className={className ?? "anim-flicker"} style={{ animationDelay: `${delay}s` }}>
        <path d="M24 -12 C 18 -20 21 -30 26 -38 C 31 -30 33 -20 24 -12 Z" fill={flame} />
        <path d="M25 -14 C 22 -19 24 -25 26 -29 C 28 -25 29 -19 25 -14 Z" fill="#fff6d8" />
      </g>
    </g>
  );
}

/** Marigold head. */
export function Marigold({ x, y, r = 9, seed = 1, c1 = "#f2a12a", c2 = "#e07a16" }: { x: number; y: number; r?: number; seed?: number; c1?: string; c2?: string }) {
  const g = rng(seed);
  const petals: ReactNode[] = [];
  const n = 14;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + g() * 0.3;
    petals.push(<circle key={i} cx={x + Math.cos(a) * r * 0.6} cy={y + Math.sin(a) * r * 0.6} r={r * 0.48} fill={i % 2 ? c1 : c2} />);
  }
  return (
    <g>
      {petals}
      <circle cx={x} cy={y} r={r * 0.45} fill={c2} />
      <circle cx={x - r * 0.15} cy={y - r * 0.15} r={r * 0.2} fill="#ffd27a" opacity={0.6} />
    </g>
  );
}

/** A garland of marigolds along a sagging curve. */
export function Garland({ x1, y1, x2, y2, sag = 60, n = 18, r = 9, seed = 2 }: { x1: number; y1: number; x2: number; y2: number; sag?: number; n?: number; r?: number; seed?: number }) {
  const items: ReactNode[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = x1 + (x2 - x1) * t;
    const y = y1 + (y2 - y1) * t + Math.sin(Math.PI * t) * sag;
    items.push(<Marigold key={i} x={x} y={y} r={r} seed={seed * 100 + i} c1={i % 3 === 0 ? "#f4c430" : "#f2a12a"} />);
  }
  return <g>{items}</g>;
}

/** Prayer flags in the traditional colour order: blue, white, red, green, yellow. */
export function PrayerFlags({ x1, y1, x2, y2, sag = 40, n = 15, size = 22, className }: { x1: number; y1: number; x2: number; y2: number; sag?: number; n?: number; size?: number; className?: string }) {
  const colours = ["#2f5fa8", "#f3efe6", "#c0392b", "#2f7d4a", "#e8b931"];
  const flags: ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n;
    const x = x1 + (x2 - x1) * t;
    const y = y1 + (y2 - y1) * t + Math.sin(Math.PI * t) * sag;
    flags.push(
      <rect
        key={i}
        x={x - size * 0.4}
        y={y}
        width={size * 0.8}
        height={size}
        fill={colours[i % 5]}
        className={className}
        style={{ animationDelay: `${(i % 5) * 0.3}s`, ["--dur" as string]: `${2.6 + (i % 3) * 0.4}s` }}
      />,
    );
  }
  return (
    <g>
      <path d={`M${x1} ${y1} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 + sag * 2} ${x2} ${y2}`} stroke="#2a2420" strokeWidth={1} fill="none" opacity={0.6} />
      {flags}
    </g>
  );
}

/** Bodhi (pipal) leaf with its long drip tip. */
export function BodhiLeaf({ x, y, s = 1, rot = 0, fill = "#4d7a3e", vein = "#2e4a28" }: { x: number; y: number; s?: number; rot?: number; fill?: string; vein?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0 C -40 -10 -55 -55 -30 -80 C -15 -95 0 -88 0 -88 C 0 -88 15 -95 30 -80 C 55 -55 40 -10 0 0 Z M0 0 C 2 18 6 34 14 46" fill={fill} stroke={fill} strokeWidth={2} strokeLinejoin="round" />
      <path d="M0 -86 V0 M0 -60 L-22 -66 M0 -60 L22 -66 M0 -40 L-30 -40 M0 -40 L30 -40 M0 -20 L-24 -14 M0 -20 L24 -14" stroke={vein} strokeWidth={1.2} fill="none" opacity={0.7} />
    </g>
  );
}

/** Lotus seen from the side. */
export function Lotus({ x, y, s = 1, c1 = "#f2c6c2", c2 = "#d98d8a", c3 = "#b45a57" }: { x: number; y: number; s?: number; c1?: string; c2?: string; c3?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 C -50 -6 -70 -30 -66 -44 C -44 -40 -24 -26 0 0 Z" fill={c2} />
      <path d="M0 0 C 50 -6 70 -30 66 -44 C 44 -40 24 -26 0 0 Z" fill={c2} />
      <path d="M0 0 C -34 -16 -40 -54 -28 -74 C -12 -60 -4 -30 0 0 Z" fill={c1} />
      <path d="M0 0 C 34 -16 40 -54 28 -74 C 12 -60 4 -30 0 0 Z" fill={c1} />
      <path d="M0 0 C -14 -24 -12 -64 0 -88 C 12 -64 14 -24 0 0 Z" fill={c1} />
      <path d="M0 0 C -6 -24 -5 -58 0 -80 C 5 -58 6 -24 0 0 Z" fill={c3} opacity={0.25} />
    </g>
  );
}

/** Stupa silhouette (dome, harmika, spire). */
export function Stupa({ x, y, s = 1, fill = "#f3efe6", shade = "#d8d0c0", gold = "#d6a74a" }: { x: number; y: number; s?: number; fill?: string; shade?: string; gold?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-140} y={-18} width={280} height={18} fill={shade} />
      <rect x={-120} y={-34} width={240} height={16} fill={fill} />
      <path d="M-110 -34 C -110 -120 110 -120 110 -34 Z" fill={fill} />
      <path d="M30 -110 C 80 -96 108 -70 110 -34 L 60 -34 C 60 -64 50 -92 30 -110 Z" fill={shade} opacity={0.6} />
      <rect x={-28} y={-148} width={56} height={34} fill={gold} />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={-22 + i * 2.2} y={-156 - i * 10} width={44 - i * 4.4} height={8} fill={gold} opacity={0.95 - i * 0.03} />
      ))}
      <path d="M0 -270 L 10 -246 H-10 Z" fill={gold} />
    </g>
  );
}

/** Simplified standing human figure for paper-cut style silhouettes. */
export function Figure({ x, y, h = 90, fill = "#1d1a16", pose = "stand", drape = false }: { x: number; y: number; h?: number; fill?: string; pose?: "stand" | "offer" | "dance" | "walk"; drape?: boolean }) {
  const s = h / 90;
  const arms =
    pose === "offer"
      ? "M-10 -58 Q -18 -44 -4 -40 M10 -58 Q 20 -46 6 -40"
      : pose === "dance"
        ? "M-10 -60 Q -26 -70 -30 -82 M10 -60 Q 24 -54 30 -44"
        : pose === "walk"
          ? "M-9 -58 L -15 -36 M9 -58 L 15 -38"
          : "M-9 -58 L -12 -34 M9 -58 L 12 -34";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <circle cx={0} cy={-78} r={8} />
      <path d={drape ? "M-12 -66 Q 0 -72 12 -66 L 20 0 L -20 0 Z" : "M-11 -66 Q 0 -71 11 -66 L 13 -30 L 8 0 L 2 0 L 0 -26 L -2 0 L -8 0 L -13 -30 Z"} />
      <path d={arms} stroke={fill} strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>
  );
}

export function Svg({ children, viewBox, title, className, ...rest }: SVGProps<SVGSVGElement> & { title?: string; children: ReactNode; viewBox: string }) {
  return (
    <svg viewBox={viewBox} className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} focusable="false" {...rest}>
      {children}
    </svg>
  );
}
