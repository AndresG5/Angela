import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { HardHat, Clock, CheckCircle2, ArrowLeft, Download } from "lucide-react";

/**
 * Cortina de "en construcción" que se muestra antes de la Puerta Secreta.
 *
 * ── Cómo funciona ──
 * 1. Si todavía no llega la fecha objetivo (1 de septiembre de 2026):
 *    cuenta regresiva en vivo.
 * 2. Al llegar a cero (o si la persona entra por primera vez cuando la
 *    fecha YA pasó, por ejemplo varios días después): mensaje de
 *    "¡Ya está listo!", luego el contenido desaparece, y por último
 *    la pantalla se abre en dos —como una puerta doble— revelando la
 *    puerta de verdad detrás.
 * 3. Esa animación de apertura se ve UNA sola vez en la vida del
 *    navegador (se guarda en localStorage vía markDoorRevealSeen).
 *    No importa si la persona entra el mismo día que se cumple la
 *    fecha o una semana después — la primera vez que entra después de
 *    que la fecha ya pasó, ve la animación completa; de ahí en
 *    adelante, Letter.tsx ni siquiera monta este componente
 *    (ver hasSeenDoorReveal) y va directo a la puerta.
 * 4. No hay forma de saltarse la cuenta regresiva antes de tiempo: no
 *    existe ningún botón para adelantarla.
 */
const TARGET_DATE = new Date("2026-09-01T00:00:00-06:00");

const REVEAL_SEEN_KEY = "angela-door-reveal-seen";

export function getConstructionTargetTimestamp() {
  return TARGET_DATE.getTime();
}

export function isConstructionOver() {
  return Date.now() >= TARGET_DATE.getTime();
}

export function hasSeenDoorReveal() {
  try {
    return localStorage.getItem(REVEAL_SEEN_KEY) === "true";
  } catch {
    return false;
  }
}

export function markDoorRevealSeen() {
  try {
    localStorage.setItem(REVEAL_SEEN_KEY, "true");
  } catch {
    /* localStorage no disponible: no pasa nada grave */
  }
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

// "counting": cuenta regresiva en vivo.
// "ready": mensaje de "¡Ya está listo!".
// "hiding": la imagen/texto desaparecen (la puerta todavía está cerrada).
// "opening": ya no hay contenido — la puerta se abre en dos.
type Stage = "counting" | "ready" | "hiding" | "opening";

export function ConstructionCurtain({ onComplete }: { onComplete: () => void }) {
  const navigate = useNavigate();
  const targetRef = useRef(getConstructionTargetTimestamp());

  const [remaining, setRemaining] = useState(() => targetRef.current - Date.now());

  // Si al montar la fecha YA pasó (por ejemplo, alguien entra días
  // después), nos saltamos la cuenta regresiva y arrancamos directo
  // en "ready" — así igual ve el momento de "ya está listo" y la
  // apertura de la puerta, sin quedarse viendo un cronómetro en 0.
  const [stage, setStage] = useState<Stage>(() =>
    targetRef.current - Date.now() <= 0 ? "ready" : "counting"
  );

  // Cuenta regresiva. En cuanto llega a cero, pasa a "ready".
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

  // "ready": se queda un momento el mensaje de "ya está listo".
  useEffect(() => {
    if (stage !== "ready") return;
    const t = setTimeout(() => setStage("hiding"), 1600);
    return () => clearTimeout(t);
  }, [stage]);

  // "hiding": deja que la imagen/texto terminen de desvanecerse antes
  // de que la puerta empiece a abrirse (para que no se sientan encimados).
  useEffect(() => {
    if (stage !== "hiding") return;
    const t = setTimeout(() => setStage("opening"), 650);
    return () => clearTimeout(t);
  }, [stage]);

  // "opening": dos hojas de puerta se deslizan a los lados. Cuando
  // termina la animación, se marca como vista (para no volver a
  // mostrarla nunca) y se avisa que ya se puede ver la puerta real.
  useEffect(() => {
    if (stage !== "opening") return;
    const t = setTimeout(() => {
      markDoorRevealSeen();
      onComplete();
    }, 900);
    return () => clearTimeout(t);
  }, [stage, onComplete]);

  const { days, hours, minutes, seconds } = formatRemaining(remaining);
  const showDays = days > 0;

  const opening = stage === "opening";
  const ready = stage === "ready" || stage === "hiding" || opening;
  const contentVisible = stage === "counting" || stage === "ready";

  const doorStripes =
    "repeating-linear-gradient(135deg, #f59e0b 0 22px, #111827 22px 44px)";
  const doorBase = "linear-gradient(180deg, #0b1a3d 0%, #050914 100%)";

  return createPortal(
    <div
      className="overflow-hidden"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100dvh",
        zIndex: 2147483000,
        pointerEvents: opening ? "none" : "auto",
      }}
    >
      {/* Hoja izquierda de la puerta: lleva su propio fondo, así que
          al deslizarse deja ver de verdad lo que hay detrás (antes
          solo se movía una textura decorativa y el fondo sólido se
          quedaba tapando todo). */}
      <motion.div
        initial={false}
        animate={{ x: opening ? "-100%" : 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-y-0 left-0 w-1/2"
        style={{ background: doorBase }}
      >
        <div className="absolute inset-0" style={{ background: doorStripes, opacity: 0.14 }} />
        <motion.div
          className="absolute top-0 left-0 w-full h-3"
          animate={{ opacity: stage === "counting" || stage === "ready" ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: "repeating-linear-gradient(-45deg, #facc15 0 18px, #1f2937 18px 36px)" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-full h-3"
          animate={{ opacity: stage === "counting" || stage === "ready" ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: "repeating-linear-gradient(-45deg, #facc15 0 18px, #1f2937 18px 36px)" }}
        />
      </motion.div>

      {/* Hoja derecha, igual pero al revés */}
      <motion.div
        initial={false}
        animate={{ x: opening ? "100%" : 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-y-0 right-0 w-1/2"
        style={{ background: doorBase }}
      >
        <div className="absolute inset-0" style={{ background: doorStripes, opacity: 0.14 }} />
        <motion.div
          className="absolute top-0 left-0 w-full h-3"
          animate={{ opacity: stage === "counting" || stage === "ready" ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: "repeating-linear-gradient(-45deg, #facc15 0 18px, #1f2937 18px 36px)" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-full h-3"
          animate={{ opacity: stage === "counting" || stage === "ready" ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: "repeating-linear-gradient(-45deg, #facc15 0 18px, #1f2937 18px 36px)" }}
        />
      </motion.div>

      {/* Volver al menú: esta pantalla tapa todo, así que necesita su
          propia flecha (la de Letter.tsx queda por debajo, tapada). */}
      {(stage === "counting" || stage === "ready") && (
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

      {/* Contenido: imagen, cronómetro / mensaje de "ya está listo".
          Desaparece por completo antes de que la puerta se abra. */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-5">
        <AnimatePresence>
          {contentVisible && (
            <motion.div
              key="curtain-content"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94, y: -8 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="relative z-10 w-full max-w-md flex flex-col items-center text-center pointer-events-auto"
            >
              {!ready && (
                <div className="relative w-full rounded-3xl overflow-hidden mb-6 shadow-2xl border border-amber-400/25">
                  <img
                    src="/images/construction/under_construction.jpg"
                    alt="Sitio en construcción"
                    className="w-full h-auto block"
                    draggable={false}
                  />

                  {/* Por si le gusta la imagen y la quiere guardar */}
                  <a
                    href="/images/construction/under_construction.jpg"
                    download="angela-sitio-en-construccion.jpg"
                    title="Guardar esta imagen"
                    aria-label="Guardar esta imagen"
                    className="absolute bottom-2.5 right-2.5 flex items-center justify-center w-9 h-9 rounded-full text-white transition-all hover:scale-110"
                    style={{
                      background: "rgba(8,14,36,0.65)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <Download size={16} />
                  </a>
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
          )}
        </AnimatePresence>
      </div>
    </div>,
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
