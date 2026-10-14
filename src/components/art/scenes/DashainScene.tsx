import { Grain, Jamara, Kalash, Kite, Swing, himalaya, ridge, terraces } from "../primitives";

/**
 * Dashain — autumn after the monsoon: a washed-clear sky, kites, a bamboo swing
 * on a terraced ridge and, in the foreground, jamara rising behind the kalash.
 * Original interpretive illustration.
 */
export function DashainScene({ className, idPrefix = "dsh" }: { className?: string; idPrefix?: string }) {
  const W = 1600;
  const H = 900;
  const id = (s: string) => `${idPrefix}-${s}`;
  const range = himalaya({ seed: 8, width: W, baseY: 505, height: 235, peaks: 6, light: "right" });
  const far = ridge({ seed: 11, width: W, baseY: 540, amp: 34, bottom: H, steps: 10 });
  const mid = ridge({ seed: 23, width: W, baseY: 618, amp: 52, bottom: H, steps: 8 });
  const near = ridge({ seed: 41, width: W, baseY: 722, amp: 40, bottom: H, steps: 7 });
  const terrMid = terraces(mid.points, 8, 12, 4);
  const terrNear = terraces(near.points, 6, 15, 9);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d3b6e" />
          <stop offset="0.38" stopColor="#3f6fa8" />
          <stop offset="0.66" stopColor="#8db6d8" />
          <stop offset="0.86" stopColor="#d9e4e4" />
          <stop offset="1" stopColor="#f2e2b6" />
        </linearGradient>
        <radialGradient id={id("sun")} cx="0.2" cy="0.18" r="0.32">
          <stop offset="0" stopColor="#fffbe8" stopOpacity="0.9" />
          <stop offset="0.3" stopColor="#fff3cc" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff3cc" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("rock")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7f93b3" />
          <stop offset="1" stopColor="#a9b9cf" />
        </linearGradient>
        <linearGradient id={id("snow")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e8eef6" />
        </linearGradient>
        <linearGradient id={id("haze")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6ecee" stopOpacity="0" />
          <stop offset="1" stopColor="#e6ecee" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id={id("far")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6f8fa6" />
          <stop offset="1" stopColor="#5b7c8f" />
        </linearGradient>
        <linearGradient id={id("mid")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4f7a5a" />
          <stop offset="1" stopColor="#355c45" />
        </linearGradient>
        <linearGradient id={id("near")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2f5a3d" />
          <stop offset="1" stopColor="#1d3a28" />
        </linearGradient>
        <linearGradient id={id("bed")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a5232" />
          <stop offset="1" stopColor="#3d2614" />
        </linearGradient>
        <radialGradient id={id("glow")} cx="0.5" cy="0.55" r="0.5">
          <stop offset="0" stopColor="#ffe6a0" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffe6a0" stopOpacity="0" />
        </radialGradient>
        <clipPath id={id("rangeClip")}>
          <path d={range.d} />
        </clipPath>
      </defs>

      {/* sky */}
      <g data-depth="0">
        <rect width={W} height={H} fill={`url(#${id("sky")})`} />
        <rect width={W} height={H} fill={`url(#${id("sun")})`} />
        <circle cx={320} cy={160} r={30} fill="#fffbea" />
        <g fill="#ffffff" opacity={0.5}>
          <ellipse cx={1050} cy={150} rx={210} ry={7} />
          <ellipse cx={1160} cy={164} rx={130} ry={5} />
          <ellipse cx={720} cy={248} rx={160} ry={5} />
        </g>
        {/* birds */}
        <g fill="none" stroke="#24324a" strokeWidth={1.6} strokeLinecap="round" opacity={0.55}>
          <path d="M860 300 q6 -6 12 0 q6 -6 12 0" />
          <path d="M890 318 q5 -5 10 0 q5 -5 10 0" />
          <path d="M838 322 q4 -4 8 0 q4 -4 8 0" />
        </g>
      </g>

      {/* Himalaya */}
      <g data-depth="0.06">
        <path d={range.d} fill={`url(#${id("rock")})`} />
        <g clipPath={`url(#${id("rangeClip")})`}>
          <path d={range.snow} fill={`url(#${id("snow")})`} />
          {range.shadows.map((d, i) => (
            <path key={i} d={d} fill="#5d7397" opacity={0.42} />
          ))}
        </g>
        <rect y={380} width={W} height={160} fill={`url(#${id("haze")})`} />
      </g>

      {/* far hills */}
      <g data-depth="0.14">
        <path d={far.d} fill={`url(#${id("far")})`} />
        <rect y={500} width={W} height={130} fill={`url(#${id("haze")})`} opacity={0.6} />
      </g>

      {/* kites */}
      <g data-depth="0.2">
        <Kite x={560} y={200} size={34} rot={-12} fill="#c0391f" fill2="#f2d38a" tail="#f2d38a" stringTo={[700, 640]} className="anim-drift" style={{ ["--dur" as string]: "11s", ["--dx" as string]: "10px", ["--dy" as string]: "-14px" }} />
        <Kite x={760} y={128} size={24} rot={8} fill="#1f4f9a" fill2="#f3efe6" tail="#f3efe6" stringTo={[760, 640]} className="anim-drift" style={{ ["--dur" as string]: "9s" }} />
        <Kite x={1010} y={232} size={28} rot={-4} fill="#e2b13c" fill2="#c0391f" tail="#c0391f" stringTo={[1080, 650]} className="anim-drift" style={{ ["--dur" as string]: "13s", ["--dx" as string]: "-8px" }} />
        <Kite x={1440} y={120} size={22} rot={14} fill="#f6f0e2" fill2="#2f7d4a" tail="#2f7d4a" stringTo={[1380, 640]} className="anim-drift" style={{ ["--dur" as string]: "10s" }} />
        <Kite x={1180} y={320} size={16} rot={-20} fill="#7a2a7a" fill2="#f2d38a" tail="#f2d38a" string={false} className="anim-drift" style={{ ["--dur" as string]: "8s" }} />
      </g>

      {/* middle ridge: terraces, village, swing */}
      <g data-depth="0.3">
        <path d={mid.d} fill={`url(#${id("mid")})`} />
        {terrMid.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#a8c48a" strokeWidth={1.3} opacity={0.42 - i * 0.04} />
        ))}
        {[
          [930, 616],
          [962, 622],
          [998, 614],
          [1060, 626],
          [1100, 620],
        ].map(([hx, hy], i) => (
          <g key={i}>
            <rect x={hx} y={hy - 17} width={24} height={17} fill="#d98b55" />
            <rect x={hx} y={hy - 9} width={24} height={9} fill="#9a4426" />
            <rect x={hx + 9} y={hy - 13} width={5} height={6} fill="#3a2418" />
            <path d={`M${hx - 4} ${hy - 17} L${hx + 12} ${hy - 29} L${hx + 28} ${hy - 17} Z`} fill="#5a3d28" />
          </g>
        ))}
        <Swing x={1300} y={612} h={250} stroke="#1c140c" rope="#3d2c1c" swingAngle={-12} className="anim-sway" />
      </g>

      {/* near ridge */}
      <g data-depth="0.44">
        <path d={near.d} fill={`url(#${id("near")})`} />
        {terrNear.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#7fae6c" strokeWidth={1.5} opacity={0.34 - i * 0.03} />
        ))}
      </g>

      {/* foreground: the jamara bed with kalash */}
      <g data-depth="0.68" transform="translate(560 0)">
        <ellipse cx={340} cy={780} rx={360} ry={150} fill={`url(#${id("glow")})`} />
        <Jamara x={70} y={808} w={540} h={250} count={320} seed={7} />
        <path d="M-10 900 C 20 820 120 792 340 790 C 560 792 660 820 690 900 Z" fill={`url(#${id("bed")})`} />
        <path d="M30 838 C 120 806 220 798 340 797 C 460 798 560 806 650 838" fill="none" stroke="#a87c4f" strokeWidth={2.5} opacity={0.55} />
        <Kalash x={340} y={850} s={1.4} />
        <Jamara x={40} y={828} w={150} h={120} count={70} seed={31} />
        <Jamara x={500} y={828} w={150} h={130} count={70} seed={37} />
      </g>

      <Grain id={id("grain")} w={W} h={H} opacity={0.12} />
    </svg>
  );
}
