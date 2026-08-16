import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BlueDoor } from "./BlueDoor";

type Phase = "idle" | "pause" | "glow" | "opening" | "tunnel" | "flash" | "closing";

const PHASE_DURATIONS: Record<Exclude<Phase, "idle">, number> = {
  pause: 900,
  glow: 800,
  opening: 900,
  tunnel: 1000,
  flash: 260,
  closing: 700,
};

interface Particle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

function makeParticles(count: number): Particle[] {
  const colors = ["#a855f7", "#ec4899", "#f472b6", "#818cf8", "#c084fc"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: Math.random() * Math.PI * 2,
    distance: 26 + Math.random() * 60,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 0.6,
    duration: 1.4 + Math.random() * 1.4,
    color: colors[i % colors.length],
  }));
}

/**
 * Secuencia cinematográfica que se dispara en el intento decisivo: la puerta
 * despierta, se abre, y la cámara "entra" en ella — sin conceder acceso real,
 * es una advertencia visual de Coraline. Al terminar, todo se desvanece y
 * regresa al formulario de contraseña.
 */
export function PortalSequence({
  active,
  onComplete,
}: {
  active: boolean;
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const particles = useMemo(() => makeParticles(26), [active]);
  const tunnelRings = useMemo(() => [0, 1, 2, 3, 4, 5], []);

  useEffect(() => {
    if (!active) {
      setPhase("idle");
      return;
    }
    const order: Exclude<Phase, "idle">[] = ["pause", "glow", "opening", "tunnel", "flash", "closing"];
    let cancelled = false;
    let elapsed = 0;

    order.forEach((p) => {
      elapsed += PHASE_DURATIONS[p];
      setTimeout(() => {
        if (cancelled) return;
        setPhase(p);
        if (p === "closing") {
          setTimeout(() => {
            if (!cancelled) onComplete();
          }, PHASE_DURATIONS.closing);
        }
      }, elapsed - PHASE_DURATIONS[p]);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (!active || phase === "idle") return null;

  const isOpening = phase === "opening" || phase === "tunnel" || phase === "flash";
  const isTunnel = phase === "tunnel" || phase === "flash";
  const isClosing = phase === "closing";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isClosing ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: isClosing ? 0.7 : 0.4 }}
        style={{ pointerEvents: "none" }}
      >
        {/* Oscurecimiento general */}
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "pause" ? 0.35 : 0.55 }}
          transition={{ duration: 0.8 }}
        />

        {/* Cámara: todo el contenido interior escala hacia el centro */}
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: phase === "pause" ? 1 : phase === "glow" ? 1.05 : isTunnel ? 2.6 : 1.4,
          }}
          transition={{ duration: isTunnel ? 1.1 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Glow violeta profundo */}
          <motion.div
            className="absolute rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(168,85,247,0.55), transparent 70%)" }}
            initial={{ width: 40, height: 40, opacity: 0 }}
            animate={{
              width: isOpening ? 420 : 160,
              height: isOpening ? 420 : 160,
              opacity: phase === "pause" ? 0.3 : 0.85,
            }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />

          {/* Glow magenta más cercano al centro */}
          <motion.div
            className="absolute rounded-full blur-2xl"
            style={{ background: "radial-gradient(circle, rgba(236,72,153,0.65), transparent 70%)" }}
            initial={{ width: 30, height: 30, opacity: 0 }}
            animate={{
              width: isOpening ? 260 : 100,
              height: isOpening ? 260 : 100,
              opacity: phase === "pause" ? 0.25 : 0.9,
            }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          />

          {/* Anillos de túnel: crecen y se desvanecen, simulando velocidad hacia adentro */}
          {isTunnel &&
            tunnelRings.map((r) => (
              <motion.div
                key={r}
                className="absolute rounded-full border-2"
                style={{
                  borderColor: r % 2 === 0 ? "rgba(168,85,247,0.55)" : "rgba(236,72,153,0.55)",
                }}
                initial={{ width: 20, height: 20, opacity: 0.9 }}
                animate={{ width: 900, height: 900, opacity: 0 }}
                transition={{ duration: 1.1, delay: r * 0.12, ease: "easeOut", repeat: Infinity, repeatDelay: 0.1 }}
              />
            ))}

          {/* La puerta azul: se ilumina y se abre de verdad antes del túnel */}
          {(phase === "pause" || phase === "glow" || phase === "opening") && (
            <motion.div
              className="absolute z-10"
              initial={{ opacity: 0, scale: 0.35 }}
              animate={{
                opacity: 1,
                scale: phase === "pause" ? 0.45 : phase === "glow" ? 0.75 : 1.2,
              }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              <BlueDoor
                width={110}
                openAmount={phase === "opening" ? 0.92 : 0}
                glow={phase === "pause" ? 0.1 : phase === "glow" ? 0.45 : 1}
              />
            </motion.div>
          )}

          {/* Puerta / portal central que se abre */}
          <motion.div
            className="relative rounded-full flex items-center justify-center"
            style={{
              background: "radial-gradient(circle, #ffffff 0%, #f0abfc 18%, #ec4899 42%, #7e22ce 72%, transparent 100%)",
            }}
            initial={{ width: 10, height: 10, opacity: 0 }}
            animate={{
              width: phase === "pause" ? 14 : phase === "glow" ? 46 : isTunnel ? 260 : 120,
              height: phase === "pause" ? 14 : phase === "glow" ? 46 : isTunnel ? 260 : 120,
              opacity: isTunnel ? 1 : 0,
            }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Partículas ambientales */}
          {phase !== "pause" &&
            particles.map((p) => {
              const travel = isTunnel ? p.distance * 3.4 : p.distance;
              const x = Math.cos(p.angle) * travel;
              const y = Math.sin(p.angle) * travel;
              return (
                <motion.span
                  key={p.id}
                  className="absolute rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    backgroundColor: p.color,
                    boxShadow: `0 0 6px ${p.color}`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                  animate={{ x, y, opacity: [0, 1, 0], scale: isTunnel ? 1.8 : 1 }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              );
            })}
        </motion.div>

        {/* Vignette: oscurece los bordes progresivamente */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.75) 85%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpening ? 1 : 0.4 }}
          transition={{ duration: 0.9 }}
        />

        {/* Destello final */}
        <AnimatePresence>
          {phase === "flash" && (
            <motion.div
              className="absolute inset-0"
              style={{ background: "radial-gradient(circle, #ffffff, #f0abfc 55%, transparent 85%)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.26 }}
            />
          )}
        </AnimatePresence>

        {/* Texto narrativo de cierre */}
        <AnimatePresence>
          {isClosing && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-16 text-center text-purple-200/80 text-sm italic px-8"
            >
              ...pero la puerta vuelve a cerrarse.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
