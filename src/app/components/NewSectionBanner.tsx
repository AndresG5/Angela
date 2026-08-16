import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X } from "lucide-react";
import { isConstructionOver } from "./ConstructionCurtain";

const SEEN_KEY = "angela-secret-door-notified";

/**
 * Avisa dentro de la app que la Puerta Secreta ya está disponible, en
 * cuanto llega la fecha objetivo (ver TARGET_DATE en
 * ConstructionCurtain.tsx). No es una notificación push real del
 * sistema operativo (eso necesitaría un servidor detrás) — es un
 * aviso que Angela ve en cuanto abre la app, lo cual cubre el caso
 * real: enterarse de que ya puede pasar, sin tener que ir a checar
 * "porque sí".
 *
 * Se muestra una sola vez: en cuanto lo cierra o entra a la Puerta
 * Secreta, queda marcado como visto (localStorage) y no vuelve a
 * aparecer.
 */
export function hasSeenSecretDoorNotice() {
  try {
    return localStorage.getItem(SEEN_KEY) === "true";
  } catch {
    return false;
  }
}

export function markSecretDoorNoticeSeen() {
  try {
    localStorage.setItem(SEEN_KEY, "true");
  } catch {
    /* localStorage no disponible: no pasa nada grave */
  }
}

export function shouldShowSecretDoorNotice() {
  return isConstructionOver() && !hasSeenSecretDoorNotice();
}

export function NewSectionBanner({
  visible,
  onDismiss,
  onOpen,
}: {
  visible: boolean;
  onDismiss: () => void;
  onOpen: () => void;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -16, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="overflow-hidden mb-5"
        >
          <div
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(37,99,235,0.25) 0%, rgba(96,165,250,0.15) 100%)",
              border: "1.5px solid rgba(96,165,250,0.4)",
              boxShadow: "0 0 18px rgba(37,99,235,0.2)",
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="flex-shrink-0 text-blue-200"
            >
              <Sparkles size={20} />
            </motion.span>

            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-snug">
                ¡Ya está disponible la Puerta Secreta!
              </p>
              <p className="text-blue-200/70 text-xs mt-0.5">
                Angela, ya puedes entrar a ver qué te dejó Andrés.
              </p>
            </div>

            <button
              onClick={onOpen}
              className="flex-shrink-0 px-3 py-2 rounded-xl bg-blue-500/30 hover:bg-blue-500/45 text-blue-100 text-xs font-bold transition-all"
            >
              Ver ahora
            </button>

            <button
              onClick={onDismiss}
              aria-label="Cerrar aviso"
              className="flex-shrink-0 p-1.5 rounded-lg text-blue-200/60 hover:text-blue-100 hover:bg-white/5 transition-all"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
