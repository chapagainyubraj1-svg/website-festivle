/**
 * Spot illustrations: objects, day icons and symbols. Original artwork.
 * All use a 200×200 viewBox and the festival palette via CSS variables so the
 * same object adapts to each article's art direction.
 */
import type { ReactNode } from "react";
import { Jamara, Kalash, Kite, Swing, rng } from "./primitives";

let counter = 0;
/** Unique gradient ids per rendered instance (spots can appear several times on a page). */
const uid = (p: string) => `${p}-${(++counter).toString(36)}`;

const INK = "#2a2018";
const GOLD = "#c9963a";
const ACC = "var(--f-accent, #c0391f)";
const ACC2 = "var(--f-accent-2, #d4881e)";

function Frame({ children, disc = true, label }: { children: ReactNode; disc?: boolean; label?: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
      {disc ? <circle cx={100} cy={100} r={92} fill="var(--f-soft, #efe5cf)" /> : null}
      {children}
    </svg>
  );
}

export function SpotKalash() {
  return (
    <Frame>
      <g transform="translate(0 6)">
        <Kalash x={100} y={170} s={0.82} />
      </g>
    </Frame>
  );
}

export function SpotJamara() {
  return (
    <Frame>
      <Jamara x={40} y={160} w={120} h={110} count={120} seed={4} />
      <path d="M30 168 C 60 154 140 154 170 168 L 160 178 L 40 178 Z" fill="#6b4529" />
    </Frame>
  );
}

export function SpotLamp() {
  const g = uid("sl");
  return (
    <Frame>
      <defs>
        <radialGradient id={g} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd77a" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ffd77a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={112} cy={96} r={56} fill={`url(#${g})`} className="anim-glow" />
      <g transform="translate(88 140) scale(2.2)">
        <path d="M-22 -4 Q -20 8 0 8 Q 20 8 22 -4 Q 12 -1 0 -1 Q -12 -1 -22 -4 Z" fill="#a4552e" />
        <path d="M-22 -4 Q 0 -10 22 -4 Q 12 -1 0 -1 Q -12 -1 -22 -4 Z" fill="#000" opacity={0.25} />
        <path d="M14 -6 Q 22 -9 25 -12" stroke="#a4552e" strokeWidth={3} strokeLinecap="round" fill="none" />
        <g className="anim-flicker">
          <path d="M24 -12 C 18 -20 21 -30 26 -38 C 31 -30 33 -20 24 -12 Z" fill="#ffc94a" />
          <path d="M25 -14 C 22 -19 24 -25 26 -29 C 28 -25 29 -19 25 -14 Z" fill="#fff6d8" />
        </g>
      </g>
    </Frame>
  );
}

export function SpotPhulpati() {
  return (
    <Frame>
      {/* banana stalks and sugarcane tied with red cloth */}
      <g transform="rotate(-8 100 110)">
        <path d="M84 178 L 88 40" stroke="#5f8a3a" strokeWidth={9} strokeLinecap="round" />
        <path d="M96 178 L 102 30" stroke="#6f9a44" strokeWidth={10} strokeLinecap="round" />
        <path d="M112 178 L 116 36" stroke="#7a5a2a" strokeWidth={7} strokeLinecap="round" />
        {[60, 84, 108, 132].map((y) => (
          <path key={y} d={`M110 ${y} h10`} stroke="#5a4020" strokeWidth={2} />
        ))}
        <path d="M100 34 C 70 20 52 30 44 50 C 66 44 84 44 100 46 Z" fill="#4f7d34" />
        <path d="M104 30 C 132 14 152 22 160 42 C 138 38 120 40 104 44 Z" fill="#5f9440" />
        <path d="M88 40 C 70 60 58 66 46 70 C 60 54 74 44 88 40 Z" fill="#6aa04a" />
        <Jamara x={86} y={60} w={30} h={50} count={30} seed={9} />
        <rect x={78} y={118} width={46} height={16} fill={ACC} rx={2} />
        <path d="M86 134 l-8 22 M116 134 l8 20" stroke={ACC} strokeWidth={5} strokeLinecap="round" />
      </g>
    </Frame>
  );
}

export function SpotKhadga() {
  return (
    <Frame>
      <g transform="rotate(-35 100 100)">
        <path d="M100 30 C 112 60 116 100 108 140 L 92 140 C 96 110 96 70 100 30 Z" fill="#cfd6dc" />
        <path d="M100 30 C 106 60 108 100 104 140 L 100 140 C 100 100 100 60 100 30 Z" fill="#9aa5ae" />
        <rect x={80} y={140} width={40} height={8} rx={3} fill={GOLD} />
        <rect x={94} y={148} width={12} height={26} rx={3} fill={INK} />
        <circle cx={100} cy={180} r={7} fill={GOLD} />
      </g>
    </Frame>
  );
}

export function SpotTools() {
  return (
    <Frame>
      {/* a hammer and a wrench crossed, garlanded */}
      <g transform="rotate(-30 100 100)">
        <rect x={94} y={60} width={12} height={110} rx={4} fill="#8a5a33" />
        <rect x={70} y={46} width={60} height={24} rx={4} fill="#5d6873" />
      </g>
      <g transform="rotate(32 100 100)">
        <rect x={95} y={60} width={10} height={100} rx={4} fill="#7d8790" />
        <path d="M100 40 a 20 20 0 1 0 0.1 0 Z M92 40 h16 v14 h-16 Z" fill="#7d8790" fillRule="evenodd" />
      </g>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <circle key={i} cx={58 + i * 14} cy={148 + Math.sin(i * 0.9) * 6} r={7} fill={i % 2 ? "#f2a12a" : "#e07a16"} />
      ))}
    </Frame>
  );
}

export function SpotTika() {
  const r = rng(12);
  return (
    <Frame>
      {/* a small bowl of tika — rice, yogurt and vermilion — with jamara */}
      <path d="M138 70 C 150 46 156 32 166 22" stroke="#e8d27a" strokeWidth={3.2} strokeLinecap="round" fill="none" />
      <path d="M130 72 C 136 48 140 36 146 22" stroke="#d9bf55" strokeWidth={3.2} strokeLinecap="round" fill="none" />
      <path d="M144 76 C 160 56 172 46 182 40" stroke="#efe08c" strokeWidth={3} strokeLinecap="round" fill="none" />
      <ellipse cx={100} cy={150} rx={62} ry={10} fill="#000" opacity={0.12} />
      <path d="M38 104 C 42 140 66 156 100 156 C 134 156 158 140 162 104 Z" fill="#c9963a" />
      <path d="M120 106 C 150 108 156 126 148 138 C 140 150 128 154 112 156 C 136 144 146 126 120 106 Z" fill="#8a5e1e" opacity={0.45} />
      <ellipse cx={100} cy={104} rx={62} ry={16} fill="#8a5e1e" />
      <ellipse cx={100} cy={102} rx={54} ry={12} fill={ACC} />
      {Array.from({ length: 46 }).map((_, i) => {
        const a = r() * Math.PI * 2;
        const d = Math.sqrt(r());
        const cx = 100 + Math.cos(a) * d * 48;
        const cy = 102 + Math.sin(a) * d * 9;
        return <ellipse key={i} cx={cx} cy={cy} rx={2.2} ry={1.1} transform={`rotate(${r() * 180} ${cx} ${cy})`} fill="#fff7e8" opacity={0.8} />;
      })}
    </Frame>
  );
}

export function SpotMoon() {
  return (
    <Frame>
      <rect x={8} y={8} width={184} height={184} rx={92} fill="#1c2540" />
      <circle cx={100} cy={86} r={40} fill="#f6efd6" />
      <circle cx={88} cy={76} r={6} fill="#e3d9b9" />
      <circle cx={112} cy={96} r={9} fill="#e3d9b9" />
      <path d="M30 150 Q 100 136 170 150 L 170 170 Q 100 186 30 170 Z" fill="#2c3c63" />
      <path d="M60 156 h80 M74 164 h52" stroke="#f6efd6" strokeWidth={2} opacity={0.5} />
    </Frame>
  );
}

export function SpotGourd() {
  return (
    <Frame>
      <ellipse cx={100} cy={170} rx={58} ry={8} fill="#000" opacity={0.12} />
      <path d="M100 52 C 60 52 42 90 46 124 C 50 160 76 172 100 172 C 124 172 150 160 154 124 C 158 90 140 52 100 52 Z" fill="#6f9a44" />
      <path d="M100 52 C 86 70 80 120 92 172 M100 52 C 114 70 120 120 108 172 M100 52 C 70 70 60 120 72 166 M100 52 C 130 70 140 120 128 166" stroke="#4f7a30" strokeWidth={2} fill="none" />
      <path d="M100 52 C 98 40 104 30 112 26" stroke="#5a4020" strokeWidth={5} strokeLinecap="round" fill="none" />
    </Frame>
  );
}

export function SpotSwing() {
  return (
    <Frame>
      <Swing x={100} y={176} h={150} stroke={INK} rope="#6b4b2b" swingAngle={-14} />
    </Frame>
  );
}

export function SpotWheel() {
  return (
    <Frame>
      <g transform="translate(100 96)">
        <circle r={62} fill="none" stroke={INK} strokeWidth={5} />
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 45})`}>
            <path d="M0 0 V-62" stroke={INK} strokeWidth={3.5} />
            <rect x={-9} y={-74} width={18} height={10} fill={i % 2 ? ACC : GOLD} rx={2} />
          </g>
        ))}
        <circle r={8} fill={INK} />
      </g>
      <path d="M100 96 L 64 182 M100 96 L 136 182" stroke={INK} strokeWidth={6} strokeLinecap="round" />
    </Frame>
  );
}

export function SpotKite() {
  return (
    <Frame>
      <Kite x={104} y={78} size={70} rot={-14} fill="#c0391f" fill2="#f2d38a" tail="#c0391f" string={false} />
      <path d="M96 116 C 80 150 60 170 30 188" stroke={INK} strokeWidth={1} fill="none" opacity={0.5} />
    </Frame>
  );
}

export function SpotCloth() {
  return (
    <Frame>
      <path d="M44 60 L 76 44 Q 100 58 124 44 L 156 60 L 146 92 L 132 86 L 134 160 L 66 160 L 68 86 L 54 92 Z" fill={ACC} />
      <path d="M76 44 Q 100 58 124 44" fill="none" stroke="#fff3d6" strokeWidth={2} opacity={0.6} />
      <path d="M68 104 h64 M68 120 h64" stroke={ACC2} strokeWidth={4} opacity={0.6} />
    </Frame>
  );
}

export function SpotPot() {
  return (
    <Frame>
      <path d="M50 92 Q 100 82 150 92 L 142 150 Q 100 170 58 150 Z" fill="#5d6873" />
      <ellipse cx={100} cy={92} rx={50} ry={10} fill="#3d464f" />
      <path d="M48 98 h-14 M152 98 h14" stroke="#5d6873" strokeWidth={6} strokeLinecap="round" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${82 + i * 16} 76 c -6 -10 6 -16 0 -28`} stroke="#c9b9a3" strokeWidth={3} fill="none" opacity={0.6} className="anim-flicker" style={{ animationDelay: `${i * 0.5}s` }} />
      ))}
    </Frame>
  );
}

export function SpotCards() {
  return (
    <Frame>
      {[-20, -4, 12].map((rot, i) => (
        <g key={i} transform={`rotate(${rot} 100 160)`}>
          <rect x={72} y={56} width={56} height={84} rx={6} fill="#fbf6ea" stroke={INK} strokeWidth={1.5} />
          <path d={i === 2 ? "M100 84 C 92 74 80 84 100 104 C 120 84 108 74 100 84 Z" : "M100 80 L 112 98 L 100 116 L 88 98 Z"} fill={i === 1 ? INK : ACC} />
        </g>
      ))}
    </Frame>
  );
}

export function SpotPath() {
  return (
    <Frame>
      <path d="M30 170 C 70 150 60 120 100 110 C 140 100 130 70 170 50" fill="none" stroke={INK} strokeWidth={3} strokeDasharray="2 8" strokeLinecap="round" />
      {[
        [40, 166],
        [100, 110],
        [166, 52],
      ].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x - 14} ${y} L ${x} ${y - 14} L ${x + 14} ${y} Z`} fill="#5a3d28" />
          <rect x={x - 11} y={y} width={22} height={14} fill="#d98b55" />
        </g>
      ))}
      <circle cx={100} cy={96} r={5} fill={ACC} />
    </Frame>
  );
}

/* --------------------------- Legend scenes --------------------------- */

function SceneFrame({ children, id: base }: { children: (id: string) => ReactNode; id: string }) {
  const id = uid(base);
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f1730" />
          <stop offset="1" stopColor="#24305a" />
        </linearGradient>
        <radialGradient id={`${id}-light`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff4cf" />
          <stop offset="0.35" stopColor="#f6c56a" stopOpacity="0.85" />
          <stop offset="1" stopColor="#f6c56a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={800} height={500} fill={`url(#${id}-bg)`} />
      {Array.from({ length: 40 }).map((_, i) => {
        const r = rng(i + 7);
        return <circle key={i} cx={r() * 800} cy={r() * 300} r={r() * 1.4 + 0.3} fill="#f6efd6" opacity={0.5} />;
      })}
      {children(id)}
    </svg>
  );
}

/** Horns and head of the buffalo, as a looming silhouette. */
function Buffalo({ x, y, s = 1, fill = "#05070f", opacity = 1 }: { x: number; y: number; s?: number; fill?: string; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill} opacity={opacity}>
      <path d="M-150 -40 C -230 -70 -250 -150 -200 -200 C -210 -140 -170 -90 -90 -70 Z" />
      <path d="M150 -40 C 230 -70 250 -150 200 -200 C 210 -140 170 -90 90 -70 Z" />
      <path d="M-100 -70 C -60 -96 60 -96 100 -70 C 120 -20 80 80 40 120 C 20 140 -20 140 -40 120 C -80 80 -120 -20 -100 -70 Z" />
      <path d="M-104 -60 C -140 -60 -160 -40 -168 -20 C -140 -26 -120 -30 -100 -40 Z M104 -60 C 140 -60 160 -40 168 -20 C 140 -26 120 -30 100 -40 Z" />
      <circle cx={-46} cy={-20} r={7} fill="#b4281a" />
      <circle cx={46} cy={-20} r={7} fill="#b4281a" />
    </g>
  );
}

/** Weapons of the gods, drawn as simple emblems around a ring. */
function WeaponRing({ cx, cy, r, color = "#f6c56a" }: { cx: number; cy: number; r: number; color?: string }) {
  const emblems = [
    // trident
    <path key="t" d="M0 22 V-18 M-10 -6 C -10 -16 -6 -20 -6 -24 M10 -6 C 10 -16 6 -20 6 -24 M-10 -6 H10 M0 -18 L -3 -24 H3 Z" stroke={color} strokeWidth={2.6} fill="none" strokeLinecap="round" />,
    // discus
    <g key="d">
      <circle r={13} fill="none" stroke={color} strokeWidth={2.6} />
      <circle r={4} fill={color} />
      {Array.from({ length: 8 }).map((_, i) => (
        <path key={i} d="M0 -13 V-18" stroke={color} strokeWidth={2} transform={`rotate(${i * 45})`} />
      ))}
    </g>,
    // sword
    <path key="s" d="M0 -24 C 5 -10 5 6 2 14 H-2 C -5 6 -5 -10 0 -24 Z M-9 14 H9 M0 14 V24" stroke={color} strokeWidth={2.2} fill="none" />,
    // conch
    <path key="c" d="M-12 6 C -14 -10 0 -22 10 -14 C 16 -8 12 6 4 10 C 0 14 -6 14 -12 6 Z M-12 6 L -18 14" stroke={color} strokeWidth={2.4} fill="none" />,
    // bow
    <path key="b" d="M-8 -22 C 14 -10 14 10 -8 22 M-8 -22 V22" stroke={color} strokeWidth={2.4} fill="none" />,
    // bell
    <path key="bl" d="M-12 10 C -12 -10 -6 -18 0 -18 C 6 -18 12 -10 12 10 Z M0 -18 V-24 M-3 14 h6" stroke={color} strokeWidth={2.4} fill="none" />,
    // thunderbolt
    <path key="v" d="M0 -24 L 6 -8 L 0 0 L 6 8 L 0 24 L -6 8 L 0 0 L -6 -8 Z" stroke={color} strokeWidth={2.2} fill="none" />,
    // noose
    <path key="n" d="M0 -6 a 12 12 0 1 0 0.1 0 M0 6 C 4 14 10 18 16 22" stroke={color} strokeWidth={2.4} fill="none" />,
  ];
  return (
    <g>
      {emblems.map((e, i) => {
        const a = (i / emblems.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <g key={i} transform={`translate(${cx + Math.cos(a) * r} ${cy + Math.sin(a) * r})`}>
            {e}
          </g>
        );
      })}
    </g>
  );
}

export function LegendExile() {
  return (
    <SceneFrame id="lx">
      {(id) => (
      <>
      {/* palace of clouds */}
      <g opacity={0.9}>
        {[
          [560, 120, 140],
          [640, 96, 110],
          [700, 130, 120],
        ].map(([x, y, w], i) => (
          <ellipse key={i} cx={x} cy={y} rx={w} ry={26} fill="#3d4a7a" />
        ))}
        {[600, 650, 700].map((x, i) => (
          <g key={i}>
            <rect x={x - 10} y={60 - i * 6} width={20} height={44 + i * 6} fill="#58628f" />
            <path d={`M${x - 14} ${60 - i * 6} Q ${x} ${36 - i * 6} ${x + 14} ${60 - i * 6} Z`} fill="#c9a24a" opacity={0.7} />
          </g>
        ))}
      </g>
      <Buffalo x={380} y={330} s={1.15} fill="#060912" opacity={0.92} />
      {/* gods as small lights fleeing to the lower left */}
      {Array.from({ length: 9 }).map((_, i) => (
        <g key={i} transform={`translate(${120 + i * 26} ${380 + Math.sin(i) * 26 + i * 6})`}>
          <circle r={14} fill={`url(#${id}-light)`} />
          <circle r={4} fill="#fff4cf" />
        </g>
      ))}
      <path d="M0 470 Q 400 430 800 470 V500 H0 Z" fill="#0a0f20" />
      </>
      )}
    </SceneFrame>
  );
}

export function LegendRadiance() {
  const sources = Array.from({ length: 10 }).map((_, i) => {
    const a = (i / 10) * Math.PI * 2;
    return [400 + Math.cos(a) * 360, 250 + Math.sin(a) * 230] as [number, number];
  });
  return (
    <SceneFrame id="lr">
      {(id) => (
      <>
      {sources.map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x} ${y} L 400 250`} stroke="#f6c56a" strokeWidth={6} opacity={0.18} />
          <path d={`M${x} ${y} L 400 250`} stroke="#fff4cf" strokeWidth={1.2} opacity={0.6} />
          <circle cx={x} cy={y} r={9} fill="#fff4cf" opacity={0.8} />
        </g>
      ))}
      <circle cx={400} cy={250} r={170} fill={`url(#${id}-light)`} className="anim-glow" />
      <WeaponRing cx={400} cy={250} r={112} color="#fbe3a2" />
      {/* the goddess as a flame-shaped mandorla of light */}
      <path d="M400 150 C 440 200 452 260 430 320 C 420 344 380 344 370 320 C 348 260 360 200 400 150 Z" fill="#fff4cf" opacity={0.95} />
      <path d="M400 186 C 420 220 426 260 414 300 C 408 314 392 314 386 300 C 374 260 380 220 400 186 Z" fill="#f6c56a" />
      </>
      )}
    </SceneFrame>
  );
}

export function LegendBattle() {
  return (
    <SceneFrame id="lb">
      {(id) => (
      <>
      {/* radiant side */}
      <circle cx={210} cy={250} r={150} fill={`url(#${id}-light)`} />
      <WeaponRing cx={210} cy={250} r={86} color="#fbe3a2" />
      <path d="M210 170 C 238 206 246 248 230 290 C 224 306 196 306 190 290 C 174 248 182 206 210 170 Z" fill="#fff4cf" />
      {/* the lion: a mane of rays */}
      <g transform="translate(210 380)">
        {Array.from({ length: 18 }).map((_, i) => (
          <path key={i} d="M0 0 L 0 -46" stroke="#e8a83a" strokeWidth={6} transform={`rotate(${-90 + i * 10})`} strokeLinecap="round" />
        ))}
        <circle r={24} fill="#c9862a" />
      </g>
      {/* the shape-shifter: buffalo → lion → elephant, spiralling */}
      <g opacity={0.95}>
        <Buffalo x={600} y={330} s={0.55} fill="#060912" />
        <g transform="translate(560 170)" fill="#0a0e1c">
          <circle r={34} />
          {Array.from({ length: 14 }).map((_, i) => (
            <path key={i} d="M0 -30 L 0 -52" stroke="#0a0e1c" strokeWidth={8} transform={`rotate(${i * 26})`} strokeLinecap="round" />
          ))}
        </g>
        <g transform="translate(690 160)" fill="#0a0e1c">
          <path d="M-40 -20 C -40 -60 40 -60 40 -20 C 40 0 30 10 20 14 C 16 40 10 60 -2 70 C 8 50 8 30 4 16 C -20 14 -40 4 -40 -20 Z" />
          <path d="M-40 -22 C -70 -30 -76 10 -46 18 Z M40 -22 C 70 -30 76 10 46 18 Z" />
        </g>
        <path d="M520 220 C 560 260 640 240 660 200" stroke="#3d4a7a" strokeWidth={2} fill="none" strokeDasharray="4 6" />
        <path d="M640 280 C 700 260 720 220 700 200" stroke="#3d4a7a" strokeWidth={2} fill="none" strokeDasharray="4 6" />
      </g>
      </>
      )}
    </SceneFrame>
  );
}

export function LegendVictory() {
  const id = uid("lv");
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a3a6e" />
          <stop offset="0.55" stopColor="#c27a5a" />
          <stop offset="1" stopColor="#f2cf8a" />
        </linearGradient>
        <radialGradient id={`${id}-light`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset="0.4" stopColor="#ffe3a0" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ffe3a0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={800} height={500} fill={`url(#${id}-bg)`} />
      <circle cx={400} cy={170} r={150} fill={`url(#${id}-light)`} className="anim-glow" />
      <WeaponRing cx={400} cy={170} r={88} color="#fff4cf" />
      <path d="M400 92 C 428 128 436 168 420 210 C 414 226 386 226 380 210 C 364 168 372 128 400 92 Z" fill="#fffaf0" />
      {/* the fallen buffalo, low on the horizon */}
      <g transform="rotate(14 400 450)">
        <Buffalo x={400} y={470} s={0.5} fill="#2a1a14" opacity={0.85} />
      </g>
      {/* returning lights */}
      {Array.from({ length: 9 }).map((_, i) => (
        <circle key={i} cx={120 + i * 70} cy={300 - Math.sin((i / 8) * Math.PI) * 60} r={5} fill="#fffaf0" opacity={0.85} />
      ))}
      <path d="M0 440 Q 400 400 800 440 V500 H0 Z" fill="#5a3a2a" opacity={0.7} />
    </svg>
  );
}

/* --------------------------- Tika plate --------------------------- */

export function TikaThali() {
  const r = rng(77);
  const id = uid("tt");
  return (
    <svg viewBox="0 0 600 600" className="h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-brass`} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#f1d38a" />
          <stop offset="0.55" stopColor="#c9963a" />
          <stop offset="1" stopColor="#8a5e1e" />
        </radialGradient>
        <radialGradient id={`${id}-tika`} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#e2482c" />
          <stop offset="1" stopColor="#9c2312" />
        </radialGradient>
      </defs>
      <rect width={600} height={600} fill="var(--f-soft, #efe5cf)" />
      <circle cx={300} cy={318} r={262} fill="#000" opacity={0.12} />
      <circle cx={300} cy={300} r={262} fill={`url(#${id}-brass)`} />
      <circle cx={300} cy={300} r={238} fill="none" stroke="#8a5e1e" strokeWidth={2} opacity={0.6} />
      <circle cx={300} cy={300} r={224} fill="none" stroke="#fff1c4" strokeWidth={1.5} opacity={0.4} />
      {/* kalash from above (top) */}
      <g transform="translate(312 108)">
        <circle r={54} fill="#b8862e" />
        <circle r={40} fill="#7a4f1e" />
        {Array.from({ length: 7 }).map((_, i) => (
          <path key={i} d="M0 0 C -12 -18 -10 -46 0 -60 C 10 -46 12 -18 0 0 Z" fill="#3f6b3a" transform={`rotate(${i * 51})`} />
        ))}
        <circle r={12} fill="#c0391f" />
      </g>
      {/* red tika mound */}
      <g transform="translate(228 264)">
        <ellipse rx={78} ry={70} fill={`url(#${id}-tika)`} />
        {Array.from({ length: 140 }).map((_, i) => {
          const a = r() * Math.PI * 2;
          const d = Math.sqrt(r()) * 64;
          return <ellipse key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d * 0.9} rx={3.2} ry={1.6} transform={`rotate(${r() * 180} ${Math.cos(a) * d} ${Math.sin(a) * d * 0.9})`} fill="#fff4e6" opacity={0.55 + r() * 0.35} />;
        })}
      </g>
      {/* yogurt bowl */}
      <g transform="translate(384 204)">
        <circle r={50} fill="#5d4a3a" />
        <circle r={42} fill="#fbf7ee" />
        <path d="M-20 -6 C -6 -16 10 -14 22 -4" stroke="#e8e0cf" strokeWidth={4} fill="none" strokeLinecap="round" />
      </g>
      {/* jamara bundle */}
      <g transform="translate(420 396) rotate(-30)">
        {Array.from({ length: 60 }).map((_, i) => {
          const len = 120 + r() * 60;
          const off = (r() - 0.5) * 30;
          return <path key={i} d={`M${off * 0.3} 0 Q ${off} ${-len * 0.5} ${off * 1.6} ${-len}`} stroke={r() > 0.5 ? "#efe08c" : "#d9bf55"} strokeWidth={2.2 + r() * 1.5} fill="none" strokeLinecap="round" />;
        })}
        <rect x={-14} y={-6} width={28} height={12} rx={3} fill="#c0391f" />
      </g>
      {/* dakshina: notes and coins */}
      <g transform="translate(178 432) rotate(-12)">
        <rect x={-46} y={-26} width={92} height={50} rx={3} fill="#d9e2d0" stroke="#7a8f6a" strokeWidth={2} />
        <rect x={-38} y={-18} width={76} height={34} rx={2} fill="none" stroke="#7a8f6a" strokeWidth={1.2} />
        <circle cx={0} cy={-1} r={10} fill="none" stroke="#7a8f6a" strokeWidth={1.5} />
      </g>
      {[
        [120, 400],
        [138, 470],
        [228, 486],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={15} fill="#c0c4c8" />
          <circle cx={x} cy={y} r={11} fill="none" stroke="#8e949a" strokeWidth={1.5} />
        </g>
      ))}
    </svg>
  );
}

/** Registry: art key → component. */
export const spotRegistry: Record<string, () => React.JSX.Element> = {
  kalash: SpotKalash,
  "day-kalash": SpotKalash,
  jamara: SpotJamara,
  lamp: SpotLamp,
  "day-lamp": SpotLamp,
  phulpati: SpotPhulpati,
  "day-phulpati": SpotPhulpati,
  khadga: SpotKhadga,
  "day-khadga": SpotKhadga,
  tools: SpotTools,
  "day-tools": SpotTools,
  tika: SpotTika,
  "day-tika": SpotTika,
  moon: SpotMoon,
  "day-moon": SpotMoon,
  gourd: SpotGourd,
  swing: SpotSwing,
  wheel: SpotWheel,
  kite: SpotKite,
  cloth: SpotCloth,
  pot: SpotPot,
  cards: SpotCards,
  path: SpotPath,
  "day-path": SpotPath,
  "legend-exile": LegendExile,
  "legend-radiance": LegendRadiance,
  "legend-battle": LegendBattle,
  "legend-victory": LegendVictory,
  "tika-thali": TikaThali,
};
