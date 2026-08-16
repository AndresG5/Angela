import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { HardHat, Clock, CheckCircle2, ArrowLeft } from "lucide-react";

/**
 * Cortina de "en construcción" que se muestra antes de la Puerta Secreta.
 * Cuenta hacia una fecha objetivo. Al llegar a cero:
 *   1. Muestra un mensaje de "¡Ya está listo!" un momento.
 *   2. Se abre sola (los paneles se deslizan) revelando la puerta.
 *
 * Una vez que la fecha objetivo ya pasó, la cortina NUNCA vuelve a
 * aparecer — ni en esta visita ni en ninguna futura — porque Letter.tsx
 * usa `isConstructionOver()` (exportada de aquí) para decidir si
 * siquiera monta este componente. No hay forma de saltársela antes de
 * la fecha: no existe ningún botón para adelantar el cronómetro.
 *
 * ── Fecha objetivo actual ──
 * Puesta en el 1 de septiembre de 2026, 00:00 (hora de Ciudad de
 * México). Para cambiarla más adelante, solo edita TARGET_DATE abajo.
 */
const TARGET_DATE = new Date("2026-09-01T00:00:00-06:00");

export function getConstructionTargetTimestamp() {
  return TARGET_DATE.getTime();
}

export function isConstructionOver() {
  return Date.now() >= getConstructionTargetTimestamp();
}

function formatRemaining(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

const pad = (n: number) => String(n).padStart(2, "0");

type Stage = "counting" | "ready" | "opening";

export function ConstructionCurtain({ onComplete }: { onComplete: () => void }) {
  const navigate = useNavigate();
  const targetRef = useRef(getConstructionTargetTimestamp());
  const [remaining, setRemaining] = useState(() => targetRef.current - Date.now());
  const [stage, setStage] = useState<Stage>("counting");

  // Cuenta regresiva. En cuanto llega a cero, pasa a la etapa "ready"
  // (mensaje de "ya está listo"), nunca directo a abrir la cortina.
  useEffect(() => {
    if (stage !== "counting") return;
    const interval = setInterval(() => {
      const diff = targetRef.current - Date.now();
      setRemaining(diff);
      if (diff <= 0) {
        clearInterval(interval);
        setStage("ready");
      }
    }, 250);
    return () => clearInterval(interval);
  }, [stage]);

  // Etapa "ready": se queda un momento el mensaje de "ya está listo"
  // antes de empezar a abrir los paneles.
  useEffect(() => {
    if (stage !== "ready") return;
    const t = setTimeout(() => setStage("opening"), 1600);
    return () => clearTimeout(t);
  }, [stage]);

  // Etapa "opening": deja que la animación de los paneles termine y
  // entonces sí avisa que ya se puede mostrar la puerta de verdad.
  useEffect(() => {
    if (stage !== "opening") return;
    const t = setTimeout(onComplete, 900);
    return () => clearTimeout(t);
  }, [stage, onComplete]);

  const { days, hours, minutes, seconds } = formatRemaining(remaining);
  const showDays = days > 0;
  const opening = stage === "opening";
  const ready = stage === "ready" || opening;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="curtain"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center overflow-hidden"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100dvh",
          zIndex: 2147483000,
          background: "linear-gradient(180deg, #0b1a3d 0%, #050914 100%)",
          pointerEvents: opening ? "none" : "auto",
        }}
      >
          {/* Dos paneles tipo cortina/barrera que se abren al terminar */}
          <motion.div
            initial={{ x: 0 }}
            animate={opening ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 left-0 w-1/2"
            style={{
              background:
                "repeating-linear-gradient(135deg, #f59e0b 0 22px, #111827 22px 44px)",
              opacity: 0.14,
            }}
          />
          <motion.div
            initial={{ x: 0 }}
            animate={opening ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 right-0 w-1/2"
            style={{
              background:
                "repeating-linear-gradient(135deg, #f59e0b 0 22px, #111827 22px 44px)",
              opacity: 0.14,
            }}
          />

          {/* Franjas de "no pasar" arriba y abajo */}
          <div
            className="absolute top-0 left-0 w-full h-3"
            style={{
              background: "repeating-linear-gradient(-45deg, #facc15 0 18px, #1f2937 18px 36px)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-full h-3"
            style={{
              background: "repeating-linear-gradient(-45deg, #facc15 0 18px, #1f2937 18px 36px)",
            }}
          />

          {/* Volver al menú: esta pantalla tapa todo, así que necesita
              su propia flecha de regreso (la de Letter.tsx queda por
              debajo, tapada). */}
          {!opening && (
            <button
              onClick={() => navigate("/menu")}
              className="absolute z-20 p-2.5 rounded-xl text-blue-200 transition-all hover:bg-white/10"
              style={{
                top: "calc(20px + env(safe-area-inset-top, 0px))",
                left: "calc(20px + env(safe-area-inset-left, 0px))",
                background: "rgba(8,14,36,0.55)",
                border: "1px solid rgba(96,165,250,0.3)",
              }}
              aria-label="Volver al menú"
            >
              <ArrowLeft size={20} />
            </button>
          )}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: opening ? 0 : 1,
              y: 0,
              scale: opening ? 0.96 : 1,
            }}
            transition={{ duration: opening ? 0.5 : 0.6, delay: opening ? 0 : 0.1 }}
            className="relative z-10 w-full max-w-md px-5 flex flex-col items-center text-center"
          >
            {!ready && (
              <div className="w-full rounded-3xl overflow-hidden mb-6 shadow-2xl border border-amber-400/25">
                <img
                  src="/images/construction/under_construction.jpg"
                  alt="Sitio en construcción"
                  className="w-full h-auto block"
                  draggable={false}
                />
              </div>
            )}

            <AnimatePresence mode="wait">
              {!ready ? (
                <motion.div
                  key="counting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <div className="flex items-center gap-2 mb-2 text-amber-300">
                    <HardHat size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Sitio en construcción
                    </span>
                  </div>

                  <h1 className="text-white text-xl font-bold mb-1.5">
                    Angela, esto todavía no está listo...
                  </h1>
                  <p className="text-blue-200/70 text-sm mb-6 leading-relaxed">
                    Faltan los últimos detalles antes de que puedas cruzar la puerta.
                  </p>

                  <div className="flex items-center gap-2 text-blue-300/80 mb-2.5 text-xs font-semibold uppercase tracking-wide">
                    <Clock size={14} />
                    Disponible en
                  </div>

                  <div className="flex items-center gap-2">
                    {showDays && (
                      <TimeUnit value={pad(days)} label={days === 1 ? "día" : "días"} />
                    )}
                    <TimeUnit value={pad(hours)} label="hrs" />
                    <TimeSeparator />
                    <TimeUnit value={pad(minutes)} label="min" />
                    <TimeSeparator />
                    <TimeUnit value={pad(seconds)} label="seg" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="ready"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 16 }}
                  className="flex flex-col items-center py-8"
                >
                  <motion.div
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                    className="mb-4 text-emerald-400"
                  >
                    <CheckCircle2 size={52} strokeWidth={1.6} />
                  </motion.div>
                  <h1 className="text-white text-2xl font-bold mb-1.5">
                    ¡Ya está listo!
                  </h1>
                  <p className="text-blue-200/70 text-sm">
                    Angela, la puerta ya te está esperando.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
    </AnimatePresence>,
    document.body
  );
}

function TimeUnit({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl px-3.5 py-2.5 min-w-[58px]"
      style={{
        background: "rgba(8,14,36,0.7)",
        border: "1.5px solid rgba(96,165,250,0.35)",
        boxShadow: "0 0 14px rgba(37,99,235,0.25)",
      }}
    >
      <span
        className="text-white font-extrabold text-xl tabular-nums leading-none"
        style={{ textShadow: "0 0 10px rgba(96,165,250,0.5)" }}
      >
        {value}
      </span>
      <span className="text-blue-300/60 text-[9px] font-bold uppercase tracking-wide mt-1">
        {label}
      </span>
    </div>
  );
}

function TimeSeparator() {
  return <span className="text-blue-400/50 font-bold text-lg -mt-3">:</span>;
}
