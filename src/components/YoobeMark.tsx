/**
 * Badge textual para a marca Yoobe sem depender de asset externo.
 */
type YoobeMarkProps = {
  className?: string;
  "aria-label"?: string;
  title?: string;
};

export default function YoobeMark({
  className = "h-12 w-12",
  "aria-label": ariaLabel = "Yoobe",
  title,
}: YoobeMarkProps) {
  return (
    <span
      role="img"
      aria-label={ariaLabel}
      title={title}
      className={`inline-flex items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.28),rgba(255,255,255,0.08)_35%,rgba(11,92,255,0.22)_100%)] text-[0.7rem] font-black uppercase tracking-[0.16em] text-white shadow-[0_0_24px_rgba(30,58,95,0.45)] ring-2 ring-yoobe-blue/40 ${className}`}
    >
      Y.
    </span>
  );
}
