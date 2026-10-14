/** The Atlas mark: a horizon of peaks inside a compass ring, with a rising sun. */
export function Emblem({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <circle cx="20" cy="20" r="18.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2.2" opacity="0.7" />
      <circle cx="26.5" cy="14.5" r="3" fill="var(--sindur)" />
      <path d="M5.5 27 L13 17.5 L17 22 L22 14 L29.5 24.5 L34.5 27" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8 30.5 H32" stroke="currentColor" strokeWidth="0.9" />
    </svg>
  );
}
