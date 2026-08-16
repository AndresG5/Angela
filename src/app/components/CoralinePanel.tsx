import { motion, AnimatePresence } from "motion/react";
import type { CoralineStep } from "../data/coraline";

/**
 * Coraline reaccionando en vivo a los intentos de contraseña. Vive en el
 * flujo normal del layout (nunca flotando encima de la tarjeta), así que
 * nunca puede quedar detrás de nada ni tapar el formulario — en móvil
 * aparece arriba de la tarjeta, en pantallas más anchas a su lado.
 */
export function CoralinePanel({
  step,
  attemptKey,
}: {
  step: CoralineStep;
  /** Cambia con cada intento para disparar la transición de una escena a otra */
  attemptKey: number;
}) {
  // Pequeño acercamiento horizontal que simula que se va acercando a la puerta
  const nudge = step.align * 14;

  return (
    <div className="relative flex flex-col items-center flex-shrink-0" style={{ width: "min(46vw, 210px)" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={attemptKey}
          initial={{ opacity: 0, y: 14, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1, x: -nudge }}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center w-full"
        >
          {/* Aura ambiental detrás de Coraline, crece con la intensidad */}
          <div
            className="absolute rounded-full blur-2xl pointer-events-none"
            style={{
              width: `${55 + step.intensity * 25}%`,
              paddingBottom: `${55 + step.intensity * 25}%`,
              background: `radial-gradient(circle, rgba(37,99,235,${0.22 + step.intensity * 0.25}) 0%, rgba(96,165,250,${0.14 + step.intensity * 0.18}) 45%, transparent 75%)`,
              left: "50%",
              top: "36%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Globo de diálogo */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.35, ease: "easeOut" }}
            className="relative z-10 mb-2.5 px-3.5 py-2.5 rounded-2xl text-center w-full"
            style={{
              background: "linear-gradient(135deg, rgba(8,14,36,0.95) 0%, rgba(20,42,97,0.95) 100%)",
              border: `1.5px solid rgba(96,165,250,${0.4 + step.intensity * 0.4})`,
              boxShadow: `0 0 ${14 + step.intensity * 20}px rgba(37,99,235,${0.2 + step.intensity * 0.3})`,
            }}
          >
            <p className="text-blue-100 text-[12px] sm:text-sm font-medium leading-snug italic">
              "{step.text}"
            </p>
            <div
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
              style={{
                background: "rgba(20,42,97,0.95)",
                borderRight: `1.5px solid rgba(96,165,250,${0.4 + step.intensity * 0.4})`,
                borderBottom: `1.5px solid rgba(96,165,250,${0.4 + step.intensity * 0.4})`,
              }}
            />
          </motion.div>

          {/* Retrato de Coraline */}
          <motion.div
            className="relative z-10 rounded-2xl overflow-hidden w-full"
            style={{
              aspectRatio: "3 / 4",
              border: `2px solid rgba(96,165,250,${0.45 + step.intensity * 0.35})`,
              boxShadow: `0 0 ${16 + step.intensity * 26}px rgba(37,99,235,${0.3 + step.intensity * 0.35}), 0 8px 20px rgba(0,0,0,0.5)`,
            }}
            animate={
              step.intensity >= 0.6
                ? { x: [0, -1.5, 1.5, -1, 0] }
                : { y: [0, -3, 0] }
            }
            transition={
              step.intensity >= 0.6
                ? { duration: 0.4, delay: 0.5 }
                : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <img
              src={step.image}
              alt="Coraline"
              className="w-full h-full object-cover object-top"
              draggable={false}
              onError={(e) => {
                (e.target as HTMLImageElement).style.visibility = "hidden";
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, transparent 55%, rgba(37,99,235,${0.12 + step.intensity * 0.22}) 100%)`,
              }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
