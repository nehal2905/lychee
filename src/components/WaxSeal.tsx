/** Brand LL seal — circular crop of the lychee lore crest. */
export function WaxSeal({
  size = 56,
  className = "",
  rotate = -10,
  alt = "Lychee Lore seal",
}: {
  size?: number;
  className?: string;
  rotate?: number;
  alt?: string;
}) {
  return (
    <span
      className={`pointer-events-none inline-flex shrink-0 select-none overflow-hidden rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.45)] ${className}`}
      style={{
        width: size,
        height: size,
        rotate: `${rotate}deg`,
        // soft rim so it reads as a pressed seal, not a flat square
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.45), inset 0 0 0 1.5px rgba(184,148,90,0.25)",
      }}
      aria-hidden={alt === "" ? true : undefined}
    >
      <img
        src="/seal-ll.webp"
        alt={alt}
        width={size}
        height={size}
        draggable={false}
        className="h-full w-full object-cover"
        // nudge scale so the rose circle fills the mask (no dark square corners)
        style={{ transform: "scale(1.08)" }}
      />
    </span>
  );
}
