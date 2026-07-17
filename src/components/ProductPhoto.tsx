import { motion } from "motion/react";

export function ProductPhoto({
  hue,
  stone,
  size = 220,
  shape = "pendant",
}: {
  hue: number;
  stone: string;
  size?: number;
  shape?: "pendant" | "ring" | "earring" | "locket";
}) {
  void size;
  void hue;
  void stone;

  return (
    <div
      className="relative overflow-hidden bg-panel flex items-center justify-center"
      style={{ width: "100%", aspectRatio: "3/4" }}
    >
      <motion.img
        src={`/${shape}.png`}
        alt={`Vintage ${shape}`}
        className="h-full w-full object-cover opacity-90 transition duration-700 hover:scale-105 hover:opacity-100"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 0.9, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* deep vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_38%_30%,transparent_42%,rgba(4,2,3,0.78))]" />
    </div>
  );
}
